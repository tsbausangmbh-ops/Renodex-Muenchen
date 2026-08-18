import { Phone, ArrowDown, Check, Clock, Shield, Gift, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FinalCTAProps {
  phoneNumber: string;
  onContactClick: () => void;
}

const benefits = [
  { icon: Check, text: "Kostenlose Telefonberatung" },
  { icon: Clock, text: "Antwort in 24h" },
  { icon: Shield, text: "100% unverbindlich" },
  { icon: MapPin, text: "München & Umgebung" },
];

export default function FinalCTA({ phoneNumber, onContactClick }: FinalCTAProps) {
  const telLink = `tel:${phoneNumber.replace(/\s/g, "")}`;

  return (
    <section className="py-10 bg-zinc-800 dark:bg-zinc-900 text-white" data-testid="section-final-cta">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-xs font-medium mb-4">
          <Gift className="w-3.5 h-3.5 text-yellow-400" />
          Nur für kurze Zeit: Kostenlose Erstberatung
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Dachdecker München kontaktieren – Kostenloses Angebot anfordern
        </h2>
        <p className="text-white/80 mb-4 max-w-2xl mx-auto">
          Bereit für ein sorgenfreies Dach? <strong className="text-white">Renodex</strong> ist Ihr 
          <strong className="text-white"> Partnernetzwerk aus geprüften Partner-Meisterfirmen</strong> für <strong className="text-white">Dachsanierung</strong>, 
          <strong className="text-white"> Dachreparatur</strong> und <strong className="text-white">Spenglerei in München</strong>. 
          Über 100 zufriedene Kunden vertrauen uns – werden Sie einer davon.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-6 text-xs">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded" data-testid={`benefit-final-${index}`}>
              <benefit.icon className="w-3 h-3 text-primary" />
              {benefit.text}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <Button 
            size="lg" 
            onClick={onContactClick} 
            className="border-2 border-white gap-2"
            data-testid="button-final-form"
          >
            <ArrowDown className="w-4 h-4" />
            Jetzt Anfrage stellen
          </Button>
          <Button 
            size="lg" 
            asChild
            className="border-2 border-white gap-2"
            data-testid="button-final-call"
          >
            <a href={telLink}>
              <Phone className="w-4 h-4" />
              Soforthilfe: {phoneNumber}
            </a>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-white/80">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span>4.9/5 Sterne bei Google • 25+ Jahre Erfahrung • Partnernetzwerk</span>
        </div>

        <p className="text-white/80 text-xs mt-4">
          Einsatzgebiet: München-Allach, Pasing, Moosach, Obermenzing, Grünwald, Puchheim und Umgebung
        </p>
      </div>
    </section>
  );
}
