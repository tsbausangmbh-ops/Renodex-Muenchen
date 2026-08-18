import { Award, Users, Handshake } from "lucide-react";

interface Stat {
  icon: typeof Award;
  value: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Award, value: "25+", label: "Jahre Erfahrung" },
  { icon: Handshake, value: "4", label: "Gewerke aus einer Hand" },
  { icon: Users, value: "1", label: "Ansprechpartner für alles" },
];

const certifications = [
  "Partnernetzwerk",
  "Handwerkskammer München",
];

export default function TrustSection() {
  return (
    <section className="py-16 bg-white" id="referenzen" data-testid="section-trust">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-trust-reviews">Warum sich Kunden in München für Renodex entscheiden</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ein Partnernetzwerk statt Einzelvergabe: weniger Koordinationsaufwand, ein verbindlicher Zeitplan, ein Ansprechpartner von der Planung bis zur Abnahme.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4" data-testid="heading-trust-certs">Partnernetzwerk in München – Zertifizierungen & Mitgliedschaften</h3>
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
