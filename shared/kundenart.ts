// 25.10.2026 (Anweisung 402, Nr. 1303; Muster 089cleaner KontaktFelder.tsx): Kundenart mit eigenen Feldern.
// Firma und Hausverwaltung fragen immer einen Ansprechpartner mit eigener E-Mail und eigener Telefonnummer ab
// (Pflicht). Hausverwaltung: Objektnummer, Auftraggeber/Rechnungsempfänger (Pflicht), Zugang vor Ort,
// Vorgangsnummer. Firma: Abteilung, Bestell-/Kostenstellennummer, abweichender Rechnungsempfänger.
// Eine Quelle für Formulare und /api/contact, ohne Abhängigkeit (Browser-Bündel bleibt klein).

export const KUNDENARTEN = ["Privat", "Firma", "Hausverwaltung"] as const;
export type Kundenart = (typeof KUNDENARTEN)[number];

export const KUNDENART_TEXT: Record<Kundenart, string> = {
  Privat: "Privatkunde",
  Firma: "Firma",
  Hausverwaltung: "Hausverwaltung",
};

export interface KundenartDaten {
  kundenart: string;
  company: string;
  ansprechpartner: string;
  ansprechpartnerEmail: string;
  ansprechpartnerTelefon: string;
  abteilung: string;
  kostenstelle: string;
  rechnungsempfaenger: string;
  objektnummer: string;
  zugang: string;
  vorgangsnummer: string;
}

export const KUNDENART_LEER: KundenartDaten = {
  kundenart: "Privat",
  company: "",
  ansprechpartner: "",
  ansprechpartnerEmail: "",
  ansprechpartnerTelefon: "",
  abteilung: "",
  kostenstelle: "",
  rechnungsempfaenger: "",
  objektnummer: "",
  zugang: "",
  vorgangsnummer: "",
};

export type KundenartFeld =
  | "kundenart"
  | "company"
  | "ansprechpartner"
  | "ansprechpartnerEmail"
  | "ansprechpartnerTelefon"
  | "rechnungsempfaenger";

export type KundenartFehler = Partial<Record<KundenartFeld, string>>;

function text(wert: unknown): string {
  return typeof wert === "string" ? wert.trim() : "";
}

export function istKundenart(wert: unknown): wert is Kundenart {
  return typeof wert === "string" && (KUNDENARTEN as readonly string[]).includes(wert);
}

export const mitAnsprechpartner = (art: unknown) => art === "Firma" || art === "Hausverwaltung";

export function pruefeKundenart(daten: unknown): KundenartFehler {
  const d = (daten && typeof daten === "object" ? daten : {}) as Record<string, unknown>;
  const fehler: KundenartFehler = {};
  // Ältere Aufrufe ohne Kundenart gelten als Privatkunde.
  const art = d.kundenart === undefined || d.kundenart === "" ? "Privat" : d.kundenart;
  if (!istKundenart(art)) {
    fehler.kundenart = "Bitte wählen Sie Privatkunde, Firma oder Hausverwaltung.";
    return fehler;
  }
  if (!mitAnsprechpartner(art)) return fehler;

  if (text(d.company).length < 2) {
    fehler.company = art === "Hausverwaltung" ? "Bitte geben Sie den Namen der Hausverwaltung an." : "Bitte geben Sie den Firmennamen an.";
  }
  if (text(d.ansprechpartner).length < 2) fehler.ansprechpartner = "Bitte geben Sie den Namen des Ansprechpartners an.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text(d.ansprechpartnerEmail))) {
    fehler.ansprechpartnerEmail = "Bitte geben Sie die E-Mail-Adresse des Ansprechpartners an.";
  }
  const tel = text(d.ansprechpartnerTelefon);
  if (!/^[0-9+()\/\s.-]+$/.test(tel) || tel.replace(/\D/g, "").length < 6) {
    fehler.ansprechpartnerTelefon = "Bitte geben Sie die Telefonnummer des Ansprechpartners an.";
  }
  if (art === "Hausverwaltung" && text(d.rechnungsempfaenger).length < 2) {
    fehler.rechnungsempfaenger = "Bitte geben Sie Auftraggeber und Rechnungsempfänger an (WEG oder Eigentümer).";
  }
  return fehler;
}

// Zeilen der Formular-Mail, je Angabe eine eigene Zeile. Privatkunden bekommen nur die Kundenart.
export function kundenartZeilen(daten: Record<string, unknown>): [string, string][] {
  const art = istKundenart(daten.kundenart) ? daten.kundenart : "Privat";
  const w = (k: string) => text(daten[k]) || "-";
  const zeilen: [string, string][] = [["Kundenart", KUNDENART_TEXT[art]]];
  if (!mitAnsprechpartner(art)) return zeilen;
  zeilen.push(
    ["Ansprechpartner", w("ansprechpartner")],
    ["E-Mail Ansprechpartner", w("ansprechpartnerEmail")],
    ["Telefon Ansprechpartner", w("ansprechpartnerTelefon")],
  );
  if (art === "Firma") {
    zeilen.push(
      ["Abteilung", w("abteilung")],
      ["Bestell-/Kostenstellennummer", w("kostenstelle")],
      ["Abweichender Rechnungsempfänger", w("rechnungsempfaenger")],
    );
  } else {
    zeilen.push(
      ["Objektnummer", w("objektnummer")],
      ["Auftraggeber/Rechnungsempfänger", w("rechnungsempfaenger")],
      ["Zugang vor Ort", w("zugang")],
      ["Vorgangsnummer", w("vorgangsnummer")],
    );
  }
  return zeilen;
}
