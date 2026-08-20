import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LEISTUNGEN_THEMEN } from "@/content/leistungenThemen";

const process = [
  { step: 1, title: "Erstberatung", desc: "Digital oder telefonisch" },
  { step: 2, title: "Besichtigung", desc: "Vor Ort in München" },
  { step: 3, title: "Angebot", desc: "Alle Gewerke, ein Preis" },
  { step: 4, title: "Ausführung", desc: "Koordiniert bis zur Abnahme" },
];

const serviceAreas = [
  "München-Allach", "Untermenzing", "Pasing", "Obermenzing", "Aubing",
  "Moosach", "Feldmoching", "Nymphenburg", "Laim", "Sendling",
  "Schwabing", "Bogenhausen", "Trudering", "Haidhausen", "Giesing",
  "Garching", "Ismaning", "Unterhaching", "Taufkirchen", "Ottobrunn"
];

export default function SolutionSection() {
  const kachelThemen = LEISTUNGEN_THEMEN.slice(0, 8);

  return (
    <section className="py-6 md:py-8 bg-white dark:bg-zinc-900" data-testid="section-solution">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-foreground">
            Komplettsanierung von Haus und Wohnung aus einer Hand
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            <strong>Renodex</strong> koordiniert Sanierung, Renovierung und einzelne Gewerke –
            <strong> Elektro</strong>, <strong>Sanitär</strong>, <strong>Heizung</strong> und mehr.
          </p>
        </div>

        <div className="mb-6 rounded-md overflow-hidden">
          <img
            src="/images/optimized/home-solutionsection.webp"
            alt="Bauplanung und Terminabstimmung auf einer Renodex-Baustelle"
            className="w-full h-40 md:h-56 object-cover"
            loading="lazy"
            decoding="async"
            width={1200}
            height={655}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {kachelThemen.map((thema) => (
            <Link key={thema.slug} href={`/leistungen/${thema.slug}`}>
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer" data-testid={`service-card-${thema.slug}`}>
                <CardContent className="p-3">
                  <h3 className="font-bold text-sm mb-1">{thema.title}</h3>
                  <p className="text-muted-foreground text-xs mb-2 line-clamp-2">{thema.heroLead}</p>
                  <span className="text-xs text-primary font-medium inline-flex items-center gap-1">
                    Mehr erfahren <ArrowRight className="w-3 h-3" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mb-6">
          <Link href="/leistungen" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1" data-testid="link-alle-leistungen">
            Alle Leistungen ansehen <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-background border rounded-md p-4">
            <h3 className="text-sm font-bold text-center mb-3" data-testid="heading-solution-process">So läuft eine Zusammenarbeit mit Renodex ab</h3>
            <div className="grid grid-cols-4 gap-2">
              {process.map((item) => (
                <div key={item.step} className="text-center" data-testid={`process-step-${item.step}`}>
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xs mx-auto mb-1">
                    {item.step}
                  </div>
                  <div className="font-medium text-xs">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-800 dark:bg-zinc-900 rounded-md p-4">
            <h3 className="font-bold text-sm mb-2 text-center text-white" data-testid="heading-solution-areas">
              Einsatzgebiet: München und Umgebung (u.a. Puchheim, Untermenzing) – 25 km Radius
            </h3>
            <div className="flex flex-wrap justify-center gap-1">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="text-xs bg-zinc-700 text-white px-1.5 py-0.5 rounded-full"
                  data-testid={`area-tag-${area}`}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <h4 className="font-semibold text-foreground text-sm mb-2">Warum Renodex:</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Partnernetzwerk</strong> geprüfter Meisterfirmen</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Ein Ansprechpartner</strong> für alle Gewerke</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Digitale Erstberatung</strong> möglich</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>München und Umgebung</strong> im Umkreis von 25 km</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
