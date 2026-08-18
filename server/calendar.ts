// Terminverfuegbarkeit OHNE Google-Kalender-Zugang (Regel: kein Google-Kalender-Dienstkonto
// in einer Website). Ersetzt server/googleCalendar.ts 1:1 in der Funktionssignatur, damit
// server/routes.ts nur die Import-Quelle aendern musste, nicht die Aufrufe selbst.
//
// Anders als bei einem echten Kalender kann dieses Modul nicht garantieren, dass ein
// angezeigter Slot tatsaechlich frei bleibt -- es zeigt plausible Terminvorschlaege
// (deterministisch nach Datum, gleiche Anfrage liefert an einem Tag immer dieselben
// Vorschlaege). Die eigentliche Terminbestaetigung bleibt wie zuvor Handarbeit: jede Buchung
// loest zwei E-Mails aus (Kunde + info@renodex.de), ein Mensch prueft und bestaetigt.
// Gleiches Muster wie server/calendar.ts bei 089-Sanierer.

const BUSINESS_HOURS = { start: 8, end: 17 };
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

const BOOKED_SLOT_PERCENTAGE = 0.4;

export async function getAvailableSlots(date: Date, slotDurationMinutes: number = SLOT_DURATION_MINUTES): Promise<Date[]> {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return [];

  const dateStr = date.toISOString().split("T")[0];
  const rng = seededRandom(hashSeed(dateStr));

  const startOfDay = new Date(date);
  startOfDay.setHours(BUSINESS_HOURS.start, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(BUSINESS_HOURS.end, 0, 0, 0);

  const slots: Date[] = [];
  let currentSlot = new Date(startOfDay);
  while (currentSlot < endOfDay) {
    if (rng() >= BOOKED_SLOT_PERCENTAGE) {
      slots.push(new Date(currentSlot));
    }
    currentSlot = new Date(currentSlot.getTime() + slotDurationMinutes * 60 * 1000);
  }

  return slots;
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
