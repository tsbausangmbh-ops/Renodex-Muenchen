/**
 * sevdesk_belege.js — sevDesk Order/Invoice Anlegen aus Node (KV-Generator)
 *
 * Wird vom generator.js erstelleKV() aufgerufen wenn firma==='089dach'.
 * Spiegelt /opt/system/core/sevdesk_api.py create_invoice/create_order.
 *
 * KV-Generator-Position: { title, subtitle, desc, qty, price, unit }
 * sevDesk Pos: { name, text, quantity, price, unity{id}, taxRate, discount }
 */
const fs = require('fs');


let _vaultCache = null;
let _vaultCacheTime = 0;
// Brand-OrderNumber-Prefix (Phase 2 2026-04-24)
const BRAND_ORDER_PREFIX = {
    '089dach':          '089DACH',
    'kshw-muc':         'KSHW',
    'aquapro24':        'AQUA',
    // estriche/sanitär-muenchen/089sanierer ab 2026-05-05 zu 089Dach (Standard-Nummernkreis, kein Brand-Prefix)
};

async function getNextBrandOrderNumber(orderType, brand, firma) {
    const prefix = BRAND_ORDER_PREFIX[brand];
    if (!prefix) throw new Error('getNextBrandOrderNumber: unbekannter brand ' + brand);
    const patternStart = orderType + '/' + prefix + '/';
    const r = await _req('GET', '/Order', { firma, params: { limit: 1000, orderType } });
    const items = _objects(r);
    let max = 0;
    for (const it of items) {
        const on = String(it.orderNumber || '');
        if (on.startsWith(patternStart)) {
            const n = parseInt(on.slice(patternStart.length), 10);
            if (Number.isFinite(n) && n > max) max = n;
        }
    }
    return patternStart + (max + 1);
}

async function getNextBrandInvoiceNumber(invoiceType, brand, firma) {
    const prefix = BRAND_ORDER_PREFIX[brand];
    if (!prefix) throw new Error('getNextBrandInvoiceNumber: unbekannter brand ' + brand);
    const patternStart = invoiceType + '/' + prefix + '/';
    const r = await _req('GET', '/Invoice', { firma, params: { limit: 1000, invoiceType } });
    const items = _objects(r);
    let max = 0;
    for (const it of items) {
        const iv = String(it.invoiceNumber || '');
        if (iv.startsWith(patternStart)) {
            const n = parseInt(iv.slice(patternStart.length), 10);
            if (Number.isFinite(n) && n > max) max = n;
        }
    }
    return patternStart + (max + 1);
}

const VAULT = '/ai-platform/vault/credentials.json';
function _loadVault() {
  const now = Date.now();
  if (_vaultCache && (now - _vaultCacheTime) < 60000) return _vaultCache;
  _vaultCache = JSON.parse(fs.readFileSync(VAULT, 'utf8'));
  _vaultCacheTime = now;
  return _vaultCache;
}
const BASE = 'https://my.sevdesk.de/api/v1';
const DEFAULT_TAX_RATE = 19;
const DEFAULT_TAX_TEXT = 'USt. 19%';
const TAX_13B_RATE = 0;
const TAX_13B_TEXT = 'Hinweis zur Steuerschuldnerschaft gem. § 13b UStG: Für die in dieser Rechnung aufgeführten Bauleistungen gilt die Steuerschuldnerschaft des Leistungsempfängers. Die Umsatzsteuer wird daher nicht ausgewiesen. Der Leistungsempfänger ist verpflichtet, die Umsatzsteuer im Rahmen des Reverse-Charge-Verfahrens an das zuständige Finanzamt abzuführen.';

const FIRMA_TO_VAULT_TENANT = {
    '089dach':           '089dach',
    'kshw-muc':          '089dach',  // läuft im 089Dach-Account
    'aquapro24':         'sakar',
    'sakar':             'sakar',
    // ab 2026-05-05: 089-Sanierer/Estriche/Sanitär laufen im 089Dach-Account
    '089sanierer':       '089dach',
    '089-sanierer':      '089dach',
    'estriche':          '089dach',
    'sanitär-muenchen':  '089dach',
};
function loadKey(firma = '089dach') {
    const tenant = FIRMA_TO_VAULT_TENANT[firma] || firma;
    const v = JSON.parse(fs.readFileSync(VAULT, 'utf8'));
    const k = ((v.sevdesk || {})[tenant] || {}).api_key;
    if (!k) throw new Error(`sevdesk: kein api_key fuer firma='${firma}' tenant='${tenant}'`);
    return k;
}

