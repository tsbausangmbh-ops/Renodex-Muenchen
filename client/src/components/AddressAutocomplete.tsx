import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

interface NominatimResult {
  place_id: number;
  display_name: string;
  address: {
    road?: string;
    house_number?: string;
    postcode?: string;
    city?: string;
    town?: string;
    village?: string;
    suburb?: string;
  };
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
}

export function AddressAutocomplete({ id, value, onChange, onSelect, placeholder, className, "data-testid": testId }: Props) {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 3) { setSuggestions([]); setOpen(false); return; }
    setLoading(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=6&countrycodes=de&viewbox=9.5,47.2,13.8,50.0&bounded=0&addressdetails=1`;
      const res = await fetch(url, { headers: { "Accept-Language": "de", "User-Agent": "089dach-website/1.0" } });
      const data: NominatimResult[] = await res.json();
      setSuggestions(data.slice(0, 5));
      setOpen(data.length > 0);
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

  const handleSelect = (item: NominatimResult) => {
    const a = item.address;
    const street = [a.road, a.house_number].filter(Boolean).join(" ");
    const postalCode = a.postcode ?? "";
    const city = a.city ?? a.town ?? a.village ?? "";
    const full = [street, postalCode, city].filter(Boolean).join(", ");
    onChange(full || item.display_name);
    if (onSelect) onSelect({ street, postalCode, city, full: full || item.display_name });
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
        autoComplete="off"
      />
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg max-h-60 overflow-auto">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onMouseDown={(e) => { e.preventDefault(); handleSelect(item); }}
              className="flex items-start gap-2 px-3 py-2 cursor-pointer hover:bg-slate-50 text-sm"
            >
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <span className="line-clamp-2">{item.display_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
