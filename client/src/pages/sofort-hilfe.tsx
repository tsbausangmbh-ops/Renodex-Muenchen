import { AlertTriangle, Phone, Clock, Shield, CheckCircle, Zap, Camera, FileText, Star, Award, ThumbsUp, ArrowRight, CloudRain, Wind, Droplets, Building, Umbrella, BadgeAlert, Siren, Timer, PhoneCall, HardHat, ClipboardCheck, MessageCircle } from "lucide-react";
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
import heroImage from "@assets/generated_images/storm_damaged_roof_emergency.png";

const PHONE_NUMBER = "[Telefon folgt]";
const pageData = mainPagesKeywords.notdienst;

const emergencySteps = [
  {
    step: 1,
    title: "Ruhe bewahren & Sicherheit München",
    description: "Bringen Sie sich in Sicherheit. Niemals selbst aufs Dach steigen – Unfallgefahr bei Sturmschaden Dach München!",
    icon: Shield
  },
  {
    step: 2,
    title: "Schäden dokumentieren München",
    description: "Fotografieren Sie den Dachschaden Notfall für die Sturmschaden Versicherung München Abwicklung.",
    icon: Camera
  },
  {
    step: 3,
    title: "Dach Sofort-Hilfe München anrufen",
    description: "Rufen Sie unseren 24h Sofort-Hilfe Dach an:" + PHONE_NUMBER + " – Soforthilfe in 24 Stunden.",
    icon: Phone
  },
  {
    step: 4,
    title: "Versicherung München informieren",
    description: "Wir helfen bei der kompletten Sturmschaden Abwicklung Versicherung und Dokumentation.",
    icon: FileText
  }
];

const damageTypes = [
  {
    icon: Wind,
    title: "Sturmschaden Dach München",
    description: "Abgedeckte Dachziegel, beschädigte Firstkappen, gelöste Blechverkleidungen nach Sturm.",
    urgent: true
  },
  {
    icon: Droplets,
    title: "Dach undicht Notfall München",
    description: "Akute Dachleckage mit Wassereintritt – schnelle Dach Notreparatur München erforderlich.",
    urgent: true
  },
  {
    icon: CloudRain,
    title: "Hagelschaden Dach München",
    description: "Beschädigte Dachziegel Sturm, Dellen in Blechdächern, zerstörte Dachfenster.",
    urgent: true
  },
  {
    icon: Umbrella,
    title: "Wasserschaden Dach München",
    description: "Tropfende Decken, Wasserflecken, feuchte Dämmung – Notfall Dachdecker München hilft.",
    urgent: true
  }
];

const trustBadges = [
  { icon: Clock, text: "Dach Sofort-Hilfe 24/7 erreichbar" },
  { icon: Award, text: "Notfall Dachdecker München Partnernetzwerk" },
  { icon: ThumbsUp, text: "200+ Sturmschäden repariert" },
  { icon: Shield, text: "Sturmschaden Versicherung Abwicklung" },
];

const stats = [
  { value: "24/7", label: "Dach Sofort-Hilfe Telefon", subtext: "Auch nachts & am Wochenende" },
  { value: "<24h", label: "Schnelle Dach Reparatur", subtext: "Dach Soforthilfe München" },
  { value: "200+", label: "Sturmschäden repariert", subtext: "Erfahrung bei Dachschaden Notfall" },
  { value: "100%", label: "Versicherungs-Dokumentation", subtext: "Sturmschaden Abwicklung" },
];

const insuranceInfo = [
  "Wohngebäudeversicherung deckt Sturmschaden Dach München ab Windstärke 8",
  "Provisorische Dach Notreparatur München meist mitversichert",
  "Wasserschaden Dach München Folgeschäden oft eingeschlossen",
  "Aufräumarbeiten nach Sturmschaden in der Regel abgedeckt",
  "Wir erstellen professionelle Sturmschaden Dokumentation",
  "Direkte Sturmschaden Abwicklung Versicherung möglich"
];

