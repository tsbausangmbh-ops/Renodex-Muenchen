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

const COOKIE_CONSENT_KEY = "renodex_cookie_consent";
// Ziel 1464 (25.10.2026): gleicher Nachweis wie auf /cookie (Art. 7 Abs. 1 DSGVO).
const COOKIE_CONSENT_TIMESTAMP = "renodex_cookie_timestamp";
// Ziel 1464: 1.1, weil „Marketing“ jetzt Google Ads steuert; ältere Einwilligungen werden neu abgefragt.
const COOKIE_CONSENT_VERSION = "1.1";

// Ziel 1464: Bei Ablehnung/Widerruf die Google-Cookies entfernen (Art. 7 Abs. 3, Art. 17 DSGVO).
export function googleCookiesLoeschen() {
  if (typeof document === "undefined") return;
  document.cookie.split(";").map((c) => c.split("=")[0].trim())
    .filter((n) => n === "_ga" || n.startsWith("_ga_") || n === "_gcl_au")
    .forEach((n) => {
      document.cookie = `${n}=; max-age=0; path=/`;
      document.cookie = `${n}=; max-age=0; path=/; domain=.renodex.de`;
    });
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    __gtagLaden?: () => void;
    __tagsAn?: (state: { analytics: boolean; marketing: boolean }) => void;
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
      let parsed: (ConsentState & { version?: string }) | null = null;
      try { parsed = JSON.parse(savedConsent); } catch { parsed = null; }
      if (!parsed || parsed.version !== COOKIE_CONSENT_VERSION) {
        setShowBanner(true);
        return;
      }
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
      // Ziel 1464: Marketing ist nur Conversion-Messung, keine personalisierte Werbung:
      // ad_personalization bleibt immer "denied".
      window.gtag("consent", "update", {
        analytics_storage: state.analytics ? "granted" : "denied",
        ad_storage: state.marketing ? "granted" : "denied",
        ad_user_data: state.marketing ? "granted" : "denied",
        ad_personalization: "denied",
      });
    }
    if (typeof window !== "undefined" && window.__tagsAn) {
      window.__tagsAn(state);
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
    if (typeof window !== "undefined" && window.__tagsAn) {
      window.__tagsAn({ analytics: false, marketing: false });
    }
    googleCookiesLoeschen();
  };

  const speichern = (state: ConsentState) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ ...state, version: COOKIE_CONSENT_VERSION }));
    localStorage.setItem(COOKIE_CONSENT_TIMESTAMP, new Date().toISOString());
  };

  const handleAcceptAll = () => {
    const newConsent = { necessary: true, analytics: true, marketing: true };
    speichern(newConsent);
    setConsent(newConsent);
    enableTracking(newConsent);
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    const newConsent = { necessary: true, analytics: false, marketing: false };
    speichern(newConsent);
    setConsent(newConsent);
    disableAll();
    setShowBanner(false);
  };

  const handleSaveSelection = () => {
    speichern(consent);
    if (consent.analytics || consent.marketing) {
      enableTracking(consent);
      if (!consent.analytics || !consent.marketing) googleCookiesLoeschen();
    } else {
      disableAll();
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none" data-testid="cookie-consent-overlay">
      <Card className="w-full rounded-none border-x-0 border-b-0 shadow-2xl animate-in slide-in-from-bottom-4 duration-300 pointer-events-auto">
        <CardContent className="p-3 md:p-4">
          <div className="flex items-center gap-3 max-w-6xl mx-auto">
            <Cookie className="w-5 h-5 text-marine flex-shrink-0 hidden sm:block" />
            <p className="text-xs md:text-sm text-muted-foreground flex-1">
              {/* Ziel 1464 (25.10.2026, Stand 10.10.2026): Anbieter, Zweck und USA auf der ersten Ebene;
                  „Ablehnen“ und „Akzeptieren“ gleich gestaltet (Art. 4 Nr. 11, Art. 7 DSGVO, § 25 TDDDG). */}
              Mit Ihrer Einwilligung nutzen wir Google Analytics (Analyse) und Google Ads (Conversion-Messung)
              der Google Ireland Limited. Dabei können Daten in die USA übermittelt werden (Google LLC, EU-US
              Data Privacy Framework). Widerruf jederzeit unter{" "}
              <Link href="/cookie" className="text-primary hover:text-destructive transition-colors underline">Cookie-Einstellungen</Link>.
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button aria-label="Cookie-Einstellungen"
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                data-testid="button-cookie-settings"
              >
                <Settings className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Einstellungen</span>
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptNecessary}
                data-testid="button-cookie-necessary"
                aria-label="Optionale Cookies ablehnen">
                Ablehnen
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                data-testid="button-cookie-accept-all"
                aria-label="Alle Cookies akzeptieren">
                Akzeptieren
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleAcceptNecessary}
                data-testid="button-cookie-close"
                aria-label="Schließen">
                <X className="w-4 h-4" />
              </Button>
            </div>
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
                  <p className="text-xs text-muted-foreground">Google-Ads-Conversion-Messung: misst, ob eine Anfrage auf eine Anzeige zurückgeht (keine personalisierte Werbung)</p>
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

              <div className="flex justify-end pt-1">
                <Button
                  size="sm"
                  onClick={handleSaveSelection}
                  data-testid="button-cookie-save"
                >
                  Auswahl speichern
                </Button>
              </div>
            </div>
          )}
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
