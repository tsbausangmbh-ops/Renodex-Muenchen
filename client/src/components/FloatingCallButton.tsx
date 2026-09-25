import { Mail } from "lucide-react";

interface FloatingCallButtonProps {
  phoneNumber: string;
}

// 25.09.2026 (Ziel 802 Teil 13): kein <button> mehr im <a> (verschachtelte Bedienelemente),
// Eckenradius wie alle Buttons (rounded-md) statt rund. Die Positionierung sitzt am
// Rahmen-div, weil btn-glanz am Link position:relative setzt.
export default function FloatingCallButton({ phoneNumber }: FloatingCallButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <a
        href="mailto:info@renodex.de"
        className="btn-glanz inline-flex items-center justify-center w-14 h-14 rounded-md bg-primary text-primary-foreground border border-primary-border text-sm shadow-lg"
        data-testid="button-floating-email"
        aria-label="Jetzt per E-Mail anfragen: info@renodex.de"
      >
        <Mail className="w-6 h-6" aria-hidden="true" />
        <span className="sr-only">Digital anfragen</span>
      </a>
    </div>
  );
}
