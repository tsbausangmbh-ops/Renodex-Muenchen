import { Phone, FileText, Shield, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroImage = "/images/optimized/roofer_working_on_bavarian_roof.webp";

interface HeroSectionProps {
  phoneNumber: string;
  onRequestQuote: () => void;
}

export default function HeroSection({ phoneNumber, onRequestQuote }: HeroSectionProps) {
  return (
    <section 
      className="relative min-h-[70vh] flex items-center bg-zinc-900"
      data-testid="section-hero"
      aria-label="Dachdecker München, [Gründungsjahr folgt], - Dachsanierung und Dachreparatur"
    >
      <img fetchPriority="high" 
        src={heroImage}
        alt="Dachdecker München bei Dacharbeiten – [Gründungsjahr folgt] für Dachsanierung Dachreparatur Sturmschaden Sofort-Hilfe Bayern"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
       width={1200} height={655} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24 w-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Dachdecker München – Dachsanierung, Dachreparatur & Spenglerei vom Meister</h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Professionelle Dacharbeiten, Spenglerei und schneller Sofort-Hilfe bei Sturmschäden. 
            Qualität und Zuverlässigkeit seit über 25 Jahren.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a href={`tel:${phoneNumber.replace(/\s/g, "")}`} data-testid="link-hero-call">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base">
                <Phone className="w-5 h-5" />
                Sofort-Hilfe anrufen
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
              Angebot anfragen
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>24/7 Erreichbar</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>25+ Jahre Erfahrung</span>
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
