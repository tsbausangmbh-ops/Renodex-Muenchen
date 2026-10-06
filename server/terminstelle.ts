/**
 * Anbindung einer Website an die gemeinsame Terminstelle (Anweisung 135, Warteschleife 854).
 *
 * VORLAGE: diese Datei wird unverändert als `server/terminstelle.ts` in jedes Repo der Gruppe
 * kopiert. Quelle ist `firmenplattform/platform/termin_stelle_client.ts`; Dienst und
 * Schnittstelle stehen in `firmenplattform/platform/termin_stelle.py`.
 *
 * Betreiber 06.10.2026: „wenn einer vergeben ist, der auf den anderen Seiten auch vergeben".
 * Die Website speichert selbst keine Buchungen. Vor dem Anzeigen fragt sie hier die belegten
 * Fenster ab, beim Buchen meldet sie das Fenster. Übertragen werden nur Gruppe, Datum, Uhrzeit,
 * Website und Buchungs-ID — nie Name, Kontakt oder Anliegen.
 *
 * Umgebung (Coolify, gesetzt über `termin_stelle.py --coolify-env <gruppe> --setzen`):
 *   TERMIN_STELLE_URL, TERMIN_STELLE_SECRET, TERMIN_STELLE_GRUPPE, TERMIN_STELLE_QUELLE
 *
 * Fällt die Terminstelle aus oder fehlt die Umgebung, läuft die Website wie bisher weiter:
 * `belegteFenster()` liefert eine leere Menge, `fensterBuchen()` liefert "ausfall". Kein Kunde
 * bleibt vor einem toten Formular; der Gleichlauf ruht in der Zeit.
 */
import crypto from "crypto";

const URL_ = process.env.TERMIN_STELLE_URL || "";
const SECRET = process.env.TERMIN_STELLE_SECRET || "";
const GRUPPE = process.env.TERMIN_STELLE_GRUPPE || "";
const QUELLE = process.env.TERMIN_STELLE_QUELLE || "";
const WARTEZEIT_MS = 4000;

export function terminstelleAktiv(): boolean {
  return Boolean(URL_ && SECRET && GRUPPE && QUELLE);
}

/** Schlüssel eines Fensters, so wie er in der Menge von `belegteFenster()` steht. */
export function fensterSchluessel(datum: string, zeit: string): string {
  return `${datum} ${zeit}`;
}

async function ruf(rumpf: Record<string, unknown>): Promise<{ status: number; daten: any } | null> {
  if (!terminstelleAktiv()) return null;
  const body = JSON.stringify({ ...rumpf, gruppe: GRUPPE });
  const zeit = String(Math.floor(Date.now() / 1000));
  const signatur = crypto.createHmac("sha256", SECRET).update(`${zeit}.${body}`).digest("hex");
  const abbruch = new AbortController();
  const wecker = setTimeout(() => abbruch.abort(), WARTEZEIT_MS);
  try {
    const antwort = await fetch(URL_, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Anfrage-Zeit": zeit,
        "X-Anfrage-Signatur": `sha256=${signatur}`,
      },
      body,
      signal: abbruch.signal,
    });
    let daten: any = null;
    try {
      daten = await antwort.json();
    } catch {
      daten = null;
    }
    return { status: antwort.status, daten };
  } catch (e) {
    console.error("[terminstelle] nicht erreichbar:", e instanceof Error ? e.name : "Fehler");
    return null;
  } finally {
    clearTimeout(wecker);
  }
}

/**
 * Belegte Fenster der Gruppe im Zeitraum, als Menge von `fensterSchluessel(datum, zeit)`.
 * `von`/`bis` als "YYYY-MM-DD" (Berliner Datum), `zeit` in der Antwort als "HH:MM" (Beginn).
 */
export async function belegteFenster(von: string, bis: string): Promise<Set<string>> {
  // Kurzer Zwischenspeicher: die Terminliste fragt Tag für Tag, ein Seitenaufruf soll nicht
  // zwanzig Anfragen auslösen. 20 Sekunden; die Buchung selbst prüft immer frisch (fensterBuchen).
  const schluessel = `${von}|${bis}`;
  const gemerkt = zwischenspeicher.get(schluessel);
  if (gemerkt && gemerkt.bis > Date.now()) return gemerkt.menge;
  const a = await ruf({ aktion: "belegt", von, bis });
  const menge = new Set<string>();
  if (!a || a.status !== 200 || !a.daten || !Array.isArray(a.daten.belegt)) return menge;
  for (const e of a.daten.belegt) {
    if (e && typeof e.datum === "string" && typeof e.zeit === "string") menge.add(fensterSchluessel(e.datum, e.zeit));
  }
  if (zwischenspeicher.size > 200) zwischenspeicher.clear();
  zwischenspeicher.set(schluessel, { bis: Date.now() + 20_000, menge });
  return menge;
}

const zwischenspeicher = new Map<string, { bis: number; menge: Set<string> }>();

/**
 * Berliner Datum und Beginn "HH:MM" eines Zeitpunkts (ISO-Text oder Date), so wie die Terminliste
 * sie anzeigt. null, wenn der Wert kein Zeitpunkt ist.
 */
export function fensterAusZeitpunkt(wert: unknown): { datum: string; zeit: string } | null {
  const d = wert instanceof Date ? wert : typeof wert === "string" && wert.trim() ? new Date(wert) : null;
  if (!d || isNaN(d.getTime())) return null;
  return {
    datum: d.toLocaleDateString("sv-SE", { timeZone: "Europe/Berlin" }),
    zeit: d.toLocaleTimeString("de-DE", { timeZone: "Europe/Berlin", hour: "2-digit", minute: "2-digit" }),
  };
}

/**
 * Buchungs-ID aus Angaben der Anfrage, ohne dass diese die Website verlassen: nur der Hash geht
 * an die Terminstelle. Derselbe Kunde mit demselben Fenster ergibt dieselbe ID — ein zweiter
 * Sendeversuch gilt dort als Wiederholung, nicht als fremde Buchung.
 */
export function buchungsKennung(...teile: string[]): string {
  return crypto.createHash("sha256").update(teile.map((t) => String(t || "").trim().toLowerCase()).join("|")).digest("hex").slice(0, 40);
}

/**
 * Meldet eine Buchung. "ok": Fenster gehört jetzt dieser Buchung (auch bei Wiederholung derselben
 * ID). "belegt": eine andere Buchung der Gruppe hat das Fenster — die Website lehnt mit 409 ab und
 * verschickt KEINE Bestätigung. "ausfall": Terminstelle nicht erreichbar oder nicht eingerichtet —
 * die Website bucht wie bisher.
 * `datum` "YYYY-MM-DD", `zeit` "HH:MM" (Beginn des Fensters), `id` 6–120 Zeichen aus [A-Za-z0-9._:-].
 */
export async function fensterBuchen(datum: string, zeit: string, id: string): Promise<"ok" | "belegt" | "ausfall"> {
  const a = await ruf({ aktion: "buchen", datum, zeit, quelle: QUELLE, id });
  if (!a) return "ausfall";
  zwischenspeicher.clear();
  if (a.status === 200 && a.daten && a.daten.ok) return "ok";
  if (a.status === 409) return "belegt";
  console.error("[terminstelle] Buchung nicht angenommen, Status", a.status);
  return "ausfall";
}
