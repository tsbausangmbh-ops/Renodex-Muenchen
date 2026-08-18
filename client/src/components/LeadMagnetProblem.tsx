import { AlertTriangle, Droplets, ThermometerSnowflake, Banknote, ArrowRight, Clock, CheckCircle, ShieldAlert, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LeadMagnetProblemProps {
  onContactClick: () => void;
  phoneNumber: string;
}

const urgentProblems = [
  { 
    icon: Droplets, 
    title: "Dach undicht?", 
    pain: "Jede Stunde zählt! Feuchtigkeit dringt ins Mauerwerk, Schimmelbildung beginnt bereits nach 48 Stunden.",
    consequence: "Folgekosten können sich auf 5.000-15.000 € belaufen",
    solution: "Wir dichten Ihr Dach HEUTE noch ab",
    urgent: true
  },
  { 
    icon: AlertTriangle, 
    title: "Sturmschaden?", 
    pain: "Offene Stellen am Dach sind eine akute Gefahr für Ihr Zuhause und Ihre Familie.",
    consequence: "Versicherung zahlt nur bei sofortiger Meldung",
    solution: "24/7 Sofort-Hilfe - in 48 Std vor Ort",
    urgent: true
  },
  { 
    icon: ThermometerSnowflake, 
    title: "Hohe Heizkosten?", 
    pain: "Ein schlecht gedämmtes Dach kostet Sie jeden Winter bares Geld.",
    consequence: "Bis zu 30% Ihrer Heizenergie entweichen durchs Dach",
    solution: "Dämmung amortisiert sich in 5-7 Jahren",
    urgent: false
  },
  { 
    icon: Banknote, 
    title: "Dach sanieren?", 
    pain: "Je länger Sie warten, desto teurer wird die Sanierung.",
    consequence: "Alte Dächer verlieren jährlich an Substanz",
    solution: "Festpreis-Angebot in 24 Stunden",
    urgent: false
  },
];

const warningSignals = [
  "Feuchte Flecken an der Decke oder Wand?",
  "Dachziegel verrutscht oder gebrochen?",
  "Dachrinne läuft über oder ist undicht?",
  "Schimmelgeruch im Dachgeschoss?",
  "Moos oder Flechten auf dem Dach?",
  "Fallrohre verstopft oder beschädigt?"
];

export default function LeadMagnetProblem({ onContactClick, phoneNumber }: LeadMagnetProblemProps) {
  const telLink = `tel:${phoneNumber.replace(/\s/g, "")}`;

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950" data-testid="section-lead-problem">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-4">
            <ShieldAlert className="w-4 h-4" />
            Erkennen Sie eines dieser Probleme?
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-foreground">
            Dachprobleme lösen sich nicht von selbst
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            <strong>Je länger Sie warten, desto teurer wird es.</strong> Wir helfen Münchner Hausbesitzern seit 25 Jahren - schnell, zuverlässig und zum Festpreis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {urgentProblems.map((problem, index) => (
            <Card 
              key={index}
              className={`relative overflow-visible ${problem.urgent ? "border-destructive/50 bg-destructive/5" : ""}`}
              data-testid={`problem-card-${index}`}
            >
              {problem.urgent && (
                <div className="absolute -top-3 left-4 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  DRINGEND
                </div>
              )}
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${problem.urgent ? "bg-destructive/20" : "bg-primary/10"}`}>
                    <problem.icon className={`w-6 h-6 ${problem.urgent ? "text-destructive" : "text-primary"}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{problem.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{problem.pain}</p>
                    <p className="text-xs text-destructive font-medium mb-2">{problem.consequence}</p>
                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                      <CheckCircle className="w-4 h-4" />
                      {problem.solution}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-zinc-800 border rounded-md p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Warnsignale - Handeln Sie jetzt!
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {warningSignals.map((signal, index) => (
                <div key={index} className="flex items-start gap-2 text-sm" data-testid={`warning-signal-${index}`}>
                  <ShieldAlert className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4 italic">
              Wenn Sie eines dieser Anzeichen bemerken, sollten Sie nicht warten. Kleine Schäden werden schnell zu großen Problemen.
            </p>
          </div>
          
          <div className="bg-zinc-800 dark:bg-zinc-950 rounded-md p-6 text-white">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Warum JETZT handeln?
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 bg-white/5 rounded p-3">
                <div className="font-bold text-2xl text-destructive">48h</div>
                <div>
                  <div className="font-medium">Schimmelbildung beginnt</div>
                  <div className="text-zinc-600">nach Wassereintritt</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 rounded p-3">
                <div className="font-bold text-2xl text-destructive">5x</div>
                <div>
                  <div className="font-medium">teurer wird es</div>
                  <div className="text-zinc-600">wenn Folgeschäden entstehen</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 rounded p-3">
                <div className="font-bold text-2xl text-primary">24h</div>
                <div>
                  <div className="font-medium">Unser Versprechen</div>
                  <div className="text-zinc-600">Wir sind bei Ihnen vor Ort</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-md p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left text-white">
              <h3 className="font-bold text-xl mb-1">Lassen Sie uns Ihr Problem heute noch lösen</h3>
              <p className="text-white/80">Kostenlose Erstberatung - Festpreis-Angebot innerhalb 24 Stunden</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                size="lg" 
                variant="secondary" 
                asChild
                className="font-bold"
                data-testid="button-problem-call"
              >
                <a href={telLink}>
                  <Phone className="w-4 h-4 mr-2" />
                  Jetzt anrufen
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={onContactClick}
                className="bg-white/10 border-white/30 text-white"
                data-testid="button-problem-contact"
              >
                Anfrage senden
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
