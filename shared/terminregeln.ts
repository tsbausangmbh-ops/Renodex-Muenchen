// Terminregeln (Betreiber 03.10.2026): Termine nur mit drei Tagen Vorlauf, je Woche werden
// höchstens rund 40 % der Zeitfenster online angeboten, je Tag höchstens rund 60 %.
// Die übrigen Fenster hält der Betrieb für Baustellen und telefonische Absprachen frei; sie
// erscheinen im Kalender als nicht wählbar. Die Auswahl hängt nur vom Datum ab, damit
// Anzeige und Serverprüfung dasselbe Ergebnis liefern.
// Alle Daten als "yyyy-MM-dd" in Berliner Zeit.

export const VORLAUF_TAGE = 3;

function mittag(datum: string): Date {
  return new Date(`${datum}T12:00:00Z`);
}

function alsText(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function streu(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function berlinHeute(jetzt: Date = new Date()): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Berlin" }).format(jetzt);
}

/** Erster buchbarer Tag: heute plus drei Tage. */
export function fruehestesDatum(heute: string = berlinHeute()): string {
  const d = mittag(heute);
  d.setUTCDate(d.getUTCDate() + VORLAUF_TAGE);
  return alsText(d);
}

export function imVorlauf(datum: string, heute: string = berlinHeute()): boolean {
  return datum < fruehestesDatum(heute);
}

function montagDerWoche(datum: string): string {
  const d = mittag(datum);
  const tag = (d.getUTCDay() + 6) % 7; // Montag = 0
  d.setUTCDate(d.getUTCDate() - tag);
  return alsText(d);
}

/** Zwei Werktage (Mo–Fr) je Woche werden online nicht angeboten. */
export function tagNichtAngeboten(datum: string): boolean {
  const tag = (mittag(datum).getUTCDay() + 6) % 7;
  if (tag > 4) return false;
  const h = streu(montagDerWoche(datum));
  const erster = h % 5;
  const zweiter = (erster + 1 + ((h >>> 3) % 4)) % 5;
  return tag === erster || tag === zweiter;
}

/** Je angebotenem Tag bleiben zwei Zeitfenster frei gehalten. */
export function fensterNichtAngeboten(datum: string, zeit: string, fenster: string[]): boolean {
  const n = fenster.length;
  if (n < 3) return false;
  const h = streu(datum);
  const erstes = h % n;
  const zweites = (erstes + 1 + ((h >>> 3) % (n - 1))) % n;
  const i = fenster.indexOf(zeit);
  return i === erstes || i === zweites;
}

export function tagBuchbar(datum: string, heute: string = berlinHeute()): boolean {
  return !imVorlauf(datum, heute) && !tagNichtAngeboten(datum);
}

export function fensterBuchbar(datum: string, zeit: string, fenster: string[], heute: string = berlinHeute()): boolean {
  return tagBuchbar(datum, heute) && !fensterNichtAngeboten(datum, zeit, fenster);
}
