import { useState, useEffect, useRef } from "react";
import { Upload, FileText, Calendar, Loader2, X, Mail, Video, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const KATEGORIEN = [
  "Komplettsanierung",
  "Badsanierung",
  "Elektroinstallation",
  "Sanitär / Heizung",
  "Bodenverlegung",
  "Maler / Fassade",
  "Dach / Spengler",
  "Beratung / Sonstiges",
];

const TRUST_PUNKTE = [
  {
    icon: Upload,
    text: "Fotos direkt vom Handy – ein Bild vom betroffenen Bereich reicht meistens, um Ihr Anliegen einzuordnen. Keine App, keine Anmeldung.",
  },
  {
    icon: FileText,
    text: "Sie müssen nicht wissen, welches Gewerk betroffen ist. Wählen Sie die Kategorie, die am ehesten passt – die fachliche Einordnung übernimmt unser Partnernetzwerk.",
  },
  {
    icon: Mail,
    text: "Digital bekommen Sie eine Rückmeldung, ohne in der Warteschleife zu hängen – schriftlich, in Ruhe nachlesbar.",
  },
  {
    icon: Calendar,
    text: "Antwort meist am selben Werktag – schriftlich per E-Mail, statt auf einen Rückruf zu warten.",
  },
];

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
}

export default function Sanierungscheck() {
  const { toast } = useToast();
  const [selectedKategorie, setSelectedKategorie] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [strasse, setStrasse] = useState("");
  const [plz, setPlz] = useState("");
  const [ort, setOrt] = useState("");
  const [objektStrasse, setObjektStrasse] = useState("");
  const [objektPlz, setObjektPlz] = useState("");
  const [objektOrt, setObjektOrt] = useState("");
  const [message, setMessage] = useState("");
  const [datenschutzAkzeptiert, setDatenschutzAkzeptiert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Honeypot + Mindest-Ausfuellzeit gegen Formular-Spam (Pflicht bei jedem neuen Formular).
  const [website, setWebsite] = useState("");
  const [formStart] = useState(() => Date.now());

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const maxFiles = 5;
    const maxSize = 10 * 1024 * 1024;

    if (uploadedFiles.length + files.length > maxFiles) {
      toast({ title: "Zu viele Dateien", description: `Maximal ${maxFiles} Dateien erlaubt.`, variant: "destructive" });
      return;
    }

    Array.from(files).forEach((file) => {
      if (file.size > maxSize) {
        toast({ title: "Datei zu groß", description: `${file.name} ist größer als 10 MB.`, variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedFiles((prev) => [...prev, { name: file.name, size: file.size, type: file.type, dataUrl: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (website) return; // Honeypot ausgeloest -> still verwerfen, kein Hinweis an den Bot.
    if (Date.now() - formStart < 2000) {
      toast({ title: "Bitte einen Moment", description: "Das Formular wurde zu schnell abgeschickt.", variant: "destructive" });
      return;
    }
    if (!selectedKategorie || !firstName || !lastName || !phone || !strasse || !plz || !ort) {
      toast({ title: "Angaben fehlen", description: "Bitte Kategorie, Name, Adresse und Telefonnummer vollständig angeben.", variant: "destructive" });
      return;
    }
    if (!datenschutzAkzeptiert) {
      toast({ title: "Zustimmung fehlt", description: "Bitte Datenschutzerklärung und AGB bestätigen.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedServices: [selectedKategorie],
          firstName,
          lastName,
          email,
          phone,
          strasse,
          plz,
          ort,
          objektStrasse,
          objektPlz,
          objektOrt,
          message: `Anfrage über Fotos/Videos (${selectedKategorie}).\n${message}`.trim(),
          uploadedFiles: uploadedFiles.map((f) => ({ name: f.name, size: f.size, type: f.type })),
        }),
      });
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        toast({ title: "Fehler beim Senden", description: "Bitte versuchen Sie es erneut oder rufen Sie uns an.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Verbindungsfehler", description: "Bitte rufen Sie uns an.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-12 bg-zinc-100 dark:bg-zinc-800" data-testid="section-sanierungscheck">
        <div className="max-w-3xl mx-auto px-4 text-center bg-white rounded-2xl p-10">
          <p className="text-lg font-bold text-primary mb-2">Danke, Ihre Anfrage ist angekommen.</p>
          <p className="text-muted-foreground text-sm">Wir melden uns per E-Mail bei Ihnen – meist noch am selben Werktag.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="sanierungscheck" className="py-12 bg-zinc-100 dark:bg-zinc-800" data-testid="section-sanierungscheck">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-red-900 text-white text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-2 rounded-full mb-4" data-testid="badge-sanierungscheck-mobil">
            <Upload className="w-4 h-4" />
            Direkt vom Handy nutzbar – live auf der Baustelle
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Wir sind digital angekommen!</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ein Anruf, eine Warteschleife, dann die Suche nach den richtigen Worten für das, was in Haus oder Wohnung saniert werden muss – das kostet Zeit, die Sie nicht haben müssen. Zeigen Sie uns Ihr Vorhaben stattdessen direkt aus dem Handy: Bild, Video oder Sprachnachricht, sofort hochgeladen, ohne App und ohne Anmeldung.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {TRUST_PUNKTE.map(({ icon: Icon, text }) => (
            <div key={text} className="bg-white dark:bg-zinc-900/50 rounded-xl p-4 shadow-sm">
              <span className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-red-900 text-white text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-2 rounded-full mb-4" data-testid="badge-sanierungscheck-formular-mobil">
            <Upload className="w-4 h-4" />
            Direkt vom Handy nutzbar – live auf der Baustelle
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-sanierungscheck">
            {/* Honeypot-Feld, fuer Menschen unsichtbar (Bots fuellen es trotzdem aus) */}
            <div style={{ position: "absolute", clip: "rect(0,0,0,0)" }} aria-hidden="true">
              <label htmlFor="sanierungscheck-website">Website</label>
              <input id="sanierungscheck-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>

            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0">1</span>
                Worum geht es?
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {KATEGORIEN.map((kat) => (
                  <button
                    key={kat}
                    type="button"
                    onClick={() => setSelectedKategorie(kat)}
                    data-testid={`button-kategorie-${kat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className={`text-xs md:text-sm font-medium px-3 py-2.5 rounded-lg border transition-colors ${
                      selectedKategorie === kat
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    {kat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0">2</span>
                Foto, Video oder PDF hochladen
              </p>
              <label
                htmlFor="sanierungscheck-upload"
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl py-6 cursor-pointer hover:border-primary/50 transition-colors"
                data-testid="label-upload"
              >
                <div className="flex gap-3 text-gray-400">
                  <Upload className="w-5 h-5" />
                  <Video className="w-5 h-5" />
                  <FileText className="w-5 h-5" />
                  <Mic className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-600 font-medium">Dateien auswählen oder hierher ziehen</span>
                <span className="text-xs text-red-900 font-semibold">Fotos, Videos, PDF oder Sprachnachricht – max. 5 Dateien, je 10 MB</span>
              </label>
              <input
                ref={fileInputRef}
                id="sanierungscheck-upload"
                type="file"
                multiple
                accept="image/*,video/*,.pdf,audio/*"
                onChange={handleFileUpload}
                className="hidden"
                data-testid="input-upload"
              />
              {uploadedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm" data-testid={`file-${index}`}>
                      <span className="truncate text-gray-700">{file.name} <span className="text-gray-400">({formatFileSize(file.size)})</span></span>
                      <button type="button" onClick={() => removeFile(index)} className="text-gray-400 hover:text-destructive shrink-0 ml-2" aria-label={`${file.name} entfernen`}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0">3</span>
                Ihre Kontaktdaten
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <Input placeholder="Vorname*" value={firstName} onChange={(e) => setFirstName(e.target.value)} data-testid="input-firstname" required />
                <Input placeholder="Nachname*" value={lastName} onChange={(e) => setLastName(e.target.value)} data-testid="input-lastname" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <Input placeholder="Telefon*" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} data-testid="input-phone" required />
                <Input placeholder="E-Mail (optional)" type="email" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="input-email" />
              </div>
              <div className="grid sm:grid-cols-3 gap-3 mb-3">
                <Input placeholder="Straße und Hausnummer*" className="sm:col-span-1" value={strasse} onChange={(e) => setStrasse(e.target.value)} data-testid="input-strasse" required />
                <Input placeholder="PLZ*" value={plz} onChange={(e) => setPlz(e.target.value)} data-testid="input-plz" required />
                <Input placeholder="Ort*" value={ort} onChange={(e) => setOrt(e.target.value)} data-testid="input-ort" required />
              </div>
              <p className="text-xs text-muted-foreground mb-2 mt-1">Objektadresse (falls abweichend von Ihrer Adresse)</p>
              <div className="grid sm:grid-cols-3 gap-3 mb-3">
                <Input placeholder="Straße und Hausnummer des Objekts" value={objektStrasse} onChange={(e) => setObjektStrasse(e.target.value)} data-testid="input-objekt-strasse" />
                <Input placeholder="PLZ des Objekts" value={objektPlz} onChange={(e) => setObjektPlz(e.target.value)} data-testid="input-objekt-plz" />
                <Input placeholder="Ort des Objekts" value={objektOrt} onChange={(e) => setObjektOrt(e.target.value)} data-testid="input-objekt-ort" />
              </div>
              <Textarea placeholder="Kurze Beschreibung (optional)" value={message} onChange={(e) => setMessage(e.target.value)} data-testid="input-message" rows={3} />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="sanierungscheck-datenschutz"
                checked={datenschutzAkzeptiert}
                onCheckedChange={(checked) => setDatenschutzAkzeptiert(checked === true)}
                data-testid="checkbox-sanierungscheck-datenschutz"
                className="mt-0.5"
              />
              <Label htmlFor="sanierungscheck-datenschutz" className="text-xs text-muted-foreground font-normal cursor-pointer">
                Ich habe die <a href="/datenschutz" className="underline hover:text-primary" onClick={(e) => e.stopPropagation()}>Datenschutzerklärung</a> und die <a href="/agb" className="underline hover:text-primary" onClick={(e) => e.stopPropagation()}>AGB</a> gelesen und stimme zu. *
              </Label>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full bg-red-900 hover:bg-red-800" size="lg" data-testid="button-sanierungscheck-submit">
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Wird gesendet...</>
              ) : (
                <><Mail className="w-4 h-4 mr-2" />Jetzt digital anfragen</>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
