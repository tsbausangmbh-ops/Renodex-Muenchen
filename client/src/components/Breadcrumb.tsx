import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const allItems: BreadcrumbItem[] = [
    { label: "Startseite", href: "/" },
    ...items
  ];

  return (
    <>
      <nav 
        aria-label="Breadcrumb" 
        className={`text-sm text-muted-foreground ${className}`}
        data-testid="nav-breadcrumb"
      >
        <ol className="flex flex-wrap items-center gap-1">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight className="w-3 h-3 text-muted-foreground/50" aria-hidden="true" />
              )}
              {item.href && index < allItems.length - 1 ? (
                <Link href={item.href}>
                  <span 
                    className="hover:text-foreground transition-colors flex items-center gap-1"
                    data-testid={`breadcrumb-link-${index}`}
                  >
                    {index === 0 && <Home className="w-3 h-3" aria-hidden="true" />}
                    {item.label}
                  </span>
                </Link>
              ) : (
                <span 
                  className="text-foreground font-medium"
                  aria-current={index === allItems.length - 1 ? "page" : undefined}
                  data-testid={`breadcrumb-current-${index}`}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export const SERVICE_BREADCRUMBS: Record<string, BreadcrumbItem[]> = {
  "/leistungen": [{ label: "Leistungen" }],
  "/sofort-hilfe": [{ label: "Leistungen", href: "/leistungen" }, { label: "Digitale Erstberatung" }],
  "/wasserschaden": [{ label: "Leistungen", href: "/leistungen" }, { label: "Sturmschaden" }],
  "/heizung-ausfall": [{ label: "Leistungen", href: "/leistungen" }, { label: "Heizungsausfall" }],
  "/sanierung-reparatur": [{ label: "Leistungen", href: "/leistungen" }, { label: "Sanierung oder Reparatur" }],
  "/komplettsanierung-kosten": [{ label: "Leistungen", href: "/leistungen" }, { label: "Kosten einer Komplettsanierung" }],
  "/waermepumpe-photovoltaik": [{ label: "Leistungen", href: "/leistungen" }, { label: "Wärmepumpe & Photovoltaik" }],
  "/faq": [{ label: "Preise & FAQ" }],
  "/kontakt": [{ label: "Kontakt" }],
  "/ueber-uns": [{ label: "Über uns" }],
  "/ratgeber": [{ label: "Ratgeber" }],
  "/impressum": [{ label: "Rechtliches" }, { label: "Impressum" }],
  "/eu-ai-act": [{ label: "Rechtliches" }, { label: "EU AI Act" }],
  "/datenschutz": [{ label: "Rechtliches" }, { label: "Datenschutz" }],
  "/agb": [{ label: "Rechtliches" }, { label: "AGB" }],
  "/cookie": [{ label: "Rechtliches" }, { label: "Cookie-Richtlinie" }],
  "/barrierefreiheit": [{ label: "Rechtliches" }, { label: "Barrierefreiheit" }],
};

export function getDistrictBreadcrumbs(districtName: string, isCity: boolean): BreadcrumbItem[] {
  return [
    { label: "Standorte", href: "/leistungen" },
    { label: isCity ? "Münchner Umland" : "München Stadtteile" },
    { label: `Dachdecker ${districtName}` }
  ];
}
