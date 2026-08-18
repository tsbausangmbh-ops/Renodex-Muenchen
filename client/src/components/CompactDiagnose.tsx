import { AlertTriangle, Droplets, ThermometerSnowflake, Banknote, CheckCircle, Clock, Shield, Award, Star, Phone, ArrowRight, Wrench, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface CompactDiagnoseProps {
  onContactClick: () => void;
  phoneNumber: string;
}

const problems = [
  { 
    id: "undicht",
    icon: Droplets, 
    title: "Dach undicht?", 
    pain: "Feuchtigkeit dringt ins Mauerwerk, Schimmel bildet sich nach 48h.",
    solution: "Foto hochladen statt telefonieren - Festpreis-Angebot meist noch am selben Tag.",
    urgent: true
  },
  { 
    id: "sturm",
    icon: AlertTriangle, 
    title: "Sturmschaden?", 
    pain: "Offene Stellen sind eine akute Gefahr. Versicherung zahlt nur bei sofortiger Meldung.",
    solution: "Sturmschaden digital melden - 24/7 Sofort-Hilfe, 48 Std vor Ort, ohne Warteschleife.",
    urgent: true
  },
  { 
    id: "heizkosten",
    icon: ThermometerSnowflake, 
    title: "Hohe Heizkosten?", 
    pain: "Bis zu 30% Heizenergie entweichen durch schlechte Dämmung.",
    solution: "Unterlagen online einreichen, Angebot digital erhalten - amortisiert sich in 5-7 Jahren.",
    urgent: false
  },
  { 
    id: "sanierung",
    icon: Banknote, 
    title: "Dach sanieren?", 
    pain: "Je länger Sie warten, desto teurer wird es.",
    solution: "Anfrage online stellen, Festpreis in 24h - und 15% Rabatt bei digitaler Dachsanierungs-Anfrage sichern.",
    urgent: false
  },
];

const services = [
  { icon: AlertTriangle, title: "Sofort-Hilfe 24/7", desc: "48 Std vor Ort" },
  { icon: Droplets, title: "Dachreparatur", desc: "Am selben Tag erledigt" },
  { icon: Home, title: "Dachsanierung", desc: "Alles aus einer Hand" },
  { icon: Wrench, title: "Spenglerei", desc: "Dachrinnen & Blech" },
];

const stats = [
  { icon: Clock, value: "48 Std", label: "bei Notfällen" },
  { icon: Shield, value: "10 Jahre", label: "Garantie" },
  { icon: Award, value: "25+ Jahre", label: "Erfahrung" },
  { icon: Star, value: "4.9/5", label: "Google" },
];

export default function CompactDiagnose({ onContactClick, phoneNumber }: CompactDiagnoseProps) {
  const telLink = `tel:${phoneNumber.replace(/\s/g, "")}`;

  return (
    <section className="py-8 bg-white dark:bg-zinc-900" data-testid="section-diagnose">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            Dachproblem? Digital schneller geholfen.
          </h2>
          <p className="text-sm text-muted-foreground">
            <strong>Renodex</strong> - Ihr Dachdecker-[Gründungsjahr folgt] in München. Foto oder Anfrage hochladen statt telefonieren - spart Ihnen Zeit und uns beiden Geld, das wir in Ihren Festpreis stecken.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-primary/5 border border-primary/20 rounded-md p-2 text-center" data-testid={`stat-${index}`}>
              <stat.icon className="w-4 h-4 text-primary mx-auto mb-1" />
              <div className="text-sm font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              Erkennen Sie Ihr Problem?
            </h3>
            <Accordion type="single" collapsible className="space-y-1">
              {problems.map((problem) => (
                <AccordionItem key={problem.id} value={problem.id} className="border rounded-md px-3" data-testid={`problem-${problem.id}`}>
                  <AccordionTrigger className="py-2 text-sm hover:no-underline">
                    <div className="flex items-center gap-2">
                      <problem.icon className={`w-4 h-4 flex-shrink-0 ${problem.urgent ? "text-destructive" : "text-primary"}`} />
                      <span className="font-medium">{problem.title}</span>
                      {problem.urgent && (
                        <span className="text-xs bg-destructive/10 text-destructive px-1.5 py-0.5 rounded">DRINGEND</span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-sm">
                    <p className="text-muted-foreground mb-2">{problem.pain}</p>
                    <div className="flex items-start gap-2 text-primary">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{problem.solution}</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Unsere Leistungen
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {services.map((service, index) => (
                <div key={index} className="bg-zinc-50 dark:bg-zinc-800 rounded-md p-3 text-center" data-testid={`service-${index}`}>
                  <service.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-xs font-bold">{service.title}</div>
                  <div className="text-xs text-muted-foreground">{service.desc}</div>
                </div>
              ))}
            </div>
            
          </div>
        </div>

        <div className="bg-primary rounded-md p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left text-white">
              <div className="font-bold">Jetzt Problem lösen - digital in 2 Minuten</div>
              <div className="text-xs text-white/80">Festpreis-Angebot innerhalb 24 Stunden, ganz ohne Anruf</div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" asChild data-testid="button-diagnose-call">
                <a href={telLink}>
                  <Phone className="w-4 h-4 mr-1" />
                  Anrufen
                </a>
              </Button>
              <Button size="sm" variant="secondary" onClick={onContactClick} data-testid="button-diagnose-contact">
                Digital anfragen
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
