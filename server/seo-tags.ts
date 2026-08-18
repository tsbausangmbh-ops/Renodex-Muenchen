import { getContentForPath, generateSSRContent } from "./seo-content";

// ============================================
// SCHEMA.ORG STRUCTURED DATA FOR SSR
// ============================================

// WebSite Schema für Google Site-Name in Suchergebnissen
const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://renodex.de/#website",
  "name": "Renodex München",
  "alternateName": ["Renodex", "089 Dach München", "Dachdecker München 089"],
  "url": "https://renodex.de",
  "publisher": { "@id": "https://renodex.de/#organization" },
  "inLanguage": "de-DE",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://renodex.de/?s={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// Speakable Schema für Voice Search & AI Overviews (Google 2026)
const SPEAKABLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://renodex.de/#speakable",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      "h1",
      "[data-speakable='true']",
      ".faq-answer",
      ".service-description"
    ],
    "xpath": [
      "/html/head/title",
      "/html/head/meta[@name='description']/@content"
    ]
  },
  "mainEntity": { "@id": "https://renodex.de/#organization" }
};

// GeoShape Schema für präzise Geo-Targeting (Bing & Google Local)
const GEO_COVERAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://renodex.de/#geocoverage",
  "name": "Dachdecker-Service München und Umgebung",
  "provider": { "@id": "https://renodex.de/#organization" },
  "areaServed": {
    "@type": "GeoShape",
    "circle": "48.1661 11.4728 50000",
    "box": "47.9 11.2 48.4 11.8",
    "polygon": "48.25,11.35 48.25,11.75 48.05,11.75 48.05,11.35"
  },
  "serviceArea": {
    "@type": "AdministrativeArea",
    "name": "Großraum München",
    "containsPlace": [
      { "@type": "City", "name": "München", "sameAs": "https://de.wikipedia.org/wiki/M%C3%BCnchen" },
    ]
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "servicePhone": { "@type": "ContactPoint", "telephone": "00000000000", "contactType": "customer service", "availableLanguage": "German" }
  }
};

const COMPANY_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": "https://renodex.de/#organization",
  "name": "Renodex München",
  "alternateName": ["089 Dach", "Renodex", "Dachdecker München 089"],
  "description": "Bau- und Sanierungsbetrieb [Gründungsjahr folgt] in München seit 1998. 25+ Jahre Erfahrung, 10 Jahre Garantie, 24/7 Sofort-Hilfe.",
  "url": "https://renodex.de",
  "logo": "https://renodex.de/renodex-logo.png",
  "image": "https://renodex.de/og-image.png",
  "telephone": "[Telefon folgt]",
  "email": "info@renodex.de",
  "foundingDate": "1998",
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": 12 },
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": ["Cash", "Bank Transfer", "Credit Card"],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "[Gründungsjahr folgt]",
    "name": "Partnernetzwerk aus geprüften Partner-Meisterfirmen",
    "recognizedBy": { "@type": "Organization", "name": "Handwerkskammer für München und Oberbayern" }
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Adresse folgt]",
    "addressLocality": "München",
    "addressRegion": "Bayern",
    "postalCode": "81247",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.1661,
    "longitude": 11.4728
  },
  "areaServed": [
    { "@type": "City", "name": "München", "sameAs": "https://de.wikipedia.org/wiki/M%C3%BCnchen" },
    { "@type": "Place", "name": "München-Schwabing" },
    { "@type": "Place", "name": "München-Bogenhausen" },
    { "@type": "Place", "name": "München-Sendling" },
    { "@type": "Place", "name": "München-Pasing" },
    { "@type": "Place", "name": "München-Laim" },
    { "@type": "Place", "name": "München-Trudering" },
    { "@type": "Place", "name": "München-Neuhausen" },
    { "@type": "Place", "name": "München-Maxvorstadt" },
    { "@type": "Place", "name": "München-Au-Haidhausen" },
    { "@type": "Place", "name": "München-Giesing" },
    { "@type": "Place", "name": "München-Moosach" },
    { "@type": "Place", "name": "München-Milbertshofen" },
    { "@type": "Place", "name": "München-Feldmoching" },
    { "@type": "Place", "name": "München-Allach" },
    { "@type": "Place", "name": "München-Aubing" },
    { "@type": "Place", "name": "München-Obermenzing" },
    { "@type": "Place", "name": "München-Nymphenburg" },
    { "@type": "Place", "name": "München-Thalkirchen" },
    { "@type": "Place", "name": "München-Solln" },
    { "@type": "Place", "name": "München-Forstenried" },
    { "@type": "City", "name": "Germering" },
    { "@type": "City", "name": "Unterschleißheim" },
    { "@type": "City", "name": "Garching" },
    { "@type": "City", "name": "Ismaning" },
    { "@type": "City", "name": "Grünwald" },
    { "@type": "City", "name": "Haar" },
    { "@type": "City", "name": "Taufkirchen" },
    { "@type": "City", "name": "Gräfelfing" },
    { "@type": "City", "name": "Planegg" },
    { "@type": "City", "name": "Pullach" },
    { "@type": "City", "name": "Oberschleißheim" },
    { "@type": "City", "name": "Vaterstetten" },
    { "@type": "City", "name": "Olching" },
    { "@type": "City", "name": "Gröbenzell" },
    { "@type": "City", "name": "Kirchheim" },
    { "@type": "City", "name": "Aschheim" },
    { "@type": "City", "name": "Feldkirchen" },
    { "@type": "City", "name": "Neubiberg" },
    { "@type": "City", "name": "Putzbrunn" },
    { "@type": "City", "name": "Ottobrunn" },
    { "@type": "City", "name": "Unterhaching" },
    { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 48.1661, "longitude": 11.4728 }, "geoRadius": 50000 }
  ],
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:00", "closes": "16:30" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Kunde" },
      "datePublished": "2025-12-15",
      "reviewBody": "Schnelle und professionelle Dachreparatur nach Sturmschaden. Innerhalb von 2 Stunden vor Ort. Sehr zu empfehlen!",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Kunde" },
      "datePublished": "2025-11-28",
      "reviewBody": "Komplette Dachsanierung zum Festpreis. Alles termingerecht und sauber. Das Team hat uns hervorragend beraten.",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Kunde" },
      "datePublished": "2025-10-03",
      "reviewBody": "Flachdach abdichten - perfekt gemacht. 10 Jahre Garantie und faire Preise. Klare Empfehlung für München!",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
    }
  ],
  "sameAs": [
    "https://www.google.com/maps/place/Renodex+GmbH",
    "https://www.facebook.com/Renodex",
    "https://www.instagram.com/renodex_muenchen",
    "https://www.provenexpert.com/renodex-gmbh",
    "https://www.gelbeseiten.de/dachdecker/muenchen"
  ],
  "slogan": "Ihr Partnernetzwerk aus geprüften Partner-Meisterfirmen in München seit 1998",
  "knowsAbout": ["Dachsanierung", "Dachreparatur", "Flachdachabdichtung", "Sturmschaden-Reparatur", "Dachinspektion", "Spenglerarbeiten", "Energetische Sanierung", "KfW-Förderung"],
  "memberOf": {
    "@type": "Organization",
    "name": "Handwerkskammer München"
  }
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://renodex.de/#localbusiness",
  "name": "Renodex - Dachdecker München",
  "description": "[Gründungsjahr folgt] für Dacharbeiten in München: Dachsanierung, Dachreparatur, Spenglerarbeiten, Flachdach-Abdichtung und 24/7 Sturmschaden-Sofort-Hilfe.",
  "url": "https://renodex.de",
  "telephone": "[Telefon folgt]",
  "email": "info@renodex.de",
  "priceRange": "€€",
  "image": "https://renodex.de/og-image.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Adresse folgt]",
    "addressLocality": "München",
    "addressRegion": "Bayern",
    "postalCode": "81247",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.1661,
    "longitude": 11.4728
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:00", "closes": "16:30" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Kunde" },
      "reviewBody": "Schnelle und saubere Arbeit bei unserer Dachsanierung in Schwabing. Preis-Leistung top! Absolute Empfehlung.",
      "datePublished": "2025-11-15"
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Kunde" },
      "reviewBody": "Sturmschaden-Sofort-Hilfe innerhalb von 3 Stunden vor Ort. Dach provisorisch abgedichtet, komplette Reparatur am nächsten Tag. Sehr kompetent!",
      "datePublished": "2025-10-28"
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Kunde" },
      "reviewBody": "Flachdach unserer Garage in Bogenhausen perfekt abgedichtet. Faire Festpreise ohne versteckte Kosten. Gerne wieder!",
      "datePublished": "2025-09-20"
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Kunde" },
      "reviewBody": "Dachinspektion für 150 Euro war jeden Cent wert. Detaillierter Bericht und ehrliche Beratung. Keine Angstmacherei, sehr seriös.",
      "datePublished": "2025-08-05"
    }
  ]
};

