/**
 * Server-side Content für SEO Pre-Rendering
 * Dieser Content wird direkt ins HTML eingefügt, bevor React lädt
 * Ziel: 800-1200 Wörter pro Seite mit H1, H2, H3, FAQ-Struktur
 */

interface FAQItem {
  question: string;
  answer: string;
}

interface SubSection {
  heading: string; // H3
  text: string;
}

interface Section {
  heading: string; // H2
  text: string;
  subsections?: SubSection[]; // H3 Abschnitte
}

interface PageContent {
  h1: string;
  intro: string;
  sections?: Section[];
  faq?: FAQItem[];
}

const BASE_URL = "https://renodex.de";

// Hauptseiten Content - 800-1200 Wörter pro Seite
const mainPagesContent: Record<string, PageContent> = {
  "/": {
    h1: "Dachdecker München – Dacharbeiten vom Partnernetzwerk",
    intro: "ACHTUNG: Jeder Tag mit einem beschädigten Dach kostet Sie bares Geld! Wasserschäden, Schimmel und steigende Heizkosten – das sind die teuren Folgen, wenn Sie jetzt nicht handeln. Die Renodex ist seit 25 Jahren der Partnernetzwerk aus geprüften Partner-Meisterfirmen, dem über 2.847 Münchner Hausbesitzer vertrauen. Warum? Weil wir liefern: Festpreisgarantie ohne Überraschungen, 10 Jahre Garantie auf alle Arbeiten, und eine 24/7 Sofort-Hilfe, die innerhalb von 60 Minuten bei Ihnen ist. Rufen Sie JETZT an: [Telefon folgt] – die kostenlose Erstberatung sichert Ihnen heute noch einen Termin. Die Nachfrage ist hoch, unsere Kapazitäten begrenzt. Warten Sie nicht, bis der nächste Sturm kommt!",
    sections: [
      {
        heading: "WARNUNG: So zerstört ein undichtes Dach Ihr Zuhause",
        text: "Was viele Hausbesitzer nicht wissen: Ein kleiner Riss in der Dachdeckung kann innerhalb von Wochen zu Schäden von 15.000€ oder mehr führen. Feuchtigkeit dringt in die Dämmung, Schimmel breitet sich aus, Holzbalken faulen – und Ihre Versicherung zahlt oft nur, wenn Sie schnell gehandelt haben. Die gute Nachricht: Mit einer professionellen Dachinspektion für nur 150€ erfahren Sie sofort, ob Ihr Dach sicher ist. Unser Meister prüft jeden Quadratmeter und sagt Ihnen ehrlich, was wirklich nötig ist – ohne Panikmache, aber auch ohne Beschönigung.",
        subsections: [
          {
            heading: "Die 5 Warnsignale, die Sie NICHT ignorieren dürfen",
            text: "Handeln Sie sofort, wenn Sie eines dieser Zeichen bemerken: 1. Wasserflecken an Decken oder Wänden – das Wasser ist bereits im Haus! 2. Lose, verschobene oder fehlende Dachziegel – bei jedem Regen dringt Wasser ein. 3. Moos und Flechten auf dem Dach – sie speichern Feuchtigkeit und zerstören die Ziegel. 4. Heizkosten über 1.500€/Jahr für ein Einfamilienhaus – Ihr Dach ist wahrscheinlich undicht oder schlecht gedämmt. 5. Dach älter als 35 Jahre ohne Inspektion – tickende Zeitbombe! Je länger Sie warten, desto teurer wird die Reparatur."
          },
          {
            heading: "Was andere Dachdecker Ihnen verschweigen",
            text: "Viele Dachdecker verkaufen Ihnen teure Komplettsanierungen, obwohl eine Teilreparatur ausreichen würde. Wir nicht. Bei Renodex bekommen Sie eine ehrliche Beurteilung: Manchmal reichen 500€ für eine Reparatur statt 25.000€ für eine Sanierung. Unser Meister zeigt Ihnen Fotos vom Dachzustand und erklärt genau, was gemacht werden muss – und was nicht. Diese Transparenz ist der Grund, warum 94% unserer Kunden uns weiterempfehlen."
          },
          {
            heading: "Dachsanierung München: Festpreis ab 93€/m² – Keine versteckten Kosten",
            text: "Unsere Preise sind glasklar: Neueindeckung 93-175€/m², mit Wärmedämmung 175-299€/m², Komplettsanierung inkl. Dachstuhl 299-592€/m². Bei einem 150m² Dach wissen Sie von Anfang an: 14.000-88.000€ – alles inklusive. Gerüst, Material, Arbeit, Entsorgung, Baustellenreinigung. Kein Kleingedrucktes, keine Nachforderungen. Sie unterschreiben einen Festpreis, und der gilt."
          },
          {
            heading: "JETZT bis zu 45.000€ Förderung sichern – aber nur noch kurze Zeit!",
            text: "Die KfW-Förderung für energetische Dachsanierungen ist so attraktiv wie nie: Bis zu 20% Zuschuss, BAFA-Förderung zusätzlich, und der Steuerbonus von 20% über 3 Jahre. Aber: Die Fördertöpfe sind begrenzt, und 2026 werden die Bedingungen verschärft. Wer jetzt saniert, spart nicht nur Heizkosten, sondern bekommt auch noch staatliche Unterstützung. Wir übernehmen den kompletten Förderantrag für Sie – kostenlos. Rufen Sie an, bevor die Förderung ausläuft: [Telefon folgt]."
          }
        ]
      },
      {
        heading: "Dachrinne kaputt? JETZT handeln – bevor die Fassade ruiniert ist!",
        text: "Eine defekte Dachrinne ist wie ein offener Wasserhahn an Ihrer Hauswand. Tag und Nacht läuft Wasser die Fassade herunter, sickert ins Mauerwerk, zerstört den Putz und verursacht Schimmel im Innenraum. Die Reparaturkosten? Schnell 5.000-15.000€ – und das nur, weil eine Dachrinne für 300€ nicht rechtzeitig repariert wurde. Als Spengler München, Partnernetzwerk, sehen wir das täglich. Lassen Sie es nicht so weit kommen!",
        subsections: [
          {
            heading: "Neue Dachrinnen ab 89€/Meter – in 1-2 Tagen fertig montiert",
            text: "Kupfer, Zink oder Aluminium – wir montieren Ihre neuen Dachrinnen schnell und sauber. Kupfer hält 50+ Jahre und sieht mit der Zeit immer edler aus. Zink ist der Klassiker für traditionelle Münchner Häuser. Aluminium ist leicht, rostfrei und günstig. Egal welches Material: Bei uns bekommen Sie Festpreise, saubere Arbeit und 10 Jahre Garantie. Rufen Sie an für ein kostenloses Angebot: [Telefon folgt]."
          },
          {
            heading: "Gauben bauen München – 15-20m² mehr Wohnfläche für Ihr Dachgeschoss",
            text: "Eine Gaube ist die cleverste Investition für Ihr Haus: Mehr Wohnfläche, mehr Licht, höherer Immobilienwert. Wir bauen Schleppgauben, Spitzgauben und Flachdachgauben – alles inklusive Baugenehmigung, Statik und wasserdichtem Anschluss. Aktuelle Wartezeit: 3-4 Wochen. Sichern Sie sich jetzt Ihren Termin!"
          },
          {
            heading: "Kaminverkleidung undicht? Das kann richtig teuer werden!",
            text: "Undichte Kaminanschlüsse sind die häufigste Ursache für versteckte Wasserschäden. Das Wasser läuft zwischen Kamin und Dach ins Haus – oft unbemerkt, bis der Schaden da ist. Eine professionelle Kaminverkleidung aus Zink (948-2.987€) oder Kupfer (1.421-4.738€) schützt Sie dauerhaft. Mit 10 Jahren Garantie."
          },
          {
            heading: "Herbst-Aktion: Dachrinnenreinigung + Check für nur 89€",
            text: "Verstopfte Dachrinnen im Winter bedeuten Eiszapfen, Wasserschäden und Frostsprengungen. Lassen Sie Ihre Dachrinnen VOR dem Winter professionell reinigen. Wir entfernen Laub, Moos und Ablagerungen – und prüfen kostenlos den Zustand. Nur 89€ pro Einfamilienhaus. Termine schnell vergeben – jetzt anrufen: [Telefon folgt]."
          }
        ]
      },
      {
        heading: "DACH NOTFALL? Wir sind in 60 Minuten bei Ihnen – 24/7!",
        text: "Sturm, Hagel, Wassereinbruch – wenn Ihr Dach beschädigt ist, zählt jede Minute. Jede Stunde, die Sie warten, bedeutet: mehr Wasser im Haus, mehr Schaden, höhere Kosten. Unser Sofort-Hilfe-Team ist JETZT erreichbar unter [Telefon folgt]. In 60 Minuten sind wir vor Ort, dichten Ihr Dach provisorisch ab und verhindern weitere Schäden. Die Kosten? Oft übernimmt die Versicherung – wir helfen bei der Dokumentation.",
        subsections: [
          {
            heading: "Sturmschaden? SO bekommen Sie Ihr Geld von der Versicherung",
            text: "Nach einem Sturm ist schnelles Handeln entscheidend – nicht nur für Ihr Dach, sondern auch für die Versicherung. Wir dokumentieren den Schaden mit Fotos und Protokoll, führen die Notabdichtung durch und erstellen einen Kostenvoranschlag für Ihre Versicherung. Erfahrungsgemäß werden 90% der Kosten erstattet – wenn Sie richtig dokumentieren. Wir wissen, wie das geht."
          },
          {
            heading: "Wasserflecken an der Decke? Das ist ein NOTSIGNAL!",
            text: "Wenn Sie Wasserflecken sehen, ist das Wasser schon seit Tagen oder Wochen in Ihrem Haus. Die Dämmung ist durchnässt, Holz fault, Schimmel wächst. Je länger Sie warten, desto teurer wird es. Wir lokalisieren die undichte Stelle mit Wärmebildkamera und Feuchtemesstechnik und dichten sie sofort ab. Zögern Sie nicht – rufen Sie JETZT an: [Telefon folgt]."
          },
          {
            heading: "Dachreparatur München: Kleine Reparatur, große Wirkung",
            text: "Nicht jeder Schaden braucht eine teure Sanierung. Oft reichen ein paar neue Ziegel (ab 93€), eine Neuversiegelung oder eine Kleinreparatur (ab 175€). Wir prüfen ehrlich, was wirklich nötig ist – und machen nicht mehr als nötig. Das ist unser Versprechen. Deshalb empfehlen uns 94% unserer Kunden weiter."
          },
          {
            heading: "Sofort-Hilfe-Preise: Fair und transparent – auch nachts und am Wochenende",
            text: "Unsere Preise sind auch im Notfall fair: Anfahrt + Erstabdichtung ab 175€, Sofort-Hilfe-Zuschlag außerhalb der Geschäftszeiten 93-118€. Keine bösen Überraschungen, keine versteckten Kosten. Sie bekommen einen Festpreis, bevor wir anfangen. Und wenn die Versicherung zahlt, übernehmen wir die Abwicklung."
          }
        ]
      },
      {
        heading: "Flachdach undicht? Die versteckte Gefahr, die Ihr Haus zerstört",
        text: "Flachdächer sind die Problemkinder unter den Dächern. Stehendes Wasser, UV-Strahlung, Temperaturschwankungen – jedes Jahr versagen tausende Flachdach-Abdichtungen in München. Das Tückische: Sie sehen es nicht, bis das Wasser durchkommt. Dann ist die Dämmung durchnässt, die Decke fleckig, und die Sanierung kostet das Dreifache. Wir prüfen Ihr Flachdach für nur 150€ – und sagen Ihnen ehrlich, wie lange es noch hält.",
        subsections: [
          {
            heading: "Die 4 Flachdach-Killer, die jeder Hausbesitzer kennen muss",
            text: "1. Pfützenbildung – stehendes Wasser drückt durch die kleinsten Risse. 2. Schrumpfende Dichtungsbahnen – nach 15-20 Jahren reißen die Nähte. 3. Durchdringungen – jede Antenne, jedes Rohr, jeder Lichtschacht ist eine potenzielle Schwachstelle. 4. Verstopfte Abläufe – Laub und Dreck stauen das Wasser. Erkennen Sie eines dieser Probleme? Rufen Sie JETZT an, bevor der nächste Starkregen kommt: [Telefon folgt]."
          },
          {
            heading: "EPDM, Bitumen oder Flüssigkunststoff? Die richtige Wahl spart Tausende!",
            text: "Nicht jede Abdichtung passt zu jedem Flachdach. EPDM-Folien halten 50+ Jahre, kosten aber mehr. Bitumenbahnen sind der Klassiker – bewährt und günstig. Flüssigkunststoff ist perfekt bei vielen Durchdringungen. Wir beraten Sie ehrlich, welches System für Ihr Dach das beste Preis-Leistungs-Verhältnis bietet. Keine Verkaufstricks – nur Fakten. Deshalb empfehlen uns 94% unserer Kunden weiter."
          }
        ]
      },
      {
        heading: "Schluss mit Preisangst: SO viel kostet ein Dachdecker in München wirklich",
        text: "Sie haben Angst vor der Rechnung? Das verstehen wir. Viele Hausbesitzer werden von Dachdeckern abgezockt: unklare Angebote, versteckte Kosten, böse Überraschungen. Bei uns nicht. Wir nennen Ihnen den Preis VOR Arbeitsbeginn – und der gilt. Punkt. Dachinspektion: 150€. Kleine Reparatur: ab 175€. Komplettsanierung: 93-299€/m² je nach Umfang. Alles inklusive. Kein Kleingedrucktes.",
        subsections: [
          {
            heading: "Kostenlose Erstberatung – ohne Kaufzwang, ohne Druck",
            text: "Rufen Sie an, wir kommen vorbei, schauen uns Ihr Dach an und sagen Ihnen, was zu tun ist. Kostenlos. Erst wenn Sie uns beauftragen, entstehen Kosten. Und selbst dann: Sie bekommen einen schriftlichen Festpreis, bevor wir anfangen. Keine Überraschungen, versprochen. Das ist unser Geschäftsmodell – und der Grund, warum wir seit 25 Jahren wachsen."
          },
          {
            heading: "Förderung verschenken? Das muss nicht sein!",
            text: "Viele Hausbesitzer wissen nicht, dass der Staat bis zu 20% ihrer Dachsanierung bezahlt. KfW-Förderung, BAFA-Zuschuss, Steuerbonus – wir kennen alle Programme und helfen Ihnen kostenlos bei der Antragstellung. Warum sollten Sie Geld verschenken? Rufen Sie an und lassen Sie sich beraten: [Telefon folgt]."
          }
        ]
      },
      {
        heading: "Dachdecker München Nord – Schwabing, Milbertshofen, Feldmoching",
        text: "Im Münchner Norden sind wir Ihr lokaler Dachdecker. In Schwabing sanieren wir historische Altbauten und moderne Stadthäuser. In Milbertshofen-Am Hart und Feldmoching-Hasenbergl betreuen wir Ein- und Mehrfamilienhäuser. Kurze Anfahrt aus Obermenzing – schnelle Hilfe bei Dachproblemen. Dachdecker Schwabing, Dachdecker Milbertshofen, Dachdecker Feldmoching – wir sind für Sie da.",
        subsections: [
          {
            heading: "Dachdecker Schwabing",
            text: "Schwabing mit seinen Altbauten aus der Gründerzeit stellt besondere Anforderungen an Dacharbeiten. Wir sanieren denkmalgeschützte Dächer, erneuern Schiefereindeckungen und führen energetische Modernisierungen durch – immer in Abstimmung mit dem Denkmalschutz."
          },
          {
            heading: "Dachdecker Milbertshofen und Hasenbergl",
            text: "In Milbertshofen-Am Hart und dem Hasenbergl betreuen wir Einfamilienhäuser, Reihenhäuser und Wohnanlagen. Vom Garagendach bis zur Komplettsanierung – wir sind Ihr Ansprechpartner für alle Dacharbeiten im Münchner Norden."
          }
        ]
      },
      {
        heading: "Dachdecker München West – Pasing, Laim, Aubing, Obermenzing",
        text: "Im Münchner Westen kennen wir uns bestens aus – unser Firmensitz liegt in Obermenzing! Dachdecker Pasing, Dachdecker Laim, Dachdecker Aubing und Dachdecker Nymphenburg: Wir sind innerhalb von 15 Minuten bei Ihnen vor Ort. Die Mischung aus historischen Villen und modernen Neubauten erfordert vielseitige Kompetenz – die wir mitbringen.",
        subsections: [
          {
            heading: "Dachdecker Pasing und Obermenzing",
            text: "Pasing und Obermenzing sind geprägt von Einfamilienhäusern und Villen mit großen Grundstücken. Wir sanieren Steildächer, Flachdächer und Garagendächer. Viele unserer Stammkunden kommen aus diesem Gebiet – Empfehlungen sprechen für unsere Qualität."
          },
          {
            heading: "Dachdecker Laim und Nymphenburg",
            text: "In Laim und Nymphenburg betreuen wir sowohl moderne Mehrfamilienhäuser als auch historische Gebäude nahe dem Schloss. Dachsanierung, Dachreparatur und Spenglerarbeiten – alles aus einer Hand."
          }
        ]
      },
      {
        heading: "Dachdecker München Ost – Bogenhausen, Trudering, Berg am Laim",
        text: "Auch im Münchner Osten sind wir schnell vor Ort. Dachdecker Bogenhausen für repräsentative Villen, Dachdecker Trudering-Riem für Einfamilienhäuser und Dachdecker Berg am Laim für Mehrfamilienhäuser – wir kennen die besonderen Anforderungen jedes Stadtteils.",
        subsections: [
          {
            heading: "Dachdecker Bogenhausen",
            text: "Bogenhausen ist einer der gehobenen Stadtteile Münchens. Hier sanieren wir anspruchsvolle Villen und Stadthäuser mit besonderen Dachformen. Qualität und Diskretion sind selbstverständlich. Referenzen auf Anfrage."
          },
          {
            heading: "Dachdecker Trudering und Riem",
            text: "Trudering-Riem mit der Messestadt bietet eine Mischung aus älteren Einfamilienhäusern und modernen Neubauten. Wir sanieren Dächer aller Altersklassen – vom 60er-Jahre-Bungalow bis zum Neubau von 2020."
          }
        ]
      },
      {
        heading: "Dachdecker München Süd – Sendling, Solln, Thalkirchen",
        text: "Im Münchner Süden betreuen wir Kunden in Sendling, Solln, Thalkirchen, Forstenried und Hadern. Dachdecker Sendling für die beliebten Gründerzeit-Häuser, Dachdecker Solln für villenartige Bebauung und Dachdecker Thalkirchen nahe dem Tierpark – wir sind Ihr lokaler Partner.",
        subsections: [
          {
            heading: "Dachdecker Sendling",
            text: "Sendling mit dem beliebten Westpark-Viertel bietet eine Mischung aus Altbauten und Neubauten. Wir sanieren Dächer fachgerecht und beraten zu energetischen Förderungen. Auch Sofort-Hilfe-Einsätze nach Sturm erledigen wir schnell."
          },
          {
            heading: "Dachdecker Solln und Forstenried",
            text: "Solln und Forstenried sind gehobene Wohnlagen mit vielen Einfamilienhäusern. Wir führen Dachsanierungen, Spenglerarbeiten und Wartung durch. Viele Kunden nutzen unsere Dachinspektion für 150€ zur Zustandsprüfung."
          }
        ]
      },
      {
        heading: "Dachdecker Münchner Umland – Grünwald, Puchheim, Germering",
        text: "Auch im Umland bis 25 km sind wir für Sie da. In Grünwald, Puchheim, Gräfelfing, Germering, Planegg und Unterschleißheim führen wir Dacharbeiten durch. Die Anfahrt ist in unserem Festpreis enthalten – keine versteckten Kosten.",
        subsections: [
          {
            heading: "Dachdecker Germering und Puchheim",
            text: "In Germering und Puchheim sind wir regelmäßig im Einsatz. Die Nähe zu unserem Firmensitz in Obermenzing macht kurze Anfahrtswege möglich. Dachsanierung, Flachdach-Abdichtung und Sturmschaden-Reparatur – alles zum Festpreis."
          },
          {
            heading: "Dachdecker Grünwald, Pullach, Gräfelfing",
            text: "Auch Grünwald, Pullach, Gräfelfing und Planegg gehören zu unserem Einzugsgebiet. Die Anfahrt ist kurz und wir sind für Sofort-Hilfe-Einsätze auch hier innerhalb von 2-4 Stunden vor Ort."
          }
        ]
      }
    ],
    faq: [
      {
        question: "Was kostet ein Dachdecker in München pro Stunde?",
        answer: "Ein Dachdecker in München kostet zwischen 45-65€ pro Stunde. Bei Renodex arbeiten wir jedoch mit Festpreisen: Dachinspektion 150€, Kleinreparaturen ab 175€, Dachsanierung 93-299€ pro m². So wissen Sie vorher genau, was Sie bezahlen."
      },
      {
        question: "Wie viel kostet eine komplette Dachsanierung in München?",
        answer: "Eine Dachsanierung in München kostet je nach Umfang: Neueindeckung ohne Dämmung 93-175€/m², mit Wärmedämmung 175-299€/m², Komplettsanierung inkl. Dachstuhl 299-592€/m². Für ein 150m² Dach rechnen Sie mit 14.000-88.000€. Alle Preise inklusive Gerüst, Material und Entsorgung."
      },
      {
        question: "Welche Förderungen gibt es für Dachsanierung 2026?",
        answer: "Für Dachsanierungen 2026 gibt es: KfW-Zuschuss bis 20% (max. 60.000€), BAFA-Förderung für Einzelmaßnahmen, Steuerbonus 20% über 3 Jahre (max. 40.000€). Wichtig: Antrag VOR Baubeginn stellen. Wir helfen kostenlos bei der Antragstellung."
      },
      {
        question: "Wie schnell kommt der Dach Sofort-Hilfe München?",
        answer: "Der Renodex Sofort-Hilfe München ist innerhalb von 60 Minuten bei Ihnen vor Ort. Wir sind 24/7 erreichbar unter [Telefon folgt]. Sofortige Notabdichtung bei Sturmschäden, Wassereintritt und undichten Dächern. Kosten: ab 175€ + ggf. Wochenendzuschlag."
      },
      {
        question: "Wie lange dauert eine Dachsanierung bei einem Einfamilienhaus?",
        answer: "Eine komplette Dachsanierung bei einem Einfamilienhaus (ca. 150m²) dauert 2-4 Wochen. Teilsanierungen 1-2 Wochen. Kleine Reparaturen oft am selben Tag. Die genaue Dauer hängt von Dachgröße, Umfang der Arbeiten und Wetter ab."
      },
      {
        question: "Woran erkenne ich, dass mein Dach saniert werden muss?",
        answer: "Anzeichen für Sanierungsbedarf: 1. Wasserflecken an Decken/Wänden, 2. Lose oder fehlende Dachziegel, 3. Moos und Flechten auf dem Dach, 4. Hohe Heizkosten (über 1.500€/Jahr), 5. Dach älter als 35-40 Jahre. Bei diesen Warnsignalen empfehlen wir eine Dachinspektion für 150€."
      },
      {
        question: "Zahlt die Versicherung bei Sturmschaden am Dach?",
        answer: "Ja, die Wohngebäudeversicherung übernimmt Sturmschäden am Dach meist vollständig. Wichtig: Schaden sofort dokumentieren (Fotos), Notabdichtung durchführen lassen, Versicherung innerhalb 48h informieren. Renodex übernimmt die komplette Dokumentation und Kommunikation mit Ihrer Versicherung."
      },
      {
        question: "Wie finde ich einen guten Dachdecker in München?",
        answer: "Achten Sie auf: 1. Partnernetzwerk mit HWK-Eintragung, 2. Transparente Festpreise vor Arbeitsbeginn, 3. Schriftliche Garantie (mind. 5 Jahre), 4. Positive Google-Bewertungen (4,5+ Sterne), 5. Kostenlose Erstberatung. Renodex erfüllt alle Kriterien: Partnernetzwerk, 4.9 Sterne, 10 Jahre Garantie."
      }
    ]
  },
  "/leistungen": {
    h1: "Dacharbeiten München – Professionell, Schnell & mit Festpreis",
    intro: "Die Renodex bietet Ihnen professionelle Dacharbeiten München und Umgebung. Als Dachdecker München, Partnernetzwerk, decken wir das komplette Spektrum ab: Von der Dachsanierung München über Dachreparatur München bis zur Flachdach Abdichtung München. Ob Steildach oder Flachdach, Neubau oder Altbau – wir sind Ihr kompetenter Partner für alle Dachthemen. Unser Sofort-Hilfe Dach München ist 24/7 erreichbar. Kontaktieren Sie uns für eine kostenlose Beratung: [Telefon folgt].",
    sections: [
      {
        heading: "Dachsanierung München – Komplettsanierung und Teilsanierung",
        text: "Die Dachsanierung München ist unsere Kernkompetenz. Wir sanieren Ihr Dach von Grund auf – von der Dachstuhlprüfung über die Dämmung bis zur kompletten Neueindeckung. Unsere Dachsanierung erfolgt nach aktuellen EnEV-Standards und berechtigt Sie zu KfW-Förderungen von bis zu 20%. Jede Sanierung beginnt mit einer professionellen Inspektion für nur 150€.",
        subsections: [
          {
            heading: "Steildachsanierung",
            text: "Wir sanieren Satteldächer, Walmdächer, Mansarddächer und alle anderen Steildachformen. Unsere Leistungen umfassen: Dachstuhlprüfung und -reparatur, Dämmung nach EnEV, Unterspannbahn, neue Dachziegel oder Dachsteine, Dachfenster, Dachrinnen und Schneefanggitter. Alle Arbeiten inklusive Gerüst und Entsorgung."
          },
          {
            heading: "Energetische Dachsanierung",
            text: "Bis zu 30% der Heizenergie geht über ein ungedämmtes Dach verloren. Unsere energetische Dachsanierung verbessert die Wärmedämmung Ihres Daches nach aktuellen Standards. Sie sparen Heizkosten, steigern den Wohnkomfort und erhöhen den Immobilienwert. Förderfähig durch KfW und BAFA."
          }
        ]
      },
      {
        heading: "Flachdach abdichten München – Sanierung & Dämmung",
        text: "Flachdach abdichten München erfordert Spezialkenntnisse und hochwertige Materialien. Wir sanieren Flachdächer, Garagendächer und Terrassendächer mit modernen Abdichtungssystemen. EPDM-Folien, Bitumenbahnen, Flüssigkunststoff oder nachhaltige Gründach-Lösungen – wir finden die optimale Lösung für Ihr Flachdach abdichten München.",
        subsections: [
          {
            heading: "Flachdach-Abdichtung",
            text: "Wir arbeiten mit den besten Materialien am Markt: EPDM-Folien für langlebige Abdichtung (50+ Jahre Lebensdauer), Bitumenbahnen für klassische Lösungen, Flüssigkunststoff für nahtlose Oberflächen bei komplexen Geometrien. Alle Systeme mit 10-Jahres-Garantie."
          },
          {
            heading: "Garagendach und Carport",
            text: "Speziell für Garagendächer und Carports bieten wir kostengünstige Sanierungslösungen. Von der einfachen Abdichtung bis zur kompletten Neueindeckung – wir sanieren Ihr Garagendach schnell und zum Festpreis. Auch Gründach-Optionen verfügbar."
          }
        ]
      },
      {
        heading: "Dachreparatur München – Schnelle Hilfe bei Schäden",
        text: "Schnelle Dachreparatur bei undichten Stellen, defekten Dachziegeln oder beschädigten Dachrinnen. Oft können wir Schäden noch am selben Tag beheben. Bei akuten Problemen steht unser 24/7 Sofort-Hilfe bereit. Rufen Sie uns an: [Telefon folgt].",
        subsections: [
          {
            heading: "Typische Reparaturen",
            text: "Zu unseren häufigsten Reparaturarbeiten gehören: Austausch gebrochener Dachziegel, Reparatur undichter Stellen, Erneuerung defekter Dachrinnen, Abdichtung von Dachfenstern, Reparatur von Schornsteinanschlüssen und Sturmschadenbehebung."
          },
          {
            heading: "Dach Sofort-Hilfe 24/7",
            text: "Bei Sturmschäden, Wassereintritt oder anderen akuten Problemen ist unser Sofort-Hilfe innerhalb von 2-4 Stunden vor Ort. Wir führen eine sofortige Abdichtung durch und planen die dauerhafte Reparatur. Versicherungsabwicklung inklusive."
          }
        ]
      },
      {
        heading: "Spengler München – Dachrinnen und Metallarbeiten",
        text: "Professionelle Spenglerarbeiten: Dachrinnen, Fallrohre, Gauben, Kaminverkleidungen, Attiken und Metallbedachungen in Kupfer, Zink oder Aluminium. Unsere Spengler arbeiten mit traditionellen Handwerkstechniken und modernsten Werkzeugen für perfekte Ergebnisse.",
        subsections: [
          {
            heading: "Dachrinnen und Entwässerung",
            text: "Defekte Dachrinnen verursachen teure Wasserschäden an Fassade und Fundament. Wir montieren neue Dachrinnen in allen gängigen Materialien: Kupfer (50+ Jahre), Titanzink, Aluminium. Inklusive Fallrohre, Rinnenhalter und Anschluss an die Kanalisation."
          },
          {
            heading: "Gauben und Metallverkleidungen",
            text: "Gauben erweitern Ihren Wohnraum und bringen Licht ins Dachgeschoss. Wir fertigen Schleppgauben, Spitzgauben und Flachdachgauben nach Maß. Kaminverkleidungen, Attiken und Ortgangbleche in Handarbeit gefertigt."
          }
        ]
      },
      {
        heading: "Dachdecker Regionen München",
        text: "Als lokaler Dachdecker sind wir in ganz München und Umgebung für Sie da. Kurze Anfahrtswege bedeuten schnelle Hilfe und faire Preise. Wir arbeiten in allen Münchner Stadtteilen und im Umland.",
        subsections: [
          {
            heading: "Münchner Stadtteile",
            text: "Schwabing, Bogenhausen, Sendling, Pasing, Laim, Trudering, Neuhausen, Maxvorstadt, Au-Haidhausen, Giesing, Moosach, Milbertshofen, Feldmoching, Allach, Aubing, Obermenzing, Nymphenburg, Thalkirchen, Solln, Forstenried."
          },
          {
            heading: "Münchner Umland",
            text: "Grünwald, Puchheim, Germering, Unterschleißheim, Garching, Ismaning, Unterföhring, Pullach, Planegg, Gräfelfing, Ottobrunn, Haar, Oberhaching, Taufkirchen, Neubiberg."
          }
        ]
      }
    ],
    faq: [
      {
        question: "Welche Dacharbeiten bietet Renodex an?",
        answer: "Wir bieten das komplette Spektrum: Dachsanierung, Dachreparatur, Flachdach-Abdichtung, Spenglerarbeiten (Dachrinnen, Gauben, Metallverkleidungen), Dachfenster-Einbau, Dachdämmung und 24/7 Sofort-Hilfe."
      },
      {
        question: "In welchen Regionen arbeitet Renodex?",
        answer: "Wir arbeiten in ganz München und im Umland bis 25 km: alle Stadtteile von Schwabing bis Solln sowie Grünwald, Puchheim, Gräfelfing, Planegg, Germering, Unterschleißheim, Garching und Ottobrunn."
      },
      {
        question: "Wie bekomme ich ein Angebot?",
        answer: "Rufen Sie uns an unter [Telefon folgt] oder nutzen Sie unser Kontaktformular. Nach einer kostenlosen Erstberatung erhalten Sie innerhalb von 48 Stunden ein detailliertes Festpreisangebot."
      },
      {
        question: "Gibt es Garantie auf die Arbeiten?",
        answer: "Ja, wir gewähren auf alle Arbeiten eine 10-Jahres-Garantie. Zusätzlich erhalten Sie Herstellergarantien auf die verwendeten Materialien."
      }
    ]
  },
  "/notdienst": {
    h1: "Dach Sofort-Hilfe München 24/7 – Soforthilfe bei Sturmschaden",
    intro: "Sturmschaden, undichtes Dach oder Wassereintritt? Der Sofort-Hilfe Dach München der Renodex ist 24 Stunden am Tag, 7 Tage die Woche für Sie erreichbar. Bei akuten Dachproblemen zählt jede Minute – je schneller wir vor Ort sind, desto geringer der Schaden. Unser erfahrenes Dachreparatur München Team ist innerhalb von 60 Minuten bei Ihnen und führt sofortige Maßnahmen durch. Rufen Sie uns jetzt an unter [Telefon folgt] – wir helfen sofort, auch an Wochenenden und Feiertagen.",
    sections: [
      {
        heading: "Sturmschaden Dach München – Schnelle Hilfe nach Unwetter",
        text: "Nach Föhnstürmen, Hagelschlag oder Unwetter können erhebliche Schäden an Ihrem Dach entstehen. Abgedeckte Dachziegel, durchgeschlagene Firstpfannen oder beschädigte Dachrinnen müssen sofort gesichert werden, um Folgeschäden zu verhindern. Unser Sofort-Hilfe-Team führt eine sofortige Erstabdichtung durch und schützt Ihr Gebäude vor weiterem Wassereintritt.",
        subsections: [
          {
            heading: "Typische Sturmschäden am Dach",
            text: "Häufige Sturmschäden sind: abgedeckte oder verschobene Dachziegel, durchgeschlagene oder zerbrochene Pfannen, beschädigte Firstkappen, verbogene Dachrinnen, umgeknickte Schneefanggitter und beschädigte Dachfenster. Auch herabfallende Äste können massive Schäden verursachen."
          },
          {
            heading: "Notabdichtung und Erstversorgung",
            text: "Bei der Erstversorgung sichern wir das Dach mit Planen, ersetzen lose Ziegel provisorisch und dichten kritische Stellen ab. So ist Ihr Gebäude geschützt, bis die dauerhafte Reparatur erfolgen kann. Wir dokumentieren alle Schäden fotografisch für Ihre Versicherung."
          }
        ]
      },
      {
        heading: "Undichtes Dach München – Wassereintritt stoppen",
        text: "Bei einem undichten Dach zählt jede Minute. Wasserschäden an Dämmung, Dachstuhl und Innenräumen können schnell teuer werden. Wir lokalisieren die undichte Stelle mit modernster Technik und führen eine sofortige Abdichtung durch. Unser Ziel: Weiteren Wassereintritt verhindern und Folgeschäden minimieren.",
        subsections: [
          {
            heading: "Ursachen für undichte Dächer",
            text: "Häufige Ursachen für undichte Dächer sind: alterungsbedingte Risse in Dachziegeln, defekte Anschlüsse an Schornsteinen und Dachfenstern, verstopfte Dachrinnen mit Wasserrückstau, poröse Abdichtungen bei Flachdächern und mangelhaft ausgeführte Vorarbeiten."
          },
          {
            heading: "Leckageortung und Abdichtung",
            text: "Mit Feuchtemessgeräten und thermografischer Analyse lokalisieren wir undichte Stellen präzise – auch bei versteckten Leckagen. Dann führen wir eine fachgerechte Abdichtung durch: je nach Situation mit Spezialfolien, Flüssigkunststoff oder Reparaturmörtel."
          }
        ]
      },
      {
        heading: "Versicherungsabwicklung bei Sturmschäden",
        text: "Wir übernehmen die komplette Versicherungsabwicklung bei Sturmschäden und kommunizieren direkt mit Ihrem Versicherer. Sie haben weniger Stress und Ihr Schaden wird schnell reguliert. In den meisten Fällen übernimmt die Wohngebäudeversicherung die Kosten für Sturmschäden am Dach.",
        subsections: [
          {
            heading: "Dokumentation für die Versicherung",
            text: "Wir erstellen eine detaillierte Dokumentation mit Fotos, Schadenbeschreibung und Kostenvoranschlag. Diese Unterlagen reichen Sie bei Ihrer Versicherung ein oder wir übernehmen die direkte Kommunikation mit Ihrem Sachverständigen."
          },
          {
            heading: "Welche Schäden zahlt die Versicherung?",
            text: "Die Wohngebäudeversicherung deckt in der Regel Sturmschäden ab Windstärke 8 und Hagelschäden. Auch Schäden durch herabfallende Äste oder Fremdkörper sind meist versichert. Wir beraten Sie zu Ihren Ansprüchen."
          }
        ]
      },
      {
        heading: "Sofort-Hilfe Einsatzgebiet München",
        text: "Unser Dach Sofort-Hilfe ist in ganz München und Umgebung im Einsatz. Innerhalb von 2-4 Stunden sind wir bei Ihnen vor Ort – auch an Wochenenden und Feiertagen. Rufen Sie uns an: [Telefon folgt].",
        subsections: [
          {
            heading: "Schnelle Anfahrt in München",
            text: "Schwabing, Bogenhausen, Sendling, Pasing, Laim, Trudering, Neuhausen, Maxvorstadt, Au-Haidhausen und alle weiteren Stadtteile erreichen wir innerhalb von 60 Minuten. Im Umland bis 25 km (Grünwald, Puchheim, Germering) innerhalb von 90 Minuten."
          },
          {
            heading: "Sofort-Hilfe Kosten",
            text: "Die Kosten für den Sofort-Hilfe-Einsatz hängen vom Umfang der Arbeiten ab. Die Anfahrt bei Notfällen ist kostenlos. Sie erhalten vor Ort eine transparente Kostenschätzung – keine Überraschungen. Bei Sturmschäden übernimmt oft die Versicherung."
          }
        ]
      }
    ],
    faq: [
      {
        question: "Wie schnell ist der Dach Sofort-Hilfe vor Ort?",
        answer: "Unser Sofort-Hilfe-Team ist in München innerhalb von 2-4 Stunden bei Ihnen. Bei akuten Wasserschäden priorisieren wir den Einsatz und sind oft noch schneller vor Ort."
      },
      {
        question: "Was kostet der Dach Sofort-Hilfe?",
        answer: "Die Anfahrt bei Notfällen ist kostenlos. Die Kosten für die Arbeiten hängen vom Umfang ab und werden vor Ort transparent kommuniziert. Bei Sturmschäden übernimmt meist die Versicherung."
      },
      {
        question: "Ist die Sofort-Hilfe auch am Wochenende erreichbar?",
        answer: "Ja, unser Sofort-Hilfe ist 24/7 erreichbar – auch an Wochenenden und Feiertagen. Rufen Sie uns an unter [Telefon folgt], wir helfen sofort."
      },
      {
        question: "Zahlt die Versicherung Sturmschäden am Dach?",
        answer: "In der Regel ja. Die Wohngebäudeversicherung deckt Sturmschäden ab Windstärke 8 und Hagelschäden. Wir unterstützen Sie bei der Dokumentation und Kommunikation mit der Versicherung."
      }
    ]
  },
  "/faq": {
    h1: "Dachdecker München FAQ – Kosten, Ablauf & häufige Fragen",
    intro: "Häufige Fragen zu Dacharbeiten, Preisen und Ablauf. Bei Renodex erhalten Sie transparente Festpreise und eine ehrliche Beratung. Unsere Dachinspektion kostet ab 150€ – so wissen Sie genau, welche Arbeiten nötig sind.",
    sections: [
      {
        heading: "Preise und Kosten",
        text: "Transparente Festpreise ohne versteckte Kosten. Dachinspektion 150€, Dachreparaturen ab 175€, Dachsanierung 150-300€/m². Alle Preise inkl. Material und Anfahrt."
      },
      {
        heading: "Termine und Verfügbarkeit",
        text: "Normale Termine innerhalb von 1-2 Wochen. Sofort-Hilfe: Innerhalb von 2-4 Stunden vor Ort – auch am Wochenende und Feiertagen."
      },
      {
        heading: "Garantie und Qualität",
        text: "10-Jahres-Gewährleistung auf alle Arbeiten. Zusätzlich Herstellergarantien auf verwendete Materialien. Partnernetzwerk aus geprüften Partner-Meisterfirmen."
      }
    ],
    faq: [
      {
        question: "Was kostet eine Dachinspektion in München?",
        answer: "Eine professionelle Dachinspektion durch unseren Meister kostet 150€ inkl. MwSt. Sie erhalten einen detaillierten Zustandsbericht mit Handlungsempfehlungen und Kostenschätzung für notwendige Arbeiten."
      },
      {
        question: "Wie schnell können Sie einen Termin machen?",
        answer: "Für normale Aufträge bieten wir Termine innerhalb von 1-2 Wochen. Bei Notfällen ist unser Sofort-Hilfe innerhalb von 2-4 Stunden vor Ort – auch an Wochenenden und Feiertagen."
      },
      {
        question: "Gibt es eine Garantie auf Ihre Dacharbeiten?",
        answer: "Ja, wir gewähren auf alle Arbeiten eine 10-Jahres-Gewährleistung. Zusätzlich erhalten Sie Herstellergarantien auf die verwendeten Materialien wie Dachziegel, Abdichtungen und Dachrinnen."
      },
      {
        question: "Was kostet eine Dachsanierung pro Quadratmeter?",
        answer: "Die Kosten für eine Dachsanierung liegen zwischen 150-300€ pro Quadratmeter, je nach Umfang. Neueindeckung ohne Dämmung: 93-175€/m². Mit Wärmedämmung: 175-299€/m². Komplettsanierung inkl. Dachstuhl: 299-592€/m²."
      },
      {
        question: "Übernimmt die Versicherung Sturmschäden am Dach?",
        answer: "In der Regel ja. Die Wohngebäudeversicherung deckt Sturmschäden ab Windstärke 8 und Hagelschäden. Wir unterstützen Sie bei der Dokumentation und übernehmen die Kommunikation mit Ihrer Versicherung."
      },
      {
        question: "Arbeiten Sie auch am Wochenende?",
        answer: "Unser Sofort-Hilfe ist 24/7 erreichbar, auch an Wochenenden und Feiertagen. Reguläre Arbeiten führen wir Montag bis Freitag von 08:00 bis 16:30 Uhr aus."
      },
      {
        question: "Bieten Sie kostenlose Kostenvoranschläge?",
        answer: "Die Erstberatung vor Ort ist immer kostenlos. Für ein detailliertes Festpreisangebot empfehlen wir eine Dachinspektion für 150€, die bei Auftragserteilung verrechnet wird."
      },
      {
        question: "Welche Zahlungsmöglichkeiten gibt es?",
        answer: "Wir akzeptieren Banküberweisung, Barzahlung und EC-Karte. Bei größeren Projekten bieten wir auch Teilzahlungen nach Baufortschritt an."
      }
    ]
  },
  "/kontakt": {
    h1: "Dachdecker München Kontakt – Angebot in 24 Stunden",
    intro: "Kontaktieren Sie die Renodex für eine kostenlose Beratung. Wir erstellen Ihnen ein transparentes Festpreisangebot für Ihr Dachprojekt. Erreichen Sie uns telefonisch unter [Telefon folgt] oder besuchen Sie uns in der [Adresse folgt].",
    sections: [
      {
        heading: "Unsere Adresse",
        text: "Renodex, [Adresse folgt]-Obermenzing. Telefon: [Telefon folgt], E-Mail: info@renodex.de"
      },
      {
        heading: "Öffnungszeiten",
        text: "Montag bis Freitag: 08:00 - 16:30 Uhr. Sofort-Hilfe: 24/7 erreichbar unter [Telefon folgt]."
      }
    ]
  },
  "/ueber-uns": {
    h1: "Dachdecker München – Partnernetzwerk",
    intro: "Die Renodex ist ein eingetragener Partnernetzwerk bei der Handwerkskammer München. Seit 1998 sanieren und reparieren wir Dächer in München und Umgebung. Über 100 zufriedene Kunden vertrauen auf unsere Qualität und Zuverlässigkeit.",
    sections: [
      {
        heading: "Unser Team",
        text: "Unser Team besteht aus ausgebildeten Dachdeckergesellen und Spenglermeistern mit jahrelanger Berufserfahrung. Wir arbeiten ohne Subunternehmer – Sie haben immer den gleichen Ansprechpartner."
      },
      {
        heading: "Unsere Werte",
        text: "Qualität, Zuverlässigkeit und Ehrlichkeit sind die Grundpfeiler unserer Arbeit. Wir beraten Sie ehrlich, ob eine Reparatur ausreicht oder eine Sanierung sinnvoller ist."
      }
    ]
  },
  "/impressum": {
    h1: "Impressum – Renodex München",
    intro: "Rechtliche Informationen zur Renodex, Ihrem Partnernetzwerk in München. Hier finden Sie unsere vollständigen Kontaktdaten, Handelsregisterinformationen und rechtliche Angaben gemäß § 5 TMG.",
    sections: [
      {
        heading: "Angaben gemäß § 5 TMG",
        text: "Renodex, [Adresse folgt]. Handelsregister: Amtsgericht München [HRB folgt]. Ausführung durch geprüfte Partner-Meisterfirmen aus unserem Partnernetzwerk."
      },
      {
        heading: "Kontakt",
        text: "Telefon: [Telefon folgt], E-Mail: info@renodex.de, Webseite: https://renodex.de. Erreichbar Montag bis Freitag 08:00 - 16:30 Uhr. Sofort-Hilfe 24/7 unter derselben Nummer."
      },
      {
        heading: "Haftungshinweis",
        text: "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich."
      }
    ]
  },
  "/datenschutz": {
    h1: "Datenschutzerklärung – Renodex",
    intro: "Datenschutz ist uns wichtig. Diese Datenschutzerklärung informiert Sie über die Erhebung und Verarbeitung personenbezogener Daten auf unserer Webseite renodex.de gemäß DSGVO.",
    sections: [
      {
        heading: "Verantwortlicher",
        text: "Verantwortlich für die Datenverarbeitung ist die Renodex, [Adresse folgt]. Kontakt: datenschutz@renodex.de, Tel: [Telefon folgt]."
      },
      {
        heading: "Datenerhebung auf unserer Website",
        text: "Wir erheben nur die Daten, die Sie uns aktiv mitteilen: Name, E-Mail, Telefonnummer und Adresse bei Kontaktanfragen. Diese Daten verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage. Server-Logs werden automatisch gelöscht."
      },
      {
        heading: "Ihre Rechte",
        text: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten. Kontaktieren Sie uns unter datenschutz@renodex.de für alle datenschutzrechtlichen Anliegen."
      }
    ]
  },
  "/ratgeber": {
    h1: "Dach Ratgeber München – Pflege, Wartung & Expertentipps",
    intro: "Im Dach Ratgeber der Renodex finden Sie praktische Tipps, Checklisten und How-To-Guides zu Dachsanierung, Dachreparatur und Dachwartung. Profitieren Sie von über 25 Jahren Dachdecker-Erfahrung in München. Unsere Experten-Anleitungen helfen Ihnen, die richtigen Entscheidungen für Ihr Dach zu treffen.",
    sections: [
      {
        heading: "Checkliste Dachsanierung: Von der Planung bis zur Fertigstellung",
        text: "Phase 1 - Planung & Vorbereitung: Dachinspektion durch Partnernetzwerk beauftragen. Schadensbericht und Sanierungsempfehlung einholen. Kostenvoranschläge von 2-3 Fachbetrieben vergleichen. Energieberatung für Fördermittel-Anspruch prüfen. KfW/BAFA-Förderanträge VOR Baubeginn stellen. Baugenehmigung prüfen bei Dachform-Änderung. Zeitfenster festlegen - April bis Oktober ist ideal. Phase 2 - Durchführung & Abnahme: Gerüst aufstellen lassen mit Verkehrssicherung. Alte Eindeckung und Dämmung entfernen. Dachstuhl auf Schäden prüfen und reparieren. Neue Dämmung nach EnEV-Standard einbauen. Dampfsperre fachgerecht verlegen. Neue Dacheindeckung mit Garantie montieren. Dachrinnen und Anschlüsse erneuern. Abnahme mit Fotodokumentation durchführen."
      },
      {
        heading: "DIY-Inspektion: So erkennen Sie Schäden an Dachziegeln oder Abdichtungen",
        text: "Sicherheitshinweis: Betreten Sie NIEMALS selbst das Dach! Nutzen Sie ein Fernglas vom Boden aus. Sichtprüfung von außen: Fehlende oder verschobene Dachziegel. Gerissene oder gebrochene Ziegel. Moos- oder Algenbefall (Verfärbungen). Durchhängende Dachbereiche. Beschädigte Firstkappen. Rost an Blechverkleidungen. Anzeichen im Dachgeschoss: Wasserflecken an Decke/Wänden. Feuchte oder nasse Dämmung. Muffiger, modriger Geruch. Tageslicht durch Dach sichtbar. Schimmelbildung an Balken. Kondenswasser an Dachfenstern. Dachrinnen & Fallrohre: Überlaufendes Wasser bei Regen. Sichtbare Risse oder Löcher. Durchhängende Rinnenabschnitte. Pflanzen in der Dachrinne. Rostflecken am Mauerwerk. Bei Wasserflecken, Schimmel oder sichtbaren Dachlöchern sofort den Dachdecker Sofort-Hilfe München rufen: [Telefon folgt]."
      },
      {
        heading: "Fördermittel im Überblick: KfW-Programme und steuerliche Vorteile",
        text: "KfW-Förderung für Dachsanierung: KfW 261/262 Einzelmaßnahmen mit bis zu 15% Tilgungszuschuss. KfW 261 Effizienzhaus-Standard mit bis zu 45% bei Komplettsanierung. KfW 270 Erneuerbare Energien für günstige Kredite für Solardach. KfW 159 Altersgerecht Umbauen für Dachfenster mit Barrierefreiheit. BAFA & Steuervorteile: BAFA Energieberatung mit bis zu 80% Zuschuss für Beratung. BAFA Heizungsförderung bei Dachdämmung mit Heizungstausch. §35c EStG Steuerbonus: 20% über 3 Jahre absetzbar. Handwerkerleistungen: 20% der Arbeitskosten absetzbar. Voraussetzungen für Förderung: Antrag VOR Baubeginn stellen. Energieeffizienz-Experte einbinden. U-Wert-Anforderungen erfüllen (0,14-0,20 W/m²K). Partnernetzwerk mit Qualifikation beauftragen."
      },
      {
        heading: "Wann ist eine Dachsanierung nötig?",
        text: "Typische Anzeichen für Sanierungsbedarf sind: undichte Stellen, beschädigte Ziegel, Moos- und Flechtenbewuchs, mangelnde Dämmung oder ein Alter von über 40 Jahren. Eine professionelle Dachinspektion gibt Klarheit. Unser Tipp: Eine Dachsanierung München sollte mindestens 3-6 Monate im Voraus geplant werden."
      },
      {
        heading: "Dachpflege für jede Jahreszeit",
        text: "Frühling: Dachrinnen reinigen nach Laub und Schnee. Dachziegel Kontrolle auf Frostschäden. Moos und Algen entfernen. Sommer: Ideale Zeit für Dachsanierung planen. Dachdämmung verbessern für Hitzeschutz. Herbst: Dachrinnenreinigung vor Laubfall. Dachziegel prüfen und befestigen. Dach abdichten vor Herbststürmen. Winter: Schneelast beobachten. Eiszapfen vorsichtig entfernen lassen. Bei Dach undicht sofort Sofort-Hilfe rufen."
      }
    ]
  },
  "/sturmschaden": {
    h1: "Sturmschaden Dach München – Dachdecker Soforthilfe & Reparatur",
    intro: "Sturmschaden am Dach? Die Renodex bietet Ihnen 24/7 Soforthilfe bei Sturmschäden in München. Wir sichern Ihr Dach, dokumentieren den Schaden und übernehmen die Versicherungsabwicklung. Rufen Sie uns an: [Telefon folgt].",
    sections: [
      {
        heading: "Was tun bei Sturmschaden?",
        text: "1. Rufen Sie uns an: [Telefon folgt]. 2. Betreten Sie nicht das Dach – Unfallgefahr! 3. Dokumentieren Sie sichtbare Schäden von unten. 4. Melden Sie den Schaden Ihrer Versicherung. Wir sind schnell vor Ort und kümmern uns um alles Weitere."
      }
    ]
  },
  "/dach-undicht": {
    h1: "Dach undicht München – Leckortung & Reparatur vom Meister",
    intro: "Ihr Dach ist undicht? Die Renodex bietet schnelle Hilfe bei Wassereintritt in München. Unser Sofort-Hilfe ist 24/7 erreichbar und stoppt den Wasserschaden. Kontaktieren Sie uns: [Telefon folgt].",
    sections: [
      {
        heading: "Ursachen für undichte Dächer",
        text: "Häufige Ursachen sind: beschädigte oder verschobene Ziegel, defekte Dachrinnen, verstopfte Abläufe, undichte Dachfenster oder Anschlüsse, Alterungsschäden an der Eindeckung. Eine professionelle Leckortung hilft, die Ursache zu finden."
      }
    ]
  },
  "/agb": {
    h1: "AGB – Allgemeine Geschäftsbedingungen der Renodex",
    intro: "Hier finden Sie die Allgemeinen Geschäftsbedingungen der Renodex für Dacharbeiten in München. Unsere AGB regeln die vertraglichen Grundlagen für alle Aufträge transparent und fair.",
    sections: [
      {
        heading: "Geltungsbereich",
        text: "Diese AGB gelten für alle Verträge zwischen der Renodex, [Adresse folgt] und unseren Kunden. Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, wir stimmen ihrer Geltung ausdrücklich schriftlich zu."
      },
      {
        heading: "Vertragsschluss und Angebote",
        text: "Unsere Angebote sind freibleibend. Ein Vertrag kommt zustande durch schriftliche Auftragsbestätigung oder Beginn der Arbeiten. Alle Angebote enthalten Festpreise inkl. Material, Arbeit und Anfahrt – keine versteckten Kosten."
      },
      {
        heading: "Gewährleistung",
        text: "Wir gewähren auf alle Dacharbeiten 10 Jahre Gewährleistung über die gesetzlichen Fristen hinaus. Mängel werden unverzüglich und kostenlos behoben. Herstellergarantien auf Materialien gelten zusätzlich."
      }
    ]
  },
  "/barrierefreiheit": {
    h1: "Barrierefreiheitserklärung – Renodex",
    intro: "Die Renodex setzt sich für digitale Barrierefreiheit ein. Wir arbeiten kontinuierlich daran, unsere Website für alle Nutzer zugänglich zu gestalten.",
    sections: [
      {
        heading: "Unser Engagement",
        text: "Wir bemühen uns, diese Website gemäß WCAG 2.1 Level AA barrierefrei zu gestalten. Dies umfasst: gute Lesbarkeit durch ausreichende Kontraste, Tastaturnavigation, verständliche Texte und Alternativtexte für Bilder."
      },
      {
        heading: "Kontakt bei Barrieren",
        text: "Sollten Sie auf Barrieren stoßen oder Verbesserungsvorschläge haben, kontaktieren Sie uns: info@renodex.de oder [Telefon folgt]. Wir nehmen Ihr Feedback ernst und verbessern unsere Website kontinuierlich."
      }
    ]
  },
  "/cookie": {
    h1: "Cookie-Einstellungen – Renodex",
    intro: "Hier können Sie Ihre Cookie-Präferenzen für die Website der Renodex verwalten. Wir respektieren Ihre Privatsphäre und verwenden nur technisch notwendige Cookies.",
    sections: [
      {
        heading: "Welche Cookies wir verwenden",
        text: "Notwendige Cookies: Session-Cookie für die Formularspeicherung. Analyse-Cookies: Keine – wir verwenden keine Tracking-Tools. Marketing-Cookies: Keine – wir schalten keine personalisierte Werbung. Ihre Daten bleiben bei uns."
      },
      {
        heading: "Ihre Rechte",
        text: "Sie können Cookies jederzeit in Ihrem Browser löschen oder blockieren. Unsere Website funktioniert auch ohne Cookies. Detaillierte Informationen finden Sie in unserer Datenschutzerklärung."
      }
    ]
  },
  "/dach-reparieren": {
    h1: "Dach reparieren München – Schnell, Professionell & zum Festpreis",
    intro: "Ihr Dach muss repariert werden? Die Renodex repariert Ihr Dach schnell und zuverlässig zu fairen Festpreisen. Ob undichte Stellen, beschädigte Ziegel oder Sturmschäden – wir helfen sofort. Rufen Sie an: [Telefon folgt].",
    sections: [
      {
        heading: "Typische Dachreparaturen",
        text: "Wir reparieren: beschädigte und gebrochene Dachziegel, undichte Stellen und Wassereinbrüche, defekte Dachrinnen und Fallrohre, lose First- und Ortgangziegel, undichte Kaminanschlüsse und Dachfenster, Sturmschäden und Hagelschäden."
      },
      {
        heading: "Dach reparieren Kosten",
        text: "Kleine Reparaturen ab 175€. Einzelne Ziegel: 15-35€ pro Stück. Abdichtungen: 75-250€. Dachrinnenreparatur: 45-150€. Firstziegel: 45-95€ pro Stück. Alle Preise inkl. Material, Arbeit und Anfahrt."
      },
      {
        heading: "Schneller Service",
        text: "Reguläre Termine: 1-2 Wochen. Bei Notfällen: Innerhalb von 2-4 Stunden vor Ort. Wir bieten 24/7 Sofort-Hilfe für akute Schäden. Rufen Sie uns an: [Telefon folgt]."
      }
    ]
  },
  "/dachsanierung-kosten": {
    h1: "Dachsanierung Kosten München – Preise & Förderung 2026",
    intro: "Was kostet eine Dachsanierung in München? Bei der Renodex erhalten Sie transparente Festpreise von 93-592€ pro Quadratmeter. Nutzen Sie KfW-Förderungen bis 45.000€ und profitieren Sie von unserer 10-Jahres-Garantie. Kostenlose Beratung: [Telefon folgt].",
    sections: [
      {
        heading: "Dachsanierung Preise pro Quadratmeter",
        text: "Neueindeckung ohne Dämmung: 93-175€/m². Sanierung mit Wärmedämmung: 175-299€/m². Komplettsanierung inkl. Dachstuhl: 299-592€/m². Beispiel 150m² Dach: 14.000-88.000€ je nach Umfang. Alle Preise inkl. Gerüst, Material und Entsorgung."
      },
      {
        heading: "Fördermöglichkeiten 2026",
        text: "KfW-Förderung: Bis zu 45.000€ Zuschuss für energetische Sanierung. BAFA: Bis 80% Zuschuss für Energieberatung. Steuerbonus: 20% der Kosten über 3 Jahre absetzbar. Wir unterstützen Sie bei der Antragstellung."
      },
      {
        heading: "Festpreisgarantie",
        text: "Nach der Dachinspektion (150€) erhalten Sie ein verbindliches Festpreisangebot. Keine Nachforderungen, keine versteckten Kosten. Bei Auftragserteilung wird die Inspektion verrechnet."
      }
    ]
  }
};

