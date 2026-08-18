/**
 * kv_cache.js — Postgres-Cache für KVs
 *
 * Zwischenspeicher für KV-Daten zwischen Erstellung im Generator
 * und Übernahme als Angebot/Rechnung in sevDesk.
 *
 * Tabelle: public.kv_cache (siehe DDL in DB)
 */

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 16,
});
async function _ensureTables(pool) {
  await pool.query(`CREATE TABLE IF NOT EXISTS ab_counter (
    year_month VARCHAR(7) PRIMARY KEY,
    last_n INT NOT NULL DEFAULT 0
  )`);
  await pool.query(`CREATE TABLE IF NOT EXISTS brief_counter (
    firma VARCHAR(50),
    year INT,
    last_n INT NOT NULL DEFAULT 0,
    PRIMARY KEY (firma, year)
  )`);
}
_ensureTables(pool).catch(e=>console.error("ensureTables:",e.message));

/**
 * Neuen KV-Eintrag anlegen.
 * @param {object} row
 * @param {string} row.kv_nummer        KV-Nummer (PK)
 * @param {string} row.firma            Firma-Slug
 * @param {string} row.kunde_name       Kundenname (für Lookup)
 * @param {string} [row.kunde_id]       sevDesk-Kundennummer (customerNumber-Feld)
 * @param {object} row.kunde            Kunde-Objekt (kompletter Snapshot)
 * @param {Array}  row.positionen       Positions-Array
 * @param {object} [row.opts]           Optionen
 * @param {string} [row.pdf_path]       Pfad zur lokal generierten PDF
 */
async function addKv(row) {
  if (row.positionen) _validatePositions(row.positionen);
    const sql = `
        INSERT INTO kv_cache
            (kv_nummer, firma, kunde_id, kunde_name, kunde_json, positionen_json, opts_json, pdf_path, status)
        VALUES ($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7::jsonb,$8,'kv')
        ON CONFLICT (kv_nummer) DO UPDATE SET
            firma           = EXCLUDED.firma,
            kunde_id        = EXCLUDED.kunde_id,
            kunde_name      = EXCLUDED.kunde_name,
            kunde_json      = EXCLUDED.kunde_json,
            positionen_json = EXCLUDED.positionen_json,
            opts_json       = EXCLUDED.opts_json,
            pdf_path        = EXCLUDED.pdf_path,
            updated_at      = now()
        RETURNING kv_nummer
    `;
    const params = [
        row.kv_nummer,
        row.firma,
        row.kunde_id || null,
        row.kunde_name,
        JSON.stringify(row.kunde || {}),
        JSON.stringify(row.positionen || []),
        JSON.stringify(row.opts || {}),
        row.pdf_path || null,
    ];
    const r = await pool.query(sql, params);
    return r.rows[0].kv_nummer;
}

/**
 * KV per Nummer holen.
 */
async function getKvByNummer(kv_nummer) {
    const r = await pool.query('SELECT * FROM kv_cache WHERE kv_nummer = $1', [kv_nummer]);
    return r.rows[0] || null;
}

/**
 * KV per Kundenname holen (case-insensitive substring).
 * Optional firma einschränken.
 * Liefert die jüngsten zuerst.
 */
async function findKvByKunde(kunde_name, firma = null) {
    let sql = `SELECT * FROM kv_cache WHERE lower(kunde_name) LIKE lower($1)`;
    const params = [`%${kunde_name}%`];
    if (firma) {
        sql += ` AND firma = $2`;
        params.push(firma);
    }
    sql += ` ORDER BY created_at DESC LIMIT 25`;
    const r = await pool.query(sql, params);
    return r.rows;
}

/**
 * Suche per Kombi: KV-Nummer (exakt oder Suffix) + Kundenname (substring).
 * Beide optional, mind. eines muss gesetzt sein.
 */