const SERVICE_SCHEMAS = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-dachsanierung",
    "name": "Dachsanierung München",
    "description": "Komplette Dachsanierung für Steil- und Flachdächer in München. EnEV-konform mit KfW-Förderung. Festpreisgarantie.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Dachsanierung"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-dachreparatur",
    "name": "Dachreparatur München",
    "description": "Schnelle Dachreparatur bei undichten Stellen, defekten Ziegeln und Sturmschäden. Oft am selben Tag erledigt.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Dachreparatur",
    "offers": { "@type": "Offer", "price": "175", "priceCurrency": "EUR", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "175", "priceCurrency": "EUR", "unitText": "ab" } }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-notdienst",
    "name": "Dach Sofort-Hilfe München 24/7",
    "description": "24 Stunden Sofort-Hilfe bei Sturmschäden und Wassereintritt. Innerhalb von 60 Minuten vor Ort. Auch Wochenende und Feiertage.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Dach Sofort-Hilfe",
    "hoursAvailable": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "00:00", "closes": "23:59" },
    "offers": { "@type": "Offer", "price": "175", "priceCurrency": "EUR", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "175", "priceCurrency": "EUR", "unitText": "ab" } }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-spenglerei",
    "name": "Spenglerarbeiten München",
    "description": "Professionelle Spenglerarbeiten: Dachrinnen, Fallrohre, Gauben, Kaminverkleidungen in Kupfer, Zink und Aluminium.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Spenglerarbeiten"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-flachdach",
    "name": "Flachdach Sanierung München",
    "description": "Flachdach-Sanierung und Abdichtung mit EPDM, Bitumen oder Flüssigkunststoff. Für Garagendächer, Terrassendächer und Gewerbe.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Flachdach Sanierung"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-dachinspektion",
    "name": "Dachinspektion München",
    "description": "Professionelle Dachinspektion durch unseren Meister für nur 150€. Detaillierter Zustandsbericht mit Handlungsempfehlungen.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Dachinspektion",
    "offers": { "@type": "Offer", "price": "150", "priceCurrency": "EUR" }
  }
];

// Google 2026: HowTo-Schema für Featured Snippets und AI Overviews
const HOWTO_DACHSANIERUNG = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Dachsanierung in München - So läuft der Prozess ab",
  "description": "Schritt-für-Schritt Anleitung für eine professionelle Dachsanierung durch Renodex in München.",
  "totalTime": "P14D",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "EUR", "value": "15000-45000" },
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Kostenlose Erstberatung", "text": "Telefonische Beratung und Terminvereinbarung für die Dachinspektion. Wir besprechen Ihre Wünsche und erste Fragen." },
    { "@type": "HowToStep", "position": 2, "name": "Dachinspektion vor Ort (150€)", "text": "Unser Meister begutachtet Ihr Dach, prüft den Dachstuhl und dokumentiert alle Schäden mit Fotos." },
    { "@type": "HowToStep", "position": 3, "name": "Detailliertes Festpreisangebot", "text": "Sie erhalten ein verbindliches Festpreisangebot mit allen Leistungen, Materialien und Garantien." },
    { "@type": "HowToStep", "position": 4, "name": "Förderberatung und Antragstellung", "text": "Wir prüfen KfW- und BAFA-Fördermöglichkeiten und helfen bei der Antragstellung." },
    { "@type": "HowToStep", "position": 5, "name": "Gerüstbau und Vorbereitung", "text": "Professioneller Gerüstaufbau mit Schutzplanen für Ihre Fassade und Garten." },
    { "@type": "HowToStep", "position": 6, "name": "Dachsanierung", "text": "Durchführung aller Arbeiten: Abdeckung, Dämmung, neue Unterspannbahn, Lattung und Neueindeckung." },
    { "@type": "HowToStep", "position": 7, "name": "Qualitätskontrolle und Abnahme", "text": "Gemeinsame Endabnahme mit detailliertem Protokoll. Bei Mängeln: sofortige Nachbesserung." },
    { "@type": "HowToStep", "position": 8, "name": "Übergabe mit 10 Jahren Garantie", "text": "Sie erhalten alle Dokumentationen, Garantieurkunde und Wartungsempfehlungen." }
  ]
};

