import { useState, useRef, useEffect } from "react";
import { Check, User, Mail, Camera, Upload, X, FileText, Loader2, Video, Mic, Calendar, ShieldCheck } from "lucide-react";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { CalendarWidget } from "@/components/CalendarWidget";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
}

interface FormData {
  subject: string;
  message: string;
  uploadedFiles: UploadedFile[];
  terminWunsch: string;
  inspektionTermin: string;
  inspektionTerminFormatted: string;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  objektAddress: string;
  objektPostalCode: string;
  objektCity: string;
}

interface ContactFormProps {
  phoneNumber: string;
}

export default function ContactForm({ phoneNumber }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    subject: "",
    message: "",
    uploadedFiles: [],
    terminWunsch: "",
    inspektionTermin: "",
    inspektionTerminFormatted: "",
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    email: "",
    address: "",
    postalCode: "",
    city: "",
    objektAddress: "",
    objektPostalCode: "",
    objektCity: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [datenschutzAkzeptiert, setDatenschutzAkzeptiert] = useState(false);
  // Spam-/Bot-Schutz: verstecktes Feld, das nur automatisierte Ausfueller finden und
  // befuellen (echte Nutzer sehen es nie), plus Mindest-Ausfuellzeit ab Seitenaufruf --
  // beide Werte gehen unauffaellig im normalen Formular-Body mit (Muster aus
  // 089-Sanierer/upload-funnel-sektion.tsx uebernommen, kein neuer Weg).
  const [website, setWebsite] = useState("");
  const geoeffnetUm = useRef(Date.now());
  useEffect(() => { geoeffnetUm.current = Date.now(); }, []);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canSubmit = () => {
    if (formData.firstName === "" || formData.lastName === "" || formData.phone === "" || formData.postalCode === "") return false;
    if (!datenschutzAkzeptiert) return false;
    if (formData.terminWunsch === "kalender" && formData.inspektionTermin === "") return false;
    return true;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const maxFiles = 5;
    const maxSize = 10 * 1024 * 1024;

    if (formData.uploadedFiles.length + files.length > maxFiles) {
      toast({
        title: "Zu viele Dateien",
        description: `Maximal ${maxFiles} Dateien erlaubt.`,
        variant: "destructive"
      });
      return;
    }

    Array.from(files).forEach(file => {
      if (file.size > maxSize) {
        toast({
          title: "Datei zu groß",
          description: `${file.name} ist größer als 10 MB.`,
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          uploadedFiles: [...prev.uploadedFiles, {
            name: file.name,
            size: file.size,
            type: file.type,
            dataUrl: reader.result as string
          }]
        }));
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        uploadedFiles: formData.uploadedFiles.map(f => ({ name: f.name, size: f.size, type: f.type })),
        website,
        formOpenedAt: geoeffnetUm.current,
      };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Anfrage gesendet",
          description: "Wir melden uns schnellstmöglich bei Ihnen.",
        });
      } else {
        toast({
          title: "Fehler",
          description: result.message || "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Fehler",
        description: "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="bg-zinc-900 py-12 md:py-16" id="kontakt" data-testid="section-contact">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="border-green-500/30 bg-green-50/50 dark:bg-green-950/20">
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-green-700 dark:text-green-400">E-Mail erfolgreich versendet!</h2>
              <p className="text-lg font-medium mb-4">Ihre Anfrage wurde an uns übermittelt.</p>
              <p className="text-muted-foreground mb-6">
                Vielen Dank, <span className="font-semibold">{formData.firstName} {formData.lastName}</span>! Wir melden uns schnellstmöglich bei Ihnen.
              </p>
              <div className="bg-background/80 rounded-md p-4 mb-6 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 inline-block mr-2 text-primary" />
                Eine Kopie Ihrer Anfrage wurde an unser Team gesendet.
              </div>
              <Button variant="outline" onClick={() => { setIsSubmitted(false); setDatenschutzAkzeptiert(false); setFormData({ subject: "", message: "", uploadedFiles: [], terminWunsch: "", inspektionTermin: "", inspektionTerminFormatted: "", firstName: "", lastName: "", company: "", phone: "", email: "", address: "", postalCode: "", city: "", objektAddress: "", objektPostalCode: "", objektCity: "" }); }} data-testid="button-new-request">
                Neue Anfrage starten
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-zinc-900 py-12 md:py-16" id="kontakt" data-testid="section-contact">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">Digitale Erstberatung anfragen</h2>
          <p className="text-white/70">Kontaktdaten, kurze Beschreibung und optional Foto/Video – wir melden uns zeitnah zurück.</p>
        </div>

        <div className="flex items-start gap-3 mb-6 p-4 bg-white/5 border border-white/10 rounded-md" data-testid="hinweis-meisterbetrieb-formular">
          <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-white/70 text-sm leading-relaxed">
            Renodex übernimmt für Sie Koordination, Verwaltung und Bauleitung Ihres Vorhabens. Die handwerkliche Ausführung erfolgt durch einen eingetragenen Betrieb aus unserem geprüften Partnernetzwerk, mit dem Sie den Vertrag über die Bauleistung schließen.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 p-4 bg-red-900 rounded-md">
          <span className="text-sm text-white font-medium">Oder schreiben Sie uns direkt:</span>
          <a
            href="mailto:info@renodex.de?subject=Anfrage%20von%20renodex.de"
            className="inline-flex items-center gap-2 text-white font-bold"
            data-testid="link-direct-email"
          >
            <Mail className="w-4 h-4" />
            info@renodex.de
          </a>
        </div>

        <Card>
          <CardContent className="p-6 md:p-8 space-y-6">

            <div>
              <label className="block text-sm font-medium mb-2">Betreff</label>
              <Input
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="z.B. Komplettsanierung Wohnung, Wasserschaden Bad..."
                data-testid="input-subject"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Kurze Beschreibung Ihres Vorhabens (optional)</label>
              <Textarea
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="z.B. was saniert werden soll, besondere Wünsche..."
                rows={4}
                className="text-base"
                data-testid="input-message"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Foto, Video, PDF oder Sprachnachricht (optional)</label>
              <p className="text-xs text-muted-foreground mb-2">Egal ob per Handy, Tablet oder Desktop – laden Sie hoch, was Sie haben.</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*,.pdf,audio/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                data-testid="input-file-upload"
              />
              <div
                className="border-2 border-dashed border-border rounded-md p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                data-testid="button-upload-area"
              >
                <div className="flex justify-center gap-3 text-muted-foreground mb-2">
                  <Camera className="w-5 h-5" />
                  <Video className="w-5 h-5" />
                  <FileText className="w-5 h-5" />
                  <Mic className="w-5 h-5" />
                </div>
                <p className="font-medium text-sm mb-1">Klicken zum Hochladen</p>
                <p className="text-xs text-muted-foreground">Bilder, Videos, PDF oder Sprachnachricht (max. 5 Dateien, je 10 MB)</p>
              </div>

              {formData.uploadedFiles.length > 0 && (
                <div className="space-y-2 mt-3">
                  {formData.uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/50 rounded-md p-3">
                      <div className="flex items-center gap-2 overflow-hidden">
                        {file.type.startsWith("image/") ? (
                          <img src={file.dataUrl} alt={file.name} className="w-10 h-10 object-cover rounded" decoding="async" loading="lazy" width={400} height={300} />
                        ) : (
                          <FileText className="w-10 h-10 text-muted-foreground" />
                        )}
                        <div className="overflow-hidden">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Button aria-label="Aktion"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                        data-testid={`button-remove-file-${index}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Termin (optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                <button aria-label="Aktion"
                  type="button"
                  onClick={() => handleInputChange("terminWunsch", "kalender")}
                  className={`p-3 rounded-md border-2 transition-all text-left text-sm ${formData.terminWunsch === "kalender" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
                  data-testid="button-terminWunsch-kalender"
                >
                  Termin direkt aus dem Kalender buchen
                </button>
                <button aria-label="Aktion"
                  type="button"
                  onClick={() => handleInputChange("terminWunsch", "email")}
                  className={`p-3 rounded-md border-2 transition-all text-left text-sm ${formData.terminWunsch === "email" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
                  data-testid="button-terminWunsch-email"
                >
                  Termin später per E-Mail klären
                </button>
              </div>
              {formData.terminWunsch === "kalender" && (
                <CalendarWidget
                  selectedSlot={formData.inspektionTermin}
                  onSelect={(slot) => {
                    setFormData(prev => ({
                      ...prev,
                      inspektionTermin: slot ? slot.dateTime : "",
                      inspektionTerminFormatted: slot ? slot.formatted : ""
                    }));
                  }}
                />
              )}
            </div>

            <div className="space-y-4 pt-2 border-t">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Vorname *</label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Vorname"
                    data-testid="input-firstname"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nachname *</label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Nachname"
                    data-testid="input-lastname"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Firma (optional)</label>
                <Input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Firmenname"
                  data-testid="input-company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Telefon *</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+49 89 12345678"
                  data-testid="input-phone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">E-Mail (optional)</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="name@beispiel.de"
                  data-testid="input-email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Straße und Hausnummer</label>
                <AddressAutocomplete
                  value={formData.address}
                  onChange={(val) => handleInputChange("address", val)}
                  onSelect={(parts) => {
                    handleInputChange("address", parts.street);
                    handleInputChange("postalCode", parts.postalCode);
                    handleInputChange("city", parts.city);
                  }}
                  placeholder="Musterstraße 1"
                  data-testid="input-address"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-2">PLZ *</label>
                  <Input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    placeholder="80000"
                    data-testid="input-postalCode"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ort</label>
                  <Input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="München"
                    data-testid="input-city"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">* Pflichtfelder</p>
            </div>

            <div className="space-y-4 pt-2 border-t">
              <div>
                <label className="block text-sm font-medium mb-1">Bauvorhaben-Adresse (falls abweichend von Ihrer Adresse)</label>
                <p className="text-xs text-muted-foreground mb-2">Nur ausfüllen, wenn die Sanierung an einer anderen Adresse stattfindet.</p>
                <Input
                  type="text"
                  value={formData.objektAddress}
                  onChange={(e) => handleInputChange("objektAddress", e.target.value)}
                  placeholder="Musterstraße 1"
                  data-testid="input-objekt-address"
                  className="mb-3"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">PLZ</label>
                    <Input
                      type="text"
                      value={formData.objektPostalCode}
                      onChange={(e) => handleInputChange("objektPostalCode", e.target.value)}
                      placeholder="80000"
                      data-testid="input-objekt-postalCode"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Ort</label>
                    <Input
                      type="text"
                      value={formData.objektCity}
                      onChange={(e) => handleInputChange("objektCity", e.target.value)}
                      placeholder="München"
                      data-testid="input-objekt-city"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Honeypot: fuer Menschen unsichtbar (0x0px, ausserhalb des Tab-Flusses,
                clip:rect statt reinem display:none/position:absolute, damit Spam-Bots,
                die auf Sichtbarkeit pruefen, das Feld trotzdem befuellen). */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              style={{
                position: "absolute",
                width: 0,
                height: 0,
                padding: 0,
                border: 0,
                overflow: "hidden",
                clip: "rect(0,0,0,0)",
                whiteSpace: "nowrap",
              }}
            />

            <div className="flex items-start gap-2 justify-center pt-2">
              <Checkbox
                id="datenschutz-agb-checkbox"
                checked={datenschutzAkzeptiert}
                onCheckedChange={(checked) => setDatenschutzAkzeptiert(checked === true)}
                data-testid="checkbox-datenschutz-agb"
                className="mt-0.5"
              />
              <span className="text-xs text-muted-foreground font-normal">
                Ich habe die <a href="/datenschutz" className="underline hover:text-primary">Datenschutzerklärung</a> und die <a href="/agb" className="underline hover:text-primary">AGB</a> gelesen und stimme zu. *
              </span>
            </div>

            <Button aria-label="Aktion" onClick={handleSubmit} disabled={isSubmitting || !canSubmit()} className="w-full" size="lg" data-testid="button-submit">
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Wird gesendet...</>
              ) : (
                <><Check className="w-4 h-4 mr-2" />Anfrage absenden</>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
