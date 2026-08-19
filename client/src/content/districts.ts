export interface DistrictContent {
  intro: string;
  localExpertise: string;
  services: string;
  whyChooseUs: string;
  emergencyService: string;
  qualityPromise: string;
}

export interface DistrictConfigBase {
  slug: string;
  name: string;
  fullName: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  localInfo: string;
  travelTime: string;
  commonIssues: string[];
  nearbyDistricts: string[];
  isCity: boolean;
}

export interface DistrictConfig extends DistrictConfigBase {
  mainKeyword: string;
  secondaryKeywords: string[];
  content: DistrictContent;
}

function generateDistrictContent(district: DistrictConfigBase): DistrictContent {
  const locationPrefix = district.isCity ? "" : "München-";
  const fullLocation = `${locationPrefix}${district.name}`;

  return {
    // NLP: Problem-Identifikation + Empathie + Erste Lösung
    intro: `Ein Bad, das dringend erneuert werden müsste. Eine Heizung, die nicht mehr richtig zieht. Elektrik, die nicht mehr dem heutigen Standard entspricht. Als Hausbesitzer oder Wohnungseigentümer in ${district.name} kennen Sie das: Sanierungsbedarf zeigt sich selten an nur einer Stelle. Genau deshalb hat Renodex als Partnernetzwerk in ${fullLocation} einen einfachen Ansatz: Komplettsanierung von Haus und Wohnung aus einer Hand, statt für jedes Gewerk einen anderen Handwerker zu suchen. Zeigen Sie uns Ihr Vorhaben digital – per Foto, Video oder Sprachnachricht – und wir melden uns mit den nächsten Schritten zurück, ohne dass Sie dafür in einer Warteschleife hängen müssen.`,

    // NLP: Lokale Expertise + Spezifisches Verständnis
    localExpertise: `${district.localInfo} Renodex koordiniert als Partnernetzwerk aus geprüften Partner-Meisterfirmen die Sanierung von Haus und Wohnung in ${district.name} – von der Elektroinstallation über Sanitär und Heizung bis zur Komplettsanierung. Besonders häufig geht es dabei in ${district.name} um: ${district.commonIssues.join(", ")}. Jede Immobilie hat ihre eigene Geschichte, und genau deshalb beginnt jede Zusammenarbeit mit einer ehrlichen Einschätzung: Was ist wirklich nötig, und was kann warten?`,

    // NLP: Konkrete Lösungen + Nutzen
    services: `Ob einzelnes Gewerk oder Komplettsanierung – in ${district.name} deckt Renodex das volle Leistungsspektrum rund um Haus und Wohnung ab: Sanierung und Renovierung, Badsanierung, Bodenverlegung, Malerarbeiten, Elektroinstallation, Sanitär, Heizung, Wärmepumpe und Photovoltaik. Bei energetischen Maßnahmen prüfen wir gemeinsam mit Ihnen, welche Förderprogramme (etwa KfW oder BAFA) für Ihr Vorhaben infrage kommen. Jedes Projekt in ${district.name} beginnt mit einer kostenlosen digitalen Erstberatung. Danach erhalten Sie ein individuelles Angebot – so wissen Sie von Anfang an, woran Sie sind.`,

    // NLP: Vertrauensaufbau + Differenzierung
    whyChooseUs: `Warum entscheiden sich Hausbesitzer und Wohnungseigentümer in ${district.name} für Renodex? Über unser Partnernetzwerk aus geprüften Partner-Meisterfirmen mit über 16 Jahren Erfahrung koordinieren wir alle Gewerke Ihrer Sanierung aus einer Hand – Sie haben einen Ansprechpartner statt vieler Einzelhandwerker. Wir sprechen offen über das, was zu tun ist, und über das, was warten kann. Kein Verkaufsdruck, sondern eine Entscheidung, die Sie in Ruhe treffen können.`,

    // NLP: Digitale Erreichbarkeit statt Notdienst-Dringlichkeit
    emergencyService: `Bei akutem Handlungsbedarf – etwa Wasserschaden oder Heizungsausfall – erreichen Sie Renodex digital: ein Foto oder eine kurze Videoaufnahme des Problems reicht meist, damit wir die Lage einschätzen können. In ${district.name} melden wir uns in der Regel noch am selben Werktag zurück und besprechen die nächsten Schritte mit Ihnen – schriftlich per E-Mail, damit Sie in Ruhe nachlesen können, statt auf einen Rückruf zu warten.`,

    // NLP: Qualitätsversprechen + Abschluss
    qualityPromise: `Renodex steht für koordinierte Sanierung aus einer Hand in ${district.name}: über 16 Jahre Erfahrung im Partnernetzwerk, geprüfte Partner-Meisterfirmen und ein Ansprechpartner für alle Gewerke Ihrer Sanierung. Nach Abschluss der Arbeiten erhalten Sie eine vollständige Dokumentation. Kontaktieren Sie uns für eine kostenlose, unverbindliche digitale Erstberatung – wir nehmen uns Zeit für Ihr Anliegen und zeigen Ihnen ehrlich, welche Optionen Sie haben.`
  };
}

