import { Input } from "@/components/ui/input";
import {
  KUNDENARTEN,
  KUNDENART_TEXT,
  mitAnsprechpartner,
  type KundenartDaten,
  type KundenartFehler,
  type KundenartFeld,
} from "@shared/kundenart";

// 25.10.2026 (Anweisung 402, Nr. 1303): Kundenart und die Felder für Firma und Hausverwaltung,
// gegliedert in Ansprechpartner, Rechnung und Objekt. Pflicht und Meldungen aus shared/kundenart.ts.
// Ersetzt die bisherigen Felder „Firma (optional)“ und „Ansprechpartner (optional)“.

interface Props {
  werte: KundenartDaten;
  setzen: (feld: keyof KundenartDaten, wert: string) => void;
  fehler: KundenartFehler;
  fehlerZeigen: boolean;
  praefix: string;
}

export default function KundenartFelder({ werte, setzen, fehler, fehlerZeigen, praefix }: Props) {
  const art = werte.kundenart;
  const id = (feld: keyof KundenartDaten) => `${praefix}-${feld}`;
  const meldung = (feld: KundenartFeld) =>
    fehlerZeigen && fehler[feld] ? (
      <p className="text-xs text-destructive mt-1" role="alert" data-testid={`fehler-${feld}`}>{fehler[feld]}</p>
    ) : null;
  const feld = (name: keyof KundenartDaten, label: string, pflicht: boolean, opts: { type?: string; placeholder?: string; auto?: string } = {}) => (
    <div>
      <label htmlFor={id(name)} className="block text-sm font-medium mb-2">{label}{pflicht ? " *" : ""}</label>
      <Input
        id={id(name)}
        type={opts.type || "text"}
        value={werte[name]}
        onChange={(e) => setzen(name, e.target.value)}
        placeholder={opts.placeholder}
        autoComplete={opts.auto || "off"}
        required={pflicht}
        aria-invalid={fehlerZeigen && !!fehler[name as KundenartFeld]}
        data-testid={`input-${name}`}
      />
      {meldung(name as KundenartFeld)}
    </div>
  );

  return (
    <div className="space-y-4" data-testid={`${praefix}-kundenart`}>
      <fieldset>
        <legend className="block text-sm font-medium mb-2">Sie fragen an als *</legend>
        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Kundenart">
          {KUNDENARTEN.map((k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={art === k}
              onClick={() => setzen("kundenart", k)}
              className={`text-sm font-medium px-3 py-2.5 min-h-11 rounded-md border-2 transition-colors ${art === k ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
              data-testid={`button-kundenart-${k.toLowerCase()}`}
            >
              {KUNDENART_TEXT[k]}
            </button>
          ))}
        </div>
        {meldung("kundenart")}
      </fieldset>

      {mitAnsprechpartner(art) && (
        <>
          {feld("company", art === "Hausverwaltung" ? "Name der Hausverwaltung" : "Firma", true, { auto: "organization" })}

          <p className="text-sm font-semibold pt-2">Ansprechpartner</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {feld("ansprechpartner", "Ansprechpartner (Name)", true)}
            {art === "Firma" && feld("abteilung", "Abteilung", false, { placeholder: "z. B. Facility Management" })}
            {feld("ansprechpartnerEmail", "E-Mail des Ansprechpartners", true, { type: "email" })}
            {feld("ansprechpartnerTelefon", "Telefon des Ansprechpartners", true, { type: "tel" })}
          </div>

          <p className="text-sm font-semibold pt-2">Rechnung</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {art === "Hausverwaltung"
              ? feld("rechnungsempfaenger", "Auftraggeber und Rechnungsempfänger (WEG oder Eigentümer)", true, { placeholder: "z. B. WEG Musterstraße 5" })
              : feld("rechnungsempfaenger", "Abweichender Rechnungsempfänger", false, { placeholder: "nur wenn nicht die Firma oben" })}
            {art === "Firma" && feld("kostenstelle", "Bestell- oder Kostenstellennummer", false)}
            {art === "Hausverwaltung" && feld("vorgangsnummer", "Auftrags- oder Vorgangsnummer", false)}
          </div>

          {art === "Hausverwaltung" && (
            <>
              <p className="text-sm font-semibold pt-2">Objekt</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {feld("objektnummer", "Objektnummer oder Bezeichnung", false, { placeholder: "z. B. WEG 0815" })}
                {feld("zugang", "Zugang vor Ort", false, { placeholder: "z. B. Schlüssel beim Hausmeister" })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
