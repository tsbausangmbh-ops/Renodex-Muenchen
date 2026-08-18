import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MapPin, Clock, Shield, Coins, Phone, Wrench, Home } from "lucide-react";

const faqItems = [
  { 
    icon: Clock,
    question: "Wie schnell sind Sie bei einem Dach-Notfall vor Ort?", 
    answer: "Bei Notfällen wie Sturmschäden oder Wassereintritt sind wir innerhalb von 24 Stunden bei Ihnen in München. Unser Dach Sofort-Hilfe ist 24/7 erreichbar – auch nachts und am Wochenende. Bei akuten Leckagen oft schon nach 2-4 Stunden." 
  },
  { 
    icon: Shield,
    question: "Übernimmt die Versicherung Sturmschäden am Dach?", 
    answer: "In den meisten Fällen ja. Die Wohngebäudeversicherung deckt Sturmschäden ab Windstärke 8. Wir dokumentieren alle Schäden professionell mit Fotos und übernehmen auf Wunsch die komplette Versicherungsabwicklung – von der Schadensmeldung bis zur Freigabe." 
  },
  { 
    icon: Coins,
    question: "Was kostet eine Dachreparatur in München?", 
    answer: "Kleine Reparaturen wie einzelne Ziegel austauschen kosten ab 93 €, kleinere Leckagen abdichten ab 175-360 €, Dachrinnenreparaturen ab 118 €. Bei Sofort-Hilfe-Einsätzen kommt ein Zuschlag von ca. 93-118 € hinzu. Wir nennen Ihnen vorab einen Festpreis – keine versteckten Kosten." 
  },
  { 
    icon: Coins,
    question: "Was kostet eine Dachsanierung in München?", 
    answer: "Eine Dachsanierung in München kostet je nach Umfang zwischen 93-592 €/m². Neueindeckung ohne Dämmung: 93-175 €/m², mit Wärmedämmung: 175-299 €/m², Komplettsanierung: 299-592 €/m². Bei einem 150 m² Dach entspricht das ca. 13.950-88.580 €. Wir erstellen Ihnen ein unverbindliches Festpreis-Angebot." 
  },
  { 
    icon: Shield,
    question: "Welche Garantie geben Sie auf Ihre Dacharbeiten?", 
    answer: "Auf alle unsere Dacharbeiten geben wir mindestens 5 Jahre Gewährleistung. Auf Abdichtungsarbeiten und hochwertige Materialien wie Kupfer oder Titanzink sogar bis zu 10 Jahre. Sollte innerhalb der Garantiezeit etwas nicht stimmen, beheben wir es kostenlos." 
  },
  { 
    icon: MapPin,
    question: "In welchen Gebieten um München sind Sie tätig?", 
    answer: "Wir arbeiten in ganz München und im Umkreis von bis zu 25 km: München-Allach, Untermenzing, Pasing, Obermenzing, Moosach, Bogenhausen, Schwabing, Sendling sowie Grünwald, Puchheim, Gräfelfing, Planegg, Germering, Unterschleißheim, Garching, Ottobrunn und Haar." 
  },
  { 
    icon: Wrench,
    question: "Was kostet eine Dachreparatur bei undichtem Dach?", 
    answer: "Kleine Reparaturen wie einzelne Ziegel austauschen kosten ab 93 €, kleinere Leckagen abdichten ab 175-360 €, Dachrinnenreparaturen ab 118 €. Bei Sofort-Hilfe-Einsätzen kommt ein Zuschlag von ca. 93-118 € hinzu. Wir nennen Ihnen vorab einen Festpreis – keine versteckten Kosten." 
  },
  { 
    icon: Home,
    question: "Bieten Sie auch Spenglerei-Arbeiten in München an?", 
    answer: "Ja, wir sind Dachdecker- und Spenglermeister. Wir fertigen und montieren Dachrinnen, Fallrohre, Kaminverkleidungen und Blecharbeiten in Kupfer, Zink, Aluminium oder Edelstahl. Ob Neuinstallation, Reparatur oder Sonderanfertigung – alles aus einer Hand." 
  },
  { 
    icon: Phone,
    question: "Wie erreiche ich Renodex für ein kostenloses Angebot?", 
    answer: "Rufen Sie uns an unter [Telefon folgt] oder senden Sie uns eine Anfrage über das Kontaktformular. Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag für die kostenlose Vor-Ort-Beratung. Danach erhalten Sie ein unverbindliches Festpreis-Angebot." 
  },
];

export default function FAQSection() {
  return (
    <section className="py-6 md:py-8 bg-zinc-900" id="faq" data-testid="section-faq">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-full text-xs font-medium mb-2">
            <HelpCircle className="w-3 h-3 text-primary" />
            Häufige Fragen
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-white">
            FAQ – Dachdecker München
          </h2>
          <p className="text-white/70 text-sm">
            Fragen zu <strong>Kosten</strong>, <strong>Ablauf</strong> und <strong>Sofort-Hilfe</strong>.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-1.5">
          {faqItems.slice(0, 6).map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              data-testid={`faq-item-${index}`}
              className="border border-white/15 rounded-md px-3 bg-zinc-800"
            >
              <AccordionTrigger className="text-xs hover:no-underline py-3 gap-2 text-white">
                <div className="flex items-center gap-2 text-left">
                  <item.icon className="w-3 h-3 text-primary flex-shrink-0" />
                  <span className="font-medium">{item.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-white/70 text-xs pb-3 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-4 text-center text-xs text-white/70">
          <p>
            Mehr Fragen? <strong className="text-white">[Telefon folgt]</strong> – 
            <a href="/faq" className="text-primary ml-1">Vollständige FAQ</a>
          </p>
        </div>
      </div>
    </section>
  );
}
