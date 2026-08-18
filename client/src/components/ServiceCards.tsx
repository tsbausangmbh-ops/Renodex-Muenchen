import { AlertTriangle, Droplets, Home, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCard {
  icon: typeof AlertTriangle;
  title: string;
  description: string;
  href: string;
}

const services: ServiceCard[] = [
  {
    icon: AlertTriangle,
    title: "Sturmschaden Dach reparieren",
    description: "Schnelle Hilfe bei Sturmschäden am Dach. 24/7 Sofort-Hilfe verfügbar.",
    href: "#sturmschaeden",
  },
  {
    icon: Droplets,
    title: "Undichtes Dach abdichten München",
    description: "Professionelle Abdichtung und Reparatur bei Wasserschäden.",
    href: "#undichtes-dach",
  },
  {
    icon: Home,
    title: "Dachsanierung München komplett",
    description: "Komplettsanierung mit modernen Materialien und Garantie.",
    href: "#sanierung",
  },
  {
    icon: Wrench,
    title: "Spenglerei & Blecharbeiten",
    description: "Fachgerechte Metallarbeiten: Dachrinnen, Fallrohre, Blechverkleidungen.",
    href: "#spenglerei",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Renodex hilft – Welches Problem haben Sie?</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Wählen Sie Ihr Anliegen und erfahren Sie, wie wir Ihnen helfen können.
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
