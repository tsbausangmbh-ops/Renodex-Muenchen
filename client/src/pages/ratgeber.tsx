import { Phone, Star, Award, Shield, ThumbsUp, BookOpen, Lightbulb, AlertTriangle, CheckCircle, Wrench, Calendar, Sun, Cloud, Snowflake, Leaf, Droplets, Thermometer, Home, Eye, FileText, Target, MessageCircle, Clock, HelpCircle, ArrowRight, Zap } from "lucide-react";
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
import heroImage from "@assets/generated_images/roofer_inspecting_tiles.png";

const PHONE_NUMBER = "[Telefon folgt]";
const pageData = mainPagesKeywords.ratgeber;

const seasonalTips = [
  {
    season: "Frühling",
    icon: Leaf,
    title: "Dach Frühjahrscheck München",
    description: "Nach dem Winter ist ein Dachcheck München unverzichtbar. Prüfen Sie auf Frostschäden und Moos.",
    tips: [
      "Dachrinnen reinigen nach Laub und Schnee",
      "Dachziegel Kontrolle auf Frostschäden",
      "Moos und Algen entfernen (Dach reinigen München)",
      "Dachfenster Dichtungen prüfen"
    ],
    color: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
  },
  {
    season: "Sommer",
    icon: Sun,
    title: "Dach Sommertipps München",
    description: "Die beste Zeit für Dach sanieren München – trockenes Wetter und lange Tage ideal für Dacharbeiten.",
    tips: [
      "Ideale Zeit für Dachsanierung München planen",
      "Dachdämmung verbessern für Hitzeschutz",
      "Dachfenster Sonnenschutz installieren",
      "Dach Wartung durchführen lassen"
    ],
    color: "bg-zinc-50 dark:bg-zinc-950/20 border-zinc-200 dark:border-zinc-800"
  },
  {
    season: "Herbst",
    icon: Cloud,
    title: "Dach Herbstcheck München",
    description: "Vor dem Winter Dach winterfest machen München – schützen Sie Ihr Dach vor Sturm und Nässe.",
    tips: [
      "Dachrinnenreinigung München vor Laub",
      "Dachziegel locker? Jetzt befestigen!",
      "Dach abdichten München vor Herbststürmen",
      "Dachinspektion vor dem Winter"
    ],
    color: "bg-zinc-50 dark:bg-zinc-950/20 border-zinc-200 dark:border-zinc-800"
  },
  {
    season: "Winter",
    icon: Snowflake,
    title: "Dach im Winter München",
    description: "Schneelast, Frost und Eis – so schützen Sie Ihr Dach. Bei Problemen: Dach Sofort-Hilfe München.",
    tips: [
      "Dachlawinengefahr beobachten (Schneefanggitter)",
      "Eiszapfen vorsichtig entfernen (lassen)",
      "Bei Dach undicht: Sofort-Hilfe Dach München",
      "Keine Dacharbeiten selbst bei Frost!"
    ],
    color: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
  }
];

