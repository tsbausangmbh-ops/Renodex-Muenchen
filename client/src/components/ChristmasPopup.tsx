import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const christmasBackground = "/images/optimized/bright_festive_christmas_background.webp";

const COOKIE_CONSENT_KEY = "089dach_cookie_consent";

function isChristmasSeason(): boolean {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  return month === 12 && day >= 16 && day <= 26;
}

function hasCookieConsent(): boolean {
  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    return consent !== null;
  } catch {
    return false;
  }
}

export default function ChristmasPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [nextYear, setNextYear] = useState(new Date().getFullYear() + 1);

  useEffect(() => {
    if (!isChristmasSeason()) {
      return;
    }

    const year = new Date().getFullYear();
    setCurrentYear(year);
    setNextYear(year + 1);

    const popupKey = `christmas_popup_shown_${year}`;

    const tryShowPopup = () => {
      // Show after any cookie consent (regardless of marketing choice) and not already shown
      if (hasCookieConsent() && !localStorage.getItem(popupKey)) {
        setIsVisible(true);
        localStorage.setItem(popupKey, "true");
      }
    };

    // Check immediately if consent already exists
    const timer = setTimeout(() => {
      tryShowPopup();
    }, 1000);

    // Listen for storage changes (when user accepts cookies)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === COOKIE_CONSENT_KEY) {
        setTimeout(tryShowPopup, 500);
      }
    };

    // Also listen for custom event from same tab
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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-all duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      data-testid="christmas-popup"
      onClick={handleClose}
    >
      <div 
        className={`relative max-w-4xl w-full mx-4 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ${
          isClosing ? "scale-95" : "scale-100"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={christmasBackground} 
          alt="Weihnachtsgrüße" 
          className="w-full h-auto"
         decoding="async"  loading="lazy"  width={400} height={300} />
        
        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-black/10 to-black/5" />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <p 
            className="text-6xl md:text-9xl font-bold text-gray-500/15 whitespace-nowrap select-none"
            style={{ transform: "rotate(15deg)" }}
          >
Renodex
          </p>
        </div>
        
        <button aria-label="Aktion"
          type="button"
          className="absolute top-3 right-3 z-50 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
          onClick={handleClose}
          data-testid="button-close-christmas"
        >
          <X className="w-7 h-7" />
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-center text-gray-800">
          <h3 className="text-xl md:text-3xl font-bold mb-4">
            Frohe Weihnachten und ein gesundes und glückliches Jahr {nextYear}
          </h3>
          <p className="text-base md:text-lg font-medium mb-3">
            Liebe Kunden und Kundinnen,
          </p>
          <p className="text-sm md:text-base mb-2">
            Wir sagen Danke für die gute Zusammenarbeit und das Vertrauen, das Sie uns {currentYear} entgegengebracht haben.
          </p>
          <p className="text-sm md:text-base">
            Wir freuen uns, auch im nächsten Jahr für Sie im Einsatz zu sein.
          </p>
          <p className="text-sm mt-4 text-gray-600">
            Ihr Team von Renodex
          </p>
        </div>
      </div>
    </div>
  );
}
