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

export default function AGB() {
  useSEO({
    title: "AGB | Renodex München",
    description: "AGB von Renodex München: Festpreis nach Besichtigung, Vertrag mit Renodex als Generalunternehmer oder direkt mit der ausführenden Fachfirma.",
    canonical: "https://renodex.de/agb"
  });

  return (
    <div className="min-h-screen bg-background">
      <Header phoneNumber={PHONE_NUMBER} />
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb items={SERVICE_BREADCRUMBS["/agb"]} />
      </div>
      
      <main>
        <section
          className="py-10 md:py-12 relative bg-zinc-900 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.75), rgba(24,24,27,0.85)), url(/images/optimized/werkzeuglager-handwerksbetrieb.webp)` }}
        >
          <KiBildHinweis />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h1 id="hero-h1-agb" className="text-3xl md:text-4xl font-bold mb-3 text-white" data-testid="heading-agb">
              AGB – Renodex München
            </h1>
            <p className="text-zinc-300 max-w-2xl">
              Allgemeine Geschäftsbedingungen für Sanierung, Renovierung und Umbau von Haus und Wohnung in München – mit Renodex als Generalunternehmer oder mit Vertrag direkt bei der Fachfirma | <a href="https://renodex.de" target="_blank" rel="noopener noreferrer" className="text-white">Renodex</a> | Stand: 13.09.2026
            </p>
          </div>
        </section>

        <BackButton />

        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="space-y-8 text-foreground">

              <nav className="p-4 bg-muted rounded-md">
                <h2 className="text-lg font-semibold mb-3">Inhaltsübersicht</h2>
                <ul className="space-y-1 text-sm text-muted-foreground columns-1 md:columns-2">
                  <li><a href="#s1" className="hover:text-foreground">§ 1 Geltungsbereich</a></li>
                  <li><a href="#s2" className="hover:text-foreground">§ 2 Vertragspartner (B2B/B2C)</a></li>
                  <li><a href="#s3" className="hover:text-foreground">§ 3 Angebote und Vertragsschluss</a></li>
                  <li><a href="#s4" className="hover:text-foreground">§ 4 Änderungen und Nachträge</a></li>
                  <li><a href="#s5" className="hover:text-foreground">§ 5 Preise und Zahlungsbedingungen</a></li>
                  <li><a href="#s6" className="hover:text-foreground">§ 6 Sicherheiten</a></li>
                  <li><a href="#s7" className="hover:text-foreground">§ 7 Koordination und Bauleitung</a></li>
                  <li><a href="#s8" className="hover:text-foreground">§ 8 Mitwirkungspflichten</a></li>
                  <li><a href="#s9" className="hover:text-foreground">§ 9 Abnahme (§§ 640, 650g BGB)</a></li>
                  <li><a href="#s10" className="hover:text-foreground">§ 10 Gewährleistung</a></li>
                  <li><a href="#s11" className="hover:text-foreground">§ 11 Haftung</a></li>
                  <li><a href="#s12" className="hover:text-foreground">§ 12 Materiallieferung</a></li>
                  <li><a href="#s13" className="hover:text-foreground">§ 13 Kündigung</a></li>
                  <li><a href="#s14" className="hover:text-foreground">§ 14 Sturmschäden & Versicherung</a></li>
                  <li><a href="#s15" className="hover:text-foreground">§ 15 Widerrufsrecht (B2C)</a></li>
                  <li><a href="#s16" className="hover:text-foreground">§ 16 Besondere Bestimmungen B2B</a></li>
                  <li><a href="#s17" className="hover:text-foreground">§ 17 Digitale Kommunikation</a></li>
                  <li><a href="#s18" className="hover:text-foreground">§ 18 Datenschutz</a></li>
                  <li><a href="#s19" className="hover:text-foreground">§ 19 Streitbeilegung</a></li>
                  <li><a href="#s20" className="hover:text-foreground">§ 20 Schlussbestimmungen</a></li>
                </ul>
              </nav>

              <section id="s1">
                <h2 className="text-xl font-semibold mb-3">§ 1 Geltungsbereich und Vertragsgegenstand</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Diese AGB gelten für alle Verträge zwischen <strong>Renodex</strong>, einem Firmenauftritt von K. Bilic (Einzelunternehmen, Inhaber: Krešimir Bilic), Helmut-Schmidt-Allee 54, 81248 München (nachfolgend „Renodex“), und dem Auftraggeber über Sanierungs-, Renovierungs- und Umbauvorhaben an Haus und Wohnung sowie deren Koordination.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Ablauf.</strong> Der Auftraggeber übermittelt sein Vorhaben mit Angaben und Fotos. Renodex besichtigt das Objekt und erstellt danach ein Festpreisangebot. Die Besichtigung ist kostenlos und verpflichtet nicht zur Beauftragung.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Zwei Vertragswege.</strong> Für jedes Vorhaben stehen zwei Vertragswege zur Wahl:
                </p>
                <p className="text-muted-foreground mb-3 ml-4">
                  a) <strong>Vertragsweg A – Renodex als Generalunternehmer.</strong> Renodex wird Vertragspartner für die im Angebot beschriebene Bauleistung zum Festpreis. Renodex lässt die Arbeiten ganz oder teilweise durch Partner-Fachfirmen als Nachunternehmer ausführen. Renodex bleibt gegenüber dem Auftraggeber für die gesamte Leistung verantwortlich, auch für Mängel aus der Arbeit der Nachunternehmer. Es gelten §§ 631 ff., 650a ff. BGB. Gegenüber Verbrauchern gelten zusätzlich die §§ 650i ff. BGB, wenn deren Voraussetzungen vorliegen.
                </p>
                <p className="text-muted-foreground mb-3 ml-4">
                  b) <strong>Vertragsweg B – Vertrag direkt mit der Fachfirma.</strong> Der Vertrag über die Bauleistung kommt unmittelbar zwischen dem Auftraggeber und der im Angebot namentlich bezeichneten Fachfirma zustande. Renodex gibt das Festpreisangebot in diesem Fall im Namen und in Vollmacht dieser Fachfirma ab (§ 164 BGB). Die Fachfirma ist an den Festpreis gebunden und schuldet die Bauleistung einschließlich der Mängelrechte. Renodex wird nicht Vertragspartner der Bauleistung. Renodex koordiniert das Vorhaben aufgrund eines gesonderten Koordinationsvertrags und haftet für die Pflichten daraus.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) <strong>Festlegung des Vertragswegs.</strong> Jedes Festpreisangebot nennt den Vertragsweg und den Vertragspartner der Bauleistung mit Firma, Anschrift und Eintragung in der Handwerksrolle. Werden beide Wege angeboten, enthält das Angebot zwei getrennte Varianten mit jeweils eigenem Vertragspartner. Der Auftraggeber wählt bei der Annahme genau eine Variante. Eine Annahme ohne Wahl der Variante führt nicht zum Vertragsschluss. Renodex fordert den Auftraggeber dann zur Wahl auf.
                </p>
                <p className="text-muted-foreground mb-3">
                  (5) <strong>Koordinationsvertrag (Vertragsweg B).</strong> Renodex schuldet die im Angebot beschriebenen Koordinationsleistungen, insbesondere die Auswahl der Fachfirma, die Terminabstimmung und die Organisation des Bauablaufs. Übernimmt Renodex dort ausdrücklich die Bauüberwachung, schuldet Renodex deren mangelfreie Erbringung nach Werkvertragsrecht (§§ 631 ff. BGB). Renodex erhält für die Koordination im Vertragsweg B entweder ein Honorar vom Auftraggeber oder eine Provision von der ausführenden Fachfirma. Welche Vergütung gilt, legt das Angebot fest und nennt ihre Höhe. Ein Honorar des Auftraggebers weist das Angebot gesondert aus. Eine Provision der Fachfirma ist in deren Festpreis enthalten und erhöht ihn nicht. Weist das Angebot keine Vergütung aus, ist die Koordination für den Auftraggeber unentgeltlich.
                </p>
                <p className="text-muted-foreground mb-3">
                  (6) <strong>Geltung im Vertragsweg B.</strong> Für den Vertrag über die Bauleistung gelten diese AGB nur, wenn die Fachfirma sie in ihr Angebot einbezieht. Verwender ist dann die Fachfirma.
                </p>
                <p className="text-muted-foreground mb-3">
                  (7) Bei Verträgen mit <strong>Unternehmern</strong> (§ 14 BGB) können ergänzend besondere Bestimmungen vereinbart werden, sofern dies ausdrücklich im Vertrag festgehalten wird.
                </p>
                <p className="text-muted-foreground">
                  (8) Abweichende Geschäftsbedingungen des Auftraggebers werden nicht Vertragsbestandteil, es sei denn, Renodex stimmt ihrer Geltung ausdrücklich schriftlich zu.
                </p>
              </section>

              <section id="s2">
                <h2 className="text-xl font-semibold mb-3">§ 2 Vertragspartner und Begriffsbestimmungen (B2B/B2C)</h2>
                <p className="text-muted-foreground mb-3">
                  (1) <strong>Verbraucher (B2C)</strong> im Sinne dieser AGB ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können (§ 13 BGB).
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Unternehmer (B2B)</strong> im Sinne dieser AGB ist eine natürliche oder juristische Person oder eine rechtsfähige Personengesellschaft, die bei Abschluss eines Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handelt (§ 14 BGB). Dies umfasst insbesondere:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li>Gewerbetreibende und Handwerksunternehmen</li>
                  <li>Hausverwaltungen und Immobiliengesellschaften</li>
                  <li>Wohnungseigentümergemeinschaften (WEG)</li>
                  <li>Bauträger und Projektentwickler</li>
                  <li>Öffentliche Auftraggeber</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Unterschiedliche Regelungen:</strong> Soweit in diesen AGB unterschiedliche Regelungen für Verbraucher und Unternehmer gelten, ist dies jeweils ausdrücklich gekennzeichnet mit "(B2C)" für Verbraucher und "(B2B)" für Unternehmer.
                </p>
                <p className="text-muted-foreground">
                  (4) Im Zweifel gilt die für Verbraucher günstigere Regelung, sofern der Auftraggeber nicht nachweislich als Unternehmer handelt.
                </p>
              </section>

              <section id="s3">
                <h2 className="text-xl font-semibold mb-3">§ 3 Angebote und Vertragsschluss</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Preisangaben auf der Website und vor der Besichtigung sind unverbindliche Richtwerte. Ein Kostenanschlag ist ausdrücklich als solcher bezeichnet und begründet keine Preisbindung (§ 649 BGB).
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) Das nach der Besichtigung erstellte und als „Festpreisangebot“ bezeichnete Angebot ist verbindlich (§ 145 BGB). Der Anbieter ist daran bei Verbrauchern 14 Kalendertage, bei Unternehmern 10 Kalendertage ab Angebotsdatum gebunden. Anbieter ist im Vertragsweg A Renodex, im Vertragsweg B die bezeichnete Fachfirma.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) Der Vertrag kommt mit Zugang der Annahmeerklärung des Auftraggebers in Textform zustande.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) Der Festpreis umfasst alle Leistungen, die im Angebot und in der Leistungsbeschreibung genannt sind. Mengen- und Kalkulationsirrtümer innerhalb dieses Umfangs trägt der Anbieter. Nicht umfasst sind Leistungen, die das Angebot ausdrücklich ausnimmt oder als Annahme kennzeichnet, etwa den bei der Besichtigung nicht einsehbaren Zustand hinter Wand- und Bodenbelägen oder Schadstoffe.
                </p>
                <p className="text-muted-foreground mb-3">
                  (5) <strong>Verbraucherbauvertrag.</strong> Verpflichtet sich der Anbieter gegenüber einem Verbraucher zum Bau eines neuen Gebäudes oder zu erheblichen Umbaumaßnahmen an einem bestehenden Gebäude (§ 650i BGB), erhält der Verbraucher rechtzeitig vor seiner Vertragserklärung eine Baubeschreibung in Textform (§ 650j BGB, Art. 249 § 2 EGBGB). Die Baubeschreibung enthält verbindliche Angaben zum Fertigstellungszeitpunkt oder zur Bauzeit und wird Vertragsinhalt (§ 650k BGB). Im Vertragsweg B trifft diese Pflicht die Fachfirma.
                </p>
                <p className="text-muted-foreground mb-3">
                  (6) Kostenvoranschläge, Zeichnungen und andere technische Unterlagen bleiben Eigentum von Renodex und dürfen ohne Zustimmung von Renodex weder vervielfältigt noch Dritten zugänglich gemacht werden.
                </p>
                <p className="text-muted-foreground">
                  (7) Die dem Angebot zugrunde liegende Kalkulation wird auf Wunsch hinterlegt und dient als Grundlage für die Berechnung von Mehr- oder Minderaufwand bei Änderungen (siehe § 4 Abs. 3).
                </p>
              </section>

              <section id="s4">
                <h2 className="text-xl font-semibold mb-3">§ 4 Änderungen und Nachträge</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Der Auftraggeber kann eine Änderung des vereinbarten Werkerfolgs verlangen oder eine Änderung, die zur Erreichung des Werkerfolgs notwendig ist (§ 650b Abs. 1 BGB). Der Vertragspartner der Bauleistung legt ein Angebot über die Mehr- oder Mindervergütung vor. Bei einer Änderung des Werkerfolgs gilt das nur, soweit ihm die Ausführung zumutbar ist.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) Kommt binnen 30 Tagen nach Zugang des Änderungsbegehrens keine Einigung zustande, kann der Auftraggeber die Änderung in Textform anordnen (§ 650b Abs. 2 BGB).
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) Die Vergütung für vermehrten oder verminderten Aufwand bemisst sich nach den tatsächlich erforderlichen Kosten mit angemessenen Zuschlägen für allgemeine Geschäftskosten, Wagnis und Gewinn (§ 650c Abs. 1 BGB). Ist eine Urkalkulation vereinbarungsgemäß hinterlegt, gilt die Vermutung des § 650c Abs. 2 BGB. § 650c Abs. 3 BGB bleibt unberührt.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) Änderungen der Bauleistung vereinbart der Auftraggeber im Vertragsweg A mit Renodex, im Vertragsweg B mit der Fachfirma. Änderungen der Koordinationsleistung vereinbart er mit Renodex.
                </p>
                <p className="text-muted-foreground">
                  (5) Sämtliche Änderungsbegehren und Angebote sind schriftlich oder in Textform (E-Mail) festzuhalten.
                </p>
              </section>

              <section id="s5">
                <h2 className="text-xl font-semibold mb-3">§ 5 Preise und Zahlungsbedingungen</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Die Preise verstehen sich netto zuzüglich der gesetzlichen Mehrwertsteuer (derzeit 19%) in der am Tag der Rechnungsstellung gültigen Höhe. Gegenüber Verbrauchern weisen Angebote den Gesamtpreis einschließlich Umsatzsteuer aus.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Verbraucher.</strong> Der Vertragspartner der Bauleistung kann Abschlagszahlungen in Höhe des Werts der erbrachten und vertragsgemäßen Leistungen verlangen (§ 632a BGB). Beim Verbraucherbauvertrag dürfen die Abschlagszahlungen insgesamt 90 % der Gesamtvergütung einschließlich Nachträgen nicht übersteigen (§ 650m Abs. 1 BGB). Bei der ersten Abschlagszahlung erhält der Verbraucher eine Sicherheit von 5 % der Gesamtvergütung für die rechtzeitige Herstellung ohne wesentliche Mängel (§ 650m Abs. 2 BGB).
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Unternehmer (B2B):</strong> Abschlagszahlungen richten sich nach § 632a BGB, bei Vereinbarung der VOB/B nach § 16 VOB/B. Eine Vorauszahlung wird nur individuell vereinbart. Auf Verlangen des Auftraggebers sichert der Vertragspartner der Bauleistung sie durch Bürgschaft ab. Skonto gilt nur bei ausdrücklicher Vereinbarung.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) Im Vertragsweg B leistet der Auftraggeber alle Zahlungen für die Bauleistung ausschließlich an die Fachfirma. Renodex nimmt dafür keine Zahlungen entgegen.
                </p>
                <p className="text-muted-foreground mb-3">
                  (5) <strong>Prüfbare Schlussrechnung:</strong> Der Vertragspartner der Bauleistung stellt für die Bauleistung eine prüfbare Schlussrechnung. Ist im Vertragsweg B ein Honorar des Auftraggebers vereinbart, stellt Renodex dafür eine eigene Schlussrechnung. Die Schlusszahlung ist fällig:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li><strong>(B2C):</strong> innerhalb von 14 Tagen nach Zugang der Schlussrechnung</li>
                  <li><strong>(B2B):</strong> innerhalb von 14 Tagen nach Zugang der Schlussrechnung</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (6) <strong>Verzugszinsen:</strong> Bei Zahlungsverzug berechnet der jeweilige Vertragspartner Verzugszinsen:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li><strong>(B2C):</strong> 5 Prozentpunkte über dem Basiszinssatz (§ 288 Abs. 1 BGB)</li>
                  <li><strong>(B2B):</strong> 9 Prozentpunkte über dem Basiszinssatz (§ 288 Abs. 2 BGB)</li>
                </ul>
                <p className="text-muted-foreground">
                  (7) <strong>(B2B):</strong> Der jeweilige Vertragspartner ist berechtigt, bei Zahlungsverzug eine Pauschale von 40 EUR gemäß § 288 Abs. 5 BGB zu verlangen.
                </p>
              </section>

              <section id="s6">
                <h2 className="text-xl font-semibold mb-3">§ 6 Sicherheiten</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Im Vertragsweg A kann Renodex Sicherheit nach § 650f BGB verlangen. Beim Verbraucherbauvertrag gilt das nicht (§ 650f Abs. 6 Satz 1 Nr. 2 BGB). Eine dort vereinbarte Sicherheit für die Vergütung darf die nächste Abschlagszahlung oder 20 % der vereinbarten Vergütung nicht übersteigen (§ 650m Abs. 4 BGB).
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) Im Vertragsweg B sind Sicherheiten für die Vergütung der Bauleistung – soweit gesetzlich vorgesehen – ausschließlich zwischen dem Auftraggeber und der Fachfirma zu vereinbaren; Renodex ist hieran nicht beteiligt.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) Eine nach Absatz 1 verlangte Sicherheit kann durch Bürgschaft eines in Deutschland zugelassenen Kreditinstituts oder Kreditversicherers geleistet werden.
                </p>
                <p className="text-muted-foreground">
                  (4) Leistet der Auftraggeber eine nach Absatz 1 verlangte Sicherheit nicht innerhalb einer von Renodex gesetzten angemessenen Frist, kann Renodex die Leistung verweigern oder den Vertrag kündigen (§ 650f Abs. 5 BGB).
                </p>
              </section>

              <section id="s7">
                <h2 className="text-xl font-semibold mb-3">§ 7 Koordination und Bauleitung</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Renodex wählt für das jeweilige Vorhaben geeignete, eingetragene Fachfirmen aus seinem Partnernetzwerk aus, koordiniert deren Einsatz, stimmt Termine ab und übernimmt die Bauleitung sowie eine Qualitätskontrolle der Ausführung vor Ort. Die handwerkliche Ausführung erfolgt im Vertragsweg A durch Partner-Fachfirmen als Nachunternehmer von Renodex, im Vertragsweg B durch die Fachfirma aufgrund ihres eigenen Vertrags mit dem Auftraggeber. Maßgeblich sind die anerkannten Regeln der Technik, die einschlägigen DIN-Normen und das Gebäudeenergiegesetz (GEG 2024).
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) Der Auftraggeber hat für einen ungehinderten Zugang zur Baustelle zu sorgen und die für die Durchführung der Arbeiten erforderlichen Strom- und Wasseranschlüsse kostenfrei zur Verfügung zu stellen.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Fristverlängerung:</strong> Vereinbarte Fristen verlängern sich angemessen bei:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li>Höherer Gewalt und anderen unvorhersehbaren Ereignissen</li>
                  <li>Witterungsbedingungen, die eine fachgerechte Ausführung nicht zulassen</li>
                  <li>Vom Auftraggeber zu vertretenden Verzögerungen</li>
                  <li>Nachträglichen Änderungswünschen des Auftraggebers (siehe § 4)</li>
                  <li>Lieferengpässen bei Baumaterialien bei der ausführenden Fachfirma</li>
                </ul>
                <p className="text-muted-foreground">
                  (4) Renodex ist berechtigt, sich zur Erbringung seiner Leistungen weiterer Erfüllungsgehilfen zu bedienen. Im Vertragsweg B betrifft dies ausschließlich die Koordinationsleistung und begründet keine Verpflichtung von Renodex zur Erbringung der Bauleistung.
                </p>
              </section>

              <section id="s8">
                <h2 className="text-xl font-semibold mb-3">§ 8 Mitwirkungspflichten des Auftraggebers</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Der Auftraggeber hat Renodex alle für die Koordination, Bauleitung und Ausführung erforderlichen Informationen rechtzeitig und vollständig mitzuteilen.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) Vor Arbeitsbeginn hat der Auftraggeber auf vorhandene Leitungen (Gas, Wasser, Strom, etc.) sowie auf Asbest oder andere Gefahrstoffe hinzuweisen.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) Der Auftraggeber sorgt für die Zugänglichkeit des Arbeitsbereichs und räumt auf Verlangen Hindernisse auf eigene Kosten beiseite.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) <strong>(B2B):</strong> Der Auftraggeber benennt einen bevollmächtigten Ansprechpartner, der für alle Abstimmungen und Entscheidungen während der Bauausführung zuständig ist.
                </p>
                <p className="text-muted-foreground">
                  (5) Bei Verletzung der Mitwirkungspflichten haftet der Auftraggeber für daraus entstehende Mehrkosten und Verzögerungen.
                </p>
              </section>

              <section id="s9">
                <h2 className="text-xl font-semibold mb-3">§ 9 Abnahme</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Die rechtliche Abnahme der Bauleistung (§§ 640, 650g BGB) erfolgt gegenüber dem Vertragspartner der Bauleistung: im Vertragsweg A gegenüber Renodex, im Vertragsweg B gegenüber der Fachfirma. Im Vertragsweg B begleitet Renodex den Abnahmetermin im Rahmen der Koordination, wirkt bei der Fertigstellungsanzeige mit und unterstützt den Auftraggeber bei der fachlichen Einschätzung des Leistungsstands.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Abnahmefrist:</strong>
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li><strong>(B2C):</strong> Nach Fertigstellung fordert der Vertragspartner der Bauleistung den Auftraggeber in Textform zur Abnahme auf und setzt eine angemessene Frist von mindestens 12 Werktagen. Die Abnahme gilt als erklärt, wenn der Auftraggeber sie innerhalb der Frist weder erklärt noch unter Angabe mindestens eines Mangels verweigert. Diese Folge tritt nur ein, wenn die Aufforderung in Textform auf sie hingewiesen hat (§ 640 Abs. 2 Satz 2 BGB).</li>
                  <li><strong>(B2B):</strong> Die Abnahme der Bauleistung gegenüber dem Vertragspartner der Bauleistung gilt als erfolgt, wenn der Auftraggeber nicht innerhalb von 12 Werktagen nach Fertigstellungsanzeige und Aufforderung zur Abnahme die Abnahme unter Angabe mindestens eines Mangels verweigert (§ 640 Abs. 2 BGB).</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (3) Unwesentliche Mängel an der Bauleistung berechtigen nicht zur Verweigerung der Abnahme (§ 640 Abs. 1 Satz 2 BGB).
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) <strong>Zustandsfeststellung bei Verweigerung der Abnahme (§ 650g BGB):</strong> Verweigert der Auftraggeber die Abnahme der Bauleistung unter Angabe von Mängeln, hat der Vertragspartner der Bauleistung Anspruch auf eine gemeinsame Zustandsfeststellung. Im Vertragsweg B unterstützt Renodex hierbei im Rahmen der Koordination.
                </p>
                <p className="text-muted-foreground">
                  (5) Nimmt der Auftraggeber an einer gemeinsamen Zustandsfeststellung nicht teil, kann der Vertragspartner der Bauleistung die Zustandsfeststellung einseitig vornehmen.
                </p>
              </section>

              <section id="s10">
                <h2 className="text-xl font-semibold mb-3">§ 10 Gewährleistung</h2>
                <p className="text-muted-foreground mb-3">
                  (1) <strong>Vertragsweg A.</strong> Renodex haftet für Mängel der gesamten Bauleistung nach §§ 633 ff. BGB, auch soweit Nachunternehmer ausgeführt haben (§ 278 BGB). Die Mängelansprüche verjähren bei Arbeiten an einem Bauwerk in fünf Jahren, sonst in zwei Jahren ab Abnahme (§ 634a BGB).
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Vertragsweg B.</strong> Mängelansprüche an der Bauleistung richten sich gegen die Fachfirma. Renodex haftet für die Verletzung eigener Pflichten aus dem Koordinationsvertrag, insbesondere bei der Auswahl der Fachfirma und bei der übernommenen Bauüberwachung.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Unterstützung bei der Mängelabwicklung:</strong> Im Vertragsweg B unterstützt Renodex den Auftraggeber im Rahmen der Koordination bei der Kommunikation mit der Fachfirma und der Nachverfolgung berechtigter Mängelrügen, ohne selbst Vertragspartner der Nacherfüllung zu werden.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) Mängel an der Koordinationsleistung von Renodex sind Renodex unverzüglich in Textform (§ 126b BGB) anzuzeigen.
                </p>
                <p className="text-muted-foreground">
                  (5) <strong>(B2B):</strong> Die Mängelrüge gegenüber dem Vertragspartner der Bauleistung muss schriftlich unter genauer Bezeichnung des Mangels erfolgen und ihm Gelegenheit zur Prüfung geben.
                </p>
              </section>

              <section id="s11">
                <h2 className="text-xl font-semibold mb-3">§ 11 Haftung</h2>
                <p className="text-muted-foreground mb-3">
                  (1) <strong>Haftungsumfang:</strong> Im Vertragsweg A haftet Renodex für Schäden aus der gesamten Bauleistung, auch soweit Nachunternehmer ausgeführt haben (§ 278 BGB). Im Vertragsweg B haftet Renodex für Schäden aus der Verletzung eigener Pflichten aus dem Koordinationsvertrag, insbesondere bei der Auswahl der Fachfirma und bei der übernommenen Bauüberwachung. Für Schäden aus der Ausführung der Bauleistung haftet im Vertragsweg B die Fachfirma.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) Renodex haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie für vorsätzlich oder grob fahrlässig verursachte Schäden.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) Für leicht fahrlässig verursachte Schäden haftet Renodex nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten). Die Haftung ist in diesen Fällen auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) <strong>(B2B):</strong> Verletzt Renodex eine wesentliche Vertragspflicht leicht fahrlässig, ist die Haftung für Sachschäden auf den vertragstypischen, bei Vertragsschluss vorhersehbaren Schaden begrenzt, höchstens jedoch auf 3.000.000 EUR je Schadensfall. Die Begrenzung gilt im Vertragsweg A für die gesamte Bauleistung. Im Vertragsweg B gilt sie für die Koordinationsleistung, unabhängig davon, ob Renodex dafür ein Honorar des Auftraggebers, eine im Festpreis enthaltene Provision der Fachfirma oder keine Vergütung erhält. Die Rechte auf Nacherfüllung, Minderung und Rücktritt sowie die Absätze 2 und 5 bleiben unberührt.
                </p>
                <p className="text-muted-foreground mb-3">
                  (5) Die vorstehenden Haftungsbeschränkungen gelten nicht für Ansprüche nach dem Produkthaftungsgesetz oder bei Übernahme einer Garantie.
                </p>
                <p className="text-muted-foreground">
                  (6) Renodex unterhält eine Betriebshaftpflichtversicherung mit einer Deckungssumme von 3 Mio. EUR pauschal für Personen- und Sachschäden.
                </p>
              </section>

              <section id="s12">
                <h2 className="text-xl font-semibold mb-3">§ 12 Materiallieferung</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Im Vertragsweg B liefert Renodex selbst keine Baumaterialien und begründet insoweit keinen eigenen Eigentumsvorbehalt.
                </p>
                <p className="text-muted-foreground">
                  (2) Ein Eigentumsvorbehalt an gelieferten Materialien bis zur vollständigen Bezahlung besteht – soweit vereinbart – ausschließlich zwischen dem Auftraggeber und dem Vertragspartner der Bauleistung.
                </p>
              </section>

              <section id="s13">
                <h2 className="text-xl font-semibold mb-3">§ 13 Kündigung</h2>
                <p className="text-muted-foreground mb-3">
                  (1) <strong>Freie Kündigung durch den Auftraggeber:</strong> Der Auftraggeber kann den Vertrag über die Bauleistung bis zur Vollendung jederzeit kündigen (§ 648 BGB). Der Vertragspartner der Bauleistung kann dann die vereinbarte Vergütung verlangen. Er muss sich ersparte Aufwendungen und anderweitigen Erwerb anrechnen lassen. Es wird vermutet, dass ihm 5 % der Vergütung zustehen, die auf den noch nicht erbrachten Teil entfällt.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Kündigung aus wichtigem Grund:</strong> Beide Parteien können den Vertrag aus wichtigem Grund ohne Einhaltung einer Frist kündigen.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Form der Kündigung:</strong> Die Kündigung bedarf der Textform (§ 126b BGB). Die gesetzliche Schriftform für die Kündigung eines Bauvertrags (§ 650h BGB) bleibt unberührt.
                </p>
                <p className="text-muted-foreground">
                  (4) <strong>Getrennte Verträge im Vertragsweg B:</strong> Eine Kündigung des Koordinationsvertrags mit Renodex berührt den Vertrag zwischen dem Auftraggeber und der Fachfirma nicht. Dessen Kündigung richtet sich nach den dort vereinbarten bzw. den gesetzlichen Regelungen (u.a. §§ 648, 648a, 650h BGB) und ist gesondert gegenüber der Fachfirma zu erklären.
                </p>
              </section>

              <section id="s14">
                <h2 className="text-xl font-semibold mb-3">§ 14 Sturmschäden und Versicherungsarbeiten</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Bei Sturmschäden unterstützt Renodex den Auftraggeber bei der Schadensmeldung an die Versicherung durch:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li>Fotodokumentation des Schadens</li>
                  <li>Detaillierten Kostenvoranschlag</li>
                  <li>Technische Stellungnahme bei Bedarf</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (2) Die Beauftragung der Reparaturarbeiten erfolgt unabhängig von der Regulierung durch die Versicherung. Der Auftraggeber bleibt gegenüber seinen Vertragspartnern zahlungspflichtig – im Vertragsweg A gegenüber Renodex, im Vertragsweg B gegenüber der Fachfirma und, soweit ein Honorar vereinbart ist, gegenüber Renodex –, auch wenn die Versicherung die Kostenübernahme ganz oder teilweise ablehnt.
                </p>
                <p className="text-muted-foreground">
                  (3) <strong>(B2B):</strong> Bei Hausverwaltungen und gewerblichen Kunden kann nach Absprache eine Direktabrechnung des Vertragspartners der Bauleistung mit der Versicherung vereinbart werden, sofern eine Abtretungserklärung vorliegt.
                </p>
              </section>

              <section id="s15">
                <h2 className="text-xl font-semibold mb-3">§ 15 Widerrufsrecht für Verbraucher (B2C)</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Beim Verbraucherbauvertrag steht dem Verbraucher ein Widerrufsrecht von 14 Tagen zu (§ 650l BGB). Das gilt nicht, wenn der Vertrag notariell beurkundet wurde. Die Frist beginnt nicht vor der Belehrung nach Art. 249 § 3 EGBGB. Das Widerrufsrecht erlischt spätestens zwölf Monate und 14 Tage nach Vertragsschluss (§ 356e BGB).
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) Bei den übrigen Verbraucherverträgen, auch mit der Fachfirma und beim Koordinationsvertrag, besteht ein Widerrufsrecht nach §§ 312g, 355 BGB. Voraussetzung ist ein Vertragsschluss außerhalb von Geschäftsräumen, etwa bei der Besichtigung, oder im Fernabsatz. Die Belehrung erteilt der jeweilige Vertragspartner.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Vorzeitiges Erlöschen:</strong> Das Widerrufsrecht nach Absatz 2 erlischt vorzeitig, wenn:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li>der jeweilige Vertragspartner die Dienstleistung vollständig erbracht hat, und</li>
                  <li>mit der Ausführung erst begonnen hat, nachdem der Verbraucher hierzu seine ausdrückliche Zustimmung gegeben hat, und</li>
                  <li>der Verbraucher seine Kenntnis davon bestätigt hat, dass er sein Widerrufsrecht bei vollständiger Vertragserfüllung verliert.</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (4) Die ausführliche Widerrufsbelehrung wird dem Verbraucher bei Vertragsschluss vom jeweiligen Vertragspartner in Textform übermittelt.
                </p>
                <p className="text-muted-foreground">
                  (5) <strong>Kein Widerrufsrecht nach Absatz 2</strong> besteht bei:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Verträgen, die in den Geschäftsräumen des jeweiligen Vertragspartners geschlossen werden</li>
                </ul>
              </section>

              <section id="s16">
                <h2 className="text-xl font-semibold mb-3">§ 16 Besondere Bestimmungen für Unternehmer (B2B)</h2>
                <p className="text-muted-foreground mb-3">
                  (1) <strong>Untersuchungs- und Rügepflicht:</strong> Der unternehmerische Auftraggeber ist verpflichtet, die Bauleistung unverzüglich nach der Abnahme auf offensichtliche Mängel zu untersuchen und diese dem Vertragspartner der Bauleistung innerhalb von 5 Werktagen schriftlich anzuzeigen. Mängel an der Koordinationsleistung von Renodex sind entsprechend Renodex gegenüber anzuzeigen.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Gerichtsstand:</strong> Für alle Streitigkeiten aus dem Vertragsverhältnis mit Unternehmern ist ausschließlicher Gerichtsstand München.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Abtretungsverbot:</strong> Ansprüche gegen Renodex dürfen ohne schriftliche Zustimmung von Renodex nicht abgetreten werden.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) <strong>VOB/B-Vereinbarung:</strong> Auf ausdrücklichen Wunsch des Auftraggebers kann die VOB/B in der jeweils gültigen Fassung mit dem Vertragspartner der Bauleistung zum Bestandteil des Vertrags über die Bauleistung gemacht werden. Für den Koordinationsvertrag mit Renodex gelten weiterhin diese AGB.
                </p>
                <p className="text-muted-foreground mb-3">
                  (5) <strong>Rahmenverträge:</strong> Mit Hausverwaltungen, WEGs und gewerblichen Bestandskunden können Rahmenverträge mit Sonderkonditionen geschlossen werden.
                </p>
                <p className="text-muted-foreground">
                  (6) <strong>Gefahrübergang:</strong> Für die Bauleistung geht die Gefahr im Verhältnis zwischen Auftraggeber und Vertragspartner der Bauleistung gemäß dem Vertrag über die Bauleistung über. Für die Koordinationsleistung von Renodex gelten die allgemeinen gesetzlichen Regelungen.
                </p>
              </section>

              <section id="s17">
                <h2 className="text-xl font-semibold mb-3">§ 17 Digitale Kommunikation und Online-Dienste</h2>
                <p className="text-muted-foreground mb-3">
                  (1) <strong>Elektronische Kommunikation:</strong> Der Auftraggeber erklärt sich mit der elektronischen Kommunikation per E-Mail und über die Website einverstanden. E-Mails gelten als zugegangen, wenn sie an die vom Auftraggeber angegebene E-Mail-Adresse versandt wurden.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Online-Anfragen:</strong> Anfragen über das Kontaktformular auf der Website sind unverbindlich und begründen noch kein Vertragsverhältnis.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Dokumentenübermittlung:</strong> Angebote, Auftragsbestätigungen und Rechnungen können dem Auftraggeber in elektronischer Form (PDF per E-Mail) übermittelt werden.
                </p>
                <p className="text-muted-foreground">
                  (4) <strong>Foto-Upload:</strong> Bei Online-Anfragen hochgeladene Fotos werden ausschließlich zur Angebotserstellung verwendet und gemäß unserer <a href="/datenschutz" className="text-foreground">Datenschutzerklärung</a> behandelt.
                </p>
              </section>

              <section id="s18">
                <h2 className="text-xl font-semibold mb-3">§ 18 Datenschutz</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer <a href="/datenschutz" className="text-foreground">Datenschutzerklärung</a> und den geltenden datenschutzrechtlichen Bestimmungen (DSGVO, BDSG).
                </p>
                <p className="text-muted-foreground">
                  (2) <strong>(B2B):</strong> Bei der Verarbeitung personenbezogener Daten im Rahmen von B2B-Geschäftsbeziehungen erfolgt die Verarbeitung auf Grundlage berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO) zur Durchführung des Vertragsverhältnisses.
                </p>
              </section>

              <section id="s19">
                <h2 className="text-xl font-semibold mb-3">§ 19 Streitbeilegung und Schlichtung</h2>
                <p className="text-muted-foreground mb-3">
                  (1) <strong>Online-Streitbeilegung (B2C):</strong> Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-foreground">https://ec.europa.eu/consumers/odr</a>
                </p>
                <p className="text-muted-foreground">
                  (2) <strong>Hinweis:</strong> Renodex ist weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              <section id="s20">
                <h2 className="text-xl font-semibold mb-3">§ 20 Schlussbestimmungen</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Erfüllungsort:</strong> Erfüllungsort für die Bauleistung ist der Ort der Baustelle. Erfüllungsort für die übrigen Leistungen von Renodex ist dessen Sitz: Renodex (K. Bilic), Helmut-Schmidt-Allee 54, 81248 München.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Gerichtsstand (B2B):</strong> Für alle Streitigkeiten aus dem Vertragsverhältnis mit Unternehmern ist ausschließlicher Gerichtsstand München.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) <strong>Salvatorische Klausel:</strong> Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so berührt dies die Wirksamkeit der übrigen Bestimmungen nicht. An Stelle der unwirksamen Bestimmung tritt eine solche, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.
                </p>
                <p className="text-muted-foreground mb-3">
                  (5) Änderungen und Ergänzungen des Vertrags bedürfen der Textform. Individuelle Vereinbarungen haben Vorrang (§ 305b BGB).
                </p>
                <p className="text-muted-foreground">
                  (6) Diese AGB sind in deutscher Sprache verfasst. Im Falle von Übersetzungen ist die deutsche Fassung maßgeblich.
                </p>
              </section>

              <section className="pt-6 border-t">
                <p className="text-muted-foreground text-sm mb-4">
                  <strong>Hinweis:</strong> Diese AGB gelten für beide Vertragswege. Im Vertragsweg A ist Renodex (K. Bilic) Vertragspartner der Bauleistung. Im Vertragsweg B ist die im Angebot bezeichnete Fachfirma Vertragspartner der Bauleistung und Renodex Vertragspartner des Koordinationsvertrags. Mit Unternehmern kann die VOB/B vereinbart werden. Stand: 13.09.2026.
                </p>
                <p className="text-muted-foreground text-sm">
                  <strong>Renodex</strong><br />
                  K. Bilic (Einzelunternehmen), Inhaber: Krešimir Bilic<br />
                  Helmut-Schmidt-Allee 54<br />
                  81248 München<br />
                  Tel: <span className="text-foreground">+49 89 381684766</span><br />
                  E-Mail: <a href="mailto:info@renodex.de" className="text-foreground">info@renodex.de</a><br />
                  Web: <a href="https://renodex.de" target="_blank" rel="noopener noreferrer" className="text-foreground">renodex.de</a>
                </p>
              </section>

            </div>
          </div>
        </section>

        <section className="bg-muted/20 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-6 text-center">Weitere Informationen</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <Link href="/leistungen" data-testid="link-agb-leistungen">
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
              <Link href="/kontakt" data-testid="link-agb-kontakt">
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
          Hinweis zum Vertragsschluss: Inhalte und Preisangaben dieser Website sind kein verbindliches Angebot. Über die Website wird kein Vertrag geschlossen. Nach Ihrer Anfrage mit Angaben und Fotos besichtigt Renodex das Objekt; die Besichtigung ist kostenlos und unverbindlich. Danach erhalten Sie ein Festpreisangebot. Es nennt Ihren Vertragspartner für die Bauarbeiten: Renodex als Generalunternehmer oder die ausführende Fachfirma. Der Vertrag kommt erst zustande, wenn Sie dieses Angebot ausdrücklich annehmen. Über die Website erfolgen keine Bestellung, keine Buchung und keine Zahlung.
        </p>
      </div>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
