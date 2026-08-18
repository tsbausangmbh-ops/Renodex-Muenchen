import { Clock, Shield, Award, Truck, Wrench, Home, Droplets, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const solutions = [
  { icon: Clock, highlight: "24 Std.", label: "Reaktionszeit" },
  { icon: Shield, highlight: "10 Jahre", label: "Garantie" },
  { icon: Award, highlight: "25+ Jahre", label: "Erfahrung" },
  { icon: Truck, highlight: "München", label: "und Umgebung" },
];

const process = [
  { step: 1, title: "Anfrage", desc: "2 Min online" },
  { step: 2, title: "Beratung", desc: "Kostenlos telefonisch" },
  { step: 3, title: "Angebot", desc: "Transparenter Festpreis" },
  { step: 4, title: "Ausführung", desc: "Schnell & sauber" },
];

const services = [
  {
    icon: Home,
    title: "Dachsanierung München",
    description: "Komplette Dacherneuerung für Steildach und Flachdach. Mit Wärmedämmung nach EnEV-Standard. KfW-Förderung möglich.",
    keywords: ["Dachsanierung", "Dacherneuerung", "Wärmedämmung", "Aufsparrendämmung"]
  },
  {
    icon: Wrench,
    title: "Dachreparatur München",
    description: "Schnelle Reparatur bei undichtem Dach, defekten Ziegeln oder Sturmschäden. Meistens am selben Tag erledigt.",
    keywords: ["Dachreparatur", "Dach undicht", "Ziegel reparieren", "Dachschaden"]
  },
  {
    icon: Droplets,
    title: "Spenglerei München",
    description: "Dachrinnen, Fallrohre, Blechverkleidungen und Attika. In Kupfer, Zink oder Aluminium - vom Spenglermeister.",
    keywords: ["Spengler", "Dachrinnen", "Fallrohre", "Kupferdachrinne"]
  },
  {
    icon: AlertTriangle,
    title: "Sturmschaden Sofort-Hilfe",
    description: "24/7 Sofort-Hilfe bei Sturmschäden am Dach. Wir sind innerhalb von 24 Stunden vor Ort. Versicherungsabwicklung inklusive.",
    keywords: ["Sturmschaden", "Sofort-Hilfe", "24/7", "Dach Notfall"]
  }
];

const serviceAreas = [
  "München-Allach", "Untermenzing", "Pasing", "Obermenzing", "Aubing", 
  "Moosach", "Feldmoching", "Nymphenburg", "Laim", "Sendling",
  "Schwabing", "Bogenhausen", "Trudering", "Haidhausen", "Giesing",
  "Garching", "Ismaning", "Unterhaching", "Taufkirchen", "Ottobrunn"
];

export default function SolutionSection() {
  return (
    <section className="py-6 md:py-8 bg-white dark:bg-zinc-900" data-testid="section-solution">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-foreground">
            Bau- und Sanierungsbetrieb München – Unsere Leistungen
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            <strong>Bau- und Sanierungsbetrieb München</strong> Partnernetzwerk: <strong>Dachsanierung</strong>, 
            <strong> Dachreparatur</strong>, <strong>Spenglerarbeiten</strong>.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {solutions.map((item, index) => (
            <div key={index} className="bg-background border rounded-md p-2 text-center" data-testid={`solution-card-${index}`}>
              <item.icon className="w-4 h-4 text-primary mx-auto mb-0.5" />
              <div className="text-sm font-bold text-primary">{item.highlight}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {services.map((service, index) => (
            <Card key={index} className="h-full" data-testid={`service-card-${index}`}>
              <CardContent className="p-3">
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center mb-2">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-sm mb-1">{service.title}</h3>
                <p className="text-muted-foreground text-xs mb-2 line-clamp-2">{service.description}</p>
                <div className="flex flex-wrap gap-1">
                  {service.keywords.slice(0, 2).map((keyword, idx) => (
                    <span key={idx} className="text-xs bg-muted px-1.5 py-0.5 rounded">{keyword}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-background border rounded-md p-4">
            <h3 className="text-sm font-bold text-center mb-3" data-testid="heading-solution-process">Ihr Weg zum sicheren Dach in München – 4 Schritte</h3>
            <div className="grid grid-cols-4 gap-2">
              {process.map((item, index) => (
                <div key={index} className="text-center" data-testid={`process-step-${item.step}`}>
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xs mx-auto mb-1">
                    {item.step}
                  </div>
                  <div className="font-medium text-xs">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-800 dark:bg-zinc-900 rounded-md p-4">
            <h3 className="font-bold text-sm mb-2 text-center text-white" data-testid="heading-solution-areas">
              Dachdecker Einsatzgebiet: München & Umland – 30 km Radius
            </h3>
            <div className="flex flex-wrap justify-center gap-1">
              {serviceAreas.slice(0, 20).map((area, index) => (
                <span 
                  key={index} 
                  className="text-xs bg-zinc-700 text-white px-1.5 py-0.5 rounded-full"
                  data-testid={`area-tag-${index}`}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <h4 className="font-semibold text-foreground text-sm mb-2">Warum Renodex:</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Partnernetzwerk</strong> seit 1998</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Festpreise</strong> ohne Überraschungen</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>24/7 Sofort-Hilfe</strong> erreichbar</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Lokaler Partner</strong> München</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
