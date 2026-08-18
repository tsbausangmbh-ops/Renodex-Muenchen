/**
 * KV & Brief PDF Generator — Node.js + Puppeteer
 *
 * Nutzt das Original-Design.
 * Gleiches Template für alle 5 Firmen, nur Logo + Adresse wechseln.
 */
require('dotenv').config({ path: '/opt/system/.env' });

const puppeteer = require('puppeteer');

const nunjucks = require('nunjucks');
const path = require('path');
const fs = require('fs');
const { lookupKunde } = require('./customer_lookup');
const kvCache = require('./kv_cache');
const ebSync  = require('./belege_bridge');
const sdBelege = require('./sevdesk_belege');
const { registerDocument, buildOnedrivePath } = require('./crm_register');

// ============================================================
// Config
// ============================================================

const TEMPLATE_DIR = path.join(__dirname, '..', 'data', 'templates');
const OUTPUT_DIR = path.join(__dirname, '..', 'data', 'documents');

// Nunjucks Setup
const env = nunjucks.configure(TEMPLATE_DIR, { autoescape: true });

// PERF: Pre-compile templates on module load
const _compiledTemplates = {};
for (const tpl of ['kv_node.html', 'rechnung_node.html', 'brief_node.html']) {
    try { _compiledTemplates[tpl] = nunjucks.compile(fs.readFileSync(path.join(TEMPLATE_DIR, tpl), 'utf8'), env); } catch(_) {}
}
function renderTemplate(name, ctx) {
    if (_compiledTemplates[name]) return _compiledTemplates[name].render(ctx);
    return nunjucks.render(name, ctx);
}