async function findKv({ kv_nummer, kunde_name, firma } = {}) {
    if (!kv_nummer && !kunde_name) {
        throw new Error('findKv: kv_nummer oder kunde_name nötig');
    }
    const conds = [];
    const params = [];
    let i = 1;
    if (kv_nummer) {
        conds.push(`(kv_nummer = $${i} OR kv_nummer LIKE $${i + 1})`);
        params.push(kv_nummer, `%${kv_nummer}`);
        i += 2;
    }
    if (kunde_name) {
        conds.push(`lower(kunde_name) LIKE lower($${i})`);
        params.push(`%${kunde_name}%`);
        i += 1;
    }
    if (firma) {
        conds.push(`firma = $${i}`);
        params.push(firma);
        i += 1;
    }
    const sql = `SELECT * FROM kv_cache WHERE ${conds.join(' AND ')} ORDER BY created_at DESC LIMIT 25`;
    const r = await pool.query(sql, params);
    return r.rows;
}

/**
 * sevDesk Auftragsbestaetigung-Verknuepfung speichern.
 */
async function setSdAB(kv_nummer, sd_ab_id, sd_ab_number = null) {
    await pool.query(
        `UPDATE kv_cache SET sd_ab_id=$1, sd_ab_number=$2, status='ab', updated_at=now() WHERE kv_nummer=$3`,
        [sd_ab_id, sd_ab_number, kv_nummer],
    );
}

/**
 * sevDesk Rechnung-Verknuepfung speichern (Status -> rechnung).
 */
async function setSdInvoice(kv_nummer, sd_invoice_id, sd_invoice_number = null) {
    await pool.query(
        `UPDATE kv_cache SET sd_invoice_id=$1, sd_invoice_number=$2, status='rechnung', updated_at=now() WHERE kv_nummer=$3`,
        [sd_invoice_id, sd_invoice_number, kv_nummer],
    );
}

/**
 * Atomarer monatlicher AB-Zähler (Tabelle ab_counter).
 * Liefert die nächste Nummer für yyyymm (z. B. '202604') und inkrementiert.
 */
async function nextAbCounter(yyyymm, firma) {
    // FIX G 2026-04-14: pro Firma getrennt. Fallback auf "089dach" wenn firma fehlt.
    const fid = firma || "089dach";
    const r = await pool.query(
        `INSERT INTO ab_counter (firma, year_month, last_n)
         VALUES ($1, $2, 1)
         ON CONFLICT (firma, year_month) DO UPDATE
            SET last_n = ab_counter.last_n + 1, updated_at = now()
         RETURNING last_n`,
        [fid, yyyymm],
    );
    return r.rows[0].last_n;
}

/**
 * Eintrag löschen (z. B. nach Endrechnung).
 */
async function deleteKv(kv_nummer) {
    const r = await pool.query('DELETE FROM kv_cache WHERE kv_nummer=$1', [kv_nummer]);
    return r.rowCount;
}

/**
 * Pool sauber schließen (CLI-Ende).
 */
async function close() {
    await pool.end();
}


function _validatePositions(positions) {
  if (!Array.isArray(positions)) throw new Error("positionen muss Array sein");
  if (positions.length === 0) throw new Error("positionen leer");
  positions.forEach((p, i) => {
    if (typeof p !== 'object' || !p) throw new Error(`positionen[${i}] kein Objekt`);
    if (p.qty != null && typeof p.qty !== 'number') throw new Error(`positionen[${i}].qty kein Number`);
    if (p.price != null && typeof p.price !== 'number') throw new Error(`positionen[${i}].price kein Number`);
  });
  return true;
}


async function nextBriefCounter(firma, year) {
  const y = year || new Date().getFullYear();
  const r = await pool.query(
    `INSERT INTO brief_counter (firma, year, last_n) VALUES ($1, $2, 1)
     ON CONFLICT (firma, year) DO UPDATE SET last_n = brief_counter.last_n + 1
     RETURNING last_n`, [firma, y]);
  return r.rows[0].last_n;
}

module.exports = {
    pool,
    addKv,
    getKvByNummer,
    findKvByKunde,
    findKv,
    setSdAB,
    setSdInvoice,
    deleteKv,
    nextAbCounter,
    close,
  nextBriefCounter};
