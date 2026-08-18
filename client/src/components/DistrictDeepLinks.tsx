import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const districtLinks = [
  { slug: "schwabing", anchor: "Dachreparatur in Schwabing" },
  { slug: "pasing", anchor: "Dachdecker Sofort-Hilfe in Pasing" },
  { slug: "bogenhausen", anchor: "Dachsanierung in Bogenhausen" },
  { slug: "sendling", anchor: "Dacharbeiten Sendling" },
  { slug: "moosach", anchor: "Dachdecker Moosach" },
  { slug: "laim", anchor: "Dachreparatur Laim" },
  { slug: "trudering", anchor: "Dachsanierung Trudering" },
  { slug: "haidhausen", anchor: "Dachdecker in Haidhausen" },
  { slug: "allach", anchor: "Dacharbeiten in Allach" },
  { slug: "neuhausen", anchor: "Dachdecker Neuhausen-Nymphenburg" },
];

export default function DistrictDeepLinks() {
  return (
    <section className="py-6 bg-muted/20" data-testid="section-district-deeplinks">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold mb-2">
            <MapPin className="w-3.5 h-3.5" />
            Ihr Dachdecker in ganz München
          </div>
          <h2 className="text-lg md:text-xl font-bold" data-testid="heading-district-deeplinks">
            Dachdecker München Bezirke – Soforthilfe in Ihrem Stadtteil
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Wir decken ganz München und das Umland ab – Ihr lokaler Partnernetzwerk vor Ort.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {districtLinks.map((d) => (
            <Link
              key={d.slug}
              href={`/bezirk/${d.slug}`}
              className="inline-flex items-center gap-1.5 bg-card border px-3 py-2 rounded-md text-xs font-medium hover:border-primary/50 hover:text-primary transition-colors"
              data-testid={`link-deep-${d.slug}`}
            >
              <MapPin className="w-3 h-3 text-primary shrink-0" />
              {d.anchor}
              <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
