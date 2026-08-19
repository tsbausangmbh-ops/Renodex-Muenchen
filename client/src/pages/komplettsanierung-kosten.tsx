import { Mail, ArrowRight, Euro, Calculator, Shield, Award, ThumbsUp, ListChecks, Ruler, Layers, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BackButton from "@/components/BackButton";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb from "@/components/Breadcrumb";
import ServiceDistrictLinks from "@/components/ServiceDistrictLinks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PHONE_NUMBER = "[Telefon folgt]";

const costFactors = [
  { factor: "Umfang der Sanierung", description: "Ein einzelnes Gewerk oder die gesamte Haustechnik – der Umfang bestimmt den größten Teil der Kosten", icon: Layers },
  { factor: "Wohn- oder Nutzfläche", description: "Die Quadratmeterzahl von Haus oder Wohnung ist Grundlage für jede Kalkulation", icon: Ruler },
  { factor: "Zustand der Bausubstanz", description: "Ältere Leitungen, Feuchtigkeit oder Altlasten können zusätzliche Arbeiten nötig machen", icon: ClipboardCheck },
  { factor: "Gewählte Ausstattung", description: "Material- und Ausstattungsklasse bei Bad, Böden oder Heizung wirkt sich direkt auf den Preis aus", icon: Award },
  { factor: "Anzahl der Gewerke", description: "Elektro, Sanitär, Heizung, Böden und Malerarbeiten einzeln oder als koordiniertes Gesamtpaket", icon: ListChecks },
  { factor: "Zeitplan", description: "Ein enger Terminwunsch kann die Planung und damit auch die Kalkulation beeinflussen", icon: Calculator },
];

const ablaufSchritte = [
  { schritt: "1. Erstberatung", beschreibung: "Sie schildern Ihr Vorhaben – digital über das Kontaktformular oder telefonisch. Renodex klärt die grobe Richtung." },
  { schritt: "2. Besichtigung", beschreibung: "Ein Termin vor Ort erfasst den tatsächlichen Zustand von Haus oder Wohnung und den genauen Bedarf je Gewerk." },
  { schritt: "3. Angebot", beschreibung: "Sie erhalten ein transparentes Angebot mit allen enthaltenen Leistungen, bevor irgendetwas beauftragt wird." },
  { schritt: "4. Koordinierte Ausführung", beschreibung: "Alle beteiligten Gewerke arbeiten nach einem gemeinsamen Zeitplan – ein Ansprechpartner bei Renodex begleitet den gesamten Ablauf." },
  { schritt: "5. Abnahme", beschreibung: "Am Ende steht eine gemeinsame Abnahme der fertigen Arbeiten." },
];

const fundingPrograms = [
  { name: "KfW-Förderung", description: "Zinsgünstige Kredite und Zuschüsse für energetische Maßnahmen wie Dämmung, Fenster oder Heizungstausch." },
  { name: "BAFA-Zuschuss", description: "Direkte Zuschüsse für einzelne energetische Einzelmaßnahmen, etwa bei Heizung oder Wärmepumpe." },
  { name: "Steuerliche Absetzbarkeit", description: "Energetische Sanierungsmaßnahmen an selbst genutzten Immobilien können unter bestimmten Voraussetzungen steuerlich geltend gemacht werden." },
];

const costFaqs = [
  {
    question: "Was kostet eine Komplettsanierung in München?",
    answer: "Das lässt sich ohne Besichtigung seriös nicht beziffern – zu unterschiedlich sind Umfang, Fläche, Zustand der Bausubstanz und gewünschte Ausstattung von Fall zu Fall. Nach einer kostenlosen Erstberatung und Besichtigung vor Ort erhalten Sie von Renodex ein transparentes, individuelles Angebot mit allen enthaltenen Leistungen."
  },
  {
    question: "Warum unterscheiden sich die Kosten einer Sanierung so stark?",
    answer: "Eine Wohnungssanierung mit neuem Bad und neuen Böden kostet naturgemäß anders als eine Haussanierung mit Elektro-, Sanitär- und Heizungserneuerung über mehrere Stockwerke. Auch der Zustand der vorhandenen Substanz – etwa alte Leitungen oder Feuchtigkeit – wirkt sich auf den Aufwand aus."
  },
  {
    question: "Bekomme ich einen Festpreis?",
    answer: "Nach der Besichtigung und Klärung aller Details erstellt Renodex ein Angebot mit allen enthaltenen Leistungen. Sie wissen vor Beauftragung genau, was im Angebot enthalten ist."
  },
  {
    question: "Kann ich einzelne Gewerke separat beauftragen oder muss es eine Komplettsanierung sein?",
    answer: "Beides ist möglich. Renodex koordiniert sowohl einzelne Gewerke – etwa nur die Badsanierung oder nur die Elektroinstallation – als auch die vollständige Komplettsanierung von Haus oder Wohnung aus einer Hand."
  }
];

const trustBadges = [
  { icon: Award, text: "Partnernetzwerk in München" },
  { icon: ThumbsUp, text: "25+ Jahre Erfahrung" },
  { icon: Shield, text: "Transparentes Angebot" },
];

export default function KomplettsanierungKosten() {
  useSEO({
    title: "Komplettsanierung Kosten München | Renodex",
    description: "Was kostet eine Komplettsanierung in München? Kostenfaktoren und Ablauf im Überblick – kostenlose Erstberatung bei Renodex.",
    canonical: "https://renodex.de/komplettsanierung-kosten",
    keywords: "Komplettsanierung Kosten München, Sanierung Kosten, Haussanierung Kosten, Wohnungssanierung Kosten, Renodex",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-komplettsanierung-kosten">
      <Header phoneNumber={PHONE_NUMBER} />

      <main>
        <section
          className="relative bg-zinc-900 py-10 md:py-14 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.78), rgba(24,24,27,0.88)), url(/images/optimized/seite-komplettsanierung-kosten.webp)` }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <Breadcrumb
              items={[
                { label: "Leistungen", href: "/leistungen" },
                { label: "Kosten einer Komplettsanierung" },
              ]}
              className="mb-4 text-white/60"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Was kostet eine Komplettsanierung in München?
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-2xl">
              Die Kosten einer Komplettsanierung von Haus oder Wohnung hängen stark vom Einzelfall
              ab. Hier erfahren Sie, welche Faktoren den Preis bestimmen, wie der Ablauf bei
              Renodex funktioniert und wo Sie Förderungen erwarten können.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="mailto:info@renodex.de" data-testid="link-kosten-email">
                <Button size="lg" className="btn-glanz gap-2">
                  <Mail className="w-5 h-5" />
                  Jetzt per E-Mail anfragen
                </Button>
              </a>
              <Link href="/kontakt">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2" data-testid="link-kosten-contact">
                  Kostenlose Erstberatung
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-full text-xs text-white" data-testid={`badge-trust-${index}`}>
                  <badge.icon className="w-3 h-3 text-primary" />
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Warum lässt sich der Preis nicht pauschal nennen?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Jede Sanierung ist anders: Eine Wohnung mit neuem Bad unterscheidet sich im Aufwand
              grundlegend von einer Haussanierung mit kompletter Elektro- und Heizungserneuerung.
              Auch der Zustand der vorhandenen Bausubstanz – etwa Leitungsalter oder
              Feuchtigkeit – spielt eine Rolle. Eine seriöse Kostenaussage ist deshalb erst nach
              einer Besichtigung vor Ort möglich.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-6">Diese Faktoren bestimmen den Preis</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {costFactors.map((item, index) => (
                <Card key={index} data-testid={`cost-factor-${index}`}>
                  <CardContent className="p-4 flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{item.factor}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-6">So läuft eine Komplettsanierung bei Renodex ab</h2>
            <div className="space-y-4 mb-12">
              {ablaufSchritte.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-muted rounded-md" data-testid={`ablauf-schritt-${index}`}>
                  <div className="font-bold text-primary shrink-0">{item.schritt.split(".")[0]}.</div>
                  <div>
                    <p className="font-medium text-sm">{item.schritt.split(". ")[1]}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.beschreibung}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-muted rounded-md p-6 mb-12">
              <h2 className="text-xl font-semibold mb-3">Förderprogramme im Überblick</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Bei energetischen Maßnahmen im Rahmen Ihrer Sanierung – etwa Dämmung, Heizungstausch
                oder Wärmepumpe – kommen häufig staatliche Förderprogramme infrage. Welche im
                Einzelfall passen, hängt von der geplanten Maßnahme ab.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {fundingPrograms.map((program, index) => (
                  <div key={index} className="p-3 bg-background border rounded-md" data-testid={`funding-${index}`}>
                    <p className="font-semibold text-sm mb-1">{program.name}</p>
                    <p className="text-xs text-muted-foreground">{program.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Renodex berät Sie im Rahmen der Erstberatung, welche Förderungen für Ihr konkretes
                Vorhaben infrage kommen könnten.
              </p>
            </div>

            <div className="bg-muted rounded-md p-6 mb-10">
              <h2 className="text-xl font-semibold mb-2">Komplettsanierung aus einer Hand</h2>
              <p className="text-muted-foreground leading-relaxed">
                Statt für Elektro, Sanitär, Heizung, Böden und Malerarbeiten einzelne Handwerker zu
                koordinieren, übernimmt Renodex die gesamte Abstimmung – ein fester Ansprechpartner
                für Haus und Wohnung.
              </p>
              <Link href="/leistungen">
                <span className="inline-block mt-3 text-primary font-medium hover:underline cursor-pointer" data-testid="link-alle-leistungen">
                  Alle Leistungen im Überblick →
                </span>
              </Link>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">Häufige Fragen zu den Kosten</h2>
            <div className="max-w-3xl">
              <Accordion type="single" collapsible className="space-y-2 mb-12">
                {costFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="border rounded-md px-3" data-testid={`faq-kosten-${index}`}>
                    <AccordionTrigger className="py-3 text-sm text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-3 text-sm text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:info@renodex.de" data-testid="link-email-bottom">
                <Button size="lg" className="btn-glanz w-full sm:w-auto gap-2">
                  <Mail className="w-5 h-5" />
                  Kostenlose Beratung anfragen
                </Button>
              </a>
              <Link href="/leistungen">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Weitere Leistungen ansehen
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <ServiceDistrictLinks serviceName="Komplettsanierung" serviceSlug="komplettsanierung-kosten" />
      </main>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
      <BackButton />
    </div>
  );
}
