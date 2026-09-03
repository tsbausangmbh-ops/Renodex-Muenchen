import { Link } from "wouter";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ServiceDistrictLinksProps {
  serviceName: string;
  serviceSlug: string;
}

const MUNICH_DISTRICTS = [
  { slug: "allach", name: "Allach" },
  { slug: "aubing", name: "Aubing" },
  { slug: "berg-am-laim", name: "Berg am Laim" },
  { slug: "bogenhausen", name: "Bogenhausen" },
  { slug: "feldmoching", name: "Feldmoching" },
  { slug: "hadern", name: "Hadern" },
  { slug: "haidhausen", name: "Haidhausen" },
  { slug: "laim", name: "Laim" },
  { slug: "lehel", name: "Lehel" },
  { slug: "maxvorstadt", name: "Maxvorstadt" },
  { slug: "milbertshofen", name: "Milbertshofen" },
  { slug: "moosach", name: "Moosach" },
  { slug: "neuhausen", name: "Neuhausen" },
  { slug: "nymphenburg", name: "Nymphenburg" },
  { slug: "obermenzing", name: "Obermenzing" },
  { slug: "obergiesing", name: "Obergiesing" },
  { slug: "pasing", name: "Pasing" },
  { slug: "perlach", name: "Perlach" },
  { slug: "ramersdorf", name: "Ramersdorf" },
  { slug: "schwabing", name: "Schwabing" },
  { slug: "schwanthalerhoehe", name: "Schwanthalerhöhe" },
  { slug: "sendling", name: "Sendling" },
  { slug: "solln", name: "Solln" },
  { slug: "trudering", name: "Trudering" },
  { slug: "riem", name: "Riem" },
  { slug: "untermenzing", name: "Untermenzing" },
];

const UMLAND_CITIES = [
  { slug: "garching", name: "Garching" },
  { slug: "germering", name: "Germering" },
  { slug: "ottobrunn", name: "Ottobrunn" },
  { slug: "unterhaching", name: "Unterhaching" },
  { slug: "unterschleissheim", name: "Unterschleißheim" },
  { slug: "haar", name: "Haar" },
  { slug: "taufkirchen", name: "Taufkirchen" },
  { slug: "graefelfing", name: "Gräfelfing" },
  { slug: "planegg", name: "Planegg" },
  { slug: "pullach", name: "Pullach" },
  { slug: "gruenwald", name: "Grünwald" },
  { slug: "ismaning", name: "Ismaning" },
  { slug: "oberschleissheim", name: "Oberschleißheim" },
  { slug: "vaterstetten", name: "Vaterstetten" },
  { slug: "olching", name: "Olching" },
  { slug: "groebenzell", name: "Gröbenzell" },
  { slug: "kirchheim", name: "Kirchheim" },
  { slug: "aschheim", name: "Aschheim" },
  { slug: "feldkirchen", name: "Feldkirchen" },
  { slug: "neubiberg", name: "Neubiberg" },
  { slug: "putzbrunn", name: "Putzbrunn" },
];

export default function ServiceDistrictLinks({ serviceName, serviceSlug }: ServiceDistrictLinksProps) {
  return (
    <section className="bg-muted/30 py-12 md:py-16" data-testid={`section-service-districts-${serviceSlug}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-2 text-center">
          {serviceName} in München &amp; Umgebung
        </h2>
        <p className="text-muted-foreground text-center mb-6 text-sm">
          Wir sind in allen Münchner Stadtteilen und im Umland für Sie da
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">
              München Stadtteile
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {MUNICH_DISTRICTS.map((district) => (
                <Link key={district.slug} href={`/bezirk/${district.slug}`}>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover-elevate py-1.5 px-3"
                    data-testid={`link-service-district-${district.slug}`}
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    {serviceName} {district.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">
              Münchner Umland
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {UMLAND_CITIES.map((city) => (
                <Link key={city.slug} href={`/bezirk/${city.slug}`}>
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover-elevate py-1.5 px-3"
                    data-testid={`link-service-umland-${city.slug}`}
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    {serviceName} {city.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-6">
          <Link href="/leistungen" className="hover:text-foreground">
            Alle Leistungen ansehen
          </Link>
        </p>
      </div>
    </section>
  );
}
