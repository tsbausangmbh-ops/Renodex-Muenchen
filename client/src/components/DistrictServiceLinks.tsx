import { Link } from "wouter";
import { Wrench, AlertTriangle, Home, Droplets, Building2, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DistrictServiceLinksProps {
  districtName: string;
  districtSlug: string;
}

const SERVICES = [
  { 
    slug: "dachsanierung-kosten", 
    name: "Dachsanierung", 
    icon: Home,
    description: "Komplettsanierung & Modernisierung"
  },
  { 
    slug: "notdienst", 
    name: "24/7 Sofort-Hilfe", 
    icon: AlertTriangle,
    description: "Sofortige Hilfe bei Dachschäden"
  },
  { 
    slug: "dach-reparieren", 
    name: "Dachreparatur", 
    icon: Wrench,
    description: "Kleine und große Reparaturen"
  },
  { 
    slug: "dach-undicht", 
    name: "Dach undicht", 
    icon: Droplets,
    description: "Schnelle Leckortung & Reparatur"
  },
  { 
    slug: "sturmschaden", 
    name: "Sturmschaden", 
    icon: Shield,
    description: "Versicherungsabwicklung inklusive"
  },
  { 
    slug: "faq", 
    name: "Preise & FAQ", 
    icon: Building2,
    description: "Transparente Festpreise"
  },
];

export default function DistrictServiceLinks({ districtName, districtSlug }: DistrictServiceLinksProps) {
  return (
    <section className="py-10" data-testid={`section-district-services-${districtSlug}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Unsere Leistungen in {districtName}
        </h2>
        <p className="text-muted-foreground text-center mb-6 text-sm">
          Alle Dacharbeiten aus einer Hand - direkt vor Ort
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.slug} href={`/${service.slug}`}>
                <Card className="h-full hover-elevate cursor-pointer transition-all" data-testid={`card-service-${service.slug}`}>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Icon className="w-6 h-6 text-primary mb-2" />
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
