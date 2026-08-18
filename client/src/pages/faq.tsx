import { Phone, Star, Award, Shield, ThumbsUp, HelpCircle, CheckCircle, Coins, FileText, AlertTriangle, Target, MessageCircle, Euro, PiggyBank, Calculator, Receipt, Percent, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BackButton from "@/components/BackButton";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb, { SERVICE_BREADCRUMBS } from "@/components/Breadcrumb";
import { mainPagesKeywords } from "@/content/mainPages";
import heroImage from "@assets/generated_images/roofing_price_estimate.png";

const PHONE_NUMBER = "[Telefon folgt]";
const pageData = mainPagesKeywords.faq;

const faqItems = [
  {
    question: "Was kostet ein Dachdecker in München?",
    answer: "Die Dachdecker Preise München variieren je nach Arbeit: Dachreparatur München ab 175€, Dachsanierung Kosten München ab 93€/m². Als Partnernetzwerk in München bieten wir transparente Dachdecker Festpreise München ohne versteckte Kosten."
  },
  {
    question: "Wie hoch sind die Dachdecker Kosten für eine Dachsanierung?",
    answer: "Die Dachsanierung Kosten München liegen zwischen 93-592€/m² je nach Umfang. Eine Neueindeckung kostet 93-175€/m², mit Dachdämmung Kosten München 175-299€/m², Komplettsanierung 299-592€/m². Unser Dachdecker Angebot München enthält einen verbindlichen Dachdecker Festpreis München."
  },
  {
    question: "Was kostet eine Dachreparatur in München?",
    answer: "Dachreparatur Kosten München starten ab 175€ inkl. Anfahrt. Einzelne Dachziegel tauschen: ab 93€, kleine Leckagen: 175-360€, Dachrinnenreparatur: ab 118€. Als Dachdecker München mit Festpreis wissen Sie vorab genau, was Sie zahlen."
  },
  {
    question: "Was kosten neue Dachrinnen in München?",
    answer: "Dachrinnen Kosten München: Kunststoff 52-72€/m, Aluminium 67-93€/m, Zink 82-118€/m, Kupfer 108-144€/m. Ein Einfamilienhaus komplett: 2.369-5.923€. Alle Dachdecker Preise München inkl. Montage und Material."
  },
  {
    question: "Gibt es eine Dachdecker Preisliste München?",
    answer: "Ja, wir bieten eine transparente Dachdecker Preisliste München. Da jedes Dach individuell ist, erstellen wir nach Besichtigung ein detailliertes Dachdecker Angebot München mit Festpreisgarantie. Die Dachdecker Kosten München werden transparent aufgeschlüsselt."
  },
  {
    question: "Welche Förderungen gibt es für Dacharbeiten?",
    answer: "Bei energetischer Dachdämmung Kosten München können Sie KfW/BAFA-Förderung bis 20% nutzen. Das reduziert Ihre Dachsanierung Kosten München erheblich. Wir beraten Sie zu aktuellen Förderprogrammen und helfen bei der Antragstellung."
  },
  {
    question: "Wie lange dauert eine Dachsanierung in München?",
    answer: "Eine komplette Dachsanierung eines Einfamilienhauses in München dauert in der Regel 1-3 Wochen. Eine reine Neueindeckung geht schneller (3-5 Tage), während Arbeiten am Dachstuhl oder umfangreiche Dämmarbeiten mehr Zeit benötigen. Sie können während der Sanierung meist im Haus wohnen bleiben."
  },
  {
    question: "Was tun bei Sturmschaden am Dach in München?",
    answer: "Bei Sturmschaden Dach München: 1) Sicherheit zuerst - niemals selbst aufs Dach. 2) Schaden fotografieren für Versicherung. 3) Unseren 24/7 Sofort-Hilfe rufen: [Telefon folgt]. Wir kommen meist am selben Tag, dokumentieren den Schaden professionell und übernehmen die komplette Versicherungsabwicklung."
  },
  {
    question: "Lohnt sich eine Dachdämmung in München?",
    answer: "Ja, eine professionelle Dachdämmung in München lohnt sich mehrfach: Sie sparen bis zu 30% Heizkosten, verbessern das Raumklima im Sommer und Winter, steigern den Immobilienwert um 10-15% und profitieren von KfW-Förderung bis 45.000€. Die Investition amortisiert sich oft schon nach 8-12 Jahren."
  },
  {
    question: "Wann muss ein Dach erneuert werden?",
    answer: "Ein Dach sollte erneuert werden bei: Alter über 40-50 Jahre, wiederkehrenden Leckagen, durchfeuchteter Dämmung, beschädigten oder porösen Dachziegeln, Moos- und Algenbefall, oder wenn die Energiekosten stark steigen. Bei unserer kostenlosen Dachinspektion (150€, wird bei Auftrag angerechnet) prüfen wir den Zustand Ihres Daches."
  }
];

const priceCategories = [
  {
    title: "Dachreparatur Kosten München",
    subtitle: "Schnelle Hilfe zum fairen Preis",
    price: "ab 175 €",
    priceNote: "inkl. Anfahrt in München",
    description: "Dachreparatur Preise München: Ziegel tauschen, Leckagen abdichten, Dachrinnen reparieren.",
    includes: [
      "Ziegel austauschen: ab 93 €",
      "Kleine Leckagen: ab 175-360 €",
      "Dachrinnenreparatur: ab 118 €",
      "Blecharbeiten: ab 144 €",
      "Sofort-Hilfe-Zuschlag: ca. 93-118 €"
    ],
    highlight: "Dachdecker Preisliste München transparent",
    featured: false
  },
  {
    title: "Dachrinnen Kosten München",
    subtitle: "Neue Entwässerung mit Festpreis",
    price: "52-144 €",
    priceNote: "pro Meter inkl. Montage",
    description: "Dachrinnen Preise München je nach Material. Dachdecker Kosten München für komplette Entwässerung.",
    includes: [
      "Kunststoff: 52-72 €/m",
      "Aluminium: 67-93 €/m",
      "Zink/Titanzink: 82-118 €/m",
      "Kupfer: 108-144 €/m",
      "Einfamilienhaus gesamt: 2.369-5.923 €"
    ],
    highlight: "Dachdecker Angebot München mit Festpreis",
    featured: false
  },
  {
    title: "Dachsanierung Kosten München",
    subtitle: "Komplettsanierung vom Meister",
    price: "93-592 €",
    priceNote: "pro m² je nach Umfang",
    description: "Dachsanierung Preise München: Von Neueindeckung bis Komplettsanierung mit Dämmung.",
    includes: [
      "Neueindeckung ohne Dämmung: 93-175 €/m²",
      "Mit Wärmedämmung: 175-299 €/m²",
      "Komplett mit Dachstuhl: 299-592 €/m²",
      "150 m² Dach = ca. 26.780-88.580 €",
      "Förderung bis 20% möglich!"
    ],
    highlight: "Dachdämmung Kosten München inklusive",
    featured: false
  },
  {
    title: "Dachfenster Kosten München",
    subtitle: "Velux Einbau & Austausch",
    price: "711-3.811 €",
    priceNote: "je nach Größe und Ausstattung",
    description: "Dachfenster Preise München: Einbau, Austausch und Reparatur vom Partnernetzwerk.",
    includes: [
      "Einbau Standardfenster: 711-1.185 €",
      "Fenster + Einbau komplett: 1.185-2.575 €",
      "Premium mit Rollladen: 2.369-3.811 €",
      "Eindeckrahmen erneuern: ab 361 €",
      "Dichtung/Reparatur: ab 175 €"
    ],
    highlight: "Dachdecker Festpreis München garantiert",
    featured: false
  },
  {
    title: "Kamin & Gauben Preise",
    subtitle: "Verblechungen vom Spengler",
    price: "ab 237 €",
    priceNote: "je nach Umfang",
    description: "Kaminverkleidung und Gaubenverkleidung Kosten München. Dachdecker Preise für Blecharbeiten.",
    includes: [
      "Kaminverkleidung Zink: 948-2.987 €",
      "Kaminverkleidung Kupfer: 1.421-4.738 €",
      "Gaubenanschluss: ab 237 €/lfm",
      "Wandanschlussblech: ab 82 €/lfm",
      "Attika-Abdeckung: ab 118 €/lfm"
    ],
    highlight: "Dachdecker Kosten München transparent",
    featured: false
  },
  {
    title: "Dachinspektion München",
    subtitle: "Professionelle Dachprüfung",
    price: "150 €",
    priceNote: "Festpreis inkl. Protokoll",
    description: "Dachinspektion Kosten München: Professionelle Begutachtung mit Zustandsbericht und Empfehlungen.",
    includes: [
      "Visuelle Dachprüfung: komplett",
      "Fotodokumentation: inkl.",
      "Schriftliches Protokoll: inkl.",
      "Reparaturempfehlungen: inkl.",
      "Anrechnung bei Auftrag: 100%"
    ],
    highlight: "Wird bei Auftrag angerechnet",
    featured: true
  }
];

const trustPoints = [
  {
    icon: FileText,
    title: "Dachdecker Festpreise München",
    description: "Transparente Dachdecker Preisliste München. Sie erhalten ein detailliertes Dachdecker Angebot München mit allen Positionen – ohne versteckte Kosten."
  },
  {
    icon: CheckCircle,
    title: "Kostenlose Angebotserstellung",
    description: "Dachdecker Kostenvoranschlag München kostenlos und unverbindlich. Sie entscheiden in Ruhe über Ihr Dachdecker Angebot."
  },
  {
    icon: Coins,
    title: "Förderung nutzen",
    description: "Bei Dachdämmung Kosten München bis 20% Förderung möglich. Wir beraten Sie zu KfW/BAFA und reduzieren Ihre Dachsanierung Kosten München."
  },
  {
    icon: Shield,
    title: "Dachdecker Qualität München",
    description: "Unsere Dachdecker Preise München entsprechen Meisterqualität. Günstige Dachdecker München? Qualität zahlt sich langfristig aus!"
  }
];

const trustBadges = [
  { icon: Award, text: "Partnernetzwerk in München" },
  { icon: Star, text: "25+ Jahre Erfahrung" },
  { icon: ThumbsUp, text: "100+ zufriedene Kunden" },
  { icon: Shield, text: "Dachdecker Festpreis München" },
];

export default function FAQ() {
  useSEO({
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    canonical: "https://renodex.de/faq",
    keywords: `${pageData.mainKeyword}, ${pageData.secondaryKeywords.slice(0, 15).join(", ")}`,
    geoRegion: "DE-BY",
    geoPlacename: "München"
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-faq">
      <Header phoneNumber={PHONE_NUMBER} />
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb items={SERVICE_BREADCRUMBS["/faq"]} />
      </div>

      <main>
        {/* Hero Section - Kompakt */}
        <section 
          className="py-10 md:py-12 relative bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-3 py-1.5 rounded-full text-xs font-medium mb-3">
                  <Euro className="w-3 h-3 text-yellow-400" />
                  Transparente Festpreise 2026
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">
                  Dachdecker München FAQ – Kosten, Ablauf & häufige Fragen
                </h1>
                <p className="text-zinc-600 text-sm md:text-base mb-4">
                  <strong className="text-white">Dachdecker Kosten München</strong>: Transparente <strong className="text-white">Preisliste</strong> vom Meister. 
                  <strong className="text-white"> Dachreparatur Kosten</strong>, <strong className="text-white">Dachsanierung Preise</strong> – 
                  ehrliche <strong className="text-white">Festpreise</strong> ohne versteckte Kosten.
                </p>
                <div className="flex flex-wrap gap-2">
                  {trustBadges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-full text-xs text-white">
                      <badge.icon className="w-3 h-3 text-yellow-400" />
                      {badge.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-md p-4">
                  <h2 className="text-white font-bold text-sm mb-3 flex items-center gap-2" data-testid="heading-faq-prices-quick">
                    <Calculator className="w-4 h-4" />
                    Schnellübersicht Dachdecker Preise München
                  </h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-zinc-600">
                      <span>Dachreparatur:</span>
                      <span className="text-white font-medium">ab 175 €</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>Dachrinnen:</span>
                      <span className="text-white font-medium">52-144 €/m</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>Dachsanierung:</span>
                      <span className="text-white font-medium">93-592 €/m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Price Cards Section - Kompakt */}
        <section className="py-6 md:py-8" id="preise">
          <div className="max-w-7xl mx-auto px-4">
            <BackButton />
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-2" data-testid="heading-faq-prices">
                Dachdecker Kosten München – Transparente Preisliste 2025
              </h2>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                <strong>Dachdecker Kosten München</strong> transparent: 
                <strong> Dachreparatur</strong>, <strong>Dachsanierung</strong> – ehrliche <strong>Festpreise</strong>.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {priceCategories.map((category, index) => (
                <Card 
                  key={index} 
                  className={`relative overflow-visible ${category.featured ? "border-primary border-2" : ""}`}
                  data-testid={`price-card-${index}`}
                >
                  {category.featured && (
                    <div className="absolute -top-3 left-4 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded">
                      EMPFEHLUNG
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="text-base font-bold" data-testid={`heading-price-category-${index}`}>{category.title}</h3>
                      <p className="text-xs text-muted-foreground">{category.subtitle}</p>
                    </div>
                    <div className="mb-3">
                      <span className="text-xl font-bold text-primary">{category.price}</span>
                      <span className="text-xs text-muted-foreground ml-1">{category.priceNote}</span>
                    </div>
                    <ul className="space-y-1 mb-3">
                      {category.includes.slice(0, 4).map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-zinc-50 dark:bg-zinc-950/30 border border-zinc-200 dark:border-zinc-800 rounded-md p-2">
                      <p className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">
                        {category.highlight}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Trust Points - Kompakt */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
              {trustPoints.map((point, index) => (
                <Card key={index} data-testid={`trust-point-${index}`}>
                  <CardContent className="p-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center mb-2">
                      <point.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{point.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{point.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Kompakt */}
        <section className="py-6 md:py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold mb-2" data-testid="heading-faq-questions">
                FAQ: Was kostet Dachreparatur & Dachsanierung München?
              </h2>
              <p className="text-muted-foreground text-sm">
                Antworten zu <strong>Dachdecker Kosten</strong> und <strong>Dachsanierung Preise</strong>.
              </p>
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="border rounded-md px-4 bg-background"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left hover:no-underline py-3">
                    <span className="font-medium text-sm">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pb-3 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Longtail SEO Text Section - Kompakt */}
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center" data-testid="heading-faq-seo">
              Dachdecker Preise München 2025 – Faire Kosten ohne versteckte Gebühren
            </h2>
            
            <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Sie fragen sich: <strong>Was kostet ein Dachdecker in München?</strong> Die Renodex bietet 
                Ihnen eine transparente <strong>Dachdecker Preisliste München</strong> mit fairen 
                <strong> Dachdecker Festpreisen München</strong>. Unsere <strong>Dachdecker Kosten München</strong> 
                sind klar kalkuliert – ohne versteckte Zuschläge. Wir verstehen, dass Dacharbeiten eine bedeutende 
                Investition sind und Sie als Hausbesitzer genau wissen möchten, welche Kosten auf Sie zukommen. 
                Deshalb setzen wir auf absolute Transparenz bei allen unseren Preisen.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Die Preise für Dacharbeiten in München werden von verschiedenen Faktoren beeinflusst: Die Art des 
                Daches, der Zustand der bestehenden Substanz, die gewünschten Materialien und natürlich der Umfang 
                der Arbeiten spielen alle eine Rolle. Auch die Zugänglichkeit des Daches und eventuelle Gerüstkosten 
                müssen berücksichtigt werden. All diese Faktoren fließen in unsere individuelle Kalkulation ein, 
                die wir Ihnen detailliert aufschlüsseln.
              </p>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-faq-cost">
                  <Receipt className="w-4 h-4 text-primary" />
                  Was kostet eine Dachreparatur oder Dachsanierung München?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Die <strong>Dachreparatur Kosten München</strong> beginnen bei 175€ für kleine Arbeiten. 
                  <strong> Dachsanierung Kosten München</strong> liegen je nach Umfang zwischen 93-592€/m². 
                  Unsere <strong>Dachdecker Preise München</strong> beinhalten Material, Arbeit und Anfahrt. 
                  Jedes <strong>Dachdecker Angebot München</strong> enthält einen verbindlichen 
                  <strong> Dachdecker Festpreis München</strong>.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Bei Reparaturen berechnen wir in der Regel nach tatsächlichem Aufwand plus Materialkosten. 
                  Kleinere Reparaturen wie das Austauschen einzelner Ziegel oder das Abdichten kleiner Lecks 
                  können oft in ein bis zwei Stunden erledigt werden. Für größere Reparaturen oder wenn mehrere 
                  Problemstellen bearbeitet werden müssen, erstellen wir einen individuellen Kostenvoranschlag.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Bei Dachsanierungen hängen die Kosten stark vom Umfang ab. Eine einfache Neueindeckung ist 
                  günstiger als eine Komplettsanierung mit neuer Dämmung und Unterkonstruktion. Wir beraten Sie 
                  ehrlich, welche Maßnahmen wirklich notwendig sind und welche optional bleiben können – immer 
                  mit Blick auf das beste Kosten-Nutzen-Verhältnis für Sie.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-faq-funding">
                  <Percent className="w-4 h-4 text-primary" />
                  Wie spare ich Dachdecker Kosten München durch Förderung?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Bei <strong>Dachdämmung Kosten München</strong> können Sie bis zu 20% Förderung (KfW/BAFA) nutzen. 
                  Das reduziert Ihre <strong>Dachsanierung Kosten München</strong> erheblich. Wir erstellen Ihren 
                  <strong> Dachdecker Kostenvoranschlag München</strong> inklusive Förderberatung. 
                  So bekommen Sie <strong>Dachdecker günstig München</strong> bei voller Meisterqualität.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Die staatlichen Förderprogramme für energetische Sanierung sind eine echte Chance für Hausbesitzer. 
                  Wenn Sie Ihr Dach sanieren und dabei die Dämmung verbessern, können Sie nicht nur Heizkosten sparen, 
                  sondern auch von attraktiven Zuschüssen profitieren. Die KfW und das BAFA bieten verschiedene 
                  Programme an, die teilweise sogar kombiniert werden können.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Wir unterstützen Sie bei der Antragstellung und stellen sicher, dass alle Voraussetzungen für 
                  die Förderung erfüllt werden. Das umfasst die Dokumentation der Arbeiten, den Nachweis der 
                  verwendeten Materialien und die Bescheinigung durch einen Energieberater. Diese Formalitäten 
                  übernehmen wir gerne für Sie.
                </p>
              </div>

              <div className="bg-card border rounded-md p-6">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2" data-testid="heading-faq-quality">
                  <Banknote className="w-5 h-5 text-primary" />
                  Billig oder günstig? So erkennen Sie seriöse Dachdecker Angebote München
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Suchen Sie einen <strong>günstigen Dachdecker München</strong>? Vorsicht bei Billigangeboten! 
                  Seriöse <strong>Dachdecker Preise München</strong> spiegeln Qualität wider. 
                  Als <strong>Partnernetzwerk in München</strong> bieten wir faire 
                  <strong> Dachdecker Kosten München</strong>, die sich langfristig auszahlen. 
                  Unsere <strong>Dachdecker Stundenlohn München</strong> ist angemessen für Meisterqualität.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Wir haben in über 25 Jahren immer wieder gesehen, wie vermeintliche Schnäppchen teuer werden können. 
                  Billige Materialien halten nicht lange, unsachgemäße Ausführung führt zu Folgeschäden, und wenn der 
                  Billiganbieter nicht mehr erreichbar ist, bleiben Sie auf den Kosten sitzen. Bei einem Partnernetzwerk 
                  wie uns wissen Sie dagegen genau, mit wem Sie es zu tun haben.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Qualität kostet zwar mehr – aber sie lohnt sich. Ein solides Dach hält Jahrzehnte und macht keine 
                  Probleme. Eine billige Reparatur muss vielleicht nach zwei Jahren wiederholt werden. Rechnen Sie 
                  selbst: Was ist am Ende wirklich günstiger? Wir setzen auf Materialien führender Hersteller und 
                  bieten Gewährleistung auf unsere Arbeit.
                </p>
              </div>

              <div className="bg-card border rounded-md p-6">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2" data-testid="heading-faq-calculation">
                  <Calculator className="w-5 h-5 text-primary" />
                  Wie werden Dachdecker Preise München berechnet?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Transparenz beginnt bei der Kalkulation. Wir schlüsseln in jedem Angebot genau auf, wie sich 
                  der Preis zusammensetzt: Materialkosten, Arbeitsstunden, Anfahrt und eventuelle Zusatzleistungen 
                  werden einzeln ausgewiesen. So können Sie nachvollziehen, wofür Sie bezahlen.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Unsere Festpreise bedeuten: Der Preis, den wir Ihnen nennen, ist der Preis, den Sie zahlen. Punkt. 
                  Sollten während der Arbeiten unvorhergesehene Probleme auftreten – zum Beispiel versteckte 
                  Feuchteschäden unter der Eindeckung – besprechen wir das sofort mit Ihnen. Nur mit Ihrer 
                  ausdrücklichen Zustimmung werden zusätzliche Arbeiten durchgeführt.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Fordern Sie jetzt Ihren kostenlosen <strong>Dachdecker Kostenvoranschlag München</strong> an! 
                Wir erstellen Ihnen ein detailliertes <strong>Dachdecker Angebot München</strong> mit 
                transparenter <strong>Dachdecker Preisliste München</strong>. Alle <strong>Dachdecker Kosten München</strong> 
                sind klar aufgeschlüsselt – <strong>Dachdecker Festpreis München</strong> garantiert! Überzeugen 
                Sie sich selbst von unserer fairen Preisgestaltung.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Die Investition in Ihr Dach ist eine Investition in Ihr Zuhause. Mit den richtigen Informationen 
                und einem vertrauenswürdigen Partner an Ihrer Seite können Sie diese Entscheidung mit gutem 
                Gefühl treffen. Wir freuen uns darauf, Sie zu beraten!
              </p>
            </div>
          </div>
        </section>

        {/* CTA in middle */}
        <section className="py-12 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PiggyBank className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold" data-testid="heading-faq-cta">Dachdecker Angebot München kostenlos anfordern</h2>
            </div>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Erhalten Sie Ihren persönlichen <strong>Dachdecker Kostenvoranschlag München</strong> – 
              kostenlos und unverbindlich. <strong>Dachdecker Festpreis München</strong> ohne Überraschungen!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                <Button className="w-full sm:w-auto gap-2" size="lg" data-testid="button-faq-call-inline">
                  <Phone className="w-5 h-5" />
                  Dachdecker Preise München: {PHONE_NUMBER}
                </Button>
              </a>
              <a href="/#kontakt">
                <Button variant="outline" className="w-full sm:w-auto" size="lg" data-testid="button-faq-contact-inline">
                  Dachdecker Angebot München anfordern
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* SEO Keywords Section */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 text-center">
              {pageData.mainKeyword} - Transparente Preise
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {pageData.secondaryKeywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-6 text-center" data-testid="heading-faq-links">Weitere Informationen zu Dachdecker München</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/leistungen">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Target className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-dacharbeiten">Dacharbeiten München</h3>
                      <p className="text-xs text-muted-foreground mt-1">Alle Leistungen</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/sofort-hilfe">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-notdienst">Dach Sofort-Hilfe München</h3>
                      <p className="text-xs text-muted-foreground mt-1">24/7 Soforthilfe</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/ratgeber">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-ratgeber">Dach Ratgeber München</h3>
                      <p className="text-xs text-muted-foreground mt-1">Tipps vom Meister</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/kontakt">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-kontakt">Dachdecker München Kontakt</h3>
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
