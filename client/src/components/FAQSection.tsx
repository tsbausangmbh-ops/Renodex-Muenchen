import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MapPin, Clock, Shield, Coins, Mail, Wrench, Home } from "lucide-react";

const faqItems = [
  {
    icon: Clock,
    question: "Wie läuft eine Komplettsanierung bei Renodex ab?",
    answer: "Sie fragen digital mit Fotos an. Nach der Besichtigung erstellt Renodex ein Festpreisangebot, bei mehreren Gewerken als Gesamtpaket – Sanitär, Heizung, Elektro und Ausbau. Anschließend koordinieren wir die Handwerker so, dass ein Gewerk nach dem anderen ohne unnötige Wartezeit dazwischen läuft. Sie haben während der gesamten Sanierung einen festen Ansprechpartner."
  },
  {
    icon: Coins,
    question: "Was kostet eine Komplettsanierung in München?",
    answer: "Das hängt stark vom Umfang ab – ob nur ein Bad, eine ganze Wohnung oder ein Haus saniert wird, und ob Heizung oder Elektro mit erneuert werden. Nach Ihrer digitalen Anfrage und der Besichtigung nennen wir Ihnen einen verbindlichen Festpreis für den beschriebenen Umfang, keine vagen Schätzungen."
  },
  {
    icon: Wrench,
    question: "Übernehmen Sie auch einzelne Gewerke, nicht nur Komplettsanierungen?",
    answer: "Ja. Sie können einzelne Leistungen wie Sanitär, Heizung oder Elektro getrennt beauftragen, oder alles zusammen als Komplettsanierung. Das Partnernetzwerk stimmt sich in beiden Fällen ab, damit nichts doppelt gemacht wird."
  },
  {
    icon: Shield,
    question: "Wer übernimmt die Gewährleistung für die Arbeiten?",
    answer: "Die Arbeiten führt eine eingetragene Fachfirma aus. Den Vertrag über die Bauleistung schließen Sie wahlweise mit Renodex, auch als Gesamtpaket zu einem Festpreis, oder direkt mit der ausführenden Fachfirma. Renodex koordiniert in beiden Fällen. Die gesetzliche Gewährleistung besteht gegenüber Ihrem Vertragspartner."
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
    icon: Mail,
    question: "Wie erreiche ich Renodex für ein kostenloses Angebot?",
    answer: "Senden Sie uns eine Anfrage mit Fotos über das Kontaktformular oder schreiben Sie uns an info@renodex.de. Wir melden uns per E-Mail mit einem Terminvorschlag für die Besichtigung. Danach erhalten Sie von Renodex ein unverbindliches Festpreisangebot."
  },
];

export default function FAQSection() {
  return (
    <section className="bg-zinc-900 py-12 md:py-16" id="faq" data-testid="section-faq">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 bg-marine/10 px-2 py-1 rounded-full text-xs font-medium mb-2">
            <HelpCircle className="w-3 h-3 text-marine" />
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
                  <item.icon className="w-3 h-3 text-marine flex-shrink-0" />
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
            <a href="/faq" className="text-orange-300 underline underline-offset-2 ml-1">Vollständige FAQ</a>
          </p>
        </div>
      </div>
    </section>
  );
}
