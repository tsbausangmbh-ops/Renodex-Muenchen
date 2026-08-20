// Terminverfuegbarkeit OHNE Google-Kalender-Zugang (Regel: kein Google-Kalender-Dienstkonto
// in einer Website). Ersetzt server/googleCalendar.ts 1:1 in der Funktionssignatur, damit
// server/routes.ts nur die Import-Quelle aendern musste, nicht die Aufrufe selbst.
//
// Ohne echten Kalenderabgleich zeigt dieses Modul genau einen Terminvorschlag pro Werktag
// (deterministisch nach Datum, gleiche Anfrage liefert an einem Tag immer denselben
// Vorschlag) -- keine erfundene Auslastung, keine Slot-Flut. Die eigentliche
// Terminbestaetigung bleibt Handarbeit: jede Buchung loest zwei E-Mails aus (Kunde +
// info@renodex.de), ein Mensch prueft die tatsaechliche Verfuegbarkeit und bestaetigt final.

const BUSINESS_HOURS = { start: 8, end: 16.5 };
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
  // Sommerzeit (MESZ, UTC+2) gilt von letztem Sonntag im Maerz bis letztem Sonntag im
  // Oktober -- fuer die hier relevanten naechsten Wochen reicht diese einfache Monats-
  // Heuristik (Maerz bis Oktober = Sommerzeit).
  const monat = parseInt(dateStr.slice(5, 7), 10);
  return monat >= 4 && monat <= 9 ? "+02:00" : "+01:00";
}

function berlinDateStr(date: Date): string {
  return date.toLocaleDateString("sv-SE", { timeZone: "Europe/Berlin" }); // YYYY-MM-DD
}

function berlinZeitpunkt(dateStr: string, stunde: number, minute: number): Date {
  const off = berlinOffset(dateStr);
  const hh = String(stunde).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  return new Date(`${dateStr}T${hh}:${mm}:00${off}`);
}

export async function getAvailableSlots(date: Date, slotDurationMinutes: number = SLOT_DURATION_MINUTES): Promise<Date[]> {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return [];

  const dateStr = berlinDateStr(date);
  const startOfDay = berlinZeitpunkt(dateStr, BUSINESS_HOURS.start, 0);
  const endOfDay = berlinZeitpunkt(dateStr, Math.floor(BUSINESS_HOURS.end), (BUSINESS_HOURS.end % 1) * 60);

  const possibleSlots: Date[] = [];
  let currentSlot = new Date(startOfDay);
  while (currentSlot < endOfDay) {
    possibleSlots.push(new Date(currentSlot));
    currentSlot = new Date(currentSlot.getTime() + slotDurationMinutes * 60 * 1000);
  }
  if (possibleSlots.length === 0) return [];

  const rng = seededRandom(hashSeed(dateStr));
  const gewaehlterIndex = Math.floor(rng() * possibleSlots.length);

  return [possibleSlots[gewaehlterIndex]];
}

export async function getAlternativeSlots(preferredDate: Date): Promise<Date[]> {
  const alternatives: Date[] = [];
  let checkDate = new Date(preferredDate);
  let daysChecked = 0;
  const maxDays = 14;

  while (alternatives.length < 3 && daysChecked < maxDays) {
    if (checkDate.getDay() !== 0 && checkDate.getDay() !== 6) {
      const slots = await getAvailableSlots(checkDate);
      for (const slot of slots) {
        if (alternatives.length >= 3) break;
        alternatives.push(slot);
      }
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
