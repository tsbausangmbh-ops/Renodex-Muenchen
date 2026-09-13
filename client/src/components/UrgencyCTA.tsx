import { Mail, ArrowRight, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UrgencyCTAProps {
  phoneNumber: string;
  onContactClick: () => void;
  variant?: "default" | "emergency" | "final";
}

export default function UrgencyCTA({ onContactClick, variant = "default" }: UrgencyCTAProps) {
  const mailLink = "mailto:info@renodex.de";

  if (variant === "emergency") {
    return (
      <section className="bg-destructive/10 border-y border-destructive/20 py-12 md:py-16" data-testid="section-urgency-emergency">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center animate-pulse">
                <Mail className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <div className="font-bold text-lg">Schaden am Haus?</div>
                <div className="text-muted-foreground">Schicken Sie uns Fotos vom Schaden. Wir melden uns per E-Mail bei Ihnen.</div>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <Button size="lg" className="min-h-11" onClick={onContactClick} data-testid="button-emergency-anfrage">
                <Mail className="w-5 h-5 mr-2" />
                Schaden digital melden
              </Button>
              <a href={mailLink} className="inline-flex items-center gap-1 min-h-11 text-sm text-muted-foreground underline underline-offset-4" data-testid="link-emergency-email">
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                oder per E-Mail: info@renodex.de
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "final") {
    return (
      <section className="bg-secondary text-secondary-foreground py-12 md:py-16" data-testid="section-urgency-final">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Bereit für Ihr kostenloses Angebot?
          </h2>
          <p className="text-primary-foreground/80 mb-6 text-lg">
            Füllen Sie unser kurzes Formular aus. Ihr persönliches Angebot erhalten Sie per E-Mail.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Antwort per E-Mail</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Kostenlos, ohne Verpflichtung</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Qualität vom Partnernetzwerk</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={onContactClick}
              className="text-base min-h-11"
              data-testid="button-final-form"
            >
              Angebot anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <p className="mt-3 text-sm text-primary-foreground/80">
            oder per E-Mail:{" "}
            <a href={mailLink} className="inline-flex items-center min-h-11 underline underline-offset-4" data-testid="link-final-email">
              info@renodex.de
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-muted/50 border-y py-12 md:py-16" data-testid="section-urgency-default">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <p className="font-medium">
            Haben Sie Fragen? Wir beraten Sie gerne!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button className="min-h-11" onClick={onContactClick} data-testid="button-mid-cta">
              <Mail className="w-4 h-4 mr-2" />
              Anfrage stellen
            </Button>
            <a href={mailLink} className="inline-flex items-center gap-1 min-h-11 text-sm text-muted-foreground underline underline-offset-4" data-testid="link-mid-email">
              oder per E-Mail: info@renodex.de
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
