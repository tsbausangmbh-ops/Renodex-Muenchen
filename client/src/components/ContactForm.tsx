import { useState, useMemo, useRef } from "react";
import { AlertTriangle, Droplets, Home, Wrench, Check, ArrowRight, ArrowLeft, Phone, Ruler, Calendar, Building2, HelpCircle, User, Mail, MapPin, MessageSquare, Clock, Euro, FileText, CloudRain, Loader2, Users, Camera, Upload, X, Wallet, Navigation, Zap, Bath, Flame, Thermometer, Sun, PaintBucket, Layers, DoorOpen, ShieldAlert, ShieldCheck, Waves, Hammer, Building, Sparkles } from "lucide-react";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import { districts } from "@/content/districts";
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
  stadtteil: string;
  objektBeziehung: string;
  objektBeschreibung: string;
  objektStrasse: string;
  objektPlz: string;
  objektOrt: string;
  objektEtage: string;
  badUmfang: string;
  badGroesse: string;
  badZusatzinfos: string;
  inspektionTermin: string;
  inspektionTerminFormatted: string;
  beratungArt: string;
  beratungThema: string;
  beratungDetails: string;
  buildingType: string;
  urgency: string;
  gewuenschtesAngebot: string;
  budgetRahmen: string;
  uploadedFiles: UploadedFile[];
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  message: string;
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
  { id: "beratung", icon: HelpCircle, label: "Beratung", description: "Kostenlose Telefonische Beratung" },
];

interface ContactFormProps {
  phoneNumber: string;
}

