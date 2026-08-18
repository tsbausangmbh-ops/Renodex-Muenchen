import { AlertTriangle, Phone, Clock, Shield, CheckCircle, Camera, FileText, Star, Award, ThumbsUp, Wind, CloudRain, Building, BadgeAlert, Timer, HardHat, ClipboardCheck, Wrench, FileCheck, Euro, Hammer } from "lucide-react";
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
import heroImage from "@assets/generated_images/storm_damaged_roof_emergency.png";

const PHONE_NUMBER = "[Telefon folgt]";

const stormDamageTypes = [
  {
    icon: Wind,
    title: "Abgedeckte Dachziegel München",
    description: "Durch starken Wind gelöste oder komplett abgerissene Dachziegel, offene Stellen auf dem Dach.",
    action: "Sofortabsicherung & Neueindeckung"
  },
  {
    icon: CloudRain,
    title: "Hagelschaden Dach München",
    description: "Dellen, Risse und Brüche an Dachziegeln, Blechverkleidungen oder Dachfenstern durch Hagel.",
    action: "Schadensaufnahme & Reparatur"
  },
  {
    icon: Building,
    title: "Beschädigter Dachstuhl München",
    description: "Durch umgestürzte Bäume oder extreme Windlasten beschädigte Holzkonstruktion des Daches.",
    action: "Statikprüfung & Sanierung"
  },
  {
    icon: BadgeAlert,
    title: "Dachrinnen Reparatur München",
    description: "Abgerissene oder beschädigte Dachrinnen und Fallrohre durch Sturmeinwirkung.",
    action: "Spengler-Reparatur"
  }
];

const insuranceSteps = [
  {
    step: 1,
    title: "Sturmschaden dokumentieren",
    description: "Fotografieren Sie alle sichtbaren Schäden sofort nach dem Sturm. Datum und Uhrzeit notieren.",
    icon: Camera
  },
  {
    step: 2,
    title: "Versicherung München melden",
    description: "Melden Sie den Sturmschaden innerhalb von 3 Tagen bei Ihrer Gebäudeversicherung.",
    icon: Phone
  },
  {
    step: 3,
    title: "Dachdecker Kostenvoranschlag",
    description: "Wir erstellen einen detaillierten Kostenvoranschlag für Ihre Versicherung.",
    icon: FileCheck
  },
  {
    step: 4,
    title: "Dach Reparatur München",
    description: "Nach Freigabe durch die Versicherung führen wir die fachgerechte Reparatur durch.",
    icon: Hammer
  }
];

const trustBadges = [
  { icon: Clock, text: "24/7 Sturmschaden-Sofort-Hilfe" },
  { icon: Award, text: "Partnernetzwerk" },
  { icon: ThumbsUp, text: "200+ Sturmschäden repariert" },
  { icon: Shield, text: "Direkte Versicherungsabwicklung" },
];

const stats = [
  { value: "24h", label: "Reaktionszeit", subtext: "Nach Sturmschaden-Meldung" },
  { value: "200+", label: "Reparierte Sturmschäden", subtext: "In München & Umgebung" },
  { value: "100%", label: "Versicherungs-Akzeptanz", subtext: "Bei unseren Gutachten" },
  { value: "15", label: "Jahre Erfahrung", subtext: "Mit Sturmschäden" },
];

