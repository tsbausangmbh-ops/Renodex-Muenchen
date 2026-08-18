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
    h1: "Leistungen -- Komplettsanierung von Haus und Wohnung aus einer Hand",
    intro: "Renodex koordiniert die Sanierung und Renovierung von Haus und Wohnung in Muenchen und Umgebung (25 km Radius) aus einer Hand: Elektro, Sanitaer, Heizung, Waermepumpe, Photovoltaik, Bodenverlegung, Malerarbeiten, Tueren, Mauerwerksabdichtung, Asbestsanierung sowie Dachdecker- und Spenglerarbeiten. Ein Ansprechpartner koordiniert alle Gewerke, statt dass Sie selbst mehrere Handwerksbetriebe abstimmen muessen.",
    sections: [
      {
        heading: "Warum ein Partnernetzwerk statt viele Einzelbetriebe?",
        text: "Wer saniert oder renoviert, hat es meist mit mehreren Gewerken gleichzeitig zu tun -- Elektriker, Sanitaerinstallateur, Maler, Bodenverleger, jeder mit eigenem Termin und eigenem Angebot. Renodex uebernimmt diese Koordination: Sie sprechen mit einer Stelle, wir stimmen die beteiligten Fachbetriebe aufeinander ab.",
        subsections: [
          {
            heading: "Komplettsanierung von Haus und Wohnung",
            text: "Von der Bestandsaufnahme ueber die Koordination der Gewerke bis zur gemeinsamen Abnahme -- fuer Einfamilienhaus, Mehrfamilienhaus oder Eigentumswohnung."
          },
          {
            heading: "Einzelne Gewerke beauftragen",
            text: "Sie muessen nicht gleich das ganze Haus sanieren lassen: Auch einzelne Leistungen wie Badsanierung oder Elektroinstallation koordinieren wir aus einer Hand."
          }
        ]
      },
      {
        heading: "Unsere Leistungen im Ueberblick",
        text: "Komplettsanierung, Haussanierung, Wohnungssanierung, Renovierung, Badsanierung, Bodenverlegung, Malerarbeiten und Fassade, Elektroinstallation, Sanitaerinstallation, Heizungsinstallation, Waermepumpe, Photovoltaik, Tueren, Mauerwerksabdichtung, Asbestsanierung sowie Dachdecker- und Spenglerarbeiten. Details zu jedem Gewerk finden Sie auf der jeweiligen Leistungsseite."
      },
      {
        heading: "So laeuft eine Zusammenarbeit mit Renodex ab",
        text: "Erstberatung, Besichtigung vor Ort, ein Angebot mit allen Leistungen, danach koordinieren wir die beteiligten Gewerke und begleiten die Ausfuehrung bis zur gemeinsamen Abnahme."
      }
    ],
    faq: [
      {
        question: "Welche Leistungen bietet Renodex an?",
        answer: "Renodex bietet Komplettsanierung, Renovierung, Badsanierung, Bodenverlegung, Malerarbeiten, Elektro-, Sanitaer- und Heizungsinstallation, Waermepumpe, Photovoltaik, Tueren, Mauerwerksabdichtung, Asbestsanierung sowie Dachdecker- und Spenglerarbeiten -- koordiniert aus einer Hand."
      },
      {
        question: "Kann ich auch nur ein einzelnes Gewerk beauftragen?",
        answer: "Ja, Sie muessen nicht gleich das ganze Haus sanieren lassen. Auch Einzelleistungen wie eine Badsanierung oder eine Elektroinstallation koordinieren wir gerne."
      },
      {
        question: "In welchem Gebiet ist Renodex taetig?",
        answer: "Wir sind in Muenchen und Umgebung im Umkreis von 25 km taetig."
      }
    ]
  },
  "/sofort-hilfe": {
    h1: "Digitale Erstberatung -- Ohne ersten Besichtigungstermin zum Angebot",
    intro: "Sie moechten nicht gleich einen Vor-Ort-Termin vereinbaren, sondern zuerst wissen, wie Renodex Ihnen helfen kann? Schicken Sie uns Fotos, ein Video oder eine Sprachnachricht Ihres Vorhabens -- wir melden uns zeitnah mit den naechsten Schritten zurueck.",
    sections: [
      {
        heading: "Digital statt Wartezeit",
        text: "Ein Anruf, eine Warteschleife, dann die Suche nach den richtigen Worten fuer das Vorhaben -- das kostet Zeit, die Sie nicht haben muessen. Zeigen Sie uns Ihr Anliegen stattdessen direkt aus dem Handy: Bild, Video oder Sprachnachricht, ohne App und ohne Anmeldung.",
        subsections: [
          {
            heading: "Was Sie uns schicken koennen",
            text: "Fotos vom betroffenen Bereich, ein kurzes Video, eine Sprachnachricht mit Ihrem Anliegen oder ein PDF mit Plaenen -- was immer Ihnen am schnellsten geht."
          },
          {
            heading: "Wie es weitergeht",
            text: "Wir sichten Ihre Angaben und melden uns zeitnah mit Rueckfragen oder direkt mit den naechsten Schritten fuer Ihre Sanierung oder Renovierung."
          }
        ]
      }
    ],
    faq: [
      {
        question: "Muss ich zuerst einen Vor-Ort-Termin vereinbaren?",
        answer: "Nein, Sie koennen uns Ihr Anliegen zuerst digital per Foto, Video oder Sprachnachricht schicken. Einen Vor-Ort-Termin vereinbaren wir erst, wenn er wirklich noetig ist."
      },
      {
        question: "Wie schnell bekomme ich eine Antwort?",
        answer: "Wir melden uns zeitnah nach Eingang Ihrer digitalen Anfrage mit den naechsten Schritten."
      }
    ]
  },
  "/faq": {
    h1: "Haeufige Fragen -- Komplettsanierung von Haus und Wohnung",
    intro: "Antworten auf haeufige Fragen rund um Ablauf, Leistungen und Foerderungen bei einer Komplettsanierung oder Renovierung durch Renodex in Muenchen und Umgebung.",
    sections: [
      {
        heading: "Ablauf und Leistungen",
        text: "Renodex koordiniert Komplettsanierung, Renovierung und einzelne Gewerke -- von der Erstberatung ueber die Besichtigung bis zur Abnahme, aus einer Hand."
      },
      {
        heading: "Foerderungen",
        text: "Bei energetischen Massnahmen pruefen wir gemeinsam mit Ihnen, welche KfW- und BAFA-Foerderungen infrage kommen, und unterstuetzen bei der Antragstellung."
      }
    ],
    faq: [
      {
        question: "Was umfasst eine Komplettsanierung von Haus oder Wohnung?",
        answer: "Eine Komplettsanierung durch Renodex umfasst je nach Bedarf Sanitaer, Heizung, Elektro, Waermepumpe, Photovoltaik, Bodenverlegung, Malerarbeiten sowie Dachdecker- und Spenglerarbeiten -- koordiniert aus einer Hand."
      },
      {
        question: "Warum ein Partnernetzwerk statt ein einzelner Betrieb?",
        answer: "Unser Partnernetzwerk aus geprueften Meisterfirmen deckt alle noetigen Gewerke ab. Sie sprechen mit einer Stelle, wir koordinieren die einzelnen Fachbetriebe untereinander."
      },
      {
        question: "Welche Foerderungen gibt es fuer eine energetische Sanierung?",
        answer: "Fuer energetische Massnahmen kommen unter anderem KfW-Zuschuesse, BAFA-Foerderungen und der steuerliche Sanierungsbonus infrage. Der Antrag muss vor Baubeginn gestellt werden."
      },
      {
        question: "Kann ich Renodex auch fuer ein einzelnes Gewerk beauftragen?",
        answer: "Ja. Auch einzelne Leistungen wie eine Badsanierung oder eine Elektroinstallation koordinieren wir gerne, ohne dass gleich das ganze Haus saniert werden muss."
      },
      {
        question: "In welchem Gebiet ist Renodex taetig?",
        answer: "Wir sind in Muenchen und Umgebung im Umkreis von 25 km taetig."
      }
    ]
  },
  "/kontakt": {
    h1: "Kontakt -- Renodex München",
    intro: "Erreichen Sie Renodex per E-Mail, Kontaktformular oder digitaler Anfrage. Nach einer kurzen Erstberatung vereinbaren wir bei Bedarf einen Termin zur Besichtigung vor Ort.",
    sections: [
      {
        heading: "So erreichen Sie uns",
        text: "Renodex, [Adresse folgt]. Telefon: [Telefon folgt], E-Mail: info@renodex.de."
      },
      {
        heading: "Öffnungszeiten",
        text: "Montag bis Freitag: 08:00 - 16:30 Uhr."
      }
    ]
  },
  "/ueber-uns": {
    h1: "Über uns -- Partnernetzwerk fuer Komplettsanierung in München",
    intro: "Renodex ist ein Partnernetzwerk aus geprueften Meisterfirmen fuer die Komplettsanierung von Haus und Wohnung in München und Umgebung.",
    sections: [
      {
        heading: "Unser Partnernetzwerk",
        text: "Wir arbeiten mit geprueften Partner-Meisterfirmen aus verschiedenen Gewerken zusammen. Sie haben einen Ansprechpartner, der die beteiligten Fachbetriebe koordiniert."
      },
      {
        heading: "Unsere Werte",
        text: "Qualitaet, Zuverlaessigkeit und ehrliche Beratung sind die Grundpfeiler unserer Arbeit -- wir sagen Ihnen, was wirklich noetig ist und was nicht."
      }
    ]
  },
  "/impressum": {
    h1: "Impressum -- Renodex München",
    intro: "Rechtliche Informationen zur Renodex, Ihrem Partnernetzwerk in München. Hier finden Sie unsere Kontaktdaten und rechtlichen Angaben gemaess Paragraf 5 TMG.",
    sections: [
      {
        heading: "Angaben gemaess Paragraf 5 TMG",
        text: "Renodex, [Adresse folgt]. Ausfuehrung durch geprüfte Partner-Meisterfirmen aus unserem Partnernetzwerk."
      },
      {
        heading: "Kontakt",
        text: "Telefon: [Telefon folgt], E-Mail: info@renodex.de, Webseite: https://renodex.de. Erreichbar Montag bis Freitag 08:00 - 16:30 Uhr."
      },
      {
        heading: "Haftungshinweis",
        text: "Trotz sorgfaeltiger inhaltlicher Kontrolle uebernehmen wir keine Haftung fuer die Inhalte externer Links. Fuer den Inhalt der verlinkten Seiten sind ausschliesslich deren Betreiber verantwortlich."
      }
    ]
  },
  "/datenschutz": {
    h1: "Datenschutzerklärung -- Renodex",
    intro: "Datenschutz ist uns wichtig. Diese Datenschutzerklaerung informiert Sie ueber die Erhebung und Verarbeitung personenbezogener Daten auf unserer Webseite renodex.de gemaess DSGVO.",
    sections: [
      {
        heading: "Verantwortlicher",
        text: "Verantwortlich fuer die Datenverarbeitung ist die Renodex, [Adresse folgt]. Kontakt: datenschutz@renodex.de, Tel: [Telefon folgt]."
      },
      {
        heading: "Datenerhebung auf unserer Website",
        text: "Wir erheben nur die Daten, die Sie uns aktiv mitteilen: Name, E-Mail, Telefonnummer und Adresse bei Kontaktanfragen. Diese Daten verwenden wir ausschliesslich zur Bearbeitung Ihrer Anfrage."
      },
      {
        heading: "Ihre Rechte",
        text: "Sie haben das Recht auf Auskunft, Berichtigung, Loeschung und Einschraenkung der Verarbeitung Ihrer Daten. Kontaktieren Sie uns unter datenschutz@renodex.de fuer alle datenschutzrechtlichen Anliegen."
      }
    ]
  },
  "/ratgeber": {
    h1: "Ratgeber -- Sanierung und Renovierung in München",
    intro: "Im Ratgeber der Renodex finden Sie praktische Tipps rund um Komplettsanierung, Renovierung und einzelne Gewerke fuer Haus und Wohnung in München und Umgebung.",
    sections: [
      {
        heading: "Checkliste Komplettsanierung: Von der Planung bis zur Abnahme",
        text: "Planung: Bestandsaufnahme durch das Partnernetzwerk, Zustandsbericht und Sanierungsempfehlung einholen, Kostenvoranschlaege vergleichen, Foerdermittel-Anspruch pruefen, KfW- und BAFA-Foerdertraege vor Baubeginn stellen. Durchfuehrung: Gewerke koordinieren, Arbeiten nach Zeitplan ausfuehren, Zwischenstaende dokumentieren, Abnahme mit Fotodokumentation durchfuehren."
      },
      {
        heading: "Foerdermittel im Ueberblick: KfW-Programme und steuerliche Vorteile",
        text: "Fuer energetische Massnahmen kommen unter anderem KfW-Zuschuesse und -Kredite, BAFA-Foerderungen fuer Einzelmassnahmen sowie der steuerliche Sanierungsbonus (Paragraf 35c EStG) infrage. Wichtig: der Antrag muss VOR Baubeginn gestellt werden. Wir beraten Sie dazu und unterstuetzen bei der Antragstellung."
      },
      {
        heading: "Wann lohnt sich eine Komplettsanierung statt Einzelmassnahmen?",
        text: "Wenn mehrere Gewerke ohnehin anstehen -- etwa veraltete Elektrik, eine alte Heizung und ein sanierungsbeduerftiges Bad gleichzeitig -- spart eine koordinierte Komplettsanierung oft Zeit und vermeidet doppelte Arbeiten, etwa wenn Waende fuer mehrere Gewerke geoeffnet werden muessen."
      }
    ]
  },
  "/wasserschaden": {
    h1: "Mauerwerksabdichtung und Wasserschaden -- München",
    intro: "Feuchte Waende oder ein Wasserschaden im Mauerwerk? Renodex prueft die Ursache und saniert Mauerwerk und betroffene Gewerke aus einer Hand in München und Umgebung.",
    sections: [
      {
        heading: "Was tun bei Feuchtigkeit im Mauerwerk?",
        text: "Kontaktieren Sie uns, damit wir die Ursache pruefen koennen. Je frueher eine Abdichtung erfolgt, desto geringer das Risiko von Folgeschaeden an Bausubstanz und Bauteilen."
      }
    ]
  },
  "/heizung-ausfall": {
    h1: "Heizungsinstallation und Heizungssanierung -- München",
    intro: "Veraltete oder ausgefallene Heizung? Renodex saniert und modernisiert Heizungsanlagen in München und Umgebung, inklusive Beratung zu Waermepumpe und Foerdermoeglichkeiten.",
    sections: [
      {
        heading: "Anzeichen fuer veraltete Heizungstechnik",
        text: "Steigende Heizkosten, ungleichmaessige Waerme in den Raeumen oder ein Heizkessel, der aelter als 20 Jahre ist, sind haeufige Gruende fuer eine Heizungssanierung. Eine professionelle Beratung gibt Klarheit ueber sinnvolle naechste Schritte."
      }
    ]
  },
  "/sanierung-reparatur": {
    h1: "Sanierung und Renovierung -- Haus und Wohnung",
    intro: "Renodex saniert und renoviert Haus und Wohnung in München und Umgebung -- von der Einzelmassnahme bis zur Komplettsanierung, koordiniert aus einer Hand.",
    sections: [
      {
        heading: "Von der Einzelmassnahme bis zur Komplettsanierung",
        text: "Ob eine einzelne Renovierung oder die Sanierung des gesamten Hauses: Wir beraten ehrlich, was wirklich noetig ist, und koordinieren die beteiligten Gewerke."
      }
    ]
  },
  "/komplettsanierung-kosten": {
    h1: "Komplettsanierung München -- Ablauf und Beratung",
    intro: "Was ist bei einer Komplettsanierung von Haus oder Wohnung zu beachten? Renodex beraet Sie zu Ablauf, beteiligten Gewerken und Foerdermoeglichkeiten -- kostenlose Erstberatung.",
    sections: [
      {
        heading: "Was beeinflusst den Umfang einer Komplettsanierung?",
        text: "Der Umfang haengt vom Zustand der Immobilie, den betroffenen Gewerken und Ihren individuellen Wuenschen ab. Nach einer Besichtigung vor Ort erhalten Sie ein detailliertes Angebot."
      },
      {
        heading: "Foerdermoeglichkeiten",
        text: "Fuer energetische Massnahmen pruefen wir gemeinsam mit Ihnen, welche KfW- und BAFA-Foerderungen infrage kommen, und unterstuetzen bei der Antragstellung."
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
  { slug: "allach", name: "Allach", isCity: false, travelTime: "15-20 Minuten", localInfo: "Allach liegt im Nordwesten Münchens und zeichnet sich durch viele Einfamilienhäuser und Siedlungen aus den 1950er-80er Jahren aus.", commonIssues: ["Sanierungsbedarf bei aelterer Haustechnik", "Elektro- und Sanitaerinstallation im Altbau", "Energetische Sanierung"] },
  { slug: "aubing", name: "Aubing", isCity: false, travelTime: "20-25 Minuten", localInfo: "Aubing ist Münchens westlichster Stadtteil mit vielen Reihenhäusern und Neubaugebieten.", commonIssues: ["Badsanierung in bestehenden Wohnungen", "Modernisierung der Heizungsanlage", "Malerarbeiten nach Umbau"] },
  { slug: "berg-am-laim", name: "Berg am Laim", isCity: false, travelTime: "20-25 Minuten", localInfo: "Berg am Laim verbindet Altbau-Charme mit modernen Wohnanlagen.", commonIssues: ["Komplettsanierung bei Eigentumsuebernahme", "Bodenverlegung nach Entkernung", "Elektroinstallation nach aktuellem Standard"] },
  { slug: "bogenhausen", name: "Bogenhausen", isCity: false, travelTime: "25-30 Minuten", localInfo: "Bogenhausen zählt zu Münchens exklusivsten Wohnlagen mit historischen Villen.", commonIssues: ["Waermepumpen-Nachruestung", "Photovoltaik-Installation", "Energetische Modernisierung"] },
  { slug: "feldmoching", name: "Feldmoching", isCity: false, travelTime: "15-20 Minuten", localInfo: "Feldmoching im Münchner Norden bietet ländlichen Charakter mit vielen Einfamilienhäusern.", commonIssues: ["Mauerwerksabdichtung bei Altbauten", "Tuerenaustausch", "Sanitaerinstallation im Bad"] },
  { slug: "hadern", name: "Hadern", isCity: false, travelTime: "20-25 Minuten", localInfo: "Hadern liegt im Südwesten Münchens, geprägt von Wohnsiedlungen der Nachkriegszeit.", commonIssues: ["Sanierungsbedarf bei aelterer Haustechnik", "Elektro- und Sanitaerinstallation im Altbau", "Energetische Sanierung"] },
  { slug: "haidhausen", name: "Haidhausen", isCity: false, travelTime: "20-25 Minuten", localInfo: "Haidhausen ist bekannt für seine Altbauten und das Franzosenviertel.", commonIssues: ["Badsanierung in bestehenden Wohnungen", "Modernisierung der Heizungsanlage", "Malerarbeiten nach Umbau"] },
  { slug: "laim", name: "Laim", isCity: false, travelTime: "15-20 Minuten", localInfo: "Laim verbindet zentrale Lage mit Wohnqualität.", commonIssues: ["Komplettsanierung bei Eigentumsuebernahme", "Bodenverlegung nach Entkernung", "Elektroinstallation nach aktuellem Standard"] },
  { slug: "lehel", name: "Lehel", isCity: false, travelTime: "25-30 Minuten", localInfo: "Das Lehel ist Münchens ältester Stadtteil mit historischen Gebäuden.", commonIssues: ["Waermepumpen-Nachruestung", "Photovoltaik-Installation", "Energetische Modernisierung"] },
  { slug: "maxvorstadt", name: "Maxvorstadt", isCity: false, travelTime: "20-25 Minuten", localInfo: "Die Maxvorstadt ist das Kunst- und Wissenschaftsviertel Münchens mit vielen Altbauten.", commonIssues: ["Mauerwerksabdichtung bei Altbauten", "Tuerenaustausch", "Sanitaerinstallation im Bad"] },
  { slug: "milbertshofen", name: "Milbertshofen", isCity: false, travelTime: "15-20 Minuten", localInfo: "Milbertshofen ist geprägt von Industrie und Wohngebieten im Münchner Norden.", commonIssues: ["Sanierungsbedarf bei aelterer Haustechnik", "Elektro- und Sanitaerinstallation im Altbau", "Energetische Sanierung"] },
  { slug: "moosach", name: "Moosach", isCity: false, travelTime: "10-15 Minuten", localInfo: "Moosach ist unser direktes Nachbarviertel im Münchner Westen.", commonIssues: ["Badsanierung in bestehenden Wohnungen", "Modernisierung der Heizungsanlage", "Malerarbeiten nach Umbau"] },
  { slug: "neuhausen", name: "Neuhausen", isCity: false, travelTime: "15-20 Minuten", localInfo: "Neuhausen-Nymphenburg ist eines der beliebtesten Wohnviertel Münchens.", commonIssues: ["Komplettsanierung bei Eigentumsuebernahme", "Bodenverlegung nach Entkernung", "Elektroinstallation nach aktuellem Standard"] },
  { slug: "nymphenburg", name: "Nymphenburg", isCity: false, travelTime: "15-20 Minuten", localInfo: "Nymphenburg ist geprägt vom berühmten Schloss und gehobenen Wohnlagen.", commonIssues: ["Waermepumpen-Nachruestung", "Photovoltaik-Installation", "Energetische Modernisierung"] },
  { slug: "obermenzing", name: "Obermenzing", isCity: false, travelTime: "5-10 Minuten", localInfo: "Obermenzing ist unser Firmensitz – hier sind wir besonders schnell vor Ort.", commonIssues: ["Mauerwerksabdichtung bei Altbauten", "Tuerenaustausch", "Sanitaerinstallation im Bad"] },
  { slug: "obergiesing", name: "Obergiesing", isCity: false, travelTime: "25-30 Minuten", localInfo: "Obergiesing im Münchner Süden bietet eine Mischung aus Alt- und Neubauten.", commonIssues: ["Sanierungsbedarf bei aelterer Haustechnik", "Elektro- und Sanitaerinstallation im Altbau", "Energetische Sanierung"] },
  { slug: "pasing", name: "Pasing", isCity: false, travelTime: "15-20 Minuten", localInfo: "Pasing ist ein eigenständiges Zentrum im Münchner Westen.", commonIssues: ["Badsanierung in bestehenden Wohnungen", "Modernisierung der Heizungsanlage", "Malerarbeiten nach Umbau"] },
  { slug: "perlach", name: "Perlach", isCity: false, travelTime: "30-35 Minuten", localInfo: "Perlach im Münchner Südosten ist bekannt für Neuperlach mit Hochhäusern.", commonIssues: ["Komplettsanierung bei Eigentumsuebernahme", "Bodenverlegung nach Entkernung", "Elektroinstallation nach aktuellem Standard"] },
  { slug: "ramersdorf", name: "Ramersdorf", isCity: false, travelTime: "25-30 Minuten", localInfo: "Ramersdorf-Perlach liegt im Südosten Münchens.", commonIssues: ["Waermepumpen-Nachruestung", "Photovoltaik-Installation", "Energetische Modernisierung"] },
  { slug: "schwabing", name: "Schwabing", isCity: false, travelTime: "20-25 Minuten", localInfo: "Schwabing ist bekannt für Altbauten, Jugendstil und anspruchsvolle Architektur.", commonIssues: ["Mauerwerksabdichtung bei Altbauten", "Tuerenaustausch", "Sanitaerinstallation im Bad"] },
  { slug: "schwanthalerhoehe", name: "Schwanthalerhöhe", isCity: false, travelTime: "15-20 Minuten", localInfo: "Die Schwanthalerhöhe liegt zentral nahe der Theresienwiese.", commonIssues: ["Sanierungsbedarf bei aelterer Haustechnik", "Elektro- und Sanitaerinstallation im Altbau", "Energetische Sanierung"] },
  { slug: "sendling", name: "Sendling", isCity: false, travelTime: "20-25 Minuten", localInfo: "Sendling im Münchner Süden ist ein traditionelles Wohnviertel.", commonIssues: ["Badsanierung in bestehenden Wohnungen", "Modernisierung der Heizungsanlage", "Malerarbeiten nach Umbau"] },
  { slug: "solln", name: "Solln", isCity: false, travelTime: "25-30 Minuten", localInfo: "Solln ist eine gehobene Wohngegend im Münchner Süden mit vielen Villen.", commonIssues: ["Komplettsanierung bei Eigentumsuebernahme", "Bodenverlegung nach Entkernung", "Elektroinstallation nach aktuellem Standard"] },
  { slug: "trudering", name: "Trudering", isCity: false, travelTime: "30-35 Minuten", localInfo: "Trudering-Riem im Münchner Osten bietet eine Mischung aus Alt und Neu.", commonIssues: ["Waermepumpen-Nachruestung", "Photovoltaik-Installation", "Energetische Modernisierung"] },
  { slug: "riem", name: "Riem", isCity: false, travelTime: "30-35 Minuten", localInfo: "Riem im Münchner Osten ist bekannt für die Messestadt und moderne Neubauviertel rund um das ehemalige Flughafengelände.", commonIssues: ["Mauerwerksabdichtung bei Altbauten", "Tuerenaustausch", "Sanitaerinstallation im Bad"] },
  { slug: "untermenzing", name: "Untermenzing", isCity: false, travelTime: "10-15 Minuten", localInfo: "Untermenzing liegt direkt neben unserem Firmensitz in Obermenzing.", commonIssues: ["Sanierungsbedarf bei aelterer Haustechnik", "Elektro- und Sanitaerinstallation im Altbau", "Energetische Sanierung"] },
  { slug: "garching", name: "Garching", isCity: true, travelTime: "25-30 Minuten", localInfo: "Garching ist bekannt für die TU München und moderne Architektur.", commonIssues: ["Badsanierung in bestehenden Wohnungen", "Modernisierung der Heizungsanlage", "Malerarbeiten nach Umbau"] },
  { slug: "germering", name: "Germering", isCity: true, travelTime: "20-25 Minuten", localInfo: "Germering ist eine große Kreisstadt westlich von München.", commonIssues: ["Komplettsanierung bei Eigentumsuebernahme", "Bodenverlegung nach Entkernung", "Elektroinstallation nach aktuellem Standard"] },
  { slug: "ottobrunn", name: "Ottobrunn", isCity: true, travelTime: "25-30 Minuten", localInfo: "Ottobrunn liegt südöstlich von München.", commonIssues: ["Waermepumpen-Nachruestung", "Photovoltaik-Installation", "Energetische Modernisierung"] },
  { slug: "unterhaching", name: "Unterhaching", isCity: true, travelTime: "25-30 Minuten", localInfo: "Unterhaching ist eine wohlhabende Gemeinde südlich von München, bekannt für moderne Wohngebiete und die Geothermieanlage.", commonIssues: ["Mauerwerksabdichtung bei Altbauten", "Tuerenaustausch", "Sanitaerinstallation im Bad"] },
  { slug: "unterschleissheim", name: "Unterschleißheim", isCity: true, travelTime: "20-25 Minuten", localInfo: "Unterschleißheim liegt nördlich von München.", commonIssues: ["Sanierungsbedarf bei aelterer Haustechnik", "Elektro- und Sanitaerinstallation im Altbau", "Energetische Sanierung"] },
  { slug: "haar", name: "Haar", isCity: true, travelTime: "25-30 Minuten", localInfo: "Haar liegt östlich von München und ist eine familienfreundliche Gemeinde mit vielen Einfamilienhäusern und Reihenhaussiedlungen.", commonIssues: ["Badsanierung in bestehenden Wohnungen", "Modernisierung der Heizungsanlage", "Malerarbeiten nach Umbau"] },
  { slug: "taufkirchen", name: "Taufkirchen", isCity: true, travelTime: "25-30 Minuten", localInfo: "Taufkirchen im Münchner Süden bietet eine Mischung aus Wohn- und Gewerbegebieten mit modernen Neubauten.", commonIssues: ["Komplettsanierung bei Eigentumsuebernahme", "Bodenverlegung nach Entkernung", "Elektroinstallation nach aktuellem Standard"] },
  { slug: "graefelfing", name: "Gräfelfing", isCity: true, travelTime: "15-20 Minuten", localInfo: "Gräfelfing westlich von München ist eine gehobene Villenvorstadt mit großzügigen Grundstücken und hochwertigen Dächern.", commonIssues: ["Waermepumpen-Nachruestung", "Photovoltaik-Installation", "Energetische Modernisierung"] },
  { slug: "planegg", name: "Planegg", isCity: true, travelTime: "15-20 Minuten", localInfo: "Planegg liegt südwestlich von München und ist bekannt für den Biotech-Standort Martinsried und gepflegte Wohngebiete.", commonIssues: ["Mauerwerksabdichtung bei Altbauten", "Tuerenaustausch", "Sanitaerinstallation im Bad"] },
  { slug: "pullach", name: "Pullach", isCity: true, travelTime: "20-25 Minuten", localInfo: "Pullach im Isartal südlich von München ist eine wohlhabende Gemeinde mit Villen und historischen Gebäuden entlang der Isar.", commonIssues: ["Sanierungsbedarf bei aelterer Haustechnik", "Elektro- und Sanitaerinstallation im Altbau", "Energetische Sanierung"] },
  { slug: "gruenwald", name: "Grünwald", isCity: true, travelTime: "20-25 Minuten", localInfo: "Grünwald an der Isar ist eine der wohlhabendsten Gemeinden Deutschlands mit exklusiven Villen und Anwesen.", commonIssues: ["Badsanierung in bestehenden Wohnungen", "Modernisierung der Heizungsanlage", "Malerarbeiten nach Umbau"] },
  { slug: "ismaning", name: "Ismaning", isCity: true, travelTime: "25-30 Minuten", localInfo: "Ismaning nördlich von München ist ein Medienstandort mit modernen Bürogebäuden und gewachsenen Wohngebieten.", commonIssues: ["Komplettsanierung bei Eigentumsuebernahme", "Bodenverlegung nach Entkernung", "Elektroinstallation nach aktuellem Standard"] },
  { slug: "oberschleissheim", name: "Oberschleißheim", isCity: true, travelTime: "20-25 Minuten", localInfo: "Oberschleißheim ist bekannt für das Schloss Schleißheim und liegt nördlich von München mit vielen Wohnsiedlungen.", commonIssues: ["Waermepumpen-Nachruestung", "Photovoltaik-Installation", "Energetische Modernisierung"] },
  { slug: "vaterstetten", name: "Vaterstetten", isCity: true, travelTime: "25-30 Minuten", localInfo: "Vaterstetten östlich von München ist eine der größten Gemeinden im Landkreis Ebersberg mit vielen Einfamilienhäusern.", commonIssues: ["Mauerwerksabdichtung bei Altbauten", "Tuerenaustausch", "Sanitaerinstallation im Bad"] },
  { slug: "poing", name: "Poing", isCity: true, travelTime: "30-35 Minuten", localInfo: "Poing östlich von München wächst stark mit modernen Neubaugebieten und familienfreundlichen Siedlungen.", commonIssues: ["Sanierungsbedarf bei aelterer Haustechnik", "Elektro- und Sanitaerinstallation im Altbau", "Energetische Sanierung"] },
  { slug: "olching", name: "Olching", isCity: true, travelTime: "20-25 Minuten", localInfo: "Olching westlich von München liegt an der Amper und bietet eine Mischung aus Altbestand und Neubaugebieten.", commonIssues: ["Badsanierung in bestehenden Wohnungen", "Modernisierung der Heizungsanlage", "Malerarbeiten nach Umbau"] },
  { slug: "groebenzell", name: "Gröbenzell", isCity: true, travelTime: "15-20 Minuten", localInfo: "Gröbenzell liegt direkt westlich von München und ist eine kompakte Wohngemeinde mit vielen Einfamilienhäusern.", commonIssues: ["Komplettsanierung bei Eigentumsuebernahme", "Bodenverlegung nach Entkernung", "Elektroinstallation nach aktuellem Standard"] },
  { slug: "kirchheim", name: "Kirchheim", isCity: true, travelTime: "25-30 Minuten", localInfo: "Kirchheim bei München östlich der Landeshauptstadt ist eine wachsende Gemeinde mit Neubaugebieten und gewachsenen Ortsteilen.", commonIssues: ["Waermepumpen-Nachruestung", "Photovoltaik-Installation", "Energetische Modernisierung"] },
  { slug: "aschheim", name: "Aschheim", isCity: true, travelTime: "25-30 Minuten", localInfo: "Aschheim östlich von München ist ein bedeutender Gewerbestandort mit modernen Büro- und Wohngebäuden.", commonIssues: ["Mauerwerksabdichtung bei Altbauten", "Tuerenaustausch", "Sanitaerinstallation im Bad"] },
  { slug: "feldkirchen", name: "Feldkirchen", isCity: true, travelTime: "20-25 Minuten", localInfo: "Feldkirchen bei München östlich der Stadt bietet eine gute Verkehrsanbindung und vielfältige Wohn- und Gewerbebebauung.", commonIssues: ["Sanierungsbedarf bei aelterer Haustechnik", "Elektro- und Sanitaerinstallation im Altbau", "Energetische Sanierung"] },
  { slug: "neubiberg", name: "Neubiberg", isCity: true, travelTime: "20-25 Minuten", localInfo: "Neubiberg südöstlich von München ist bekannt für die Universität der Bundeswehr und gepflegte Wohngebiete.", commonIssues: ["Badsanierung in bestehenden Wohnungen", "Modernisierung der Heizungsanlage", "Malerarbeiten nach Umbau"] },
  { slug: "putzbrunn", name: "Putzbrunn", isCity: true, travelTime: "25-30 Minuten", localInfo: "Putzbrunn südöstlich von München ist eine ruhige Wohngemeinde mit überwiegend Einfamilienhäusern und Reihenhäusern.", commonIssues: ["Komplettsanierung bei Eigentumsuebernahme", "Bodenverlegung nach Entkernung", "Elektroinstallation nach aktuellem Standard"] }
];

function generateDistrictContent(d: DistrictData): PageContent {
  const locationPrefix = d.isCity ? "" : "München-";
  const fullLocation = `${locationPrefix}${d.name}`;

  return {
    h1: `Komplettsanierung ${d.name} -- Haus und Wohnung aus einer Hand`,
    intro: `Sie planen eine Sanierung oder Renovierung in ${fullLocation} und moechten nicht mehrere Handwerksbetriebe einzeln koordinieren? Renodex uebernimmt das fuer Sie: Elektro, Sanitaer, Heizung, Waermepumpe, Photovoltaik und weitere Gewerke aus einer Hand. Mit einer Anfahrtszeit von rund ${d.travelTime} sind wir zuegig bei Ihnen vor Ort. Kontaktieren Sie uns fuer eine kostenlose Erstberatung: [Telefon folgt] oder info@renodex.de.`,
    sections: [
      {
        heading: `Renodex in ${d.name}`,
        text: `${d.localInfo} Besonders haeufig beauftragt werden wir in ${d.name} fuer: ${d.commonIssues.join(", ")}. Bei jedem Vorhaben beraten wir ehrlich, was tatsaechlich sinnvoll ist -- unabhaengig davon, ob es sich um eine einzelne Massnahme oder eine Komplettsanierung handelt.`
      },
      {
        heading: `Unsere Leistungen in ${d.name}`,
        text: `Ob einzelne Renovierung oder Komplettsanierung von Haus und Wohnung -- in ${fullLocation} koordinieren wir Elektroinstallation, Sanitaerinstallation, Heizungsinstallation, Waermepumpe, Photovoltaik, Badsanierung, Bodenverlegung, Malerarbeiten sowie Dachdecker- und Spenglerarbeiten aus einer Hand. Jedes Projekt beginnt mit einer kostenlosen Erstberatung, danach folgt eine Besichtigung vor Ort und ein detailliertes Angebot mit allen Leistungen.`
      },
      {
        heading: `So laeuft eine Zusammenarbeit in ${d.name} ab`,
        text: `Nach der Erstberatung vereinbaren wir einen Termin zur Besichtigung. Sie erhalten anschliessend ein Angebot mit allen beteiligten Gewerken. Waehrend der Ausfuehrung koordinieren wir die Fachbetriebe, sodass Sie einen Ansprechpartner haben -- bis zur gemeinsamen Abnahme.`
      },
      {
        heading: `Warum Renodex in ${d.name} waehlen?`,
        text: `Renodex ist ein Partnernetzwerk aus geprueften Meisterfirmen. Sie sprechen mit einer Stelle, wir koordinieren die beteiligten Gewerke untereinander -- statt dass Sie selbst mehrere Handwerksbetriebe abstimmen muessen. Wir beraten ehrlich, was fuer Ihr Vorhaben in ${d.name} wirklich sinnvoll ist.`
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
