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
    // NLP: Problem-Identifikation + Empathie + Erste Lösung (~180 Wörter)
    intro: `Kennen Sie das Gefühl? Sie entdecken einen dunklen Fleck an der Decke, hören bei Regen ein verdächtiges Tropfen, oder bemerken, dass Ihre Heizkosten Jahr für Jahr steigen. Als Hausbesitzer in ${district.name} wissen Sie: Ein beschädigtes oder undichtes Dach bedeutet mehr als nur ein technisches Problem. Es bedeutet Stress, schlaflose Nächte und die ständige Sorge, was der nächste Sturm bringen könnte. Die Angst vor hohen Reparaturkosten lähmt viele Hausbesitzer – und führt dazu, dass kleine Schäden zu großen Problemen werden. Wir verstehen das genau. Genau deshalb haben wir als Ihr lokaler Dachdecker in ${fullLocation} eine Mission: Ihnen schnell, professionell und mit absoluter Preistransparenz zu helfen. Die Renodex ist mehr als ein Handwerksbetrieb. Wir sind Ihr Partner, der Ihre Sorgen ernst nimmt und Lösungen liefert, die halten. Mit einer Anfahrtszeit von nur ${district.travelTime} sind wir rasch bei Ihnen. Rufen Sie uns an unter [Telefon folgt] – wir nehmen Ihnen die Last vom Dach.`,
    
    // NLP: Lokale Expertise + Spezifische Problemverständnis (~200 Wörter)
    localExpertise: `${district.localInfo} Als Dachdecker mit über 25 Jahren Erfahrung in ${district.name} kennen wir jede typische Dachkonstruktion und die häufigsten Schwachstellen dieser Region. Wir haben Hunderte von Projekten in ${fullLocation} erfolgreich abgeschlossen und wissen genau, welche Herausforderungen hier auf Dächer warten. Besonders oft behandeln wir in ${district.name}: ${district.commonIssues.join(", ")}. Doch das ist nur die Oberfläche. Das Münchner Klima stellt besondere Anforderungen an jedes Dach. Föhnstürme mit Windgeschwindigkeiten über 100 km/h können Ziegel lösen und Dachrinnen beschädigen. Hagel hinterlässt unsichtbare Mikrorisse, die erst Monate später zu Undichtigkeiten führen. Starkregen testet jede Schwachstelle gnadenlos aus. Und die Schneelast im Winter kann bei älteren Dachstühlen zur echten Gefahr werden. Als lokaler Dachdecker in ${district.name} wissen wir, welche Materialien und Konstruktionen diesen Belastungen am besten standhalten. Wir beraten Sie ehrlich: Was muss wirklich gemacht werden, und was kann warten? Bei dringenden Notfällen sind wir innerhalb von 24 Stunden vor Ort – oft sogar schneller.`,
    
    // NLP: Konkrete Lösungen + Nutzen + Mehrwert (~200 Wörter)
    services: `Ob kleine Reparatur oder komplette Dachsanierung – in ${district.name} bieten wir das volle Leistungsspektrum moderner Dachtechnik. Unsere Dachsanierung erfolgt nach aktuellen EnEV-Standards und ist förderfähig: Sichern Sie sich bis zu 20% KfW-Förderung für energetische Maßnahmen. Bei der Dachreparatur beheben wir undichte Stellen, tauschen defekte Ziegel aus und reparieren beschädigte Rinnen – häufig noch am selben Tag. Unsere erfahrenen Spengler fertigen und montieren Dachrinnen, Fallrohre und Blechverkleidungen in Kupfer, Zink oder Aluminium nach Maß. Für Flachdächer setzen wir auf bewährte Abdichtungssysteme: EPDM-Folien für maximale Langlebigkeit, Bitumenbahnen für klassische Lösungen oder moderne Flüssigkunststoff-Beschichtungen. Darüber hinaus montieren wir Dachfenster von Velux und Roto, führen professionelle Dachdämmungen durch und begleiten Ihren Dachgeschossausbau von der Planung bis zur Fertigstellung. Jedes Projekt in ${district.name} beginnt mit einer kostenlosen Erstberatung vor Ort. Danach erhalten Sie ein verbindliches Festpreisangebot – detailliert, verständlich und ohne versteckte Kosten. So wissen Sie von Anfang an, was auf Sie zukommt. Kein Nachrechnen, keine bösen Überraschungen.`,
    
    // NLP: Vertrauensaufbau + Soziale Beweise + Differenzierung (~180 Wörter)
    whyChooseUs: `Warum entscheiden sich Hausbesitzer in ${district.name} für die Renodex? Die Antwort ist einfach: Vertrauen, Qualität und Nähe. Über unser Partnernetzwerk aus geprüften Partner-Meisterfirmen. Unsere Bau- und Sanierungsbetrieb sind keine angelernten Kräfte – sie sind ausgebildete Fachkräfte mit jahrelanger Berufserfahrung und regelmäßigen Weiterbildungen. Wir verwenden ausschließlich hochwertige Materialien namhafter Hersteller wie Braas, Creaton und Rheinzink. Auf alle Arbeiten geben wir eine 10-Jahres-Garantie – schriftlich und ohne Wenn und Aber. Unsere zahlreichen 5-Sterne-Bewertungen bei Google sprechen für sich: Über 100 zufriedene Kunden in ${district.name} haben uns bereits ihr Dach anvertraut, von der kleinen Reparatur bis zur Komplettsanierung. Bei uns arbeiten Sie direkt mit dem Meister zusammen. Keine Subunternehmer, keine Vermittler, keine langen Wartezeiten. Wir hinterlassen die Baustelle so sauber, wie wir sie vorgefunden haben. Und wenn Sie Fragen haben – auch nach Abschluss des Projekts – sind wir für Sie da.`,
    
    // NLP: Dringlichkeit + Soforthilfe + Emotionale Entlastung (~180 Wörter)
    emergencyService: `Sturmschaden? Wassereintritt? Panik? Atmen Sie erst einmal durch – wir sind für Sie da. Wir wissen, wie sich das anfühlt: Der Sturm ist gerade vorbei, Sie schauen hoch und sehen abgedeckte Ziegel. Oder Sie wachen nachts auf, weil es ins Schlafzimmer tropft. In solchen Momenten brauchen Sie schnelle, kompetente Hilfe – und keinen Anrufbeantworter. Der 24/7 Sofort-Hilfe der Renodex ist rund um die Uhr erreichbar, auch an Wochenenden und Feiertagen. In ${district.name} sind wir in nur ${district.travelTime} bei Ihnen. Rufen Sie uns jetzt an: [Telefon folgt]. Unser Sofort-Hilfe-Team sichert Ihr Dach sofort ab und verhindert weitere Schäden an Ihrem Gebäude. Wir dokumentieren den Schaden professionell für Ihre Versicherung und übernehmen die komplette Kommunikation mit Ihrem Versicherer. Sie müssen sich um nichts kümmern – wir erledigen das für Sie. In vielen Fällen trägt Ihre Gebäudeversicherung die gesamten Kosten für Sturmschäden. Lassen Sie uns das Dach-Problem für Sie lösen.`,
    
    // NLP: Qualitätsversprechen + Finale CTA mit Dringlichkeit (~180 Wörter)
    qualityPromise: `Die Renodex steht für Meisterqualität, faire Preise und persönlichen Service in ${district.name}. Nach Abschluss jeder Arbeit erhalten Sie eine vollständige Dokumentation: Gewährleistungsunterlagen, Pflegehinweise und individuelle Wartungsempfehlungen für Ihr Dach. Wir bleiben auch nach Projektabschluss Ihr Ansprechpartner – für Fragen, Wartung oder zukünftige Projekte. Was Sie von uns erwarten können: Über 25 Jahre Erfahrung im Münchner Raum. Handwerkskammer-geprüfte Meisterqualität. Transparente Festpreisgarantie ohne Nachforderungen. 10-Jahres-Gewährleistung auf alle Arbeiten. Saubere, termingerechte Ausführung. Professionelle Dachinspektion für nur 150 Euro mit detailliertem Zustandsbericht. Beratung zu KfW-Förderungen und Steuervorteilen. Warten Sie nicht, bis aus kleinen Schäden große Probleme werden. Ein undichtes Dach wird nicht besser, wenn man es ignoriert – es wird teurer. Je länger Sie warten, desto höher werden die Reparaturkosten. Kontaktieren Sie uns jetzt für eine kostenlose, unverbindliche Beratung: [Telefon folgt]. Wir nehmen uns Zeit für Ihr Anliegen und zeigen Ihnen ehrlich, welche Optionen Sie haben. Ihr Dach verdient das Beste – und Sie auch.`
  };
}

