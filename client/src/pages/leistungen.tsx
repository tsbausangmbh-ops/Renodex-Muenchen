import { Phone, ArrowRight, Star, Award, ThumbsUp, Shield, Check, Clock, Home, Wrench, AlertTriangle, Droplets, Thermometer, Eye, Hammer, Layers, Wind, Sun, PenTool, Gauge, Zap, FileText, Users, Heart, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BackButton from "@/components/BackButton";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb, { SERVICE_BREADCRUMBS } from "@/components/Breadcrumb";
import ServiceDistrictLinks from "@/components/ServiceDistrictLinks";
import { mainPagesKeywords } from "@/content/mainPages";
import heroImage from "@assets/generated_images/roofer_on_tiled_roof.png";

const PHONE_NUMBER = "[Telefon folgt]";
const pageData = mainPagesKeywords.leistungen;

const mainServices = [
  {
    id: "dachsanierung",
    icon: Home,
    title: "Dach erneuern München",
    description: "Komplette Dacherneuerung vom Partnernetzwerk – von der Dacheindeckung bis zur Wärmedämmung. Wir erneuern Steildächer und Flachdächer fachgerecht mit Festpreisgarantie.",
    features: ["Steildach & Flachdach Sanierung", "Energetische Dachsanierung mit Förderung", "Dachziegel & Dacheindeckung erneuern", "Dachdämmung nach aktuellem Standard"]
  },
  {
    id: "dachreparatur",
    icon: Wrench,
    title: "Dachreparatur München",
    description: "Schnelle Dachreparatur bei undichtem Dach, kaputten Ziegeln oder Sturmschäden. Unser Dachdecker München Team ist innerhalb 24h vor Ort.",
    features: ["Dach undicht? Sofortige Abdichtung", "Sturmschaden Dach schnell reparieren", "Einzelne Dachziegel austauschen", "Flachdach Reparatur & Abdichtung"]
  },
  {
    id: "spenglerei",
    icon: Layers,
    title: "Spengler München",
    description: "Professionelle Spenglerarbeiten: Dachrinnen, Fallrohre, Kaminverkleidung und Gaubenverkleidung in Zink, Kupfer oder Aluminium.",
    features: ["Dachrinnen München – Montage & Reparatur", "Fallrohre & Entwässerungssysteme", "Kaminverkleidung & Gaubenverkleidung", "Blechdach & Blecharbeiten"]
  },
  {
    id: "dachfenster",
    icon: Sun,
    title: "Dachfenster München",
    description: "Dachfenster einbauen, austauschen oder reparieren. Einbau von Velux- und Roto-Dachfenstern für mehr Licht und Luft unterm Dach.",
    features: ["Dachfenster Einbau & Austausch", "Velux Dachfenster München", "Dachfenster Reparatur & Wartung", "Sonnenschutz & Rollladen"]
  },
  {
    id: "daemmung",
    icon: Thermometer,
    title: "Dachdämmung München",
    description: "Energetische Dachsanierung mit professioneller Wärmedämmung. Bis zu 30% Heizkosten sparen und KfW/BAFA-Förderung nutzen.",
    features: ["Wärmedämmung Dach nach EnEV", "Aufsparren- & Zwischensparrendämmung", "Energetische Dachsanierung München", "Förderberatung KfW & BAFA"]
  },
  {
    id: "dachinspektion",
    icon: Eye,
    title: "Dachinspektion München",
    description: "Professioneller Dachcheck vom Meister. Wir prüfen Ihr Dach auf Schäden, Schwachstellen und erstellen einen detaillierten Zustandsbericht.",
    features: ["Dachcheck & Zustandsbericht", "Schadensanalyse & Dokumentation", "Wartungsempfehlungen vom Meister", "Kostenlose Ersteinschätzung"]
  },
];

const trustBadges = [
  { icon: Award, text: "Partnernetzwerk Dachdecker München" },
  { icon: Star, text: "25+ Jahre Erfahrung" },
  { icon: ThumbsUp, text: "100+ zufriedene Kunden" },
  { icon: Shield, text: "Festpreis Dacharbeiten München" },
];

const stats = [
  { value: "24/7", label: "Sofort-Hilfe Dach München", subtext: "Auch nachts & am Wochenende" },
  { value: "25+", label: "Jahre Meistererfahrung", subtext: "Dacharbeiten München seit 1998" },
  { value: "100+", label: "Zufriedene Kunden", subtext: "Dachdecker München Bewertungen" },
];

export default function Leistungen() {
  useSEO({
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    canonical: "https://renodex.de/leistungen",
    keywords: `${pageData.mainKeyword}, ${pageData.secondaryKeywords.slice(0, 15).join(", ")}`,
    geoRegion: "DE-BY",
    geoPlacename: "München"
  });

  const scrollToContact = () => {
    window.location.href = "/#kontakt";
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-leistungen">
      <Header phoneNumber={PHONE_NUMBER} />
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb items={SERVICE_BREADCRUMBS["/leistungen"]} />
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
                  <Star className="w-3 h-3 text-yellow-400" />
                  Partnernetzwerk mit Festpreisgarantie
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">
                  Dacharbeiten München – Professionell, Schnell & mit Festpreis
                </h1>
                <p className="text-zinc-600 text-sm md:text-base mb-4">
                      <strong className="text-white">Professionelle Dacharbeiten München</strong>:
        <Link href="/dachsanierung-kosten"><strong className="text-white">Dachsanierung Kosten</strong></Link>,
        <Link href="/dach-reparieren"><strong className="text-white">Dachreparatur München</strong></Link>,
        <strong className="text-white">Spengler</strong>,
        <strong className="text-white">Dachfenster</strong>,
        <strong className="text-white">Dachdämmung</strong>,
        <Link href="/notdienst"><strong className="text-white">24h Dach Sofort-Hilfe</strong></Link> – komplette Dacharbeiten mit Meisterqualität.
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
              <div className="hidden lg:grid grid-cols-3 gap-3">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-md p-3 text-center" data-testid={`stat-${index}`}>
                    <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
                    <div className="text-xs text-zinc-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Stats */}
        <section className="py-4 bg-primary/5 lg:hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, index) => (
                <div key={index} className="text-center" data-testid={`stat-mobile-${index}`}>
                  <div className="text-xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BackButton />

        {/* Main Services Section - Kompakt */}
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            {/* Prominente Übersichts-Box */}
            <div className="bg-zinc-800 text-white rounded-md p-6 mb-6" data-testid="box-dacharbeiten-overview">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center">
                    <Hammer className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl md:text-2xl font-bold mb-2" data-testid="heading-leistungen-overview">
                    Professionelle Dacharbeiten München – Komplettservice vom Meister
                  </h2>
                  <p className="text-zinc-600 text-sm md:text-base">
                    <strong className="text-white">Dachdecker München</strong>: Alle <strong className="text-white">Dacharbeiten</strong> aus einer Hand – 
                    <strong className="text-white"> Dachsanierung</strong>, <strong className="text-white">Dachreparatur</strong>, <strong className="text-white">Spengler-Arbeiten</strong>.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button onClick={scrollToContact} size="lg" className="bg-primary text-white gap-2 font-bold" data-testid="button-overview-cta">
                    <Phone className="w-5 h-5" />
                    Jetzt anfragen
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {mainServices.map((service) => (
                <Card key={service.id} id={service.id} className="overflow-visible" data-testid={`service-${service.id}`}>
                  <CardContent className="p-3">
                    <div className="flex flex-col items-center text-center mb-2">
                      <div className="w-10 h-10 rounded-md flex items-center justify-center shrink-0 bg-primary/10 mb-2">
                        <service.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-bold text-xs leading-tight" data-testid={`heading-service-${service.id}`}>{service.title}</h3>
                    </div>
                    <ul className="space-y-0.5 mb-2">
                      {service.features.slice(0, 2).map((feature, i) => (
                        <li key={i} className="flex items-start gap-1 text-[10px] text-muted-foreground">
                          <Check className="w-2.5 h-2.5 text-green-600 mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button onClick={scrollToContact} variant="outline" size="sm" className="w-full gap-1 text-[10px] h-7" data-testid={`button-service-${service.id}`}>
                      Anfragen
                      <ArrowRight className="w-2.5 h-2.5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sofort-Hilfe Box - Kompakt */}
            <div className="mt-6 bg-zinc-800 rounded-md p-4 text-white" data-testid="box-notdienst">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-destructive" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2" data-testid="heading-leistungen-notdienst">Dach Sofort-Hilfe München – 24/7 erreichbar</h3>
                  <p className="text-zinc-600 text-sm mb-3">
                    <strong className="text-white">Sturmschaden</strong>, <strong className="text-white">undichtes Dach</strong> oder <strong className="text-white">Wasserschaden</strong>? 
                    Unser <strong className="text-white">Dachdecker Sofort-Hilfe München</strong> ist rund um die Uhr für Sie da – auch nachts und am Wochenende.
                  </p>
                  <ul className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-zinc-600">
                    <li className="flex items-center gap-1">
                      <Check className="w-4 h-4 text-green-400" />
                      Innerhalb 24h vor Ort
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="w-4 h-4 text-green-400" />
                      Versicherungsabwicklung
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="w-4 h-4 text-green-400" />
                      Sofort-Reparatur
                    </li>
                  </ul>
                </div>
                <div className="flex-shrink-0">
                  <a href="tel:00000000000">
                    <Button variant="destructive" size="lg" className="gap-2" data-testid="button-notdienst-call">
                      <Phone className="w-5 h-5" />
                      [Telefon folgt]
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Longtail SEO Text Section - Kompakt */}
        <section className="py-6 md:py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center" data-testid="heading-leistungen-why">
              Schnelle Dacharbeiten München – Warum wir die richtige Wahl sind
            </h2>
            
            <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Suchen Sie einen zuverlässigen <strong>Dachdecker München</strong> für professionelle <strong>Dacharbeiten</strong>? 
                Die Renodex ist Ihr <strong>Partnernetzwerk Dachdecker München</strong> mit über 25 Jahren Erfahrung. 
                Wir führen alle <strong>Dacharbeiten München</strong> fachgerecht aus – von der kompletten{" "}
                <Link href="/dachsanierung-kosten" className="text-primary font-semibold hover:text-primary/80" data-testid="link-context-sanierung-kosten">Dachsanierung München</Link>{" "}
                über eine schnelle{" "}
                <Link href="/dach-reparieren" className="text-primary font-semibold hover:text-primary/80" data-testid="link-context-reparatur">Dachreparatur vom Partnernetzwerk</Link>{" "}
                bis hin zu präzisen <strong>Spengler München</strong> Arbeiten. 
                Als eingetragener Handwerksbetrieb mit Meisterbrief garantieren wir höchste Qualität bei allen Dachprojekten in der 
                bayerischen Landeshauptstadt und dem gesamten Münchner Umland. Unser erfahrenes Team aus qualifizierten Dachdeckergesellen 
                und dem Dachdeckermeister persönlich sorgt dafür, dass Ihr Dach in den besten Händen ist.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Die Wahl des richtigen <strong>Dachdeckers in München</strong> ist entscheidend für die Langlebigkeit und Sicherheit 
                Ihres Daches. Bei akuten Schäden bieten wir eine{" "}
                <Link href="/dach-reparieren" className="text-primary font-semibold hover:text-primary/80" data-testid="link-context-reparatur2">schnelle Dachreparatur in München</Link>{" "}
                an. Als Familienunternehmen legen wir besonderen Wert auf persönliche Beratung, transparente Preisgestaltung 
                und handwerkliche Perfektion. Ob historisches Altbaudach in{" "}
                <Link href="/bezirk/schwabing" className="text-primary font-semibold hover:text-primary/80" data-testid="link-context-schwabing">Schwabing</Link>, modernes Flachdach in{" "}
                <Link href="/bezirk/bogenhausen" className="text-primary font-semibold hover:text-primary/80" data-testid="link-context-bogenhausen">Bogenhausen</Link>{" "}oder 
                klassisches Satteldach in{" "}
                <Link href="/bezirk/pasing" className="text-primary font-semibold hover:text-primary/80" data-testid="link-context-pasing">Pasing</Link>{" "}– wir kennen die architektonischen Besonderheiten Münchens und passen unsere 
                <strong> Dacharbeiten</strong> perfekt an Ihre Immobilie an.
              </p>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-leistungen-sanierung">
                  <Home className="w-4 h-4 text-primary" />
                  Wann lohnt sich eine Dachsanierung in München?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Eine <strong>Dachsanierung München</strong> ist eine Investition in die Zukunft Ihres Hauses. 
                  Ob <strong>Steildach München</strong> oder <strong>Flachdach München</strong> – wir sanieren Ihr Dach fachgerecht 
                  mit hochwertigen <strong>Dachziegeln München</strong> und moderner <strong>Dacheindeckung</strong>. 
                  Bei einer <strong>energetischen Dachsanierung München</strong> kombinieren wir die Neueindeckung mit 
                  professioneller <strong>Dachdämmung München</strong> und <strong>Wärmedämmung Dach</strong>. 
                  So sparen Sie bis zu 30% Heizkosten und können <strong>KfW/BAFA-Förderung</strong> nutzen. Erfahren Sie mehr über{" "}
                  <Link href="/dachsanierung-kosten" className="text-primary font-semibold hover:text-primary/80" data-testid="link-context-sanierung-kosten2">Dachsanierung Kosten in München</Link>.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Bei der Dachsanierung beginnen wir immer mit einer gründlichen Bestandsaufnahme. Unser Dachdeckermeister 
                  inspiziert persönlich den Dachstuhl, die Lattung, die vorhandene Dämmung und natürlich die Eindeckung. 
                  Basierend auf dieser Analyse erstellen wir ein detailliertes Sanierungskonzept, das genau auf Ihre Bedürfnisse 
                  und Ihr Budget abgestimmt ist. Dabei berücksichtigen wir auch energetische Aspekte: Eine gut gedämmte 
                  Dachsanierung kann den Energieverbrauch Ihres Hauses drastisch senken und den Wohnkomfort erheblich steigern.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Wir arbeiten mit renommierten Herstellern wie Braas, Erlus und Wienerberger zusammen und bieten eine breite 
                  Palette an Dachziegeln und Dachsteinen. Von klassischen Tondachziegeln über moderne Betondachsteine bis hin zu 
                  edlem Naturschiefer – bei uns finden Sie die perfekte Lösung für Ihre <strong>Dacheindeckung in München</strong>. 
                  Jede Sanierung wird mit Festpreisgarantie durchgeführt, sodass Sie von Anfang an wissen, was Sie investieren.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-leistungen-undicht">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  Dach undicht München? So reparieren wir schnell & zuverlässig
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  <Link href="/dach-undicht" className="text-primary font-semibold hover:text-primary/80" data-testid="link-context-undicht">Dach undicht München</Link>? Unser{" "}
                  <Link href="/notdienst" className="text-primary font-semibold hover:text-primary/80" data-testid="link-context-notdienst">24h Dachnotdienst</Link>{" "}ist sofort für Sie im Einsatz! 
                  Bei{" "}<Link href="/sturmschaden" className="text-primary font-semibold hover:text-primary/80" data-testid="link-context-sturm">Sturmschaden am Dach</Link>{" "}sind wir innerhalb von 24 Stunden vor Ort. 
                  Unsere <strong>Dachreparatur München</strong> umfasst alle Arbeiten: Von der Abdichtung bei 
                  undichtem Dach über den Austausch beschädigter <strong>Dachziegel</strong> bis zur 
                  kompletten <strong>Flachdach</strong> Reparatur. Als <strong>Dachdecker München</strong> mit 
                  <strong> Festpreis Dacharbeiten München</strong> wissen Sie vorab, was Sie zahlen.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Kleine Schäden am Dach können schnell zu großen Problemen werden. Ein einzelner verschobener Dachziegel 
                  oder eine undichte Stelle an der Firstkappe kann bei Regen zu Wassereintritt führen, der wiederum 
                  Schimmelbildung, Holzfäule am Dachstuhl und teure Folgeschäden verursacht. Deshalb reagieren wir bei 
                  Notfällen besonders schnell. Unser Sofort-Hilfe-Team ist rund um die Uhr erreichbar und kann in den 
                  meisten Fällen noch am selben oder nächsten Tag vor Ort sein, um eine Notsicherung durchzuführen.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Nach Stürmen wie Sabine oder anderen Unwetterereignissen ist die Nachfrage nach Dachreparaturen in 
                  München besonders hoch. Als etablierter Partnernetzwerk haben wir die Kapazitäten, auch in Stoßzeiten 
                  schnell zu reagieren. Wir dokumentieren alle Schäden sorgfältig für die Versicherungsabwicklung und 
                  unterstützen Sie bei der Kommunikation mit Ihrer Gebäudeversicherung. Viele unserer Kunden schätzen 
                  diesen Rundum-Service, der ihnen in einer stressigen Situation viel Arbeit abnimmt.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-leistungen-spengler">
                  <Layers className="w-4 h-4 text-primary" />
                  Was macht ein Spengler München? Dachrinnen & Blecharbeiten erklärt
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Unser <strong>Spengler München</strong> Team fertigt und montiert <strong>Dachrinnen München</strong>, 
                  <strong> Fallrohre München</strong> und alle <strong>Blechdach</strong> Arbeiten. 
                  Ob <strong>Kaminverkleidung</strong> oder <strong>Gaubenverkleidung</strong> – wir arbeiten mit 
                  Zink, Kupfer und Aluminium in Meisterqualität. Eine regelmäßige <strong>Dachrinnenreinigung München</strong> 
                  und <strong>Dachpflege München</strong> schützt Ihr Haus vor Wasserschäden.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Die Spenglerarbeit ist ein traditionelles Handwerk, das höchste Präzision und Erfahrung erfordert. 
                  Unsere Spengler fertigen Rinnen, Fallrohre und Verkleidungen oft noch nach Maß direkt auf der Baustelle. 
                  Diese handwerkliche Tradition garantiert perfekte Passformen und eine lange Lebensdauer. Besonders bei 
                  Altbauten mit ihren oft unregelmäßigen Maßen ist diese Flexibilität unersetzlich.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Bei der Materialwahl beraten wir Sie umfassend: Titanzink ist der Klassiker – robust, langlebig und 
                  mit seiner charakteristischen Patina besonders schön. Kupfer entwickelt über die Jahre eine edle grüne 
                  Patina und ist nahezu unbegrenzt haltbar. Aluminium ist leichter und korrosionsbeständig, ideal für 
                  moderne Architektur. Egal für welches Material Sie sich entscheiden – wir verarbeiten es mit der 
                  Sorgfalt und Präzision, die Sie von einem Münchner Partnernetzwerk erwarten dürfen.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-leistungen-dachfenster">
                  <Sun className="w-4 h-4 text-primary" />
                  Dachfenster einbauen lassen – Was kostet das in München?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  <strong>Dachfenster München</strong> bringen Licht und Luft unterm Dach. Wir sind auf Velux- und Roto-Dachfenster spezialisiert 
                  und bauen <strong>Dachfenster</strong> fachgerecht ein, tauschen sie aus oder reparieren sie. 
                  Die regelmäßige <strong>Dachpflege München</strong> und Wartung spart langfristig teure Reparaturen.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Ein Dachgeschoss ohne ausreichend natürliches Licht ist kein angenehmer Wohnraum. Moderne Dachfenster 
                  von Velux bieten nicht nur hervorragende Lichteinstrahlung, sondern auch effektive Wärmedämmung und 
                  Schallschutz. Mit elektrischen Rollläden und Sonnenschutz-Markisen lässt sich das Raumklima optimal 
                  regulieren. Wir beraten Sie gerne, welche Fenstergröße und Ausstattung für Ihre Raumsituation ideal ist.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Ob Austausch alter Fenster, Einbau von Schwingfenstern oder Klapp-Schwingfenstern – wir finden 
                  die optimale Lösung für Ihren Dachraum. Velux-Dachfenster überzeugen durch höchste Qualität und 
                  langjährige Garantie. Mit Zusatzausstattungen wie Insektenschutz, Verdunkelungsrollos oder 
                  smarter Steuerung wird Ihr Dachgeschoss zum perfekten Wohnraum.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-leistungen-daemmung">
                  <Thermometer className="w-4 h-4 text-primary" />
                  Dachdämmung & Energetische Sanierung München
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Die <strong>Dachdämmung München</strong> ist einer der effektivsten Wege, Energie zu sparen und das 
                  Wohnklima zu verbessern. Über ein ungedämmtes Dach entweicht bis zu 30% der Heizenergie – das ist 
                  nicht nur teuer, sondern auch schlecht für die Umwelt. Mit einer professionellen Wärmedämmung 
                  reduzieren Sie Ihre Heizkosten dauerhaft und steigern gleichzeitig den Wert Ihrer Immobilie.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Wir bieten verschiedene Dämmvarianten an: Die Aufsparrendämmung ist die effektivste Lösung und wird 
                  bei Neueindeckungen durchgeführt. Die Zwischensparrendämmung ist ideal, wenn die Dacheindeckung noch 
                  intakt ist. Die Untersparrendämmung kann auch bei bewohnten Dachgeschossen ohne große Einschränkungen 
                  installiert werden. Gemeinsam finden wir die optimale Lösung für Ihre Situation und Ihr Budget.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Aktuell gibt es attraktive Förderprogramme für energetische Sanierungen. Die KfW-Bank und das BAFA 
                  bieten Zuschüsse und zinsgünstige Kredite, die eine Dachdämmung noch wirtschaftlicher machen. Als 
                  zertifizierter Fachbetrieb beraten wir Sie umfassend zu den Fördermöglichkeiten und unterstützen Sie 
                  bei der Antragstellung. Viele unserer Kunden konnten so 15-20% der Investitionskosten durch Förderung 
                  decken – eine Ersparnis, die den Unterschied machen kann.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Als <strong>Partnernetzwerk Dachdecker München</strong> stehen wir für Qualität, Zuverlässigkeit 
                und faire <strong>Festpreis Dacharbeiten München</strong>. Ob kleine <strong>Dachreparatur</strong> oder 
                große <strong>Dachsanierung</strong> – bei uns bekommen Sie alle <strong>Dacharbeiten München</strong> 
                aus einer Hand. Unser Einzugsgebiet umfasst ganz München und das Umland: Von Schwabing über Bogenhausen 
                und Haidhausen bis nach Pasing, Obermenzing und Allach. Auch in Germering, Gröbenzell, Puchheim, Olching und Grünwald sind wir regelmäßig im Einsatz. Kontaktieren Sie uns für eine kostenlose Beratung – 
                wir freuen uns darauf, auch Ihr Dach in die besten Hände zu nehmen!
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Die Entscheidung für einen Dachdecker sollte wohlüberlegt sein. Bei Renodex erhalten Sie nicht nur 
                handwerkliche Perfektion, sondern auch echte Partnerschaft. Wir nehmen uns Zeit für Ihre Fragen, 
                erklären jeden Arbeitsschritt verständlich und halten Sie über den Fortschritt auf dem Laufenden. 
                Nach Abschluss der Arbeiten erfolgt eine gemeinsame Abnahme, bei der wir Ihnen alles zeigen und 
                erläutern. Diese Transparenz und Kundenorientierung hat uns über die Jahre viele treue Stammkunden 
                und zahlreiche Weiterempfehlungen eingebracht. Werden auch Sie Teil unserer zufriedenen Kundenfamilie!
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - Kompakt */}
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center" data-testid="heading-leistungen-benefits">
              Warum Renodex für Ihre Dacharbeiten München?
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm mb-1" data-testid="heading-leistungen-benefit-meister">Partnernetzwerk in München</h3>
                  <p className="text-xs text-muted-foreground">
                    25+ Jahre Erfahrung
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm mb-1" data-testid="heading-leistungen-benefit-festpreis">Festpreisgarantie München</h3>
                  <p className="text-xs text-muted-foreground">
                    Keine versteckten Kosten
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm mb-1" data-testid="heading-leistungen-benefit-notdienst">24/7 Sofort-Hilfe München</h3>
                  <p className="text-xs text-muted-foreground">
                    Immer erreichbar
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm mb-1" data-testid="heading-leistungen-benefit-garantie">Garantie</h3>
                  <p className="text-xs text-muted-foreground">
                    Qualität, die hält
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SEO Keywords Section */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 text-center">
              {pageData.mainKeyword} - Alle Leistungen
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

        <ServiceDistrictLinks serviceName="Dachdecker" serviceSlug="leistungen" />

        {/* Internal Links Section - Kompakt */}
        <section className="py-6 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-lg font-bold mb-4 text-center" data-testid="heading-leistungen-links">Weitere Informationen zu Dacharbeiten München</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/notdienst">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-notdienst">Dach Sofort-Hilfe München</h3>
                      <p className="text-xs text-muted-foreground mt-1">24/7 Sturmschaden Soforthilfe</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/faq">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-preise">Dachdecker Preise München</h3>
                      <p className="text-xs text-muted-foreground mt-1">Transparente Festpreise 2025</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/ratgeber">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Target className="w-5 h-5 text-primary shrink-0 mt-0.5" />
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
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
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
