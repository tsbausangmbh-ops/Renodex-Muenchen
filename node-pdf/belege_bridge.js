/**
 * belege_bridge.js — Firma-aware Bindeglied zwischen kv_cache und sevDesk
 *
 * Eingebaut 2026-04-08 als Nachfolger von sakar_belege_bridge.js. Beide
 * Firmen (089dach + alle Sakar-Brands) nutzen jetzt sevDesk; dieser Bridge
 * routet anhand kvRow.firma in den richtigen sevDesk-Account und den
 * richtigen OneDrive-Ordner.
 *
 * Nimmt einen KV-Eintrag aus kv_cache und legt daraus
 *   - eine Auftragsbestaetigung (sevDesk Order, orderType='AB')
 *   - eine Rechnung (sevDesk Invoice)
 *   - eine Abschlagsrechnung (sevDesk Invoice mit modifizierten Positionen)
 * in sevDesk an, laedt das PDF runter und schiebt es per rclone in OneDrive.
 *
 * Adapter-Returnformat (kompatibel zu altem sevdesk_sync.js):
 *   { id, number, is_draft, _objectName, _raw }
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
function _guardArgs(args) {
  return args.map(a => {
    const s = String(a);
    if (/[\x00\r\n]/.test(s)) throw new Error("rclone arg hat Control-Chars");
    return s;
  });
}

const kvCache = require('./kv_cache');
const sdBelege = require('./sevdesk_belege');
const { loadKey: _loadSdKey } = require('./sevdesk_belege');

const ONEDRIVE_REMOTE = 'onedrive';

// Fix 19 (2026-04-14): Zentrales SAKAR_BRANDS, FIRMA_TO_SD_KEY daraus abgeleitet.
// Ab 2026-05-05: nur noch sakar selbst + AquaPro24 unter Sakar-Account.
// 089-Sanierer / Estriche / Sanitär laufen nun unter 089Dach.
const SAKAR_BRANDS = new Set(['sakar', 'aquapro24']);
const DACH_BRANDS  = new Set(['089dach', 'kshw-muc', '089sanierer', '089-sanierer', 'estriche', 'sanitär-muenchen']);

// Mapping firma-slug -> sevDesk-credentials-key
const FIRMA_TO_SD_KEY = (() => {
    const m = {};
    for (const b of DACH_BRANDS) m[b] = '089dach';
    for (const b of SAKAR_BRANDS) m[b] = 'sakar';
    return m;
})();

const SUPPORTED_FIRMAS = new Set(Object.keys(FIRMA_TO_SD_KEY));

// OneDrive-Zielordner pro Firma + Beleg-Typ.
// Verifiziert per `rclone lsd onedrive:` am 2026-04-08.
// Sakar-Brands teilen sich den Sammelordner 'Mustafa Sakar' (per User-Wunsch).
function _firmaPaths(folderName) {
    return {
        kv:       `KV Generator/1. Kostenvoranschläge/${folderName}`,
        angebot:  `KV Generator/2. Angebote/${folderName}`,
        ab:       `KV Generator/3. Auftragsbestätigungen/${folderName}`,
        rechnung: `KV Generator/4. Rechnungen/${folderName}`,
        brief:    `KV Generator/5. Briefe/${folderName}`,
    };
}
const _DACH_PATHS     = _firmaPaths('089Dach');
const _ESTRICHE_PATHS = _firmaPaths('Estriche München');
const _SANIERER_PATHS = _firmaPaths('089-Sanierer');
const _SANITAER_PATHS = _firmaPaths('Sanitär München');
const _SAKAR_PATHS    = _firmaPaths('Mustafa Sakar');
const _BAYERN_PATHS   = _firmaPaths('089Bayern');
const _KSHWDO_PATHS   = _firmaPaths('KSHWmont');
const _KSHWMUC_PATHS  = _firmaPaths('KSHW München');
const _EXTRUCON_PATHS = _firmaPaths('ExtruCon');
const PER_FIRMA_PATHS = {
    // Ab 2026-05-05: Estriche/Sanitär/089-Sanierer landen im 089Dach-OneDrive (neue Inhaberin).
    // Sakar/AquaPro24 bleiben im Mustafa-Sakar-OneDrive.
    '089dach':              _DACH_PATHS,
    'sakar':                _SAKAR_PATHS,
    'aquapro24':            _SAKAR_PATHS,
    'sanitär-muenchen':    _SANITAER_PATHS,
    'estriche':             _ESTRICHE_PATHS,
    '089-sanierer':         _SANIERER_PATHS,
    '089sanierer':          _SANIERER_PATHS,
    'komplettsanierungen':  _SAKAR_PATHS,
    // Andere Firmen: eigener Ordner
    '089bayern':            _BAYERN_PATHS,
    'kshw-do':              _KSHWDO_PATHS,
    'kshw-muc':             _KSHWMUC_PATHS,
    'extrucon':             _EXTRUCON_PATHS,
    'kshwmont':             _KSHWDO_PATHS,
};

// Welche Firmen haben sevDesk-Anbindung (Angebot/AB/Rechnung). Kleinere Menge.
// SUPPORTED_FIRMAS wird automatisch aus FIRMA_TO_SD_KEY abgeleitet (siehe oben).
// ONEDRIVE_FIRMAS = sevDesk + DB — alle Firmen mit OneDrive-Pfaden.
// 2026-04-25: Privat-Briefe gehen nach Briefe/privat/
PER_FIRMA_PATHS['privat'] = { brief: 'KV Generator/5. Briefe/privat' };
const ONEDRIVE_FIRMAS = new Set(Object.keys(PER_FIRMA_PATHS));

// ─────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────

function _parseJson(v, fallback) {
    if (v == null) return fallback;
    if (typeof v !== 'string') return v;
    try { return JSON.parse(v); } catch { return fallback; }
}

function _ensureSupported(firma) {
    if (firma === 'sanitaer-muenchen') {
        throw new Error("Slug 'sanitaer-muenchen' ist GESPERRT (2026-05-18). Nutze 'sanitär-muenchen' mit Umlaut. Memory: feedback_umlaute_immer_fixen.md");
    }
    if (!SUPPORTED_FIRMAS.has(firma)) {
        throw new Error(`Firma '${firma}' ist nicht durch belege_bridge unterstuetzt (nur 089dach + sakar-Brands)`);
    }
}

function _sdKey(firma) {
    const k = FIRMA_TO_SD_KEY[firma];
    if (!k) throw new Error(`Kein sevDesk-Mapping fuer firma '${firma}'`);
    return k;
}

function _paths(firma) {
    const p = PER_FIRMA_PATHS[firma];
    if (!p) throw new Error(`Keine OneDrive-Pfade fuer firma '${firma}'`);
    return p;
}

function _buildHeader(kvRow, opts, prefix) {
    const parts = [];
    if (prefix) parts.push(prefix);
    if (opts.projectName)    parts.push(opts.projectName);
    if (opts.projectAddress) parts.push(opts.projectAddress);
    parts.push(`KV-Nr: ${kvRow.kv_nummer}`);
    return parts.join(' – ');
}

/**
 * Customer-ID aufloesen: kv_cache speichert "kunde_id" als sevDesk customerNumber
 * (z.B. '1009'). sevDesk-Belege brauchen die interne Contact-ID.
 */
