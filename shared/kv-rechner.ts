// Ziel 1965 (Betreiber 05.11.2026: „fice da bei renodex jetzt sauber“, Wahl „Alle Katalog-Gewerke“): KV-Rechner der
// Startseite wie 089cleaner.de (Ziele 1950/1952/1954/1962). Eine Quelle für Rechner (Browser) und /api/richtpreis
// (Server): welche Leistungen, welche Fragen, welche Felder an den Master gehen. Kein Betrag und keine Formel hier
// (Anweisung 219) – gerechnet wird auf dem Master (firmenplattform/platform/renodex_kv.py, nur Renodex-Katalog, 392).
// Die Antworttexte beginnen mit dem Wort, das die Formel liest („ohne“, „mit“, „nur“, „Ja“, „vorhanden“, Zahl).

export interface KvFrage {
  feld: string;
  frage: string;
  hilfe?: string;
  art: "zahl" | "wahl";
  optionen?: string[];
  einheit?: string;
  min?: number;
  max?: number;
  // Knopf „Weiß ich nicht genau“ -> Wert „unbekannt“ (dann rechnet der Master mit dem Ab-Preis)
  unbekannt?: boolean;
  wenn?: { feld: string; nicht: string[] };
}

export interface KvLeistung {
  id: string;
  titel: string;
  kurz: string;
  fragen: KvFrage[];
}

const flaeche = (feld: string, frage: string, hilfe: string, min: number, max: number, unbekannt = false): KvFrage =>
  ({ feld, frage, hilfe, art: "zahl", einheit: "m²", min, max, unbekannt });

export const KV_LEISTUNGEN: KvLeistung[] = [
  {
    id: "wohnung", titel: "Wohnung komplett sanieren", kurz: "Alle Arbeiten aus einer Hand: Strom, Wasser, Bad, Böden, Wände",
    fragen: [flaeche("wohnung_flaeche", "Wie groß ist die Wohnung?", "Die Wohnfläche steht im Mietvertrag, im Kaufvertrag oder im Grundriss.", 10, 1000)],
  },
  {
    id: "haus", titel: "Haus komplett sanieren", kurz: "Alle Arbeiten aus einer Hand für das ganze Haus",
    fragen: [flaeche("haus_flaeche", "Wie groß ist die Wohnfläche des Hauses?", "Alle Wohnräume zusammen, ohne Keller und Garage.", 30, 1500)],
  },
  {
    id: "bad", titel: "Bad sanieren", kurz: "Neues Bad mit Fliesen, Dusche oder Wanne, WC und Waschtisch",
    fragen: [flaeche("bad_flaeche", "Wie groß ist das Bad (Bodenfläche)?", "Länge mal Breite des Raums, zum Beispiel 2,5 m × 2,4 m = 6 m².", 2, 60, true)],
  },
  {
    id: "gaeste_wc", titel: "Gäste-WC sanieren", kurz: "Kleines WC neu: Fliesen, WC, Handwaschbecken",
    fragen: [flaeche("wc_flaeche", "Wie groß ist das Gäste-WC (Bodenfläche)?", "Länge mal Breite des Raums, meist 1,5 bis 3 m².", 1, 15, true)],
  },
  {
    id: "kueche", titel: "Küche sanieren", kurz: "Wände, Boden, Strom und Wasser – auf Wunsch mit neuer Küche",
    fragen: [
      { feld: "kueche_art", frage: "Was soll gemacht werden?", art: "wahl",
        optionen: ["ohne neue Küche – Wände, Boden, Strom und Wasser", "mit neuer Standardküche – Raum und Küche komplett", "nur neue Standardküche liefern und aufbauen"] },
      { ...flaeche("kueche_flaeche", "Wie groß ist die Küche (Bodenfläche)?", "Länge mal Breite des Raums.", 4, 80),
        wenn: { feld: "kueche_art", nicht: ["nur neue Standardküche liefern und aufbauen"] } },
    ],
  },
  {
    id: "innenausbau", titel: "Innenausbau", kurz: "Neue Wände aus Gipskarton, Böden und Malerarbeiten",
    fragen: [flaeche("innen_flaeche", "Wie viel Wohnfläche soll ausgebaut werden?", "Die Fläche der Räume, die neu gemacht werden.", 5, 2000)],
  },
  {
    id: "boden", titel: "Boden verlegen", kurz: "Neuer Bodenbelag in den Räumen Ihrer Wahl",
    fragen: [flaeche("boden_flaeche", "Wie viel Bodenfläche soll neu verlegt werden?", "Alle Räume zusammen, die einen neuen Boden bekommen.", 2, 2000)],
  },
  {
    id: "waermepumpe", titel: "Wärmepumpe statt alter Heizung", kurz: "Alte Gas- oder Ölheizung raus, Wärmepumpe rein",
    fragen: [],
  },
  {
    id: "pv", titel: "Solaranlage mit Stromspeicher", kurz: "Strom vom eigenen Dach, mit Batterie für den Abend",
    fragen: [
      { feld: "pv_module", frage: "Wie viele Solarmodule sollen aufs Dach?", hilfe: "Ein Modul braucht etwa 2 m² freie Dachfläche. Wenn Sie unsicher sind: 12 Module passen auf viele Einfamilienhäuser.", art: "wahl",
        optionen: Array.from({ length: 17 }, (_, i) => `${i + 8} Module`) },
      { feld: "pv_batterie", frage: "Wie groß soll der Stromspeicher sein?", hilfe: "Der größere Speicher hält mehr Strom für den Abend und die Nacht.", art: "wahl",
        optionen: ["5 kW Speicher", "10 kW Speicher"] },
      { feld: "pv_dach", frage: "Womit ist das Dach gedeckt?", art: "wahl",
        optionen: ["Ziegel oder Betondachstein", "Biberschwanz (kleine, flache Ziegel mit runder Kante)", "Blechziegel"] },
      { feld: "pv_geruest", frage: "Steht am Haus schon ein Gerüst?", hilfe: "Ohne Gerüst stellen wir eines auf, das ist im Preis enthalten.", art: "wahl",
        optionen: ["Gerüst wird gebraucht", "Gerüst ist schon vorhanden"] },
      { feld: "pv_wallbox", frage: "Soll eine Ladestation fürs Elektroauto dazu (Wallbox)?", art: "wahl",
        optionen: ["Ja, mit Wallbox", "Nein"] },
    ],
  },
];

