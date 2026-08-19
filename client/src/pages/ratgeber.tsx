import { Phone, Star, Award, Shield, ThumbsUp, BookOpen, Lightbulb, AlertTriangle, CheckCircle, Wrench, Calendar, Sun, Cloud, Snowflake, Leaf, Droplets, Thermometer, Home, Eye, FileText, Target, MessageCircle, HelpCircle, ArrowRight, Zap } from "lucide-react";
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
import { mainPagesKeywords } from "@/content/mainPages";

const PHONE_NUMBER = "[Telefon folgt]";
const pageData = mainPagesKeywords.ratgeber;

const seasonalTips = [
  {
    season: "Frühling",
    icon: Leaf,
    title: "Frühjahrscheck für Haus und Wohnung",
    description: "Nach dem Winter lohnt sich ein Rundgang durch Haus oder Wohnung – kleine Mängel jetzt zu erkennen erspart später größere Arbeiten.",
    tips: [
      "Heizung auf Wartungsbedarf prüfen",
      "Fenster und Dichtungen kontrollieren",
      "Fassade auf Feuchtigkeit und Risse prüfen",
      "Elektroinstallation vor Sommer checken lassen"
    ],
    color: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
  },
  {
    season: "Sommer",
    icon: Sun,
    title: "Sommertipps für Ihre Sanierung",
    description: "Trockenes Wetter und lange Tage sind die beste Zeit für Sanierung und Renovierung – Handwerker sind gut planbar.",
    tips: [
      "Ideale Zeit für Komplettsanierung planen",
      "Photovoltaik-Installation prüfen lassen",
      "Malerarbeiten und Fassade angehen",
      "Bodenverlegung bei trockenem Klima"
    ],
    color: "bg-zinc-50 dark:bg-zinc-950/20 border-zinc-200 dark:border-zinc-800"
  },
  {
    season: "Herbst",
    icon: Cloud,
    title: "Herbstcheck vor dem Winter",
    description: "Vor dem Winter Haus und Wohnung winterfest machen – schützt vor teuren Folgeschäden in der kalten Jahreszeit.",
    tips: [
      "Heizung rechtzeitig warten lassen",
      "Mauerwerksabdichtung vor Herbstregen prüfen",
      "Fenster und Türen auf Zugluft kontrollieren",
      "Wärmepumpe auf die kalte Jahreszeit vorbereiten"
    ],
    color: "bg-zinc-50 dark:bg-zinc-950/20 border-zinc-200 dark:border-zinc-800"
  },
  {
    season: "Winter",
    icon: Snowflake,
    title: "Wohnkomfort im Winter",
    description: "Kälte und Feuchtigkeit stellen Haus und Wohnung auf die Probe. Bei Problemen: digitale Anfrage über unser Kontaktformular.",
    tips: [
      "Heizkosten im Blick behalten",
      "Feuchte Wände frühzeitig erkennen",
      "Bei Rohrbruch oder Wasserschaden sofort handeln",
      "Elektroinstallation bei erhöhter Heizlast prüfen"
    ],
    color: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
  }
];

const mainTopics = [
  {
    id: "wartung",
    icon: Wrench,
    title: "Wartung und Pflege im Ratgeber",
    subtitle: "So bleibt Ihr Zuhause in Schuss",
    content: "Regelmäßige Wartung von Heizung, Sanitär und Elektroinstallation verlängert die Lebensdauer der Technik um Jahrzehnte. Unser Ratgeber zeigt: vorausschauende Pflege ist günstiger als spätere Reparaturen.",
    keyTips: [
      "Heizung 1x jährlich warten lassen",
      "Sanitäranlagen regelmäßig prüfen lassen",
      "Elektroinstallation vom Fachmann kontrollieren",
      "Wartung ist Werterhalt für Ihre Immobilie"
    ]
  },
  {
    id: "sanierung",
    icon: Home,
    title: "Sanierung – wann ist es Zeit?",
    subtitle: "Wann sich eine Komplettsanierung lohnt",
    content: "Bei veralteter Haustechnik, hohen Energiekosten oder anstehenden Modernisierungen lohnt sich eine Komplettsanierung. Unser Ratgeber hilft bei der Entscheidung: eine Sanierung mit Förderung kann bis zu 20 Prozent der Kosten sparen.",
    keyTips: [
      "Immobilie älter als 30 Jahre? Sanierung prüfen",
      "Energetische Sanierung mit Förderung",
      "Mit moderner Technik Heizkosten senken",
      "Komplettsanierung mit einem Partnernetzwerk"
    ]
  },
  {
    id: "probleme",
    icon: AlertTriangle,
    title: "Probleme frühzeitig erkennen",
    subtitle: "Warnsignale richtig deuten",
    content: "Typische Probleme in Haus oder Wohnung früh erkennen: Feuchte Wände, veraltete Elektrik, tropfende Leitungen. Schnelles Handeln verhindert teure Folgeschäden – kontaktieren Sie uns digital, wenn Sie unsicher sind.",
    keyTips: [
      "Feuchte Wände – sofort abklären lassen",
      "Alte Elektroinstallation prüfen lassen",
      "Tropfende Leitung? Schnell reagieren",
      "Hohe Heizkosten? Technik prüfen lassen"
    ]
  }
];