// ============================================================
// §18b UStG (Reverse Charge, EU-Ausland B2B) — Helper
// User-Flag opts.is_18b. Kein Auto-Detect. Templates GESPERRT —
// Layout-Mapping intern is_18b -> is_13b (Brutto=Netto, keine MwSt-Zeile),
// HTML-Post-Patch ersetzt §13b-Boilerplate durch §18b DE+IT bilingual.
// ============================================================
function _is18bMode(opts) {
    return !!(opts && opts.is_18b);
}
function _layoutIs13b(opts) {
    // Wenn is_18b gesetzt: Layout wie §13b (taxRate=0, kein MwSt-Display),
    // aber der Boilerplate-Text wird per HTML-Post-Patch ausgetauscht.
    return !!(opts && (opts.is_13b || opts.is_18b));
}
const _RE_13B_HEADLINE = /<b>Hinweis zur Steuerschuldnerschaft gem\u00e4\u00df \u00a7 13b UStG:<\/b><br>[\s\S]*?Finanzamt abzuf\u00fchren\./g;
const _RE_13B_HEADLINE_ASCII = /<b>Hinweis zur Steuerschuldnerschaft gem\xe4\xdf \xa7 13b UStG:<\/b><br>[\s\S]*?Finanzamt abzuf\xfchren\./g;
function _applyIs18bHtmlPatch(html, opts) {
    if (!_is18bMode(opts)) return html;
    var de18b = '<b>Steuerhinweis gem. \u00a7 18b UStG (Reverse Charge, EU-Ausland):</b><br>F\u00fcr die in dieser Rechnung aufgef\u00fchrten Leistungen gilt die Steuerschuldnerschaft des Leistungsempf\u00e4ngers gem. \u00a7 18b UStG i.V.m. Art. 196 MwStSystRL. Die Umsatzsteuer ist vom Leistungsempf\u00e4nger im Ankunftsland zu entrichten.';
    var it18b = '<i><b>Avviso fiscale ai sensi dell\'art. 196 Direttiva 2006/112/CE (Reverse Charge UE):</b><br>Per le prestazioni indicate in questa fattura si applica l\'inversione contabile. L\'IVA \u00e8 dovuta dal committente nel paese di destinazione.</i>';
    var replacement = de18b + '<br><br>' + it18b;
    // Beide Templates haben EXAKT denselben §13b-Boilerplate-Text (kv_node.html + rechnung_node.html)
    // Nunjucks rendert die echten Umlaute (autoescape rendert HTML-Entities NICHT bei | safe; hier ist es kein safe-Filter, aber Text mit echten ae/oe/ue Buchstaben → raw match)
    var pattern = /<b>Hinweis zur Steuerschuldnerschaft gem\u00e4\u00df \u00a7 13b UStG:<\/b><br>[\s\S]*?Finanzamt abzuf\u00fchren\./g;
    var before = html;
    html = html.replace(pattern, replacement);
    // Falls Nunjucks autoescape die §-Zeichen escaped (§ -> &#167;), zweite Variante
    var pattern2 = /<b>Hinweis zur Steuerschuldnerschaft gem(?:\u00e4|&#228;|\xe4)\u00df &#167; 13b UStG:<\/b><br>[\s\S]*?Finanzamt abzuf(?:\u00fc|&#252;|\xfc)hren\./g;
    html = html.replace(pattern2, replacement);
    return html;
}


// Custom Filter: deutsches Währungsformat
env.addFilter('currency', (val) => {
    if (val == null) return '0,00';
    return Number(val).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
});

// Custom Filter: deutsches Datum
env.addFilter('datum', (val, lang) => {
    if (!val) return '';
    const d = typeof val === 'string' ? new Date(val) : val;
    if (lang === 'hr') {
        return d.toLocaleDateString('hr-HR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
});

// ============================================================
// Firmen-Profile - MIGRIERT 2026-04-11 auf Live-Lookup via loadFirma()
// Master-Quelle: Postgres `firma_templates` (system_db)
// FIRMEN_FALLBACK = Safety-Net falls DB nicht erreichbar (Polizei-pflicht)
// ============================================================

const FIRMEN_FALLBACK = {
    '089dach': {
        firma_name: '089Dach GmbH',
        owner: 'Falko Georg Blöckinger',
        header_text: '089Dach GmbH · Thuillestr. 20 · 81247 München',
        address: '089Dach GmbH\nThuillestr. 20\n81247 München',
        phone: '+49 89 12621964',
        email: 'info@089dach.de',
        website: 'https://089dach.de',
        tax_id: 'DE460844566',
        primary_color: '#8B1A1A',
        logo_path: path.join(TEMPLATE_DIR, 'logos', '089dach.jpg'),
        bank_details: 'Zahlungsempfänger: 089Dach GmbH\nBankverbindung: Qonto / Olinda Zweigniederlassung Deutschland, BIC QNTODEB2XXX | IBAN DE32 1001 0123 2946 8372 70\nHinweis: Bitte immer die Rechnungsnummer angeben!',
        footer_text: 'Geschäftsführer: Falko Georg Blöckinger | Handelsregisternummer: HRB 305535 | Zuständiges Amtsgericht: München | Sitz der Firma: München',
    },
    'sakar': {
        firma_name: 'Mustafa Sakar',
        owner: 'Mustafa Sakar',
        header_text: 'Mustafa Sakar \u00b7 Hardenbergstr. 4 \u00b7 80992 M\u00fcnchen · München',
        address: 'Firma Mustafa Sakar\nMustafa Sakar\nMünchen',
        phone: '+49 89 444438872',
        email: 'info@aquapro24.de',
        website: 'https://aquapro24.de',
        tax_id: '146/182/41913',
        primary_color: '#0d47a1',
        logo_path: path.join(TEMPLATE_DIR, 'logos', 'sakar.png'),
        bank_details: 'Zahlungsempf\u00e4nger: Mustafa Sakar\nBankverbindung: Finom, BIC FNOMDEB2 | IBAN DE52 1001 8000 0925 8798 27\nHinweis: Bitte immer die Rechnungsnummer angeben!',
        footer_text: 'Inhaber: Mustafa Sakar | Steuernummer: 146/182/41913 | Sitz der Firma: M\u00fcnchen',
    },
    '089bayern': {
        firma_name: '089Bayern Ltd',
        owner: 'Mustafa Sakar',
        header_text: '089Bayern Ltd · Türkei',
        address: '089Bayern Ltd\nMustafa Sakar\nTürkei',
        phone: '+49 173 5994699 / +90 507 183 2036',
        email: 'info@089bayern.de',
        website: 'https://089bayern.de',
        tax_id: '---',
        primary_color: '#1b5e20',
        lang: 'tr',
        logo_path: path.join(TEMPLATE_DIR, 'logos', '089bayern.png'),
        bank_details: 'Zahlungsempf\u00e4nger: 089Bayern Ltd\nBankverbindung: Commerzbank, BIC COBADEFFXXX | IBAN DE11 2233 4455 6677 8899 00\nHinweis: Bitte immer die Rechnungsnummer angeben!',
        footer_text: 'Gesch\u00e4ftsf\u00fchrung: 089Bayern Ltd | Sitz der Firma: M\u00fcnchen | Tel DE: +49 173 5994699 | Tel TR: +90 507 183 2036',
    },
    'kshw-do': {
        firma_name: 'KSHWmont d.o.o',
        owner: 'Dalibor Bakmaz',
        header_text: 'KSHWmont d.o.o · Zagreb, Hrvatska',
        address: 'KSHWmont d.o.o\nDalibor Bakmaz\nZagreb, Hrvatska',
        phone: '+385 95 850 5803',
        email: 'info@kshwmont.com',
        website: 'https://kshwmont.com',
        tax_id: '41053033941',
        tax_label: 'OIB',
        primary_color: '#b71c1c',
        lang: 'hr',
        logo_path: path.join(TEMPLATE_DIR, 'logos', 'kshw-do.png'),
        bank_details: 'Primatelj: KSHWmont d.o.o.\nBanka:\nRevolut, BIC REVOLT21 | IBAN LT92 3250 0714 7342 9234\nZagrebačka banka, BIC ZABAHR2X | IBAN HR42 2360 0001 1013 6455 3\nNapomena: Molimo navedite broj računa!',
        footer_text: 'Direktor: Dalibor Bakmaz | OIB: 41053033941 | MB: 00403105 | Trgovački sud u Zagrebu | Sjedište: Zagreb, Hrvatska | Tel HR: +385 95 850 5803',
    },
    'aquapro24': {
        firma_name: 'Mustafa Sakar',
        owner: 'Mustafa Sakar',
        header_text: 'Mustafa Sakar \u00b7 Hardenbergstr. 4 \u00b7 80992 M\u00fcnchen (AquaPro24)',
        address: 'Mustafa Sakar\nHardenbergstr. 4\n80992 M\u00fcnchen',
        phone: '+49 89 444438872',
        email: 'info@aquapro24.de',
        website: 'https://aquapro24.de',
        tax_id: '146/182/41913',
        primary_color: '#0d5c2e',
        logo_path: path.join(TEMPLATE_DIR, 'logos', 'aquapro24.png'),
        bank_details: 'Zahlungsempf\u00e4nger: Mustafa Sakar\nBankverbindung: Finom, BIC FNOMDEB2 | IBAN DE52 1001 8000 0925 8798 27\nHinweis: Bitte immer die Rechnungsnummer angeben!',
        footer_text: 'Inhaber: Mustafa Sakar | Steuernummer: 146/182/41913 | Sitz der Firma: M\u00fcnchen',
    },
    'estriche': {
        firma_name: 'Estriche M\u00fcnchen \u00b7 089Dach GmbH',
        owner: 'Falko Georg Bl\u00f6ckinger',
        header_text: 'Estriche M\u00fcnchen \u00b7 089Dach GmbH \u00b7 Thuillestr. 20 \u00b7 81247 M\u00fcnchen',
        address: '089Dach GmbH\nThuillestr. 20\n81247 M\u00fcnchen',
        phone: '+49 89 444438872',
        email: 'info@estriche-muenchen.de',
        website: 'https://estriche-muenchen.de',
        tax_id: '143/127/61778',
        primary_color: '#8B4513',
        logo_path: path.join(TEMPLATE_DIR, 'logos', 'estriche.png'),
        bank_details: 'Zahlungsempf\u00e4nger: 089Dach GmbH\nBankverbindung: Qonto, BIC QNTODEB2XXX | IBAN DE32 1001 0123 2946 8372 70\nHinweis: Bitte immer die Rechnungsnummer angeben!',
        footer_text: 'Gesch\u00e4ftsf\u00fchrer: Falko Georg Bl\u00f6ckinger | HRB 305535 (AG M\u00fcnchen) | USt-IdNr DE460844566 | Steuernr 143/127/61778 | Sitz: M\u00fcnchen',
    },
    '089sanierer': {
        firma_name: '089-Sanierer \u00b7 089Dach GmbH',
        owner: 'Falko Georg Bl\u00f6ckinger',
        header_text: '089-Sanierer \u00b7 089Dach GmbH \u00b7 Thuillestr. 20 \u00b7 81247 M\u00fcnchen',
        address: '089Dach GmbH\nThuillestr. 20\n81247 M\u00fcnchen',
        phone: '+49 89 444438872',
        email: 'info@089-sanierer.de',
        website: 'https://089-sanierer.de',
        tax_id: '143/127/61778',
        primary_color: '#1a237e',
        logo_path: path.join(TEMPLATE_DIR, 'logos', '089sanierer.png'),
        bank_details: 'Zahlungsempf\u00e4nger: 089Dach GmbH\nBankverbindung: Qonto, BIC QNTODEB2XXX | IBAN DE32 1001 0123 2946 8372 70\nHinweis: Bitte immer die Rechnungsnummer angeben!',
        footer_text: 'Gesch\u00e4ftsf\u00fchrer: Falko Georg Bl\u00f6ckinger | HRB 305535 (AG M\u00fcnchen) | USt-IdNr DE460844566 | Steuernr 143/127/61778 | Sitz: M\u00fcnchen',
    },
    'sanitär-muenchen': {
        firma_name: 'Sanit\u00e4r M\u00fcnchen \u00b7 089Dach GmbH',
        owner: 'Falko Georg Bl\u00f6ckinger',
        header_text: 'Sanit\u00e4r M\u00fcnchen \u00b7 089Dach GmbH \u00b7 Thuillestr. 20 \u00b7 81247 M\u00fcnchen',
        address: '089Dach GmbH\nThuillestr. 20\n81247 M\u00fcnchen',
        phone: '+49 89 444438872',
        email: 'info@sanitär-muenchen.de',
        website: 'https://sanitär-muenchen.de',
        tax_id: '143/127/61778',
        primary_color: '#00838f',
        logo_path: path.join(TEMPLATE_DIR, 'logos', 'sanitär-muenchen.png'),
        bank_details: 'Zahlungsempf\u00e4nger: 089Dach GmbH\nBankverbindung: Qonto, BIC QNTODEB2XXX | IBAN DE32 1001 0123 2946 8372 70\nHinweis: Bitte immer die Rechnungsnummer angeben!',
        footer_text: 'Gesch\u00e4ftsf\u00fchrer: Falko Georg Bl\u00f6ckinger | HRB 305535 (AG M\u00fcnchen) | USt-IdNr DE460844566 | Steuernr 143/127/61778 | Sitz: M\u00fcnchen',
    },
    'extrucon': {
        firma_name: 'ExtruCon GmbH',
        owner: 'Dalibor Bakmaz',
        header_text: 'ExtruCon GmbH \u00b7 M\u00fcnchen',
        address: 'ExtruCon GmbH\nM\u00fcnchen',
        phone: '+385 95 850 5803',
        email: 'info@extrucon.de',
        website: 'https://extrucon.de',
        tax_id: 'HR41053033941',
        primary_color: '#1a237e',
        lang: 'de',  // 2026-04-08: explizit deutsch (Stamm-Daten kroatisch belassen per User-Wunsch)
        logo_path: path.join(TEMPLATE_DIR, 'logos', 'extrucon.png'),
        bank_details: 'Zahlungsempfänger: KSHWmont d.o.o.\nBankverbindung:\nRevolut, BIC REVOLT21 | IBAN LT92 3250 0714 7342 9234\nZagrebačka banka, BIC ZABAHR2X | IBAN HR42 2360 0001 1013 6455 3\nHinweis: Bitte immer die Rechnungsnummer angeben!',
        footer_text: 'Geschäftsführer: Dalibor Bakmaz | OIB: 41053033941 | MB: 00403105 | Handelsgericht: Zagreb | Sitz der Firma: Zagreb / München | Tel HR: +385 95 850 5803',
    },
};

// ============================================================
// loadFirma() - Live-Lookup aus Postgres firma_templates
// Migration 2026-04-11: ersetzt FIRMEN-Hardcoded-Dict.
// Cache TTL 60s (Map firma_id -> {data, ts})
// Fallback: FIRMEN_FALLBACK (Safety-Net, wird von Polizei geprueft)
// ============================================================

const { Pool: _FirmaPool } = require('pg');
const _firmaPool = new _FirmaPool({
    connectionString: process.env.DATABASE_URL,
    max: 2,
});
const _firmaCache = new Map();
const _FIRMA_CACHE_TTL_MS = 3600 * 1000; // 1h — Templates aendern sich selten

const _logoCache = new Map();
function _resolveLogoPath(firmaId, dbLogoName) {
    // 1) Wenn DB-Feld 'logo' gesetzt ist und Datei existiert -> nutzen
    const logosDir = path.join(TEMPLATE_DIR, 'logos');
    if (dbLogoName) {
        const direct = path.join(logosDir, dbLogoName);
        if (fs.existsSync(direct)) return direct;
        // Ohne Suffix?
        const base = dbLogoName.replace(/\.[^.]+$/, '');
        for (const ext of ['png', 'jpg', 'jpeg', 'webp']) {
            const p2 = path.join(logosDir, base + '.' + ext);
            if (fs.existsSync(p2)) return p2;
        }
    }
    // 2) Fallback: <firma_id>.{png,jpg,webp}
    for (const ext of ['png', 'jpg', 'jpeg', 'webp']) {
        const p2 = path.join(logosDir, firmaId + '.' + ext);
        if (fs.existsSync(p2)) return p2;
    }
    // 3) Fallback aus FIRMEN_FALLBACK
    const fb = FIRMEN_FALLBACK[firmaId];
    if (fb && fb.logo_path && fs.existsSync(fb.logo_path)) return fb.logo_path;
    return null;
}

const FOOTER_LABELS = {
    'de': { zahlungsempfaenger: 'Zahlungsempfänger', bankverbindung: 'Bankverbindung', hinweis: 'Hinweis: Bitte immer die Rechnungsnummer angeben!', geschaeftsfuehrer: 'Geschäftsführer', direktor: 'Direktor', hrb: 'Handelsregisternummer', amtsgericht: 'Zuständiges Amtsgericht', sitz: 'Sitz der Firma', ust: 'USt-IdNr.', oib: 'OIB', vergi: 'Vergi No.' },
    'hr': { zahlungsempfaenger: 'Primatelj plaćanja', bankverbindung: 'Podaci o banci', hinweis: 'Napomena: Molimo uvijek navesti broj računa!', geschaeftsfuehrer: 'Direktor', direktor: 'Direktor', hrb: 'Matični broj', amtsgericht: 'Nadležni sud', sitz: 'Sjedište', ust: 'OIB', oib: 'OIB', vergi: 'Vergi No.' },
    'tr': { zahlungsempfaenger: 'Ödeme alıcısı', bankverbindung: 'Banka bilgileri', hinweis: 'Not: Lütfen her zaman fatura numarasını belirtin!', geschaeftsfuehrer: 'Genel Müdür', direktor: 'Genel Müdür', hrb: 'Ticaret Sicil No', amtsgericht: 'Yetkili mahkeme', sitz: 'Şirket merkezi', ust: 'Vergi No.', oib: 'OIB', vergi: 'Vergi No.' },
};

function _mapRowToProfile(firmaId, row) {
    const fb = FIRMEN_FALLBACK[firmaId] || {};
    const name = row.name || fb.firma_name || firmaId;
    const gf = row.geschaeftsfuehrer || fb.owner || '';
    const adresse = row.adresse || '';
    const plz = row.plz || '';
    const ort = row.ort || '';
    const header_text = [name, adresse, [plz, ort].filter(Boolean).join(' ')]
        .filter(Boolean).join(' \u00b7 ') || fb.header_text || name;
    const address = [name, adresse, [plz, ort].filter(Boolean).join(' ')]
        .filter(Boolean).join('\n') || fb.address || name;
    // Sprache-Determination fuer Footer-Labels
    let lang = fb.lang || 'de';
    if (firmaId === 'kshw-do' || firmaId === 'kshwmont') lang = 'hr';
    if (firmaId === '089bayern') lang = fb.lang || 'tr';
    const FL = FOOTER_LABELS[lang] || FOOTER_LABELS['de'];
    // bank_details zusammenbauen (lang-aware)
    let bank_details = fb.bank_details || '';
    if (row.bank || row.iban) {
        const bankLine = [row.bank, row.bic ? 'BIC ' + row.bic : null, row.iban ? 'IBAN ' + row.iban : null]
            .filter(Boolean).join(' | ') || '';
        const _zahlEmpf = row.zahlungsempfaenger || row.absender || name;
        bank_details = FL.zahlungsempfaenger + ': ' + _zahlEmpf +
            '\nBankverbindung: ' + bankLine +
            '\nHinweis: Bitte immer die Rechnungsnummer angeben!';
    }
    // footer_text
    let footer_text = fb.footer_text || '';
    const footerParts = [];
    const gfLabel = row.gf_label || (lang === 'hr' ? FL.direktor : FL.geschaeftsfuehrer);
    if (gf) footerParts.push(gfLabel + ': ' + gf);
    if (row.geschaeftsfuehrer2) footerParts.push((row.gf_label2 || gfLabel) + ': ' + row.geschaeftsfuehrer2);
    if (row.hrb && row.hrb !== '---') footerParts.push(FL.hrb + ': ' + row.hrb);
    if (row.amtsgericht) footerParts.push(FL.amtsgericht + ': ' + row.amtsgericht);
    if (row.sitz) footerParts.push(FL.sitz + ': ' + row.sitz);
    const ustLabel = lang === 'hr' ? FL.oib : (lang === 'tr' ? FL.vergi : FL.ust);
    if (row.ust_nr && row.ust_nr !== '---') footerParts.push(ustLabel + ': ' + row.ust_nr);
    if (footerParts.length) footer_text = footerParts.join(' | ');
    // Bewahre Tel-Segmente (z.B. Tel HR / Tel DE) aus FIRMEN_FALLBACK.footer_text
    if (fb.footer_text) {
        const fbTelSegs = fb.footer_text.split(' | ').filter(x => /^Tel\s/.test(x));
        for (const seg of fbTelSegs) {
            if (!footer_text.includes(seg)) {
                footer_text = footer_text ? (footer_text + ' | ' + seg) : seg;
            }
        }
    }
    // lang already set above
    // tax_id / tax_label
    const tax_id = row.ust_nr || fb.tax_id || '---';
    const tax_label = fb.tax_label || (lang === 'hr' ? 'OIB' : 'USt-IdNr.');
    // FIX (2026-04-24): signer-name aus row.signatur wenn einzelner Name (nicht Grußformel/Team/Tel)
    const _isNameOnly = row.signatur
        && typeof row.signatur === "string"
        && !row.signatur.includes("\n")
        && !/team|gr[uü]ßen|gruessen|poštov|saygılar|tel\s/i.test(row.signatur)
        && row.signatur.trim().length > 2;
    let _ownerFinal = _isNameOnly ? row.signatur.trim() : gf;
    // 2026-05-05: Marken-Team-Schluss-Override — letzte Zeile aus 2-zeiliger signatur
    if (row.signatur && row.signatur.indexOf(String.fromCharCode(10)) >= 0) {
        const _sl = row.signatur.split(String.fromCharCode(10)).map(s => s.trim()).filter(Boolean);
        const _last = _sl[_sl.length - 1] || '';
        if (/^Ihr\s.+\sTeam$/i.test(_last)) _ownerFinal = _last;
    }
    return {
        firma_slug: firmaId,
        firma_name: name,
        owner: _ownerFinal,
        header_text,
        address,
        phone: row.telefon || fb.phone || '',
        email: row.email || fb.email || '',
        website: row.website || fb.website || '',
        tax_id,
        tax_label,
        primary_color: row.farbe || fb.primary_color || '#000000',
        lang,
        logo_path: _resolveLogoPath(firmaId, row.logo),
        bank_details,
        footer_text,
        zahlungsempfaenger: row.zahlungsempfaenger || row.absender || name,
        _source: 'db',
    };
}

async function loadFirma(firmaId) {
    // Cache check
    const cached = _firmaCache.get(firmaId);
    const now = Date.now();
    if (cached && (now - cached.ts) < _FIRMA_CACHE_TTL_MS) {
        return cached.data;
    }
    try {
        const r = await _firmaPool.query(
            'SELECT firma_id, name, absender, logo, website, email, telefon, ust_nr, gf_label, ' +
            '       geschaeftsfuehrer, hrb, amtsgericht, sitz, bank, bic, iban, ' +
            '       adresse, plz, ort, farbe, akzent, zahlungsziel, gewaehrleistung, signatur, zahlungsempfaenger, geschaeftsfuehrer2, gf_label2 ' +
            '  FROM firma_templates WHERE firma_id = $1 LIMIT 1',
            [firmaId]
        );
        if (r.rows.length) {
            const profile = _mapRowToProfile(firmaId, r.rows[0]);
            _firmaCache.set(firmaId, { data: profile, ts: now });
            return profile;
        }
        console.error('loadFirma[' + firmaId + '] keine DB-Zeile, nutze FIRMEN_FALLBACK'); // best-effort, bewusst ignoriert
    } catch (e) {
        console.error('loadFirma[' + firmaId + '] DB-Fehler:', e.message); // best-effort, bewusst ignoriert
    }
    // Fallback
    const fb = FIRMEN_FALLBACK[firmaId];
    if (!fb) return null;
    const profile = { ...fb, _source: 'fallback' };
    _firmaCache.set(firmaId, { data: profile, ts: now });
    return profile;
}

// ============================================================
// Berechnungen
// ============================================================


// FIX (2026-04-24): untertitel sanitizer — Grußformel/Signaturen aus Untertitel strippen
function _sanitizeUntertitel(str) {
    if (!str) return "";
    return String(str)
        .replace(/\s*\bMit freundlichen Gr[üu]ßen\b[\s\S]*/i, "")
        .replace(/\s*\bFreundliche Gr[üu]ße\b[\s\S]*/i, "")
        .replace(/\s*\bViele Gr[üu]ße\b[\s\S]*/i, "")
        .replace(/\s*\bFür Rückfragen\b[\s\S]*/i, "")
        .replace(/\s*\bS poštovanjem\b[\s\S]*/i, "")
        .replace(/\s*\bSaygılar(ımızla)?\b[\s\S]*/i, "")
        .replace(/\s*\[[^\]]{1,80}\]/g, "")
        .trim();
}

function calcTotals(positions, taxRate = 19.0, discountPercent = 0) {
    const net = positions.reduce((sum, p) => sum + (p.qty ?? 1) * (p.price ?? 0), 0);
    const discount = net * discountPercent / 100;
    const netAfterDiscount = net - discount;
    // C3 Fix 2026-04-15: gruppiere nach pos.tax_rate (Default = taxRate)
    const groups = {};
    const scale = netAfterDiscount / (net || 1); // Rabatt proportional
    for (const p of positions) {
        const rate = (p.tax_rate != null) ? Number(p.tax_rate) : taxRate;
        const ln = (p.qty ?? 1) * (p.price ?? 0) * scale;
        if (!groups[rate]) groups[rate] = { rate, net: 0, tax: 0 };
        groups[rate].net += ln;
    }
    const tax_groups = Object.values(groups).map(g => ({
        rate: g.rate,
        net: Math.round(g.net * 100) / 100,
        tax: Math.round(g.net * g.rate) / 100,
    }));
    const tax = tax_groups.reduce((s, g) => s + g.tax, 0);
    const gross = netAfterDiscount + tax;
    return {
        net: Math.round(net * 100) / 100,
        discount: Math.round(discount * 100) / 100,
        net_after_discount: Math.round(netAfterDiscount * 100) / 100,
        tax_rate: taxRate,
        tax: Math.round(tax * 100) / 100,
        tax_groups,
        gross: Math.round(gross * 100) / 100,
    };
}

function formatDePhone(p) {
    if (!p) return '';
    let str = String(p).trim();
    if (!str) return '';
    if (str.startsWith('+')) return str;
    if (str.startsWith('00')) return '+' + str.slice(2).replace(/^\s*/, '');
    if (str.startsWith('0'))  return '+49 ' + str.slice(1).replace(/^\s*/, '');
    return '+49 ' + str;
}

// ========================================================================
// KV-PRE-FLIGHT VALIDATOR  (eingebaut 2026-04-08, Schmid-Eskalation)
// Erzwingt verbotene-Phrasen-Filter, Preisspannen-Detektion und B2B-Check
// auf ALLE Caller (Claude, Telegram, Terminal). Wirft hart bei Verletzung.
// ========================================================================
const KV_FORBIDDEN_PHRASES = [
    /Marktpreis/i,
    /Aufschlag/i,
    /Kalkulation\s+auf\s+Basis/i,
    /zzgl\.?\s*%?\s*Aufschlag/i,
    /Mittelwert/i,
    /Sch[aä]tzung/i,
    /Preisspanne/i,
];
const KV_PRICE_RANGE_RE = /(\d+(?:[.,]\d+)?)\s*[-\u2013\u2014]\s*(\d+(?:[.,]\d+)?)\s*€/;

function validateNoForbiddenPhrases(text, where) {
    if (!text) return;
    const t = String(text);
    for (const re of KV_FORBIDDEN_PHRASES) {
        if (re.test(t)) {
            throw new Error('KV-PFLICHT-VERLETZUNG: verbotene Phrase /' + re.source + '/ in ' + where + ': "' + t.slice(0, 160) + '"');
        }
    }
    const m = t.match(KV_PRICE_RANGE_RE);
    if (m) {
        throw new Error('KV-PFLICHT-VERLETZUNG: Preisspanne in ' + where + ' ("' + m[0] + '"). Regel: immer Obergrenze einsetzen, keine Spannen.');
    }
}

function validateKVInputs(kunde, positionen, opts) {
    if (opts && opts.skipPhraseCheck) return;
    validateNoForbiddenPhrases(opts && opts.vortext, 'opts.vortext');
    validateNoForbiddenPhrases(opts && opts.nachtext, 'opts.nachtext');
    validateNoForbiddenPhrases(opts && opts.notes, 'opts.notes');
    validateNoForbiddenPhrases(opts && opts.titel, 'opts.titel');
    validateNoForbiddenPhrases(opts && opts.untertitel, 'opts.untertitel');
    const arr = positionen || [];
    for (let i = 0; i < arr.length; i++) {
        const pos = arr[i] || {};
        validateNoForbiddenPhrases(pos.title, 'positionen[' + i + '].title');
        validateNoForbiddenPhrases(pos.subtitle, 'positionen[' + i + '].subtitle');
        validateNoForbiddenPhrases(pos.desc, 'positionen[' + i + '].desc');
    }
    // B2B-Header-Warnung (nicht throw — nur warn)
    if (kunde && typeof kunde === 'object') {
        const firma = (kunde.firma || '').toString().trim();
        const addr  = (kunde.address || kunde.customer_address || '').toString();
        if (firma && addr && !/z\.?\s*Hd\.?/i.test(addr)) {
            console.warn('KV-B2B-WARNUNG: kunde.firma="' + firma + '" gesetzt, aber address enthaelt kein "z. Hd." — pruefe B2B-Header');
        }
    }
}

function formatDate(d) {
    if (!d) d = new Date();
    if (typeof d === 'string') d = new Date(d);
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}


// 2026-05-08: Kapitel-Untertitel-Expansion (Template gesperrt — subtitle als gruppe-Row eingeschoben)
function expandKapitelSubtitles(positionen) {
    if (!Array.isArray(positionen)) return positionen;
    const result = [];
    for (const pos of positionen) {
        result.push(pos);
        if (pos.kapitel && pos.subtitle && String(pos.subtitle).trim()) {
            result.push({ gruppe: true, title: String(pos.subtitle).trim(), _kapitel_subtitle: true });
        }
    }
    return result;
}

const FIRMA_PREFIX = {
    '089dach': '089D',
    'sakar': 'Sanitär',
    '089bayern': '089B',
    'kshw-do': 'KSHWmont',
    'kshw-muc': 'KSHW-MUC',
    'extrucon': 'ExtruCon',
    'aquapro24': 'Aqua',
    'estriche': 'Est',
    '089sanierer': '089-Sa',
};
const LABELS = {
    'de': {
        info_title: 'So erreichen Sie uns',
        internet: 'Internet',
        email: 'E-Mail',
        telefon: 'Telefon',
        kundennummer: 'Kundennummer',
        kundentelefon: 'Kundentelefon',
        kunden_email: 'Kunden-E-Mail',
        datum: 'Datum',
        kv_titel: 'Kostenvoranschlag',
        pos: 'Pos',
        menge: 'Menge',
        bezeichnung: 'Bezeichnung',
        einzelpreis: 'Einzelpreis',
        betrag: 'Betrag',
        netto: 'Netto:',
        mwst: 'zzgl. {rate}% MwSt:',
        brutto: 'Betrag brutto:',
        anrede: 'Sehr geehrte Damen und Herren,',
        einleitung: 'wir bedanken uns herzlich f\u00fcr Ihr Interesse und Ihrem Vertrauen, das Sie uns mit Ihrer Anfrage entgegengebracht haben. Es freut uns sehr, Ihnen heute unseren ma\u00dfgeschneiderten Kostenvoranschlag unterbreiten zu d\u00fcrfen, das genau auf Ihre Bed\u00fcrfnisse zugeschnitten ist.',
        gueltigkeit: 'Der vorliegende Kostenvoranschlag ist unverbindlich {days} Tage g\u00fcltig.',
        ab_bestaetigung: 'Es erh\u00e4lt erst durch unsere schriftliche Auftragsbest\u00e4tigung G\u00fcltigkeit.',
        vertragsgrundlage_titel: 'Vertragsgrundlage:',
        vertragsgrundlage: 'Es gilt \u00a7 650a BGB ( Bauvertrag ), in seiner jeweils g\u00fcltigen Fassung.',
        gewaehrleistung_titel: 'Gew\u00e4hrleistung:',
        gewaehrleistung: 'Nach BGB, 5 Jahre',
        zahlung_titel: 'Zahlung:',
        zahlung: 'Das Zahlungsziel wird mit der Auftragsbest\u00e4tigung festgelegt.<br>Zahlungen sind nach Rechnungstellung innerhalb von 5 Tagen ohne Skontoabzug zu leisten.<br>Die Abschlagszahlungen werden mit der Auftragsbest\u00e4tigung separat berechnet und mitgeteilt.',
        zusatzarbeiten_titel: 'Zusatzarbeiten:',
        zusatzarbeiten: 'Leistungen, die nicht in diesem Kostenvoranschlag enthalten sind, werden nach Aufma\u00df und vorheriger Absprache vor Ort zu den jeweiligen Regiestundens\u00e4tzen separat berechnet.',
        bauleitung_titel: 'Bauleitung:',
        bauleitung: 'Die Bauleitung \u00fcbernimmt f\u00fcr Ihr Objekt vor Ort, selbstverst\u00e4ndlich unsere Betriebs- und Bauleiter.',
        rueckfragen: 'F\u00fcr R\u00fcckfragen stehen wir Ihnen jederzeit unter {phone} oder {email} zur Verf\u00fcgung.',
        mfg: 'Mit freundlichen Gr\u00fc\u00dfen',
        objektadresse: 'Objektadresse:',
    },
    'hr': {
        info_title: 'Kontakt podaci',
        internet: 'Internet',
        email: 'E-mail',
        telefon: 'Telefon',
        kundennummer: 'Broj kupca',
        kundentelefon: 'Telefon kupca',
        kunden_email: 'E-mail kupca',
        datum: 'Datum',
        kv_titel: 'Ponuda',
        pos: 'Poz',
        menge: 'Kol',
        bezeichnung: 'Opis',
        einzelpreis: 'Jed. cijena',
        betrag: 'Iznos',
        netto: 'Neto:',
        mwst: 'PDV {rate}%:',
        brutto: 'Ukupno s PDV-om:',
        anrede: 'Po\u0161tovani,',
        einleitung: 'zahvaljujemo Vam na interesu i povjerenju koje ste nam ukazali Va\u0161im upitom. S zadovoljstvom Vam danas dostavljamo na\u0161u ponudu, prilagodenu Va\u0161im potrebama.',
        gueltigkeit: 'Ova ponuda vrijedi {days} dana od dana izdavanja.',
        ab_bestaetigung: 'Postaje vazeca tek na\u0161om pisanom potvrdom narudzbe.',
        vertragsgrundlage_titel: 'Pravna osnova:',
        vertragsgrundlage: 'Primjenjuju se odredbe Zakona o obveznim odnosima (ZOO) o ugovoru o djelu (čl. 590. i dalje) i o ugovoru o nalogu (čl. 763. i dalje).',
        gewaehrleistung_titel: 'Jamstvo:',
        gewaehrleistung: 'Jamstvo na izvedene usluge: 24 mjeseca od dana isporuke, sukladno Zakonu o obveznim odnosima.',
        zahlung_titel: 'Uvjeti pla\u0107anja:',
        zahlung: 'Rok pla\u0107anja utvrduje se potvrdom narudzbe.<br>Pla\u0107anje je dospjelo u roku od 7 dana od izdavanja ra\u010duna bez odbitka skonta.<br>Akontacije se obracunavaju i priop\u0107avaju uz potvrdu narudzbe.',
        zusatzarbeiten_titel: 'Dodatne usluge:',
        zusatzarbeiten: 'Usluge koje nisu sadržane u ovoj ponudi obračunavaju se prema dogovoru i prethodnoj suglasnosti naručitelja, prema važećoj satnici.',
        bauleitung_titel: 'Vođenje projekta:',
        bauleitung: 'Vođenje projekta za Vašu narudžbu preuzimaju naši konzultanti i projektni menadžeri.',
        rueckfragen: 'Za sva pitanja stojimo Vam na raspolaganju na {phone} ili {email}.',
        mfg: 'S po\u0161tovanjem',
        objektadresse: 'Adresa objekta:',
    },
    'tr': {
        info_title: 'Bize Nasıl Ulaşırsınız',
        internet: 'İnternet',
        email: 'E-Posta',
        telefon: 'Telefon',
        kundennummer: 'Müşteri Numarası',
        kundentelefon: 'Müşteri Telefonu',
        kunden_email: 'Müşteri E-Posta',
        datum: 'Tarih',
        kv_titel: 'Fiyat Teklifi',
        pos: 'Poz',
        menge: 'Miktar',
        bezeichnung: 'Açıklama',
        einzelpreis: 'Birim Fiyat',
        betrag: 'Tutar',
        netto: 'Net:',
        mwst: '+ %{rate} KDV:',
        brutto: 'Brüt Tutar:',
        anrede: 'Sayın Müşterimiz,',
        einleitung: 'İlginiz ve bize duyduğunuz güven için içtenlikle teşekkür ederiz. Bugün size ihtiyaçlarınıza özel olarak hazırlanmış fiyat teklifimizi sunmaktan büyük memnuniyet duyarız.',
        gueltigkeit: 'İşbu fiyat teklifi {days} gün boyunca bağlayıcı olmaksızın geçerlidir.',
        ab_bestaetigung: 'Geçerlilik, ancak yazılı sipariş onayımız ile başlar.',
        vertragsgrundlage_titel: 'Sözleşme Esası:',
        vertragsgrundlage: '6098 sayılı Türk Borçlar Kanunu (TBK) §470 vd. — Eser Sözleşmesi hükümleri ile Türk Ticaret Kanunu (TTK) ilgili hükümleri uygulanır.',
        gewaehrleistung_titel: 'Garanti:',
        gewaehrleistung: 'TBK §478 uyarınca taşınmaz yapı eserleri için 5 yıl ayıba karşı tekeffül süresi.',
        zahlung_titel: 'Ödeme:',
        zahlung: 'Ödeme süresi sipariş onayı ile belirlenir.<br>Ödemeler fatura kesim tarihinden itibaren 7 gün içinde indirimsiz olarak yapılmalıdır.<br>Ara ödemeler sipariş onayı ile ayrıca hesaplanır ve bildirilir.',
        zusatzarbeiten_titel: 'Ek İşler:',
        zusatzarbeiten: 'Bu fiyat teklifinde yer almayan hizmetler, ölçüm sonrası ve önceden mutabakat sağlanarak yerinde ilgili saatlik ücret tarifesi üzerinden ayrıca hesaplanır.',
        bauleitung_titel: 'Şantiye Yönetimi:',
        bauleitung: 'Projeniz için şantiye yönetimi, yerinde tabii ki şirketimizin işletme ve şantiye şefleri tarafından üstlenilecektir.',
        rueckfragen: 'Sorularınız için her zaman {phone} veya {email} üzerinden bize ulaşabilirsiniz.',
        mfg: 'Saygılarımızla',
        objektadresse: 'Proje Adresi:',
    },
};


const KV_PREFIX = {
    '089dach': '089D',
    'sakar': 'SAK',
    'aquapro24': 'AQP',
    'estriche': 'EST',
    '089sanierer': '089S',
    '089bayern': '089B',
    'kshw-do': 'KSHWD',
    'kshw-muc': 'KSHWM',
    'extrucon': 'EXT',
    'sanitär-muenchen': 'SAN',
};

// Counter-Regel 2026-04-11: IMMER aus VPS-Quellen (sevDesk / Postgres kv_documents), NIE aus lokalen Dateien.
const SEVDESK_COUNTER_FIRMAS = (() => { try { const v = JSON.parse(require('fs').readFileSync('/ai-platform/vault/credentials.json', 'utf8')); return new Set(Object.keys(v.sevdesk || {})); } catch (e) { console.error('SEVDESK_COUNTER_FIRMAS vault fallback:', e.message); return new Set(['089dach', 'sakar']); } })();
const DB_COUNTER_FALLBACK = 122;  // -> next = 123
const _counterPool = _firmaPool; // Gleicher Pool fuer Counter + Firma

async function getNextKvCounter(firma) {
    // 2026-04-24 (user-rule): KV zählt IMMER eigenständig aus kv_documents nach oben.
    // AN/AB/RE/SR/AR kommen aus sevDesk — nicht KV. Flow 1 (sevDesk) entfernt.
    // DB-Firmen + sevDesk-Firmen: einheitlicher Pfad mit advisory_xact_lock
    const _cli = await _counterPool.connect();
    try {
        let _h = 0; for (let i = 0; i < firma.length; i++) _h = ((_h << 5) - _h + firma.charCodeAt(i)) | 0;
        await _cli.query('BEGIN');
        await _cli.query('SELECT pg_advisory_xact_lock($1)', [_h]);
        const r = await _cli.query(
            `SELECT COALESCE(MAX(
                CASE WHEN doc_id ~ '-[0-9]{5}$'
                     THEN (regexp_replace(doc_id, '.*-', ''))::int
                     ELSE NULL END
             ), $2) AS last
             FROM kv_documents
             WHERE company_id = $1 AND doc_type = 'kv'`,
            [firma, DB_COUNTER_FALLBACK]
        );
        await _cli.query('COMMIT');
        return (parseInt(r.rows[0].last, 10) || DB_COUNTER_FALLBACK) + 1;
    } catch (e) {
        try { await _cli.query('ROLLBACK'); } catch (_) {}
        console.error('getNextKvCounter[' + firma + '] pg error:', e.message); // best-effort, bewusst ignoriert
        return DB_COUNTER_FALLBACK + 1;
    } finally { _cli.release(); }
}

function generateKvNumber(firma, counter) {
    // 2026-04-24 (user-rule): Jahreszahl raus — KV-089D-NNNNN statt KV-089D-YYYY-NNNNN
    const prefix = KV_PREFIX[firma];
    const num = String(counter).padStart(5, '0');
    if (prefix) return `KV-${prefix}-${num}`;
    return `KV-${num}`;
}

function generateBriefNumber(firma, counter, opts) {
    // 2026-04-25: Privat-Prefix = Nachname-NNNNN (Avdic-00012), Firma = BR-NNNNN
    let prefix;
    if (firma === 'privat') {
        const sn = ((opts && opts.sender_name) || '').trim();
        const lastWord = sn.split(/\s+/).pop() || '';
        const cleaned = lastWord.replace(/[^A-Za-zÄÖÜäöüßÇçŞşĞğİıÖöÜüČčĆćŠšŽžĐđ-]/g, '');
        prefix = cleaned ? cleaned.charAt(0).toUpperCase() + cleaned.slice(1) : 'PRIV';
    } else {
        prefix = 'BR';
    }
    return `${prefix}-${String(counter).padStart(5, '0')}`;
}

// ============================================================
// PDF Generation
// ============================================================

let browserInstance = null;
let _renderCount = 0;
const MAX_RENDERS_BEFORE_RESTART = 50;

async function getBrowser() {
    if (browserInstance && _renderCount >= MAX_RENDERS_BEFORE_RESTART) {
        try { await browserInstance.close(); } catch(_) {}
        browserInstance = null;
        _renderCount = 0;
        console.log("[perf] Browser restart after " + MAX_RENDERS_BEFORE_RESTART + " renders");
    }
    if (!browserInstance) {
        browserInstance = await puppeteer.launch({
            executablePath: '/usr/bin/chromium-browser',
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--single-process'],
            timeout: 60000,
            protocolTimeout: 120000,
        });
    }
    return browserInstance;
}

// ============================================================
// WeasyPrint-Render (Python subprocess, ersetzt Puppeteer)
// ============================================================
const { execFileSync: _execFileSync } = require('child_process');

function _buildHeaderHtmlForWeasy(profile) {
    let logoImg = '';
    if (profile && profile.logo_base64) {
        logoImg = `<img src="${profile.logo_base64}" style="max-height:160px;max-width:350px;object-fit:contain;">`;
    } else if (profile) {
        logoImg = `<span style="font-size:16px;font-weight:700;color:${profile.primary_color || '#8B1A1A'}">${profile.firma_name || ''}</span>`;
    }
    const _isEntertrade = profile && profile.firma_slug === 'entertrade';
    if (_isEntertrade) {
        return `<div style="width:100%;height:25mm;padding:0;display:flex;align-items:center;justify-content:flex-end;box-sizing:border-box;">${logoImg}</div>`;
    }
    return `<div style="width:100%;padding:8px 0 0;display:flex;justify-content:flex-end;">${logoImg}</div>`;
}

function _buildFooterHtmlForWeasy(profile) {
    let f = '<div style="width:100%;font-family:Arial,sans-serif;">';
    f += '<div style="text-align:right;font-size:10px;color:#333;margin-bottom:4px;">Seite <span class="__wp_pn"></span></div>';
    if (profile && profile.bank_details) {
        for (const line of profile.bank_details.split('\n')) {
            const parts = line.split(': ');
            if (parts.length > 1) {
                f += `<div style="font-size:10px;color:#333;margin-bottom:1px;"><strong>${parts[0]}:</strong> ${parts.slice(1).join(': ')}</div>`;
            } else if (line.endsWith(':')) {
                f += `<div style="font-size:10px;color:#333;margin-bottom:1px;"><strong>${line}</strong></div>`;
            } else {
                f += `<div style="font-size:10px;color:#333;margin-bottom:1px;">${line}</div>`;
            }
        }
    }
    if (profile && profile.footer_text) {
        const parts = profile.footer_text.split(' | ');
        const n = parts.length;
        const w = (100 / n).toFixed(4);
        f += '<table style="width:100%;border-collapse:collapse;font-size:10px;margin-top:3px;border-top:1px solid #ccc;table-layout:fixed;"><tr>';
        for (let i = 0; i < n; i++) {
            const align = (n <= 1 || i === 0) ? 'left' : (i === n - 1 ? 'right' : 'center');
            const kv = parts[i].split(': ');
            if (kv.length > 1) {
                f += `<td style="vertical-align:top;padding:2px 4px;text-align:${align};width:${w}%;word-wrap:break-word;"><strong style="display:block;font-size:10px;color:#555;">${kv[0]}:</strong>${kv.slice(1).join(': ')}</td>`;
            } else {
                f += `<td style="vertical-align:top;padding:2px 4px;text-align:${align};width:${w}%;word-wrap:break-word;">${parts[i]}</td>`;
            }
        }
        f += '</tr></table>';
    }
    f += '</div>';
    return f;
}

async function htmlToPdfWeasy(html, outputPath, profile) {
    const headerHtml = _buildHeaderHtmlForWeasy(profile);
    const footerHtml = _buildFooterHtmlForWeasy(profile);
    const tmpHtml = outputPath.replace(/\.pdf$/, '') + '.input.html';
    const tmpOpts = outputPath.replace(/\.pdf$/, '') + '.opts.json';
    const _isPrivat = !profile || (!profile.logo_base64 && !profile.firma_name);
    const opts = {
        header_html: headerHtml,
        footer_html: footerHtml,
        margin_top: _isPrivat ? '20mm' : ((profile && profile.firma_slug==='entertrade') ? '35mm' : '50mm'),
        margin_bottom: '44mm',
        margin_left: '18mm',
        margin_right: '18mm',
    };
    fs.writeFileSync(tmpHtml, html, 'utf8');
    fs.writeFileSync(tmpOpts, JSON.stringify(opts), 'utf8');
    try {
        const out = _execFileSync('/usr/bin/python3',
            ['/opt/system/scripts/render_pdf_weasy.py', tmpHtml, outputPath, tmpOpts],
            { stdio: ['ignore', 'pipe', 'pipe'], timeout: 90000, encoding: 'utf8' });
        // Verify PDF
        const stat = fs.statSync(outputPath);
        if (stat.size < 500) throw new Error('weasyprint: PDF zu klein (' + stat.size + ' bytes)');
    } finally {
        try { fs.unlinkSync(tmpHtml); } catch (_) {}
        try { fs.unlinkSync(tmpOpts); } catch (_) {}
    }
    return outputPath;
}

async function htmlToPdf(html, outputPath, profile = null) {
    // 2026-04-24: WeasyPrint ersetzt Puppeteer per Default (kein Chrome mehr).
    // Fallback auf Puppeteer mit USE_WEASY=0 (nur Debug).
    if (process.env.USE_WEASY !== '0') {
        try { return await htmlToPdfWeasy(html, outputPath, profile); }
        catch (e) { console.error('[weasy] render fail, fallback puppeteer:', e.message); }
    }
    _renderCount++;
    let browser;
    let page;
    try {
        browser = await getBrowser();
        page = await browser.newPage();
        await page.setJavaScriptEnabled(false);
        await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 15000 });
    } catch (e) {
        // Browser-Crash-Recovery: alte Instanz wegwerfen, neu starten
        console.error('htmlToPdf: browser crash, recovering: ' + e.message); // best-effort, bewusst ignoriert
        try { if (browserInstance) await browserInstance.close(); } catch (_) {}
        browserInstance = null;
        browser = await getBrowser();
        page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 15000 });
    }

    // PERF: Header/Footer Cache per firma
    const _hfCacheKey = profile ? (profile.firma_slug || profile.slug || profile.firma_name || 'default') : 'none';
    if (!htmlToPdf._hfCache) htmlToPdf._hfCache = {};
    const _cached = htmlToPdf._hfCache[_hfCacheKey];
    if (_cached) {
        try {
            await page.pdf({
                path: outputPath, format: 'A4',
                margin: { top: (profile && profile.firma_slug==='entertrade') ? '28mm' : '50mm', right: '18mm', bottom: '44mm', left: '18mm' },
                printBackground: true, displayHeaderFooter: true,
                headerTemplate: _cached.header, footerTemplate: _cached.footer,
                timeout: 60000,
            });
        } finally { try { await page.close(); } catch(_) {} }
        return outputPath;
    }

    // Logo als Base64 für Header
    let logoImg = '';
    if (profile && profile.logo_base64) {
        logoImg = `<img src="${profile.logo_base64}" style="max-height:160px;max-width:350px;object-fit:contain;">`;
    } else if (profile) {
        logoImg = `<span style="font-size:16px;font-weight:700;color:${profile.primary_color || '#8B1A1A'}">${profile.firma_name}</span>`;
    }

    // Header: Logo oben rechts (zentriert in 50mm Header-Bereich fuer entertrade)
    const _isEntertrade = profile && profile.firma_slug === 'entertrade';
    const headerTemplate = _isEntertrade
        ? `<div style="width:100%;height:22mm;padding:2mm 18mm 0;display:flex;align-items:flex-start;justify-content:flex-end;box-sizing:border-box;">${logoImg}</div>`
        : `<div style="width:100%;padding:8px 18mm 0;display:flex;justify-content:flex-end;">${logoImg}</div>`;

    // Footer: Bank + GF-Tabelle + Seitenzahl
    let footerHtml = '<div style="width:100%;padding:0 18mm;font-family:Arial,sans-serif;">';

    // Seitenzahl rechts
    footerHtml += '<div style="text-align:right;font-size:10px;color:#333;margin-bottom:4px;">Seite <span class="pageNumber"></span></div>';

    // Bankdetails
    if (profile && profile.bank_details) {
        const lines = profile.bank_details.split('\n');
        for (const line of lines) {
            const parts = line.split(': ');
            if (parts.length > 1) {
                footerHtml += `<div style="font-size:10px;color:#333;margin-bottom:1px;"><strong>${parts[0]}:</strong> ${parts.slice(1).join(': ')}</div>`;
            } else if (line.endsWith(':')) {
                footerHtml += `<div style="font-size:10px;color:#333;margin-bottom:1px;"><strong>${line}</strong></div>`;
            } else {
                footerHtml += `<div style="font-size:10px;color:#333;margin-bottom:1px;">${line}</div>`;
            }
        }
    }

    // GF-Tabelle
    if (profile && profile.footer_text) {
        const parts = profile.footer_text.split(' | ');
        const colCount = parts.length;
        const colWidth = (100 / colCount).toFixed(4);
        function alignFor(i, n) {
            if (n <= 1) return 'left';
            if (i === 0) return 'left';
            if (i === n - 1) return 'right';
            return 'center';
        }
        footerHtml += '<table style="width:100%;border-collapse:collapse;font-size:10px;margin-top:3px;border-top:1px solid #ccc;table-layout:fixed;"><tr>';
        for (let i = 0; i < colCount; i++) {
            const align = alignFor(i, colCount);
            const kv = parts[i].split(': ');
            if (kv.length > 1) {
                footerHtml += `<td style="vertical-align:top;padding:2px 4px;text-align:${align};width:${colWidth}%;word-wrap:break-word;"><strong style="display:block;font-size:10px;color:#555;">${kv[0]}:</strong>${kv.slice(1).join(': ')}</td>`;
            } else {
                footerHtml += `<td style="vertical-align:top;padding:2px 4px;text-align:${align};width:${colWidth}%;word-wrap:break-word;">${parts[i]}</td>`;
            }
        }
        footerHtml += '</tr></table>';
    }

    footerHtml += '</div>';

    // Cache header+footer for this firma
    htmlToPdf._hfCache[_hfCacheKey] = { header: headerTemplate, footer: footerHtml };

    try {
        await page.pdf({
            path: outputPath,
            format: 'A4',
            margin: { top: (profile && profile.firma_slug==='entertrade') ? '28mm' : '50mm', right: '18mm', bottom: '44mm', left: '18mm' },
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: headerTemplate,
            footerTemplate: footerHtml,
            timeout: 60000,
        });
    } finally {
        try { await page.close(); } catch (_) {}
    }
    return outputPath;
}

