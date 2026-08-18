import { Phone, Clock, Wrench, FileCheck } from "lucide-react";

const stats = [
  {
    icon: Phone,
    value: "24/7",
    title: "Dach Sofort-Hilfe Telefon",
    description: "Auch nachts & am Wochenende"
  },
  {
    icon: Clock,
    value: "<24h",
    title: "Schnelle Dach Reparatur",
    description: "Dach Soforthilfe München"
  },
  {
    icon: Wrench,
    value: "200+",
    title: "Sturmschäden repariert",
    description: "Erfahrung bei Dachschaden Notfall"
  },
  {
    icon: FileCheck,
    value: "100%",
    title: "Versicherungs-Dokumentation",
    description: "Sturmschaden Abwicklung"
  }
];

export default function EmergencyStats() {
  return (
    <section className="py-10 bg-zinc-800 dark:bg-zinc-900" data-testid="section-emergency-stats">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-4"
              data-testid={`emergency-stat-${index}`}
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-white mb-1">
                {stat.title}
              </div>
              <div className="text-xs text-zinc-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
