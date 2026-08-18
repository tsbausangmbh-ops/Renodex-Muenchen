import { useState, useEffect } from "react";
import { X } from "lucide-react";

const COOKIE_CONSENT_KEY = "089dach_cookie_consent";

function isNewYearSeason(): boolean {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // December 31 or January 1-2
  return (month === 12 && day === 31) || (month === 1 && day >= 1 && day <= 2);
}

function hasMarketingConsent(): boolean {
  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) return false;
    const parsed = JSON.parse(consent);
    return parsed.marketing === true;
  } catch {
    return false;
  }
}

export default function NewYearPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [newYear, setNewYear] = useState(new Date().getFullYear() + 1);

  useEffect(() => {
    if (!isNewYearSeason()) {
      return;
    }

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = month === 1 ? now.getFullYear() : now.getFullYear() + 1;
    setNewYear(year);

    const popupKey = `newyear_popup_shown_${year}`;

    const tryShowPopup = () => {
      if (hasMarketingConsent() && !localStorage.getItem(popupKey)) {
        setIsVisible(true);
        localStorage.setItem(popupKey, "true");
      }
    };

    const timer = setTimeout(() => {
      tryShowPopup();
    }, 1500);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === COOKIE_CONSENT_KEY) {
        setTimeout(tryShowPopup, 500);
      }
    };

    const handleConsentChange = () => {
      setTimeout(tryShowPopup, 500);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cookieConsentChanged", handleConsentChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cookieConsentChanged", handleConsentChange);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-all duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      data-testid="newyear-popup"
      onClick={handleClose}
    >
      <div 
        className={`relative max-w-2xl w-full mx-4 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ${
          isClosing ? "scale-95" : "scale-100"
        }`}
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-4 left-8 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          <div className="absolute top-12 right-16 w-3 h-3 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
          <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.6s" }} />
          <div className="absolute bottom-32 right-12 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: "0.9s" }} />
          <div className="absolute bottom-20 left-12 w-3 h-3 bg-yellow-200 rounded-full animate-pulse" style={{ animationDelay: "1.2s" }} />
        </div>
        
        <button aria-label="Aktion"
          type="button"
          className="absolute top-3 right-3 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
          onClick={handleClose}
          data-testid="button-close-newyear"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="relative p-8 md:p-12 text-center text-white">
          <div className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
            {newYear}
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Frohes Neues Jahr!
          </h3>
          
          <p className="text-base md:text-lg text-white/90 mb-4">
            Wir wünschen Ihnen und Ihrer Familie ein glückliches, gesundes und erfolgreiches neues Jahr.
          </p>
          
          <p className="text-sm md:text-base text-white/80 mb-6">
            Auch {newYear} sind wir wieder für Sie da – bei Dachproblemen, Sturmschäden oder Sanierungen.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
            <span>24/7 Sofort-Hilfe</span>
            <span>|</span>
            <span>[Telefon folgt]</span>
          </div>
          
          <p className="text-sm mt-6 text-yellow-400/80 font-medium">
            Ihr Team von Renodex
          </p>
        </div>
      </div>
    </div>
  );
}
