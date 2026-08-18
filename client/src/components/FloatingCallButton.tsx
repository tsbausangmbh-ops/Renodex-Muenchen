import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingCallButtonProps {
  phoneNumber: string;
}

export default function FloatingCallButton({ phoneNumber }: FloatingCallButtonProps) {
  return (
    <a 
      href={`tel:${phoneNumber.replace(/\s/g, "")}`}
      className="fixed bottom-6 right-6 z-50 md:hidden"
      data-testid="button-floating-call"
      aria-label={`Jetzt anrufen: ${phoneNumber}`}
    >
      <Button size="lg" className="rounded-full w-14 h-14 shadow-lg" aria-hidden="true">
        <Phone className="w-6 h-6" aria-hidden="true" />
        <span className="sr-only">Anrufen</span>
      </Button>
    </a>
  );
}