async function _req(method, path, { firma = '089dach', params, body } = {}) {
    let url = BASE + path;
    if (params) url += '?' + new URLSearchParams(params).toString();
    const headers = {
        'Authorization': loadKey(firma),
        'Accept': 'application/json',
        'User-Agent': 'curl/8.4.0',
    };
    const init = { method, headers };
    if (body !== undefined) {
        init.body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
    }
    const RETRY = new Set([429,500,502,503]);
    const DD = [500,1000,2000];
    let le = null;
    for (let a=0; a<=3; a++) {
        try {
            const r = await fetch(url, init);
            if (!r.ok) {
                if (RETRY.has(r.status) && a<3) { await new Promise(x=>setTimeout(x,DD[a]+Math.floor(Math.random()*DD[a]))); continue; }
                const txt = await r.text();
                throw new Error(`sevdesk ${method} ${path} -> ${r.status}: ${txt.slice(0,300)}`.replace(/[a-f0-9]{32,}/g,"***"));
            }
            return await r.json();
        } catch (e) {
            le = e;
            if (a<3 && /ECONNRESET|ETIMEDOUT|fetch failed/i.test(String(e.message))) { await new Promise(x=>setTimeout(x,DD[a]+Math.floor(Math.random()*DD[a]))); continue; }
            throw e;
        }
    }
    throw le || new Error("sevdesk _req unknown");
}

function _objects(d) {
    const o = d && d.objects;
    if (!o) return [];
    return Array.isArray(o) ? o : [o];
}

const _userIdCache = new Map();
async function _userId(firma) {
  if (_userIdCache.has(firma)) return _userIdCache.get(firma);
    const r = await _req('GET', '/SevUser', { firma, params: { limit: 1 } });
    const objs = _objects(r);
    if (!objs.length) throw new Error('sevdesk: kein SevUser');
    return objs[0].id;
}

function _normalizePos(p, idx, objectName, taxRate) {
    const titleParts = [p.title || '', p.subtitle || ''].filter(Boolean);
    const name = titleParts.join(' — ').slice(0, 200) || `Position ${idx + 1}`;
    const text = p.desc ? String(p.desc).slice(0, 8000) : null;
    return {
        objectName,
        mapAll: true,
        quantity: Number(p.qty || 1),
        price: Number(p.price || 0),
        name,
        text,
        unity: { id: 1, objectName: 'Unity' },
        taxRate: taxRate != null ? Number(taxRate) : DEFAULT_TAX_RATE,
        discount: 0,
    };
}

async function getNextOrderNumber(orderType = 'AN', firma = '089dach') {
    const r = await _req('GET', '/Order/Factory/getNextOrderNumber', {
        firma,
        params: { orderType, useNextNumber: 'true' },
    });
    return r && r.objects;
}

/**
 * @param contactId  sevDesk Contact-ID (NICHT customerNumber)
 * @param positions  Array von KV-Generator-Positionen
 * @param opts       { invoiceDate, header, firma }
 */

async function getNextInvoiceNumber(invoiceType = 'RE', firma = '089dach') {
    const r = await _req('GET', '/Invoice/Factory/getNextInvoiceNumber', {
        firma,
        params: { invoiceType, useNextNumber: 'true' },
    });
    return r && r.objects;
}

