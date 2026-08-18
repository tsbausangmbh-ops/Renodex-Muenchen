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
import heroImage from "@assets/generated_images/professional_roofing_team.png";

const PHONE_NUMBER = "[Telefon folgt]";
const pageData = mainPagesKeywords["ueber-uns"];

const milestones = [
  { year: "1998", title: "Beginn als Dachdeckermeister München", description: "Unser Dachdeckermeister München macht sich selbständig – mit der Vision höchster Qualität für Münchner Dächer" },
  { year: "2015", title: "100+ zufriedene Dachdecker Kunden München", description: "Viele Münchner Familien vertrauen bereits auf unsere Dachdecker Erfahrung München" },
  { year: "2025", title: "Eintragung der Renodex", description: "Aus der Selbständigkeit wird die Renodex – eingetragener Dachdecker [Gründungsjahr folgt] in München (HRB 305535, Amtsgericht München)" },
];

const trustPoints = [
  {
    icon: Award,
    title: "Dachdeckermeister München Qualität",
    description: "Jedes Projekt wird persönlich vom Dachdeckermeister München abgenommen. Dachdecker Qualität München, die Jahrzehnte hält.",
    highlight: "100% Meisterabnahme"
  },
  {
    icon: Clock,
    title: "Dachdecker Zuverlässigkeit München",
    description: "Als zuverlässiger Dachdecker München halten wir Termine ein. Pünktlich, zügig, sauber – so arbeitet ein seriöser Dachdecker München.",
    highlight: "Pünktlich & zuverlässig"
  },
  {
    icon: Shield,
    title: "Dachdecker Garantie München",
    description: "Vollständig versichert mit umfassender Dachdecker Garantie München. Bei Problemen machen wir es richtig – ohne Diskussion.",
    highlight: "Garantie inklusive"
  },
  {
    icon: Heart,
    title: "Ehrlicher Dachdecker München",
    description: "Wir sind ein ehrlicher Dachdecker München: Festpreise ohne böse Überraschungen. Vertrauen beginnt mit Ehrlichkeit.",
    highlight: "Festpreisgarantie"
  },
];

const stats = [
  { value: "25+", label: "Jahre Dachdecker Erfahrung München", subtext: "Dachdeckermeister seit 1998" },
  { value: "100+", label: "Zufriedene Dachdecker Kunden München", subtext: "Die uns weiterempfehlen" },
  { value: "24/7", label: "Dachdecker Sofort-Hilfe München", subtext: "Auch nachts für Sie da" },
  { value: "100%", label: "Meisterabnahme", subtext: "Dachdecker Qualität München" },
];

const whyChooseUs = [
  "Persönliche Betreuung durch den Dachdeckermeister München",
  "Kostenlose Dachdecker Beratung München vor Ort",
  "Dachdecker Festpreis München ohne Nachforderungen",
  "Schnelle Reaktionszeiten als guter Dachdecker München",
  "Saubere Baustelle – garantiert",
  "Dachdecker Garantie München auf alle Arbeiten",
];

