import { Phone, ArrowRight, Check, Clock, Shield, Award, Star, Wrench, AlertTriangle, Droplets, Zap, CheckCircle, ThumbsUp, Camera, FileText, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BackButton from "@/components/BackButton";
import { useState, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb, { SERVICE_BREADCRUMBS } from "@/components/Breadcrumb";
import ServiceDistrictLinks from "@/components/ServiceDistrictLinks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImage from "@assets/generated_images/roofer_working_on_bavarian_roof.png";

const PHONE_NUMBER = "[Telefon folgt]";

const repairTypesBasis = [
  {
    schluessel: "dachreparieren_undicht_ab",
    icon: Droplets,
    title: "Dach undicht reparieren",
    description: "Wassereintritt stoppen, Leckortung, professionelle Abdichtung mit Garantie.",
    price: "ab 175€",
    urgent: true
  },
  {
    schluessel: "dachreparieren_ziegel_austauschen_ab",
    icon: Hammer,
    title: "Dachziegel austauschen",
    description: "Einzelne oder mehrere beschädigte Ziegel schnell und fachgerecht ersetzen.",
    price: "ab 93€",
    urgent: false
  },
  {
    schluessel: null,
    icon: AlertTriangle,
    title: "Sturmschaden reparieren",
    description: "Schnelle Notreparatur nach Sturm, Dokumentation für Versicherung inklusive.",
    price: "nach Aufwand",
    urgent: true
  },
  {
    schluessel: "dachreparieren_dachrinne_ab",
    icon: Wrench,
    title: "Dachrinne reparieren",
    description: "Undichte Dachrinnen, verstopfte Fallrohre, Lötarbeiten und Austausch.",
    price: "ab 120€",
    urgent: false
  }
];

const trustBadges = [
  { icon: Award, text: "[Gründungsjahr folgt] in München" },
  { icon: Star, text: "25+ Jahre Erfahrung" },
  { icon: ThumbsUp, text: "500+ Reparaturen" },
  { icon: Shield, text: "Festpreis-Garantie" },
];

const repairFaqs = [
  {
    question: "Was kostet eine Dachreparatur in München?",
    answer: "Die Kosten für eine Dachreparatur in München beginnen bei etwa 93€ für den Austausch einzelner Dachziegel. Kleinere Leckagen können ab 175€ abgedichtet werden. Größere Reparaturen wie Sturmschäden werden individuell kalkuliert – Sie erhalten immer einen transparenten Festpreis vor Arbeitsbeginn."
  },
  {
    question: "Wie schnell können Sie mein Dach reparieren?",
    answer: "Bei akuten Notfällen wie Wassereintritt sind wir meist noch am selben Tag vor Ort. Normale Reparaturen können wir in der Regel innerhalb von 1-3 Werktagen durchführen. Unser 24/7 Sofort-Hilfe ist rund um die Uhr erreichbar."
  },
  {
    question: "Lohnt sich eine Reparatur oder besser Dachsanierung?",
    answer: "Das hängt vom Zustand Ihres Daches ab. Bei Einzelschäden ist eine Reparatur meist wirtschaftlicher. Bei mehreren Schäden oder einem Dach älter als 40 Jahre kann eine Komplettsanierung sinnvoller sein. Wir beraten Sie ehrlich und zeigen alle Optionen auf."
  },
  {
    question: "Übernehmen Sie die Versicherungsabwicklung?",
    answer: "Ja, bei Sturmschäden dokumentieren wir den Schaden professionell mit Fotos und erstellen alle nötigen Unterlagen für Ihre Versicherung. In den meisten Fällen übernimmt die Wohngebäudeversicherung die Kosten."
  }
];

export default function DachReparieren() {
  // DB-Preise (preis_katalog ueber /api/preise) als Ueberschreibung der statischen
  // "ab"-Preise unten - Fallback bleibt der hartcodierte Wert, falls die API nicht
  // erreichbar ist. SEO-Meta-Felder und die FAQ-Antwort bleiben statisch, da SSR sie
  // synchron rendern muss.
  const [repairTypes, setRepairTypes] = useState(repairTypesBasis);
  useEffect(() => {
    fetch("/api/preise")
      .then((r) => (r.ok ? r.json() : null))
      .then((daten) => {
        if (!daten?.preise) return;
        setRepairTypes((prev) =>
          prev.map((item) => {
            if (!item.schluessel) return item;
            const treffer = daten.preise.find((p: any) => p.schluessel === item.schluessel);
            if (!treffer) return item;
            return { ...item, price: `ab ${Math.round(parseFloat(treffer.preis))}€` };
          })
        );
      })
      .catch(() => {});
  }, []);

  useSEO({
    title: "Dach reparieren München | Schnell & Festpreis | Renodex",
    description: "Dach reparieren in München: Undichtes Dach, kaputte Ziegel, Sturmschaden? Schnelle Reparatur vom [Gründungsjahr folgt] mit Festpreis-Garantie. Jetzt anrufen: [Telefon folgt]",
    canonical: "https://renodex.de/dach-reparieren",
    keywords: "Dach reparieren München, undichtes Dach reparieren, Dachziegel reparieren, Sturmschaden Dach reparieren, Dachrinne reparieren München",
    geoRegion: "DE-BY",
    geoPlacename: "München"
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-dach-reparieren">
      <Header phoneNumber={PHONE_NUMBER} />
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb items={SERVICE_BREADCRUMBS["/dach-reparieren"]} />
      </div>

      <main>
        <section 
          className="py-10 md:py-12 relative bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-3 py-1.5 rounded-full text-xs font-medium mb-3">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  Schnelle Reparatur – Festpreis-Garantie
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">
                  Dach reparieren München – Schnell, Professionell & zum Festpreis
                </h1>
                <p className="text-zinc-600 text-sm md:text-base mb-4">
                  <strong className="text-white">Undichtes Dach</strong>? <strong className="text-white">Kaputte Ziegel</strong>? <strong className="text-white">Sturmschaden</strong>? 
                  Wir reparieren Ihr Dach in München schnell und zuverlässig. <strong className="text-white">[Gründungsjahr folgt] mit Festpreis-Garantie</strong> – keine versteckten Kosten.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                    <Button size="lg" className="gap-2 font-bold" data-testid="button-reparieren-call">
                      <Phone className="w-5 h-5" />
                      Jetzt anrufen: {PHONE_NUMBER}
                    </Button>
                  </a>
                  <Link href="/kontakt">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2" data-testid="button-reparieren-contact">
                      Kostenloses Angebot
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trustBadges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-full text-xs text-white" data-testid={`badge-trust-${index}`}>
                      <badge.icon className="w-3 h-3 text-yellow-400" />
                      {badge.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block" />
            </div>
          </div>
        </section>

        <section className="py-8 bg-white dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center" data-testid="heading-reparieren-services">
              Dachreparatur München – Unsere <span className="text-primary">Reparatur-Leistungen</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {repairTypes.map((repair, index) => (
                <Card key={index} className="relative" data-testid={`repair-type-${index}`}>
                  {repair.urgent && (
                    <Badge className="absolute -top-2 -right-2 bg-destructive">Notfall</Badge>
                  )}
                  <CardContent className="p-4">
                    <repair.icon className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-bold mb-2" data-testid={`heading-repair-type-${index}`}>{repair.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{repair.description}</p>
                    <p className="text-sm font-bold text-primary">{repair.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 bg-zinc-50 dark:bg-zinc-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold mb-4" data-testid="heading-reparieren-why">Warum Renodex für Ihre Dachreparatur München?</h2>
                <div className="space-y-3">
                  {[
                    "Festpreis vor Arbeitsbeginn – keine Überraschungen",
                    "Schnelle Reaktionszeit – meist noch am selben Tag",
                    "[Gründungsjahr folgt] mit 25+ Jahren Erfahrung",
                    "10 Jahre Garantie auf alle Reparaturen",
                    "Versicherungsabwicklung bei Sturmschäden",
                    "Kostenlose Erstberatung und Anfahrt im Stadtgebiet"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4" data-testid="heading-reparieren-faq">Häufige Fragen zur Dachreparatur München</h3>
                <Accordion type="single" collapsible className="space-y-2">
                  {repairFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border rounded-md px-3" data-testid={`faq-reparieren-${index}`}>
                      <AccordionTrigger className="py-2 text-sm text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 text-sm text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        <ServiceDistrictLinks serviceName="Dachreparatur" serviceSlug="dach-reparieren" />

        <section className="py-8 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-3" data-testid="heading-reparieren-cta">
              Dach reparieren München? Jetzt Festpreis-Angebot anfordern!
            </h2>
            <p className="mb-4 opacity-90">
              Rufen Sie uns an oder nutzen Sie unser Kontaktformular – wir melden uns innerhalb von 2 Stunden.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                <Button aria-label="Aktion" size="lg" variant="secondary" className="gap-2" data-testid="button-reparieren-cta-call">
                  <Phone className="w-5 h-5" />
                  {PHONE_NUMBER}
                </Button>
              </a>
              <Link href="/kontakt">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2" data-testid="button-reparieren-cta-contact">
                  Kostenloses Angebot anfordern
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-4" data-testid="heading-reparieren-seo">Dach reparieren München – Ihr [Gründungsjahr folgt], vor Ort</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Ein <strong className="text-foreground">beschädigtes Dach</strong> ist mehr als nur ein optisches Problem – es gefährdet die Bausubstanz Ihres Hauses. Ob <strong className="text-foreground">undichte Stellen</strong>, <strong className="text-foreground">kaputte Dachziegel</strong> oder <strong className="text-foreground">Sturmschäden</strong>: Je länger Sie warten, desto größer wird der Schaden und desto teurer die Reparatur.
              </p>
              <p>
                Als <strong className="text-foreground">Partnernetzwerk aus geprüften Partner-Meisterfirmen in München</strong> reparieren wir seit über 25 Jahren Dächer aller Art. Von der kleinen <strong className="text-foreground">Dachreparatur</strong> bis zur umfassenden Instandsetzung – wir arbeiten schnell, sauber und immer zum vereinbarten <strong className="text-foreground">Festpreis</strong>.
              </p>
              <p>
                Unsere Leistungen umfassen: <strong className="text-foreground">Undichte Dächer abdichten</strong>, <strong className="text-foreground">Dachziegel austauschen</strong>, <strong className="text-foreground">Dachrinnen reparieren</strong>, <strong className="text-foreground">Firstkappen erneuern</strong>, <strong className="text-foreground">Sturmschäden beheben</strong> und vieles mehr. Bei Sturmschäden übernehmen wir die komplette <strong className="text-foreground">Versicherungsabwicklung</strong> für Sie.
              </p>
              <p>
                <strong className="text-foreground">Dach reparieren in München</strong>? Rufen Sie uns an unter <strong className="text-foreground">{PHONE_NUMBER}</strong> oder nutzen Sie unser Kontaktformular. Wir erstellen Ihnen ein kostenloses Angebot – transparent und ohne versteckte Kosten.
              </p>
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
