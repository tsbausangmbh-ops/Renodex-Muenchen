import { useState } from "react";
import { MapPin } from "lucide-react";

/* Karte erst nach Klick laden (Ziel 920/921, 18.10.2026).
   Das Google-Maps-iframe lud beim Aufruf von /kontakt Schriften von fonts.googleapis.com und
   fonts.gstatic.com und übertrug die IP-Adresse an Google, ohne Einwilligung (DSGVO, LG München I,
   3 O 17493/20). Wurzel ist der Baustein: ohne Klick wird keine Verbindung zu Google aufgebaut. */
type Props = {
  src: string;
  title: string;
  adresse: string;
  testId?: string;
};

export function KarteEinwilligung({ src, title, adresse, testId = "google-map-iframe" }: Props) {
  const [geladen, setGeladen] = useState(false);
  const routeUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresse)}`;

  if (geladen) {
    return (
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        data-testid={testId}
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-zinc-100 p-4 text-center text-zinc-800">
      <MapPin className="h-6 w-6" aria-hidden="true" />
      <p className="text-sm font-medium">{adresse}</p>
      <p className="max-w-sm text-xs text-zinc-700">
        Beim Laden der Karte werden Daten an Google übertragen (Datenschutzerklärung).
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setGeladen(true)}
          className="rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-700"
          data-testid="button-karte-laden"
        >
          Karte laden
        </button>
        <a
          href={routeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-200"
          data-testid="link-karte-google"
        >
          In Google Maps öffnen
        </a>
      </div>
    </div>
  );
}

export default KarteEinwilligung;
