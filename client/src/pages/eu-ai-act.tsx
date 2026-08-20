import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb, { SERVICE_BREADCRUMBS } from "@/components/Breadcrumb";
import KiBildHinweis from "@/components/KiBildHinweis";

const PHONE_NUMBER = "[Telefon folgt]";

export default function EuAiAct() {
  useSEO({
    title: "EU AI Act | KI-Transparenz | Renodex",
    description: "Transparenzhinweise der Renodex gemäß EU AI Act (Verordnung (EU) 2024/1689), Art. 50: Einsatz von KI-Systemen, Rechtsgrundlage, Kontakt.",
    canonical: "https://renodex.de/eu-ai-act"
  });

  return (
    <div className="min-h-screen bg-background">
      <Header phoneNumber={PHONE_NUMBER} />

      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb items={SERVICE_BREADCRUMBS["/eu-ai-act"]} />
      </div>

      <main>
        <section
          className="py-10 md:py-12 relative bg-zinc-900 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.75), rgba(24,24,27,0.85)), url(/images/optimized/seite-eu-ai-act.webp)` }}
          role="img"
          aria-labelledby="hero-h1-eu-ai-act"
        >
          <KiBildHinweis />
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h1 id="hero-h1-eu-ai-act" className="text-3xl md:text-4xl font-bold mb-3 text-white" data-testid="heading-eu-ai-act">
              EU AI Act – Renodex München
            </h1>
            <p className="text-zinc-300 max-w-2xl">
              Transparenzhinweise zum Einsatz von KI-Systemen gemäß Art. 50 EU AI Act
            </p>
          </div>
        </section>

        <BackButton />

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="space-y-8 text-foreground">

              <section id="mKI">
                <h2 className="text-xl font-semibold mb-3">KI-Chatbot – EU AI Act Konformität</h2>

                <div className="p-3 bg-primary/10 border border-primary/20 rounded-md mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">Transparenzhinweis gemäß EU AI Act (VO 2024/1689)</p>
                  <p className="text-muted-foreground text-sm">
                    Auf dieser Website wird ein <strong>KI-gestütztes Dialogsystem</strong> (Chatbot) eingesetzt. Gemäß <strong>Art. 50 Abs. 1 EU AI Act</strong> (Verordnung (EU) 2024/1689 des Europäischen Parlaments und des Rates vom 13. Juni 2024) informieren wir Sie hiermit, dass Sie mit einem KI-System interagieren – nicht mit einem Menschen.
                  </p>
                </div>

                <h3 className="text-lg font-medium mb-2">Rechtlicher Rahmen</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li><strong>EU AI Act (VO 2024/1689):</strong> In Kraft seit 1. August 2024, Transparenzpflichten nach Art. 50 vollständig anwendbar ab 2. August 2026. Wir erfüllen diese Anforderungen bereits jetzt.</li>
                  <li><strong>Risikoklassifizierung:</strong> Unser Chatbot fällt unter "KI-Systeme mit begrenztem Risiko" (Kapitel IV, Art. 50) – keine Hochrisiko-Einstufung.</li>
                  <li><strong>DSGVO:</strong> Parallel gelten die Anforderungen der Datenschutz-Grundverordnung (EU) 2016/679.</li>
                </ul>

                <h3 className="text-lg font-medium mb-2">Datenverarbeitung</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-3">
                  <li><strong>Verarbeitete Datenarten:</strong> Inhaltsdaten (Ihre Chatnachrichten und Anfragen); Meta-, Kommunikations- und Verfahrensdaten (IP-Adresse, Zeitstempel).</li>
                  <li><strong>Betroffene Personen:</strong> Nutzer des Chatbots.</li>
                  <li><strong>Zwecke der Verarbeitung:</strong> Beantwortung von Anfragen zu unseren Dienstleistungen; Terminvereinbarung; Erstberatung; Weiterleitung von Rückrufwünschen.</li>
                  <li><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO) – effiziente Kundenbetreuung; Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO).</li>
                  <li><strong>Speicherdauer:</strong> Chatnachrichten werden nur für die Dauer der Sitzung verarbeitet und nicht dauerhaft gespeichert. Bei Terminanfragen werden die relevanten Daten zur Bearbeitung an unser Team weitergeleitet.</li>
                </ul>

                <h3 className="text-lg font-medium mb-2">Ihre Rechte</h3>
                <p className="text-muted-foreground mb-3">
                  Ihnen stehen die in der Datenschutzerklärung genannten Rechte zu. Zusätzlich haben Sie gemäß EU AI Act das Recht auf eine verständliche Erklärung der Funktionsweise des KI-Systems.
                </p>

                <p className="text-muted-foreground mb-3">
                  <strong>Wichtiger Hinweis:</strong> Bitte geben Sie im Chat keine sensiblen personenbezogenen Daten ein (z.B. Gesundheitsdaten, religiöse Überzeugungen gem. Art. 9 DSGVO). Für vertrauliche Anfragen nutzen Sie bitte unser Kontaktformular oder rufen Sie uns direkt an.
                </p>

                <p className="text-muted-foreground text-sm">
                  Weitere Informationen: <a href="https://artificialintelligenceact.eu/article/50/" target="_blank" rel="noopener noreferrer" className="text-foreground">Art. 50 EU AI Act (Volltext)</a>. Details zu Auftragsverarbeitern finden Sie in unserer <a href="/datenschutz" className="text-foreground">Datenschutzerklärung</a>.
                </p>
              </section>

              <section id="ki-bilder">
                <h2 className="text-xl font-semibold mb-3">KI-generierte Bilder auf dieser Website</h2>

                <div className="p-3 bg-primary/10 border border-primary/20 rounded-md mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">Transparenzhinweis gemäß Art. 50 Abs. 4 EU AI Act</p>
                  <p className="text-muted-foreground text-sm">
                    Einzelne Bilder auf dieser Website wurden mit Hilfe eines KI-Bildgenerators erstellt. Diese Bilder sind unmittelbar am Bild selbst mit dem Hinweis <strong>„KI-generiertes Bild"</strong> gekennzeichnet, wie es Art. 50 Abs. 4 EU AI Act für synthetische Bild-, Ton- oder Videoinhalte vorschreibt, die wie eine echte Aufnahme wirken könnten.
                  </p>
                </div>

                <h3 className="text-lg font-medium mb-2">Warum setzt Renodex KI-generierte Bilder ein?</h3>
                <p className="text-muted-foreground mb-3">
                  KI-generierte Bilder werden ergänzend eingesetzt, um Leistungen und Arbeitsabläufe zu illustrieren, für die noch kein passendes eigenes Fotomaterial vorliegt. Sie zeigen keine realen, konkreten Bauvorhaben oder Kunden von Renodex.
                </p>

                <h3 className="text-lg font-medium mb-2">Erkennbarkeit</h3>
                <p className="text-muted-foreground text-sm">
                  Jedes KI-generierte Bild trägt eine sichtbare Kennzeichnung direkt am Bild. Bilder ohne diese Kennzeichnung sind reale Aufnahmen.
                </p>
              </section>

              <p className="text-sm text-muted-foreground mt-8">
                <strong>Stand:</strong> 19.08.2026
              </p>

            </div>
          </div>
        </section>
      </main>

      <Footer phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
