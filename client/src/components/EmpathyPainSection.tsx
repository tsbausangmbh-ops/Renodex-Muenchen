import { Heart, ShieldAlert, Clock, ArrowRight, Home, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmpathyPainSectionProps {
  onContactClick: () => void;
}

const situations = [
  "Tropft es bei Regen durch die Decke?",
  "Wächst der feuchte Fleck an der Wand?",
  "Haben Sie Sturmschäden am Dach entdeckt?",
  "Sind Ihre Dachrinnen verstopft oder undicht?",
  "Machen lose Ziegel Ihnen Sorgen?"
];

export default function EmpathyPainSection({ onContactClick }: EmpathyPainSectionProps) {
  return (
    <section className="py-12 bg-muted/30" data-testid="section-empathy-pain">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-8">
          <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Dachprobleme in München? Wir verstehen Ihre Sorgen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ein beschädigtes Dach ist mehr als nur ein Bauproblem. 
            Es ist die Sorge um Ihr Zuhause, Ihre Familie und Ihr Eigentum in <strong>München</strong>.
          </p>
        </div>

        <div className="bg-card border rounded-md p-6 mb-8">
          <p className="text-base leading-relaxed mb-4">
            <strong>Kennen Sie das?</strong> Sie liegen nachts wach und hören 
            den Regen auf das Dach prasseln. Tropft es irgendwo? Wird der Fleck an der 
            Decke größer? Jeder Sturm macht Ihnen Sorgen – und Sie wissen nicht, 
            welchem <strong>Dachdecker in München</strong> Sie vertrauen können.
          </p>
          <p className="text-base leading-relaxed mb-4">
            <strong>Das muss nicht sein.</strong> Stellen Sie sich vor: Ihr Dach ist wieder 
            dicht, sicher und geschützt. Ob <strong>Dachsanierung</strong>, <strong>Dachreparatur</strong> oder 
            <strong> Sturmschaden-Beseitigung</strong> – nach unserer Arbeit können Sie wieder 
            ruhig schlafen, egal wie stark der Wind weht.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Als <strong>[Gründungsjahr folgt]</strong> mit <strong>25+ Jahren Erfahrung</strong> haben wir 
            über 100 Familien in <strong>München-Allach</strong>, <strong>Pasing</strong>, <strong>Obermenzing</strong> und 
            Umgebung genau dieses Gefühl der Sicherheit zurückgegeben.
          </p>
        </div>

        <div className="bg-muted/50 rounded-md p-5 mb-8">
          <h3 className="font-semibold mb-3 flex items-center gap-2" data-testid="heading-empathy-checklist">
            <Home className="w-5 h-5 text-primary" />
            Typische Dachprobleme in München – Kommt Ihnen das bekannt vor?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {situations.map((situation, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{situation}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Auch nur ein Häkchen gesetzt? Dann sollten Sie jetzt handeln – bevor aus kleinen Problemen große werden.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="flex items-start gap-3 p-4 bg-destructive/5 border border-destructive/20 rounded-md">
            <ShieldAlert className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Ohne Dachreparatur</h3>
              <p className="text-sm text-muted-foreground">
                Kleine Schäden werden groß. Wassereintritt führt zu Schimmel. 
                Reparaturkosten steigen mit jedem Monat. Der Wert Ihrer Münchner Immobilie sinkt.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-md">
            <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Mit Renodex</h3>
              <p className="text-sm text-muted-foreground">
                Schnelle Hilfe vom <strong>Partnernetzwerk aus geprüften Partner-Meisterfirmen</strong>, faire Festpreise, dauerhafte Lösungen. 
                Ihr Dach ist in den besten Händen Münchens.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-base mb-4">
            <strong>Der erste Schritt ist der einfachste:</strong> 
            Sprechen Sie mit unserem Meister. Kostenlos und unverbindlich.
          </p>
          <Button size="lg" onClick={onContactClick} data-testid="button-empathy-cta">
            Jetzt kostenlos beraten lassen
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            Oder rufen Sie direkt an: <strong>[Telefon folgt]</strong> – auch am Wochenende erreichbar
          </p>
        </div>
        
      </div>
    </section>
  );
}
