'use client';

import { useState, useEffect } from 'react';
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

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const itemsPerView = 3;

  // Auto-play carousel - posun každých 4 sekúnd
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const getVisibleImages = () => {
    const images = [];
    for (let i = 0; i < itemsPerView; i++) {
      images.push(galleryImages[(currentIndex + i) % galleryImages.length]);
    }
    return images;
  };

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
      {/* Carousel Container - Centred */}
      <div className="flex items-center justify-center gap-6">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="flex-shrink-0 p-4 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        {/* Images Grid - 3 viditeľné s smooth transition */}
        <div className="grid grid-cols-3 gap-6 flex-1 max-w-5xl transition-all duration-1000">
          {getVisibleImages().map((image, index) => (
            <div
              key={index}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 group"
              onClick={() => setSelectedImage((currentIndex + index) % galleryImages.length)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-amber-800/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-300" />
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/600x600/f59e0b/ffffff?text=${encodeURIComponent(image.alt)}`;
                }}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="flex-shrink-0 p-4 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
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
