import { Mail, FileText, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import KiBildHinweis from "@/components/KiBildHinweis";

interface HeroSectionProps {
  phoneNumber: string;
  onRequestQuote: () => void;
}

export default function HeroSection({ onRequestQuote }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-[70vh] flex items-center bg-zinc-900"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        role="img"
        aria-label="Handwerkerteam für Sanierung und Renovierung vor Firmentransportern auf dem Betriebshof"
        style={{ backgroundImage: `url(/images/optimized/handwerker-team-sanierung-muenchen.webp)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
      <KiBildHinweis />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24 w-full">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Sanierung, Renovierung und Komplettsanierung aus einer Hand – München</h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Drei Handwerker, drei Termine, und keiner fühlt sich für das Ganze zuständig? Bei Renodex haben Sie einen Ansprechpartner, der die Fachfirmen für Ihr Haus oder Ihre Wohnung in München koordiniert.
          </p>

          <div className="mb-10">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={onRequestQuote}
                className="w-full sm:w-auto gap-2 text-base"
                data-testid="button-online-anfragen"
              >
                <FileText className="w-5 h-5" />
                Fotos hochladen und anfragen
              </Button>
            </div>
            <p className="mt-4 text-base text-white/85">
              Lieber per E-Mail?{" "}
              <a href="mailto:info@renodex.de" className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-white" data-testid="link-hero-email">
                <Mail className="w-4 h-4" aria-hidden="true" />
                info@renodex.de
              </a>
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-white/80 text-sm">
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
