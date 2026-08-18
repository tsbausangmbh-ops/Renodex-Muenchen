import { AlertTriangle, Droplets, ThermometerSnowflake, Banknote, CheckCircle, Users, Wrench, Home, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface CompactDiagnoseProps {
  onContactClick: () => void;
  phoneNumber: string;
}

const problems = [
  {
    id: "mehrere-gewerke",
    icon: Users,
    title: "Mehrere Handwerker koordinieren?",
    pain: "Elektriker, Sanitärinstallateur, Maler -- jeder mit eigenem Termin und eigener Zusage kostet Zeit und Nerven.",
    solution: "Renodex koordiniert die beteiligten Gewerke aus einer Hand. Ein Ansprechpartner statt vieler.",
    urgent: false
  },
  {
    id: "feuchtigkeit",
    icon: Droplets,
    title: "Feuchtigkeit oder Wasserschaden?",
    pain: "Feuchte Wände oder ein Wasserschaden im Mauerwerk sollten zeitnah geprüft werden, um Folgeschäden zu vermeiden.",
    solution: "Zeigen Sie uns die betroffene Stelle per Foto oder Video -- wir melden uns zeitnah mit den nächsten Schritten.",
    urgent: false
  },
  {
    id: "heizkosten",
    icon: ThermometerSnowflake,
    title: "Hohe Heizkosten oder veraltete Heizung?",
    pain: "Eine veraltete Heizungsanlage oder mangelnde Dämmung treibt die Heizkosten in die Höhe.",
    solution: "Wir beraten Sie zu Heizungssanierung, Wärmepumpe und möglichen Förderungen.",
    urgent: false
  },
  {
    id: "sanierung",
    icon: Banknote,
    title: "Komplettsanierung planen?",
    pain: "Bei einer umfassenden Sanierung stellt sich schnell die Frage, welche Maßnahme zuerst sinnvoll ist.",
    solution: "Nach einer Erstberatung und Besichtigung erhalten Sie ein Angebot mit allen beteiligten Gewerken.",
    urgent: false
  },
];

const services = [
  { icon: Home, title: "Komplettsanierung", desc: "Haus und Wohnung" },
  { icon: Droplets, title: "Sanitär & Heizung", desc: "Aus einer Hand koordiniert" },
  { icon: Wrench, title: "Elektro & Bodenverlegung", desc: "Fachgerecht ausgeführt" },
  { icon: Users, title: "Partnernetzwerk", desc: "Geprüfte Meisterfirmen" },
];

export default function CompactDiagnose({ onContactClick, phoneNumber }: CompactDiagnoseProps) {
  const telLink = `tel:${phoneNumber.replace(/\s/g, "")}`;

  return (
    <section className="py-8 bg-white dark:bg-zinc-900" data-testid="section-diagnose">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            Sanierungsvorhaben? Digital schneller zur Beratung.
          </h2>
          <p className="text-sm text-muted-foreground">
            <strong>Renodex</strong> -- Ihr Partnernetzwerk für Komplettsanierung von Haus und Wohnung in München. Zeigen Sie uns Ihr Anliegen digital, statt gleich einen Vor-Ort-Termin zu vereinbaren.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-primary" />
              Erkennen Sie Ihr Anliegen?
            </h3>
            <Accordion type="single" collapsible className="space-y-1">
              {problems.map((problem) => (
                <AccordionItem key={problem.id} value={problem.id} className="border rounded-md px-3" data-testid={`problem-${problem.id}`}>
                  <AccordionTrigger className="py-2 text-sm hover:no-underline">
                    <div className="flex items-center gap-2">
                      <problem.icon className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span className="font-medium">{problem.title}</span>
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
              <div className="font-bold">Kostenlose Erstberatung anfragen</div>
              <div className="text-xs text-white/80">Digital in wenigen Minuten, ganz ohne Anruf</div>
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