// District Content Generator
interface DistrictData {
  slug: string;
  name: string;
  isCity: boolean;
  travelTime: string;
  localInfo: string;
  commonIssues: string[];
}

const districts: DistrictData[] = [
  { slug: "allach", name: "Allach", isCity: false, travelTime: "15-20 Minuten", localInfo: "Allach liegt im Nordwesten Münchens und zeichnet sich durch viele Einfamilienhäuser und Siedlungen aus den 1950er-80er Jahren aus.", commonIssues: ["Sanierungsbedarf bei älteren Ziegeldächern", "Sturmschäden durch exponierte Lage", "Undichte Dachfenster"] },
  { slug: "aubing", name: "Aubing", isCity: false, travelTime: "20-25 Minuten", localInfo: "Aubing ist Münchens westlichster Stadtteil mit vielen Reihenhäusern und Neubaugebieten.", commonIssues: ["Flachdach-Probleme bei Neubauten", "Rinnenreinigung bei Baumbestand", "Dachbegrünung"] },
  { slug: "berg-am-laim", name: "Berg am Laim", isCity: false, travelTime: "20-25 Minuten", localInfo: "Berg am Laim verbindet Altbau-Charme mit modernen Wohnanlagen.", commonIssues: ["Altbausanierung", "Flachdachabdichtung", "Gaubenarbeiten"] },
  { slug: "bogenhausen", name: "Bogenhausen", isCity: false, travelTime: "25-30 Minuten", localInfo: "Bogenhausen zählt zu Münchens exklusivsten Wohnlagen mit historischen Villen.", commonIssues: ["Denkmalschutz-gerechte Sanierung", "Kupferarbeiten", "Schieferdächer"] },
  { slug: "feldmoching", name: "Feldmoching", isCity: false, travelTime: "15-20 Minuten", localInfo: "Feldmoching im Münchner Norden bietet ländlichen Charakter mit vielen Einfamilienhäusern.", commonIssues: ["Komplettsanierung älterer Dächer", "Sturmschäden", "Energetische Sanierung"] },
  { slug: "hadern", name: "Hadern", isCity: false, travelTime: "20-25 Minuten", localInfo: "Hadern liegt im Südwesten Münchens, geprägt von Wohnsiedlungen der Nachkriegszeit.", commonIssues: ["Dachsanierung 1950er-70er Bauten", "Asbest-Entsorgung", "Dachausbau"] },
  { slug: "haidhausen", name: "Haidhausen", isCity: false, travelTime: "20-25 Minuten", localInfo: "Haidhausen ist bekannt für seine Altbauten und das Franzosenviertel.", commonIssues: ["Altbau-Dachsanierung", "Denkmalschutz", "Ziegel-Restaurierung"] },
  { slug: "laim", name: "Laim", isCity: false, travelTime: "15-20 Minuten", localInfo: "Laim verbindet zentrale Lage mit Wohnqualität.", commonIssues: ["Dachreparatur", "Rinnenarbeiten", "Dachfenster"] },
  { slug: "lehel", name: "Lehel", isCity: false, travelTime: "25-30 Minuten", localInfo: "Das Lehel ist Münchens ältester Stadtteil mit historischen Gebäuden.", commonIssues: ["Historische Dachsanierung", "Kupfer- und Zinkarbeiten", "Denkmalschutz"] },
  { slug: "maxvorstadt", name: "Maxvorstadt", isCity: false, travelTime: "20-25 Minuten", localInfo: "Die Maxvorstadt ist das Kunst- und Wissenschaftsviertel Münchens mit vielen Altbauten.", commonIssues: ["Altbau-Dachsanierung", "Dachausbau", "Denkmalschutz"] },
  { slug: "milbertshofen", name: "Milbertshofen", isCity: false, travelTime: "15-20 Minuten", localInfo: "Milbertshofen ist geprägt von Industrie und Wohngebieten im Münchner Norden.", commonIssues: ["Industriedächer", "Flachdachsanierung", "Dachbegrünung"] },
  { slug: "moosach", name: "Moosach", isCity: false, travelTime: "10-15 Minuten", localInfo: "Moosach ist unser direktes Nachbarviertel im Münchner Westen.", commonIssues: ["Einfamilienhaus-Sanierung", "Dachrinnen", "Sturmschäden"] },
  { slug: "neuhausen", name: "Neuhausen", isCity: false, travelTime: "15-20 Minuten", localInfo: "Neuhausen-Nymphenburg ist eines der beliebtesten Wohnviertel Münchens.", commonIssues: ["Altbau-Sanierung", "Dachgeschossausbau", "Dachfenster"] },
  { slug: "nymphenburg", name: "Nymphenburg", isCity: false, travelTime: "15-20 Minuten", localInfo: "Nymphenburg ist geprägt vom berühmten Schloss und gehobenen Wohnlagen.", commonIssues: ["Premium-Dacharbeiten", "Kupferarbeiten", "Denkmalschutz"] },
  { slug: "obermenzing", name: "Obermenzing", isCity: false, travelTime: "5-10 Minuten", localInfo: "Obermenzing ist unser Firmensitz – hier sind wir besonders schnell vor Ort.", commonIssues: ["Alle Dacharbeiten", "Sofort-Hilfe", "Villendächer"] },
  { slug: "obergiesing", name: "Obergiesing", isCity: false, travelTime: "25-30 Minuten", localInfo: "Obergiesing im Münchner Süden bietet eine Mischung aus Alt- und Neubauten.", commonIssues: ["Altbau-Sanierung", "Dachausbau", "Rinnenarbeiten"] },
  { slug: "pasing", name: "Pasing", isCity: false, travelTime: "15-20 Minuten", localInfo: "Pasing ist ein eigenständiges Zentrum im Münchner Westen.", commonIssues: ["Geschäftshausdächer", "Wohnhaus-Sanierung", "Flachdächer"] },
  { slug: "perlach", name: "Perlach", isCity: false, travelTime: "30-35 Minuten", localInfo: "Perlach im Münchner Südosten ist bekannt für Neuperlach mit Hochhäusern.", commonIssues: ["Hochhaus-Dächer", "Flachdachsanierung", "Terrassendächer"] },
  { slug: "ramersdorf", name: "Ramersdorf", isCity: false, travelTime: "25-30 Minuten", localInfo: "Ramersdorf-Perlach liegt im Südosten Münchens.", commonIssues: ["Wohnblock-Dächer", "Flachdachsanierung", "Dachbegrünung"] },
  { slug: "schwabing", name: "Schwabing", isCity: false, travelTime: "20-25 Minuten", localInfo: "Schwabing ist bekannt für Altbauten, Jugendstil und anspruchsvolle Architektur.", commonIssues: ["Jugendstil-Dächer", "Denkmalschutz", "Premium-Materialien"] },
  { slug: "schwanthalerhoehe", name: "Schwanthalerhöhe", isCity: false, travelTime: "15-20 Minuten", localInfo: "Die Schwanthalerhöhe liegt zentral nahe der Theresienwiese.", commonIssues: ["Altbau-Sanierung", "Gewerbe-Dächer", "Dachausbau"] },
  { slug: "sendling", name: "Sendling", isCity: false, travelTime: "20-25 Minuten", localInfo: "Sendling im Münchner Süden ist ein traditionelles Wohnviertel.", commonIssues: ["Altbau-Sanierung", "Dachgeschossausbau", "Rinnenarbeiten"] },
  { slug: "solln", name: "Solln", isCity: false, travelTime: "25-30 Minuten", localInfo: "Solln ist eine gehobene Wohngegend im Münchner Süden mit vielen Villen.", commonIssues: ["Villen-Dächer", "Premium-Materialien", "Schieferarbeiten"] },
  { slug: "trudering", name: "Trudering", isCity: false, travelTime: "30-35 Minuten", localInfo: "Trudering-Riem im Münchner Osten bietet eine Mischung aus Alt und Neu.", commonIssues: ["Einfamilienhaus-Sanierung", "Neubau-Dächer", "Dachgeschossausbau"] },
  { slug: "riem", name: "Riem", isCity: false, travelTime: "30-35 Minuten", localInfo: "Riem im Münchner Osten ist bekannt für die Messestadt und moderne Neubauviertel rund um das ehemalige Flughafengelände.", commonIssues: ["Flachdachabdichtung bei Neubauten", "Terrassendächer", "Dachbegrünung bei modernen Wohnanlagen"] },
  { slug: "untermenzing", name: "Untermenzing", isCity: false, travelTime: "10-15 Minuten", localInfo: "Untermenzing liegt direkt neben unserem Firmensitz in Obermenzing.", commonIssues: ["Alle Dacharbeiten", "Schneller Service", "Einfamilienhäuser"] },
  { slug: "garching", name: "Garching", isCity: true, travelTime: "25-30 Minuten", localInfo: "Garching ist bekannt für die TU München und moderne Architektur.", commonIssues: ["Flachdächer", "Moderne Konstruktionen", "Universitätsgebäude"] },
  { slug: "germering", name: "Germering", isCity: true, travelTime: "20-25 Minuten", localInfo: "Germering ist eine große Kreisstadt westlich von München.", commonIssues: ["Einfamilienhaus-Sanierung", "Reihenhaus-Dächer", "Dachfenster"] },
  { slug: "ottobrunn", name: "Ottobrunn", isCity: true, travelTime: "25-30 Minuten", localInfo: "Ottobrunn liegt südöstlich von München.", commonIssues: ["Einfamilienhaus-Sanierung", "Flachdächer", "Dachgeschossausbau"] },
  { slug: "unterhaching", name: "Unterhaching", isCity: true, travelTime: "25-30 Minuten", localInfo: "Unterhaching ist eine wohlhabende Gemeinde südlich von München, bekannt für moderne Wohngebiete und die Geothermieanlage.", commonIssues: ["Einfamilienhaus-Sanierung", "Flachdächer bei Neubauten", "Energetische Dachsanierung"] },
  { slug: "unterschleissheim", name: "Unterschleißheim", isCity: true, travelTime: "20-25 Minuten", localInfo: "Unterschleißheim liegt nördlich von München.", commonIssues: ["Einfamilienhaus-Sanierung", "Gewerbe-Dächer", "Sturmschäden"] },
  { slug: "haar", name: "Haar", isCity: true, travelTime: "25-30 Minuten", localInfo: "Haar liegt östlich von München und ist eine familienfreundliche Gemeinde mit vielen Einfamilienhäusern und Reihenhaussiedlungen.", commonIssues: ["Einfamilienhaus-Dächer", "Reihenhäuser", "Dachgeschossausbau"] },
  { slug: "taufkirchen", name: "Taufkirchen", isCity: true, travelTime: "25-30 Minuten", localInfo: "Taufkirchen im Münchner Süden bietet eine Mischung aus Wohn- und Gewerbegebieten mit modernen Neubauten.", commonIssues: ["Flachdächer", "Reihenhäuser", "Dachsanierung"] },
  { slug: "graefelfing", name: "Gräfelfing", isCity: true, travelTime: "15-20 Minuten", localInfo: "Gräfelfing westlich von München ist eine gehobene Villenvorstadt mit großzügigen Grundstücken und hochwertigen Dächern.", commonIssues: ["Villen-Dächer", "Premium-Materialien", "Gaubenarbeiten"] },
  { slug: "planegg", name: "Planegg", isCity: true, travelTime: "15-20 Minuten", localInfo: "Planegg liegt südwestlich von München und ist bekannt für den Biotech-Standort Martinsried und gepflegte Wohngebiete.", commonIssues: ["Einfamilienhaus-Sanierung", "Flachdächer", "Energetische Sanierung"] },
  { slug: "pullach", name: "Pullach", isCity: true, travelTime: "20-25 Minuten", localInfo: "Pullach im Isartal südlich von München ist eine wohlhabende Gemeinde mit Villen und historischen Gebäuden entlang der Isar.", commonIssues: ["Villen-Dächer", "Denkmalschutz", "Premium-Materialien"] },
  { slug: "gruenwald", name: "Grünwald", isCity: true, travelTime: "20-25 Minuten", localInfo: "Grünwald an der Isar ist eine der wohlhabendsten Gemeinden Deutschlands mit exklusiven Villen und Anwesen.", commonIssues: ["Villen-Dächer", "Premium-Materialien", "Kupferarbeiten"] },
  { slug: "ismaning", name: "Ismaning", isCity: true, travelTime: "25-30 Minuten", localInfo: "Ismaning nördlich von München ist ein Medienstandort mit modernen Bürogebäuden und gewachsenen Wohngebieten.", commonIssues: ["Gewerbe-Dächer", "Flachdächer", "Einfamilienhaus-Sanierung"] },
  { slug: "oberschleissheim", name: "Oberschleißheim", isCity: true, travelTime: "20-25 Minuten", localInfo: "Oberschleißheim ist bekannt für das Schloss Schleißheim und liegt nördlich von München mit vielen Wohnsiedlungen.", commonIssues: ["Einfamilienhaus-Sanierung", "Reihenhäuser", "Sturmschäden"] },
  { slug: "vaterstetten", name: "Vaterstetten", isCity: true, travelTime: "25-30 Minuten", localInfo: "Vaterstetten östlich von München ist eine der größten Gemeinden im Landkreis Ebersberg mit vielen Einfamilienhäusern.", commonIssues: ["Einfamilienhaus-Sanierung", "Dachgeschossausbau", "Rinnenarbeiten"] },
  { slug: "poing", name: "Poing", isCity: true, travelTime: "30-35 Minuten", localInfo: "Poing östlich von München wächst stark mit modernen Neubaugebieten und familienfreundlichen Siedlungen.", commonIssues: ["Neubau-Dächer", "Flachdächer", "Terrassendächer"] },
  { slug: "olching", name: "Olching", isCity: true, travelTime: "20-25 Minuten", localInfo: "Olching westlich von München liegt an der Amper und bietet eine Mischung aus Altbestand und Neubaugebieten.", commonIssues: ["Einfamilienhaus-Sanierung", "Dachrinnen", "Sturmschäden"] },
  { slug: "groebenzell", name: "Gröbenzell", isCity: true, travelTime: "15-20 Minuten", localInfo: "Gröbenzell liegt direkt westlich von München und ist eine kompakte Wohngemeinde mit vielen Einfamilienhäusern.", commonIssues: ["Einfamilienhaus-Sanierung", "Dachgeschossausbau", "Rinnenreinigung"] },
  { slug: "kirchheim", name: "Kirchheim", isCity: true, travelTime: "25-30 Minuten", localInfo: "Kirchheim bei München östlich der Landeshauptstadt ist eine wachsende Gemeinde mit Neubaugebieten und gewachsenen Ortsteilen.", commonIssues: ["Einfamilienhaus-Sanierung", "Neubau-Dächer", "Flachdächer"] },
  { slug: "aschheim", name: "Aschheim", isCity: true, travelTime: "25-30 Minuten", localInfo: "Aschheim östlich von München ist ein bedeutender Gewerbestandort mit modernen Büro- und Wohngebäuden.", commonIssues: ["Gewerbe-Dächer", "Flachdächer", "Einfamilienhaus-Sanierung"] },
  { slug: "feldkirchen", name: "Feldkirchen", isCity: true, travelTime: "20-25 Minuten", localInfo: "Feldkirchen bei München östlich der Stadt bietet eine gute Verkehrsanbindung und vielfältige Wohn- und Gewerbebebauung.", commonIssues: ["Einfamilienhaus-Sanierung", "Gewerbe-Dächer", "Flachdächer"] },
  { slug: "neubiberg", name: "Neubiberg", isCity: true, travelTime: "20-25 Minuten", localInfo: "Neubiberg südöstlich von München ist bekannt für die Universität der Bundeswehr und gepflegte Wohngebiete.", commonIssues: ["Einfamilienhaus-Sanierung", "Reihenhäuser", "Dachgeschossausbau"] },
  { slug: "putzbrunn", name: "Putzbrunn", isCity: true, travelTime: "25-30 Minuten", localInfo: "Putzbrunn südöstlich von München ist eine ruhige Wohngemeinde mit überwiegend Einfamilienhäusern und Reihenhäusern.", commonIssues: ["Einfamilienhaus-Sanierung", "Reihenhäuser", "Dachrinnen"] }
];

