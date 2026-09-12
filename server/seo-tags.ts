import { getContentForPath, generateSSRContent } from "./seo-content";
import { LEISTUNGEN_THEMEN } from "../client/src/content/leistungenThemen.js";

// ============================================
// SCHEMA.ORG STRUCTURED DATA FOR SSR
// ============================================

// WebSite Schema für Google Site-Name in Suchergebnissen
const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://renodex.de/#website",
  "name": "Renodex München",
  "alternateName": ["Renodex München", "Renodex Sanierung"],
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
  "name": "Sanierungs-Service München und Umgebung",
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
  }
};

const COMPANY_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://renodex.de/#organization",
  "name": "Renodex München",
  "alternateName": ["Renodex München", "Renodex Sanierung"],
  "description": "Renodex ist Ihr Partnernetzwerk aus Fachfirmen für die Komplettsanierung von Haus und Wohnung aus einer Hand in München und Umgebung: Sanierung, Renovierung, Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik und weitere Gewerke.",
  "url": "https://renodex.de",
  "logo": "https://renodex.de/renodex-logo.png",
  "image": "https://renodex.de/renodex-logo.png",
  "telephone": "+49 89 381684766",
  "email": "info@renodex.de",
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": ["Cash", "Bank Transfer", "Credit Card"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Helmut-Schmidt-Allee 54",
    "addressLocality": "München",
    "addressRegion": "Bayern",
    "postalCode": "81248",
    "addressCountry": "DE"
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
    { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 48.1661, "longitude": 11.4728 }, "geoRadius": 25000 }
  ],
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:00", "closes": "16:30" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "10:00", "closes": "14:00" }
  ],
  "sameAs": [
    "https://www.facebook.com/Renodex",
    "https://www.instagram.com/renodex_muenchen",
    "https://www.provenexpert.com/renodex-gmbh"
  ],
  "slogan": "Ihr Partnernetzwerk aus Fachfirmen in München",
  "knowsAbout": ["Komplettsanierung", "Haussanierung", "Wohnungssanierung", "Renovierung", "Badsanierung", "Bodenverlegung", "Malerarbeiten", "Elektroinstallation", "Sanitärinstallation", "Heizungsinstallation", "Wärmepumpe", "Photovoltaik", "Energetische Sanierung", "KfW-Förderung"]
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://renodex.de/#localbusiness",
  "name": "Renodex - Partnernetzwerk für Komplettsanierung München",
  "description": "Renodex ist Ihr Partnernetzwerk für die Komplettsanierung von Haus und Wohnung aus einer Hand: Sanierung, Renovierung, Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik und weitere Gewerke in München und Umgebung (25 km Radius).",
  "url": "https://renodex.de",
  "telephone": "+49 89 381684766",
  "email": "info@renodex.de",
  "priceRange": "€€",
  "image": "https://renodex.de/renodex-logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Helmut-Schmidt-Allee 54",
    "addressLocality": "München",
    "addressRegion": "Bayern",
    "postalCode": "81248",
    "addressCountry": "DE"
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:00", "closes": "16:30" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "10:00", "closes": "14:00" }
  ],
};

