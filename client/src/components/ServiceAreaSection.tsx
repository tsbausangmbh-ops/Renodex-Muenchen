import { MapPin, Clock, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceAreaProps {
  phoneNumber: string;
}

const serviceAreas = [
  "München-Stadt",
  "München-Allach",
  "München-Untermenzing",
  "München-Pasing",
  "München-Schwabing",
  "München-Bogenhausen",
  "Unterschleißheim",
  "Germering",
];

export default function ServiceAreaSection({ phoneNumber }: ServiceAreaProps) {
  const telLink = `tel:${phoneNumber.replace(/\s/g, "")}`;

  return (
    <section className="bg-muted/30 py-12 md:py-16" id="einsatzgebiet" data-testid="section-service-area">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Einsatzgebiet München & Umland
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Wir sind in München und im gesamten Umland für Sanierung, Renovierung und Komplettsanierung im Einsatz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card data-testid="card-service-area-info">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Schnell vor Ort in München</h3>
                  <p className="text-muted-foreground">
                    Im Umkreis von 25 km um München sind wir innerhalb kürzester Zeit bei Ihnen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Antwort innerhalb von 24 Stunden</h3>
                  <p className="text-muted-foreground">
                    Auf Ihre Anfrage melden wir uns werktags innerhalb eines Tages mit einem Terminvorschlag.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Kostenlose Beratung München</h3>
                  <p className="text-muted-foreground">
                    Rufen Sie uns an für eine unverbindliche Erstberatung und Terminvereinbarung.
                  </p>
                </div>
              </div>

              <Button aria-label="Aktion"
                asChild
                className="w-full"
                data-testid="button-call-service-area"
              >
                <a aria-label="Link" href={telLink}>
                  <Phone className="w-4 h-4 mr-2" />
                  {phoneNumber}
                </a>
              </Button>
            </CardContent>
          </Card>

          <div data-testid="service-area-list">
            <h3 className="font-semibold text-lg mb-4">Wir sind tätig in:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {serviceAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2 text-sm"
                  data-testid={`area-${area.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-6">
              Ihr Ort ist nicht dabei? Rufen Sie uns an - wir prüfen gerne, ob wir auch zu Ihnen kommen können.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
