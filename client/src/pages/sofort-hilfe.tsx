import { AlertTriangle, Phone, Clock, Shield, CheckCircle, Zap, Camera, FileText, Award, ArrowRight, Wind, Droplets, Building, HardHat, ClipboardCheck, MessageCircle } from "lucide-react";
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
import KiBildHinweis from "@/components/KiBildHinweis";

const PHONE_NUMBER = "[Telefon folgt]";
const pageData = mainPagesKeywords.notdienst;

const steps = [
  {
    step: 1,
    title: "Ruhe bewahren & Sicherheit",
    description: "Bei einem akuten Schaden zuerst für Sicherheit sorgen: Wasserzufuhr oder Sicherung abstellen, wenn möglich und gefahrlos machbar.",
    icon: Shield
  },
  {
    step: 2,
    title: "Schäden dokumentieren",
    description: "Fotografieren Sie den Schaden für die Versicherung und für unsere Einschätzung.",
    icon: Camera
  },
  {
    step: 3,
    title: "Digital anfragen",
    description: "Senden Sie uns Fotos, Video oder eine kurze Beschreibung über unser Kontaktformular – ohne Besichtigungstermin.",
    icon: MessageCircle
  },
  {
    step: 4,
    title: "Versicherung informieren",
    description: "Wir helfen bei der Dokumentation für Ihre Wohngebäude- oder Hausratversicherung.",
    icon: FileText
  }
];

const damageTypes = [
  {
    icon: Droplets,
    title: "Wasserschaden & Rohrbruch",
    description: "Tropfende Leitungen, feuchte Wände, Wassereintritt – schnelle Einschätzung und fachgerechte Reparatur.",
    urgent: true
  },
  {
    icon: Wind,
    title: "Heizung & Sanitär",
    description: "Heizung fällt aus, Bad braucht Sanierung – wir prüfen Ursache und Umfang und nennen die nächsten Schritte.",
    urgent: true
  },
  {
    icon: Zap,
    title: "Elektro & Sturmschaden",
    description: "Sicherung fällt aus, Fassade ist beschädigt – fachgerechte Prüfung und schnelle Abhilfe.",
    urgent: true
  },
  {
    icon: HardHat,
    title: "Sanierung & Umbau",
    description: "Ob Komplettsanierung, Bad oder Innenausbau – zeigen Sie uns Ihr Vorhaben, wir kalkulieren digital.",
    urgent: false
  }
];

const trustBadges = [
  { icon: Award, text: "Partnernetzwerk in München" },
  { icon: Shield, text: "Versicherungs-Dokumentation" },
];

const insuranceInfo = [
  "Wohngebäudeversicherung deckt viele Wasserschäden ab",
  "Provisorische Notreparatur meist mitversichert",
  "Folgeschäden durch Wassereintritt oft eingeschlossen",
  "Wir erstellen eine professionelle Schadensdokumentation",
  "Direkte Abwicklung mit Ihrer Versicherung möglich"
];

