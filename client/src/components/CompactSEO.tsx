import { ChevronDown, HelpCircle, BookOpen } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { mainPagesKeywords } from "@/content/mainPages";

const pageData = mainPagesKeywords.home;

const faqs = [
  {
    question: "Wie schnell können Sie bei einem Notfall vor Ort sein?",
    answer: "Bei Notfällen wie Sturmschäden oder undichten Dächern sind wir in München und Umgebung innerhalb von 48 Std bei Ihnen. Unser 24/7 Sofort-Hilfe ist rund um die Uhr erreichbar."
  },
  {
    question: "Was kostet eine Dachinspektion?",
    answer: "Eine professionelle Dachinspektion kostet bei uns 150€ inkl. MwSt. Sie erhalten einen schriftlichen Bericht mit Fotos und Empfehlungen. Bei Beauftragung wird der Betrag angerechnet."
  },
  {
    question: "Übernehmen Sie die Versicherungsabwicklung bei Sturmschäden?",
    answer: "Ja, wir dokumentieren den Schaden professionell und übernehmen die komplette Kommunikation mit Ihrer Versicherung. Das spart Ihnen Zeit und Nerven."
  },
  {
    question: "Welche Garantie geben Sie auf Ihre Arbeit?",
    answer: "Wir gewähren bis zu 10 Jahre Garantie auf unsere Dacharbeiten. Zusätzlich bieten wir eine Festpreis-Garantie - was wir anbieten, das gilt."
  },
  {
    question: "In welchen Gebieten sind Sie tätig?",
    answer: "Wir sind in ganz München und im Umkreis von bis zu 25 km tätig: Allach, Pasing, Moosach, Schwabing, Bogenhausen, Grünwald, Puchheim, Germering und mehr."
  }
];

