'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SanityImage } from '@/types';
import { urlForImage } from '@/sanity/image';

interface LightboxProps {
  images: SanityImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const currentImage = images[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      onIndexChange(currentIndex + 1);
    } else {
      onIndexChange(0); // Ritorna alla prima
    }
  }, [currentIndex, images.length, onIndexChange]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    } else {
      onIndexChange(images.length - 1); // Va all'ultima
    }
  }, [currentIndex, images.length, onIndexChange]);

  // Gestione tastiera (Esc, freccia destra, freccia sinistra)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Disabilita lo scroll della pagina sottostante mentre il lightbox è aperto
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentImage) return null;

  const currentUrl = urlForImage(currentImage) || '';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none"
        onClick={onClose}
      >
        {/* Pulsante Chiusura */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 text-neutral-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full"
          aria-label="Chiudi visualizzatore"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Contatore immagini */}
        <div className="absolute top-7 left-6 z-50 text-xs font-sans tracking-widest text-neutral-400 uppercase">
          <span>{currentIndex + 1}</span>
          <span className="mx-2 text-neutral-600">/</span>
          <span>{images.length}</span>
        </div>

        {/* Pulsante Precedente */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 text-neutral-300 hover:text-white transition-all bg-white/5 hover:bg-white/15 rounded-full backdrop-blur-sm"
            aria-label="Immagine precedente"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        )}

        {/* Contenitore Immagine Principale */}
        <div
          className="relative max-w-5xl max-h-[82vh] w-full h-full flex flex-col items-center justify-center px-4 sm:px-16"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-[70vh] sm:h-[75vh]">
            <Image
              src={currentUrl}
              alt={currentImage.alt || currentImage.caption || 'Foto del progetto'}
              fill
              priority
              className="object-contain"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>

          {/* Didascalia (Caption) */}
          {currentImage.caption && (
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 font-serif text-sm sm:text-base text-neutral-300 text-center max-w-2xl px-4 italic"
            >
              {currentImage.caption}
            </motion.p>
          )}
        </div>

        {/* Pulsante Successivo */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 text-neutral-300 hover:text-white transition-all bg-white/5 hover:bg-white/15 rounded-full backdrop-blur-sm"
            aria-label="Immagine successiva"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