export default function ContactForm({ phoneNumber }: ContactFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    selectedServices: [],
    stadtteil: "",
    objektBeziehung: "",
    objektBeschreibung: "",
    objektStrasse: "",
    objektPlz: "",
    objektOrt: "",
    objektEtage: "",
    badUmfang: "",
    badGroesse: "",
    badZusatzinfos: "",
    inspektionTermin: "",
    inspektionTerminFormatted: "",
    beratungArt: "",
    beratungThema: "",
    beratungDetails: "",
    buildingType: "",
    urgency: "",
    gewuenschtesAngebot: "",
    budgetRahmen: "",
    uploadedFiles: [],
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    postalCode: "",
    city: "",
    message: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [datenschutzAkzeptiert, setDatenschutzAkzeptiert] = useState(false);
  const { toast } = useToast();

  const dynamicSteps = useMemo(() => {
    // Objekt & Adresse - dynamic question based on selected services
    const getObjektFrage = () => {
      if (formData.selectedServices.includes("beratung")) return "Um welches Objekt geht es?";
      if (formData.selectedServices.includes("komplettsanierung") || formData.selectedServices.includes("haussanierung")) return "Welches Haus soll saniert werden?";
      if (formData.selectedServices.includes("wohnungssanierung") || formData.selectedServices.includes("badsanierung")) return "Welche Wohnung soll saniert werden?";
      return "Wo sollen die Arbeiten durchgeführt werden?";
    };

    const steps: any[] = [
      { id: "services", type: "services", question: "Was soll gemacht werden?", description: "Wählen Sie eine oder mehrere Leistungen" },
    ];

    // Beratung: Erstberatung – Auswahl an erster Stelle (vor Objekt & Adresse)
    if (formData.selectedServices.includes("beratung")) {
      steps.push(
        { id: "beratung-art", type: "select", field: "beratungArt", icon: Phone, question: "Erstberatung – Auswahl", description: "Wie wünschen Sie die kostenlose Erstberatung?", options: [
          { value: "telefonisch", label: "Telefonisch" },
          { value: "online", label: "Online-Meeting (Zoom)" },
          { value: "egal", label: "Egal / Entscheiden Sie für mich" },
        ]}
      );
    }

    // Objekt & Adresse
    steps.push(
      { id: "objekt-adresse", type: "objekt-adresse", icon: MapPin, question: "Objekt & Adresse", description: "Wo sollen die Arbeiten durchgeführt werden?", objektFrage: getObjektFrage() }
    );

    // Objektbeziehung
    steps.push(
      { id: "objekt-beziehung", type: "select", field: "objektBeziehung", icon: Users, question: "In welcher Beziehung stehen Sie zum Objekt?", description: "Bitte wählen Sie Ihre Rolle", options: [
        { value: "eigentuemer", label: "Eigentümer" },
        { value: "hausverwaltung", label: "Hausverwaltung" },
        { value: "mieter", label: "Mieter" },
        { value: "bautraeger", label: "Bauträger / Investor" },
        { value: "sonstiges", label: "Sonstiges" },
      ]}
    );

    if (formData.selectedServices.includes("beratung")) {
      steps.push(
        { id: "beratung-thema", type: "select", field: "beratungThema", icon: HelpCircle, question: "Worum geht es bei der Beratung?", description: "Wählen Sie ein Thema", options: [
          { value: "kosten", label: "Kosten für die Sanierung" },
          { value: "ablauf", label: "Ablauf und Koordination" },
          { value: "material", label: "Materialberatung" },
          { value: "energie", label: "Dämmung / Energieeffizienz" },
          { value: "sonstiges", label: "Sonstiges Anliegen" },
        ]},
        { id: "beratung-details", type: "textarea", field: "beratungDetails", icon: MessageSquare, question: "Erzählen Sie uns mehr", description: "Was möchten Sie wissen? Beschreiben Sie Ihr Vorhaben", placeholder: "z.B. Einfamilienhaus, Badsanierung geplant, möchte wissen was sinnvoll ist..." }
      );
    }

    // Badsanierung: eigene Fragestrecke
    if (formData.selectedServices.includes("badsanierung")) {
      steps.push(
        { id: "bad-umfang", type: "select", field: "badUmfang", icon: Bath, question: "Umfang der Badsanierung", description: "Wie umfangreich soll saniert werden?", options: [
          { value: "komplett", label: "Komplette Badsanierung" },
          { value: "teilweise", label: "Teilweise Erneuerung (z.B. Dusche, Fliesen)" },
          { value: "barrierefrei", label: "Barrierefreier Umbau" },
          { value: "unklar", label: "Noch unklar – bitte beraten" },
        ]}
      );
      steps.push(
        { id: "bad-groesse", type: "select", field: "badGroesse", icon: Ruler, question: "Größe des Bads", description: "Ungefähre Badgröße", options: [
          { value: "unter-5", label: "Unter 5 m²" },
          { value: "5-10", label: "5–10 m²" },
          { value: "ueber-10", label: "Über 10 m²" },
          { value: "unbekannt", label: "Unbekannt" },
        ]}
      );
      steps.push(
        { id: "bad-upload", type: "upload", icon: Camera, question: "Fotos vom aktuellen Bad", description: "Helfen uns bei der Einschätzung" }
      );
      steps.push(
        { id: "bad-zusatz", type: "textarea", field: "badZusatzinfos", icon: FileText, question: "Zusatzinfos", description: "Wünsche zu Ausstattung, Fliesen oder Zeitrahmen", placeholder: "z.B. bodengleiche Dusche, Wunschtermin, Budget..." }
      );
    }

    // Gebäudetyp
    steps.push(
      { id: "building", type: "select", field: "buildingType", icon: Building2, question: "Welcher Gebäudetyp?", description: "Wählen Sie Ihren Gebäudetyp", options: [
        { value: "einfamilienhaus", label: "Einfamilienhaus" },
        { value: "mehrfamilienhaus", label: "Mehrfamilienhaus" },
        { value: "gewerbe", label: "Gewerbegebäude" },
        { value: "garage", label: "Garage / Carport" },
        { value: "sonstige", label: "Sonstiges" },
      ]}
    );

    // Bilder-Upload für relevante Services (nicht bei Beratung - dort eigener Upload)
    if (!formData.selectedServices.includes("beratung") && !formData.selectedServices.includes("badsanierung")) {
      steps.push(
        { id: "fotos", type: "upload", icon: Camera, question: "Haben Sie Fotos?", description: "Optional: Laden Sie Bilder hoch (max. 5 Dateien, je 10 MB)" }
      );
    }

    // Dringlichkeit mit erweiterten Optionen (nicht bei Beratung - dort nicht relevant)
    if (!formData.selectedServices.includes("beratung")) {
      steps.push(
        { id: "urgency", type: "select", field: "urgency", icon: Clock, question: "Wie dringend ist der Auftrag?", description: "Wählen Sie die gewünschte Reaktionszeit", options: [
          { value: "notfall", label: "Notfall (sofortige Hilfe nötig)" },
          { value: "1-woche", label: "Innerhalb von 1 Woche" },
          { value: "4-wochen", label: "Innerhalb von 4 Wochen" },
          { value: "flexibel", label: "Termin flexibel" },
        ]}
      );
    }

    // Was wünschen Sie? (nicht bei Inspektion)
    if (!formData.selectedServices.includes("inspektion")) {
      steps.push(
        { id: "angebot-art", type: "select", field: "gewuenschtesAngebot", icon: FileText, question: "Was wünschen Sie zunächst?", description: "Art der gewünschten Leistung", options: [
          { value: "kostenschaetzung", label: "Nur eine grobe Kostenschätzung" },
          { value: "angebot", label: "Ein verbindliches Angebot nach Vor-Ort-Termin" },
          { value: "beratung", label: "Eine Vor-Ort-Beratung mit Alternativen" },
        ]}
      );
    }

    
    // Termin-Kalender fuer alle Services, die noch keinen eigenen Kalender-Schritt haben (inspektion hat ihn bereits oben)
    if (!formData.selectedServices.includes("inspektion")) {
      steps.push(
        { id: "termin-kalender", type: "calendar", field: "inspektionTermin", icon: Calendar, question: "Wann passt es Ihnen?", description: "Wählen Sie einen freien Termin aus unserem Kalender" }
      );
    }

    steps.push(
      { id: "contact-info", type: "contact", icon: User, question: "Ihre Kontaktdaten", description: "Für Rückruf und Terminvereinbarung" },
      { id: "summary", type: "summary", icon: Check, question: "Zusammenfassung", description: "Bitte überprüfen Sie Ihre Angaben" }
    );

    return steps;
  }, [formData.selectedServices]);

  const totalSteps = dynamicSteps.length;
  const currentStepData = dynamicSteps[step - 1];

  const toggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: [serviceId]
    }));
    // Auto-advance to next step after selecting a service
    setTimeout(() => setStep(2), 150);
  };

  const handleSelectOption = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelectToggle = (field: string, value: string) => {
    setFormData(prev => {
      const currentValues = prev[field as keyof FormData] as string[];
      if (currentValues.includes(value)) {
        return { ...prev, [field]: currentValues.filter(v => v !== value) };
      } else {
        return { ...prev, [field]: [...currentValues, value] };
      }
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (!currentStepData) return false;
    if (currentStepData.type === "services") return formData.selectedServices.length > 0;
    if (currentStepData.type === "info") return true;
    if (currentStepData.type === "summary") return datenschutzAkzeptiert;
    if (currentStepData.type === "upload") return true; // Optional
    if (currentStepData.type === "calendar") return formData.inspektionTermin !== "";
    if (currentStepData.type === "select") {
      return formData[currentStepData.field as keyof FormData] !== "";
    }
    if (currentStepData.type === "multiselect") {
      return (formData[currentStepData.field as keyof FormData] as string[]).length > 0;
    }
    if (currentStepData.type === "input" && currentStepData.required) {
      return formData[currentStepData.field as keyof FormData] !== "";
    }
    if (currentStepData.type === "contact") {
      return formData.firstName !== "" && formData.lastName !== "" && formData.phone !== "" && formData.postalCode !== "";
    }
    return true;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const maxFiles = 5;
    const maxSize = 10 * 1024 * 1024; // 10 MB

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

  const getLabelForValue = (field: string, value: string) => {
    for (const stepData of dynamicSteps) {
      if (stepData.field === field && stepData.options) {
        const option = stepData.options.find((o: any) => o.value === value);
        if (option) return option.label;
      }
    }
    return value;
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
              {formData.urgency === "notfall" && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4 mb-6">
                  <p className="text-destructive font-medium mb-2">Für sofortige Hilfe:</p>
                  <a aria-label="Link" href={`tel:${phoneNumber.replace(/\s/g, "")}`} className="text-destructive font-bold text-2xl" data-testid="link-success-phone">
                    {phoneNumber}
                  </a>
                </div>
              )}
              <Button variant="outline" onClick={() => { setIsSubmitted(false); setStep(1); setFormData({ selectedServices: [], objektBeziehung: "", objektBeschreibung: "", objektStrasse: "", objektPlz: "", objektOrt: "", objektEtage: "", badUmfang: "", badGroesse: "", badZusatzinfos: "", inspektionTermin: "", inspektionTerminFormatted: "", beratungArt: "", beratungThema: "", beratungDetails: "", buildingType: "", urgency: "", gewuenschtesAngebot: "", budgetRahmen: "", uploadedFiles: [], firstName: "", lastName: "", phone: "", email: "", address: "", postalCode: "", city: "", stadtteil: "", message: "" }); }} data-testid="button-new-request">
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
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">Komplettsanierung anfragen – Kostenloses Angebot in 2 Minuten</h2>
          <p className="text-white/70">Kostenloses Angebot von Renodex – Schritt {step} von {totalSteps}</p>
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
            
            {currentStepData?.type === "services" && (
              <div data-testid="form-step-services">
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{currentStepData.question}</h3>
                  <p className="text-muted-foreground">{currentStepData.description}</p>
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

            {currentStepData?.type === "info" && (
              <div data-testid={`form-step-${currentStepData.id}`}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <currentStepData.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{currentStepData.question}</h3>
                  <p className="text-lg font-semibold text-primary mb-4">{currentStepData.description}</p>
                  <div className="bg-muted/50 rounded-md p-4 text-muted-foreground">
                    {currentStepData.infoText}
                  </div>
                </div>
              </div>
            )}

            {currentStepData?.type === "upload" && (
              <div data-testid={`form-step-${currentStepData.id}`}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{currentStepData.question}</h3>
                  <p className="text-muted-foreground mb-4">{currentStepData.description}</p>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
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
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="font-medium mb-1">Klicken zum Hochladen</p>
                  <p className="text-sm text-muted-foreground">Bilder oder PDFs (max. 5 Dateien, je 10 MB)</p>
                </div>

                {formData.uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Hochgeladene Dateien:</p>
                    {formData.uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted/50 rounded-md p-3">
                        <div className="flex items-center gap-2 overflow-hidden">
                          {file.type.startsWith("image/") ? (
                            <img src={file.dataUrl} alt={file.name} className="w-10 h-10 object-cover rounded"  decoding="async"  loading="lazy"  width={400} height={300} />
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

                <div className="mt-4 text-sm text-muted-foreground">
                  <p className="font-medium mb-1">Hilfreich sind:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Nahaufnahme der betroffenen Stelle</li>
                    <li>Gesamtansicht des Raums / Bereichs</li>
                    <li>Ggf. Pläne / Skizzen</li>
                  </ul>
                </div>
              </div>
            )}

            {currentStepData?.type === "select" && (
              <div data-testid={`form-step-${currentStepData.id}`}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <currentStepData.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{currentStepData.question}</h3>
                  <p className="text-muted-foreground">{currentStepData.description}</p>
                </div>
                <div className="space-y-2 mb-6">
                  {currentStepData.options.map((option: any) => (
                    <button aria-label="Aktion"
                      key={option.value}
                      type="button"
                      onClick={() => handleSelectOption(currentStepData.field, option.value)}
                      className={`w-full p-4 rounded-md border-2 transition-all text-left ${formData[currentStepData.field as keyof FormData] === option.value ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
                      data-testid={`button-${currentStepData.field}-${option.value}`}
                    >
                      <div className="font-medium text-lg">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStepData?.type === "multiselect" && (
              <div data-testid={`form-step-${currentStepData.id}`}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <currentStepData.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{currentStepData.question}</h3>
                  <p className="text-muted-foreground">{currentStepData.description}</p>
                </div>
                <div className="space-y-2 mb-6">
                  {currentStepData.options.map((option: any) => (
                    <button aria-label="Aktion"
                      key={option.value}
                      type="button"
                      onClick={() => handleMultiSelectToggle(currentStepData.field, option.value)}
                      className={`w-full p-4 rounded-md border-2 transition-all text-left ${(formData[currentStepData.field as keyof FormData] as string[]).includes(option.value) ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
                      data-testid={`button-${currentStepData.field}-${option.value}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${(formData[currentStepData.field as keyof FormData] as string[]).includes(option.value) ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                          {(formData[currentStepData.field as keyof FormData] as string[]).includes(option.value) && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <span className="font-medium text-lg">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStepData?.type === "input" && (
              <div data-testid={`form-step-${currentStepData.id}`}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <currentStepData.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{currentStepData.question}</h3>
                  <p className="text-muted-foreground">{currentStepData.description}</p>
                </div>
                <div className="mb-6">
                  <div className="relative">
                    <Input
                      type={currentStepData.inputType || "text"}
                      value={formData[currentStepData.field as keyof FormData] as string}
                      onChange={(e) => handleInputChange(currentStepData.field, e.target.value)}
                      placeholder={currentStepData.placeholder}
                      className="text-lg p-6 text-center"
                      data-testid={`input-${currentStepData.field}`}
                    />
                    {currentStepData.suffix && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">{currentStepData.suffix}</span>
                    )}
                  </div>
                  {currentStepData.required && <p className="text-xs text-muted-foreground text-center mt-2">* Pflichtfeld</p>}
                </div>
              </div>
            )}

            {currentStepData?.type === "calendar" && (
              <div data-testid="form-step-inspektion-termin">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{currentStepData.question}</h3>
                  <p className="text-muted-foreground">{currentStepData.description}</p>
                </div>
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
              </div>
            )}

            {currentStepData?.type === "textarea" && (
              <div data-testid={`form-step-${currentStepData.id}`}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <currentStepData.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{currentStepData.question}</h3>
                  <p className="text-muted-foreground">{currentStepData.description}</p>
                </div>
                <div className="mb-6">
                  <Textarea
                    value={formData[currentStepData.field as keyof FormData] as string}
                    onChange={(e) => handleInputChange(currentStepData.field, e.target.value)}
                    placeholder={currentStepData.placeholder}
                    rows={4}
                    className="text-lg"
                    data-testid={`input-${currentStepData.field}`}
                  />
                </div>
              </div>
            )}

            {currentStepData?.type === "contact" && (
              <div data-testid="form-step-contact">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{currentStepData.question}</h3>
                  <p className="text-muted-foreground">{currentStepData.description}</p>
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
                </div>
              </div>
            )}

            {currentStepData?.type === "objekt-adresse" && (
              <div data-testid="form-step-objekt-adresse">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{currentStepData.question}</h3>
                  <p className="text-muted-foreground">{currentStepData.description}</p>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{currentStepData.objektFrage}</label>
                    <Textarea
                      value={formData.objektBeschreibung}
                      onChange={(e) => handleInputChange("objektBeschreibung", e.target.value)}
                      placeholder="z.B. Einfamilienhaus, Garage, Mehrfamilienhaus..."
                      rows={2}
                      data-testid="input-objektBeschreibung"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Straße / Hausnummer</label>
                    <Input
                      value={formData.objektStrasse}
                      onChange={(e) => handleInputChange("objektStrasse", e.target.value)}
                      placeholder="z.B. Musterstraße 123"
                      data-testid="input-objektStrasse"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">PLZ</label>
                      <Input
                        value={formData.objektPlz}
                        onChange={(e) => handleInputChange("objektPlz", e.target.value)}
                        placeholder="80331"
                        data-testid="input-objektPlz"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Ort</label>
                      <Input
                        value={formData.objektOrt}
                        onChange={(e) => handleInputChange("objektOrt", e.target.value)}
                        placeholder="München"
                        data-testid="input-objektOrt"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Stadtteil</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[200px] overflow-y-auto border rounded-md p-2">
                      {districts.map((district) => (
                        <button aria-label="Aktion"
                          key={district.slug}
                          type="button"
                          onClick={() => handleSelectOption("stadtteil", district.name)}
                          className={`p-2 rounded-md border text-sm transition-all text-left ${formData.stadtteil === district.name ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                          data-testid={`button-stadtteil-${district.slug}`}
                        >
                          <div className="font-medium flex items-center gap-1">
                            {district.name}
                            {formData.stadtteil === district.name && <Check className="w-3 h-3 text-primary" />}
                          </div>
                        </button>
                      ))}
                      <button aria-label="Aktion"
                        type="button"
                        onClick={() => handleSelectOption("stadtteil", "Sonstiges / Umland")}
                        className={`p-2 rounded-md border text-sm transition-all text-left ${formData.stadtteil === "Sonstiges / Umland" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                        data-testid="button-stadtteil-sonstiges"
                      >
                        <div className="font-medium flex items-center gap-1">
                          Sonstiges / Umland
                          {formData.stadtteil === "Sonstiges / Umland" && <Check className="w-3 h-3 text-primary" />}
                        </div>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Etage / Lage</label>
                    <Input
                      value={formData.objektEtage}
                      onChange={(e) => handleInputChange("objektEtage", e.target.value)}
                      placeholder="z.B. 3. OG, Anbau, Souterrain"
                      data-testid="input-objektEtage"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStepData?.type === "summary" && (
              <div data-testid="form-step-summary">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{currentStepData.question}</h3>
                  <p className="text-muted-foreground">{currentStepData.description}</p>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="bg-muted/50 rounded-md p-4 space-y-3">
                    <div className="border-b pb-3">
                      <div className="text-sm text-muted-foreground mb-1">Gewünschte Leistungen</div>
                      <div className="font-medium">{getSelectedServicesLabels().join(", ")}</div>
                    </div>
                    
                    {formData.stadtteil && (
                      <div className="border-b pb-3">
                        <div className="text-sm text-muted-foreground mb-1">Stadtteil</div>
                        <div className="font-medium">{formData.stadtteil}</div>
                      </div>
                    )}
                    
                    {formData.objektBeziehung && (
                      <div className="border-b pb-3">
                        <div className="text-sm text-muted-foreground mb-1">Beziehung zum Objekt</div>
                        <div className="font-medium">{getLabelForValue("objektBeziehung", formData.objektBeziehung)}</div>
                      </div>
                    )}

                    {(formData.objektStrasse || formData.objektPlz || formData.objektOrt) && (
                      <div className="border-b pb-3">
                        <div className="text-sm text-muted-foreground mb-1">Objekt & Adresse</div>
                        {formData.objektBeschreibung && <div className="font-medium">{formData.objektBeschreibung}</div>}
                        <div className="text-sm mt-1">
                          {formData.objektStrasse && <div>{formData.objektStrasse}</div>}
                          {(formData.objektPlz || formData.objektOrt) && <div>{formData.objektPlz} {formData.objektOrt}</div>}
                          {formData.objektEtage && <div className="text-muted-foreground">Etage/Lage: {formData.objektEtage}</div>}
                        </div>
                      </div>
                    )}

                    {formData.selectedServices.includes("badsanierung") && (
                      <div className="border-b pb-3">
                        <div className="text-sm text-muted-foreground mb-1">Badsanierung</div>
                        {formData.badUmfang && <div className="font-medium">{getLabelForValue("badUmfang", formData.badUmfang)}</div>}
                        {formData.badGroesse && <div className="text-sm mt-1">Größe: {getLabelForValue("badGroesse", formData.badGroesse)}</div>}
                        {formData.badZusatzinfos && <div className="text-sm mt-1 text-muted-foreground">{formData.badZusatzinfos}</div>}
                      </div>
                    )}
                    
                    {formData.inspektionTermin && (
                      <div className="border-b pb-3">
                        <div className="text-sm text-muted-foreground mb-1">Terminwunsch</div>
                        <div className="font-medium">Termin: {formData.inspektionTerminFormatted || formData.inspektionTermin}</div>
                      </div>
                    )}

                    {formData.selectedServices.includes("beratung") && (
                      <div className="border-b pb-3">
                        <div className="text-sm text-muted-foreground mb-1">Beratung</div>
                        {formData.beratungArt && <div className="font-medium">Art: {getLabelForValue("beratungArt", formData.beratungArt)}</div>}
                        {formData.beratungThema && <div className="font-medium">Thema: {getLabelForValue("beratungThema", formData.beratungThema)}</div>}
                        {formData.beratungDetails && <div className="text-sm mt-1">{formData.beratungDetails}</div>}
                      </div>
                    )}

                    <div>
                      <div className="text-sm text-muted-foreground">Gebäudetyp</div>
                      <div className="font-medium">{getLabelForValue("buildingType", formData.buildingType) || "-"}</div>
                    </div>
                    
                    {formData.uploadedFiles.length > 0 && (
                      <div className="border-t pt-3">
                        <div className="text-sm text-muted-foreground">Hochgeladene Dateien</div>
                        <div className="font-medium">{formData.uploadedFiles.length} Datei(en)</div>
                      </div>
                    )}
                    
                    {formData.urgency && (
                      <div className="border-t pt-3">
                        <div className="text-sm text-muted-foreground">Dringlichkeit</div>
                        <div className="font-medium">{getLabelForValue("urgency", formData.urgency)}</div>
                      </div>
                    )}

                    {formData.gewuenschtesAngebot && (
                      <div className="border-t pt-3">
                        <div className="text-sm text-muted-foreground">Gewünschte Leistung</div>
                        <div className="font-medium">{getLabelForValue("gewuenschtesAngebot", formData.gewuenschtesAngebot)}</div>
                      </div>
                    )}

                    {formData.budgetRahmen && (
                      <div className="border-t pt-3">
                        <div className="text-sm text-muted-foreground">Budgetrahmen</div>
                        <div className="font-medium">{getLabelForValue("budgetRahmen", formData.budgetRahmen)}</div>
                      </div>
                    )}
                    
                    <div className="border-t pt-3 space-y-2">
                      <div><div className="text-sm text-muted-foreground">Name</div><div className="font-medium">{formData.firstName} {formData.lastName}</div></div>
                      <div><div className="text-sm text-muted-foreground">Telefon</div><div className="font-medium">{formData.phone}</div></div>
                      {formData.email && <div><div className="text-sm text-muted-foreground">E-Mail</div><div className="font-medium">{formData.email}</div></div>}
                      <div><div className="text-sm text-muted-foreground">Adresse</div><div className="font-medium">{formData.address && `${formData.address}, `}{formData.postalCode} {formData.city}</div></div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 justify-center">
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
                  {currentStepData?.type === "upload"
                    ? (formData.uploadedFiles.length > 0 ? "Mit Dateien fortfahren" : "Ohne Dateien fortfahren")
                    : "Weiter"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button aria-label="Aktion" onClick={handleSubmit} disabled={isSubmitting || !datenschutzAkzeptiert} className="flex-1" data-testid="button-submit">
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