export default function CompactSEO() {
  const [showFullText, setShowFullText] = useState(false);

  return (
    <section className="py-6 bg-white dark:bg-zinc-900" data-testid="section-seo">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2" data-testid="heading-seo-faq">
              <HelpCircle className="w-4 h-4 text-primary" />
              Dachdecker München – Häufige Fragen
            </h3>
            <Accordion type="single" collapsible className="space-y-1">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border rounded-md px-3" data-testid={`faq-${index}`}>
                  <AccordionTrigger className="py-2 text-sm text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <h2 className="font-bold text-sm mb-3 flex items-center gap-2" data-testid="heading-seo-about">
              <BookOpen className="w-4 h-4 text-primary" />
              Dachdecker München – Renodex, [Gründungsjahr folgt]
            </h2>
            
            <div className={`text-xs text-muted-foreground space-y-2 ${!showFullText ? "max-h-40 overflow-hidden relative" : ""}`}>
              <p>
                Suchen Sie einen <strong className="text-foreground">Dachdecker in München</strong>, der Ihr Dachproblem schnell, professionell und zum fairen Festpreis löst? Die <strong className="text-foreground">Renodex</strong> ist Ihr lokaler [Gründungsjahr folgt] für <strong className="text-foreground">Dachsanierung</strong>, <strong className="text-foreground">Dachreparatur</strong> und <strong className="text-foreground">Spenglerei</strong> in München und dem gesamten Großraum. Mit über 25 Jahren Erfahrung und mehr als 240 erfolgreich abgeschlossenen Projekten sind wir Ihr zuverlässiger Partner für alle Fragen rund ums Dach.
              </p>

              <h3 className="font-bold text-foreground pt-2">Bau- und Sanierungsbetrieb München - Alles aus einer Hand</h3>
              <p>
                Als <strong className="text-foreground">Dachdecker- und Spenglermeisterbetrieb</strong> bieten wir Ihnen das komplette Leistungsspektrum rund um Ihr Dach. Von der kleinen Reparatur bis zur kompletten <Link href="/dachsanierung-kosten" className="text-primary font-semibold hover:text-primary/80" data-testid="link-seo-sanierung-kosten">Dachsanierung in München</Link> - bei uns bekommen Sie alle Leistungen aus einer Hand. Das bedeutet für Sie: Ein Ansprechpartner, ein Festpreis, keine Koordinationsprobleme zwischen verschiedenen Gewerken.
              </p>
              <p>
                Unsere Kernleistungen umfassen <Link href="/dach-reparieren" className="text-primary font-semibold hover:text-primary/80" data-testid="link-seo-reparieren">Dachreparaturen in München</Link> bei undichten Dächern, den Austausch beschädigter Dachziegel, die komplette <strong className="text-foreground">Dacheindeckung</strong> mit hochwertigen Materialien sowie alle <strong className="text-foreground">Spenglerarbeiten</strong> wie Dachrinnen, Fallrohre und Blechverkleidungen. Ob <strong className="text-foreground">Steildach</strong> oder <strong className="text-foreground">Flachdach</strong> - wir haben die Expertise für jede Dachform.
              </p>

              <h3 className="font-bold text-foreground pt-2">Dach Sofort-Hilfe München - 24/7 erreichbar</h3>
              <p>
                Ein Sturm hat Ihr Dach beschädigt? Wasser dringt durch die Decke? Bei <strong className="text-foreground">Dach-Notfällen</strong> zählt jede Stunde. Unser <Link href="/notdienst" className="text-primary font-semibold hover:text-primary/80" data-testid="link-seo-notdienst">24h Dachnotdienst München</Link> ist rund um die Uhr für Sie erreichbar - auch nachts, am Wochenende und an Feiertagen. In der Regel sind wir innerhalb von 48 Std bei Ihnen vor Ort.
              </p>
              <p>
                Bei einem <Link href="/sturmschaden" className="text-primary font-semibold hover:text-primary/80" data-testid="link-seo-sturmschaden">Sturmschaden am Dach</Link> übernehmen wir nicht nur die sofortige Notabdichtung, sondern auch die komplette Dokumentation für Ihre Versicherung. In den meisten Fällen übernimmt die Wohngebäudeversicherung die Kosten für Sturmschäden - wir helfen Ihnen bei der Abwicklung.
              </p>

              <h3 className="font-bold text-foreground pt-2">Undichtes Dach - Schnelle Hilfe vom Fachmann</h3>
              <p>
                Wenn Ihr <Link href="/dach-undicht" className="text-primary font-semibold hover:text-primary/80" data-testid="link-seo-undicht">Dach undicht</Link> ist, sollten Sie nicht lange warten. Bereits nach 48 Stunden kann sich bei Feuchtigkeit im Mauerwerk Schimmel bilden. Die Folgekosten einer zu späten Reparatur können das Fünffache der ursprünglichen Reparaturkosten betragen. Mit unserer schnellen Leckortung finden wir die undichte Stelle, ohne Ihr Dach zu beschädigen.
              </p>
              <p>
                Die Kosten für eine <strong className="text-foreground">Dachreparatur in München</strong> hängen vom Umfang des Schadens ab. Kleine Reparaturen wie der Austausch einzelner Ziegel beginnen bei etwa 93 €, kleinere Leckagen können wir ab 175 € abdichten. Bei größeren Schäden erstellen wir Ihnen ein individuelles Festpreis-Angebot - transparent und ohne versteckte Kosten.
              </p>

              <h3 className="font-bold text-foreground pt-2">Dachsanierung München - Kompletterneuerung mit Garantie</h3>
              <p>
                Irgendwann ist jedes Dach am Ende seiner Lebensdauer angelangt. Eine professionelle <strong className="text-foreground">Dachsanierung</strong> erhöht nicht nur den Wert Ihrer Immobilie, sondern spart auch Heizkosten und schützt Ihr Zuhause für die nächsten 30-50 Jahre. Wir bieten Ihnen die komplette Dachsanierung inklusive <strong className="text-foreground">Wärmedämmung</strong> nach aktuellem EnEV-Standard.
              </p>
              <p>
                Die Kosten einer <strong className="text-foreground">Dachsanierung in München</strong> variieren je nach Umfang zwischen 93 und 592 € pro Quadratmeter. Eine Neueindeckung ohne Dämmung liegt bei 93-175 €/m², mit Wärmedämmung bei 175-299 €/m² und eine Komplettsanierung bei 299-592 €/m². Für viele Maßnahmen gibt es <strong className="text-foreground">KfW-Förderungen</strong> - wir beraten Sie gerne zu Ihren Möglichkeiten.
              </p>

              <h3 className="font-bold text-foreground pt-2">Spenglerei München - Dachrinnen, Fallrohre & mehr</h3>
              <p>
                Als Spenglermeisterbetrieb fertigen und montieren wir alle <strong className="text-foreground">Blecharbeiten</strong> am Dach. Dazu gehören <strong className="text-foreground">Dachrinnen</strong>, Fallrohre, <strong className="text-foreground">Kaminverkleidungen</strong>, Gaubenverkleidungen und Attika-Abdeckungen. Wir arbeiten mit hochwertigen Materialien wie Kupfer, Zink und Aluminium - für eine lange Lebensdauer und optimale Optik.
              </p>
              <p>
                Besonders bei älteren Gebäuden sind defekte oder verstopfte Dachrinnen ein häufiges Problem. Wasser, das nicht richtig abfließt, kann Fassadenschäden verursachen und ins Mauerwerk eindringen. Wir reparieren, reinigen und erneuern Ihre <strong className="text-foreground">Dachrinne</strong> - schnell und zum Festpreis.
              </p>

              <h3 className="font-bold text-foreground pt-2">Unser Einzugsgebiet - München und Umgebung</h3>
              <p>
                Wir sind Ihr <strong className="text-foreground">Dachdecker für München</strong> und das gesamte Umland im Radius von bis zu 25 Kilometern. Unser Einzugsgebiet umfasst alle Münchner Stadtteile wie Allach, Untermenzing, Obermenzing, Pasing, Moosach, Feldmoching, Nymphenburg, Schwabing, Bogenhausen, Sendling, Haidhausen und Giesing sowie Grünwald, Puchheim, Gräfelfing, Planegg, Germering, Unterschleißheim und Garching.
              </p>
              <p>
                Egal ob Sie in der Münchner Innenstadt wohnen oder in einer der umliegenden Gemeinden wie Karlsfeld, Germering, Gröbenzell, Unterschleißheim, Garching, Ismaning oder Ottobrunn - wir kommen zu Ihnen. Die Anfahrt im Münchner Stadtgebiet ist bei allen Aufträgen kostenfrei.
              </p>

              <h3 className="font-bold text-foreground pt-2">Warum Renodex - Ihr Vorteil</h3>
              <p>
                Bei der Wahl eines Dachdeckers in München haben Sie viele Möglichkeiten. Was uns von anderen unterscheidet? Wir bieten Ihnen <strong className="text-foreground">Festpreise ohne Überraschungen</strong>, eine <strong className="text-foreground">10-jährige Garantie</strong> auf unsere Arbeit und echte Handwerksqualität vom [Gründungsjahr folgt]. Wir arbeiten ohne Subunternehmer - Sie bekommen immer unsere eigenen, festangestellten Fachleute.
              </p>
              <p>
                Unsere Kunden schätzen besonders unsere ehrliche Beratung. Wir empfehlen nur Arbeiten, die wirklich notwendig sind und beraten Sie transparent über alle Optionen und Kosten. Mit einer <strong className="text-foreground">Google-Bewertung von 4.9 Sternen</strong> und über 100 zufriedenen Kunden in München sind wir stolz auf unseren Ruf als zuverlässiger Partner für alle Dacharbeiten.
              </p>

              <h3 className="font-bold text-foreground pt-2">Dachfenster Einbau München - Mehr Licht unterm Dach</h3>
              <p>
                Ein <strong className="text-foreground">Dachfenster</strong> verwandelt dunkle Dachböden in helle Wohnräume. Mit Dachfenstern führender Hersteller wie Velux und Roto bieten wir Ihnen den kompletten Service: von der Beratung über den fachgerechten <strong className="text-foreground">Dachfenster Einbau in München</strong> bis zur Wartung. Wir berücksichtigen dabei alle baulichen Gegebenheiten und sorgen für eine optimale Wärmedämmung rund um das Fenster.
              </p>
              <p>
                Die Kosten für ein neues <strong className="text-foreground">Dachfenster in München</strong> inklusive Einbau beginnen bei etwa 800 €. Größere Fenster oder Sonderausführungen mit elektrischer Bedienung oder Sonnenschutz kosten entsprechend mehr. Wir erstellen Ihnen gerne ein individuelles Angebot mit allen Details.
              </p>

              <h3 className="font-bold text-foreground pt-2">Dachdämmung München - Energie sparen, Klima schützen</h3>
              <p>
                Eine professionelle <strong className="text-foreground">Dachdämmung</strong> reduziert Ihre Heizkosten um bis zu 30 Prozent und verbessert gleichzeitig das Raumklima. Als <strong className="text-foreground">Dachdeckerei in München</strong> bieten wir Ihnen verschiedene Dämmmethoden: Aufsparrendämmung, Zwischensparrendämmung und Untersparrendämmung - je nach Bausubstanz und Ihren individuellen Anforderungen.
              </p>
              <p>
                Bei der <strong className="text-foreground">Dachdämmung in München</strong> beraten wir Sie auch zu aktuellen Förderprogrammen. Die KfW und das BAFA bieten attraktive Zuschüsse für energetische Sanierungsmaßnahmen. Wir unterstützen Sie bei der Antragstellung und sorgen dafür, dass alle technischen Anforderungen für die Förderung erfüllt werden.
              </p>

              <h3 className="font-bold text-foreground pt-2">Qualität vom Dachdeckermeister München</h3>
              <p>
                Als <strong className="text-foreground">[Gründungsjahr folgt] Dachdecker München</strong> stehen wir für höchste Qualitätsstandards. Unser <strong className="text-foreground">Dachdeckermeister</strong> überwacht persönlich jedes Projekt und garantiert die fachgerechte Ausführung aller Arbeiten. Wir verwenden ausschließlich hochwertige Materialien namhafter Hersteller und gewähren auf alle <strong className="text-foreground">Dacharbeiten in München</strong> eine umfassende Garantie.
              </p>
              <p>
                Die <strong className="text-foreground">Dachdeckerei Renodex</strong> ist Mitglied der Handwerkskammer München. Unsere Mitarbeiter werden regelmäßig geschult und sind auf dem neuesten Stand der Technik. So können wir Ihnen auch bei anspruchsvollen Projekten wie <strong className="text-foreground">Gaubenverkleidungen</strong>, <strong className="text-foreground">Kaminverkleidungen</strong> oder komplexen <strong className="text-foreground">Blecharbeiten in München</strong> erstklassige Ergebnisse liefern.
              </p>

              <h3 className="font-bold text-foreground pt-2">Jetzt Kontakt aufnehmen</h3>
              <p>
                Sie haben Fragen zu Ihrem Dach oder benötigen ein unverbindliches Angebot? Rufen Sie uns an unter <strong className="text-foreground">[Telefon folgt]</strong> oder nutzen Sie unser Kontaktformular. Bei Notfällen sind wir 24/7 erreichbar. Für alle anderen Anfragen melden wir uns innerhalb von 24 Stunden bei Ihnen zurück - garantiert.
              </p>
              <p>
                Die Renodex ist Ihr <strong className="text-foreground">Dachdecker München</strong> für <strong className="text-foreground">Dachsanierung</strong>, <strong className="text-foreground">Dachreparatur</strong>, <strong className="text-foreground">Spenglerei</strong> und <strong className="text-foreground">Dach Sofort-Hilfe</strong>. Vertrauen Sie auf 25 Jahre Erfahrung, faire Festpreise und echte Handwerksqualität vom [Gründungsjahr folgt]. Kontaktieren Sie uns noch heute für eine kostenlose Erstberatung.
              </p>
              
              {!showFullText && (
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent" />
              )}
            </div>
            
            <button aria-label="Aktion" 
              onClick={() => setShowFullText(!showFullText)}
              className="flex items-center gap-1 text-xs text-primary font-medium mt-2"
              data-testid="button-toggle-seo"
            >
              {showFullText ? "Weniger anzeigen" : "Mehr lesen"}
              <ChevronDown className={`w-3 h-3 transition-transform ${showFullText ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-wrap gap-1 justify-center">
            {pageData.secondaryKeywords.map((keyword, index) => (
              <Badge key={index} variant="secondary" className="text-xs" data-testid={`keyword-${index}`}>
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
