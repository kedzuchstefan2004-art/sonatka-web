'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Image {
  src: string;
  alt: string;
}

// Obrázky z reštaurácie Sonáta
const galleryImages: Image[] = [
  { src: '/images/interior-1.jpg', alt: 'Interiér reštaurácie' },
  { src: '/images/interior-2.jpg', alt: 'Priestory reštaurácie' },
  { src: '/images/food-1.jpg', alt: 'Naše jedlá' },
  { src: '/images/food-2.jpg', alt: 'Špeciality' },
  { src: '/images/001al-large.jpg', alt: 'Reštaurácia Sonáta' },
  { src: '/images/002al-large.jpg', alt: 'Interiér' },
  { src: '/images/003al-large.jpg', alt: 'Priestory' },
  { src: '/images/004al-large.jpg', alt: 'Detaily' },
  { src: '/images/007al-large.jpg', alt: 'Atmosféra' },
  { src: '/images/008al-large.jpg', alt: 'Priestor' },
  { src: '/images/009al-large.jpg', alt: 'Detaily reštaurácie' },
  { src: '/images/011al-large.jpg', alt: 'Jedlá' },
  { src: '/images/012al-large.jpg', alt: 'Špeciality' },
  { src: '/images/014al-large.jpg', alt: 'Ponuka' },
  { src: '/images/015al-large.jpg', alt: 'Jedlo' },
  { src: '/images/016al-large.jpg', alt: 'Kulinária' },
  { src: '/images/019al-large.jpg', alt: 'Reštaurácia' },
  { src: '/images/027al-large.jpg', alt: 'Detaily' },
];

interface ImageGalleryProps {
  showLimit?: number;
  showCarousel?: boolean;
}

export default function ImageGallery({ showLimit, showCarousel = true }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [autoScroll, setAutoScroll] = useState(0);

  const displayedImages = showLimit ? galleryImages.slice(0, showLimit) : galleryImages;

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <div className="w-full">
      {/* Grid Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {displayedImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow group"
            onClick={() => setSelectedImage(index)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-amber-800/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
            <img 
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback na placeholder ak obrázok neexistuje
                e.currentTarget.src = `https://placehold.co/400x400/f59e0b/ffffff?text=${encodeURIComponent(image.alt)}`;
              }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-12 w-12" />
          </button>

          <div className="max-w-4xl max-h-[90vh] relative">
            <img 
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-[80vh] object-contain"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/800x600/f59e0b/ffffff?text=${encodeURIComponent(galleryImages[selectedImage].alt)}`;
              }}
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-12 w-12" />
          </button>
        </div>
      )}
    </div>
  );
}
