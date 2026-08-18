/**
 * node-pdf/crm_register.js
 *
 * Kleiner Helper, der nach erfolgreicher PDF-Erstellung ein Dokument
 * im CRM-System registriert (crm_documents + crm_activity).
 *
 * Nutzt core.crm.documents.register_document via Python-subprocess.
 * Fail-safe: Fehler werden geloggt aber NICHT weitergeworfen — ein
 * CRM-Registrierungsfehler darf nie den PDF-Erzeugungs-Flow kippen.
 */

const { spawnSync } = require('child_process');
const path = require('path');

const PYTHON = '/opt/system/venv/bin/python';
const SYSTEM_DIR = '/opt/system';

/**
 * @param {object} args
 * @param {string} args.firma_slug
 * @param {string} args.doc_type         KV|AN|AB|RE|AR|SR|BRIEF|LI
 * @param {string} args.doc_number       z.B. 'KV-2026-073'
 * @param {string} args.onedrive_path    relativ zu 'KV Generator/' (z.B. '1. Kostenvoranschläge/089Dach/KV-2026-073.pdf')
 * @param {string} [args.title]
 * @param {number} [args.amount_net]
 * @param {number} [args.amount_gross]
 * @param {number} [args.sevdesk_ref_id]
 * @param {number} [args.crm_id]
 * @param {string} [args.valid_until]    ISO-Date
 * @param {string} [args.created_by]     default 'kv_generator'
 * @returns {{doc_id:number|null, crm_id:number|null, error?:string}}
 */

function extractAbschlagNr(args) {
    if (args && args.abschlag_nr) return args.abschlag_nr;
    if (!args || String(args.doc_type).toUpperCase() !== 'AR') return null;
    const cands = [args.title, args.doc_number].filter(Boolean).map(String);
    for (const c of cands) {
        let m = c.match(/(\d+)\.\s*Abschlag/i);
        if (m) return parseInt(m[1], 10);
        m = c.match(/Abschlag\s+(\d+)/i);
        if (m) return parseInt(m[1], 10);
    }
    return null;
}

function registerDocument(args) {
    try {
        const _an = extractAbschlagNr(args);
        if (_an && !args.abschlag_nr) args = Object.assign({}, args, { abschlag_nr: _an });
        const py = `
import json, sys
sys.path.insert(0, '${SYSTEM_DIR}')
from core.crm.documents import register_document
payload = json.loads(sys.stdin.read())
try:
    r = register_document(**payload)
    print(json.dumps(r, default=str))
except Exception as e:
    print(json.dumps({"error": str(e)}))
`;
        const res = spawnSync(PYTHON, ['-c', py], {
            input: JSON.stringify(args),
            encoding: 'utf-8',
            timeout: 20000,
        });
        if (!res || res.status !== 0 || res.error) {
            const err = res && res.error ? res.error.message : (res && res.stderr || 'exit non-zero oder timeout');
            console.error('[crm_register] python fail:', err);
            return { doc_id: null, crm_id: null, error: err };
        }
        try {
            return JSON.parse((res.stdout || '{}').trim());
        } catch (parseErr) {
            console.error('[crm_register] JSON parse fail:', res.stdout);
            return { doc_id: null, crm_id: null, error: 'Ungültiges JSON von Python: ' + parseErr.message };
        }
    } catch (e) {
        console.error('[crm_register] exc:', e.message);
        return { doc_id: null, crm_id: null, error: e.message };
    }
}

// OneDrive-Ordner-Mapping (muss synchron zu core/crm/documents.py DOC_TYPE_FOLDER sein)
const DOC_TYPE_FOLDER = {
    KV:    '1. Kostenvoranschläge',
    AN:    '2. Angebote',
    AB:    '3. Auftragsbestätigungen',
    RE:    '4. Rechnungen',
    AR:    '4. Rechnungen',
    SR:    '4. Rechnungen',
    BRIEF: '5. Briefe',
};

const SLUG_TO_FOLDER = {
    '089dach':         '089Dach',
    '089bayern':       '089Bayern',
    '089sanierer':     '089-Sanierer',
    'sakar':           'Mustafa Sakar',
    'aquapro24':       'AquaPro 24',
    'estriche':        'Estriche München',
    'sanitär-muenchen': 'Sanitär München',
    'kshw-muc':        'KSHW München',
    'kshw-do':         'KSHWmont',
    'extrucon':        'ExtruCon',
};

/**
 * Baut den OneDrive-Pfad relativ zu "onedrive:KV Generator/".
 * Fuer Registrierung im CRM.
 */
function buildOnedrivePath(docType, firmaSlug, filename) {
    const folder = DOC_TYPE_FOLDER[docType];
    const firm   = SLUG_TO_FOLDER[firmaSlug] || firmaSlug;
    if (!folder || !firm) return null;
    return `${folder}/${firm}/${filename}`;
}

module.exports = { registerDocument, buildOnedrivePath, extractAbschlagNr, DOC_TYPE_FOLDER, SLUG_TO_FOLDER };
