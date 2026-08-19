import { useParams, Link } from "wouter";
import { Mail, CheckCircle2, ShieldCheck, Handshake } from "lucide-react";
import KiBildHinweis from "@/components/KiBildHinweis";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import Breadcrumb from "@/components/Breadcrumb";
import ServiceDistrictLinks from "@/components/ServiceDistrictLinks";
import AnimatedSection from "@/components/AnimatedSection";
import { useSEO } from "@/hooks/useSEO";
import { LEISTUNGEN_THEMEN } from "@/content/leistungenThemen";
import NotFound from "@/pages/not-found";

const PHONE_NUMBER = "[Telefon folgt]";

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

  return (
    <div className="min-h-screen bg-background" data-testid={`page-leistung-${thema.slug}`}>
      <Header phoneNumber={PHONE_NUMBER} />

      <main>
        <section
          className="relative bg-zinc-900 py-10 md:py-14 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(24,24,27,0.88), rgba(24,24,27,0.94)), url(${thema.heroImage})` }}
          role="img"
          aria-label={`${thema.title} – ${thema.heroFrage}`}
        >
          <KiBildHinweis />
          <div className="max-w-4xl mx-auto px-4">
            <Breadcrumb
              items={[
                { label: "Leistungen", href: "/leistungen" },
                { label: thema.title },
              ]}
              className="mb-4 text-white/60"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {thema.heroFrage}
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-2xl">
              {thema.heroLead}
            </p>
            <div className="mt-8">
              <a href="mailto:info@renodex.de" data-testid={`link-email-${thema.slug}`}>
                <Button size="lg" className="btn-glanz gap-2">
                  <Mail className="w-5 h-5" />
                  Jetzt per E-Mail anfragen
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Block 1: Problem + Loesung als ein zusammenhaengender Card-Bereich */}
        <AnimatedSection>
          <section className="py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4">
              <Card className="overflow-hidden">
                <CardContent className="p-6 md:p-10">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{thema.problemUeberschrift}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {thema.problemText}
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{thema.loesungUeberschrift}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {thema.loesungPunkte.map((punkt) => (
                      <div
                        key={punkt}
                        className="flex items-start gap-3 bg-muted rounded-md p-4"
                        data-testid={`punkt-${punkt.slice(0, 20).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-base">{punkt}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </AnimatedSection>

        {/* Block 2: Vertiefung + Sekundaerbild kombiniert (optional) */}
        {(thema.vertiefungUeberschrift && thema.vertiefungAbschnitte) || thema.sekundaerBild ? (
          <AnimatedSection delay={0.1}>
            <section className="pb-12 md:pb-16">
              <div className="max-w-4xl mx-auto px-4">
                <Card className="overflow-hidden">
                  {thema.sekundaerBild && (
                    <img
                      src={thema.sekundaerBild}
                      alt={thema.sekundaerBildAlt || thema.title}
                      className="w-full h-64 md:h-80 object-cover"
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={655}
                    />
                  )}
                  {thema.vertiefungUeberschrift && thema.vertiefungAbschnitte && (
                    <CardContent className="p-6 md:p-10">
                      <h2 className="text-2xl md:text-3xl font-bold mb-6">{thema.vertiefungUeberschrift}</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {thema.vertiefungAbschnitte.map((abschnitt) => (
                          <div key={abschnitt.titel}>
                            <h3 className="text-lg font-semibold mb-2">{abschnitt.titel}</h3>
                            <p className="text-muted-foreground leading-relaxed">{abschnitt.text}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </div>
            </section>
          </AnimatedSection>
        ) : null}

        {/* Block 3: Aus einer Hand + Koordinationshinweis als verwandte Card-Gruppe */}
        <AnimatedSection delay={0.1}>
          <section className="pb-12 md:pb-16">
            <div className="max-w-4xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-muted border-none">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-3">
                      <Handshake className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{thema.boxTitel}</h2>
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
                    <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-3">
                      <ShieldCheck className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold mb-1">Renodex koordiniert, das Partnernetzwerk führt aus</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Renodex übernimmt für Sie die Koordination, Verwaltung und Bauleitung Ihres Vorhabens – von der ersten Planung bis zur Abstimmung vor Ort. Die handwerkliche Ausführung dieser Leistung erfolgt durch einen eingetragenen Betrieb aus unserem geprüften Partnernetzwerk, mit dem Sie den Vertrag über die Bauleistung schließen. So haben Sie einen festen Ansprechpartner für die Organisation und einen Fachbetrieb für die Ausführung.
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
                      <span className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-semibold px-2.5 py-1 rounded">
                        Nachher
                      </span>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </section>
        </AnimatedSection>

        {/* Block 4: FAQ als eigene Sektion mit Cards */}
        <AnimatedSection delay={0.1}>
          <section className="pb-12 md:pb-16">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Häufige Fragen zu {thema.title}</h2>
              <div className="space-y-4 mb-10">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{thema.faqFrage}</h3>
                    <p className="text-muted-foreground leading-relaxed">{thema.faqAntwort}</p>
                  </CardContent>
                </Card>
                {thema.weitereFragen && thema.weitereFragen.map((fa) => (
                  <Card key={fa.frage}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{fa.frage}</h3>
                      <p className="text-muted-foreground leading-relaxed">{fa.antwort}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:info@renodex.de" data-testid={`link-email-bottom-${thema.slug}`}>
                  <Button size="lg" className="btn-glanz w-full sm:w-auto gap-2">
                    <Mail className="w-5 h-5" />
                    Kostenlose Beratung anfragen
                  </Button>
                </a>
                <Link href="/leistungen">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Weitere Leistungen ansehen
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <ServiceDistrictLinks serviceName={thema.title} serviceSlug={thema.slug} />
      </main>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
