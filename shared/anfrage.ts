// 03.10.2026 (Anweisung 107): Pflichtangaben jeder Anfrage -- Vorname, Nachname, E-Mail,
// Telefon, Straße mit Hausnummer, PLZ, Ort und Betreff/Anliegen. Firma bleibt freiwillig.
// Eine Quelle für beide Seiten: die Formulare zeigen die Meldung am Feld, /api/contact
// lehnt mit denselben Regeln ab. Ohne Abhängigkeit, damit nichts zusätzlich ins
// Browser-Bündel wandert.

// 06.10.2026 (Betreiber: „mit richtiger Anrede“ · „auf allen Seiten“): Anrede als
// Pflichtauswahl in jedem Anfrageformular. Die Formular-Mail trägt „Anrede: Herr“
// direkt vor der Namenszeile, die Erfassung liest sie aus.
export const ANREDEN = ["Frau", "Herr", "Keine Angabe"] as const;
export type Anrede = (typeof ANREDEN)[number];

export function istAnrede(wert: unknown): wert is Anrede {
  return typeof wert === "string" && (ANREDEN as readonly string[]).includes(wert);
}

export type AnfragePflichtFeld =
  | "anrede"
  | "subject"
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "address"
  | "postalCode"
  | "city";

export type AnfrageFehler = Partial<Record<AnfragePflichtFeld, string>>;

function text(wert: unknown): string {
  return typeof wert === "string" ? wert.trim() : "";
}

export function pruefeAnfragePflicht(daten: unknown): AnfrageFehler {
  const d = (daten && typeof daten === "object" ? daten : {}) as Record<string, unknown>;
  const fehler: AnfrageFehler = {};

  // Betreff als Freitext oder die gewählte Leistung (Sanierungscheck sendet selectedServices).
  const leistung = Array.isArray(d.selectedServices) ? text(d.selectedServices[0]) : "";
  if (text(d.subject).length < 2 && leistung.length < 2) {
    fehler.subject = "Bitte geben Sie Ihr Anliegen an.";
  }
  if (!istAnrede(d.anrede)) fehler.anrede = "Bitte wählen Sie eine Anrede aus.";
  if (text(d.firstName).length < 2) fehler.firstName = "Bitte geben Sie Ihren Vornamen an.";
  if (text(d.lastName).length < 2) fehler.lastName = "Bitte geben Sie Ihren Nachnamen an.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text(d.email))) {
    fehler.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  }
  const telefon = text(d.phone);
  if (!/^[0-9+()\/\s.-]+$/.test(telefon) || telefon.replace(/\D/g, "").length < 6) {
    fehler.phone = "Bitte geben Sie eine gültige Telefonnummer an.";
  }
  const strasse = text(d.address);
  if (strasse.length < 3 || !/\p{L}/u.test(strasse) || !/\d/.test(strasse)) {
    fehler.address = "Bitte geben Sie Straße und Hausnummer an.";
  }
  if (!/^\d{5}$/.test(text(d.postalCode))) {
    fehler.postalCode = "Bitte geben Sie eine PLZ mit 5 Ziffern an.";
  }
  if (text(d.city).length < 2) fehler.city = "Bitte geben Sie Ihren Ort an.";

  return fehler;
}