function generateMainKeyword(name: string, isCity: boolean): string {
  return `Komplettsanierung ${name}${isCity ? "" : " München"}`;
}

function generateSecondaryKeywords(name: string): string[] {
  return [
    `Sanierung ${name}`,
    `Renovierung ${name}`,
    `Badsanierung ${name}`,
    `Bodenverlegung ${name}`,
    `Malerarbeiten ${name}`,
    `Elektroinstallation ${name}`,
    `Sanitärinstallation ${name}`,
    `Heizungsinstallation ${name}`,
    `Wärmepumpe ${name}`,
    `Photovoltaik ${name}`,
    `Haussanierung ${name}`,
    `Wohnungssanierung ${name}`,
    `Komplettsanierung Kosten ${name}`,
    `Partnernetzwerk ${name}`
  ];
}

function enrichDistrict(base: DistrictConfigBase): DistrictConfig {
  return {
    ...base,
    mainKeyword: generateMainKeyword(base.name, base.isCity),
    secondaryKeywords: generateSecondaryKeywords(base.name),
    content: generateDistrictContent(base)
  };
}

const baseDistricts: DistrictConfigBase[] = [
  {
    slug: "allach",
    name: "Allach",
    fullName: "München-Allach",
    metaTitle: "Allach Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Allach: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Allach – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Allach? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Allach liegt im Nordwesten Münchens und ist geprägt von Einfamilienhäusern und Siedlungen aus den 1950er- bis 1980er-Jahren, deren Dämmung und Haustechnik heute vielfach das typische Sanierungsalter erreicht haben.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Energetische Sanierung", "Badsanierung", "Heizungsmodernisierung"],
    nearbyDistricts: ["untermenzing", "moosach", "feldmoching"],
    isCity: false
  },
  {
    slug: "aubing",
    name: "Aubing",
    fullName: "München-Aubing",
    metaTitle: "Aubing Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Aubing: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Aubing – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Aubing? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Aubing ist Münchens westlichster Stadtteil mit vielen Reihenhäusern und neueren Baugebieten, die dank guter S-Bahn-Anbindung stark nachgefragt sind und punktuelle Modernisierung brauchen.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Bodenverlegung"],
    nearbyDistricts: ["pasing", "laim", "obermenzing"],
    isCity: false
  },
  {
    slug: "berg-am-laim",
    name: "Berg am Laim",
    fullName: "München-Berg am Laim",
    metaTitle: "Berg am Laim Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Berg am Laim: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Berg am Laim – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Berg am Laim? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Berg am Laim verbindet Altbau-Charme mit modernen Wohnanlagen – die vielfältige Bausubstanz aus mehreren Jahrzehnten erfordert entsprechend unterschiedliche Sanierungslösungen je nach Baujahrgang.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Elektroinstallation", "Badsanierung", "Energetische Sanierung"],
    nearbyDistricts: ["ramersdorf", "trudering", "haidhausen"],
    isCity: false
  },
  {
    slug: "bogenhausen",
    name: "Bogenhausen",
    fullName: "München-Bogenhausen",
    metaTitle: "Bogenhausen Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Bogenhausen: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Bogenhausen – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Bogenhausen? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Bogenhausen zählt zu Münchens exklusivsten Wohnlagen mit historischen Villen und hochwertigen Wohnanlagen, bei denen Sanierungen besondere Sorgfalt bei Material und Ausführung verlangen.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Fassadenarbeiten", "Energetische Sanierung"],
    nearbyDistricts: ["haidhausen", "schwabing", "berg-am-laim"],
    isCity: false
  },
  {
    slug: "feldmoching",
    name: "Feldmoching",
    fullName: "München-Feldmoching",
    metaTitle: "Feldmoching Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Feldmoching: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Feldmoching – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Feldmoching? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Feldmoching im Münchner Norden bietet ländlichen Charakter mit vielen Einfamilienhäusern älterer Baujahrgänge, die oft eine umfassende energetische Modernisierung brauchen.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Energetische Sanierung", "Heizungsmodernisierung", "Fenstertausch"],
    nearbyDistricts: ["milbertshofen", "allach", "unterschleissheim"],
    isCity: false
  },
  {
    slug: "hadern",
    name: "Hadern",
    fullName: "München-Hadern",
    metaTitle: "Hadern Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Hadern: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Hadern – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Hadern? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Hadern liegt im Südwesten Münchens, geprägt von Wohnsiedlungen der Nachkriegszeit und dem Klinikum Großhadern – viele Gebäude erreichen hier inzwischen ihr typisches Sanierungsalter.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Energetische Sanierung", "Badsanierung", "Elektroinstallation"],
    nearbyDistricts: ["sendling", "laim", "solln"],
    isCity: false
  },
  {
    slug: "haidhausen",
    name: "Haidhausen",
    fullName: "München-Haidhausen",
    metaTitle: "Haidhausen Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Haidhausen: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Haidhausen – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Haidhausen? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Haidhausen ist bekannt für seine Gründerzeit-Altbauten und das Franzosenviertel, wo Elektrik und Sanitär in vielen Wohnungen seit Jahrzehnten nicht mehr grundlegend erneuert wurden.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Elektroinstallation", "Badsanierung", "Fassadenarbeiten"],
    nearbyDistricts: ["berg-am-laim", "maxvorstadt", "bogenhausen"],
    isCity: false
  },
  {
    slug: "laim",
    name: "Laim",
    fullName: "München-Laim",
    metaTitle: "Laim Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Laim: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Laim – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Laim? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Laim ist geprägt von Mehrfamilienhäusern und Reihenhäusern verschiedener Nachkriegsjahrzehnte rund um den Bahnhof, mit entsprechend unterschiedlichem Sanierungsbedarf je nach Baujahrgang.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
    nearbyDistricts: ["pasing", "neuhausen", "schwanthalerhoehe"],
    isCity: false
  },
  {
    slug: "lehel",
    name: "Lehel",
    fullName: "München-Lehel",
    metaTitle: "Lehel Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Lehel: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Lehel – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Lehel? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Das Lehel zählt zu den dichtesten Altbau- und Gründerzeitvierteln Münchens, oft mit Stuckfassaden, bei denen Modernisierungen den historischen Charakter der Gebäude berücksichtigen müssen.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Elektroinstallation", "Badsanierung", "Fassadenarbeiten"],
    nearbyDistricts: ["schwabing", "haidhausen", "maxvorstadt"],
    isCity: false
  },
  {
    slug: "maxvorstadt",
    name: "Maxvorstadt",
    fullName: "München-Maxvorstadt",
    metaTitle: "Maxvorstadt Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Maxvorstadt: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Maxvorstadt – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Maxvorstadt? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Die Maxvorstadt ist ein dichtes Gründerzeitviertel mit vielen Altbauten aus der Zeit um 1900, deren Elektrik und Sanitärinstallation häufig nicht mehr dem heutigen Standard entsprechen.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Elektroinstallation", "Badsanierung", "Bodenverlegung"],
    nearbyDistricts: ["schwabing", "neuhausen", "lehel"],
    isCity: false
  },
  {
    slug: "milbertshofen",
    name: "Milbertshofen",
    fullName: "München-Milbertshofen",
    metaTitle: "Milbertshofen Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Milbertshofen: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Milbertshofen – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Milbertshofen? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Milbertshofen ist geprägt von Industrienähe und Wohnbebauung mehrerer Nachkriegsjahrzehnte, bei der energetische Sanierung und Modernisierung der Haustechnik im Vordergrund stehen.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Energetische Sanierung", "Heizungsmodernisierung", "Badsanierung"],
    nearbyDistricts: ["schwabing", "moosach", "feldmoching"],
    isCity: false
  },
  {
    slug: "moosach",
    name: "Moosach",
    fullName: "München-Moosach",
    metaTitle: "Moosach Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Moosach: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Moosach – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Moosach? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Moosach vereint Siedlungsbau der 1950er- bis 1970er-Jahre mit neueren Wohngebieten, wobei bei den älteren Gebäuden vor allem Heizung, Fenster und Elektrik anstehen.",
    travelTime: "10-15 Minuten",
    commonIssues: ["Heizungsmodernisierung", "Fenstertausch", "Elektroinstallation"],
    nearbyDistricts: ["allach", "neuhausen", "milbertshofen"],
    isCity: false
  },
  {
    slug: "neuhausen",
    name: "Neuhausen",
    fullName: "München-Neuhausen",
    metaTitle: "Neuhausen Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Neuhausen: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Neuhausen – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Neuhausen? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Neuhausen ist geprägt von dichter Gründerzeitbebauung aus der Zeit um 1900 mit hohen Altbauwohnungen, ergänzt durch Bauten der 1920er- und 1930er-Jahre nahe dem Nymphenburger Schlosspark.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Elektroinstallation", "Badsanierung", "Fenstertausch"],
    nearbyDistricts: ["nymphenburg", "moosach", "laim"],
    isCity: false
  },
  {
    slug: "nymphenburg",
    name: "Nymphenburg",
    fullName: "München-Nymphenburg",
    metaTitle: "Nymphenburg Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Nymphenburg: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Nymphenburg – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Nymphenburg? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Nymphenburg ist geprägt von großzügigen Altbauvillen und Mehrfamilienhäusern aus der Zeit zwischen 1900 und 1930 rund um den Schlosspark, mit entsprechend hochwertiger, aber sanierungsbedürftiger Bausubstanz.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Fassadenarbeiten", "Badsanierung", "Heizungsmodernisierung"],
    nearbyDistricts: ["neuhausen", "obermenzing", "pasing"],
    isCity: false
  },
  {
    slug: "obermenzing",
    name: "Obermenzing",
    fullName: "München-Obermenzing",
    metaTitle: "Obermenzing Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Obermenzing: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Obermenzing – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Obermenzing? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Obermenzing ist ein ruhiges Villen- und Einfamilienhausviertel mit Bebauung überwiegend aus den 1930er- bis 1960er-Jahren, entsprechend rückt bei vielen Häusern die energetische Modernisierung in den Fokus.",
    travelTime: "10-15 Minuten",
    commonIssues: ["Energetische Sanierung", "Heizungsmodernisierung", "Fassadenarbeiten"],
    nearbyDistricts: ["pasing", "untermenzing", "allach"],
    isCity: false
  },
  {
    slug: "obergiesing",
    name: "Obergiesing",
    fullName: "München-Obergiesing",
    metaTitle: "Obergiesing Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Obergiesing: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Obergiesing – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Obergiesing? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Obergiesing ist ein ehemaliges Arbeiterviertel mit dichter Blockrandbebauung aus der Zeit um 1900 bis 1920, ergänzt durch Nachkriegsbauten, mit entsprechendem Sanierungsbedarf bei Elektrik und Bädern.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Elektroinstallation", "Badsanierung", "Bodenverlegung"],
    nearbyDistricts: ["sendling", "perlach", "ramersdorf"],
    isCity: false
  },
  {
    slug: "pasing",
    name: "Pasing",
    fullName: "München-Pasing",
    metaTitle: "Pasing Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Pasing: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Pasing – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Pasing? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Pasing war bis 1938 eine eigenständige Stadt und vereint einen historischen Ortskern mit gemischter Bebauung aus mehreren Jahrzehnten – von Altbauten um 1900 bis zu Nachkriegsbauten rund um den Bahnhof.",
    travelTime: "10-15 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Fenstertausch"],
    nearbyDistricts: ["obermenzing", "laim", "aubing"],
    isCity: false
  },
  {
    slug: "perlach",
    name: "Perlach",
    fullName: "München-Perlach",
    metaTitle: "Perlach Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Perlach: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Perlach – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Perlach? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Perlach ist geprägt von der Großwohnsiedlung Neuperlach aus den 1960er- und 1970er-Jahren mit umfangreichem Geschosswohnungsbau, bei dem energetische Sanierung und Modernisierung der Haustechnik im Vordergrund stehen.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Energetische Sanierung", "Heizungsmodernisierung", "Fenstertausch"],
    nearbyDistricts: ["ramersdorf", "trudering", "obergiesing"],
    isCity: false
  },
  {
    slug: "ramersdorf",
    name: "Ramersdorf",
    fullName: "München-Ramersdorf",
    metaTitle: "Ramersdorf Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Ramersdorf: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Ramersdorf – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Ramersdorf? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Ramersdorf vereint Genossenschaftssiedlungen aus den 1930er-Jahren mit Nachkriegs- und späterer Nachverdichtungsbebauung, mit entsprechend unterschiedlichem Sanierungsbedarf je nach Baualter.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
    nearbyDistricts: ["berg-am-laim", "perlach", "obergiesing"],
    isCity: false
  },
  {
    slug: "schwabing",
    name: "Schwabing",
    fullName: "München-Schwabing",
    metaTitle: "Schwabing Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Schwabing: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Schwabing – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Schwabing? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Schwabing ist geprägt von dichter Gründerzeit- und Jugendstilbebauung aus der Zeit um 1900, oft mit Stuckfassaden und unter besonderen Auflagen für den Erhalt des historischen Charakters.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Elektroinstallation", "Badsanierung", "Fassadenarbeiten"],
    nearbyDistricts: ["maxvorstadt", "milbertshofen", "bogenhausen"],
    isCity: false
  },
  {
    slug: "schwanthalerhoehe",
    name: "Schwanthalerhöhe",
    fullName: "München-Schwanthalerhöhe",
    metaTitle: "Schwanthalerhöhe Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Schwanthalerhöhe: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Schwanthalerhöhe – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Schwanthalerhöhe? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Schwanthalerhöhe ist ein ehemaliges Arbeiterviertel mit kompakter, dichter Altbaubebauung um 1900, das seit einigen Jahren zunehmend saniert und aufgewertet wird.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Elektroinstallation", "Badsanierung", "Bodenverlegung"],
    nearbyDistricts: ["laim", "sendling", "neuhausen"],
    isCity: false
  },
  {
    slug: "sendling",
    name: "Sendling",
    fullName: "München-Sendling",
    metaTitle: "Sendling Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Sendling: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Sendling – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Sendling? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Sendling ist ein ehemaliges Arbeiterviertel mit gemischter Bebauung aus Altbauten um 1900 und Nachkriegsbauten, mit entsprechend unterschiedlichem Sanierungsbedarf.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Trockenbau/Innenausbau"],
    nearbyDistricts: ["schwanthalerhoehe", "hadern", "solln"],
    isCity: false
  },
  {
    slug: "solln",
    name: "Solln",
    fullName: "München-Solln",
    metaTitle: "Solln Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Solln: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Solln – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Solln? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Solln ist ein gehobenes Villenviertel mit großzügigen Einfamilienhäusern aus den 1920er- bis 1960er-Jahren und hohem Grünanteil, bei dem Sanierungen oft mit besonderem Anspruch an Qualität und Optik verbunden sind.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Wärmepumpe", "Fassadenarbeiten"],
    nearbyDistricts: ["sendling", "hadern", "perlach"],
    isCity: false
  },
  {
    slug: "trudering",
    name: "Trudering",
    fullName: "München-Trudering",
    metaTitle: "Trudering Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Trudering: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Trudering – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Trudering? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Trudering ist ein Einfamilienhaus-Siedlungsgebiet am östlichen Stadtrand mit Bebauung überwiegend aus den 1950er- bis 1970er-Jahren, bei dem energetische Sanierung zunehmend gefragt ist.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Energetische Sanierung", "Heizungsmodernisierung", "Fenstertausch"],
    nearbyDistricts: ["riem", "perlach", "ramersdorf"],
    isCity: false
  },
  {
    slug: "riem",
    name: "Riem",
    fullName: "München-Riem",
    metaTitle: "Riem Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Riem: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Riem – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Riem? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Riem ist mit der Messestadt Riem eines der jüngsten Münchner Stadtquartiere: Auf dem Gelände des ehemaligen Flughafens entstand seit 1998 ein komplett neu geplantes Wohngebiet mit modernem Baustandard.",
    travelTime: "30-35 Minuten",
    commonIssues: ["Trockenbau/Innenausbau", "Badsanierung", "Bodenverlegung"],
    nearbyDistricts: ["trudering", "berg-am-laim", "perlach"],
    isCity: false
  },
  {
    slug: "untermenzing",
    name: "Untermenzing",
    fullName: "München-Untermenzing",
    metaTitle: "Untermenzing Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Untermenzing: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Untermenzing – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Untermenzing? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Untermenzing ist geprägt von aufgelockerter Nachkriegsbebauung: Ein- und Zweifamilienhäuser sowie Reihenhaussiedlungen mit kleinen Gärten aus den 1950er- bis 1970er-Jahren dominieren das Stadtbild.",
    travelTime: "5-10 Minuten",
    commonIssues: ["Heizungsmodernisierung", "Fenstertausch", "Badsanierung"],
    nearbyDistricts: ["allach", "obermenzing", "moosach"],
    isCity: false
  },
  {
    slug: "germering",
    name: "Germering",
    fullName: "Germering",
    metaTitle: "Germering Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Germering: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Germering – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Germering? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Germering ist die sechstgrößte Stadt Oberbayerns und wuchs vor allem seit den 1960er-Jahren durch die S-Bahn-Anbindung stark an; entsprechend prägen Wohnbebauung der 1960er- bis 1980er-Jahre das Stadtbild.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Energetische Sanierung", "Badsanierung", "Elektroinstallation"],
    nearbyDistricts: ["aubing", "fuerstenfeldbruck", "pasing"],
    isCity: true
  },
  {
    slug: "unterschleissheim",
    name: "Unterschleißheim",
    fullName: "Unterschleißheim",
    metaTitle: "Unterschleißheim Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Unterschleißheim: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Unterschleißheim – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Unterschleißheim? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Unterschleißheim wuchs von rund 5.000 Einwohnern in den 1950er-Jahren auf heute knapp 30.000 – Wohnbebauung aus den 1970er-Jahren prägt den Ortsteil Lohhof, während neuere Gebiete jüngeren Baustandard zeigen.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Energetische Sanierung", "Heizungsmodernisierung", "Badsanierung"],
    nearbyDistricts: ["garching", "feldmoching", "dachau"],
    isCity: true
  },
  {
    slug: "garching",
    name: "Garching",
    fullName: "Garching bei München",
    metaTitle: "Garching Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Garching: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Garching – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Garching? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Garching hat sich von einem Bauerndorf zu einem Forschungsstandort mit lockerer Einfamilienhaus- und Reihenhausbebauung aus den 1950er- bis 1970er-Jahren entwickelt, bei der Modernisierungsbedarf besteht.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Energetische Sanierung", "Badsanierung", "Fenstertausch"],
    nearbyDistricts: ["unterschleissheim", "oberschleissheim", "feldmoching"],
    isCity: true
  },
  {
    slug: "ottobrunn",
    name: "Ottobrunn",
    fullName: "Ottobrunn",
    metaTitle: "Ottobrunn Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Ottobrunn: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Ottobrunn – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Ottobrunn? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Ottobrunn entstand ab 1902 zunächst als Wochenendkolonie und wuchs nach 1945 durch starken Zuzug zu einer gehobenen Wohngemeinde mit Einfamilienhäusern unterschiedlichster Baujahrgänge heran.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Energetische Sanierung", "Fassadenarbeiten"],
    nearbyDistricts: ["unterhaching", "perlach", "ramersdorf"],
    isCity: true
  },
  {
    slug: "unterhaching",
    name: "Unterhaching",
    fullName: "Unterhaching",
    metaTitle: "Unterhaching Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Unterhaching: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Unterhaching – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Unterhaching? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Unterhaching ist geprägt von Einfamilienhäusern verschiedener Baujahrgänge zwischen den 1960er- und 1990er-Jahren, die heute zunehmend vor der Modernisierung ihrer Heiztechnik stehen.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Heizungsmodernisierung", "Wärmepumpe", "Badsanierung"],
    nearbyDistricts: ["ottobrunn", "perlach", "solln"],
    isCity: true
  },
  {
    slug: "haar",
    name: "Haar",
    fullName: "Haar",
    metaTitle: "Haar Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Haar: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Haar – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Haar? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Haar bietet eine Mischung aus Einfamilienhäusern und Geschosswohnungsbau aus mehreren Nachkriegsjahrzehnten, entsprechend unterschiedlich ist der Sanierungsbedarf.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
    nearbyDistricts: ["trudering", "vaterstetten", "feldkirchen"],
    isCity: true
  },
  {
    slug: "taufkirchen",
    name: "Taufkirchen",
    fullName: "Taufkirchen",
    metaTitle: "Taufkirchen Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Taufkirchen: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Taufkirchen – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Taufkirchen? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Taufkirchen hat sich parallel zur ansässigen Luft- und Raumfahrtindustrie entwickelt, mit Wohnbebauung aus mehreren Jahrzehnten seit den 1960er-Jahren.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Fenstertausch", "Energetische Sanierung", "Badsanierung"],
    nearbyDistricts: ["unterhaching", "ottobrunn", "neubiberg"],
    isCity: true
  },
  {
    slug: "graefelfing",
    name: "Gräfelfing",
    fullName: "Gräfelfing",
    metaTitle: "Gräfelfing Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Gräfelfing: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Gräfelfing – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Gräfelfing? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Gräfelfing zählt zu den gehobenen Wohnlagen im Münchner Westen, mit Einfamilienhäusern und Villen aus verschiedenen Bauepochen und entsprechend hohem Anspruch an Sanierungsqualität.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Badsanierung", "Fassadenarbeiten", "Energetische Sanierung"],
    nearbyDistricts: ["planegg", "pasing", "obermenzing"],
    isCity: true
  },
  {
    slug: "planegg",
    name: "Planegg",
    fullName: "Planegg",
    metaTitle: "Planegg Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Planegg: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Planegg – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Planegg? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Planegg im Würmtal ist geprägt von Einfamilienhäusern und Villen unterschiedlichen Alters in gehobener Wohnlage, mit entsprechend anspruchsvollem Sanierungsbedarf.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Badsanierung", "Energetische Sanierung", "Fassadenarbeiten"],
    nearbyDistricts: ["graefelfing", "solln", "hadern"],
    isCity: true
  },
  {
    slug: "pullach",
    name: "Pullach",
    fullName: "Pullach im Isartal",
    metaTitle: "Pullach Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Pullach: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Pullach – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Pullach? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Pullach zählt mit seiner Villenbebauung entlang des Isarhangs zu den gehobensten Wohnlagen im Münchner Süden, bei denen Sanierungen den Bestandscharakter respektieren müssen.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Fassadenarbeiten", "Energetische Sanierung"],
    nearbyDistricts: ["gruenwald", "solln", "unterhaching"],
    isCity: true
  },
  {
    slug: "gruenwald",
    name: "Grünwald",
    fullName: "Grünwald",
    metaTitle: "Grünwald Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Grünwald: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Grünwald – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Grünwald? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Grünwald ist eine der exklusivsten Wohnlagen im Münchner Umland, mit großzügigen Villen und Einfamilienhäusern auf großen Grundstücken, bei denen Sanierungsvorhaben besondere Sorgfalt verlangen.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Energetische Sanierung", "Fassadenarbeiten"],
    nearbyDistricts: ["pullach", "solln", "unterhaching"],
    isCity: true
  },
  {
    slug: "ismaning",
    name: "Ismaning",
    fullName: "Ismaning",
    metaTitle: "Ismaning Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Ismaning: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Ismaning – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Ismaning? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Ismaning geht auf eine Ersterwähnung im Jahr 809 zurück und verbindet einen historischen Ortskern mit Schloss und Schlosspark mit gewachsenen Einfamilienhausgebieten in Isar- und Flughafennähe.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Fassadenarbeiten", "Energetische Sanierung"],
    nearbyDistricts: ["garching", "unterschleissheim", "aschheim"],
    isCity: true
  },
  {
    slug: "oberschleissheim",
    name: "Oberschleißheim",
    fullName: "Oberschleißheim",
    metaTitle: "Oberschleißheim Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Oberschleißheim: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Oberschleißheim – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Oberschleißheim? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Die Bebauung Oberschleißheims ist stark von der Nachkriegszeit geprägt: Die Parksiedlung aus den 1960er-Jahren und die spätere Ertl-Siedlung bilden den Kern der Wohnbebauung.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Heizungsmodernisierung", "Energetische Sanierung", "Fenstertausch"],
    nearbyDistricts: ["unterschleissheim", "garching", "feldmoching"],
    isCity: true
  },
  {
    slug: "vaterstetten",
    name: "Vaterstetten",
    fullName: "Vaterstetten",
    metaTitle: "Vaterstetten Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Vaterstetten: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Vaterstetten – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Vaterstetten? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Vaterstetten gilt seit der Bahnanbindung 1871 als Gartenstadt mit großzügig bebauten Grundstücken und viel Grün – ein Charakter, der bis heute die Einfamilienhausgebiete prägt.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Bodenverlegung", "Energetische Sanierung"],
    nearbyDistricts: ["haar", "poing", "kirchheim"],
    isCity: true
  },
  {
    slug: "poing",
    name: "Poing",
    fullName: "Poing",
    metaTitle: "Poing Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Poing: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Poing – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Poing? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Poing ist eine der am stärksten gewachsenen Gemeinden im Münchner Osten: Seit 1990 hat sich die Einwohnerzahl mehr als verdoppelt, vor allem durch neue Wohngebiete nördlich der Bahnlinie.",
    travelTime: "30-35 Minuten",
    commonIssues: ["Trockenbau/Innenausbau", "Elektroinstallation", "Badsanierung"],
    nearbyDistricts: ["vaterstetten", "kirchheim", "haar"],
    isCity: true
  },
  {
    slug: "olching",
    name: "Olching",
    fullName: "Olching",
    metaTitle: "Olching Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Olching: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Olching – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Olching? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Olching hat seine Wurzeln als Arbeitersiedlung am Dachauer Moos, aus der nach 1949 die Ampersiedlung und ab 1978 weitere Wohngebiete entstanden, die heute Modernisierungsbedarf haben.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Heizungsmodernisierung", "Fenstertausch", "Energetische Sanierung"],
    nearbyDistricts: ["groebenzell", "fuerstenfeldbruck", "germering"],
    isCity: true
  },
  {
    slug: "groebenzell",
    name: "Gröbenzell",
    fullName: "Gröbenzell",
    metaTitle: "Gröbenzell Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Gröbenzell: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Gröbenzell – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Gröbenzell? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Gröbenzell ist geprägt von den Reihenhaussiedlungen der 1960er- und 70er-Jahre, allen voran der rund 250 Häuser umfassenden EIWO-Siedlung, die heute Modernisierung benötigen.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Badsanierung", "Energetische Sanierung", "Fenstertausch"],
    nearbyDistricts: ["olching", "obermenzing", "allach"],
    isCity: true
  },
  {
    slug: "kirchheim",
    name: "Kirchheim",
    fullName: "Kirchheim bei München",
    metaTitle: "Kirchheim Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Kirchheim: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Kirchheim – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Kirchheim? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Kirchheim bei München verbindet einen dörflich geprägten Ortskern mit gewachsenen Wohngebieten, die seit dem S-Bahn-Anschluss 1972 entstanden sind.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Fassadenarbeiten"],
    nearbyDistricts: ["haar", "vaterstetten", "aschheim"],
    isCity: true
  },
  {
    slug: "aschheim",
    name: "Aschheim",
    fullName: "Aschheim",
    metaTitle: "Aschheim Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Aschheim: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Aschheim – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Aschheim? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Aschheim fördert seit dem 'Aschheimer Modell' von 1985/86 gezielt Baugrund für Familien, entsprechend ist ein großer Teil der Wohnbebauung jünger als in vielen Nachbarorten.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Trockenbau/Innenausbau", "Badsanierung", "Bodenverlegung"],
    nearbyDistricts: ["feldkirchen", "kirchheim", "ismaning"],
    isCity: true
  },
  {
    slug: "feldkirchen",
    name: "Feldkirchen",
    fullName: "Feldkirchen bei München",
    metaTitle: "Feldkirchen Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Feldkirchen: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Feldkirchen – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Feldkirchen? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Feldkirchen war lange ein landwirtschaftlich geprägtes Dorf, was sich noch heute in älteren Hofgebäuden und Wohnhäusern zeigt, während gleichzeitig neue Wohnbebauung entsteht.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Heizungsmodernisierung", "Elektroinstallation", "Badsanierung"],
    nearbyDistricts: ["aschheim", "haar", "trudering"],
    isCity: true
  },
  {
    slug: "neubiberg",
    name: "Neubiberg",
    fullName: "Neubiberg",
    metaTitle: "Neubiberg Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Neubiberg: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Neubiberg – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Neubiberg? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Neubiberg ist seit seiner Gründung 1912 als Gartenstadt angelegt und hat diesen Charakter mit locker bebauten Grundstücken bis heute bewahrt, mit Siedlungen aus den 1940er- bis 1960er-Jahren.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Energetische Sanierung", "Fenstertausch"],
    nearbyDistricts: ["ottobrunn", "unterhaching", "taufkirchen"],
    isCity: true
  },
  {
    slug: "putzbrunn",
    name: "Putzbrunn",
    fullName: "Putzbrunn",
    metaTitle: "Putzbrunn Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Putzbrunn: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Putzbrunn – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Putzbrunn? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Putzbrunn hat sich trotz der Nähe zu München bewusst gegen eine übermäßige Verdichtung entschieden und seinen ländlichen, familienfreundlichen Charakter mit individuell gewachsenen Wohnhäusern erhalten.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Bodenverlegung", "Trockenbau/Innenausbau"],
    nearbyDistricts: ["neubiberg", "ottobrunn", "haar"],
    isCity: true
  },
  {
    slug: "dachau",
    name: "Dachau",
    fullName: "Dachau",
    metaTitle: "Dachau Komplettsanierung | Renodex",
    metaDescription: "Renodex saniert Haus und Wohnung in Dachau: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.",
    heroHeadline: "Renodex in Dachau – Sanierung aus einer Hand",
    heroSubheadline: "Sanierungsbedarf in Dachau? Als Partnernetzwerk koordinieren wir alle Gewerke für Sie – von der digitalen Erstberatung bis zur Abnahme.",
    localInfo: "Dachau ist städtebaulich zweigeteilt: die historische Altstadt rund um Schloss und Rathaus verlangt bei Sanierungen besondere Sorgfalt bei der Fassade, moderne Stadtteile wie der Udldinger Hang haben andere Anforderungen.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Fassadenarbeiten", "Badsanierung", "Energetische Sanierung"],
    nearbyDistricts: ["feldmoching", "unterschleissheim", "olching"],
    isCity: true
  }
];

// Enrich all districts with generated content
export const districts: DistrictConfig[] = baseDistricts.map(enrichDistrict);

export function getDistrictBySlug(slug: string): DistrictConfig | undefined {
  return districts.find(d => d.slug === slug);
}

export function getAllDistrictSlugs(): string[] {
  return districts.map(d => d.slug);
}
