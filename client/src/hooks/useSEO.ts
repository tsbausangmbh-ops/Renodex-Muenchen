import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  geoRegion?: string;
  geoPlacename?: string;
  schemaType?: "LocalBusiness" | "FAQPage" | "Service" | "Article";
  districtData?: {
    name: string;
    slug: string;
    mainKeyword: string;
    isCity: boolean;
  };
}

const COMPANY_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://renodex.de/#organization",
  "name": "Renodex",
  "alternateName": ["Renodex München", "Renodex Sanierung"],
  "description": "Renodex saniert Haus und Wohnung komplett aus einer Hand: Sanierung, Renovierung, Elektro, Sanitaer, Heizung, Waermepumpe, Photovoltaik, Bodenverlegung, Malerarbeiten, Dachdecker- und Spenglerarbeiten in Muenchen und Umgebung im Umkreis von 25 km.",
  "url": "https://renodex.de",
  "logo": "https://renodex.de/favicon.ico",
  "image": "https://renodex.de/favicon.ico",
  "telephone": "[Telefon folgt]",
  "email": "info@renodex.de",
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": ["Cash", "Bank Transfer", "Credit Card"],
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
    "latitude": 48.1414,
    "longitude": 11.4560
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 48.1414, "longitude": 11.4560 },
    "geoRadius": "25000"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "München",
      "sameAs": "https://de.wikipedia.org/wiki/M%C3%BCnchen"
    },
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
    {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 48.1414,
        "longitude": 11.4560
      },
      "geoRadius": 50000
    }
  ],
  "openingHours": ["Mo-Fr 08:00-16:30"],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "16:30"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Komplettsanierung München",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Komplettsanierung Haus und Wohnung", "description": "Sanierung aus einer Hand: alle Gewerke koordiniert" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Haussanierung München", "description": "Sanierung von Einfamilien- und Bestandshaeusern" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wohnungssanierung München", "description": "Renovierung und Sanierung von Wohnungen" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Badsanierung München", "description": "Komplette Badsanierung inklusive Sanitaer und Fliesen" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Elektroinstallation München", "description": "Elektroarbeiten fuer Sanierung und Neubau" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sanitaer und Heizung München", "description": "Sanitaerinstallation, Heizungstausch, Waermepumpe" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bodenverlegung München", "description": "Verlegung von Boeden bei Sanierung und Renovierung" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Malerarbeiten und Fassade München", "description": "Malerarbeiten innen und aussen, Fassadenanstrich" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dachdecker- und Spenglerarbeiten München", "description": "Dacharbeiten als Teil der Komplettsanierung" } }
    ]
  },
  "sameAs": [
    "https://renodex.de"
  ]
};



function generateDistrictSchema(districtData: { name: string; slug: string; mainKeyword: string; isCity: boolean }, description: string) {
  const locationName = districtData.isCity ? districtData.name : `München-${districtData.name}`;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://renodex.de/bezirk/${districtData.slug}#business`,
    "name": `Renodex - ${districtData.mainKeyword}`,
    "description": description,
    "url": `https://renodex.de/bezirk/${districtData.slug}`,
    "telephone": "[Telefon folgt]",
    "email": "info@renodex.de",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[Adresse folgt]",
      "addressLocality": "München",
      "addressRegion": "Bayern",
      "postalCode": "81247",
      "addressCountry": "DE"
    },
    "areaServed": {
      "@type": "Place",
      "name": locationName,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 48.1414,
        "longitude": 11.4560
      }
    },
    "parentOrganization": {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://renodex.de/#organization",
      "name": "Renodex"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Komplettsanierung in ${locationName}`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Komplettsanierung ${districtData.name}`,
            "description": `Sanierung von Haus und Wohnung aus einer Hand in ${locationName}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Renovierung ${districtData.name}`,
            "description": `Renovierung und Modernisierung in ${locationName}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Sanitaer und Heizung ${districtData.name}`,
            "description": `Sanitaer-, Heizungs- und Elektroarbeiten in ${locationName}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Dachdecker- und Spenglerarbeiten ${districtData.name}`,
            "description": `Dach- und Spenglerarbeiten als Teil der Komplettsanierung in ${locationName}`
          }
        }
      ]
    }
  };
}

export function useSEO({ title, description, canonical, keywords, geoRegion, geoPlacename, schemaType, districtData }: SEOProps) {
  useEffect(() => {
    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    }

    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute("content", title);
    }

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute("content", description);
    }

    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute("href", canonical);
      }
    }

    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }

    if (geoRegion) {
      let metaGeoRegion = document.querySelector('meta[name="geo.region"]');
      if (!metaGeoRegion) {
        metaGeoRegion = document.createElement("meta");
        metaGeoRegion.setAttribute("name", "geo.region");
        document.head.appendChild(metaGeoRegion);
      }
      metaGeoRegion.setAttribute("content", geoRegion);
    }

    if (geoPlacename) {
      let metaGeoPlacename = document.querySelector('meta[name="geo.placename"]');
      if (!metaGeoPlacename) {
        metaGeoPlacename = document.createElement("meta");
        metaGeoPlacename.setAttribute("name", "geo.placename");
        document.head.appendChild(metaGeoPlacename);
      }
      metaGeoPlacename.setAttribute("content", geoPlacename);
    }

    // SSR handles main schemas (RoofingContractor, LocalBusiness, Service, FAQPage)
    // Client-side only adds district-specific LocalBusiness schema for district pages
    let existingDistrictSchema = document.querySelector('script[type="application/ld+json"][data-seo="district"]');
    if (existingDistrictSchema) {
      existingDistrictSchema.remove();
    }
    
    if (districtData) {
      const districtSchemaScript = document.createElement("script");
      districtSchemaScript.type = "application/ld+json";
      districtSchemaScript.setAttribute("data-seo", "district");
      districtSchemaScript.textContent = JSON.stringify(generateDistrictSchema(districtData, description));
      document.head.appendChild(districtSchemaScript);
    }
    return () => {
      document.title = 'Renodex München – Komplettsanierung aus einer Hand';
      const districtSchemaToRemove = document.querySelector('script[type="application/ld+json"][data-seo="district"]');
      if (districtSchemaToRemove) {
        districtSchemaToRemove.remove();
      }
    };
  }, [title, description, canonical, keywords, geoRegion, geoPlacename, schemaType, districtData]);
}
