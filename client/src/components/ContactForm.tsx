import { useState, useMemo, useRef } from "react";
import { AlertTriangle, Droplets, Home, Wrench, Check, ArrowRight, ArrowLeft, Phone, Ruler, Calendar, Building2, HelpCircle, User, Mail, MapPin, MessageSquare, Clock, Euro, FileText, CloudRain, Loader2, Users, Camera, Upload, X, Wallet, Navigation } from "lucide-react";
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
  objektPlzOrt: string;
  objektEtage: string;
  spenglerArbeiten: string[];
  spenglerMaterial: string;
  spenglerDachform: string;
  spenglerHoehe: string;
  spenglerGeruest: string;
  spenglerGeruestLiefern: string;
  spenglerRinnenLaenge: string;
  spenglerFallrohreAnzahl: string;
  spenglerAttikaLaenge: string;
  spenglerZusatzinfos: string;
  spenglerSonderBeschreibung: string;
  sturmschadenArt: string[];
  gefahrWasser: string;
  gefahrLoseTeile: string;
  gefahrWeitereSchaeden: string;
  gefahrBeschreibung: string;
  sturmschadenZeitpunkt: string;
  sturmschadenDringlichkeit: string;
  versicherungGemeldet: string;
  versicherungAktennummer: string;
  zusatzinfos: string;
  undichtWo: string[];
  undichtStaerke: string;
  undichtSeit: string;
  undichtDachtyp: string;
  undichtMaterial: string;
  undichtZusatzinfos: string;
  dachrinneHorizontal: string;
  dachrinneVertikal: string;
  inspektionTermin: string;
  inspektionTerminFormatted: string;
  inspektionDachgroesse: string;
  dachgroesse: string;
  beratungArt: string;
  beratungThema: string;
  beratungDetails: string;
  sanierungDachart: string;
  sanierungZiele: string[];
  sanierungFlaeche: string;
  sanierungMaterial: string[];
  sanierungSchaden: string;
  sanierungSchadenBeschreibung: string;
  sanierungZeitplan: string;
  sanierungZusatzinfos: string;
  buildingType: string;
  urgency: string;
  gewuenschtesAngebot: string;
  budgetRahmen: string;
  uploadedFiles: UploadedFile[];
  name: string;
  phone: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  message: string;
}