export default function Notdienst() {
  useSEO({
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    canonical: "https://renodex.de/sofort-hilfe",
    keywords: `${pageData.mainKeyword}, ${pageData.secondaryKeywords.slice(0, 15).join(", ")}`,
    geoRegion: "DE-BY",
    geoPlacename: "München"
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-notdienst">
      <Header phoneNumber={PHONE_NUMBER} />

      <main>
        {/* Hero Section - einheitliches Unterseiten-Muster wie leistungen/thema.tsx, kein Foto (kein verifiziertes Renodex-Bildmaterial vorhanden) */}
        <section
          className="relative bg-zinc-900 py-10 md:py-14 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.88), rgba(24,24,27,0.94)), url(/images/optimized/seite-sofort-hilfe.webp)` }}
          role="img"
          aria-labelledby="hero-h1-sofort-hilfe"
        >
          <KiBildHinweis />
          <div className="max-w-4xl mx-auto px-4">
            <Breadcrumb items={SERVICE_BREADCRUMBS["/sofort-hilfe"]} className="mb-4 text-white/60" />
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-3 py-1.5 rounded-full text-xs font-medium mb-4">
              <MessageCircle className="w-3 h-3 text-yellow-400" />
              Digitale Erstberatung – ohne Besichtigungstermin
            </div>
            <h1 id="hero-h1-sofort-hilfe" className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Digitale Erstberatung für Ihr Bauvorhaben – ohne Besichtigungstermin
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-2xl">
              Ob Komplettsanierung, Badumbau oder akuter Notfall bei Wasser, Heizung oder
              Elektro: Zeigen Sie uns Ihr Anliegen direkt aus dem Handy – per Bild, Video oder
              Sprachnachricht. Wir melden uns zeitnah mit den nächsten Schritten.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/kontakt">
                <Button size="lg" className="btn-glanz gap-2" data-testid="button-notdienst-hero-contact">
                  <MessageCircle className="w-5 h-5" />
                  Jetzt digital anfragen
                </Button>
              </Link>
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2" data-testid="button-notdienst-hero-call">
                  <Phone className="w-5 h-5" />
                  {PHONE_NUMBER}
                </Button>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-full text-xs text-white">
                  <badge.icon className="w-3 h-3 text-yellow-400" />
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        <BackButton />

        {/* Steps Section - Kompakt */}
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-2" data-testid="heading-notdienst-steps">
                So läuft Ihre digitale Erstberatung ab
              </h2>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                Diese 4 Schritte führen von Ihrer Anfrage zur ersten fachlichen Einschätzung –
                egal ob Sanierung, Umbau oder akuter Schaden.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((step) => (
                <Card key={step.step} className="relative overflow-visible" data-testid={`step-${step.step}`}>
                  <div className="absolute -top-3 left-3 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center font-bold text-xs">
                    {step.step}
                  </div>
                  <CardContent className="pt-6 pb-4 px-4">
                    <div className="w-10 h-10 bg-destructive/10 rounded-md flex items-center justify-center mb-3">
                      <step.icon className="w-5 h-5 text-destructive" />
                    </div>
                    <h3 className="font-bold text-sm mb-1" data-testid={`heading-step-${step.step}`}>{step.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-3">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-4">
              <Link href="/kontakt">
                <Button variant="destructive" className="gap-2" data-testid="button-notdienst-steps-contact">
                  <MessageCircle className="w-4 h-4" />
                  Jetzt digital anfragen
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Damage Types Section - Kompakt */}
        <section className="py-6 md:py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-2" data-testid="heading-notdienst-damage">
                Wofür sich die digitale Erstberatung eignet
              </h2>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                Von der akuten Notlage bis zur geplanten Sanierung – melden Sie sich digital,
                wir melden uns zeitnah mit den nächsten Schritten.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {damageTypes.map((damage, index) => (
                <Card key={index} className="border-destructive/30" data-testid={`damage-type-${index}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-destructive/10 rounded-md flex items-center justify-center shrink-0">
                        <damage.icon className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm mb-1" data-testid={`heading-damage-${index}`}>{damage.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{damage.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance Section - Kompakt */}
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-3" data-testid="heading-notdienst-insurance">
                  Versicherungsabwicklung inklusive
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Bei Wasserschaden, Sturmschaden oder anderen versicherten Schäden helfen wir bei der
                  Abwicklung mit Ihrer Versicherung.
                </p>
                <ul className="space-y-2">
                  {insuranceInfo.map((info, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span className="text-sm">{info}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Card className="bg-card border-2 border-destructive/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Building className="w-6 h-6 text-destructive" />
                      <h3 className="text-base font-bold" data-testid="heading-notdienst-card">Schadensmeldung & Versicherung</h3>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Schadensdokumentation</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Kostenvoranschlag für Versicherung</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Unterstützung bei der Abwicklung</span>
                      </div>
                    </div>
                    <Link href="/kontakt">
                      <Button variant="destructive" className="w-full gap-2" data-testid="button-notdienst-insurance-contact">
                        <MessageCircle className="w-4 h-4" />
                        Jetzt digital anfragen
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Longtail SEO Text Section - Kompakt */}
        <section className="py-6 md:py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center" data-testid="heading-notdienst-faq">
              Wann lohnt sich die digitale Erstberatung von Renodex?
            </h2>

            <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Ob Komplettsanierung, Badumbau oder akuter Wasserschaden: Zeigen Sie uns
                Ihr Anliegen digital – per Foto, Video oder Sprachnachricht über unser Kontaktformular. So
                sparen Sie sich einen ersten Besichtigungstermin und erhalten schneller eine Einschätzung.
                Bei einem akuten Schaden wächst schnell die Sorge um das eigene Zuhause, bei einer geplanten
                Sanierung wollen Sie einfach schnell wissen, woran Sie sind -- genau dafür ist unser
                digitaler Weg gedacht: damit Sie nicht in der Warteschleife hängen.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Ältere Münchner Bausubstanz bringt regelmäßig Herausforderungen mit sich – von in die Jahre
                gekommenen Bädern und Heizungsanlagen bis zu maroder Elektrik. Nicht
                jede Installation hält den Anforderungen der Zeit stand, und bei akuten Schäden ist zügiges
                Handeln gefragt. Renodex übernimmt für Sie Koordination, Verwaltung und Bauleitung des gesamten
                Vorhabens; die Ausführung übernehmen geprüfte Betriebe aus unserem Partnernetzwerk, die
                mit dem nötigen Werkzeug, Material und Know-how für Ihre Aufgabe ausgestattet sind.
              </p>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-notdienst-faq-1">
                  <Droplets className="w-4 h-4 text-destructive" />
                  Was tun bei Wasserschaden, Rohrbruch oder Sturmschaden in München?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Ein Wasserschaden kann schwerwiegende Folgen haben: feuchte Wände, beschädigte Böden und
                  im schlimmsten Fall Schimmelbildung. Auch ein Sturm kann die Fassade beschädigen. Bei
                  einem Rohrbruch zählt jede Stunde. Zeigen Sie uns den Schaden
                  digital – wir melden uns zeitnah mit einer Einschätzung und den nächsten Schritten für eine
                  fachgerechte Reparatur.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Wasserschäden entstehen oft schleichend – eine undichte Verbindung, ein alterndes Rohr,
                  ein Materialfehler. Besonders gefährdet sind ältere Leitungssysteme, bei denen die
                  Installation im Laufe der Jahre nachgelassen hat. Nach einem erkannten Wasserschaden sollten
                  Sie die betroffene Stelle unbedingt prüfen lassen – auch wenn auf den ersten Blick alles
                  intakt aussieht.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Feuchtigkeit in Wänden ist besonders tückisch, weil sie oft nicht sofort sichtbar ist.
                  Wasser kann sich in der Bausubstanz ausbreiten, ohne dass es zunächst auffällt. Deshalb
                  empfehlen wir nach jedem erkannten Wasserschaden eine professionelle Einschätzung durch
                  unser Partnernetzwerk.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-notdienst-faq-2">
                  <Wind className="w-4 h-4 text-destructive" />
                  Heizung fällt aus oder Bad ist in die Jahre gekommen – was jetzt?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Bei einem Heizungsausfall zählt vor allem in der kalten Jahreszeit jede Stunde. Ob durch
                  Alter, Defekt oder fehlende Wartung – unser Partnernetzwerk prüft die Ursache und sorgt
                  für eine fachgerechte Reparatur oder, wenn nötig, eine moderne Ersatzlösung. Steht statt
                  einer akuten Reparatur eine geplante Badsanierung oder ein größerer Umbau an, gilt derselbe
                  digitale Weg: Fotos und Angaben zum Vorhaben genügen für die erste Einschätzung.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Eine ausgefallene Heizung ist mehr als nur ein Ärgernis – besonders für Familien mit
                  Kindern ist warmes Wohnklima wichtig. Häufige Ursachen sind Luft im System, ein defekter
                  Thermostat oder eine veraltete Anlage, die ihre Lebensdauer erreicht hat.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Unser Team ist darauf spezialisiert, die Ursache schnell zu lokalisieren. Bei kleineren
                  Problemen ist oft eine zügige Reparatur möglich. Bei einer veralteten Anlage beraten wir
                  Sie gerne auch zu einer modernen Alternative wie einer Wärmepumpe – inklusive
                  Fördermöglichkeiten.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-notdienst-faq-3">
                  <FileText className="w-4 h-4 text-primary" />
                  Zahlt die Versicherung den Wasserschaden?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Wir helfen Ihnen bei der Schadensmeldung und der Abwicklung mit Ihrer Versicherung. Unsere
                  professionelle Schadensdokumentation mit Fotos und detailliertem Bericht ist die Grundlage
                  für eine reibungslose Kostenerstattung durch Ihre Wohngebäude- oder Hausratversicherung.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Die richtige Dokumentation ist entscheidend für eine reibungslose Versicherungsabwicklung.
                  Viele Hausbesitzer machen den Fehler, Schäden zu schnell zu reparieren, ohne vorher
                  ausreichend Beweise zu sichern. Wir wissen genau, worauf Versicherungen achten, und
                  erstellen eine lückenlose Dokumentation.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Wichtig zu wissen: Ihre Wohngebäudeversicherung übernimmt in der Regel die Kosten für
                  plötzliche Wasserschäden. Wir unterstützen Sie bei der Kommunikation mit Ihrer Versicherung
                  und erstellen auf Wunsch einen detaillierten Kostenvoranschlag für die Reparatur.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-notdienst-faq-4">
                  <Clock className="w-4 h-4 text-primary" />
                  Wie schnell erhalte ich eine Rückmeldung?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Wenn Sie uns über das Kontaktformular erreichen, nehmen wir Ihre Situation ernst. Anhand
                  Ihrer Angaben – Fotos, Beschreibung, Dringlichkeit – können wir die Situation einschätzen
                  und Ihnen einen realistischen Zeitrahmen für die nächsten Schritte nennen. In der Regel
                  melden wir uns noch am selben Werktag.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Nach der ersten Einschätzung erhalten Sie eine Rückmeldung mit den nächsten Schritten --
                  ob eine Vor-Ort-Besichtigung nötig ist oder bereits eine erste Empfehlung möglich ist.
                  Transparenz ist uns wichtig – Sie wissen immer, was als Nächstes passiert und warum.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Nutzen Sie unser <strong>digitales Kontaktformular</strong>: Foto, Video oder Sprachnachricht
                genügen für den ersten Schritt. Mit unserem geprüften Partnernetzwerk in
                München und Umgebung sind wir Ihr Ansprechpartner für Koordination und Bauleitung bei
                Komplettsanierungen, Bad- und Wohnungssanierung, Elektroarbeiten sowie akuten
                Notfällen rund um Wasser, Heizung und Sturmschaden.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Unser Einsatzgebiet umfasst München und das Umland im Umkreis von 25 km: von Schwabing über
                Bogenhausen, Haidhausen und Sendling bis nach Pasing, Laim und Obermenzing. Auch im Umland
                wie Grünwald, Puchheim, Germering und Garching sind wir für Sie erreichbar.
              </p>
            </div>
          </div>
        </section>

        {/* Warning Section */}
        <section className="py-12 bg-zinc-50 dark:bg-zinc-950/20 border-y border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900/50 rounded-md flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-zinc-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2 text-zinc-800 dark:text-zinc-200" data-testid="heading-notdienst-warning">
                  Sicherheit geht vor
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Bei einem akuten Schaden gilt: Sicherheit zuerst. Bei Wasserschaden, wenn möglich, die
                  Haupt-Wasserzufuhr abstellen. Bei Elektroproblemen die betroffene Sicherung ausschalten.
                  Arbeiten an Strom- und Gasleitungen sind gefährlich und gehören immer in fachkundige Hände.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Keywords Section */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 text-center">
              {pageData.mainKeyword} – unsere Leistungen bei akutem Bedarf
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

        <ServiceDistrictLinks serviceName="Schnelle Hilfe" serviceSlug="notdienst" />

        {/* Internal Links */}
        <section className="py-12 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-6 text-center" data-testid="heading-notdienst-links">Weitere Informationen von Renodex</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/leistungen">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <HardHat className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-leistungen">Leistungen München</h3>
                      <p className="text-xs text-muted-foreground mt-1">Alle Leistungen im Überblick</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/faq">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <ClipboardCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-preise">Preise & FAQ</h3>
                      <p className="text-xs text-muted-foreground mt-1">Transparente Festpreise</p>
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
