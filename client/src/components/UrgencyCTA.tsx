import { Phone, ArrowRight, Clock, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UrgencyCTAProps {
  phoneNumber: string;
  onContactClick: () => void;
  variant?: "default" | "emergency" | "final";
}

export default function UrgencyCTA({ phoneNumber, onContactClick, variant = "default" }: UrgencyCTAProps) {
  const telLink = `tel:${phoneNumber.replace(/\s/g, "")}`;

  if (variant === "emergency") {
    return (
      <section className="py-8 bg-destructive/10 border-y border-destructive/20" data-testid="section-urgency-emergency">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center animate-pulse">
                <Phone className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <div className="font-bold text-lg">Akuter Notfall? 24/7 erreichbar!</div>
                <div className="text-muted-foreground">Schnell vor Ort innerhalb von 24 Stunden</div>
              </div>
            </div>
            <Button size="lg" asChild data-testid="button-emergency-call">
              <a href={telLink}>
                <Phone className="w-5 h-5 mr-2" />
                {phoneNumber} anrufen
              </a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "final") {
    return (
      <section className="py-12 bg-primary text-primary-foreground" data-testid="section-urgency-final">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Bereit für Ihr kostenloses Angebot?
          </h2>
          <p className="text-primary-foreground/80 mb-6 text-lg">
            Füllen Sie unser kurzes Formular aus und erhalten Sie innerhalb von 24 Stunden Ihr persönliches Angebot.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Antwort in 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>100% unverbindlich</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Qualität vom [Gründungsjahr folgt]</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={onContactClick}
              className="text-base"
              data-testid="button-final-form"
            >
              Angebot anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild
              className="text-base border-primary-foreground/30 text-primary-foreground"
              data-testid="button-final-call"
            >
              <a href={telLink}>
                <Phone className="w-5 h-5 mr-2" />
                Direkt anrufen
              </a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-muted/50 border-y" data-testid="section-urgency-default">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <p className="font-medium">
            Haben Sie Fragen? Wir beraten Sie gerne!
          </p>
          <div className="flex gap-3">
            <Button onClick={onContactClick} data-testid="button-mid-cta">
              Anfrage stellen
            </Button>
            <Button variant="outline" asChild data-testid="button-mid-call">
              <a href={telLink}>
                <Phone className="w-4 h-4 mr-2" />
                Anrufen
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
