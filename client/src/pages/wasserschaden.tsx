import { AlertTriangle, Phone, Clock, Shield, CheckCircle, Camera, FileText, Award, Droplets, Building, BadgeAlert, ClipboardCheck, Wrench, FileCheck, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BackButton from "@/components/BackButton";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb from "@/components/Breadcrumb";
import ServiceDistrictLinks from "@/components/ServiceDistrictLinks";
import KiBildHinweis from "@/components/KiBildHinweis";

const PHONE_NUMBER = "[Telefon folgt]";

const waterDamageTypes = [
  {
    icon: Droplets,
    title: "Rohrbruch in Haus oder Wohnung",
    description: "Geplatzte oder undichte Wasserleitung, oft erst an feuchten Wänden oder Decken erkennbar.",
    action: "Leckortung & Reparatur"
  },
  {
    icon: Building,
    title: "Feuchte Wände und Decken",
    description: "Wassereintritt durch undichte Stellen im Mauerwerk oder an Fenstern.",
    action: "Ursachensuche & Abdichtung"
  },
  {
    icon: BadgeAlert,
    title: "Wassereintritt nach Starkregen",
    description: "Eindringendes Wasser über Balkon oder Kellerabgang bei starkem Regen.",
    action: "Sofortmaßnahmen & Sanierung"
  },
  {
    icon: Wrench,
    title: "Defekte Sanitärinstallation",
    description: "Undichte Anschlüsse an Waschbecken, Dusche oder Heizung, die auf Dauer Schäden verursachen.",
    action: "Prüfung & Instandsetzung"
  }
];

const insuranceSteps = [
  {
    step: 1,
    title: "Wasserschaden dokumentieren",
    description: "Fotografieren Sie den Schaden und notieren Sie, wann er aufgefallen ist.",
    icon: Camera
  },
  {
    step: 2,
    title: "Versicherung informieren",
    description: "Melden Sie den Wasserschaden zeitnah bei Ihrer Gebäude- oder Hausratversicherung.",
    icon: Phone
  },
  {
    step: 3,
    title: "Kostenvoranschlag erhalten",
    description: "Wir erstellen einen detaillierten Kostenvoranschlag für Ihre Versicherung.",
    icon: FileCheck
  },
  {
    step: 4,
    title: "Fachgerechte Instandsetzung",
    description: "Nach Freigabe koordinieren wir die notwendigen Gewerke aus einer Hand.",
    icon: ClipboardCheck
  }
];

const trustBadges = [
  { icon: Clock, text: "Antwort meist am selben Werktag" },
  { icon: Award, text: "Partnernetzwerk aus geprüften Meisterfirmen" },
  { icon: Shield, text: "Unterstützung bei der Versicherungsabwicklung" },
];

export default function Wasserschaden() {
  useSEO({
    title: "Wasserschaden München – Digitale Erstberatung | Renodex",
    description: "Wasserschaden in Haus oder Wohnung? Zeigen Sie uns den Schaden digital per Foto oder Video – Renodex meldet sich mit den nächsten Schritten.",
    canonical: "https://renodex.de/wasserschaden",
    keywords: "Wasserschaden München, Rohrbruch München, feuchte Wand München, Wasserschaden Versicherung",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-wasserschaden">
      <Header phoneNumber={PHONE_NUMBER} />

      <main>
        <section
          className="relative bg-zinc-900 py-10 md:py-14 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.88), rgba(24,24,27,0.94)), url(/images/optimized/seite-wasserschaden.webp)` }}
          role="img"
          aria-labelledby="hero-h1-wasserschaden"
        >
          <KiBildHinweis />
          <div className="max-w-4xl mx-auto px-4">
            <Breadcrumb
              items={[
                { label: "Leistungen", href: "/leistungen" },
                { label: "Wasserschaden" },
              ]}
              className="mb-4 text-white/60"
            />
            <h1 id="hero-h1-wasserschaden" className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Wasserschaden in München – was jetzt zu tun ist
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-2xl">
              Ein Rohrbruch, eine feuchte Wand oder Wassereintritt nach Starkregen – zeigen Sie uns den Schaden direkt aus dem Handy per Foto, Video oder Sprachnachricht. Wir melden uns mit den nächsten Schritten und unterstützen bei der Versicherungsabwicklung.
            </p>

            <div className="flex flex-wrap gap-2 mt-6 mb-8">
              {trustBadges.map((badge, idx) => (
                <Badge key={idx} variant="secondary" className="bg-white/10 text-white border-white/20 py-1">
                  <badge.icon className="w-3 h-3 mr-1" />
                  {badge.text}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/kontakt">
                <Button size="lg" className="btn-glanz w-full sm:w-auto gap-2" data-testid="button-contact-hero">
                  <FileText className="w-5 h-5" />
                  Schaden digital melden
                </Button>
              </Link>
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white bg-white/10 gap-2" data-testid="button-call-hero">
                  <Phone className="w-4 h-4" />
                  {PHONE_NUMBER}
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-12" id="main-content">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="heading-damage-types">
                Typische Wasserschäden in Haus und Wohnung
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Wasserschäden entstehen oft schleichend. Wir übernehmen die Ursachensuche und koordinieren die notwendigen Gewerke.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {waterDamageTypes.map((damage, idx) => (
                <Card key={idx} className="border-2 hover-elevate">
                  <CardContent className="p-5">
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900/30 rounded-lg flex items-center justify-center mb-4">
                      <damage.icon className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
                    </div>
                    <h3 className="font-semibold mb-2" data-testid={`heading-damage-${idx}`}>{damage.title}</h3>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="heading-insurance">
                Wasserschaden und Versicherung – so läuft die Abwicklung
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Wir unterstützen Sie bei der Versicherungsabwicklung – von der Dokumentation bis zur fachgerechten Instandsetzung.
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
                <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-coverage">
                  Was übernimmt die Versicherung bei einem Wasserschaden?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Die Gebäude- oder Hausratversicherung übernimmt Wasserschäden in vielen Fällen, abhängig vom Versicherungsumfang. Typischerweise gehören dazu:
                </p>
                <ul className="space-y-3">
                  {[
                    "Reparatur der schadhaften Leitung oder Installation",
                    "Trocknung und Sanierung betroffener Bauteile",
                    "Folgeschäden an Wänden, Decken und Böden",
                    "Aufräum- und Entsorgungskosten",
                    "Dokumentation für die Versicherung"
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
                  <h3 className="text-xl font-semibold mb-3" data-testid="heading-consultation">Kostenlose Erstberatung digital</h3>
                  <p className="text-muted-foreground mb-4">
                    Zeigen Sie uns den Schaden über unser Kontaktformular – wir melden uns mit einer Einschätzung und den nächsten Schritten.
                  </p>
                  <Link href="/kontakt">
                    <Button className="w-full" data-testid="button-contact-consultation">
                      <FileText className="w-4 h-4 mr-2" />
                      Jetzt digital anfragen
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <ServiceDistrictLinks serviceName="Wasserschaden Sanierung" serviceSlug="wasserschaden" />

        <section className="py-12 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-cta">
              Wasserschaden in München? Wir helfen weiter.
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Melden Sie sich digital – wir melden uns zeitnah mit den nächsten Schritten.
            </p>
            <Link href="/kontakt">
              <Button aria-label="Aktion" size="lg" variant="secondary" className="font-bold" data-testid="button-cta">
                <FileText className="w-5 h-5 mr-2" />
                Jetzt digital anfragen
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-10 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-semibold mb-6 text-center" data-testid="heading-related-services">Weitere Leistungen von Renodex</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/sofort-hilfe">
                <Button variant="outline" data-testid="link-sofort-hilfe">
                  <Clock className="w-4 h-4 mr-2" />
                  Digitale Erstberatung
                </Button>
              </Link>
              <Link href="/leistungen/sanitaer">
                <Button variant="outline" data-testid="link-sanitaer">
                  <Droplets className="w-4 h-4 mr-2" />
                  Sanitärinstallation
                </Button>
              </Link>
              <Link href="/leistungen/mauerwerksabdichtung">
                <Button variant="outline" data-testid="link-abdichtung">
                  <Shield className="w-4 h-4 mr-2" />
                  Mauerwerksabdichtung
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
