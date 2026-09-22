import SplashScreen from '@/components/SplashScreen';
import ProjectGrid from '@/components/ProjectGrid';
import { sanityFetch } from '@/sanity/client';
import { HOME_PROJECTS_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/queries';
import { mockProjects, mockSiteSettings } from '@/sanity/mockData';
import { Project, SiteSettings } from '@/types';
import { isSanityConfigured } from '@/sanity/env';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export const revalidate = 60; // ISR automatico ogni 60 secondi

export default async function HomePage() {
  // Recupera i progetti e le impostazioni da Sanity se configurato, altrimenti usa mockData
  const sanityProjects = await sanityFetch<Project[]>({
    query: HOME_PROJECTS_QUERY,
    tags: ['project'],
  });

  const projects = sanityProjects && sanityProjects.length > 0
    ? sanityProjects
    : mockProjects;

  const settings =
    (await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY, tags: ['siteSettings'] })) ||
    mockSiteSettings;

  const sanityReady = isSanityConfigured();

  return (
    <>
      {/* 
        Splash Screen Scroll-Driven:
        Visibile a scrollY === 0, scompare appena si scorre, 
        non blocca lo scroll e riappare ritornando in cima.
      */}
      <SplashScreen />

      <div className="pt-28 pb-20 px-6 sm:px-8 max-w-7xl mx-auto">
        {/* Banner discreto durante il setup (mostrato solo se Sanity non ha ancora le credenziali) */}
        {!sanityReady && (
          <div className="mb-12 p-4 rounded-sm border border-neutral-800 bg-neutral-950/60 backdrop-blur text-neutral-400 text-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-200/80 flex-shrink-0" />
              <span>
                <strong>Modalità Anteprima Editoriale:</strong> Il sito è attivo con dati di esempio e foto ad alta risoluzione. Per collegare il tuo CMS Sanity gratuito, segui la guida in{' '}
                <code className="text-neutral-200">SANITY_SETUP_GUIDE.md</code>.
              </span>
            </div>
            <Link
              href="/studio"
              className="text-[11px] underline uppercase tracking-widest text-neutral-200 hover:text-white flex-shrink-0"
            >
              Apri Studio CMS
            </Link>
          </div>
        )}

        {/* Hero Editoriale */}
        <section className="mb-16 md:mb-24 pt-6">
          <div className="max-w-4xl">
            <p className="font-sans text-xs sm:text-sm tracking-widest uppercase text-neutral-400 mb-4 font-medium">
              {settings.tagline || 'Fotografia & Visual Storytelling'}
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-neutral-100 font-light tracking-tight leading-[1.05]">
              Nicla Cristiano
            </h1>
            <p className="font-sans text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mt-6 font-light leading-relaxed">
              {settings.heroText ||
                'La fotografia come racconto intimo, estetica editoriale e ricerca della luce autentica.'}
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-sans tracking-widest uppercase text-neutral-400">
            <span>Archivio Progetti Selezionati</span>
            <span>{projects.length} Progetti</span>
          </div>
        </section>

        {/* Griglia Asimmetrica Editoriale con Cover dei Progetti */}
        <section id="progetti">
          <ProjectGrid projects={projects} />
        </section>
      </div>
    </>
  );
}