async function resolveCustomerId(kvRow) {
    _ensureSupported(kvRow.firma);
    const sdFirma = _sdKey(kvRow.firma);
    const kunde = _parseJson(kvRow.kunde_json, null);
    if (kunde && kunde._id) return kunde._id;
    if (kvRow.kunde_id) {
        const cid = await sdBelege.findContactIdByNumber(kvRow.kunde_id, sdFirma);
        if (!cid) {
            throw new Error(`sevdesk[${sdFirma}]: Kontakt customerNumber=${kvRow.kunde_id} nicht gefunden`);
        }
        return cid;
    }
    throw new Error('Kann Kunde nicht aufloesen (keine _id und keine kunde_id)');
}

function _applyPartialMode(positionen, mode, value, kvNummer) {
    if (mode === 'percent') {
        const f = Number(value) / 100;
        if (!(f > 0 && f <= 1)) throw new Error('percent muss 0–100 sein');
        return positionen.map(p => ({ ...p, price: Number(p.price || 0) * f }));
    }
    if (mode === 'amount') {
        const eur = Number(value);
        if (!(eur > 0)) throw new Error('amount muss > 0 sein');
        return [{
            title: 'Abschlagsrechnung',
            subtitle: `Pauschal gemaess Angebot KV-Nr ${kvNummer}`,
            desc: '',
            qty: 1,
            price: eur,
            unit: 'Psch.',
        }];
    }
    if (mode === 'positions') {
        if (!Array.isArray(value) || !value.length) throw new Error('positions muss Array sein');
        const set = new Set(value.map(Number));
        const out = positionen
            .map((p, idx) => ({ p, n: idx + 1 }))
            .filter(x => set.has(x.n))
            .map(x => x.p);
        if (!out.length) throw new Error('keine passenden Positionen');
        return out;
    }
    throw new Error(`mode '${mode}' unbekannt (percent|amount|positions)`);
}

// ─────────────────────────────────────────────────────────────────────
// PUBLIC: createAngebot / createAB / createInvoiceFromKv / createPartialInvoiceFromKv
// ─────────────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────
// Regel 2026-04-24 (feedback_dokumentenkette.md):
// AB/RE/AR/SR IMMER aus sevDesk-Vorgang ziehen. KV ist egal.
// ─────────────────────────────────────────────────────────────────────

