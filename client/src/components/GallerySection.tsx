import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
const stormDamageImage = "/images/optimized/storm_damaged_red_tile_roof.webp";
const completedRoofImage = "/images/optimized/house_dark_tiles_no_window_flowers.webp";
const spenglerImage = "/images/optimized/copper_gutter_installation_craftsman.webp";
const emergencyVanImage = "/images/optimized/white_ducato_service_van.webp";

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: completedRoofImage,
    title: "Dachsanierung München Einfamilienhaus komplett – Anthrazit Dachziegel Neueindeckung Frankfurter Pfanne Partnernetzwerk",
    description: "Dachsanierung mit hochwertigen Frankfurter Pfannen in Anthrazit",
    category: "Dacharbeiten",
  },
  {
    id: 2,
    image: stormDamageImage,
    title: "Sturmschaden Dach München reparieren – Dachdecker Soforthilfe Unwetter Versicherung Sofort-Hilfe 24h Bayern",
    description: "Schnelle Notreparatur nach schwerem Unwetter",
    category: "Sturmschaden",
  },
  {
    id: 3,
    image: spenglerImage,
    title: "Kupfer Dachrinne München montieren – Spengler Partnernetzwerk, Regenrinne Zink Edelstahl Qualitätsarbeit",
    description: "Hochwertige Kupferarbeiten für lange Lebensdauer",
    category: "Spenglerei",
  },
  {
    id: 4,
    image: emergencyVanImage,
    title: "Dachdecker Sofort-Hilfe München 24 Stunden – Einsatzfahrzeug Sturmschaden Soforthilfe Dachnotruf Bayern",
    description: "Schneller Einsatz bei Dachnotfällen",
    category: "Sofort-Hilfe",
  },
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (item: GalleryItem, index: number) => {
    setSelectedImage(item);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = useCallback((direction: "prev" | "next") => {
    let newIndex: number;
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    setSelectedImage(galleryItems[newIndex]);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "ArrowLeft") {
        navigateImage("prev");
      } else if (e.key === "ArrowRight") {
        navigateImage("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, navigateImage]);

  return (
    <section className="py-16 bg-background" id="galerie" data-testid="section-gallery">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unsere Projekte
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Einblicke in unsere abgeschlossenen Arbeiten - Qualität, die überzeugt.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, index) => (
            <Card
              key={item.id}
              className="overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(item, index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(item, index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${item.title} - ${item.category} anzeigen`}
              data-testid={`gallery-item-${item.id}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                 decoding="async"  width={400} height={300} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs uppercase tracking-wider opacity-80">
                    {item.category}
                  </span>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => closeLightbox()}>
          <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
            {selectedImage && (
              <div className="relative">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full rounded-lg"
                  data-testid="lightbox-image"
                 decoding="async"  loading="lazy"  width={400} height={300} />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg text-white">
                  <span className="text-sm uppercase tracking-wider opacity-80">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-xl font-semibold mb-1">{selectedImage.title}</h3>
                  <p className="text-sm opacity-90">{selectedImage.description}</p>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("prev");
                  }}
                  data-testid="button-gallery-prev"
                  aria-label="Vorheriges Bild"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("next");
                  }}
                  data-testid="button-gallery-next"
                  aria-label="Nächstes Bild"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>

                <DialogClose asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2 bg-black/50 text-white hover:bg-black/70"
                    data-testid="button-gallery-close"
                    aria-label="Galerie schließen"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </DialogClose>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
