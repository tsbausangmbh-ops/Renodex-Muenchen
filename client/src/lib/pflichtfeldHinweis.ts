// 06.10.2026: Fehlt beim Absenden ein Pflichtfeld, sieht der Kunde eine Meldung und das
// Formular springt zum ersten markierten Feld (aria-invalid="true"). Ohne das blieb ein
// Klick auf „Senden“ bei einem fehlenden Feld außerhalb des sichtbaren Bereichs ohne
// erkennbare Rückmeldung am Feld.
type Toast = (o: { title: string; description?: string; variant?: "destructive" }) => unknown;

export function pflichtfeldHinweis(toast: Toast, bereich?: HTMLElement | null) {
  toast({
    title: "Bitte Pflichtfelder ausfüllen",
    description: "Es fehlen noch Angaben. Die betroffenen Felder sind markiert.",
    variant: "destructive",
  });
  // Erst nach dem nächsten Rendern suchen: die Markierung entsteht durch den Zustandswechsel.
  window.setTimeout(() => {
    const el = (bereich ?? document).querySelector<HTMLElement>('[aria-invalid="true"]');
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus({ preventScroll: true });
    }
  }, 50);
}