function _sdOrderPosToKvPos(p) {
    return {
        title: p.name || '',
        subtitle: '',
        desc: p.text || '',
        qty: Number(p.quantity || 1),
        price: Number(p.price || 0),
    };
}

function _is13bFromOrder(order) {
    return (order || {}).taxType === 'noteu';
}

async function createABFromAN({ firma, an, opts = {} }) {
    _ensureSupported(firma);
    const sdFirma = _sdKey(firma);
    const anOrder = await sdBelege.getOrder(an, sdFirma);
    if (String(anOrder.orderType || '').toUpperCase() !== 'AN')
        throw new Error('createABFromAN: sevDesk-Vorgang ist Typ ' + anOrder.orderType + ', erwartet AN');
    const positions = (anOrder._positions || []).map(_sdOrderPosToKvPos);
    const _abHo = (anOrder.headText || '').toString().trim();
    const _abFo = (anOrder.footText || '').toString().trim();
    const ab = await sdBelege.createOrder(String(anOrder.contact.id), positions, {
        ...(_abHo ? { headText: _abHo } : {}),
        ...(_abFo ? { footText: _abFo } : {}),
        firma: sdFirma,
        orderType: 'AB',
        header: 'Auftragsbestätigung zu ' + anOrder.orderNumber,
        is13b: _is13bFromOrder(anOrder),
        customerInternalNote: opts.customerInternalNote || anOrder.customerInternalNote || anOrder.orderNumber,
        addressName: anOrder.addressName,
        addressStreet: anOrder.addressStreet,
        addressZip: anOrder.addressZip,
        addressCity: anOrder.addressCity,
    });
    if (!ab) throw new Error('sevdesk createOrder (AB) lieferte null');
    return {
        id: ab.id, number: ab.orderNumber, is_draft: true,
        _objectName: 'Order', _raw: ab,
        _predecessor: { id: anOrder.id, number: anOrder.orderNumber, type: 'AN' },
    };
}

async function createLIFromAB({ firma, ab, opts = {} }) {
    _ensureSupported(firma);
    const sdFirma = _sdKey(firma);
    const abOrder = await sdBelege.getOrder(ab, sdFirma);
    if (String(abOrder.orderType || '').toUpperCase() !== 'AB')
        throw new Error('createLIFromAB: sevDesk-Vorgang ist Typ ' + abOrder.orderType + ', erwartet AB');
    // opts.positions: explizite Subset (fuer Gewerk-Split). Sonst alle aus AB.
    const positions = (opts.positions && opts.positions.length)
        ? opts.positions
        : (abOrder._positions || []).map(_sdOrderPosToKvPos);
    const _liHo = (abOrder.headText || '').toString().trim();
    const _liFo = (abOrder.footText || '').toString().trim();
    const li = await sdBelege.createOrder(String(abOrder.contact.id), positions, {
        ...(_liHo ? { headText: _liHo } : {}),
        ...(_liFo ? { footText: _liFo } : {}),
        firma: sdFirma,
        orderType: 'LI',
        header: 'Lieferschein zu ' + abOrder.orderNumber + (opts.gewerk ? (' — ' + opts.gewerk) : ''),
        is13b: _is13bFromOrder(abOrder),
        customerInternalNote: opts.customerInternalNote || abOrder.customerInternalNote || abOrder.orderNumber,
        addressName: abOrder.addressName,
        addressStreet: abOrder.addressStreet,
        addressZip: abOrder.addressZip,
        addressCity: abOrder.addressCity,
    });
    if (!li) throw new Error('sevdesk createOrder (LI) lieferte null');
    return {
        id: li.id, number: li.orderNumber, is_draft: true,
        _objectName: 'Order', _raw: li,
        _predecessor: { id: abOrder.id, number: abOrder.orderNumber, type: 'AB' },
    };
}

async function createREFromAB({ firma, ab, opts = {} }) {
    _ensureSupported(firma);
    const sdFirma = _sdKey(firma);
    const abOrder = await sdBelege.getOrder(ab, sdFirma);
    if (String(abOrder.orderType || '').toUpperCase() !== 'AB')
        throw new Error('createREFromAB: sevDesk-Vorgang ist Typ ' + abOrder.orderType + ', erwartet AB');
    const positions = (abOrder._positions || []).map(_sdOrderPosToKvPos);
    const _reHo = (abOrder.headText || '').toString().trim();
    const _reFo = (abOrder.footText || '').toString().trim();
    const inv = await sdBelege.createInvoice(String(abOrder.contact.id), positions, {
        ...(_reHo ? { headText: _reHo } : {}),
        ...(_reFo ? { footText: _reFo } : {}),
        firma: sdFirma,
        invoiceType: 'RE',
        header: 'Rechnung zu ' + abOrder.orderNumber,
        is13b: _is13bFromOrder(abOrder),
        customerInternalNote: opts.customerInternalNote || abOrder.orderNumber,
        addressName: abOrder.addressName,
        addressStreet: abOrder.addressStreet,
        addressZip: abOrder.addressZip,
        addressCity: abOrder.addressCity,
    });
    if (!inv) throw new Error('sevdesk createInvoice (RE) lieferte null');
    return {
        id: inv.id, number: inv.invoiceNumber, is_draft: true,
        _objectName: 'Invoice', _raw: inv,
        _predecessor: { id: abOrder.id, number: abOrder.orderNumber, type: 'AB' },
    };
}

