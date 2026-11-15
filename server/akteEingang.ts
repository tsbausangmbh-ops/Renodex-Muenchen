import { createHmac, randomBytes } from "crypto";

// Nr. 2231 (15.11.2026): Direkt-Weg wie KSHW-MUC (server/akteEingang.ts aus KSHW-MUC-de, BUG-04-60).
// Jede Formular-Anfrage geht nach dem Mailversand zusätzlich signiert an den Akten-Empfänger
// (089dach.info), mit den Platzhaltern des Vertrags (firmenname, gewerk, betreff, einwilligung_ki).
// Die Mail bleibt Hauptweg und Rückfall. Ohne AKTE_EINGANG_SECRET geht nichts hinaus; ein Fehler wird
// nur geloggt (ohne Geheimnis, ohne Kundendaten außer anfrage_id) und ändert nie die Antwort an den Besucher.

const STANDARD_URL = "https://089dach.info/api/website-anfrage";
const TIMEOUT_MS = 20000;
const MAX_DATEI_SUMME_BYTES = 25 * 1024 * 1024;
const MAX_DATEI_ANZAHL = 5;

function berlinTeile(d: Date): Record<string, string> {
  const teile = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const erg: Record<string, string> = {};
  for (const t of teile) erg[t.type] = t.value;
  return erg;
}

/** Anfrage-Kennung "<Präfix>-YYYYMMDD-HHMMSS-<8 hex>" (Berliner Zeit), passt auf /^[A-Za-z0-9-]{8,80}$/. */
export function neueAnfrageId(praefix = "WEB"): string {
  const t = berlinTeile(new Date());
  const p = praefix.replace(/[^A-Za-z0-9]/g, "").slice(0, 12) || "WEB";
  return `${p}-${t.year}${t.month}${t.day}-${t.hour}${t.minute}${t.second}-${randomBytes(4).toString("hex")}`;
}

/** "TT.MM.JJJJ, HH:MM Uhr" in Europe/Berlin. */
export function berlinJetzt(): string {
  const t = berlinTeile(new Date());
  return `${t.day}.${t.month}.${t.year}, ${t.hour}:${t.minute} Uhr`;
}

/** Letztes Wort = Nachname, Rest = Vorname; ein Wort = nur Nachname. */
export function namenTeilen(voll: string): { vorname: string; nachname: string } {
  const woerter = String(voll ?? "").trim().split(/\s+/).filter(Boolean);
  if (woerter.length === 0) return { vorname: "", nachname: "" };
  const nachname = woerter.pop() as string;
  return { vorname: woerter.join(" "), nachname };
}

export type AkteDatei = { name: string; mime: string; inhalt: Buffer };

export type AktePayload = {
  anfrage_id: string;
  domain: string;
  typ: string;
  quelle: string;
  leistung: string;
  gewerk?: string; // Nr. 2231: Platzhalter {gewerk}, leer lassen statt raten (647)
  betreff?: string; // Nr. 2231: Platzhalter {betreff}
  test: boolean;
  eingang: string;
  kunde: {
    anrede: string;
    vorname: string;
    nachname: string;
    firma: string;
    firmenname?: string; // Nr. 2231: Platzhalter {firmenname} (gleicher Wert wie firma)
    einwilligung_ki?: boolean; // Nr. 2231: Platzhalter-Vertrag, KI-Haken unverändert
    email: string;
    telefon: string;
    strasse: string;
    plz: string;
    ort: string;
    adresse_frei: string;
  };
  bv: { strasse: string; plz: string; ort: string; adresse_frei: string };
  ansprechpartner: { vorname: string; nachname: string; rolle: string; telefon: string } | null;
  felder: [string, string][]; // jede Antwort des Formulars, wie in der Mail
  dateien_ausgelassen?: number;
};

