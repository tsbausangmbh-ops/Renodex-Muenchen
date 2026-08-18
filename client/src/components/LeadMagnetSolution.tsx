import { Clock, Shield, Award, Truck, Wrench, Home, Droplets, AlertTriangle, CheckCircle, ArrowRight, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LeadMagnetSolutionProps {
  onContactClick: () => void;
  phoneNumber: string;
}

const whyChooseUs = [
  { icon: Clock, value: "48 Std", label: "bei Notfällen vor Ort" },
  { icon: Shield, value: "10 Jahre", label: "Garantie auf Arbeit" },
  { icon: Award, value: "25+ Jahre", label: "Erfahrung in München" },
  { icon: Star, value: "4.9/5", label: "Google Bewertung" },
];

const services = [
  {
    icon: AlertTriangle,
    title: "Sturmschaden & Sofort-Hilfe",
    description: "24/7 erreichbar. Innerhalb von 48 Std vor Ort. Notabdichtung, Schadensdokumentation, komplette Versicherungsabwicklung.",
    benefits: ["Sofort-Hilfe rund um die Uhr", "Versicherung übernimmt Kosten", "Professionelle Dokumentation"],
    cta: "Sofort-Hilfe rufen",
    urgent: true
  },
  {
    icon: Droplets,
    title: "Undichtes Dach reparieren",
    description: "Schnelle Leckortung und dauerhafte Abdichtung. Meistens am selben Tag erledigt. Keine versteckten Kosten.",
    benefits: ["Leckortung ohne Zerstörung", "Festpreis vor Arbeitsbeginn", "Gewährleistung auf Arbeit"],
    cta: "Dach abdichten lassen",
    urgent: true
  },
  {
    icon: Home,
    title: "Dachsanierung komplett",
    description: "Von der Beratung bis zur Fertigstellung. Inkl. Wärmedämmung nach aktuellem Standard. KfW-Förderung möglich.",
    benefits: ["Alles aus einer Hand", "Energieeinsparung bis 30%", "Wertsteigerung Ihrer Immobilie"],
    cta: "Beratung anfordern",
    urgent: false
  },
  {
    icon: Wrench,
    title: "Spenglerei & Blecharbeiten",
    description: "Dachrinnen, Fallrohre, Kaminverkleidungen, Gauben. In Kupfer, Zink oder Aluminium - handwerklich perfekt.",
    benefits: ["Maßanfertigung vor Ort", "Hochwertige Materialien", "Langlebig und wartungsfrei"],
    cta: "Angebot einholen",
    urgent: false
  }
];

const processSteps = [
  { step: 1, title: "Anfrage", desc: "Online in 2 Minuten", detail: "Beschreiben Sie Ihr Problem - wir melden uns innerhalb von 2 Stunden" },
  { step: 2, title: "Beratung", desc: "Kostenlos vor Ort", detail: "Wir besichtigen den Schaden und beraten Sie ehrlich und transparent" },
  { step: 3, title: "Festpreis", desc: "Verbindlich & fair", detail: "Sie erhalten ein schriftliches Angebot - ohne versteckte Kosten" },
  { step: 4, title: "Ausführung", desc: "Schnell & sauber", detail: "Professionelle Arbeit mit Aufräumen und Garantie" },
];

const guarantees = [
  "Festpreis-Garantie: Was wir anbieten, das gilt",
  "Termingarantie: Wir kommen pünktlich",
  "Sauberkeits-Garantie: Wir räumen auf wie vorher",
  "Qualitäts-Garantie: Bis zu 10 Jahre Gewährleistung"
];

export default function LeadMagnetSolution({ onContactClick, phoneNumber }: LeadMagnetSolutionProps) {
  const telLink = `tel:${phoneNumber.replace(/\s/g, "")}`;

  return (
    <section className="py-10 md:py-14 bg-white dark:bg-zinc-900" data-testid="section-lead-solution">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-foreground">
            So lösen wir Ihr Dachproblem
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            <strong>Renodex</strong> - Ihr Dachdecker-Meisterbetrieb ([Gründungsjahr folgt]) in München. Schnell, zuverlässig, zum Festpreis.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {whyChooseUs.map((item, index) => (
            <div key={index} className="bg-primary/5 border border-primary/20 rounded-md p-4 text-center" data-testid={`why-card-${index}`}>
              <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-xl md:text-2xl font-bold text-primary">{item.value}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`h-full ${service.urgent ? "border-destructive/30 bg-destructive/5" : ""}`}
              data-testid={`service-lead-${index}`}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${service.urgent ? "bg-destructive/20" : "bg-primary/10"}`}>
                    <service.icon className={`w-6 h-6 ${service.urgent ? "text-destructive" : "text-primary"}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{service.title}</h3>
                    {service.urgent && (
                      <span className="text-xs bg-destructive text-destructive-foreground px-2 py-0.5 rounded">SOFORT-HILFE</span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <div className="space-y-2 mb-4">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                {service.urgent ? (
                  <Button aria-label="Aktion" 
                    variant="default" 
                    className="w-full"
                    asChild
                    data-testid={`button-service-${index}`}
                  >
                    <a aria-label="Link" href={telLink}>
                      {service.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                ) : (
                  <Button aria-label="Aktion" 
                    variant="secondary" 
                    className="w-full"
                    onClick={onContactClick}
                    data-testid={`button-service-${index}`}
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-md p-6 md:p-8 mb-10">
          <h3 className="font-bold text-xl text-center mb-6">In 4 Schritten zum sicheren Dach</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {processSteps.map((item, index) => (
              <div key={index} className="relative text-center" data-testid={`process-${item.step}`}>
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {item.step}
                </div>
                <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-primary font-medium mb-1">{item.desc}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-primary/20" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-800 dark:bg-zinc-950 rounded-md p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="font-bold text-xl text-white mb-4">Unsere 4-fach Garantie</h3>
              <div className="space-y-3">
                {guarantees.map((guarantee, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm text-white" data-testid={`guarantee-${index}`}>
                    <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{guarantee}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-white/80 mb-4">Überzeugen Sie sich selbst - rufen Sie uns an!</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end">
                <Button 
                  size="lg" 
                  asChild
                  className="font-bold"
                  data-testid="button-solution-call"
                >
                  <a href={telLink}>
                    <Phone className="w-4 h-4 mr-2" />
                    [Telefon folgt]
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={onContactClick}
                  className="border-white/30 text-white"
                  data-testid="button-solution-contact"
                >
                  Online anfragen
                </Button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
