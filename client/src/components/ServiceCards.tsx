import { Droplets, Flame, Home, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCard {
  icon: typeof Droplets;
  title: string;
  description: string;
  href: string;
}

const services: ServiceCard[] = [
  {
    icon: Home,
    title: "Komplettsanierung München",
    description: "Wohnung oder Haus in einem Zug sanieren -- Sanitär, Heizung, Elektro und Ausbau aus einer Hand.",
    href: "#sanierung",
  },
  {
    icon: Droplets,
    title: "Sanitär & Badsanierung",
    description: "Bad, Wasserschaden oder alte Leitungen -- fachgerechte Installation und Reparatur.",
    href: "#sanitaer",
  },
  {
    icon: Flame,
    title: "Heizung & Wärmepumpe",
    description: "Heizungsausfall, alte Anlage oder Umstieg auf Wärmepumpe -- wir beraten und setzen um.",
    href: "#heizung",
  },
  {
    icon: Zap,
    title: "Elektro & Photovoltaik",
    description: "Elektroinstallation, Zählerschrank und Photovoltaik -- sicher und normgerecht.",
    href: "#elektro",
  },
];

interface ServiceCardsProps {
  onServiceClick?: (service: string) => void;
}

export default function ServiceCards({ onServiceClick }: ServiceCardsProps) {
  const handleClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    onServiceClick?.(href);
  };

  return (
    <section className="py-16 bg-zinc-900" id="leistungen" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Was möchten Sie an Ihrer Immobilie erneuern?</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Ob eine einzelne Sanierung oder das komplette Haus -- sagen Sie uns, wo es brennt.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card 
              key={service.href}
              className="cursor-pointer transition-transform hover:translate-y-[-2px]"
              onClick={() => handleClick(service.href)}
              data-testid={`card-service-${service.title.toLowerCase().replace(/\s/g, "-")}`}
            >
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
