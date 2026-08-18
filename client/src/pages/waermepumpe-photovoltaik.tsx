import { Phone, ArrowRight, Check, Euro, Calculator, Shield, Award, Star, Home, Thermometer, Zap, CheckCircle, ThumbsUp, PiggyBank, FileText, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BackButton from "@/components/BackButton";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb, { SERVICE_BREADCRUMBS } from "@/components/Breadcrumb";
import ServiceDistrictLinks from "@/components/ServiceDistrictLinks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImage from "@assets/generated_images/house_dark_tiles_minimal_garden.png";

const PHONE_NUMBER = "[Telefon folgt]";

const priceRanges = [
  {
    title: "Neueindeckung ohne Dämmung",
    priceRange: "93 – 175 €/m²",
    description: "Nur Dachziegel erneuern, ohne energetische Maßnahmen",
    includes: ["Abriss alte Eindeckung", "Neue Dachziegel", "Lattung erneuern", "Dachrinnenanschluss"],
    icon: Layers
  },
  {
    title: "Mit Wärmedämmung",
    priceRange: "175 – 299 €/m²",
    description: "Neueindeckung mit moderner Zwischensparrendämmung",
    includes: ["Alles aus Basis", "Dämmung nach EnEV", "Dampfsperre", "KfW-förderfähig"],
    icon: Thermometer
  },
  {
    title: "Komplettsanierung",
    priceRange: "299 – 592 €/m²",
    description: "Rundumerneuerung inkl. Dachstuhl und Ausbau",
    includes: ["Alles aus Premium", "Dachstuhl-Arbeiten", "Neue Dachfenster", "Kompletter Innenausbau"],
    icon: Home
  }
];

const costFactors = [
  { factor: "Dachfläche", description: "Größe in m² ist der Hauptkostenfaktor" },
  { factor: "Dachform", description: "Steildach, Flachdach, Walmdach – unterschiedliche Aufwände" },
  { factor: "Materialwahl", description: "Betondachstein vs. Tonziegel vs. Schiefer" },
  { factor: "Dämmstandard", description: "EnEV, KfW 40/55 oder Passivhaus-Standard" },
  { factor: "Zusatzarbeiten", description: "Dachfenster, Gauben, Kamin, Photovoltaik" },
  { factor: "Gerüstkosten", description: "Je nach Gebäudehöhe und Zugänglichkeit" }
];

const fundingOptions = [
  { 
    name: "KfW-Förderung", 
    amount: "bis 150.000€ Kredit", 
    description: "Zinsgünstiger Kredit + bis zu Tilgungszuschuss bei energetischer Sanierung" 
  },
  { 
    name: "BAFA-Zuschuss", 
    amount: "15-20% Zuschuss", 
    description: "Direkter Zuschuss für Einzelmaßnahmen wie Dachdämmung" 
  },
  { 
    name: "Steuerbonus", 
    amount: "20% absetzbar", 
    description: "Bis zu über 3 Jahre steuerlich absetzbar (§35c EStG)" 
  }
];

const costFaqs = [
  {
    question: "Was kostet eine Dachsanierung in München pro m²?",
    answer: "Die Kosten für eine Dachsanierung in München liegen zwischen 93€ und 592€ pro Quadratmeter – abhängig vom Umfang. Eine reine Neueindeckung kostet 93-175€/m², mit Dämmung 175-299€/m² und eine Komplettsanierung 299-592€/m². Für ein durchschnittliches Einfamilienhaus mit 120m² Dachfläche bedeutet das Gesamtkosten zwischen 11.160€ und 71.040€."
  },
  {
    question: "Welche Förderungen gibt es für Dachsanierungen?",
    answer: "Für energetische Dachsanierungen gibt es attraktive Förderungen: Die KfW bietet zinsgünstige Kredite bis 150.000€ mit bis zu 45.000€ Tilgungszuschuss. Das BAFA gewährt 15-20% Direktzuschuss. Alternativ können Sie bis zu 40.000€ über 3 Jahre von der Steuer absetzen. Wir beraten Sie kostenlos zu Ihren Fördermöglichkeiten."
  },
  {
    question: "Lohnt sich eine Dachsanierung wirtschaftlich?",
    answer: "Ja, eine Dachsanierung rechnet sich mehrfach: Sie sparen bis zu 30% Heizkosten durch bessere Dämmung, steigern den Immobilienwert um 10-15% und vermeiden teure Folgeschäden durch Feuchtigkeit. Mit Förderungen amortisiert sich die Investition oft schon nach 8-12 Jahren."
  },
  {
    question: "Wie lange dauert eine Dachsanierung?",
    answer: "Eine komplette Dachsanierung eines Einfamilienhauses dauert in der Regel 1-3 Wochen, abhängig vom Umfang. Eine reine Neueindeckung geht schneller (3-5 Tage), während Arbeiten am Dachstuhl mehr Zeit benötigen. Sie können während der Sanierung meist im Haus wohnen bleiben."
  }
];

const trustBadges = [
  { icon: Award, text: "Partnernetzwerk in München" },
  { icon: Star, text: "25+ Jahre Erfahrung" },
  { icon: ThumbsUp, text: "240+ Sanierungen" },
  { icon: Shield, text: "Festpreis-Garantie" },
];

export default function DachsanierungKosten() {
  useSEO({
    title: "Dach erneuern Kosten München ✓ Neueindeckung & KfW-Förderung",
    description: "Dach erneuern Kosten in München: Kostenloser Festpreis-Kostenvoranschlag vom Partnernetzwerk für Neueindeckung & Dämmung. KfW-Förderung, transparente Beratung.",
    canonical: "https://renodex.de/dachsanierung-kosten-muenchen",
    keywords: "Dacheindeckung Preise München, Dach erneuern Kosten, KfW Dachdämmung München, Dach modernisieren Preise",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-dachsanierung-kosten">
      <Header phoneNumber={PHONE_NUMBER} />
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb items={SERVICE_BREADCRUMBS["/komplettsanierung-kosten"]} />
      </div>

      <main>
        <section 
          className="py-10 md:py-12 relative bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-3 py-1.5 rounded-full text-xs font-medium mb-3">
                  <Calculator className="w-3 h-3 text-yellow-400" />
                  Transparente Preise – Kostenloser Kostenvoranschlag
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">
                  Dachsanierung Kosten München – Preise & Förderung 2026
                </h1>
                <p className="text-zinc-600 text-sm md:text-base mb-4">
                  <strong className="text-white">Was kostet eine Dachsanierung in München?</strong> Transparente Preise von <strong className="text-white">93 bis 592 €/m²</strong>, 
                  plus <strong className="text-white">KfW-Förderung bis 45.000€</strong>. Kostenloser Kostenvoranschlag vom Partnernetzwerk.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                    <Button size="lg" className="gap-2 font-bold" data-testid="button-kosten-call">
                      <Phone className="w-5 h-5" />
                      Kostenlos beraten: {PHONE_NUMBER}
                    </Button>
                  </a>
                  <Link href="/kontakt">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2" data-testid="button-kosten-contact">
                      Kostenvoranschlag anfordern
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trustBadges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-full text-xs text-white" data-testid={`badge-trust-${index}`}>
                      <badge.icon className="w-3 h-3 text-yellow-400" />
                      {badge.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block" />
            </div>
          </div>
        </section>

        <section className="py-8 bg-white dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-center">
              Dachsanierung Preise München – <span className="text-primary">Übersicht 2025</span>
            </h2>
            <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto">
              Die Kosten für eine Dachsanierung in München hängen vom Umfang ab. Hier unsere aktuellen Preisrahmen:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {priceRanges.map((range, index) => (
                <Card key={index} className="relative" data-testid={`price-range-${index}`}>
                  <CardHeader className="pb-2">
                    <range.icon className="w-8 h-8 text-primary mb-2" />
                    <CardTitle className="text-lg">{range.title}</CardTitle>
                    <p className="text-2xl font-bold text-primary">{range.priceRange}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{range.description}</p>
                    <ul className="space-y-1">
                      {range.includes.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 bg-zinc-50 dark:bg-zinc-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Kostenfaktoren bei der Dachsanierung</h2>
                <div className="space-y-3">
                  {costFactors.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-zinc-900 rounded-md">
                      <Euro className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">{item.factor}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Förderungen für Dachsanierung München</h2>
                <div className="space-y-3">
                  {fundingOptions.map((option, index) => (
                    <div key={index} className="p-4 bg-primary/5 border border-primary/20 rounded-md" data-testid={`funding-${index}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">{option.name}</span>
                        <Badge variant="secondary">{option.amount}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-4 text-center">Häufige Fragen zu Dachsanierung Kosten</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-2">
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
          </div>
        </section>

        <ServiceDistrictLinks serviceName="Dachsanierung" serviceSlug="dachsanierung-kosten" />

        <section className="py-8 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Kostenloser Kostenvoranschlag für Ihre Dachsanierung
            </h2>
            <p className="mb-4 opacity-90">
              Erfahren Sie, was Ihre Dachsanierung in München genau kostet – transparent und unverbindlich.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                <Button aria-label="Aktion" size="lg" variant="secondary" className="gap-2" data-testid="button-kosten-cta-call">
                  <Phone className="w-5 h-5" />
                  {PHONE_NUMBER}
                </Button>
              </a>
              <Link href="/kontakt">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2" data-testid="button-kosten-cta-contact">
                  Jetzt Angebot anfordern
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-4">Dachsanierung München – Kosten verstehen und sparen</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Die <strong className="text-foreground">Kosten einer Dachsanierung in München</strong> sind eine wichtige Investition in Ihre Immobilie. Ein intaktes, gut gedämmtes Dach schützt nicht nur vor Witterung, sondern spart auch erheblich Heizkosten und steigert den Wert Ihres Hauses.
              </p>
              <p>
                <strong className="text-foreground">Was beeinflusst die Dachsanierung Kosten?</strong> Der größte Faktor ist die Dachfläche in Quadratmetern. Hinzu kommen Materialwahl (Betondachstein, Tonziegel, Schiefer), gewünschter Dämmstandard und Zusatzarbeiten wie Dachfenster oder Gauben. In München liegen die Preise für eine <strong className="text-foreground">Komplettsanierung</strong> zwischen 299 und 592 €/m².
              </p>
              <p>
                <strong className="text-foreground">Förderung nutzen:</strong> Bei energetischen Sanierungen können Sie erheblich sparen. Die KfW bietet zinsgünstige Kredite mit bis zu 45.000€ Tilgungszuschuss. Alternativ erhalten Sie über das BAFA 15-20% Direktzuschuss oder können die Kosten über 3 Jahre von der Steuer absetzen. Wir beraten Sie kostenlos zu allen <strong className="text-foreground">Fördermöglichkeiten für Dachsanierung in München</strong>.
              </p>
              <p>
                Als <strong className="text-foreground">Partnernetzwerk</strong> erstellen wir Ihnen einen detaillierten, transparenten Kostenvoranschlag. Keine versteckten Kosten, keine bösen Überraschungen – bei Renodex bekommen Sie immer einen <strong className="text-foreground">Festpreis mit Garantie</strong>. Rufen Sie uns an unter <strong className="text-foreground">{PHONE_NUMBER}</strong> für Ihre kostenlose Beratung.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
      <BackButton />
    </div>
  );
}
