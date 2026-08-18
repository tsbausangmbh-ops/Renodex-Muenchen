/**
 * customer_lookup.js — Kunden-Lookup für KV-Generator
 *
 * Quellen pro Firma:
 *   sakar    -> sevdesk REST API (Master)
 *   089dach  -> Lexoffice API
 *   089bayern, kshw-do, kshw-muc -> (TODO: DB)
 *
 * Aufruf: await lookupKunde('sakar', '10005')   // by number
 *         await lookupKunde('sakar', 'Müller')   // by name (first hit)
 *
 * Rückgabe (normalisiert):
 *   { name, address, email, phone, number, salutation, kunde_typ, _source }
 *   oder null
 */

const fs = require('fs');


const VAULT = '/ai-platform/vault/credentials.json';
let _vaultCache = null; let _vaultCacheTime = 0;
function loadVault() {
  const now = Date.now();
  if (_vaultCache && (now - _vaultCacheTime) < 60000) return _vaultCache;
  _vaultCache = JSON.parse(fs.readFileSync(VAULT, 'utf8'));
  _vaultCacheTime = now;
  return _vaultCache;
}



/**
 * Baut die volle Anrede-Zeile fuer Briefe/KVs.
 *   { salutation:'Herr', last_name:'Mueller' } -> "Sehr geehrter Herr Mueller,"
 *   { salutation:'Frau', last_name:'Schmidt' } -> "Sehr geehrte Frau Schmidt,"
 *   sonst (Firma ohne Ansprechpartner / kein Geschlecht) -> "Sehr geehrte Damen und Herren,"
 */
function buildAnrede({ salutation, last_name }) {
    const ln = (last_name || '').trim();
    if (salutation === 'Herr' && ln) return `Sehr geehrter Herr ${ln},`;
    if (salutation === 'Frau' && ln) return `Sehr geehrte Frau ${ln},`;
    return 'Sehr geehrte Damen und Herren,';
}




// ---------- sevDesk (089dach Master seit 2026-04-08) ----------

async function _sdRequest(firma, path, params) {
    const v = loadVault();
    const credKey = SEVDESK_CRED_KEY[firma] || firma;
    const cred = (v.sevdesk || {})[credKey];
    if (!cred || !cred.api_key) {
        throw new Error(`sevdesk: keine Credentials für '${firma}' (cred-key '${credKey}')`);
    }
    let url = `https://my.sevdesk.de/api/v1${path}`;
    if (params) {
        const qs = new URLSearchParams(params).toString();
        url += `?${qs}`;
    }
    const r = await fetch(url, {
        headers: {
            'Authorization': cred.api_key,
            'Accept': 'application/json',
            'User-Agent': 'curl/8.4.0',  // Cloudflare blockt Python/Node-Default UA
        },
    });
    if (!r.ok) throw new Error(`sevdesk ${r.status}: ${(await r.text()).slice(0,200)}`);
    return await r.json();
}

function _sdObjects(d) {
    const o = d && d.objects;
    if (!o) return [];
    return Array.isArray(o) ? o : [o];
}

// sevDesk speichert gender als 'm'/'w'/'d' ODER als String 'Herr'/'Frau'/'male'/'female' — beides normalisieren
function normalizeGender(g) {
    if (!g) return '';
    const s = String(g).trim().toLowerCase();
    if (s === 'm' || s === 'male' || s === 'mann' || s === 'herr' || s === 'männlich' || s === 'maennlich') return 'Herr';
    if (s === 'w' || s === 'f' || s === 'female' || s === 'frau' || s === 'weiblich') return 'Frau';
    return '';
}

function buildAnredeFromGender(gender, lastName) {
    const ln = (lastName || '').trim();
    const g = normalizeGender(gender);
    if (g === 'Herr' && ln) return `Sehr geehrter Herr ${ln},`;
    if (g === 'Frau' && ln) return `Sehr geehrte Frau ${ln},`;
    return 'Sehr geehrte Damen und Herren,';
}

