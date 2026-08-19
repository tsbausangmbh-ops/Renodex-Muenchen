import { useSEO } from "@/hooks/useSEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BackButton from "@/components/BackButton";
import ContactForm from "@/components/ContactForm";
import AnimatedSection from "@/components/AnimatedSection";
import ChristmasPopup from "@/components/ChristmasPopup";
import NewYearPopup from "@/components/NewYearPopup";
import Breadcrumb, { getDistrictBreadcrumbs } from "@/components/Breadcrumb";
import DistrictServiceLinks from "@/components/DistrictServiceLinks";
import { getDistrictBySlug, DistrictConfig } from "@/content/districts";
import { useParams } from "wouter";
import NotFound from "@/pages/not-found";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Clock, 
  Shield, 
  Award, 
  MapPin, 
  CheckCircle, 
  ArrowRight,
  Wrench,
  AlertTriangle,
  Star,
  ThumbsUp
} from "lucide-react";
import { Link } from "wouter";

const PHONE_NUMBER = "[Telefon folgt]";

interface DistrictHeroProps {
  district: DistrictConfig;
  onContactClick: () => void;
}

function DistrictHero({ district, onContactClick }: DistrictHeroProps) {
  return (
    <section className="relative py-8 md:py-12 overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-zinc-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1 text-center lg:text-left">
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary/30">
              <MapPin className="w-3 h-3 mr-1" />
              {district.isCity ? district.name : `München-${district.name}`}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" data-testid="heading-district-hero">
              {district.heroHeadline}
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-600 mb-6 max-w-2xl">
              {district.heroSubheadline}
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <Badge variant="outline" className="bg-white/10 text-white border-white/20 py-1.5">
                <Clock className="w-3.5 h-3.5 mr-1.5" />
                Anfahrt: {district.travelTime}
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-white border-white/20 py-1.5">
                <Shield className="w-3.5 h-3.5 mr-1.5" />
                Digitale Erstberatung
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-white border-white/20 py-1.5">
                <Award className="w-3.5 h-3.5 mr-1.5" />
                Partnernetzwerk
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                onClick={onContactClick}
                data-testid="button-district-contact"
              >
                Kostenlose Beratung
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 gap-2"
                asChild
              >
                <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} data-testid="link-district-phone">
                  <Phone className="w-4 h-4" />
                  [Telefon folgt]
                </a>
              </Button>
            </div>
          </div>
          
          <div className="flex-shrink-0 w-full lg:w-auto">
            <Card className="bg-white/10 backdrop-blur border-white/20 text-white max-w-sm mx-auto">
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Warum ein lokales Partnernetzwerk wählen?
                </h2>
                <p className="text-zinc-600 text-sm mb-4">
                  {district.localInfo}
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-zinc-600">Häufige Sanierungsanliegen in {district.name}:</p>
                  <ul className="space-y-1">
                    {district.commonIssues.map((issue, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-600">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

interface DistrictServicesProps {
  district: DistrictConfig;
  onContactClick: () => void;
}

function DistrictServices({ district, onContactClick }: DistrictServicesProps) {
  const services = [
    {
      icon: Wrench,
      title: "Wann lohnt sich eine Komplettsanierung?",
      description: `Sanierung von Haus und Wohnung in ${district.name}: Sanitär, Heizung, Elektro und weitere Gewerke aus einer Hand.`
    },
    {
      icon: AlertTriangle,
      title: "Wasserschaden oder Heizungsausfall?",
      description: `Digitale Erstberatung bei Wasserschaden oder Heizungsausfall in ${district.name} – ohne ersten Besichtigungstermin.`
    },
    {
      icon: Shield,
      title: "Renovierung statt Neubau",
      description: `Renovierung und punktuelle Modernisierung von Haus und Wohnung in ${district.name}.`
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-district-services">
            Komplettsanierung {district.name} – Unsere Leistungen
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Als <strong>Partnernetzwerk in {district.name}</strong> koordinieren wir alle Gewerke Ihrer Sanierung – 
            direkt vor Ihrer Haustür.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {services.map((service, index) => (
            <Card key={index} className="hover-elevate">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button onClick={onContactClick} size="lg" data-testid="button-district-services-cta">
            Jetzt Angebot für {district.name} anfordern
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

interface DistrictTrustProps {
  district: DistrictConfig;
}

function DistrictTrust({ district }: DistrictTrustProps) {
  const trustPoints = [
    { icon: Award, value: "25+", label: "Jahre Erfahrung", subtext: "Partnernetzwerk" },
    { icon: ThumbsUp, value: "1", label: "Ansprechpartner", subtext: "Für alle Gewerke" },
    { icon: Clock, value: district.travelTime, label: `Nach ${district.name}`, subtext: "Anfahrtszeit" },
    { icon: Star, value: "25 km", label: "Einzugsgebiet", subtext: "München & Umgebung" }
  ];

  return (
    <section className="py-16 bg-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-district-trust">
            Komplettsanierung {district.name} – Warum Kunden uns vertrauen
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Als <strong>Partnernetzwerk in {district.name}</strong> kennen wir die lokale Bausubstanz.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustPoints.map((point, index) => (
            <div key={index} className="text-center">
              <point.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-1">{point.value}</div>
              <div className="font-medium">{point.label}</div>
              <div className="text-sm text-zinc-600">{point.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface DistrictCTAProps {
  district: DistrictConfig;
  onContactClick: () => void;
}

function DistrictCTA({ district, onContactClick }: DistrictCTAProps) {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-district-cta">
          Komplettsanierung {district.name} jetzt anfragen
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Renodex in <strong>{district.name}</strong> – Antwort in 48 Std. auf Ihre digitale Anfrage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            variant="secondary"
            className="gap-2"
            asChild
          >
            <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} data-testid="link-district-cta-phone">
              <Phone className="w-5 h-5" />
              [Telefon folgt]
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/30 bg-white/10 hover:bg-white/20 gap-2"
            onClick={onContactClick}
            data-testid="button-district-cta-contact"
          >
            Kostenlose Anfrage senden
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

interface DistrictContentSectionProps {
  district: DistrictConfig;
  onContactClick: () => void;
}

function DistrictContentSection({ district, onContactClick }: DistrictContentSectionProps) {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" data-testid="heading-district-content">
            {district.mainKeyword} – Ihr Partnernetzwerk für alle Gewerke
          </h2>
          
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Suchen Sie ein zuverlässiges Partnernetzwerk in {district.name}?
              </h3>
              <p className="mb-4">{district.content.intro}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Welche Vorteile bietet ein lokales Partnernetzwerk in {district.name}?
              </h3>
              <p className="mb-4">{district.content.localExpertise}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Was kostet eine Komplettsanierung in {district.name}?
              </h3>
              <p className="mb-4">{district.content.services}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Warum Kunden Renodex empfehlen
              </h3>
              <p className="mb-4">{district.content.whyChooseUs}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Sanierungsanliegen in {district.name}? So erreichen Sie uns
              </h3>
              <p className="mb-4">{district.content.emergencyService}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Wie garantieren wir Qualität bei der Sanierung?
              </h3>
              <p className="mb-4">{district.content.qualityPromise}</p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">
              Relevante Suchbegriffe für {district.name}:
            </h4>
            <div className="flex flex-wrap gap-2">
              {district.secondaryKeywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button onClick={onContactClick} size="lg" data-testid="button-district-content-cta">
              Jetzt kostenloses Angebot für {district.name} anfordern
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface DistrictNearbyProps {
  district: DistrictConfig;
}

function DistrictNearby({ district }: DistrictNearbyProps) {
  if (district.nearbyDistricts.length === 0) return null;
  
  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-lg font-semibold mb-4 text-center" data-testid="heading-district-nearby">
          Renodex auch in der Nähe von {district.name} verfügbar
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {district.nearbyDistricts.map((slug) => (
            <Link key={slug} href={`/bezirk/${slug}`}>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover-elevate py-1.5 px-3"
                data-testid={`link-nearby-${slug}`}
              >
                <MapPin className="w-3 h-3 mr-1" />
                {slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function DistrictLandingPage() {
  const params = useParams<{ slug: string }>();
  const district = getDistrictBySlug(params.slug || "");
  
  if (!district) {
    return <NotFound />;
  }
  
  useSEO({
    title: district.metaTitle,
    description: district.metaDescription,
    canonical: `https://renodex.de/bezirk/${district.slug}`,
    keywords: `Komplettsanierung ${district.name}, Sanierung ${district.name}, Renovierung ${district.name}, ${district.mainKeyword}, ${district.secondaryKeywords.slice(0, 10).join(", ")}`,
    geoRegion: "DE-BY",
    geoPlacename: district.isCity ? district.name : `München ${district.name}`,
    districtData: {
      name: district.name,
      slug: district.slug,
      mainKeyword: district.mainKeyword,
      isCity: district.isCity
    }
  });
  
  const scrollToContact = () => {
    const contactSection = document.getElementById("kontakt");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background" data-testid={`page-district-${district.slug}`}>
      <Header phoneNumber={PHONE_NUMBER} />
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb items={getDistrictBreadcrumbs(district.name, district.isCity)} />
      </div>
      
      <main>
        <DistrictHero district={district} onContactClick={scrollToContact} />
        
        <AnimatedSection initialVisible={true}>
          <BackButton />
          <DistrictServices district={district} onContactClick={scrollToContact} />
        </AnimatedSection>
        
        <AnimatedSection>
          <DistrictTrust district={district} />
        </AnimatedSection>
        
        <AnimatedSection>
          <DistrictContentSection district={district} onContactClick={scrollToContact} />
        </AnimatedSection>
        
        <DistrictCTA district={district} onContactClick={scrollToContact} />
        
        <DistrictServiceLinks districtName={district.name} districtSlug={district.slug} />
        
        <DistrictNearby district={district} />
        
        <AnimatedSection delay={0.1}>
          <ContactForm phoneNumber={PHONE_NUMBER} />
        </AnimatedSection>
      </main>

      <Footer phoneNumber={PHONE_NUMBER} />
      <FloatingCallButton phoneNumber={PHONE_NUMBER} />
      <ChristmasPopup />
      <NewYearPopup />
    </div>
  );
}