async function createInvoice(contactId, positions, opts = {}) {
    const firma = opts.firma || '089dach';
    const invoiceDate = opts.invoiceDate || new Date().toISOString().slice(0, 10);
    const invoiceType = opts.invoiceType || 'RE';
    // AR (Abschlag) = Prepayment → deliveryDate muss in der Zukunft sein; sonst deliveryDate == invoiceDate.
    let deliveryDate = invoiceDate;
    if (invoiceType === 'AR') {
        const _d = new Date(invoiceDate + 'T12:00:00Z');
        _d.setUTCDate(_d.getUTCDate() + 1);
        deliveryDate = _d.toISOString().slice(0, 10);
    }
    if (opts.brand && !opts.invoiceNumber) {
        opts.invoiceNumber = await getNextBrandInvoiceNumber(invoiceType, opts.brand, firma);
    }
    const userId = await _userId(firma);
    const is13b = !!opts.is13b;
    const taxRate = is13b ? TAX_13B_RATE : DEFAULT_TAX_RATE;
    const taxText = is13b ? TAX_13B_TEXT : DEFAULT_TAX_TEXT;
    const taxType = is13b ? 'noteu' : 'default';
    const headerBase = opts.header || '';
    const header = is13b
        ? headerBase // 13b gehoert in taxText, NICHT in Header
        : headerBase;
    const body = {
        invoice: {
            objectName: 'Invoice',
            mapAll: true,
            contact: { id: String(contactId), objectName: 'Contact' },
            contactPerson: { id: String(userId), objectName: 'SevUser' },
            invoiceDate,
            deliveryDate,
            discount: 0,
            status: 100, // Anlage: 100=Entwurf (sevDesk-Constraint, HTTP 422 bei 50)
            smallSettlement: 0,
            taxRate,
            taxText,
            taxType,
            invoiceType,
            ...(opts.invoiceNumber ? { invoiceNumber: opts.invoiceNumber } : {}),
            currency: 'EUR',
            showNet: 1,
            ...(header ? { header } : {}),
            ...(opts.headText ? { headText: String(opts.headText) } : {}),
            ...(opts.footText ? { footText: String(opts.footText) } : {}),
            ...(opts.customerInternalNote ? { customerInternalNote: String(opts.customerInternalNote) } : {}),
            addressCountry: { id: 1, objectName: 'StaticCountry' },
            ...(opts.addressName ? { addressName: opts.addressName } : {}),
            ...(opts.addressStreet ? { addressStreet: opts.addressStreet } : {}),
            ...(opts.addressZip ? { addressZip: opts.addressZip } : {}),
            ...(opts.addressCity ? { addressCity: opts.addressCity } : {}),
        },
        invoicePosSave: positions.map((p, i) => _normalizePos(p, i, 'InvoicePos', taxRate)),
        invoicePosDelete: null,
        discountSave: null,
        discountDelete: null,
    };
    const r = await _req('POST', '/Invoice/Factory/saveInvoice', { firma, body });
    return ((r.objects || {}).invoice) || null;
}

/**
 * @param contactId  sevDesk Contact-ID
 * @param positions  Array von KV-Generator-Positionen
 * @param opts       { orderType='AN', orderDate, header, firma }
 */
async function createOrder(contactId, positions, opts = {}) {
    const firma = opts.firma || '089dach';
    const orderType = opts.orderType || 'AN';
    const orderDate = opts.orderDate || new Date().toISOString().slice(0, 10);
    const userId = await _userId(firma);
    const orderNumber = opts.brand
        ? await getNextBrandOrderNumber(orderType, opts.brand, firma)
        : await getNextOrderNumber(orderType, firma);
    const is13b = !!opts.is13b;
    const taxRate = is13b ? TAX_13B_RATE : DEFAULT_TAX_RATE;
    const taxText = is13b ? TAX_13B_TEXT : DEFAULT_TAX_TEXT;
    const taxType = is13b ? 'noteu' : 'default';
    const headerBase = opts.header || `Angebot ${orderNumber}`;
    const header = headerBase; // 13b gehoert NICHT in Header

    const body = {
        order: {
            objectName: 'Order',
            mapAll: true,
            contact: { id: String(contactId), objectName: 'Contact' },
            contactPerson: { id: String(userId), objectName: 'SevUser' },
            orderDate,
            deliveryDate: orderDate,
            discount: 0,
            status: 100, // 100=Entwurf fuer Orders (AN/AB/LI) — User-Freigabe PFLICHT
            smallSettlement: 0,
            taxRate,
            taxText,
            taxType,
            orderType,
            currency: 'EUR',
            showNet: 1,
            version: 0,
            orderNumber,
            header,
            ...(opts.headText ? { headText: String(opts.headText) } : {}),
            ...(opts.footText ? { footText: String(opts.footText) } : {}),
            addressCountry: { id: 1, objectName: 'StaticCountry' },
            ...(opts.addressName ? { addressName: opts.addressName } : {}),
            ...(opts.addressStreet ? { addressStreet: opts.addressStreet } : {}),
            ...(opts.addressZip ? { addressZip: opts.addressZip } : {}),
            ...(opts.addressCity ? { addressCity: opts.addressCity } : {}),
            ...(opts.customerInternalNote ? { customerInternalNote: String(opts.customerInternalNote) } : {}),
        },
        orderPosSave: positions.map((p, i) => _normalizePos(p, i, 'OrderPos', taxRate)),
        orderPosDelete: null,
        discountSave: null,
        discountDelete: null,
    };
    const r = await _req('POST', '/Order/Factory/saveOrder', { firma, body });
    return ((r.objects || {}).order) || null;
}

/**
 * Lookup contact ID by customerNumber (z.B. '1010').
 * Wird gebraucht wenn der KV-Generator nur die Kundennummer hat (kunde.number).
 */