function generateFAQSchema(faqItems: Array<{ question: string; answer: string }>): object | null {
  if (!faqItems || faqItems.length === 0) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

function generateBreadcrumbSchema(path: string): object {
  const BASE_URL = "https://renodex.de";
  const breadcrumbs: Array<{ name: string; url: string }> = [
    { name: "Startseite", url: BASE_URL }
  ];
  
  if (path === "/" || path === "") {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Dachdecker München",
        "item": BASE_URL
      }]
    };
  }
  
  const pathNames: Record<string, string> = {
    "/leistungen": "Leistungen",
    "/notdienst": "24/7 Sofort-Hilfe",
    "/dach-reparieren": "Dach reparieren",
    "/dachsanierung-kosten": "Dachsanierung Kosten",
    "/sturmschaden": "Sturmschaden",
    "/dach-undicht": "Dach undicht",
    "/faq": "FAQ",
    "/kontakt": "Kontakt",
    "/ratgeber": "Ratgeber",
    "/ueber-uns": "Über uns",
    "/impressum": "Impressum",
    "/datenschutz": "Datenschutz",
    "/agb": "AGB",
    "/cookie": "Cookie-Einstellungen",
    "/barrierefreiheit": "Barrierefreiheit",
    "/eu-ai-act": "EU AI Act"
  };
  
  if (pathNames[path]) {
    breadcrumbs.push({ name: pathNames[path], url: `${BASE_URL}${path}` });
  }
  
  // District pages
  const bezirkMatch = path.match(/^\/bezirk\/([^/]+)$/);
  if (bezirkMatch) {
    const slug = bezirkMatch[1];
    const districtNames: Record<string, string> = {
      "schwabing": "Schwabing", "bogenhausen": "Bogenhausen", "sendling": "Sendling",
      "pasing": "Pasing", "laim": "Laim", "haidhausen": "Haidhausen", "moosach": "Moosach",
      "neuhausen": "Neuhausen", "nymphenburg": "Nymphenburg", "trudering": "Trudering",
      "solln": "Solln", "allach": "Allach", "aubing": "Aubing",
      "hadern": "Hadern", "lehel": "Lehel", "maxvorstadt": "Maxvorstadt", "milbertshofen": "Milbertshofen",
      "obermenzing": "Obermenzing", "obergiesing": "Obergiesing", "perlach": "Perlach",
      "ramersdorf": "Ramersdorf", "schwanthalerhoehe": "Schwanthalerhöhe",
      "untermenzing": "Untermenzing", "feldmoching": "Feldmoching", "berg-am-laim": "Berg am Laim",
      "garching": "Garching", "germering": "Germering", "ottobrunn": "Ottobrunn",
      "unterschleissheim": "Unterschleißheim", "unterhaching": "Unterhaching",
      "haar": "Haar", "taufkirchen": "Taufkirchen", "graefelfing": "Gräfelfing",
      "planegg": "Planegg", "pullach": "Pullach", "gruenwald": "Grünwald", "ismaning": "Ismaning",
      "oberschleissheim": "Oberschleißheim", "vaterstetten": "Vaterstetten", "poing": "Poing",
      "olching": "Olching", "groebenzell": "Gröbenzell", "kirchheim": "Kirchheim",
      "aschheim": "Aschheim", "feldkirchen": "Feldkirchen", "neubiberg": "Neubiberg", "putzbrunn": "Putzbrunn", "freising": "Freising", "dachau": "Dachau"
    };
    breadcrumbs.push({ name: "Stadtteile", url: `${BASE_URL}/bezirk` });
    breadcrumbs.push({ name: districtNames[slug] || slug, url: `${BASE_URL}/bezirk/${slug}` });
  }
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

function stripContext(schema: any): any {
  const { "@context": _, ...rest } = schema;
  return rest;
}

function generateWebPageEntity(path: string, pageSeo: PageSEO | null): object {
  const BASE = "https://renodex.de";
  const canonical = pageSeo?.canonical || `${BASE}${path}`;
  const title = pageSeo?.title || "Renodex München";
  const description = pageSeo?.description || "";

  const webPage: any = {
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    "url": canonical,
    "name": title,
    "description": description,
    "isPartOf": { "@id": `${BASE}/#website` },
    "about": { "@id": `${BASE}/#organization` },
    "inLanguage": "de-DE",
    "dateModified": new Date().toISOString().split('T')[0],
    "potentialAction": {
      "@type": "ReadAction",
      "target": canonical
    }
  };

  if (path === "/") {
    webPage["@type"] = "WebPage";
    webPage["primaryImageOfPage"] = { "@type": "ImageObject", "url": `${BASE}/favicon.ico` };
  }

  return webPage;
}

export function generateAllSchemas(path: string): string {
  const pageSeo = getPageSEO(path);

  const graphNodes: object[] = [];

  graphNodes.push(stripContext(WEBSITE_SCHEMA));
  graphNodes.push(generateWebPageEntity(path, pageSeo));
  graphNodes.push(stripContext(SPEAKABLE_SCHEMA));
  graphNodes.push(stripContext(GEO_COVERAGE_SCHEMA));
  graphNodes.push(stripContext(COMPANY_SCHEMA));
  graphNodes.push(stripContext(LOCAL_BUSINESS_SCHEMA));

  for (const service of SERVICE_SCHEMAS) {
    graphNodes.push(stripContext(service));
  }

  if (path === "/" || path === "/dachsanierung-kosten" || path === "/leistungen") {
    graphNodes.push(stripContext(HOWTO_DACHSANIERUNG));
  }

  graphNodes.push(stripContext(generateBreadcrumbSchema(path)));

  const content = getContentForPath(path);
  if (content && content.faq && content.faq.length > 0) {
    const faqSchema = generateFAQSchema(content.faq);
    if (faqSchema) {
      graphNodes.push(stripContext(faqSchema));
    }
  }

  const graph = {
    "@context": "https://schema.org",
    "@graph": graphNodes
  };

  return `<script type="application/ld+json">${JSON.stringify(graph)}</script>`;
}

function getPageSEO(path: string): PageSEO | null {
  if (mainPages[path]) return mainPages[path];
  const bezirkMatch = path.match(/^\/bezirk\/([^/]+)$/);
  if (bezirkMatch) {
    const slug = bezirkMatch[1];
    const district = districts.find((d: DistrictMeta) => d.slug === slug);
    if (district) {
      return {
        title: district.metaTitle,
        description: district.metaDescription,
        canonical: `${BASE_URL}/bezirk/${slug}`,
        geoRegion: "DE-BY",
        geoPlacename: district.name
      };
    }
  }
  return null;
}

interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  geoRegion?: string;
  geoPlacename?: string;
  geoPosition?: string;
  geoCity?: string;
  geoTarget?: string;
  geoCoverage?: string;
  ogType?: string;
}

const BASE_URL = "https://renodex.de";

