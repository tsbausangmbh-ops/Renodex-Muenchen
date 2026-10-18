import { Link } from "wouter";

/**
 * Gemeinsamer Linkbaustein „Weiterlesen“ (Ziel 918, interne Verlinkung).
 * Zuordnungstabelle: Seite → thematisch passende Seiten derselben Domain.
 * Nur relative Pfade, jeder Pfad zeigt direkt auf eine Seite aus der Sitemap.
 */
export interface WeiterlesenLink {
  href: string;
  text: string;
}

const ANFRAGE: WeiterlesenLink = { href: "/kontakt", text: "Sanierung digital anfragen" };

export const WEITERLESEN: Record<string, WeiterlesenLink[]> = {
  "/": [
    { href: "/leistungen", text: "Alle Leistungen im Überblick" },
    { href: "/preise", text: "Preise und Ablauf" },
    { href: "/komplettsanierung-kosten", text: "Was kostet eine Komplettsanierung?" },
    { href: "/sanierung-reparatur", text: "Reparatur oder Sanierung?" },
    { href: "/wasserschaden", text: "Wasserschaden: was jetzt zu tun ist" },
    { href: "/heizung-ausfall", text: "Heizungsausfall: so gehen wir vor" },
    { href: "/waermepumpe-photovoltaik", text: "Wärmepumpe und Photovoltaik kombinieren" },
    { href: "/ratgeber", text: "Sanierungs-Ratgeber" },
  ],
  "/leistungen": [
    { href: "/preise", text: "Preise und Ablauf" },
    { href: "/komplettsanierung-kosten", text: "Was kostet eine Komplettsanierung?" },
    { href: "/sanierung-reparatur", text: "Reparatur oder Sanierung?" },
    { href: "/waermepumpe-photovoltaik", text: "Wärmepumpe und Photovoltaik kombinieren" },
    { href: "/ratgeber", text: "Sanierungs-Ratgeber" },
    { href: "/faq", text: "Häufige Fragen zur Sanierung" },
    ANFRAGE,
  ],
  "/ratgeber": [
    { href: "/komplettsanierung-kosten", text: "Was kostet eine Komplettsanierung?" },
    { href: "/sanierung-reparatur", text: "Reparatur oder Sanierung?" },
    { href: "/wasserschaden", text: "Wasserschaden: was jetzt zu tun ist" },
    { href: "/heizung-ausfall", text: "Heizungsausfall: so gehen wir vor" },
    { href: "/waermepumpe-photovoltaik", text: "Wärmepumpe und Photovoltaik kombinieren" },
    { href: "/leistungen/komplettsanierung", text: "Komplettsanierung" },
    { href: "/leistungen/badsanierung", text: "Badsanierung" },
    { href: "/leistungen/waermepumpe", text: "Wärmepumpe" },
    { href: "/preise", text: "Preise und Ablauf" },
    ANFRAGE,
  ],
  "/faq": [
    { href: "/preise", text: "Preise und Ablauf" },
    { href: "/komplettsanierung-kosten", text: "Was kostet eine Komplettsanierung?" },
    { href: "/leistungen/komplettsanierung", text: "Komplettsanierung" },
    { href: "/leistungen/badsanierung", text: "Badsanierung" },
    { href: "/leistungen/heizung", text: "Heizung erneuern" },
    { href: "/sanierung-reparatur", text: "Reparatur oder Sanierung?" },
    ANFRAGE,
  ],
  "/preise": [
    { href: "/komplettsanierung-kosten", text: "Was kostet eine Komplettsanierung?" },
    { href: "/faq", text: "Häufige Fragen zu Kosten und Ablauf" },
    { href: "/leistungen/komplettsanierung", text: "Komplettsanierung" },
    { href: "/leistungen/badsanierung", text: "Badsanierung" },
    { href: "/leistungen/bodenverlegung", text: "Bodenverlegung" },
    { href: "/leistungen/malerarbeiten-fassade", text: "Malerarbeiten und Fassade" },
    { href: "/leistungen/waermepumpe", text: "Wärmepumpe" },
    ANFRAGE,
  ],
  "/komplettsanierung-kosten": [
    { href: "/preise", text: "Preise und Ablauf" },
    { href: "/leistungen/komplettsanierung", text: "Komplettsanierung" },
    { href: "/leistungen/haussanierung", text: "Haussanierung" },
    { href: "/leistungen/wohnungssanierung", text: "Wohnungssanierung" },
    { href: "/sanierung-reparatur", text: "Reparatur oder Sanierung?" },
    { href: "/faq", text: "Häufige Fragen zu Kosten und Ablauf" },
    ANFRAGE,
  ],
  "/wasserschaden": [
    { href: "/leistungen/trockenbau", text: "Trockenbau nach Wasserschaden" },
    { href: "/leistungen/bodenverlegung", text: "Bodenverlegung" },
    { href: "/leistungen/badsanierung", text: "Badsanierung" },
    { href: "/sanierung-reparatur", text: "Reparatur oder Sanierung?" },
    { href: "/heizung-ausfall", text: "Heizungsausfall: so gehen wir vor" },
  ],
  "/heizung-ausfall": [
    { href: "/leistungen/waermepumpe", text: "Wärmepumpe" },
    { href: "/waermepumpe-photovoltaik", text: "Wärmepumpe und Photovoltaik kombinieren" },
    { href: "/leistungen/sanitaer", text: "Sanitär" },
    { href: "/wasserschaden", text: "Wasserschaden: was jetzt zu tun ist" },
    { href: "/ratgeber", text: "Sanierungs-Ratgeber" },
    ANFRAGE,
  ],
  "/sanierung-reparatur": [
    { href: "/leistungen/renovierung", text: "Renovierung" },
    { href: "/leistungen/wohnungssanierung", text: "Wohnungssanierung" },
    { href: "/leistungen/haussanierung", text: "Haussanierung" },
    { href: "/wasserschaden", text: "Wasserschaden: was jetzt zu tun ist" },
    { href: "/preise", text: "Preise und Ablauf" },
    { href: "/ratgeber", text: "Sanierungs-Ratgeber" },
    ANFRAGE,
  ],
  "/waermepumpe-photovoltaik": [
    { href: "/leistungen/waermepumpe", text: "Wärmepumpe" },
    { href: "/leistungen/photovoltaik", text: "Photovoltaik" },
    { href: "/leistungen/heizung", text: "Heizung erneuern" },
    { href: "/leistungen/elektroinstallation", text: "Elektroinstallation" },
    { href: "/heizung-ausfall", text: "Heizungsausfall: so gehen wir vor" },
    { href: "/preise", text: "Preise und Ablauf" },
    ANFRAGE,
  ],
  "/ueber-uns": [
    { href: "/leistungen/komplettsanierung", text: "Komplettsanierung" },
    { href: "/preise", text: "Preise und Ablauf" },
    { href: "/ratgeber", text: "Sanierungs-Ratgeber" },
    ANFRAGE,
  ],
  "/sofort-hilfe": [
    { href: "/wasserschaden", text: "Wasserschaden: was jetzt zu tun ist" },
    { href: "/heizung-ausfall", text: "Heizungsausfall: so gehen wir vor" },
    { href: "/leistungen/sanitaer", text: "Sanitär" },
    { href: "/leistungen/heizung", text: "Heizung erneuern" },
    { href: "/preise", text: "Preise und Ablauf" },
  ],
  "/kontakt": [
    { href: "/leistungen", text: "Alle Leistungen im Überblick" },
    { href: "/preise", text: "Preise und Ablauf" },
    { href: "/faq", text: "Häufige Fragen zur Sanierung" },
    { href: "/sofort-hilfe", text: "Digitale Erstberatung mit Fotos" },
  ],
};

interface WeiterlesenProps {
  seite: string;
  titel?: string;
  /** Hintergrund, abgesetzt von der Sektion davor (Raster-Prüfung fehler_3_layout). */
  hintergrund?: string;
}

export default function Weiterlesen({ seite, titel = "Weiterlesen", hintergrund = "bg-muted/30" }: WeiterlesenProps) {
  const links = (WEITERLESEN[seite] ?? []).filter((l) => l.href !== seite);
  if (links.length === 0) return null;
  return (
    <section className={`${hintergrund} py-8 sm:py-10`} data-testid="section-weiterlesen">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4">{titel}</h2>
        <nav aria-label={titel}>
          <ul className="flex flex-wrap gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex items-center min-h-11 px-4 rounded-md border bg-background text-base font-medium text-primary hover:underline"
                  data-testid={`link-weiterlesen-${l.href.split("/").pop() || "start"}`}
                >
                  {l.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