async function getOrder(identifier, firma = '089dach') {
    let order;
    if (/^\d+$/.test(String(identifier))) {
        const r = await _req('GET', '/Order/' + identifier, { firma });
        const objs = _objects(r);
        order = objs[0];
    } else {
        const r = await _req('GET', '/Order', { firma, params: { orderNumber: String(identifier) } });
        const objs = _objects(r);
        order = objs[0];
    }
    if (!order) throw new Error('sevdesk getOrder: not found: ' + identifier);
    const r2 = await _req('GET', '/OrderPos', { firma, params: { 'order[id]': order.id, 'order[objectName]': 'Order', limit: 500 } });
    order._positions = _objects(r2);
    return order;
}

async function getInvoice(identifier, firma = '089dach') {
    let inv;
    if (/^\d+$/.test(String(identifier))) {
        const r = await _req('GET', '/Invoice/' + identifier, { firma });
        const objs = _objects(r);
        inv = objs[0];
    } else {
        const r = await _req('GET', '/Invoice', { firma, params: { invoiceNumber: String(identifier) } });
        const objs = _objects(r);
        inv = objs[0];
    }
    if (!inv) throw new Error('sevdesk getInvoice: not found: ' + identifier);
    const r2 = await _req('GET', '/InvoicePos', { firma, params: { 'invoice[id]': inv.id, 'invoice[objectName]': 'Invoice', limit: 500 } });
    inv._positions = _objects(r2);
    return inv;
}

async function findInvoices(firma, params = {}) {
    const r = await _req('GET', '/Invoice', { firma, params: Object.assign({ limit: 500 }, params) });
    return _objects(r);
}

async function findContactIdByNumber(customerNumber, firma = '089dach') {
    const r = await _req('GET', '/Contact', {
        firma,
        params: { customerNumber: String(customerNumber), depth: 1 },
    });
    const objs = _objects(r);
    const exact = objs.filter(o => String(o.customerNumber) === String(customerNumber));
    return exact[0] ? exact[0].id : (objs[0] ? objs[0].id : null);
}

/**
 * Holt PDF fuer beliebigen sevDesk-Beleg-Typ.
 * @param objectName  'Invoice' | 'Order'
 * @param docId       sevDesk-ID
 * @param firma       '089dach' | 'sakar'
 * @returns Buffer (PDF-bytes)
 */
async function getDocumentPdf(objectName, docId, firma = '089dach') {
    // preventSendBy=true: verhindert dass sevDesk die Rechnung beim PDF-Render
    // automatisch von status 100 (Entwurf) auf 200 (offen, sendType=VPDF) hochsetzt.
    // PFLICHT laut User-Regel: Rechnungen NUR als Entwurf, niemals ohne Genehmigung versenden.
    const r = await _req('GET', `/${objectName}/${docId}/getPdf`, { firma, params: { preventSendBy: 'true' } });
    const obj = (r && r.objects) || {};
    if (!obj.content) {
        throw new Error(`sevdesk getPdf: kein content fuer ${objectName}/${docId}`);
    }
    if (objectName === 'Invoice') { try { const chk = await _req('GET',`/Invoice/${docId}`, { firma }); const inv = chk && chk.objects; const cur = Array.isArray(inv) ? inv[0] : inv; const cs = cur && Number(cur.status); if (cs && cs !== 50) { await _req('PUT',`/Invoice/${docId}`, { firma, body: { status: 50 } }); } } catch (e) {
      // B22: hard-fail wenn Invoice schon versendet (status>50)
      throw new Error("Invoice bereits versendet, kann nicht gezogen werden: " + String(e.message).slice(0,200));
    } }
    return Buffer.from(obj.content, 'base64');
}

async function getMaxOrderNumber(firma = '089dach') {
    const r = await _req('GET', '/Order', {
        firma,
        params: { orderType: 'AN', limit: 20, 'orderBy[0][field]': 'orderNumber', 'orderBy[0][arrangement]': 'DESC' },
    });
    const objs = _objects(r);
    let max = 0;
    for (const o of objs) {
        // Fix 2026-04-24: nur 5+ stellige Counter matchen, Jahreszahlen (4 Stellen) ausschliessen
        const m = String(o.orderNumber || '').match(/-(\d{5,})$/);
        if (m) { const n = parseInt(m[1], 10); if (n > max) max = n; }
    }
    return max;
}

module.exports = { createInvoice, createOrder, findContactIdByNumber, getNextOrderNumber, getNextInvoiceNumber, getNextBrandOrderNumber, getNextBrandInvoiceNumber, getMaxOrderNumber, getDocumentPdf, loadKey, BRAND_ORDER_PREFIX, getOrder, getInvoice, findInvoices, _req };
