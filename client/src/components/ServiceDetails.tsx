import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceDetailProps {
  title: string;
  description: string;
  features: string[];
  reversed?: boolean;
  id: string;
  onContact: () => void;
  image: string;
  imageAlt: string;
}

function ServiceDetail({
  title,
  description,
  features,
  reversed,
  id,
  onContact,
  image,
  imageAlt
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
      <div className="flex-1 w-full h-64 lg:h-80 rounded-md overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={1200}
          height={655}
        />
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
      id: "sanierung",
      title: "Komplettsanierung aus einer Hand",
      description: "Eine Sanierung mit mehreren Gewerken bedeutet normalerweise mehrere Handwerker, mehrere Termine, mehrere Ansprechpartner. Bei Renodex koordinieren wir Sanitär, Heizung, Elektro und Ausbau als einen Auftrag – ein Ansprechpartner von der Planung bis zur Abnahme.",
      features: [
        "Ein Ansprechpartner für alle Gewerke",
        "Abgestimmter Zeitplan statt Wartezeiten zwischen Gewerken",
        "Festpreis nach Besichtigung, keine bösen Überraschungen",
        "Partnernetzwerk mit über 16 Jahren Erfahrung",
      ],
      image: "/images/optimized/home-servicedetails.webp",
      imageAlt: "Handwerker bei der Arbeit auf einer Renodex-Komplettsanierung",
    },
    {
      id: "sanitaer",
      title: "Sanitär & Badsanierung",
      description: "Ein altes Bad, tropfende Leitungen oder ein akuter Wasserschaden – Sanitärprobleme warten nicht. Wir übernehmen die komplette Badsanierung oder die gezielte Reparatur, fachgerecht und ohne unnötigen Aufwand für Sie.",
      features: [
        "Komplette Badsanierung nach Maß",
        "Reparatur und Austausch von Leitungen",
        "Schnelle Hilfe bei Wasserschäden",
        "Barrierefreie Bäder auf Wunsch",
      ],
      image: "/images/optimized/leistung-sanitaer.webp",
      imageAlt: "Sanitärinstallation, Wasseranschlüsse und Armaturen",
    },
    {
      id: "heizung",
      title: "Heizung & Wärmepumpe",
      description: "Eine ausgefallene Heizung im Winter ist kein Aufschub-Thema, und eine veraltete Anlage treibt die Nebenkosten in die Höhe. Wir reparieren akut, und wer auf eine Wärmepumpe umsteigen will, bekommt von uns eine ehrliche Einschätzung zu Aufwand und Förderung.",
      features: [
        "Reparatur und Wartung bestehender Heizungsanlagen",
        "Beratung und Einbau von Wärmepumpen",
        "Einschätzung zu KfW/BAFA-Förderung",
        "Abstimmung mit Sanitär und Elektro aus einer Hand",
      ],
      image: "/images/optimized/leistung-heizung.webp",
      imageAlt: "Heizungsanlage und Heizungsinstallation",
    },
    {
      id: "elektro",
      title: "Elektro & Photovoltaik",
      description: "Ob Zählerschrank, Elektroinstallation im Altbau oder der Wunsch nach eigenem Solarstrom: Elektroarbeiten sind Vertrauenssache. Wir installieren normgerecht und beraten zu Photovoltaik, wenn Sie unabhängiger von steigenden Strompreisen werden wollen.",
      features: [
        "Elektroinstallation in Neubau und Altbau",
        "Zählerschrank- und Sicherungskasten-Erneuerung",
        "Photovoltaik-Beratung und Installation",
        "Abstimmung mit Heizung für Wärmepumpen-Betrieb",
      ],
      image: "/images/optimized/leistung-elektroinstallation.webp",
      imageAlt: "Elektroinstallation und Sicherungskasten",
    },
  ];

  return (
    <section className="py-16" data-testid="section-service-details">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sanierung, Renovierung und Komplettsanierung aus einer Hand</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sanitär, Heizung, Elektro und Ausbau – koordiniert von einem Partnernetzwerk statt von vier verschiedenen Handwerkern.
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
