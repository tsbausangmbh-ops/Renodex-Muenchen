// Terminverfuegbarkeit OHNE Google-Kalender-Zugang (Regel: kein Google-Kalender-Dienstkonto
// in einer Website). Ersetzt server/googleCalendar.ts 1:1 in der Funktionssignatur, damit
// server/routes.ts nur die Import-Quelle aendern musste, nicht die Aufrufe selbst.
//
// Ohne echten Kalenderabgleich zeigt dieses Modul genau einen Terminvorschlag pro
// Oeffnungstag (deterministisch nach Datum, gleiche Anfrage liefert an einem Tag immer
// denselben Vorschlag) -- keine erfundene Auslastung, keine Slot-Flut. Die eigentliche
// Terminbestaetigung bleibt Handarbeit: jede Buchung loest zwei E-Mails aus (Kunde +
// info@renodex.de), ein Mensch prueft die tatsaechliche Verfuegbarkeit und bestaetigt final.

// Montag bis Freitag 08:00-16:30, Samstag 10:00-14:00, Sonntag geschlossen. Termine
// ausserhalb dieser Fenster gibt es nur auf Anfrage -- die vergibt ein Mensch, nicht
// dieses Modul.
import { tagBuchbar } from "@shared/terminregeln";
import { belegteFenster, fensterSchluessel } from "./terminstelle"; // 856: gemeinsame Terminstelle

const BUSINESS_HOURS = { start: 8, end: 16.5 };
const SATURDAY_HOURS = { start: 10, end: 14 };
const SLOT_DURATION_MINUTES = 60;

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function hashSeed(dateStr: string): number {
  let h = 2166136261;
  for (let i = 0; i < dateStr.length; i++) {
    h ^= dateStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

// setHours() rechnet in der System-Zeitzone des Prozesses -- auf dem Produktions-
// Container (haeufig UTC statt Europe/Berlin) verschiebt das Geschaeftszeiten-Fenster
// um mehrere Stunden. Deshalb wird der Tagesanfang stattdessen aus dem Berlin-
// Datumsstring (YYYY-MM-DD, ueber Intl ermittelt) plus fester Uhrzeit als ISO-String mit
// explizitem Offset gebaut -- das ist unabhaengig von der Server-Systemzeitzone korrekt.
function berlinOffset(dateStr: string): string {
  // Der Offset wird bei der Zeitzonendatenbank erfragt statt aus dem Monat geraten: die
  // Sommerzeit beginnt am letzten Sonntag im Maerz und endet am letzten Sonntag im
  // Oktober, eine Monatsgrenze trifft das nicht (Maerz und Oktober sind geteilte Monate).
  // Gemessen um 12:00 -- mittags liegt nie ein Umstellungszeitpunkt, der Wert gilt
  // deshalb fuer den ganzen Geschaeftstag.
  const teil = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    timeZoneName: "longOffset",
  })
    .formatToParts(new Date(`${dateStr}T12:00:00Z`))
    .find((t) => t.type === "timeZoneName");
  return teil ? teil.value.replace("GMT", "") : "+01:00";
}

function berlinDateStr(date: Date): string {
  return date.toLocaleDateString("sv-SE", { timeZone: "Europe/Berlin" }); // YYYY-MM-DD
}

// Der Wochentag wird aus dem BERLIN-Datumsstring abgeleitet, nicht mit date.getDay() aus
// dem Date-Objekt: getDay() rechnet in der System-Zeitzone des Prozesses. Auf einem
// Container in UTC ist der 12.09. um 23:30 Uhr UTC bereits der 13.09. in Berlin -- getDay()
// meldet dort noch Samstag, waehrend in Muenchen schon Sonntag ist. Mit einem eigenen
// Samstagsfenster wuerde das Sonntagsslots ausliefern. Dieselbe Wurzel wie beim
// setHours()-Fehler oben. 12:00 UTC liegt immer im selben Kalendertag, deshalb ist
// getUTCDay() darauf zonenunabhaengig richtig. 0 = Sonntag ... 6 = Samstag.
function berlinWochentag(dateStr: string): number {
  return new Date(`${dateStr}T12:00:00Z`).getUTCDay();
}

function berlinZeitpunkt(dateStr: string, stunde: number, minute: number): Date {
  const off = berlinOffset(dateStr);
  const hh = String(stunde).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  return new Date(`${dateStr}T${hh}:${mm}:00${off}`);
}

// Schlusszeit des jeweiligen Tages als echter Zeitpunkt (Samstag 14:00, sonst 16:30).
function tagesSchluss(dateStr: string): Date {
  const fenster = berlinWochentag(dateStr) === 6 ? SATURDAY_HOURS : BUSINESS_HOURS;
  return berlinZeitpunkt(dateStr, Math.floor(fenster.end), (fenster.end % 1) * 60);
}

// Ende eines Termins -- gedeckelt auf die Schlusszeit des Tages. Der letzte Werktagsslot
// beginnt um 16:00 und wuerde mit voller Stunde bis 17:00 laufen, also eine halbe Stunde
// ueber die Oeffnungszeit hinaus; er endet deshalb um 16:30 und ist damit ein
// 30-Minuten-Termin (Betreiber 09.09.2026: "passt 30 min slot").
//
// Der Deckel haengt an der Schlusszeit, nicht an einer zweiten Zahl: wer BUSINESS_HOURS
// oder SATURDAY_HOURS aendert, aendert das Terminende automatisch mit. Eine fest
// eingetragene Sonderregel fuer 16:00 waere beim naechsten Fensterwechsel stillschweigend
// falsch geworden. Der Samstag braucht den Deckel heute nicht (letzter Start 13:00, Ende
// 14:00 genau auf der Schlusszeit) -- er ist trotzdem mit abgedeckt.
export function slotEnde(start: Date, slotDurationMinutes: number = SLOT_DURATION_MINUTES): Date {
  const schluss = tagesSchluss(berlinDateStr(start));
  const regulaeresEnde = new Date(start.getTime() + slotDurationMinutes * 60 * 1000);
  return regulaeresEnde > schluss ? schluss : regulaeresEnde;
}