async function normalizeFromSevdesk(firma, c) {
    // Adresse + Comms separat holen (mit depth=1 statt 2 separate Calls)
    const cid = c.id;
    const [addrResp, commResp] = await Promise.all([
        _sdRequest(firma, '/ContactAddress', { 'contact[id]': cid, 'contact[objectName]': 'Contact' }),
        _sdRequest(firma, '/CommunicationWay', { 'contact[id]': cid, 'contact[objectName]': 'Contact' }),
    ]);
    const addrs = _sdObjects(addrResp);
    const comms = _sdObjects(commResp);
    const addr = addrs[0] || {};
    const emailCw = comms.find(cw => cw.type === 'EMAIL');
    const phoneCw = comms.find(cw => cw.type === 'PHONE');
    const webCw   = comms.find(cw => cw.type === 'WEB');

    // Privatperson wenn category.id=3 UND keine B2B-Signale, sonst Firma.
    // B2B-Detection 2026-05-12 (Bug-Killer): vatNumber gesetzt ODER Firmensuffix in c.name.
    // (category.id=3 ist sevDesk-Default "Kunde", NICHT Privatperson - kein verlaesslicher Indikator.)
    const catId = c.category ? (c.category.id != null ? c.category.id : c.category.value) : undefined;
    const CORP_SUFFIX_RE = /(?:^|\s|,|\.)\s*(s\.r\.l\.?|s\.p\.a\.?|s\.a\.s\.?|s\.a\.r\.l\.?|sp\.\s*z\s*o\.?\s*o\.?|gmbh|ag|kg|ohg|ug(?:\s*\(haftungsbeschränkt\))?|e\.k\.?|mbh|gbr|ltd\.?|llc|inc\.?|b\.v\.?|n\.v\.?|s\.a\.?|d\.o\.o\.?|d\.d\.?|a\.ş\.?|ltd\.\s*şti\.?)\s*$/i;
    const _name = String(c.name || '').trim();
    const _hasCorpSuffix = CORP_SUFFIX_RE.test(_name);
    const _hasVat = !!(c.vatNumber && String(c.vatNumber).trim());
    const _b2bSignals = _hasCorpSuffix || _hasVat;
    const isPerson = !_b2bSignals && !!c.surename;
    let isOrg = (_b2bSignals && !!c.name) || (!isPerson && !!c.name && !c.surename);

    // AUTO-SPLIT Bugfix 2026-04-14: Privatperson mit vollem Namen in c.name, surename/familyname leer
    let autoFirstName = c.surename || '';
    let autoLastName = c.familyname || '';
    if (isPerson && c.name && !c.surename && !c.familyname) {
        const parts = String(c.name).trim().split(/\s+/);
        if (parts.length >= 2) {
            autoFirstName = parts[0];
            autoLastName = parts.slice(1).join(' ');
        } else if (parts.length === 1) {
            autoLastName = parts[0];
        }
    }

    const companyName = isOrg ? (c.addressName || c.name || '') : '';
    const ansprechpartner = c.name2 || (isOrg ? '' : `${autoFirstName} ${autoLastName}`.trim());
    const firstName = isOrg ? '' : autoFirstName;
    const lastName  = isOrg ? '' : autoLastName;

    // Adresse-String fuer Briefkopf (B2B: Firma + z.Hd. + Strasse + PLZ Ort)
    const lines = [];
    if (companyName) {
        lines.push(companyName);
        // Dedup: nur z.Hd. wenn Ansprechpartner != Firma-Name (sonst Doppelung)
        if (ansprechpartner && ansprechpartner.trim() && ansprechpartner.trim() !== (firma || '').trim() && !(firma || '').includes(ansprechpartner.trim())) {
            lines.push(`z. Hd. ${ansprechpartner}`);
        }
    }
    // B2C: Name NICHT in address (steht schon in kunde.name, sonst Dopplung)
    if (addr.street) lines.push(addr.street);
    if (addr.zip || addr.city) lines.push(`${addr.zip || ''} ${addr.city || ''}`.trim());
    const addressStr = lines.join('\n');

    const gender = normalizeGender(c.gender || '');
    return {
        name: companyName || ansprechpartner,
        address: addressStr,
        email: emailCw ? emailCw.value : '',
        phone: phoneCw ? phoneCw.value : '',
        website: webCw ? webCw.value : '',
        number: c.customerNumber || '',
        salutation: gender,
        anrede: buildAnredeFromGender(gender, lastName || (ansprechpartner ? String(ansprechpartner).split(' ').slice(-1)[0] : '') || ''),
        kunde_typ: isOrg ? 'b2b' : 'b2c',
        _source: 'sevdesk',
        _id: c.id,
        last_name: lastName,
        first_name: firstName,
        company_name: companyName,
        ansprechpartner: ansprechpartner,
    };
}

