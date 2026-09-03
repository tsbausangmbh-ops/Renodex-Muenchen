import { Phone, Clock, Shield, CheckCircle, Award, MessageCircle, Search, Wrench, ClipboardCheck, HardHat, Home, Layers, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BackButton from "@/components/BackButton";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb, { SERVICE_BREADCRUMBS } from "@/components/Breadcrumb";
import ServiceDistrictLinks from "@/components/ServiceDistrictLinks";
import KiBildHinweis from "@/components/KiBildHinweis";

const PHONE_NUMBER = "[Telefon folgt]";

const signs = [
  {
    icon: Layers,
    title: "Ein einzelnes, klar begrenztes Problem",
    description: "Ein defektes Bauteil, eine undichte Stelle, ein kaputter Anschluss – die Ursache ist bekannt und eingrenzbar.",
  },
  {
    icon: Home,
    title: "Mehrere Gewerke sind betroffen",
    description: "Wenn Sanitär, Heizung, Elektro oder Boden gleichzeitig Handlungsbedarf zeigen, lohnt ein Gesamtblick statt Einzelreparaturen.",
  },
  {
    icon: Clock,
    title: "Bauteile erreichen ihr Alter",
    description: "Viele Anlagen und Installationen halten 20 bis 30 Jahre – häufen sich Ausfälle, ist das ein Hinweis auf nahenden Erneuerungsbedarf.",
  },
  {
    icon: Search,
    title: "Unklar ist, was wirklich nötig ist",
    description: "Sie wissen nicht genau, ob eine Reparatur reicht oder sich eine Sanierung lohnt – eine ehrliche Einschätzung schafft Klarheit.",
  }
];

const comparison = [
  {
    title: "Reparatur",
    description: "Ein einzelnes Bauteil oder eine einzelne Stelle wird instand gesetzt – schnell, gezielt, mit überschaubarem Aufwand.",
    fits: [
      "Ein klar abgrenzbarer Defekt",
      "Anlage oder Installation ist noch vergleichsweise jung",
      "Der Rest des Hauses oder der Wohnung ist in gutem Zustand",
    ]
  },
  {
    title: "Sanierung",
    description: "Ein Gewerk oder mehrere Gewerke werden grundlegend erneuert – von der Planung bis zur Abnahme aus einer Hand.",
    fits: [
      "Mehrere Probleme treten gleichzeitig oder wiederkehrend auf",
      "Bauteile oder Installationen sind veraltet",
      "Eine Modernisierung steigert Wohnkomfort und Werterhalt",
    ]
  }
];

const steps = [
  {
    step: 1,
    title: "Problem digital zeigen",
    description: "Foto, Video oder kurze Beschreibung über unser Kontaktformular – ohne Besichtigungstermin.",
    icon: MessageCircle
  },
  {
    step: 2,
    title: "Erste Einschätzung",
    description: "Anhand Ihrer Angaben schätzen wir die Situation ein und melden uns mit den nächsten Schritten.",
    icon: Search
  },
  {
    step: 3,
    title: "Empfehlung: Reparatur oder Sanierung",
    description: "Wir zeigen Ihnen ehrlich auf, was in Ihrer Situation sinnvoll ist – ohne Verkaufsdruck.",
    icon: Wrench
  },
  {
    step: 4,
    title: "Koordinierte Ausführung",
    description: "Bei mehreren Gewerken übernehmen wir die Abstimmung – ein Ansprechpartner für alles.",
    icon: CheckCircle
  }
];

export default function SanierungReparatur() {
  useSEO({
    title: "Sanierung oder Reparatur? München – Renodex",
    description: "Reparatur oder Sanierung – was ist bei Ihnen sinnvoll? Renodex prüft digital und berät ehrlich zu Haus und Wohnung in München und Umgebung.",
    canonical: "https://renodex.de/sanierung-reparatur",
    keywords: "Sanierung oder Reparatur München, Reparatur vs Sanierung, Renovierung München, Instandsetzung Haus Wohnung",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-sanierung-reparatur">
      <Header phoneNumber={PHONE_NUMBER} />

      <main>
        <section
          className="relative bg-zinc-900 py-10 md:py-14 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.88), rgba(24,24,27,0.94)), url(/images/optimized/seite-sanierung-reparatur.webp)` }}
          role="img"
          aria-labelledby="hero-h1-sanierung-reparatur"
        >
          <KiBildHinweis />
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb items={SERVICE_BREADCRUMBS["/sanierung-reparatur"]} className="mb-4 text-white/60" dark />
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-3 py-1.5 rounded-full text-xs font-medium mb-4">
              <MessageCircle className="w-3 h-3 text-yellow-400" />
              Digitale Erstberatung – ohne Besichtigungstermin
            </div>
            <h1 id="hero-h1-sanierung-reparatur" className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Reparatur oder Sanierung? Wir helfen bei der Entscheidung
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-2xl">
              Ein Schaden oder ein veraltetes Gewerk in Haus oder Wohnung wirft schnell dieselbe Frage auf:
              reicht eine gezielte Reparatur, oder lohnt sich der Blick auf eine größere Sanierung? Zeigen Sie
              uns die Situation digital – wir beraten ehrlich.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/kontakt">
                <Button size="lg" className="btn-glanz gap-2" data-testid="button-hero-contact">
                  <MessageCircle className="w-5 h-5" />
                  Jetzt digital anfragen
                </Button>
              </Link>
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2" data-testid="button-hero-call">
                  <Phone className="w-5 h-5" />
                  {PHONE_NUMBER}
                </Button>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-full text-xs text-white">
                <Award className="w-3 h-3 text-yellow-400" />
                Partnernetzwerk in München
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-full text-xs text-white">
                <Shield className="w-3 h-3 text-yellow-400" />
                16+ Jahre Erfahrung
              </div>
            </div>
          </div>
        </section>

        <BackButton />

        <section className="py-12 md:py-16" id="main-content">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="heading-signs">
                Woran erkennen Sie, was gebraucht wird?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Diese Anzeichen helfen bei der ersten Einordnung.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {signs.map((sign, idx) => (
                <Card key={idx} className="border-2 hover-elevate">
                  <CardContent className="p-5">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                      <sign.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold mb-2" data-testid={`heading-sign-${idx}`}>{sign.title}</h3>
                    <p className="text-sm text-muted-foreground">{sign.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="heading-comparison">
                Reparatur oder Sanierung im Vergleich
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Beide Wege haben ihre Berechtigung – die passende Wahl hängt von Ihrer Situation ab.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {comparison.map((item, idx) => (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2" data-testid={`heading-comparison-${idx}`}>{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    <ul className="space-y-2">
                      {item.fits.map((fit, fidx) => (
                        <li key={fidx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{fit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="heading-process">
                So läuft die digitale Erstberatung ab
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ohne ersten Besichtigungstermin – direkt aus dem Handy.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((item) => (
                <Card key={item.step}>
                  <CardContent className="p-5 text-center">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2" data-testid={`heading-step-${item.step}`}>{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-aus-einer-hand">
                  Mehrere Gewerke, ein Ansprechpartner
                </h2>
                <p className="text-muted-foreground mb-6">
                  Betrifft die Sanierung mehr als ein Gewerk – etwa Sanitär, Heizung, Elektro oder Boden –
                  müssen Sie nicht selbst mehrere Handwerker koordinieren. Renodex übernimmt die Abstimmung
                  als Partnernetzwerk aus geprüften Meisterfirmen.
                </p>
                <ul className="space-y-3">
                  {[
                    "Eine Anfrage statt mehrerer Einzelaufträge",
                    "Abgestimmte Termine zwischen den Gewerken",
                    "Ehrliche Einschätzung ohne Verkaufsdruck",
                    "Sie entscheiden in Ruhe über Umfang und Zeitpunkt"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <ClipboardCheck className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3" data-testid="heading-inspection">Kostenlose Erstberatung</h3>
                  <p className="text-muted-foreground mb-4">
                    Schildern Sie uns die Situation digital – wir prüfen die Angaben und melden uns mit einer
                    ersten Einschätzung, unverbindlich und kostenfrei.
                  </p>
                  <Link href="/kontakt">
                    <Button className="w-full gap-2" data-testid="button-cta-inspection">
                      <MessageCircle className="w-4 h-4" />
                      Jetzt digital anfragen
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" data-testid="heading-faq">
              Häufige Fragen zu Reparatur und Sanierung
            </h2>

            <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none space-y-4">
              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-faq-1">
                  <HelpCircle className="w-4 h-4 text-primary" />
                  Woher weiß ich, ob eine Reparatur reicht?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Zeigen Sie uns das Problem am besten digital – per Foto oder kurzer Beschreibung über unser
                  Kontaktformular. Anhand Ihrer Angaben geben wir eine erste, ehrliche Einschätzung, ob eine
                  gezielte Reparatur ausreicht oder ein größerer Blick sinnvoll ist.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-faq-2">
                  <Layers className="w-4 h-4 text-primary" />
                  Was, wenn mehrere Gewerke betroffen sind?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Dann übernehmen wir als Partnernetzwerk die Koordination zwischen den beteiligten
                  Handwerkern – Sie haben einen Ansprechpartner statt mehrerer Einzelaufträge, von der
                  Planung bis zur Abnahme.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-faq-3">
                  <Clock className="w-4 h-4 text-primary" />
                  Wie schnell erhalte ich eine Rückmeldung?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Nach Ihrer digitalen Anfrage melden wir uns in der Regel noch am selben Werktag mit einer
                  ersten Einschätzung und den nächsten Schritten.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Als Partnernetzwerk mit über 16 Jahren Erfahrung berät Renodex Familien und Paare in München
                und Umgebung im Umkreis von 25 km ehrlich zu Reparatur und Sanierung – von Schwabing über
                Bogenhausen und Sendling bis nach Pasing, Laim und Obermenzing, ebenso im Umland wie
                Grünwald, Puchheim, Germering und Garching.
              </p>
            </div>
          </div>
        </section>

        <ServiceDistrictLinks serviceName="Sanierung und Reparatur" serviceSlug="sanierung-reparatur" />

        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Wrench className="w-12 h-12 mx-auto mb-4 text-blue-200" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-cta">
              Reparatur oder Sanierung? Zeigen Sie uns die Situation digital
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Foto, Video oder Sprachnachricht genügen für den ersten Schritt – ohne Besichtigungstermin.
            </p>
            <Link href="/kontakt">
              <Button aria-label="Aktion" size="lg" variant="secondary" className="font-bold gap-2" data-testid="button-cta-contact">
                <MessageCircle className="w-5 h-5" />
                Jetzt digital anfragen
              </Button>
            </Link>
          </div>
        </section>

        <section className="bg-muted/20 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-6 text-center" data-testid="heading-links">Weitere Informationen von Renodex</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/leistungen/komplettsanierung">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <HardHat className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-komplettsanierung">Komplettsanierung</h3>
                      <p className="text-xs text-muted-foreground mt-1">Haus und Wohnung aus einer Hand</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/komplettsanierung-kosten">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <ClipboardCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-kosten">Kosten einer Komplettsanierung</h3>
                      <p className="text-xs text-muted-foreground mt-1">Faktoren, Ablauf, Förderung</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/kontakt">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-kontakt">Kontakt</h3>
                      <p className="text-xs text-muted-foreground mt-1">Kostenlose Beratung</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
