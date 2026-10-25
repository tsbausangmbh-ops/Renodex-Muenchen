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
import { googleCookiesLoeschen } from "@/components/CookieBanner";

const PHONE_NUMBER = "+49 89 381684766";
const COOKIE_CONSENT_KEY = "renodex_cookie_consent";
const COOKIE_CONSENT_TIMESTAMP = "renodex_cookie_timestamp";
const COOKIE_CONSENT_VERSION = "1.1"; // Ziel 1464: Zweck „Marketing“ = nur Ads-Conversion, neu abgefragt

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
    // Ziel 1449 (25.10.2026): Auswahl wie im CookieBanner an den Google-Consent-Mode geben,
    // sonst wirkte ein Widerruf auf dieser Seite erst nach dem nächsten Seitenaufruf.
    const w = window as any;
    if ((consent.analytics || consent.marketing) && typeof w.__gtagLaden === "function") {
      w.__gtagLaden();
    }
    if (typeof w.gtag === "function") {
      w.gtag("consent", "update", {
        analytics_storage: consent.analytics ? "granted" : "denied",
        ad_storage: consent.marketing ? "granted" : "denied",
        ad_user_data: consent.marketing ? "granted" : "denied",
        // Ziel 1464: nur Conversion-Messung, keine personalisierte Werbung.
        ad_personalization: "denied",
      });
    }
    // Ziel 1464: Tags zweckgebunden schalten (index.html) und beim Widerruf Google-Cookies löschen.
    if (typeof w.__tagsAn === "function") w.__tagsAn(consent);
    if (!consent.analytics || !consent.marketing) googleCookiesLoeschen();
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
          style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.75), rgba(24,24,27,0.85)), url(/images/optimized/beratungsgespraech-skizzen.webp)` }}
        >
          <KiBildHinweis />
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-3">
              <Cookie className="w-8 h-8 text-white" />
              <h1 id="hero-h1-cookie" className="text-3xl md:text-4xl font-bold text-white">
                Cookie-Einstellungen – Renodex München
              </h1>
            </div>
            <p className="text-zinc-300 max-w-2xl">
              Verwalten Sie Ihre Cookie-Präferenzen gemäß DSGVO und TDDDG. Transparente Datenverarbeitung für unsere Kunden in München und Umgebung.
            </p>
          </div>
        </section>

        <BackButton />

        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">
                  <h2>Cookie-Richtlinie – Datenschutz für Komplettsanierung in München</h2>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Stand: 10.10.2026</strong>
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
                  <h3 className="font-semibold text-foreground mb-2">Rechtsgrundlage nach DSGVO und TDDDG</h3>
                  <p>
                    Einträge, die für einen von Ihnen gewünschten Dienst unbedingt erforderlich sind, speichern wir ohne
                    Einwilligung (§ 25 Abs. 2 Nr. 2 TDDDG, Art. 6 Abs. 1 lit. f DSGVO). Für alle anderen Cookies und Speicher
                    holen wir vorher Ihre Einwilligung ein (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a und Art. 7 DSGVO). Vor Ihrer
                    Entscheidung lädt diese Website keine Dienste von Google.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Welche Cookie-Arten verwendet Renodex München?</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Notwendig:</strong> Ihre Cookie-Auswahl und Merker, dass ein saisonaler Hinweis schon gezeigt
                      wurde. Alles liegt im localStorage Ihres Browsers, HTTP-Cookies setzen wir dafür nicht.
                    </li>
                    <li>
                      <strong>Analyse:</strong> Google Analytics 4 (Google Ireland Limited) misst mit einer pseudonymen Kennung,
                      wie Besucher die Website nutzen. Nur mit Ihrer Einwilligung.
                    </li>
                    <li>
                      <strong>Marketing:</strong> Google-Ads-Conversion-Messung (Google Ireland Limited). Sie misst, ob eine
                      Anfrage auf eine Werbeanzeige zurückgeht. Nur mit Ihrer Einwilligung.
                    </li>
                  </ul>
                  <p className="mt-2">
                    Erlauben Sie „Analyse“ oder „Marketing“, lädt die Website den Google-Tag (G-3KGHRLMKX8, AW-17999611596).
                    Google kann Daten auch in den USA verarbeiten. Die Google LLC ist nach dem EU-US Data Privacy Framework
                    zertifiziert.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Welche Einträge werden gespeichert?</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-border">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="p-2 text-left border-b border-border font-semibold text-foreground">Name</th>
                          <th className="p-2 text-left border-b border-border font-semibold text-foreground">Anbieter</th>
                          <th className="p-2 text-left border-b border-border font-semibold text-foreground">Zweck</th>
                          <th className="p-2 text-left border-b border-border font-semibold text-foreground">Dauer</th>
                          <th className="p-2 text-left border-b border-border font-semibold text-foreground">Typ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border-b border-border font-mono text-xs">renodex_cookie_consent, renodex_cookie_timestamp</td>
                          <td className="p-2 border-b border-border">Renodex</td>
                          <td className="p-2 border-b border-border">Notwendig: speichert Ihre Cookie-Auswahl und deren Zeitpunkt.</td>
                          <td className="p-2 border-b border-border">Bis zur Löschung durch Sie</td>
                          <td className="p-2 border-b border-border">localStorage</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-b border-border font-mono text-xs">christmas_popup_shown_&lt;Jahr&gt;, newyear_popup_shown_&lt;Jahr&gt;</td>
                          <td className="p-2 border-b border-border">Renodex</td>
                          <td className="p-2 border-b border-border">Notwendig: verhindert, dass ein saisonaler Hinweis mehrfach erscheint.</td>
                          <td className="p-2 border-b border-border">Bis zur Löschung durch Sie</td>
                          <td className="p-2 border-b border-border">localStorage</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-b border-border font-mono text-xs">_ga, _ga_3KGHRLMKX8</td>
                          <td className="p-2 border-b border-border">Google Ireland Ltd.</td>
                          <td className="p-2 border-b border-border">Analyse: Reichweitenmessung mit Google Analytics 4.</td>
                          <td className="p-2 border-b border-border">2 Jahre</td>
                          <td className="p-2 border-b border-border">HTTP-Cookie</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-b border-border font-mono text-xs">Google-Ads-Cookies (z. B. _gcl_au)</td>
                          <td className="p-2 border-b border-border">Google Ireland Ltd.</td>
                          <td className="p-2 border-b border-border">Marketing: Conversion-Messung für Google Ads (AW-17999611596).</td>
                          <td className="p-2 border-b border-border">Bis 90 Tage</td>
                          <td className="p-2 border-b border-border">HTTP-Cookie</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Ihre Rechte als Besucher unserer Website</h3>
                  <p>
                    Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO).
                    Das geht hier auf dieser Seite mit „Alle ablehnen“ oder über Ihre Auswahl, genauso einfach wie die
                    Erteilung. Bereits gesetzte Cookies können Sie zusätzlich in Ihren Browser-Einstellungen löschen.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Kontakt für Datenschutzfragen in München</h3>
                  <p>
                    Bei Fragen zu unserer Cookie-Richtlinie können Sie uns kontaktieren:<br />
                    <strong>Renodex</strong><br />
                    Helmut-Schmidt-Allee 54<br />
                    81248 München<br />
                    E-Mail: info@renodex.de<br />
                    Telefon: +49 89 381684766
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
                        Speichern Ihre Cookie-Auswahl und die Merker der saisonalen Hinweise im localStorage.
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
                        Google Analytics 4 (Google Ireland Limited): Cookies _ga und _ga_3KGHRLMKX8, 2 Jahre.
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
                        Google-Ads-Conversion-Messung (Google Ireland Limited): misst, ob eine Anfrage auf eine Werbeanzeige zurückgeht.
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
