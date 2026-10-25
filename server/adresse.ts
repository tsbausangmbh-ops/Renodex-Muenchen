import type { Express } from "express";
import rateLimit from "express-rate-limit";

// Adressvorschläge für die Anfrageformulare (übernommen von 089dach.de, Ziel 909): GET /api/adresse?q=…
// renodex.de übernommen aus 089cleaner (Anweisung 413, Nr. 1351, 25.10.2026): Suchraum ganz Bayern
// (bbox) und nur Treffer mit state = Bayern.
// Der Browser fragt nur diesen Server; der Server fragt Photon (komoot, OpenStreetMap-Daten)
// ohne API-Schlüssel, ohne Kosten und ohne die IP des Besuchers weiterzugeben. Antwort nur
// [{strasse, hausnummer, plz, ort, lat, lng}]. Fällt Photon aus oder braucht länger als 2 s,
// kommt eine leere Liste; das Adressfeld bleibt dann eine normale Eingabe. Nie 500.

export interface AdressVorschlag {
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  lat: number;
  lng: number;
}

const PHOTON_URL = "https://photon.komoot.io/api/";
const USER_AGENT = "renodex.de Adresssuche";
const ZEITLIMIT_MS = 2_000;
const CACHE_MS = 24 * 60 * 60 * 1000;
const CACHE_MAX = 2_000;
const MIN_ZEICHEN = 3;
const MAX_ZEICHEN = 120;

const cache = new Map<string, { stand: number; daten: AdressVorschlag[] }>();

const text = (w: unknown) => (typeof w === "string" ? w.trim() : "");

// Photon liefert GeoJSON: geometry.coordinates = [lng, lat]; bei layer=street steht der
// Straßenname in properties.name, bei layer=house in properties.street.
function umwandeln(roh: unknown): AdressVorschlag[] {
  const features = (roh as { features?: unknown })?.features;
  if (!Array.isArray(features)) return [];
  const gesehen = new Set<string>();
  const liste: AdressVorschlag[] = [];
  for (const f of features) {
    const p = (f as { properties?: Record<string, unknown> })?.properties ?? {};
    const koord = (f as { geometry?: { coordinates?: unknown } })?.geometry?.coordinates;
    if (!Array.isArray(koord) || typeof koord[0] !== "number" || typeof koord[1] !== "number") continue;
    const strasse = text(p.street) || (text(p.type) === "street" ? text(p.name) : "");
    if (!strasse) continue;
    if (text(p.state) && text(p.state) !== "Bayern") continue; // nur Bayern
    const v: AdressVorschlag = {
      strasse,
      hausnummer: text(p.housenumber),
      plz: text(p.postcode),
      ort: text(p.city) || text(p.locality) || text(p.district),
      lat: Math.round(koord[1] * 1e6) / 1e6,
      lng: Math.round(koord[0] * 1e6) / 1e6,
    };
    const schluessel = `${v.strasse}|${v.hausnummer}|${v.plz}|${v.ort}`.toLowerCase();
    if (gesehen.has(schluessel)) continue;
    gesehen.add(schluessel);
    liste.push(v);
    if (liste.length >= 5) break;
  }
  return liste;
}

/** Vorschläge zu einem Adresstext; wirft nie. `abruf` ist für die Probe austauschbar. */
export async function adresseSuchen(q: string, abruf: typeof fetch = fetch): Promise<AdressVorschlag[]> {
  const suche = text(q).replace(/\s+/g, " ").slice(0, MAX_ZEICHEN);
  if (suche.length < MIN_ZEICHEN) return [];
  const schluessel = suche.toLowerCase();
  const treffer = cache.get(schluessel);
  if (treffer && Date.now() - treffer.stand < CACHE_MS) return treffer.daten;
  try {
    const url = `${PHOTON_URL}?q=${encodeURIComponent(suche)}&lang=de&limit=5&bbox=8.97,47.27,13.84,50.56&layer=house&layer=street`;
    const r = await abruf(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
      signal: AbortSignal.timeout(ZEITLIMIT_MS),
    });
    if (!r.ok) return [];
    const daten = umwandeln(await r.json());
    if (cache.size >= CACHE_MAX) {
      const aeltester = cache.keys().next().value;
      if (aeltester !== undefined) cache.delete(aeltester);
    }
    cache.set(schluessel, { stand: Date.now(), daten });
    return daten;
  } catch (error: any) {
    console.error("Adresssuche (Photon) nicht erreichbar:", error?.message || error);
    return [];
  }
}

// Spamschutz-Begrenzung je IP: Tippen mit 300 ms Entprellung bleibt weit darunter.
const adresseLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 40,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json([]);
  },
});

export function registerAdresse(app: Express): void {
  app.get("/api/adresse", adresseLimiter, async (req, res) => {
    try {
      const q = typeof req.query.q === "string" ? req.query.q : "";
      res.setHeader("Cache-Control", "no-store");
      res.json(await adresseSuchen(q));
    } catch {
      res.json([]);
    }
  });
}