const serviceOptions = [
  { id: "sturmschaden", icon: AlertTriangle, label: "Sturmschaden", description: "Schäden durch Unwetter" },
  { id: "undicht", icon: Droplets, label: "Undichtes Dach", description: "Wassereintritt, Feuchtigkeit" },
  { id: "sanierung", icon: Home, label: "Dachsanierung", description: "Kompletterneuerung" },
  { id: "spenglerei", icon: Wrench, label: "Spenglerei", description: "Rinnen, Bleche, Verkleidungen" },
  { id: "inspektion", icon: Calendar, label: "Dachinspektion", description: "Professionelle Kontrolle" },
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
    objektPlzOrt: "",
    objektEtage: "",
    spenglerArbeiten: [],
    spenglerMaterial: "",
    spenglerDachform: "",
    spenglerHoehe: "",
    spenglerGeruest: "",
    spenglerGeruestLiefern: "",
    spenglerRinnenLaenge: "",
    spenglerFallrohreAnzahl: "",
    spenglerAttikaLaenge: "",
    spenglerZusatzinfos: "",
    spenglerSonderBeschreibung: "",
    sturmschadenArt: [],
    gefahrWasser: "",
    gefahrLoseTeile: "",
    gefahrWeitereSchaeden: "",
    gefahrBeschreibung: "",
    sturmschadenZeitpunkt: "",
    sturmschadenDringlichkeit: "",
    versicherungGemeldet: "",
    versicherungAktennummer: "",
    zusatzinfos: "",
    undichtWo: [],
    undichtStaerke: "",
    undichtSeit: "",
    undichtDachtyp: "",
    undichtMaterial: "",
    undichtZusatzinfos: "",
    dachrinneHorizontal: "",
    dachrinneVertikal: "",
    inspektionTermin: "",
    inspektionTerminFormatted: "",
    inspektionDachgroesse: "",
    dachgroesse: "",
    beratungArt: "",
    beratungThema: "",
    beratungDetails: "",
    sanierungDachart: "",
    sanierungZiele: [],
    sanierungFlaeche: "",
    sanierungMaterial: [],
    sanierungSchaden: "",
    sanierungSchadenBeschreibung: "",
    sanierungZeitplan: "",
    sanierungZusatzinfos: "",
    buildingType: "",
    urgency: "",
    gewuenschtesAngebot: "",
    budgetRahmen: "",
    uploadedFiles: [],
    name: "",
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
      if (formData.selectedServices.includes("spenglerei")) return "Wo befinden sich die Spenglerarbeiten?";
      if (formData.selectedServices.includes("sturmschaden")) return "Wo befindet sich der Sturmschaden?";
      if (formData.selectedServices.includes("undicht")) return "Wo ist das Dach undicht?";
      if (formData.selectedServices.includes("sanierung")) return "Welches Objekt soll saniert werden?";
      if (formData.selectedServices.includes("inspektion")) return "Welches Objekt soll inspiziert werden?";
      if (formData.selectedServices.includes("beratung")) return "Um welches Objekt geht es?";
      return "Beschreiben Sie das Objekt";
    };

    const steps: any[] = [
      { id: "services", type: "services", question: "Was soll gemacht werden?", description: "Wählen Sie eine oder mehrere Leistungen" },
    ];

    // Dachpflege Info direkt nach Leistungsauswahl (vor Objekt & Adresse)
    if (formData.selectedServices.includes("inspektion")) {
      steps.push(
        { id: "inspektion-info", type: "info", icon: Euro, question: "Professionelle Dachpflege", description: "Individuelle Beratung und Festpreisangebot", infoText: "Unsere Dachdecker-Meister prüfen Ihr Dach gründlich und erstellen einen detaillierten Zustandsbericht. Kontaktieren Sie uns für ein individuelles Angebot." }
      );
    }

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

    if (formData.selectedServices.includes("spenglerei")) {
      // Art der Spenglerarbeiten (Mehrfachauswahl)
      steps.push(
        { id: "spengler-arbeiten", type: "multiselect", field: "spenglerArbeiten", icon: Wrench, question: "Art der Spenglerarbeiten", description: "Mehrfachauswahl möglich", options: [
          { value: "rinne-reinigen", label: "Dachrinne reinigen" },
          { value: "rinne-erneuern", label: "Dachrinne erneuern" },
          { value: "fallrohre", label: "Fallrohre erneuern / ergänzen" },
          { value: "attika", label: "Attika-Abdeckung neu / sanieren" },
          { value: "kamin", label: "Kaminverkleidung erneuern" },
          { value: "gaube", label: "Gaubenverkleidung (Blech)" },
          { value: "anschlussbleche", label: "Anschlussbleche" },
          { value: "blechdach", label: "Blechdach (Stehfalz)" },
          { value: "sonderanfertigung", label: "Sonderanfertigung (Blech)" },
        ]}
      );
      
      // Conditional: If Sonderanfertigung selected, show description field
      if (formData.spenglerArbeiten.includes("sonderanfertigung")) {
        steps.push(
          { id: "spengler-sonder", type: "textarea", field: "spenglerSonderBeschreibung", icon: FileText, question: "Sonderanfertigung beschreiben", description: "Was genau benötigen Sie?", placeholder: "Beschreiben Sie genau was Sie brauchen..." }
        );
      }
      
      // Material (falls bekannt)
      steps.push(
        { id: "spengler-material", type: "select", field: "spenglerMaterial", icon: Wrench, question: "Material (falls bekannt)", description: "Welches Material soll verwendet werden?", options: [
          { value: "zink", label: "Zink" },
          { value: "kupfer", label: "Kupfer" },
          { value: "aluminium", label: "Aluminium" },
          { value: "edelstahl", label: "Edelstahl" },
          { value: "kunststoff", label: "Kunststoff" },
          { value: "unklar", label: "Noch unklar" },
        ]}
      );
      
      // Dachform
      steps.push(
        { id: "spengler-dachform", type: "select", field: "spenglerDachform", icon: Home, question: "Dachform", description: "Welche Dachform hat das Gebäude?", options: [
          { value: "steildach", label: "Steildach" },
          { value: "flachdach", label: "Flachdach" },
          { value: "pultdach", label: "Pultdach" },
          { value: "unbekannt", label: "Unbekannt" },
        ]}
      );
      
      // Höhe / Zugang
      steps.push(
        { id: "spengler-hoehe", type: "select", field: "spenglerHoehe", icon: Building2, question: "Höhe / Zugang", description: "In welcher Höhe befinden sich die Arbeiten?", options: [
          { value: "eg", label: "Erdgeschoss" },
          { value: "1-2og", label: "1.–2. OG" },
          { value: "ueber-2og", label: "> 2. OG" },
          { value: "innenhof", label: "Innenhof schwer zugänglich" },
        ]}
      );
      
      // Gerüst vorhanden?
      steps.push(
        { id: "spengler-geruest", type: "select", field: "spenglerGeruest", icon: Wrench, question: "Gerüst vorhanden?", description: "Ist bereits ein Gerüst aufgestellt?", options: [
          { value: "ja", label: "Ja" },
          { value: "nein", label: "Nein" },
        ]}
      );
      
      // Conditional: If Gerüst = Nein, ask if we should provide it
      if (formData.spenglerGeruest === "nein") {
        steps.push(
          { id: "spengler-geruest-liefern", type: "select", field: "spenglerGeruestLiefern", icon: Wrench, question: "Gerüst durch uns liefern & aufbauen?", description: "Sollen wir das Gerüst stellen?", options: [
            { value: "ja", label: "Ja" },
            { value: "nein", label: "Nein" },
          ]}
        );
      }
      
      // Meterangaben (optional)
      steps.push(
        { id: "spengler-meter", type: "spengler-meter", icon: Ruler, question: "Meterangaben (optional)", description: "Ungefähre Maße für die Kalkulation" }
      );
      
      // Gebäudetyp
      steps.push(
        { id: "spengler-gebaeude", type: "select", field: "buildingType", icon: Building2, question: "Gebäudetyp", description: "Um welche Gebäudeart handelt es sich?", options: [
          { value: "efh", label: "Einfamilienhaus" },
          { value: "mfh", label: "Mehrfamilienhaus" },
          { value: "gewerbe", label: "Gewerbe / Industrie" },
          { value: "garage", label: "Garage / Carport" },
          { value: "sonstige", label: "Sonstiges" },
        ]}
      );
      
      // Fotos hochladen
      steps.push(
        { id: "spengler-upload", type: "upload", icon: Camera, question: "Fotos hochladen", description: "Helfen uns bei der Einschätzung" }
      );
      
      // Dringlichkeit (Spengler-spezifisch)
      steps.push(
        { id: "spengler-dringlichkeit", type: "select", field: "urgency", icon: Clock, question: "Dringlichkeit", description: "Wie schnell benötigen Sie Hilfe?", options: [
          { value: "sofort", label: "Sofort" },
          { value: "diese-woche", label: "Diese Woche" },
          { value: "nicht-dringend", label: "Nicht dringend" },
        ]}
      );
      
      // Freitext
      steps.push(
        { id: "spengler-zusatz", type: "textarea", field: "spenglerZusatzinfos", icon: FileText, question: "Zusatzinfos", description: "Weitere Informationen", placeholder: "Haben Sie noch weitere Informationen oder Wünsche?" }
      );
    }

    if (formData.selectedServices.includes("sturmschaden")) {
      // Art des Sturmschadens (Mehrfachauswahl)
      steps.push(
        { id: "sturmschaden-art", type: "multiselect", field: "sturmschadenArt", icon: AlertTriangle, question: "Art des Sturmschadens", description: "Mehrfachauswahl möglich", options: [
          { value: "ziegel", label: "Dachziegel abgerutscht / fehlen" },
          { value: "blech", label: "Blechverkleidung / Attika gelöst" },
          { value: "rinne", label: "Dachrinne abgerissen" },
          { value: "fallrohr", label: "Fallrohr beschädigt" },
          { value: "kamin", label: "Kaminverkleidung gelöst" },
          { value: "wasser", label: "Wasser dringt ein" },
          { value: "unbekannt", label: "Unbekannt – bitte beurteilen" },
        ]}
      );
      
      // Gefahrensituation
      steps.push(
        { id: "gefahr-wasser", type: "select", field: "gefahrWasser", icon: Droplets, question: "Tritt aktuell Wasser ein?", description: "Gefahrensituation einschätzen", options: [
          { value: "ja", label: "Ja" },
          { value: "nein", label: "Nein" },
        ]},
        { id: "gefahr-lose-teile", type: "select", field: "gefahrLoseTeile", icon: AlertTriangle, question: "Gefahr durch lose Teile?", description: "Z.B. herabfallende Ziegel oder Bleche", options: [
          { value: "ja", label: "Ja" },
          { value: "nein", label: "Nein" },
        ]},
        { id: "gefahr-weitere", type: "select", field: "gefahrWeitereSchaeden", icon: AlertTriangle, question: "Gefahr weiterer Schäden?", description: "Könnten sich die Schäden verschlimmern?", options: [
          { value: "ja", label: "Ja" },
          { value: "nein", label: "Nein" },
        ]},
        { id: "gefahr-beschreibung", type: "input", field: "gefahrBeschreibung", icon: MessageSquare, question: "Beschreiben Sie die Gefahrensituation", description: "Optional: weitere Details zur aktuellen Lage", placeholder: "z.B. Ziegel drohen auf Gehweg zu fallen...", inputType: "text", required: false }
      );
      
      // Zeitpunkt des Schadens
      steps.push(
        { id: "sturmschaden-zeitpunkt", type: "select", field: "sturmschadenZeitpunkt", icon: Clock, question: "Zeitpunkt des Schadens", description: "Wann ist der Schaden entstanden?", options: [
          { value: "heute", label: "Heute" },
          { value: "48h", label: "Letzte 48 Stunden" },
          { value: "mehr-2-tage", label: "Mehr als 2 Tage" },
          { value: "unklar", label: "Unklar" },
        ]}
      );
      
      // Dringlichkeit (Sturmschaden-spezifisch)
      steps.push(
        { id: "sturm-dringlichkeit", type: "select", field: "sturmschadenDringlichkeit", icon: Clock, question: "Dringlichkeit", description: "Wie schnell benötigen Sie Hilfe?", options: [
          { value: "notfall", label: "Notfall (sofort)" },
          { value: "24h", label: "Innerhalb 24h" },
          { value: "2-3-tage", label: "2–3 Tage" },
          { value: "baldmoeglichst", label: "Baldmöglichst" },
        ]}
      );
      
      // Fotos hochladen
      steps.push(
        { id: "sturm-upload", type: "upload", icon: Camera, question: "Fotos hochladen", description: "Helfen uns bei der Einschätzung" }
      );
      
      // Versicherung
      steps.push(
        { id: "versicherung-gemeldet", type: "select", field: "versicherungGemeldet", icon: FileText, question: "Bereits bei Versicherung gemeldet?", description: "Haben Sie den Schaden schon gemeldet?", options: [
          { value: "ja", label: "Ja" },
          { value: "nein", label: "Nein" },
        ]},
        { id: "versicherung-aktennummer", type: "input", field: "versicherungAktennummer", icon: FileText, question: "Aktennummer (optional)", description: "Falls bereits vorhanden", placeholder: "z.B. 2024-12345", inputType: "text", required: false }
      );
      // Sturmschaden: Nach Versicherung direkt zu Kontaktdaten (keine Zusatzinfos, kein Gebäudetyp, etc.)
    }

    if (formData.selectedServices.includes("undicht")) {
      // Wo tritt Wasser ein? (Mehrfachauswahl)
      steps.push(
        { id: "undicht-wo", type: "multiselect", field: "undichtWo", icon: Droplets, question: "Wo tritt Wasser ein?", description: "Mehrfachauswahl möglich", options: [
          { value: "dachfenster", label: "Dachfenster" },
          { value: "gaube", label: "Gaube" },
          { value: "kamin", label: "Kaminbereich" },
          { value: "anschluesse", label: "Anschlüsse / Wandanschluss" },
          { value: "flachdach", label: "Flachdach – Pfützenbildung" },
          { value: "rinne", label: "Rinne übergelaufen" },
          { value: "unbekannt", label: "Unbekannt – Herkunft unklar" },
        ]}
      );
      
      // Wie stark ist der Wassereintritt?
      steps.push(
        { id: "undicht-staerke", type: "select", field: "undichtStaerke", icon: Droplets, question: "Wie stark ist der Wassereintritt?", description: "Beschreiben Sie die Situation", options: [
          { value: "tropfen", label: "Tropfen" },
          { value: "laufend", label: "Laufend" },
          { value: "stark", label: "Starker Wassereintritt" },
          { value: "regen", label: "Nur bei starkem Regen" },
          { value: "unklar", label: "Unklar" },
        ]}
      );
      
      // Seit wann besteht das Problem?
      steps.push(
        { id: "undicht-seit", type: "select", field: "undichtSeit", icon: Clock, question: "Seit wann besteht das Problem?", description: "Hilft uns bei der Einschätzung", options: [
          { value: "kurzem", label: "Erst seit kurzem" },
          { value: "wochen", label: "Wochen" },
          { value: "monate", label: "Monate" },
          { value: "jahr", label: "Länger als 1 Jahr" },
        ]}
      );
      
      // Dachtyp
      steps.push(
        { id: "undicht-dachtyp", type: "select", field: "undichtDachtyp", icon: Home, question: "Dachtyp", description: "Welche Art von Dach haben Sie?", options: [
          { value: "steildach", label: "Steildach" },
          { value: "flachdach", label: "Flachdach" },
          { value: "pultdach", label: "Pultdach" },
          { value: "unbekannt", label: "Nicht bekannt" },
        ]}
      );
      
      // Material vom Dach
      steps.push(
        { id: "undicht-material", type: "select", field: "undichtMaterial", icon: Wrench, question: "Material vom Dach", description: "Woraus besteht Ihr Dach?", options: [
          { value: "ziegel", label: "Ziegel" },
          { value: "betondachstein", label: "Betondachstein" },
          { value: "blech", label: "Blech / Stehfalz" },
          { value: "bitumen", label: "Bitumen" },
          { value: "folie", label: "Folie (Flachdach)" },
          { value: "unbekannt", label: "Nicht bekannt" },
        ]}
      );
      
      // Fotos hochladen mit spezifischen Hinweisen
      steps.push(
        { id: "undicht-upload", type: "upload", icon: Camera, question: "Fotos hochladen", description: "Helfen uns bei der Einschätzung" }
      );
      
      // Dringlichkeit (Undicht-spezifisch)
      steps.push(
        { id: "undicht-dringlichkeit", type: "select", field: "urgency", icon: Clock, question: "Dringlichkeit", description: "Wie schnell benötigen Sie Hilfe?", options: [
          { value: "sofort", label: "Sofort" },
          { value: "24-48h", label: "24–48h" },
          { value: "diese-woche", label: "Diese Woche" },
          { value: "beratung", label: "Beratung ohne Eile" },
        ]}
      );
      
      // Zusatzinfos Freitext
      steps.push(
        { id: "undicht-zusatz", type: "textarea", field: "undichtZusatzinfos", icon: FileText, question: "Zusatzinfos", description: "Bitte beschreiben Sie das Problem in Worten", placeholder: "Beschreiben Sie hier die Situation genauer..." }
      );
    }

    if (formData.selectedServices.includes("inspektion")) {
      steps.push(
        { id: "inspektion-dachgroesse", type: "input", field: "inspektionDachgroesse", icon: Ruler, question: "Wie groß ist Ihr Dach?", description: "Ungefähre Dachfläche in m²", placeholder: "z.B. 150", inputType: "number", suffix: "m²" },
        { id: "inspektion-gebaeude", type: "select", field: "buildingType", icon: Building2, question: "Welcher Gebäudetyp?", description: "Wählen Sie Ihren Gebäudetyp", options: [
          { value: "efh", label: "Einfamilienhaus" },
          { value: "mfh", label: "Mehrfamilienhaus" },
          { value: "gewerbe", label: "Gewerbe / Industrie" },
          { value: "garage", label: "Garage / Carport" },
          { value: "sonstige", label: "Sonstiges" },
        ]},
        { id: "inspektion-termin", type: "calendar", field: "inspektionTermin", icon: Calendar, question: "Wann passt es Ihnen?", description: "Wählen Sie einen freien Termin aus unserem Kalender" }
      );
    }

    if (formData.selectedServices.includes("beratung")) {
      steps.push(
        { id: "beratung-thema", type: "select", field: "beratungThema", icon: HelpCircle, question: "Worum geht es bei der Beratung?", description: "Wählen Sie ein Thema", options: [
          { value: "zustand", label: "Zustand meines Daches prüfen" },
          { value: "kosten", label: "Kosten für Reparatur/Sanierung" },
          { value: "material", label: "Materialberatung (Ziegel, Blech, etc.)" },
          { value: "energie", label: "Dämmung / Energieeffizienz" },
          { value: "sonstiges", label: "Sonstiges Anliegen" },
        ]},
        { id: "beratung-details", type: "textarea", field: "beratungDetails", icon: MessageSquare, question: "Erzählen Sie uns mehr", description: "Was möchten Sie wissen? Beschreiben Sie Ihr Haus und Dach", placeholder: "z.B. Einfamilienhaus, Satteldach ca. 20 Jahre alt, möchte wissen ob Sanierung nötig..." }
      );
    }

    if (formData.selectedServices.includes("sanierung")) {
      // Dachart
      steps.push(
        { id: "sanierung-dachart", type: "select", field: "sanierungDachart", icon: Home, question: "Welche Dachart soll saniert werden?", description: "Art des Daches", options: [
          { value: "steildach", label: "Steildach" },
          { value: "flachdach", label: "Flachdach" },
          { value: "pultdach", label: "Pultdach" },
          { value: "kombination", label: "Kombination" },
        ]}
      );
      
      // Sanierungsziel (Mehrfachauswahl)
      steps.push(
        { id: "sanierung-ziele", type: "multiselect", field: "sanierungZiele", icon: Wrench, question: "Sanierungsziel", description: "Mehrfachauswahl möglich", options: [
          { value: "eindeckung", label: "Komplett neue Eindeckung" },
          { value: "daemmung", label: "Wärmedämmung erneuern" },
          { value: "dachfenster", label: "Austausch Dachfenster" },
          { value: "spengler", label: "Neue Spenglerarbeiten" },
          { value: "abdichtung", label: "Dachabdichtung erneuern (Flachdach)" },
          { value: "unterspannbahn", label: "Neue Unterspannbahn" },
          { value: "schaden", label: "Sanierung nach Schaden" },
          { value: "optik", label: "Optische Erneuerung" },
          { value: "pv", label: "PV-Anlage vorbereiten" },
        ]}
      );
      
      // Dachfläche (geschätzt)
      steps.push(
        { id: "sanierung-flaeche", type: "select", field: "sanierungFlaeche", icon: Ruler, question: "Dachfläche (geschätzt)", description: "Ungefähre Größe Ihres Daches", options: [
          { value: "unter-80", label: "< 80 m²" },
          { value: "80-150", label: "80–150 m²" },
          { value: "150-250", label: "150–250 m²" },
          { value: "ueber-250", label: "> 250 m²" },
          { value: "unbekannt", label: "Unbekannt" },
        ]}
      );
      
      // Materialwunsch (Mehrfachauswahl)
      steps.push(
        { id: "sanierung-material", type: "multiselect", field: "sanierungMaterial", icon: Wrench, question: "Materialwunsch", description: "Mehrfachauswahl möglich", options: [
          { value: "tonziegel", label: "Tonziegel" },
          { value: "betondachstein", label: "Betondachstein" },
          { value: "blech", label: "Blech / Stehfalz" },
          { value: "bitumen", label: "Bitumen (Flachdach)" },
          { value: "folie", label: "Folie / PVC / EPDM" },
          { value: "unklar", label: "Noch unklar – bitte beraten" },
        ]}
      );
      
      // Besteht aktuell ein Schaden am Dach?
      steps.push(
        { id: "sanierung-schaden", type: "select", field: "sanierungSchaden", icon: AlertTriangle, question: "Besteht aktuell ein Schaden am Dach?", description: "Gibt es bestehende Probleme?", options: [
          { value: "nein", label: "Nein" },
          { value: "ja", label: "Ja" },
        ]}
      );
      
      // Wenn Schaden ja, dann Beschreibung
      if (formData.sanierungSchaden === "ja") {
        steps.push(
          { id: "sanierung-schaden-beschreibung", type: "textarea", field: "sanierungSchadenBeschreibung", icon: FileText, question: "Schadensbeschreibung", description: "Bitte beschreiben Sie den Schaden", placeholder: "Beschreiben Sie hier den bestehenden Schaden..." }
        );
      }
      
      // Fotos hochladen
      steps.push(
        { id: "sanierung-upload", type: "upload", icon: Camera, question: "Fotos hochladen", description: "Helfen uns bei der Einschätzung" }
      );
      
      // Freitextfeld
      steps.push(
        { id: "sanierung-zusatz", type: "textarea", field: "sanierungZusatzinfos", icon: FileText, question: "Zusatzinfos", description: "Weitere Informationen zur Sanierung", placeholder: "Haben Sie noch weitere Informationen oder Wünsche?" }
      );
      
      // Budget speziell für Sanierung
      steps.push(
        { id: "sanierung-budget", type: "select", field: "budgetRahmen", icon: Wallet, question: "Haben Sie einen Budgetrahmen im Kopf?", description: "Hilft uns bei der Planung", options: [
          { value: "bis-10000", label: "Bis 10.000 €" },
          { value: "10000-15000", label: "10.000 – 15.000 €" },
          { value: "20000-30000", label: "20.000 – 30.000 €" },
          { value: "mehr-35000", label: "Mehr als 35.000 €" },
        ]}
      );
      
      // Zeitplan (direkt vor Kontaktdaten)
      steps.push(
        { id: "sanierung-zeitplan", type: "select", field: "sanierungZeitplan", icon: Calendar, question: "Zeitplan", description: "Wann soll die Sanierung erfolgen?", options: [
          { value: "sofort", label: "Sofort" },
          { value: "3-monate", label: "In 3 Monaten" },
          { value: "6-monate", label: "In 6 Monaten" },
          { value: "flexibel", label: "Termin flexibel" },
        ]}
      );
    }

    // Gebäudetyp (nicht bei Sturmschaden, Undicht, Sanierung - dort eigene Dachtyp-Fragen)
    if (!formData.selectedServices.includes("sturmschaden") && !formData.selectedServices.includes("undicht") && !formData.selectedServices.includes("sanierung")) {
      steps.push(
        { id: "building", type: "select", field: "buildingType", icon: Building2, question: "Welcher Gebäudetyp?", description: "Wählen Sie Ihren Gebäudetyp", options: [
          { value: "einfamilienhaus", label: "Einfamilienhaus" },
          { value: "mehrfamilienhaus", label: "Mehrfamilienhaus" },
          { value: "gewerbe", label: "Gewerbegebäude" },
          { value: "garage", label: "Garage / Carport" },
          { value: "sonstige", label: "Sonstiges" },
        ]}
      );
    }

    // Bilder-Upload für relevante Services (nicht bei Beratung, Sturmschaden, Undicht, Sanierung, Spenglerei - dort eigener Upload)
    if (!formData.selectedServices.includes("beratung") && !formData.selectedServices.includes("sturmschaden") && !formData.selectedServices.includes("undicht") && !formData.selectedServices.includes("sanierung") && !formData.selectedServices.includes("spenglerei")) {
      steps.push(
        { id: "fotos", type: "upload", icon: Camera, question: "Haben Sie Fotos?", description: "Optional: Laden Sie Bilder hoch (max. 5 Dateien, je 10 MB)" }
      );
    }

    // Dringlichkeit mit erweiterten Optionen (nicht bei Sturmschaden, Undicht, Sanierung, Spenglerei, Beratung - dort eigene oder nicht relevant)
    if (!formData.selectedServices.includes("sturmschaden") && !formData.selectedServices.includes("undicht") && !formData.selectedServices.includes("sanierung") && !formData.selectedServices.includes("spenglerei") && !formData.selectedServices.includes("beratung")) {
      steps.push(
        { id: "urgency", type: "select", field: "urgency", icon: Clock, question: "Wie dringend ist der Auftrag?", description: "Wählen Sie die gewünschte Reaktionszeit", options: [
          { value: "notfall", label: "Notfall (sofortige Hilfe nötig)" },
          { value: "1-woche", label: "Innerhalb von 1 Woche" },
          { value: "4-wochen", label: "Innerhalb von 4 Wochen" },
          { value: "flexibel", label: "Termin flexibel" },
        ]}
      );
    }

    // Was wünschen Sie? (nicht bei Inspektion, Sturmschaden, Undicht, Sanierung, Spenglerei)
    if (!formData.selectedServices.includes("inspektion") && !formData.selectedServices.includes("sturmschaden") && !formData.selectedServices.includes("undicht") && !formData.selectedServices.includes("sanierung") && !formData.selectedServices.includes("spenglerei")) {
      steps.push(
        { id: "angebot-art", type: "select", field: "gewuenschtesAngebot", icon: FileText, question: "Was wünschen Sie zunächst?", description: "Art der gewünschten Leistung", options: [
          { value: "kostenschaetzung", label: "Nur eine grobe Kostenschätzung" },
          { value: "angebot", label: "Ein verbindliches Angebot nach Vor-Ort-Termin" },
          { value: "beratung", label: "Eine Vor-Ort-Beratung mit Alternativen" },
        ]}
      );
    }

    
    steps.push(
      { id: "contact-info", type: "contact", icon: User, question: "Ihre Kontaktdaten", description: "Für Rückruf und Terminvereinbarung" },
      { id: "summary", type: "summary", icon: Check, question: "Zusammenfassung", description: "Bitte überprüfen Sie Ihre Angaben" }
    );

    return steps;
  }, [formData.selectedServices, formData.sturmschadenArt, formData.sanierungSchaden, formData.spenglerArbeiten, formData.spenglerGeruest]);

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
    if (currentStepData.type === "spengler-meter") return true; // Optional
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
      return formData.name !== "" && formData.phone !== "" && formData.postalCode !== "";
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
                Vielen Dank, <span className="font-semibold">{formData.name}</span>! Wir melden uns schnellstmöglich bei Ihnen.
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
              <Button variant="outline" onClick={() => { setIsSubmitted(false); setStep(1); setFormData({ selectedServices: [], objektBeziehung: "", objektBeschreibung: "", objektStrasse: "", objektPlzOrt: "", objektEtage: "", spenglerArbeiten: [], spenglerMaterial: "", spenglerDachform: "", spenglerHoehe: "", spenglerGeruest: "", spenglerGeruestLiefern: "", spenglerRinnenLaenge: "", spenglerFallrohreAnzahl: "", spenglerAttikaLaenge: "", spenglerZusatzinfos: "", spenglerSonderBeschreibung: "", sturmschadenArt: [], gefahrWasser: "", gefahrLoseTeile: "", gefahrWeitereSchaeden: "", gefahrBeschreibung: "", sturmschadenZeitpunkt: "", sturmschadenDringlichkeit: "", versicherungGemeldet: "", versicherungAktennummer: "", zusatzinfos: "", undichtWo: [], undichtStaerke: "", undichtSeit: "", undichtDachtyp: "", undichtMaterial: "", undichtZusatzinfos: "", dachrinneHorizontal: "", dachrinneVertikal: "", inspektionTermin: "", inspektionTerminFormatted: "", inspektionDachgroesse: "", dachgroesse: "", beratungArt: "", beratungThema: "", beratungDetails: "", sanierungDachart: "", sanierungZiele: [], sanierungFlaeche: "", sanierungMaterial: [], sanierungSchaden: "", sanierungSchadenBeschreibung: "", sanierungZeitplan: "", sanierungZusatzinfos: "", buildingType: "", urgency: "", gewuenschtesAngebot: "", budgetRahmen: "", uploadedFiles: [], name: "", phone: "", email: "", address: "", postalCode: "", city: "", stadtteil: "", message: "" }); }} data-testid="button-new-request">
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
                  {formData.selectedServices.includes("sturmschaden") ? (
                    <ul className="list-disc list-inside space-y-1">
                      <li>Nahaufnahme des Schadens</li>
                      <li>Übersichtsfoto vom Dach</li>
                      <li>Innenraum bei Wassereintritt</li>
                      <li>Lose Teile / Gefahrenstellen</li>
                    </ul>
                  ) : formData.selectedServices.includes("undicht") ? (
                    <ul className="list-disc list-inside space-y-1">
                      <li>Innenbereich (Wasserstelle)</li>
                      <li>Außenbereich (Dach)</li>
                      <li>Dachfenster / Kamin</li>
                      <li>Gesamtansicht</li>
                    </ul>
                  ) : formData.selectedServices.includes("sanierung") ? (
                    <ul className="list-disc list-inside space-y-1">
                      <li>Dach gesamt</li>
                      <li>Schadstellen</li>
                      <li>Dachfenster / Gauben</li>
                      <li>Umgebung / Zugang</li>
                    </ul>
                  ) : formData.selectedServices.includes("spenglerei") ? (
                    <ul className="list-disc list-inside space-y-1">
                      <li>Dachrinne / Fallrohre</li>
                      <li>Attika / Verkleidung</li>
                      <li>Gebäudeansicht (Höhe)</li>
                      <li>Details / Schadstellen</li>
                    </ul>
                  ) : (
                    <ul className="list-disc list-inside space-y-1">
                      <li>Nahaufnahme der Schadstelle</li>
                      <li>Totale vom Dach / Fassade</li>
                      <li>Ggf. Pläne / Skizzen</li>
                    </ul>
                  )}
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

            {currentStepData?.type === "spengler-meter" && (
              <div data-testid="form-step-spengler-meter">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Ruler className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{currentStepData.question}</h3>
                  <p className="text-muted-foreground">{currentStepData.description}</p>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="spenglerRinnenLaenge" className="text-sm font-medium mb-2 block">Länge Dachrinne (lfm)</Label>
                    <Input
                      id="spenglerRinnenLaenge"
                      type="text"
                      value={formData.spenglerRinnenLaenge}
                      onChange={(e) => handleInputChange("spenglerRinnenLaenge", e.target.value)}
                      placeholder="z.B. 25"
                      className="text-lg"
                      data-testid="input-spengler-rinnen-laenge"
                    />
                  </div>
                  <div>
                    <Label htmlFor="spenglerFallrohreAnzahl" className="text-sm font-medium mb-2 block">Anzahl Fallrohre</Label>
                    <Input
                      id="spenglerFallrohreAnzahl"
                      type="text"
                      value={formData.spenglerFallrohreAnzahl}
                      onChange={(e) => handleInputChange("spenglerFallrohreAnzahl", e.target.value)}
                      placeholder="z.B. 4"
                      className="text-lg"
                      data-testid="input-spengler-fallrohre-anzahl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="spenglerAttikaLaenge" className="text-sm font-medium mb-2 block">Attika-Länge (lfm)</Label>
                    <Input
                      id="spenglerAttikaLaenge"
                      type="text"
                      value={formData.spenglerAttikaLaenge}
                      onChange={(e) => handleInputChange("spenglerAttikaLaenge", e.target.value)}
                      placeholder="z.B. 15"
                      className="text-lg"
                      data-testid="input-spengler-attika-laenge"
                    />
                  </div>
                </div>
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
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Max Mustermann"
                      data-testid="input-name"
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
                  <div>
                    <label className="block text-sm font-medium mb-2">PLZ / Ort</label>
                    <Input
                      value={formData.objektPlzOrt}
                      onChange={(e) => handleInputChange("objektPlzOrt", e.target.value)}
                      placeholder="z.B. "
                      data-testid="input-objektPlzOrt"
                    />
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
                      placeholder="z.B. Dachgeschoss, 3. OG, Anbau"
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

                    {(formData.objektStrasse || formData.objektPlzOrt) && (
                      <div className="border-b pb-3">
                        <div className="text-sm text-muted-foreground mb-1">Objekt & Adresse</div>
                        {formData.objektBeschreibung && <div className="font-medium">{formData.objektBeschreibung}</div>}
                        <div className="text-sm mt-1">
                          {formData.objektStrasse && <div>{formData.objektStrasse}</div>}
                          {formData.objektPlzOrt && <div>{formData.objektPlzOrt}</div>}
                          {formData.objektEtage && <div className="text-muted-foreground">Etage/Lage: {formData.objektEtage}</div>}
                        </div>
                      </div>
                    )}

                    {formData.selectedServices.includes("spenglerei") && formData.spenglerArbeiten.length > 0 && (
                      <div className="border-b pb-3">
                        <div className="text-sm text-muted-foreground mb-1">Spenglerarbeiten</div>
                        <div className="font-medium">
                          {formData.spenglerArbeiten.map(v => getLabelForValue("spenglerArbeiten", v)).join(", ")}
                        </div>
                        {formData.spenglerSonderBeschreibung && <div className="text-sm mt-1 bg-muted/50 p-2 rounded">Sonderanfertigung: {formData.spenglerSonderBeschreibung}</div>}
                        {formData.spenglerMaterial && <div className="text-sm mt-1">Material: {getLabelForValue("spenglerMaterial", formData.spenglerMaterial)}</div>}
                        {formData.spenglerDachform && <div className="text-sm mt-1">Dachform: {getLabelForValue("spenglerDachform", formData.spenglerDachform)}</div>}
                        {formData.spenglerHoehe && <div className="text-sm mt-1">Höhe/Zugang: {getLabelForValue("spenglerHoehe", formData.spenglerHoehe)}</div>}
                        {formData.spenglerGeruest && (
                          <div className="text-sm mt-1">
                            Gerüst vorhanden: {formData.spenglerGeruest === "ja" ? "Ja" : "Nein"}
                            {formData.spenglerGeruest === "nein" && formData.spenglerGeruestLiefern && (
                              <span> | Gerüst durch uns: {formData.spenglerGeruestLiefern === "ja" ? "Ja" : "Nein"}</span>
                            )}
                          </div>
                        )}
                        {(formData.spenglerRinnenLaenge || formData.spenglerFallrohreAnzahl || formData.spenglerAttikaLaenge) && (
                          <div className="text-sm mt-1">
                            Maße: {formData.spenglerRinnenLaenge && `Rinne ${formData.spenglerRinnenLaenge} lfm`}
                            {formData.spenglerFallrohreAnzahl && ` | ${formData.spenglerFallrohreAnzahl} Fallrohre`}
                            {formData.spenglerAttikaLaenge && ` | Attika ${formData.spenglerAttikaLaenge} lfm`}
                          </div>
                        )}
                        {formData.spenglerZusatzinfos && <div className="text-sm mt-1 text-muted-foreground">{formData.spenglerZusatzinfos}</div>}
                      </div>
                    )}
                    
                    {formData.selectedServices.includes("sturmschaden") && (
                      <div className="border-b pb-3">
                        <div className="text-sm text-muted-foreground mb-1">Sturmschaden</div>
                        {formData.sturmschadenArt.length > 0 && (
                          <div className="font-medium">
                            {formData.sturmschadenArt.map(v => getLabelForValue("sturmschadenArt", v)).join(", ")}
                          </div>
                        )}
                        <div className="text-sm mt-2 space-y-1">
                          <div>Gefahrensituation:</div>
                          <div className="ml-2">
                            Wassereintritt: {formData.gefahrWasser === "ja" ? "Ja" : "Nein"}
                            {" | "}Lose Teile: {formData.gefahrLoseTeile === "ja" ? "Ja" : "Nein"}
                            {" | "}Weitere Gefahr: {formData.gefahrWeitereSchaeden === "ja" ? "Ja" : "Nein"}
                          </div>
                          {formData.gefahrBeschreibung && <div className="ml-2 text-muted-foreground">{formData.gefahrBeschreibung}</div>}
                        </div>
                        {formData.sturmschadenZeitpunkt && (
                          <div className="text-sm mt-1">Zeitpunkt: {getLabelForValue("sturmschadenZeitpunkt", formData.sturmschadenZeitpunkt)}</div>
                        )}
                        {formData.sturmschadenDringlichkeit && (
                          <div className="text-sm mt-1">Dringlichkeit: {getLabelForValue("sturmschadenDringlichkeit", formData.sturmschadenDringlichkeit)}</div>
                        )}
                        {formData.versicherungGemeldet && (
                          <div className="text-sm mt-1">
                            Versicherung: {formData.versicherungGemeldet === "ja" ? "Bereits gemeldet" : "Noch nicht gemeldet"}
                            {formData.versicherungAktennummer && ` (Aktenr.: ${formData.versicherungAktennummer})`}
                          </div>
                        )}
                        {formData.zusatzinfos && <div className="text-sm mt-1 text-muted-foreground">Zusatz: {formData.zusatzinfos}</div>}
                      </div>
                    )}

                    {formData.selectedServices.includes("undicht") && (
                      <div className="border-b pb-3">
                        <div className="text-sm text-muted-foreground mb-1">Undichtes Dach</div>
                        {formData.undichtWo.length > 0 && (
                          <div className="font-medium">Wassereintritt: {formData.undichtWo.map(v => getLabelForValue("undichtWo", v)).join(", ")}</div>
                        )}
                        {formData.undichtStaerke && (
                          <div className="text-sm mt-1">Stärke: {getLabelForValue("undichtStaerke", formData.undichtStaerke)}</div>
                        )}
                        {formData.undichtSeit && (
                          <div className="text-sm mt-1">Seit: {getLabelForValue("undichtSeit", formData.undichtSeit)}</div>
                        )}
                        {formData.undichtDachtyp && (
                          <div className="text-sm mt-1">Dachtyp: {getLabelForValue("undichtDachtyp", formData.undichtDachtyp)}</div>
                        )}
                        {formData.undichtMaterial && (
                          <div className="text-sm mt-1">Material: {getLabelForValue("undichtMaterial", formData.undichtMaterial)}</div>
                        )}
                        {formData.undichtZusatzinfos && (
                          <div className="text-sm mt-1 text-muted-foreground">Zusatz: {formData.undichtZusatzinfos}</div>
                        )}
                      </div>
                    )}

                    {formData.selectedServices.includes("inspektion") && (
                      <div className="border-b pb-3">
                        <div className="text-sm text-muted-foreground mb-1">Dachpflege & Wartung</div>
                        <div className="font-medium">Termin: {formData.inspektionTerminFormatted || formData.inspektionTermin}</div>
                        {formData.inspektionDachgroesse && <div className="font-medium">Dachgröße: ca. {formData.inspektionDachgroesse} m²</div>}
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

                    {formData.selectedServices.includes("sanierung") && (
                      <div className="border-b pb-3">
                        <div className="text-sm text-muted-foreground mb-1">Dachsanierung</div>
                        {formData.sanierungDachart && (
                          <div className="font-medium">Dachart: {getLabelForValue("sanierungDachart", formData.sanierungDachart)}</div>
                        )}
                        {formData.sanierungZiele.length > 0 && (
                          <div className="text-sm mt-1">Ziele: {formData.sanierungZiele.map(v => getLabelForValue("sanierungZiele", v)).join(", ")}</div>
                        )}
                        {formData.sanierungFlaeche && (
                          <div className="text-sm mt-1">Fläche: {getLabelForValue("sanierungFlaeche", formData.sanierungFlaeche)}</div>
                        )}
                        {formData.sanierungMaterial.length > 0 && (
                          <div className="text-sm mt-1">Material: {formData.sanierungMaterial.map(v => getLabelForValue("sanierungMaterial", v)).join(", ")}</div>
                        )}
                        {formData.sanierungSchaden && (
                          <div className="text-sm mt-1">Schaden: {formData.sanierungSchaden === "ja" ? `Ja - ${formData.sanierungSchadenBeschreibung || ""}` : "Nein"}</div>
                        )}
                        {formData.sanierungZeitplan && (
                          <div className="text-sm mt-1">Zeitplan: {getLabelForValue("sanierungZeitplan", formData.sanierungZeitplan)}</div>
                        )}
                        {formData.sanierungZusatzinfos && (
                          <div className="text-sm mt-1 text-muted-foreground">Zusatz: {formData.sanierungZusatzinfos}</div>
                        )}
                      </div>
                    )}

                    {!formData.selectedServices.includes("sturmschaden") && (
                      <div>
                        <div className="text-sm text-muted-foreground">Gebäudetyp</div>
                        <div className="font-medium">{getLabelForValue("buildingType", formData.buildingType) || "-"}</div>
                      </div>
                    )}
                    
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
                      <div><div className="text-sm text-muted-foreground">Name</div><div className="font-medium">{formData.name}</div></div>
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
                  Weiter<ArrowRight className="w-4 h-4 ml-2" />
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
