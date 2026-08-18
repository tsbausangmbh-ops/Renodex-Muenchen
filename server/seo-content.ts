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
    h1: "Komplettsanierung München -- Haus und Wohnung aus einer Hand",
    intro: "Renodex ist Ihr Partnernetzwerk fuer die Komplettsanierung von Haus und Wohnung in Muenchen und Umgebung. Sanitaer, Heizung, Elektro, Waermepumpe, Photovoltaik und weitere Gewerke koordinieren wir aus einer Hand -- damit Sie nicht mit vier verschiedenen Handwerkern gleichzeitig planen muessen. Kontaktieren Sie uns fuer eine kostenlose Erstberatung: [Telefon folgt] oder info@renodex.de.",
    sections: [
      {
        heading: "Eine Sanierung, viele Gewerke, ein Ansprechpartner",
        text: "Wer eine Wohnung oder ein Haus saniert, hat es meist nicht mit einem einzigen Gewerk zu tun: Sanitaer, Heizung, Elektro, Maler, Bodenverleger -- jeder mit eigenem Termin, eigenem Angebot, eigener Zusage. Renodex koordiniert genau das aus einer Hand: Sie haben einen Ansprechpartner, der die Gewerke aufeinander abstimmt.",
        subsections: [
          {
            heading: "Komplettsanierung von Haus und Wohnung",
            text: "Ob Einfamilienhaus, Mehrfamilienhaus oder Eigentumswohnung -- wir uebernehmen die Sanierung und Renovierung als Ganzes: von der Bestandsaufnahme ueber die Koordination der Gewerke bis zur Abnahme."
          },
          {
            heading: "Sanierung, Renovierung, Modernisierung",
            text: "Von der energetischen Sanierung bis zur reinen Renovierung einzelner Raeume -- wir beraten ehrlich, was wirklich noetig ist und was nicht."
          },
          {
            heading: "Foerdermoeglichkeiten pruefen",
            text: "Bei energetischen Massnahmen pruefen wir gemeinsam mit Ihnen, welche KfW- und BAFA-Foerderungen infrage kommen, und unterstuetzen bei der Antragstellung."
          }
        ]
      },
      {
        heading: "Unsere Leistungen im Ueberblick",
        text: "Renodex bietet die Kernleistungen einer Komplettsanierung aus einer Hand: Badsanierung, Bodenverlegung, Malerarbeiten und Fassade, Elektroinstallation, Sanitaerinstallation, Heizungsinstallation, Waermepumpe, Photovoltaik, Tueren, Mauerwerksabdichtung, Asbestsanierung sowie Dachdecker- und Spenglerarbeiten. Details zu jedem einzelnen Gewerk finden Sie auf unserer Leistungen-Seite."
      },
      {
        heading: "So laeuft eine Zusammenarbeit mit Renodex ab",
        text: "Der Ablauf ist bewusst einfach gehalten: Erstberatung, Besichtigung vor Ort, ein Angebot mit allen Leistungen, danach koordinieren wir die beteiligten Gewerke und begleiten die Ausfuehrung bis zur gemeinsamen Abnahme."
      },
      {
        heading: "Renodex in München und Umgebung",
        text: "Wir sind fuer Sie in Muenchen und im Umkreis von 25 km taetig -- von den Stadtteilen im Norden, Westen, Osten und Sueden bis ins naehere Umland."
      },
    ],
    faq: [
      {
        question: "Was umfasst eine Komplettsanierung von Haus oder Wohnung?",
        answer: "Eine Komplettsanierung durch Renodex umfasst je nach Bedarf Sanitaer, Heizung, Elektro, Waermepumpe, Photovoltaik, Bodenverlegung, Malerarbeiten sowie Dachdecker- und Spenglerarbeiten -- koordiniert aus einer Hand, statt mit mehreren einzelnen Handwerksbetrieben."
      },
      {
        question: "Warum ein Partnernetzwerk statt ein einzelner Betrieb?",
        answer: "Unser Partnernetzwerk aus geprueften Meisterfirmen deckt alle noetigen Gewerke ab. Sie sprechen mit einer Stelle, wir koordinieren die einzelnen Fachbetriebe untereinander."
      },
      {
        question: "Welche Foerderungen gibt es fuer eine energetische Sanierung?",
        answer: "Fuer energetische Massnahmen kommen unter anderem KfW-Zuschuesse, BAFA-Foerderungen und der steuerliche Sanierungsbonus infrage. Der Antrag muss vor Baubeginn gestellt werden. Wir beraten Sie dazu und unterstuetzen bei der Antragstellung."
      },
      {
        question: "In welchem Gebiet ist Renodex taetig?",
        answer: "Wir sind in Muenchen und Umgebung im Umkreis von 25 km taetig."
      },
      {
        question: "Wie laeuft die erste Kontaktaufnahme ab?",
        answer: "Sie erreichen uns telefonisch, per E-Mail an info@renodex.de oder ueber unser Kontaktformular. Nach einer kurzen Erstberatung vereinbaren wir einen Termin zur Besichtigung vor Ort."
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
  "/sofort-hilfe": {
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
  "/wasserschaden": {
    h1: "Sturmschaden Dach München – Dachdecker Soforthilfe & Reparatur",
    intro: "Sturmschaden am Dach? Die Renodex bietet Ihnen 24/7 Soforthilfe bei Sturmschäden in München. Wir sichern Ihr Dach, dokumentieren den Schaden und übernehmen die Versicherungsabwicklung. Rufen Sie uns an: [Telefon folgt].",
    sections: [
      {
        heading: "Was tun bei Sturmschaden?",
        text: "1. Rufen Sie uns an: [Telefon folgt]. 2. Betreten Sie nicht das Dach – Unfallgefahr! 3. Dokumentieren Sie sichtbare Schäden von unten. 4. Melden Sie den Schaden Ihrer Versicherung. Wir sind schnell vor Ort und kümmern uns um alles Weitere."
      }
    ]
  },
  "/heizung-ausfall": {
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
  "/sanierung-reparatur": {
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
  "/komplettsanierung-kosten": {
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
  html += `<div style="background:#fff;border-bottom:1px solid #e5e7eb;box-shadow:0 1px 2px rgba(0,0,0,0.05);">`;
  html += `<nav style="max-width:1280px;margin:0 auto;padding:0 16px;height:64px;display:flex;align-items:center;justify-content:space-between;">`;
  html += `<a href="/" style="display:flex;align-items:center;gap:10px;text-decoration:none;">`;
  html += `<img src="/renodex-logo.png" alt="Renodex München" style="height:40px;width:auto;border-radius:4px;" width="40" height="40" />`;
  html += `<div><span style="display:block;font-size:0.875rem;font-weight:700;color:#111827;line-height:1.25;">Renodex</span>`;
  html += `<span style="display:block;font-size:0.75rem;color:#dc2626;font-weight:500;line-height:1.25;">Sanierung München</span></div></a>`;
  html += `<div style="display:flex;align-items:center;gap:4px;font-size:0.875rem;">`;
  html += `<a href="/" style="padding:8px 12px;border-radius:6px;color:#4b5563;text-decoration:none;">Home</a>`;
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
  html += `<div style="font-size:0.7rem;color:#dc2626;font-weight:500;line-height:1.1;">Sanierung München</div></div></div>`;
  html += `<p style="color:#a1a1aa;font-size:0.7rem;line-height:1.4;margin:0;">Komplettsanierung von Haus und Wohnung aus einer Hand. Partnernetzwerk mit 25+ Jahren Erfahrung.</p>`;
  html += `</div>`;

  html += `<div style="grid-column:span 2;">`;
  html += `<p style="font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Leistungen</p>`;
  html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px 12px;">`;
  const footerLinks = [
    { href: '/leistungen', text: 'Komplettsanierung München' }, { href: '/leistungen/haussanierung', text: 'Haussanierung' },
    { href: '/leistungen/wohnungssanierung', text: 'Wohnungssanierung' }, { href: '/ratgeber', text: 'Ratgeber' },
    { href: '/leistungen/badsanierung', text: 'Badsanierung' }, { href: '/ueber-uns', text: 'Über uns' },
    { href: '/faq', text: 'FAQ' }, { href: '/kontakt', text: 'Kontakt' }
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
  html += `<p style="color:#a1a1aa;font-size:0.75rem;margin:0;">Nach Vereinbarung</p>`;
  html += `</div>`;

  html += `</div>`;

  html += `<div style="border-top:1px solid #3f3f46;padding-top:10px;margin-bottom:10px;">`;
  html += `<p style="font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;text-align:center;margin-bottom:4px;">Renodex in München</p>`;
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