function generateMainKeyword(name: string, isCity: boolean): string {
  return `Dachdecker ${name}${isCity ? "" : " München"}`;
}

function generateSecondaryKeywords(name: string): string[] {
  return [
    `Dachsanierung ${name}`,
    `Dachreparatur ${name}`,
    `Dachdeckerei ${name}`,
    `Spengler ${name}`,
    `Dachrinnen ${name}`,
    `Sturmschaden ${name}`,
    `Dach undicht ${name}`,
    `Dachdecker Sofort-Hilfe ${name}`,
    `Dachziegel ${name}`,
    `Flachdach ${name}`,
    `Steildach ${name}`,
    `Dachfenster ${name}`,
    `Dachgeschossausbau ${name}`,
    `Wärmedämmung Dach ${name}`,
    `Dachdämmung ${name}`,
    `Dachinspektion ${name}`,
    `Dacharbeiten ${name}`,
    `Kupferdachrinne ${name}`,
    `Zinkdach ${name}`,
    `Blechdach ${name}`,
    `Dachstuhl ${name}`,
    `Dachlatten ${name}`,
    `Dachentwässerung ${name}`,
    `Schornstein ${name}`,
    `Dachbeschichtung ${name}`
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
    metaTitle: "Endlich sicher! Dachdecker Allach | Partnernetzwerk",
    metaDescription: "Dachdecker Allach: Dachsanierung, Reparatur & 24/7 Sofort-Hilfe. Spezialist für Ziegeldächer 1950er-80er. Festpreise. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Allach – Ihr Partnernetzwerk, vor Ort",
    heroSubheadline: "Dachprobleme in Allach? Wir sind schnell bei Ihnen – als lokaler Partnernetzwerk kennen wir die Dächer im Münchner Westen.",
    localInfo: "Allach liegt im Nordwesten Münchens und zeichnet sich durch viele Einfamilienhäuser und Siedlungen aus den 1950er-80er Jahren aus. Diese Dächer benötigen oft Sanierungen.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Sanierungsbedarf bei älteren Ziegeldächern", "Sturmschäden durch exponierte Lage", "Undichte Dachfenster"],
    nearbyDistricts: ["untermenzing", "moosach", "feldmoching"],
    isCity: false
  },
  {
    slug: "aubing",
    name: "Aubing",
    fullName: "München-Aubing",
    metaTitle: "Schnell & zuverlässig! Dachdecker Aubing München",
    metaDescription: "Dachdecker Aubing: Dachsanierung, Flachdach, Rinnenreinigung. Spezialist für Reihenhäuser & Neubauten. 24/7 Sofort-Hilfe. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Aubing – Schneller Service im Münchner Westen",
    heroSubheadline: "Ihr Dach in Aubing braucht Hilfe? Als lokaler Partnernetzwerk sind wir in kürzester Zeit bei Ihnen.",
    localInfo: "Aubing ist Münchens westlichster Stadtteil mit vielen Reihenhäusern und Neubaugebieten. Die Nähe zur S-Bahn macht uns besonders schnell erreichbar.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Flachdach-Probleme bei Neubauten", "Rinnenreinigung bei Baumbestand", "Dachbegrünung"],
    nearbyDistricts: ["pasing", "laim", "obermenzing"],
    isCity: false
  },
  {
    slug: "berg-am-laim",
    name: "Berg am Laim",
    fullName: "München-Berg am Laim",
    metaTitle: "Ihr Dach in Top-Form! Dachdecker Berg am Laim",
    metaDescription: "Dachdecker Berg am Laim: Altbau, Flachdach, Gauben & Sturmschäden. 24/7 Sofort-Hilfe, Festpreise. Jetzt anrufen: [Telefon folgt]",
    heroHeadline: "Dachdecker Berg am Laim – Qualität aus Meisterhand",
    heroSubheadline: "Dachschaden in Berg am Laim? Wir helfen schnell und zuverlässig – mit Festpreisgarantie.",
    localInfo: "Berg am Laim verbindet Altbau-Charme mit modernen Wohnanlagen. Die vielfältige Bausubstanz erfordert unterschiedliche Dachlösungen.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Altbausanierung", "Flachdachabdichtung", "Gaubenarbeiten"],
    nearbyDistricts: ["ramersdorf", "trudering", "haidhausen"],
    isCity: false
  },
  {
    slug: "bogenhausen",
    name: "Bogenhausen",
    fullName: "München-Bogenhausen",
    metaTitle: "Premium für Ihr Zuhause! Dachdecker Bogenhausen",
    metaDescription: "Dachdecker Bogenhausen: Premium-Dacharbeiten für Villen. Denkmalschutz, Kupfer- & Schieferarbeiten. Diskret & termingerecht. Beratung gratis.",
    heroHeadline: "Dachdecker Bogenhausen – Premium-Service für anspruchsvolle Dächer",
    heroSubheadline: "Ihr Dach in Bogenhausen verdient Meisterqualität. Wir liefern höchste Handwerkskunst für Villen und Stadthäuser.",
    localInfo: "Bogenhausen zählt zu Münchens exklusivsten Wohnlagen mit historischen Villen und hochwertigen Wohnanlagen. Hier ist Präzisionsarbeit gefragt.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Denkmalschutz-gerechte Sanierung", "Kupferarbeiten", "Schieferdächer"],
    nearbyDistricts: ["haidhausen", "schwabing", "berg-am-laim"],
    isCity: false
  },
  {
    slug: "feldmoching",
    name: "Feldmoching",
    fullName: "München-Feldmoching",
    metaTitle: "Sorgenfrei wohnen! Dachdecker Feldmoching München",
    metaDescription: "Dachdecker Feldmoching: Komplettsanierung, Sturmschäden & energetische Sanierung. 24/7 Sofort-Hilfe, faire Festpreise. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Feldmoching – Ihr lokaler Dachexperte",
    heroSubheadline: "Dachprobleme in Feldmoching? Wir sind Ihr zuverlässiger Partner im Münchner Norden.",
    localInfo: "Feldmoching im Münchner Norden bietet ländlichen Charakter mit vielen Einfamilienhäusern. Die älteren Gebäude benötigen oft umfassende Dachsanierungen.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Komplettsanierung älterer Dächer", "Sturmschäden", "Energetische Sanierung"],
    nearbyDistricts: ["milbertshofen", "allach", "unterschleissheim"],
    isCity: false
  },
  {
    slug: "hadern",
    name: "Hadern",
    fullName: "München-Hadern",
    metaTitle: "Qualität, die bleibt! Dachdecker Hadern München",
    metaDescription: "Dachdecker Hadern: Sanierung 1950er-70er Bauten, Asbest-Entsorgung, Dachausbau & Flachdach. Festpreise. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Hadern – Qualität für Ihr Dach",
    heroSubheadline: "Ob Einfamilienhaus oder Wohnanlage in Hadern – wir bringen Ihr Dach in Top-Zustand.",
    localInfo: "Hadern liegt im Südwesten Münchens, geprägt von Wohnsiedlungen der Nachkriegszeit und dem Klinikum Großhadern. Viele Dächer erreichen hier ihr Sanierungsalter.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Dachsanierung 1950er-70er Bauten", "Asbest-Entsorgung", "Dachausbau"],
    nearbyDistricts: ["sendling", "laim", "solln"],
    isCity: false
  },
  {
    slug: "haidhausen",
    name: "Haidhausen",
    fullName: "München-Haidhausen",
    metaTitle: "Altbau-Experten! Dachdecker Haidhausen München",
    metaDescription: "Dachdecker Haidhausen: Altbau-Sanierung, Denkmalschutz & Ziegel-Restaurierung. 25+ Jahre Erfahrung. Partnernetzwerk mit Referenzen.",
    heroHeadline: "Dachdecker Haidhausen – Altbau-Spezialisten",
    heroSubheadline: "Ihr Altbau in Haidhausen braucht einen erfahrenen Dachdecker? Wir verstehen historische Dächer.",
    localInfo: "Haidhausen ist bekannt für seine Altbauten und das Franzosenviertel. Hier arbeiten wir regelmäßig an historischen Dächern mit besonderen Anforderungen.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Altbau-Dachsanierung", "Denkmalschutz", "Ziegel-Restaurierung"],
    nearbyDistricts: ["berg-am-laim", "maxvorstadt", "bogenhausen"],
    isCity: false
  },
  {
    slug: "laim",
    name: "Laim",
    fullName: "München-Laim",
    metaTitle: "Blitzschnell vor Ort! Dachdecker Laim München",
    metaDescription: "Dachdecker Laim: Reparatur, Dachfenster, Rinnenarbeiten & 24/7 Sofort-Hilfe. Altbau & Neubau, Festpreise. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Laim – Schnell, sauber, zuverlässig",
    heroSubheadline: "Dachprobleme in Laim? Wir sind in kürzester Zeit bei Ihnen und lösen jedes Dachproblem.",
    localInfo: "Laim verbindet zentrale Lage mit Wohnqualität. Die Mischung aus Altbau und Neubau erfordert vielseitige Dachdecker-Expertise.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Dachreparatur", "Rinnenarbeiten", "Dachfenster"],
    nearbyDistricts: ["pasing", "neuhausen", "schwanthalerhoehe"],
    isCity: false
  },
  {
    slug: "lehel",
    name: "Lehel",
    fullName: "München-Lehel",
    metaTitle: "Exzellenz für Ihr Dach! Dachdecker Lehel München",
    metaDescription: "Dachdecker Lehel: Historische Sanierung, Kupfer- & Zinkarbeiten, Denkmalschutz. Diskret & termingerecht. Kostenlose Beratung.",
    heroHeadline: "Dachdecker Lehel – Exzellenz für Ihr Stadtdach",
    heroSubheadline: "Im Lehel erwarten Sie Dacharbeiten auf höchstem Niveau – diskret und professionell.",
    localInfo: "Das Lehel ist Münchens ältester Stadtteil mit historischen Gebäuden und höchsten Ansprüchen. Hier ist Präzision und Erfahrung gefragt.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Historische Dachsanierung", "Kupfer- und Zinkarbeiten", "Denkmalschutz"],
    nearbyDistricts: ["schwabing", "haidhausen", "maxvorstadt"],
    isCity: false
  },
  {
    slug: "maxvorstadt",
    name: "Maxvorstadt",
    fullName: "München-Maxvorstadt",
    metaTitle: "Ihr Altbau verdient Profis! Dachdecker Maxvorstadt",
    metaDescription: "Dachdecker Maxvorstadt: Altbau-Sanierung, Dachausbau, Flachdach & Denkmalschutz. Partnernetzwerk mit Innenstadterfahrung.",
    heroHeadline: "Dachdecker Maxvorstadt – Altbau-Expertise im Herzen Münchens",
    heroSubheadline: "Ihr Altbau-Dach in der Maxvorstadt braucht Profis? Wir kennen die Herausforderungen historischer Gebäude.",
    localInfo: "Die Maxvorstadt beherbergt Universitäten, Museen und prachtvolle Altbauten. Hier arbeiten wir an Dächern mit Geschichte und hohen Anforderungen.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Altbau-Komplettsanierung", "Dachausbau", "Flachdach-Abdichtung"],
    nearbyDistricts: ["schwabing", "neuhausen", "lehel"],
    isCity: false
  },
  {
    slug: "milbertshofen",
    name: "Milbertshofen",
    fullName: "München-Milbertshofen",
    metaTitle: "Schnelle Hilfe garantiert! Dachdecker Milbertshofen",
    metaDescription: "Dachdecker Milbertshofen: Gewerbedächer, Flachdach, Hallendächer & Wohnhaussanierung. Schneller Service, Festpreise. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Milbertshofen – Schneller Service im Norden",
    heroSubheadline: "Dachschaden in Milbertshofen? Wir sind Ihr zuverlässiger Partner für alle Dacharbeiten.",
    localInfo: "Milbertshofen verbindet Industrie (BMW) mit Wohngebieten. Die Mischung aus Gewerbe- und Wohnimmobilien erfordert flexible Dachdecker-Lösungen.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Gewerbedach-Sanierung", "Flachdach-Reparatur", "Hallendächer"],
    nearbyDistricts: ["schwabing", "moosach", "feldmoching"],
    isCity: false
  },
  {
    slug: "moosach",
    name: "Moosach",
    fullName: "München-Moosach",
    metaTitle: "Ihr Nachbar hilft! Dachdecker Moosach München",
    metaDescription: "Dachdecker Moosach: Sanierung, Sturmschäden, Dachrinnen & 24/7 Sofort-Hilfe. Nur 10-15 Min. Anfahrt, Festpreise. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Moosach – Ihr Partnernetzwerk, vor Ort",
    heroSubheadline: "In Moosach kennen wir jede Straße. Bei Dachproblemen sind wir schnell bei Ihnen.",
    localInfo: "Moosach liegt im Nordwesten Münchens mit guter Verkehrsanbindung. Von hier aus erreichen wir Sie besonders schnell.",
    travelTime: "10-15 Minuten",
    commonIssues: ["Dachsanierung", "Sturmschäden", "Dachrinnen"],
    nearbyDistricts: ["allach", "neuhausen", "milbertshofen"],
    isCity: false
  },
  {
    slug: "neuhausen",
    name: "Neuhausen",
    fullName: "München-Neuhausen",
    metaTitle: "Rundum sorglos! Dachdecker Neuhausen München",
    metaDescription: "Dachdecker Neuhausen: Altbau-Sanierung, Gauben, Dachterrassen & Flachdach. Gründerzeit-Villen bis moderne Stadthäuser.",
    heroHeadline: "Dachdecker Neuhausen – Für Altbau und Neubau",
    heroSubheadline: "Ob Gründerzeit-Villa oder modernes Stadthaus in Neuhausen – wir haben die passende Lösung für Ihr Dach.",
    localInfo: "Neuhausen-Nymphenburg besticht durch Altbau-Viertel und moderne Wohnanlagen. Die Mischung erfordert vielseitige Dachdecker-Kompetenz.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Altbau-Dachsanierung", "Gauben-Erneuerung", "Dachterrassen"],
    nearbyDistricts: ["nymphenburg", "moosach", "laim"],
    isCity: false
  },
  {
    slug: "nymphenburg",
    name: "Nymphenburg",
    fullName: "München-Nymphenburg",
    metaTitle: "Erstklassig für Villen! Dachdecker Nymphenburg",
    metaDescription: "Dachdecker Nymphenburg: Villen-Sanierung, Denkmalschutz, Schieferdächer & Kupferarbeiten. Premium-Qualität. Kostenlose Beratung.",
    heroHeadline: "Dachdecker Nymphenburg – Für anspruchsvolle Dächer",
    heroSubheadline: "Villen und historische Gebäude in Nymphenburg verdienen erstklassige Dacharbeiten.",
    localInfo: "Nymphenburg ist geprägt vom Schloss und exklusiven Villenvierteln. Hier arbeiten wir an Dächern, die höchste Ansprüche erfüllen müssen.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Villen-Dachsanierung", "Denkmalschutz", "Schieferarbeiten"],
    nearbyDistricts: ["neuhausen", "obermenzing", "pasing"],
    isCity: false
  },
  {
    slug: "obermenzing",
    name: "Obermenzing",
    fullName: "München-Obermenzing",
    metaTitle: "Direkt vor Ort! Dachdecker Obermenzing München",
    metaDescription: "Dachdecker Obermenzing: Villen, Dachfenster, energetische Sanierung & Spenglerei. 10-15 Min. Anfahrt, Festpreise. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Obermenzing – Experten für Wohnhäuser",
    heroSubheadline: "Ihr Einfamilienhaus oder Ihre Villa in Obermenzing braucht einen zuverlässigen Dachdecker? Wir sind vor Ort.",
    localInfo: "Obermenzing ist bekannt für seine Villen und gepflegten Einfamilienhäuser. Hier kennen wir die typischen Dachkonstruktionen bestens.",
    travelTime: "10-15 Minuten",
    commonIssues: ["Villen-Sanierung", "Dachfenster-Einbau", "Energetische Sanierung"],
    nearbyDistricts: ["pasing", "untermenzing", "allach"],
    isCity: false
  },
  {
    slug: "obergiesing",
    name: "Obergiesing",
    fullName: "München-Obergiesing",
    metaTitle: "Tradition trifft Qualität! Dachdecker Obergiesing",
    metaDescription: "Dachdecker Obergiesing: Altbau-Sanierung, Reparatur, Schornstein & 24/7 Sofort-Hilfe. Traditionelles Handwerk, Festpreise.",
    heroHeadline: "Dachdecker Obergiesing – Qualität aus Meisterhand",
    heroSubheadline: "Dachprobleme in Obergiesing? Wir helfen schnell und professionell – mit Festpreisgarantie.",
    localInfo: "Obergiesing verbindet traditionelles München mit urbanem Flair. Die vielfältige Bausubstanz erfordert erfahrene Dachdecker.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Altbau-Sanierung", "Dachreparatur", "Schornsteinarbeiten"],
    nearbyDistricts: ["sendling", "perlach", "ramersdorf"],
    isCity: false
  },
  {
    slug: "pasing",
    name: "Pasing",
    fullName: "München-Pasing",
    metaTitle: "Blitzschnell da! Dachdecker Pasing München",
    metaDescription: "Dachdecker Pasing: Sanierung, Flachdach, Sturmschäden & Sofort-Hilfe. Altbau bis Neubau, 10-15 Min. Anfahrt. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Pasing – Ihr Partnernetzwerk im Westen",
    heroSubheadline: "Von Pasing aus sind wir blitzschnell bei Ihnen. Bei Dachproblemen ist schnelle Hilfe garantiert.",
    localInfo: "Pasing ist das Zentrum des Münchner Westens mit eigenem Bahnhof und vielfältiger Bebauung. Von Altbau bis Neubau kennen wir alle Dachtypen.",
    travelTime: "10-15 Minuten",
    commonIssues: ["Dachsanierung", "Flachdach-Arbeiten", "Sturmschäden"],
    nearbyDistricts: ["obermenzing", "laim", "aubing"],
    isCity: false
  },
  {
    slug: "perlach",
    name: "Perlach",
    fullName: "München-Perlach",
    metaTitle: "Für Alt- & Neuperlach! Dachdecker mit Herz",
    metaDescription: "Dachdecker Perlach: Flachdach, Hochhäuser & Altbau-Sanierung. Neu- & Alt-Perlach. Faire Festpreise. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Perlach – Für Alt- und Neuperlach",
    heroSubheadline: "Ob Hochhaus in Neuperlach oder Altbau in Alt-Perlach – wir haben die richtige Lösung.",
    localInfo: "Perlach vereint das historische Alt-Perlach mit der Großsiedlung Neuperlach. Beide Gebiete haben unterschiedliche Dachbedürfnisse.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Flachdach-Sanierung", "Hochhaus-Dächer", "Dorfkern-Altbauten"],
    nearbyDistricts: ["ramersdorf", "trudering", "obergiesing"],
    isCity: false
  },
  {
    slug: "ramersdorf",
    name: "Ramersdorf",
    fullName: "München-Ramersdorf",
    metaTitle: "Zuverlässig & fair! Dachdecker Ramersdorf München",
    metaDescription: "Dachdecker Ramersdorf: Wohnhaus, Gewerbe, Rinnenarbeiten & 24/7 Sofort-Hilfe. Festpreise ohne Überraschungen. Meisterqualität.",
    heroHeadline: "Dachdecker Ramersdorf – Zuverlässig und fair",
    heroSubheadline: "Ihr Dach in Ramersdorf braucht Hilfe? Wir sind Ihr verlässlicher Partner für alle Dacharbeiten.",
    localInfo: "Ramersdorf liegt im Münchner Osten und bietet eine Mischung aus Wohngebieten und Gewerbe. Hier arbeiten wir an vielfältigen Dachprojekten.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Wohnhaussanierung", "Gewerbedächer", "Rinnenarbeiten"],
    nearbyDistricts: ["berg-am-laim", "perlach", "obergiesing"],
    isCity: false
  },
  {
    slug: "schwabing",
    name: "Schwabing",
    fullName: "München-Schwabing",
    metaTitle: "Altbau-Meister! Dachdecker Schwabing München",
    metaDescription: "Dachdecker Schwabing: Altbau-Sanierung, Dachausbau, Gauben & Denkmalschutz. 25+ Jahre Erfahrung mit historischen Dächern.",
    heroHeadline: "Dachdecker Schwabing – Altbau-Experten mit Erfahrung",
    heroSubheadline: "Schwabings Altbauten verdienen Dachdecker, die ihr Handwerk verstehen. Das sind wir.",
    localInfo: "Schwabing ist Münchens bekanntestes Viertel mit historischen Altbauten und lebendiger Kultur. Hier arbeiten wir an Dächern mit Geschichte.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Altbau-Komplettsanierung", "Dachgeschoss-Ausbau", "Gauben"],
    nearbyDistricts: ["maxvorstadt", "milbertshofen", "bogenhausen"],
    isCity: false
  },
  {
    slug: "schwanthalerhoehe",
    name: "Schwanthalerhöhe",
    fullName: "München-Schwanthalerhöhe",
    metaTitle: "Westend-Experten! Dachdecker Schwanthalerhöhe",
    metaDescription: "Dachdecker Westend: Altbau-Sanierung, Dachterrassen, Innenhof-Dächer & Flachdach. Partnernetzwerk nahe Theresienwiese.",
    heroHeadline: "Dachdecker Schwanthalerhöhe – Ihr Partner im Westend",
    heroSubheadline: "Vom Westend zur Theresienwiese – wir sind Ihr Dachdecker für dieses beliebte Viertel.",
    localInfo: "Die Schwanthalerhöhe, auch Westend genannt, ist ein urbanes Viertel mit Altbauten und modernen Gebäuden nahe der Theresienwiese.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Altbau-Sanierung", "Dachterrassen", "Innenhof-Dächer"],
    nearbyDistricts: ["laim", "sendling", "neuhausen"],
    isCity: false
  },
  {
    slug: "sendling",
    name: "Sendling",
    fullName: "München-Sendling",
    metaTitle: "Meisterqualität im Süden! Dachdecker Sendling",
    metaDescription: "Dachdecker Sendling: Altbau, Dachfenster, Rinnenarbeiten & 24/7 Sofort-Hilfe. Festpreise, Meisterqualität. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Sendling – Qualität für den Münchner Süden",
    heroSubheadline: "In Sendling und Umgebung sind wir Ihr zuverlässiger Partner für alle Dachfragen.",
    localInfo: "Sendling verbindet traditionelles Handwerkerviertel mit modernem Wohnen. Die vielfältige Bausubstanz kennen wir aus langjähriger Erfahrung.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Altbau-Dachsanierung", "Dachfenster", "Rinnenarbeiten"],
    nearbyDistricts: ["schwanthalerhoehe", "hadern", "solln"],
    isCity: false
  },
  {
    slug: "solln",
    name: "Solln",
    fullName: "München-Solln",
    metaTitle: "Premium-Service! Dachdecker Solln München",
    metaDescription: "Dachdecker Solln: Villen, Kupferarbeiten, energetische Sanierung & Spenglerei. Hochwertige Arbeit für gehobene Wohnlagen.",
    heroHeadline: "Dachdecker Solln – Premium für Ihr Zuhause",
    heroSubheadline: "Die Villen und Häuser in Solln verdienen erstklassige Dacharbeiten. Das ist unser Anspruch.",
    localInfo: "Solln ist eines der gehobensten Wohnviertel im Münchner Süden mit großzügigen Villen und gepflegten Einfamilienhäusern.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Villen-Dachsanierung", "Kupferarbeiten", "Energetische Sanierung"],
    nearbyDistricts: ["sendling", "hadern", "perlach"],
    isCity: false
  },
  {
    slug: "trudering",
    name: "Trudering",
    fullName: "München-Trudering",
    metaTitle: "Verlässlich vor Ort! Dachdecker Trudering München",
    metaDescription: "Dachdecker Trudering: Einfamilienhäuser, Reihenhäuser, Flachdach & 24/7 Sofort-Hilfe. Festpreise, Meisterqualität. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Trudering – Ihr Partner im Münchner Osten",
    heroSubheadline: "Ob Trudering-Riem oder Waldtrudering – wir sind schnell bei Ihnen und lösen jedes Dachproblem.",
    localInfo: "Trudering-Riem vereint das traditionelle Trudering mit dem modernen Messegelände. Hier finden sich Einfamilienhäuser und moderne Wohnanlagen.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Einfamilienhaus-Sanierung", "Reihenhausdächer", "Flachdach-Neubau"],
    nearbyDistricts: ["riem", "perlach", "ramersdorf"],
    isCity: false
  },
  {
    slug: "riem",
    name: "Riem",
    fullName: "München-Riem",
    metaTitle: "Messestadt-Experte! Dachdecker Riem München",
    metaDescription: "Dachdecker Riem: Flachdach, Neubau, Dachbegrünung & 24/7 Sofort-Hilfe. Spezialist für moderne Wohnanlagen. Festpreise. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Riem – Spezialist für moderne Architektur",
    heroSubheadline: "Von der Messestadt bis Alt-Riem – wir sind Ihr Dachdecker für moderne und klassische Dächer im Münchner Osten.",
    localInfo: "Riem im Münchner Osten ist bekannt für die Messestadt und moderne Neubauviertel rund um das ehemalige Flughafengelände. Hier dominieren Flachdächer und zeitgenössische Konstruktionen.",
    travelTime: "30-35 Minuten",
    commonIssues: ["Flachdachabdichtung bei Neubauten", "Terrassendächer", "Dachbegrünung bei modernen Wohnanlagen"],
    nearbyDistricts: ["trudering", "berg-am-laim", "perlach"],
    isCity: false
  },
  {
    slug: "untermenzing",
    name: "Untermenzing",
    fullName: "München-Untermenzing",
    metaTitle: "In 5 Minuten da! Dachdecker Untermenzing München",
    metaDescription: "Dachdecker Untermenzing: Schnelle Hilfe in 5-10 Min. Sanierung, Rinnenreinigung & Reparatur. Festpreise. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Untermenzing – Ihr Nachbar für Dachfragen",
    heroSubheadline: "In Untermenzing sind wir praktisch vor Ihrer Haustür. Schneller geht's nicht bei Dachproblemen.",
    localInfo: "Untermenzing liegt direkt in unserer Nachbarschaft. Von hier aus erreichen wir Sie in kürzester Zeit – ideal bei dringenden Dachschäden.",
    travelTime: "5-10 Minuten",
    commonIssues: ["Schnelle Notfall-Hilfe", "Dachsanierung", "Rinnenreinigung"],
    nearbyDistricts: ["allach", "obermenzing", "moosach"],
    isCity: false
  },
  {
    slug: "germering",
    name: "Germering",
    fullName: "Germering",
    metaTitle: "Schnell & professionell! Dachdecker Germering",
    metaDescription: "Dachdecker Germering: Einfamilienhäuser, Neubau, Solar & 24/7 Sofort-Hilfe. Schnell vor Ort, Festpreise. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Germering – Schnell und zuverlässig",
    heroSubheadline: "Westlich von München sind wir in Germering schnell bei Ihnen – für alle Dacharbeiten.",
    localInfo: "Germering ist eine wachsende Stadt westlich von München mit vielen Einfamilienhäusern und Neubaugebieten.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Einfamilienhaus-Sanierung", "Neubau-Dächer", "Solaranlagen-Vorbereitung"],
    nearbyDistricts: ["aubing", "fuerstenfeldbruck", "pasing"],
    isCity: true
  },
  {
    slug: "unterschleissheim",
    name: "Unterschleißheim",
    fullName: "Unterschleißheim",
    metaTitle: "Schnell im Norden! Dachdecker Unterschleißheim",
    metaDescription: "Dachdecker Unterschleißheim: Gewerbe, Flachdach, Hallendächer & Wohngebäude. Schneller Service. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Unterschleißheim – Im Norden für Sie da",
    heroSubheadline: "Nördlich von München sind wir in Unterschleißheim schnell vor Ort – für Privat und Gewerbe.",
    localInfo: "Unterschleißheim liegt nördlich von München mit vielen Gewerbegebieten und Wohnsiedlungen. Wir betreuen hier private und gewerbliche Kunden.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Gewerbedächer", "Flachdach-Sanierung", "Hallendächer"],
    nearbyDistricts: ["garching", "feldmoching", "dachau"],
    isCity: true
  },
  {
    slug: "garching",
    name: "Garching",
    fullName: "Garching bei München",
    metaTitle: "Präzision für Ihr Dach! Dachdecker Garching",
    metaDescription: "Dachdecker Garching: Flachdächer, Gewerbe, Wohnhaus-Reparatur & Sofort-Hilfe. Präzisionsarbeit vom Partnernetzwerk.",
    heroHeadline: "Dachdecker Garching – Präzision für Ihren Dach",
    heroSubheadline: "In der Wissenschaftsstadt Garching liefern wir Dacharbeiten mit höchster Präzision.",
    localInfo: "Garching ist bekannt für die TU München und Forschungseinrichtungen. Hier arbeiten wir an modernen Gebäuden und gewachsenen Wohngebieten.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Moderne Flachdächer", "Gewerbegebäude", "Wohnhaus-Sanierung"],
    nearbyDistricts: ["unterschleissheim", "oberschleissheim", "feldmoching"],
    isCity: true
  },
  {
    slug: "ottobrunn",
    name: "Ottobrunn",
    fullName: "Ottobrunn",
    metaTitle: "Verlässlicher Partner! Dachdecker Ottobrunn",
    metaDescription: "Dachdecker Ottobrunn: Einfamilienhäuser, Reihenhäuser, Flachdach & 24/7 Sofort-Hilfe. Partnernetzwerk mit Festpreisgarantie.",
    heroHeadline: "Dachdecker Ottobrunn – Qualität im Münchner Südosten",
    heroSubheadline: "In Ottobrunn und Umgebung sind wir Ihr verlässlicher Partner für alle Dachfragen.",
    localInfo: "Ottobrunn liegt südöstlich von München und ist bekannt für Luft- und Raumfahrtindustrie sowie gepflegte Wohngebiete.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Einfamilienhaus-Dächer", "Reihenhäuser", "Flachdach-Arbeiten"],
    nearbyDistricts: ["unterhaching", "perlach", "ramersdorf"],
    isCity: true
  },
  {
    slug: "unterhaching",
    name: "Unterhaching",
    fullName: "Unterhaching",
    metaTitle: "Energetisch top! Dachdecker Unterhaching München",
    metaDescription: "Dachdecker Unterhaching: Energetische Sanierung, Flachdach, Neubau & 24/7 Sofort-Hilfe. Partnernetzwerk mit Festpreisgarantie. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Unterhaching – Ihr Partnernetzwerk im Münchner Süden",
    heroSubheadline: "In Unterhaching und Umgebung sind wir Ihr verlässlicher Partner für energetische Dachsanierung und moderne Dachlösungen.",
    localInfo: "Unterhaching ist eine wohlhabende Gemeinde südlich von München, bekannt für moderne Wohngebiete und die Geothermieanlage. Hier setzen wir auf energieeffiziente Dachlösungen.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Einfamilienhaus-Sanierung", "Flachdächer bei Neubauten", "Energetische Dachsanierung"],
    nearbyDistricts: ["ottobrunn", "perlach", "solln"],
    isCity: true
  },
  {
    slug: "haar",
    name: "Haar",
    fullName: "Haar",
    metaTitle: "Schnell vor Ort! Dachdecker Haar bei München",
    metaDescription: "Dachdecker Haar: Einfamilienhäuser & Reihenhäuser im Münchner Osten. Dachsanierung mit Festpreis & 10 Jahre Garantie. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Haar – Ihr Partner im Münchner Osten",
    heroSubheadline: "In Haar sind wir schnell bei Ihnen – für Dachsanierung, Reparatur und Sofort-Hilfe mit Meisterqualität.",
    localInfo: "Haar liegt östlich von München und ist eine familienfreundliche Gemeinde mit vielen Einfamilienhäusern und Reihenhaussiedlungen.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Einfamilienhaus-Dächer", "Reihenhäuser", "Dachgeschossausbau"],
    nearbyDistricts: ["trudering", "vaterstetten", "feldkirchen"],
    isCity: true
  },
  {
    slug: "taufkirchen",
    name: "Taufkirchen",
    fullName: "Taufkirchen",
    metaTitle: "Zuverlässig & fair! Dachdecker Taufkirchen München",
    metaDescription: "Dachdecker Taufkirchen: Dachsanierung, Flachdach & 24/7 Sofort-Hilfe im Münchner Süden. Festpreis-Garantie vom Partnernetzwerk. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Taufkirchen – Partnernetzwerk im Münchner Süden",
    heroSubheadline: "In Taufkirchen und Umgebung bieten wir zuverlässige Dacharbeiten mit Festpreisgarantie.",
    localInfo: "Taufkirchen im Münchner Süden bietet eine Mischung aus Wohn- und Gewerbegebieten mit modernen Neubauten.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Flachdächer", "Reihenhäuser", "Dachsanierung"],
    nearbyDistricts: ["unterhaching", "ottobrunn", "neubiberg"],
    isCity: true
  },
  {
    slug: "graefelfing",
    name: "Gräfelfing",
    fullName: "Gräfelfing",
    metaTitle: "Villen-Experte! Dachdecker Gräfelfing München",
    metaDescription: "Premium-Dachdecker Gräfelfing: Villen & gehobene Wohnlagen in höchster Qualität. Festpreis-Garantie & 10 Jahre Garantie. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Gräfelfing – Premium-Service für gehobene Ansprüche",
    heroSubheadline: "In Gräfelfing betreuen wir Villen und exklusive Wohnlagen mit Meisterqualität und Festpreisgarantie.",
    localInfo: "Gräfelfing westlich von München ist eine gehobene Villenvorstadt mit großzügigen Grundstücken und hochwertigen Dächern.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Villen-Dächer", "Premium-Materialien", "Gaubenarbeiten"],
    nearbyDistricts: ["planegg", "pasing", "obermenzing"],
    isCity: true
  },
  {
    slug: "planegg",
    name: "Planegg",
    fullName: "Planegg",
    metaTitle: "Würmtal-Experte! Dachdecker Planegg München",
    metaDescription: "Dachdecker Planegg: Dachsanierung, energetische Modernisierung & 24/7 Sofort-Hilfe im Würmtal. Festpreis vom Partnernetzwerk. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Planegg – Ihr Partnernetzwerk im Würmtal",
    heroSubheadline: "In Planegg und Martinsried bieten wir Dacharbeiten auf höchstem Niveau mit Festpreisgarantie.",
    localInfo: "Planegg liegt südwestlich von München und ist bekannt für den Biotech-Standort Martinsried und gepflegte Wohngebiete.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Einfamilienhaus-Sanierung", "Flachdächer", "Energetische Sanierung"],
    nearbyDistricts: ["graefelfing", "solln", "hadern"],
    isCity: true
  },
  {
    slug: "pullach",
    name: "Pullach",
    fullName: "Pullach im Isartal",
    metaTitle: "Isartal-Spezialist! Dachdecker Pullach München",
    metaDescription: "Premium-Dachdecker Pullach: Isartal-Villen & historische Gebäude mit Denkmal-Erfahrung. Festpreis-Garantie vom Meister. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Pullach – Premium-Service im Isartal",
    heroSubheadline: "In Pullach und dem Isartal sind wir Ihr Spezialist für Villen-Dächer und historische Gebäude.",
    localInfo: "Pullach im Isartal südlich von München ist eine wohlhabende Gemeinde mit Villen und historischen Gebäuden entlang der Isar.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Villen-Dächer", "Denkmalschutz", "Premium-Materialien"],
    nearbyDistricts: ["gruenwald", "solln", "unterhaching"],
    isCity: true
  },
  {
    slug: "gruenwald",
    name: "Grünwald",
    fullName: "Grünwald",
    metaTitle: "Exklusiv & zuverlässig! Dachdecker Grünwald München",
    metaDescription: "Premium-Dachdecker Grünwald: Exklusive Villen, Kupferarbeiten & höchste Ansprüche. Festpreis-Garantie vom Partnernetzwerk. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Grünwald – Exklusive Qualität für exklusive Ansprüche",
    heroSubheadline: "In Grünwald betreuen wir die anspruchsvollsten Villen und Anwesen mit Meisterqualität.",
    localInfo: "Grünwald an der Isar ist eine der wohlhabendsten Gemeinden Deutschlands mit exklusiven Villen und Anwesen.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Villen-Dächer", "Premium-Materialien", "Kupferarbeiten"],
    nearbyDistricts: ["pullach", "solln", "unterhaching"],
    isCity: true
  },
  {
    slug: "ismaning",
    name: "Ismaning",
    fullName: "Ismaning",
    metaTitle: "Dachdecker Ismaning – Dachsanierung ab 80 €/m²",
    metaDescription: "Dachdecker Ismaning: Gewerbe, Wohnhäuser & 24/7 Sofort-Hilfe nördlich von München. Festpreis-Garantie vom Partnernetzwerk. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Ismaning – Ihr Partner nördlich von München",
    heroSubheadline: "In Ismaning sind wir für Gewerbe und Wohngebäude gleichermaßen der richtige Ansprechpartner.",
    localInfo: "Ismaning nördlich von München ist ein Medienstandort mit modernen Bürogebäuden und gewachsenen Wohngebieten.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Gewerbe-Dächer", "Flachdächer", "Einfamilienhaus-Sanierung"],
    nearbyDistricts: ["garching", "unterschleissheim", "aschheim"],
    isCity: true
  },
  {
    slug: "oberschleissheim",
    name: "Oberschleißheim",
    fullName: "Oberschleißheim",
    metaTitle: "Dachdecker Oberschleißheim – Dachsanierung ab 80 €/m²",
    metaDescription: "Dachdecker Oberschleißheim: Dachsanierung ab 80 €/m², Reparatur & 24/7 Sofort-Hilfe. Partnernetzwerk mit Festpreis-Garantie. Tel: [Telefon folgt]",
    heroHeadline: "Dacharbeiten in Oberschleißheim – Termin vereinbaren",
    heroSubheadline: "In Oberschleißheim und Umgebung bieten wir schnelle, zuverlässige Dacharbeiten mit Festpreisgarantie.",
    localInfo: "Oberschleißheim ist bekannt für das Schloss Schleißheim und liegt nördlich von München mit vielen Wohnsiedlungen.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Einfamilienhaus-Sanierung", "Reihenhäuser", "Sturmschäden"],
    nearbyDistricts: ["unterschleissheim", "garching", "feldmoching"],
    isCity: true
  },
  {
    slug: "vaterstetten",
    name: "Vaterstetten",
    fullName: "Vaterstetten",
    metaTitle: "Landkreis-Experte! Dachdecker Vaterstetten München",
    metaDescription: "Dachdecker Vaterstetten: Einfamilienhäuser & Dachgeschossausbau östlich von München. Festpreis-Garantie vom Partnernetzwerk. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Vaterstetten – Qualität aus München",
    heroSubheadline: "In Vaterstetten und dem Landkreis Ebersberg sind wir Ihr verlässlicher Partner für alle Dachfragen.",
    localInfo: "Vaterstetten östlich von München ist eine der größten Gemeinden im Landkreis Ebersberg mit vielen Einfamilienhäusern.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Einfamilienhaus-Sanierung", "Dachgeschossausbau", "Rinnenarbeiten"],
    nearbyDistricts: ["haar", "poing", "kirchheim"],
    isCity: true
  },
  {
    slug: "poing",
    name: "Poing",
    fullName: "Poing",
    metaTitle: "Neubau-Spezialist! Dachdecker Poing bei München",
    metaDescription: "Dachdecker Poing: Neubau, Flachdach & Terrassendächer östlich von München. Festpreis-Garantie & 10 Jahre Garantie. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Poing – Neubau-Experte im Münchner Osten",
    heroSubheadline: "In Poing und Umgebung sind wir Ihr Spezialist für moderne Dachkonstruktionen und Neubau-Projekte.",
    localInfo: "Poing östlich von München wächst stark mit modernen Neubaugebieten und familienfreundlichen Siedlungen.",
    travelTime: "30-35 Minuten",
    commonIssues: ["Neubau-Dächer", "Flachdächer", "Terrassendächer"],
    nearbyDistricts: ["vaterstetten", "kirchheim", "haar"],
    isCity: true
  },
  {
    slug: "olching",
    name: "Olching",
    fullName: "Olching",
    metaTitle: "Ampertal-Experte! Dachdecker Olching München",
    metaDescription: "Dachdecker Olching: Dachsanierung, Reparatur & 24/7 Sofort-Hilfe westlich von München. Festpreis-Garantie vom Partnernetzwerk. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Olching – Partnernetzwerk, im Ampertal",
    heroSubheadline: "In Olching und dem Ampertal bieten wir zuverlässige Dacharbeiten mit Festpreisgarantie.",
    localInfo: "Olching westlich von München liegt an der Amper und bietet eine Mischung aus Altbestand und Neubaugebieten.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Einfamilienhaus-Sanierung", "Dachrinnen", "Sturmschäden"],
    nearbyDistricts: ["groebenzell", "fuerstenfeldbruck", "germering"],
    isCity: true
  },
  {
    slug: "groebenzell",
    name: "Gröbenzell",
    fullName: "Gröbenzell",
    metaTitle: "Direkter Nachbar! Dachdecker Gröbenzell München",
    metaDescription: "Dachdecker Gröbenzell: Nur 15 Min. Anfahrt! Dachsanierung, Reparatur & 24/7 Sofort-Hilfe zum Festpreis vom Partnernetzwerk. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Gröbenzell – Ihr Nachbar für Dachfragen",
    heroSubheadline: "In Gröbenzell sind wir in nur 15 Minuten bei Ihnen – für schnelle und zuverlässige Dacharbeiten.",
    localInfo: "Gröbenzell liegt direkt westlich von München und ist eine kompakte Wohngemeinde mit vielen Einfamilienhäusern.",
    travelTime: "15-20 Minuten",
    commonIssues: ["Einfamilienhaus-Sanierung", "Dachgeschossausbau", "Rinnenreinigung"],
    nearbyDistricts: ["olching", "obermenzing", "allach"],
    isCity: true
  },
  {
    slug: "kirchheim",
    name: "Kirchheim",
    fullName: "Kirchheim bei München",
    metaTitle: "Verlässlich vor Ort! Dachdecker Kirchheim München",
    metaDescription: "Dachdecker Kirchheim: Neubau, Sanierung & 24/7 Sofort-Hilfe östlich von München. Festpreis-Garantie vom Partnernetzwerk. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Kirchheim – Qualität im Münchner Osten",
    heroSubheadline: "In Kirchheim und Umgebung sind wir Ihr verlässlicher Partner für Neubau und Sanierung.",
    localInfo: "Kirchheim bei München östlich der Landeshauptstadt ist eine wachsende Gemeinde mit Neubaugebieten und gewachsenen Ortsteilen.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Einfamilienhaus-Sanierung", "Neubau-Dächer", "Flachdächer"],
    nearbyDistricts: ["haar", "vaterstetten", "aschheim"],
    isCity: true
  },
  {
    slug: "aschheim",
    name: "Aschheim",
    fullName: "Aschheim",
    metaTitle: "Gewerbe & Wohnen! Dachdecker Aschheim München",
    metaDescription: "Dachdecker Aschheim: Gewerbe- & Wohngebäude östlich von München. Dachsanierung mit Festpreis-Garantie vom Partnernetzwerk. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Aschheim – Für Gewerbe und Wohnen",
    heroSubheadline: "In Aschheim betreuen wir Gewerbe- und Wohngebäude gleichermaßen mit Meisterqualität.",
    localInfo: "Aschheim östlich von München ist ein bedeutender Gewerbestandort mit modernen Büro- und Wohngebäuden.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Gewerbe-Dächer", "Flachdächer", "Einfamilienhaus-Sanierung"],
    nearbyDistricts: ["feldkirchen", "kirchheim", "ismaning"],
    isCity: true
  },
  {
    slug: "feldkirchen",
    name: "Feldkirchen",
    fullName: "Feldkirchen bei München",
    metaTitle: "Schnell & zuverlässig! Dachdecker Feldkirchen München",
    metaDescription: "Dachdecker Feldkirchen: Einfamilienhäuser & Gewerbe östlich von München. Dachsanierung mit Festpreis-Garantie. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Feldkirchen – Schneller Service im Münchner Osten",
    heroSubheadline: "In Feldkirchen bieten wir schnelle und zuverlässige Dacharbeiten für Wohn- und Gewerbegebäude.",
    localInfo: "Feldkirchen bei München östlich der Stadt bietet eine gute Verkehrsanbindung und vielfältige Wohn- und Gewerbebebauung.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Einfamilienhaus-Sanierung", "Gewerbe-Dächer", "Flachdächer"],
    nearbyDistricts: ["aschheim", "haar", "trudering"],
    isCity: true
  },
  {
    slug: "neubiberg",
    name: "Neubiberg",
    fullName: "Neubiberg",
    metaTitle: "München-Südost! Dachdecker Neubiberg München",
    metaDescription: "Dachdecker Neubiberg: Einfamilienhäuser & Reihenhäuser südöstlich von München. Festpreis-Garantie vom Partnernetzwerk. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Neubiberg – Partnernetzwerk im Münchner Südosten",
    heroSubheadline: "In Neubiberg und Umgebung sind wir Ihr verlässlicher Partner für alle Dacharbeiten.",
    localInfo: "Neubiberg südöstlich von München ist bekannt für die Universität der Bundeswehr und gepflegte Wohngebiete.",
    travelTime: "20-25 Minuten",
    commonIssues: ["Einfamilienhaus-Sanierung", "Reihenhäuser", "Dachgeschossausbau"],
    nearbyDistricts: ["ottobrunn", "unterhaching", "taufkirchen"],
    isCity: true
  },
  {
    slug: "putzbrunn",
    name: "Putzbrunn",
    fullName: "Putzbrunn",
    metaTitle: "Wohngemeinde-Experte! Dachdecker Putzbrunn München",
    metaDescription: "Dachdecker Putzbrunn: Einfamilienhäuser & Reihenhäuser südöstlich von München. Festpreis-Garantie vom Partnernetzwerk. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Putzbrunn – Ihr Partner im Münchner Südosten",
    heroSubheadline: "In Putzbrunn sind wir Ihr verlässlicher Dachdecker für Einfamilienhäuser und Reihenhäuser.",
    localInfo: "Putzbrunn südöstlich von München ist eine ruhige Wohngemeinde mit überwiegend Einfamilienhäusern und Reihenhäusern.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Einfamilienhaus-Sanierung", "Reihenhäuser", "Dachrinnen"],
    nearbyDistricts: ["neubiberg", "ottobrunn", "haar"],
    isCity: true
  },
  {
    slug: "freising",
    name: "Freising",
    fullName: "Freising",
    metaTitle: "Dachdecker Freising – Dachsanierung ab 80 €/m² | Renodex",
    metaDescription: "Dachdecker Freising: Dachsanierung ab 80 €/m², Dachreparatur & 24/7 Sofort-Hilfe im Landkreis Freising. Partnernetzwerk aus München. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Freising – Partnernetzwerk aus München",
    heroSubheadline: "Dachschaden im Landkreis Freising? Wir sind schnell vor Ort – mit Festpreisgarantie und 10 Jahren Garantie auf alle Arbeiten.",
    localInfo: "Freising liegt nördlich von München und ist bekannt für seinen Altstadt-Charme und viele Einfamilienhäuser. Wir betreuen private und gewerbliche Kunden im gesamten Landkreis.",
    travelTime: "30-35 Minuten",
    commonIssues: ["Altbau-Dachsanierung", "Dachrinnenreinigung", "Sturmschäden"],
    nearbyDistricts: ["unterschleissheim", "garching", "oberschleissheim"],
    isCity: true
  },
  {
    slug: "dachau",
    name: "Dachau",
    fullName: "Dachau",
    metaTitle: "Dachdecker Dachau – Dachsanierung ab 80 €/m² | Renodex",
    metaDescription: "Dachdecker Dachau: Dachsanierung ab 80 €/m², Dachreparatur & 24/7 Sofort-Hilfe im Landkreis Dachau. Partnernetzwerk aus München. Tel: [Telefon folgt]",
    heroHeadline: "Dachdecker Dachau – Partnernetzwerk aus München",
    heroSubheadline: "Dachschaden im Landkreis Dachau? Wir sind schnell vor Ort – mit Festpreisgarantie und 10 Jahren Garantie auf alle Arbeiten.",
    localInfo: "Dachau liegt nordwestlich von München und ist bekannt für seine Geschichte und viele Einfamilienhäuser. Wir betreuen private und gewerbliche Kunden im gesamten Landkreis.",
    travelTime: "25-30 Minuten",
    commonIssues: ["Einfamilienhaus-Sanierung", "Dachrinnenreinigung", "Sturmschäden"],
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
