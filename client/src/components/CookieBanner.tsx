import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, X, Settings, Check } from "lucide-react";
import { Link } from "wouter";

type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_CONSENT_KEY = "089dach_dacharbeiten_cookie_consent";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    __gtagLaden?: () => void;
  }
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      const parsed = JSON.parse(savedConsent) as ConsentState;
      setConsent(parsed);
      if (parsed.analytics || parsed.marketing) {
        enableTracking(parsed);
      }
    }
  }, []);

  const enableTracking = (state: ConsentState) => {
    // Ergaenzt 11.08.2026 (Fund projekte/bugs/bereiche/04-web-sichtbarkeit/, Nr. 15):
    // index.html laedt die Google-Tag-Bibliothek jetzt nur noch ueber window.__gtagLaden()
    // bei echter Zustimmung -- der Aufruf muss VOR dem consent-update stehen, damit gtag()
    // ueberhaupt existiert (bis dahin sammelt window.dataLayer die Aufrufe).
    if (typeof window !== "undefined" && (state.analytics || state.marketing) && window.__gtagLaden) {
      window.__gtagLaden();
    }
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: state.analytics ? "granted" : "denied",
        ad_storage: state.marketing ? "granted" : "denied",
        ad_user_data: state.marketing ? "granted" : "denied",
        ad_personalization: state.marketing ? "granted" : "denied",
      });
    }
  };

  const disableAll = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  };

  const handleAcceptAll = () => {
    const newConsent = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newConsent));
    setConsent(newConsent);
    enableTracking(newConsent);
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    const newConsent = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newConsent));
    setConsent(newConsent);
    disableAll();
    setShowBanner(false);
  };

  const handleSaveSelection = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    enableTracking(consent);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center p-4 bg-black/50" data-testid="cookie-consent-overlay">
      <Card className="w-full max-w-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">Cookie-Einstellungen</h3>
              <p className="text-sm text-muted-foreground">
                Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
                Sie können wählen, welche Cookies Sie zulassen möchten.
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleAcceptNecessary}
              data-testid="button-cookie-close"
              aria-label="Schließen">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {showDetails && (
            <div className="space-y-3 mb-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Notwendige Cookies</p>
                  <p className="text-xs text-muted-foreground">Erforderlich für die Grundfunktionen der Website</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-muted-foreground">Immer aktiv</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Analyse-Cookies</p>
                  <p className="text-xs text-muted-foreground">Google Analytics zur Verbesserung unserer Website</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                    className="sr-only peer"
                    data-testid="checkbox-analytics"
                  />
                  <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Marketing-Cookies</p>
                  <p className="text-xs text-muted-foreground">Für personalisierte Werbung und Remarketing</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.marketing}
                    onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                    className="sr-only peer"
                    data-testid="checkbox-marketing"
                  />
                  <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <Button aria-label="Cookie-Einstellungen"
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1"
              data-testid="button-cookie-settings"
            >
              <Settings className="w-4 h-4 mr-2" />
              {showDetails ? "Weniger anzeigen" : "Einstellungen"}
            </Button>

            {showDetails ? (
              <Button
                onClick={handleSaveSelection}
                className="flex-1"
                data-testid="button-cookie-save"
              >
                Auswahl speichern
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={handleAcceptNecessary}
                className="flex-1"
                data-testid="button-cookie-necessary"
                aria-label="Nur notwendige Cookies">
                Nur notwendige
              </Button>
            )}

            <Button
              onClick={handleAcceptAll}
              className="flex-1 bg-primary"
              data-testid="button-cookie-accept-all"
              aria-label="Alle Cookies akzeptieren">
              Alle akzeptieren
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Weitere Informationen finden Sie in unserer{" "}
            <Link href="/datenschutz" className="text-primary hover:text-destructive transition-colors">Datenschutzerklärung</Link>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function CookieSettingsButton() {
  const handleOpenSettings = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    window.location.reload();
  };

  return (
    <button
      onClick={handleOpenSettings}
      className="text-sm text-muted-foreground hover:text-foreground"
      data-testid="button-cookie-reopen"
      aria-label="Cookie-Einstellungen öffnen">
      Cookie-Einstellungen
    </button>
  );
}
