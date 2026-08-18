import { Phone, ArrowRight, Check, Clock, Shield, Star, Award } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const heroImage = "/images/optimized/roofer_working_on_bavarian_roof.webp";

interface FunnelHeroProps {
  phoneNumber: string;
  onContactClick: () => void;
}

export default function FunnelHero({ phoneNumber, onContactClick }: FunnelHeroProps) {
  const telLink = `tel:${phoneNumber.replace(/\s/g, "")}`;

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroImage;
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <section
      className="relative min-h-[40vh] flex items-center"
      data-testid="section-hero"
      id="main-content"
      aria-label="Renodex - Bau- und Sanierungsbetrieb München Partnernetzwerk"
      data-speakable="true"
    >
      <img
        src={heroImage}
        alt="Dachdecker München, Partnernetzwerk, bei Dachsanierung – Professionelle Dacharbeiten Dachreparatur Sturmschaden Sofort-Hilfe 24h Bayern"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
        width={400}
        height={300}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="grid md:grid-cols-5 gap-6 items-center">
          <div className="md:col-span-3">
            <div className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              24/7 Sofort-Hilfe - In 60 Min vor Ort
            </div>

            <p className="text-xs md:text-sm text-primary font-semibold uppercase tracking-wide mb-1">
              Münchens zuverlässiges Partnernetzwerk für Sanierung
            </p>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight" data-speakable="true">
              Dachdecker München – Partnernetzwerk für Dach & Spenglerei
              <span className="block text-primary text-xl md:text-2xl lg:text-3xl">Renodex – seit 1998. 10 Jahre Garantie.</span>
            </h1>

            <p className="text-sm md:text-base text-white/90 mb-3 leading-relaxed" data-speakable="true">
              Wir verstehen Ihre Situation. Ein Dachproblem bedeutet <strong>Stress, Unsicherheit und die Angst vor hohen Kosten.</strong> Vielleicht haben Sie schon schlechte Erfahrungen gemacht: Handwerker, die nicht kommen, Kostenexplosionen, oder Pfusch am Bau. Das muss nicht sein.
            </p>
            
            <p className="text-sm md:text-base text-white/80 mb-3 leading-relaxed">
              Bei Renodex bekommen Sie klare Festpreise, schnelle Hilfe und echte Handwerksqualität. Dach undicht? Sturmschaden? Ziegel locker? <strong>Wir lösen es HEUTE.</strong> Keine versteckten Kosten, keine bösen Überraschungen.
            </p>
            
            <p className="text-sm md:text-base text-white/70 mb-4 leading-relaxed">
              Nur ehrliche Arbeit von Meisterhand. <strong>Über 100+ zufriedene Kunden</strong> in München vertrauen uns bereits. Rufen Sie jetzt an und erleben Sie den Unterschied: Ein Dachdecker, der hält, was er verspricht.
            </p>

            <div className="flex flex-wrap gap-2 mb-4" data-testid="hero-keyword-links">
              <Link href="/sofort-hilfe" className="inline-flex items-center gap-1.5 bg-primary/90 text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-primary transition-colors" data-testid="link-hero-notdienst">
                <Clock className="w-3 h-3" />
                24h Dachreparatur & Sofort-Hilfe in München – Soforthilfe bei Sturmschäden
              </Link>
              <Link href="/sanierung-reparatur" className="inline-flex items-center gap-1.5 bg-white/15 text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-white/25 transition-colors" data-testid="link-hero-reparieren">
                <ArrowRight className="w-3 h-3" />
                Dach reparieren lassen in München – schnell & zuverlässig
              </Link>
              <Link href="/komplettsanierung-kosten" className="inline-flex items-center gap-1.5 bg-white/15 text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-white/25 transition-colors" data-testid="link-hero-kosten">
                <ArrowRight className="w-3 h-3" />
                Was kostet eine Dachsanierung in München?
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <Button aria-label="Aktion" 
                size="default" 
                asChild
                className="gap-2"
                data-testid="button-hero-call"
              >
                <a aria-label="Link" href={telLink}>
                  <Phone className="w-4 h-4" />
                  {phoneNumber}
                </a>
              </Button>
              <Button 
                size="default" 
                variant="outline" 
                onClick={onContactClick}
                className="gap-2 bg-white/10 backdrop-blur-sm border-white/30 text-white"
                data-testid="button-hero-quote"
              >
                Kostenloses Angebot
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-white/80 text-xs">
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3 text-primary" />
                Festpreis-Garantie
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3 text-primary" />
                Kostenlose Beratung
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3 text-primary" />
                10 Jahre Garantie
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3 text-primary" />
                Partnernetzwerk
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3 text-primary" />
                Versicherung akzeptiert
              </div>
            </div>
          </div>

          <div className="hidden md:block md:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="text-center mb-3">
                <div className="inline-flex items-center gap-1 text-yellow-400 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div className="text-white font-bold text-sm">4.9/5 Google Bewertung</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-white/10 rounded p-2">
                  <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                  <div className="text-white font-bold">48 Std</div>
                  <div className="text-white/80">Sofort-Hilfe</div>
                </div>
                <div className="bg-white/10 rounded p-2">
                  <Shield className="w-4 h-4 text-primary mx-auto mb-1" />
                  <div className="text-white font-bold">10 Jahre</div>
                  <div className="text-white/80">Garantie</div>
                </div>
                <div className="bg-white/10 rounded p-2">
                  <Award className="w-4 h-4 text-primary mx-auto mb-1" />
                  <div className="text-white font-bold">25+ Jahre</div>
                  <div className="text-white/80">Erfahrung</div>
                </div>
                <div className="bg-white/10 rounded p-2">
                  <Check className="w-4 h-4 text-primary mx-auto mb-1" />
                  <div className="text-white font-bold">Festpreis</div>
                  <div className="text-white/80">Garantiert</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
