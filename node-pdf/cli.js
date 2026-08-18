#!/usr/bin/env node
require('dotenv').config({ path: '/opt/system/.env' });
/**
 * CLI-Wrapper fuer generator.js
 * Wird von Python via subprocess aufgerufen.
 *
 * Usage:
 *   node cli.js kv '{"firma":"089dach","kunde":"Frau Langer","positionen":[...],"opts":{}}'
 *   node cli.js brief '{"firma":"089dach","empfaenger":"Frau Langer","betreff":"...","text":"...","opts":{}}'
 *   node cli.js kv_zu_ab '{"kv_nummer":"KV-2026-0001"}'
 *   node cli.js kv_zu_ab '{"kunde_name":"Hyza","firma":"089sanierer"}'
 *   node cli.js rechnung_aus_kv '{"kv_nummer":"KV-2026-0001"}'
 *   node cli.js abschlag_aus_kv '{"kv_nummer":"KV-2026-0001","mode":"percent","value":30}'
 *   node cli.js abschlag_aus_kv '{"kv_nummer":"KV-2026-0001","mode":"amount","value":1500}'
 *   node cli.js abschlag_aus_kv '{"kv_nummer":"KV-2026-0001","mode":"positions","value":[1,3]}'
 */
const {
    erstelleKV,
    erstelleBrief,
    kvZuAB,
    rechnungAusKV, lieferscheinAusAB,
    abschlagAusKV,
    generateRechnung,
    renderDocFromKvRow,
    closeBrowser,
} = require('./generator');
const kvCache = require('./kv_cache');

