import { CheckCircle, AlertTriangle, ArrowRight, Mail, Clock, Shield, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


interface NLPSectionProps {
  onContactClick: () => void;
  phoneNumber: string;
}

const nlpProblems = [
  {
    id: "koordination",
    problem: "Mehrere Handwerker koordinieren -- wer ruft wann an?",
    pain: "Elektriker, Sanitaerinstallateur, Maler, Bodenverleger -- jeder mit eigenem Termin, eigenem Angebot, eigener Zusage. Die Abstimmung frisst Zeit und Nerven.",
    solution: "Renodex koordiniert die beteiligten Gewerke aus einer Hand. Sie haben einen Ansprechpartner, der die Fachbetriebe aufeinander abstimmt.",
    future: "Ein Angebot, ein Zeitplan, eine gemeinsame Abnahme am Ende."
  },
  {
    id: "haustechnik",
    problem: "Veraltete Haustechnik -- was ist wirklich noetig?",
    pain: "Alte Elektrik, eine in die Jahre gekommene Heizung, ein Bad, das nicht mehr zeitgemaess ist -- aber welche Massnahme lohnt sich zuerst?",
    solution: "Wir beraten ehrlich, was tatsaechlich sinnvoll ist -- unabhaengig davon, ob es sich um eine einzelne Massnahme oder eine Komplettsanierung handelt.",
    future: "Sie wissen nach der Beratung genau, was ansteht und was warten kann."
  },
  {
    id: "foerderung",
    problem: "Foerdermoeglichkeiten -- KfW, BAFA, Steuerbonus?",
    pain: "Bei energetischen Massnahmen gibt es verschiedene Foerderwege, die Antragstellung muss vor Baubeginn erfolgen -- ohne Beratung leicht zu uebersehen.",
    solution: "Wir pruefen gemeinsam mit Ihnen, welche KfW- und BAFA-Foerderungen infrage kommen, und unterstuetzen bei der Antragstellung.",
    future: "Foerdermittel werden genutzt, statt liegenzubleiben."
  }
];

export default function NLPSection({ onContactClick, phoneNumber }: NLPSectionProps) {
  return (
    <section className="py-8 bg-white dark:bg-zinc-900" data-testid="section-nlp" data-speakable="true">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Users className="w-3 h-3" />
            Partnernetzwerk aus geprüften Meisterfirmen
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-2" data-testid="heading-nlp-main" data-speakable="true">
            Sanierung und Renovierung -- <span className="text-primary">aus einer Hand.</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto" data-speakable="true">
            Eine Sanierung bringt oft mehrere Gewerke gleichzeitig ins Spiel. Bei <strong>Renodex</strong> koordinieren
            wir Elektro, Sanitär, Heizung und weitere Leistungen -- Sie haben einen Ansprechpartner statt vieler.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6 items-stretch">
          <div className="flex flex-col">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2" data-testid="heading-nlp-problems">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              Typische Fragen vor einer Sanierung
            </h3>
            <Accordion type="single" collapsible defaultValue="koordination" className="space-y-3">
              {nlpProblems.map((item) => (
                <AccordionItem key={item.id} value={item.id} className="border rounded-md px-3 bg-zinc-50 dark:bg-zinc-800" data-testid={`nlp-problem-${item.id}`}>
                  <AccordionTrigger className="py-3 text-sm hover:no-underline">
                    <span className="font-medium text-left">{item.problem}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm space-y-3">
                    <div className="bg-destructive/5 border-l-2 border-destructive p-2 rounded-r-md">
                      <p className="text-muted-foreground">{item.pain}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-foreground font-medium">{item.solution}</p>
                    </div>
                    <div className="bg-primary/5 border-l-2 border-primary p-2 rounded-r-md">
                      <p className="text-primary text-xs font-medium">{item.future}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-auto pt-3">
              <div className="p-3 bg-zinc-800 dark:bg-zinc-950 rounded-md text-white">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div data-testid="nlp-stat-0">
                    <Clock className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <div className="font-bold">25 km</div>
                    <div className="text-white/70">Radius München</div>
                  </div>
                  <div data-testid="nlp-stat-1">
                    <Shield className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <div className="font-bold">Partnernetzwerk</div>
                    <div className="text-white/70">Geprüfte Meisterfirmen</div>
                  </div>
                  <div data-testid="nlp-stat-2">
                    <Award className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <div className="font-bold">Ein Ansprechpartner</div>
                    <div className="text-white/70">Für alle Gewerke</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2" data-testid="heading-nlp-image">
              <Award className="w-4 h-4 text-primary" />
              Komplettsanierung von Haus und Wohnung
            </h3>
            <div className="rounded-md overflow-hidden bg-zinc-50 dark:bg-zinc-800 h-64" />

            <div className="mt-auto pt-3">
              <div className="p-3 border-2 border-primary/30 bg-primary/5 rounded-md">
                <div className="text-xs font-bold text-primary mb-1">Unser Ablauf:</div>
                <div className="text-xs text-muted-foreground">
                  Erstberatung, Besichtigung vor Ort, ein Angebot mit allen Leistungen -- danach koordinieren wir
                  die beteiligten Gewerke bis zur gemeinsamen Abnahme.
                </div>
              </div>
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
              <Button size="sm" variant="secondary" asChild data-testid="button-nlp-email">
                <a href="mailto:info@renodex.de">
                  <Mail className="w-4 h-4 mr-1" />
                  E-Mail schreiben
                </a>
              </Button>
              <Button size="sm" variant="outline" onClick={onContactClick} className="bg-white/10 border-white/30 text-white" data-testid="button-nlp-contact">
                Online anfragen
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
