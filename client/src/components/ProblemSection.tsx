import { Heart, AlertTriangle, Droplets, ThermometerSnowflake, Banknote, ArrowRight, Clock, CheckCircle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProblemSectionProps {
  onContactClick: () => void;
}

const painPoints = [
  { 
    icon: Droplets, 
    title: "Dach undicht", 
    pain: "Schimmel & Folgeschäden drohen",
    solution: "Schnelle Abdichtung durch [Gründungsjahr folgt]"
  },
  { 
    icon: AlertTriangle, 
    title: "Sturmschaden", 
    pain: "Offene Stellen = Gefahr",
    solution: "24/7 Sofort-Hilfe mit Sofortmaßnahmen"
  },
  { 
    icon: ThermometerSnowflake, 
    title: "Wärmeverlust", 
    pain: "Bis 30% höhere Heizkosten",
    solution: "Dachdämmung nach EnEV-Standard"
  },
  { 
    icon: Banknote, 
    title: "Wertverlust", 
    pain: "Immobilie verliert an Wert",
    solution: "Dachsanierung steigert Wert"
  },
];

const symptoms = [
  "Tropft es bei Regen durch die Decke?",
  "Dachziegel nach Sturm verrutscht?",
  "Dachrinne verstopft oder undicht?",
  "Schimmel im Dachgeschoss entdeckt?",
  "Feuchtigkeit an der Dachschräge?",
  "Lose Ziegel machen Ihnen Sorgen?"
];

export default function ProblemSection({ onContactClick }: ProblemSectionProps) {
  return (
    <section className="py-6 md:py-8 bg-white dark:bg-zinc-900" data-testid="section-problems">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-foreground">
            Dach undicht oder beschädigt? Dachdecker München hilft sofort
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            <strong>Bau- und Sanierungsbetrieb München</strong> mit <strong>25+ Jahren Erfahrung</strong>.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {painPoints.map((point, index) => (
            <div 
              key={index}
              className="p-3 bg-card border rounded-md"
              data-testid={`pain-point-${index}`}
            >
              <point.icon className="w-5 h-5 text-primary mb-1.5" />
              <h3 className="font-bold text-xs mb-0.5">{point.title}</h3>
              <p className="text-xs text-destructive mb-1">{point.pain}</p>
              <div className="flex items-start gap-1 text-xs text-primary">
                <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{point.solution}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mb-4">
          <div className="bg-card border rounded-md p-4">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-destructive" />
              Erkennen Sie diese Symptome?
            </h3>
            <div className="grid grid-cols-2 gap-1">
              {symptoms.map((symptom, index) => (
                <div key={index} className="flex items-center gap-1.5 text-xs">
                  <AlertTriangle className="w-3 h-3 text-destructive flex-shrink-0" />
                  <span className="line-clamp-1">{symptom}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-card border rounded-md p-4">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Warum jetzt handeln?
            </h3>
            <div className="space-y-1 text-xs">
              <p><strong>Je länger Sie warten, desto teurer.</strong> Nach 48h beginnt Schimmelbildung.</p>
              <p>Kleine Schäden wachsen schnell. Immobilienwert sinkt mit jedem Monat.</p>
              <p className="text-primary font-medium">Mit Renodex: Dach schnell wieder dicht!</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800 dark:bg-zinc-900 rounded-md p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="font-bold text-sm text-white">Jetzt handeln, bevor es teurer wird</p>
              <p className="text-xs text-zinc-600">Kostenlose Beratung innerhalb 24 Stunden</p>
            </div>
            <Button onClick={onContactClick} data-testid="button-problem-cta">
              Jetzt beraten
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
        
      </div>
    </section>
  );
}
