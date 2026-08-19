import { Mail, HelpCircle, CheckCircle, FileText, Target, MessageCircle, Euro, Calculator, Receipt, Users, Home, Zap } from "lucide-react";
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
import KiBildHinweis from "@/components/KiBildHinweis";

const PHONE_NUMBER = "[Telefon folgt]";
const pageData = mainPagesKeywords.faq;

const faqItems = [
  {
    question: "Was kostet eine Komplettsanierung in München?",
    answer: "Die Kosten einer Komplettsanierung hängen stark vom Umfang ab: Größe der Wohnung oder des Hauses, Anzahl der betroffenen Gewerke und Zustand der Bausubstanz. Nach einer kostenlosen Besichtigung erhalten Sie ein individuelles Festpreisangebot – ohne pauschale Quadratmeterpreise, die Ihrem Projekt nicht gerecht werden."
  },
  {
    question: "Was ist bei der Kalkulation einer Sanierung entscheidend?",
    answer: "Entscheidend sind die betroffenen Gewerke (Sanitär, Heizung, Elektro, Bodenverlegung, Malerarbeiten), der Zustand der bestehenden Substanz und ob Sie während der Arbeiten in der Wohnung bleiben möchten. Wir schlüsseln jede Position im Angebot einzeln auf, damit Sie genau sehen, wofür Sie zahlen."
  },
  {
    question: "Was kostet eine Badsanierung in München?",
    answer: "Eine Badsanierung umfasst je nach Umfang Fliesenarbeiten, Sanitärinstallation und teils Elektroarbeiten. Da jedes Bad unterschiedlich geschnitten ist und unterschiedliche Ausstattung gewünscht wird, erstellen wir nach Besichtigung ein individuelles Festpreisangebot – inklusive aller beteiligten Gewerke aus einer Hand."
  },
  {
    question: "Gibt es eine feste Preisliste für Renodex-Leistungen?",
    answer: "Nein, eine pauschale Preisliste würde Ihrem Projekt nicht gerecht. Da jede Sanierung individuell ist, erstellen wir nach einer kostenlosen Besichtigung ein detailliertes Festpreisangebot mit Festpreisgarantie – transparent aufgeschlüsselt nach Gewerk und Leistung."
  },
  {
    question: "Welche Förderungen gibt es für eine energetische Sanierung?",
    answer: "Bei energetischen Maßnahmen wie Wärmepumpe, Photovoltaik oder Dämmung können Sie unter Umständen KfW- oder BAFA-Förderung nutzen. Wir beraten Sie zu aktuellen Förderprogrammen und unterstützen bei der Antragstellung, damit Sie keine Fördermöglichkeit verpassen."
  },
  {
    question: "Wie lange dauert eine Komplettsanierung?",
    answer: "Die Dauer hängt vom Umfang ab: Eine Badsanierung ist oft in ein bis zwei Wochen abgeschlossen, eine Komplettsanierung von Haus oder Wohnung mit mehreren Gewerken kann mehrere Wochen dauern. Da wir die Gewerke koordiniert planen, vermeiden wir Leerlauf zwischen den einzelnen Terminen."
  },
  {
    question: "Was tun bei einem akuten Sanierungsfall wie Wasserschaden?",
    answer: "Bei einem akuten Fall wie Wasserschaden oder Heizungsausfall: Schaden dokumentieren (Fotos für die Versicherung) und uns digital über das Kontaktformular oder direkt telefonisch kontaktieren. Wir melden uns zeitnah mit den nächsten Schritten und übernehmen bei Bedarf auch die Kommunikation mit Ihrer Versicherung."
  },
  {
    question: "Lohnt sich eine energetische Sanierung finanziell?",
    answer: "Eine energetische Sanierung (Dämmung, Wärmepumpe, Photovoltaik) kann Heizkosten spürbar senken und den Wert der Immobilie langfristig sichern. In Kombination mit Förderprogrammen amortisiert sich die Investition oft über mehrere Jahre. Wir beraten Sie individuell, welche Maßnahmen für Ihr Objekt sinnvoll sind."
  },
  {
    question: "Woran erkenne ich, ob eine Sanierung notwendig ist?",
    answer: "Anzeichen können sein: veraltete Sanitär- oder Elektroinstallation, hohe Heizkosten, sichtbare Feuchtigkeitsschäden oder eine in die Jahre gekommene Bausubstanz. Bei einer kostenlosen Erstberatung vor Ort verschaffen wir uns gemeinsam mit Ihnen einen Überblick und zeigen auf, was wirklich notwendig ist."
  }
];

