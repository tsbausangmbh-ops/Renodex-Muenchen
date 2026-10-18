import { Link } from "wouter";
import { Wrench, Home, Droplets, Building2, Zap, Sun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DistrictServiceLinksProps {
  districtName: string;
  districtSlug: string;
}

const SERVICES = [
  {
    slug: "leistungen/komplettsanierung",
    name: "Komplettsanierung",
    icon: Home,
    description: "Haus & Wohnung aus einer Hand"
  },
  {
    slug: "leistungen/badsanierung",
    name: "Badsanierung",
    icon: Droplets,
    description: "Neues Bad aus einer Hand"
  },
  {
    slug: "leistungen/elektroinstallation",
    name: "Elektroinstallation",
    icon: Zap,
    description: "Fachgerecht und sicher"
  },
  {
    slug: "leistungen/heizung",
    name: "Heizung",
    icon: Wrench,
    description: "Installation und Wartung"
  },
  {
    slug: "leistungen/photovoltaik",
    name: "Photovoltaik",
    icon: Sun,
    description: "Solaranlage fürs eigene Zuhause"
  },
  {
    slug: "faq",
    name: "Fragen & Antworten",
    icon: Building2,
    description: "Häufige Fragen zur Sanierung"
  },
];

const WEITERE_LEISTUNGEN = [
  { href: "/leistungen/haussanierung", name: "Haussanierung" },
  { href: "/leistungen/wohnungssanierung", name: "Wohnungssanierung" },
  { href: "/leistungen/renovierung", name: "Renovierung" },
  { href: "/leistungen/sanitaer", name: "Sanitär" },
  { href: "/leistungen/waermepumpe", name: "Wärmepumpe" },
  { href: "/leistungen/bodenverlegung", name: "Bodenverlegung" },
  { href: "/leistungen/malerarbeiten-fassade", name: "Malerarbeiten und Fassade" },
  { href: "/leistungen/mauerwerksabdichtung", name: "Mauerwerksabdichtung" },
  { href: "/leistungen/trockenbau", name: "Trockenbau" },
  { href: "/leistungen/innenausbau", name: "Innenausbau" },
  { href: "/leistungen/tueren", name: "Türen" },
  { href: "/leistungen/asbestsanierung", name: "Asbestsanierung" },
  { href: "/preise", name: "Preise und Ablauf" },
  { href: "/kontakt", name: "Sanierung digital anfragen" },
];

export default function DistrictServiceLinks({ districtName, districtSlug }: DistrictServiceLinksProps) {
  return (
    <section className="py-12 md:py-16" data-testid={`section-district-services-${districtSlug}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Unsere Leistungen in {districtName}
        </h2>
        <p className="text-muted-foreground text-center mb-6 text-sm">
          Komplettsanierung von Haus und Wohnung aus einer Hand – direkt vor Ort
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.slug} href={`/${service.slug}`}>
                <Card className="h-full hover-elevate cursor-pointer transition-all" data-testid={`card-service-${service.slug}`}>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Icon className="w-6 h-6 text-marine mb-2" />
                    <h3 className="font-medium text-sm mb-1">
                      {service.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <nav className="mt-6" aria-label={`Weitere Leistungen in ${districtName}`}>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">Weitere Leistungen in {districtName}</h3>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
            {WEITERE_LEISTUNGEN.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex items-center min-h-11 text-sm text-primary hover:underline"
                  data-testid={`link-district-weitere-${l.href.split("/").pop()}`}
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-center mt-6">
          <Link href="/leistungen">
            <span className="text-sm text-primary" data-testid="link-all-services">
              Alle Leistungen im Detail ansehen
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