export const KV_LEISTUNG = (id: string) => KV_LEISTUNGEN.find((l) => l.id === id);

// Folgefrage nur, wenn die frühere Antwort passt
export const kvSichtbar = (f: KvFrage, antworten: Record<string, string>) =>
  !f.wenn || (!!antworten[f.wenn.feld] && !f.wenn.nicht.includes(antworten[f.wenn.feld]));

export const kvZahlOk = (f: KvFrage, wert: string) => {
  if (f.art !== "zahl") return !!wert;
  if (f.unbekannt && wert === "unbekannt") return true;
  const n = Number(String(wert).replace(",", "."));
  return Number.isFinite(n) && n >= (f.min ?? 0) && n <= (f.max ?? Infinity);
};

// Zeilen an den Master („R-<feld>: <wert>“), nur bekannte Leistungen und Felder, Werte gekürzt (keine Kundendaten)
export function kvZeilenAus(leistungen: unknown, antworten: unknown): string[] {
  const ids = (Array.isArray(leistungen) ? leistungen : []).map(String).filter((id) => KV_LEISTUNG(id)).slice(0, KV_LEISTUNGEN.length);
  const a = (antworten && typeof antworten === "object" ? antworten : {}) as Record<string, unknown>;
  const zeilen = [`R-leistungen: ${[...new Set(ids)].join(", ")}`];
  for (const id of new Set(ids)) {
    for (const f of KV_LEISTUNG(id)!.fragen) {
      const w = String(a[f.feld] ?? "").replace(/[\r\n<>]/g, " ").slice(0, 80).trim();
      if (w) zeilen.push(`R-${f.feld}: ${w}`);
    }
  }
  return zeilen;
}

// Lesbare Zeilen für die Anfrage-Mail (Frage: Antwort)
export function kvAngabenText(leistungen: string[], antworten: Record<string, string>): string {
  return leistungen.map((id) => {
    const l = KV_LEISTUNG(id);
    if (!l) return "";
    const z = l.fragen.filter((f) => kvSichtbar(f, antworten) && antworten[f.feld])
      .map((f) => `  - ${f.frage} ${antworten[f.feld] === "unbekannt" ? "weiß ich nicht genau" : antworten[f.feld] + (f.einheit ? " " + f.einheit : "")}`);
    return [`- ${l.titel}`, ...z].join("\n");
  }).filter(Boolean).join("\n");
}
