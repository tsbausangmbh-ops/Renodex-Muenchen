import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Phone, ArrowLeft, Search } from "lucide-react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

export default function NotFound() {
  useSEO({
    title: "Seite nicht gefunden | Renodex München",
    description: "Die gesuchte Seite existiert nicht. Finden Sie hier Ihren Dachdecker in München - 24/7 Sofort-Hilfe, Dachsanierung & Reparatur.",
    canonical: "/404"
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mx-4">
        <CardContent className="pt-8 pb-8">
          <div className="text-center mb-6">
            <div className="text-8xl font-bold text-primary mb-4">404</div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Seite nicht gefunden
            </h1>
            <p className="text-muted-foreground">
              Die gesuchte Seite existiert leider nicht oder wurde verschoben.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/">
              <Button className="w-full gap-2" size="lg" data-testid="button-home">
                <Home className="h-5 w-5" />
                Zur Startseite
              </Button>
            </Link>
            
            <Link href="/leistungen">
              <Button variant="outline" className="w-full gap-2" size="lg" data-testid="button-services">
                <Search className="h-5 w-5" />
                Unsere Leistungen
              </Button>
            </Link>
            
            <Link href="/kontakt">
              <Button variant="outline" className="w-full gap-2" size="lg" data-testid="button-contact">
                <Phone className="h-5 w-5" />
                Kontakt aufnehmen
              </Button>
            </Link>

            <Button aria-label="Aktion" 
              variant="ghost" 
              className="w-full gap-2" 
              size="lg"
              onClick={() => window.history.back()}
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
              Zurück zur vorherigen Seite
            </Button>
          </div>

          <div className="mt-8 p-4 bg-primary/10 rounded-md text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Benötigen Sie dringend Hilfe?
            </p>
            <a 
              href="tel:00000000000" 
              className="text-xl font-bold text-primary"
              data-testid="link-emergency-phone"
            >
              089 / 215 394 39
            </a>
            <p className="text-xs text-muted-foreground mt-1">
              24/7 Sofort-Hilfe - Wir sind für Sie da!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
