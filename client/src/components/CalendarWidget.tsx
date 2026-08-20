import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CalendarSlot {
  date: string;
  time: string;
  dateTime: string;
  formatted: string;
}

interface CalendarWidgetProps {
  onSelect: (slot: CalendarSlot | null) => void;
  selectedSlot?: string;
}

export function CalendarWidget({ onSelect, selectedSlot }: CalendarWidgetProps) {
  const [showMore, setShowMore] = useState(false);

  const { data, isLoading, error } = useQuery<{ slots: CalendarSlot[] }>({
    queryKey: ["/api/calendar/next-slots", showMore ? 12 : 6],
    queryFn: async () => {
      const res = await fetch(`/api/calendar/next-slots?count=${showMore ? 12 : 6}`);
      return res.json();
    },
    staleTime: 60000,
    retry: 1,
  });

  const slots = data?.slots || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Lade verfügbare Termine...
      </div>
    );
  }

  if (error || slots.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>Termine werden individuell per E-Mail vereinbart.</p>
        <p className="text-sm mt-1">Schreiben Sie uns: info@renodex.de</p>
      </div>
    );
  }

  const groupedByDate: Record<string, CalendarSlot[]> = {};
  slots.forEach((slot) => {
    if (!groupedByDate[slot.date]) {
      groupedByDate[slot.date] = [];
    }
    groupedByDate[slot.date].push(slot);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <Calendar className="w-4 h-4" />
        <span>Nächste freie Termine</span>
      </div>

      <div className="grid gap-3">
        {Object.entries(groupedByDate).map(([date, dateSlots]) => (
          <Card key={date} className="p-3">
            <div className="font-medium text-sm mb-2">{date}</div>
            <div className="flex flex-wrap gap-2">
              {dateSlots.map((slot) => (
                <Button aria-label="Aktion"
                  key={slot.dateTime}
                  type="button"
                  variant={selectedSlot === slot.dateTime ? "default" : "outline"}
                  size="sm"
                  className="gap-1"
                  onClick={() => onSelect(selectedSlot === slot.dateTime ? null : slot)}
                  data-testid={`slot-${slot.dateTime}`}
                >
                  <Clock className="w-3 h-3" />
                  {slot.time}
                  {selectedSlot === slot.dateTime && <Check className="w-3 h-3 ml-1" />}
                </Button>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {!showMore && slots.length >= 6 && (
        <Button aria-label="Aktion"
          type="button"
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={() => setShowMore(true)}
          data-testid="button-show-more-slots"
        >
          Mehr Termine anzeigen
        </Button>
      )}

      {selectedSlot && (
        <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-md text-sm">
          <Check className="w-4 h-4 text-primary" />
          <span>
            Termin ausgewählt:{" "}
            <strong>{slots.find((s) => s.dateTime === selectedSlot)?.formatted}</strong>
          </span>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Passt keiner der Vorschläge? Individuelle Termine vereinbaren wir gerne
        per E-Mail: <a href="mailto:info@renodex.de" className="underline hover:no-underline">info@renodex.de</a>
      </p>
    </div>
  );
}