async function createARFromAB({ firma, ab, mode, value, abschlag_nr, opts = {} }) {
    _ensureSupported(firma);
    const sdFirma = _sdKey(firma);
    const abOrder = await sdBelege.getOrder(ab, sdFirma);
    if (String(abOrder.orderType || '').toUpperCase() !== 'AB')
        throw new Error('createARFromAB: sevDesk-Vorgang ist Typ ' + abOrder.orderType + ', erwartet AB');
    const fullPositions = (abOrder._positions || []).map(_sdOrderPosToKvPos);
    const partialPos = _applyPartialMode(fullPositions, mode, value, abOrder.orderNumber);
    let modeLabel;
    if (mode === 'percent')        modeLabel = 'Abschlag ' + value + '%';
    else if (mode === 'amount')    modeLabel = 'Abschlag ' + Number(value).toFixed(2) + ' €';
    else                            modeLabel = 'Abschlag Pos. ' + (Array.isArray(value) ? value.join(',') : value);
    const inv = await sdBelege.createInvoice(String(abOrder.contact.id), partialPos, {
        firma: sdFirma,
        invoiceType: 'AR',
        header: (abschlag_nr ? abschlag_nr + '. Abschlagsrechnung' : 'Abschlagsrechnung') + ' – ' + modeLabel + ' zu ' + abOrder.orderNumber,
        is13b: _is13bFromOrder(abOrder),
        customerInternalNote: opts.customerInternalNote || abOrder.orderNumber,
        addressName: abOrder.addressName,
        addressStreet: abOrder.addressStreet,
        addressZip: abOrder.addressZip,
        addressCity: abOrder.addressCity,
    });
    if (!inv) throw new Error('sevdesk createInvoice (AR) lieferte null');
    return {
        id: inv.id, number: inv.invoiceNumber, is_draft: true,
        _objectName: 'Invoice', _raw: inv,
        _predecessor: { id: abOrder.id, number: abOrder.orderNumber, type: 'AB' },
    };
}

async function createSRFromAB({ firma, ab, opts = {} }) {
    _ensureSupported(firma);
    const sdFirma = _sdKey(firma);
    const abOrder = await sdBelege.getOrder(ab, sdFirma);
    if (String(abOrder.orderType || '').toUpperCase() !== 'AB')
        throw new Error('createSRFromAB: sevDesk-Vorgang ist Typ ' + abOrder.orderType + ', erwartet AB');
    const priorARs = (await sdBelege.findInvoices(sdFirma, { invoiceType: 'RE' }))
        .filter(i => String(i.customerInternalNote || '').includes(abOrder.orderNumber) && String(i.header || '').toLowerCase().includes('abschlag'));
    const priorARSum = priorARs.reduce((sum, i) => sum + Number(i.sumNet || 0), 0);
    const fullPositions = (abOrder._positions || []).map(_sdOrderPosToKvPos);
    if (priorARSum > 0) {
        fullPositions.push({
            title: 'Abzug bereits gestellter Abschläge',
            subtitle: priorARs.map(a => a.invoiceNumber).join(', '),
            desc: 'Summe aller vorherigen Abschlagsrechnungen zu ' + abOrder.orderNumber,
            qty: 1,
            price: -priorARSum,
        });
    }
    const inv = await sdBelege.createInvoice(String(abOrder.contact.id), fullPositions, {
        firma: sdFirma,
        invoiceType: 'SR',
        header: 'Schlussrechnung zu ' + abOrder.orderNumber,
        is13b: _is13bFromOrder(abOrder),
        customerInternalNote: opts.customerInternalNote || abOrder.orderNumber,
        addressName: abOrder.addressName,
        addressStreet: abOrder.addressStreet,
        addressZip: abOrder.addressZip,
        addressCity: abOrder.addressCity,
    });
    if (!inv) throw new Error('sevdesk createInvoice (SR) lieferte null');
    return {
        id: inv.id, number: inv.invoiceNumber, is_draft: true,
        _objectName: 'Invoice', _raw: inv,
        _predecessor: { id: abOrder.id, number: abOrder.orderNumber, type: 'AB' },
        _ar_deduction: { invoices: priorARs.map(a => a.invoiceNumber), sumNet: priorARSum },
    };
}