const trustPoints = [
  {
    icon: FileText,
    title: "Transparente Festpreise",
    description: "Nach der Besichtigung erhalten Sie ein detailliertes Angebot mit allen Positionen einzeln aufgeschlüsselt – ohne versteckte Kosten."
  },
  {
    icon: CheckCircle,
    title: "Kostenlose Erstberatung",
    description: "Die Besichtigung und Angebotserstellung sind kostenlos und unverbindlich. Sie entscheiden in Ruhe."
  },
  {
    icon: Euro,
    title: "Förderung im Blick",
    description: "Bei energetischen Maßnahmen beraten wir Sie zu KfW- und BAFA-Förderprogrammen und unterstützen bei der Antragstellung."
  },
  {
    icon: Users,
    title: "Alle Gewerke aus einer Hand",
    description: "Ein Ansprechpartner koordiniert Sanitär, Heizung, Elektro und weitere Gewerke – statt vier getrennte Handwerksbetriebe."
  }
];

const trustBadges = [
  { icon: Users, text: "Partnernetzwerk in München" },
  { icon: Home, text: "16+ Jahre Erfahrung" },
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

      <main>
        {/* Hero Section - einheitliches Unterseiten-Muster wie leistungen/thema.tsx, kein Foto (kein verifiziertes Renodex-Bildmaterial vorhanden) */}
        <section
          className="relative bg-zinc-900 py-10 md:py-14 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.78), rgba(24,24,27,0.88)), url(/images/optimized/seite-faq.webp)` }}
        >
          <KiBildHinweis />
          <div className="max-w-4xl mx-auto px-4">
            <Breadcrumb items={SERVICE_BREADCRUMBS["/faq"]} className="mb-4 text-white/60" />
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-3 py-1.5 rounded-full text-xs font-medium mb-3">
              <Euro className="w-3 h-3 text-yellow-400" />
              Transparente Festpreise
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Sanierung München – Preise, Ablauf und häufige Fragen
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-2xl">
              Komplettsanierung von Haus und Wohnung aus einer Hand: transparente Festpreise nach
              Besichtigung, ehrliche Antworten zu Kosten, Ablauf und Förderung – für München und
              Umgebung im Umkreis von 25 km.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-full text-xs text-white">
                  <badge.icon className="w-3 h-3 text-yellow-400" />
                  {badge.text}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a href="mailto:info@renodex.de" data-testid="link-email-faq">
                <Button size="lg" className="btn-glanz gap-2">
                  <Mail className="w-5 h-5" />
                  Jetzt per E-Mail anfragen
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Trust Points Section - Kompakt */}
        <section className="py-6 md:py-8" id="preise">
          <div className="max-w-7xl mx-auto px-4">
            <BackButton />
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-2" data-testid="heading-faq-prices">
                Sanierung München – so kalkulieren wir Ihr Angebot
              </h2>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                Jede Sanierung ist individuell. Deshalb erstellen wir nach einer kostenlosen
                Besichtigung ein transparentes Festpreisangebot – statt pauschaler
                Quadratmeterpreise, die Ihrem Projekt nicht gerecht werden.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
              {trustPoints.map((point, index) => (
                <Card key={index} data-testid={`trust-point-${index}`}>
                  <CardContent className="p-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center mb-2">
                      <point.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{point.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-3">{point.description}</p>
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
                Häufige Fragen zur Sanierung in München
              </h2>
              <p className="text-muted-foreground text-sm">
                Antworten zu Kosten, Ablauf und Förderung Ihrer Komplettsanierung.
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
              Sanierung München – faire Preise ohne versteckte Kosten
            </h2>

            <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Sie fragen sich, was eine Sanierung in München kostet? Renodex bietet Ihnen als
                Partnernetzwerk aus geprüften Meisterfirmen ein transparentes Festpreisangebot --
                ohne versteckte Zuschläge. Wir wissen, dass eine Sanierung eine bedeutende
                Investition ist, und Sie als Hausbesitzer oder Wohnungseigentümer genau wissen
                möchten, welche Kosten auf Sie zukommen. Deshalb setzen wir auf absolute
                Transparenz bei allen Positionen.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Die Kosten für eine Sanierung in München werden von mehreren Faktoren beeinflusst:
                Umfang der betroffenen Gewerke, Zustand der bestehenden Substanz, gewünschte
                Materialien und die Größe des Objekts spielen alle eine Rolle. Auch die
                Zugänglichkeit und eventuelle Vorarbeiten müssen berücksichtigt werden. All diese
                Faktoren fließen in unsere individuelle Kalkulation ein, die wir Ihnen detailliert
                aufschlüsseln.
              </p>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-faq-cost">
                  <Receipt className="w-4 h-4 text-primary" />
                  Was kostet eine Komplettsanierung in München?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Der Preis einer Komplettsanierung hängt von der Anzahl der betroffenen Gewerke
                  und dem Umfang der Arbeiten ab. Unser Festpreisangebot umfasst Material, Arbeit
                  und Koordination der beteiligten Gewerke – Sie erhalten einen verbindlichen
                  Preis, keine vage Schätzung.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Bei einzelnen Gewerken wie einer Badsanierung berechnen wir nach tatsächlichem
                  Aufwand und benötigtem Material. Für eine Komplettsanierung mit mehreren
                  Gewerken erstellen wir einen individuellen Kostenvoranschlag, der alle Positionen
                  einzeln ausweist.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Bei größeren Vorhaben hängen die Kosten stark vom Umfang ab: Eine
                  Teilsanierung einzelner Räume ist günstiger als eine Komplettsanierung mit
                  Erneuerung aller Gewerke. Wir beraten Sie ehrlich, welche Maßnahmen wirklich
                  notwendig sind und welche optional bleiben können.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-faq-funding">
                  <Zap className="w-4 h-4 text-primary" />
                  Wie spare ich bei einer Sanierung durch Förderung?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Bei energetischen Maßnahmen wie Wärmepumpe, Photovoltaik oder Dämmung können
                  Sie unter Umständen KfW- oder BAFA-Förderung nutzen. Das reduziert Ihre
                  Sanierungskosten spürbar. Wir erstellen Ihren Kostenvoranschlag inklusive
                  Förderberatung.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Die staatlichen Förderprogramme für energetische Sanierung sind eine echte
                  Chance für Hausbesitzer. Wenn Sie Ihre Heizung erneuern oder die Dämmung
                  verbessern, können Sie nicht nur Heizkosten sparen, sondern auch von
                  attraktiven Zuschüssen profitieren.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Wir unterstützen Sie bei der Antragstellung und stellen sicher, dass alle
                  Voraussetzungen für die Förderung erfüllt werden. Diese Formalitäten
                  übernehmen wir gerne für Sie.
                </p>
              </div>

              <div className="bg-card border rounded-md p-6">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2" data-testid="heading-faq-quality">
                  <Calculator className="w-5 h-5 text-primary" />
                  Wie werden die Preise berechnet?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Transparenz beginnt bei der Kalkulation. Wir schlüsseln in jedem Angebot genau
                  auf, wie sich der Preis zusammensetzt: Materialkosten, Arbeitsstunden und
                  eventuelle Zusatzleistungen werden einzeln ausgewiesen. So können Sie
                  nachvollziehen, wofür Sie bezahlen.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Unser Festpreis-Versprechen bedeutet: Der Preis, den wir Ihnen nennen, ist der
                  Preis, den Sie zahlen. Sollten während der Arbeiten unvorhergesehene Probleme
                  auftreten, besprechen wir das sofort mit Ihnen – zusätzliche Arbeiten erfolgen
                  nur mit Ihrer ausdrücklichen Zustimmung.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Fordern Sie jetzt Ihren kostenlosen Kostenvoranschlag an! Wir erstellen Ihnen ein
                detailliertes Angebot mit transparenter Aufschlüsselung – Festpreisgarantie
                inklusive.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Die Investition in eine Sanierung ist eine Investition in Ihr Zuhause. Mit den
                richtigen Informationen und einem verlässlichen Partnernetzwerk an Ihrer Seite
                können Sie diese Entscheidung mit gutem Gefühl treffen.
              </p>
            </div>
          </div>
        </section>

        {/* CTA in middle */}
        <section className="py-12 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Euro className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold" data-testid="heading-faq-cta">Kostenloses Angebot anfordern</h2>
            </div>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Erhalten Sie Ihren persönlichen Kostenvoranschlag – kostenlos und unverbindlich.
              Festpreisgarantie ohne Überraschungen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:info@renodex.de">
                <Button className="w-full sm:w-auto gap-2" size="lg" data-testid="button-faq-email-inline">
                  <Mail className="w-5 h-5" />
                  E-Mail schreiben
                </Button>
              </a>
              <Link href="/kontakt">
                <Button variant="outline" className="w-full sm:w-auto" size="lg" data-testid="button-faq-contact-inline">
                  Angebot anfordern
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Keywords Section */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 text-center">
              {pageData.mainKeyword} – Transparente Preise
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
            <h2 className="text-xl font-bold mb-6 text-center" data-testid="heading-faq-links">Mehr über Renodex</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/leistungen">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Target className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-leistungen">Leistungen</h3>
                      <p className="text-xs text-muted-foreground mt-1">Alle Gewerke im Überblick</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/sofort-hilfe">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Zap className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-sofort-hilfe">Digitale Erstberatung</h3>
                      <p className="text-xs text-muted-foreground mt-1">Foto, Video oder Sprachnachricht</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/ratgeber">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-ratgeber">Ratgeber</h3>
                      <p className="text-xs text-muted-foreground mt-1">Tipps zur Sanierung</p>
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