export default function Notdienst() {
  useSEO({
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    canonical: "https://renodex.de/notdienst",
    keywords: `${pageData.mainKeyword}, ${pageData.secondaryKeywords.slice(0, 15).join(", ")}`,
    geoRegion: "DE-BY",
    geoPlacename: "München"
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-notdienst">
      <Header phoneNumber={PHONE_NUMBER} />
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb items={SERVICE_BREADCRUMBS["/sofort-hilfe"]} />
      </div>

      <main>
        {/* Hero Section - Kompakt mit rotem Hintergrund und Bild */}
        <section 
          className="py-10 md:py-12 text-white relative bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-zinc-800/45 to-primary/50" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-xs font-medium mb-3 animate-pulse">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  24/7 Sofort-Hilfe – Jetzt erreichbar
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                  Dach Sofort-Hilfe München 24/7 – Soforthilfe bei Sturmschaden
                </h1>
                <h2 className="text-lg md:text-xl font-semibold mb-2 text-white/85" data-testid="heading-notdienst-sub">
                  Dachdecker Sofort-Hilfe München – Schnell, Zuverlässig & Versichert
                </h2>
                <p className="text-white/85 text-sm md:text-base mb-4">
                  <strong className="text-white">Sturmschaden Dach</strong>? <strong className="text-white">Dach undicht</strong>? 
                  <strong className="text-white"> Dachdecker Sofort-Hilfe München</strong> 24/7 erreichbar. 
                  <strong className="text-white"> Dach Notreparatur</strong> mit <strong className="text-white">Versicherungsabwicklung</strong>.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                    <Button size="lg" className="bg-white text-primary hover:bg-gray-100 gap-2 font-bold" data-testid="button-notdienst-hero-call">
                      <Phone className="w-5 h-5" />
                      Dach Sofort-Hilfe: {PHONE_NUMBER}
                    </Button>
                  </a>
                  <Link href="/kontakt">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2" data-testid="button-notdienst-hero-contact">
                      <MessageCircle className="w-5 h-5" />
                      Online-Anfrage (nicht-akute Fälle)
                    </Button>
                  </Link>
                </div>
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
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-md p-3 text-center" data-testid={`stat-${index}`}>
                    <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
                    <div className="text-xs text-white/85">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Stats */}
        <section className="py-4 bg-destructive/5 lg:hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-4 gap-3">
              {stats.map((stat, index) => (
                <div key={index} className="text-center" data-testid={`stat-mobile-${index}`}>
                  <div className="text-xl font-bold text-destructive">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BackButton />

        {/* Emergency Steps Section - Kompakt */}
        <section className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-2" data-testid="heading-notdienst-steps">
                Sturmschaden Dach München – Was tun bei Dachnotfall?
              </h2>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                <strong>Sturmschaden</strong> oder <strong>Dach undicht</strong>? Diese 4 Schritte helfen.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {emergencySteps.map((step) => (
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
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                <Button variant="destructive" className="gap-2" data-testid="button-notdienst-steps-call">
                  <Phone className="w-4 h-4" />
                  Sofort-Hilfe jetzt anrufen
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Damage Types Section - Kompakt */}
        <section className="py-6 md:py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-2" data-testid="heading-notdienst-damage">
                Dachdecker Sofort-Hilfe München – Schnelle Hilfe bei Dachschaden
              </h2>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                <strong>Sturmschaden</strong>, <strong>Hagelschaden</strong>, <strong>Dachleckage</strong> – 24/7 Soforthilfe.
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
                        {damage.urgent && (
                          <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-destructive">
                            <Siren className="w-3 h-3" />
                            Sofort-Reparatur
                          </div>
                        )}
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
                  Sturmschaden Dach Versicherung München – Abwicklung inklusive
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  <strong>Sturmschaden Dach München</strong>? Wir helfen bei der <strong>Versicherungsabwicklung</strong>.
                </p>
                <ul className="space-y-2">
                  {insuranceInfo.slice(0, 4).map((info, index) => (
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
                      <h3 className="text-base font-bold" data-testid="heading-notdienst-card">Dach Sofort-Hilfe München & Versicherung</h3>
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
                        <span>Direkte Abwicklung möglich</span>
                      </div>
                    </div>
                    <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                      <Button variant="destructive" className="w-full gap-2" data-testid="button-notdienst-insurance-call">
                        <Phone className="w-4 h-4" />
                        Sofort-Hilfe anrufen
                      </Button>
                    </a>
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
              Dach Notreparatur München – Wann brauche ich die Sofort-Hilfe?
            </h2>
            
            <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Ein <strong>Sturmschaden Dach München</strong> oder ein <strong>Dach undicht Notfall München</strong> erfordert 
                schnelles Handeln. Unser <strong>Dach Sofort-Hilfe München</strong> ist <strong>24/7</strong> für Sie erreichbar – 
                auch nachts und am Wochenende. Als <strong>Notfall Dachdecker München</strong> bieten wir 
                <strong> Dach Soforthilfe München</strong> bei allen Arten von <strong>Dachschaden Notfall</strong>. 
                Wenn der Sturm tobt und Dachziegel fliegen, wenn Wasser durch die Decke tropft und die Angst um das 
                eigene Zuhause wächst – dann ist schnelle, professionelle Hilfe unbezahlbar. Genau dafür haben wir 
                unseren Sofort-Hilfe aufgebaut: Damit Sie in der schwierigsten Situation nicht allein sind.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Die Münchner Wetterlage bringt regelmäßig extreme Situationen mit sich. Föhnstürme im Frühjahr und 
                Herbst, sommerliche Gewitterzellen mit Hagel und winterliche Schneelast stellen Dächer auf eine harte 
                Probe. Nicht jedes Dach hält diesen Belastungen stand – und wenn es zu Schäden kommt, ist schnelles 
                Handeln gefragt. Unser Team aus erfahrenen Dachdeckergesellen ist speziell für Notfalleinsätze geschult 
                und ausgerüstet. Wir haben die richtigen Werkzeuge, Materialien und das Know-how, um Ihr Dach schnell 
                und effektiv zu sichern.
              </p>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-notdienst-faq-1">
                  <Wind className="w-4 h-4 text-destructive" />
                  Was tun bei Sturmschaden oder Hagelschaden am Dach München?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Ein <strong>Sturmschaden Dach München</strong> kann schwerwiegende Folgen haben: Abgedeckte 
                  <strong> Dachziegel Sturm München</strong>, beschädigte Firstkappen und gelöste Blechverkleidungen 
                  führen zu <strong>Wasserschaden Dach München</strong>. Auch <strong>Hagelschaden Dach München</strong> 
                  muss sofort repariert werden. Unser <strong>24h Sofort-Hilfe Dach</strong> ist bei 
                  <strong> Sturmschaden Reparatur München</strong> innerhalb von 24 Stunden vor Ort für eine 
                  <strong> schnelle Dach Reparatur München</strong>.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Sturmschäden am Dach entstehen oft in Sekundenschnelle. Eine besonders starke Böe kann ausreichen, 
                  um Ziegel zu verschieben, Firstkappen abzureißen oder ganze Dachflächen abzudecken. Besonders gefährdet 
                  sind ältere Dächer, bei denen die Befestigung der Eindeckung im Laufe der Jahre nachgelassen hat. Auch 
                  Flachdächer sind anfällig, wenn sich Bahnen lösen oder Aufbauten beschädigt werden. Nach einem Sturm 
                  sollten Sie Ihr Dach unbedingt prüfen lassen – auch wenn auf den ersten Blick alles intakt aussieht.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Hagelschäden sind besonders tückisch, weil sie oft nicht sofort sichtbar sind. Hagelkörner können 
                  Dachziegel beschädigen, ohne dass sie brechen. Mikrohaarrisse in der Glasur führen jedoch dazu, dass 
                  die Ziegel Wasser aufnehmen und im Winter durch Frost platzen. Deshalb empfehlen wir nach jedem 
                  starken Hagelereignis eine professionelle Inspektion durch unseren Partnernetzwerk.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-notdienst-faq-2">
                  <Droplets className="w-4 h-4 text-destructive" />
                  Dach undicht München? So stoppen wir den Wassereintritt sofort
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Bei <strong>akuter Dachleckage München</strong> zählt jede Minute. Ob <strong>Dach undicht Notfall München</strong> 
                  durch Sturm, Alter oder defekte Abdichtung – unser <strong>Dachdecker Sofort-Hilfe München</strong> stoppt den 
                  Wassereintritt mit einer professionellen <strong>Dach Notreparatur München</strong>. 
                  Auch beim <strong>Sofort-Hilfe Flachdach München</strong> sind wir Ihr erfahrener Ansprechpartner für 
                  <strong> Dach Notfall Hilfe</strong>.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Ein undichtes Dach ist mehr als nur ein Ärgernis – es ist eine ernsthafte Bedrohung für die 
                  Bausubstanz Ihres Hauses. Wasser, das in die Konstruktion eindringt, kann innerhalb kurzer Zeit 
                  massive Schäden verursachen: Dämmung verliert ihre Wirkung, Holz beginnt zu faulen, und im 
                  schlimmsten Fall breitet sich Schimmel aus. Die Kosten für die Beseitigung solcher Folgeschäden 
                  übersteigen die Kosten einer schnellen Notreparatur um ein Vielfaches.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Unser Sofort-Hilfe-Team ist darauf spezialisiert, Undichtigkeiten schnell zu lokalisieren und provisorisch 
                  abzudichten. Mit Planen, Folien und speziellen Dichtmassen können wir den Wassereintritt stoppen, bis 
                  eine dauerhafte Reparatur möglich ist. Diese Notsicherung schützt Ihr Eigentum vor weiteren Schäden 
                  und gibt Ihnen die Zeit, die eigentliche Reparatur in Ruhe zu planen.
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-notdienst-faq-3">
                  <FileText className="w-4 h-4 text-primary" />
                  Zahlt die Versicherung den Sturmschaden am Dach München?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Wir helfen Ihnen beim <strong>Sturmschaden melden München</strong> und der kompletten 
                  <strong> Sturmschaden Abwicklung Versicherung</strong>. Unsere professionelle 
                  <strong> Sturmschaden Dokumentation</strong> mit Fotos und detailliertem Bericht ist die Grundlage 
                  für eine schnelle Kostenerstattung durch Ihre <strong>Sturmschaden Versicherung München</strong>. 
                  Die <strong>Dach Sofort-Hilfe Kosten</strong> und <strong>Sofort-Hilfe Dachdecker Preise</strong> werden 
                  meist vollständig von der Versicherung übernommen.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Die richtige Dokumentation ist entscheidend für eine reibungslose Versicherungsabwicklung. Viele 
                  Hausbesitzer machen den Fehler, Schäden zu schnell zu reparieren, ohne vorher ausreichend Beweise 
                  zu sichern. Unsere erfahrenen Mitarbeiter wissen genau, worauf Versicherungen achten, und erstellen 
                  eine lückenlose Dokumentation: Detaillierte Fotos aus verschiedenen Perspektiven, genaue Beschreibung 
                  des Schadenshergangs und eine Auflistung aller betroffenen Dachbereiche.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Wichtig zu wissen: Ihre Wohngebäudeversicherung übernimmt in der Regel die Kosten für Sturmschäden 
                  ab Windstärke 8. Auch Hagelschäden sind meist abgedeckt. Wir unterstützen Sie bei der Kommunikation 
                  mit Ihrer Versicherung und erstellen auf Wunsch einen detaillierten Kostenvoranschlag für die 
                  Reparatur. Bei manchen Versicherungen ist sogar eine direkte Abrechnung möglich – fragen Sie uns!
                </p>
              </div>

              <div className="bg-card border rounded-md p-4">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" data-testid="heading-notdienst-faq-4">
                  <Clock className="w-4 h-4 text-primary" />
                  Wie schnell ist der Dachdecker München bei mir vor Ort?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Wenn Sie unseren <strong>Dach Sofort-Hilfe München</strong> anrufen, nehmen wir Ihre Situation ernst. 
                  Am Telefon erfassen wir die wichtigsten Informationen: Was ist passiert? Wie groß ist der Schaden? 
                  Tritt aktuell Wasser ein? Auf Basis dieser Angaben können wir die Dringlichkeit einschätzen und 
                  Ihnen einen realistischen Zeitrahmen für unseren Einsatz nennen.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Vor Ort verschaffen sich unsere Mitarbeiter zunächst einen Überblick über die Situation. Sicherheit 
                  hat dabei höchste Priorität – sowohl für unser Team als auch für Sie und Ihre Familie. Erst wenn 
                  die Lage eingeschätzt ist, beginnen wir mit den Sicherungsmaßnahmen. Bei einfachen Schäden kann oft 
                  sofort eine vollständige Reparatur durchgeführt werden. Bei umfangreicheren Schäden installieren 
                  wir eine professionelle Notsicherung und planen die endgültige Instandsetzung.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Nach Abschluss des Einsatzes erhalten Sie einen detaillierten Bericht über die durchgeführten 
                  Maßnahmen, die verwendeten Materialien und Empfehlungen für das weitere Vorgehen. Transparenz ist 
                  uns wichtig – Sie wissen immer genau, was wir gemacht haben und warum.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Rufen Sie jetzt unser <strong>Dach Sofort-Hilfe Telefon</strong> an: <strong>{PHONE_NUMBER}</strong>. 
                Unser <strong>Dach Sofort-Hilfe 24/7</strong> bietet <strong>Erste Hilfe Dachschaden</strong> rund um die Uhr. 
                Als erfahrener <strong>Notfall Dachdecker München</strong> sind wir Ihr Partner für alle 
                <strong> Dach Notfall Hilfe</strong> in München und Umgebung. Zögern Sie nicht – bei Dachnotfällen 
                zählt jede Minute, und wir sind bereit, Ihnen zu helfen!
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Unser Einsatzgebiet für die Sofort-Hilfe umfasst ganz München und das gesamte Umland: Von Schwabing über 
                Bogenhausen, Haidhausen und Sendling bis nach Pasing, Laim und Obermenzing. Auch in den angrenzenden 
                Umland bis 25 km wie Grünwald, Puchheim, Germering und Garching sind wir schnell vor Ort. Egal wo 
                Sie sich befinden – rufen Sie an, wir kommen!
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
                  Erste Hilfe Dachschaden München – Niemals selbst aufs Dach!
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Bei <strong>Sturmschaden Dach München</strong> oder <strong>Dach undicht Notfall</strong>: 
                  Steigen Sie niemals selbst aufs Dach! Nach einem Sturm können <strong>Dachziegel Sturm München</strong> 
                  locker sein und abrutschen. Rufen Sie unseren <strong>Dach Sofort-Hilfe München</strong> – 
                  wir haben die Ausrüstung für sichere <strong>Dach Notreparatur München</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Keywords Section */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 text-center">
              {pageData.mainKeyword} - Unsere Notfall-Leistungen
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

        <ServiceDistrictLinks serviceName="Sofort-Hilfe" serviceSlug="notdienst" />

        {/* Internal Links */}
        <section className="py-12 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-6 text-center" data-testid="heading-notdienst-links">Weitere Informationen zu Dacharbeiten München</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/leistungen">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <HardHat className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm" data-testid="heading-link-dacharbeiten">Dacharbeiten München</h3>
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
                      <h3 className="font-medium text-sm" data-testid="heading-link-preise">Dachdecker Preise München</h3>
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
