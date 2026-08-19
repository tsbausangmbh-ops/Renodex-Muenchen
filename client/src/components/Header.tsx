import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Mail, Menu, X, ChevronDown, AlertTriangle, Tag } from "lucide-react";

interface HeaderProps {
  phoneNumber: string;
}

const navLinks = [
  { label: "Startseite", href: "/" },
  { label: "Leistungen", href: "/leistungen", children: [
    { label: "Komplettsanierung", href: "/leistungen/komplettsanierung" },
    { label: "Haussanierung", href: "/leistungen/haussanierung" },
    { label: "Wohnungssanierung", href: "/leistungen/wohnungssanierung" },
    { label: "Badsanierung", href: "/leistungen/badsanierung" },
    { label: "Elektroinstallation", href: "/leistungen/elektroinstallation" },
    { label: "Sanitär & Heizung", href: "/leistungen/sanitaer" },
    { label: "Wärmepumpe", href: "/leistungen/waermepumpe" },
    { label: "Photovoltaik", href: "/leistungen/photovoltaik" },
    { label: "Dachdecker & Spengler", href: "/leistungen/dachdecker" },
    { label: "Alle Leistungen", href: "/leistungen" },
  ]},
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "FAQ & Preise", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Rechtliches", href: "/impressum", children: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "EU AI Act", href: "/eu-ai-act" },
    { label: "AGB", href: "/agb" },
    { label: "Cookie-Einstellungen", href: "/cookie" },
    { label: "Barrierefreiheit", href: "/barrierefreiheit" },
  ]},
];

