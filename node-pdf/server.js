#!/usr/bin/env node
/**
 * HTTP-Server fuer persistentes Puppeteer.
 * Einmaliger Browser-Start, dann schnelles Rendering.
 * Port: 3100
 */
const http = require('http');
const {
    erstelleKV,
    erstelleBrief,
    kvZuAB,
    rechnungAusKV,
    abschlagAusKV,
    generateRechnung,
} = require('./generator');

const PORT = 3100;

function readBody(req) {
    return new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => { data += chunk; });
        req.on('end', () => {
            try { resolve(JSON.parse(data || '{}')); }
            catch (e) { reject(e); }
        });
        req.on('error', reject);
    });
}

async function dispatch(cmd, data) {
    if (cmd === 'kv' || cmd === 'angebot') {
        return erstelleKV(data.firma, data.kunde, data.positionen, data.opts || {});
    }
    if (cmd === 'ab') {
        const opts = { ...(data.opts || {}), docType: 'ab' };
        return erstelleKV(data.firma, data.kunde, data.positionen, opts);
    }
    if (cmd === 'rechnung') {
        const opts = { ...(data.opts || {}), docType: 'rechnung' };
        return erstelleKV(data.firma, data.kunde, data.positionen, opts);
    }
    if (cmd === 'rechnung_v2' || cmd === 're' || cmd === 'ar' || cmd === 'sr') {
        // Direkt-Rechnung mit eigenem Template + typ (RE/AR/SR)
        const typMap = { rechnung_v2: 'RE', re: 'RE', ar: 'AR', sr: 'SR' };
        return generateRechnung({
            firma: data.firma,
            kunde: data.kunde,
            positionen: data.positionen || [],
            rechnung_nr: data.rechnung_nr || ('RE-' + new Date().getFullYear() + '-9999'),
            rechnung_datum: data.rechnung_datum || new Date().toISOString().slice(0,10),
            leistungszeitraum: data.leistungszeitraum,
            bezug_ab: data.bezug_ab,
            zahlungsziel_tage: data.zahlungsziel_tage || 5,
            zahlungsziel_einheit: data.zahlungsziel_einheit || 'Tagen',
            typ: typMap[cmd] || 'RE',
            abschlag_nr: data.abschlag_nr,
            projectAddress: data.projectAddress,
            notes: data.notes,
            opts: { ...(data.opts || {}), preview_only: !!(data.opts && data.opts.preview_only) },
        });
    }
    if (cmd === 'brief') {
        return erstelleBrief(data.firma, data.empfaenger, data.betreff, data.text, data.opts || {});
    }
    if (cmd === 'kv_zu_ab') {
        return kvZuAB(data);
    }
    if (cmd === 'rechnung_aus_kv') {
        return rechnungAusKV(data);
    }
    if (cmd === 'abschlag_aus_kv') {
        return abschlagAusKV(data.query || data.kv_nummer, data.mode, data.value);
    }
    throw new Error('Unknown cmd: ' + cmd);
}

const server = http.createServer(async (req, res) => {
    if (req.method !== 'POST' || !req.url.startsWith('/render/')) {
        res.writeHead(404); res.end('Not Found'); return;
    }
    const cmd = req.url.replace('/render/', '').split('?')[0];
    try {
        const data = await readBody(req);
        const result = await dispatch(cmd, data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, ...result }));
    } catch (e) {
        console.error('render error:', e.message, e.stack);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: e.message }));
    }
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`[pdf-server] listening on 127.0.0.1:${PORT}`);
});

// Keepalive: Prevent process exit
process.on('SIGTERM', () => { server.close(); process.exit(0); });
process.on('SIGINT', () => { server.close(); process.exit(0); });
