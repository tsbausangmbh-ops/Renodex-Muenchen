import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

// 25.10.2026 (Anweisung 413, Nr. 1351; Muster 089cleaner server/adresse.ts): Der Browser fragt nur unseren
// Server (/api/adresse). Der Server fragt Photon (OpenStreetMap-Daten) im Suchraum Bayern und gibt nur Treffer
// mit state = Bayern zurück. Bisher ging jede Eingabe direkt aus dem Browser an Nominatim, samt Besucher-IP.

interface AdressVorschlag {
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
}

interface AddressParts {
  street: string;
  postalCode: string;
  city: string;
  full: string;
}

interface Props {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onSelect?: (parts: AddressParts) => void;
  placeholder?: string;
  className?: string;
  "data-testid"?: string;
  "aria-invalid"?: boolean;
}

const strasseVon = (v: AdressVorschlag) => [v.strasse, v.hausnummer].filter(Boolean).join(" ");
const anzeige = (v: AdressVorschlag) => [strasseVon(v), [v.plz, v.ort].filter(Boolean).join(" ")].filter(Boolean).join(", ");

export function AddressAutocomplete({ id, value, onChange, onSelect, placeholder, className, "data-testid": testId, "aria-invalid": ungueltig }: Props) {
  const [suggestions, setSuggestions] = useState<AdressVorschlag[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 3) { setSuggestions([]); setOpen(false); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/adresse?q=${encodeURIComponent(q)}`);
      const data: unknown = res.ok ? await res.json() : [];
      const liste = Array.isArray(data) ? (data as AdressVorschlag[]).slice(0, 5) : [];
      setSuggestions(liste);
      setOpen(liste.length > 0);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 350);
  };

  const handleSelect = (item: AdressVorschlag) => {
    const street = strasseVon(item);
    const full = anzeige(item);
    onChange(street || full);
    if (onSelect) onSelect({ street, postalCode: item.plz, city: item.ort, full });
    setSuggestions([]);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Input
        id={id}
        value={value}
        onChange={handleChange}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        placeholder={placeholder}
        className={className}
        data-testid={testId}
        aria-invalid={ungueltig}
        autoComplete="off"
      />
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-marine border-t-transparent" />
        </div>
      )}
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg max-h-60 overflow-auto">
          {suggestions.map((item) => (
            <li
              key={anzeige(item)}
              onMouseDown={(e) => { e.preventDefault(); handleSelect(item); }}
              className="flex items-start gap-2 px-3 py-2 cursor-pointer hover:bg-slate-50 text-sm"
            >
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <span className="line-clamp-2">{anzeige(item)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