function generateDistrictContent(d: DistrictData): PageContent {
  const locationPrefix = d.isCity ? "" : "München-";
  const fullLocation = `${locationPrefix}${d.name}`;
  
  return {
    h1: `Dachdecker ${d.name} München – Dacharbeiten vom Partnernetzwerk vor Ort`,
    intro: `Kennen Sie das Gefühl? Sie entdecken einen dunklen Fleck an der Decke, hören bei Regen ein verdächtiges Tropfen, oder bemerken, dass Ihre Heizkosten Jahr für Jahr steigen. Als Hausbesitzer in ${d.name} wissen Sie: Ein beschädigtes oder undichtes Dach bedeutet mehr als nur ein technisches Problem. Es bedeutet Stress, schlaflose Nächte und die ständige Sorge, was der nächste Sturm bringen könnte. Die Angst vor hohen Reparaturkosten lähmt viele Hausbesitzer – und führt dazu, dass kleine Schäden zu großen Problemen werden. Wir verstehen das genau. Genau deshalb haben wir als Ihr lokaler Dachdecker in ${fullLocation} eine Mission: Ihnen schnell, professionell und mit absoluter Preistransparenz zu helfen. Die Renodex ist mehr als ein Handwerksbetrieb. Wir sind Ihr Partner, der Ihre Sorgen ernst nimmt und Lösungen liefert, die halten. Mit einer Anfahrtszeit von nur ${d.travelTime} sind wir rasch bei Ihnen. Rufen Sie uns an unter [Telefon folgt] – wir nehmen Ihnen die Last vom Dach.`,
    sections: [
      {
        heading: `Lokale Expertise in ${d.name}`,
        text: `${d.localInfo} Als Dachdecker mit über 25 Jahren Erfahrung in ${d.name} kennen wir jede typische Dachkonstruktion und die häufigsten Schwachstellen dieser Region. Wir haben Hunderte von Projekten in ${fullLocation} erfolgreich abgeschlossen und wissen genau, welche Herausforderungen hier auf Dächer warten. Besonders oft behandeln wir in ${d.name}: ${d.commonIssues.join(", ")}. Doch das ist nur die Oberfläche. Das Münchner Klima stellt besondere Anforderungen an jedes Dach. Föhnstürme mit Windgeschwindigkeiten über 100 km/h können Ziegel lösen und Dachrinnen beschädigen. Hagel hinterlässt unsichtbare Mikrorisse, die erst Monate später zu Undichtigkeiten führen. Starkregen testet jede Schwachstelle gnadenlos aus. Und die Schneelast im Winter kann bei älteren Dachstühlen zur echten Gefahr werden. Als lokaler Dachdecker in ${d.name} wissen wir, welche Materialien und Konstruktionen diesen Belastungen am besten standhalten. Wir beraten Sie ehrlich: Was muss wirklich gemacht werden, und was kann warten? Bei dringenden Notfällen sind wir innerhalb von 24 Stunden vor Ort – oft sogar schneller.`
      },
      {
        heading: `Unsere Leistungen in ${d.name}`,
        text: `Ob kleine Reparatur oder komplette Dachsanierung – in ${d.name} bieten wir das volle Leistungsspektrum moderner Dachtechnik. Unsere Dachsanierung erfolgt nach aktuellen EnEV-Standards und ist förderfähig: Sichern Sie sich bis zu 20% KfW-Förderung für energetische Maßnahmen. Bei der Dachreparatur beheben wir undichte Stellen, tauschen defekte Ziegel aus und reparieren beschädigte Rinnen – häufig noch am selben Tag. Unsere erfahrenen Spengler fertigen und montieren Dachrinnen, Fallrohre und Blechverkleidungen in Kupfer, Zink oder Aluminium nach Maß. Für Flachdächer setzen wir auf bewährte Abdichtungssysteme: EPDM-Folien für maximale Langlebigkeit, Bitumenbahnen für klassische Lösungen oder moderne Flüssigkunststoff-Beschichtungen. Darüber hinaus montieren wir Dachfenster von Velux und Roto, führen professionelle Dachdämmungen durch und begleiten Ihren Dachgeschossausbau von der Planung bis zur Fertigstellung. Jedes Projekt in ${d.name} beginnt mit einer kostenlosen Erstberatung vor Ort. Danach erhalten Sie ein verbindliches Festpreisangebot – detailliert, verständlich und ohne versteckte Kosten. So wissen Sie von Anfang an, was auf Sie zukommt. Kein Nachrechnen, keine bösen Überraschungen.`
      },
      {
        heading: `24/7 Sofort-Hilfe für ${d.name}`,
        text: `Sturmschaden? Wassereintritt? Panik? Atmen Sie erst einmal durch – wir sind für Sie da. Wir wissen, wie sich das anfühlt: Der Sturm ist gerade vorbei, Sie schauen hoch und sehen abgedeckte Ziegel. Oder Sie wachen nachts auf, weil es ins Schlafzimmer tropft. In solchen Momenten brauchen Sie schnelle, kompetente Hilfe – und keinen Anrufbeantworter. Der 24/7 Sofort-Hilfe der Renodex ist rund um die Uhr erreichbar, auch an Wochenenden und Feiertagen. In ${d.name} sind wir in nur ${d.travelTime} bei Ihnen. Rufen Sie uns jetzt an: [Telefon folgt]. Unser Sofort-Hilfe-Team sichert Ihr Dach sofort ab und verhindert weitere Schäden an Ihrem Gebäude. Wir dokumentieren den Schaden professionell für Ihre Versicherung und übernehmen die komplette Kommunikation mit Ihrem Versicherer. Sie müssen sich um nichts kümmern – wir erledigen das für Sie. In vielen Fällen trägt Ihre Gebäudeversicherung die gesamten Kosten für Sturmschäden. Lassen Sie uns das Dach-Problem für Sie lösen.`
      },
      {
        heading: `Warum Renodex in ${d.name} wählen?`,
        text: `Warum entscheiden sich Hausbesitzer in ${d.name} für die Renodex? Die Antwort ist einfach: Vertrauen, Qualität und Nähe. Über unser Partnernetzwerk aus geprüften Partner-Meisterfirmen. Unsere Bau- und Sanierungsbetrieb sind keine angelernten Kräfte – sie sind ausgebildete Fachkräfte mit jahrelanger Berufserfahrung und regelmäßigen Weiterbildungen. Wir verwenden ausschließlich hochwertige Materialien namhafter Hersteller wie Braas, Creaton und Rheinzink. Auf alle Arbeiten geben wir eine 10-Jahres-Garantie – schriftlich und ohne Wenn und Aber. Unsere zahlreichen 5-Sterne-Bewertungen bei Google sprechen für sich: Über 100 zufriedene Kunden in ${d.name} haben uns bereits ihr Dach anvertraut, von der kleinen Reparatur bis zur Komplettsanierung. Bei uns arbeiten Sie direkt mit dem Meister zusammen. Keine Subunternehmer, keine Vermittler, keine langen Wartezeiten. Wir hinterlassen die Baustelle so sauber, wie wir sie vorgefunden haben. Und wenn Sie Fragen haben – auch nach Abschluss des Projekts – sind wir für Sie da.`
      },
      {
        heading: `Qualitätsversprechen für ${d.name}`,
        text: `Die Renodex steht für Meisterqualität, faire Preise und persönlichen Service in ${d.name}. Nach Abschluss jeder Arbeit erhalten Sie eine vollständige Dokumentation: Gewährleistungsunterlagen, Pflegehinweise und individuelle Wartungsempfehlungen für Ihr Dach. Wir bleiben auch nach Projektabschluss Ihr Ansprechpartner – für Fragen, Wartung oder zukünftige Projekte. Was Sie von uns erwarten können: Über 25 Jahre Erfahrung im Münchner Raum. Handwerkskammer-geprüfte Meisterqualität. Transparente Festpreisgarantie ohne Nachforderungen. 10-Jahres-Gewährleistung auf alle Arbeiten. Saubere, termingerechte Ausführung. Professionelle Dachinspektion für nur 150 Euro mit detailliertem Zustandsbericht. Beratung zu KfW-Förderungen und Steuervorteilen. Warten Sie nicht, bis aus kleinen Schäden große Probleme werden. Ein undichtes Dach wird nicht besser, wenn man es ignoriert – es wird teurer. Je länger Sie warten, desto höher werden die Reparaturkosten. Kontaktieren Sie uns jetzt für eine kostenlose, unverbindliche Beratung: [Telefon folgt]. Wir nehmen uns Zeit für Ihr Anliegen und zeigen Ihnen ehrlich, welche Optionen Sie haben. Ihr Dach verdient das Beste – und Sie auch.`
      }
    ]
  };
}