async function main() {
    const cmd = process.argv[2];
    const dataStr = process.argv[3];

    if (!cmd || !dataStr) {
        console.error(JSON.stringify({
            ok: false,
            error: 'Usage: node cli.js kv|angebot|brief|kv_zu_ab|rechnung_aus_kv|abschlag_aus_kv <json>',
        }));
        process.exit(1);
    }

    let data;
    try {
        data = JSON.parse(dataStr);
    } catch (e) {
        console.error(JSON.stringify({ ok: false, error: 'Invalid JSON: ' + e.message }));
        process.exit(1);
    }

    try {
        let result;
        if (cmd === 'kv') {
            result = await erstelleKV(
                data.firma || '089dach',
                data.kunde || '',
                data.positionen || [],
                data.opts || {},
            );
            console.log(JSON.stringify({ ok: true, ...result }));
        } else if (cmd === 'angebot') {
            // Angebot = KV mit docType 'angebot' (gleicher Look, Titel "Angebot")
            const angebotOpts = data.opts || {};
            angebotOpts.docType = 'angebot';
            result = await erstelleKV(
                data.firma || '089dach',
                data.kunde || '',
                data.positionen || [],
                angebotOpts,
            );
            console.log(JSON.stringify({ ok: true, ...result }));
        } else if (cmd === 'ab') {
            // Auftragsbestaetigung = KV mit docType 'ab' (gleicher Look, Titel "Auftragsbestaetigung")
            const abOpts = data.opts || {};
            abOpts.docType = 'ab';
            result = await erstelleKV(
                data.firma || '089dach',
                data.kunde || '',
                data.positionen || [],
                abOpts,
            );
            console.log(JSON.stringify({ ok: true, ...result }));
        } else if (cmd === 'li') {
            // Lieferschein = KV mit docType 'li' (Titel "Lieferschein", keine Preise/Zahlung)
            const liOpts = data.opts || {};
            liOpts.docType = 'li';
            result = await erstelleKV(
                data.firma || '089dach',
                data.kunde || '',
                data.positionen || [],
                liOpts,
            );
            console.log(JSON.stringify({ ok: true, ...result }));
        } else if (cmd === 'rechnung') {
            // Rechnung lokal rendern = KV mit docType 'rechnung'. sevDesk-Invoice separat via Helper.
            const reOpts = data.opts || {};
            reOpts.docType = 'rechnung';
            result = await erstelleKV(
                data.firma || '089dach',
                data.kunde || '',
                data.positionen || [],
                reOpts,
            );
            console.log(JSON.stringify({ ok: true, ...result }));
        } else if (cmd === 'rechnung_v2') {
            // Neue Rechnung mit eigenem Template rechnung_node.html
            result = await generateRechnung({
                firma: data.firma,
                kunde: data.kunde,
                positionen: data.positionen || [],
                rechnung_nr: data.rechnung_nr,
                rechnung_datum: data.rechnung_datum,
                leistungszeitraum: data.leistungszeitraum,
                bezug_ab: data.bezug_ab,
                zahlungsziel_tage: data.zahlungsziel_tage,
                zahlungsziel_einheit: data.zahlungsziel_einheit,
                typ: data.typ || 'RE',
                abschlag_nr: data.abschlag_nr,
                projectAddress: data.projectAddress || data.project_address,
                notes: data.notes,
                geleistete_abschlaege: data.geleistete_abschlaege || [],
                vorherige_abschlaege: data.vorherige_abschlaege || [],
                opts: data.opts || {},
            });
            console.log(JSON.stringify({ ok: true, ...result }));
        } else if (cmd === 'brief') {
            result = await erstelleBrief(
                data.firma || '089dach',
                data.empfaenger || '',
                data.betreff || '',
                data.text || '',
                data.opts || {},
            );
            console.log(JSON.stringify({ ok: true, ...result }));
        } else if (cmd === 'kv_zu_ab') {
            result = await kvZuAB({
                kv_nummer:  data.kv_nummer,
                kunde_name: data.kunde_name,
                firma:      data.firma,
            });
            console.log(JSON.stringify(result));
        } else if (cmd === 'lieferschein_aus_ab' || cmd === 'li_aus_ab') {
            result = await lieferscheinAusAB({
                firma: data.firma,
                ab_nummer: data.ab_nummer,
                kv_nummer: data.kv_nummer,
                positions: data.positions || data.positionen,
                gewerk: data.gewerk,
            });
            console.log(JSON.stringify(result));
        } else if (cmd === 'rechnung_aus_kv') {
            result = await rechnungAusKV({
                kv_nummer:  data.kv_nummer,
                kunde_name: data.kunde_name,
                firma:      data.firma,
            });
            console.log(JSON.stringify(result));
        } else if (cmd === 'abschlag_aus_kv') {
            if (!data.mode) throw new Error('mode fehlt (percent|amount|positions)');
            result = await abschlagAusKV(
                {
                    kv_nummer:  data.kv_nummer,
                    kunde_name: data.kunde_name,
                    firma:      data.firma,
                },
                data.mode,
                data.value,
                data.abschlag_nr || null,
            );
            console.log(JSON.stringify(result));
        } else if (cmd === "rerender_kv" || cmd === "rerender_ab") {
            const kvCacheMod = require("./kv_cache");
            const rows = await kvCacheMod.findKv({
                kv_nummer: data.kv_nummer,
                kunde_name: data.kunde_name,
                firma: data.firma,
            });
            if (!rows.length) throw new Error("Kein KV im Cache gefunden");
            if (rows.length > 1) throw new Error("Mehrere KVs - praeziser filtern");
            const row = rows[0];
            const docType = cmd === "rerender_kv" ? "kv" : "ab";
            const docNr = data.doc_nummer || (docType === "kv" ? row.kv_nummer : row.sd_ab_number);
            if (!docNr) throw new Error("Keine doc_nummer");
            const doc = { id: docNr, number: docNr, orderNumber: docNr, is_draft: true };
            const out = data.output_path || ("/opt/system/data/documents/" + (data.firma || row.firma) + "/" + docNr + ".pdf");
            await renderDocFromKvRow(row, doc, docType, out);
            console.log(JSON.stringify({ ok: true, doc_nummer: docNr, pdf: out }));
        } else if (cmd === 'anwalt' || cmd === 'legal') {
            // Firmenanwalt via Python-Agent
            const { spawn } = require('child_process');
            const subcmd = data.subcmd || 'frage';
            const payload = JSON.stringify(data);
            const res = await new Promise((resolve, reject) => {
                const proc = spawn('python3', ['/opt/system/agents/legal_agent.py', subcmd, payload], { env: process.env });
                let out = '', err = '';
                proc.stdout.on('data', (d) => out += d);
                proc.stderr.on('data', (d) => err += d);
                proc.on('close', (code) => {
                    if (code === 0) { try { resolve(JSON.parse(out)); } catch(e) { resolve({ ok: false, stdout: out }); } }
                    else reject(new Error('legal_agent exit=' + code + ': ' + err));
                });
            });
            console.log(JSON.stringify(res, null, 2));
        } else if (cmd === 'lieferant') {
            // Lieferanten-Suche in lieferanten_089dach
            const q = (data.q || data.query || data.suchbegriff || '').trim();
            if (!q) throw new Error('q (Suchbegriff) erforderlich');
            const { Pool } = require('pg');
            const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 4 });
            const r = await pool.query(
                `SELECT slug, kategorie, name, adresse, plz, ort, telefon, email, website, distanz_km, kundennummer, vault_ref
                 FROM lieferanten_089dach
                 WHERE name ILIKE $1 OR kategorie ILIKE $1 OR ort ILIKE $1 OR COALESCE(notes,'') ILIKE $1
                 ORDER BY distanz_km NULLS LAST, name
                 LIMIT 20`,
                ['%' + q + '%']
            );
            await pool.end();
            console.log(JSON.stringify({ ok: true, q: q, count: r.rows.length, results: r.rows }, null, 2));
        } else {
            console.error(JSON.stringify({ ok: false, error: 'Unknown command: ' + cmd }));
            process.exitCode = 1;
        }
    } catch (e) {
        console.error(JSON.stringify({ ok: false, error: e.message }));
        process.exitCode = 1;
    } finally {
        try { await closeBrowser(); } catch (_) {}
        try { await require.main === module && kvCache.close();  } catch (_) {}
        process.exit(process.exitCode || 0);
    }
}

