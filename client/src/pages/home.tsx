import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Dachcheck from "@/components/Dachcheck";
import CompactDiagnose from "@/components/CompactDiagnose";
import ServiceCards from "@/components/ServiceCards";
import ServiceDetails from "@/components/ServiceDetails";
import SolutionSection from "@/components/SolutionSection";
import NLPSection from "@/components/NLPSection";
import AboutSection from "@/components/AboutSection";
import TrustSection from "@/components/TrustSection";
import FAQSection from "@/components/FAQSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import AnimatedSection from "@/components/AnimatedSection";
import { mainPagesKeywords } from "@/content/mainPages";

const PHONE_NUMBER = "[Telefon folgt]";
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
        <Dachcheck />
        <CompactDiagnose
          onContactClick={scrollToContact}
          phoneNumber={PHONE_NUMBER}
        />
        <AnimatedSection>
          <ServiceCards />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <SolutionSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <ServiceDetails onContact={scrollToContact} />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <AboutSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <NLPSection onContactClick={scrollToContact} phoneNumber={PHONE_NUMBER} />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <TrustSection />
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
      </main>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
    </div>
  );
}
