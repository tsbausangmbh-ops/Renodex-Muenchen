import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingCallButtonProps {
  phoneNumber: string;
}

export default function FloatingCallButton({ phoneNumber }: FloatingCallButtonProps) {
  return (
    <a
      href="mailto:info@renodex.de"
      className="fixed bottom-6 right-6 z-50 md:hidden"
      data-testid="button-floating-email"
      aria-label="Jetzt per E-Mail anfragen: info@renodex.de"
    >
      <Button size="lg" className="rounded-full w-14 h-14 shadow-lg" aria-hidden="true">
        <Mail className="w-6 h-6" aria-hidden="true" />
        <span className="sr-only">E-Mail schreiben</span>
      </Button>
    </a>
  );
}
