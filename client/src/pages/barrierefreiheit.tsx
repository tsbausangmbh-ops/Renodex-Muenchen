import { Phone, Wrench, MessageCircle, Eye, Keyboard, Volume2, MousePointer, Smartphone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BackButton from "@/components/BackButton";
import { useSEO } from "@/hooks/useSEO";
import heroImage from "@assets/generated_images/professional_roofing_team.png";

const PHONE_NUMBER = "[Telefon folgt]";

export default function Barrierefreiheit() {
  useSEO({
    title: "Barrierefreiheit | Renodex München",
    description: "Erklärung zur Barrierefreiheit: Tastaturnavigation, Screenreader-Support und Kontakt für Feedback. Renodex München.",
    canonical: "https://renodex.de/barrierefreiheit"
  });

  const accessibilityFeatures = [
    {
      icon: Keyboard,
      title: "Tastaturnavigation",
      description: "Alle interaktiven Elemente sind per Tastatur erreichbar. Mit Tab navigieren Sie durch die Seite, Enter aktiviert Links und Buttons."
    },
    {
      icon: Eye,
      title: "Screenreader-Unterstützung",
      description: "Unsere Website verwendet semantisches HTML und ARIA-Attribute für optimale Kompatibilität mit Screenreadern wie NVDA, JAWS oder VoiceOver."
    },
    {
      icon: MousePointer,
      title: "Skip-Links",
      description: "Ein Skip-Link ermöglicht es, direkt zum Hauptinhalt zu springen und die Navigation zu überspringen."
    },
    {
      icon: Volume2,
      title: "Textalternativen",
      description: "Bilder verfügen über alternative Texte, die den Inhalt für Screenreader-Nutzer beschreiben."
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Die Website passt sich automatisch an verschiedene Bildschirmgrößen an und ist auf mobilen Geräten vollständig bedienbar."
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
          className="py-10 md:py-12 relative bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-800/75 to-zinc-900/85" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 text-white" data-testid="heading-barrierefreiheit">
              Erklärung zur Barrierefreiheit
            </h1>
            <p className="text-zinc-600 text-center max-w-2xl mx-auto">
              Renodex setzt sich für digitale Zugänglichkeit ein
            </p>
          </div>
        </section>

        <BackButton />

        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4">
            <div className="space-y-8 text-foreground">
              
              <section>
                <h2 className="text-xl font-semibold mb-3">Unser Engagement für Barrierefreiheit</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Die Renodex ist bestrebt, ihre Website barrierefrei zu gestalten. Wir möchten sicherstellen, dass alle Menschen – unabhängig von körperlichen oder technischen Einschränkungen – Zugang zu unseren Informationen und Dienstleistungen haben. Diese Erklärung zur Barrierefreiheit gilt für die Website renodex.de.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Konformitätsstatus</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Diese Website ist weitgehend mit den Web Content Accessibility Guidelines (WCAG) 2.1 Level AA konform. Wir arbeiten kontinuierlich daran, die Zugänglichkeit zu verbessern und verbleibende Barrieren zu beseitigen.
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
                  <li>ARIA-Attribute (Accessible Rich Internet Applications) für erweiterte Zugänglichkeit</li>
                  <li>Ausreichende Farbkontraste gemäß WCAG-Richtlinien</li>
                  <li>Skalierbare Schriftgrößen und flexible Layouts</li>
                  <li>Strukturierte Überschriften-Hierarchie (H1-H6)</li>
                  <li>Beschriftete Formularfelder mit Fehlermeldungen</li>
                  <li>Verzicht auf automatisch abspielende Medien</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Bekannte Einschränkungen</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Trotz unserer Bemühungen können einige Inhalte möglicherweise nicht vollständig barrierefrei sein. Dazu gehören eingebettete Inhalte von Drittanbietern und ältere PDF-Dokumente. Wir arbeiten daran, diese Inhalte zugänglich zu machen.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Feedback und Kontakt</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Wenn Sie auf Barrieren stoßen oder Verbesserungsvorschläge haben, kontaktieren Sie uns bitte. Wir nehmen Ihr Feedback ernst und bemühen uns, gemeldete Probleme zeitnah zu beheben.
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
                <h2 className="text-xl font-semibold mb-3">Durchsetzungsverfahren</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Sollten Sie der Ansicht sein, dass wir Ihrem Feedback nicht angemessen nachgekommen sind, können Sie sich an die zuständige Durchsetzungsstelle wenden. In Bayern ist dies die Landesanstalt für Digitales (BLAD).
                </p>
              </section>

              <section>
                <p className="text-xs text-muted-foreground">
                  Stand: Dezember 2025
                </p>
              </section>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4" data-testid="heading-barrierefreiheit-cta">
              Fragen zu unserer Komplettsanierung?
            </h2>
            <p className="text-muted-foreground mb-6">
              Wir beraten Sie gerne – telefonisch oder per E-Mail.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" data-testid="button-barrierefreiheit-call">
                <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} aria-label={`Jetzt anrufen: ${PHONE_NUMBER}`}>
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Jetzt anrufen
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
