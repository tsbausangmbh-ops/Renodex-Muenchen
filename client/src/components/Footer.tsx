import { Phone, Mail, MapPin, Clock } from "lucide-react";
const renodexLogo = "/renodex-logo.png";

interface FooterProps {
  phoneNumber: string;
}

export default function Footer({ phoneNumber }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-white py-4" data-testid="footer-main" role="contentinfo">
      <div className="h-1 bg-destructive mb-3" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-2 mb-3">
          <div className="col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-2 hover:opacity-90 transition-opacity" aria-label="Renodex - Zur Startseite">
              <div className="h-8 w-10 rounded-md overflow-hidden bg-white flex items-center justify-center p-0.5">
                <img
                  src={renodexLogo}
                  alt="Renodex Sanierung München Logo"
                  className="h-full w-full object-contain"
                  width="80"
                  height="80"
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <div>
                <div className="font-bold text-sm text-white leading-none">Renodex</div>
                <div className="text-xs text-destructive font-medium leading-none mt-0.5">Sanierung München</div>
              </div>
            </a>
            <p className="text-[#b5b5bd] text-xs leading-snug m-0">
              Koordination & Bauleitung München. Netzwerk aus Fachfirmen mit 16+ Jahren Erfahrung.
            </p>
          </div>

          <div className="col-span-2 lg:col-span-2">
            <h3 className="font-semibold text-xs mb-1.5 text-white uppercase tracking-wide" id="footer-nav-heading">Leistungen</h3>
            <nav className="grid grid-cols-2 gap-x-3 gap-y-0" aria-labelledby="footer-nav-heading">
              <a href="/leistungen" className="text-[#b5b5bd] hover:text-white text-sm leading-6" data-testid="link-footer-leistungen">Komplettsanierung München</a>
              <a href="/leistungen/sanitaer" className="text-[#b5b5bd] hover:text-white text-sm leading-6" data-testid="link-footer-sturm">Sanitär</a>
              <a href="/leistungen/renovierung" className="text-[#b5b5bd] hover:text-white text-sm leading-6" data-testid="link-footer-reparieren">Renovierung</a>
              <a href="/ratgeber" className="text-[#b5b5bd] hover:text-white text-sm leading-6" data-testid="link-footer-ratgeber">Sanierungs-Ratgeber</a>
              <a href="/leistungen/komplettsanierung" className="text-[#b5b5bd] hover:text-white text-sm leading-6" data-testid="link-footer-kosten">Komplettsanierung</a>
              <a href="/ueber-uns" className="text-[#b5b5bd] hover:text-white text-sm leading-6" data-testid="link-footer-ueber-uns">Über uns</a>
              <a href="/sofort-hilfe" className="text-[#b5b5bd] hover:text-white text-sm leading-6" data-testid="link-footer-notdienst">Schnelle Hilfe München</a>
              <a href="/faq" className="text-[#b5b5bd] hover:text-white text-sm leading-6" data-testid="link-footer-faq">FAQ Sanierung</a>
              <a href="/leistungen/heizung" className="text-[#b5b5bd] hover:text-white text-sm leading-6" data-testid="link-footer-undicht">Heizung & Wärmepumpe</a>
              <a href="/kontakt" className="text-[#b5b5bd] hover:text-white text-sm leading-6" data-testid="link-footer-contact">Kontakt</a>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-xs mb-1.5 text-white uppercase tracking-wide" id="footer-contact-heading">Kontakt</h3>
            <address className="not-italic space-y-0" aria-labelledby="footer-contact-heading">
              <a href={`tel:${phoneNumber.replace(/\s/g, "")}`} className="flex items-center gap-1.5 text-[#b5b5bd] hover:text-white text-sm leading-6" data-testid="link-footer-phone">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                {phoneNumber}
              </a>
              <a href="mailto:info@renodex.de" className="flex items-center gap-1.5 text-[#b5b5bd] hover:text-white text-sm leading-6" data-testid="link-footer-email">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                info@renodex.de
              </a>
              <div className="flex items-center gap-1.5 text-[#b5b5bd] text-sm leading-6">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                [Adresse folgt]
              </div>
            </address>
          </div>

          <div>
            <h3 className="font-semibold text-xs mb-1.5 text-white uppercase tracking-wide">Öffnungszeiten</h3>
            <div className="text-sm text-[#b5b5bd] space-y-0">
              <div className="flex items-center gap-1.5 leading-6">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                Mo-Fr: 8:00-16:30
              </div>
              <div className="text-destructive font-semibold leading-6">Antwort in 48h</div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-700 pt-2 mb-2">
          <h3 className="font-semibold text-[11px] mb-1 text-white text-center uppercase tracking-wide">Renodex in München</h3>
          <nav className="flex flex-wrap justify-center gap-x-2.5 gap-y-0.5 text-[11px] text-white/80" aria-label="München Stadtteile">
            <a href="/bezirk/allach" className="hover:text-white leading-5" data-testid="link-district-allach">Allach</a>
            <a href="/bezirk/aubing" className="hover:text-white leading-5" data-testid="link-district-aubing">Aubing</a>
            <a href="/bezirk/berg-am-laim" className="hover:text-white leading-5" data-testid="link-district-berg-am-laim">Berg am Laim</a>
            <a href="/bezirk/bogenhausen" className="hover:text-white leading-5" data-testid="link-district-bogenhausen">Bogenhausen</a>
            <a href="/bezirk/feldmoching" className="hover:text-white leading-5" data-testid="link-district-feldmoching">Feldmoching</a>
            <a href="/bezirk/hadern" className="hover:text-white leading-5" data-testid="link-district-hadern">Hadern</a>
            <a href="/bezirk/haidhausen" className="hover:text-white leading-5" data-testid="link-district-haidhausen">Haidhausen</a>
            <a href="/bezirk/laim" className="hover:text-white leading-5" data-testid="link-district-laim">Laim</a>
            <a href="/bezirk/lehel" className="hover:text-white leading-5" data-testid="link-district-lehel">Lehel</a>
            <a href="/bezirk/maxvorstadt" className="hover:text-white leading-5" data-testid="link-district-maxvorstadt">Maxvorstadt</a>
            <a href="/bezirk/milbertshofen" className="hover:text-white leading-5" data-testid="link-district-milbertshofen">Milbertshofen</a>
            <a href="/bezirk/moosach" className="hover:text-white leading-5" data-testid="link-district-moosach">Moosach</a>
            <a href="/bezirk/neuhausen" className="hover:text-white leading-5" data-testid="link-district-neuhausen">Neuhausen</a>
            <a href="/bezirk/nymphenburg" className="hover:text-white leading-5" data-testid="link-district-nymphenburg">Nymphenburg</a>
            <a href="/bezirk/obermenzing" className="hover:text-white leading-5" data-testid="link-district-obermenzing">Obermenzing</a>
            <a href="/bezirk/obergiesing" className="hover:text-white leading-5" data-testid="link-district-obergiesing">Obergiesing</a>
            <a href="/bezirk/pasing" className="hover:text-white leading-5" data-testid="link-district-pasing">Pasing</a>
            <a href="/bezirk/perlach" className="hover:text-white leading-5" data-testid="link-district-perlach">Perlach</a>
            <a href="/bezirk/ramersdorf" className="hover:text-white leading-5" data-testid="link-district-ramersdorf">Ramersdorf</a>
            <a href="/bezirk/schwabing" className="hover:text-white leading-5" data-testid="link-district-schwabing">Schwabing</a>
            <a href="/bezirk/schwanthalerhoehe" className="hover:text-white leading-5" data-testid="link-district-schwanthalerhoehe">Schwanthalerhöhe</a>
            <a href="/bezirk/sendling" className="hover:text-white leading-5" data-testid="link-district-sendling">Sendling</a>
            <a href="/bezirk/solln" className="hover:text-white leading-5" data-testid="link-district-solln">Solln</a>
            <a href="/bezirk/trudering" className="hover:text-white leading-5" data-testid="link-district-trudering">Trudering</a>
            <a href="/bezirk/riem" className="hover:text-white leading-5" data-testid="link-district-riem">Riem</a>
            <a href="/bezirk/untermenzing" className="hover:text-white leading-5" data-testid="link-district-untermenzing">Untermenzing</a>
          </nav>
        </div>

        <div className="border-t border-zinc-700 pt-2 mb-2">
          <h3 className="font-semibold text-[11px] mb-1 text-white text-center uppercase tracking-wide">Münchner Umland</h3>
          <nav className="flex flex-wrap justify-center gap-x-2.5 gap-y-0.5 text-[11px] text-white/80" aria-label="München Umland">
            <a href="/bezirk/garching" className="hover:text-white leading-5" data-testid="link-district-garching">Garching</a>
            <a href="/bezirk/germering" className="hover:text-white leading-5" data-testid="link-district-germering">Germering</a>
            <a href="/bezirk/ottobrunn" className="hover:text-white leading-5" data-testid="link-district-ottobrunn">Ottobrunn</a>
            <a href="/bezirk/unterhaching" className="hover:text-white leading-5" data-testid="link-district-unterhaching">Unterhaching</a>
            <a href="/bezirk/unterschleissheim" className="hover:text-white leading-5" data-testid="link-district-unterschleissheim">Unterschleißheim</a>
            <a href="/bezirk/haar" className="hover:text-white leading-5" data-testid="link-district-haar">Haar</a>
            <a href="/bezirk/taufkirchen" className="hover:text-white leading-5" data-testid="link-district-taufkirchen">Taufkirchen</a>
            <a href="/bezirk/graefelfing" className="hover:text-white leading-5" data-testid="link-district-graefelfing">Gräfelfing</a>
            <a href="/bezirk/planegg" className="hover:text-white leading-5" data-testid="link-district-planegg">Planegg</a>
            <a href="/bezirk/pullach" className="hover:text-white leading-5" data-testid="link-district-pullach">Pullach</a>
            <a href="/bezirk/gruenwald" className="hover:text-white leading-5" data-testid="link-district-gruenwald">Grünwald</a>
            <a href="/bezirk/ismaning" className="hover:text-white leading-5" data-testid="link-district-ismaning">Ismaning</a>
            <a href="/bezirk/oberschleissheim" className="hover:text-white leading-5" data-testid="link-district-oberschleissheim">Oberschleißheim</a>
            <a href="/bezirk/vaterstetten" className="hover:text-white leading-5" data-testid="link-district-vaterstetten">Vaterstetten</a>
            <a href="/bezirk/olching" className="hover:text-white leading-5" data-testid="link-district-olching">Olching</a>
            <a href="/bezirk/groebenzell" className="hover:text-white leading-5" data-testid="link-district-groebenzell">Gröbenzell</a>
            <a href="/bezirk/kirchheim" className="hover:text-white leading-5" data-testid="link-district-kirchheim">Kirchheim</a>
            <a href="/bezirk/aschheim" className="hover:text-white leading-5" data-testid="link-district-aschheim">Aschheim</a>
            <a href="/bezirk/feldkirchen" className="hover:text-white leading-5" data-testid="link-district-feldkirchen">Feldkirchen</a>
            <a href="/bezirk/neubiberg" className="hover:text-white leading-5" data-testid="link-district-neubiberg">Neubiberg</a>
            <a href="/bezirk/putzbrunn" className="hover:text-white leading-5" data-testid="link-district-putzbrunn">Putzbrunn</a>
          </nav>
        </div>

        <div className="border-t border-zinc-700 pt-2 text-center text-[11px] text-[#b5b5bd]" data-testid="hinweis-koordination">
          Renodex koordiniert Ihr Bauvorhaben &ndash; die handwerkliche Ausführung übernimmt ein Partnerbetrieb aus unserem geprüften Netzwerk.
        </div>
        <div className="pt-2 flex flex-wrap justify-center gap-x-3 gap-y-0 text-xs text-zinc-400">
          <span>&copy; {currentYear} Renodex</span>
          <a href="/impressum" className="hover:text-white leading-5" data-testid="link-impressum">Impressum</a>
          <a href="/agb" className="hover:text-white leading-5" data-testid="link-agb">AGB</a>
          <a href="/datenschutz" className="hover:text-white leading-5" data-testid="link-datenschutz">Datenschutz</a>
          <a href="/cookie" className="hover:text-white leading-5" data-testid="link-cookie">Cookie-Einstellungen</a>
          <a href="/barrierefreiheit" className="hover:text-white leading-5" data-testid="link-barrierefreiheit">Barrierefreiheit</a>
          <a href="/eu-ai-act" className="hover:text-white leading-5" data-testid="link-eu-ai-act">EU AI Act</a>
        </div>
        <div className="mt-1.5 text-center text-[10px] text-zinc-400">
          Webdesign powered by <a href="https://extrucon.de" target="_blank" rel="noopener noreferrer" className="hover:text-[#b5b5bd] transition-colors" data-testid="link-extrucon">ExtruCon</a> & <a href="https://kshwmont.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#b5b5bd] transition-colors" data-testid="link-kshwmont">KSHWmont d.o.o.</a>
        </div>
        <div className="mt-1.5 pt-1.5 border-t border-zinc-800 text-center text-[10px] text-zinc-500" data-testid="hinweis-ki-bilder">
          Einzelne Bilder auf dieser Website wurden mit KI erzeugt (Art. 50 EU AI Act). Details: <a href="/eu-ai-act" className="hover:text-zinc-300 transition-colors underline">EU AI Act</a>.
        </div>
      </div>
    </footer>
  );
}