/**
 * Inline-Variante (wird beim erstelleKV() ausgeloest):
 * KV → sevDesk Angebot (Order, orderType='AN', Entwurf).
 *
 * Wird mit ROHEN Argumenten aufgerufen (keine kvRow), weil das KV zu
 * diesem Zeitpunkt noch nicht im kv_cache ist.
 */

// Adresse aus kunde_json extrahieren fuer sevDesk Orders
function _extractAddress(kundeJson) {
    const kunde = typeof kundeJson === 'string' ? JSON.parse(kundeJson) : (kundeJson || {});
    const addrParts = (kunde.address || '').split('\n').filter(Boolean);
    const addrName = kunde.name || kunde.company_name || '';
    let addrStreet = '', addrZip = '', addrCity = '';
    for (const line of addrParts) {
        const m = line.match(/^(\d{5})\s+(.+)/);
        if (m) { addrZip = m[1]; addrCity = m[2]; }
        else if (line !== addrName && !line.startsWith('z. Hd.')) { addrStreet = addrStreet || line; }
    }
    return { addressName: addrName, addressStreet: addrStreet, addressZip: addrZip, addressCity: addrCity };
}


// Betreff mit Referenzkette: KV -> AN -> AB -> RE
function _buildBetreff(docType, docNummer, refNummer) {
    const labels = { AN: 'Angebot', AB: 'Auftragsbestätigung', RE: 'Rechnung' };
    const label = labels[docType] || docType;
    // Nur AN behaelt KV-Bezug; AB/LI/RE bekommen nur ihre eigene Nummer
    if (refNummer && docType === 'AN') return label + ' ' + docNummer + ' zu ' + refNummer;
    return label + ' ' + docNummer;
}

