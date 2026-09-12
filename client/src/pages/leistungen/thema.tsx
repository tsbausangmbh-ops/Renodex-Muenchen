import { useParams, Link } from "wouter";
import type { MouseEvent } from "react";
import { Upload, CheckCircle2, ShieldCheck, Handshake } from "lucide-react";
import KiBildHinweis from "@/components/KiBildHinweis";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Sanierungscheck from "@/components/Sanierungscheck";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import Breadcrumb from "@/components/Breadcrumb";
import ServiceDistrictLinks from "@/components/ServiceDistrictLinks";
import AnimatedSection from "@/components/AnimatedSection";
import { useSEO } from "@/hooks/useSEO";
import { LEISTUNGEN_THEMEN } from "@/content/leistungenThemen";
import NotFound from "@/pages/not-found";

const PHONE_NUMBER = "+49 89 381684766";
const PHONE_HREF = `tel:${PHONE_NUMBER.replace(/\s/g, "")}`;
// Anker des Upload-Funnels (Platz 2). Der Wrapper traegt die ID, weil
// Sanierungscheck seine eigene ID im Danke-Zustand nicht mehr rendert.
const FUNNEL_ANKER = "anfrage";

// Ablauf fuer alle Themen gleich. Bewusst ohne Fristen (UWG, rechtlich festgelegt).
const ABLAUF_SCHRITTE = [
  { titel: "Digital anfragen", text: "Sie beschreiben Ihr Vorhaben und laden Fotos hoch. Vom Handy, Tablet oder Rechner, ohne Anmeldung." },
  { titel: "Rückmeldung per E-Mail", text: "Wir sehen uns Ihre Angaben an und melden uns per E-Mail. Fehlt etwas, fragen wir gezielt nach." },
  { titel: "Festpreis nach Besichtigung", text: "Nach der Besichtigung erhalten Sie von uns ein Festpreisangebot. Betrifft Ihr Vorhaben mehrere Gewerke, bekommen Sie alles als Gesamtpaket zu einem Festpreis." },
  { titel: "Koordination der Fachfirmen", text: "Eingetragene Fachfirmen führen die Arbeiten aus. Renodex stimmt Termine und Reihenfolge der Gewerke ab." },
];

