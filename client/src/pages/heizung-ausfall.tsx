import { Phone, Clock, Shield, CheckCircle, Camera, FileText, Award, AlertTriangle, Wrench, Search, Thermometer, Snowflake, MessageCircle, ClipboardCheck, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BackButton from "@/components/BackButton";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb, { SERVICE_BREADCRUMBS } from "@/components/Breadcrumb";
import ServiceDistrictLinks from "@/components/ServiceDistrictLinks";

const PHONE_NUMBER = "[Telefon folgt]";

const symptoms = [
  {
    icon: Snowflake,
    title: "Heizung wird nicht warm",
    description: "Die Heizkörper bleiben kalt oder werden nur lauwarm, obwohl die Anlage läuft.",
  },
  {
    icon: Thermometer,
    title: "Ungleichmäßige Wärme",
    description: "Manche Räume heizen normal, andere bleiben kalt – oft ein Hinweis auf Luft im System.",
  },
  {
    icon: AlertTriangle,
    title: "Anlage schaltet sich ab",
    description: "Die Heizung springt an und fällt kurz darauf wieder aus, teils mit einer Störmeldung.",
  },
  {
    icon: Clock,
    title: "Alte Anlage wird unzuverlässig",
    description: "Häufigere Ausfälle bei einer Heizung, die schon viele Jahre in Betrieb ist.",
  }
];

const causes = [
  {
    title: "Luft im Heizsystem",
    description: "Eingeschlossene Luft verhindert, dass Warmwasser durch die Heizkörper zirkuliert.",
    solution: "Heizkörper entlüften, Druck prüfen"
  },
  {
    title: "Defekter Thermostat oder Fühler",
    description: "Ein fehlerhaftes Bauteil meldet der Anlage falsche Werte oder verhindert das Anspringen.",
    solution: "Bauteil prüfen und austauschen"
  },
  {
    title: "Zu niedriger Wasserdruck",
    description: "Sinkt der Druck im System zu weit ab, schaltet sich die Heizung zum Schutz ab.",
    solution: "Druck auffüllen, Ursache für den Verlust finden"
  },
  {
    title: "Verschlissene Bauteile",
    description: "Pumpe, Zündung oder Steuerung erreichen nach vielen Betriebsjahren ihre Lebensdauer.",
    solution: "Reparatur oder gezielter Austausch"
  },
  {
    title: "Veraltete Anlage insgesamt",
    description: "Bei häufigeren Ausfällen kann sich ein Austausch gegen eine moderne Lösung lohnen.",
    solution: "Beratung zu Reparatur vs. Erneuerung"
  },
  {
    title: "Fehlende Wartung",
    description: "Ohne regelmäßige Prüfung fallen kleine Probleme oft erst bei einem Totalausfall auf.",
    solution: "Zustand prüfen, Wartungsintervall festlegen"
  }
];

const steps = [
  {
    step: 1,
    title: "Problem digital zeigen",
    description: "Foto, Video oder kurze Beschreibung über unser Kontaktformular – ohne Besichtigungstermin.",
    icon: MessageCircle
  },
  {
    step: 2,
    title: "Erste Einschätzung",
    description: "Anhand Ihrer Angaben schätzen wir die Situation ein und melden uns mit den nächsten Schritten.",
    icon: Search
  },
  {
    step: 3,
    title: "Reparatur oder Austausch",
    description: "Je nach Befund beheben wir den Fehler oder beraten zu einer modernen Alternative.",
    icon: Wrench
  },
  {
    step: 4,
    title: "Abnahme und Dokumentation",
    description: "Nach Abschluss der Arbeiten erhalten Sie eine Übersicht über das Erledigte.",
    icon: CheckCircle
  }
];

export default function HeizungAusfall() {
  useSEO({
    title: "Heizungsausfall München – Digitale Erstberatung | Renodex",
    description: "Heizung fällt aus oder wird nicht warm? Zeigen Sie uns das Problem digital – ohne Besichtigungstermin. Renodex prüft Ursache und Lösung für München und Umgebung.",
    canonical: "https://renodex.de/heizung-ausfall",
    keywords: "Heizungsausfall München, Heizung wird nicht warm, Heizung reparieren München, Heizungsproblem",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-heizung-ausfall">
      <Header phoneNumber={PHONE_NUMBER} />

      <main>
        <section className="bg-zinc-900 py-10 md:py-14">
          <div className="max-w-4xl mx-auto px-4">
            <Breadcrumb items={SERVICE_BREADCRUMBS["/heizung-ausfall"]} className="mb-4 text-white/60" />
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-3 py-1.5 rounded-full text-xs font-medium mb-4">
              <MessageCircle className="w-3 h-3 text-yellow-400" />
              Digitale Erstberatung – ohne Besichtigungstermin
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Heizungsausfall in München? So gehen wir vor
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-2xl">
              Kalte Heizkörper mitten im Winter sind unangenehm, vor allem mit Kindern im Haushalt. Zeigen Sie
              uns Ihr Problem direkt aus dem Handy – wir melden uns zeitnah mit einer Einschätzung.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/kontakt">
                <Button size="lg" className="btn-glanz gap-2" data-testid="button-hero-contact">
                  <MessageCircle className="w-5 h-5" />
                  Jetzt digital anfragen
                </Button>
              </Link>
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2" data-testid="button-hero-call">
                  <Phone className="w-5 h-5" />
                  {PHONE_NUMBER}
                </Button>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-full text-xs text-white">
                <Award className="w-3 h-3 text-yellow-400" />
                Partnernetzwerk in München
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-full text-xs text-white">
                <Shield className="w-3 h-3 text-yellow-400" />
                25+ Jahre Erfahrung
              </div>
            </div>
          </div>
        </section>

        <BackButton />

        <section className="py-12" id="main-content">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="heading-symptoms">
                Woran erkennen Sie einen Heizungsausfall?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Diese Anzeichen deuten auf ein Problem an Ihrer Heizungsanlage hin.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {symptoms.map((symptom, idx) => (
                <Card key={idx} className="border-2 hover-elevate">
                  <CardContent className="p-5">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                      <symptom.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold mb-2" data-testid={`heading-symptom-${idx}`}>{symptom.title}</h3>
                    <p className="text-sm text-muted-foreground">{symptom.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="heading-causes">
                Was steckt hinter einem Heizungsausfall?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Wir prüfen die Ursache und finden die passende Lösung.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {causes.map((cause, idx) => (
                <Card key={idx}>
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-2" data-testid={`heading-cause-${idx}`}>{cause.title}</h3>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="heading-process">
                So läuft die digitale Erstberatung ab
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ohne ersten Besichtigungstermin – direkt aus dem Handy.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((item) => (
                <Card key={item.step}>
                  <CardContent className="p-5 text-center">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2" data-testid={`heading-step-${item.step}`}>{item.title}</h3>
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
                <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-repair-or-replace">
                  Reparieren oder erneuern?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Nicht jeder Heizungsausfall bedeutet gleich eine neue Anlage. Wir schauen uns die Situation
                  an und geben eine ehrliche Einschätzung, was für Ihr Zuhause sinnvoll ist.
                </p>
                <ul className="space-y-3">
                  {[
                    "Bei jüngeren Anlagen ist eine gezielte Reparatur meist die richtige Wahl",
                    "Häufen sich die Ausfälle, kann ein Austausch langfristig günstiger sein",
                    "Bei einer Erneuerung beraten wir auch zu Wärmepumpe und Fördermöglichkeiten",
                    "Sie entscheiden in Ruhe – ohne Verkaufsdruck"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <ClipboardCheck className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3" data-testid="heading-inspection">Kostenlose Erstberatung</h3>
                  <p className="text-muted-foreground mb-4">
                    Schildern Sie uns das Problem digital – wir prüfen die Angaben und melden uns mit einer
                    ersten Einschätzung, unverbindlich und kostenfrei.
                  </p>
                  <Link href="/kontakt">
                    <Button className="w-full gap-2" data-testid="button-cta-inspection">
                      <MessageCircle className="w-4 h-4" />
                      Jetzt digital anfragen
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" data-testid="heading-faq">
              Häufige Fragen zum Heizungsausfall
            </h2>

            <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none space-y-4">
              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-faq-1">
                  <Thermometer className="w-4 h-4 text-primary" />
                  Was tun, wenn die Heizung mitten im Winter ausfällt?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Prüfen Sie zunächst, ob Störmeldungen am Gerät angezeigt werden, und ob genug Wasserdruck
                  im System vorhanden ist. Danach zeigen Sie uns das Problem am besten digital – per Foto von
                  Anzeige und Anlage – über unser Kontaktformular. So können wir die Situation einschätzen,
                  ohne dass Sie auf einen ersten Vor-Ort-Termin warten müssen.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-faq-2">
                  <Search className="w-4 h-4 text-primary" />
                  Woran erkenne ich, ob sich eine Reparatur noch lohnt?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Das hängt vom Alter der Anlage, der Häufigkeit der Ausfälle und den Kosten der Reparatur ab.
                  Eine junge Heizung mit einem einzelnen Defekt lässt sich meist unkompliziert reparieren. Bei
                  einer älteren Anlage mit wiederkehrenden Problemen lohnt sich oft ein Blick auf moderne
                  Alternativen wie eine Wärmepumpe – auch mit Blick auf mögliche Förderungen.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-faq-3">
                  <Clock className="w-4 h-4 text-primary" />
                  Wie schnell erhalte ich eine Rückmeldung?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Nach Ihrer digitalen Anfrage melden wir uns in der Regel noch am selben Werktag mit einer
                  ersten Einschätzung und den nächsten Schritten. So wissen Sie schnell, woran Sie sind – ohne
                  in einer Warteschleife zu hängen.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Als Partnernetzwerk mit über 25 Jahren Erfahrung ist Renodex Ihr Ansprechpartner für
                Heizungsprobleme in München und Umgebung im Umkreis von 25 km – von Schwabing über
                Bogenhausen und Sendling bis nach Pasing, Laim und Obermenzing, ebenso im Umland wie
                Grünwald, Puchheim, Germering und Garching. Eine Heizungssanierung ist oft nur ein Teil eines
                größeren Vorhabens – wir koordinieren auf Wunsch auch weitere Gewerke wie Sanitär oder Elektro
                aus einer Hand.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-zinc-50 dark:bg-zinc-950/20 border-y border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900/50 rounded-md flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-zinc-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2 text-zinc-800 dark:text-zinc-200" data-testid="heading-warning">
                  Sicherheit geht vor
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Bei einem Verdacht auf ein Gasleck oder ungewöhnlichem Geruch an der Heizungsanlage: sofort
                  lüften, die Anlage nicht bedienen und den Gasnotdienst kontaktieren. Arbeiten an Gas- und
                  Stromleitungen gehören immer in fachkundige Hände.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ServiceDistrictLinks serviceName="Heizungsreparatur" serviceSlug="heizung-ausfall" />

        <section className="py-12 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Thermometer className="w-12 h-12 mx-auto mb-4 text-blue-200" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-cta">
              Heizung ausgefallen? Zeigen Sie uns das Problem digital
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Foto, Video oder Sprachnachricht genügen für den ersten Schritt – ohne Besichtigungstermin.
            </p>
            <Link href="/kontakt">
              <Button aria-label="Aktion" size="lg" variant="secondary" className="font-bold gap-2" data-testid="button-cta-contact">
                <MessageCircle className="w-5 h-5" />
                Jetzt digital anfragen
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-12 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-6 text-center" data-testid="heading-links">Weitere Informationen von Renodex</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/leistungen/heizung">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <HardHat className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-heizung">Heizungsinstallation</h3>
                      <p className="text-xs text-muted-foreground mt-1">Modernisierung & Neuinstallation</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/sofort-hilfe">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-sofort-hilfe">Digitale Erstberatung</h3>
                      <p className="text-xs text-muted-foreground mt-1">Wasserschaden, Rohrbruch & mehr</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/kontakt">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <ClipboardCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
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
