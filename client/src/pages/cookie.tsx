import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Cookie, Check, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { useSEO } from "@/hooks/useSEO";
import KiBildHinweis from "@/components/KiBildHinweis";

const PHONE_NUMBER = "[Telefon folgt]";
const COOKIE_CONSENT_KEY = "renodex_cookie_consent";
const COOKIE_CONSENT_TIMESTAMP = "renodex_cookie_timestamp";
const COOKIE_CONSENT_VERSION = "1.0";

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  version: string;
}

export default function CookiePage() {
  useSEO({
    title: "Cookie-Einstellungen | Renodex München",
    description: "Cookie-Präferenzen anpassen: Technische, Analyse- und Marketing-Cookies aktivieren/deaktivieren. DSGVO-konforme Verwaltung.",
    canonical: "https://renodex.de/cookie"
  });

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent) {
      try {
        const parsed: CookieConsent = JSON.parse(consent);
        setAnalytics(parsed.analytics);
        setMarketing(parsed.marketing);
      } catch (e) {
        // Invalid consent data
      }
    }
  }, []);

  const saveConsent = (consent: CookieConsent) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    localStorage.setItem(COOKIE_CONSENT_TIMESTAMP, new Date().toISOString());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAcceptAll = () => {
    setAnalytics(true);
    setMarketing(true);
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      version: COOKIE_CONSENT_VERSION,
    });
  };

  const handleDeclineAll = () => {
    setAnalytics(false);
    setMarketing(false);
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      version: COOKIE_CONSENT_VERSION,
    });
  };

  const handleSaveSettings = () => {
    saveConsent({
      necessary: true,
      analytics,
      marketing,
      version: COOKIE_CONSENT_VERSION,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header phoneNumber={PHONE_NUMBER} />
      
      <main className="flex-1">
        <section
          className="py-10 bg-zinc-800 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/optimized/seite-cookie.webp)` }}
          role="img"
          aria-labelledby="hero-h1-cookie"
        >
          <KiBildHinweis />
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Cookie className="w-8 h-8 text-white" />
              <h1 id="hero-h1-cookie" className="text-3xl md:text-4xl font-bold text-center text-white">
                Cookie-Einstellungen – Renodex München
              </h1>
            </div>
            <p className="text-zinc-600 text-center max-w-2xl mx-auto">
              Verwalten Sie Ihre Cookie-Präferenzen gemäß DSGVO 2025. Transparente Datenverarbeitung für unsere Kunden in München und Umgebung.
            </p>
          </div>
        </section>

        <BackButton />

        <section className="py-10">
          <div className="max-w-3xl mx-auto px-4">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">
                  <h2>Cookie-Richtlinie – Datenschutz für Komplettsanierung in München</h2>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Stand: 18.08.2026</strong>
                </p>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Was sind Cookies und wie nutzt Renodex sie?</h3>
                  <p>
                    Cookies sind kleine Textdateien, die auf Ihrem Gerät (Computer, Tablet, Smartphone) gespeichert werden, 
                    wenn Sie unsere Website besuchen. Sie enthalten Informationen, die bei einem späteren Besuch wieder 
                    abgerufen werden können. Cookies helfen uns, die Website funktionsfähig zu halten und Ihr 
                    Nutzererlebnis zu verbessern.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Rechtsgrundlage nach DSGVO und TDDDG 2025</h3>
                  <p>
                    Die Verwendung von Cookies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) sowie 
                    § 25 TDDDG (Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz). Technisch notwendige Cookies werden auf 
                    Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) eingesetzt.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Welche Cookie-Arten verwendet Renodex München?</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Notwendige Cookies:</strong> Diese Cookies sind für den Betrieb der Website unerlässlich. 
                      Sie ermöglichen grundlegende Funktionen wie Seitennavigation und Zugriff auf sichere Bereiche. 
                      Die Website kann ohne diese Cookies nicht ordnungsgemäß funktionieren.
                    </li>
                    <li>
                      <strong>Analyse-Cookies:</strong> Diese Cookies sammeln Informationen darüber, wie Besucher unsere 
                      Website nutzen (z.B. welche Seiten am häufigsten besucht werden). Alle Informationen werden 
                      anonymisiert erfasst und helfen uns, die Website zu verbessern.
                    </li>
                    <li>
                      <strong>Marketing-Cookies:</strong> Diese Cookies werden verwendet, um Werbung für Sie relevanter 
                      zu gestalten. Sie können auch dazu dienen, die Wirksamkeit von Werbekampagnen zu messen.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Wie lange werden Cookies gespeichert?</h3>
                  <p>
                    Die Speicherdauer der Cookies variiert je nach Art und Zweck. Session-Cookies werden nach dem 
                    Schließen des Browsers gelöscht. Persistente Cookies bleiben für einen bestimmten Zeitraum auf 
                    Ihrem Gerät gespeichert (in der Regel 1-12 Monate).
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Ihre Rechte als Besucher unserer Website</h3>
                  <p>
                    Sie haben das Recht, Ihre Einwilligung jederzeit zu widerrufen. Sie können Ihre Cookie-Einstellungen 
                    auf dieser Seite ändern oder Cookies in Ihren Browser-Einstellungen verwalten. Bitte beachten Sie, 
                    dass das Deaktivieren bestimmter Cookies die Funktionalität der Website beeinträchtigen kann.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Kontakt für Datenschutzfragen in München</h3>
                  <p>
                    Bei Fragen zu unserer Cookie-Richtlinie können Sie uns kontaktieren:<br />
                    <strong>Renodex</strong><br />
                    [Adresse folgt]<br />
                    E-Mail: info@renodex.de<br />
                    Telefon: [Telefon folgt]
                  </p>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-xl font-bold mb-4">Ihre Cookie-Einstellungen verwalten</h2>
            <div className="space-y-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <Label className="font-semibold text-foreground text-base">Notwendige Cookies</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Diese Cookies sind für die grundlegende Funktionalität der Website erforderlich. 
                        Sie ermöglichen Kernfunktionen wie Sicherheit, Netzwerkverwaltung und Barrierefreiheit. 
                        Diese können nicht deaktiviert werden.
                      </p>
                    </div>
                    <Switch checked={true} disabled className="opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <Label className="font-semibold text-foreground text-base">Analyse-Cookies</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen. 
                        Wir verwenden diese Informationen, um unsere Website zu verbessern und das Nutzererlebnis zu optimieren.
                      </p>
                    </div>
                    <Switch 
                      checked={analytics} 
                      onCheckedChange={setAnalytics}
                      data-testid="switch-analytics"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <Label className="font-semibold text-foreground text-base">Marketing-Cookies</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Diese Cookies werden verwendet, um Werbung relevanter für Sie zu gestalten. 
                        Sie können auch verwendet werden, um die Wirksamkeit von Werbekampagnen zu messen.
                      </p>
                    </div>
                    <Switch 
                      checked={marketing} 
                      onCheckedChange={setMarketing}
                      data-testid="switch-marketing"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button
                variant="outline"
                onClick={handleDeclineAll}
                className="flex-1"
                data-testid="button-cookie-decline-all"
               aria-label="Cookie-Einstellungen ablehnen">
                Alle ablehnen
              </Button>
              <Button
                onClick={handleSaveSettings}
                className="flex-1 gap-2"
                data-testid="button-cookie-save"
              >
                <Check className="w-4 h-4" />
                Auswahl speichern
              </Button>
              <Button
                onClick={handleAcceptAll}
                className="flex-1"
                data-testid="button-cookie-accept-all"
               aria-label="Cookies akzeptieren">
                Alle akzeptieren
              </Button>
            </div>

            {saved && (
              <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-md text-center mb-6">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  Ihre Cookie-Einstellungen wurden gespeichert.
                </p>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Weitere Informationen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Detaillierte Informationen zur Verwendung von Cookies und zum Datenschutz finden Sie in unserer Datenschutzerklärung.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/datenschutz">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Datenschutzerklärung
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="w-full sm:w-auto gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Zurück zur Startseite
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
