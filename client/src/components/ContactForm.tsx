import { useState, useRef } from "react";
import { Check, ArrowRight, ArrowLeft, User, Mail, MapPin, Camera, Upload, X, FileText, Loader2, Sparkles, Home, Building, Hammer, Bath, Layers, PaintBucket, Waves, ShieldAlert, DoorOpen, Zap, Droplets, Flame, Thermometer, Sun, HelpCircle, ShieldCheck, Video, Mic, Smartphone, Tablet, Monitor, Calendar } from "lucide-react";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
  selectedServices: string[];
  message: string;
  uploadedFiles: UploadedFile[];
  terminWunsch: string;
  inspektionTermin: string;
  inspektionTerminFormatted: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
}

const serviceOptions = [
  { id: "komplettsanierung", icon: Sparkles, label: "Komplettsanierung", description: "Alle Gewerke aus einer Hand" },
  { id: "haussanierung", icon: Home, label: "Haussanierung", description: "Einfamilienhaus modernisieren" },
  { id: "wohnungssanierung", icon: Building, label: "Wohnungssanierung", description: "Renovierung der Wohnung" },
  { id: "renovierung", icon: Hammer, label: "Renovierung", description: "Modernisierung und Auffrischung" },
  { id: "badsanierung", icon: Bath, label: "Badsanierung", description: "Neues Bad aus einer Hand" },
  { id: "bodenverlegung", icon: Layers, label: "Bodenverlegung", description: "Neue Böden fachgerecht verlegt" },
  { id: "malerarbeiten-fassade", icon: PaintBucket, label: "Malerarbeiten & Fassade", description: "Innen- und Außenanstrich" },
  { id: "mauerwerksabdichtung", icon: Waves, label: "Mauerwerksabdichtung", description: "Schutz vor Feuchtigkeit" },
  { id: "asbestsanierung", icon: ShieldAlert, label: "Asbestsanierung", description: "Fachgerechte Entsorgung" },
  { id: "tueren", icon: DoorOpen, label: "Türen", description: "Einbau und Austausch" },
  { id: "elektroinstallation", icon: Zap, label: "Elektroinstallation", description: "Elektroarbeiten für Haus und Wohnung" },
  { id: "sanitaer", icon: Droplets, label: "Sanitärinstallation", description: "Wasserinstallation" },
  { id: "heizung", icon: Flame, label: "Heizungsinstallation", description: "Neue oder modernisierte Heizung" },
  { id: "waermepumpe", icon: Thermometer, label: "Wärmepumpe", description: "Moderne Heiztechnik" },
  { id: "photovoltaik", icon: Sun, label: "Photovoltaik", description: "Solaranlage für Ihr Zuhause" },
  { id: "beratung", icon: HelpCircle, label: "Beratung", description: "Kostenlose Erstberatung" },
];

const STEP_LABELS = ["Leistung", "Details", "Termin", "Kontakt"];

interface ContactFormProps {
  phoneNumber: string;
}

