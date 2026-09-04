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

const PHONE_NUMBER = "[Telefon folgt]";

export default function Datenschutz() {
  useSEO({
    title: "Datenschutz | Renodex München DSGVO",
    description: "Datenschutzerklärung DSGVO: Datenverarbeitung, Kontaktformular, Cookies & Ihre Rechte. Renodex München, Daten auf deutschen Servern.",
    canonical: "https://renodex.de/datenschutz"
  });

  return (
    <div className="min-h-screen bg-background">
      <Header phoneNumber={PHONE_NUMBER} />
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb items={SERVICE_BREADCRUMBS["/datenschutz"]} />
      </div>
      
      <main>
        <section
          className="py-10 md:py-12 relative bg-zinc-900 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.75), rgba(24,24,27,0.85)), url(/images/optimized/seite-datenschutz.webp)` }}
          role="img"
          aria-labelledby="hero-h1-datenschutz"
        >
          <KiBildHinweis />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h1 id="hero-h1-datenschutz" className="text-3xl md:text-4xl font-bold mb-3 text-white" data-testid="heading-datenschutz">
              Datenschutzerklärung – Renodex München
            </h1>
            <p className="text-zinc-300 max-w-2xl">
              Informationen zum Schutz Ihrer personenbezogenen Daten | Renodex München | Stand: 18.08.2026 | DSGVO (EU) 2016/679 | BDSG 2025
            </p>
          </div>
        </section>

        <BackButton />

        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="space-y-8 text-foreground">

              <nav className="p-4 bg-muted rounded-md">
                <h2 className="text-lg font-semibold mb-3">Inhaltsübersicht</h2>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><a href="#m716" className="hover:text-foreground">Präambel</a></li>
                  <li><a href="#m3" className="hover:text-foreground">Verantwortlicher</a></li>
                  <li><a href="#mOverview" className="hover:text-foreground">Übersicht der Verarbeitungen</a></li>
                  <li><a href="#m2427" className="hover:text-foreground">Maßgebliche Rechtsgrundlagen</a></li>
                  <li><a href="#m27" className="hover:text-foreground">Sicherheitsmaßnahmen</a></li>
                  <li><a href="#m25" className="hover:text-foreground">Übermittlung von personenbezogenen Daten</a></li>
                  <li><a href="#m24" className="hover:text-foreground">Internationale Datentransfers</a></li>
                  <li><a href="#m12" className="hover:text-foreground">Allgemeine Informationen zur Datenspeicherung und Löschung</a></li>
                  <li><a href="#m10" className="hover:text-foreground">Rechte der betroffenen Personen</a></li>
                  <li><a href="#m225" className="hover:text-foreground">Bereitstellung des Onlineangebots und Webhosting</a></li>
                  <li><a href="#m134" className="hover:text-foreground">Einsatz von Cookies</a></li>
                  <li><a href="#mKI" className="hover:text-foreground">KI-Chatbot – EU AI Act Konformität</a></li>
                  <li><a href="#m182" className="hover:text-foreground">Kontakt- und Anfrageverwaltung</a></li>
                </ul>
              </nav>

              <section id="m716">
                <h2 className="text-xl font-semibold mb-3">Präambel</h2>
                <p className="text-muted-foreground mb-3">
                  Mit der folgenden Datenschutzerklärung möchten wir Sie darüber aufklären, welche Arten Ihrer personenbezogenen Daten (nachfolgend auch kurz als "Daten" bezeichnet) wir zu welchen Zwecken und in welchem Umfang verarbeiten. Die Datenschutzerklärung gilt für alle von uns durchgeführten Verarbeitungen personenbezogener Daten, sowohl im Rahmen der Erbringung unserer Leistungen als auch insbesondere auf unseren Webseiten, in mobilen Applikationen sowie innerhalb externer Onlinepräsenzen, wie z.B. unserer Social-Media-Profile (nachfolgend zusammenfassend bezeichnet als "Onlineangebot").
                </p>
                <p className="text-muted-foreground">
                  Die verwendeten Begriffe sind nicht geschlechtsspezifisch.
                </p>
              </section>

              <section id="m3">
                <h2 className="text-xl font-semibold mb-3">Verantwortlicher</h2>
                <p className="text-muted-foreground">
                  <a href="https://renodex.de" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium">Renodex</a><br />
                  Ali Kemal Kurt<br />
                  [Adresse folgt]<br />
                  <br />
                  Deutschland
                </p>
                <p className="text-muted-foreground mt-3">
                  Telefon: <a href="tel:00000000000" className="text-foreground">[Telefon folgt]</a><br />
                  E-Mail-Adresse: <a href="mailto:info@renodex.de" className="text-foreground">info@renodex.de</a>
                </p>
              </section>

              <section id="mOverview">
                <h2 className="text-xl font-semibold mb-3">Übersicht der Verarbeitungen</h2>
                <p className="text-muted-foreground mb-3">
                  Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen und verweist auf die betroffenen Personen.
                </p>
                
                <h3 className="text-lg font-medium mb-2">Arten der verarbeiteten Daten</h3>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                  <li>Bestandsdaten</li>
                  <li>Kontaktdaten</li>
                  <li>Inhaltsdaten</li>
                  <li>Nutzungsdaten</li>
                  <li>Meta-, Kommunikations- und Verfahrensdaten</li>
                  <li>Protokolldaten</li>
                </ul>

                <h3 className="text-lg font-medium mb-2">Kategorien betroffener Personen</h3>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                  <li>Kommunikationspartner</li>
                  <li>Nutzer</li>
                </ul>

                <h3 className="text-lg font-medium mb-2">Zwecke der Verarbeitung</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Kommunikation</li>
                  <li>Sicherheitsmaßnahmen</li>
                  <li>Organisations- und Verwaltungsverfahren</li>
                  <li>Feedback</li>
                  <li>Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit</li>
                  <li>Informationstechnische Infrastruktur</li>
                </ul>
              </section>

              <section id="m2427">
                <h2 className="text-xl font-semibold mb-3">Maßgebliche Rechtsgrundlagen (Stand 2025)</h2>
                
                <div className="p-3 bg-muted rounded-md mb-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Anwendbare Rechtsvorschriften:</strong> Datenschutz-Grundverordnung (EU) 2016/679 (DSGVO), Bundesdatenschutzgesetz (BDSG) in der Fassung 2025, EU AI Act (VO 2024/1689), Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (TDDDG).
                  </p>
                </div>

                <h3 className="text-lg font-medium mb-2">Rechtsgrundlagen nach Art. 6 DSGVO</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li><strong>Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO)</strong> – Die betroffene Person hat ihre Einwilligung in die Verarbeitung der sie betreffenden personenbezogenen Daten für einen spezifischen Zweck oder mehrere bestimmte Zwecke gegeben.</li>
                  <li><strong>Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO)</strong> – Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, die auf Anfrage der betroffenen Person erfolgen.</li>
                  <li><strong>Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO)</strong> – Die Verarbeitung ist zur Wahrung der berechtigten Interessen des Verantwortlichen oder eines Dritten notwendig, vorausgesetzt, dass die Interessen, Grundrechte und Grundfreiheiten der betroffenen Person, die den Schutz personenbezogener Daten verlangen, nicht überwiegen.</li>
                </ul>

                <h3 className="text-lg font-medium mb-2">Ergänzende nationale Regelungen (BDSG 2025)</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Beschäftigtendatenschutz (§ 26 BDSG)</strong> – Verarbeitung personenbezogener Daten von Beschäftigten für Zwecke des Beschäftigungsverhältnisses.</li>
                  <li><strong>Datenübermittlung an Drittländer (§§ 78-81 BDSG)</strong> – Ergänzende Regelungen zur Übermittlung personenbezogener Daten in Drittstaaten.</li>
                  <li><strong>Videoüberwachung (§ 4 BDSG)</strong> – Spezifische Anforderungen für die Videoüberwachung öffentlich zugänglicher Räume.</li>
                </ul>
              </section>

              <section id="m27">
                <h2 className="text-xl font-semibold mb-3">Sicherheitsmaßnahmen</h2>
                <p className="text-muted-foreground mb-3">
                  Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und des Ausmaßes der Bedrohung der Rechte und Freiheiten natürlicher Personen geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.
                </p>
                <p className="text-muted-foreground mb-3">
                  Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und Verfügbarkeit von Daten durch Kontrolle des physischen und elektronischen Zugangs zu den Daten als auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der Sicherung der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet, die eine Wahrnehmung von Betroffenenrechten, die Löschung von Daten und Reaktionen auf die Gefährdung der Daten gewährleisten.
                </p>
                <p className="text-muted-foreground">
                  <strong>Sicherung von Online-Verbindungen durch TLS-/SSL-Verschlüsselungstechnologie (HTTPS):</strong> Um die Daten der Nutzer, die über unsere Online-Dienste übertragen werden, vor unerlaubten Zugriffen zu schützen, setzen wir auf die TLS-/SSL-Verschlüsselungstechnologie. Secure Sockets Layer (SSL) und Transport Layer Security (TLS) sind die Eckpfeiler der sicheren Datenübertragung im Internet. Diese Technologien verschlüsseln die Informationen, die zwischen der Website oder App und dem Browser des Nutzers (oder zwischen zwei Servern) übertragen werden, sodass die Daten vor unbefugtem Zugriff geschützt sind.
                </p>
              </section>

              <section id="m25">
                <h2 className="text-xl font-semibold mb-3">Übermittlung von personenbezogenen Daten</h2>
                <p className="text-muted-foreground">
                  Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es vor, dass diese an andere Stellen, Unternehmen, rechtlich selbstständige Organisationseinheiten oder Personen übermittelt beziehungsweise ihnen gegenüber offengelegt werden. Zu den Empfängern dieser Daten können z.B. mit IT-Aufgaben beauftragte Dienstleister gehören oder Anbieter von Diensten und Inhalten, die in eine Website eingebunden sind. In solchen Fällen beachten wir die gesetzlichen Vorgaben und schließen insbesondere entsprechende Verträge bzw. Vereinbarungen, die dem Schutz Ihrer Daten dienen, mit den Empfängern Ihrer Daten ab.
                </p>
              </section>

              <section id="m24">
                <h2 className="text-xl font-semibold mb-3">Internationale Datentransfers</h2>
                <p className="text-muted-foreground mb-3">
                  <strong>Datenverarbeitung in Drittländern:</strong> Sofern wir Daten in ein Drittland (d. h. außerhalb der Europäischen Union (EU) oder des Europäischen Wirtschaftsraums (EWR)) übermitteln oder dies im Rahmen der Nutzung von Diensten Dritter oder der Offenlegung bzw. Übermittlung von Daten an andere Personen, Stellen oder Unternehmen geschieht, erfolgt dies nur im Einklang mit den gesetzlichen Vorgaben.
                </p>
                <p className="text-muted-foreground mb-3">
                  Für Datenübermittlungen in die USA stützen wir uns vorrangig auf das Data Privacy Framework (DPF), welches durch einen Angemessenheitsbeschluss der EU-Kommission vom 10.07.2023 als sicherer Rechtsrahmen anerkannt wurde. Zusätzlich haben wir mit den jeweiligen Anbietern Standardvertragsklauseln abgeschlossen, die den Vorgaben der EU-Kommission entsprechen und vertragliche Verpflichtungen zum Schutz Ihrer Daten festlegen.
                </p>
                <p className="text-muted-foreground mb-3">
                  Diese zweifache Absicherung gewährleistet einen umfassenden Schutz Ihrer Daten: Das DPF bildet die primäre Schutzebene, während die Standardvertragsklauseln als zusätzliche Sicherheit dienen. Sollten sich Änderungen im Rahmen des DPF ergeben, greifen die Standardvertragsklauseln als zuverlässige Rückfalloption ein. So stellen wir sicher, dass Ihre Daten auch bei etwaigen politischen oder rechtlichen Veränderungen stets angemessen geschützt bleiben.
                </p>
                <p className="text-muted-foreground mb-3">
                  Bei den einzelnen Diensteanbietern informieren wir Sie darüber, ob sie nach dem DPF zertifiziert sind und ob Standardvertragsklauseln vorliegen. Weitere Informationen zum DPF und eine Liste der zertifizierten Unternehmen finden Sie auf der Website des US-Handelsministeriums unter <a href="https://www.dataprivacyframework.gov/" target="_blank" rel="noopener noreferrer" className="text-foreground">https://www.dataprivacyframework.gov/</a> (in englischer Sprache).
                </p>
                <p className="text-muted-foreground">
                  Für Datenübermittlungen in andere Drittländer gelten entsprechende Sicherheitsmaßnahmen, insbesondere Standardvertragsklauseln, ausdrückliche Einwilligungen oder gesetzlich erforderliche Übermittlungen. Informationen zu Drittlandtransfers und geltenden Angemessenheitsbeschlüssen können Sie dem Informationsangebot der EU-Kommission entnehmen: <a href="https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_de" target="_blank" rel="noopener noreferrer" className="text-foreground">https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_de</a>
                </p>
              </section>

              <section id="m12">
                <h2 className="text-xl font-semibold mb-3">Allgemeine Informationen zur Datenspeicherung und Löschung</h2>
                <p className="text-muted-foreground mb-3">
                  Wir löschen personenbezogene Daten, die wir verarbeiten, gemäß den gesetzlichen Bestimmungen, sobald die zugrundeliegenden Einwilligungen widerrufen werden oder keine weiteren rechtlichen Grundlagen für die Verarbeitung bestehen. Dies betrifft Fälle, in denen der ursprüngliche Verarbeitungszweck entfällt oder die Daten nicht mehr benötigt werden. Ausnahmen von dieser Regelung bestehen, wenn gesetzliche Pflichten oder besondere Interessen eine längere Aufbewahrung oder Archivierung der Daten erfordern.
                </p>
                <p className="text-muted-foreground mb-3">
                  Insbesondere müssen Daten, die aus handels- oder steuerrechtlichen Gründen aufbewahrt werden müssen oder deren Speicherung notwendig ist zur Rechtsverfolgung oder zum Schutz der Rechte anderer natürlicher oder juristischer Personen, entsprechend archiviert werden.
                </p>
                <p className="text-muted-foreground mb-3">
                  Unsere Datenschutzhinweise enthalten zusätzliche Informationen zur Aufbewahrung und Löschung von Daten, die speziell für bestimmte Verarbeitungsprozesse gelten.
                </p>
                <p className="text-muted-foreground mb-3">
                  Bei mehreren Angaben zur Aufbewahrungsdauer oder Löschungsfristen eines Datums, ist stets die längste Frist maßgeblich. Daten, die nicht mehr für den ursprünglich vorgesehenen Zweck, sondern aufgrund gesetzlicher Vorgaben oder anderer Gründe aufbewahrt werden, verarbeiten wir ausschließlich zu den Gründen, die ihre Aufbewahrung rechtfertigen.
                </p>
                <p className="text-muted-foreground mb-3">
                  <strong>Aufbewahrung und Löschung von Daten:</strong> Die folgenden allgemeinen Fristen gelten für die Aufbewahrung und Archivierung nach deutschem Recht:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1">
                  <li><strong>10 Jahre</strong> - Aufbewahrungsfrist für Bücher und Aufzeichnungen, Jahresabschlüsse, Inventare, Lageberichte, Eröffnungsbilanz sowie die zu ihrem Verständnis erforderlichen Arbeitsanweisungen und sonstigen Organisationsunterlagen (§ 147 Abs. 1 Nr. 1 i.V.m. Abs. 3 AO, § 14b Abs. 1 UStG, § 257 Abs. 1 Nr. 1 i.V.m. Abs. 4 HGB).</li>
                  <li><strong>6 Jahre</strong> - Übrige Geschäftsunterlagen: empfangene Handels- oder Geschäftsbriefe, Wiedergaben der abgesandten Handels- oder Geschäftsbriefe, sonstige Unterlagen, soweit sie für die Besteuerung von Bedeutung sind, z.B. Stundenlohnzettel, Betriebsabrechnungsbögen, Kalkulationsunterlagen, Preisauszeichnungen (§ 147 Abs. 1 Nr. 2, 3, 5 i.V.m. Abs. 3 AO, § 257 Abs. 1 Nr. 2, 3 i.V.m. Abs. 4 HGB).</li>
                  <li><strong>3 Jahre</strong> - Daten, die erforderlich sind, um potenzielle Gewährleistungs- und Schadensersatzansprüche oder ähnliche vertragliche Ansprüche und Rechte zu berücksichtigen sowie damit verbundene Anfragen zu bearbeiten, basierend auf früheren Geschäftserfahrungen und üblichen Branchenpraktiken, werden für die Dauer der regulären gesetzlichen Verjährungsfrist von drei Jahren gespeichert (§§ 195, 199 BGB).</li>
                </ul>
                <p className="text-muted-foreground">
                  <strong>Fristbeginn mit Ablauf des Jahres:</strong> Beginnt eine Frist nicht ausdrücklich zu einem bestimmten Datum und beträgt sie mindestens ein Jahr, so startet sie automatisch am Ende des Kalenderjahres, in dem das fristauslösende Ereignis eingetreten ist. Im Fall laufender Vertragsverhältnisse, in deren Rahmen Daten gespeichert werden, ist das fristauslösende Ereignis der Zeitpunkt des Wirksamwerdens der Kündigung oder sonstige Beendigung des Rechtsverhältnisses.
                </p>
              </section>

              <section id="m10">
                <h2 className="text-xl font-semibold mb-3">Rechte der betroffenen Personen</h2>
                <p className="text-muted-foreground mb-3">
                  <strong>Rechte der betroffenen Personen aus der DSGVO:</strong> Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu, die sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Widerspruchsrecht:</strong> Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Werden die Sie betreffenden personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht.</li>
                  <li><strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das Recht, erteilte Einwilligungen jederzeit zu widerrufen.</li>
                  <li><strong>Auskunftsrecht:</strong> Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft über diese Daten sowie auf weitere Informationen und Kopie der Daten entsprechend den gesetzlichen Vorgaben.</li>
                  <li><strong>Recht auf Berichtigung:</strong> Sie haben entsprechend den gesetzlichen Vorgaben das Recht, die Vervollständigung der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.</li>
                  <li><strong>Recht auf Löschung und Einschränkung der Verarbeitung:</strong> Sie haben nach Maßgabe der gesetzlichen Vorgaben das Recht, zu verlangen, dass Sie betreffende Daten unverzüglich gelöscht werden, bzw. alternativ nach Maßgabe der gesetzlichen Vorgaben eine Einschränkung der Verarbeitung der Daten zu verlangen.</li>
                  <li><strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Sie betreffende Daten, die Sie uns bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder deren Übermittlung an einen anderen Verantwortlichen zu fordern.</li>
                  <li><strong>Beschwerde bei Aufsichtsbehörde:</strong> Sie haben unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die Vorgaben der DSGVO verstößt.</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  <strong>Zuständige Aufsichtsbehörde:</strong><br />
                  Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)<br />
                  Promenade 27<br />
                  91522 Ansbach<br />
                  <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer" className="text-foreground">www.lda.bayern.de</a>
                </p>
              </section>

              <section id="m225">
                <h2 className="text-xl font-semibold mb-3">Bereitstellung des Onlineangebots und Webhosting</h2>
                <p className="text-muted-foreground mb-3">
                  Wir verarbeiten die Daten der Nutzer, um ihnen unsere Online-Dienste zur Verfügung stellen zu können. Zu diesem Zweck verarbeiten wir die IP-Adresse des Nutzers, die notwendig ist, um die Inhalte und Funktionen unserer Online-Dienste an den Browser oder das Endgerät der Nutzer zu übermitteln.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-3">
                  <li><strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z. B. Seitenaufrufe und Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und Betriebssysteme, Interaktionen mit Inhalten und Funktionen); Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern, beteiligte Personen). Protokolldaten (z.B. Logfiles betreffend Logins oder den Abruf von Daten oder Zugriffszeiten).</li>
                  <li><strong>Betroffene Personen:</strong> Nutzer (z.B. Webseitenbesucher, Nutzer von Onlinediensten).</li>
                  <li><strong>Zwecke der Verarbeitung:</strong> Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit; Informationstechnische Infrastruktur (Betrieb und Bereitstellung von Informationssystemen und technischen Geräten (Computer, Server etc.)); Sicherheitsmaßnahmen.</li>
                  <li><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).</li>
                </ul>
                <p className="text-muted-foreground">
                  <strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong><br />
                  <strong>Erhebung von Zugriffsdaten und Logfiles:</strong> Der Zugriff auf unser Onlineangebot wird in Form von sogenannten "Server-Logfiles" protokolliert. Zu den Serverlogfiles können die Adresse und der Name der abgerufenen Webseiten und Dateien, Datum und Uhrzeit des Abrufs, übertragene Datenmengen, Meldung über erfolgreichen Abruf, Browsertyp nebst Version, das Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte Seite) und im Regelfall IP-Adressen und der anfragende Provider gehören. Die Serverlogfiles können zum einen zu Sicherheitszwecken eingesetzt werden, z.B. um eine Überlastung der Server zu vermeiden (insbesondere im Fall von missbräuchlichen Angriffen, sogenannten DDoS-Attacken), und zum anderen, um die Auslastung der Server und ihre Stabilität sicherzustellen. <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO). <strong>Löschung von Daten:</strong> Logfile-Informationen werden für die Dauer von maximal 30 Tagen gespeichert und danach gelöscht oder anonymisiert.
                </p>
              </section>

              <section id="m134">
                <h2 className="text-xl font-semibold mb-3">Einsatz von Cookies</h2>
                <p className="text-muted-foreground mb-3">
                  Unter dem Begriff „Cookies" werden Funktionen, die Informationen auf Endgeräten der Nutzer speichern und aus ihnen auslesen, verstanden. Cookies können ferner in Bezug auf unterschiedliche Anliegen Einsatz finden, etwa zu Zwecken der Funktionsfähigkeit, der Sicherheit und des Komforts von Onlineangeboten sowie der Erstellung von Analysen der Besucherströme. Wir verwenden Cookies gemäß den gesetzlichen Vorschriften. Dazu holen wir, wenn erforderlich, vorab die Zustimmung der Nutzer ein.
                </p>
                <p className="text-muted-foreground mb-3">
                  <strong>Hinweise zu datenschutzrechtlichen Rechtsgrundlagen:</strong> Ob wir personenbezogene Daten mithilfe von Cookies verarbeiten, hängt von einer Einwilligung ab. Liegt eine Einwilligung vor, dient sie als Rechtsgrundlage. Ohne Einwilligung stützen wir uns auf unsere berechtigten Interessen, die vorstehend in diesem Abschnitt und im Kontext der jeweiligen Dienste und Verfahren erläutert sind.
                </p>
                <p className="text-muted-foreground mb-3">
                  <strong>Speicherdauer:</strong> Im Hinblick auf die Speicherdauer werden die folgenden Arten von Cookies unterschieden:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1">
                  <li><strong>Temporäre Cookies (auch: Session- oder Sitzungscookies):</strong> Temporäre Cookies werden spätestens gelöscht, nachdem ein Nutzer ein Onlineangebot verlassen und sein Endgerät (z.B. Browser oder mobile Applikation) geschlossen hat.</li>
                  <li><strong>Permanente Cookies:</strong> Permanente Cookies bleiben auch nach dem Schließen des Endgerätes gespeichert. So können beispielsweise der Anmeldestatus gespeichert und bevorzugte Inhalte direkt angezeigt werden, wenn der Nutzer eine Website erneut besucht.</li>
                </ul>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>Verarbeitete Datenarten:</strong> Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern, beteiligte Personen).</li>
                  <li><strong>Betroffene Personen:</strong> Nutzer (z.B. Webseitenbesucher, Nutzer von Onlinediensten).</li>
                  <li><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO). Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO).</li>
                </ul>
              </section>

              <section id="mGoogle">
                <h2 className="text-xl font-semibold mb-3">Google Analytics und Google Ads</h2>
                <p className="text-muted-foreground mb-3">
                  Wir nutzen auf unserer Website Google Analytics und Google Ads, Dienste der Google
                  Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland ("Google"). Google
                  Analytics erstellt pseudonymisierte Nutzungsstatistiken, Google Ads misst die
                  Wirksamkeit unserer Werbeanzeigen (Conversion-Tracking).
                </p>
                <p className="text-muted-foreground mb-3">
                  Beide Dienste werden erst aktiv, wenn Sie über unseren Cookie-Banner ausdrücklich
                  eingewilligt haben (Consent Mode v2, Standardeinstellung "denied"). Rechtsgrundlage
                  ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Ihre Einwilligung können Sie jederzeit
                  über die Cookie-Einstellungen widerrufen.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>Drittlandübermittlung:</strong> Es kann zu einer Datenübermittlung in die USA kommen. Google ist nach dem EU-US Data Privacy Framework zertifiziert; ergänzend gelten EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).</li>
                  <li><strong>Weitere Informationen:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Datenschutzerklärung von Google</a></li>
                </ul>
              </section>

              <section id="mKI">
                <h2 className="text-xl font-semibold mb-3">KI-Chatbot (Anthropic Claude) – EU AI Act Konformität</h2>
                
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

                <h3 className="text-lg font-medium mb-2">Technische Angaben</h3>
                <p className="text-muted-foreground mb-3">
                  <strong>KI-Anbieter:</strong> Anthropic PBC, 548 Market Street, PMB 90375, San Francisco, CA 94104, USA<br />
                  <strong>Modell:</strong> Anthropic Claude (General Purpose AI Model)<br />
                  <strong>Auftragsverarbeitung:</strong> Anthropic wird als Auftragsverarbeiter für uns tätig; für die Übermittlung in die USA gelten die EU-Standardvertragsklauseln (SCC) gemäß Beschluss (EU) 2021/914. Ihre Eingaben werden nicht zum Training von KI-Modellen mit personenbezogenen Daten verwendet.
                </p>

                <h3 className="text-lg font-medium mb-2">Datenverarbeitung</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-3">
                  <li><strong>Verarbeitete Datenarten:</strong> Inhaltsdaten (Ihre Chatnachrichten und Anfragen); Meta-, Kommunikations- und Verfahrensdaten (IP-Adresse, Zeitstempel).</li>
                  <li><strong>Betroffene Personen:</strong> Nutzer des Chatbots.</li>
                  <li><strong>Zwecke der Verarbeitung:</strong> Beantwortung von Anfragen zu unseren Dienstleistungen; Terminvereinbarung; Erstberatung; Weiterleitung von Rückrufwünschen.</li>
                  <li><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO) – effiziente Kundenbetreuung; Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO).</li>
                  <li><strong>Speicherdauer:</strong> Chatnachrichten werden nur für die Dauer der Sitzung verarbeitet und nicht dauerhaft gespeichert. Bei Terminanfragen werden die relevanten Daten zur Bearbeitung an unser Team weitergeleitet.</li>
                  <li><strong>Drittlandübermittlung:</strong> Ihre Eingaben werden an Anthropic in den USA übermittelt. Schutzmaßnahmen: EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c) DSGVO).</li>
                </ul>

                <h3 className="text-lg font-medium mb-2">Ihre Rechte</h3>
                <p className="text-muted-foreground mb-3">
                  Ihnen stehen die in Abschnitt "Rechte der betroffenen Personen" genannten Rechte zu. Zusätzlich haben Sie gemäß EU AI Act das Recht auf eine verständliche Erklärung der Funktionsweise des KI-Systems.
                </p>

                <p className="text-muted-foreground mb-3">
                  <strong>Wichtiger Hinweis:</strong> Bitte geben Sie im Chat keine sensiblen personenbezogenen Daten ein (z.B. Gesundheitsdaten, religiöse Überzeugungen gem. Art. 9 DSGVO). Für vertrauliche Anfragen nutzen Sie bitte unser Kontaktformular oder rufen Sie uns direkt an.
                </p>

                <p className="text-muted-foreground text-sm">
                  Weitere Informationen: <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-foreground">Anthropic Datenschutzrichtlinie</a> | <a href="https://artificialintelligenceact.eu/article/50/" target="_blank" rel="noopener noreferrer" className="text-foreground">Art. 50 EU AI Act (Volltext)</a>
                </p>
              </section>

              <section id="m182">
                <h2 className="text-xl font-semibold mb-3">Kontakt- und Anfrageverwaltung</h2>
                <p className="text-muted-foreground mb-3">
                  Bei der Kontaktaufnahme mit uns (z.B. per Post, Kontaktformular, E-Mail, Telefon oder via soziale Medien) sowie im Rahmen bestehender Nutzer- und Geschäftsbeziehungen werden die Angaben der anfragenden Personen verarbeitet, soweit dies zur Beantwortung der Kontaktanfragen und etwaiger angefragter Maßnahmen erforderlich ist.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>Verarbeitete Datenarten:</strong> Bestandsdaten (z.B. der vollständige Name, Wohnadresse, Kontaktinformationen, Kundennummer, etc.); Kontaktdaten (z.B. Post- und E-Mail-Adressen oder Telefonnummern); Inhaltsdaten (z.B. textliche oder bildliche Nachrichten und Beiträge sowie die sie betreffenden Informationen, wie z.B. Angaben zur Autorenschaft oder Zeitpunkt der Erstellung); Nutzungsdaten (z.B. Seitenaufrufe und Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und Betriebssysteme, Interaktionen mit Inhalten und Funktionen). Meta-, Kommunikations- und Verfahrensdaten (z.B. IP-Adressen, Zeitangaben, Identifikationsnummern, beteiligte Personen).</li>
                  <li><strong>Betroffene Personen:</strong> Kommunikationspartner.</li>
                  <li><strong>Zwecke der Verarbeitung:</strong> Kommunikation; Organisations- und Verwaltungsverfahren; Feedback (z.B. Sammeln von Feedback via Online-Formular). Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.</li>
                  <li><strong>Aufbewahrung und Löschung:</strong> Löschung entsprechend den Angaben im Abschnitt "Allgemeine Informationen zur Datenspeicherung und Löschung". Bei Nutzung unseres Kontaktformulars erfassen wir zusätzlich die IP-Adresse des Absenders und verknüpfen sie mit der jeweiligen Anfrage, um Missbrauch und automatisierte Spam-Übermittlungen erkennen und abwehren zu können. Diese IP-Adresse wird nach 30 Tagen automatisch gelöscht.</li>
                  <li><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO) – Missbrauchs- und Spam-Abwehr bei Formularanfragen. Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO).</li>
                </ul>
              </section>

              <section className="pt-4 border-t">
                <p className="text-muted-foreground text-sm">
                  <strong>Fragen zum Datenschutz?</strong><br />
                  Kontaktieren Sie uns unter <a href="mailto:info@renodex.de" className="text-foreground">info@renodex.de</a> oder telefonisch unter <a href="tel:00000000000" className="text-foreground">[Telefon folgt]</a>.
                </p>
              </section>

            </div>
          </div>
        </section>

        <section className="bg-muted/20 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-6 text-center">Weitere Informationen</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <Link href="/leistungen" data-testid="link-datenschutz-leistungen">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Wrench className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Alle Leistungen</h3>
                      <p className="text-xs text-muted-foreground mt-1">Komplettsanierung im Überblick</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/kontakt" data-testid="link-datenschutz-kontakt">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
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

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
