import { Star, Award, Users, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  initials: string;
}

interface Stat {
  icon: typeof Star;
  value: string;
  label: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Michael S.",
    location: "München-Schwabing",
    rating: 5,
    text: "Nach dem Sturm war noch am selben Tag jemand da. Sofort-Hilfe 24/7 hat super funktioniert. Sehr professionell und faire Preise!",
    initials: "MS",
  },
  {
    name: "Andrea K.",
    rating: 5,
    text: "Die Dachsanierung wurde termingerecht und sauber durchgeführt. Das Team war freundlich und kompetent.",
    initials: "AK",
  },
  {
    name: "Thomas B.",
    location: "München-Pasing",
    rating: 5,
    text: "Neue Dachrinnen in Kupfer - handwerklich perfekt ausgeführt. Sehr zufrieden mit der Qualität.",
    initials: "TB",
  },
];

const stats: Stat[] = [
  { icon: Building, value: "240+", label: "Projekte abgeschlossen" },
  { icon: Award, value: "25+", label: "Jahre Erfahrung" },
  { icon: Users, value: "100+", label: "Zufriedene Kunden" },
  { icon: Star, value: "4.9", label: "Google Bewertung" },
];

const certifications = [
  "Partnernetzwerk",
  "Handwerkskammer München",
];

export default function TrustSection() {
  return (
    <section className="py-16 bg-white" id="referenzen" data-testid="section-trust">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
              <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-trust-reviews">Renodex Kundenbewertungen München – Das sagen unsere Kunden</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Überzeugen Sie sich selbst von der Qualität unserer Arbeit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} data-testid={`card-testimonial-${testimonial.initials.toLowerCase()}`}>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4" data-testid="heading-trust-certs">Partnernetzwerk in München Zertifizierungen & Mitgliedschaften</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div 
                key={cert}
                className="px-4 py-2 bg-background border border-border rounded-md text-sm font-medium"
                data-testid={`badge-cert-${cert.toLowerCase().replace(/\s/g, "-")}`}
              >
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
