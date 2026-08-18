import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
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
