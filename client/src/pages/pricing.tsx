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
  { schluessel: "dachsanierung_mit_daemmung_pro_m2", leistung: "Dachsanierung (Komplett)", einheit: "pro m²", von: "195 €", bis: "380 €" },
  { schluessel: "dachdecker_regiestunde", leistung: "Dachreparatur / Reparaturservice", einheit: "ab Stunde", von: "85 €", bis: "120 €" },
  { schluessel: "flachdach_bitumenabdichtung_pro_m2", leistung: "Flachdach abdichten (EPDM/Bitumen)", einheit: "pro m²", von: "80 €", bis: "160 €" },
  { schluessel: "dachrinne_aluminium_pro_lfm", leistung: "Dachrinnen erneuern (Aluminium/Zink)", einheit: "pro lfm", von: "35 €", bis: "85 €" },
  { schluessel: "dachfenster_einbau_schwingfenster", leistung: "Dachfenster einbauen (inkl. VELUX)", einheit: "pro Stück", von: "950 €", bis: "2.400 €" },
  { schluessel: "dachinspektion_pauschale", leistung: "Dachinspektion vom Meister", einheit: "Pauschale", von: "150 €", bis: "150 €" },
];

const trustBadges = [
  { icon: Award, text: "Partnernetzwerk" },
  { icon: Shield, text: "Festpreisgarantie" },
  { icon: Star, text: "10 Jahre Garantie" },
  { icon: Clock, text: "24/7 Sofort-Hilfe" },
];

const costFactors = [
  { title: "Dachfläche & Dachform", text: "Steile Dächer und besondere Formen (Walmdach, Mansarddach) erhöhen den Aufwand." },
  { title: "Material & Qualität", text: "Tondachziegel, Betondachstein, Schiefer oder Bitumenschindeln – die Wahl beeinflusst Preis und Haltbarkeit." },
  { title: "Dämmung & Energieeffizienz", text: "Eine gleichzeitige Dachdämmung erhöht die Kosten, spart aber nachhaltig Heizenergie und ist KfW-förderfähig." },
  { title: "Gerüst & Zugang", text: "Gerüstkosten sind nicht im Richtpreis enthalten. Sie variieren je nach Gebäudehöhe und Zugänglichkeit." },
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
    title: "Dachdecker Preise München – ab 80 €/m² | Renodex",
    description: "Was kostet ein Dachdecker in München? ✓ Dachsanierung ab 195€/m² ✓ Reparatur ab 85€/Std ✓ Festpreisgarantie ☎ [Telefon folgt]",
    canonical: "https://renodex.de/preise",
    keywords: "Dachdecker Preise München, Dachsanierung Kosten, Dachreparatur Preise, Flachdach Kosten pro qm, was kostet Dachdecker pro Stunde",
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
              <strong>Dachdecker Preise München</strong>{" "}
              <span className="text-zinc-300">– ab 80 €/m²</span>
            </h1>
            <p className="text-lg text-gray-200 mb-6 max-w-2xl">
              Was kostet ein Dachdecker in München? Unsere Richtpreise für Dachsanierung, Reparatur und Spenglerei — mit verbindlicher Festpreisgarantie.
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
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Preisübersicht Dachdecker München 2026</h2>
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
                <div className="font-bold text-primary text-lg mb-1">15 % Rabatt bei digitaler Anfrage</div>
                <p className="text-sm text-gray-700">
                  Stellen Sie Ihre Dachsanierungs-Anfrage online statt per Anruf – Sie sparen 15 % auf den in Ihrem individuellen Angebot ermittelten Richtpreis. Foto oder Video reicht, wir melden uns mit dem Festpreisangebot.
                </p>
                <p className="text-xs text-gray-500 mt-1.5">
                  Aktion gültig bis 18.10.2026 für digital eingehende Dachsanierungs-Anfragen. Details siehe <a href="/agb#s5" className="underline hover:text-primary">AGB § 5</a>.
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
                  <h3 className="font-bold text-primary mb-1">10 Jahre Garantie</h3>
                  <p className="text-sm text-gray-600">Auf alle Dachsanierungen und größere Arbeiten.</p>
                </CardContent>
              </Card>
              <Card className="border-zinc-200">
                <CardContent className="p-5 text-center">
                  <Clock className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                  <h3 className="font-bold text-primary mb-1">24/7 Sofort-Hilfe</h3>
                  <p className="text-sm text-gray-600">Sturmschaden? In 60 Minuten vor Ort.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* KOSTENFAKTOREN */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-6">Was beeinflusst den Dachdecker-Preis in München?</h2>
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
              Kostenlose Vor-Ort-Besichtigung und verbindliches Angebot ohne Wenn und Aber.
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
