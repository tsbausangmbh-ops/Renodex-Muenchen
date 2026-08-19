import { Mail, FileText, Shield, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import KiBildHinweis from "@/components/KiBildHinweis";

interface HeroSectionProps {
  phoneNumber: string;
  onRequestQuote: () => void;
}

export default function HeroSection({ phoneNumber, onRequestQuote }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-[70vh] flex items-center bg-zinc-900 bg-cover bg-center"
      data-testid="section-hero"
      role="img"
      aria-label="Renodex Team bei der Sanierungsarbeit – Komplettsanierung von Haus und Wohnung aus einer Hand in München"
      style={{ backgroundImage: `url(/images/optimized/seite-home.webp)` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      <KiBildHinweis />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24 w-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Sanierung, Renovierung und Komplettsanierung aus einer Hand – München</h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Renodex koordiniert Komplettsanierung, Sanitär, Heizung, Elektroinstallation, Wärmepumpe und Photovoltaik als einen Auftrag – statt mehrere Handwerker, mehrere Termine und mehrere Ansprechpartner.
            Für Privatkunden und Hausverwaltungen in München und Umgebung.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a href="mailto:info@renodex.de" data-testid="link-hero-email">
              <Button size="lg" className="btn-glanz w-full sm:w-auto gap-2 text-base">
                <Mail className="w-5 h-5" />
                Jetzt per E-Mail anfragen
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              onClick={onRequestQuote}
              className="w-full sm:w-auto gap-2 text-base bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              data-testid="button-request-quote"
            >
              <FileText className="w-5 h-5" />
              Kostenlose Beratung anfragen
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Antwort in 48 Std.</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Komplettsanierung aus einer Hand</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>München & Umgebung</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
