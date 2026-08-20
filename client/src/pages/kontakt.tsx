import { Phone, Mail, MapPin, Clock, Users, Home, CheckCircle, Zap, FileText, Navigation, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BackButton from "@/components/BackButton";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb, { SERVICE_BREADCRUMBS } from "@/components/Breadcrumb";
import { mainPagesKeywords } from "@/content/mainPages";
import KiBildHinweis from "@/components/KiBildHinweis";

const PHONE_NUMBER = "[Telefon folgt]";
const EMAIL = "info@renodex.de";
const pageData = mainPagesKeywords.kontakt;

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    primary: PHONE_NUMBER,
    secondary: "Mo-Fr 8:00-16:30 Uhr",
    action: `tel:${PHONE_NUMBER.replace(/\s/g, "")}`,
    urgent: false
  },
  {
    icon: Mail,
    title: "E-Mail",
    primary: EMAIL,
    secondary: "Antwort in der Regel innerhalb von 48 Stunden",
    action: `mailto:${EMAIL}`,
    urgent: false
  },
  {
    icon: MapPin,
    title: "Standort",
    primary: "[Adresse folgt]",
    secondary: "München und Umgebung",
    action: null,
    urgent: false
  },
  {
    icon: Clock,
    title: "Öffnungszeiten",
    primary: "Mo-Fr: 8:00 - 16:30",
    secondary: "Digitale Anfrage jederzeit möglich",
    action: null,
    urgent: false
  }
];

const serviceAreas = [
  "München Zentrum", "Allach-Untermenzing", "Pasing-Obermenzing", "Moosach",
  "Schwabing", "Bogenhausen", "Trudering", "Sendling", "Laim", "Nymphenburg",
  "Grünwald", "Puchheim", "Germering", "Unterschleißheim", "Garching"
];

const trustPoints = [
  "Kostenlose digitale Erstberatung",
  "Festpreisangebot nach individueller Prüfung",
  "Antwort in der Regel innerhalb von 48 Stunden",
  "Persönliche Betreuung durch einen festen Ansprechpartner"
];

const trustBadges = [
  { icon: Users, text: "Partnernetzwerk in München" },
  { icon: Home, text: "16+ Jahre Erfahrung" },
];

