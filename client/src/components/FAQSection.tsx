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
    question: "Wie läuft eine Komplettsanierung bei Renodex ab?",
    answer: "Nach einer kostenlosen Vor-Ort-Beratung erstellen wir ein Festpreis-Angebot für alle beteiligten Gewerke – Sanitär, Heizung, Elektro und Ausbau. Anschließend koordinieren wir die Handwerker so, dass ein Gewerk nach dem anderen ohne unnötige Wartezeit dazwischen läuft. Sie haben während der gesamten Sanierung einen festen Ansprechpartner."
  },
  {
    icon: Coins,
    question: "Was kostet eine Komplettsanierung in München?",
    answer: "Das hängt stark vom Umfang ab – ob nur ein Bad, eine ganze Wohnung oder ein Haus saniert wird, und ob Heizung oder Elektro mit erneuert werden. Nach der kostenlosen Vor-Ort-Beratung nennen wir Ihnen einen verbindlichen Festpreis, keine vagen Schätzungen und keine versteckten Nachforderungen."
  },
  {
    icon: Wrench,
    question: "Übernehmen Sie auch einzelne Gewerke, nicht nur Komplettsanierungen?",
    answer: "Ja. Sie können einzelne Leistungen wie Sanitär, Heizung oder Elektro getrennt beauftragen, oder alles zusammen als Komplettsanierung. Das Partnernetzwerk stimmt sich in beiden Fällen ab, damit nichts doppelt gemacht wird."
  },
  {
    icon: Shield,
    question: "Welche Garantie geben Sie auf Ihre Arbeiten?",
    answer: "Auf unsere Sanierungsarbeiten geben wir Gewährleistung nach den gesetzlichen Vorgaben. Details zur konkreten Garantiedauer je Gewerk klären wir im persönlichen Angebot, da sie je nach Material und Leistung unterschiedlich ausfällt."
  },
  {
    icon: Home,
    question: "Lohnt sich der Umstieg auf eine Wärmepumpe?",
    answer: "Das hängt von Ihrem Gebäude, der bestehenden Heizung und der aktuellen Förderlage ab. Wir schauen uns Ihre Situation vor Ort an und geben Ihnen eine ehrliche Einschätzung zu Aufwand, Kosten und möglicher KfW/BAFA-Förderung – ohne Sie zu einer Entscheidung zu drängen."
  },
  {
    icon: MapPin,
    question: "In welchen Gebieten um München sind Sie tätig?",
    answer: "Wir arbeiten in ganz München und im Umkreis von bis zu 25 km: München-Allach, Untermenzing, Pasing, Obermenzing, Moosach, Bogenhausen, Schwabing, Sendling sowie Grünwald, Puchheim, Gräfelfing, Planegg, Germering, Unterschleißheim, Garching, Ottobrunn und Haar."
  },
  {
    icon: Phone,
    question: "Wie erreiche ich Renodex für ein kostenloses Angebot?",
    answer: "Senden Sie uns eine Anfrage über das Kontaktformular oder schreiben Sie uns an info@renodex.de. Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag für die kostenlose Vor-Ort-Beratung. Danach erhalten Sie ein unverbindliches Festpreis-Angebot."
  },
];

export default function FAQSection() {
  return (
    <section className="bg-zinc-900 py-12 md:py-16" id="faq" data-testid="section-faq">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-full text-xs font-medium mb-2">
            <HelpCircle className="w-3 h-3 text-primary" />
            Häufige Fragen
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-white">
            FAQ – Sanierung & Renovierung München
          </h2>
          <p className="text-white/70 text-sm">
            Fragen zu <strong>Ablauf</strong>, <strong>Kosten</strong> und <strong>Gewerken</strong>.
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
            Mehr Fragen?
            <a href="/faq" className="text-primary ml-1">Vollständige FAQ</a>
          </p>
        </div>
      </div>
    </section>
  );
}
