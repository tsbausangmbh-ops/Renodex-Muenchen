import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const stormDamageImage = "/images/optimized/storm_damaged_red_tile_roof.webp";
const spenglerImage = "/images/optimized/copper_gutter_installation_craftsman.webp";
const completedRoofImage = "/images/optimized/house_dark_tiles_no_window_flowers.webp";
const emergencyVanImage = "/images/optimized/white_ducato_service_van.webp";

interface ServiceDetailProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  reversed?: boolean;
  id: string;
  onContact: () => void;
}

function ServiceDetail({ 
  title, 
  description, 
  features, 
  image, 
  imageAlt, 
  reversed, 
  id,
  onContact 
}: ServiceDetailProps) {
  return (
    <div 
      id={id} 
      className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-12 items-center`}
      data-testid={`section-detail-${id}`}
    >
      <div className="flex-1">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button onClick={onContact} data-testid={`button-contact-${id}`}>
          Jetzt anfragen
        </Button>
      </div>
      <div className="flex-1 w-full">
        <img 
          src={image} 
          alt={imageAlt} 
          loading="lazy"
          className="w-full h-64 lg:h-80 object-cover rounded-md"
         decoding="async"  width={400} height={300} />
      </div>
    </div>
  );
}

interface ServiceDetailsProps {
  onContact: () => void;
}

export default function ServiceDetails({ onContact }: ServiceDetailsProps) {
  const services = [
    {
      id: "sturmschaeden",
      title: "Sturmschäden & Sofort-Hilfe",
      description: "Schnelle professionelle Hilfe wenn es darauf ankommt. Unser Sofort-Hilfe-Team ist rund um die Uhr für Sie da und sichert Ihr Dach schnellstmöglich.",
      features: [
        "24/7 Sofort-Hilfe-Hotline",
        "Schnelle Erstversorgung und Abdichtung",
        "Dokumentation für Versicherung",
        "Komplette Schadensbeseitigung",
      ],
      image: stormDamageImage,
      imageAlt: "Sturmschaden Dach reparieren München – Dachdecker Sofort-Hilfe 24 Stunden Unwetter Versicherung Soforthilfe Partnernetzwerk Bayern",
    },
    {
      id: "spenglerei",
      title: "Spenglerei & Metallarbeiten",
      description: "Hochwertige Metallarbeiten für Ihr Dach. Von Dachrinnen über Fallrohre bis hin zu Blechverkleidungen - alles aus einer Hand.",
      features: [
        "Dachrinnen aus Kupfer, Zink oder Aluminium",
        "Fallrohre und Entwässerungssysteme",
        "Blechverkleidungen und Abdeckungen",
        "Kaminverkleidungen",
      ],
      image: spenglerImage,
      imageAlt: "Spengler München Kupfer Dachrinne montieren – Partnernetzwerk, Blecharbeiten Zink Aluminium Regenrinne Fallrohr Bayern",
    },
    {
      id: "sanierung",
      title: "Dachsanierung & Neueindeckung",
      description: "Umfassende Sanierung Ihres Daches mit modernen Materialien und Techniken. Wir beraten Sie gerne zu den besten Optionen für Ihr Gebäude.",
      features: [
        "Komplette Dachsanierung",
        "Neueindeckung mit Ziegel oder Schiefer",
        "Wärmedämmung nach aktuellen Standards",
        "10 Jahre Garantie auf unsere Arbeit",
      ],
      image: completedRoofImage,
      imageAlt: "Dachsanierung München Einfamilienhaus komplett – Neueindeckung Anthrazit Dachziegel Wärmedämmung Garantie Partnernetzwerk",
    },
    {
      id: "undichtes-dach",
      title: "Dachreparatur & Abdichtung",
      description: "Undichte Stellen am Dach können schnell zu großen Schäden führen. Wir finden die Ursache und beheben das Problem nachhaltig.",
      features: [
        "Leckortung mit modernster Technik",
        "Professionelle Abdichtung",
        "Reparatur einzelner Ziegel",
        "Vorbeugender Wartungsservice",
      ],
      image: emergencyVanImage,
      imageAlt: "Dachdecker Sofort-Hilfe München Einsatzfahrzeug – Undichtes Dach reparieren Leckortung Abdichtung Soforthilfe 24h Bayern",
    },
  ];

  return (
    <section className="py-16" data-testid="section-service-details">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Dachdecker Leistungen München im Detail</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professionelle Dach- und Spenglerarbeiten für jeden Bedarf.
          </p>
        </div>

        <div className="space-y-20">
          {services.map((service, index) => (
            <ServiceDetail
              key={service.id}
              {...service}
              reversed={index % 2 === 1}
              onContact={onContact}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