// ohneAbzug = true: die angebotenen Fenster ohne Abzug der Terminstelle (für die Prüfung bei der Buchung).
export async function getAvailableSlots(date: Date, slotDurationMinutes: number = SLOT_DURATION_MINUTES, ohneAbzug: boolean = false): Promise<Date[]> {
  const dateStr = berlinDateStr(date);
  const wochentag = berlinWochentag(dateStr);
  if (wochentag === 0) return []; // Sonntag geschlossen
  // 03.10.2026 (Betreiber): Termine nur mit drei Tagen Vorlauf, je Woche zwei Werktage ohne
  // Online-Termin (shared/terminregeln.ts). Der eine Vorschlag je Tag bleibt wie bisher.
  if (!tagBuchbar(dateStr)) return [];

  const fenster = wochentag === 6 ? SATURDAY_HOURS : BUSINESS_HOURS;
  const startOfDay = berlinZeitpunkt(dateStr, fenster.start, 0);
  const endOfDay = tagesSchluss(dateStr);

  const possibleSlots: Date[] = [];
  let currentSlot = new Date(startOfDay);
  while (currentSlot < endOfDay) {
    possibleSlots.push(new Date(currentSlot));
    currentSlot = new Date(currentSlot.getTime() + slotDurationMinutes * 60 * 1000);
  }
  if (possibleSlots.length === 0) return [];

  // 03.10.2026 (Betreiber: „60 %“ · „wie die anderen“): je Tag werden rund 60 % der Zeitfenster
  // angeboten, die übrigen bleiben frei gehalten. Die Auswahl hängt nur am Datum, damit dieselbe
  // Anfrage an einem Tag immer dieselben Fenster liefert. Vorher: genau ein Vorschlag je Tag.
  const rng = seededRandom(hashSeed(dateStr));
  const anzahl = Math.max(1, Math.round(possibleSlots.length * 0.6));
  const gemischt = possibleSlots
    .map((slot) => ({ slot, los: rng() }))
    .sort((a, b) => a.los - b.los)
    .slice(0, anzahl)
    .map((e) => e.slot);

  // 856: 06.10.2026 (Betreiber: „alle Terminbuchungen gleich setzen, wenn einer besetzt dann
  // auf anderen Seiten belegt“): Fenster, die in der gemeinsamen Terminstelle der Gruppe Sanierung
  // gebucht sind, fallen aus der Auswahl. Erst die Auswahl, dann der Abzug -- so rückt kein
  // anderes Fenster nach. Ohne Terminstelle (Umgebung fehlt, Ausfall) ist die Menge leer.
  if (ohneAbzug) return gemischt.sort((a, b) => a.getTime() - b.getTime());
  const belegt = await belegteFenster(dateStr, dateStr);
  return gemischt
    .filter((slot) => !belegt.has(fensterSchluessel(dateStr, berlinFenster(slot).zeit)))
    .sort((a, b) => a.getTime() - b.getTime());
}

// 856: Datum "YYYY-MM-DD" und Beginn "HH:MM" in Berliner Zeit, so wie die Terminstelle sie führt.
export function berlinFenster(zeitpunkt: Date): { datum: string; zeit: string } {
  const zeit = zeitpunkt.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Berlin" });
  return { datum: berlinDateStr(zeitpunkt), zeit };
}

export async function getAlternativeSlots(preferredDate: Date): Promise<Date[]> {
  const alternatives: Date[] = [];
  let checkDate = new Date(preferredDate);
  let daysChecked = 0;
  const maxDays = 14;

  // Kein eigener Wochentag-Filter mehr: welcher Tag geschlossen ist, entscheidet allein
  // getAvailableSlots() (Sonntag liefert dort []). Zwei Stellen mit derselben Regel waeren
  // genau die Konstellation, in der eine spaetere Aenderung nur an einer davon ankommt --
  // ein neues Oeffnungsfenster galt dann fuer den Direktaufruf, nicht fuer die Alternativen.
  while (alternatives.length < 3 && daysChecked < maxDays) {
    const slots = await getAvailableSlots(checkDate);
    for (const slot of slots) {
      if (alternatives.length >= 3) break;
      alternatives.push(slot);
    }
    checkDate.setDate(checkDate.getDate() + 1);
    daysChecked++;
  }

  return alternatives;
}

// Ersetzt den echten Google-Kalender-Eintrag: es wird kein Event mehr angelegt, nur eine
// stabile Referenz-ID zurueckgegeben, die in der E-Mail-Bestaetigung auftaucht. Die
// eigentliche Terminbestaetigung ist immer die E-Mail an info@renodex.de -- ein Mensch
// prueft die Verfuegbarkeit und bestaetigt final.
export async function createAppointment(
  summary: string,
  description: string,
  startTime: Date,
  endTime: Date,
  attendeeEmail?: string
): Promise<{ eventId: string; htmlLink: string }> {
  const eventId = `manual-${startTime.getTime()}`;
  return { eventId, htmlLink: "" };
}

export function formatDateGerman(date: Date): string {
  return date.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  });
}