const mainPages: Record<string, PageSEO> = {
  "/": {
    title: "Renodex München ✓ Dachdecker-[Gründungsjahr folgt]",
    description: "Dachreparatur München ✓ [Gründungsjahr folgt], Renodex. 4.9★ aus 127 Bewertungen. Sofort-Termin. Alle Dacharbeiten mit Festpreis →",
    canonical: BASE_URL,
    keywords: "Dachdecker München, Dachsanierung, Dachreparatur, Spengler, Dach Sofort-Hilfe, Flachdach, [Gründungsjahr folgt]",
    geoRegion: "DE-BY",
    geoPlacename: "München",
    ogType: "website"
  },
  "/ueber-uns": {
    title: "Über uns – Dachdecker [Gründungsjahr folgt] in München | 089 Dach",
    description: "Lernen Sie unser Team kennen: Partnernetzwerk aus geprüften Partner-Meisterfirmen mit über 25 Jahren Erfahrung in München. Unsere Werte: Qualität, Transparenz und Fairness. Das sind wir!",
    canonical: `${BASE_URL}/ueber-uns`,
    keywords: "Renodex, Dachdecker [Gründungsjahr folgt], Dachdeckermeister München, Handwerkskammer, Erfahrung, Qualität, Zertifiziert",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/leistungen/dachreparatur": {
    title: "Dachreparatur München – Sofort-Hilfe & Fix ab 199 € | Renodex",
    description: "Dachreparatur München ab 199 € – 24h Sofort-Hilfe, Sturmschäden, undichtes Dach reparieren ✓ [Gründungsjahr folgt], Obermenzing ☎ [Telefon folgt]",
    canonical: `${BASE_URL}/leistungen/dachreparatur`,
    keywords: "Dachreparatur München, Dach Sofort-Hilfe München, Sturmschaden Dach, Dach undicht reparieren, Ziegelaustausch München",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/leistungen": {
    title: "Dacharbeiten München – Sanierung, Reparatur & Spenglerei",
    description: "Renodex: Komplette Dacharbeiten für Steil- und Flachdach, energetische Sanierung, Spenglerarbeiten und Dachfenster. Jetzt kostenloses Angebot einholen!",
    canonical: `${BASE_URL}/leistungen`,
    keywords: "Dacharbeiten München, Dachsanierung, Dachreparatur, Flachdach, Spenglerarbeiten, Dachdämmung, Dachfenster",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/notdienst": {
    title: "Dach Sofort-Hilfe München ✓ 24/7 Soforthilfe | 089 Dach",
    description: "Rund um die Uhr erreichbar: Wir sind in 2–4 Stunden bei Ihnen und sichern Ihr Dach nach Sturm- oder Wasserschäden. Jetzt anrufen: [Telefon folgt] – Sofortige Hilfe!",
    canonical: `${BASE_URL}/notdienst`,
    keywords: "Dach Sofort-Hilfe München, 24h, Sturmschaden, Dach undicht, Wasserschaden, Soforthilfe, Notabdichtung",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/ratgeber": {
    title: "Dach Ratgeber München – Tipps zur Sanierung & Wartung",
    description: "Praktische Ratgeberartikel rund ums Dach: Erkennen von Sanierungsbedarf, Checklisten zur Wartung und energetische Tipps. 25 Jahre Dachdecker-Erfahrung!",
    canonical: `${BASE_URL}/ratgeber`,
    keywords: "Dach Ratgeber München, Pflege, Wartung, Energiesparen, Tipps, Winterfest, Inspektion",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/preise": {
    title: "Dachdecker Preise München – ab 80 €/m² | Renodex",
    description: "Was kostet ein Dachdecker in München? ✓ Dachsanierung ab 195€/m² ✓ Reparatur ab 85€/Std ✓ Festpreisgarantie ☎ [Telefon folgt]",
    canonical: `${BASE_URL}/preise`,
    keywords: "Dachdecker Preise München, Dachsanierung Kosten, Dachreparatur Preise, Festpreis Dachdecker, was kostet Dachdecker",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/faq": {
    title: "FAQ Dachdecker München – Kosten, Ablauf & Garantie",
    description: "Transparente Festpreise: Dachinspektion ab 150€ und Antworten auf häufige Fragen zu Dacharbeiten, Terminen und Garantien bei der Renodex München.",
    canonical: `${BASE_URL}/faq`,
    keywords: "Dachdecker FAQ München, Fragen, Antworten, Kosten, Ablauf, Garantie, Förderung",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/kontakt": {
    title: "Kontakt Dachdecker München | Termin & Beratung",
    description: "So erreichen Sie uns: Telefon, E-Mail, Kontaktformular. Vereinbaren Sie jetzt einen Termin für Beratung oder Sofort-Hilfe in München. Tel: [Telefon folgt]",
    canonical: `${BASE_URL}/kontakt`,
    keywords: "Dachdecker Kontakt München, Telefon, Termin, Beratung, Angebot, E-Mail, Obermenzing",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/impressum": {
    title: "Impressum | Renodex – Dachdecker München",
    description: "Impressum der Renodex: [Adresse folgt]-Obermenzing. Handelsregister München [HRB folgt]. Kontakt: [Telefon folgt]",
    canonical: `${BASE_URL}/impressum`,
    noindex: true
  },
  "/datenschutz": {
    title: "Datenschutzerklärung | Renodex München",
    description: "Datenschutzerklärung der Renodex gemäß DSGVO. Informationen zur Datenverarbeitung auf unserer Website. Ihre Daten sind bei uns sicher und geschützt.",
    canonical: `${BASE_URL}/datenschutz`,
    noindex: true
  },
  "/agb": {
    title: "AGB | Renodex – Dachdecker München",
    description: "Allgemeine Geschäftsbedingungen der Renodex für Dacharbeiten in München. Transparente Vertragsbedingungen für Dachsanierung, Reparatur und Spenglerei.",
    canonical: `${BASE_URL}/agb`,
    noindex: true
  },
  "/eu-ai-act": {
    title: "EU AI Act | KI-Transparenz | Renodex",
    description: "Transparenzhinweise der Renodex gemäß EU AI Act (Verordnung (EU) 2024/1689), Art. 50: Einsatz von KI-Systemen, Rechtsgrundlage, Kontakt.",
    canonical: `${BASE_URL}/eu-ai-act`,
    noindex: true
  },
  "/cookie": {
    title: "Cookie-Einstellungen | Renodex München",
    description: "Cookie-Einstellungen der Renodex. Verwalten Sie Ihre Datenschutz-Präferenzen auf unserer Website. Wir respektieren Ihre Privatsphäre und Ihre Entscheidungen.",
    canonical: `${BASE_URL}/cookie`,
    noindex: true
  },
  "/barrierefreiheit": {
    title: "Barrierefreiheit | Renodex München",
    description: "Erklärung zur Barrierefreiheit der Renodex Website. Wir setzen uns für digitale Zugänglichkeit ein und sind WCAG 2.1 konform. Für alle zugänglich.",
    canonical: `${BASE_URL}/barrierefreiheit`,
    noindex: true
  },
  "/sturmschaden": {
    title: "Sturmschaden Dach München ✓ Soforthilfe & Versicherung",
    description: "Sturm-Notfall? Wir kommen sofort! Provisorische Abdichtung, Foto-Dokumentation für Ihre Versicherung, komplette Reparatur. Jetzt anrufen: [Telefon folgt]",
    canonical: `${BASE_URL}/sturmschaden`,
    keywords: "Sturmschaden Dach München, Soforthilfe, Versicherung, Sofort-Hilfe, Reparatur, Dokumentation, Abwicklung"
  },
  "/dach-undicht": {
    title: "Dach undicht München ✓ Leckortung & Reparatur | 089 Dach",
    description: "Wassereintritt stoppen - heute noch! Professionelle Leckortung, dauerhafte Abdichtung zum Festpreis. 24/7 erreichbar. Jetzt anrufen: [Telefon folgt]",
    canonical: `${BASE_URL}/dach-undicht`,
    keywords: "Dach undicht München, Leckortung, Wasserschaden, Reparatur, Abdichtung, Sofort-Termin, Festpreis"
  },
  "/dach-reparieren": {
    title: "Dach reparieren München ✓ Schnell & Festpreis | 089 Dach",
    description: "Dach reparieren in München: Undichtes Dach, kaputte Ziegel, Sturmschaden? Schnelle Reparatur vom [Gründungsjahr folgt] mit Festpreis-Garantie. Tel: [Telefon folgt]",
    canonical: `${BASE_URL}/dach-reparieren`,
    keywords: "Dach reparieren München, Dachreparatur, Dachziegel, Sturmschaden, Dachrinne, Festpreis, Schnell",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/dachsanierung-kosten": {
    title: "Dachsanierung Kosten München ✓ Festpreis & KfW-Förderung",
    description: "Was kostet eine Dachsanierung in München? Preise von 93-592€/m², KfW-Förderung bis 45.000€. Kostenloser Kostenvoranschlag vom [Gründungsjahr folgt]. [Telefon folgt]",
    canonical: `${BASE_URL}/dachsanierung-kosten`,
    keywords: "Dachsanierung Kosten München, Preise, Was kostet, Dach erneuern, Förderung, KfW, Quadratmeterpreis",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
};

interface DistrictMeta {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  isCity: boolean;
  lat: number;
  lng: number;
}

const districts: DistrictMeta[] = [
  { slug: "allach", name: "Allach", metaTitle: "Dachdecker Allach München | Dachsanierung & Reparatur zum Festpreis | Renodex [Gründungsjahr folgt]", metaDescription: "Dachdecker Allach: Komplettsanierung zum Festpreis ab 150€/m². Spezialist für 50er-80er Jahre Ziegeldächer, 24/7 Sofort-Hilfe. Heute anrufen: [Telefon folgt]", isCity: false, lat: 48.1833, lng: 11.4667 },
  { slug: "aubing", name: "Aubing", metaTitle: "Dachdecker Aubing München | Dachsanierung Schlüsselfertig vom Meister | Renodex", metaDescription: "Dachdecker Aubing: Neubau, Flachdach und Reihenhäuser. Festpreis-Garantie mit 10 Jahre Gewährleistung vom [Gründungsjahr folgt]. Jetzt anrufen: [Telefon folgt]", isCity: false, lat: 48.1589, lng: 11.4178 },
  { slug: "berg-am-laim", name: "Berg am Laim", metaTitle: "Dachdecker Berg am Laim München | Altbau & Denkmalschutz Experte | Renodex", metaDescription: "Dachdecker Berg am Laim: Gründerzeit-Spezialist für Altbausanierung und Denkmalschutz. Festpreis binnen 24h vom [Gründungsjahr folgt]. Tel: [Telefon folgt]", isCity: false, lat: 48.1267, lng: 11.6264 },
  { slug: "bogenhausen", name: "Bogenhausen", metaTitle: "Dachdecker Bogenhausen München | Villen & Premium-Service vom Meister | Renodex", metaDescription: "Premium-Dachdecker Bogenhausen: Villen, Altbauten und Luxus-Dächer in höchster Qualität. 10 Jahre Garantie, Festpreis. Jetzt anrufen: [Telefon folgt]", isCity: false, lat: 48.1544, lng: 11.6086 },
  { slug: "feldmoching", name: "Feldmoching", metaTitle: "Dachdecker Feldmoching München | Große Dächer & Festpreis-Garantie | Renodex", metaDescription: "Dachdecker Feldmoching: Bauernhöfe, Stallungen und große Dachflächen. Spezialist für komplexe Projekte mit Festpreis-Garantie. Tel: [Telefon folgt]", isCity: false, lat: 48.2089, lng: 11.5328 },
  { slug: "hadern", name: "Hadern", metaTitle: "Dachdecker Hadern München | In 30 Min. vor Ort & Festpreis-Garantie | Renodex", metaDescription: "Dachdecker Hadern: Nur 5km entfernt von unserem Standort! Dachsanierung, Reparatur und 24/7 Sofort-Hilfe zum Festpreis. Jetzt: [Telefon folgt]", isCity: false, lat: 48.1156, lng: 11.4833 },
  { slug: "haidhausen", name: "Haidhausen", metaTitle: "Dachdecker Haidhausen München | Gründerzeit & Denkmalschutz Spezialist | Renodex", metaDescription: "Dachdecker Haidhausen: Altbau-Spezialist für Jugendstil und historische Dächer. Behördenerfahrung, Festpreis-Garantie. Jetzt anrufen: [Telefon folgt]", isCity: false, lat: 48.1331, lng: 11.5944 },
  { slug: "laim", name: "Laim", metaTitle: "Dachdecker Laim München | 10 Min. Anfahrt & Festpreis-Garantie 2026 | Renodex", metaDescription: "Dachdecker Laim: Direkter Nachbar aus Obermenzing! Dachsanierung, Reparatur und Sofort-Hilfe zum Festpreis mit 10 Jahre Garantie. Tel: [Telefon folgt]", isCity: false, lat: 48.1397, lng: 11.5050 },
  { slug: "lehel", name: "Lehel", metaTitle: "Dachdecker Lehel München | Altstadt-Luxus & Denkmalschutz Experte | Renodex", metaDescription: "Premium-Dachdecker Lehel: Münchner Altstadt, Luxus-Altbau mit behördlichen Genehmigungen. Festpreis-Garantie vom Meister. Jetzt: [Telefon folgt]", isCity: false, lat: 48.1419, lng: 11.5850 },
  { slug: "maxvorstadt", name: "Maxvorstadt", metaTitle: "Dachdecker Maxvorstadt München | Uni-Viertel & Altbau Spezialist | Renodex", metaDescription: "Dachdecker Maxvorstadt: Altbausanierung und City-Experte mit Denkmalschutz-Erfahrung. Schnelle Termine, Festpreis-Garantie. Tel: [Telefon folgt]", isCity: false, lat: 48.1530, lng: 11.5660 },
  { slug: "milbertshofen", name: "Milbertshofen", metaTitle: "Dachdecker Milbertshofen München | Gewerbe & Wohnen mit 24/7 Sofort-Hilfe | Renodex", metaDescription: "Dachdecker Milbertshofen: Industrie, Flachdach und Wohngebäude. 24/7 Sofort-Hilfe mit Festpreis-Garantie vom [Gründungsjahr folgt]. Jetzt: [Telefon folgt]", isCity: false, lat: 48.1883, lng: 11.5667 },
  { slug: "moosach", name: "Moosach", metaTitle: "Dachdecker Moosach München | Ihr Nachbar & in 15 Min. vor Ort | Renodex", metaDescription: "Dachdecker Moosach: Direkte Nachbarschaft mit schneller Anfahrt. Dachsanierung, Reparatur und Sofort-Hilfe zum Festpreis. Jetzt anrufen: [Telefon folgt]", isCity: false, lat: 48.1867, lng: 11.5047 },
  { slug: "neuhausen", name: "Neuhausen", metaTitle: "Dachdecker Neuhausen München | Nymphenburg-Nähe & Festpreis-Garantie | Renodex", metaDescription: "Dachdecker Neuhausen-Nymphenburg: Altbau-Experte mit Premium-Service und 10 Jahre Garantie. Festpreis vom [Gründungsjahr folgt]. Jetzt: [Telefon folgt]", isCity: false, lat: 48.1561, lng: 11.5347 },
  { slug: "nymphenburg", name: "Nymphenburg", metaTitle: "Dachdecker Nymphenburg München | Villen & Denkmalschutz Spezialist | Renodex", metaDescription: "Premium-Dachdecker Nymphenburg: Historische Villen in Schloss-Nähe mit Denkmal-Erfahrung. Festpreis-Garantie vom Meister. Tel: [Telefon folgt]", isCity: false, lat: 48.1583, lng: 11.5033 },
  { slug: "obergiesing", name: "Obergiesing", metaTitle: "Dachdecker Obergiesing München | Altbau München-Süd & 24/7 Sofort-Hilfe | Renodex", metaDescription: "Dachdecker Obergiesing: Altbausanierung und 24/7 Sturmschaden-Sofort-Hilfe in München-Süd. Festpreis-Garantie vom [Gründungsjahr folgt]. Tel: [Telefon folgt]", isCity: false, lat: 48.1100, lng: 11.5833 },
  { slug: "obermenzing", name: "Obermenzing", metaTitle: "Dachdecker Obermenzing München | Unser Standort & Sofort verfügbar | Renodex", metaDescription: "Dachdecker Obermenzing: Unser Firmenstandort! Villen und Einfamilienhäuser mit sofortiger Verfügbarkeit. Festpreis-Garantie. Tel: [Telefon folgt]", isCity: false, lat: 48.1714, lng: 11.4547 },
  { slug: "pasing", name: "Pasing", metaTitle: "Dachdecker Pasing München | München-West & Festpreis-Garantie 2026 | Renodex", metaDescription: "Dachdecker Pasing: Zentral im Westen mit nur 15 Min. Anfahrt. Komplettsanierung zum Festpreis mit 10 Jahre Garantie. Jetzt anrufen: [Telefon folgt]", isCity: false, lat: 48.1419, lng: 11.4556 },
  { slug: "perlach", name: "Perlach", metaTitle: "Dachdecker Perlach München | Flach- & Steildach mit Festpreis-Garantie | Renodex", metaDescription: "Dachdecker Perlach: Hochhaus, Einfamilienhaus und Flachdach. Experte für alle Dachtypen mit Festpreis-Garantie. Jetzt anrufen: [Telefon folgt]", isCity: false, lat: 48.0833, lng: 11.6333 },
  { slug: "ramersdorf", name: "Ramersdorf", metaTitle: "Dachdecker Ramersdorf München | München-Ost & 24/7 Sturmschaden-Sofort-Hilfe | Renodex", metaDescription: "Dachdecker Ramersdorf-Perlach: Dachsanierung, Reparatur und Sturmschaden-Sofort-Hilfe rund um die Uhr. Festpreis-Garantie. Tel: [Telefon folgt]", isCity: false, lat: 48.1100, lng: 11.6100 },
  { slug: "riem", name: "Riem", metaTitle: "Dachdecker Riem München | Messestadt & Moderne Architektur Experte | Renodex", metaDescription: "Dachdecker Riem: Neubau, Flachdach und moderne Architektur in der Messestadt. Wartungsverträge, Festpreis-Garantie. Jetzt: [Telefon folgt]", isCity: false, lat: 48.1300, lng: 11.6656 },
  { slug: "schwabing", name: "Schwabing", metaTitle: "Dachdecker Schwabing München | Jugendstil & Altbau-Experte Meister | Renodex", metaDescription: "Premium-Dachdecker Schwabing: Jugendstil, Gründerzeit und anspruchsvolle Altbauten. Festpreis-Garantie vom [Gründungsjahr folgt]. Tel: [Telefon folgt]", isCity: false, lat: 48.1653, lng: 11.5783 },
  { slug: "schwanthalerhoehe", name: "Schwanthalerhöhe", metaTitle: "Dachdecker Schwanthalerhöhe München | City-nah & Schnell vor Ort | Renodex", metaDescription: "Dachdecker Schwanthalerhöhe: City-nah für Altbau und Gewerbe. Schnelle Reaktion und Festpreis-Garantie vom [Gründungsjahr folgt]. Tel: [Telefon folgt]", isCity: false, lat: 48.1328, lng: 11.5456 },
  { slug: "sendling", name: "Sendling", metaTitle: "Dachdecker Sendling München | Tradition & [Gründungsjahr folgt] mit Erfahrung | Renodex", metaDescription: "Dachdecker Sendling: Traditionshandwerk für Altbau mit 24/7 Sofort-Hilfe. Über 25 Jahre Erfahrung, Festpreis-Garantie. Jetzt anrufen: [Telefon folgt]", isCity: false, lat: 48.1178, lng: 11.5444 },
  { slug: "solln", name: "Solln", metaTitle: "Dachdecker Solln München | Villen-Viertel & Premium-Service vom Meister | Renodex", metaDescription: "Premium-Dachdecker Solln: Villen und gehobene Ansprüche in höchster Qualität. Festpreis-Garantie vom [Gründungsjahr folgt]. Jetzt anrufen: [Telefon folgt]", isCity: false, lat: 48.0833, lng: 11.5167 },
  { slug: "trudering", name: "Trudering", metaTitle: "Dachdecker Trudering München | Einfamilienhaus & Festpreis-Garantie | Renodex", metaDescription: "Dachdecker Trudering: Spezialist für Einfamilienhäuser mit 24/7 Sofort-Hilfe. Festpreis-Garantie vom [Gründungsjahr folgt] in München. Jetzt: [Telefon folgt]", isCity: false, lat: 48.1167, lng: 11.6500 },
  { slug: "untermenzing", name: "Untermenzing", metaTitle: "Dachdecker Untermenzing München | Direkter Nachbar & Sofort verfügbar | Renodex", metaDescription: "Dachdecker Untermenzing: Nur 10 Min. Anfahrt von unserem Standort! Dachsanierung, Reparatur und Sofort-Hilfe zum Festpreis. Tel: [Telefon folgt]", isCity: false, lat: 48.1836, lng: 11.4658 },
  { slug: "garching", name: "Garching", metaTitle: "Dachdecker Garching | TU Campus, Forschung & Flachdach Spezialist | Renodex", metaDescription: "Dachdecker Garching: Moderne Architektur, Flachdach und Gewerbe am Wissenschafts-Campus. Festpreis-Garantie vom Meister. Tel: [Telefon folgt]", isCity: true, lat: 48.2489, lng: 11.6511 },
  { slug: "germering", name: "Germering", metaTitle: "Dachdecker Germering | 25 Min. Anfahrt aus München & Festpreis-Garantie | Renodex", metaDescription: "Dachdecker Germering: Schnelle Anfahrt aus München, Komplettsanierung und 24/7 Sofort-Hilfe. Münchner [Gründungsjahr folgt] mit Festpreis. Tel: [Telefon folgt]", isCity: true, lat: 48.1333, lng: 11.3667 },
  { slug: "ottobrunn", name: "Ottobrunn", metaTitle: "Dachdecker Ottobrunn | München-Süd & Festpreis-Garantie 2026 | Renodex", metaDescription: "Dachdecker Ottobrunn: Dachsanierung, Reparatur und Sofort-Hilfe mit Münchner Qualität im Süden. Festpreis-Garantie. Jetzt anrufen: [Telefon folgt]", isCity: true, lat: 48.0644, lng: 11.6558 },
  { slug: "unterschleissheim", name: "Unterschleißheim", metaTitle: "Dachdecker Unterschleißheim | München-Nord & 24/7 Sturmschaden-Sofort-Hilfe | Renodex", metaDescription: "Dachdecker Unterschleißheim: Dachsanierung, Reparatur und Sturmschaden-Sofort-Hilfe rund um die Uhr. Festpreis-Garantie. Tel: [Telefon folgt]", isCity: true, lat: 48.2811, lng: 11.5778 },
  { slug: "unterhaching", name: "Unterhaching", metaTitle: "Dachdecker Unterhaching | Energetische Sanierung & Festpreis-Garantie | Renodex", metaDescription: "Dachdecker Unterhaching: Dachsanierung, energetische Modernisierung und 24/7 Sofort-Hilfe. Festpreis-Garantie vom [Gründungsjahr folgt]. Tel: [Telefon folgt]", isCity: true, lat: 48.0656, lng: 11.6167 },
  { slug: "haar", name: "Haar", metaTitle: "Dachdecker Haar bei München | Schnell vor Ort & Dachsanierung mit Festpreis | Renodex", metaDescription: "Dachdecker Haar: Einfamilienhäuser und Reihenhäuser im Münchner Osten. Komplettsanierung mit Festpreis und 10 Jahre Garantie. Jetzt anrufen: Tel [Telefon folgt]", isCity: true, lat: 48.1097, lng: 11.7253 },
  { slug: "taufkirchen", name: "Taufkirchen", metaTitle: "Dachdecker Taufkirchen | München-Süd & Festpreis-Garantie vom [Gründungsjahr folgt] | Renodex", metaDescription: "Dachdecker Taufkirchen: Dachsanierung, Flachdach und 24/7 Sofort-Hilfe im Münchner Süden. [Gründungsjahr folgt] mit Festpreis-Garantie. Heute noch anrufen: [Telefon folgt]", isCity: true, lat: 48.0444, lng: 11.6167 },
  { slug: "graefelfing", name: "Gräfelfing", metaTitle: "Dachdecker Gräfelfing | Villen-Experte & Premium-Dachsanierung vom Meister | Renodex", metaDescription: "Premium-Dachdecker Gräfelfing: Villen und gehobene Wohnlagen westlich München in bester Qualität. Festpreis und 10 Jahre Garantie. Jetzt anrufen: [Telefon folgt]", isCity: true, lat: 48.1186, lng: 11.4328 },
  { slug: "planegg", name: "Planegg", metaTitle: "Dachdecker Planegg | Würmtal-Experte & Dachsanierung mit Festpreis-Garantie | Renodex", metaDescription: "Dachdecker Planegg: Dachsanierung, energetische Modernisierung und 24/7 Sofort-Hilfe im Würmtal. [Gründungsjahr folgt] mit Festpreis-Garantie. Jetzt anrufen: [Telefon folgt]", isCity: true, lat: 48.1069, lng: 11.4253 },
  { slug: "pullach", name: "Pullach", metaTitle: "Dachdecker Pullach im Isartal | Villen & Denkmalschutz Spezialist Meister | Renodex", metaDescription: "Premium-Dachdecker Pullach: Isartal-Villen und historische Gebäude mit Denkmalschutz-Erfahrung. Festpreis-Garantie vom Meister. Jetzt anrufen: [Telefon folgt]", isCity: true, lat: 48.0589, lng: 11.5211 },
  { slug: "gruenwald", name: "Grünwald", metaTitle: "Dachdecker Grünwald | Exklusive Villen & Premium-Meisterqualität 2026 | Renodex Meister", metaDescription: "Premium-Dachdecker Grünwald: Exklusive Villen, Kupferarbeiten und höchste Ansprüche. Festpreis-Garantie vom Münchner [Gründungsjahr folgt]. Jetzt anrufen: [Telefon folgt]", isCity: true, lat: 48.0444, lng: 11.5167 },
  { slug: "ismaning", name: "Ismaning", metaTitle: "Dachdecker Ismaning – Dachsanierung ab 80 €/m²", metaDescription: "Dachdecker Ismaning: Gewerbe, Wohnhäuser und 24/7 Sofort-Hilfe nördlich von München. Dachsanierung vom [Gründungsjahr folgt] mit Festpreis-Garantie. Tel: [Telefon folgt]", isCity: true, lat: 48.2275, lng: 11.6725 },
  { slug: "oberschleissheim", name: "Oberschleißheim", metaTitle: "Dachdecker Oberschleißheim – Dachsanierung ab 80 €/m²", metaDescription: "Dachdecker Oberschleißheim: Dachsanierung ab 80 €/m², Reparatur & 24/7 Sofort-Hilfe. [Gründungsjahr folgt] mit Festpreis-Garantie. Tel: [Telefon folgt]", isCity: true, lat: 48.2536, lng: 11.5633 },
  { slug: "vaterstetten", name: "Vaterstetten", metaTitle: "Dachdecker Vaterstetten | Landkreis Ebersberg Dachexperte & Festpreis | Renodex Meister", metaDescription: "Dachdecker Vaterstetten: Einfamilienhäuser und Dachgeschossausbau östlich München. Dachsanierung vom [Gründungsjahr folgt] mit Festpreis. Heute anrufen: [Telefon folgt]", isCity: true, lat: 48.1053, lng: 11.7822 },
  { slug: "poing", name: "Poing", metaTitle: "Dachdecker Poing bei München | Neubau-Experte & Festpreis vom [Gründungsjahr folgt] | Renodex", metaDescription: "Dachdecker Poing: Neubau, Flachdach und Terrassendächer östlich von München. Dachsanierung vom [Gründungsjahr folgt] mit Festpreis und 10 Jahre Garantie. [Telefon folgt]", isCity: true, lat: 48.1694, lng: 11.8036 },
  { slug: "olching", name: "Olching", metaTitle: "Dachdecker Olching | Ampertal-Experte Dachsanierung & Festpreis-Garantie 2026 | Renodex", metaDescription: "Dachdecker Olching: Dachsanierung, Reparatur und 24/7 Sofort-Hilfe westlich München. [Gründungsjahr folgt] mit Festpreis-Garantie und 10 Jahre Garantie. [Telefon folgt]", isCity: true, lat: 48.2042, lng: 11.3306 },
  { slug: "groebenzell", name: "Gröbenzell", metaTitle: "Dachdecker Gröbenzell | Direkter Nachbar Obermenzing & Festpreis-Garantie | Renodex", metaDescription: "Dachdecker Gröbenzell: Nur 15 Min. Anfahrt! Dachsanierung, Reparatur und 24/7 Sofort-Hilfe zum Festpreis vom Münchner [Gründungsjahr folgt]. Heute anrufen: [Telefon folgt]", isCity: true, lat: 48.1986, lng: 11.3697 },
  { slug: "kirchheim", name: "Kirchheim", metaTitle: "Dachdecker Kirchheim bei München | Neubau & Sanierung Festpreis-Garantie | Renodex", metaDescription: "Dachdecker Kirchheim: Neubau, Sanierung und 24/7 Sofort-Hilfe östlich von München. Dacharbeiten vom [Gründungsjahr folgt] mit Festpreis und 10 J. Garantie. [Telefon folgt]", isCity: true, lat: 48.1744, lng: 11.7567 },
  { slug: "aschheim", name: "Aschheim", metaTitle: "Dachdecker Aschheim | Gewerbe & Wohnen östlich München mit Festpreis | Renodex Meister", metaDescription: "Dachdecker Aschheim: Gewerbe- und Wohngebäude östlich München. Dachsanierung und Dachreparatur vom [Gründungsjahr folgt] mit Festpreis-Garantie. Tel: [Telefon folgt]", isCity: true, lat: 48.1722, lng: 11.7172 },
  { slug: "feldkirchen", name: "Feldkirchen", metaTitle: "Dachdecker Feldkirchen bei München | Schnell vor Ort & Festpreis-Garantie | Renodex", metaDescription: "Dachdecker Feldkirchen: Einfamilienhäuser und Gewerbe östlich München. Dachsanierung und Reparatur vom [Gründungsjahr folgt] mit Festpreis. Jetzt anrufen: [Telefon folgt]", isCity: true, lat: 48.1500, lng: 11.7333 },
  { slug: "neubiberg", name: "Neubiberg", metaTitle: "Dachdecker Neubiberg | München-Südost Experte & Dachsanierung Festpreis 2026 | Renodex", metaDescription: "Dachdecker Neubiberg: Einfamilienhäuser und Reihenhäuser südöstlich München. Dachsanierung vom [Gründungsjahr folgt] mit Festpreis und 10 Jahre Garantie. [Telefon folgt]", isCity: true, lat: 48.0733, lng: 11.6633 },
  { slug: "putzbrunn", name: "Putzbrunn", metaTitle: "Dachdecker Putzbrunn bei München | Wohngemeinde-Experte & Festpreis 2026 | Renodex", metaDescription: "Dachdecker Putzbrunn: Einfamilienhäuser und Reihenhäuser südöstlich München. Dachsanierung und Reparatur vom [Gründungsjahr folgt] mit Festpreis. Jetzt: [Telefon folgt]", isCity: true, lat: 48.0756, lng: 11.7136 },
  { slug: "freising", name: "Freising", metaTitle: "Dachdecker Freising – Dachsanierung ab 80 €/m² | Renodex", metaDescription: "Dachdecker Freising: Dachsanierung ab 80 €/m², Dachreparatur & 24/7 Sofort-Hilfe im Landkreis Freising. [Gründungsjahr folgt] aus München. Tel: [Telefon folgt]", isCity: true, lat: 48.4028, lng: 11.7489 },
  { slug: "dachau", name: "Dachau", metaTitle: "Dachdecker Dachau – Dachsanierung ab 80 €/m² | Renodex", metaDescription: "Dachdecker Dachau: Dachsanierung ab 80 €/m², Dachreparatur & 24/7 Sofort-Hilfe im Landkreis Dachau. [Gründungsjahr folgt] aus München. Tel: [Telefon folgt]", isCity: true, lat: 48.2606, lng: 11.4334 }
];

function getDistrictSEO(slug: string): PageSEO | null {
  const district = districts.find(d => d.slug === slug);
  if (!district) return null;
  
  const keywords = [
    `Dachdecker ${district.name}`,
    `Dachsanierung ${district.name}`,
    `Dachreparatur ${district.name}`,
    `Spengler ${district.name}`,
    `Dach Sofort-Hilfe ${district.name}`,
    `Flachdach`,
    `[Gründungsjahr folgt]`
  ].join(", ");

  const placename = district.isCity ? district.name : `München-${district.name}`;
  const cityName = district.isCity ? district.name : "München";
  const targetName = district.isCity
    ? `${district.name}, Bayern, Deutschland`
    : `${district.name}, München, Bayern, Deutschland`;
  const coverageName = district.isCity
    ? `${district.name} und Umgebung, Oberbayern`
    : `München-${district.name} und Umgebung`;
  
  return {
    title: district.metaTitle,
    description: district.metaDescription,
    canonical: `${BASE_URL}/bezirk/${district.slug}`,
    keywords,
    geoRegion: "DE-BY",
    geoPlacename: placename,
    geoPosition: `${district.lat};${district.lng}`,
    geoCity: cityName,
    geoTarget: targetName,
    geoCoverage: coverageName,
    ogType: "website"
  };
}

export function getSEOForPath(path: string): PageSEO | null {
  const cleanPath = path.split("?")[0].split("#")[0];
  
  if (mainPages[cleanPath]) {
    return mainPages[cleanPath];
  }
  
  // Check for district pages with /bezirk/ prefix
  const bezirkMatch = cleanPath.match(/^\/bezirk\/([^/]+)$/);
  if (bezirkMatch) {
    return getDistrictSEO(bezirkMatch[1]);
  }
  
  // Also check for direct district slug (without /bezirk/ prefix)
  const slug = cleanPath.replace(/^\//, "");
  if (slug && !slug.includes("/")) {
    return getDistrictSEO(slug);
  }
  
  return null;
}

export function injectSEOTags(html: string, path: string, forCrawler: boolean = true): string {
  const seo = getSEOForPath(path);
  if (!seo) return html;
  
  // Replace existing robots/googlebot/bingbot meta tags with enhanced SSR versions
  // (index.html already has preconnect/dns-prefetch hints, no need to duplicate)
  html = html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`
  );
  html = html.replace(
    /<meta\s+name="googlebot"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="googlebot" content="index, follow, max-image-preview:large">`
  );
  html = html.replace(
    /<meta\s+name="bingbot"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="bingbot" content="index, follow">`
  );
  
  // Replace existing title
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${seo.title}</title>`);
  
  // Replace existing meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${seo.description}">`
  );
  
  // Replace existing canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${seo.canonical}">`
  );
  
  // Replace existing OG title
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${seo.title}">`
  );
  
  // Replace existing OG description
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${seo.description}">`
  );
  
  // Replace existing OG url
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${seo.canonical}">`
  );
  
  // Replace existing Twitter title
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${seo.title}">`
  );
  
  // Replace existing Twitter description
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${seo.description}">`
  );
  
  // Replace geo.placename if we have district-specific data
  if (seo.geoPlacename) {
    html = html.replace(
      /<meta\s+name="geo.placename"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="geo.placename" content="${seo.geoPlacename}">`
    );
  }
  
  // Replace keywords if we have page-specific keywords
  if (seo.keywords) {
    html = html.replace(
      /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="keywords" content="${seo.keywords}">`
    );
  }
  
  // Replace geo.region if we have it
  if (seo.geoRegion) {
    html = html.replace(
      /<meta\s+name="geo.region"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="geo.region" content="${seo.geoRegion}">`
    );
  }

  if (seo.geoPosition) {
    html = html.replace(
      /<meta\s+name="geo.position"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="geo.position" content="${seo.geoPosition}">`
    );
    const [lat, lng] = seo.geoPosition.split(";");
    html = html.replace(
      /<meta\s+name="ICBM"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="ICBM" content="${lat}, ${lng}">`
    );
  }

  if (seo.geoCity) {
    html = html.replace(
      /<meta\s+name="city"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="city" content="${seo.geoCity}">`
    );
  }

  if (seo.geoTarget) {
    html = html.replace(
      /<meta\s+name="target"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="target" content="${seo.geoTarget}">`
    );
  }

  if (seo.geoCoverage) {
    html = html.replace(
      /<meta\s+name="coverage"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="coverage" content="${seo.geoCoverage}">`
    );
  }
  
  if (forCrawler) {
    const content = getContentForPath(path);
    if (content) {
      const ssrContent = generateSSRContent(content);
      html = html.replace(/<div id="root"><\/div>/i, `<div id="root"><div id="ssr-content" aria-hidden="true" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;">${ssrContent}</div></div>`);
      
      const noscriptContent = `<noscript>
        <div style="padding:20px;background:#fff3cd;border:1px solid #ffc107;margin:20px;border-radius:8px;">
          <p><strong>JavaScript wird benötigt</strong></p>
          <p>Für die beste Erfahrung aktivieren Sie JavaScript. Kontaktieren Sie uns direkt: <a href="tel:00000000000">[Telefon folgt]</a></p>
        </div>
      </noscript>`;
      html = html.replace(/<\/body>/i, `${noscriptContent}</body>`);
    }
  }
  
  // Inject Schema.org JSON-LD structured data into head
  const schemaMarkup = generateAllSchemas(path);
  html = html.replace(/<\/head>/i, `${schemaMarkup}\n</head>`);
  
  return html;
}