export default function Header({ phoneNumber }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => { setMenuOpen(false); setSubOpen(false); }, [location]);

  // Rabatt-Aktionsleiste, zentral im Header (erscheint dadurch automatisch auf JEDER
  // Seite, auch neuen). Steuerung komplett ueber preis_katalog -- Prozentsatz, Thema
  // (welche Leistung) und Ablaufdatum sind DB-Werte, kein Deploy noetig um eine Aktion
  // zu starten/aendern/beenden. schluessel-Praefix "rabatt_" ist die Konvention fuer
  // weitere kuenftige Aktionen (siehe projekte/webseiten/CLAUDE.md).
  const [rabatte, setRabatte] = useState<{ prozent: number; thema: string; bisDatum: string }[]>([]);
  useEffect(() => {
    fetch("/api/preise")
      .then((r) => (r.ok ? r.json() : null))
      .then((daten) => {
        if (!daten?.preise) return;
        const heute = new Date().toISOString().split("T")[0];
        const aktive = daten.preise
          .filter((p: any) => p.schluessel?.startsWith("rabatt_") && p.beschreibung && p.beschreibung >= heute)
          .map((p: any) => ({
            prozent: Math.round(parseFloat(p.preis)),
            thema: p.titel,
            bisDatum: new Date(p.beschreibung).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }),
          }));
        setRabatte(aktive);
      })
      .catch(() => {});
  }, []);

  const active = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  const navStyle = (href: string) =>
    `inline-flex items-center px-3 h-[36px] text-[13px] font-semibold rounded-md cursor-pointer transition-all whitespace-nowrap align-middle ${
      active(href)
        ? "text-primary bg-primary/10"
        : "text-gray-700 hover:text-primary hover:bg-primary/5"
    }`;

  return (
    <header className="sticky top-0 z-50" data-testid="header-main" role="banner">
      {rabatte.map((r, i) => (
        <div key={i} className="bg-primary text-white text-xs sm:text-sm text-center py-1.5 px-4 font-semibold" data-testid={`banner-rabatt-${i}`}>
          <Tag className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" />
          {r.prozent}% Rabatt auf {r.thema} bei digitaler Anfrage – nur bis {r.bisDatum}
        </div>
      ))}
      <div className="bg-[#1a1a1a] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between">
          <span className="text-gray-400 hidden sm:block">Mo–Fr 8:00–16:30 Uhr · [Adresse folgt], München</span>
          <div className="flex items-center gap-4 ml-auto">
            <a
              href="mailto:info@renodex.de"
              className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
              data-testid="link-email-header"
            >
              <Mail className="w-3.5 h-3.5" />
              info@renodex.de
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-[60px] flex items-center justify-between">
          <Link href="/" aria-label="Renodex – Startseite">
            <div className="flex items-center gap-2.5 cursor-pointer" data-testid="link-logo">
              <img
                src="/renodex-logo.png"
                alt="Renodex"
                className="h-10 w-10 rounded-md object-contain"
                width={40}
                height={40}
              />
              <div className="leading-tight">
                <span className="block text-[15px] font-black text-gray-900 tracking-tight">Renodex</span>
                <span className="block text-[10px] font-bold text-primary uppercase tracking-wider">Sanierung München</span>
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5" data-testid="nav-desktop" aria-label="Hauptnavigation">
            {navLinks.map((item) => {
              if (item.children) {
                return (
                  <div key={item.href} className="relative group flex items-center">
                    <Link href={item.href}>
                      <span className={navStyle(item.href)} data-testid="nav-link-leistungen">
                        {item.label}
                        <ChevronDown className="w-3 h-3 ml-1 transition-transform group-hover:rotate-180" />
                      </span>
                    </Link>
                    <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-1.5 min-w-[200px]">
                        {item.children.map((child) => (
                          <Link key={child.href + child.label} href={child.href}>
                            <span
                              className={`block px-4 py-2 text-[13px] cursor-pointer transition-colors ${
                                active(child.href)
                                  ? "text-primary font-semibold bg-primary/10"
                                  : "text-gray-600 hover:text-primary hover:bg-primary/5"
                              }`}
                              data-testid={`nav-link-${child.label.toLowerCase().replace(/\s/g, "-")}`}
                            >
                              {child.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link key={item.href} href={item.href}>
                  <span className={navStyle(item.href)} data-testid={`nav-link-${item.label.toLowerCase().replace(/\s/g, "-")}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/kontakt">
              <span className="btn-glanz inline-flex items-center gap-2 text-white text-sm font-bold px-3 sm:px-4 py-2 rounded-md shadow-lg transition-colors" data-testid="link-email-cta-header">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Digital anfragen</span>
              </span>
            </Link>
            <button
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMenuOpen(!menuOpen)}
              data-testid="button-mobile-menu"
              aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden bg-white border-b border-gray-200 shadow-lg" data-testid="nav-mobile" aria-label="Mobile Navigation">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            <a
              href="/sofort-hilfe"
              className="flex items-center gap-2 px-3 py-2.5 bg-primary text-white font-bold text-sm rounded-md"
              data-testid="nav-mobile-link-notdienst"
            >
              <AlertTriangle className="w-4 h-4" />
              Schnelle Hilfe München
            </a>
            {navLinks.map((item) =>
              item.children ? (
                <div key={item.href}>
                  <button
                    type="button"
                    onClick={() => setSubOpen(!subOpen)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md ${
                      active(item.href) ? "text-primary bg-primary/10" : "text-gray-700 hover:bg-gray-50"
                    }`}
                    data-testid="nav-mobile-link-leistungen"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${subOpen ? "rotate-180" : ""}`} />
                  </button>
                  {subOpen && (
                    <div className="ml-3 mt-1 border-l-2 border-primary/20 pl-3 space-y-0.5">
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className={`block px-3 py-2 text-sm rounded-md ${
                            active(child.href) ? "text-primary font-semibold" : "text-gray-600 hover:text-primary"
                          }`}
                          data-testid={`nav-mobile-${child.label.toLowerCase().replace(/\s/g, "-")}`}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-md ${
                    active(item.href) ? "text-primary bg-primary/10" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  data-testid={`nav-mobile-link-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {item.label}
                </a>
              )
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