/** Meldet die Anfrage an den Akten-Empfänger. Wirft nie. */
export async function anAkteMelden(p: AktePayload, dateien: AkteDatei[] = []): Promise<void> {
  const anfrageId = p.anfrage_id;
  try {
    const url = process.env.AKTE_EINGANG_URL || STANDARD_URL;
    const geheimnis = process.env.AKTE_EINGANG_SECRET;
    if (!geheimnis) {
      console.error(`Akte-Eingang: AKTE_EINGANG_SECRET fehlt, Anfrage ${anfrageId} nur per Mail`);
      return;
    }

    const summe = dateien.reduce((s, d) => s + d.inhalt.length, 0);
    const payload: AktePayload & { dateien: { name: string; mime: string; base64: string }[] } = { ...p, dateien: [] };
    if (dateien.length > MAX_DATEI_ANZAHL || summe > MAX_DATEI_SUMME_BYTES) {
      payload.dateien_ausgelassen = dateien.length;
    } else {
      payload.dateien = dateien.map((d) => ({ name: d.name, mime: d.mime, base64: d.inhalt.toString("base64") }));
    }

    const body = JSON.stringify(payload);
    const zeit = String(Math.floor(Date.now() / 1000));
    const signatur = createHmac("sha256", geheimnis).update(`${zeit}.${body}`).digest("hex");

    const abbruch = new AbortController();
    const timer = setTimeout(() => abbruch.abort(), TIMEOUT_MS);
    try {
      const antwort = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Anfrage-Zeit": zeit,
          "X-Anfrage-Signatur": `sha256=${signatur}`,
        },
        body,
        signal: abbruch.signal,
      });
      if (!antwort.ok) {
        console.error(`Akte-Eingang fehlgeschlagen: Status ${antwort.status}, Anfrage ${anfrageId}`);
        return;
      }
      console.log(`Akte-Eingang ok: ${anfrageId}`);
    } finally {
      clearTimeout(timer);
    }
  } catch (e) {
    const art = e instanceof Error ? e.name : "Fehler";
    console.error(`Akte-Eingang fehlgeschlagen (${art}), Anfrage ${anfrageId} nur per Mail`);
  }
}

/** Nr. 2231: Angaben eines Formulars, so wie die Website sie heute schon prüft (nichts wird neu Pflicht). */
export type FormularAngaben = {
  domain: string;
  praefix: string;
  typ: string;
  quelle: string;
  leistung?: string;
  gewerk?: string; // Platzhalter {gewerk}: leer lassen statt raten (647)
  betreff?: string; // Platzhalter {betreff}; leer: "<typ> (<quelle>)" wie KSHW-MUC
  test?: boolean;
  anrede?: string;
  vorname?: string;
  nachname?: string;
  name?: string; // nur Rückfall, wenn vorname/nachname fehlen
  firmenname?: string; // Platzhalter {firmenname}
  email?: string;
  telefon?: string;
  strasse?: string;
  plz?: string;
  ort?: string;
  adresse_frei?: string;
  bv?: { strasse?: string; plz?: string; ort?: string; adresse_frei?: string };
  kiEinwilligung?: boolean; // Platzhalter {einwilligung_ki}: genau der Wert des heutigen Formulars, sonst keine Angabe
  felder?: [string, unknown][];
};

function text(w: unknown, max: number): string {
  if (w === undefined || w === null) return "";
  return (Array.isArray(w) ? w.join(", ") : String(w)).trim().slice(0, max);
}

/** Nr. 2231: baut die Nutzlast nach dem Platzhalter-Vertrag und meldet sie (nicht abgewartet). Wirft nie. */
export function formularMelden(a: FormularAngaben, dateien: AkteDatei[] = []): string {
  let anfrageId = "";
  try {
    anfrageId = neueAnfrageId(a.praefix);
    let vorname = text(a.vorname, 60);
    let nachname = text(a.nachname, 60);
    if (!vorname && !nachname && a.name) ({ vorname, nachname } = namenTeilen(text(a.name, 120)));
    const firma = text(a.firmenname, 120);
    const felder = (a.felder || [])
      .map(([l, w]) => [text(l, 40), text(w, 2000)] as [string, string])
      .filter(([l, w]) => l !== "" && w !== "");
    void anAkteMelden(
      {
        anfrage_id: anfrageId,
        domain: a.domain,
        typ: a.typ,
        quelle: a.quelle,
        leistung: text(a.leistung, 80),
        gewerk: text(a.gewerk, 80),
        betreff: text(a.betreff, 200) || `${a.typ || "Anfrage"} (${a.quelle || "Website"})`,
        test: a.test === true,
        eingang: berlinJetzt(),
        kunde: {
          anrede: text(a.anrede, 20),
          vorname,
          nachname,
          firma,
          firmenname: firma,
          einwilligung_ki: typeof a.kiEinwilligung === "boolean" ? a.kiEinwilligung : undefined,
          email: text(a.email, 160),
          telefon: text(a.telefon, 30),
          strasse: text(a.strasse, 120),
          plz: text(a.plz, 10),
          ort: text(a.ort, 80),
          adresse_frei: text(a.adresse_frei, 240),
        },
        bv: {
          strasse: text(a.bv?.strasse, 120),
          plz: text(a.bv?.plz, 10),
          ort: text(a.bv?.ort, 80),
          adresse_frei: text(a.bv?.adresse_frei, 240),
        },
        ansprechpartner: null,
        felder,
      },
      dateien,
    );
  } catch (e) {
    const art = e instanceof Error ? e.name : "Fehler";
    console.error(`Akte-Eingang: Nutzlast nicht gebaut (${art}), Anfrage ${anfrageId || "-"} nur per Mail`);
  }
  return anfrageId;
}
