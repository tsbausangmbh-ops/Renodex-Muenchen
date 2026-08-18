import { MapPin, Users, ShieldCheck, UserCheck } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "25 km Radius München",
    description: "Renodex ist für Sie in München und im gesamten Umland im Umkreis von 25 km vor Ort.",
  },
  {
    icon: Users,
    title: "Partnernetzwerk",
    description: "Geprüfte Fachbetriebe für Sanitär, Heizung, Elektro und Ausbau, koordiniert unter einem Dach.",
  },
  {
    icon: ShieldCheck,
    title: "Geprüfte Meisterfirmen",
    description: "Alle Partnerbetriebe im Netzwerk arbeiten nach Meisterstandard und mit geprüfter Qualifikation.",
  },
  {
    icon: UserCheck,
    title: "Ein Ansprechpartner für alle Gewerke",
    description: "Von der Planung bis zur Abnahme -- Sie sprechen mit einer Stelle, nicht mit vier Gewerken.",
  },
];

export default function AboutSection() {
  return (
    <section className="py-16 bg-zinc-900" id="ueber-uns" data-testid="section-about">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-bold text-sm uppercase tracking-widest mb-3 block">Vielleicht kennen Sie das</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Eine Sanierung, vier Gewerke, ein Kopfzerbrechen?</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Sanitär-Handwerker, Heizungsbauer, Elektriker, Maler -- jeder mit eigenem Termin, eigenem Angebot, eigener Zusage. Renodex bündelt Sanierung, Renovierung und Komplettsanierung aus einer Hand, seit über 25 Jahren in München und Umgebung.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="text-center p-6"
              data-testid={`feature-${feature.title.toLowerCase().replace(/\s/g, "-")}`}
            >
              <div className="w-14 h-14 bg-white/15 rounded-md flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