const quickTips = [
  { tip: "Heizung 1x jährlich warten", icon: Thermometer },
  { tip: "Nach Umbauten: Elektrocheck", icon: Zap },
  { tip: "Bei Feuchte: Sofort handeln", icon: AlertTriangle },
  { tip: "Sanitäranlagen prüfen lassen", icon: Droplets },
  { tip: "Wärmedämmung kontrollieren", icon: Home },
];

const trustBadges = [
  { icon: Award, text: "Partnernetzwerk in München" },
  { icon: Star, text: "16+ Jahre Erfahrung" },
  { icon: Shield, text: "Festpreise nach Besichtigung" },
];

const faqItems = [
  {
    question: "Wie oft sollte ich meine Haustechnik prüfen lassen?",
    answer: "Wir empfehlen eine regelmäßige Prüfung von Heizung, Sanitär und Elektroinstallation alle 2-3 Jahre. Eine professionelle Erstberatung erkennt kleine Mängel frühzeitig, bevor sie zu größeren Problemen werden."
  },
  {
    question: "Wann lohnt sich eine Komplettsanierung?",
    answer: "Eine Komplettsanierung lohnt sich bei veralteter Haustechnik, hohen Energiekosten oder wenn ohnehin mehrere Gewerke anstehen. Unser Ratgeber hilft bei der Entscheidung – gerne beraten wir Sie dazu."
  },
  {
    question: "Wie läuft die Anfrage bei Renodex ab?",
    answer: "Am einfachsten über unser digitales Kontaktformular: Foto, Video oder kurze Beschreibung genügen für eine erste Einschätzung. Danach melden wir uns mit den nächsten Schritten."
  }
];