const services = [
  "Dachsanierung & Neueindeckung",
  "Flachdach & Steildach München",
  "Spenglerei & Metallarbeiten",
  "Dachrinnen & Fallrohre",
  "Sturmschaden-Reparatur",
  "Dachinspektion & Wartung",
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
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb items={SERVICE_BREADCRUMBS["/ueber-uns"]} />
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
                  [Gründungsjahr folgt]
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">
                  Dachdecker [Gründungsjahr folgt] in München – Zuverlässig, Seriös & Erfahren
                </h1>
                <p className="text-zinc-600 text-sm md:text-base">
                  Renodex: Ihr <strong className="text-white">zuverlässiger Dachdecker München</strong> mit 
                  <strong className="text-white"> 25+ Jahren Meistererfahrung</strong>. <strong className="text-white">Seriöser Dachdecker</strong> mit Festpreisgarantie – <strong className="text-white">guter Dachdecker München</strong>, der liefert.
                </p>
              </div>
              <div className="hidden lg:grid grid-cols-2 gap-3">
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
            <div className="grid grid-cols-4 gap-3">
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

        {/* About Section - Kompakt */}
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Zuverlässiger Dachdecker München – Wer wir sind
                </h2>
                <p className="text-muted-foreground mb-4">
                  Als <strong>Dachdecker [Gründungsjahr folgt] in München</strong> kennen wir die Frustration vieler Hausbesitzer: 
                  Man ruft einen Dachdecker an – und wartet. Bei uns ist das anders. 
                  Unser <strong>Dachdeckermeister München</strong> hat sich 1998 selbständig gemacht, 
                  weil er es besser machen wollte.
                </p>
                <p className="text-muted-foreground mb-4">
                  Mit 25 Jahren <strong>Dachdecker Erfahrung München</strong> und über 100 zufriedenen 
                  <strong> Dachdecker Kunden München</strong> sind wir heute ein eingetragener 
                  <strong> Dachdecker [Gründungsjahr folgt] in München</strong>. Unser Versprechen: 
                  <em> Wir behandeln Ihr Dach, als wäre es unser eigenes.</em>
                </p>
                <p className="text-muted-foreground mb-6">
                  2025 haben wir die Renodex gegründet – als <strong>seriöser Dachdecker München</strong> 
                  mit der Kombination aus kaufmännischer Kompetenz und handwerklicher Perfektion. 
                  Ein <strong>guter Dachdecker München</strong>, der liefert statt verspricht.
                </p>
                <div className="bg-muted/50 border-l-4 border-primary p-4 rounded-r-md">
                  <p className="text-sm italic text-muted-foreground">
                    „Nach 25 Jahren als Dachdeckermeister weiß ich: Ein gutes Dach gibt Sicherheit. 
                    Deshalb gebe ich als Dachdecker München bei jedem Projekt mein Bestes."
                  </p>
                  <p className="text-sm font-medium mt-2">– Ihr Dachdeckermeister München</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-card border rounded-md p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    Dachdecker Firma München – Unternehmensdaten
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Renodex</strong> – Dachdecker [Gründungsjahr folgt] in München</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Betriebsleiter:</strong> Dachdeckermeister München, 25+ Jahre Erfahrung</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Qualifikation:</strong> Eingetragener Dachdecker-[Gründungsjahr folgt]</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>200+ Projekte</strong> als Dachdecker München erfolgreich abgeschlossen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span><strong>Dachdecker München Standort:</strong> [Adresse folgt]</span>
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
                    Dachdecker Beratung München anfragen
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
              <h2 className="text-xl md:text-2xl font-bold mb-2">Seriöser Dachdecker München – Unsere Qualitätsversprechen</h2>
              <p className="text-muted-foreground text-sm">
                <strong>Seriöser Dachdecker München</strong> – Qualität, die hält.
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

        {/* Timeline Section - Kompakt */}
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Dachdecker Erfahrung München – 25 Jahre Meisterqualität</h2>
              <p className="text-muted-foreground text-sm">
                Die Geschichte unseres <strong>Dachdecker-Meisters seit 1998 in München</strong>.
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-1/2"></div>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 border-4 border-background"></div>
                    <div className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="bg-card border rounded-md p-5">
                        <div className="text-primary font-bold text-xl mb-1">{milestone.year}</div>
                        <div className="font-semibold mb-2">{milestone.title}</div>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Longtail SEO Text Section - Kompakt */}
        <section className="py-6 md:py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
              Guter Dachdecker München – Warum Kunden uns empfehlen
            </h2>
            
            <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Suchen Sie einen <strong>seriösen Dachdecker München</strong>? Die Renodex ist Ihr 
                <strong> Dachdecker [Gründungsjahr folgt] in München</strong> mit über 25 Jahren <strong>Dachdecker Erfahrung München</strong>. 
                Unser <strong>Dachdeckermeister München</strong> und sein Team stehen für 
                <strong> Dachdecker Qualität München</strong>, <strong>Dachdecker Zuverlässigkeit München</strong> und 
                faire Preise. Was uns als Handwerksbetrieb besonders macht: Wir behandeln jedes Dach so, als wäre es 
                unser eigenes. Diese Philosophie haben wir von Anfang an gelebt und werden sie niemals aufgeben.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Die Geschichte der Renodex ist eine Geschichte von Leidenschaft und Handwerkskunst. Unser 
                Betriebsleiter begann seine Karriere als Lehrling bei einem renommierten Münchner Dachdeckerbetrieb. 
                Nach der Gesellenprüfung sammelte er Erfahrung in verschiedenen Betrieben, bildete sich zum 
                Dachdeckermeister fort und machte sich schließlich selbstständig. Diese Reise hat ihn gelehrt, 
                was wirklich zählt: solide Arbeit, ehrliche Beratung und zufriedene Kunden. Diese Werte prägen 
                bis heute jeden Aspekt unserer Arbeit.
              </p>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  Warum empfehlen Kunden unseren Dachdecker-Service?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Als <strong>empfohlener Dachdecker München</strong> mit über 100 zufriedenen 
                  <strong> Dachdecker Kunden München</strong> setzen wir auf Qualität statt Masse. 
                  Unsere <strong>Dachdecker Bewertungen München</strong> sprechen für sich: 
                  Ein <strong>guter Dachdecker München</strong>, der hält, was er verspricht. 
                  <strong>Dachdecker Empfehlung München</strong> durch Weiterempfehlung unserer Kunden.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Unsere Kunden empfehlen uns weiter – und das ist der beste Beweis für unsere Arbeit. Viele neue 
                  Aufträge kommen durch Mundpropaganda zustande: Nachbarn, die unsere Arbeit gesehen haben, Freunde 
                  und Verwandte unserer zufriedenen Kunden. Diese Empfehlungen sind uns wichtiger als jede Werbung, 
                  denn sie zeigen, dass wir unser Versprechen halten.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Wir dokumentieren jedes Projekt sorgfältig und stellen unseren Kunden auf Wunsch Referenzfotos 
                  zur Verfügung. So können sich Interessenten selbst ein Bild von unserer Arbeit machen. Und wir 
                  freuen uns über jede Bewertung – denn konstruktives Feedback hilft uns, noch besser zu werden.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-primary" />
                  Was bedeutet Dachdecker Garantie und Festpreis?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Als <strong>zuverlässiger Dachdecker München</strong> halten wir unsere Termine ein. 
                  Jede Arbeit erfolgt mit <strong>Dachdecker Garantie München</strong> und wird vom 
                  <strong> Dachdeckermeister München</strong> persönlich abgenommen. 
                  Als <strong>ehrlicher Dachdecker München</strong> beraten wir Sie nur, was Sie wirklich brauchen – 
                  mit <strong>Dachdecker Festpreis München</strong> ohne versteckte Kosten.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Zuverlässigkeit ist für uns mehr als ein Wort – es ist eine Verpflichtung. Wenn wir einen Termin 
                  vereinbaren, dann halten wir ihn. Wenn wir einen Preis nennen, dann gilt er. Wenn wir eine Arbeit 
                  übernehmen, dann führen wir sie zu Ende. Diese Verlässlichkeit ist in unserer Branche leider 
                  nicht selbstverständlich – umso wichtiger ist es uns, hier einen Unterschied zu machen.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Auf alle unsere Arbeiten geben wir eine Gewährleistung, die über die gesetzlichen Mindestanforderungen 
                  hinausgeht. Sollte nach der Fertigstellung doch einmal ein Problem auftreten, kommen wir ohne 
                  Diskussion zurück und beheben es. Diese Garantie steht schwarz auf weiß in jedem unserer Angebote.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  Welche Vorteile hat ein [Gründungsjahr folgt] gegenüber Großfirmen?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Unser <strong>Dachdecker Familienbetrieb München</strong> steht für persönliche Betreuung. 
                  Als <strong>Dachdecker Firma München</strong> mit Sitz in Obermenzing sind wir schnell 
                  bei Ihnen. <strong>Dachdecker Handwerksbetrieb München</strong> mit Tradition und 
                  <strong> Dachdecker Kompetenz München</strong> für Ihr Dachprojekt.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Bei uns sind Sie keine Nummer. Der Inhaber und Meister kennt jeden Kunden persönlich und 
                  überwacht jedes Projekt. Diese persönliche Betreuung ist bei größeren Betrieben oft nicht 
                  möglich – bei uns ist sie Standard. Sie haben immer einen festen Ansprechpartner, der Ihr 
                  Projekt kennt und bei Fragen sofort helfen kann.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Unser Team besteht aus erfahrenen Facharbeitern, die seit Jahren zusammenarbeiten. Diese 
                  eingespielten Abläufe sorgen für effiziente Arbeit und zuverlässige Ergebnisse. Jeder Mitarbeiter 
                  ist stolz auf seine Arbeit und identifiziert sich mit dem Betrieb – das spürt man an der 
                  Qualität jeder einzelnen Arbeit.
                </p>
              </div>

              <div className="bg-card border rounded-md p-6">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Wo ist der [Gründungsjahr folgt] ansässig?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Unser Firmensitz in München-Obermenzing ist ideal gelegen, um ganz München und das Umland 
                  schnell zu erreichen. Über die Autobahnen A8, A99 und A96 sind wir flexibel unterwegs und 
                  können sowohl die Innenstadt als auch die Vororte zeitnah bedienen.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Das Einzugsgebiet unseres Betriebs umfasst alle Münchner Stadtteile sowie einen Radius von 
                  etwa 30 Kilometern. Von Schwabing bis Sendling, von Bogenhausen bis Pasing – wir sind überall 
                  dort, wo unsere Kunden uns brauchen. Auch im Münchner Umland bis 25 km, etwa in Grünwald, Puchheim, Gräfelfing, 
                  Germering, Unterschleißheim und Garching, führen wir regelmäßig Projekte durch.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Kontaktieren Sie unseren <strong>Dachdecker [Gründungsjahr folgt] in München</strong> für eine 
                kostenlose Beratung. Als <strong>Dachdecker Fachbetrieb München</strong> bieten wir 
                alle Leistungen rund ums Dach – mit der <strong>Dachdecker Qualität München</strong>, 
                die Sie verdienen. Lernen Sie uns kennen und überzeugen Sie sich selbst von unserem 
                Engagement für Ihr Dach!
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Wir freuen uns auf Ihre Anfrage und darauf, auch Ihr Dach in München mit Meisterqualität 
                zu betreuen. Ob kleine Reparatur oder große Sanierung – bei uns sind Sie in den besten 
                Händen. Rufen Sie uns an oder nutzen Sie unser Kontaktformular!
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Guter Dachdecker München – Warum Kunden zu uns wechseln</h2>
                <p className="text-muted-foreground mb-6">
                  Viele unserer <strong>Dachdecker Kunden München</strong> hatten vorher schlechte Erfahrungen. 
                  Bei unserem <strong>Dachdecker [Gründungsjahr folgt] in München</strong> finden sie endlich:
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
                    Dachdecker Leistungen München
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
                      <strong>Einsatzgebiet:</strong> Dachdecker München und 30 km Umkreis
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
              {pageData.mainKeyword} - Qualität seit 1998
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
            <h2 className="text-xl font-bold mb-6 text-center">Mehr über unseren Dachdecker Service München</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/leistungen">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Target className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Dacharbeiten München</h3>
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
                      <h3 className="font-medium text-sm">Dachdecker Preise München</h3>
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
