import type { Express } from "express";
import rateLimit from "express-rate-limit";
import { kvZeilenAus } from "@shared/kv-rechner";

// Ziel 1965 (05.11.2026, Muster 089cleaner.de server/richtpreis.ts): KV-Rechner der Startseite. Die Formel gibt es nur
// einmal, auf dem Master: kv-vorschau-Dienst POST /kv-richtpreis/renodex (renodex_kv.py, nur Renodex-Katalog). Nur
// rechnen: keine Akte, keine Nummer, keine Mail, keine KI. Die Website schickt nur Objektangaben aus
// shared/kv-rechner.ts – nie Name, E-Mail, Telefon, Adresse oder Dateien (Anweisung 233). Kein Betrag im Code (219).

const text = (v: unknown, n: number) => String(v ?? "").slice(0, n);
const zahl = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);

export interface RichtpreisPosition { titel: string; menge: number; einheit: string; preis: number | null; betrag: number | null; offen?: boolean }
export interface Richtpreis {
  ok: boolean;
  netto?: number; mwst?: number; brutto?: number; mwst19?: boolean;
  positionen?: RichtpreisPosition[];
  fehlt?: string[];
  hinweis?: string;
  ausfall?: boolean;
}

// Antwort des Masters nur in bekannter Form weitergeben
function bereinigen(d: any): Richtpreis {
  if (d?.ok && zahl(d.netto) != null && Array.isArray(d.positionen)) {
    return {
      ok: true, netto: zahl(d.netto), mwst: zahl(d.mwst), brutto: zahl(d.brutto), mwst19: d.mwst19 !== false, hinweis: text(d.hinweis, 400),
      positionen: d.positionen.slice(0, 40).map((p: any) => ({
        titel: text(p?.titel, 200), menge: zahl(p?.menge) ?? 0, einheit: text(p?.einheit, 20),
        preis: zahl(p?.preis) ?? null, betrag: zahl(p?.betrag) ?? null, ...(p?.offen === true ? { offen: true } : {}),
      })),
    };
  }
  return { ok: false, fehlt: Array.isArray(d?.fehlt) ? d.fehlt.slice(0, 12).map((f: unknown) => text(f, 300)) : [] };
}

const CACHE_MS = 60_000;
const cache = new Map<string, { zeit: number; wert: Richtpreis }>();

export function registerRichtpreis(app: Express) {
  const url = process.env.KV_VORSCHAU_URL || "http://187.127.70.129:3036";
  const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false, message: { ok: false, ausfall: true } });

  app.post("/api/richtpreis", limiter, async (req, res) => {
    const b = (req.body && typeof req.body === "object" ? req.body : {}) as Record<string, unknown>;
    const rumpf = { kategorie: "Renodex KV-Rechner", kvZeilen: kvZeilenAus(b.leistungen, b.antworten), nachricht: "" };
    const schluessel = JSON.stringify(rumpf);
    const alt = cache.get(schluessel);
    if (alt && Date.now() - alt.zeit < CACHE_MS) return res.json(alt.wert);
    try {
      const r = await fetch(`${url}/kv-richtpreis/renodex`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-KV-Token": process.env.KV_VORSCHAU_TOKEN || "" },
        body: schluessel,
        signal: AbortSignal.timeout(15_000),
      });
      if (!r.ok) throw new Error(`Status ${r.status}`);
      const wert = bereinigen(await r.json());
      if (cache.size > 500) cache.clear();
      cache.set(schluessel, { zeit: Date.now(), wert });
      return res.json(wert);
    } catch (fehler: any) {
      console.error("[richtpreis]", fehler?.message || fehler);
      return res.status(503).json({ ok: false, ausfall: true } satisfies Richtpreis);
    }
  });
}
