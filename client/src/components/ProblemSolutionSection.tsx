import { AlertTriangle, Droplets, Home, Wrench, Check, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProblemSolutionSectionProps {
  onContactClick: () => void;
}

const problems = [
  {
    icon: AlertTriangle,
    problem: "Sturmschaden?",
    solution: "Sofort-Hilfe 24/7 - Innerhalb 24h vor Ort",
    urgency: true,
  },
  {
    icon: Droplets,
    problem: "Dach undicht?",
    solution: "Schnelle Abdichtung & Reparatur",
    urgency: true,
  },
  {
    icon: Home,
    problem: "Dach sanieren?",
    solution: "Komplettlösung mit 10 Jahren Garantie",
    urgency: false,
  },
  {
    icon: Wrench,
    problem: "Rinne defekt?",
    solution: "Spenglerei vom [Gründungsjahr folgt]",
    urgency: false,
  },
];

const benefits = [
  "Kostenlose Erstberatung vor Ort",
  "Transparente Festpreise",
  "Versicherungsabwicklung inklusive",
  "Qualitätsgarantie auf alle Arbeiten",
];

export default function ProblemSolutionSection({ onContactClick }: ProblemSolutionSectionProps) {
  return (
    <section className="py-16 bg-muted/30" id="probleme" data-testid="section-problems">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Welches Problem haben Sie?
          </h2>
          <p className="text-muted-foreground text-lg">
            Wir lösen es schnell und zuverlässig.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {problems.map((item, index) => (
            <Card 
              key={index}
              className={`relative overflow-visible ${item.urgency ? "border-destructive/50" : ""}`}
              data-testid={`card-problem-${index}`}
            >
              {item.urgency && (
                <div className="absolute -top-3 left-4 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded-md">
                  DRINGEND
                </div>
              )}
              <CardContent className="p-5">
                <div className={`w-12 h-12 rounded-md flex items-center justify-center mb-3 ${item.urgency ? "bg-destructive/10" : "bg-primary/10"}`}>
                  <item.icon className={`w-6 h-6 ${item.urgency ? "text-destructive" : "text-primary"}`} />
                </div>
                <h3 className="font-bold text-lg mb-1">{item.problem}</h3>
                <p className="text-muted-foreground text-sm">{item.solution}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-background border rounded-md p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">So helfen wir Ihnen</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center md:text-right">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">90 Min</div>
              <div className="text-muted-foreground mb-4">Durchschnittliche Reaktionszeit bei Notfällen</div>
              <Button size="lg" onClick={onContactClick} data-testid="button-problem-cta">
                Jetzt Anfrage stellen
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