const SERVICE_SCHEMAS = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-komplettsanierung",
    "name": "Komplettsanierung München",
    "description": "Komplettsanierung von Haus und Wohnung aus einer Hand: Sanitär, Heizung, Elektro und weitere Gewerke koordiniert.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Komplettsanierung München"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-haussanierung",
    "name": "Haussanierung München",
    "description": "Sanierung von Einfamilien- und Mehrfamilienhäusern in München und Umgebung.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Haussanierung München"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-wohnungssanierung",
    "name": "Wohnungssanierung München",
    "description": "Sanierung und Renovierung von Wohnungen, abgestimmt auf Ihre Wünsche.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Wohnungssanierung München"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-renovierung",
    "name": "Renovierung München",
    "description": "Renovierungsarbeiten für Haus und Wohnung, von einzelnen Räumen bis zur Gesamtrenovierung.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Renovierung München"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-badsanierung",
    "name": "Badsanierung München",
    "description": "Badsanierung aus einer Hand: Sanitär, Fliesen und Elektro für Ihr neues Bad.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Badsanierung München"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-bodenverlegung",
    "name": "Bodenverlegung München",
    "description": "Verlegung von Böden für Haus und Wohnung, fachgerecht und sauber ausgeführt.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Bodenverlegung München"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-malerarbeiten-fassade",
    "name": "Malerarbeiten und Fassade München",
    "description": "Malerarbeiten innen und außen sowie Fassadenarbeiten in München und Umgebung.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Malerarbeiten und Fassade München"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-mauerwerksabdichtung",
    "name": "Mauerwerksabdichtung München",
    "description": "Abdichtung von Mauerwerk gegen Feuchtigkeit.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Mauerwerksabdichtung München"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-asbestsanierung",
    "name": "Asbestsanierung München",
    "description": "Fachgerechte Asbestsanierung nach den geltenden Vorschriften.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Asbestsanierung München"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-tueren",
    "name": "Türen Einbau und Austausch München",
    "description": "Einbau und Austausch von Türen im Rahmen Ihrer Sanierung.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Türen Einbau und Austausch München"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-elektroinstallation",
    "name": "Elektroinstallation München",
    "description": "Elektroinstallation für Haus und Wohnung, von der Erneuerung bis zum Neubau.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Elektroinstallation München"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-sanitaer",
    "name": "Sanitärinstallation München",
    "description": "Sanitärinstallation für Bad und Küche, fachgerecht ausgeführt.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Sanitärinstallation München"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-heizung",
    "name": "Heizungsinstallation München",
    "description": "Heizungsinstallation und -modernisierung für Ihr Zuhause.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Heizungsinstallation München"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-waermepumpe",
    "name": "Wärmepumpe München",
    "description": "Planung und Installation von Wärmepumpen für Haus und Wohnung.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Wärmepumpe München"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://renodex.de/#service-photovoltaik",
    "name": "Photovoltaik München",
    "description": "Planung und Installation von Photovoltaikanlagen.",
    "provider": { "@id": "https://renodex.de/#organization" },
    "areaServed": { "@type": "City", "name": "München" },
    "serviceType": "Photovoltaik München"
  }
];

