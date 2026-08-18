import { Phone, Mail, MapPin, Clock, Star, Award, Shield, ThumbsUp, Zap, CheckCircle, Send, MessageSquare, Navigation, Calendar, Users, FileText, Heart, Target } from "lucide-react";
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
import heroImage from "@assets/generated_images/roofer_consulting_customer.png";

const PHONE_NUMBER = "[Telefon folgt]";
const EMAIL = "info@renodex.de";
const pageData = mainPagesKeywords.kontakt;

const contactInfo = [
  {
    icon: Phone,
    title: "Dachdecker München Telefon",
    primary: PHONE_NUMBER,
    secondary: "Dachdecker Hotline München 24/7",
    action: `tel:${PHONE_NUMBER.replace(/\s/g, "")}`,
    urgent: true
  },
  {
    icon: Mail,
    title: "Dachdecker München E-Mail",
    primary: EMAIL,
    secondary: "Dachdecker Anfrage München – Antwort in 24h",
    action: `mailto:${EMAIL}`,
    urgent: false
  },
  {
    icon: MapPin,
    title: "Dachdecker Standort München",
    primary: "[Adresse folgt]",
    secondary: "Dachdecker München Obermenzing",
    action: null,
    urgent: false
  },
  {
    icon: Clock,
    title: "Dachdecker Öffnungszeiten München",
    primary: "Mo-Fr: 8:00 - 16:30",
    secondary: "Dachdecker Sofort-Hilfe München 24/7",
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
  "Kostenlose Dachdecker Beratung München vor Ort",
  "Dachdecker Angebot München mit Festpreisgarantie",
  "Dachdecker München schnelle Antwort in 24 Stunden",
  "Persönliche Betreuung durch den Meister"
];

const trustBadges = [
  { icon: Award, text: "Partnernetzwerk in München" },
  { icon: Star, text: "25+ Jahre Dachdecker Erfahrung" },
  { icon: ThumbsUp, text: "100+ zufriedene Dachdecker Kunden München" },
  { icon: Shield, text: "Dachdecker München Festpreisgarantie" },
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
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb items={SERVICE_BREADCRUMBS["/kontakt"]} />
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
                  <Zap className="w-3 h-3 text-yellow-400" />
                  Antwort in 24 Stunden garantiert
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">
                  Dachdecker München Kontakt – Angebot in 24 Stunden
                </h1>
                <p className="text-zinc-600 text-sm md:text-base mb-4">
                  <strong className="text-white">Dachdecker München kontaktieren</strong>: 
                  <strong className="text-white"> Kostenlose Beratung</strong>, <strong className="text-white">Dachdecker Angebot</strong> in 24h. 
                  <strong className="text-white"> Anfrage online</strong> oder <strong className="text-white">Hotline</strong> anrufen.
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
              <div className="hidden lg:grid grid-cols-2 gap-3">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-md p-3 text-center">
                    <info.icon className={`w-5 h-5 mx-auto mb-1 ${info.urgent ? "text-yellow-400" : "text-white"}`} />
                    <p className="text-white font-medium text-sm">{info.primary}</p>
                    <p className="text-zinc-600 text-xs">{info.secondary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Contact Info */}
        <section className="py-4 bg-primary/5 lg:hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 gap-3">
              {contactInfo.map((info, index) => (
                <Card key={index} className={info.urgent ? "border-destructive" : ""} data-testid={`contact-info-${index}`}>
                  <CardContent className="p-3 text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${info.urgent ? "bg-destructive/10" : "bg-primary/10"}`}>
                      <info.icon className={`w-5 h-5 ${info.urgent ? "text-destructive" : "text-primary"}`} />
                    </div>
                    <h2 className="font-semibold text-xs" data-testid={`heading-contact-info-${index}`}>{info.title}</h2>
                    {info.action ? (
                      <a href={info.action} className="text-primary font-medium text-sm block" data-testid={`link-contact-${info.title.toLowerCase().replace(/\s/g, "-")}`}>
                        {info.primary}
                      </a>
                    ) : (
                      <p className="font-medium text-sm">{info.primary}</p>
                    )}
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
                  Dachdecker Angebot München – Kostenlose Beratung in 24h
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Sie suchen einen zuverlässigen <strong>Dachdecker München</strong>? Bei uns bekommen Sie keine 
                  leeren Versprechungen, sondern <strong>Dachdecker München schnelle Antwort</strong> in 24 Stunden. 
                  Fordern Sie jetzt Ihr kostenloses <strong>Dachdecker Angebot München</strong> an – mit 
                  <strong> Dachdecker Festpreis München</strong> Garantie.
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
                  <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                    <Button className="w-full sm:w-auto gap-2" size="lg" data-testid="button-kontakt-call-main">
                      <Phone className="w-5 h-5" />
                      Dachdecker München anrufen
                    </Button>
                  </a>
                  <a href={`mailto:${EMAIL}`}>
                    <Button variant="outline" className="w-full sm:w-auto gap-2" size="lg" data-testid="button-kontakt-email">
                      <Mail className="w-5 h-5" />
                      Dachdecker E-Mail München
                    </Button>
                  </a>
                </div>
              </div>
              
              <div>
                <Card className="bg-destructive/5 border-destructive">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3 flex items-center gap-2 text-destructive" data-testid="heading-kontakt-emergency">
                      <Zap className="w-5 h-5" />
                      Dachdecker Sofort-Hilfe München 24/7
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      <strong className="text-foreground">Dachdecker Notfall München</strong>? 
                      Unser <strong className="text-foreground">Dachdecker Sofort-Hilfe München</strong> ist 
                      rund um die Uhr erreichbar – auch nachts und am Wochenende.
                    </p>
                    <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                      <Button variant="destructive" className="w-full gap-2" size="lg" data-testid="button-kontakt-emergency-call">
                        <Phone className="w-5 h-5" />
                        Sofort-Hilfe: {PHONE_NUMBER}
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
              Dachdecker Einsatzgebiet München – Schnell vor Ort im 30 km Radius
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground text-sm mb-3">
                  <strong>Dachdecker Standort München</strong> in Obermenzing – schnelle Einsätze.
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  <strong>Renodex</strong> · [Adresse folgt] · 
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2661.8!2d11.4589!3d48.1627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e761c6b7b2c1d%3A0x0!2s[Adresse folgt]%2020%2C%2081247%20M%C3%BCnchen!5e0!3m2!1sde!2sde!4v1701000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dachdecker Standort München – Renodex"
                  data-testid="google-map-iframe"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Longtail SEO Text Section - Kompakt */}
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center" data-testid="heading-kontakt-seo">
              Dachdecker München kontaktieren – So erreichen Sie uns
            </h2>
            
            <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Sie möchten einen <strong>Dachdecker München kontaktieren</strong>? Die Renodex ist Ihr 
                <strong> Partnernetzwerk in München</strong> mit <strong>Dachdecker Standort München</strong> Obermenzing. 
                Rufen Sie unsere <strong>Dachdecker Hotline München</strong> an oder stellen Sie eine 
                <strong> Dachdecker Anfrage München</strong> online – wir garantieren <strong>Dachdecker München schnelle Antwort</strong> 
                innerhalb von 24 Stunden. Wir wissen, dass die Suche nach einem vertrauenswürdigen Handwerker oft 
                frustrierend sein kann: Termine, die nicht eingehalten werden, Angebote, die nie ankommen, und 
                Telefonate, die im Nichts versickern. Bei uns ist das anders. Wir nehmen jeden Kontakt ernst und 
                melden uns zuverlässig zurück.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Die Kommunikation mit unseren Kunden ist uns besonders wichtig. Ein Dachprojekt – egal ob groß oder 
                klein – ist Vertrauenssache. Sie lassen fremde Menschen an Ihrem Haus arbeiten, oft in Bereichen, 
                die Sie selbst nicht einsehen können. Deshalb setzen wir auf absolute Transparenz: Wir erklären 
                Ihnen verständlich, was gemacht werden muss und warum. Wir erstellen Angebote, die alle Kosten 
                klar aufschlüsseln. Und wir halten Sie während der Arbeiten auf dem Laufenden. Diese offene 
                Kommunikation ist die Basis für die Zufriedenheit, die unsere Kunden immer wieder bestätigen.
              </p>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-kontakt-phone">
                  <Phone className="w-4 h-4 text-primary" />
                  Wie erreiche ich den Dachdecker München telefonisch?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Unser <strong>Dachdecker München Telefon</strong> ist unter <strong>{PHONE_NUMBER}</strong> erreichbar. 
                  Die <strong>Dachdecker Hotline München</strong> ist zu den <strong>Dachdecker Öffnungszeiten München</strong> 
                  (Mo-Fr 8:00-16:30) besetzt. Bei <strong>Dachdecker Notfall München</strong> erreichen Sie unseren 
                  <strong> Dachdecker Sofort-Hilfe München</strong> auch außerhalb der Geschäftszeiten – <strong>24/7</strong>.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Am Telefon nehmen wir uns Zeit für Ihr Anliegen. Egal ob Sie eine grobe Einschätzung benötigen, 
                  einen Besichtigungstermin vereinbaren möchten oder einfach nur eine Frage zu Ihrem Dach haben – 
                  wir sind für Sie da. Unser Büro wird von erfahrenen Mitarbeitern besetzt, die oft schon am 
                  Telefon hilfreiche Tipps geben können.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Für dringende Fälle außerhalb der Bürozeiten ist unser Sofort-Hilfe-Telefon rund um die Uhr erreichbar. 
                  Bitte nutzen Sie diese Nummer nur für echte Notfälle – wenn Wasser eindringt, Ziegel lose sind oder 
                  ein Sturm Schäden verursacht hat. Für reguläre Anfragen sind wir zu den normalen Geschäftszeiten 
                  gerne für Sie da.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-kontakt-quote">
                  <FileText className="w-4 h-4 text-primary" />
                  Wie bekomme ich ein kostenloses Dachdecker Angebot München?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Fordern Sie jetzt Ihr kostenloses <strong>Dachdecker Angebot München</strong> an! 
                  Wir bieten eine <strong>Dachdecker Beratung München</strong> vor Ort – völlig unverbindlich. 
                  Jedes <strong>Dachdecker Angebot München</strong> enthält einen <strong>Dachdecker Festpreis München</strong> 
                  ohne versteckte Kosten. <strong>Dachdecker Termin München</strong> vereinbaren und Beratung sichern!
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Unsere kostenlose Erstberatung findet in der Regel direkt bei Ihnen vor Ort statt. Der Dachdeckermeister 
                  oder ein erfahrener Geselle verschafft sich einen Überblick über Ihr Dach und bespricht mit Ihnen Ihre 
                  Wünsche und Vorstellungen. Oft können wir schon bei diesem Termin eine grobe Einschätzung zu den 
                  Kosten geben. Innerhalb weniger Tage erhalten Sie dann ein detailliertes schriftliches Angebot.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Unser Festpreis-Versprechen bedeutet: Der Preis, den wir Ihnen nennen, ist der Preis, den Sie zahlen. 
                  Keine versteckten Kosten, keine bösen Überraschungen auf der Rechnung. Sollten wir während der 
                  Arbeiten auf unvorhergesehene Probleme stoßen, besprechen wir das sofort mit Ihnen – und erst nach 
                  Ihrer ausdrücklichen Zustimmung werden zusätzliche Leistungen durchgeführt.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-kontakt-coverage">
                  <Navigation className="w-4 h-4 text-primary" />
                  Wohin fährt der Dachdecker? Einsatzgebiet München
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Unser <strong>Dachdecker Einsatzgebiet München</strong> umfasst ganz München und einen 30 km Radius. 
                  Die <strong>Dachdecker Anfahrt München</strong> ist in unserem <strong>Dachdecker Angebot München</strong> 
                  bereits enthalten. Ob <strong>Dachdecker München Zentrum</strong>, Schwabing oder Umland wie Grünwald 
                  und Puchheim – wir kommen zu Ihnen.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Unser Firmensitz in München-Obermenzing ist ideal gelegen, um sowohl die Münchner Innenstadt als 
                  auch das westliche Umland schnell zu erreichen. Über die A8, A99 und A96 sind wir flexibel 
                  unterwegs und können in der Regel innerhalb eines Tages vor Ort sein. Auch weiter entfernte 
                  Außerhalb unseres 25 km Radius können wir nur nach individueller Absprache tätig werden.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Für größere Projekte kommen wir auch gerne außerhalb unseres regulären Einzugsgebiets. Sprechen 
                  Sie uns einfach an – wir finden eine Lösung. Bei Projekten ab einer bestimmten Größe ist die 
                  Anfahrt ohnehin im Gesamtpreis enthalten und fällt nicht zusätzlich ins Gewicht.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-kontakt-online">
                  <Mail className="w-4 h-4 text-primary" />
                  Dachdecker München Anfrage online stellen – So funktioniert's
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Neben dem Telefon bieten wir Ihnen auch die Möglichkeit, uns bequem online zu kontaktieren. 
                  Nutzen Sie unser <strong>Dachdecker Kontaktformular München</strong> auf dieser Seite, um uns 
                  Ihr Anliegen zu schildern. Je mehr Details Sie uns mitteilen, desto schneller können wir 
                  Ihnen helfen: Beschreiben Sie das Problem, fügen Sie gerne Fotos bei und nennen Sie uns 
                  Ihre Wunschtermine für einen Besichtigungstermin.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Alternativ können Sie uns auch eine E-Mail an info@renodex.de senden. Wir bearbeiten alle 
                  Anfragen zeitnah und melden uns in der Regel innerhalb von 24 Stunden bei Ihnen zurück. 
                  Für eilige Anfragen empfehlen wir jedoch den direkten telefonischen Kontakt.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Nutzen Sie unser <strong>Dachdecker Kontaktformular München</strong> oder rufen Sie direkt an. 
                Als <strong>Partnernetzwerk in München</strong> stehen wir für Qualität und 
                <strong> Dachdecker Kundenzufriedenheit München</strong>. <strong>Dachdecker München kontaktieren</strong> 
                war noch nie so einfach! Wir freuen uns darauf, von Ihnen zu hören und Ihr Dach in die 
                besten Hände zu nehmen.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Egal ob Sie eine komplette Dachsanierung planen, einzelne Ziegel austauschen lassen möchten 
                oder einfach nur eine professionelle Einschätzung zum Zustand Ihres Daches benötigen – wir 
                sind der richtige Ansprechpartner. Unsere Erfahrung aus über 25 Jahren im Münchner Dachdeckerhandwerk 
                kommt Ihnen zugute. Vertrauen Sie auf einen Partnernetzwerk, der Qualität liefert und sein 
                Versprechen hält. Kontaktieren Sie uns noch heute!
              </p>
            </div>
          </div>
        </section>

        {/* SEO Keywords Section */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 text-center">
              {pageData.mainKeyword} - Ihr Dachdecker vor Ort
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
            <h2 className="text-xl font-bold mb-6 text-center" data-testid="heading-kontakt-links">Mehr über unseren Dachdecker Service München</h2>
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
                    <Zap className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-notdienst">Dach Sofort-Hilfe München</h3>
                      <p className="text-xs text-muted-foreground mt-1">24/7 Soforthilfe</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/faq">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-preise">Dachdecker Preise München</h3>
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
                      <h3 className="font-medium text-sm" data-testid="heading-link-meisterbetrieb">Partnernetzwerk in München</h3>
                      <p className="text-xs text-muted-foreground mt-1">25 Jahre Erfahrung</p>
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
          Hinweis zum Vertragsabschluss: Die auf dieser Website dargestellten Inhalte, Leistungen und Informationen stellen kein verbindliches Angebot im rechtlichen Sinne dar. Ein Vertragsabschluss über diese Website findet nicht statt. Anfragen über kontaktformulare, E-Mail oder Telefon dienen ausschließlich der unverbindlichen Kontaktaufnahme und der Vorbereitung einer individuellen Angebotserstellung. Ein Vertrag kommt erst nach persönlicher Abstimmung, Besichtigung vor Ort und ausdrücklicher Annahme eines schriftlichen Angebots zustande. Es erfolgt keine kostenpflichtige Bestellung, keine Buchung und keine Online-Zahlung über diese Website.
        </p>
      </div>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
