'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SanityImage } from '@/types';
import { urlForImage } from '@/sanity/image';
import Lightbox from './Lightbox';
import { Maximize2 } from 'lucide-react';

interface ProjectGalleryProps {
  gallery: SanityImage[];
}

export default function ProjectGallery({ gallery }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!gallery || gallery.length === 0) {
    return null;
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  // Funzione per assegnare un layout editoriale asimmetrico alle foto della galleria
  const getLayoutClasses = (index: number) => {
    const pattern = index % 4;
    switch (pattern) {
      case 0:
        // Immagine grande orizzontale o a tutta ampiezza
        return 'col-span-1 md:col-span-12 aspect-[16/10] sm:aspect-[16/9]';
      case 1:
        // Verticale colonna sinistra
        return 'col-span-1 md:col-span-6 aspect-[3/4] sm:aspect-[4/5]';
      case 2:
        // Verticale colonna destra (diptico)
        return 'col-span-1 md:col-span-6 aspect-[3/4] sm:aspect-[4/5]';
      case 3:
      default:
        // Immagine centrata 8/12 col
        return 'col-span-1 md:col-span-10 md:col-start-2 aspect-[4/3] sm:aspect-[16/10]';
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        {gallery.map((img, index) => {
          const imgUrl = urlForImage(img);
          const layoutClass = getLayoutClasses(index);

          return (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className={`group cursor-pointer ${layoutClass} relative overflow-hidden bg-neutral-900 border border-white/5 rounded-sm`}
            >
              <Image
                src={imgUrl}
                alt={img.alt || img.caption || `Immagine galleria ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Icona ingrandimento su hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="p-3 rounded-full bg-black/60 text-white backdrop-blur-sm border border-white/20">
                  <Maximize2 className="w-5 h-5" />
                </span>
              </div>

              {/* Didascalia opzionale sotto l'immagine */}
              {img.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-serif text-xs sm:text-sm text-neutral-300 italic">
                    {img.caption}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox full-screen */}
      <Lightbox
        images={gallery}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setCurrentIndex}
      />
    </>
  );
}
