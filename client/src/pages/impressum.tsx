import { Phone, Wrench, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BackButton from "@/components/BackButton";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb, { SERVICE_BREADCRUMBS } from "@/components/Breadcrumb";
import KiBildHinweis from "@/components/KiBildHinweis";

const PHONE_NUMBER = "+49 89 381684766";

export default function Impressum() {
  useSEO({
    title: "Impressum | Renodex München",
    description: "Impressum gemäß § 5 DDG: Renodex ist eine Marke von K. Bilic (Einzelunternehmen), Inhaber Krešimir Bilic, Helmut-Schmidt-Allee 54, 81248 München.",
    canonical: "https://renodex.de/impressum"
  });

  return (
    <div className="min-h-screen bg-background">
      <Header phoneNumber={PHONE_NUMBER} />
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb items={SERVICE_BREADCRUMBS["/impressum"]} />
      </div>
      
      <main>
        <section
          className="py-10 md:py-12 relative bg-zinc-900 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.75), rgba(24,24,27,0.85)), url(/images/optimized/buero-eingang-handwerksbetrieb.webp)` }}
        >
          <KiBildHinweis />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h1 id="hero-h1-impressum" className="text-3xl md:text-4xl font-bold mb-3 text-white" data-testid="heading-impressum">
              Impressum – Renodex München
            </h1>
            <p className="text-zinc-300 max-w-2xl">
              Rechtliche Informationen und Angaben gemäß § 5 DDG | Partnernetzwerk aus Fachfirmen in München
            </p>
          </div>
        </section>

        <BackButton />

        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="space-y-8 text-foreground">
              <section>
                <h2 className="text-xl font-semibold mb-3">Angaben gemäß § 5 DDG</h2>
                <p className="text-muted-foreground">
                  K. Bilic<br />
                  Rechtsform: Einzelunternehmen<br />
                  Inhaber: Krešimir Bilic<br />
                  Firmenauftritt: Renodex<br />
                  Helmut-Schmidt-Allee 54<br />
                  81248 München<br />
                  Deutschland
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Kontakt</h2>
                <p className="text-muted-foreground">
                  Telefon: <span className="text-foreground">+49 89 381684766</span><br />
                  E-Mail: <a href="mailto:info@renodex.de" className="text-foreground hover:text-destructive transition-colors">info@renodex.de</a>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Vertragspartner</h2>
                <p className="text-muted-foreground">
                  Renodex erstellt nach der Besichtigung das Festpreisangebot und koordiniert jedes Vorhaben. Vertragspartner für die Bauleistung ist je nach Angebot K. Bilic (Renodex) als Generalunternehmer oder die im Angebot namentlich genannte Fachfirma. Meisterpflichtige Arbeiten führen in die Handwerksrolle eingetragene Fachbetriebe aus.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
                <p className="text-muted-foreground">
                  Krešimir Bilic<br />
                  Helmut-Schmidt-Allee 54, 81248 München
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Streitschlichtung</h2>
                <p className="text-muted-foreground">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  <a 
                    href="https://ec.europa.eu/consumers/odr/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary ml-1"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="text-muted-foreground mt-2">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Preisangaben</h2>
                <p className="text-muted-foreground">
                  Alle auf dieser Website genannten Preise sind unverbindliche Richtwerte ohne Rechtsbindung und stellen kein bindendes Angebot dar. Verbindlich ist ausschließlich das schriftliche Festpreisangebot nach der Besichtigung.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Haftung für Inhalte</h2>
                <p className="text-muted-foreground">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="text-muted-foreground mt-2">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Haftung für Links</h2>
                <p className="text-muted-foreground">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Urheberrecht</h2>
                <p className="text-muted-foreground">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </section>

              <section className="bg-muted/40 p-5 md:p-6 rounded-xl border">
                <h2 className="text-xl font-semibold mb-3">KI-Hinweis gemäß EU AI Act (Art. 50)</h2>
                <p className="text-muted-foreground mb-3">
                  <strong>Transparenzhinweis:</strong> Renodex setzt zur Unterstützung der Geschäftsprozesse KI-basierte Systeme ein. Diese werden u.a. bei der Angebotserstellung, Kommunikation und Dokumentenverarbeitung genutzt.
                </p>
                <p className="text-muted-foreground mb-3">
                  Alle endgültigen Entscheidungen werden von qualifizierten Mitarbeitern getroffen und verantwortet.
                </p>
                <p className="text-muted-foreground text-sm">
                  <strong>Rechtsgrundlage:</strong> Verordnung (EU) 2024/1689 (EU AI Act) – Art. 50 (Transparenzpflicht Chatbots/KI-Kennzeichnung, seit 02.08.2026 ohne Übergangsfrist in Kraft), ergänzt durch die Verordnung (EU) 2026/1744 ("Digital Omnibus zur KI", in Kraft seit 27.07.2026, verschiebt die Hochrisiko-KI-Pflichten nach Anhang III auf den 02.12.2027)
                </p>
              </section>
            </div>
          </div>
        </section>

        <section className="bg-muted/20 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-6 text-center">Weitere Informationen</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <Link href="/leistungen">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Wrench className="w-5 h-5 text-marine shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Alle Leistungen</h3>
                      <p className="text-xs text-muted-foreground mt-1">Komplettsanierung im Überblick</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/kontakt">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-marine shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Kontakt</h3>
                      <p className="text-xs text-muted-foreground mt-1">Jetzt Beratung anfragen</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <div className="max-w-3xl mx-auto px-4 py-4">
        <p className="text-[10px] text-muted-foreground/60 leading-relaxed">
          Hinweis zum Vertragsschluss: Inhalte und Preisangaben dieser Website sind kein verbindliches Angebot. Über die Website wird kein Vertrag geschlossen. Nach Ihrer Anfrage mit Angaben und Fotos besichtigt Renodex das Objekt; die Besichtigung ist kostenlos und unverbindlich. Danach erhalten Sie ein schriftliches Festpreisangebot. Es nennt Ihren Vertragspartner für die Bauarbeiten: Renodex als Generalunternehmer oder die ausführende Fachfirma. Der Vertrag kommt erst zustande, wenn Sie dieses Angebot ausdrücklich annehmen. Über die Website erfolgen keine Bestellung, keine Buchung und keine Zahlung.
        </p>
      </div>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
