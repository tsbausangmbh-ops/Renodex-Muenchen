import { useParams, Link } from "wouter";
import { Mail, CheckCircle2, ShieldCheck } from "lucide-react";
import KiBildHinweis from "@/components/KiBildHinweis";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import Breadcrumb from "@/components/Breadcrumb";
import ServiceDistrictLinks from "@/components/ServiceDistrictLinks";
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

        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{thema.problemUeberschrift}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              {thema.problemText}
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">{thema.loesungUeberschrift}</h2>
            <ul className="space-y-3 mb-10">
              {thema.loesungPunkte.map((punkt) => (
                <li key={punkt} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-base">{punkt}</span>
                </li>
              ))}
            </ul>

            {thema.vertiefungUeberschrift && thema.vertiefungAbschnitte && (
              <>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{thema.vertiefungUeberschrift}</h2>
                <div className="space-y-6 mb-10">
                  {thema.vertiefungAbschnitte.map((abschnitt) => (
                    <div key={abschnitt.titel}>
                      <h3 className="text-lg font-semibold mb-2">{abschnitt.titel}</h3>
                      <p className="text-muted-foreground leading-relaxed">{abschnitt.text}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {thema.sekundaerBild && (
              <div className="mb-10 rounded-md overflow-hidden">
                <img
                  src={thema.sekundaerBild}
                  alt={thema.sekundaerBildAlt || thema.title}
                  className="w-full h-64 md:h-80 object-cover"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={655}
                />
              </div>
            )}

            <div className="bg-muted rounded-md p-6 mb-10">
              <h2 className="text-xl font-semibold mb-2">{thema.boxTitel}</h2>
              <p className="text-muted-foreground leading-relaxed">{thema.ausEinerHandText}</p>
              <Link href="/leistungen">
                <span className="inline-block mt-3 text-primary font-medium hover:underline cursor-pointer" data-testid="link-alle-leistungen">
                  Alle Leistungen im Überblick →
                </span>
              </Link>
            </div>

            <div className="border border-border rounded-md p-6 mb-10 flex items-start gap-4" data-testid="hinweis-meisterbetrieb">
              <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold mb-1">Renodex als Generalunternehmer</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Renodex ist Ihr Vertragspartner als Generalunternehmer und trägt die Verantwortung für Ihr gesamtes Vorhaben – von der Planung bis zur Abnahme. Die handwerkliche Ausführung dieser Leistung übernimmt ein eingetragener Meisterbetrieb aus unserem geprüften Partnernetzwerk als Nachunternehmer. Sie schließen einen Vertrag und haben einen Ansprechpartner für den gesamten Ablauf.
                </p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-6">Häufige Fragen zu {thema.title}</h2>
            <div className="space-y-6 mb-10">
              <div>
                <h3 className="text-lg font-semibold mb-2">{thema.faqFrage}</h3>
                <p className="text-muted-foreground leading-relaxed">{thema.faqAntwort}</p>
              </div>
              {thema.weitereFragen && thema.weitereFragen.map((fa) => (
                <div key={fa.frage}>
                  <h3 className="text-lg font-semibold mb-2">{fa.frage}</h3>
                  <p className="text-muted-foreground leading-relaxed">{fa.antwort}</p>
                </div>
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

        <ServiceDistrictLinks serviceName={thema.title} serviceSlug={thema.slug} />
      </main>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