if (!process.argv.includes('--server')) { main(); }


// === PERSISTENT SERVER MODE ===
// Usage: node cli.js --server [port]
// Keeps browser warm, accepts HTTP render requests
const http = require('http');
async function startServer(port = 3500) {
    const { erstelleKV, generateRechnung, erstelleBrief, renderDocFromKvRow } = require('./generator.js');
    const MAX_BODY = 10 * 1024 * 1024; // 10MB
    const srv = http.createServer(async (req, res) => {
        if (req.method !== 'POST') { res.writeHead(405); res.end('POST only'); return; }
        let body = '';
        let tooBig = false;
        req.on('data', c => { body += c; if (body.length > MAX_BODY) { tooBig = true; req.destroy(); } });
        req.on('end', async () => {
            if (tooBig) { res.writeHead(413); res.end('Payload too large'); return; }
            try {
                const data = JSON.parse(body);
                const start = Date.now();
                let result;
                if (data.action === 'kv') {
                    result = await erstelleKV(data.firma, data.kunde, data.positionen, data.opts || {});
                } else if (data.action === 'rechnung') {
                    result = await generateRechnung({ firma: data.firma, kunde: data.kunde, positionen: data.positionen, rechnung_nr: data.rechnung_nr, rechnung_datum: data.rechnung_datum || data.re_datum, zahlungsziel_tage: data.zahlungsziel ?? data.zahlungsziel_tage ?? 5, typ: data.typ || 'AR', abschlag_nr: data.abschlag_nr, opts: data.opts || {}, notes: data.nachtext || data.notes || '' });
                } else if (data.action === 'brief') {
                    result = await erstelleBrief(data.firma, data.kunde, data.opts || {});
                } else {
                    res.writeHead(400); res.end(JSON.stringify({error:'unknown action'})); return;
                }
                const ms = Date.now() - start;
                console.log(`[server] ${data.action} rendered in ${ms}ms`);
                res.writeHead(200, {'Content-Type':'application/json'});
                res.end(JSON.stringify({...result, render_ms: ms}));
            } catch(e) {
                console.error('[server] error:', e.message);
                res.writeHead(500); res.end(JSON.stringify({error: e.message}));
            }
        });
    });
    srv.listen(port, () => console.log(`[kv-server] listening on port ${port}`));
}

if (process.argv.includes('--server')) {
    const portIdx = process.argv.indexOf('--server') + 1;
    const port = parseInt(process.argv[portIdx]) || 3500;
    startServer(port);
}
