import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BackButton from "@/components/BackButton";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb from "@/components/Breadcrumb";
import { mainPagesKeywords } from "@/content/mainPages";
import { LEISTUNGEN_THEMEN } from "@/content/leistungenThemen";

const PHONE_NUMBER = "[Telefon folgt]";
const pageData = mainPagesKeywords.leistungen;

export default function Leistungen() {
  useSEO({
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    canonical: "https://renodex.de/leistungen",
    keywords: pageData.keywords,
    schemaType: "Service",
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-leistungen">
      <Header phoneNumber={PHONE_NUMBER} />

      <main>
        <section className="bg-zinc-900 py-10 md:py-14">
          <div className="max-w-5xl mx-auto px-4">
            <BackButton />
            <Breadcrumb items={[{ label: "Leistungen" }]} className="mb-4 text-white/60" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Komplettsanierung von Haus und Wohnung aus einer Hand
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-2xl mb-8">
              Sanierung, Renovierung, Elektro, Sanitär, Heizung, Wärmepumpe, Photovoltaik, Böden, Malerarbeiten,
              Dach und Fassade – Renodex koordiniert alle Gewerke einer Sanierung in München und Umgebung im
              Umkreis von 25 km, damit Sie nur einen Ansprechpartner brauchen.
            </p>
            <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} data-testid="link-hero-call">
              <Button size="lg" className="btn-glanz gap-2">
                <Phone className="w-5 h-5" />
                Jetzt anrufen
              </Button>
            </a>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Unsere Leistungen im Überblick</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {LEISTUNGEN_THEMEN.map((thema) => (
                <Link key={thema.slug} href={`/leistungen/${thema.slug}`}>
                  <Card
                    className="h-full hover-elevate cursor-pointer"
                    data-testid={`card-leistung-${thema.slug}`}
                  >
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{thema.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {thema.heroLead.slice(0, 110)}…
                      </p>
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                        Mehr erfahren <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Alle Gewerke, ein Ansprechpartner</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Egal ob Sie ein einzelnes Gewerk oder eine komplette Sanierung planen – Renodex übernimmt die
              Koordination, damit Sie sich nicht selbst um jeden einzelnen Handwerker kümmern müssen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} data-testid="link-bottom-call">
                <Button size="lg" className="btn-glanz w-full sm:w-auto gap-2">
                  <Phone className="w-5 h-5" />
                  Kostenlose Beratung anfragen
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