async function lookupSevdesk(firma, query) {
    const q = String(query).trim();
    if (!q) return null;
    // 1. Numerisch -> customerNumber
    if (/^\d+$/.test(q)) {
        const _ck = firma + ':' + q;
        const _cv = _cachedContactId(_ck);
        if (_cv) return _cv;
        const r = await _sdRequest(firma, '/Contact', { customerNumber: q, depth: 1 });
        const items = _sdObjects(r);
        if (items.length === 0) return null;
        const _result = await normalizeFromSevdesk(firma, items[0]);
        _setCachedContactId(firma + ':' + q, _result);
        return _result;
    }
    // 2. Email -> via CommunicationWay
    if (q.includes('@')) {
        const r = await _sdRequest(firma, '/CommunicationWay', { type: 'EMAIL', value: q });
        const items = _sdObjects(r);
        const cid = items[0] && items[0].contact && items[0].contact.id;
        if (!cid) return null;
        const cr = await _sdRequest(firma, `/Contact/${cid}`, { depth: 1 });
        const cs = _sdObjects(cr);
        return cs[0] ? await normalizeFromSevdesk(firma, cs[0]) : null;
    }
    // 3. Name -> Volltext (Org-Felder UND Person-Felder)
    const r = await _sdRequest(firma, '/Contact', { name: q, depth: 1 });
    const items = _sdObjects(r);
    if (items.length > 0) return await normalizeFromSevdesk(firma, items[0]);
    // Fallback fuer Person: Listing durchsuchen (sevDesk listet Personen ohne name=Filter)
    const all = await _sdRequest(firma, '/Contact', { limit: 200, depth: 1 });
    const allItems = _sdObjects(all);
    const ql = q.toLowerCase();
    const hit = allItems.find(c =>
        (c.familyname && c.familyname.toLowerCase().includes(ql)) ||
        (c.surename   && c.surename.toLowerCase().includes(ql)) ||
        (c.name       && c.name.toLowerCase().includes(ql)) ||
        (c.name2      && c.name2.toLowerCase().includes(ql))
    );
    return hit ? await normalizeFromSevdesk(firma, hit) : null;
}


const SOURCE_BY_FIRMA = {
    // sevDesk-managed
    'sakar':              'sevdesk',
    'aquapro24':          'sevdesk',
    'sanitär-muenchen':  'sevdesk',
    'estriche':           'sevdesk',
    '089-sanierer':       'sevdesk',
    '089sanierer':        'sevdesk',
    '089dach':            'sevdesk',
    'kshw-muc':           'sevdesk',
    // DB-managed (tenant_software) — kein API-Lookup, kunde muss als Objekt uebergeben werden
    '089bayern':          'db',
    'kshw-do':            'db',
    'extrucon':           'db',
};

// Sakar-Brands teilen sich EINEN sevDesk-Account (cred-key 'sakar')
const SEVDESK_CRED_KEY = {
    'sakar':              'sakar',
    'kshw-muc':           '089dach',
    'aquapro24':          'sakar',
    // ab 2026-05-05: estriche/sanitär-muenchen/089sanierer laufen im 089Dach-sevDesk-Account
    'sanitär-muenchen':   '089dach',
    'estriche':           '089dach',
    '089-sanierer':       '089dach',
    '089sanierer':        '089dach',
    '089dach':            '089dach',
};

async function lookupKunde(firma, query) {
    const src = SOURCE_BY_FIRMA[firma];
    if (!src) {
        console.error(`lookupKunde: keine Quelle definiert für firma='${firma}'`);
        return null;
    }
    if (src === 'sevdesk')    return await lookupSevdesk(firma, query);
    if (src === 'db') {
        // Fix 23 (2026-04-14): Postgres-Lookup in kunden (firma=)
        try {
            const { Pool } = require('pg');
// PERF: contactId Memory-Cache (TTL 1h)
const _contactIdCache = new Map();
const _CACHE_TTL = 3600000;
function _cachedContactId(key) { const e = _contactIdCache.get(key); if (e && Date.now() - e.ts < _CACHE_TTL) return e.val; return null; }
function _setCachedContactId(key, val) { _contactIdCache.set(key, {val, ts: Date.now()}); }

            const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 8 });
            const qq = String(query || '').trim();
            let r;
            if (/^\d+$/.test(qq)) {
                r = await pool.query('SELECT * FROM kunden WHERE firma=$1 AND (kundennummer=$2 OR customer_number=$2) LIMIT 1', [firma, qq]).catch(() => ({ rows: [] }));
            } else {
                r = await pool.query('SELECT * FROM kunden WHERE firma=$1 AND (LOWER(COALESCE(name,\'\')) LIKE $2 OR LOWER(COALESCE(company_name,\'\')) LIKE $2) LIMIT 1', [firma, '%' + qq.toLowerCase() + '%']).catch(() => ({ rows: [] }));
            }
            await pool.end().catch((err) => { console.warn("customer_lookup pool.end failed:", err && err.message ? err.message : err); });
            if (r && r.rows && r.rows.length) {
                const k = r.rows[0];
                return { name: k.company_name || k.name || '', address: k.address || [k.street, [k.zip, k.city].filter(Boolean).join(' ')].filter(Boolean).join('\n'), email: k.email || '', phone: k.phone || '', number: k.kundennummer || k.customer_number || '', salutation: k.salutation || '', anrede: buildAnrede({ salutation: k.salutation, last_name: k.last_name }), kunde_typ: k.company_name ? 'b2b' : 'b2c', _source: 'db', _id: k.id, last_name: k.last_name || '', first_name: k.first_name || '', company_name: k.company_name || '' };
            }
        } catch (e) { console.error(`lookupKunde[${firma}] DB-Fehler:`, e.message); }
        console.error(`lookupKunde[${firma}]: Kein DB-Treffer fuer '${query}'`);
        return null;
    }
    return null;
}

module.exports = { lookupKunde };
