import { Mail, ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BackButton from "@/components/BackButton";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb, { SERVICE_BREADCRUMBS } from "@/components/Breadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PHONE_NUMBER = "[Telefon folgt]";

const pruefpunkte = [
  {
    frage: "Passt die Wärmepumpe zum Gebäude?",
    antwort: "Dämmstandard und vorhandene Heizflächen entscheiden, ob eine Wärmepumpe effizient arbeitet. Renodex prüft das vor Ort, statt eine pauschale Empfehlung auszusprechen.",
  },
  {
    frage: "Ist das Dach für Photovoltaik geeignet?",
    antwort: "Ausrichtung, Neigung, Verschattung und der Zustand der Dacheindeckung bestimmen den Ertrag. Ist eine Dachsanierung ohnehin fällig, lässt sich das direkt mitplanen.",
  },
  {
    frage: "Wie spielen beide Systeme zusammen?",
    antwort: "Eine Photovoltaikanlage kann einen Teil des Stroms liefern, den eine Wärmepumpe benötigt. Ob sich die Kombination im Einzelfall lohnt, hängt von Verbrauch, Dachfläche und Heizlast ab.",
  },
];

const faqs = [
  {
    question: "Sollte ich Wärmepumpe und Photovoltaik gleichzeitig planen lassen?",
    answer: "Eine gemeinsame Planung hat Vorteile: Elektroinstallation, Zählerschrank und Dachanschluss lassen sich in einem Zug abstimmen, statt sie später nachträglich anzupassen. Renodex koordiniert beide Gewerke innerhalb der Sanierung, sodass die Abstimmung nicht bei Ihnen liegt.",
  },
  {
    question: "Welche Förderungen gibt es für Wärmepumpe und Photovoltaik?",
    answer: "Für Wärmepumpen kommen unter anderem die KfW-Förderung und der BAFA-Zuschuss für Einzelmaßnahmen infrage, für Photovoltaikanlagen unter anderem die KfW-Förderung. Die konkreten Fördersätze und Voraussetzungen ändern sich regelmäßig – wir prüfen im persönlichen Gespräch, welche Programme für Ihr Vorhaben aktuell infrage kommen, statt hier pauschale Beträge zu nennen, die im Einzelfall nicht mehr stimmen.",
  },
  {
    question: "Muss das Dach zuerst saniert werden, bevor eine Photovoltaikanlage montiert wird?",
    answer: "Das kommt auf den Zustand der Dacheindeckung an. Ist eine Sanierung ohnehin absehbar, ergibt es Sinn, sie vor der Montage der Anlage einzuplanen, damit die Photovoltaik nicht kurz danach wieder abgebaut werden muss. Renodex prüft das im Rahmen der Erstberatung mit.",
  },
];

export default function WaermepumpePhotovoltaikPage() {
  useSEO({
    title: "Wärmepumpe & Photovoltaik München | Renodex",
    description: "Wärmepumpe und Photovoltaik in München und Umgebung: gemeinsame Planung, Förderberatung und Abstimmung mit Elektro- und Dacharbeiten – mit Renodex.",
    canonical: "https://renodex.de/waermepumpe-photovoltaik",
    keywords: "Wärmepumpe Photovoltaik München, Wärmepumpe und Solaranlage kombinieren, Förderung Wärmepumpe Photovoltaik",
    geoRegion: "DE-BY",
    geoPlacename: "München",
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-waermepumpe-photovoltaik">
      <Header phoneNumber={PHONE_NUMBER} />

      <main>
        <section className="bg-zinc-900 py-10 md:py-14">
          <div className="max-w-4xl mx-auto px-4">
            <Breadcrumb
              items={SERVICE_BREADCRUMBS["/waermepumpe-photovoltaik"]}
              className="mb-4 text-white/60"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Wärmepumpe und Photovoltaik – lohnt sich die Kombination für Ihr Haus?
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-2xl">
              Wärmepumpe und Photovoltaikanlage werden oft zusammen angefragt, passen aber nicht
              automatisch zu jedem Gebäude. Renodex prüft Dämmstandard, Dachfläche und
              Heizlast vor Ort und berät ehrlich, bevor eine Entscheidung ansteht – als Teil der
              Komplettsanierung von Haus und Wohnung aus einer Hand, München und Umgebung im
              Umkreis von 25 km.
            </p>
            <div className="mt-8">
              <a href="mailto:info@renodex.de" data-testid="link-email-hero">
                <Button size="lg" className="btn-glanz gap-2">
                  <Mail className="w-5 h-5" />
                  Jetzt per E-Mail anfragen
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Zwei Systeme, eine Entscheidung – aber nicht ohne Prüfung
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Wer eine Wärmepumpe plant, denkt oft gleich an eine eigene Photovoltaikanlage,
              um den Stromverbrauch abzufedern. Das ist nachvollziehbar – aber ob sich die
              Kombination für das eigene Haus wirklich lohnt, hängt von mehreren Faktoren ab, die
              sich erst bei einer Vor-Ort-Prüfung zeigen.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Was Renodex vor einer Empfehlung prüft
            </h2>
            <div className="space-y-6 mb-10">
              {pruefpunkte.map((punkt) => (
                <div key={punkt.frage} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-base mb-1">{punkt.frage}</p>
                    <p className="text-muted-foreground leading-relaxed">{punkt.antwort}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-muted rounded-md p-6 mb-10">
              <h2 className="text-xl font-semibold mb-2">Komplettsanierung aus einer Hand</h2>
              <p className="text-muted-foreground leading-relaxed">
                Wärmepumpe und Photovoltaik werden bei Renodex nicht isoliert betrachtet, sondern
                gemeinsam mit Elektroinstallation, Sanitär und – falls nötig – Dacharbeiten
                geplant. Das erspart Ihnen die Koordination zwischen mehreren Handwerksbetrieben.
              </p>
              <Link href="/leistungen">
                <span className="inline-block mt-3 text-primary font-medium hover:underline cursor-pointer" data-testid="link-alle-leistungen">
                  Alle Leistungen im Überblick →
                </span>
              </Link>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" aria-hidden="true" />
              Häufige Fragen zu Wärmepumpe und Photovoltaik
            </h2>
            <div className="mb-10">
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="border rounded-md px-4" data-testid={`faq-wp-pv-${index}`}>
                    <AccordionTrigger className="py-3 text-base text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-3 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:info@renodex.de" data-testid="link-email-bottom">
                <Button size="lg" className="btn-glanz w-full sm:w-auto gap-2">
                  <Mail className="w-5 h-5" />
                  Kostenlose Beratung anfragen
                </Button>
              </a>
              <Link href="/kontakt">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                  Kontakt aufnehmen
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
      <BackButton />
    </div>
  );
}
