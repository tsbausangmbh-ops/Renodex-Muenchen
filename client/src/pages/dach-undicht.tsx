import { Droplets, Phone, Clock, Shield, CheckCircle, Camera, FileText, Award, ThumbsUp, AlertTriangle, Home, Wrench, Search, Thermometer, CloudRain, Building, Timer, HardHat } from "lucide-react";
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
import heroImage from "@assets/generated_images/storm_damaged_roof_emergency.png";

const PHONE_NUMBER = "[Telefon folgt]";

const leakSymptoms = [
  {
    icon: Droplets,
    title: "Wasserflecken Decke München",
    description: "Braune oder gelbliche Flecken an Zimmerdecken sind oft erste Anzeichen einer Dachleckage.",
    urgency: "Mittel"
  },
  {
    icon: CloudRain,
    title: "Wassereintritt Dach München",
    description: "Aktiver Wassereintritt bei Regen - sofortiges Handeln erforderlich, um Folgeschäden zu vermeiden.",
    urgency: "Hoch"
  },
  {
    icon: Thermometer,
    title: "Feuchte Dämmung München",
    description: "Durchfeuchtete Isolierung verliert ihre Wirkung und begünstigt Schimmelbildung.",
    urgency: "Mittel"
  },
  {
    icon: Building,
    title: "Schimmel Dach München",
    description: "Schimmelflecken im Dachgeschoss oder an Wänden deuten auf langfristige Feuchtigkeit hin.",
    urgency: "Hoch"
  }
];

const leakCauses = [
  {
    title: "Beschädigte Dachziegel München",
    description: "Gebrochene, verschobene oder fehlende Ziegel lassen Wasser eindringen.",
    solution: "Ziegel austauschen oder neu verlegen"
  },
  {
    title: "Defekte Dachdurchführungen München",
    description: "Undichte Anschlüsse an Kaminen, Lüftungsrohren oder Dachfenstern.",
    solution: "Anschlüsse fachgerecht abdichten"
  },
  {
    title: "Verstopfte Dachrinnen München",
    description: "Überlaufendes Wasser kann unter Dachziegel oder in die Fassade eindringen.",
    solution: "Rinnen reinigen und prüfen"
  },
  {
    title: "Flachdach Abdichtung München",
    description: "Bei Flachdächern: Risse in der Bitumen- oder Folienabdichtung.",
    solution: "Abdichtung erneuern oder flicken"
  },
  {
    title: "Dach Kondensation München",
    description: "Mangelnde Belüftung führt zu Feuchtigkeit von innen.",
    solution: "Belüftung verbessern, Dampfsperre prüfen"
  },
  {
    title: "Sturmschäden Dach München",
    description: "Durch Wind gelöste Elemente oder Hagelschäden.",
    solution: "Sofortreparatur und Versicherungsmeldung"
  }
];

const repairSteps = [
  {
    step: 1,
    title: "Leckageortung München",
    description: "Professionelle Suche nach der Ursache mit modernsten Methoden.",
    icon: Search
  },
  {
    step: 2,
    title: "Dach Sofortabdichtung",
    description: "Provisorische Abdichtung, um weitere Wasserschäden zu verhindern.",
    icon: Shield
  },
  {
    step: 3,
    title: "Dachreparatur München",
    description: "Fachgerechte Beseitigung der Ursache und Wiederherstellung.",
    icon: Wrench
  },
  {
    step: 4,
    title: "Dach Qualitätskontrolle",
    description: "Dichtheitsprüfung und Dokumentation der durchgeführten Arbeiten.",
    icon: CheckCircle
  }
];

const trustBadges = [
  { icon: Clock, text: "Schnelle Hilfe bei Wasserschaden" },
  { icon: Award, text: "[Gründungsjahr folgt] in München" },
  { icon: ThumbsUp, text: "Festpreisgarantie" },
  { icon: Shield, text: "10 Jahre Gewährleistung" },
];

const stats = [
  { value: "24h", label: "Reaktionszeit", subtext: "Bei Wassereintritt" },
  { value: "500+", label: "Leckagen behoben", subtext: "In München & Umgebung" },
  { value: "98%", label: "Erfolgsquote", subtext: "Bei Erstbesuch" },
  { value: "10 J.", label: "Garantie", subtext: "Auf unsere Arbeit" },
];