function zumFunnel(e: MouseEvent<HTMLAnchorElement>) {
  const ziel = document.getElementById(FUNNEL_ANKER);
  if (!ziel) return;
  e.preventDefault();
  ziel.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function LeistungThemaPage() {
  const { slug } = useParams<{ slug: string }>();
  const thema = LEISTUNGEN_THEMEN.find((t) => t.slug === slug);

  if (!thema) {
    return <NotFound />;
  }

  useSEO({
    title: thema.metaTitle,
    description: thema.metaDescription,
    canonical: `https://renodex.de/leistungen/${thema.slug}`,
    schemaType: "FAQPage",
  });

  // FAQ-Liste aus EINER Quelle: Anzeige und FAQPage-Schema lesen dieselben Daten.
  // server/seo-tags.ts erzeugt FAQPage nur fuer mainPagesContent/Bezirke, nicht
  // fuer /leistungen/<slug> -- hier entsteht es also nicht doppelt.
  const faqs = [
    { frage: thema.faqFrage, antwort: thema.faqAntwort },
    ...(thema.weitereFragen ?? []),
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((fa) => ({
      "@type": "Question",
      name: fa.frage,
      acceptedAnswer: { "@type": "Answer", text: fa.antwort },
    })),
  };

  const problemBild = thema.problemBild || thema.heroImage;
  const problemBildIstHero = !thema.problemBild;
  const hatVertiefung = Boolean(
    (thema.vertiefungUeberschrift && thema.vertiefungAbschnitte) || thema.sekundaerBild,
  );
  // Weiss/Hellgrau-Wechsel: Problem weiss, Loesung grau, danach je nach Vertiefung.
  const bgAblauf = hatVertiefung ? "bg-muted" : "bg-background";
  const bgFaq = hatVertiefung ? "bg-background" : "bg-muted";

  return (
    <div className="min-h-screen bg-background" data-testid={`page-leistung-${thema.slug}`}>
      <Header phoneNumber={PHONE_NUMBER} />

      <main>
        <section className="relative bg-zinc-900 py-10 md:py-14">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.88), rgba(24,24,27,0.94)), url(${thema.heroImage})` }}
            role="img"
            aria-label={thema.heroImageAlt}
          />
          <KiBildHinweis />
          <div className="relative max-w-7xl mx-auto px-4">
            <Breadcrumb
              items={[
                { label: "Leistungen", href: "/leistungen" },
                { label: thema.title },
              ]}
              className="mb-4 text-white/60"
              dark
            />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {thema.heroFrage}
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-2xl">
              {thema.heroLead}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="btn-glanz gap-2 min-h-11 text-base w-full sm:w-auto">
                <a href={`#${FUNNEL_ANKER}`} onClick={zumFunnel} data-testid={`link-funnel-${thema.slug}`}>
                  <Upload className="w-5 h-5" aria-hidden="true" />
                  Fotos hochladen und anfragen
                </a>
              </Button>
              <p className="mt-3 text-base text-white/75">
                Lieber telefonisch?{" "}
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center min-h-11 text-white/90 underline underline-offset-4 hover:text-white"
                  data-testid={`link-telefon-${thema.slug}`}
                >
                  {PHONE_NUMBER}
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Platz 2: Upload-Funnel (dieselbe Komponente wie auf der Startseite) */}
        <div id={FUNNEL_ANKER} className="scroll-mt-20">
          <Sanierungscheck />
        </div>

        {/* Problem (Pacing): Text links, Bild rechts; Handy untereinander */}
        <AnimatedSection>
          <section className="bg-background py-8 sm:py-10 lg:py-14" data-testid="section-problem">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{thema.problemUeberschrift}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {thema.problemText}
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-md aspect-[4/3]">
                  <img
                    src={problemBild}
                    alt={thema.problemBildAlt || (problemBildIstHero ? thema.heroImageAlt : `${thema.title} in München: typische Ausgangslage vor der Sanierung`)}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={600}
                  />
                  {problemBildIstHero && <KiBildHinweis />}
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Loesung (Leading): Nutzenpunkte, Bild optional */}
        <AnimatedSection delay={0.1}>
          <section className="bg-muted py-8 sm:py-10 lg:py-14" data-testid="section-loesung">
            <div className="max-w-7xl mx-auto px-4">
              <div className={thema.loesungBild ? "grid grid-cols-1 md:grid-cols-2 gap-8 items-center" : "max-w-3xl"}>
                {thema.loesungBild && (
                  <div className="relative overflow-hidden rounded-md aspect-[4/3] md:order-2">
                    <img
                      src={thema.loesungBild}
                      alt={thema.loesungBildAlt || `${thema.title}: abgestimmte Ausführung durch Fachfirmen`}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={600}
                    />
                  </div>
                )}
                <div className="md:order-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">{thema.loesungUeberschrift}</h2>
                  <ul className="space-y-3">
                    {thema.loesungPunkte.map((punkt) => (
                      <li
                        key={punkt}
                        className="flex items-start gap-3 bg-background rounded-md p-4"
                        data-testid={`punkt-${punkt.slice(0, 20).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      >
                        <CheckCircle2 className="w-5 h-5 text-marine flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-base">{punkt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Vertiefung + Sekundaerbild (optional) */}
        {hatVertiefung ? (
          <AnimatedSection delay={0.1}>
            <section className="bg-background py-8 sm:py-10 lg:py-14" data-testid="section-vertiefung">
              <div className="max-w-7xl mx-auto px-4">
                {thema.vertiefungUeberschrift && (
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">{thema.vertiefungUeberschrift}</h2>
                )}
                <div className={thema.sekundaerBild ? "grid grid-cols-1 md:grid-cols-2 gap-8 items-start" : ""}>
                  {thema.vertiefungAbschnitte && (
                    <div className={thema.sekundaerBild ? "space-y-6" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
                      {thema.vertiefungAbschnitte.map((abschnitt) => (
                        <div key={abschnitt.titel}>
                          <h3 className="text-lg font-semibold mb-2">{abschnitt.titel}</h3>
                          <p className="text-base text-muted-foreground leading-relaxed">{abschnitt.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {thema.sekundaerBild && (
                    <div className="relative overflow-hidden rounded-md aspect-[16/9] md:sticky md:top-24">
                      <img
                        src={thema.sekundaerBild}
                        alt={thema.sekundaerBildAlt || thema.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        width={1200}
                        height={675}
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          </AnimatedSection>
        ) : null}

        {/* Ablauf in 4 Schritten + Koordinationshinweise (Inhalt der frueheren Hinweiskarten) */}
        <AnimatedSection delay={0.1}>
          <section className={`${bgAblauf} py-8 sm:py-10 lg:py-14`} data-testid="section-ablauf">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">So läuft Ihre Anfrage ab</h2>
              <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {ABLAUF_SCHRITTE.map((schritt, i) => (
                  <li key={schritt.titel} className="bg-card border rounded-md p-5">
                    <span
                      className="w-10 h-10 rounded-full bg-marine text-white font-bold flex items-center justify-center mb-3"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-semibold mb-2">{schritt.titel}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{schritt.text}</p>
                  </li>
                ))}
              </ol>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-marine/10 rounded-md flex items-center justify-center mb-3">
                      <Handshake className="w-6 h-6 text-marine" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{thema.boxTitel}</h3>
                    <p className="text-muted-foreground leading-relaxed">{thema.ausEinerHandText}</p>
                    <Link href="/leistungen">
                      <span className="inline-block mt-3 text-primary font-medium hover:underline cursor-pointer" data-testid="link-alle-leistungen">
                        Alle Leistungen im Überblick →
                      </span>
                    </Link>
                  </CardContent>
                </Card>

                <Card data-testid="hinweis-meisterbetrieb">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-marine/10 rounded-md flex items-center justify-center mb-3">
                      <ShieldCheck className="w-6 h-6 text-marine" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold mb-1">Renodex koordiniert, das Partnernetzwerk führt aus</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Alle meisterpflichtigen Gewerke führen eingetragene Fachfirmen aus. Renodex übernimmt die Koordination. Den Vertrag über die Bauleistung schließen Sie wahlweise mit Renodex, auch als Gesamtpaket zu einem Festpreis, oder direkt mit der ausführenden Fachfirma. Renodex koordiniert in beiden Fällen. So haben Sie einen festen Ansprechpartner für die Organisation und einen Fachbetrieb für die Ausführung.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {(thema.bildVorher || thema.bildNachher) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  {thema.bildVorher && (
                    <Card className="overflow-hidden relative">
                      <img
                        src={thema.bildVorher}
                        alt={thema.bildVorherAlt || `${thema.title} vorher`}
                        className="w-full h-48 md:h-56 object-cover"
                        loading="lazy"
                        decoding="async"
                        width={800}
                        height={450}
                      />
                      <span className="absolute top-3 left-3 bg-zinc-900/80 text-white text-xs font-semibold px-2.5 py-1 rounded">
                        Vorher
                      </span>
                    </Card>
                  )}
                  {thema.bildNachher && (
                    <Card className="overflow-hidden relative">
                      <img
                        src={thema.bildNachher}
                        alt={thema.bildNachherAlt || `${thema.title} nachher`}
                        className="w-full h-48 md:h-56 object-cover"
                        loading="lazy"
                        decoding="async"
                        width={800}
                        height={450}
                      />
                      <span className="absolute top-3 left-3 bg-marine/90 text-white text-xs font-semibold px-2.5 py-1 rounded">
                        Nachher
                      </span>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </section>
        </AnimatedSection>

        {/* Einwaende: FAQ als Accordion. forceMount haelt die Antworten im DOM
            (Prerender/Bots sehen den Text), geschlossene Eintraege sind per hidden verborgen. */}
        <AnimatedSection delay={0.1}>
          <section className={`${bgFaq} py-8 sm:py-10 lg:py-14`} data-testid="section-faq">
            <div className="max-w-7xl mx-auto px-4">
              <div className="max-w-3xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Häufige Fragen zu {thema.title}</h2>
                <Accordion type="single" collapsible defaultValue="faq-0">
                  {faqs.map((fa, i) => (
                    <AccordionItem key={fa.frage} value={`faq-${i}`}>
                      <AccordionTrigger className="min-h-11 text-left text-lg font-semibold gap-4">
                        {fa.frage}
                      </AccordionTrigger>
                      <AccordionContent forceMount>
                        <p className="text-base text-muted-foreground leading-relaxed">{fa.antwort}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              <script
                type="application/ld+json"
                data-seo="faq-thema"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
              />
            </div>
          </section>
        </AnimatedSection>

        {/* Interne Links auf verwandte Themen (nur wenn im Datensatz gepflegt) */}
        {thema.verwandteThemen && thema.verwandteThemen.length > 0 && (
          <section className="bg-background py-8 sm:py-10" data-testid="section-verwandte-themen">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Verwandte Themen</h2>
              <ul className="flex flex-wrap gap-3">
                {thema.verwandteThemen.map((v) => (
                  <li key={v.href}>
                    <Link
                      href={v.href}
                      className="inline-flex items-center min-h-11 px-4 rounded-md border text-base font-medium text-primary hover:underline"
                      data-testid={`link-verwandt-${v.href.split("/").pop()}`}
                    >
                      {v.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Abschluss-CTA in marine: ein digitaler Schritt, Telefon klein */}
        <section className="bg-marine text-white py-8 sm:py-10 lg:py-14" data-testid="section-abschluss-cta">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{thema.heroFrage}</h2>
              <p className="text-lg text-white/85 leading-relaxed mb-6">
                Schicken Sie uns Fotos und eine kurze Beschreibung. Sie bekommen eine Rückmeldung per E-Mail.
              </p>
              <Button asChild size="lg" className="btn-glanz gap-2 min-h-11 text-base w-full sm:w-auto">
                <a href={`#${FUNNEL_ANKER}`} onClick={zumFunnel} data-testid={`link-funnel-bottom-${thema.slug}`}>
                  <Upload className="w-5 h-5" aria-hidden="true" />
                  Fotos hochladen und anfragen
                </a>
              </Button>
              <p className="mt-3 text-base text-white/75">
                Lieber telefonisch?{" "}
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center min-h-11 text-white/90 underline underline-offset-4 hover:text-white"
                  data-testid={`link-telefon-bottom-${thema.slug}`}
                >
                  {PHONE_NUMBER}
                </a>
              </p>
              <p className="mt-2 text-base">
                <Link
                  href="/leistungen"
                  className="inline-flex items-center min-h-11 text-white/90 underline underline-offset-4 hover:text-white"
                  data-testid="link-weitere-leistungen"
                >
                  Weitere Leistungen ansehen
                </Link>
              </p>
            </div>
          </div>
        </section>

        <ServiceDistrictLinks serviceName={thema.title} serviceSlug={thema.slug} />
      </main>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