async function createAngebotInline({ firma, contactId, positionen, kvNummer, opts = {}, kunde = {} }) {
    _ensureSupported(firma);
    const sdFirma = _sdKey(firma);
    const _ot_pre = String(opts.orderType || 'AN').toUpperCase();

    // === AUTO-CLEANUP: vorherige Vorgaenge zur gleichen kvNummer entfernen.
    // Sucht orderType ohne status-Filter; loescht Entwurf (100) + Versendet (200).
    // Status >=500 (akzeptiert/abgelehnt/erledigt) bleibt unangetastet.
    if (kvNummer) {
        try {
            const _list = await sdBelege._req('GET', '/Order', {
                firma: sdFirma,
                params: { limit: 100, orderType: _ot_pre, 'orderBy[0][field]': 'id', 'orderBy[0][arrangement]': 'DESC' }
            });
            const items = (_list && _list.objects) || [];
            for (const cand of items) {
                if (String(cand.customerInternalNote || '').trim() !== kvNummer) continue;
                const candStatus = parseInt(cand.status, 10);
                if (candStatus !== 100 && candStatus !== 200) continue;
                try {
                    if (candStatus === 200) {
                        await sdBelege._req('PUT', `/Order/${cand.id}`, { firma: sdFirma, body: { status: 100 } });
                    }
                    await sdBelege._req('DELETE', `/Order/${cand.id}`, { firma: sdFirma });
                    console.log(`[auto-cleanup] alter ${_ot_pre} geloescht: ${cand.id} (${cand.orderNumber}, status=${candStatus})`);
                } catch (e) {
                    console.warn(`[auto-cleanup] DELETE ${cand.id} fehlgeschlagen: ${e.message}`);
                }
            }
        } catch (e) {
            console.warn(`[auto-cleanup] suche fehlgeschlagen: ${e.message}`);
        }
    }

    // === Adresse aus kunde-Objekt extrahieren
    const addrParts = (kunde.address || '').split('\n').filter(Boolean);
    const addrName = kunde.name || kunde.company_name || '';
    let addrStreet = '', addrZip = '', addrCity = '';
    for (const line of addrParts) {
        const m = line.match(/^(\d{5})\s+(.+)/);
        if (m) { addrZip = m[1]; addrCity = m[2]; }
        else if (line !== addrName && !line.startsWith('z. Hd.')) { addrStreet = line; }
    }
    // Erst Order anlegen (Entwurf), dann Betreff mit AN-Nummer updaten
    const _ho = (opts.vortext || '').toString().trim();
    const _fo = (opts.nachtext || '').toString().trim();
    const _ot = String(opts.orderType || 'AN').toUpperCase();
    const _typLabel = ({AN:'Angebot', AB:'Auftragsbestaetigung', LI:'Lieferschein'})[_ot] || 'Angebot';
    const order = await sdBelege.createOrder(contactId, positionen, {
        ...(_ho ? { headText: _ho } : {}),
        ...(_fo ? { footText: _fo } : {}),
        firma: sdFirma,
        orderType: _ot,
        header: (kvNummer && _ot === 'AN') ? (_typLabel + ' zu ' + kvNummer) : _typLabel,
        is13b: !!opts.is_13b,
        customerInternalNote: kvNummer || '',
        addressName: addrName,
        addressStreet: addrStreet,
        addressZip: addrZip,
        addressCity: addrCity,
    });
    if (!order) throw new Error('sevdesk createOrder lieferte null');

    // Auto-Confirm: status 100 -> 200 nach Final-Erstellung.
    // Preview-Path erreicht diesen Code nicht (sevDesk-Block ist gated mit !opts.preview_only).
    if (opts.autoConfirm !== false && !['AN','AB','LI'].includes(_ot_pre)) {
        try {
            await sdBelege._req('PUT', `/Order/${order.id}`, { firma: sdFirma, body: { status: 200 } });
            order.status = '200';
            console.log(`[auto-confirm] ${_ot} ${order.orderNumber} bestaetigt (status 200)`);
        } catch (e) {
            console.warn(`[auto-confirm] PUT status fehlgeschlagen: ${e.message}`);
        }
    }

    // Auto-OneDrive-Upload: PDF in OneDrive ablegen (User-Vorgabe 2026-04-30)
    if (opts.autoOnedrive !== false && kvNummer) {
        try {
            const kvRow = {
                firma: firma,
                kv_nummer: kvNummer,
                kunde_id: (kunde && (kunde.number || kunde.kundennr)) || '',
                kunde_name: (kunde && kunde.name) || '',
                kunde_json: kunde,
                positionen_json: (opts && opts.positionen) || positionen || [],
                opts_json: opts || {},
            };
            const docInfo = { id: order.id, number: order.orderNumber };
            const _typeMap = { AN: 'angebot', AB: 'ab', LI: 'lieferschein' };
            const _onedriveType = _typeMap[_ot] || 'angebot';
            const od = await module.exports.dropDocPdfToOneDrive(docInfo, kvRow, _onedriveType);
            order._onedrive = od;
            console.log(`[auto-onedrive] ${_ot} ${order.orderNumber} -> ${od.remote}`);
        } catch (e) {
            console.warn(`[auto-onedrive] Upload fehlgeschlagen: ${e.message}`);
        }
    }
    // Betreff mit AN-Nummer aktualisieren
    const betreff = _buildBetreff(_ot, order.orderNumber, kvNummer);
    try {
        const https = require('https');
        const apiKey = _loadSdKey(sdFirma);
        if (apiKey) {
            const body = JSON.stringify({ header: betreff });
            await new Promise((resolve, reject) => {
                const req = https.request('https://my.sevdesk.de/api/v1/Order/' + order.id, {
                    method: 'PUT',
                    headers: { Authorization: apiKey, 'Content-Type': 'application/json' },
                }, (res) => { let d = ''; res.on('data', c => d += c); res.on('end', () => { if (res.statusCode >= 400) return reject(new Error('PUT Order ' + res.statusCode + ': ' + d.slice(0,200))); resolve(d); }); res.on('error', reject); });
                req.on('error', reject);
                req.write(body);
                req.end();
            });
        }
    } catch (e) { console.error('Betreff-Update fehlgeschlagen:', e.message); }
    return {
        id: order.id,
        orderNumber: order.orderNumber,
        sumGross: order.sumGross,
        betreff: betreff,
        _objectName: 'Order',
    };
}

/**
 * sevDesk-Beleg PDF holen + nach OneDrive in firma-spezifischen Order schieben.
 * Nutzt PER_FIRMA_PATHS[firma][targetType] als Ziel.
 *
 * @param firma       slug
 * @param objectName  'Order' | 'Invoice'
 * @param docId       sevDesk-ID
 * @param docNumber   sevDesk-Belegnummer
 * @param targetType  'angebot' | 'ab' | 'rechnung'
 * @param kdnr        Kundennummer (Anzeige)
 * @param shortName   Kunden-Kurzname fuer Dateinamen
 */
