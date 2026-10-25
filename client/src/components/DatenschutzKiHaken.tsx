import { Checkbox } from "@/components/ui/checkbox";

// 25.10.2026 (Anweisung 400, Nr. 1287; Muster 089cleaner Kontakt.tsx): EIN Pflicht-Haken für Datenschutz und
// KI-Auswertung. Ohne Haken kein Versand. Der Weg ohne KI ist die Anfrage per E-Mail, er wird nie gesperrt (399).
// Klickbar sind nur das Kästchen und die Links, nie der ganze Satz (webseiten/regeln/68).

export const KI_EMAIL = "info@renodex.de";
export const KI_HAKEN_FEHLT = `Bitte bestätigen Sie Datenschutz und KI-Auswertung oder senden Sie Ihre Anfrage per E-Mail an ${KI_EMAIL}.`;

interface Props {
  id: string;
  checked: boolean;
  onChange: (wert: boolean) => void;
  testId: string;
}

export default function DatenschutzKiHaken({ id, checked, onChange, testId }: Props) {
  const textId = `${id}-text`;
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(c) => onChange(c === true)}
          aria-labelledby={textId}
          data-testid={testId}
          className="mt-0.5"
        />
        <span id={textId} className="text-xs text-muted-foreground font-normal">
          Ich habe die <a href="/datenschutz" className="underline hover:text-primary">Datenschutzerklärung</a> gelesen. Ich willige ein, dass Renodex meine Angaben und Dateien mit der KI Claude von Anthropic auswertet. Das gilt auch für Gesundheitsdaten oder andere besondere Daten, die darin stehen. Anthropic verarbeitet die Daten als eigener Verantwortlicher, auch in den USA. Dort kann das Datenschutzniveau niedriger sein, und Behörden können unter Umständen auf die Daten zugreifen (Art. 49 Abs. 1 lit. a, Art. 9 Abs. 2 lit. a DSGVO). Ich kann die Einwilligung jederzeit per E-Mail an <a href={`mailto:${KI_EMAIL}`} className="underline hover:text-primary">{KI_EMAIL}</a> widerrufen. <a href="/datenschutz#mKI" className="underline hover:text-primary">Mehr dazu</a> *
        </span>
      </div>
      <p className="text-xs text-muted-foreground" data-testid={`${testId}-ohne-ki`}>
        Ohne KI-Auswertung? Schicken Sie Ihre Anfrage mit Fotos per E-Mail an <a href={`mailto:${KI_EMAIL}`} className="underline hover:text-primary">{KI_EMAIL}</a>. Wir bearbeiten sie dann von Hand.
      </p>
    </div>
  );
}
