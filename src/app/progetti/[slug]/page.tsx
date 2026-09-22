import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { sanityFetch } from '@/sanity/client';
import {
  PROJECT_BY_SLUG_QUERY,
  ALL_PROJECTS_QUERY,
  ALL_PROJECT_SLUGS_QUERY,
} from '@/sanity/queries';
import { mockProjects } from '@/sanity/mockData';
import { Project } from '@/types';
import { urlForImage } from '@/sanity/image';
import PortableBody from '@/components/PortableBody';
import ProjectGallery from '@/components/ProjectGallery';
import { ArrowLeft, ArrowRight, ArrowUpLeft } from 'lucide-react';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60;

// Genera parametri statici per build-time pre-rendering
export async function generateStaticParams() {
  const sanitySlugs = await sanityFetch<string[]>({
    query: ALL_PROJECT_SLUGS_QUERY,
  });

  if (sanitySlugs && sanitySlugs.length > 0) {
    return sanitySlugs.map((slug) => ({ slug }));
  }

  return mockProjects.map((p) => ({ slug: p.slug.current }));
}

// Genera metadati dinamici per SEO e Open Graph
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const sanityProject = await sanityFetch<Project>({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug: params.slug },
  });

  const project =
    sanityProject || mockProjects.find((p) => p.slug.current === params.slug);

  if (!project) {
    return {
      title: 'Progetto Non Trovato',
    };
  }

  const coverUrl = urlForImage(project.coverImage);

  return {
    title: `${project.title} | Nicla Cristiano`,
    description:
      project.excerpt ||
      `Servizio fotografico ${project.title} (${project.category}, ${project.year}) di Nicla Cristiano.`,
    openGraph: {
      title: `${project.title} — Nicla Cristiano`,
      description:
        project.excerpt || `Fotografia: ${project.category} (${project.year})`,
      images: coverUrl ? [{ url: coverUrl, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // Fetch del progetto da Sanity
  const sanityProject = await sanityFetch<Project>({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: [`project:${params.slug}`],
  });

  // Fallback ai progetti mock se non trovato o Sanity non configurato
  const project =
    sanityProject || mockProjects.find((p) => p.slug.current === params.slug);

  if (!project) {
    notFound();
  }

  // Fetch di tutti i progetti per calcolare precedente e successivo
  const allProjectsRaw = await sanityFetch<Project[]>({
    query: ALL_PROJECTS_QUERY,
  });
  const allProjects =
    allProjectsRaw && allProjectsRaw.length > 0 ? allProjectsRaw : mockProjects;

  const currentIndex = allProjects.findIndex(
    (p) => p.slug.current === params.slug
  );
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  // Immagini della galleria: unisci coverImage e gallery se presenti
  const galleryImages = [
    ...(project.coverImage ? [project.coverImage] : []),
    ...(project.gallery || []),
  ];

  return (
    <article className="pt-28 pb-24 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Navigazione Indietro */}
      <div className="mb-8">
        <Link
          href="/#progetti"
          className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowUpLeft className="w-4 h-4" />
          <span>Torna a tutti i progetti</span>
        </Link>
      </div>

      {/* Intestazione Editoriale del Progetto */}
      <header className="mb-16 border-b border-white/10 pb-12">
        <div className="flex items-center gap-3 text-xs sm:text-sm font-sans tracking-widest uppercase text-neutral-400 mb-4">
          <span className="text-neutral-200">{project.category}</span>
          {project.year && (
            <>
              <span>/</span>
              <span>{project.year}</span>
            </>
          )}
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-neutral-100 font-light tracking-tight leading-tight max-w-4xl">
          {project.title}
        </h1>

        {/* Descrizione Editoriale */}
        {project.description && (
          <div className="mt-8 max-w-3xl">
            <PortableBody content={project.description} />
          </div>
        )}
      </header>

      {/* Galleria Immagini con Layout Editoriale Asimmetrico e Lightbox */}
      <section className="mb-24">
        <div className="mb-8 flex items-center justify-between text-xs font-sans tracking-widest uppercase text-neutral-400">
          <span>Galleria Fotografica</span>
          <span>{galleryImages.length} Scatti • Clicca per ingrandire</span>
        </div>

        <ProjectGallery gallery={galleryImages} />
      </section>

      {/* Navigazione Progetto Precedente / Successivo */}
      <nav className="border-t border-white/10 pt-12 mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {prevProject && (
            <Link
              href={`/progetti/${prevProject.slug.current}`}
              className="group p-6 rounded-sm border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/80 transition-all flex flex-col items-start"
            >
              <div className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-neutral-400 mb-2">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Progetto Precedente</span>
              </div>
              <span className="font-serif text-2xl text-neutral-200 group-hover:text-white transition-colors">
                {prevProject.title}
              </span>
              <span className="text-xs text-neutral-400 mt-1 uppercase font-sans tracking-wider">
                {prevProject.category}
              </span>
            </Link>
          )}

          {nextProject && (
            <Link
              href={`/progetti/${nextProject.slug.current}`}
              className="group p-6 rounded-sm border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/80 transition-all flex flex-col items-end text-right"
            >
              <div className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-neutral-400 mb-2">
                <span>Progetto Successivo</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <span className="font-serif text-2xl text-neutral-200 group-hover:text-white transition-colors">
                {nextProject.title}
              </span>
              <span className="text-xs text-neutral-400 mt-1 uppercase font-sans tracking-wider">
                {nextProject.category}
              </span>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
