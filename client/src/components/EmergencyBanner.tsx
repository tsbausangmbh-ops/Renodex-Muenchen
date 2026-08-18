import { Mail, Phone } from "lucide-react";

interface EmergencyBannerProps {
  phoneNumber: string;
}

export default function EmergencyBanner({ phoneNumber }: EmergencyBannerProps) {
  return (
    <div
      className="bg-primary text-white py-2 px-4 sticky top-0 z-50"
      data-testid="banner-emergency"
      role="banner"
      aria-label="Kontakt"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4">
        <a
          href="/kontakt"
          className="flex items-center gap-2 font-semibold text-sm md:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded min-h-11 py-1"
          data-testid="link-emergency-contact"
          aria-label="Digital anfragen"
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
          <span className="uppercase tracking-wide">Sofort-Hilfe 24/7 – jetzt digital anfragen</span>
        </a>
        <a
          href={`tel:${phoneNumber.replace(/\s/g, "")}`}
          className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded min-h-11 py-1"
          data-testid="link-emergency-call"
          aria-label={`Sofort-Hilfe anrufen: ${phoneNumber}`}
        >
          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{phoneNumber}</span>
        </a>
      </div>
    </div>
  );
}
