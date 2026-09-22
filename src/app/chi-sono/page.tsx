import { Metadata } from 'next';
import Image from 'next/image';
import { sanityFetch } from '@/sanity/client';
import { SITE_SETTINGS_QUERY } from '@/sanity/queries';
import { mockSiteSettings } from '@/sanity/mockData';
import { SiteSettings } from '@/types';
import { urlForImage } from '@/sanity/image';
import PortableBody from '@/components/PortableBody';
import { Instagram, Mail, ArrowUpRight } from 'lucide-react';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Chi Sono | Nicla Cristiano',
  description:
    'Biografia e contatti di Nicla Cristiano, fotografa professionista specializzata in ritratti, reportage e fotografia editoriale.',
};

export default async function AboutPage() {
  const sanitySettings = await sanityFetch<SiteSettings>({
    query: SITE_SETTINGS_QUERY,
    tags: ['siteSettings'],
  });

  const settings = sanitySettings || mockSiteSettings;
  const profileImageUrl = urlForImage(settings.profileImage) || '/001.jpg';

  return (
    <div className="pt-28 pb-24 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Intestazione Sezione */}
      <div className="mb-12 border-b border-white/10 pb-6 flex items-center justify-between text-xs font-sans tracking-widest uppercase text-neutral-400">
        <span>Biografia & Contatti</span>
        <span>Nicla Cristiano</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Colonna Foto Profilo */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 border border-white/5 rounded-sm shadow-2xl">
            <Image
              src={profileImageUrl}
              alt={settings.photographerName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-serif text-xl text-neutral-100">
                {settings.photographerName}
              </p>
              <p className="font-sans text-xs tracking-widest text-neutral-400 uppercase mt-1">
                @niclacristiano_foto_
              </p>
            </div>
          </div>
        </div>

        {/* Colonna Testo Bio & Contatti */}
        <div className="lg:col-span-7 space-y-12">
          <div>
            <span className="font-sans text-xs tracking-widest uppercase text-neutral-400">
              Profilo Artistico
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-neutral-100 font-light tracking-tight mt-2 mb-8 leading-tight">
              Catturare l&apos;autenticità della luce e del tempo.
            </h1>

            {/* Testo Biografico con PortableBody */}
            <div className="text-neutral-300">
              <PortableBody content={settings.bio} />
            </div>
          </div>

          {/* Citazione editoriale d'impatto */}
          <div className="p-8 border-y border-white/10 bg-neutral-950/40">
            <blockquote className="font-serif text-xl sm:text-2xl text-neutral-200 font-light italic leading-relaxed">
              &ldquo;Ogni fotografia è un dialogo silenzioso tra ciò che si rivela e ciò che resta in ombra. Non cerco la perfezione, ma la vibrazione viva dell&apos;istante.&rdquo;
            </blockquote>
            <p className="font-sans text-xs tracking-widest uppercase text-neutral-400 mt-4">
              — Nicla Cristiano
            </p>
          </div>

          {/* Sezione Contatti e Social */}
          <div id="contatti" className="pt-6 space-y-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-neutral-100 mb-2">
                Iniziamo un Progetto
              </h2>
              <p className="font-sans text-sm text-neutral-400 leading-relaxed max-w-xl">
                Per informazioni su shooting fotografici, collaborazioni editoriali, matrimoni o stampe fine-art, scrivi direttamente o contattami sui canali social.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Box Email */}
              <div className="p-6 rounded-sm border border-neutral-800 bg-neutral-900/40">
                <div className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-neutral-400 mb-2">
                  <Mail className="w-4 h-4 text-white" />
                  <span>Email Diretta</span>
                </div>
                <a
                  href={`mailto:${settings.contactEmail || 'niclacristiano.foto@gmail.com'}`}
                  className="font-serif text-lg sm:text-xl text-neutral-200 hover:text-white transition-colors break-all"
                >
                  {settings.contactEmail || 'niclacristiano.foto@gmail.com'}
                </a>
              </div>

              {/* Box Instagram */}
              <div className="p-6 rounded-sm border border-neutral-800 bg-neutral-900/40">
                <div className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-neutral-400 mb-2">
                  <Instagram className="w-4 h-4 text-white" />
                  <span>Instagram</span>
                </div>
                <a
                  href="https://www.instagram.com/niclacristiano_foto_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-serif text-lg sm:text-xl text-neutral-200 hover:text-white transition-colors"
                >
                  <span>@niclacristiano_foto_</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Tutti i link Social */}
            {settings.socialLinks && settings.socialLinks.length > 0 && (
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <span className="font-sans text-xs tracking-widest uppercase text-neutral-400">
                  Segui su:
                </span>
                {settings.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs tracking-wider uppercase px-3 py-1.5 rounded-full border border-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white transition-colors"
                  >
                    <span>{social.platform}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