async function closeBrowser() {
    if (browserInstance) {
        await browserInstance.close();
        browserInstance = null;
    }
}

async function _prewarmBrowser() {
    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.close();
    return true;
}

// ============================================================
// KV erstellen
// ============================================================

async function erstelleKV(firma, kunde, positionen, opts = {}) {
  if (!Array.isArray(positionen) || positionen.length === 0) throw new Error("erstelleKV: Keine Positionen angegeben");
    // Wenn kunde ein String ist: aus sevDesk (089dach + sakar) suchen via customer_lookup
    if (typeof kunde === 'string') {
        const query = kunde;
        console.log('Lade Kunde fuer firma=' + firma + ' query=' + query);
        const found = await lookupKunde(firma, query);
        if (found) {
            kunde = found;
            // Anrede-Logik: Immer mit Namen ansprechen wenn möglich
            // 1. Privatperson: "Sehr geehrter Herr/Frau [Nachname]"
            // 2. Firma mit Ansprechpartner: "Sehr geehrter Herr/Frau [Ansprechpartner]"
            // 3. Firma ohne Ansprechpartner: "Sehr geehrte Damen und Herren,"
            if (opts.salutation == null) {
                if (found.anrede && found.anrede !== 'Sehr geehrte Damen und Herren,') {
                    opts.salutation = found.anrede;
                } else {
                    // Versuche Anrede aus gender + Nachname zu bauen
                    const ln = found.last_name || found.familyname || '';
                    const gender = (found.gender || '').toLowerCase();
                    if (ln) {
                        if (gender === 'herr' || gender === 'm' || gender === 'male' || gender === 'mann') {
                            opts.salutation = 'Sehr geehrter Herr ' + ln + ',';
                        } else if (gender === 'frau' || gender === 'w' || gender === 'f' || gender === 'female') {
                            opts.salutation = 'Sehr geehrte Frau ' + ln + ',';
                        } else {
                            // Kein Gender bekannt aber Nachname da
                            opts.salutation = 'Sehr geehrte/r ' + ln + ',';
                        }
                    } else {
                        opts.salutation = 'Sehr geehrte Damen und Herren,';
                    }
                }
            }
            if (!opts.taxType)    opts.taxType    = found.kunde_typ;
            console.log('Kunde gefunden (' + found._source + '): ' + found.name + ' (' + found.number + ')');
        } else {
            console.error('Kunde "' + query + '" nicht gefunden in firma=' + firma); // best-effort, bewusst ignoriert
            kunde = { name: query, address: '', email: '', phone: '', number: '' };
        }
    }
    let profile = await loadFirma(firma);
    if (!profile) throw new Error(`Firma '${firma}' nicht gefunden`);
    // Privat-Modus: Profile-Felder aus opts.sender_* ueberschreiben
    if (opts.is_privat) {
        profile = { ...profile };
        if (opts.sender_phone) profile.phone = opts.sender_phone;
        if (opts.sender_email) profile.email = opts.sender_email;
        if (opts.sender_name)  { profile.owner = opts.sender_name; profile.firma_name = opts.sender_name; }
        // Privat: alle Firmen-Branding-Felder neutralisieren
        profile.website = null;
        profile.logo_base64 = null;
        profile.logo_path = null;
        profile.bank_details = null;
        profile.footer_text = null;
        profile.header_text = opts.sender_name || '';
        profile.ust_nr = null;
        profile.hrb = null;
        profile.amtsgericht = null;
    }

    validateKVInputs(kunde, positionen, opts);

    const is13b = _layoutIs13b(opts);
    const taxRate = is13b ? 0.0 : ((opts.taxRate != null) ? Number(opts.taxRate) : 19.0);
    const discountPercent = opts.discountPercent || 0;
    const totals = calcTotals(positionen, taxRate, discountPercent);

    // Override: fixedNetto / fixedMwst / fixedBrutto aus opts (exakte Betraege vom User)
    if (opts.fixedNetto != null) {
        totals.net = opts.fixedNetto;
        totals.net_after_discount = opts.fixedNetto - (totals.discount || 0);
        totals.tax = Math.round(totals.net_after_discount * taxRate) / 100;
        totals.gross = Math.round((totals.net_after_discount + totals.tax) * 100) / 100;
    }
    if (opts.fixedMwst != null) totals.tax = opts.fixedMwst;
    if (opts.fixedBrutto != null) totals.gross = opts.fixedBrutto;
    const kvNr = opts.forced_doc_number ? opts.forced_doc_number : generateKvNumber(firma, opts.counter || await getNextKvCounter(firma));
    const validDays = opts.validDays || 10;

    const now = (function(){
        if (opts.date instanceof Date) return opts.date;
        if (typeof opts.date === 'string') {
            const m = opts.date.match(/^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})$/);
            if (m) return new Date(parseInt(m[3]), parseInt(m[2])-1, parseInt(m[1]));
            const d = new Date(opts.date);
            if (!isNaN(d.getTime())) return d;
        }
        return new Date();
    })();
    const validUntil = new Date(now);
    validUntil.setDate(validUntil.getDate() + validDays);

    // Logo als Base64 einbetten (gecacht)
    let logoBase64 = null;
    if (profile.logo_path && fs.existsSync(profile.logo_path)) {
        logoBase64 = _logoCache.get(profile.logo_path);
        if (!logoBase64) {
            const ext = path.extname(profile.logo_path).slice(1);
            const mime = ext === 'jpg' ? 'jpeg' : ext;
            const buf = fs.readFileSync(profile.logo_path);
            logoBase64 = `data:image/${mime};base64,${buf.toString('base64')}`;
            _logoCache.set(profile.logo_path, logoBase64);
        }
    }

    const lang = profile.lang || 'de';
    const labels = { ...(LABELS[lang] || LABELS['de']) };

    // docType: 'kv' (default), 'angebot', 'ab', 'rechnung'
    const docType = opts.docType || 'kv';
    // 2026-05-18 bugkiller: forced_doc_number + docType in (ab|li|angebot) = Re-Render einer existierenden Nummer.
    // Kein neuer sevDesk-Beleg, kein DB-INSERT, kein kv_cache-Eintrag, kein CRM-Register — nur PDF rendern + OneDrive.
    if (opts.forced_doc_number && ['ab','li','angebot'].includes(docType)) {
        if (opts.skipSevdeskCreate !== false) opts.skipSevdeskCreate = true;
        if (opts.skipDbInsert !== false) opts.skipDbInsert = true;
    }
    if (docType === 'angebot') {
        labels.kv_titel = 'Angebot';
        labels.einleitung = 'vielen Dank für das persönliche Gespräch und die Besichtigung vor Ort. Auf Grundlage unserer gemeinsamen Begehung unterbreiten wir Ihnen folgendes <strong>Angebot</strong>.';
        labels.gueltigkeit = 'Das vorliegende Angebot ist verbindlich {days} Tage gültig.';
        // 2026-04-30 doctype-leak fix: ab_bestaetigung Whitespace + bauleitung weg
        labels.ab_bestaetigung = ' ';
        labels.bauleitung_titel = ''; labels.bauleitung = '';
        labels.zusatzarbeiten = 'Leistungen, die nicht in diesem Angebot enthalten sind, werden nach Aufmaß und vorheriger Absprache vor Ort zu den jeweiligen Regiestundensätzen separat berechnet.';
    } else if (docType === 'ab') {
        labels.kv_titel = 'Auftragsbestätigung';
        labels.einleitung = 'vielen Dank für Ihren Auftrag. Hiermit <strong>bestätigen</strong> wir Ihnen den nachfolgenden Auftrag.';
        labels.gueltigkeit = ' ';
        labels.ab_bestaetigung = ' ';
        labels.vertragsgrundlage_titel = ''; labels.vertragsgrundlage = '';
        labels.gewaehrleistung_titel = '';   labels.gewaehrleistung = '';
        labels.zahlung_titel = '';           labels.zahlung = '';
        labels.zusatzarbeiten_titel = '';    labels.zusatzarbeiten = '';
        const _firmaName = profile.firma_name || profile.name || '';
        const _adrLines = String(profile.address || '').split('\n').map(s => s.trim()).filter(Boolean);
        const _strasse = _adrLines[1] || '';
        const _plzOrt  = _adrLines[2] || '';
        const _email   = profile.email || '';
        const _teamMap = { '089dach': '089Dach GmbH Team', 'sakar': 'Mustafa Sakar', 'kshw-muc': 'KSHW München Team' };
        const _slug = profile.firma_slug || profile.slug || firma;
        labels.schluss_signatur = _teamMap[_slug] || (_firmaName + ' Team');
        const _isB2C = String(kunde.kunde_typ || '').toLowerCase() === 'b2c';
        const _kundeNameFull = (kunde.name || [(kunde.first_name||''),(kunde.last_name||'')].filter(Boolean).join(' ') || '').trim();
        const _defaultAbschl = [
            {nr: 1, prozent: 50, text: "als rechtsverbindliche Auftragserteilung, sofort fällig vor Arbeitsbeginn"},
            {nr: 2, prozent: 30, text: "bei angemessenem Baufortschritt, sofort fällig"},
            {nr: 3, prozent: 15, text: "bei angemessenem Baufortschritt, sofort fällig"},
            {nr: "Schluss", prozent: 5, text: "nach mängelfreier Fertigstellung, Endabnahme und Übergabe der geschuldeten Leistung an den Auftraggeber"},
        ];
        const _abschlPlan = (Array.isArray(opts.abschlagsplan) && opts.abschlagsplan.length > 0)
            ? opts.abschlagsplan : _defaultAbschl;
        const _abschlHtml = _abschlPlan.map(a => {
            const isSchluss = String(a.nr).toLowerCase().startsWith("schluss") || a.nr === null || a.nr === undefined;
            if (isSchluss) return `<strong>Schlusszahlung:</strong> ${a.prozent} % ${a.text}.`;
            return `<strong>Abschlagszahlung ${a.nr}:</strong> in Höhe von ${a.prozent} % ${a.text}.`;
        }).join("<br>\n");
        const _widerrufBlock = _isB2C ? `<p class="section-title">Widerrufsrecht:</p><p style="font-size:9pt;color:#666;"><em>Muster-Widerrufsbelehrung nach Anlage 1 zu Art. 246a § 1 Abs. 2 S. 2 EGBGB.</em></p><p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>` : '';
        labels.ab_schlusstext = `
<p><strong>Mit diesem Werkvertrag bestätigen wir Ihnen das obenstehende Leistungsverzeichnis.</strong></p>
<p class="section-title">Vertragsgrundlage:</p>
<p>Es gilt § 650a BGB (Bauvertrag), in seiner jeweils gültigen Fassung.</p>
<p class="section-title">Gewährleistung:</p>
<p>Nach den Bestimmungen des BGB, 5 Jahre.</p>
<p class="section-title">Zahlung:</p>
<p>Das Zahlungsziel wird mit dieser Auftragsbestätigung festgelegt.<br>Zahlungen sind nach Rechnungstellung innerhalb von 5 Tagen ohne Skontoabzug zu leisten.</p>
<p>${_abschlHtml}</p>
<p class="section-title">Zusatzarbeiten:</p>
<p>Leistungen, die über den in diesem Angebot beschriebenen Umfang hinausgehen, gelten als Zusatzarbeiten. Diese werden nur nach vorheriger Abstimmung vor Ort und nach schriftlicher Beauftragung durch den Auftraggeber ausgeführt und gesondert in Rechnung gestellt. Mündliche Nebenabreden sind ausgeschlossen.</p>
<p class="section-title">Bauleitung:</p>
<p>Die Bauleitung übernimmt für Ihr Objekt vor Ort, selbstverständlich unsere Betriebs- und Bauleiter.</p>
${_widerrufBlock}
<p style="margin-top:24px;">Zum Zeichen des beiderseitigen Einverständnisses senden Sie uns bitte ein Exemplar der Auftragsbestätigung unterschrieben an uns zurück.</p>
<p style="margin-top:32px;">Auftrag erteilt am _____________________</p>
<p style="margin-top:24px;">_______________________________<br>${_kundeNameFull}</p>
`.trim();
    } else if (docType === 'li') {
        labels.kv_titel = 'Lieferschein';
        labels.einleitung = 'hiermit liefern wir Ihnen die nachfolgend aufgeführten Leistungen/Materialien. Bitte bestätigen Sie den Erhalt mit Ihrer Unterschrift.';
        // 2026-04-30 doctype-leak fix: Whitespace statt '' (Jinja-or-Fallback)
        labels.gueltigkeit = ' ';
        labels.ab_bestaetigung = ' ';
        labels.bauleitung_titel = ''; labels.bauleitung = '';
        labels.vertragsgrundlage_titel = ''; labels.vertragsgrundlage = '';
        labels.gewaehrleistung_titel = '';   labels.gewaehrleistung = '';
        labels.zahlung_titel = '';           labels.zahlung = '';
        labels.zusatzarbeiten_titel = '';    labels.zusatzarbeiten = '';
    } else if (docType === 'rechnung' || docType === 'abschlagsrechnung') {
        labels.kv_titel = docType === 'abschlagsrechnung' ? 'Abschlagsrechnung' : 'Rechnung';
        labels.einleitung = 'vielen Dank für Ihren Auftrag. Nachfolgend stellen wir Ihnen die erbrachten Leistungen in Rechnung.';
        // 2026-04-30 doctype-leak fix: Whitespace statt '' (Jinja-or-Fallback)
        labels.gueltigkeit = ' ';
        labels.ab_bestaetigung = ' ';
        labels.bauleitung_titel = ''; labels.bauleitung = '';
        labels.vertragsgrundlage_titel = ''; labels.vertragsgrundlage = '';
        labels.gewaehrleistung_titel = '';   labels.gewaehrleistung = '';
        labels.zahlung_titel = '';           labels.zahlung = '';
        labels.zusatzarbeiten_titel = '';    labels.zusatzarbeiten = '';
    }
    if (opts.labels && typeof opts.labels === 'object') Object.assign(labels, opts.labels);

    const context = {
        profile: { ...profile, logo_base64: logoBase64 },
        labels,
        kv: {
            quotation_number: kvNr,
            customer_name: kunde.name || kunde.customer_name || '',
            customer_address: kunde.address || kunde.customer_address || '',
            customer_email: kunde.email || kunde.customer_email || '',
            customer_phone: formatDePhone(kunde.phone || kunde.customer_phone || kunde.telefon || ""),
            customer_number: kunde.number || kunde.customerNumber || kunde.kundennummer || '',
            // Wenn vortext schon eine Anrede enthält, salutation weglassen (keine Dopplung)
        salutation: (opts.salutation === false || (opts.vortext && /sehr geehrt|poštovan|sayın/i.test(opts.vortext))) ? '' : (opts.salutation || kunde.anrede || ''),
            project_name: opts.projectName || '',
            project_address: opts.projectAddress || '',
            positions: expandKapitelSubtitles(positionen),
            date: now,
            valid_until: validUntil,
            valid_days: validDays,
            discount_percent: discountPercent,
            notes: (opts.notes && String(opts.notes).trim()) || '',
            is_13b: _layoutIs13b(opts),
            is_18b: _is18bMode(opts),
            vortext: opts.vortext || '',
            nachtext: opts.nachtext || '',
            hide_bedingungen: !!opts.hide_bedingungen,
            untertitel: _sanitizeUntertitel(opts.untertitel),
            titel: opts.titel || labels.kv_titel || '',
            einleitung: opts.einleitung !== undefined ? opts.einleitung : (opts.vortext ? '' : (labels.einleitung || '')),
            ab_schlusstext: labels.ab_schlusstext || '',
        },
        totals,
    };

    // 2026-05-05: Team-Signatur-Override (profile.owner = letzte Zeile aus signatur)
    try {
        const _sig = String((context.profile && context.profile.signatur) || '');
        const _NL = String.fromCharCode(10);
        if (_sig.indexOf(_NL) >= 0) {
            const _ls = _sig.split(_NL).map(s => s.trim()).filter(Boolean);
            if (_ls.length >= 2) context.profile.owner = _ls[_ls.length - 1];
        }
    } catch (e) {}
    // 2026-05-05: USt-Slot rechter Header dynamisch — B2B Kunden-USt/Steuernr, B2C leer
    try {
        const _kt = String((kunde.kunde_typ || '')).toLowerCase();
        if (_kt === 'b2c') {
            context.profile.tax_label = ' ';
            context.profile.tax_id = ' ';
        } else if (_kt === 'b2b') {
            const _kustId = kunde.ust_id || kunde.tax_id || kunde.vatNumber || '';
            const _kStnr = kunde.steuernummer || kunde.tax_number || kunde.steuer_nr || '';
            if (_kustId) { context.profile.tax_label = 'USt-IdNr.'; context.profile.tax_id = _kustId; }
            else if (_kStnr) { context.profile.tax_label = 'Steuernr.'; context.profile.tax_id = _kStnr; }
            else { context.profile.tax_label = ' '; context.profile.tax_id = ' '; }
        }
    } catch (e) {}
    // Initial-Render mit kvNr — wird ggf. ueberschrieben wenn docType ∈ angebot/ab/li (siehe unten)
    if (opts.forced_doc_number) { context.kv.quotation_number = opts.forced_doc_number; }
    let html = renderTemplate('kv_node.html', context);
    html = _applyIs18bHtmlPatch(html, opts);

    // Output dir
    const outDir = path.join(OUTPUT_DIR, firma);
    fs.mkdirSync(outDir, { recursive: true });

    const pdfPath = path.join(outDir, `${kvNr}.pdf`);

    // PERF: sevDesk contactId Prefetch parallel zur PDF-Generierung
    let contactIdPromise = null;
    if (ebSync.SUPPORTED_FIRMAS.has(firma) && kunde && kunde.number) {
        const sdFirma = ({"089dach":'089dach',"kshw-muc":'089dach',"089sanierer":'089dach',"089-sanierer":'089dach',"estriche":'089dach',"sanitär-muenchen":'089dach',"aquapro24":'sakar',"sakar":'sakar'}[firma] || 'sakar');
        contactIdPromise = sdBelege.findContactIdByNumber(kunde.number, sdFirma).catch((err) => { console.warn("findContactIdByNumber failed:", err && err.message ? err.message : err); return null; });
    }

    // PERF (2026-04-23): sevDesk Angebot-Anlage VOR htmlToPdf starten (TRUE parallel zum PDF-Render, spart 1-2s)
    // 2026-04-30: bei preview_only sevDesk komplett skippen (Vorschau darf nichts erstellen)
    let sdAngebotPromise = null;
    if (!opts.preview_only && !opts.skipSevdeskCreate && ebSync.SUPPORTED_FIRMAS.has(firma) && kunde && kunde.number) {
        sdAngebotPromise = (async () => {
            try {
                const cid = await contactIdPromise;
                if (!cid) { console.error('sevdesk[' + firma + ']: Kontakt nr=' + kunde.number + ' nicht gefunden'); return null; }
                const _ot = ({kv:'AN', angebot:'AN', ab:'AB', li:'LI'})[opts.docType || 'kv'] || 'AN';
                return await ebSync.createAngebotInline({ firma, contactId: cid, positionen, kvNummer: kvNr, opts: { ...opts, orderType: _ot }, kunde });
            } catch (e) {
                console.error('sevdesk Angebot Fehler[' + firma + ']:', e.message);
                return null;
            }
        })();
    }

    // 2026-05-05: AN/AB/LI sollen die sevDesk-Belegnummer im Header zeigen, nicht den KV-Counter.
    // Warten auf sdAngebotPromise (parallel gestartet weiter oben) und context neu rendern.
    if (sdAngebotPromise && ['angebot','ab','li'].includes(opts.docType || '')) {
        try {
            const _sdResolved = await sdAngebotPromise;
            const _sdNumber = _sdResolved && (_sdResolved.number || _sdResolved.orderNumber);
            if (_sdNumber) {
                context.kv.quotation_number = _sdNumber;
                html = renderTemplate('kv_node.html', context);
                html = _applyIs18bHtmlPatch(html, opts);
            }
        } catch (e) { /* fallback: bleibt kvNr */ }
    }
    await htmlToPdf(html, pdfPath, { ...profile, logo_base64: logoBase64 });

    // Preview-Only Early-Return: keine DB, kein OneDrive, kein sevDesk
    if (opts.preview_only) {
        return { ok: true, kv_nummer: kvNr, pdf: pdfPath, preview: true };
    }


    // ---- Postgres-Log: kv_documents INSERT fuer ALLE Firmen (DB-only + sevDesk) ----
    // Fix 2026-04-11: Ohne diesen INSERT bekamen DB-only Firmen (089bayern/kshw-do/extrucon)
    // immer dieselbe KV-Nummer, weil der Counter via MAX(doc_id) liest, aber nie schreibt.
    // 2026-05-18 bugkiller: bei skipDbInsert/skipSevdeskCreate (Re-Render) kein neuer kv_documents-Eintrag.
    if (!opts.skipDbInsert && !opts.skipSevdeskCreate) try {
        await _counterPool.query(
            `INSERT INTO kv_documents
               (doc_id, doc_type, company_id, customer_name, customer_email, phone,
                total_netto, total_brutto, mwst_satz, status, pdf_path, leistungen, created_at)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,NOW())
             ON CONFLICT (doc_id) DO NOTHING`,
            [
                kvNr,
                'kv',
                firma,
                kunde.name || kunde.customer_name || '',
                kunde.email || kunde.customer_email || '',
                kunde.phone || kunde.customer_phone || '',
                totals.net,
                totals.gross,
                is13b ? 0 : 19,
                'erstellt',
                pdfPath,
                JSON.stringify(positionen || []),
            ]
        );
    } catch (e) {
        console.error('kv_documents INSERT failed (non-fatal): ' + e.message);
    }

    // ---- KV in Postgres-Cache + (optional) sevDesk Angebot + OneDrive ----
    // 3 unabhaengige Flows via Promise.allSettled parallel: spart 3-5 Sek pro KV.
    // ONEDRIVE_FIRMAS = sevDesk-Firmen + DB-Firmen (alle mit OneDrive-Pfaden)
    // SUPPORTED_FIRMAS = nur sevDesk-Firmen (haben Angebot/AB/Rechnung-Workflow)
    let onedrive_kv = null;
    let sevdesk_order = null;
    if (ebSync.ONEDRIVE_FIRMAS.has(firma)) {
        const tasks = [];

        // FLOW A: kv_cache (lokale DB) — fuer spaeteren kvZuAB/rechnungAusKV/abschlagAusKV Aufruf
        // 2026-05-18 bugkiller: bei skipDbInsert/skipSevdeskCreate (Re-Render) keinen kv_cache-Eintrag.
        if (!opts.skipDbInsert && !opts.skipSevdeskCreate) tasks.push((async () => {
            try {
                await kvCache.addKv({
                    kv_nummer: kvNr,
                    firma,
                    kunde_id: kunde.number || null,
                    kunde_name: kunde.name || kunde.customer_name || '',
                    kunde,
                    positionen: positionen,
                    opts,
                    pdf_path: pdfPath,
                });
            } catch (e) {
                console.error('kv_cache.addKv FEHLER:', e.message); // best-effort, bewusst ignoriert
            }
        })());

        // FLOW B: sevDesk Angebot — Promise wurde VOR htmlToPdf gestartet (PERF)
        if (sdAngebotPromise) {
            tasks.push((async () => {
                const o = await sdAngebotPromise;
                if (o) {
                    sevdesk_order = { id: o.id, orderNumber: o.orderNumber, sumGross: o.sumGross };
                    console.log('sevdesk Angebot[' + firma + ']:', o.orderNumber, '(id ' + o.id + ')');
                }
            })());
        }

        // FLOW C: OneDrive Upload des KV-PDF (firma-spezifischer Ordner)
        (async () => {
            try {
                const kdnr = kunde.number || kunde.customerNumber || kunde.kundennummer || 'NEU';
                const shortName = (kunde.last_name || kunde.lastName
                    || (kunde.company_name ? String(kunde.company_name).split(/[\s,]/)[0] : '')
                    || (kunde.name ? String(kunde.name).split(/[\s,]/).pop() : '')
                    || 'Kunde').replace(/[\\/:*?"<>|]/g, '').trim();
                const kvCore = String(kvNr).replace(/^KV-/, '');
                const kdnrShort = String(kdnr).replace(/^KU-\d{4}-/, "");
                const _sdNr = sevdesk_order && sevdesk_order.orderNumber;
                // 2026-05-18 bugkiller: forced_doc_number gewinnt (Re-Render-Pfad), sonst sevDesk-Nr, sonst KV-Counter.
                const _docPfx = opts.forced_doc_number ? opts.forced_doc_number : (_sdNr ? _sdNr : ("KV-" + kvCore));
                // 2026-05-18: Neuer Filename-Stil <TYP>-<NR>-<Nachname>-<Objektadresse>.pdf
                let _addr = (opts && (opts.objektadresse || opts.bv) || "").toString().trim();
                if (!_addr) {
                    _addr = String((kunde && kunde.address) || "").split(/[\n\r]+/).join(", ").trim();
                }
                const _addrSan = _addr.replace(/[\\\/:*?"<>|]/g, "").replace(/\s+/g, " ").slice(0, 80) || "ohne-Adresse";
                const oneName = (_docPfx + "-" + shortName + "-" + _addrSan + ".pdf");
                const stagedDir = path.join('/tmp', 'kv_' + Date.now() + '_' + Math.random().toString(36).slice(2,8));
                fs.mkdirSync(stagedDir, { recursive: true });
                const stagedPath = path.join(stagedDir, oneName);
                fs.copyFileSync(pdfPath, stagedPath);
                // 2026-05-18 bugkiller: OneDrive-Ordner aus docType (ab->3.AB, angebot->2.AN, rechnung->4.RE, kv->1.KV). Vorher hardcoded "kv".
                const _odTarget = ({ ab: "ab", angebot: "angebot", li: "ab", rechnung: "rechnung", abschlagsrechnung: "rechnung", kv: "kv" })[docType] || "kv";
                ebSync.uploadToOneDriveDetached(stagedPath, firma, _odTarget);
            } catch (e) {
                console.error('OneDrive-Upload[' + firma + '] (KV) FEHLER:', e.message);
            }
        })(); onedrive_kv = 'detached';

        // Alle 3 Flows parallel — max(A, B, C) statt A+B+C
        await Promise.allSettled(tasks);

        // FIX (2026-04-14): sevDesk AN-Nummer + order.id zurueck in kv_cache schreiben.
        // Ohne diesen Write geht das Mapping KV<->AN verloren (Rule-Violation #163).
        if (sevdesk_order && sevdesk_order.id) {
            try {
                const _docTyp = (opts.docType || 'kv');
                const _idCol = ({kv:'sd_an_id', angebot:'sd_an_id', ab:'sd_ab_id', li:'sd_li_id'})[_docTyp] || 'sd_an_id';
                const _nrCol = ({kv:'sd_an_number', angebot:'sd_an_number', ab:'sd_ab_number', li:'sd_li_number'})[_docTyp] || 'sd_an_number';
                await kvCache.pool.query(
                    `UPDATE kv_cache SET ${_idCol}=$1, ${_nrCol}=$2, updated_at=now() WHERE kv_nummer=$3`,
                    [sevdesk_order.id, sevdesk_order.orderNumber || null, kvNr],
                );
                console.log('kv_cache:', _idCol, '/', _nrCol, 'gesetzt fuer', kvNr, '->', sevdesk_order.orderNumber);
            } catch (e) {
                console.error('kv_cache UPDATE sd_ab FEHLER:', e.message); // best-effort, bewusst ignoriert
            }
        }
    }

    // CRM-Register (best-effort)
    // doc_type aus opts.docType, doc_number: KV=interner Counter, AN/AB/LI=sevDesk-Nummer
    // 2026-05-18 bugkiller: bei Re-Render (skipDbInsert/skipSevdeskCreate) NICHT erneut registrieren.
    if (!opts.skipDbInsert && !opts.skipSevdeskCreate) try {
        const _typMap = { kv: 'KV', angebot: 'AN', ab: 'AB', li: 'LI' };
        const _kvTyp = _typMap[opts.docType] || 'KV';
        const _docNr = (_kvTyp === 'KV')
            ? kvNr
            : ((sevdesk_order && sevdesk_order.orderNumber) || null);
        const _fn = path.basename(pdfPath);
        const _od = buildOnedrivePath(_kvTyp, firma, _fn);
        if (_od && _docNr) {
            registerDocument({
                firma_slug: firma,
                doc_type: _kvTyp,
                doc_number: _docNr,
                onedrive_path: _od,
                title: (kunde && (kunde.name || kunde.customer_name)) || '',
                amount_net: (totals && totals.net_after_discount) || null,
                amount_gross: (totals && totals.gross) || null,
                sevdesk_ref_id: (sevdesk_order && sevdesk_order.id) || null,
                valid_until: null,
                created_by: 'kv_generator',
                crm_id: opts.crm_id || null,
            });
        } else if (_kvTyp !== 'KV' && !_docNr) {
            console.warn('[crm_register] skip ' + _kvTyp + ' ' + kvNr + ': sevDesk-Nummer fehlt');
        }
    } catch (e) { console.error('[crm_register kv]', e.message); }

    return { kv_nummer: kvNr, pdf: pdfPath, onedrive_kv, sevdesk_order };
}

// ============================================================
// KV → sevDesk ORDER (Auftragsbestätigung, auf Anweisung)
// ============================================================

/**
 * KV aus Cache nehmen und in sevDesk als Auftragsbestätigung anlegen.
 * Zuordnung über kv_nummer (PK) ODER kunde_name (Substring).
 * sevDesk-Typ: Order (orderType=AB)
 *
 * @param {object} query                { kv_nummer?, kunde_name?, firma? }
 * @returns {object}                    { ok, kv_nummer, sd_ab_id, sd_ab_number, onedrive }
 */
async function kvZuAB(query) {
    const rows = await kvCache.findKv(query);
    if (!rows.length) throw new Error('Kein passender KV im Cache gefunden');
    if (rows.length > 1) {
        const list = rows.map(r => `  - ${r.kv_nummer} (${r.kunde_name}, ${r.firma})`).join('\n');
        throw new Error(`Mehrere KVs gefunden – bitte präziser:\n${list}`);
    }
    const row = rows[0];

    if (!row.sd_an_id && !row.sd_an_number) {
        throw new Error('Kein sevDesk-AN fuer KV ' + row.kv_nummer + ' gefunden. Regel: AB muss aus sevDesk-AN. Erst AN erstellen (kvZuAngebot).');
    }
    const anRef = row.sd_an_number || row.sd_an_id;
    const doc = await ebSync.createABFromAN({ firma: row.firma, an: anRef });
    await kvCache.setSdAB(row.kv_nummer, doc.id, doc.number || null);

    let onedrive = null;
    try {
        onedrive = await ebSync.dropDocPdfToOneDrive(doc, row, 'ab');
    } catch (e) {
        console.error('OneDrive-Upload (AB) FEHLER:', e.message);
    }

    return {
        ok: true,
        kv_nummer:    row.kv_nummer,
        kunde_name:   row.kunde_name,
        sd_ab_id:     doc.id,
        sd_ab_number: doc.number || null,
        is_draft:     doc.is_draft,
        onedrive,
    };
}

// ============================================================
// Angebot/KV → sevDesk INVOICE (volle Rechnung)
// ============================================================

/**
 * Aus KV-Cache eine vollwertige Rechnung in sevDesk anlegen.
 * Cache-Eintrag wird nach erfolgreichem Anlegen gelöscht.
 */
async function rechnungAusKV(query) {
    let rows = await kvCache.findKv(query);
    if (!rows.length) throw new Error('Kein passender KV im Cache gefunden');
    if (rows.length > 1) {
        const list = rows.map(r => `  - ${r.kv_nummer} (${r.kunde_name}, ${r.firma})`).join('\n');
        throw new Error(`Mehrere KVs gefunden – bitte präziser:\n${list}`);
    }
    let row = rows[0];

    // Stale-Recover: AB im Cache aber nicht mehr in sevDesk -> Cache resetten
    if (row.sd_ab_id || row.sd_ab_number) {
        try {
            await sdBelegeMod.getOrder(row.sd_ab_number || row.sd_ab_id, _sdKey(row.firma));
        } catch (e) {
            if (String(e.message || '').includes('not found') || String(e.message || '').includes('404')) {
                console.warn(`[auto-recover RE] AB ${row.sd_ab_number || row.sd_ab_id} weg, Cache resetten`);
                await kvCache.setSdAB(row.kv_nummer, null, null);
                row.sd_ab_id = null; row.sd_ab_number = null;
            }
        }
    }

    // Auto-Chain: KV -> AN -> AB -> RE (Pflicht-Kette gem. CLAUDE.md feedback_dokumentenkette)
    if (!row.sd_ab_id && !row.sd_ab_number) {
        if (!row.sd_an_id && !row.sd_an_number) {
            throw new Error('Weder AN noch AB fuer KV ' + row.kv_nummer + ' vorhanden. Erst AN erstellen, dann AB, dann RE.');
        }
        console.log(`[auto-chain RE] erstelle AB aus AN ${row.sd_an_number || row.sd_an_id}`);
        const abDoc = await ebSync.createABFromAN({ firma: row.firma, an: row.sd_an_number || row.sd_an_id });
        await kvCache.setSdAB(row.kv_nummer, abDoc.id, abDoc.number || null);
        row.sd_ab_id = abDoc.id; row.sd_ab_number = abDoc.number;
    }

    const abRef = row.sd_ab_number || row.sd_ab_id;
    const doc = await ebSync.createREFromAB({ firma: row.firma, ab: abRef });
    await kvCache.setSdInvoice(row.kv_nummer, doc.id, doc.number || null);

    let onedrive = null;
    try {
        onedrive = await ebSync.dropDocPdfToOneDrive(doc, row, 'rechnung');
    } catch (e) {
        console.error('OneDrive-Upload (Rechnung) FEHLER:', e.message);
    }

    // Endrechnung → Cache löschen (per User-Regel: nach Rechnungserstellung Cache leeren)
    try { await kvCache.deleteKv(row.kv_nummer); } catch (e) { console.error('deleteKv:', e.message); }

    return {
        ok: true,
        kv_nummer:         row.kv_nummer,
        kunde_name:        row.kunde_name,
        sd_invoice_id:     doc.id,
        sd_invoice_number: doc.number || null,
        is_draft:          doc.is_draft,
        onedrive,
    };
}

// ============================================================
// Angebot/KV → sevdesk PARTIAL_INVOICE (Abschlagsrechnung, 3 Modi)
// ============================================================

/**
 * Abschlagsrechnung aus KV.
 * Cache wird NICHT gelöscht (es kann mehrere Abschläge geben).
 *
 * @param {object} query   { kv_nummer?, kunde_name?, firma? }
 * @param {string} mode    'percent' | 'amount' | 'positions'
 * @param {*}      value   Prozent | Euro-Betrag | Array von Positions-Indizes
 */
async function abschlagAusKV(query, mode, value, abschlag_nr) {
    let rows = await kvCache.findKv(query);
    if (!rows.length) throw new Error('Kein passender KV im Cache gefunden');
    if (rows.length > 1) {
        const list = rows.map(r => `  - ${r.kv_nummer} (${r.kunde_name}, ${r.firma})`).join('\n');
        throw new Error(`Mehrere KVs gefunden – bitte präziser:\n${list}`);
    }
    let row = rows[0];

    // Auto-Recover: AB im Cache aber nicht mehr in sevDesk -> Cache leeren + neu erstellen
    if (row.sd_ab_id || row.sd_ab_number) {
        try {
            await sdBelegeMod.getOrder(row.sd_ab_number || row.sd_ab_id, _sdKey(row.firma));
        } catch (e) {
            if (String(e.message || '').includes('not found') || String(e.message || '').includes('404')) {
                console.warn(`[auto-recover] AB ${row.sd_ab_number || row.sd_ab_id} in sevDesk weg -> kv_cache resetten`);
                await kvCache.setSdAB(row.kv_nummer, null, null);
                row.sd_ab_id = null;
                row.sd_ab_number = null;
            }
        }
    }

    if (!row.sd_ab_id && !row.sd_ab_number) {
        // Auto-create AB aus AN
        if (!row.sd_an_id && !row.sd_an_number) {
            throw new Error('Kein sevDesk-AB UND kein AN fuer KV ' + row.kv_nummer + ' gefunden.');
        }
        console.log(`[auto-recover] Erstelle AB aus AN ${row.sd_an_number || row.sd_an_id}`);
        const abDoc = await ebSync.createABFromAN({ firma: row.firma, an: row.sd_an_number || row.sd_an_id });
        await kvCache.setSdAB(row.kv_nummer, abDoc.id, abDoc.number || null);
        row.sd_ab_id = abDoc.id;
        row.sd_ab_number = abDoc.number;
    }

    const abRef = row.sd_ab_number || row.sd_ab_id;
    const doc = await ebSync.createARFromAB({ firma: row.firma, ab: abRef, mode, value, abschlag_nr });

    let onedrive = null;
    try {
        onedrive = await ebSync.dropDocPdfToOneDrive(doc, row, 'rechnung');
    } catch (e) {
        console.error('OneDrive-Upload (Abschlag) FEHLER:', e.message);
    }

    return {
        ok: true,
        kv_nummer:         row.kv_nummer,
        kunde_name:        row.kunde_name,
        mode,
        value,
        sd_invoice_id:     doc.id,
        sd_invoice_number: doc.number || null,
        is_draft:          doc.is_draft,
        onedrive,
    };
}

// ============================================================
// Brief erstellen
// ============================================================


async function _appendAttachmentsToPdf(briefPdfPath, attachments) {
    if (!attachments || !attachments.length) return;
    const { PDFDocument } = require('pdf-lib');
    const sharp = require('sharp');
    const briefBytes = fs.readFileSync(briefPdfPath);
    const out = await PDFDocument.load(briefBytes);
    for (const a of attachments) {
        try {
            const ext = path.extname(a.path || a.filename || '').toLowerCase();
            if (ext === '.pdf') {
                const srcDoc = await PDFDocument.load(fs.readFileSync(a.path), { ignoreEncryption: true });
                const pages = await out.copyPages(srcDoc, srcDoc.getPageIndices());
                pages.forEach(p => out.addPage(p));
            } else if (['.jpg','.jpeg','.png','.webp','.heic','.heif','.gif','.bmp','.tif','.tiff'].includes(ext)) {
                const buf = await sharp(a.path).rotate()
                    .resize({ width: 2000, height: 2800, fit: 'inside', withoutEnlargement: true })
                    .jpeg({ quality: 85 }).toBuffer();
                const img = await out.embedJpg(buf);
                const A4_W = 595.28, A4_H = 841.89, margin = 28;
                const maxW = A4_W - 2*margin, maxH = A4_H - 2*margin;
                const scale = Math.min(maxW / img.width, maxH / img.height, 1);
                const w = img.width * scale, h = img.height * scale;
                const page = out.addPage([A4_W, A4_H]);
                page.drawImage(img, { x: (A4_W - w)/2, y: (A4_H - h)/2, width: w, height: h });
            } else {
                console.warn('[append-attachment] Unbekannter Typ uebersprungen:', ext, a.filename);
            }
        } catch (e) {
            console.error('[append-attachment]', a.filename || a.path, e.message);
        }
    }
    fs.writeFileSync(briefPdfPath, await out.save());
}

async function erstelleBrief(firma, empfaenger, betreff, textInhalt, opts = {}) {
    let profile;
    if (opts.is_privat) {
        // Privat: Profile AUSSCHLIESSLICH aus opts.sender_* (keine Firma-Daten)
        const _privAddr = (opts.sender_address || '').replace(/,\s*/g, ' - ').replace(/\s+/g, ' ').trim();
        profile = {
            firma_name: null,
            owner: opts.sender_name || null,
            email: opts.sender_email || null,
            phone: opts.sender_phone || null,
            website: null,
            logo_base64: null,
            logo_path: null,
            bank_details: null,
            footer_text: null,
            ust_nr: null,
            hrb: null,
            amtsgericht: null,
            sitz: null,
            zahlungsempfaenger: null,
            geschaeftsfuehrer: null,
            geschaeftsfuehrer2: null,
            gf_label: null,
            gf_label2: null,
            primary_color: '#000000',
            farbe: '#000000',
            akzent: '#666666',
            lang: 'de',
            header_text: [opts.sender_name, _privAddr].filter(Boolean).join(' · '),
        };
    } else {
        profile = await loadFirma(firma);
        if (!profile) throw new Error(`Firma '${firma}' nicht gefunden`);
    }

    // Header-Text einheitlich normalisieren (privat + firma):
    // PLZ-Ort bleibt deutsche Standardform "PLZ Ort" (kein Swap)
    if (profile.header_text) {
        profile.header_text = profile.header_text
            .replace(/,\s*/g, ' - ')
            .replace(/\s·\s/g, ' - ')
            .replace(/\s+/g, ' ').trim();
    }

    // Fix 10 (2026-04-14): Brief-Counter DB-Lookup
    async function _nextBriefCounter(fid, surname) {
        try {
            let sql, params;
            if (surname) {
                // Privat: pro-Nachname-Counter aus privat_brief_documents (separate DSGVO-Tabelle)
                sql = "SELECT COALESCE(MAX(NULLIF(regexp_replace(doc_id, '.*-', ''), '')::int), 0) AS last FROM privat_brief_documents WHERE doc_type='brief' AND doc_id ~* $1 AND deleted_at IS NULL";
                params = [`^${surname}-`];
            } else {
                sql = "SELECT COALESCE(MAX(NULLIF(regexp_replace(doc_id, '.*-', ''), '')::int), 0) AS last FROM kv_documents WHERE company_id=$1 AND doc_type='brief'";
                params = [fid];
            }
            const rr = await _counterPool.query(sql, params);
            return (parseInt(rr.rows[0].last,10) || 0) + 1;
        } catch (e) { console.error('Brief-Counter DB:', e.message); return 1; }
    }
    let _surname = null;
    if (opts.is_privat) {
        const _sn = (opts.sender_name || "").trim();
        const _last = _sn.split(/\s+/).pop() || "";
        const _cleaned = _last.replace(/[^A-Za-zÄÖÜäöüß]/g, "");
        _surname = _cleaned ? _cleaned.charAt(0).toUpperCase() + _cleaned.slice(1) : null;
    }
    const briefNr = generateBriefNumber(firma, opts.counter || await _nextBriefCounter(firma, _surname), opts);

    let logoBase64 = null;
    if (profile.logo_path && fs.existsSync(profile.logo_path)) {
        logoBase64 = _logoCache.get(profile.logo_path);
        if (!logoBase64) {
            const ext = path.extname(profile.logo_path).slice(1);
            const mime = ext === 'jpg' ? 'jpeg' : ext;
            const buf = fs.readFileSync(profile.logo_path);
            logoBase64 = `data:image/${mime};base64,${buf.toString('base64')}`;
            _logoCache.set(profile.logo_path, logoBase64);
        }
    }

    const lang = profile.lang || 'de';
    const labels = LABELS[lang] || LABELS['de'];

    const context = {
        profile: { ...profile, logo_base64: logoBase64 },
        labels,
        brief: {
            letter_number: briefNr,
            recipient_name: empfaenger.name || empfaenger.recipient_name || '',
            recipient_address: empfaenger.address || empfaenger.recipient_address || '',
            is_privat: !!opts.is_privat,
            recipient_email: empfaenger.email || empfaenger.recipient_email || '',
            recipient_phone: empfaenger.phone || empfaenger.recipient_phone || '',
            subject: betreff,
            salutation: (opts.salutation === false || (textInhalt && /^\s*sehr geehrt|^\s*hallo|^\s*liebe[r]?\s/i.test(textInhalt))) ? '' : (opts.salutation || 'Sehr geehrte Damen und Herren,'),
            body: textInhalt,
            closing: (opts.closing === false || (textInhalt && /mit freundlichen|mfg|viele grüße|herzliche grüße/i.test(textInhalt))) ? '' : (opts.closing || 'Mit freundlichen Grüßen'),
            date: new Date(),
            // Extended Bezug-Felder (alle optional, nur gerendert wenn gefuellt)
            ihr_zeichen: opts.ihr_zeichen || null,
            kunde_nummer: opts.kunde_nummer || null,
            brief_datum: opts.brief_datum || null,
            bezugsdatum_dokument: opts.bezugsdatum_dokument || null,
            dokumentennummer: opts.dokumentennummer || null,
            gp_nummer: opts.gp_nummer || null,
            kassenkonto: opts.kassenkonto || null,
            schuldner: opts.schuldner || null,
            ansprechpartner: opts.ansprechpartner || null,
            ihr_zeichen_label: opts.ihr_zeichen_label || null,
            dokumentennummer_label: opts.dokumentennummer_label || null,
        },
    };

    const html = renderTemplate('brief_node.html', context);

    const outDir = path.join(OUTPUT_DIR, firma);
    fs.mkdirSync(outDir, { recursive: true });

    const pdfPath = path.join(outDir, `${briefNr}.pdf`);
    // 2026-05-05: AN/AB/LI sollen die sevDesk-Belegnummer im Header zeigen, nicht den KV-Counter.
    // Warten auf sdAngebotPromise (parallel gestartet weiter oben) und context neu rendern.
    if (sdAngebotPromise && ['angebot','ab','li'].includes(opts.docType || '')) {
        try {
            const _sdResolved = await sdAngebotPromise;
            const _sdNumber = _sdResolved && (_sdResolved.number || _sdResolved.orderNumber);
            if (_sdNumber) {
                context.kv.quotation_number = _sdNumber;
                html = renderTemplate('kv_node.html', context);
                html = _applyIs18bHtmlPatch(html, opts);
            }
        } catch (e) { /* fallback: bleibt kvNr */ }
    }
    await htmlToPdf(html, pdfPath, { ...profile, logo_base64: logoBase64 });

    if (opts.attachments && opts.attachments.length) {
        try { await _appendAttachmentsToPdf(pdfPath, opts.attachments); }
        catch (e) { console.error('[brief append]', e.message); }
    }

    // Briefe-OneDrive: nach Briefe/<firma>/
    if (opts && opts.preview) { return { ok: true, brief_nummer: briefNr, pdf: pdfPath, preview: true }; }
    let onedrive_brief = null;
    if (ebSync.ONEDRIVE_FIRMAS.has(firma)) {
        try {
            const recipName = (empfaenger.name || empfaenger.recipient_name || 'Empfaenger')
                .replace(/[\\/:*?"<>|]/g, '').trim().split(/[\s,]/).pop() || 'Empfaenger';
            const safeName = String(recipName).slice(0, 60);
            // 2026-04-25: Counter ohne PRIV-/BR-Prefix, plus Absender-Name am Ende
            const counterNum = String(briefNr).replace(/^[A-Za-zÄÖÜäöüß-]+-/, '').replace(/^\d{4}-/, '');
            // Absender bestimmen: Privat = opts.sender_name (last word), Firma = profile.firma_name (last word)
            const absenderRaw = (opts.is_privat ? opts.sender_name : (profile.firma_name || profile.owner)) || '';
            const absenderName = absenderRaw.replace(/[\\/:*?"<>|]/g, '').trim().split(/[\s,]/).pop() || '';
            const oneName = absenderName
                ? `Brief-${safeName}-${counterNum}-${absenderName}.pdf`
                : `Brief-${safeName}-${counterNum}.pdf`;
            const stagedDir = path.join('/tmp', 'brief_' + Date.now() + '_' + Math.random().toString(36).slice(2,8));
            fs.mkdirSync(stagedDir, { recursive: true });
            const stagedPath = path.join(stagedDir, oneName);
            fs.copyFileSync(pdfPath, stagedPath);
            onedrive_brief = await ebSync.uploadToOneDrive(stagedPath, firma, 'brief');
            console.log('OneDrive Brief[' + firma + ']:', oneName);
        } catch (e) {
            console.error('OneDrive-Upload[' + firma + '] (Brief) FEHLER:', e.message);
        }
    }

    // CRM-Register (best-effort) — Privat: separate Tabelle, Firma: kv_documents via registerDocument
    try {
        const _fn = path.basename(pdfPath);
        const _od = buildOnedrivePath('BRIEF', firma, _fn);
        if (opts.is_privat) {
            // Privat-Brief: NICHT in kv_documents, direkt in privat_brief_documents (DSGVO-isoliert)
            try {
                const bezug = JSON.stringify({
                    ihr_zeichen: opts.ihr_zeichen || null,
                    bezugsnummer: opts.bezugsnummer || null,
                    kunde_nummer: opts.kunde_nummer || null,
                    kassenkonto: opts.kassenkonto || null,
                    dokumentennummer: opts.dokumentennummer || null,
                    gp_nummer: opts.gp_nummer || null,
                    schuldner: opts.schuldner || null,
                    bezugsdatum_dokument: opts.bezugsdatum_dokument || null,
                    brief_datum: opts.brief_datum || null,
                    ansprechpartner: opts.ansprechpartner || null,
                    ihr_zeichen_label: opts.ihr_zeichen_label || null,
                    dokumentennummer_label: opts.dokumentennummer_label || null,
                    empfaenger_name_zusatz: opts.empfaenger_name_zusatz || null
                });
                const sqlInsert = "INSERT INTO privat_brief_documents (doc_id, user_id, doc_type, empfaenger_name, empfaenger_address, empfaenger_plz, empfaenger_ort, empfaenger_email, empfaenger_phone, sender_name, sender_address, sender_email, sender_phone, betreff, text, bezugsfelder, pdf_path, onedrive_path) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16::jsonb,$17,$18) ON CONFLICT (doc_id) DO NOTHING";
                await _counterPool.query(sqlInsert, [
                    briefNr,
                    opts.user_id || 1,
                    'brief',
                    empfaenger.name || null,
                    empfaenger.address || null,
                    empfaenger.plz || null,
                    empfaenger.ort || null,
                    empfaenger.email || null,
                    empfaenger.phone || null,
                    opts.sender_name || null,
                    opts.sender_address || null,
                    opts.sender_email || null,
                    opts.sender_phone || null,
                    betreff || null,
                    textInhalt || null,
                    bezug,
                    pdfPath,
                    _od || null,
                ]);
            } catch (e) {
                console.error('[privat_brief_documents INSERT]', e.message);
            }
        } else if (_od) {
            registerDocument({
                firma_slug: firma,
                doc_type: 'BRIEF',
                doc_number: briefNr,
                onedrive_path: _od,
                title: (typeof betreff !== 'undefined' ? betreff : '') || '',
                created_by: 'kv_generator',
            });
        }
    } catch (e) { console.error('[crm_register brief]', e.message); }

    return { brief_nummer: briefNr, pdf: pdfPath, onedrive_brief };
}

// ============================================================
// Exports
// ============================================================

// ============================================================
// Lokaler Render-Helper fuer AB/RE/AN aus kv_cache-Row (kein sevDesk-PDF-Download)
// ============================================================
const TITLE_MAP = { kv: 'Kostenvoranschlag', angebot: 'Angebot', ab: 'Auftragsbestätigung', rechnung: 'Rechnung', abschlagsrechnung: 'Abschlagsrechnung' };
const EINLEITUNG_MAP = {
    kv: 'vielen Dank für Ihre Anfrage. Gerne unterbreiten wir Ihnen folgenden Kostenvoranschlag.',
    angebot: 'vielen Dank für das persönliche Gespräch und die Besichtigung vor Ort. Auf Grundlage unserer gemeinsamen Begehung unterbreiten wir Ihnen folgendes <strong>Angebot</strong>.',
    ab: 'vielen Dank für Ihren Auftrag. Hiermit <strong>bestätigen</strong> wir Ihnen den nachfolgenden Auftrag gemäß Ihrer Beauftragung.',
    rechnung: 'vielen Dank für Ihren Auftrag. Nachfolgend stellen wir Ihnen die erbrachten Leistungen in Rechnung.',
    abschlagsrechnung: 'vielen Dank für Ihren Auftrag. Nachfolgend stellen wir Ihnen die folgende Abschlagsrechnung.',
};

async function renderDocFromKvRow(kvRow, doc, docType, outputPath) {
    const kunde      = typeof kvRow.kunde_json      === 'string' ? JSON.parse(kvRow.kunde_json)      : kvRow.kunde_json;
    const positionen = typeof kvRow.positionen_json === 'string' ? JSON.parse(kvRow.positionen_json) : kvRow.positionen_json;
    const opts       = typeof kvRow.opts_json       === 'string' ? JSON.parse(kvRow.opts_json)       : (kvRow.opts_json || {});

    // §13b UStG (DE Bauleistungen B2B) / §18b UStG (EU-Ausland Reverse Charge): NUR per expliziter User-Freigabe.
    // NICHT auto-detect ueber kunde. (2026-04-14 / 2026-05-12)
    const taxRate = _layoutIs13b(opts) ? 0 : 19;
    const totals = calcTotals(positionen, taxRate, opts.discountPercent || 0);
    if (opts.fixedNetto  != null) { totals.net = opts.fixedNetto; totals.net_after_discount = opts.fixedNetto; }
    if (opts.fixedMwst   != null) totals.tax   = opts.fixedMwst;
    if (opts.fixedBrutto != null) totals.gross = opts.fixedBrutto;

    const profile = await loadFirma(kvRow.firma);
    if (!profile) throw new Error(`Firma '${kvRow.firma}' nicht gefunden in renderDocFromKvRow`);
    let logoBase64 = null;
    if (profile.logo_path && fs.existsSync(profile.logo_path)) {
        logoBase64 = _logoCache.get(profile.logo_path);
        if (!logoBase64) {
            const ext = path.extname(profile.logo_path).slice(1);
            const mime = ext === 'jpg' ? 'jpeg' : ext;
            logoBase64 = 'data:image/' + mime + ';base64,' + fs.readFileSync(profile.logo_path).toString('base64');
            _logoCache.set(profile.logo_path, logoBase64);
        }
    }

    const lang = profile.lang || 'de';
    const labels = { ...(LABELS[lang] || LABELS['de']) };
    labels.kv_titel = TITLE_MAP[docType] || TITLE_MAP.kv;
    labels.einleitung = EINLEITUNG_MAP[docType] || EINLEITUNG_MAP.kv;
    // 2026-04-30 doctype-leak fix: Whitespace statt '' (sonst Jinja-or-Fallback zur KV-Boilerplate)
    if (docType !== 'kv') {
        labels.gueltigkeit = ' ';
        labels.ab_bestaetigung = ' ';
        labels.bauleitung_titel = '';
        labels.bauleitung = '';
    }
    if (docType === 'rechnung' || docType === 'abschlagsrechnung' || docType === 'li') {
        labels.vertragsgrundlage_titel = ''; labels.vertragsgrundlage = '';
        labels.gewaehrleistung_titel = '';   labels.gewaehrleistung = '';
        labels.zahlung_titel = '';           labels.zahlung = '';
        labels.zusatzarbeiten_titel = '';    labels.zusatzarbeiten = '';
    }

    // AB-Schlusstext Pflicht 2026-04-14 (firma-dynamisch, B2C bekommt Widerrufsbelehrung)
    if (docType === 'ab') {
        labels.vertragsgrundlage_titel = ''; labels.vertragsgrundlage = '';
        labels.gewaehrleistung_titel = '';   labels.gewaehrleistung = '';
        labels.zahlung_titel = '';           labels.zahlung = '';
        labels.zusatzarbeiten_titel = '';    labels.zusatzarbeiten = '';
        const _firmaName = profile.firma_name || profile.name || '';
        const _adrLines = String(profile.address || '').split('\n').map(s => s.trim()).filter(Boolean);
        const _strasse = _adrLines[1] || '';
        const _plzOrt  = _adrLines[2] || '';
        const _email   = profile.email || '';
        const _teamMap = { '089dach': '089Dach GmbH Team', 'sakar': 'Mustafa Sakar', 'kshw-muc': 'KSHW München Team' };
        const _slug = profile.firma_slug || profile.slug || kvRow.firma;
        labels.schluss_signatur = _teamMap[_slug] || (_firmaName + ' Team');
        const _isB2C = String(kunde.kunde_typ || '').toLowerCase() === 'b2c';
        const _kundeNameFull = (kunde.name || [(kunde.first_name||''),(kunde.last_name||'')].filter(Boolean).join(' ') || '').trim();

        // Abschlagsplan: opts.abschlagsplan als Array [{nr, prozent, text}] ueberschreibbar, sonst Default 50/30/15/5
        const _defaultAbschl = [
            {nr: 1, prozent: 50, text: "als rechtsverbindliche Auftragserteilung, sofort fällig vor Arbeitsbeginn"},
            {nr: 2, prozent: 30, text: "bei angemessenem Baufortschritt, sofort fällig"},
            {nr: 3, prozent: 15, text: "bei angemessenem Baufortschritt, sofort fällig"},
            {nr: "Schluss", prozent: 5, text: "nach mängelfreier Fertigstellung, Endabnahme und Übergabe der geschuldeten Leistung an den Auftraggeber"},
        ];
        const _abschlPlan = (Array.isArray(opts.abschlagsplan) && opts.abschlagsplan.length > 0)
            ? opts.abschlagsplan : _defaultAbschl;
        const _abschlHtml = _abschlPlan.map(a => {
            const isSchluss = String(a.nr).toLowerCase().startsWith("schluss") || a.nr === null || a.nr === undefined;
            if (isSchluss) return `<strong>Schlusszahlung:</strong> ${a.prozent} % ${a.text}.`;
            return `<strong>Abschlagszahlung ${a.nr}:</strong> in Höhe von ${a.prozent} % ${a.text}.`;
        }).join("<br>\n");

        const _widerrufBlock = _isB2C ? `
<p class="section-title">Widerrufsrecht:</p>
<p style="font-size:9pt;color:#666;margin-top:-4px;"><em>Muster-Widerrufsbelehrung nach Anlage 1 zu Art. 246a § 1 Abs. 2 S. 2 EGBGB, Stand: 28.05.2022.</em></p>
<p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses. Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (${_firmaName}, ${_strasse}, ${_plzOrt}, ${_email}) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.</p>
<p class="section-title">Folgen des Widerrufs:</p>
<p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet. Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen sollen, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.</p>
` : '';

        labels.ab_schlusstext = `
<p><strong>Mit diesem Werkvertrag bestätigen wir Ihnen das obenstehende Leistungsverzeichnis.</strong></p>
<p class="section-title">Vertragsgrundlage:</p>
<p>Es gilt § 650a BGB (Bauvertrag), in seiner jeweils gültigen Fassung.</p>
<p class="section-title">Gewährleistung:</p>
<p>Nach den Bestimmungen des BGB, 5 Jahre.</p>
<p class="section-title">Zahlung:</p>
<p>Das Zahlungsziel wird mit dieser Auftragsbestätigung festgelegt.<br>Zahlungen sind nach Rechnungstellung innerhalb von 5 Tagen ohne Skontoabzug zu leisten.</p>
<p>${_abschlHtml}</p>
<p class="section-title">Zusatzarbeiten:</p>
<p>Leistungen, die über den in diesem Angebot beschriebenen Umfang hinausgehen, gelten als Zusatzarbeiten. Diese werden nur nach vorheriger Abstimmung vor Ort und nach schriftlicher Beauftragung durch den Auftraggeber ausgeführt und gesondert in Rechnung gestellt. Mündliche Nebenabreden sind ausgeschlossen.</p>
<p class="section-title">Bauleitung:</p>
<p>Die Bauleitung übernimmt für Ihr Objekt vor Ort, selbstverständlich unsere Betriebs- und Bauleiter.</p>
${_widerrufBlock}
<p style="margin-top:24px;">Zum Zeichen des beiderseitigen Einverständnisses senden Sie uns bitte ein Exemplar der Auftragsbestätigung unterschrieben an uns zurück.</p>
<p style="margin-top:32px;">Auftrag erteilt am _____________________</p>
<p style="margin-top:24px;">_______________________________<br>${_kundeNameFull}</p>
`.trim();
    }

    if (!doc) throw new Error('renderDocFromKvRow: doc undefined');
    const docNumber = doc.number || doc.orderNumber || doc.invoiceNumber || ('DRAFT-' + doc.id);
    let customerAddr = kunde.customer_address || kunde.address || '';
    if (!customerAddr && (kunde.street || kunde.city)) {
        customerAddr = [kunde.street, (kunde.zip || '') + ' ' + (kunde.city || '')].filter(x => x && x.trim()).join('\n');
    }
    if (customerAddr && kunde.name && customerAddr.split('\n')[0].trim() === kunde.name.trim()) {
        customerAddr = customerAddr.split('\n').slice(1).join('\n');
    }
    const projectAddr = opts.objekt_adresse
        ? [opts.objekt_adresse.street, (opts.objekt_adresse.zip || '') + ' ' + (opts.objekt_adresse.city || '')].filter(x => x && x.trim()).join(', ')
        : (opts.projectAddress || '');

    // Anrede: Herr/Frau + Nachname wenn Gender bekannt, sonst 'Damen und Herren'
    // Bei vortext mit Anrede oder opts.salutation===false: Anrede unterdruecken (keine Dopplung)
    const gender = (kunde.gender || '').toLowerCase();
    const lastName = kunde.last_name || (kunde.name || '').split(/[\s,]/).filter(Boolean).pop() || '';
    let salutation;
    if (opts.salutation === false || (opts.vortext && /sehr geehrt|poštovan|sayın/i.test(opts.vortext))) {
        salutation = '';
    } else if (kunde.anrede) {
        salutation = kunde.anrede;
    } else if (gender === 'male' || gender === 'm' || gender === 'herr') {
        salutation = 'Sehr geehrter Herr ' + lastName + ',';
    } else if (gender === 'female' || gender === 'f' || gender === 'frau') {
        salutation = 'Sehr geehrte Frau ' + lastName + ',';
    } else if (kunde.ansprechpartner) {
        salutation = 'Sehr geehrter Herr ' + kunde.ansprechpartner + ',';
    } else {
        salutation = 'Sehr geehrte Damen und Herren,';
    }

    const context = {
        profile: { ...profile, logo_base64: logoBase64 },
        labels,
        kv: {
            quotation_number: docNumber,
            customer_name: kunde.name || kunde.customer_name || '',
            customer_address: customerAddr,
            customer_email: kunde.email || kunde.customer_email || '',
            customer_phone: formatDePhone(kunde.phone || kunde.customer_phone || kunde.telefon || ""),
            customer_number: kunde.number || kunde.customerNumber || kunde.kundennummer || '',
            salutation,
            project_address: projectAddr,
            positions: expandKapitelSubtitles(positionen),
            date: new Date(),
            valid_until: new Date(Date.now() + (opts.validDays || 10) * 86400000),
            valid_days: opts.validDays || 10,
            discount_percent: opts.discountPercent || 0,
            notes: opts.notes || '',
            referenz: opts.referenz || (docType === 'ab' ? (kvRow.sd_an_number || kvRow.kv_nummer || '') : (docType === 'rechnung' || docType === 'abschlagsrechnung') ? (kvRow.sd_ab_number || kvRow.sd_an_number || kvRow.kv_nummer || '') : (kvRow.kv_nummer || '')),
            is_13b: _layoutIs13b(opts),
            is_18b: _is18bMode(opts),
            vortext: opts.vortext || '',
            nachtext: opts.nachtext || '',
            hide_bedingungen: !!opts.hide_bedingungen,
            titel: opts.titel || labels.kv_titel || '',
            einleitung: opts.einleitung !== undefined ? opts.einleitung : (opts.vortext ? '' : (labels.einleitung || '')),
            ab_schlusstext: labels.ab_schlusstext || '',
            untertitel: opts.untertitel || '',
        },
        totals,
    };

    let html = renderTemplate('kv_node.html', context);
    html = _applyIs18bHtmlPatch(html, opts);
    await htmlToPdf(html, outputPath, { ...profile, logo_base64: logoBase64 });
    return outputPath;
}



// ============================================================
// generateRechnung — nutzt eigenes Template rechnung_node.html
// Typen: RE (Rechnung), AR (Abschlagsrechnung), SR (Schlussrechnung)
// KEIN Widerruf. Bankdaten + Verzug + Zahlungsziel.
// ============================================================
async function generateRechnung(args = {}) {
    let {
        firma,
        kunde,
        positionen,
        rechnung_nr,
        rechnung_datum,
        leistungszeitraum,
        bezug_ab,
        zahlungsziel_tage = null,
        zahlungsziel_einheit = 'Tagen',
        typ = 'RE',
        abschlag_nr = null,
        projectAddress = '',
        notes = '',
        opts = {},
    } = args;

    if (!firma) throw new Error('generateRechnung: firma fehlt');
    if (!Array.isArray(positionen) || positionen.length === 0) throw new Error('generateRechnung: Keine Positionen');

    // D2.3: sevDesk-Invoice-Entwurf anlegen wenn rechnung_nr fehlt (sevDesk = Master fuer Nummern)
    let sd_invoice = null;
    if (!rechnung_nr && ebSync.SUPPORTED_FIRMAS.has(firma)) {
        try {
            let _ku = kunde;
            if (typeof _ku === 'string') {
                const found = await lookupKunde(firma, _ku);
                _ku = found || { name: _ku, number: '' };
            }
            if (_ku && _ku.number) {
                const sdFirma = ({"089dach":'089dach',"kshw-muc":'089dach',"089sanierer":'089dach',"089-sanierer":'089dach',"estriche":'089dach',"sanitär-muenchen":'089dach',"aquapro24":'sakar',"sakar":'sakar'}[firma] || 'sakar');
                const cid = await sdBelege.findContactIdByNumber(_ku.number, sdFirma);
                if (cid) {
                    const _ho = (opts.vortext || '').toString().trim();
                    const _fo = (opts.nachtext || '').toString().trim();
                    const addrParts = (_ku.address || '').split('\n').filter(Boolean);
                    let addrStreet = '', addrZip = '', addrCity = '';
                    for (const line of addrParts) {
                        const m = line.match(/^(\d{5})\s+(.+)/);
                        if (m) { addrZip = m[1]; addrCity = m[2]; }
                        else if (line !== _ku.name && !line.startsWith('z. Hd.')) addrStreet = line;
                    }
                    sd_invoice = await sdBelege.createInvoice(String(cid), positionen, {
                        firma: sdFirma,
                        invoiceType: typ,
                        is13b: !!opts.is_13b,
                        ...(_ho ? { headText: _ho } : {}),
                        ...(_fo ? { footText: _fo } : {}),
                        ...(bezug_ab ? { customerInternalNote: 'Bezug AB ' + bezug_ab } : {}),
                        addressName: _ku.name || '',
                        addressStreet: addrStreet,
                        addressZip: addrZip,
                        addressCity: addrCity,
                    });
                    if (sd_invoice && sd_invoice.invoiceNumber) {
                        rechnung_nr = sd_invoice.invoiceNumber;
                        args.rechnung_nr = rechnung_nr;
                        console.log('generateRechnung: sevDesk-Invoice angelegt', rechnung_nr, '(id', sd_invoice.id, ')');
                    }
                } else {
                    console.warn('generateRechnung: Kein sevDesk-Kontakt fuer', _ku.number);
                }
            }
        } catch (e) {
            console.error('generateRechnung sevDesk-Invoice Fehler:', e.message);
        }
    }
    if (!rechnung_nr) throw new Error('generateRechnung: rechnung_nr fehlt (sevDesk-Anlage hat keine Nummer geliefert; firma in SUPPORTED_FIRMAS? kunde.number gesetzt?)');
    // H2 Fix 2026-04-15: Format RE-YYYY-NNNN erzwingen
    {
        const _reRx = /^(RE|AR|SR)-\d{4}-\d{1,6}$/;
        if (!_reRx.test(String(rechnung_nr))) {
            const _m = String(rechnung_nr).match(/(\d{4})[-_\/ ]?(\d{1,6})/);
            if (_m) {
                rechnung_nr = (String(typ||'RE').toUpperCase()) + '-' + _m[1] + '-' + String(_m[2]).padStart(4, '0');
                args.rechnung_nr = rechnung_nr;
                console.error('H2: rechnung_nr auto-format -> ' + rechnung_nr);
            } else {
                throw new Error('generateRechnung: rechnung_nr invalid format (erwartet RE-YYYY-NNNN), bekommen: ' + rechnung_nr);
            }
        }
    }

    // Kunde auflösen
    let kundeObj = kunde;
    if (typeof kunde === 'string') {
        const found = await lookupKunde(firma, kunde);
        kundeObj = found || { name: kunde, address: '', email: '', phone: '', number: '' };
    }
    // Objekt-Kunde: address aus adresse/plz/ort zusammenbauen wenn address leer
    if (kundeObj && !kundeObj.address && !kundeObj.customer_address) {
        const _a = kundeObj.adresse || kundeObj.street || '';
        const _p = kundeObj.plz || kundeObj.zip || '';
        const _o = kundeObj.ort || kundeObj.city || '';
        const _plzort = [_p, _o].filter(Boolean).join(' ');
        const _addr = [_a, _plzort].filter(Boolean).join('\n');
        if (_addr) kundeObj.address = _addr;
    }
    // kundennr -> number mapping
    if (kundeObj && !kundeObj.number && kundeObj.kundennr) kundeObj.number = kundeObj.kundennr;

    const profile = await loadFirma(firma);
    if (!profile) throw new Error("Firma '" + firma + "' nicht gefunden");

    const is13b = _layoutIs13b(opts);
    const taxRate = is13b ? 0.0 : ((opts.taxRate != null) ? Number(opts.taxRate) : 19.0);
    const discountPercent = opts.discountPercent || 0;
    const totals = calcTotals(positionen, taxRate, discountPercent);
    if (opts.fixedNetto != null) {
        totals.net = opts.fixedNetto;
        totals.net_after_discount = opts.fixedNetto - (totals.discount || 0);
        totals.tax = Math.round(totals.net_after_discount * taxRate) / 100;
        totals.gross = Math.round((totals.net_after_discount + totals.tax) * 100) / 100;
    }
    if (opts.fixedMwst != null) totals.tax = opts.fixedMwst;
    if (opts.fixedBrutto != null) totals.gross = opts.fixedBrutto;

    // Logo
    let logoBase64 = null;
    if (profile.logo_path && fs.existsSync(profile.logo_path)) {
        logoBase64 = _logoCache.get(profile.logo_path);
        if (!logoBase64) {
            const ext = path.extname(profile.logo_path).slice(1);
            const mime = ext === 'jpg' ? 'jpeg' : ext;
            const buf = fs.readFileSync(profile.logo_path);
            logoBase64 = 'data:image/' + mime + ';base64,' + buf.toString('base64');
            _logoCache.set(profile.logo_path, logoBase64);
        }
    }

    const lang = profile.lang || 'de';
    const labels = { ...(LABELS[lang] || LABELS['de']) };
    const TYP_TITEL = { RE: 'Rechnung', AR: 'Abschlagsrechnung', SR: 'Schlussrechnung' };
    let _reTitel = opts.re_titel || TYP_TITEL[typ] || 'Rechnung';
    if (typ === 'AR' && abschlag_nr) _reTitel = abschlag_nr + '. ' + (TYP_TITEL.AR || 'Abschlagsrechnung');
    labels.re_titel = _reTitel;
    if (opts.labels && typeof opts.labels === 'object') Object.assign(labels, opts.labels);
    labels.einleitung = opts.einleitung || 'vielen Dank f\u00fcr Ihren Auftrag. Nachfolgend stellen wir Ihnen die erbrachten Leistungen in Rechnung.';

    // Fix: DD.MM.YYYY -> YYYY-MM-DD (new Date kennt nur ISO/US)
    function _parseDatum(d) {
        if (!d) return new Date();
        if (d instanceof Date) return d;
        const m = String(d).match(/^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})$/);
        if (m) return new Date(parseInt(m[3]), parseInt(m[2])-1, parseInt(m[1]));
        const dt = new Date(d);
        return isNaN(dt.getTime()) ? new Date() : dt;
    }
    const now = _parseDatum(rechnung_datum);

    // Salutation aus kundeObj ableiten (Fix 2026-04-15: anrede='Herr' → volle Anrede bauen)
    let salutation = opts.salutation;
    if (salutation == null) {
        const ln = kundeObj.last_name || kundeObj.familyname || kundeObj.nachname || (kundeObj.name ? String(kundeObj.name).trim().split(/\s+/).slice(-1)[0] : '');
        const rawAnrede = (kundeObj.anrede || '').toString().trim();
        const anredeLower = rawAnrede.toLowerCase();
        const g = (kundeObj.gender || '').toString().toLowerCase();
        if (/sehr geehrt/i.test(rawAnrede)) {
            salutation = rawAnrede.endsWith(',') ? rawAnrede : rawAnrede + ',';
        } else if (ln && (anredeLower === 'herr' || g === 'herr' || g === 'm' || g === 'male')) {
            salutation = 'Sehr geehrter Herr ' + ln + ',';
        } else if (ln && (anredeLower === 'frau' || g === 'frau' || g === 'w' || g === 'f' || g === 'female')) {
            salutation = 'Sehr geehrte Frau ' + ln + ',';
        } else {
            salutation = 'Sehr geehrte Damen und Herren,';
        }
    }

    const context = {
        profile: { ...profile, logo_base64: logoBase64 },
        labels,
        kv: {
            invoice_number: rechnung_nr,
            quotation_number: rechnung_nr,
            customer_name: kundeObj.name || kundeObj.customer_name || '',
            customer_address: kundeObj.address || kundeObj.customer_address || '',
            customer_email: kundeObj.email || kundeObj.customer_email || '',
            customer_phone: formatDePhone(kundeObj.phone || kundeObj.customer_phone || ''),
            customer_number: kundeObj.number || '',
            salutation: salutation,
            project_address: projectAddress,
            positions: expandKapitelSubtitles(positionen),
            date: now,
            leistungszeitraum: leistungszeitraum || '',
            bezug_ab: bezug_ab || '',
            zahlungsziel_tage: (zahlungsziel_tage === 0 ? 'sofort' : (zahlungsziel_tage != null ? zahlungsziel_tage : (profile.zahlungsziel || 5))),
            zahlungsziel_einheit: (zahlungsziel_tage === 0 ? '' : (zahlungsziel_einheit || 'Tagen')),
            notes: notes,
            is_13b: is13b,
            is_18b: _is18bMode(opts),
            vortext: opts.vortext || '',
            nachtext: opts.nachtext || '',
            hide_bedingungen: !!opts.hide_bedingungen,
            untertitel: opts.untertitel || '',
            vorherige_abschlaege: Array.isArray(args.vorherige_abschlaege) ? args.vorherige_abschlaege : [],
            geleistete_abschlaege: Array.isArray(args.geleistete_abschlaege) ? args.geleistete_abschlaege : [],
            abschlaege_summe: (Array.isArray(args.geleistete_abschlaege) ? args.geleistete_abschlaege : []).reduce((s,a)=>s+Number(a.betrag_brutto||0),0),
            restzahlung: (function(){
                const summe = (Array.isArray(args.geleistete_abschlaege) ? args.geleistete_abschlaege : []).reduce((s,a)=>s+Number(a.betrag_brutto||0),0);
                return Math.round((totals.gross - summe) * 100) / 100;
            })(),
        },
        totals,
    };

    // H4 Anpassung totals.net fuer AR mit vorherige_abschlaege (Netto-Abzug)
    if (typ === 'AR' && Array.isArray(args.vorherige_abschlaege) && args.vorherige_abschlaege.length) {
        const _abzug = args.vorherige_abschlaege.reduce((s,v)=>s+Number(v.betrag_netto||0),0);
        const _netNew = totals.net_after_discount - _abzug;
        const _taxNew = Math.round(_netNew * taxRate) / 100;
        totals.net_after_discount = Math.round(_netNew * 100) / 100;
        totals.tax = _taxNew;
        totals.gross = Math.round((_netNew + _taxNew) * 100) / 100;
        // recompute restzahlung/abschlaege_summe unchanged; nothing to do
    }

    let html = renderTemplate('rechnung_node.html', context);
    html = _applyIs18bHtmlPatch(html, opts);

    const outDir = path.join(OUTPUT_DIR, firma);
    fs.mkdirSync(outDir, { recursive: true });

    // Dateiname (2026-05-18 neu): <TYP>-<JAHR>-<NR>-<NACHNAME>-<OBJEKTADRESSE>.pdf
    const jahr = now.getFullYear();
    const nrSan = String(rechnung_nr).replace(/^(RE|AR|SR)[-_\/ ]?/i, '').replace(/^\d{4}[-_\/ ]/, '').replace(/[^A-Za-z0-9-]/g, '-');
    const firmaUpper = String(firma).toUpperCase();
    const kdNr = (kundeObj.number || '').toString().replace(/^KU-\d{4}-/i, '').replace(/[^A-Za-z0-9]/g, '');
    const nameK = (kundeObj.name || kundeObj.customer_name || 'Kunde')
        .replace(/[^A-Za-z0-9äöüÄÖÜß ]/g, '').trim().split(/\s+/).slice(-1)[0].slice(0, 20);
    // Objektadresse: projectAddress, sonst Fallback kunde.address (in einer Zeile mit ", ")
    let _addrRaw = (projectAddress || '').toString().trim();
    if (!_addrRaw) {
        _addrRaw = String(kundeObj.address || '').replace(/\n+/g, ', ').trim();
    }
    // Sanitize: ungueltige Filesystem-Chars raus, Umlaute behalten
    const objAddr = _addrRaw.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').slice(0, 80) || 'ohne-Adresse';
    let fname = `${String(typ||"RE").toUpperCase()}-${jahr}-${nrSan}-${nameK}-${objAddr}.pdf`;
    let pdfPath = path.join(outDir, fname);
    // Regel: Immer gleicher Dateiname, alte Version ueberschreiben
    if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
    }

    // 2026-05-05: AN/AB/LI sollen die sevDesk-Belegnummer im Header zeigen, nicht den KV-Counter.
    // Warten auf sdAngebotPromise (parallel gestartet weiter oben) und context neu rendern.
    if (typeof sdAngebotPromise !== 'undefined' && sdAngebotPromise && ['angebot','ab','li'].includes(opts.docType || '')) {
        try {
            const _sdResolved = await sdAngebotPromise;
            const _sdNumber = _sdResolved && (_sdResolved.number || _sdResolved.orderNumber);
            if (_sdNumber) {
                context.kv.quotation_number = _sdNumber;
                html = renderTemplate('kv_node.html', context);
                html = _applyIs18bHtmlPatch(html, opts);
            }
        } catch (e) { /* fallback: bleibt kvNr */ }
    }
    await htmlToPdf(html, pdfPath, { ...profile, logo_base64: logoBase64 });

    // OneDrive (best-effort)
    let onedrive_re = null;
    try {
        if (ebSync.ONEDRIVE_FIRMAS && ebSync.ONEDRIVE_FIRMAS.has(firma)) {
            onedrive_re = await ebSync.uploadToOneDrive(pdfPath, firma, 'rechnung');
        }
    } catch (e) {
        console.error('OneDrive-Upload[' + firma + '] (Rechnung) FEHLER:', e.message);
    }

    // CRM-Register (best-effort)
    try {
        const _fn = path.basename(pdfPath);
        const _od = buildOnedrivePath(String(typ || 'RE').toUpperCase(), firma, _fn);
        if (_od) {
            registerDocument({
                firma_slug: firma,
                doc_type: String(typ || 'RE').toUpperCase(),
                doc_number: rechnung_nr,
                onedrive_path: _od,
                title: (kundeObj && (kundeObj.name || kundeObj.customer_name)) || '',
                amount_net: (totals && totals.net_after_discount) || null,
                amount_gross: (totals && totals.gross) || null,
                sevdesk_ref_id: (sd_invoice && sd_invoice.id) || null,
                bezug_ab: bezug_ab || null,
                abschlag_nr: abschlag_nr || null,
                created_by: 'kv_generator',
            });
        }
    } catch (e) { console.error('[crm_register rechnung]', e.message); }

    return { rechnung_nr, typ, pdf: pdfPath, onedrive_re, sd_invoice_id: (sd_invoice && sd_invoice.id) || null, sd_invoice_number: (sd_invoice && sd_invoice.invoiceNumber) || null };
}



// ============================================================
// AB → sevdesk LIEFERSCHEIN (per createLIFromAB)
// ============================================================
async function lieferscheinAusAB({ firma, ab_nummer, kv_nummer, positions, gewerk }) {
    let row = null;
    if (kv_nummer) {
        const rows = await kvCache.findKv({ kv_nummer });
        if (!rows.length) throw new Error('Kein KV im Cache');
        row = rows[0];
        if (!ab_nummer) ab_nummer = row.sd_ab_number;
    }
    if (!ab_nummer) throw new Error('lieferscheinAusAB: ab_nummer fehlt');
    const li = await ebSync.createLIFromAB({ firma, ab: ab_nummer, opts: { positions, gewerk } });
    if (row) {
        try {
            await kvCache.pool.query(
                'UPDATE kv_cache SET sd_li_id=$1, sd_li_number=$2, updated_at=now() WHERE kv_nummer=$3',
                [li.id, li.number || null, row.kv_nummer]
            );
        } catch (e) { console.error('kv_cache LI write FEHLER:', e.message); }
    }
    let onedrive = null;
    try {
        if (row) onedrive = await ebSync.dropDocPdfToOneDrive(li, row, 'li');
    } catch (e) { console.error('OneDrive-Upload (LI) FEHLER:', e.message); }
    return { ok: true, li_nummer: li.number, sd_li_id: li.id, onedrive };
}


// PERF: Pre-warm browser on module load (async, non-blocking)
if (process.env.USE_WEASY === '0') getBrowser().then(() => console.log("[perf] Browser pre-warmed")).catch(e => console.warn("[perf] Browser pre-warm failed:", e.message));

module.exports = {
    _prewarmBrowser,
    erstelleKV,
    erstelleBrief,
    generateRechnung,
    lieferscheinAusAB,
    kvZuAB,
    rechnungAusKV,
    abschlagAusKV,
    closeBrowser,
    FIRMEN: FIRMEN_FALLBACK,  // Backwards-Compat; neuer Code nutzt loadFirma()
    FIRMEN_FALLBACK,
    loadFirma,
    calcTotals,
    htmlToPdf,
    renderDocFromKvRow,
};

// AUTO-PREWARM: Browser beim Import starten
if (process.env.USE_WEASY === '0') _prewarmBrowser().catch(e => console.error('prewarm:', e.message));