export default function ContactForm({ phoneNumber }: ContactFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    selectedServices: [],
    message: "",
    uploadedFiles: [],
    terminWunsch: "",
    inspektionTermin: "",
    inspektionTerminFormatted: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    postalCode: "",
    city: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [datenschutzAkzeptiert, setDatenschutzAkzeptiert] = useState(false);
  const { toast } = useToast();

  const totalSteps = 4;

  const toggleService = (serviceId: string) => {
    setFormData(prev => ({ ...prev, selectedServices: [serviceId] }));
    setTimeout(() => setStep(2), 150);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (step === 1) return formData.selectedServices.length > 0;
    if (step === 2) return true;
    if (step === 3) {
      if (formData.terminWunsch === "") return false;
      if (formData.terminWunsch === "kalender") return formData.inspektionTermin !== "";
      return true;
    }
    if (step === 4) return formData.firstName !== "" && formData.lastName !== "" && formData.phone !== "" && formData.postalCode !== "" && datenschutzAkzeptiert;
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

  const getSelectedServicesLabels = () => {
    return formData.selectedServices.map(id => {
      const service = serviceOptions.find(s => s.id === id);
      return service ? service.label : id;
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        uploadedFiles: formData.uploadedFiles.map(f => ({ name: f.name, size: f.size, type: f.type })),
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

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  if (isSubmitted) {
    return (
      <section className="py-10 bg-zinc-900" id="kontakt" data-testid="section-contact">
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
              <Button variant="outline" onClick={() => { setIsSubmitted(false); setStep(1); setFormData({ selectedServices: [], message: "", uploadedFiles: [], terminWunsch: "", inspektionTermin: "", inspektionTerminFormatted: "", firstName: "", lastName: "", phone: "", email: "", address: "", postalCode: "", city: "" }); }} data-testid="button-new-request">
                Neue Anfrage starten
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-zinc-900" id="kontakt" data-testid="section-contact">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">Digitale Erstberatung anfragen</h2>
          <p className="text-white/70">{STEP_LABELS[step - 1]} – Schritt {step} von {totalSteps}</p>
        </div>

        <div className="flex items-start gap-3 mb-6 p-4 bg-white/5 border border-white/10 rounded-md max-w-2xl mx-auto" data-testid="hinweis-meisterbetrieb-formular">
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

        <div className="w-full bg-border rounded-full h-2 mb-6">
          <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>

        <Card>
          <CardContent className="p-6 md:p-8">

            {step === 1 && (
              <div data-testid="form-step-services">
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Was soll gemacht werden?</h3>
                  <p className="text-muted-foreground">Wählen Sie die passende Leistung</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {serviceOptions.map((option) => (
                    <button aria-label="Aktion"
                      key={option.id}
                      type="button"
                      onClick={() => toggleService(option.id)}
                      className={`p-4 rounded-md border-2 transition-all text-left ${formData.selectedServices.includes(option.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                      data-testid={`button-service-${option.id}`}
                    >
                      <option.icon className={`w-6 h-6 mb-2 ${formData.selectedServices.includes(option.id) ? "text-primary" : "text-muted-foreground"}`} />
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                      {formData.selectedServices.includes(option.id) && (
                        <div className="mt-2"><Check className="w-4 h-4 text-primary" /></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div data-testid="form-step-details">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Ein Schaden, eine Idee, ein Vorhaben – zeigen Sie es uns</h3>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Statt lange nach den richtigen Worten zu suchen: ein Foto, ein kurzes Video oder eine Sprachnachricht sagen oft mehr als jede Beschreibung. Egal ob per Handy, Tablet oder Desktop – laden Sie hoch, was Sie haben, wir kümmern uns um den Rest.
                  </p>
                </div>

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
                  className="border-2 border-dashed border-border rounded-md p-8 text-center cursor-pointer hover:border-primary/50 transition-colors mb-4"
                  onClick={() => fileInputRef.current?.click()}
                  data-testid="button-upload-area"
                >
                  <div className="flex justify-center gap-3 text-muted-foreground mb-3">
                    <Camera className="w-6 h-6" />
                    <Video className="w-6 h-6" />
                    <FileText className="w-6 h-6" />
                    <Mic className="w-6 h-6" />
                  </div>
                  <p className="font-medium mb-1">Klicken zum Hochladen</p>
                  <p className="text-sm text-muted-foreground">Fotos, Videos, PDF oder Sprachnachricht (max. 5 Dateien, je 10 MB)</p>
                  <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5" />Handy</span>
                    <span className="flex items-center gap-1"><Tablet className="w-3.5 h-3.5" />Tablet</span>
                    <span className="flex items-center gap-1"><Monitor className="w-3.5 h-3.5" />Desktop</span>
                  </div>
                </div>

                {formData.uploadedFiles.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium">Hochgeladene Dateien:</p>
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

                <div>
                  <label className="block text-sm font-medium mb-2">Kurze Beschreibung (optional)</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="z.B. Objektadresse, was saniert werden soll, besondere Wünsche..."
                    rows={4}
                    className="text-lg"
                    data-testid="input-message"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div data-testid="form-step-termin">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Wie möchten Sie einen Termin vereinbaren?</h3>
                  <p className="text-muted-foreground">Wählen Sie Ihren bevorzugten Weg</p>
                </div>
                <div className="space-y-2 mb-6">
                  <button aria-label="Aktion"
                    type="button"
                    onClick={() => handleInputChange("terminWunsch", "kalender")}
                    className={`w-full p-4 rounded-md border-2 transition-all text-left ${formData.terminWunsch === "kalender" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
                    data-testid="button-terminWunsch-kalender"
                  >
                    <div className="font-medium text-lg">Termin direkt aus dem Kalender buchen</div>
                  </button>
                  <button aria-label="Aktion"
                    type="button"
                    onClick={() => handleInputChange("terminWunsch", "email")}
                    className={`w-full p-4 rounded-md border-2 transition-all text-left ${formData.terminWunsch === "email" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
                    data-testid="button-terminWunsch-email"
                  >
                    <div className="font-medium text-lg">Nur per E-Mail anfragen, Termin später klären</div>
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
            )}

            {step === 4 && (
              <div data-testid="form-step-contact">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Ihre Kontaktdaten</h3>
                  <p className="text-muted-foreground">Für Rückmeldung und Terminvereinbarung</p>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Vorname *</label>
                      <Input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="Max"
                        data-testid="input-firstname"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nachname *</label>
                      <Input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Mustermann"
                        data-testid="input-lastname"
                      />
                    </div>
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
                      placeholder="max@beispiel.de"
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

                  <div className="bg-muted/50 rounded-md p-4 space-y-2 text-sm">
                    <div className="text-muted-foreground mb-1">Ihre Anfrage im Überblick</div>
                    <div><span className="text-muted-foreground">Leistung: </span><span className="font-medium">{getSelectedServicesLabels().join(", ")}</span></div>
                    {formData.uploadedFiles.length > 0 && (
                      <div><span className="text-muted-foreground">Dateien: </span><span className="font-medium">{formData.uploadedFiles.length} Datei(en)</span></div>
                    )}
                    {formData.inspektionTermin && (
                      <div><span className="text-muted-foreground">Termin: </span><span className="font-medium">{formData.inspektionTerminFormatted || formData.inspektionTermin}</span></div>
                    )}
                  </div>

                  <div className="flex items-start gap-2 justify-center pt-2">
                    <Checkbox
                      id="datenschutz-agb-checkbox"
                      checked={datenschutzAkzeptiert}
                      onCheckedChange={(checked) => setDatenschutzAkzeptiert(checked === true)}
                      data-testid="checkbox-datenschutz-agb"
                      className="mt-0.5"
                    />
                    <Label htmlFor="datenschutz-agb-checkbox" className="text-xs text-muted-foreground font-normal cursor-pointer">
                      Ich habe die <a href="/datenschutz" className="underline hover:text-primary" onClick={(e) => e.stopPropagation()}>Datenschutzerklärung</a> und die <a href="/agb" className="underline hover:text-primary" onClick={(e) => e.stopPropagation()}>AGB</a> gelesen und stimme zu. *
                    </Label>
                  </div>
                </div>
              </div>
            )}

            <div className={`flex gap-4 mt-8 ${step === 1 ? 'justify-center' : 'justify-between'}`}>
              {step > 1 && (
                <Button variant="outline" onClick={handlePrev} className="flex-1" data-testid="button-prev">
                  <ArrowLeft className="w-4 h-4 mr-2" />Zurück
                </Button>
              )}

              {step < totalSteps ? (
                <Button onClick={handleNext} disabled={!canProceed()} className={`bg-red-900 hover:bg-red-800 ${step === 1 ? 'w-full max-w-sm' : 'flex-1'}`} data-testid="button-next">
                  Weiter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button aria-label="Aktion" onClick={handleSubmit} disabled={isSubmitting || !canProceed()} className="flex-1" data-testid="button-submit">
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Wird gesendet...</>
                  ) : (
                    <><Check className="w-4 h-4 mr-2" />Anfrage absenden</>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
