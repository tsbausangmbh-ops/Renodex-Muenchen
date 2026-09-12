import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const handleBack = () => {
    // Massgeblich ist der document.referrer, nicht die Laenge des Verlaufs:
    // window.history.length zaehlt auch Weiterleitungen und vorherige Tabs. Wer ueber
    // eine Suchmaschine auf eine Unterseite kommt, hat dort die Trefferliste im Verlauf
    // stehen -- ein "Zurueck" ueber history.length schickt genau diesen Besucher aus der
    // Website hinaus. Kam er von einer eigenen Seite, geht es eine Ebene zurueck,
    // sonst auf die Startseite.
    try {
      const referrer = document.referrer;
      const kommtVonEigenerSeite =
        referrer && new URL(referrer).hostname === window.location.hostname;
      if (kommtVonEigenerSeite) {
        window.history.back();
      } else {
        window.location.href = "/";
      }
    } catch {
      window.location.href = "/";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-1 -mb-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleBack}
        className="gap-1.5 text-muted-foreground"
        data-testid="button-back"
      >
        <ArrowLeft className="w-4 h-4" />
        Zurück
      </Button>
    </div>
  );
}