export function getContentForPath(path: string): PageContent | null {
  const cleanPath = path.split("?")[0].split("#")[0];
  
  // Check main pages
  if (mainPagesContent[cleanPath]) {
    return mainPagesContent[cleanPath];
  }
  
  // Check for district pages with /bezirk/ prefix
  const bezirkMatch = cleanPath.match(/^\/bezirk\/([^/]+)$/);
  if (bezirkMatch) {
    const district = districts.find(d => d.slug === bezirkMatch[1]);
    if (district) {
      return generateDistrictContent(district);
    }
  }
  
  return null;
}

export function generateSSRContent(content: PageContent): string {
  let html = '';

  html += `<header style="position:sticky;top:0;z-index:50;">`;
  html += `<div style="background:#dc2626;color:#fff;text-align:center;padding:6px 16px;font-size:0.875rem;font-weight:600;letter-spacing:0.025em;">`;
  html += `<a href="tel:00000000000" style="color:#fff;text-decoration:none;display:inline-flex;align-items:center;gap:8px;">`;
  html += `NOTDIENST 24/7: [Telefon folgt]`;
  html += `<span style="display:none;">– Schnell vor Ort innerhalb 24h</span>`;
  html += `</a></div>`;
  html += `<div style="background:#fff;border-bottom:1px solid #e5e7eb;box-shadow:0 1px 2px rgba(0,0,0,0.05);">`;
  html += `<nav style="max-width:1280px;margin:0 auto;padding:0 16px;height:64px;display:flex;align-items:center;justify-content:space-between;">`;
  html += `<a href="/" style="display:flex;align-items:center;gap:10px;text-decoration:none;">`;
  html += `<img src="/renodex-logo.jpg" alt="Renodex Dachdecker München" style="height:40px;width:auto;border-radius:4px;" width="40" height="40" />`;
  html += `<div><span style="display:block;font-size:0.875rem;font-weight:700;color:#111827;line-height:1.25;">Renodex</span>`;
  html += `<span style="display:block;font-size:0.75rem;color:#dc2626;font-weight:500;line-height:1.25;">Dachdecker &amp; Spengler</span></div></a>`;
  html += `<div style="display:flex;align-items:center;gap:4px;font-size:0.875rem;">`;
  html += `<a href="/" style="padding:8px 12px;border-radius:6px;color:#4b5563;text-decoration:none;">Home</a>`;
  html += `<a href="/notdienst" style="padding:8px 12px;border-radius:6px;color:#dc2626;font-weight:700;text-decoration:none;">Sofort-Hilfe 24/7</a>`;
  html += `<a href="/leistungen" style="padding:8px 12px;border-radius:6px;color:#4b5563;text-decoration:none;">Leistungen</a>`;
  html += `<a href="/ueber-uns" style="padding:8px 12px;border-radius:6px;color:#4b5563;text-decoration:none;">Über uns</a>`;
  html += `<a href="/ratgeber" style="padding:8px 12px;border-radius:6px;color:#4b5563;text-decoration:none;">Ratgeber</a>`;
  html += `<a href="/faq" style="padding:8px 12px;border-radius:6px;color:#4b5563;text-decoration:none;">FAQ &amp; Preise</a>`;
  html += `<a href="/kontakt" style="padding:8px 12px;border-radius:6px;color:#4b5563;text-decoration:none;">Kontakt</a>`;
  html += `<a href="tel:00000000000" style="display:inline-flex;align-items:center;gap:8px;background:#dc2626;color:#fff;padding:6px 16px;border-radius:6px;font-weight:600;font-size:0.875rem;text-decoration:none;">[Telefon folgt]</a>`;
  html += `</div></nav></div>`;
  html += `</header>`;

  html += `<main id="main-content" style="max-width:1024px;margin:0 auto;padding:32px 16px;font-family:system-ui,-apple-system,sans-serif;background:#fff;color:#333;">`;

  html += `<h1 style="font-size:2.5rem;font-weight:800;margin-bottom:20px;color:#1a1a1a;line-height:1.2;">${content.h1}</h1>`;
  html += `<p style="font-size:1.15rem;line-height:1.8;margin-bottom:28px;color:#444;">${content.intro}</p>`;

  if (content.sections) {
    for (const section of content.sections) {
      html += `<section style="margin-top:40px;">`;
      html += `<h2 style="font-size:1.75rem;font-weight:700;margin-bottom:16px;color:#1a1a1a;line-height:1.3;">${section.heading}</h2>`;
      html += `<p style="font-size:1.05rem;line-height:1.8;color:#444;">${section.text}</p>`;
      if (section.subsections) {
        for (const sub of section.subsections) {
          html += `<h3 style="font-size:1.35rem;font-weight:600;margin-top:24px;margin-bottom:10px;color:#2a2a2a;line-height:1.35;">${sub.heading}</h3>`;
          html += `<p style="font-size:1.05rem;line-height:1.8;color:#444;">${sub.text}</p>`;
        }
      }
      html += `</section>`;
    }
  }

  if (content.faq && content.faq.length > 0) {
    html += `<section style="margin-top:40px;border-top:2px solid #e5e5e5;padding-top:32px;">`;
    html += `<h2 style="font-size:1.5rem;font-weight:600;margin-bottom:20px;color:#1a1a1a;">Häufige Fragen</h2>`;
    for (const item of content.faq) {
      html += `<details style="margin-bottom:16px;border:1px solid #e5e5e5;border-radius:8px;padding:16px;">`;
      html += `<summary style="font-size:1.1rem;font-weight:600;color:#1a1a1a;cursor:pointer;">${item.question}</summary>`;
      html += `<p style="font-size:1rem;line-height:1.65;color:#444;margin-top:12px;">${item.answer}</p>`;
      html += `</details>`;
    }
    html += `</section>`;
  }

  html += `<div style="margin-top:40px;padding:24px;background:#dc2626;border-radius:12px;text-align:center;color:#fff;">`;
  html += `<p style="font-size:1.25rem;margin-bottom:8px;font-weight:700;">Kostenlose Beratung – Jetzt Termin sichern!</p>`;
  html += `<p style="font-size:1rem;margin-bottom:16px;">Unser Meister berät Sie persönlich und erstellt ein Festpreis-Angebot.</p>`;
  html += `<a href="tel:00000000000" style="display:inline-block;background:#fff;color:#dc2626;padding:12px 32px;border-radius:8px;font-size:1.15rem;font-weight:700;text-decoration:none;">[Telefon folgt] anrufen</a>`;
  html += `<p style="font-size:0.85rem;margin-top:12px;opacity:0.9;">Oder <a href="/kontakt" style="color:#fff;text-decoration:underline;">Kontaktformular</a> ausfüllen</p>`;
  html += `</div>`;

  html += `</main>`;

  html += `<footer style="background:#18181b;color:#fff;padding:20px 0;">`;
  html += `<div style="height:4px;background:#dc2626;margin-bottom:16px;"></div>`;
  html += `<div style="max-width:1280px;margin:0 auto;padding:0 16px;">`;
  html += `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:12px;">`;

  html += `<div>`;
  html += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">`;
  html += `<img src="/renodex-logo.png" alt="Renodex Logo" style="height:28px;background:#fff;border-radius:4px;padding:2px;" width="36" height="28" />`;
  html += `<div><div style="font-weight:700;font-size:0.85rem;line-height:1.1;">Renodex</div>`;
  html += `<div style="font-size:0.7rem;color:#dc2626;font-weight:500;line-height:1.1;">Dachdecker &amp; Spengler</div></div></div>`;
  html += `<p style="color:#a1a1aa;font-size:0.7rem;line-height:1.4;margin:0;">Dachdecker &amp; Spenglerei München. Partnernetzwerk mit 25+ Jahren Erfahrung.</p>`;
  html += `</div>`;

  html += `<div style="grid-column:span 2;">`;
  html += `<p style="font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Leistungen</p>`;
  html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px 12px;">`;
  const footerLinks = [
    { href: '/leistungen', text: 'Dacharbeiten München' }, { href: '/sturmschaden', text: 'Sturmschaden Dach' },
    { href: '/dach-reparieren', text: 'Dachreparatur München' }, { href: '/ratgeber', text: 'Dach Ratgeber' },
    { href: '/dachsanierung-kosten', text: 'Dachsanierung Kosten' }, { href: '/ueber-uns', text: 'Über uns' },
    { href: '/notdienst', text: 'Dach Sofort-Hilfe München' }, { href: '/faq', text: 'FAQ Dachdecker' },
    { href: '/dach-undicht', text: 'Dach undicht München' }, { href: '/kontakt', text: 'Kontakt' }
  ];
  for (const l of footerLinks) {
    html += `<a href="${l.href}" style="color:#a1a1aa;text-decoration:none;font-size:0.75rem;line-height:1.6;">${l.text}</a>`;
  }
  html += `</div></div>`;

  html += `<div>`;
  html += `<p style="font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Kontakt</p>`;
  html += `<p style="margin:0 0 3px;"><a href="tel:00000000000" style="color:#a1a1aa;text-decoration:none;font-size:0.75rem;">[Telefon folgt]</a></p>`;
  html += `<p style="margin:0 0 3px;"><a href="mailto:info@renodex.de" style="color:#a1a1aa;text-decoration:none;font-size:0.75rem;">info@renodex.de</a></p>`;
  html += `<p style="color:#a1a1aa;font-size:0.75rem;margin:0;">[Adresse folgt]</p>`;
  html += `</div>`;

  html += `<div>`;
  html += `<p style="font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Öffnungszeiten</p>`;
  html += `<p style="color:#a1a1aa;font-size:0.75rem;margin:0 0 3px;">Mo-Fr: 8:00-16:30</p>`;
  html += `<p style="color:#dc2626;font-weight:600;font-size:0.75rem;margin:0;">Sofort-Hilfe</p>`;
  html += `</div>`;

  html += `</div>`;

  html += `<div style="border-top:1px solid #3f3f46;padding-top:10px;margin-bottom:10px;">`;
  html += `<p style="font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;text-align:center;margin-bottom:4px;">Dachdecker in München</p>`;
  html += `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:2px 10px;font-size:0.7rem;">`;
  const munichDistricts = [
    'allach','aubing','berg-am-laim','bogenhausen','feldmoching','hadern','haidhausen','laim','lehel',
    'maxvorstadt','milbertshofen','moosach','neuhausen','nymphenburg','obermenzing','obergiesing',
    'pasing','perlach','ramersdorf','schwabing','schwanthalerhoehe','sendling','solln','trudering','riem','untermenzing'
  ];
  for (const slug of munichDistricts) {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    html += `<a href="/bezirk/${slug}" style="color:#71717a;text-decoration:none;">${name}</a>`;
  }
  html += `</div></div>`;

  html += `<div style="border-top:1px solid #3f3f46;padding-top:10px;margin-bottom:10px;">`;
  html += `<p style="font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;text-align:center;margin-bottom:4px;">Münchner Umland</p>`;
  html += `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:2px 10px;font-size:0.7rem;">`;
  // 25km-Whitelist München: Dachau/Starnberg/FFB/Freising/Erding/Olching verboten
  const umlandDistricts = [
    'garching','germering','ottobrunn','unterhaching',
    'unterschleissheim','haar','taufkirchen','graefelfing','planegg','pullach','gruenwald',
    'ismaning','oberschleissheim','vaterstetten','groebenzell','aschheim','feldkirchen','neubiberg','putzbrunn','puchheim'
  ];
  for (const slug of umlandDistricts) {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    html += `<a href="/bezirk/${slug}" style="color:#71717a;text-decoration:none;">${name}</a>`;
  }
  html += `</div></div>`;

  html += `<div style="border-top:1px solid #3f3f46;padding-top:10px;display:flex;flex-wrap:wrap;justify-content:center;gap:2px 12px;font-size:0.7rem;color:#71717a;">`;
  html += `<span>© 2026 Renodex</span>`;
  html += `<a href="/impressum" style="color:#71717a;text-decoration:none;">Impressum</a>`;
  html += `<a href="/agb" style="color:#71717a;text-decoration:none;">AGB</a>`;
  html += `<a href="/datenschutz" style="color:#71717a;text-decoration:none;">Datenschutz</a>`;
  html += `<a href="/cookie" style="color:#71717a;text-decoration:none;">Cookie-Einstellungen</a>`;
  html += `<a href="/barrierefreiheit" style="color:#71717a;text-decoration:none;">Barrierefreiheit</a>`;
  html += `</div>`;
  html += `<p style="margin-top:4px;text-align:center;font-size:0.625rem;color:#52525b;">Webdesign powered by <a href="https://extrucon.de" target="_blank" rel="noopener noreferrer" style="color:#52525b;text-decoration:none;">ExtruCon</a> &amp; <a href="https://kshwmont.com" target="_blank" rel="noopener noreferrer" style="color:#52525b;text-decoration:none;">KSHWmont d.o.o.</a></p>`;

  html += `</div></footer>`;

  return html;
}
