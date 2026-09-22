'use client';

import { Project } from '@/types';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="py-20 text-center text-neutral-400 font-sans">
        <p>Nessun progetto trovato.</p>
      </div>
    );
  }

  // Definiamo i pattern di layout asimmetrico per creare l'effetto editoriale
  const getLayoutClasses = (index: number) => {
    const cycle = index % 5;
    switch (cycle) {
      case 0:
        // Progetto di grande impatto (featured / primo piano)
        return {
          containerClass: 'col-span-1 md:col-span-7 lg:col-span-8',
          aspectClass: 'aspect-[4/3] sm:aspect-[16/11]',
        };
      case 1:
        // Progetto verticale / ritratto slanciato
        return {
          containerClass: 'col-span-1 md:col-span-5 lg:col-span-4',
          aspectClass: 'aspect-[3/4] sm:aspect-[4/5]',
        };
      case 2:
        // Progetto medio colonna sinistra
        return {
          containerClass: 'col-span-1 md:col-span-6 lg:col-span-5',
          aspectClass: 'aspect-[4/5]',
        };
      case 3:
        // Progetto medio colonna destra, sfalsato verso il basso
        return {
          containerClass: 'col-span-1 md:col-span-6 lg:col-span-7 md:mt-12',
          aspectClass: 'aspect-[16/10] sm:aspect-[3/2]',
        };
      case 4:
      default:
        // Progetto orizzontale o a tutta ampiezza
        return {
          containerClass: 'col-span-1 md:col-span-12 lg:col-span-8 lg:col-start-3',
          aspectClass: 'aspect-[16/9] sm:aspect-[21/10]',
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
      {projects.map((project, index) => {
        const { containerClass, aspectClass } = getLayoutClasses(index);
        return (
          <div key={project._id || index} className={containerClass}>
            <ProjectCard
              project={project}
              aspectRatioClass={aspectClass}
              priority={index < 2}
            />
          </div>
        );
      })}
    </div>
  );
}