const mainTopics = [
  {
    id: "wartung",
    icon: Wrench,
    title: "Dach Wartung München Ratgeber",
    subtitle: "So bleibt Ihr Dach in Schuss",
    content: "Regelmäßige Dach Wartung München verlängert die Lebensdauer Ihres Daches um Jahrzehnte. Unser Dach Ratgeber München zeigt: Dachpflege München ist günstiger als Reparaturen. Dachrinnenreinigung München 1-2x jährlich, Dach reinigen München bei Moosbefall.",
    keyTips: [
      "Dachrinnenreinigung München: 1-2x jährlich",
      "Dach reinigen München bei Moos/Algen",
      "Dachpflege München vom Fachmann empfohlen",
      "Dach Wartung München ist Werterhalt"
    ]
  },
  {
    id: "sanierung",
    icon: Home,
    title: "Dachsanierung Ratgeber München",
    subtitle: "Wann ist es Zeit für eine Sanierung?",
    content: "Ab 30-40 Jahren sollten Sie über eine Dach Sanierung München nachdenken. Unser Dach Ratgeber München hilft bei der Entscheidung: Dach erneuern München lohnt sich bei hohen Heizkosten, Undichtigkeiten oder veralteter Dämmung. Dachsanierung Tipps: Mit Förderung bis 20% sparen!",
    keyTips: [
      "Dach 30+ Jahre? Sanierung prüfen!",
      "Dach erneuern München mit Förderung",
      "Energetische Dachsanierung spart 30% Heizkosten",
      "Dach sanieren München: [Gründungsjahr folgt] wählen"
    ]
  },
  {
    id: "probleme",
    icon: AlertTriangle,
    title: "Dach Probleme erkennen München",
    subtitle: "Warnsignale richtig deuten",
    content: "Typische Dachprobleme München früh erkennen: Wasserflecken an der Decke, feuchte Dämmung, beschädigte Dachziegel, verstopfte Dachrinnen. Dach Tipps vom Meister: Schnell handeln verhindert teure Folgeschäden. Bei akuten Problemen: Dachdecker Sofort-Hilfe München.",
    keyTips: [
      "Wasserflecken = sofort Dachdecker rufen!",
      "Dachziegel locker? Schnell reparieren lassen",
      "Dachrinnen verstopft = Wasserschadengefahr",
      "Hohe Heizkosten? Dämmung prüfen lassen"
    ]
  }
];

const quickTips = [
  { tip: "Dachrinnenreinigung 2x jährlich", icon: Droplets },
  { tip: "Nach Sturm: Dachcheck", icon: Cloud },
  { tip: "Bei Wasserflecken: Sofort handeln!", icon: AlertTriangle },
  { tip: "Moos entfernen lassen", icon: Leaf },
  { tip: "Wärmedämmung prüfen", icon: Thermometer },
];

const trustBadges = [
  { icon: Award, text: "Dachdecker [Gründungsjahr folgt] in München" },
  { icon: Star, text: "25+ Jahre Erfahrung" },
  { icon: ThumbsUp, text: "100+ zufriedene Kunden" },
  { icon: Shield, text: "Festpreisgarantie" },
];

