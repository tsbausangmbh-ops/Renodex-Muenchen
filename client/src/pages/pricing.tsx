import { Mail, Shield, Clock, CheckCircle, Award, Star, Euro, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Weiterlesen from "@/components/Weiterlesen";
import FloatingCallButton from "@/components/FloatingCallButton";
import { useState, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";

const PHONE_NUMBER = "+49 89 381684766";

// Regel 49 / Anweisung 201/202: Beträge nur live aus preis_katalog (/api/preise, Gruppe renodex).
// Angezeigt wird nur, was der Katalog liefert: fehlt ein Schlüssel, entfällt die Zeile (kein Rückfalltext,
// kein fester Betrag). Noch nicht im Katalog (Stand 17.10.2026): badsanierung_komplett_pro_m2,
// sanitaer_regiestunde, heizung_austausch_waermepumpe, elektroinstallation_regiestunde, bodenverlegung_pro_m2.
type PreisZeile = { schluessel: string; leistung: string; einheit: string; preis: string };

const priceTableBasis: Omit<PreisZeile, "preis">[] = [
  { schluessel: "renodex_komplettsanierung_wohnung", leistung: "Komplettsanierung Wohnung (alle Gewerke)", einheit: "pro m²" },
  { schluessel: "renodex_komplettsanierung_haus", leistung: "Komplettsanierung Haus (alle Gewerke)", einheit: "pro m²" },
  { schluessel: "badsanierung_komplett_pro_m2", leistung: "Badsanierung (Komplett)", einheit: "pro m²" },
  { schluessel: "renodex_innenausbau", leistung: "Innenausbau (Trockenbau, Böden, Malerarbeiten)", einheit: "pro m²" },
  { schluessel: "bodenverlegung_pro_m2", leistung: "Bodenverlegung", einheit: "pro m²" },
  { schluessel: "sanitaer_regiestunde", leistung: "Sanitärinstallation", einheit: "Stunde" },
  { schluessel: "heizung_austausch_waermepumpe", leistung: "Heizungstausch (Wärmepumpe)", einheit: "Pauschale" },
  { schluessel: "elektroinstallation_regiestunde", leistung: "Elektroinstallation", einheit: "Stunde" },
  { schluessel: "renodex_meisterstunde", leistung: "Meister- und Facharbeiterstunde", einheit: "Stunde" },
  { schluessel: "renodex_monteurstunde", leistung: "Monteurstunde", einheit: "Stunde" },
  { schluessel: "renodex_bauhelferstunde", leistung: "Bauhelferstunde", einheit: "Stunde" },
];

const euro = (wert: number) =>
  wert.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

const trustBadges = [
  { icon: Award, text: "Partnernetzwerk" },
  { icon: Shield, text: "Festpreise" },
  { icon: Clock, text: "Digitale Erstberatung" },
];

const costFactors = [
  { title: "Umfang & Zustand", text: "Der bauliche Zustand und die Zahl der betroffenen Gewerke bestimmen den Aufwand." },
  { title: "Material & Qualität", text: "Ausstattung und Materialwahl beeinflussen Preis und Haltbarkeit deutlich." },
  { title: "Energieeffizienz", text: "Eine gleichzeitige energetische Sanierung erhöht die Kosten, spart aber nachhaltig und ist KfW-/BAFA-förderfähig." },
  { title: "Zugang & Gebäudeart", text: "Zugänglichkeit und Gebäudeart (Altbau/Neubau) wirken sich auf den Aufwand aus." },
];

export default function Pricing() {
  // Live-Preise aus preis_katalog über /api/preise: nur Zeilen, deren Schlüssel der Katalog liefert.
  // SEO-Meta-Felder (title/description) bleiben statisch und ohne Betrag, da SSR sie synchron rendert.
  const [priceTable, setPriceTable] = useState<PreisZeile[]>([]);
  useEffect(() => {
    fetch("/api/preise")
      .then((r) => (r.ok ? r.json() : null))
      .then((daten) => {
        if (!Array.isArray(daten?.preise)) return;
        const zeilen: PreisZeile[] = [];
        for (const row of priceTableBasis) {
          const treffer = daten.preise.find(function (p: any) { return p.schluessel === row.schluessel; });
          const wert = treffer ? parseFloat(treffer.preis) : NaN;
          if (!Number.isFinite(wert) || wert <= 0) continue;
          zeilen.push({ ...row, preis: `ab ${euro(wert)} € netto` });
        }
        setPriceTable(zeilen);
      })
      .catch(() => {});
  }, []);

  useSEO({
    title: "Preise & Ablauf – Kostenlose Erstberatung | Renodex",
    description: "Was kostet eine Komplettsanierung in München? Wovon die Kosten für Sanitär, Heizung und Elektro abhängen – kostenlose Erstberatung bei Renodex.",
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
        <section className="bg-tiefblau text-white px-4 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <p className="text-zinc-300 font-semibold text-sm mb-2 flex items-center gap-2">
              <Euro className="w-4 h-4" />
              Festpreis nach Besichtigung · Partnernetzwerk in München
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              <strong>Preise & Ablauf</strong>{" "}
              <span className="text-zinc-300">– Komplettsanierung München</span>
            </h1>
            <p className="text-lg text-gray-200 mb-6 max-w-2xl">
              Was kostet eine Komplettsanierung in München? Wovon die Kosten für Sanitär, Heizung, Elektro und weitere Gewerke abhängen – Ihr Angebot erhalten Sie zu Festpreisen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/kontakt">
                <Button className="btn-glanz min-h-11 font-bold px-6 py-3 w-full sm:w-auto" data-testid="button-preise-hero-anfrage">
                  <Mail className="w-4 h-4 mr-2" />
                  Kostenlos digital anfragen
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-sm text-white/75">
              oder per E-Mail:{" "}
              <a href="mailto:info@renodex.de" className="inline-flex items-center min-h-11 underline underline-offset-4 hover:text-white" data-testid="link-preise-hero-email">
                info@renodex.de
              </a>
            </p>
          </div>
        </section>

        {/* TRUST BADGES */}
        <section className="bg-zinc-50 border-y border-zinc-100 px-4 py-12 md:py-16">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6">
            {trustBadges.map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-2 text-marine font-semibold text-sm">
                <Icon className="w-4 h-4 text-zinc-500" />
                {text}
              </div>
            ))}
          </div>
        </section>

        {/* PREISTABELLE */}
        <section className="px-4 bg-white py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-marine mb-2">Preisübersicht Komplettsanierung München</h2>
            <p className="text-gray-600 mb-8">
              Jede Sanierung ist anders. Das verbindliche Festpreisangebot inkl. Material und Arbeitszeit erstellt Renodex nach Ihrer digitalen Anfrage und der Besichtigung vor Ort.
            </p>

            {priceTable.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-8" data-testid="tabelle-preise-live">
              <table className="w-full text-sm md:text-base">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Leistung</th>
                    <th className="text-left px-4 py-3 font-semibold">Einheit</th>
                    <th className="text-right px-4 py-3 font-semibold">Preis</th>
                  </tr>
                </thead>
                <tbody>
                  {priceTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 font-medium text-gray-800">{row.leistung}</td>
                      <td className="px-4 py-3 text-gray-600">{row.einheit}</td>
                      <td className="px-4 py-3 text-right font-semibold text-marine">{row.preis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}

            <p className="text-xs text-gray-500 mb-6">
              * Ab-Preise netto zzgl. MwSt., laut aktuellem Preiskatalog. Festpreisangebote inkl. Montage, exkl. Gerüst. Renodex erstellt sie nach der Besichtigung vor Ort.
            </p>

            <div className="rounded-xl border-2 border-marine bg-tiefblau/5 p-5 mb-10 flex flex-col sm:flex-row items-center gap-4 justify-between">
              <div>
                <div className="font-bold text-marine text-lg mb-1">Anfrage digital statt telefonisch</div>
                <p className="text-sm text-gray-700">
                  Foto, Video oder Sprachnachricht reicht – wir melden uns mit dem Festpreisangebot.
                </p>
              </div>
              <Link href="/kontakt">
                <Button className="font-bold px-6 py-3 whitespace-nowrap">
                  Jetzt digital anfragen
                </Button>
              </Link>
            </div>

            {/* FESTPREISE */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="border-zinc-200">
                <CardContent className="p-5 text-center">
                  <Shield className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                  <h3 className="font-bold text-marine mb-1">Zu Festpreisen</h3>
                  <p className="text-sm text-gray-600">Nach der Besichtigung erhalten Sie ein Angebot zu Festpreisen.</p>
                </CardContent>
              </Card>
              <Card className="border-zinc-200">
                <CardContent className="p-5 text-center">
                  <CheckCircle className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                  <h3 className="font-bold text-marine mb-1">Ein Ansprechpartner</h3>
                  <p className="text-sm text-gray-600">Für alle Gewerke Ihrer Sanierung.</p>
                </CardContent>
              </Card>
              <Card className="border-zinc-200">
                <CardContent className="p-5 text-center">
                  <Clock className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                  <h3 className="font-bold text-marine mb-1">Digitale Erstberatung</h3>
                  <p className="text-sm text-gray-600">Mit Fotos anfragen, danach Besichtigung.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* KOSTENFAKTOREN */}
        <section className="px-4 bg-gray-50 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-marine mb-6">Was beeinflusst den Preis einer Sanierung?</h2>
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
        <section className="px-4 bg-tiefblau text-white text-center py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Kostenloses Festpreisangebot anfordern</h2>
            <p className="text-gray-200 mb-6">
              Kostenlose digitale Erstberatung und verbindliches Angebot ohne Wenn und Aber.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/kontakt">
                <Button className="btn-glanz min-h-11 font-bold px-8 py-3 w-full sm:w-auto" data-testid="button-preise-cta-anfrage">
                  <Mail className="w-4 h-4 mr-2" />
                  Festpreisangebot digital anfragen
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-sm text-white/75">
              oder per E-Mail:{" "}
              <a href="mailto:info@renodex.de" className="inline-flex items-center min-h-11 underline underline-offset-4 hover:text-white" data-testid="link-preise-cta-email">
                info@renodex.de
              </a>
            </p>
          </div>
        </section>
        <Weiterlesen seite="/preise" />
      </main>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