export default function Ratgeber() {
  useSEO({
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    canonical: "https://renodex.de/ratgeber",
    keywords: `${pageData.mainKeyword}, ${pageData.secondaryKeywords.slice(0, 15).join(", ")}`,
    geoRegion: "DE-BY",
    geoPlacename: "München"
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-ratgeber">
      <Header phoneNumber={PHONE_NUMBER} />

      <main>
        {/* Hero Section - einheitliches Unterseiten-Muster wie leistungen/thema.tsx, kein Foto (kein verifiziertes Renodex-Bildmaterial vorhanden) */}
        <section
          className="relative bg-zinc-900 py-10 md:py-14 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.78), rgba(24,24,27,0.88)), url(/images/optimized/seite-ratgeber.webp)` }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <Breadcrumb items={SERVICE_BREADCRUMBS["/ratgeber"]} className="mb-4 text-white/60" />
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-3 py-1.5 rounded-full text-xs font-medium mb-4">
              <BookOpen className="w-3 h-3 text-yellow-400" />
              Ratgeber vom Partnernetzwerk
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Ratgeber – Sanierung und Renovierung München
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-2xl">
              Praktische Tipps rund um Komplettsanierung, Renovierung und einzelne Gewerke für Haus und Wohnung in München und Umgebung – von Renodex, Ihrem Partnernetzwerk aus geprüften Meisterfirmen.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-full text-xs text-white">
                  <badge.icon className="w-3 h-3 text-yellow-400" />
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Tips Banner - Kompakt */}
        <section className="py-4 bg-primary/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {quickTips.map((item, index) => (
                <div
                  key={index}
                  className="bg-background rounded-md p-2 text-center border"
                  data-testid={`quick-tip-${index}`}
                >
                  <item.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs font-medium">{item.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BackButton />

        {/* Seasonal Tips Section - Kompakt */}
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-2">
                Wann sollten Sie Ihr Zuhause prüfen lassen?
              </h2>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                Tipps für Haus und Wohnung – passend zur Jahreszeit.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {seasonalTips.map((season, index) => (
                <Card
                  key={index}
                  className={`border ${season.color}`}
                  data-testid={`season-${season.season.toLowerCase()}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                        <season.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">{season.title}</h3>
                        <p className="text-xs text-muted-foreground">{season.season}</p>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {season.tips.slice(0, 3).map((tip, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Topics Section - Kompakt */}
        <section className="py-6 md:py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-2">
                Wartung, Pflege und Sanierung im Überblick
              </h2>
              <p className="text-muted-foreground text-sm">
                Wartung, Modernisierung, Sanierung – Tipps aus unserem Partnernetzwerk.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mainTopics.map((topic, index) => (
                <Card key={index} id={topic.id} data-testid={`topic-${topic.id}`}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <topic.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold mb-1">{topic.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{topic.subtitle}</p>
                        <div className="bg-muted/50 rounded-md p-3">
                          <ul className="grid grid-cols-1 gap-1">
                            {topic.keyTips.slice(0, 3).map((tip, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-xs">
                                <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 shrink-0" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How-To Guides & Checklists Section */}
        <section className="py-8 md:py-12" id="checklisten">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-3">
                <FileText className="w-3 h-3" />
                How-To-Guides & Checklisten
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Praktische Anleitungen für Hausbesitzer
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Vom <strong>Partnernetzwerk in München</strong>: Detaillierte Checklisten und Guides
                für <strong>Komplettsanierung</strong>, <strong>Schadenserkennung</strong> und <strong>Fördermittel</strong>.
              </p>
            </div>

            {/* Checklist 1: Komplettsanierung */}
            <Card className="mb-6" id="checkliste-sanierung" data-testid="guide-sanierung">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Checkliste Komplettsanierung: Von der Planung bis zur Fertigstellung</h3>
                    <p className="text-sm text-muted-foreground">Schritt-für-Schritt-Anleitung für Ihre erfolgreiche Sanierung in München</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      Phase 1: Planung & Vorbereitung
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Kostenlose Erstberatung über das Kontaktformular anfragen",
                        "Zustandsbericht und Sanierungsempfehlung einholen",
                        "Kostenvoranschlag mit Festpreis erhalten",
                        "Energieberatung für Fördermittel-Anspruch prüfen",
                        "KfW/BAFA-Förderanträge VOR Baubeginn stellen",
                        "Zeitfenster mit dem Partnernetzwerk abstimmen"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-primary" />
                      Phase 2: Durchführung & Abnahme
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Gewerke werden aufeinander abgestimmt koordiniert",
                        "Elektro-, Sanitär- und Heizungsarbeiten aus einer Hand",
                        "Bodenverlegung und Malerarbeiten im Anschluss",
                        "Regelmäßige Rücksprache über den Baufortschritt",
                        "Saubere Baustelle während der gesamten Bauzeit",
                        "Abnahme mit Fotodokumentation durchführen"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted/50 rounded-md">
                  <p className="text-xs text-muted-foreground">
                    <strong>Tipp:</strong> Planen Sie eine <strong>Komplettsanierung</strong> mindestens
                    3-6 Monate im Voraus. So sichern Sie sich gute Termine und können alle
                    <strong> Fördermittel</strong> optimal nutzen.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Checklist 2: Eigene Einschätzung */}
            <Card className="mb-6" id="eigene-einschaetzung" data-testid="guide-einschaetzung">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900/30 rounded-md flex items-center justify-center shrink-0">
                    <Eye className="w-6 h-6 text-zinc-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Eigene Einschätzung: So erkennen Sie Sanierungsbedarf</h3>
                    <p className="text-sm text-muted-foreground">Warnsignale erkennen – bevor aus kleinen Problemen große werden</p>
                  </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-800 rounded-md p-3 mb-4">
                  <p className="text-sm text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <strong>Hinweis:</strong> Bei sichtbaren Wasserschäden oder Elektroproblemen: nicht selbst reparieren, sondern fachgerecht prüfen lassen.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 rounded-md p-4">
                    <h4 className="font-semibold mb-3 text-sm">Sichtprüfung Innenräume</h4>
                    <ul className="space-y-2">
                      {[
                        "Feuchte Flecken an Wänden oder Decken",
                        "Risse im Putz oder Mauerwerk",
                        "Abgenutzte oder veraltete Böden",
                        "Zugluft an Fenstern und Türen",
                        "Muffiger Geruch in Kellerräumen",
                        "Sichtbarer Rost an Heizkörpern"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <Eye className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded-md p-4">
                    <h4 className="font-semibold mb-3 text-sm">Anzeichen bei der Haustechnik</h4>
                    <ul className="space-y-2">
                      {[
                        "Heizung wird ungewöhnlich laut",
                        "Wasserdruck spürbar gesunken",
                        "Sicherungen fallen öfter aus",
                        "Steckdosen ohne Erdung (Altbau)",
                        "Ungewöhnlich hohe Energiekosten",
                        "Warmwasser braucht lange"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <Droplets className="w-3 h-3 text-blue-600 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded-md p-4">
                    <h4 className="font-semibold mb-3 text-sm">Außenbereich & Fassade</h4>
                    <ul className="space-y-2">
                      {[
                        "Risse in der Fassade",
                        "Abblätternde Farbe außen",
                        "Feuchtigkeit am Mauerwerk",
                        "Undichte Fenster und Türen",
                        "Schäden an Balkon oder Terrasse",
                        "Fehlende Wärmedämmung sichtbar"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <AlertTriangle className="w-3 h-3 text-zinc-600 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                  <p className="text-xs text-destructive dark:text-red-400">
                    <strong>Bei diesen Anzeichen zeitnah handeln:</strong> Wasserschäden, Elektroprobleme, sichtbare Risse
                    – nutzen Sie unser <strong>digitales Kontaktformular</strong> für eine erste Einschätzung.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Checklist 3: Fördermittel */}
            <Card id="foerdermittel" data-testid="guide-foerdermittel">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-md flex items-center justify-center shrink-0">
                    <Lightbulb className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Fördermittel im Überblick: KfW-Programme und steuerliche Vorteile</h3>
                    <p className="text-sm text-muted-foreground">So finanzieren Sie Ihre Komplettsanierung optimal</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-700 dark:text-green-400">
                      <Award className="w-4 h-4" />
                      KfW-Förderung für Sanierung
                    </h4>
                    <ul className="space-y-2">
                      {[
                        { title: "KfW 261/262 – Einzelmaßnahmen", desc: "Bis zu 15% Tilgungszuschuss" },
                        { title: "KfW 261 – Effizienzhaus-Standard", desc: "Bis zu 45% bei Komplettsanierung" },
                        { title: "KfW 270 – Erneuerbare Energien", desc: "Günstige Kredite für Photovoltaik" },
                        { title: "KfW 159 – Altersgerecht Umbauen", desc: "Barrierefreie Badsanierung" }
                      ].map((item, i) => (
                        <li key={i} className="bg-green-50 dark:bg-green-950/30 p-2 rounded-md">
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400">
                      <FileText className="w-4 h-4" />
                      BAFA & Steuervorteile
                    </h4>
                    <ul className="space-y-2">
                      {[
                        { title: "BAFA – Energieberatung", desc: "Bis 80% Zuschuss für Beratung" },
                        { title: "BAFA – Heizungsförderung", desc: "Bei Umstieg auf Wärmepumpe" },
                        { title: "§35c EStG – Steuerbonus", desc: "20% über 3 Jahre absetzbar" },
                        { title: "Handwerkerleistungen", desc: "20% der Arbeitskosten absetzbar" }
                      ].map((item, i) => (
                        <li key={i} className="bg-blue-50 dark:bg-blue-950/30 p-2 rounded-md">
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-muted/50 rounded-md p-4">
                  <h4 className="font-semibold mb-2 text-sm">Voraussetzungen für Förderung:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      "Antrag VOR Baubeginn stellen",
                      "Energieeffizienz-Experte einbinden",
                      "Technische Anforderungen erfüllen",
                      "Partnernetzwerk mit Qualifikation beauftragen",
                      "Rechnung mit Material- und Lohnkosten",
                      "Technische Dokumentation der Maßnahmen"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Button asChild>
                    <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} data-testid="button-call-foerderung">
                      <Phone className="w-4 h-4 mr-2" />
                      Kostenlose Förderberatung
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/kontakt" data-testid="link-kontakt-foerderung">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Angebot mit Förderprüfung
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Longtail SEO Text Section - Kompakt */}
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
              Ratgeber München – Tipps für Sanierung und Modernisierung
            </h2>

            <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Willkommen in unserem <strong>Ratgeber</strong>! Als <strong>Partnernetzwerk in München</strong>
                mit über 16 Jahren Erfahrung teilen wir unser Wissen rund um Komplettsanierung,
                Renovierung und einzelne Gewerke mit Ihnen. Hier finden Sie Tipps, die wirklich helfen --
                von der ersten Einschätzung bis zur fertigen Sanierung. Unser Ziel ist es,
                Ihnen das Wissen an die Hand zu geben, das Sie als Familie oder Paar brauchen, um fundierte
                Entscheidungen über Ihr Zuhause zu treffen.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Ein gut gepflegtes Zuhause schützt nicht nur vor Witterung und Verschleiß – es ist auch ein
                wesentlicher Faktor für den Wert Ihrer Immobilie. In München mit seinen besonderen Wetterbedingungen
                ist die richtige Pflege von Haustechnik und Bausubstanz besonders wichtig. Mit den Tipps in diesem
                Ratgeber können Sie viel dazu beitragen, Ihr Zuhause in Schuss zu halten und teure Überraschungen
                zu vermeiden.
              </p>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  Wie oft sollte ich meine Haustechnik prüfen lassen?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Unsere Empfehlung: Lassen Sie alle 2-3 Jahre eine Einschätzung durchführen. Nach größeren
                  Umbauten ist eine Prüfung ebenfalls sinnvoll. Eine professionelle Einschätzung vom Partnernetzwerk
                  schützt vor teuren Folgeschäden. Regelmäßige Pflege lohnt sich immer.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Bei einer professionellen Einschätzung prüfen wir systematisch alle kritischen Bereiche:
                  die Heizungsanlage auf Effizienz und Alter, die Sanitärleitungen auf Dichtigkeit, die
                  Elektroinstallation auf aktuelle Sicherheitsstandards sowie die Bausubstanz auf Feuchtigkeit
                  und Risse.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Viele Schäden entwickeln sich schleichend und sind für Laien nicht erkennbar. Eine
                  regelmäßige Kontrolle durch den Fachmann kann solche Probleme frühzeitig aufdecken, bevor
                  sie zu teuren Folgeschäden führen. Frühzeitige Erkennung kann Ihnen Reparaturkosten von
                  mehreren tausend Euro ersparen.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-primary" />
                  Was gehört zur regelmäßigen Pflege von Haus und Wohnung?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Regelmäßige Wartung ist Werterhalt! Unsere Empfehlung: Heizung jährlich warten lassen,
                  Sanitäranlagen regelmäßig prüfen. So verlängern Sie die Lebensdauer der Haustechnik um
                  Jahrzehnte. Rechtzeitige Vorbereitung auf den Winter schützt vor Frostschäden.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Die Heizungswartung ist eine der wichtigsten Pflegearbeiten im Jahr. Eine schlecht gewartete
                  Heizung verbraucht mehr Energie und fällt häufiger aus. Der ideale Zeitpunkt für die Wartung
                  ist vor Beginn der Heizperiode im Herbst – so vermeiden Sie einen Ausfall in der kalten
                  Jahreszeit.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Feuchtigkeit an Wänden ist nicht nur ein optisches Problem. Sie kann die Bausubstanz schädigen
                  und zu Schimmelbildung führen. Eine professionelle Mauerwerksabdichtung beseitigt die Ursache
                  nachhaltig. Auf Wunsch beraten wir Sie auch zu vorbeugenden Maßnahmen.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4 text-primary" />
                  Wann ist der richtige Zeitpunkt für eine Komplettsanierung?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Eine Komplettsanierung ist sinnvoll bei Immobilien über 30 Jahre, hohen Heizkosten oder
                  veralteter Haustechnik. Mit moderner Dämmung und Heiztechnik lassen sich bis zu 30% Energie
                  sparen. Nutzen Sie Förderungen bis 20%! Ein Partnernetzwerk koordiniert alle Gewerke für
                  nachhaltige Qualität.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Die Entscheidung für eine Komplettsanierung sollte gut überlegt sein. Wann lohnt es sich?
                  Wenn Ihre Immobilie über 30 Jahre alt ist, wenn Ihre Heizkosten ungewöhnlich hoch sind, wenn
                  mehrere Gewerke ohnehin anstehen oder wenn Sie eine größere Renovierung planen – dann ist der
                  richtige Zeitpunkt für eine Sanierung gekommen.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Eine Komplettsanierung mit moderner Haustechnik kann Ihre Heizkosten spürbar senken.
                  Außerdem verbessert sich das Wohnklima: Im Winter bleibt es wärmer, im Sommer angenehmer.
                  Und mit den aktuellen Förderungen von KfW und BAFA können Sie einen Teil der Kosten
                  erstattet bekommen. Wir beraten Sie gerne zu den verschiedenen Möglichkeiten.
                </p>
              </div>

              <div className="bg-card border rounded-md p-6">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Welche Warnsignale zeigen Sanierungsbedarf an?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Zur Problemerkennung: Feuchte Flecken an der Wand bedeuten Handlungsbedarf! Weitere
                  Warnsignale: veraltete Elektroinstallation, tropfende Leitungen, sichtbare Risse.
                  Nutzen Sie unser <strong>digitales Kontaktformular</strong> für eine erste Einschätzung --
                  ohne Besichtigungstermin.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Früherkennung ist bei Sanierungsbedarf besonders wichtig. Achten Sie auf Warnsignale: Feuchte
                  Flecken an Wänden oder Decken, muffiger Geruch im Keller, ungewöhnlich hohe Energiekosten,
                  sichtbare Schäden an der Fassade. All das können Hinweise auf Probleme sein, die einer
                  professionellen Einschätzung bedürfen.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Nicht jedes Problem erfordert sofortiges Handeln – aber alle sollten von einem Fachmann
                  begutachtet werden. Oft können kleine Mängel schnell und kostengünstig behoben werden,
                  wenn sie rechtzeitig erkannt werden. Warten Sie nicht, bis aus kleinen Problemen große
                  Schäden werden. Bei Unsicherheit: nutzen Sie unser Kontaktformular für eine kostenlose
                  Ersteinschätzung.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Haben Sie Fragen oder benötigen Sie eine Beratung? Unser Ratgeber
                gibt Ihnen das Wissen – und unser Partnernetzwerk die praktische Hilfe. Kontaktieren Sie uns
                digital für eine kostenlose Beratung! Gemeinsam finden wir die beste Lösung für Ihr Zuhause.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Denken Sie daran: Ihr Zuhause ist eine der wichtigsten Investitionen für Ihre Familie. Mit der
                richtigen Pflege und rechtzeitiger Wartung werden Sie jahrzehntelang Freude daran haben.
                Und wenn doch einmal ein Problem auftritt – unser Team ist nur eine Nachricht entfernt!
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3">Ratgeber FAQ – Häufige Fragen</h2>
              <p className="text-muted-foreground">
                Antworten auf die häufigsten Fragen rund um Sanierung und Renovierung in München.
              </p>
            </div>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <Card key={index} data-testid={`faq-${index}`}>
                  <CardContent className="p-5">
                    <h3 className="font-medium mb-2 flex items-start gap-2">
                      <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      {item.question}
                    </h3>
                    <p className="text-sm text-muted-foreground pl-7">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Warning Section */}
        <section className="py-10 bg-zinc-50 dark:bg-zinc-950/20 border-y border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900/50 rounded-md flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-zinc-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2 text-zinc-800 dark:text-zinc-200">
                  Sicherheit geht vor!
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Wichtiger Hinweis: Arbeiten an Elektroinstallation, Heizung oder Gasleitungen sind
                  gefährlich und teils gesetzlich reglementiert. Überlassen Sie solche Arbeiten immer
                  dem Fachmann. Kleinere Kontrollen wie Sichtprüfungen können Sie selbst durchführen --
                  bei Unsicherheit fragen Sie uns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Keywords Section */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 text-center">
              {pageData.mainKeyword} – Themen im Ratgeber
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
            <h2 className="text-xl font-bold mb-6 text-center">Weitere Informationen von Renodex</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/leistungen">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Target className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Leistungen München</h3>
                      <p className="text-xs text-muted-foreground mt-1">Alle Leistungen</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/faq">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Preise & FAQ</h3>
                      <p className="text-xs text-muted-foreground mt-1">Transparente Festpreise</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/sofort-hilfe">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Zap className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Schnelle Hilfe</h3>
                      <p className="text-xs text-muted-foreground mt-1">Digitale Erstberatung</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/kontakt">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Kontakt</h3>
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
