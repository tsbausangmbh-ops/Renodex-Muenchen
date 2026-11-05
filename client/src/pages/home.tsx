import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import KvRechner from "@/components/KvRechner";
import CompactDiagnose from "@/components/CompactDiagnose";
import ServiceCards from "@/components/ServiceCards";
import ServiceDetails from "@/components/ServiceDetails";
import AboutSection from "@/components/AboutSection";
import TrustSection from "@/components/TrustSection";
import FAQSection from "@/components/FAQSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Weiterlesen from "@/components/Weiterlesen";
import FloatingCallButton from "@/components/FloatingCallButton";
import AnimatedSection from "@/components/AnimatedSection";
import { mainPagesKeywords } from "@/content/mainPages";

const PHONE_NUMBER = "+49 89 381684766";
const pageData = mainPagesKeywords.home;

export default function Home() {
  useSEO({
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    canonical: "https://renodex.de/",
    keywords: `${pageData.mainKeyword}, ${pageData.secondaryKeywords.slice(0, 15).join(", ")}`,
    geoRegion: "DE-BY",
    geoPlacename: "München"
  });

  useEffect(() => {
    if (window.location.hash === "#kontakt") {
      setTimeout(() => {
        const contactSection = document.getElementById("kontakt");
        contactSection?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("kontakt");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <Header phoneNumber={PHONE_NUMBER} />

      <main>
        <HeroSection
          phoneNumber={PHONE_NUMBER}
          onRequestQuote={scrollToContact}
        />
        {/* Nr. 1968 (Betreiber 05.11.2026): „Sanierung, Renovierung und Komplettsanierung aus einer Hand“ direkt unter dem Hero */}
        <ServiceDetails onContact={scrollToContact} />
        {/* Ziel 1965: KV-Rechner wie 089cleaner.de (Schritte, KV mit Preis, Versand) · Nr. 1967 (Betreiber 05.11.2026):
            Upload-Funnel „Wir sind digital angekommen!“ von der Startseite entfernt, bleibt auf den Leistungsseiten */}
        <KvRechner />
        <CompactDiagnose
          onContactClick={scrollToContact}
          phoneNumber={PHONE_NUMBER}
        />
        <AnimatedSection>
          <ServiceCards />
        </AnimatedSection>
        {/* Nr. 1969 (Betreiber 05.11.2026): NLPSection „Sanierung und Renovierung – aus einer Hand.“ von der Startseite
            entfernt; Trust vor About, damit Hell/Dunkel wechselt (fehler_3_layout) */}
        <AnimatedSection delay={0.1}>
          <TrustSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <AboutSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <FAQSection />
        </AnimatedSection>
        <div id="kontakt">
          <AnimatedSection delay={0.1}>
            <ContactForm phoneNumber={PHONE_NUMBER} />
          </AnimatedSection>
        </div>
        <AnimatedSection delay={0.1}>
          <ServiceAreaSection phoneNumber={PHONE_NUMBER} />
        </AnimatedSection>
        <Weiterlesen seite="/" hintergrund="bg-background" />
      </main>

      <Footer phoneNumber={PHONE_NUMBER} ohneTelefon />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
