import { ExternalLink, Handshake } from "lucide-react";

const partners = [
  {
    name: "089-Sanierer",
    description: "Innenausbau & Komplettsanierung",
    url: "https://089-sanierer.de",
  },
  {
    name: "KSHW München",
    description: "Innenausbau & Komplettsanierung",
    url: "https://komplettsanierungen-haus-wohnung.de",
  },
  {
    name: "Estriche München",
    description: "Estriche & Bodensysteme",
    url: "https://estriche-muenchen.de",
  },
  {
    name: "Extrucon GmbH",
    description: "Webdesign & Digitalagentur",
    url: "https://extrucon.de",
  },
  {
    name: "Sanitär München",
    description: "Sanitär & Badinstallation",
    url: "https://sanitär-muenchen.de",
  },
  {
    name: "Aquapro24",
    description: "Sanitär, Heizung & Klima",
    url: "https://aquapro24.de",
  },
];

export default function PartnerNetwork() {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-800 py-12 md:py-16" data-testid="section-partner-network">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Handshake className="w-6 h-6 text-primary" />
            <h2 className="text-xl md:text-2xl font-bold">Unser Partnernetzwerk in München</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Wir arbeiten mit geprüften Fachbetrieben aus Sanitär, Heizung, Klima und Elektro zusammen – für effiziente Abläufe aus einer Hand.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-zinc-900 rounded-md p-4 shadow-sm hover-elevate text-center flex flex-col items-center gap-2"
              data-testid={`partner-card-${index}`}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                <span className="text-primary font-bold text-sm">{partner.name.charAt(0)}</span>
              </div>
              <span className="text-xs font-bold leading-tight">{partner.name}</span>
              <span className="text-[11px] text-muted-foreground leading-tight">{partner.description}</span>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors mt-auto" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