export default function Kontakt() {
  useSEO({
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    canonical: "https://renodex.de/kontakt",
    keywords: `${pageData.mainKeyword}, ${pageData.secondaryKeywords.slice(0, 15).join(", ")}`,
    geoRegion: "DE-BY",
    geoPlacename: "München"
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-kontakt">
      <Header phoneNumber={PHONE_NUMBER} />

      <main>
        {/* Hero Section - einheitliches Unterseiten-Muster wie leistungen/thema.tsx, kein Foto (kein verifiziertes Renodex-Bildmaterial vorhanden) */}
        <section
          className="relative bg-zinc-900 py-10 md:py-14 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.88), rgba(24,24,27,0.94)), url(/images/optimized/seite-kontakt.webp)` }}
          role="img"
          aria-labelledby="hero-h1-kontakt"
        >
          <KiBildHinweis />
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb items={SERVICE_BREADCRUMBS["/kontakt"]} className="mb-4 text-white/60" dark />
            <h1 id="hero-h1-kontakt" className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Renodex kontaktieren – kostenlose Beratung für Ihre Sanierung
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-2xl">
              Zeigen Sie uns Ihr Sanierungsvorhaben digital per Foto, Video oder Sprachnachricht --
              oder kontaktieren Sie uns telefonisch. Wir melden uns mit den nächsten Schritten
              zurück.
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
              <a href={`mailto:${EMAIL}`} data-testid="link-email-kontakt">
                <Button size="lg" className="btn-glanz gap-2">
                  <Mail className="w-5 h-5" />
                  Jetzt per E-Mail anfragen
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-4 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {contactInfo.map((info, index) => (
                <Card key={index} data-testid={`contact-info-${index}`}>
                  <CardContent className="p-3 text-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 bg-primary/10">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="font-semibold text-xs" data-testid={`heading-contact-info-${index}`}>{info.title}</h2>
                    {info.action ? (
                      <a href={info.action} className="text-primary font-medium text-sm block" data-testid={`link-contact-${info.title.toLowerCase().replace(/\s/g, "-")}`}>
                        {info.primary}
                      </a>
                    ) : (
                      <p className="font-medium text-sm">{info.primary}</p>
                    )}
                    <p className="text-muted-foreground text-xs mt-1">{info.secondary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <BackButton />

        {/* Contact Section - Kompakt */}
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4" data-testid="heading-kontakt-main">
                  Kostenlose Beratung für Ihre Komplettsanierung
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Sie planen eine Sanierung oder Renovierung von Haus oder Wohnung? Als
                  Partnernetzwerk in München koordinieren wir alle Gewerke aus einer Hand --
                  von Sanitär und Heizung bis Elektro und Bodenverlegung. Fordern Sie jetzt
                  Ihr kostenloses Festpreisangebot an.
                </p>
                <ul className="space-y-3 mb-8">
                  {trustPoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={`mailto:${EMAIL}`}>
                    <Button className="w-full sm:w-auto gap-2" size="lg" data-testid="button-kontakt-email">
                      <Mail className="w-5 h-5" />
                      E-Mail schreiben
                    </Button>
                  </a>
                </div>
              </div>

              <div>
                <Card className="bg-primary/5 border-primary">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3 flex items-center gap-2 text-primary" data-testid="heading-kontakt-digital">
                      <Zap className="w-5 h-5" />
                      Digitale Erstberatung
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Zeigen Sie uns Ihr Vorhaben direkt aus dem Handy – Bild, Video oder
                      Sprachnachricht, ohne App und ohne Anmeldung. Ersetzt den ersten
                      Besichtigungstermin.
                    </p>
                    <a href="/sofort-hilfe">
                      <Button className="w-full gap-2" size="lg" data-testid="button-kontakt-digital-cta">
                        <Zap className="w-5 h-5" />
                        Digital anfragen
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <ContactForm phoneNumber={PHONE_NUMBER} />

        {/* Service Area Section - Kompakt */}
        <section className="py-6 md:py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center" data-testid="heading-kontakt-area">
              Einsatzgebiet München – im Umkreis von 25 km
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground text-sm mb-3">
                  Unser Partnernetzwerk ist in München und Umgebung – etwa Puchheim oder Untermenzing – im Umkreis von 25 km für Sie
                  vor Ort.
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  <strong>Renodex</strong> · [Adresse folgt]
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {serviceAreas.map((area, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-background border rounded-full text-xs"
                      data-testid={`area-${area.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-md h-56 overflow-hidden border" data-testid="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2661.8!2d11.4589!3d48.1627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e761c6b7b2c1d%3A0x0!2s[Adresse folgt]%2081247%20M%C3%BCnchen!5e0!3m2!1sde!2sde!4v1701000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Renodex Standort München"
                  data-testid="google-map-iframe"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Longtail SEO Text Section - Kompakt */}

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
            <h2 className="text-xl font-bold mb-6 text-center" data-testid="heading-kontakt-links">Mehr über Renodex</h2>
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
              <Link href="/faq">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-preise">FAQ &amp; Preise</h3>
                      <p className="text-xs text-muted-foreground mt-1">Transparente Festpreise</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/ueber-uns">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-partnernetzwerk">Partnernetzwerk in München</h3>
                      <p className="text-xs text-muted-foreground mt-1">16+ Jahre Erfahrung</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <div className="max-w-3xl mx-auto px-4 py-4">
        <p className="text-[10px] text-muted-foreground/60 leading-relaxed">
          Hinweis zum Vertragsabschluss: Die auf dieser Website dargestellten Inhalte, Leistungen und Informationen stellen kein verbindliches Angebot im rechtlichen Sinne dar. Ein Vertragsabschluss über diese Website findet nicht statt. Anfragen über Kontaktformulare, E-Mail oder Telefon dienen ausschließlich der unverbindlichen Kontaktaufnahme und der Vorbereitung einer individuellen Angebotserstellung. Ein Vertrag kommt erst nach persönlicher Abstimmung, Besichtigung vor Ort und ausdrücklicher Annahme eines schriftlichen Angebots zustande. Es erfolgt keine kostenpflichtige Bestellung, keine Buchung und keine Online-Zahlung über diese Website.
        </p>
      </div>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