export default function DachUndicht() {
  useSEO({
    title: "Dach undicht München - Schnelle Hilfe & Reparatur | Renodex",
    description: "Undichtes Dach in München? Professionelle Leckageortung und Reparatur. Schnelle Hilfe bei Wasserschaden, Festpreise & 10 Jahre Garantie.",
    canonical: "https://renodex.de/dach-undicht",
    keywords: "Dach undicht München, Dachleckage reparieren, Wasserschaden Dach, undichtes Dach abdichten München",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-dach-undicht">
      <Header phoneNumber={PHONE_NUMBER} />
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb items={[
          { label: "Startseite", href: "/" },
          { label: "Leistungen", href: "/leistungen" },
          { label: "Dach undicht" }
        ]} />
      </div>

      <main>
        <section 
          className="py-10 md:py-12 text-white relative bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-800/60 via-blue-700/50 to-blue-800/65" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-xs font-medium mb-3">
                  <Droplets className="w-3 h-3 text-blue-300" />
                  Leckage-Experten München
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight" data-testid="heading-leak-hero">
                  Dach undicht München?<br />
                  <span className="text-blue-200">Leckortung & Reparatur vom Meister</span>
                </h1>
                
                <p className="text-lg mb-4 text-white/90">
                  Wasserflecken an der Decke? Tropfendes Wasser bei Regen? Wir lokalisieren die Leckage präzise und reparieren Ihr Dach nachhaltig - mit Festpreisgarantie.
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
                    <Button size="lg" className="w-full sm:w-auto bg-white text-blue-700 font-bold" data-testid="button-call-hero">
                      <Phone className="w-4 h-4 mr-2" />
                      {PHONE_NUMBER} anrufen
                    </Button>
                  </a>
                  <Link href="/kontakt">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/50 text-white bg-white/10" data-testid="button-contact-hero">
                      <FileText className="w-4 h-4 mr-2" />
                      Anfrage senden
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block">
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" data-testid="heading-leak-firstaid">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      Dach undicht München: Erste Hilfe
                    </h2>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                        <span>Eimer unter tropfende Stellen stellen</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                        <span>Möbel und Wertgegenstände schützen</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                        <span>Fotos zur Dokumentation machen</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                        <span>Uns anrufen: {PHONE_NUMBER}</span>
                      </li>
                    </ul>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="heading-leak-symptoms">
                Anzeichen für ein undichtes Dach München erkennen
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Erkennen Sie diese Symptome frühzeitig, um größere Schäden zu vermeiden.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leakSymptoms.map((symptom, idx) => (
                <Card key={idx} className="border-2 hover-elevate">
                  <CardContent className="p-5">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                      <symptom.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold mb-2" data-testid={`heading-leak-symptom-${idx}`}>{symptom.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{symptom.description}</p>
                    <Badge variant={symptom.urgency === "Hoch" ? "destructive" : "secondary"} className="text-xs">
                      Dringlichkeit: {symptom.urgency}
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
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="heading-leak-causes">
                Häufige Ursachen für Dachleckagen in München
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Wir identifizieren die Ursache und beheben das Problem dauerhaft.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leakCauses.map((cause, idx) => (
                <Card key={idx}>
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-2" data-testid={`heading-leak-cause-${idx}`}>{cause.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{cause.description}</p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Wrench className="w-4 h-4" />
                      {cause.solution}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="heading-leak-process">
                Dachreparatur München – Unser Prozess
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Systematisch und effizient zur dauerhaften Lösung.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {repairSteps.map((item, idx) => (
                <Card key={idx}>
                  <CardContent className="p-5 text-center">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2" data-testid={`heading-repair-step-${idx}`}>{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-leak-urgency">
                  Undichtes Dach – Warum schnelles Handeln wichtig ist
                </h2>
                <p className="text-muted-foreground mb-6">
                  Ein undichtes Dach kann schnell zu erheblichen Folgeschäden führen. Je länger Sie warten, desto teurer wird die Reparatur.
                </p>
                <ul className="space-y-3">
                  {[
                    "Durchfeuchtete Dämmung verliert ihre Wirkung",
                    "Schimmelbildung gefährdet die Gesundheit",
                    "Holzkonstruktion kann dauerhaft beschädigt werden",
                    "Elektrische Leitungen können betroffen sein",
                    "Folgeschäden an Wänden und Decken"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <Home className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3" data-testid="heading-leak-inspection">Kostenlose Dachinspektion München</h3>
                  <p className="text-muted-foreground mb-4">
                    Wir begutachten Ihr undichtes Dach vor Ort und erstellen einen transparenten Kostenvoranschlag - kostenfrei und unverbindlich.
                  </p>
                  <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                    <Button className="w-full" data-testid="button-call-inspection">
                      <Phone className="w-4 h-4 mr-2" />
                      Jetzt Termin vereinbaren
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <ServiceDistrictLinks serviceName="Dachleckage Reparatur" serviceSlug="dach-undicht" />

        <section className="py-12 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Droplets className="w-12 h-12 mx-auto mb-4 text-blue-200" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-leak-cta">
              Dach undicht München? Wir helfen schnell!
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Rufen Sie uns jetzt an für professionelle Hilfe bei undichten Dächern in München.
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
            <h2 className="text-xl font-semibold mb-6 text-center" data-testid="heading-leak-services">Weitere Dachdecker Leistungen München</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/notdienst">
                <Button variant="outline" data-testid="link-notdienst">
                  <Clock className="w-4 h-4 mr-2" />
                  24/7 Sofort-Hilfe
                </Button>
              </Link>
              <Link href="/sturmschaden">
                <Button variant="outline" data-testid="link-sturmschaden">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Sturmschaden
                </Button>
              </Link>
              <Link href="/dach-reparieren">
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
