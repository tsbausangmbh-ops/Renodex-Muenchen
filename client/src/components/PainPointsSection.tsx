import { AlertTriangle, Droplets, ThermometerSnowflake, Banknote, ArrowRight, TrendingDown, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PainPointsSectionProps {
  onContactClick: () => void;
}

const painPoints = [
  { 
    icon: Droplets, 
    title: "Dach undicht München", 
    pain: "Schimmel & Folgeschäden drohen",
    consequence: "Nach 48h beginnt Schimmelbildung",
    solution: "Schnelle Abdichtung durch [Gründungsjahr folgt]"
  },
  { 
    icon: AlertTriangle, 
    title: "Sturmschaden Dach", 
    pain: "Offene Stellen = Gefahr",
    consequence: "Nächster Sturm richtet mehr Schaden an",
    solution: "24/7 Sofort-Hilfe mit Sofortmaßnahmen"
  },
  { 
    icon: ThermometerSnowflake, 
    title: "Wärmeverlust Dach", 
    pain: "Bis 30% höhere Heizkosten",
    consequence: "Jeden Monat Geld verschenken",
    solution: "Dachdämmung nach EnEV-Standard"
  },
  { 
    icon: Banknote, 
    title: "Wertverlust Immobilie", 
    pain: "Immobilie verliert an Wert",
    consequence: "Bis zu 15% weniger beim Verkauf",
    solution: "Dachsanierung steigert Immobilienwert"
  },
];

const urgentProblems = [
  "Wasser tropft durch die Decke",
  "Dachziegel nach Sturm verrutscht",
  "Dachrinne verstopft oder undicht",
  "Schimmel im Dachgeschoss entdeckt",
  "Dachfenster schließt nicht mehr richtig",
  "Feuchtigkeit an der Dachschräge"
];

export default function PainPointsSection({ onContactClick }: PainPointsSectionProps) {
  return (
    <section className="py-10 bg-background" data-testid="section-pain-points">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Dachschäden in München? Diese Probleme lösen wir
        </h2>
        <p className="text-center text-muted-foreground mb-6 max-w-3xl mx-auto">
          <strong>Je länger Sie warten, desto teurer wird es.</strong> Ob <strong>undichtes Dach in München</strong>, 
          <strong> Sturmschaden am Dach</strong> oder defekte <strong>Dachrinnen</strong> – 
          als <strong>Dachdecker-Meisterbetrieb ([Gründungsjahr folgt])</strong> in München beheben wir alle 
          Dachprobleme schnell und zuverlässig. Über 100 Münchner Hausbesitzer vertrauen uns bereits.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {painPoints.map((point, index) => (
            <div 
              key={index}
              className="p-4 bg-destructive/5 border border-destructive/20 rounded-md"
              data-testid={`pain-point-${index}`}
            >
              <point.icon className="w-7 h-7 text-destructive mb-3" />
              <h3 className="font-bold text-base mb-1">{point.title}</h3>
              <p className="text-sm text-foreground mb-2">{point.pain}</p>
              <div className="flex items-center gap-1.5 text-xs text-destructive/80 mb-3">
                <TrendingDown className="w-3 h-3" />
                <span>{point.consequence}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-primary">
                <CheckCircle className="w-3 h-3" />
                <span>{point.solution}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-muted/50 rounded-md p-6 mb-6">
          <h3 className="font-bold text-lg mb-4 text-center">
            Erkennen Sie diese Symptome an Ihrem Dach in München?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {urgentProblems.map((problem, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                <span>{problem}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-4">
            Eines dieser Probleme erkannt? Dann sollten Sie jetzt handeln. 
            <strong className="text-foreground"> Renodex hilft sofort</strong> – auch am Wochenende.
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-md p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-base">
                  Jetzt handeln, bevor es teurer wird
                </p>
                <p className="text-sm text-muted-foreground">
                  Kostenlose Erstberatung vom Dachdeckermeister innerhalb von 24 Stunden
                </p>
              </div>
            </div>
            <Button size="lg" onClick={onContactClick} data-testid="button-pain-cta">
              Jetzt Dachproblem lösen
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="mt-6 text-sm text-muted-foreground text-center">
          <p>
            <strong className="text-foreground">Tipp vom Dachdeckermeister:</strong> Regelmäßige <strong>Dachpflege</strong> und 
            <strong> Dachrinnenreinigung</strong> alle 1-2 Jahre kann teure Folgeschäden verhindern. Bei Renodex sind Sie in besten Händen.
          </p>
        </div>
      </div>
    </section>
  );
}
