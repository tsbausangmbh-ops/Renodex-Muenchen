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
    localInfo: "Allach liegt im Nordwesten Münchens und zeichnet sich durch viele Einfamilienhäuser und Siedlungen aus den 1950er-80er Jahren aus. Diese Dächer benötigen oft Sanierungen.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Aubing ist Münchens westlichster Stadtteil mit vielen Reihenhäusern und Neubaugebieten. Die Nähe zur S-Bahn macht uns besonders schnell erreichbar.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Berg am Laim verbindet Altbau-Charme mit modernen Wohnanlagen. Die vielfältige Bausubstanz erfordert unterschiedliche Sanierungslösungen.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Bogenhausen zählt zu Münchens exklusivsten Wohnlagen mit historischen Villen und hochwertigen Wohnanlagen. Hier ist Präzisionsarbeit gefragt.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Feldmoching im Münchner Norden bietet ländlichen Charakter mit vielen Einfamilienhäusern. Die älteren Gebäude benötigen oft umfassende Sanierungen.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Hadern liegt im Südwesten Münchens, geprägt von Wohnsiedlungen der Nachkriegszeit und dem Klinikum Großhadern. Viele Dächer erreichen hier ihr Sanierungsalter.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Haidhausen ist bekannt für seine Altbauten und das Franzosenviertel. Hier arbeiten wir regelmäßig an historischen Dächern mit besonderen Anforderungen.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Laim verbindet zentrale Lage mit Wohnqualität. Die Mischung aus Altbau und Neubau erfordert vielseitige Sanierungs-Expertise.",
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
    localInfo: "Das Lehel ist Münchens ältester Stadtteil mit historischen Gebäuden und höchsten Ansprüchen. Hier ist Präzision und Erfahrung gefragt.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Die Maxvorstadt beherbergt Universitäten, Museen und prachtvolle Altbauten. Hier arbeiten wir an Dächern mit Geschichte und hohen Anforderungen.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Milbertshofen verbindet Industrie (BMW) mit Wohngebieten. Die Mischung aus Gewerbe- und Wohnimmobilien erfordert flexible Sanierungslösungen.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Moosach liegt im Nordwesten Münchens mit guter Verkehrsanbindung. Von hier aus erreichen wir Sie besonders schnell.",
    travelTime: "10-15 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Neuhausen-Nymphenburg besticht durch Altbau-Viertel und moderne Wohnanlagen. Die Mischung erfordert vielseitige Sanierungskompetenz.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Nymphenburg ist geprägt vom Schloss und exklusiven Villenvierteln. Hier arbeiten wir an Dächern, die höchste Ansprüche erfüllen müssen.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Obermenzing ist bekannt für seine Villen und gepflegten Einfamilienhäuser. Hier kennen wir die typische Bausubstanz gut.",
    travelTime: "10-15 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Obergiesing verbindet traditionelles München mit urbanem Flair. Die vielfältige Bausubstanz erfordert ein erfahrenes Partnernetzwerk.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Pasing ist das Zentrum des Münchner Westens mit eigenem Bahnhof und vielfältiger Bebauung. Von Altbau bis Neubau kennen wir die typische Bausubstanz.",
    travelTime: "10-15 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Perlach vereint das historische Alt-Perlach mit der Großsiedlung Neuperlach. Beide Gebiete haben unterschiedliche Sanierungsbedürfnisse.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Ramersdorf liegt im Münchner Osten und bietet eine Mischung aus Wohngebieten und Gewerbe. Hier begleiten wir vielfältige Sanierungsprojekte.",
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
    localInfo: "Schwabing ist Münchens bekanntestes Viertel mit historischen Altbauten und lebendiger Kultur. Hier arbeiten wir an Dächern mit Geschichte.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Die Schwanthalerhöhe, auch Westend genannt, ist ein urbanes Viertel mit Altbauten und modernen Gebäuden nahe der Theresienwiese.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Sendling verbindet traditionelles Handwerkerviertel mit modernem Wohnen. Die vielfältige Bausubstanz kennen wir aus langjähriger Erfahrung.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Solln ist eines der gehobensten Wohnviertel im Münchner Süden mit großzügigen Villen und gepflegten Einfamilienhäusern.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Trudering-Riem vereint das traditionelle Trudering mit dem modernen Messegelände. Hier finden sich Einfamilienhäuser und moderne Wohnanlagen.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Riem im Münchner Osten ist bekannt für die Messestadt und moderne Neubauviertel rund um das ehemalige Flughafengelände. Hier dominieren Flachdächer und zeitgenössische Konstruktionen.",
    travelTime: "30-35 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Untermenzing liegt direkt in unserer Nachbarschaft. Von hier aus erreichen wir Sie in kürzester Zeit – ideal bei dringenden Dachschäden.",
    travelTime: "5-10 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Germering ist eine wachsende Stadt westlich von München mit vielen Einfamilienhäusern und Neubaugebieten.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Unterschleißheim liegt nördlich von München mit vielen Gewerbegebieten und Wohnsiedlungen. Wir betreuen hier private und gewerbliche Kunden.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Garching ist bekannt für die TU München und Forschungseinrichtungen. Hier arbeiten wir an modernen Gebäuden und gewachsenen Wohngebieten.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Ottobrunn liegt südöstlich von München und ist bekannt für Luft- und Raumfahrtindustrie sowie gepflegte Wohngebiete.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Unterhaching ist eine wohlhabende Gemeinde südlich von München, bekannt für moderne Wohngebiete und die Geothermieanlage. Hier setzen wir auf energieeffiziente Sanierungslösungen.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Haar liegt östlich von München und ist eine familienfreundliche Gemeinde mit vielen Einfamilienhäusern und Reihenhaussiedlungen.",
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
    localInfo: "Taufkirchen im Münchner Süden bietet eine Mischung aus Wohn- und Gewerbegebieten mit modernen Neubauten.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Gräfelfing westlich von München ist eine gehobene Villenvorstadt mit großzügigen Grundstücken und hochwertigen Dächern.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Planegg liegt südwestlich von München und ist bekannt für den Biotech-Standort Martinsried und gepflegte Wohngebiete.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Pullach im Isartal südlich von München ist eine wohlhabende Gemeinde mit Villen und historischen Gebäuden entlang der Isar.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Grünwald an der Isar ist eine der wohlhabendsten Gemeinden Deutschlands mit exklusiven Villen und Anwesen.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Ismaning nördlich von München ist ein Medienstandort mit modernen Bürogebäuden und gewachsenen Wohngebieten.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Oberschleißheim ist bekannt für das Schloss Schleißheim und liegt nördlich von München mit vielen Wohnsiedlungen.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Vaterstetten östlich von München ist eine der größten Gemeinden im Landkreis Ebersberg mit vielen Einfamilienhäusern.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Poing östlich von München wächst stark mit modernen Neubaugebieten und familienfreundlichen Siedlungen.",
    travelTime: "30-35 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Olching westlich von München liegt an der Amper und bietet eine Mischung aus Altbestand und Neubaugebieten.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Gröbenzell liegt direkt westlich von München und ist eine kompakte Wohngemeinde mit vielen Einfamilienhäusern.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Kirchheim bei München östlich der Landeshauptstadt ist eine wachsende Gemeinde mit Neubaugebieten und gewachsenen Ortsteilen.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Aschheim östlich von München ist ein bedeutender Gewerbestandort mit modernen Büro- und Wohngebäuden.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Feldkirchen bei München östlich der Stadt bietet eine gute Verkehrsanbindung und vielfältige Wohn- und Gewerbebebauung.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Neubiberg südöstlich von München ist bekannt für die Universität der Bundeswehr und gepflegte Wohngebiete.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Putzbrunn südöstlich von München ist eine ruhige Wohngemeinde mit überwiegend Einfamilienhäusern und Reihenhäusern.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
    localInfo: "Dachau liegt nordwestlich von München und ist bekannt für seine Geschichte und viele Einfamilienhäuser. Wir betreuen private und gewerbliche Kunden im gesamten Landkreis.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Badsanierung", "Elektroinstallation", "Energetische Sanierung"],
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
