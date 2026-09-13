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
    problem: "Mehrere Handwerker koordinieren – wer ruft wann an?",
    pain: "Elektriker, Sanitärinstallateur, Maler, Bodenverleger – jeder mit eigenem Termin, eigenem Angebot, eigener Zusage. Die Abstimmung frisst Zeit und Nerven.",
    solution: "Renodex koordiniert die beteiligten Gewerke aus einer Hand. Sie haben einen Ansprechpartner, der die Fachbetriebe aufeinander abstimmt.",
    future: "Ein Angebot, ein Zeitplan, eine gemeinsame Abnahme am Ende."
  },
  {
    id: "haustechnik",
    problem: "Veraltete Haustechnik – was ist wirklich nötig?",
    pain: "Alte Elektrik, eine in die Jahre gekommene Heizung, ein Bad, das nicht mehr zeitgemäß ist – aber welche Maßnahme lohnt sich zuerst?",
    solution: "Wir beraten ehrlich, was tatsächlich sinnvoll ist – unabhängig davon, ob es sich um eine einzelne Maßnahme oder eine Komplettsanierung handelt.",
    future: "Sie wissen nach der Beratung genau, was ansteht und was warten kann."
  },
  {
    id: "foerderung",
    problem: "Fördermöglichkeiten – KfW, BAFA, Steuerbonus?",
    pain: "Bei energetischen Maßnahmen gibt es verschiedene Förderwege, die Antragstellung muss vor Baubeginn erfolgen – ohne Beratung leicht zu übersehen.",
    solution: "Wir prüfen gemeinsam mit Ihnen, welche KfW- und BAFA-Förderungen infrage kommen, und unterstützen bei der Antragstellung.",
    future: "Fördermittel werden genutzt, statt liegenzubleiben."
  }
];

export default function NLPSection({ onContactClick, phoneNumber }: NLPSectionProps) {
  return (
    <section className="bg-white dark:bg-zinc-900 py-12 md:py-16" data-testid="section-nlp" data-speakable="true">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-tiefblau/10 text-marine px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Users className="w-3 h-3" />
            Partnernetzwerk aus Fachfirmen
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-2" data-testid="heading-nlp-main" data-speakable="true">
            Sanierung und Renovierung – <span className="text-marine">aus einer Hand.</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto" data-speakable="true">
            Eine Sanierung bringt oft mehrere Gewerke gleichzeitig ins Spiel. Bei <strong>Renodex</strong> koordinieren
            wir Elektro, Sanitär, Heizung und weitere Leistungen – Sie haben einen Ansprechpartner statt vieler.
          </p>
        </div>

        <div className="mb-6 rounded-md overflow-hidden">
          <img
            src="/images/optimized/sanierte-kueche-wohnraum-kurz-vor-abnahme.webp"
            alt="Sanierter Wohnraum mit neuer Küche und Kochinsel kurz vor der Fertigstellung"
            className="w-full h-40 md:h-56 object-cover"
            loading="lazy"
            decoding="async"
            width={1200}
            height={655}
          />
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
                      <CheckCircle className="w-4 h-4 text-marine flex-shrink-0 mt-0.5" />
                      <p className="text-foreground font-medium">{item.solution}</p>
                    </div>
                    <div className="bg-tiefblau/5 border-l-2 border-marine p-2 rounded-r-md">
                      <p className="text-marine text-xs font-medium">{item.future}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-auto pt-3">
              <div className="p-3 bg-zinc-800 dark:bg-zinc-950 rounded-md text-white">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div data-testid="nlp-stat-0">
                    <Clock className="w-4 h-4 mx-auto mb-1 text-marine" />
                    <div className="font-bold">25 km</div>
                    <div className="text-white/70">Radius München</div>
                  </div>
                  <div data-testid="nlp-stat-1">
                    <Shield className="w-4 h-4 mx-auto mb-1 text-marine" />
                    <div className="font-bold">Partnernetzwerk</div>
                    <div className="text-white/70">Fachfirmen je Gewerk</div>
                  </div>
                  <div data-testid="nlp-stat-2">
                    <Award className="w-4 h-4 mx-auto mb-1 text-marine" />
                    <div className="font-bold">Ein Ansprechpartner</div>
                    <div className="text-white/70">Für alle Gewerke</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2" data-testid="heading-nlp-image">
              <Award className="w-4 h-4 text-marine" />
              Komplettsanierung von Haus und Wohnung
            </h3>
            <div className="rounded-md overflow-hidden flex-1 min-h-64">
              <img
                src="/images/optimized/komplettsanierung-wohnung-neuer-holzboden.webp"
                alt="Komplett sanierter Raum mit neuem Holzboden, ein Handwerker reinigt das Fenster"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={1200}
                height={655}
              />
            </div>

            <div className="mt-auto pt-3">
              <div className="p-3 border-2 border-marine/30 bg-tiefblau/5 rounded-md">
                <div className="text-xs font-bold text-marine mb-1">Unser Ablauf:</div>
                <div className="text-xs text-muted-foreground">
                  Digitale Anfrage mit Fotos, Besichtigung, Festpreisangebot von Renodex – danach koordinieren wir
                  die beteiligten Gewerke bis zur gemeinsamen Abnahme.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-secondary rounded-md p-4">
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
              <Button size="sm" variant="outline" onClick={onContactClick} data-testid="button-nlp-contact">
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
