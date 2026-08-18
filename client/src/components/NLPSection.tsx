import { CheckCircle, AlertTriangle, ArrowRight, Phone, Clock, Shield, Award, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const anthraciteRoofImage = "/images/optimized/house_dark_tiles_minimal_garden.webp";
const rooferWorkingImage = "/images/optimized/roofer_working_on_bavarian_roof.webp";
const spenglereiImage = "/images/optimized/metal_roofing_spengler_work.webp";
const gutterImage = "/images/optimized/copper_gutter_installation_craftsman.webp";

interface NLPSectionProps {
  onContactClick: () => void;
  phoneNumber: string;
}

const nlpProblems = [
  {
    id: "undicht",
    problem: "Dach undicht - Wasser dringt ein",
    pain: "Wasserflecken an der Decke? In 48 Stunden kann sich Schimmel bilden. Die Kosten steigen mit jedem Tag.",
    solution: "Wir dichten Ihr Dach HEUTE ab. Festpreis vor Arbeitsbeginn - keine bösen Überraschungen.",
    future: "In wenigen Stunden ist Ihr Dach wieder dicht. 10 Jahre Garantie."
  },
  {
    id: "sturm", 
    problem: "Sturmschaden - Dach abgedeckt",
    pain: "Jede Stunde ohne Schutz bedeutet mehr Wasserschaden und höhere Kosten.",
    solution: "24/7 Sofort-Hilfe in 48 Std bei Ihnen. Komplette Versicherungsabwicklung inklusive.",
    future: "Wir regeln alles. Die Versicherung zahlt - Sie haben keinen Stress."
  },
  {
    id: "sanierung",
    problem: "Dach in die Jahre gekommen",
    pain: "Alte Dächer kosten jeden Monat Geld: Höhere Heizkosten, sinkender Immobilienwert.",
    solution: "Komplette Dachsanierung aus einer Hand. Ein Ansprechpartner, ein Festpreis.",
    future: "Ihr neues Dach hält 30-50 Jahre. Bis zu 30% Heizkosten sparen."
  }
];

const credibilityImages = [
  {
    src: anthraciteRoofImage,
    alt: "Dachsanierung München Einfamilienhaus komplett – Anthrazit Dachziegel Neueindeckung Frankfurter Pfanne [Gründungsjahr folgt] Bayern",
    title: "Anthrazit Dächer",
    caption: "Zeitlose Eleganz, 50+ Jahre Haltbarkeit"
  },
  {
    src: rooferWorkingImage,
    alt: "Dachdecker München, [Gründungsjahr folgt], bei Dacharbeiten – Professionelle Dachreparatur Handwerker Ziegeldach Bayern Renodex",
    title: "Meister-Handwerk",
    caption: "Festangestellte Profis, keine Subunternehmer"
  },
  {
    src: spenglereiImage,
    alt: "Spengler München Blecharbeiten Dach – Metallverkleidung Fassadenverkleidung Abdichtung Dachabdichtung Fachbetrieb Bayern",
    title: "Spenglerei & Blech",
    caption: "Präzise Verblechungen, perfekte Abdichtung"
  },
  {
    src: gutterImage,
    alt: "Dachrinne München Kupfer montieren – Spengler Regenrinne Installation Zink Aluminium Edelstahl [Gründungsjahr folgt]",
    title: "Dachrinnen",
    caption: "Kupfer, Zink, Alu - für jeden Anspruch"
  }
];

export default function NLPSection({ onContactClick, phoneNumber }: NLPSectionProps) {
  const telLink = `tel:${phoneNumber.replace(/\s/g, "")}`;

  return (
    <section className="py-8 bg-white dark:bg-zinc-900" data-testid="section-nlp" data-speakable="true">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Zap className="w-3 h-3" />
            Münchens zuverlässigster Partnernetzwerk aus geprüften Partner-Meisterfirmen
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-2" data-testid="heading-nlp-main" data-speakable="true">
            Dachsanierung & Dachreparatur München – <span className="text-primary">Heute gelöst.</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto" data-speakable="true">
            Wir verstehen Ihre Situation. Ein Dachproblem bedeutet Stress, Unsicherheit und die Angst vor hohen Kosten.
            Bei <strong>Renodex</strong> bekommen Sie klare Festpreise, schnelle Hilfe und echte Handwerksqualität.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6 items-stretch">
          <div className="flex flex-col">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2" data-testid="heading-nlp-problems">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              Dachprobleme München erkennen – Dachdecker-Lösung bekommen
            </h3>
            <Accordion type="single" collapsible defaultValue="undicht" className="space-y-3">
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
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div data-testid="nlp-stat-0">
                    <Clock className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <div className="font-bold">48 Std</div>
                    <div className="text-white/70">Sofort-Hilfe</div>
                  </div>
                  <div data-testid="nlp-stat-1">
                    <Shield className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <div className="font-bold">10 Jahre</div>
                    <div className="text-white/70">Garantie</div>
                  </div>
                  <div data-testid="nlp-stat-2">
                    <Award className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <div className="font-bold">25+ Jahre</div>
                    <div className="text-white/70">Erfahrung</div>
                  </div>
                  <div data-testid="nlp-stat-3">
                    <Star className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <div className="font-bold">4.9/5</div>
                    <div className="text-white/70">Google</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2" data-testid="heading-nlp-gallery">
              <Award className="w-4 h-4 text-primary" />
              Warum Renodex - Münchens Beste
            </h3>
            <div className="grid gap-3">
              {credibilityImages.map((img, index) => (
                <div key={index} className="flex gap-3 bg-zinc-50 dark:bg-zinc-800 rounded-md overflow-hidden" data-testid={`nlp-image-${index}`}>
                  <div className="w-24 flex-shrink-0">
                    <AspectRatio ratio={4/3}>
                      <img 
                        src={img.src} 
                        alt={img.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                       decoding="async"  width={400} height={300} />
                    </AspectRatio>
                  </div>
                  <div className="p-3 flex flex-col justify-center">
                    <div className="font-bold text-sm">{img.title}</div>
                    <div className="text-xs text-muted-foreground">{img.caption}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-3">
              <div className="p-3 border-2 border-primary/30 bg-primary/5 rounded-md">
                <div className="text-xs font-bold text-primary mb-1">Unsere Festpreis-Garantie:</div>
                <div className="text-xs text-muted-foreground">
                  Sie erhalten ein verbindliches Angebot <strong className="text-foreground">bevor</strong> wir anfangen. 
                  Keine versteckten Kosten, keine Nachforderungen. Was wir sagen, das gilt.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary rounded-md p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left text-white">
              <div className="font-bold">Jetzt handeln - Kostenloses Angebot in 24h</div>
              <div className="text-xs text-white/80">Heute anfragen, morgen Festpreis erhalten</div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" asChild data-testid="button-nlp-call">
                <a href={telLink}>
                  <Phone className="w-4 h-4 mr-1" />
                  Jetzt anrufen
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
