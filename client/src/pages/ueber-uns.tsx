import { Award, Users, Clock, Shield, MapPin, Phone, Mail, CheckCircle, Hammer, Building, Star, ThumbsUp, Heart, Zap, Target, FileText, Home, Calendar, BadgeCheck, Trophy, Handshake, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BackButton from "@/components/BackButton";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb, { SERVICE_BREADCRUMBS } from "@/components/Breadcrumb";
import { mainPagesKeywords } from "@/content/mainPages";

const PHONE_NUMBER = "[Telefon folgt]";
const pageData = mainPagesKeywords["ueber-uns"];

const trustPoints = [
  {
    icon: Users,
    title: "Partnernetzwerk aus geprüften Meisterfirmen",
    description: "Jedes Gewerk wird von einer geprüften Partnerfirma mit Meisterstandard ausgeführt – koordiniert aus einer Hand.",
    highlight: "Geprüfte Qualität"
  },
  {
    icon: Clock,
    title: "Zuverlässige Terminplanung",
    description: "Wir stimmen die Gewerke untereinander ab, damit Ihre Sanierung ohne Leerlauf zwischen den Terminen abläuft.",
    highlight: "Termine im Blick"
  },
  {
    icon: Shield,
    title: "Festpreise nach Besichtigung",
    description: "Nach der kostenlosen Erstberatung erhalten Sie ein transparentes Festpreisangebot – ohne versteckte Nachforderungen.",
    highlight: "Transparente Preise"
  },
  {
    icon: Heart,
    title: "Ein Ansprechpartner für alle Gewerke",
    description: "Sie sprechen mit einer Stelle – nicht mit Sanitär-, Elektro- und Malerbetrieb einzeln.",
    highlight: "Aus einer Hand"
  },
];

const whyChooseUs = [
  "Ein Ansprechpartner für Sanierung, Renovierung und alle Einzelgewerke",
  "Kostenlose Erstberatung vor Ort",
  "Festpreisangebot ohne versteckte Nachforderungen",
  "Geprüfte Partnerfirmen mit Meisterstandard",
  "Saubere Baustelle – koordiniert über den gesamten Ablauf",
  "München und Umgebung im Umkreis von 25 km",
];

const services = [
  "Komplettsanierung von Haus und Wohnung",
  "Badsanierung und Bodenverlegung",
  "Elektroinstallation und Sanitär",
  "Heizung und Wärmepumpe",
  "Photovoltaik",
  "Malerarbeiten, Fassade, Dach und Spengler",
];

export default function UeberUns() {
  useSEO({
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    canonical: "https://renodex.de/ueber-uns",
    keywords: `${pageData.mainKeyword}, ${pageData.secondaryKeywords.slice(0, 15).join(", ")}`,
    geoRegion: "DE-BY",
    geoPlacename: "München"
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-ueber-uns">
      <Header phoneNumber={PHONE_NUMBER} />

      <main>
        {/* Hero Section - einheitliches Unterseiten-Muster wie leistungen/thema.tsx, kein Foto (kein verifiziertes Renodex-Bildmaterial vorhanden) */}
        <section
          className="relative bg-zinc-900 py-10 md:py-14 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.78), rgba(24,24,27,0.88)), url(/images/optimized/seite-ueber-uns.webp)` }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <Breadcrumb items={SERVICE_BREADCRUMBS["/ueber-uns"]} className="mb-4 text-white/60" />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Renodex – Partnernetzwerk für Komplettsanierung in München
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-2xl">
              Renodex ist Ihr Partnernetzwerk aus geprüften Meisterfirmen für die Komplettsanierung von Haus und Wohnung aus einer Hand – seit über 16 Jahren in München und Umgebung.
            </p>
            <div className="mt-8">
              <a href="mailto:info@renodex.de" data-testid="link-email-ueber-uns">
                <Button size="lg" className="btn-glanz gap-2">
                  <Mail className="w-5 h-5" />
                  Jetzt per E-Mail anfragen
                </Button>
              </a>
            </div>
          </div>
        </section>

        <BackButton />

        {/* About Section - Kompakt */}
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Eine Sanierung, viele Gewerke – wer wir sind
                </h2>
                <p className="text-muted-foreground mb-4">
                  Als <strong>Partnernetzwerk in München</strong> kennen wir die Frustration vieler Hausbesitzer:
                  Für eine Sanierung braucht es Sanitär-, Elektro-, Heizungs- und Malerbetrieb – jeder mit eigenem
                  Termin, eigenem Angebot, eigener Zusage. Bei Renodex ist das anders.
                </p>
                <p className="text-muted-foreground mb-4">
                  Mit über <strong>16 Jahren Erfahrung</strong> koordinieren wir als eingetragenes
                  <strong> Partnernetzwerk</strong> geprüfte Meisterfirmen für Ihre
                  <strong> Komplettsanierung von Haus und Wohnung</strong> – Sie sprechen mit einer Stelle,
                  nicht mit vier Gewerken einzeln.
                </p>
                <p className="text-muted-foreground mb-6">
                  Unser Versprechen: kaufmännische Koordination und handwerkliche Qualität aus einer Hand,
                  damit Ihre Sanierung ohne Leerlauf zwischen den Terminen abläuft.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-card border rounded-md p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    Renodex – Unternehmensdaten
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Renodex</strong> – Partnernetzwerk in München</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Erfahrung:</strong> über 16 Jahre im Bereich Sanierung</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Qualifikation:</strong> Partnernetzwerk aus geprüften Partner-Meisterfirmen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span><strong>Einzugsgebiet:</strong> München und Umgebung im Umkreis von 25 km</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span><strong>Standort:</strong> [Adresse folgt]</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <a aria-label="Link" href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">
                        {PHONE_NUMBER}
                      </a>
                    </li>
                  </ul>
                </div>
                <a href="/#kontakt" className="block">
                  <Button className="w-full gap-2" size="lg" data-testid="button-contact-inline">
                    <Zap className="w-4 h-4" />
                    Kostenlose Beratung anfragen
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Points Section - Kompakt */}
        <section className="py-6 md:py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Was Renodex als Partnernetzwerk auszeichnet</h2>
              <p className="text-muted-foreground text-sm">
                Koordinierte Sanierung aus einer Hand – ohne Kompromisse bei der Qualität.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {trustPoints.map((point, index) => (
                <Card key={index} className="relative overflow-visible" data-testid={`trust-${index}`}>
                  <div className="absolute -top-2 left-3">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded">
                      {point.highlight}
                    </span>
                  </div>
                  <CardContent className="pt-6 pb-4 px-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <point.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{point.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{point.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Longtail SEO Text Section - Kompakt, Zielgruppe 35-60, gehobener Mittelstand, Familie/Paar */}
        <section className="py-6 md:py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
              Warum Familien und Paare in München auf Renodex setzen
            </h2>

            <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Suchen Sie einen verlässlichen Partner für die <strong>Komplettsanierung Ihres Hauses oder Ihrer Wohnung</strong>?
                Renodex ist Ihr <strong>Partnernetzwerk in München</strong> mit über 16 Jahren Erfahrung im Bereich Sanierung.
                Was uns auszeichnet: Wir koordinieren Sanitär, Heizung, Elektro, Wärmepumpe, Photovoltaik und weitere Gewerke
                aus einer Hand – damit Sie nicht selbst zum Bauleiter werden müssen.
              </p>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  Was bedeutet Sanierung aus einer Hand konkret?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Statt für jedes Gewerk selbst einen Handwerker zu suchen und Termine zu koordinieren, übernimmt Renodex
                  die Abstimmung zwischen den Partnerfirmen. Sie haben einen Ansprechpartner für die gesamte Sanierung --
                  von der Erstberatung bis zur Abnahme.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Für Familien und Paare, die berufstätig sind und wenig Zeit für die Koordination mehrerer Handwerker haben,
                  ist das der entscheidende Unterschied: Eine Sanierung, ein Ansprechpartner, ein Zeitplan.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-primary" />
                  Was bedeutet Festpreis nach Besichtigung?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Nach einer kostenlosen Erstberatung und Besichtigung vor Ort erhalten Sie ein individuelles
                  Festpreisangebot für Ihre Sanierung – transparent und ohne versteckte Kosten. Änderungen am Umfang
                  während der Ausführung werden vorab besprochen, nicht nachträglich in Rechnung gestellt.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Auf die ausgeführten Arbeiten gilt die gesetzliche Gewährleistung. Sollte nach der Fertigstellung
                  ein Problem auftreten, kümmern wir uns um die Nachbesserung.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  Welche Vorteile hat ein Partnernetzwerk gegenüber einem einzelnen Betrieb?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Ein einzelner Handwerksbetrieb deckt meist nur ein Gewerk ab. Renodex bündelt geprüfte Partnerfirmen
                  für Sanitär, Heizung, Elektro, Wärmepumpe, Photovoltaik, Bodenverlegung, Malerarbeiten und weitere
                  Gewerke – Sie profitieren von der Fachkompetenz jeder einzelnen Partnerfirma, ohne selbst mehrere
                  Betriebe koordinieren zu müssen.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Jede Partnerfirma im Netzwerk arbeitet nach Meisterstandard. So bekommen Sie bei jedem Gewerk
                  geprüfte Qualität – koordiniert unter einem Ansprechpartner.
                </p>
              </div>

              <div className="bg-card border rounded-md p-6">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Wo ist Renodex für Sie erreichbar?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Unser Einzugsgebiet umfasst München und die Umgebung im Umkreis von 25 km – von den Münchner
                  Stadtteilen bis ins nähere Umland. Kontaktieren Sie uns digital über das Formular oder rufen Sie an,
                  um Ihr Sanierungsvorhaben zu besprechen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Warum Kunden zu Renodex wechseln</h2>
                <p className="text-muted-foreground mb-6">
                  Viele unserer Kunden hatten vorher den Aufwand, mehrere Handwerker selbst zu koordinieren.
                  Bei Renodex finden sie:
                </p>
                <ul className="space-y-3">
                  {whyChooseUs.map((reason, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                        <ThumbsUp className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="bg-card border rounded-md p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Hammer className="w-5 h-5 text-primary" />
                    Leistungen im Überblick
                  </h3>
                  <ul className="grid grid-cols-1 gap-2">
                    {services.map((service, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        {service}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      <strong>Einsatzgebiet:</strong> München und Umgebung im Umkreis von 25 km
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Keywords Section */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 text-center">
              {pageData.mainKeyword}
            </h4>
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
        <section className="py-12 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-6 text-center">Mehr über Renodex</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/leistungen">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Target className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Komplettsanierung München</h3>
                      <p className="text-xs text-muted-foreground mt-1">Alle Leistungen im Überblick</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/faq">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Preise & Ablauf</h3>
                      <p className="text-xs text-muted-foreground mt-1">Transparente Festpreise</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/kontakt">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Renodex Kontakt</h3>
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