const faqItems = [
  {
    question: "Wie oft sollte ich mein Dach prüfen lassen?",
    answer: "Unser Dach Ratgeber München empfiehlt: Regelmäßige Dachprüfung alle 2-3 Jahre, plus nach jedem Sturm. Ein professioneller Dachcheck München erkennt kleine Schäden früh."
  },
  {
    question: "Wann muss ich mein Dach sanieren?",
    answer: "Dach sanieren München ist nötig bei: Undichtigkeiten, hohen Heizkosten, Dach älter als 30-40 Jahre. Unser Dachsanierung Ratgeber hilft bei der Entscheidung."
  },
  {
    question: "Kann ich Dacharbeiten selbst machen?",
    answer: "Dach Tipps vom Meister: Arbeiten auf dem Dach sind gefährlich! Dachrinnenreinigung vom Boden aus ist ok, aber Dach reparieren München sollte nur der Fachmann."
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
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb items={SERVICE_BREADCRUMBS["/ratgeber"]} />
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
                  <BookOpen className="w-3 h-3 text-yellow-400" />
                  Ratgeber vom Dachdeckermeister
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">
                  Dach Ratgeber München – Pflege, Wartung & Expertentipps
                </h1>
                <p className="text-zinc-600 text-sm md:text-base mb-4">
                  <strong className="text-white">Dach Ratgeber München</strong>: 
                  <strong className="text-white"> Dachpflege</strong>, <strong className="text-white">Dachinspektion</strong>, 
                  <strong className="text-white"> Dach Wartung</strong>. Wann <strong className="text-white">Dach sanieren</strong>? Tipps vom Meister.
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
                {quickTips.slice(0, 3).map((item, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-md p-3 text-center">
                    <item.icon className="w-5 h-5 mx-auto mb-1 text-white" />
                    <p className="text-xs text-zinc-600">{item.tip}</p>
                  </div>
                ))}
              </div>
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
                Dachpflege München – Wann Dach prüfen lassen?
              </h2>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                <strong>Dach Ratgeber München</strong>: <strong>Dachpflege</strong> für jede Jahreszeit.
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
                Dach Wartung München – Wann Dach sanieren?
              </h2>
              <p className="text-muted-foreground text-sm">
                <strong>Dachinspektion</strong>, <strong>Wartung</strong>, <strong>Sanierung</strong> – Expertentipps.
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
                Vom <strong>Dachdecker [Gründungsjahr folgt] in München</strong>: Detaillierte Checklisten und Guides 
                für <strong>Dachsanierung</strong>, <strong>Schadenserkennung</strong> und <strong>Fördermittel</strong>.
              </p>
            </div>

            {/* Checklist 1: Dachsanierung */}
            <Card className="mb-6" id="checkliste-dachsanierung" data-testid="guide-dachsanierung">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Checkliste Dachsanierung: Von der Planung bis zur Fertigstellung</h3>
                    <p className="text-sm text-muted-foreground">Schritt-für-Schritt-Anleitung für Ihre erfolgreiche Dachsanierung München</p>
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
                        "Dachinspektion durch [Gründungsjahr folgt] beauftragen",
                        "Schadensbericht und Sanierungsempfehlung einholen",
                        "Kostenvoranschläge von 2-3 Fachbetrieben vergleichen",
                        "Energieberatung für Fördermittel-Anspruch prüfen",
                        "KfW/BAFA-Förderanträge VOR Baubeginn stellen",
                        "Baugenehmigung prüfen (bei Dachform-Änderung)",
                        "Zeitfenster festlegen (April-Oktober ideal)"
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
                        "Gerüst aufstellen lassen (Verkehrssicherung beachten)",
                        "Alte Eindeckung und Dämmung entfernen",
                        "Dachstuhl auf Schäden prüfen und reparieren",
                        "Neue Dämmung nach EnEV-Standard einbauen",
                        "Dampfsperre fachgerecht verlegen",
                        "Neue Dacheindeckung mit Garantie montieren",
                        "Dachrinnen und Anschlüsse erneuern",
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
                    <strong>Tipp vom Meister:</strong> Planen Sie eine <strong>Dachsanierung München</strong> mindestens 
                    3-6 Monate im Voraus. So sichern Sie sich gute Handwerker-Termine und können alle 
                    <strong> Fördermittel München</strong> optimal nutzen.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Checklist 2: DIY-Inspektion */}
            <Card className="mb-6" id="diy-inspektion" data-testid="guide-diy-inspektion">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900/30 rounded-md flex items-center justify-center shrink-0">
                    <Eye className="w-6 h-6 text-zinc-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">DIY-Inspektion: So erkennen Sie Schäden an Dachziegeln oder Abdichtungen</h3>
                    <p className="text-sm text-muted-foreground">Warnsignale erkennen – sicher vom Boden aus</p>
                  </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-800 rounded-md p-3 mb-4">
                  <p className="text-sm text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <strong>Sicherheitshinweis:</strong> Betreten Sie NIEMALS selbst das Dach! Nutzen Sie ein Fernglas vom Boden aus.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 rounded-md p-4">
                    <h4 className="font-semibold mb-3 text-sm">Sichtprüfung von außen</h4>
                    <ul className="space-y-2">
                      {[
                        "Fehlende oder verschobene Dachziegel",
                        "Gerissene oder gebrochene Ziegel",
                        "Moos- oder Algenbefall (Verfärbungen)",
                        "Durchhängende Dachbereiche",
                        "Beschädigte Firstkappen",
                        "Rost an Blechverkleidungen"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <Eye className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded-md p-4">
                    <h4 className="font-semibold mb-3 text-sm">Anzeichen im Dachgeschoss</h4>
                    <ul className="space-y-2">
                      {[
                        "Wasserflecken an Decke/Wänden",
                        "Feuchte oder nasse Dämmung",
                        "Muffiger, modriger Geruch",
                        "Tageslicht durch Dach sichtbar",
                        "Schimmelbildung an Balken",
                        "Kondenswasser an Dachfenstern"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <Droplets className="w-3 h-3 text-blue-600 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded-md p-4">
                    <h4 className="font-semibold mb-3 text-sm">Dachrinnen & Fallrohre</h4>
                    <ul className="space-y-2">
                      {[
                        "Überlaufendes Wasser bei Regen",
                        "Sichtbare Risse oder Löcher",
                        "Durchhängende Rinnenabschnitte",
                        "Pflanzen in der Dachrinne",
                        "Rostflecken am Mauerwerk",
                        "Verstopfte Fallrohre (Spritzwasser)"
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
                    <strong>Bei diesen Anzeichen sofort handeln:</strong> Wasserflecken, Schimmel, sichtbare Dachlöcher 
                    – rufen Sie umgehend den <strong>Dachdecker Sofort-Hilfe München</strong> unter <strong>{PHONE_NUMBER}</strong>.
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
                    <p className="text-sm text-muted-foreground">So finanzieren Sie Ihre Dachsanierung 2025/2026 optimal</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-700 dark:text-green-400">
                      <Award className="w-4 h-4" />
                      KfW-Förderung für Dachsanierung
                    </h4>
                    <ul className="space-y-2">
                      {[
                        { title: "KfW 261/262 – Einzelmaßnahmen", desc: "Bis zu 15% Tilgungszuschuss" },
                        { title: "KfW 261 – Effizienzhaus-Standard", desc: "Bis zu 45% bei Komplettsanierung" },
                        { title: "KfW 270 – Erneuerbare Energien", desc: "Günstige Kredite für Solardach" },
                        { title: "KfW 159 – Altersgerecht Umbauen", desc: "Dachfenster mit Barrierefreiheit" }
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
                        { title: "BAFA – Heizungsförderung", desc: "Bei Dachdämmung mit Heizungstausch" },
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
                      "U-Wert-Anforderungen erfüllen (0,14-0,20 W/m²K)",
                      "[Gründungsjahr folgt] mit Qualifikation beauftragen",
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
              Dach Ratgeber München – Tipps für Dachinspektion & Sanierung
            </h2>
            
            <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Willkommen in unserem <strong>Dach Ratgeber München</strong>! Als <strong>Dachdecker [Gründungsjahr folgt] in München</strong> 
                mit über 25 Jahren Erfahrung teilen wir unser <strong>Dach Wissen München</strong> mit Ihnen. 
                Hier finden Sie <strong>Dach Tipps</strong>, die wirklich helfen – von der 
                <strong> Dachinspektion</strong> bis zur <strong>Dachsanierung</strong>. Unser Ziel ist es, 
                Ihnen das Wissen an die Hand zu geben, das Sie als Hausbesitzer brauchen, um fundierte 
                Entscheidungen über Ihr Dach zu treffen.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Ein gut gepflegtes Dach schützt nicht nur vor Regen und Wind – es ist auch ein wesentlicher 
                Faktor für den Wert Ihrer Immobilie. In München mit seinen besonderen Wetterbedingungen – 
                von Föhnstürmen über Hagelgewitter bis zu schneereichen Wintern – ist die richtige Dachpflege 
                besonders wichtig. Mit den Tipps in diesem Ratgeber können Sie viel dazu beitragen, Ihr Dach 
                in Schuss zu halten und teure Überraschungen zu vermeiden.
              </p>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  Wie oft sollte ich mein Dach prüfen lassen?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Unsere <strong>Dachpflege Tipps München</strong>: Lassen Sie alle 2-3 Jahre einen 
                  <strong> Dachcheck München</strong> durchführen. Nach Stürmen ist eine <strong>Dachprüfung München</strong> 
                  Pflicht! Eine professionelle <strong>Dachkontrolle München</strong> vom Meister schützt vor 
                  teuren Folgeschäden. <strong>Regelmäßige Dachpflege München</strong> lohnt sich immer.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Bei einer professionellen Dachprüfung überprüfen wir systematisch alle kritischen Bereiche: 
                  Die Dacheindeckung auf beschädigte oder verschobene Ziegel, den Firstbereich auf lockere oder 
                  gerissene Firstkappen, alle Anschlüsse an Schornstein, Gauben und Dachfenstern sowie die 
                  Dachrinnen und Fallrohre auf Verstopfungen oder Beschädigungen.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Viele Schäden entwickeln sich schleichend und sind für den Laien nicht erkennbar. Eine 
                  regelmäßige Kontrolle durch den Fachmann kann solche Probleme frühzeitig aufdecken, bevor 
                  sie zu teuren Folgeschäden führen. Frühzeitige Erkennung kann Ihnen Reparaturkosten von 
                  mehreren tausend Euro ersparen.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-primary" />
                  Was gehört zur regelmäßigen Dachpflege?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  <strong>Dach Wartung München</strong> ist Werterhalt! Unser <strong>Dach Wartung Ratgeber</strong>: 
                  <strong> Dachrinnenreinigung München</strong> 1-2x jährlich, <strong>Dach reinigen München</strong> bei Moos. 
                  Regelmäßige <strong>Dachpflege München</strong> verlängert die Lebensdauer um Jahrzehnte. 
                  <strong>Dach winterfest machen München</strong> im Herbst schützt vor Frostschäden.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Die Dachrinnenreinigung ist eine der wichtigsten Wartungsarbeiten am Dach. Verstopfte Rinnen 
                  führen dazu, dass Regenwasser überläuft und an der Fassade herunterläuft. Im Winter kann sich 
                  Eis in verstopften Rinnen bilden und diese beschädigen. Zweimal im Jahr – im Frühling nach dem 
                  Pollenflug und im Herbst nach dem Laubfall – sollten die Rinnen gereinigt werden.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Moos auf dem Dach ist nicht nur ein optisches Problem. Moospolster speichern Feuchtigkeit und 
                  können die Dacheindeckung schädigen. Bei Frost dehnt sich das Wasser im Moos aus und kann 
                  Ziegel sprengen. Eine professionelle Dachreinigung entfernt Moos, Algen und Flechten schonend 
                  und nachhaltig. Auf Wunsch können wir auch eine Beschichtung aufbringen, die Neubildung verhindert.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4 text-primary" />
                  Wann ist der richtige Zeitpunkt für eine Dachsanierung?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Unser <strong>Dachsanierung Ratgeber München</strong>: <strong>Dach sanieren München</strong> 
                  ist sinnvoll bei Dächern über 30 Jahre, hohen Heizkosten oder Undichtigkeiten. 
                  <strong> Dach erneuern München</strong> mit Dämmung spart bis 30% Energie. 
                  <strong>Dachsanierung Tipps</strong>: Nutzen Sie Förderungen bis 20%! <strong>Dach Modernisierung München</strong> 
                  vom [Gründungsjahr folgt] für nachhaltige Qualität.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Die Entscheidung für eine Dachsanierung sollte gut überlegt sein. Wann lohnt es sich? Wenn 
                  Ihr Dach über 30 Jahre alt ist, wenn Sie regelmäßig mit Undichtigkeiten kämpfen, wenn Ihre 
                  Heizkosten ungewöhnlich hoch sind oder wenn Sie ohnehin eine größere Renovierung planen – 
                  dann ist der richtige Zeitpunkt für eine Sanierung gekommen.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Eine Dachsanierung mit moderner Dämmung kann Ihre Heizkosten um bis zu 30% senken. Außerdem 
                  verbessert sich das Wohnklima: Im Winter bleibt es wärmer, im Sommer kühler. Und mit den 
                  aktuellen Förderungen von KfW und BAFA können Sie bis zu 20% der Kosten erstattet bekommen. 
                  Wir beraten Sie gerne zu den verschiedenen Möglichkeiten und erstellen ein maßgeschneidertes 
                  Konzept für Ihr Dach.
                </p>
              </div>

              <div className="bg-card border rounded-md p-6">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Welche Warnsignale zeigen Dachschäden an?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  <strong>Dach Tipps München</strong> zur Problemerkennung: Wasserflecken an der Decke bedeuten 
                  Handlungsbedarf! Weitere <strong>Dachprobleme München</strong>: Lockere Dachziegel, 
                  verstopfte Dachrinnen, Moos und Algen. Bei akuten Schäden: 
                  <strong> Dachdecker Sofort-Hilfe München</strong> unter {PHONE_NUMBER}. 
                  Unser <strong>Dach Ratgeber München</strong> hilft bei der Einschätzung.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Früherkennung ist bei Dachproblemen besonders wichtig. Achten Sie auf Warnsignale: Feuchte 
                  Flecken an der Zimmerdecke, muffiger Geruch im Dachgeschoss, ungewöhnlich hohe Heizkosten, 
                  sichtbare Schäden an Ziegeln oder Dachrinnen. All das können Hinweise auf Probleme sein, 
                  die einer professionellen Einschätzung bedürfen.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Nicht jedes Problem erfordert sofortiges Handeln – aber alle sollten von einem Fachmann 
                  begutachtet werden. Oft können kleine Schäden schnell und kostengünstig behoben werden, 
                  wenn sie rechtzeitig erkannt werden. Warten Sie nicht, bis aus kleinen Problemen große 
                  Schäden werden. Bei Unsicherheit: Rufen Sie uns an für eine kostenlose Ersteinschätzung.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Haben Sie Fragen zu <strong>Dach Tipps München</strong> oder benötigen Sie eine 
                <strong> Dachberatung München</strong>? Unser <strong>Dach Ratgeber München</strong> 
                gibt Ihnen das Wissen – und unser Meisterteam die praktische Hilfe. Kontaktieren Sie uns 
                für eine kostenlose Beratung! Gemeinsam finden wir die beste Lösung für Ihr Dach.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Denken Sie daran: Ihr Dach ist eine der wichtigsten Investitionen in Ihr Zuhause. Mit der 
                richtigen Pflege und rechtzeitiger Wartung werden Sie jahrzehntelang Freude daran haben. 
                Und wenn doch einmal ein Problem auftritt – unser Team ist nur einen Anruf entfernt!
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3">Dach Ratgeber FAQ – Häufige Fragen</h2>
              <p className="text-muted-foreground">
                Antworten auf die häufigsten Fragen rund um <strong>Dach Tipps München</strong>.
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
                  Dach Tipps München: Sicherheit geht vor!
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Wichtiger <strong>Dach Ratgeber Hinweis</strong>: Arbeiten auf dem Dach sind gefährlich! 
                  <strong> Dach reparieren selbst</strong> kann tödlich enden. Unser <strong>Dach Tipps München</strong> 
                  Rat: Überlassen Sie <strong>Dacharbeiten</strong> immer dem Fachmann. 
                  <strong> Dachrinnenreinigung München</strong> vom Boden mit Teleskopstange ist ok – 
                  aber betreten Sie niemals selbst das Dach!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Keywords Section */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 text-center">
              {pageData.mainKeyword} - Tipps vom Meister
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
            <h2 className="text-xl font-bold mb-6 text-center">Weitere Informationen vom Dachdecker München</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/leistungen">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Target className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Dacharbeiten München</h3>
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
                      <h3 className="font-medium text-sm">Dachdecker Preise München</h3>
                      <p className="text-xs text-muted-foreground mt-1">Transparente Festpreise</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/notdienst">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Zap className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Dach Sofort-Hilfe München</h3>
                      <p className="text-xs text-muted-foreground mt-1">24/7 Soforthilfe</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/kontakt">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Dachdecker München Kontakt</h3>
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
