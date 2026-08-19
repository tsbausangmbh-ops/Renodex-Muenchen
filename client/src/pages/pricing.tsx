import { Phone, Shield, Clock, CheckCircle, Award, Star, Euro, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { useState, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";

const PHONE_NUMBER = "[Telefon folgt]";

const priceTableBasis = [
  { schluessel: "badsanierung_komplett_pro_m2", leistung: "Badsanierung (Komplett)", einheit: "pro m²", von: "800 €", bis: "1.800 €" },
  { schluessel: "sanitaer_regiestunde", leistung: "Sanitärinstallation", einheit: "ab Stunde", von: "75 €", bis: "110 €" },
  { schluessel: "heizung_austausch_waermepumpe", leistung: "Heizungstausch (Wärmepumpe)", einheit: "Pauschale", von: "12.000 €", bis: "25.000 €" },
  { schluessel: "elektroinstallation_regiestunde", leistung: "Elektroinstallation", einheit: "ab Stunde", von: "70 €", bis: "105 €" },
  { schluessel: "bodenverlegung_pro_m2", leistung: "Bodenverlegung", einheit: "pro m²", von: "45 €", bis: "120 €" },
  { schluessel: "photovoltaik_beratung_pauschale", leistung: "Erstberatung Photovoltaik", einheit: "Pauschale", von: "kostenlos", bis: "kostenlos" },
];

const trustBadges = [
  { icon: Award, text: "Partnernetzwerk" },
  { icon: Shield, text: "Festpreisgarantie" },
  { icon: Star, text: "25+ Jahre Erfahrung" },
  { icon: Clock, text: "Digitale Erstberatung" },
];

const costFactors = [
  { title: "Umfang & Zustand", text: "Der bauliche Zustand und die Zahl der betroffenen Gewerke bestimmen den Aufwand." },
  { title: "Material & Qualität", text: "Ausstattung und Materialwahl beeinflussen Preis und Haltbarkeit deutlich." },
  { title: "Energieeffizienz", text: "Eine gleichzeitige energetische Sanierung erhöht die Kosten, spart aber nachhaltig und ist KfW-/BAFA-förderfähig." },
  { title: "Zugang & Gebäudeart", text: "Zugänglichkeit und Gebäudeart (Altbau/Neubau) wirken sich auf den Aufwand aus." },
];

export default function Pricing() {
  // DB-Preise (preis_katalog ueber /api/preise) als Ueberschreibung des "von"-Werts der
  // statischen Richtpreis-Spanne unten - Fallback bleibt der hartcodierte Wert, falls die
  // API nicht erreichbar ist. SEO-Meta-Felder (title/description) bleiben statisch, da SSR
  // sie synchron rendern muss.
  const [priceTable, setPriceTable] = useState(priceTableBasis);
  useEffect(() => {
    fetch("/api/preise")
      .then((r) => (r.ok ? r.json() : null))
      .then((daten) => {
        if (!daten?.preise) return;
        setPriceTable((prev) =>
          prev.map((row) => {
            const treffer = daten.preise.find((p: any) => p.schluessel === row.schluessel);
            if (!treffer) return row;
            return { ...row, von: `${Math.round(parseFloat(treffer.preis))} €` };
          })
        );
      })
      .catch(() => {});
  }, []);

  useSEO({
    title: "Preise & Ablauf – Kostenlose Erstberatung | Renodex",
    description: "Was kostet eine Komplettsanierung in München? Richtpreise für Sanitär, Heizung, Elektro und mehr – kostenlose Erstberatung bei Renodex.",
    canonical: "https://renodex.de/preise",
    keywords: "Sanierung Preise München, Komplettsanierung Kosten, Badsanierung Preise, Heizungstausch Kosten",
    geoRegion: "DE-BY",
    geoPlacename: "München",
    schemaType: "Service"
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-preise">
      <Header phoneNumber={PHONE_NUMBER} />

      <main>
        {/* HERO */}
        <section className="bg-primary text-white py-10 md:py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-zinc-300 font-semibold text-sm mb-2 flex items-center gap-2">
              <Euro className="w-4 h-4" />
              Transparente Festpreise • Partnernetzwerk in München
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              <strong>Preise & Ablauf</strong>{" "}
              <span className="text-zinc-300">– Komplettsanierung München</span>
            </h1>
            <p className="text-lg text-gray-200 mb-6 max-w-2xl">
              Was kostet eine Komplettsanierung in München? Unsere Richtpreise für Sanitär, Heizung, Elektro und weitere Gewerke – mit verbindlicher Festpreisgarantie.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                <Button className="bg-primary hover:bg-primary/90 text-slate-900 font-bold px-6 py-3 text-base w-full sm:w-auto">
                  <Phone className="w-4 h-4 mr-2" />
                  {PHONE_NUMBER} – Kostenlos anfragen
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* TRUST BADGES */}
        <section className="bg-zinc-50 border-y border-zinc-100 py-4 px-4">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6">
            {trustBadges.map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-2 text-primary font-semibold text-sm">
                <Icon className="w-4 h-4 text-zinc-500" />
                {text}
              </div>
            ))}
          </div>
        </section>

        {/* PREISTABELLE */}
        <section className="py-12 md:py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Preisübersicht Komplettsanierung München</h2>
            <p className="text-gray-600 mb-8">
              Alle Preise sind Richtpreise inkl. Material und Arbeitszeit. Verbindliche Festpreisangebote nach kostenloser Vor-Ort-Besichtigung.
            </p>

            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-8">
              <table className="w-full text-sm md:text-base">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Leistung</th>
                    <th className="text-left px-4 py-3 font-semibold">Einheit</th>
                    <th className="text-right px-4 py-3 font-semibold">ab</th>
                    <th className="text-right px-4 py-3 font-semibold">bis</th>
                  </tr>
                </thead>
                <tbody>
                  {priceTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 font-medium text-gray-800">{row.leistung}</td>
                      <td className="px-4 py-3 text-gray-600">{row.einheit}</td>
                      <td className="px-4 py-3 text-right font-semibold text-primary">{row.von}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{row.bis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500 mb-6">
              * Richtpreise für München 2026. Preise inkl. Montage, exkl. Gerüst. Individuelle Festpreisangebote nach kostenloser Vor-Ort-Besichtigung.
            </p>

            <div className="rounded-xl border-2 border-primary bg-primary/5 p-5 mb-10 flex flex-col sm:flex-row items-center gap-4 justify-between">
              <div>
                <div className="font-bold text-primary text-lg mb-1">10 % Nachlass bei digitaler Anfrage</div>
                <p className="text-sm text-gray-700">
                  Stellen Sie Ihre Anfrage digital statt telefonisch – Sie sparen 10 % auf den im individuellen Angebot ermittelten Richtpreis. Foto, Video oder Sprachnachricht reicht, wir melden uns mit dem Festpreisangebot.
                </p>
                <p className="text-xs text-gray-500 mt-1.5">
                  Aktion gültig vom 18.08.2026 bis 18.10.2026 für digital eingehende Anfragen. Details siehe <a href="/agb#s6" className="underline hover:text-primary">AGB § 6</a>.
                </p>
              </div>
              <Link href="/kontakt">
                <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 whitespace-nowrap">
                  Jetzt digital anfragen
                </Button>
              </Link>
            </div>

            {/* GARANTIEN */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="border-zinc-200">
                <CardContent className="p-5 text-center">
                  <Shield className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                  <h3 className="font-bold text-primary mb-1">Festpreisgarantie</h3>
                  <p className="text-sm text-gray-600">Der vereinbarte Preis gilt. Keine Nachforderungen.</p>
                </CardContent>
              </Card>
              <Card className="border-zinc-200">
                <CardContent className="p-5 text-center">
                  <CheckCircle className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                  <h3 className="font-bold text-primary mb-1">Ein Ansprechpartner</h3>
                  <p className="text-sm text-gray-600">Für alle Gewerke Ihrer Sanierung.</p>
                </CardContent>
              </Card>
              <Card className="border-zinc-200">
                <CardContent className="p-5 text-center">
                  <Clock className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                  <h3 className="font-bold text-primary mb-1">Digitale Erstberatung</h3>
                  <p className="text-sm text-gray-600">Ohne ersten Besichtigungstermin.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* KOSTENFAKTOREN */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-6">Was beeinflusst den Preis einer Sanierung?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {costFactors.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 bg-primary text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Kostenloses Festpreisangebot anfordern</h2>
            <p className="text-gray-200 mb-6">
              Kostenlose digitale Erstberatung und verbindliches Angebot ohne Wenn und Aber.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                <Button className="bg-primary hover:bg-primary/90 text-slate-900 font-bold px-8 py-3 text-base w-full sm:w-auto">
                  <Phone className="w-4 h-4 mr-2" />
                  {PHONE_NUMBER} anrufen
                </Button>
              </a>
              <Link href="/kontakt">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-base w-full sm:w-auto">
                  Online anfragen
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
