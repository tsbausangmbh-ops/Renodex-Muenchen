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

export default function AGB() {
  useSEO({
    title: "AGB | Renodex München",
    description: "AGB für Komplettsanierung von Haus und Wohnung: Vertragsschluss, Festpreise, Gewährleistung, Zahlung. BGB Bauvertragsrecht, Stand 2026.",
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
          style={{ backgroundImage: `url(/images/optimized/seite-agb.webp)` }}
          role="img"
          aria-labelledby="hero-h1-agb"
        >
          <KiBildHinweis />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h1 id="hero-h1-agb" className="text-3xl md:text-4xl font-bold text-center mb-3 text-white" data-testid="heading-agb">
              AGB – Renodex München
            </h1>
            <p className="text-zinc-300 text-center max-w-2xl mx-auto">
              Allgemeine Geschäftsbedingungen für Komplettsanierung von Haus und Wohnung in München | BGB Bauvertragsrecht | <a href="https://renodex.de" target="_blank" rel="noopener noreferrer" className="text-white">Renodex</a> | Stand: 18.08.2026
            </p>
          </div>
        </section>

        <BackButton />

        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4">
            <div className="space-y-8 text-foreground">

              <nav className="p-4 bg-muted rounded-md">
                <h2 className="text-lg font-semibold mb-3">Inhaltsübersicht</h2>
                <ul className="space-y-1 text-sm text-muted-foreground columns-1 md:columns-2">
                  <li><a href="#s1" className="hover:text-foreground">§ 1 Geltungsbereich</a></li>
                  <li><a href="#s2" className="hover:text-foreground">§ 2 Vertragspartner (B2B/B2C)</a></li>
                  <li><a href="#s3" className="hover:text-foreground">§ 3 Angebote und Vertragsschluss</a></li>
                  <li><a href="#s4" className="hover:text-foreground">§ 4 Vertragsänderungen (§§ 650b, 650c BGB)</a></li>
                  <li><a href="#s5" className="hover:text-foreground">§ 5 Preise und Zahlungsbedingungen</a></li>
                  <li><a href="#s6" className="hover:text-foreground">§ 6 Bauhandwerkersicherung (§ 650f BGB)</a></li>
                  <li><a href="#s7" className="hover:text-foreground">§ 7 Ausführung der Arbeiten</a></li>
                  <li><a href="#s8" className="hover:text-foreground">§ 8 Mitwirkungspflichten</a></li>
                  <li><a href="#s9" className="hover:text-foreground">§ 9 Abnahme (§§ 640, 650g BGB)</a></li>
                  <li><a href="#s10" className="hover:text-foreground">§ 10 Gewährleistung</a></li>
                  <li><a href="#s11" className="hover:text-foreground">§ 11 Haftung</a></li>
                  <li><a href="#s12" className="hover:text-foreground">§ 12 Eigentumsvorbehalt</a></li>
                  <li><a href="#s13" className="hover:text-foreground">§ 13 Kündigung</a></li>
                  <li><a href="#s14" className="hover:text-foreground">§ 14 Sofort-Hilfe 24/7</a></li>
                  <li><a href="#s15" className="hover:text-foreground">§ 15 Sturmschäden & Versicherung</a></li>
                  <li><a href="#s16" className="hover:text-foreground">§ 16 Widerrufsrecht (B2C)</a></li>
                  <li><a href="#s17" className="hover:text-foreground">§ 17 Besondere Bestimmungen B2B</a></li>
                  <li><a href="#s18" className="hover:text-foreground">§ 18 Digitale Kommunikation</a></li>
                  <li><a href="#s19" className="hover:text-foreground">§ 19 Datenschutz</a></li>
                  <li><a href="#s20" className="hover:text-foreground">§ 20 Streitbeilegung</a></li>
                  <li><a href="#s21" className="hover:text-foreground">§ 21 Schlussbestimmungen</a></li>
                </ul>
              </nav>

              <section id="s1">
                <h2 className="text-xl font-semibold mb-3">§ 1 Geltungsbereich und Rechtsgrundlage</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über Komplettsanierung, Renovierung sowie Einzelgewerke (Sanitär, Heizung, Elektro, Wärmepumpe, Photovoltaik u.a.) zwischen der <strong>Renodex</strong>, [Adresse folgt] (nachfolgend "Auftragnehmer") und dem Auftraggeber.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Rechtsgrundlage:</strong> Unsere Leistungen werden auf Grundlage des BGB-Bauvertragsrechts in der jeweils gültigen Fassung (Stand 2025) erbracht. Es gelten die §§ 631 ff. BGB (Werkvertragsrecht) sowie bei Bauverträgen im Sinne des § 650a BGB die besonderen Vorschriften der §§ 650a bis 650h BGB:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li>§ 650a BGB – Bauvertrag</li>
                  <li>§ 650b BGB – Änderung des Vertrags; Anordnungsrecht des Bestellers</li>
                  <li>§ 650c BGB – Vergütungsanpassung bei Anordnungen</li>
                  <li>§ 650d BGB – Einstweilige Verfügung</li>
                  <li>§ 650e BGB – Sicherungshypothek des Bauunternehmers</li>
                  <li>§ 650f BGB – Bauhandwerkersicherung</li>
                  <li>§ 650g BGB – Zustandsfeststellung bei Verweigerung der Abnahme</li>
                  <li>§ 650h BGB – Schriftform der Kündigung</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (3) Bei Verträgen mit <strong>Verbrauchern</strong> (§ 13 BGB) über den Bau eines neuen Gebäudes oder erhebliche Umbaumaßnahmen gelten zusätzlich die Vorschriften über den Verbraucherbauvertrag (§§ 650i bis 650n BGB).
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) Bei Verträgen mit <strong>Unternehmern</strong> (§ 14 BGB) können ergänzend die Bestimmungen der VOB/B und VOB/C in der jeweils gültigen Fassung (2019/2023) vereinbart werden, sofern dies ausdrücklich im Vertrag festgehalten wird.
                </p>
                <p className="text-muted-foreground">
                  (5) Abweichende Geschäftsbedingungen des Auftraggebers werden nicht Vertragsbestandteil, es sei denn, der Auftragnehmer stimmt ihrer Geltung ausdrücklich schriftlich zu.
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
                  (1) Angebote des Auftragnehmers sind freibleibend und unverbindlich, sofern sie nicht ausdrücklich als verbindlich gekennzeichnet sind.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Angebotsbindungsfrist:</strong>
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li><strong>(B2C):</strong> 14 Kalendertage ab Angebotsdatum</li>
                  <li><strong>(B2B):</strong> 10 Kalendertage ab Angebotsdatum, bei Großprojekten abweichend nach Vereinbarung</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (3) Ein Vertrag kommt erst durch die schriftliche Auftragsbestätigung des Auftragnehmers oder durch Beginn der Ausführung der beauftragten Arbeiten zustande.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) <strong>Verbraucherbauvertrag (§ 650j BGB):</strong> Bei Verbraucherbauverträgen erhält der Verbraucher vor Vertragsschluss eine Baubeschreibung gemäß Art. 249 § 2 EGBGB, die verbindlicher Vertragsbestandteil wird.
                </p>
                <p className="text-muted-foreground mb-3">
                  (5) Kostenvoranschläge, Zeichnungen und andere technische Unterlagen bleiben Eigentum des Auftragnehmers und dürfen ohne dessen Zustimmung weder vervielfältigt noch Dritten zugänglich gemacht werden.
                </p>
                <p className="text-muted-foreground">
                  (6) Die dem Angebot zugrunde liegende Kalkulation wird auf Wunsch hinterlegt und dient als Grundlage für die Berechnung von Mehr- oder Minderleistungen gemäß § 650c BGB.
                </p>
              </section>

              <section id="s4">
                <h2 className="text-xl font-semibold mb-3">§ 4 Änderungen des Vertrags und Nachträge (§§ 650b, 650c BGB)</h2>
                <p className="text-muted-foreground mb-3">
                  (1) <strong>Änderungsbegehren des Auftraggebers:</strong> Der Auftraggeber kann gemäß § 650b Abs. 1 BGB Änderungen des vereinbarten Werkerfolgs oder Änderungen, die zur Erreichung des vereinbarten Werkerfolgs notwendig sind, verlangen.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Erstangebot des Auftragnehmers:</strong> Auf ein Änderungsbegehren erstellt der Auftragnehmer unverzüglich ein Angebot über die Mehr- oder Mindervergütung. Dieses Erstangebot enthält eine nachvollziehbare Aufstellung der Mehr- oder Minderkosten auf Basis der hinterlegten Kalkulation.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Einigung oder Anordnung:</strong> Die Parteien sollen eine Einigung über die Änderung und die Vergütungsanpassung anstreben. Kommt binnen 30 Tagen keine Einigung zustande, kann der Auftraggeber die Änderung gemäß § 650b Abs. 2 BGB anordnen, sofern diese zumutbar ist.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) <strong>Vergütungsanpassung nach § 650c BGB:</strong> Bei einer Anordnung wird die Vergütung für den vermehrten oder verminderten Aufwand nach den tatsächlich erforderlichen Kosten mit angemessenen Zuschlägen ermittelt.
                </p>
                <p className="text-muted-foreground mb-3">
                  (5) <strong>80%-Regelung (§ 650c Abs. 3 BGB):</strong> Bis zur endgültigen Feststellung der Vergütung kann der Auftragnehmer eine Abschlagszahlung in Höhe von 80% der im Erstangebot genannten Mehrvergütung verlangen.
                </p>
                <p className="text-muted-foreground">
                  (6) Sämtliche Änderungsbegehren, Angebote und Anordnungen sind schriftlich oder in Textform (E-Mail) festzuhalten.
                </p>
              </section>

              <section id="s5">
                <h2 className="text-xl font-semibold mb-3">§ 5 Preise und Zahlungsbedingungen</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Die Preise verstehen sich netto zuzüglich der gesetzlichen Mehrwertsteuer (derzeit 19%) in der am Tag der Rechnungsstellung gültigen Höhe.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Zahlungsstaffelung für Verbraucher (B2C):</strong>
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li>Aufträge bis 5.000 EUR: 50% Anzahlung bei Auftragserteilung, 50% bei Abnahme</li>
                  <li>Aufträge über 5.000 EUR: 40% Anzahlung, weitere Abschlagszahlungen nach Baufortschritt, 10% nach Abnahme</li>
                  <li>Verbraucherbauverträge: Abschlagszahlungen max. 90% der Gesamtvergütung (§ 650m BGB)</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Zahlungsstaffelung für Unternehmer (B2B):</strong>
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li>Nach Vereinbarung, üblich: 30% Anzahlung, Abschlagszahlungen nach Baufortschritt, 5% nach Abnahme</li>
                  <li>Bei VOB-Verträgen: gemäß VOB/B § 16</li>
                  <li>Skonto: 2% bei Zahlung innerhalb von 10 Tagen (nur bei ausdrücklicher Vereinbarung)</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (4) <strong>Abschlagszahlungen (§ 632a BGB):</strong> Der Auftragnehmer kann Abschlagszahlungen für bereits erbrachte Leistungen verlangen.
                </p>
                <p className="text-muted-foreground mb-3">
                  (5) <strong>Prüfbare Schlussrechnung (§ 650g Abs. 4 BGB):</strong> Der Auftragnehmer stellt eine prüfbare Schlussrechnung. Die Schlusszahlung ist fällig:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li><strong>(B2C):</strong> innerhalb von 14 Tagen nach Zugang der Schlussrechnung</li>
                  <li><strong>(B2B):</strong> innerhalb von 14 Tagen nach Zugang der Schlussrechnung</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (6) <strong>Verzugszinsen:</strong> Bei Zahlungsverzug berechnet der Auftragnehmer Verzugszinsen:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li><strong>(B2C):</strong> 5 Prozentpunkte über dem Basiszinssatz (§ 288 Abs. 1 BGB)</li>
                  <li><strong>(B2B):</strong> 9 Prozentpunkte über dem Basiszinssatz (§ 288 Abs. 2 BGB)</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (7) <strong>(B2B):</strong> Der Auftragnehmer ist berechtigt, bei Zahlungsverzug eine Pauschale von 40 EUR gemäß § 288 Abs. 5 BGB zu verlangen.
                </p>
                <p className="text-muted-foreground">
                  (8) <strong>Nachlass für digitale Anfragen:</strong> Bei Anfragen, die vollständig digital (über das Kontaktformular auf renodex.de, per E-Mail oder über den dortigen Upload von Fotos/Videos) und nicht telefonisch gestellt werden, gewährt der Auftragnehmer einen Nachlass von 10% auf den im individuellen Festpreisangebot ermittelten Richtpreis. Der Nachlass gilt befristet für Anfragen, die zwischen dem 18.08.2026 und einschließlich 18.10.2026 eingehen, und nicht in Verbindung mit anderen Rabatten oder Sonderkonditionen.
                </p>
              </section>

              <section id="s6">
                <h2 className="text-xl font-semibold mb-3">§ 6 Bauhandwerkersicherung (§ 650f BGB)</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Der Auftragnehmer kann vom Auftraggeber gemäß § 650f BGB eine Sicherheit für die vereinbarte Vergütung einschließlich Nebenforderungen verlangen.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Ausnahmen:</strong> Dies gilt nicht bei:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li>Verträgen mit Verbrauchern über Umbaumaßnahmen an deren selbst bewohntem Eigenheim (§ 650f Abs. 6 Nr. 2 BGB)</li>
                  <li>Öffentlichen Auftraggebern (§ 650f Abs. 6 Nr. 1 BGB)</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (3) Die Sicherheit kann durch Bürgschaft eines in Deutschland zugelassenen Kreditinstituts oder Kreditversicherers geleistet werden.
                </p>
                <p className="text-muted-foreground">
                  (4) Wird die Sicherheit nicht fristgerecht geleistet, kann der Auftragnehmer die Arbeiten einstellen oder den Vertrag kündigen.
                </p>
              </section>

              <section id="s7">
                <h2 className="text-xl font-semibold mb-3">§ 7 Ausführung der Arbeiten</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Die Ausführung der Arbeiten erfolgt nach den anerkannten Regeln der Technik, insbesondere:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li>Anerkannte Regeln der Technik der jeweiligen Gewerke</li>
                  <li>Einschlägige DIN-Normen</li>
                  <li>Energieeinsparverordnung (GEG 2024)</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (2) Der Auftraggeber hat für einen ungehinderten Zugang zur Baustelle zu sorgen und die für die Durchführung der Arbeiten erforderlichen Strom- und Wasseranschlüsse kostenfrei zur Verfügung zu stellen.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Fristverlängerung:</strong> Vereinbarte Ausführungsfristen verlängern sich angemessen bei:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li>Höherer Gewalt und anderen unvorhersehbaren Ereignissen</li>
                  <li>Witterungsbedingungen, die eine fachgerechte Ausführung nicht zulassen</li>
                  <li>Vom Auftraggeber zu vertretenden Verzögerungen</li>
                  <li>Nachträglichen Änderungswünschen des Auftraggebers (§ 650b BGB)</li>
                  <li>Lieferengpässen bei Baumaterialien</li>
                </ul>
                <p className="text-muted-foreground">
                  (4) Der Auftragnehmer ist berechtigt, Unterauftragnehmer mit der Ausführung von Teilleistungen zu beauftragen.
                </p>
              </section>

              <section id="s8">
                <h2 className="text-xl font-semibold mb-3">§ 8 Mitwirkungspflichten des Auftraggebers</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Der Auftraggeber hat dem Auftragnehmer alle für die Ausführung der Arbeiten erforderlichen Informationen rechtzeitig und vollständig mitzuteilen.
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
                <h2 className="text-xl font-semibold mb-3">§ 9 Abnahme (§§ 640, 650g BGB)</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Nach Fertigstellung der Arbeiten hat der Auftraggeber diese unverzüglich abzunehmen. Der Auftragnehmer wird die Fertigstellung anzeigen und einen Abnahmetermin vorschlagen.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Abnahmefrist:</strong>
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li><strong>(B2C):</strong> Die Abnahme gilt als erfolgt, wenn der Auftraggeber nicht innerhalb einer angemessenen Frist (i.d.R. 12 Werktage) nach Fertigstellungsanzeige unter Angabe mindestens eines Mangels die Abnahme verweigert.</li>
                  <li><strong>(B2B):</strong> Die Abnahme gilt als erfolgt, wenn der Auftraggeber nicht innerhalb von 12 Werktagen nach Fertigstellungsanzeige die Abnahme unter Angabe mindestens eines Mangels verweigert (§ 640 Abs. 2 BGB).</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (3) Unwesentliche Mängel berechtigen nicht zur Verweigerung der Abnahme (§ 640 Abs. 1 Satz 2 BGB).
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) <strong>Zustandsfeststellung bei Verweigerung der Abnahme (§ 650g BGB):</strong> Verweigert der Auftraggeber die Abnahme unter Angabe von Mängeln, hat der Auftragnehmer Anspruch auf eine gemeinsame Zustandsfeststellung.
                </p>
                <p className="text-muted-foreground">
                  (5) Nimmt der Auftraggeber an einer gemeinsamen Zustandsfeststellung nicht teil, kann der Auftragnehmer die Zustandsfeststellung einseitig vornehmen.
                </p>
              </section>

              <section id="s10">
                <h2 className="text-xl font-semibold mb-3">§ 10 Gewährleistung (§§ 633 ff. BGB)</h2>
                <p className="text-muted-foreground mb-3">
                  (1) <strong>Verjährungsfrist gemäß § 634a BGB:</strong>
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li><strong>5 Jahre</strong> für Arbeiten an einem Bauwerk (Neubauten, Komplettsanierungen, wesentliche Instandhaltungen)</li>
                  <li><strong>2 Jahre</strong> für Reparatur- und Wartungsarbeiten, die nicht am Bauwerk selbst erfolgen</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>(B2B mit VOB/B):</strong> Bei Vereinbarung der VOB/B beträgt die Gewährleistungsfrist 4 Jahre gemäß § 13 Abs. 4 VOB/B.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) Die Gewährleistungsfrist beginnt mit der Abnahme der Leistung.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) Mängel sind dem Auftragnehmer unverzüglich schriftlich anzuzeigen. Der Auftragnehmer ist berechtigt, berechtigte Mängel nach seiner Wahl durch Nachbesserung oder Neuherstellung zu beseitigen (Nacherfüllung gemäß § 635 BGB).
                </p>
                <p className="text-muted-foreground mb-3">
                  (5) <strong>Ausschluss der Gewährleistung:</strong> Die Gewährleistung erstreckt sich nicht auf Schäden, die durch:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li>Unsachgemäße Behandlung oder Eingriffe Dritter</li>
                  <li>Unterlassene Wartung</li>
                  <li>Höhere Gewalt (Sturm, Hagel, Blitzschlag)</li>
                  <li>Normale Abnutzung</li>
                </ul>
                <p className="text-muted-foreground">
                  (6) <strong>(B2B):</strong> Die Mängelrüge muss schriftlich unter genauer Bezeichnung des Mangels erfolgen und dem Auftragnehmer Gelegenheit zur Prüfung geben.
                </p>
              </section>

              <section id="s11">
                <h2 className="text-xl font-semibold mb-3">§ 11 Haftung</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Der Auftragnehmer haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie für vorsätzlich oder grob fahrlässig verursachte Schäden.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) Für leicht fahrlässig verursachte Schäden haftet der Auftragnehmer nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten). Die Haftung ist in diesen Fällen auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>(B2B):</strong> Bei Verträgen mit Unternehmern ist die Haftung für leicht fahrlässig verursachte Sachschäden auf die Höhe der Auftragssumme begrenzt, maximal jedoch auf 500.000 EUR je Schadensfall.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) Die vorstehenden Haftungsbeschränkungen gelten nicht für Ansprüche nach dem Produkthaftungsgesetz oder bei Übernahme einer Garantie.
                </p>
                <p className="text-muted-foreground">
                  (5) Der Auftragnehmer unterhält eine Betriebshaftpflichtversicherung mit einer Deckungssumme von mindestens 3 Mio. EUR für Personen- und Sachschäden.
                </p>
              </section>

              <section id="s12">
                <h2 className="text-xl font-semibold mb-3">§ 12 Eigentumsvorbehalt</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Die gelieferten Materialien bleiben bis zur vollständigen Bezahlung aller Forderungen aus dem Vertragsverhältnis Eigentum des Auftragnehmers.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) Der Auftraggeber ist verpflichtet, die unter Eigentumsvorbehalt stehenden Materialien pfleglich zu behandeln und vor Beschädigung zu schützen.
                </p>
                <p className="text-muted-foreground">
                  (3) <strong>(B2B):</strong> Der erweiterte Eigentumsvorbehalt erstreckt sich auf alle gegenwärtigen und zukünftigen Forderungen aus der Geschäftsverbindung (Kontokorrentvorbehalt).
                </p>
              </section>

              <section id="s13">
                <h2 className="text-xl font-semibold mb-3">§ 13 Kündigung (§§ 648, 648a, 650h BGB)</h2>
                <p className="text-muted-foreground mb-3">
                  (1) <strong>Freie Kündigung durch den Auftraggeber (§ 648 BGB):</strong> Der Auftraggeber kann den Vertrag jederzeit kündigen. In diesem Fall behält der Auftragnehmer den Anspruch auf die vereinbarte Vergütung abzüglich ersparter Aufwendungen. Es wird vermutet, dass 5% der auf den noch nicht erbrachten Teil der Werkleistung entfallenden vereinbarten Vergütung eingespart werden.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Kündigung aus wichtigem Grund (§ 648a BGB):</strong> Beide Parteien können den Vertrag aus wichtigem Grund ohne Einhaltung einer Frist kündigen.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Schriftform der Kündigung (§ 650h BGB):</strong> Bei Bauverträgen bedarf die Kündigung der Schriftform.
                </p>
                <p className="text-muted-foreground">
                  (4) <strong>(B2B mit VOB/B):</strong> Bei Vereinbarung der VOB/B gelten die Kündigungsregelungen des § 8 VOB/B.
                </p>
              </section>

              <section id="s14">
                <h2 className="text-xl font-semibold mb-3">§ 14 Sofort-Hilfe und Sofortreparaturen (24/7)</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Der Auftragnehmer ist für dringende Anfragen digital über das Kontaktformular sowie telefonisch erreichbar: <a href="tel:00000000000" className="text-foreground">[Telefon folgt]</a>
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Zuschläge für Sofort-Hilfe-Einsätze</strong> (außerhalb der regulären Geschäftszeiten Mo-Fr 8:00-16:30 Uhr):
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li>Abends (16:30-22:00 Uhr): 25% Zuschlag</li>
                  <li>Nachts (22:00-8:00 Uhr): 50% Zuschlag</li>
                  <li>Samstags: 50% Zuschlag</li>
                  <li>Sonn- und Feiertags: 100% Zuschlag</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (3) Die Zuschläge gelten sowohl für B2B als auch B2C.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) <strong>Anfahrtspauschale bei der Sofort-Hilfe:</strong> Im Einsatzgebiet München und Umkreis 30 km wird eine Anfahrtspauschale von 95,00 EUR netto berechnet.
                </p>
                <p className="text-muted-foreground">
                  (5) Bei der Sofort-Hilfe ausgeführte Sofortmaßnahmen zur Schadensbegrenzung werden nach Aufwand berechnet. Ein detaillierter Kostenvoranschlag für Folgearbeiten wird zeitnah erstellt.
                </p>
              </section>

              <section id="s15">
                <h2 className="text-xl font-semibold mb-3">§ 15 Sturmschäden und Versicherungsarbeiten</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Bei Sturmschäden unterstützt der Auftragnehmer den Auftraggeber bei der Schadensmeldung an die Versicherung durch:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li>Fotodokumentation des Schadens</li>
                  <li>Detaillierten Kostenvoranschlag</li>
                  <li>Technische Stellungnahme bei Bedarf</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (2) Die Beauftragung der Reparaturarbeiten erfolgt unabhängig von der Regulierung durch die Versicherung. Der Auftraggeber bleibt zahlungspflichtig, auch wenn die Versicherung die Kostenübernahme ganz oder teilweise ablehnt.
                </p>
                <p className="text-muted-foreground">
                  (3) <strong>(B2B):</strong> Bei Hausverwaltungen und gewerblichen Kunden kann nach Absprache eine Direktabrechnung mit der Versicherung vereinbart werden, sofern eine Abtretungserklärung vorliegt.
                </p>
              </section>

              <section id="s16">
                <h2 className="text-xl font-semibold mb-3">§ 16 Widerrufsrecht für Verbraucher (B2C)</h2>
                <p className="text-muted-foreground mb-3">
                  (1) <strong>Widerrufsrecht:</strong> Verbraucher haben bei außerhalb von Geschäftsräumen geschlossenen Verträgen und bei Fernabsatzverträgen ein Widerrufsrecht von 14 Tagen gemäß §§ 312g, 355 BGB.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Bei Verbraucherbauverträgen (§ 650l BGB):</strong> Die Widerrufsfrist beträgt 14 Tage und beginnt nicht, bevor der Auftragnehmer den Verbraucher gemäß Art. 249 § 3 EGBGB über sein Widerrufsrecht belehrt hat.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Vorzeitiges Erlöschen:</strong> Das Widerrufsrecht erlischt vorzeitig, wenn:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-3 space-y-1 ml-4">
                  <li>der Auftragnehmer die Dienstleistung vollständig erbracht hat, und</li>
                  <li>mit der Ausführung erst begonnen hat, nachdem der Verbraucher hierzu seine ausdrückliche Zustimmung gegeben hat, und</li>
                  <li>der Verbraucher seine Kenntnis davon bestätigt hat, dass er sein Widerrufsrecht bei vollständiger Vertragserfüllung verliert.</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  (4) Die ausführliche Widerrufsbelehrung wird dem Verbraucher bei Vertragsschluss in Textform übermittelt.
                </p>
                <p className="text-muted-foreground">
                  (5) <strong>Kein Widerrufsrecht</strong> besteht bei:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Sofort-Hilfe-Einsätzen mit sofortiger Ausführung nach ausdrücklichem Verlangen des Verbrauchers</li>
                  <li>Verträgen, die in den Geschäftsräumen des Auftragnehmers geschlossen werden</li>
                </ul>
              </section>

              <section id="s17">
                <h2 className="text-xl font-semibold mb-3">§ 17 Besondere Bestimmungen für Unternehmer (B2B)</h2>
                <p className="text-muted-foreground mb-3">
                  (1) <strong>Untersuchungs- und Rügepflicht:</strong> Der unternehmerische Auftraggeber ist verpflichtet, die Leistung unverzüglich nach Abnahme auf offensichtliche Mängel zu untersuchen und diese innerhalb von 5 Werktagen schriftlich anzuzeigen.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Gerichtsstand:</strong> Für alle Streitigkeiten aus dem Vertragsverhältnis mit Unternehmern ist ausschließlicher Gerichtsstand München.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Abtretungsverbot:</strong> Ansprüche gegen den Auftragnehmer dürfen ohne dessen schriftliche Zustimmung nicht abgetreten werden.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) <strong>VOB/B-Vereinbarung:</strong> Auf ausdrücklichen Wunsch des Auftraggebers kann die VOB/B in der jeweils gültigen Fassung zum Vertragsbestandteil gemacht werden. In diesem Fall geht die VOB/B diesen AGB vor.
                </p>
                <p className="text-muted-foreground mb-3">
                  (5) <strong>Rahmenverträge:</strong> Mit Hausverwaltungen, WEGs und gewerblichen Bestandskunden können Rahmenverträge mit Sonderkonditionen geschlossen werden.
                </p>
                <p className="text-muted-foreground">
                  (6) <strong>Gefahrübergang:</strong> Die Gefahr geht auf den Auftraggeber über, sobald die Leistung erbracht und zur Abnahme angeboten wurde.
                </p>
              </section>

              <section id="s18">
                <h2 className="text-xl font-semibold mb-3">§ 18 Digitale Kommunikation und Online-Dienste</h2>
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

              <section id="s19">
                <h2 className="text-xl font-semibold mb-3">§ 19 Datenschutz</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer <a href="/datenschutz" className="text-foreground">Datenschutzerklärung</a> und den geltenden datenschutzrechtlichen Bestimmungen (DSGVO, BDSG).
                </p>
                <p className="text-muted-foreground">
                  (2) <strong>(B2B):</strong> Bei der Verarbeitung personenbezogener Daten im Rahmen von B2B-Geschäftsbeziehungen erfolgt die Verarbeitung auf Grundlage berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO) zur Durchführung des Vertragsverhältnisses.
                </p>
              </section>

              <section id="s20">
                <h2 className="text-xl font-semibold mb-3">§ 20 Streitbeilegung und Schlichtung</h2>
                <p className="text-muted-foreground mb-3">
                  (1) <strong>Online-Streitbeilegung (B2C):</strong> Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-foreground">https://ec.europa.eu/consumers/odr</a>
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Hinweis:</strong> Der Auftragnehmer ist weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Schlichtungsverfahren (B2B):</strong> Bei Streitigkeiten aus dem Vertragsverhältnis mit Unternehmern verpflichten sich beide Parteien, vor Einleitung eines gerichtlichen Verfahrens ein Schlichtungsverfahren durchzuführen.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) <strong>Schlichtungsstelle:</strong> Als Schlichtungsstelle wird die Schlichtungsstelle der Handwerkskammer für München und Oberbayern vereinbart.
                </p>
                <p className="text-muted-foreground">
                  (5) Die Kosten des Schlichtungsverfahrens werden von den Parteien je zur Hälfte getragen, sofern nichts anderes vereinbart wird.
                </p>
              </section>

              <section id="s21">
                <h2 className="text-xl font-semibold mb-3">§ 21 Schlussbestimmungen</h2>
                <p className="text-muted-foreground mb-3">
                  (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
                </p>
                <p className="text-muted-foreground mb-3">
                  (2) <strong>Erfüllungsort:</strong> Erfüllungsort für alle Leistungen ist der Sitz des Auftragnehmers: Renodex, [Adresse folgt].
                </p>
                <p className="text-muted-foreground mb-3">
                  (3) <strong>Gerichtsstand (B2B):</strong> Für alle Streitigkeiten aus dem Vertragsverhältnis mit Unternehmern ist ausschließlicher Gerichtsstand München.
                </p>
                <p className="text-muted-foreground mb-3">
                  (4) <strong>Salvatorische Klausel:</strong> Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so berührt dies die Wirksamkeit der übrigen Bestimmungen nicht. An Stelle der unwirksamen Bestimmung tritt eine solche, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.
                </p>
                <p className="text-muted-foreground mb-3">
                  (5) Änderungen und Ergänzungen des Vertrages bedürfen der Schriftform. Dies gilt auch für die Aufhebung dieses Schriftformerfordernisses.
                </p>
                <p className="text-muted-foreground">
                  (6) Diese AGB sind in deutscher Sprache verfasst. Im Falle von Übersetzungen ist die deutsche Fassung maßgeblich.
                </p>
              </section>

              <section className="pt-6 border-t">
                <p className="text-muted-foreground text-sm mb-4">
                  <strong>Hinweis:</strong> Diese AGB basieren auf dem BGB-Bauvertragsrecht in der jeweils gültigen Fassung (Stand: 18.08.2026). Bei Verträgen mit Unternehmern kann ergänzend die VOB/B vereinbart werden.
                </p>
                <p className="text-muted-foreground text-sm">
                  <strong>Renodex</strong><br />
                  [Adresse folgt]<br />
                  Tel: <a href="tel:00000000000" className="text-foreground">[Telefon folgt]</a><br />
                  E-Mail: <a href="mailto:info@renodex.de" className="text-foreground">info@renodex.de</a><br />
                  Web: <a href="https://renodex.de" target="_blank" rel="noopener noreferrer" className="text-foreground">renodex.de</a>
                </p>
              </section>

            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-6 text-center">Weitere Informationen</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <Link href="/leistungen" data-testid="link-agb-leistungen">
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
              <Link href="/kontakt" data-testid="link-agb-kontakt">
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

      <div className="max-w-3xl mx-auto px-4 py-4">
        <p className="text-[10px] text-muted-foreground/60 leading-relaxed">
          Hinweis zum Vertragsabschluss: Die auf dieser Website dargestellten Inhalte, Leistungen und Informationen stellen kein verbindliches Angebot im rechtlichen Sinne dar. Ein Vertragsabschluss über diese Website findet nicht statt. Anfragen über kontaktformulare, E-Mail oder Telefon dienen ausschließlich der unverbindlichen Kontaktaufnahme und der Vorbereitung einer individuellen Angebotserstellung. Ein Vertrag kommt erst nach persönlicher Abstimmung, Besichtigung vor Ort und ausdrücklicher Annahme eines schriftlichen Angebots zustande. Es erfolgt keine kostenpflichtige Bestellung, keine Buchung und keine Online-Zahlung über diese Website.
        </p>
      </div>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
