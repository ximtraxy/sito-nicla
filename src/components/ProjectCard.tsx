'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import { urlForImage } from '@/sanity/image';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  aspectRatioClass?: string;
  priority?: boolean;
}

export default function ProjectCard({
  project,
  aspectRatioClass = 'aspect-[4/5]',
  priority = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileActive, setIsMobileActive] = useState(false);

  const imageUrl = urlForImage(project.coverImage) || '/001.jpg';
  const slug = project.slug?.current || '';

  // Gestione tocco su dispositivi mobili
  const handleCardClick = (e: React.MouseEvent) => {
    // Se è touch (no hover naturale) e non è ancora attivo, mostra prima l'overlay
    if (window.matchMedia('(hover: none)').matches) {
      if (!isMobileActive) {
        e.preventDefault();
        setIsMobileActive(true);
      }
    }
  };

  const showOverlay = isHovered || isMobileActive;

  return (
    <div
      className="relative group w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsMobileActive(false);
      }}
    >
      <Link
        href={`/progetti/${slug}`}
        onClick={handleCardClick}
        className="block relative overflow-hidden bg-neutral-900 border border-white/5 shadow-xl transition-all duration-500 rounded-sm"
      >
        {/* Contenitore Immagine */}
        <div className={`relative w-full ${aspectRatioClass} overflow-hidden`}>
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className={`object-cover transition-transform duration-700 ease-out ${
              showOverlay ? 'scale-105 filter brightness-90' : 'scale-100'
            }`}
          />

          {/* Sfumatura di base sempre presente per leggibilità */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300" />

          {/* Tag Categoria & Anno sempre visibili in alto */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-sans tracking-widest uppercase text-neutral-300 pointer-events-none drop-shadow">
            <span className="bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm border border-white/10">
              {project.category}
            </span>
            {project.year && (
              <span className="bg-black/40 backdrop-blur-sm px-2 py-1 rounded-sm border border-white/10">
                {project.year}
              </span>
            )}
          </div>

          {/* Titolo di base in basso */}
          <div className="absolute bottom-4 left-4 right-4 transition-opacity duration-300 pointer-events-none">
            {!showOverlay && (
              <h3 className="font-serif text-2xl sm:text-3xl text-neutral-100 font-light tracking-wide drop-shadow-md">
                {project.title}
              </h3>
            )}
          </div>

          {/* Overlay Animato (Framer Motion) per Hover desktop e Tap mobile */}
          <AnimatePresence>
            {showOverlay && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute inset-0 bg-neutral-950/85 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-end text-neutral-100 z-10"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-sans tracking-widest text-neutral-400 uppercase">
                    <span>{project.category}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                    {project.title}
                  </h3>

                  {project.excerpt && (
                    <p className="font-sans text-xs sm:text-sm text-neutral-300 line-clamp-3 leading-relaxed pt-1">
                      {project.excerpt}
                    </p>
                  )}

                  <div className="pt-4 flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-200 group-hover:text-white font-medium">
                    <span>Vedi galleria completa</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>
    </div>
  );
}