export default function Sturmschaden() {
  useSEO({
    title: "Sturmschaden Dach München - Soforthilfe & Versicherung | Renodex",
    description: "Sturmschaden am Dach? Professionelle Reparatur in München mit direkter Versicherungsabwicklung. 24/7 Sofort-Hilfe, Gutachten & fachgerechte Sanierung.",
    canonical: "https://renodex.de/sturmschaden",
    keywords: "Sturmschaden Dach München, Sturmschaden Versicherung, Dach Sturmschaden reparieren, Sturmschaden Gutachten München",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-sturmschaden">
      <Header phoneNumber={PHONE_NUMBER} />
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb items={[
          { label: "Startseite", href: "/" },
          { label: "Leistungen", href: "/leistungen" },
          { label: "Sturmschaden" }
        ]} />
      </div>

      <main>
        <section 
          className="py-10 md:py-12 text-white relative bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/60 via-zinc-700/50 to-zinc-800/65" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-xs font-medium mb-3">
                  <Wind className="w-3 h-3 text-yellow-400" />
                  Sturmschaden-Experten München
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  Sturmschaden Dach München –<br />
                  <span className="text-yellow-300">Dachdecker Soforthilfe & Reparatur</span>
                </h1>
                
                <p className="text-lg mb-4 text-white/90">
                  Ihr Dach wurde durch einen Sturm beschädigt? Wir helfen sofort: Von der Notabsicherung über die Versicherungsdokumentation bis zur fachgerechten Reparatur.
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {trustBadges.map((badge, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-white/20 text-white border-white/30 py-1">
                      <badge.icon className="w-3 h-3 mr-1" />
                      {badge.text}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                    <Button size="lg" className="w-full sm:w-auto bg-white text-zinc-700 font-bold" data-testid="button-call-hero">
                      <Phone className="w-4 h-4 mr-2" />
                      {PHONE_NUMBER} anrufen
                    </Button>
                  </a>
                  <Link href="/kontakt">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/50 text-white bg-white/10" data-testid="button-contact-hero">
                      <FileText className="w-4 h-4 mr-2" />
                      Schaden melden
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block">
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" data-testid="heading-storm-steps">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      Sturmschaden Dach München: Was tun?
                    </h2>
                    <ol className="space-y-3 text-sm">
                      <li className="flex gap-3">
                        <span className="bg-yellow-400 text-zinc-900 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                        <span>Ruhe bewahren, Gebäude sichern</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="bg-yellow-400 text-zinc-900 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                        <span>Schäden sofort fotografieren</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="bg-yellow-400 text-zinc-900 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                        <span>Uns anrufen: {PHONE_NUMBER}</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="bg-yellow-400 text-zinc-900 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs shrink-0">4</span>
                        <span>Versicherung informieren</span>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm font-medium">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.subtext}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12" id="main-content">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="heading-storm-types">
                Typische Sturmschäden am Dach München
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Stürme können verschiedene Schäden an Ihrem Dach verursachen. Wir sind auf alle Arten von Sturmschäden spezialisiert.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stormDamageTypes.map((damage, idx) => (
                <Card key={idx} className="border-2 hover-elevate">
                  <CardContent className="p-5">
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900/30 rounded-lg flex items-center justify-center mb-4">
                      <damage.icon className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
                    </div>
                    <h3 className="font-semibold mb-2" data-testid={`heading-storm-damage-${idx}`}>{damage.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{damage.description}</p>
                    <Badge variant="outline" className="text-xs">
                      <Wrench className="w-3 h-3 mr-1" />
                      {damage.action}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="heading-storm-insurance">
                Sturmschaden Versicherung München: So läuft die Abwicklung
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Wir unterstützen Sie bei der kompletten Versicherungsabwicklung - von der Dokumentation bis zur Reparatur.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {insuranceSteps.map((item, idx) => (
                <Card key={idx}>
                  <CardContent className="p-5 text-center">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2" data-testid={`heading-insurance-step-${idx}`}>{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-storm-coverage">
                  Sturmschaden Dach – Was zahlt die Versicherung?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Die Wohngebäudeversicherung deckt Sturmschäden in der Regel ab Windstärke 8 (ab 62 km/h). Hier erfahren Sie, was typischerweise versichert ist:
                </p>
                <ul className="space-y-3">
                  {[
                    "Reparatur abgedeckter oder zerbrochener Dachziegel",
                    "Provisorische Notabdeckung zur Schadensbegrenzung",
                    "Folgeschäden durch eindringendes Regenwasser",
                    "Aufräum- und Entsorgungskosten",
                    "Gutachterkosten und Dokumentation"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="bg-zinc-50 dark:bg-zinc-950/30 border-zinc-200 dark:border-zinc-800">
                <CardContent className="p-6">
                  <Euro className="w-10 h-10 text-zinc-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3" data-testid="heading-storm-consultation">Kostenfreie Erstberatung München</h3>
                  <p className="text-muted-foreground mb-4">
                    Wir begutachten Ihren Sturmschaden vor Ort und erstellen einen detaillierten Kostenvoranschlag für Ihre Versicherung - kostenfrei und unverbindlich.
                  </p>
                  <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                    <Button className="w-full" data-testid="button-call-insurance">
                      <Phone className="w-4 h-4 mr-2" />
                      Jetzt Termin vereinbaren
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <ServiceDistrictLinks serviceName="Sturmschaden Reparatur" serviceSlug="sturmschaden" />

        <section className="py-12 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-storm-cta">
              Sturmschaden Dach München? Wir helfen sofort!
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Rufen Sie uns jetzt an für schnelle Hilfe bei Sturmschäden in München und Umgebung.
            </p>
            <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
              <Button aria-label="Aktion" size="lg" variant="secondary" className="font-bold" data-testid="button-call-cta">
                <Phone className="w-5 h-5 mr-2" />
                {PHONE_NUMBER}
              </Button>
            </a>
          </div>
        </section>

        <section className="py-10 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-semibold mb-6 text-center" data-testid="heading-storm-services">Weitere Dachdecker Leistungen München</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/sofort-hilfe">
                <Button variant="outline" data-testid="link-notdienst">
                  <Clock className="w-4 h-4 mr-2" />
                  24/7 Sofort-Hilfe
                </Button>
              </Link>
              <Link href="/heizung-ausfall">
                <Button variant="outline" data-testid="link-dach-undicht">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Dach undicht
                </Button>
              </Link>
              <Link href="/sanierung-reparatur">
                <Button variant="outline" data-testid="link-dach-reparieren">
                  <Wrench className="w-4 h-4 mr-2" />
                  Dach reparieren
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button variant="outline" data-testid="link-kontakt">
                  <Phone className="w-4 h-4 mr-2" />
                  Kontakt
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
      <BackButton />
    </div>
  );
}