// Google 2026: HowTo-Schema für Featured Snippets und AI Overviews
const HOWTO_KOMPLETTSANIERUNG = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Komplettsanierung in München - So läuft der Prozess ab",
  "description": "Schritt-für-Schritt Ablauf einer Komplettsanierung von Haus oder Wohnung durch Renodex in München.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Digital anfragen", "text": "Sie beschreiben Ihr Vorhaben und schicken Fotos über das Kontaktformular." },
    { "@type": "HowToStep", "position": 2, "name": "Besichtigung", "text": "Renodex sieht sich Haus oder Wohnung vor Ort an und klärt den Umfang je Gewerk." },
    { "@type": "HowToStep", "position": 3, "name": "Festpreis nach Besichtigung", "text": "Renodex erstellt das Festpreisangebot. Betrifft das Vorhaben mehrere Gewerke, gibt es ein Gesamtpaket zu einem Festpreis." },
    { "@type": "HowToStep", "position": 4, "name": "Ausführung und Koordination", "text": "Eingetragene Fachfirmen führen die Arbeiten aus. Renodex stimmt Termine und Reihenfolge der Gewerke ab." }
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
        "name": "Renodex München",
        "item": BASE_URL
      }]
    };
  }
  
  const pathNames: Record<string, string> = {
    "/leistungen": "Leistungen",
    "/sofort-hilfe": "Digitale Erstberatung",
    "/sanierung-reparatur": "Sanierung & Renovierung",
    "/komplettsanierung-kosten": "Komplettsanierung",
    "/wasserschaden": "Mauerwerksabdichtung",
    "/heizung-ausfall": "Heizungsinstallation",
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
      "aschheim": "Aschheim", "feldkirchen": "Feldkirchen", "neubiberg": "Neubiberg", "putzbrunn": "Putzbrunn", "dachau": "Dachau"
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
    webPage["primaryImageOfPage"] = { "@type": "ImageObject", "url": DEFAULT_OG_IMAGE, "caption": DEFAULT_OG_IMAGE_ALT };
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

  if (path === "/" || path === "/komplettsanierung-kosten" || path === "/leistungen") {
    graphNodes.push(stripContext(HOWTO_KOMPLETTSANIERUNG));
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
  /** Absolute Bild-URL fuer og:image/twitter:image. Leer: Hero der Startseite. */
  ogImage?: string;
  ogImageAlt?: string;
}

const BASE_URL = "https://renodex.de";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/optimized/handwerker-team-sanierung-muenchen.jpg`;
const DEFAULT_OG_IMAGE_ALT = "Handwerkerteam für Sanierung und Renovierung vor Firmentransportern auf dem Betriebshof";

const mainPages: Record<string, PageSEO> = {
  "/": {
    title: "Renodex München ✓ Komplettsanierung Haus & Wohnung",
    description: "Renodex München: Komplettsanierung von Haus und Wohnung aus einer Hand – Sanitär, Heizung, Elektro, Wärmepumpe, Photovoltaik. München, 25 km Radius.",
    canonical: BASE_URL,
    keywords: "Komplettsanierung München, Haussanierung, Wohnungssanierung, Renovierung, Sanitär, Heizung, Elektro, Wärmepumpe, Photovoltaik, Partnernetzwerk",
    geoRegion: "DE-BY",
    geoPlacename: "München",
    ogType: "website"
  },
  "/ueber-uns": {
    title: "Über uns – Partnernetzwerk in München | Renodex",
    description: "Renodex: Partnernetzwerk für Komplettsanierung von Haus und Wohnung in München. Ein Ansprechpartner für alle Gewerke.",
    canonical: `${BASE_URL}/ueber-uns`,
    keywords: "Renodex, Partnernetzwerk, Komplettsanierung München, Koordination, Fachfirmen",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/leistungen": {
    title: "Leistungen – Komplettsanierung Haus & Wohnung | Renodex",
    description: "Renodex bietet Komplettsanierung, Renovierung, Badsanierung, Elektro, Sanitär, Heizung und mehr aus einer Hand. München und Umgebung, 25 km Radius.",
    canonical: `${BASE_URL}/leistungen`,
    keywords: "Komplettsanierung München, Haussanierung, Wohnungssanierung, Badsanierung, Elektroinstallation, Sanitärinstallation, Heizungsinstallation, Wärmepumpe, Photovoltaik, Partnernetzwerk",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/sofort-hilfe": {
    title: "Digitale Erstberatung – Fotos statt Termin | Renodex",
    description: "Zeigen Sie uns Ihr Sanierungsvorhaben per Foto, Video oder Sprachnachricht. Nach der Besichtigung erhalten Sie ein Festpreisangebot von Renodex.",
    canonical: `${BASE_URL}/sofort-hilfe`,
    keywords: "Renodex digitale Anfrage, Sanierung Kontakt München, Kostenvoranschlag online, Foto Video Sprachnachricht",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/ratgeber": {
    title: "Ratgeber – Sanierung und Renovierung München | Renodex",
    description: "Praktische Tipps rund um Komplettsanierung, Renovierung und einzelne Gewerke für Haus und Wohnung in München – von Renodex.",
    canonical: `${BASE_URL}/ratgeber`,
    keywords: "Sanierung Ratgeber München, Renovierung Tipps, Komplettsanierung Planung, Förderung energetische Sanierung",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/preise": {
    title: "Preise & Ablauf – Kostenlose Erstberatung | Renodex",
    description: "Sie fragen digital mit Fotos an, danach folgt die Besichtigung. Renodex erstellt das Festpreisangebot, bei mehreren Gewerken als Gesamtpaket.",
    canonical: `${BASE_URL}/preise`,
    keywords: "Renodex Preise, Komplettsanierung Kosten München, individuelles Angebot, kostenlose Erstberatung",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/faq": {
    title: "Häufige Fragen – Komplettsanierung München | Renodex",
    description: "Antworten auf häufige Fragen zu Ablauf, Leistungen und Förderungen bei einer Komplettsanierung von Haus oder Wohnung durch Renodex in München und Umgebung.",
    canonical: `${BASE_URL}/faq`,
    keywords: "Renodex FAQ, Komplettsanierung Fragen, Ablauf Sanierung, Förderung KfW BAFA",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/kontakt": {
    title: "Kontakt – Renodex München | Digitale Erstberatung",
    description: "Erreichen Sie Renodex per E-Mail oder digitaler Anfrage. Sie bekommen eine Rückmeldung per E-Mail zu Ihrer Sanierung von Haus oder Wohnung in München.",
    canonical: `${BASE_URL}/kontakt`,
    keywords: "Renodex Kontakt München, Komplettsanierung Anfrage, digitale Beratung, E-Mail Kontaktformular",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/impressum": {
    title: "Impressum | Renodex München",
    description: "Impressum der Renodex: Kontaktdaten und rechtliche Angaben gemäß § 5 DDG.",
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
    title: "AGB | Renodex München",
    description: "Allgemeine Geschäftsbedingungen der Renodex für Komplettsanierung und Renovierung von Haus und Wohnung in München und Umgebung.",
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
  "/wasserschaden": {
    title: "Mauerwerksabdichtung & Wasserschaden – München | Renodex",
    description: "Feuchte Wände oder Wasserschaden? Renodex prüft die Ursache und saniert Mauerwerk und betroffene Gewerke aus einer Hand in München.",
    canonical: `${BASE_URL}/wasserschaden`,
    keywords: "Mauerwerksabdichtung München, Wasserschaden Sanierung, feuchte Wände, Renodex"
  },
  "/heizung-ausfall": {
    title: "Heizungsinstallation & Heizungssanierung – München | Renodex",
    description: "Veraltete oder ausgefallene Heizung? Renodex saniert und modernisiert Heizungsanlagen in München und Umgebung, inklusive Beratung zu Wärmepumpe und Förderungen.",
    canonical: `${BASE_URL}/heizung-ausfall`,
    keywords: "Heizungsinstallation München, Heizung Sanierung, Wärmepumpe, Renodex"
  },
  "/sanierung-reparatur": {
    title: "Sanierung & Renovierung – Haus und Wohnung | Renodex",
    description: "Renodex saniert und renoviert Haus und Wohnung in München und Umgebung – von der Einzelmaßnahme bis zur Komplettsanierung, koordiniert aus einer Hand.",
    canonical: `${BASE_URL}/sanierung-reparatur`,
    keywords: "Sanierung München, Renovierung Haus Wohnung, Komplettsanierung, Renodex",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/komplettsanierung-kosten": {
    title: "Komplettsanierung München – Ablauf & Beratung | Renodex",
    description: "Was ist bei einer Komplettsanierung von Haus oder Wohnung zu beachten? Renodex berät Sie zu Ablauf, Gewerken und Fördermöglichkeiten – kostenlose Erstberatung.",
    canonical: `${BASE_URL}/komplettsanierung-kosten`,
    keywords: "Komplettsanierung München, Ablauf, Beratung, Förderung, KfW, Renodex",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
  "/waermepumpe-photovoltaik": {
    title: "Wärmepumpe & Photovoltaik München | Renodex",
    description: "Wärmepumpe und Photovoltaik kombiniert: Renodex prüft Eignung, Zusammenspiel beider Systeme und Fördermöglichkeiten für Haus und Wohnung in München.",
    canonical: `${BASE_URL}/waermepumpe-photovoltaik`,
    keywords: "Wärmepumpe München, Photovoltaik München, Förderung, KfW, BAFA, Renodex",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  },
};

// Leistungsseiten-SEO wird aus EINER Quelle generiert (LEISTUNGEN_THEMEN),
// damit eine neue Leistungsseite nie wieder in einer zweiten, manuell
// gepflegten Liste vergessen werden kann.
for (const thema of LEISTUNGEN_THEMEN) {
  mainPages[`/leistungen/${thema.slug}`] = {
    title: thema.metaTitle,
    description: thema.metaDescription,
    canonical: `${BASE_URL}/leistungen/${thema.slug}`,
    keywords: `${thema.title} München, ${thema.heroFrage}, Komplettsanierung München, aus einer Hand`,
    geoRegion: "DE-BY",
    geoPlacename: "München",
    ogImage: `${BASE_URL}${thema.heroImage.replace(/\.webp$/, ".jpg")}`,
    ogImageAlt: thema.heroImageAlt,
  };
}

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
  { slug: "allach", name: "Allach", metaTitle: "Allach Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Allach: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1833, lng: 11.4667 },
  { slug: "aubing", name: "Aubing", metaTitle: "Aubing Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Aubing: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1589, lng: 11.4178 },
  { slug: "berg-am-laim", name: "Berg am Laim", metaTitle: "Berg am Laim Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Berg am Laim: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1267, lng: 11.6264 },
  { slug: "bogenhausen", name: "Bogenhausen", metaTitle: "Bogenhausen Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Bogenhausen: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1544, lng: 11.6086 },
  { slug: "feldmoching", name: "Feldmoching", metaTitle: "Feldmoching Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Feldmoching: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.2089, lng: 11.5328 },
  { slug: "hadern", name: "Hadern", metaTitle: "Hadern Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Hadern: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1156, lng: 11.4833 },
  { slug: "haidhausen", name: "Haidhausen", metaTitle: "Haidhausen Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Haidhausen: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1331, lng: 11.5944 },
  { slug: "laim", name: "Laim", metaTitle: "Laim Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Laim: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1397, lng: 11.505 },
  { slug: "lehel", name: "Lehel", metaTitle: "Lehel Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Lehel: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1419, lng: 11.585 },
  { slug: "maxvorstadt", name: "Maxvorstadt", metaTitle: "Maxvorstadt Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Maxvorstadt: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.153, lng: 11.566 },
  { slug: "milbertshofen", name: "Milbertshofen", metaTitle: "Milbertshofen Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Milbertshofen: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1883, lng: 11.5667 },
  { slug: "moosach", name: "Moosach", metaTitle: "Moosach Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Moosach: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1867, lng: 11.5047 },
  { slug: "neuhausen", name: "Neuhausen", metaTitle: "Neuhausen Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Neuhausen: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1561, lng: 11.5347 },
  { slug: "nymphenburg", name: "Nymphenburg", metaTitle: "Nymphenburg Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Nymphenburg: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1583, lng: 11.5033 },
  { slug: "obergiesing", name: "Obergiesing", metaTitle: "Obergiesing Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Obergiesing: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.11, lng: 11.5833 },
  { slug: "obermenzing", name: "Obermenzing", metaTitle: "Obermenzing Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Obermenzing: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1714, lng: 11.4547 },
  { slug: "pasing", name: "Pasing", metaTitle: "Pasing Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Pasing: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1419, lng: 11.4556 },
  { slug: "perlach", name: "Perlach", metaTitle: "Perlach Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Perlach: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.0833, lng: 11.6333 },
  { slug: "ramersdorf", name: "Ramersdorf", metaTitle: "Ramersdorf Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Ramersdorf: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.11, lng: 11.61 },
  { slug: "riem", name: "Riem", metaTitle: "Riem Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Riem: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.13, lng: 11.6656 },
  { slug: "schwabing", name: "Schwabing", metaTitle: "Schwabing Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Schwabing: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1653, lng: 11.5783 },
  { slug: "schwanthalerhoehe", name: "Schwanthalerhöhe", metaTitle: "Schwanthalerhöhe Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Schwanthalerhöhe: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1328, lng: 11.5456 },
  { slug: "sendling", name: "Sendling", metaTitle: "Sendling Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Sendling: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1178, lng: 11.5444 },
  { slug: "solln", name: "Solln", metaTitle: "Solln Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Solln: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.0833, lng: 11.5167 },
  { slug: "trudering", name: "Trudering", metaTitle: "Trudering Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Trudering: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1167, lng: 11.65 },
  { slug: "untermenzing", name: "Untermenzing", metaTitle: "Untermenzing Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in München-Untermenzing: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: false, lat: 48.1836, lng: 11.4658 },
  { slug: "garching", name: "Garching", metaTitle: "Garching Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Garching: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.2489, lng: 11.6511 },
  { slug: "germering", name: "Germering", metaTitle: "Germering Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Germering: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.1333, lng: 11.3667 },
  { slug: "ottobrunn", name: "Ottobrunn", metaTitle: "Ottobrunn Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Ottobrunn: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.0644, lng: 11.6558 },
  { slug: "unterschleissheim", name: "Unterschleißheim", metaTitle: "Unterschleißheim Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Unterschleißheim: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.2811, lng: 11.5778 },
  { slug: "unterhaching", name: "Unterhaching", metaTitle: "Unterhaching Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Unterhaching: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.0656, lng: 11.6167 },
  { slug: "haar", name: "Haar", metaTitle: "Haar Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Haar: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.1097, lng: 11.7253 },
  { slug: "taufkirchen", name: "Taufkirchen", metaTitle: "Taufkirchen Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Taufkirchen: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.0444, lng: 11.6167 },
  { slug: "graefelfing", name: "Gräfelfing", metaTitle: "Gräfelfing Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Gräfelfing: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.1186, lng: 11.4328 },
  { slug: "planegg", name: "Planegg", metaTitle: "Planegg Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Planegg: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.1069, lng: 11.4253 },
  { slug: "pullach", name: "Pullach", metaTitle: "Pullach Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Pullach: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.0589, lng: 11.5211 },
  { slug: "gruenwald", name: "Grünwald", metaTitle: "Grünwald Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Grünwald: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.0444, lng: 11.5167 },
  { slug: "ismaning", name: "Ismaning", metaTitle: "Ismaning Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Ismaning: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.2275, lng: 11.6725 },
  { slug: "oberschleissheim", name: "Oberschleißheim", metaTitle: "Oberschleißheim Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Oberschleißheim: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.2536, lng: 11.5633 },
  { slug: "vaterstetten", name: "Vaterstetten", metaTitle: "Vaterstetten Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Vaterstetten: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.1053, lng: 11.7822 },
  { slug: "poing", name: "Poing", metaTitle: "Poing Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Poing: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.1694, lng: 11.8036 },
  { slug: "olching", name: "Olching", metaTitle: "Olching Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Olching: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.2042, lng: 11.3306 },
  { slug: "groebenzell", name: "Gröbenzell", metaTitle: "Gröbenzell Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Gröbenzell: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.1986, lng: 11.3697 },
  { slug: "kirchheim", name: "Kirchheim", metaTitle: "Kirchheim Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Kirchheim: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.1744, lng: 11.7567 },
  { slug: "aschheim", name: "Aschheim", metaTitle: "Aschheim Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Aschheim: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.1722, lng: 11.7172 },
  { slug: "feldkirchen", name: "Feldkirchen", metaTitle: "Feldkirchen Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Feldkirchen: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.15, lng: 11.7333 },
  { slug: "neubiberg", name: "Neubiberg", metaTitle: "Neubiberg Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Neubiberg: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.0733, lng: 11.6633 },
  { slug: "putzbrunn", name: "Putzbrunn", metaTitle: "Putzbrunn Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Putzbrunn: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.0756, lng: 11.7136 },
  { slug: "dachau", name: "Dachau", metaTitle: "Dachau Komplettsanierung | Renodex", metaDescription: "Renodex saniert Haus und Wohnung in Dachau: Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik. Kostenlose Erstberatung.", isCity: true, lat: 48.2606, lng: 11.4334 }
];

function getDistrictSEO(slug: string): PageSEO | null {
  const district = districts.find(d => d.slug === slug);
  if (!district) return null;
  
  const keywords = [
    `Komplettsanierung ${district.name}`,
    `Renovierung ${district.name}`,
    `Badsanierung ${district.name}`,
    `Sanierung Sofort-Hilfe ${district.name}`,
    `Partnernetzwerk`
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

  // og:image / twitter:image je Seite (Leistungsseiten: eigenes Hero-Bild)
  const ogImage = seo.ogImage || DEFAULT_OG_IMAGE;
  const ogImageAlt = seo.ogImageAlt || DEFAULT_OG_IMAGE_ALT;
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${ogImage}">`
  );
  html = html.replace(
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:alt" content="${ogImageAlt}">`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${ogImage}">`
  );
  html = html.replace(
    /<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image:alt" content="${ogImageAlt}">`
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
          <p>Für die beste Erfahrung aktivieren Sie JavaScript. Kontaktieren Sie uns direkt: <a href="mailto:info@renodex.de">info@renodex.de</a></p>
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
