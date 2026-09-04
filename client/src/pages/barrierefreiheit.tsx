import { Mail, Wrench, MessageCircle, Eye, Keyboard, Volume2, MousePointer, Smartphone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BackButton from "@/components/BackButton";
import { useSEO } from "@/hooks/useSEO";
import KiBildHinweis from "@/components/KiBildHinweis";

const PHONE_NUMBER = "[Telefon folgt]";

export default function Barrierefreiheit() {
  useSEO({
    title: "Barrierefreiheit | Renodex München",
    description: "Erklärung zur Barrierefreiheit: woran wir gearbeitet haben und wie Sie uns eine Barriere melden können. Renodex München.",
    canonical: "https://renodex.de/barrierefreiheit"
  });

  const accessibilityFeatures = [
    {
      icon: Keyboard,
      title: "Tastaturnavigation",
      description: "Links, Schaltflächen und Formularfelder lassen sich mit der Tabulatortaste ansteuern und mit Enter auslösen."
    },
    {
      icon: Eye,
      title: "Screenreader-Unterstützung",
      description: "Die Seiten sind mit semantischem HTML aufgebaut, interaktive Elemente tragen ARIA-Beschriftungen. Wie gut ein einzelner Screenreader damit zurechtkommt, haben wir nicht systematisch getestet."
    },
    {
      icon: MousePointer,
      title: "Skip-Links",
      description: "Ein Skip-Link ermöglicht es, direkt zum Hauptinhalt zu springen und die Navigation zu überspringen."
    },
    {
      icon: Volume2,
      title: "Textalternativen",
      description: "Bilder sind mit Alternativtexten hinterlegt, die ein Screenreader vorlesen kann."
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Die Website passt sich an verschiedene Bildschirmgrößen an und ist auch auf dem Mobiltelefon bedienbar."
    },
    {
      icon: CheckCircle,
      title: "Fokus-Indikatoren",
      description: "Sichtbare Fokus-Indikatoren zeigen an, welches Element gerade ausgewählt ist, um die Tastaturnavigation zu erleichtern."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header phoneNumber={PHONE_NUMBER} />
      
      <main id="main-content">
        <section
          className="py-10 md:py-12 relative bg-zinc-900 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.75), rgba(24,24,27,0.85)), url(/images/optimized/seite-barrierefreiheit.webp)` }}
          role="img"
          aria-labelledby="hero-h1-barrierefreiheit"
        >
          <KiBildHinweis />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h1 id="hero-h1-barrierefreiheit" className="text-3xl md:text-4xl font-bold mb-3 text-white" data-testid="heading-barrierefreiheit">
              Erklärung zur Barrierefreiheit
            </h1>
            <p className="text-zinc-300 max-w-2xl">
              Renodex setzt sich für digitale Zugänglichkeit ein
            </p>
          </div>
        </section>

        <BackButton />

        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="space-y-8 text-foreground">
              
              <section>
                <h2 className="text-xl font-semibold mb-3">Unser Engagement für Barrierefreiheit</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Die Renodex ist bestrebt, ihre Website barrierefrei zu gestalten. Wir möchten sicherstellen, dass alle Menschen – unabhängig von körperlichen oder technischen Einschränkungen – Zugang zu unseren Informationen und Dienstleistungen haben. Diese Erklärung zur Barrierefreiheit gilt für die Website renodex.de.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Stand der Prüfung</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Diese Website wurde bisher nicht von einer unabhängigen Stelle auf Barrierefreiheit geprüft. Wir sichern deshalb keine Konformität mit einer Norm oder Richtlinie zu. Barrierefreiheit ist für uns ein Ziel, an dem wir weiterarbeiten – keine Eigenschaft, die wir Ihnen hier zusagen können. Was bereits umgesetzt ist, steht in den nächsten Abschnitten.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Barrierefreiheits-Funktionen</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {accessibilityFeatures.map((feature, index) => (
                    <Card key={index} className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <feature.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                          <div>
                            <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
                            <p className="text-muted-foreground text-xs leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Technische Umsetzung</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Semantisches HTML5 für eine logische Dokumentstruktur</li>
                  <li>ARIA-Beschriftungen an Bedienelementen, die ohne Text auskommen</li>
                  <li>Auf Kontrast zwischen Text und Hintergrund geachtet</li>
                  <li>Skalierbare Schriftgrößen und flexible Layouts</li>
                  <li>Strukturierte Überschriften-Hierarchie (H1-H6)</li>
                  <li>Beschriftete Formularfelder mit Fehlermeldungen</li>
                  <li>Verzicht auf automatisch abspielende Medien</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Bekannte Einschränkungen</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Wir kennen die Barrieren dieser Website nicht vollständig, weil sie nicht systematisch geprüft wurde. Bekannt ist, dass eingebettete Inhalte von Drittanbietern und ältere PDF-Dokumente Barrieren enthalten können; darauf haben wir nur begrenzt Einfluss. Wenn Ihnen etwas auffällt, sagen Sie es uns bitte – das ist zurzeit unser bester Weg, Barrieren zu finden.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Feedback und Kontakt</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Wenn Sie auf eine Barriere stoßen, schreiben Sie uns bitte eine E-Mail. Hilfreich ist, auf welcher Seite es war und was nicht funktioniert hat. Wir sehen uns jede Rückmeldung an und melden uns zurück.
                </p>
                <div className="bg-muted/50 p-4 rounded-md">
                  <p className="text-sm">
                    <strong>Renodex</strong><br />
                    [Adresse folgt]<br />
                    Telefon: <a href="tel:00000000000" className="text-foreground">[Telefon folgt]</a><br />
                    E-Mail: <a href="mailto:info@renodex.de" className="text-foreground hover:text-destructive transition-colors">info@renodex.de</a>
                  </p>
                </div>
              </section>

              <section>
                <p className="text-xs text-muted-foreground">
                  Stand: 04.09.2026
                </p>
              </section>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4" data-testid="heading-barrierefreiheit-cta">
              Fragen zu unserer Komplettsanierung?
            </h2>
            <p className="text-muted-foreground mb-6">
              Wir beraten Sie gerne digital per E-Mail.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" data-testid="button-barrierefreiheit-email">
                <a href="mailto:info@renodex.de" aria-label="Jetzt per E-Mail anfragen: info@renodex.de">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Jetzt per E-Mail anfragen
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-barrierefreiheit-contact">
                <Link href="/kontakt">
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  Kontakt aufnehmen
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
