import { Phone, Mail, MapPin, Clock, Users, Home, Zap, FileText, Navigation, Target } from "lucide-react";
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

const PHONE_NUMBER = "+49 89 381684766";
const EMAIL = "info@renodex.de";
const pageData = mainPagesKeywords.kontakt;

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    primary: PHONE_NUMBER,
    secondary: "Mo-Fr 8:00-16:30, Sa 10:00-14:00 Uhr",
    action: `tel:${PHONE_NUMBER.replace(/\s/g, "")}`,
    urgent: false
  },
  {
    icon: Mail,
    title: "E-Mail",
    primary: EMAIL,
    secondary: "Wir melden uns per E-Mail bei Ihnen",
    action: `mailto:${EMAIL}`,
    urgent: false
  },
  {
    icon: MapPin,
    title: "Standort",
    primary: "Helmut-Schmidt-Allee 54, 81248 München",
    secondary: "München und Umgebung",
    action: null,
    urgent: false
  },
  {
    icon: Clock,
    title: "Öffnungszeiten",
    primary: "Mo-Fr: 8:00 - 16:30 · Sa: 10:00 - 14:00",
    secondary: "Sonntag geschlossen, Termine außerhalb dieser Zeiten auf Anfrage. Digitale Anfrage jederzeit möglich",
    action: null,
    urgent: false
  }
];

const serviceAreas = [
  "München Zentrum", "Allach-Untermenzing", "Pasing-Obermenzing", "Moosach",
  "Schwabing", "Bogenhausen", "Trudering", "Sendling", "Laim", "Nymphenburg",
  "Grünwald", "Puchheim", "Germering", "Unterschleißheim", "Garching"
];

const trustBadges = [
  { icon: Users, text: "Partnernetzwerk in München" },
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
          style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.88), rgba(24,24,27,0.94)), url(/images/optimized/beratung-kundin-bauplan-altbau.webp)` }}
        >
          <KiBildHinweis />
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb items={SERVICE_BREADCRUMBS["/kontakt"]} className="mb-4 text-white/60" dark />
            <h1 id="hero-h1-kontakt" className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Renodex kontaktieren – kostenlose Beratung für Ihre Sanierung
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-2xl">
              Zeigen Sie uns Ihr Sanierungsvorhaben digital per Foto, Video oder Sprachnachricht –
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

        {/* Contact Form */}
        <ContactForm phoneNumber={PHONE_NUMBER} />

        {/* Contact Info Cards */}
        <section className="bg-tiefblau/5 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {contactInfo.map((info, index) => (
                <Card key={index} data-testid={`contact-info-${index}`}>
                  <CardContent className="p-3 text-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 bg-tiefblau/10">
                      <info.icon className="w-5 h-5 text-marine" />
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

        {/* Service Area Section - Kompakt */}
        <section className="bg-muted/30 py-12 md:py-16">
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
                  <strong>Renodex</strong> · Helmut-Schmidt-Allee 54, 81248 München
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2661.8!2d11.4589!3d48.1627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e761c6b7b2c1d%3A0x0!2sHelmut-Schmidt-Allee%2054%2C%2081248%20M%C3%BCnchen!5e0!3m2!1sde!2sde!4v1701000000000"
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
        <section className="bg-muted/30 py-12 md:py-16">
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
        <section className="bg-muted/20 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-6 text-center" data-testid="heading-kontakt-links">Mehr über Renodex</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/leistungen">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Target className="w-5 h-5 text-marine shrink-0 mt-0.5" />
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
                    <FileText className="w-5 h-5 text-marine shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-preise">FAQ &amp; Preise</h3>
                      <p className="text-xs text-muted-foreground mt-1">Festpreis nach Besichtigung</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/ueber-uns">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Users className="w-5 h-5 text-marine shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-partnernetzwerk">Partnernetzwerk in München</h3>
                      <p className="text-xs text-muted-foreground mt-1">Fachfirmen, koordiniert aus einer Hand</p>
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
          Hinweis zum Vertragsschluss: Inhalte und Preisangaben dieser Website sind kein verbindliches Angebot. Über die Website wird kein Vertrag geschlossen. Nach Ihrer Anfrage mit Angaben und Fotos besichtigt Renodex das Objekt; die Besichtigung ist kostenlos und unverbindlich. Danach erhalten Sie ein schriftliches Festpreisangebot. Es nennt Ihren Vertragspartner für die Bauarbeiten: Renodex als Generalunternehmer oder die ausführende Fachfirma. Der Vertrag kommt erst zustande, wenn Sie dieses Angebot ausdrücklich annehmen. Über die Website erfolgen keine Bestellung, keine Buchung und keine Zahlung.
        </p>
      </div>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
