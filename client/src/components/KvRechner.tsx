import { useEffect, useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import KundenartFelder from "@/components/KundenartFelder";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import DatenschutzKiHaken, { KI_HAKEN_FEHLT, KI_EMAIL } from "@/components/DatenschutzKiHaken";
import { ANREDEN, pruefeAnfragePflicht } from "@shared/anfrage";
import { KUNDENART_LEER, pruefeKundenart, type KundenartDaten } from "@shared/kundenart";
import { KV_LEISTUNGEN, KV_LEISTUNG, kvAngabenText, kvSichtbar, kvZahlOk, type KvFrage } from "@shared/kv-rechner";

// Ziel 1965 (Betreiber 05.11.2026: „fice da bei renodex jetzt sauber“): KV-Generator der Startseite wie 089cleaner.de
// (Ziele 1950/1952/1954/1962). Schritt für Schritt (Leistungen, dann je Leistung ein Schritt, Erledigtes zugeklappt mit
// „Ändern“), am Ende der KV kompakt mit Preis aus /api/richtpreis, darunter der Versandblock Privat/Firma/HV mit Telefon,
// Objekt-Adresse und Anschrift. Fragen und Felder aus shared/kv-rechner.ts, kein Betrag im Code (219).

interface Position { titel: string; menge: number; einheit: string; preis: number | null; betrag: number | null; offen?: boolean }
interface Ergebnis { laeuft?: boolean; ok?: boolean; netto?: number; mwst?: number; brutto?: number; mwst19?: boolean; positionen?: Position[]; fehlt?: string[]; ausfall?: boolean; hinweis?: string }

const euro = (n?: number | null) => (n == null ? "" : `ab ${n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`);
const mengeText = (n: number) => n.toLocaleString("de-DE", { maximumFractionDigits: 2 });
const KNOPF = "text-left text-sm font-medium px-3 py-2.5 min-h-11 rounded-md border-2 transition-colors";
const knopf = (an: boolean) => `${KNOPF} ${an ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`;

// Ziel 1952: höchstens 8 Zeilen, sonst die ersten 7 und eine Sammelzeile (offene Zeilen zählen nicht, 453)
const KV_ZEILEN = 8;
function kvZeilen(pos: Position[]): Position[] {
  if (pos.length <= KV_ZEILEN) return pos;
  const rest = pos.slice(KV_ZEILEN - 1);
  const gerechnet = rest.filter((p) => !p.offen);
  return [...pos.slice(0, KV_ZEILEN - 1), { titel: `Weitere Positionen (${rest.length})`, menge: 0, einheit: "", preis: null,
    betrag: gerechnet.reduce((s, p) => s + (p.betrag ?? 0), 0), offen: !gerechnet.length }];
}

function Stufe({ nr, text, erledigt = false }: { nr: number; text: string; erledigt?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4" aria-hidden="true">
      <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${erledigt ? "bg-primary text-primary-foreground" : "bg-primary/15 text-primary"}`}>{nr}</span>
      <strong className="text-lg">{text}</strong>
    </div>
  );
}

export default function KvRechner() {
  const [gewaehlt, setGewaehlt] = useState<string[]>([]);
  const [antworten, setAntworten] = useState<Record<string, string>>({});
  const [schritt, setSchritt] = useState(0);
  const [ergebnis, setErgebnis] = useState<Ergebnis>({});
  const nr = useRef(0);
  const schrittRef = useRef<HTMLDivElement>(null);
  const gewechselt = useRef(false);

  const leistungen = KV_LEISTUNGEN.filter((l) => gewaehlt.includes(l.id));   // feste Reihenfolge wie die Kacheln
  const fragenVon = (id: string) => (KV_LEISTUNG(id)?.fragen ?? []).filter((f) => kvSichtbar(f, antworten));
  const fertigVon = (id: string) => fragenVon(id).every((f) => kvZahlOk(f, antworten[f.feld] ?? ""));
  const antwortText = (f: KvFrage) => {
    const w = antworten[f.feld] ?? "";
    return w === "unbekannt" ? "weiß ich nicht genau" : w + (f.einheit && w ? ` ${f.einheit}` : "");
  };
  const schritte = [
    { key: "leistung", titel: "Was dürfen wir für Sie machen?", fertig: leistungen.length > 0, text: leistungen.map((l) => l.titel).join(", ") },
    ...leistungen.map((l) => ({ key: l.id, titel: l.titel, fertig: fertigVon(l.id), text: fragenVon(l.id).map(antwortText).filter(Boolean).join(" · ") || "keine weiteren Angaben nötig" })),
  ];
  const alleFertig = schritte.every((s) => s.fertig);
  const amEnde = alleFertig && schritt >= schritte.length;

  useEffect(() => {
    if (gewechselt.current) schrittRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [schritt]);
  const gehe = (n: number) => { gewechselt.current = true; setSchritt(n); };
  const weiter = (ab: number) => { const n = schritte.findIndex((s, i) => i > ab && !s.fertig); gehe(n < 0 ? schritte.length : n); };

  // Rechnen erst, wenn alles beantwortet ist; nur Objektangaben gehen an den Server
  const angabenSchluessel = alleFertig && leistungen.length
    ? JSON.stringify({ l: leistungen.map((l) => l.id), a: Object.fromEntries(leistungen.flatMap((l) => fragenVon(l.id).map((f) => [f.feld, antworten[f.feld]]))) })
    : "";
  useEffect(() => {
    const meine = ++nr.current;
    if (!angabenSchluessel) { setErgebnis({}); return; }
    setErgebnis({ laeuft: true });
    const zeit = window.setTimeout(async () => {
      try {
        const { l, a } = JSON.parse(angabenSchluessel);
        const r = await fetch("/api/richtpreis", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ leistungen: l, antworten: a }) });
        const d: Ergebnis = await r.json();
        if (meine === nr.current) setErgebnis(d);
      } catch {
        if (meine === nr.current) setErgebnis({ ausfall: true });
      }
    }, 300);
    return () => window.clearTimeout(zeit);
  }, [angabenSchluessel]);

  const umschalten = (id: string) => setGewaehlt((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]));
  const setzen = (feld: string, wert: string) => setAntworten((a) => ({ ...a, [feld]: wert }));
  const fortschritt = schritte.filter((s) => s.fertig).length;

  return (
    <section id="kv-rechner" className="py-12 md:py-16 bg-muted/30" data-testid="kv-rechner">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Kostenvoranschlag online</p>
        <h2 className="text-2xl md:text-3xl font-bold mt-1">Was kostet Ihre Sanierung? Rechnen Sie es in zwei Minuten aus</h2>
        <p className="text-muted-foreground mt-2">Wählen Sie, was gemacht werden soll, und beantworten Sie ein paar kurze Fragen. Den Preis sehen Sie sofort, berechnet aus unserem aktuellen Preiskatalog. Den Kostenvoranschlag schicken wir Ihnen danach per E-Mail.</p>

        <div className="mt-6 rounded-xl border bg-background p-4 md:p-6 shadow-sm">
          <Stufe nr={1} text="Ihre Angaben" erledigt={alleFertig} />
          <div className="h-1.5 rounded bg-muted mb-5" aria-hidden="true">
            <span className="block h-1.5 rounded bg-primary transition-all" style={{ width: `${(fortschritt / schritte.length) * 100}%` }} />
          </div>

          <div className="space-y-3">
            {schritte.map((s, si) => si !== schritt && (si < schritt || s.fertig) ? (
              <div key={s.key} className="flex items-start gap-3 rounded-lg border p-3" data-testid={`kv-schritt-zu-${s.key}`}>
                <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0"><strong className="block text-sm">{s.titel}</strong><small className="text-muted-foreground">{s.text}</small></div>
                <button type="button" className="text-sm underline text-primary" onClick={() => gehe(si)} aria-label={`${s.titel} ändern`}>Ändern</button>
              </div>
            ) : si === schritt ? (
              <div key={s.key} ref={schrittRef} className="rounded-lg border-2 border-primary/40 p-4" data-testid={`kv-schritt-${s.key}`}>
                <p className="text-xs text-muted-foreground mb-1">Schritt {si + 1} von {schritte.length}</p>
                {s.key === "leistung" ? (
                  <fieldset>
                    <legend className="font-semibold mb-1">{s.titel}</legend>
                    <p className="text-sm text-muted-foreground mb-3">Mehrere möglich, zum Beispiel Bad und Boden.</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {KV_LEISTUNGEN.map((l) => (
                        <button type="button" key={l.id} aria-pressed={gewaehlt.includes(l.id)} onClick={() => umschalten(l.id)} className={knopf(gewaehlt.includes(l.id))} data-testid={`kv-leistung-${l.id}`}>
                          <span className="block">{l.titel}</span>
                          <small className="block font-normal text-muted-foreground">{l.kurz}</small>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                ) : (
                  <>
                    <p className="font-semibold mb-3">{s.titel}</p>
                    {fragenVon(s.key).length === 0 && <p className="text-sm text-muted-foreground">Dafür brauchen wir keine weiteren Angaben. Den genauen Umfang klären wir bei der Besichtigung.</p>}
                    {fragenVon(s.key).map((f) => <FrageFeld key={f.feld} f={f} wert={antworten[f.feld] ?? ""} setzen={(w) => setzen(f.feld, w)} />)}
                  </>
                )}
                <div className="mt-4">
                  <Button type="button" disabled={!s.fertig} onClick={() => weiter(si)} data-testid={`kv-weiter-${s.key}`}>
                    {schritte.slice(si + 1).some((x) => !x.fertig) ? "Weiter" : "Weiter zum Kostenvoranschlag"}
                  </Button>
                </div>
              </div>
            ) : null)}
          </div>

          {amEnde && <KvUndVersand leistungen={leistungen.map((l) => l.id)} antworten={antworten} ergebnis={ergebnis} />}
        </div>
      </div>
    </section>
  );
}

function FrageFeld({ f, wert, setzen }: { f: KvFrage; wert: string; setzen: (w: string) => void }) {
  const id = `kv-${f.feld}`;
  if (f.art === "wahl") {
    return (
      <fieldset className="mb-4">
        <legend className="text-sm font-medium mb-1">{f.frage}</legend>
        {f.hilfe && <p className="text-xs text-muted-foreground mb-2">{f.hilfe}</p>}
        <div className={`grid gap-2 ${(f.optionen?.length ?? 0) > 6 ? "grid-cols-3 sm:grid-cols-4" : "sm:grid-cols-2"}`}>
          {f.optionen!.map((o) => <button type="button" key={o} aria-pressed={wert === o} onClick={() => setzen(o)} className={knopf(wert === o)}>{o}</button>)}
        </div>
      </fieldset>
    );
  }
  const unbekannt = wert === "unbekannt";
  const falsch = !!wert && !unbekannt && !kvZahlOk(f, wert);
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">{f.frage}</label>
      {f.hilfe && <p className="text-xs text-muted-foreground mb-2">{f.hilfe}</p>}
      <div className="flex items-center gap-2">
        <Input id={id} inputMode="decimal" className="max-w-[10rem]" value={unbekannt ? "" : wert} placeholder="z. B. 8" onChange={(e) => setzen(e.target.value.replace(/[^\d,.]/g, ""))} aria-invalid={falsch} data-testid={`input-${f.feld}`} />
        <span className="text-sm">{f.einheit}</span>
        {f.unbekannt && <button type="button" aria-pressed={unbekannt} onClick={() => setzen(unbekannt ? "" : "unbekannt")} className={knopf(unbekannt)}>Weiß ich nicht genau</button>}
      </div>
      {falsch && <p className="text-xs text-destructive mt-1" role="alert">Bitte eine Zahl zwischen {f.min} und {f.max} {f.einheit} angeben.</p>}
    </div>
  );
}

const ADRESSE_LEER = { strasse: "", plz: "", ort: "" };

function KvUndVersand({ leistungen, antworten, ergebnis }: { leistungen: string[]; antworten: Record<string, string>; ergebnis: Ergebnis }) {
  const geoeffnet = useRef(Date.now());
  const [ka, setKa] = useState<KundenartDaten>({ ...KUNDENART_LEER });
  const [k, setK] = useState({ anrede: "", vorname: "", nachname: "", email: "", telefon: "", website: "" });
  const [bv, setBv] = useState(ADRESSE_LEER);
  const [anschrift, setAnschrift] = useState(ADRESSE_LEER);
  const [gleich, setGleich] = useState(true);
  const [ki, setKi] = useState(false);
  const [fehler, setFehler] = useState("");
  const [fehlerZeigen, setFehlerZeigen] = useState(false);
  const [sendet, setSendet] = useState(false);
  const [fertig, setFertig] = useState(false);

  const pos = ergebnis.positionen ?? [];
  const mitPreis = !ergebnis.laeuft && ergebnis.ok && ergebnis.netto != null;
  const titel = leistungen.map((id) => KV_LEISTUNG(id)?.titel).filter(Boolean).join(", ");
  const kvText = () => [
    "Angaben aus dem KV-Rechner der Startseite:",
    kvAngabenText(leistungen, antworten),
    ...(mitPreis ? ["", "Richtpreis laut Rechner (unverbindlich):", ...pos.map((p) => `- ${p.titel}: ${mengeText(p.menge)} ${p.einheit} = ${p.offen ? "offen" : euro(p.betrag)}`),
      `Summe netto ${euro(ergebnis.netto)}, MwSt. ${euro(ergebnis.mwst)}, brutto ${euro(ergebnis.brutto)}`] : ["", "Richtpreis: im Rechner nicht berechnet"]),
  ].join("\n");

  async function senden() {
    setFehler("");
    setFehlerZeigen(true);
    const kunde = gleich ? bv : anschrift;
    const daten = {
      ...ka, anrede: k.anrede, firstName: k.vorname, lastName: k.nachname, email: k.email, phone: k.telefon,
      address: kunde.strasse, postalCode: kunde.plz, city: kunde.ort,
      objektAddress: bv.strasse, objektPostalCode: bv.plz, objektCity: bv.ort,
      subject: `KV-Rechner Startseite: ${titel}`, selectedServices: leistungen.map((id) => KV_LEISTUNG(id)?.titel), message: kvText(),
      website: k.website, formOpenedAt: geoeffnet.current, seite: window.location.href, kiEinwilligung: ki,
    };
    if (!bv.strasse.trim() || !/\d/.test(bv.strasse) || !/^\d{5}$/.test(bv.plz.trim()) || !bv.ort.trim()) { setFehler("Bitte Straße mit Hausnummer, fünfstellige PLZ und Ort des Objekts angeben."); return; }
    const kaf = Object.values(pruefeKundenart(daten));
    if (kaf.length) { setFehler(kaf[0]!); return; }
    const pf = Object.values(pruefeAnfragePflicht(daten));
    if (pf.length) { setFehler(pf[0]!); return; }
    if (!ki) { setFehler(KI_HAKEN_FEHLT); return; }
    setSendet(true);
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(daten) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.success) throw new Error(j.message || j.error || "Senden fehlgeschlagen.");
      setFertig(true);
    } catch (e) {
      setFehler(e instanceof Error ? e.message : "Senden fehlgeschlagen.");
    } finally {
      setSendet(false);
    }
  }

  if (fertig) {
    return (
      <div className="mt-6 rounded-lg border-2 border-primary/40 p-4" role="status" data-testid="kv-gesendet">
        <h3 className="text-lg font-semibold">Danke, Ihre Anfrage ist bei uns.</h3>
        <p className="text-sm mt-1">Wir prüfen Ihre Angaben und schicken Ihnen den Kostenvoranschlag per E-Mail an {k.email}. Fehlt uns noch etwas, fragen wir kurz nach.</p>
      </div>
    );
  }

  const feld = (name: keyof typeof k, label: string, typ = "text", auto = "off") => (
    <div>
      <label htmlFor={`kv-${name}`} className="block text-sm font-medium mb-1">{label} *</label>
      <Input id={`kv-${name}`} type={typ} autoComplete={auto} value={k[name]} onChange={(e) => setK({ ...k, [name]: e.target.value })} data-testid={`input-kv-${name}`} />
    </div>
  );
  const adresse = (wert: typeof ADRESSE_LEER, setzen: (a: typeof ADRESSE_LEER) => void, praefix: string, wer: string) => (
    <div className="grid sm:grid-cols-6 gap-3">
      <div className="sm:col-span-6">
        <label htmlFor={`${praefix}-strasse`} className="block text-sm font-medium mb-1">{wer} Straße und Hausnummer *</label>
        <AddressAutocomplete id={`${praefix}-strasse`} value={wert.strasse} onChange={(v) => setzen({ ...wert, strasse: v })}
          onSelect={(p) => setzen({ strasse: p.street, plz: p.postalCode, ort: p.city })} data-testid={`input-${praefix}-strasse`} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${praefix}-plz`} className="block text-sm font-medium mb-1">PLZ *</label>
        <Input id={`${praefix}-plz`} inputMode="numeric" autoComplete="postal-code" value={wert.plz} onChange={(e) => setzen({ ...wert, plz: e.target.value })} />
      </div>
      <div className="sm:col-span-4">
        <label htmlFor={`${praefix}-ort`} className="block text-sm font-medium mb-1">Ort *</label>
        <Input id={`${praefix}-ort`} autoComplete="address-level2" value={wert.ort} onChange={(e) => setzen({ ...wert, ort: e.target.value })} />
      </div>
    </div>
  );
  const wer = ka.kundenart === "Firma" ? "Anschrift der Firma:" : ka.kundenart === "Hausverwaltung" ? "Anschrift der Hausverwaltung:" : "Ihre Anschrift:";

  return (
    <div className="mt-6" data-testid="kv-ergebnis">
      <Stufe nr={2} text="Ihr Kostenvoranschlag" erledigt={!!mitPreis} />
      <div aria-live="polite">
        {ergebnis.laeuft && <p className="text-sm text-muted-foreground flex items-center gap-2" role="status"><Loader2 className="h-4 w-4 animate-spin" /> Wir rechnen …</p>}
        {mitPreis && (
          <>
            <p className="text-xs text-muted-foreground mb-3"><strong>Automatisch aus Ihren Angaben berechnet:</strong> Diese Vorschau hat noch kein Mitarbeiter geprüft. Sie ist unverbindlich und ohne Gewähr (Kostenvoranschlag nach § 649 BGB, Circa-Preise). Den genauen Umfang klären wir bei der Besichtigung.</p>
            <ul className="divide-y rounded-lg border" data-testid="kv-zeilen">
              {kvZeilen(pos).map((p, i) => (
                <li key={i} className="flex justify-between gap-3 p-3 text-sm">
                  <span>{p.titel}{p.menge > 0 && <small className="text-muted-foreground"> · {mengeText(p.menge)} {p.einheit}</small>}</span>
                  <span className="font-medium whitespace-nowrap">{p.offen ? "offen" : euro(p.betrag)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-3 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-sm" data-testid="kv-summe">
              <dt>Summe netto</dt><dd className="text-right">{euro(ergebnis.netto)}</dd>
              <dt>{ergebnis.mwst19 === false ? "MwSt. (Solaranlage 0 %, sonst 19 %)" : "zzgl. 19 % MwSt."}</dt><dd className="text-right">{euro(ergebnis.mwst)}</dd>
              <dt><strong>Summe brutto</strong></dt><dd className="text-right"><strong>{euro(ergebnis.brutto)}</strong></dd>
            </dl>
            <p className="text-base mt-3" data-testid="kv-hinweis">Kostenvoranschlag ohne Gewähr. Alle Preise sind ab-Preise. Verbindlich wird der Preis erst nach einem Aufmaß vor Ort.</p>
            {pos.some((p) => p.offen) && <p className="text-xs text-muted-foreground mt-2">Positionen mit „offen“ kalkulieren wir nach und nennen Ihnen den Preis gesondert.</p>}
          </>
        )}
        {!ergebnis.laeuft && ergebnis.ok === false && !ergebnis.ausfall && (
          <div className="rounded-lg border p-3 text-sm">
            <p><strong>Für einen Preis fehlt noch eine Angabe.</strong></p>
            {(ergebnis.fehlt?.length ?? 0) > 0 && <p className="text-muted-foreground">Es fehlt: {ergebnis.fehlt!.join(" · ")}</p>}
            <p className="text-muted-foreground">Sie können trotzdem senden. Wir rechnen dann von Hand und melden uns per E-Mail.</p>
          </div>
        )}
        {!ergebnis.laeuft && ergebnis.ausfall && <p className="text-sm text-muted-foreground">Der Rechner ist gerade nicht erreichbar. Senden Sie Ihre Angaben trotzdem, wir rechnen von Hand und melden uns per E-Mail.</p>}
      </div>

      <div className="mt-8">
        <Stufe nr={3} text="Wohin dürfen wir den Kostenvoranschlag schicken?" />
        <div className="space-y-4">
          <KundenartFelder werte={ka} setzen={(f, w) => setKa({ ...ka, [f]: w })} fehler={pruefeKundenart(ka)} fehlerZeigen={fehlerZeigen} praefix="kv" />
          <fieldset>
            <legend className="block text-sm font-medium mb-2">Anrede *</legend>
            <div className="grid grid-cols-3 gap-2">
              {ANREDEN.map((a) => <button type="button" key={a} aria-pressed={k.anrede === a} onClick={() => setK({ ...k, anrede: a })} className={knopf(k.anrede === a)}>{a}</button>)}
            </div>
          </fieldset>
          <div className="grid sm:grid-cols-2 gap-3">
            {feld("vorname", "Vorname", "text", "given-name")}
            {feld("nachname", "Nachname", "text", "family-name")}
            {feld("email", "E-Mail", "email", "email")}
            {feld("telefon", "Telefon", "tel", "tel")}
          </div>
          <p className="text-sm font-semibold pt-2">Objekt, an dem gearbeitet wird</p>
          {adresse(bv, setBv, "kv-objekt", "Objekt:")}
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={gleich} onChange={(e) => setGleich(e.target.checked)} data-testid="kv-gleich" />
            {ka.kundenart === "Firma" ? "Anschrift der Firma" : ka.kundenart === "Hausverwaltung" ? "Anschrift der Hausverwaltung" : "Meine Anschrift"} ist die Objekt-Adresse
          </label>
          {!gleich && adresse(anschrift, setAnschrift, "kv-kunde", wer)}
          <DatenschutzKiHaken id="kv-ki" checked={ki} onChange={setKi} testId="kv-ki-haken" />
          <div className="hidden" aria-hidden="true">
            <label htmlFor="kv-website">Website</label>
            <input id="kv-website" tabIndex={-1} autoComplete="off" value={k.website} onChange={(e) => setK({ ...k, website: e.target.value })} />
          </div>
          {fehler && <p className="text-sm text-destructive" role="alert" data-testid="kv-fehler">{fehler}</p>}
          <Button type="button" size="lg" onClick={senden} disabled={sendet} data-testid="kv-senden">
            {sendet ? "Wird gesendet …" : "Kostenvoranschlag per E-Mail anfordern"}
          </Button>
          <p className="text-xs text-muted-foreground">Lieber ohne Formular? Schreiben Sie uns an <a className="underline" href={`mailto:${KI_EMAIL}`}>{KI_EMAIL}</a>.</p>
        </div>
      </div>
    </div>
  );
}