async function dropSdDocPdfToOneDrive({ firma, objectName, docId, docNumber, targetType, kdnr, shortName, kvNummer }) {
    _ensureSupported(firma);
    if (targetType !== 'rechnung') throw new Error('VERBOTEN: sevDesk-PDF nur fuer Rechnung erlaubt');
    const sdFirma = _sdKey(firma);
    const num = docNumber || `DRAFT-${docId}`;
    const safeName = (shortName || 'Kunde').replace(/[\\/:*?"<>|\x00\r\n`]/g, '').replace(/\.{2,}/g,'').trim().slice(0, 50);
    let fname;
    if (targetType === 'angebot') {
        const kdnrShort = String(kdnr || 'unbekannt').replace(/^KU-\d{4}-/, "");
        fname = kvNummer ? `KV-${kvNummer.replace('KV-','')}-${kdnrShort}-${safeName}.pdf` : `Angebot-${num}-${kdnrShort}-${safeName}.pdf`;
    }
    else if (targetType === 'ab') {
        const kdnrShortAB = String(kdnr || 'unbekannt').replace(/^KU-\d{4}-/, "");
        fname = `${num}-${kdnrShortAB}-${safeName}.pdf`;
    }
    else if (targetType === 'rechnung') {
        const kdnrShortRE = String(kdnr || 'unbekannt').replace(/^KU-\d{4}-/, "");
        fname = `${num}-${kdnrShortRE}-${safeName}.pdf`;
    }
    else                                  fname = `${targetType}-${num}-${kdnr}.pdf`;
    const tmpPath = path.join('/tmp', fname);
    const buf = await sdBelege.getDocumentPdf(objectName, docId, sdFirma);
    if (!buf || buf.length < 100 || !buf.slice(0,4).toString().startsWith('%PDF')) throw new Error('Ungueltiges PDF (dropSd)');
    fs.writeFileSync(tmpPath, buf);
    const remote = uploadToOneDrive(tmpPath, firma, targetType);
    return { local: tmpPath, remote, filename: fname };
}

/**
 * KV → sevDesk Auftragsbestaetigung (Order, orderType='AB', Entwurf).
 * Wird via kvZuAB() aufgerufen, kv_cache-Row als Eingabe.
 */
async function createAB(kvRow) {
    throw new Error('createAB(kvRow) DEAKTIVIERT — Regel: AB muss aus sevDesk-AN gezogen werden. Nutze createABFromAN({firma, an}). Siehe feedback_dokumentenkette.md');
}

/**
 * KV → sevDesk Rechnung (Invoice, Entwurf).
 */
async function createInvoiceFromKv(kvRow) {
    throw new Error('createInvoiceFromKv(kvRow) DEAKTIVIERT — Regel: RE muss aus sevDesk-AB gezogen werden. Nutze createREFromAB({firma, ab}). Siehe feedback_dokumentenkette.md');
}

/**
 * KV → sevDesk Abschlagsrechnung (Invoice mit modifizierten Positionen).
 */
async function createPartialInvoiceFromKv(kvRow, mode, value) {
    throw new Error('createPartialInvoiceFromKv(kvRow) DEAKTIVIERT — Regel: AR muss aus sevDesk-AB gezogen werden. Nutze createARFromAB({firma, ab, mode, value}). Siehe feedback_dokumentenkette.md');
}

// ─────────────────────────────────────────────────────────────────────
// PDF download + OneDrive upload
// ─────────────────────────────────────────────────────────────────────

/**
 * PDF aus sevDesk ziehen (objectName aus Adapter-Result oder default Invoice).
 */
async function downloadDocPdf(doc, kvRow, localPath) {
    _ensureSupported(kvRow.firma);
    const sdFirma = _sdKey(kvRow.firma);
    const objectName = doc._objectName || 'Invoice';
    const buf = await sdBelege.getDocumentPdf(objectName, doc.id, sdFirma);
    if (!buf || buf.length < 100 || !buf.slice(0,4).toString().startsWith('%PDF')) throw new Error('Ungueltiges PDF (dl)');
    fs.writeFileSync(localPath, buf);
    return localPath;
}

/**
 * Lokale PDF nach OneDrive (rclone). Pfad firma-spezifisch.
 * @param firma   slug aus kvRow.firma
 * @param targetType 'kv' | 'ab' | 'rechnung'
 */
function uploadToOneDriveDetached(localPath, firma, targetType) {
    if (!ONEDRIVE_FIRMAS.has(firma)) {
        throw new Error(`Firma '${firma}' hat keine OneDrive-Pfade konfiguriert`);
    }
    const folder = _paths(firma)[targetType];
    if (!folder) throw new Error(`OneDrive-Typ '${targetType}' fuer firma '${firma}' unbekannt`);
    const dest = `${ONEDRIVE_REMOTE}:${folder}/`;
    const { spawn } = require('child_process');
    const args = _guardArgs(['copy', localPath, dest,
        '--no-traverse', '--transfers=4', '--checkers=4',
        '--ignore-checksum', '--no-gzip-encoding',
        '--timeout=60s', '--retries=2', '--buffer-size=0'
    ]);
    const logPath = '/opt/system/logs/onedrive_detached.log';
    try { fs.mkdirSync('/opt/system/logs', { recursive: true }); } catch(_) {}
    const out = fs.openSync(logPath, 'a');
    const err = fs.openSync(logPath, 'a');
    const child = spawn('rclone', args, { detached: true, stdio: ['ignore', out, err] });
    child.unref();
    return dest + path.basename(localPath);
}

function uploadToOneDrive(localPath, firma, targetType) {
    if (!ONEDRIVE_FIRMAS.has(firma)) {
        throw new Error(`Firma '${firma}' hat keine OneDrive-Pfade konfiguriert`);
    }
    const folder = _paths(firma)[targetType];
    if (!folder) throw new Error(`OneDrive-Typ '${targetType}' fuer firma '${firma}' unbekannt`);
    const dest = `${ONEDRIVE_REMOTE}:${folder}/`;
    try { execFileSync('rclone', _guardArgs(['copy', localPath, dest,
        '--no-traverse',
        '--fast-list',
        '--transfers=4',
        '--checkers=4',
        '--ignore-checksum',
        '--no-gzip-encoding',
        '--timeout=60s',
        '--low-level-retries=2',
        '--retries=1',
        '--buffer-size=0'
    ]), { stdio: 'pipe' }); } catch (e) { throw new Error('rclone upload failed: ' + (e.message || e)); } finally { try { if (String(localPath).startsWith('/tmp/') && fs.existsSync(localPath)) fs.unlinkSync(localPath); } catch (_) {} }
    return dest + path.basename(localPath);
}

function shortKundeName(kvRow) {
    const k = _parseJson(kvRow.kunde_json, {}) || {};
    let n = k.last_name
        || (k.company_name ? k.company_name.split(/[\s,]/)[0] : '')
        || (kvRow.kunde_name ? String(kvRow.kunde_name).split(/[\s,]/).pop() : '')
        || 'Kunde';
    return String(n).replace(/[\\/:*?"<>|]/g, '').trim();
}

function currentYyyymm() {
    const d = new Date();
    return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}`;
}

async function dropDocPdfToOneDrive(doc, kvRow, targetType) {
    _ensureSupported(kvRow.firma);
    const kdnr = kvRow.kunde_id || 'unbekannt';
    // PFLICHT-MUSTER (2026-04-14, keine Aenderung erlaubt):
    // <TYP>-<JAHR>-<NR>-<KDNR_KURZ>-<NACHNAME>.pdf  z.B. AB-2026-10188-10698-Dobre.pdf
    const name = shortKundeName(kvRow);
    const kdnrShort = String(kdnr || 'unbekannt').replace(/^KU-\d{4}-/, '').replace(/[^0-9]/g, '') || 'unbekannt';
    const year = new Date().getFullYear();
    const typeMap = { ab: 'AB', rechnung: 'RE', angebot: 'AN', kv: 'KV' };
    const typ = typeMap[targetType] || String(targetType).toUpperCase();
    let nr;
    if (doc && doc.number) {
        const m = String(doc.number).match(/(\d+)(?!.*\d)/);
        nr = m ? m[1] : String(doc.number).replace(/[^0-9]/g, '');
    } else if (targetType === 'ab') {
        const yyyymm = currentYyyymm();
        const n = await kvCache.nextAbCounter(yyyymm, kvRow.firma);
        nr = `${yyyymm}${String(n).padStart(2, '0')}`;
    } else {
        nr = `DRAFT${doc && doc.id ? doc.id : Date.now()}`;
    }
    const fname = `${typ}-${year}-${nr}-${kdnrShort}-${name}.pdf`;
    const tmpPath = path.join('/tmp', fname);
    // Lokaler Render via kv_node.html (NIE sevDesk-PDF) — Regel 2026-04-14
    if (targetType === 'ab' || targetType === 'angebot' || targetType === 'kv' || targetType === 'rechnung') {
        const gen = require('./generator');
        const docTypeMap = { ab: 'ab', angebot: 'angebot', kv: 'kv', rechnung: 'rechnung' };
        await gen.renderDocFromKvRow(kvRow, doc, docTypeMap[targetType], tmpPath);
    } else {
        await downloadDocPdf(doc, kvRow, tmpPath);
    }
    const remote = uploadToOneDrive(tmpPath, kvRow.firma, targetType);
    return { local: tmpPath, remote, filename: fname };
}

module.exports = {
    SAKAR_BRANDS,
    SUPPORTED_FIRMAS,
    ONEDRIVE_FIRMAS,
    PER_FIRMA_PATHS,
    createAngebotInline,
    createAB,
    createInvoiceFromKv,
    createLIFromAB,
    createPartialInvoiceFromKv,
    createABFromAN,
    createREFromAB,
    createARFromAB,
    createSRFromAB,
    downloadDocPdf,
    uploadToOneDrive,
    uploadToOneDriveDetached,
    dropDocPdfToOneDrive,
    dropSdDocPdfToOneDrive,
    resolveCustomerId,
};
