import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-24">
      <p className="font-sans text-xs tracking-widest uppercase text-neutral-400 mb-3">
        Errore 404
      </p>
      <h1 className="font-serif text-5xl sm:text-7xl text-neutral-100 font-light mb-6">
        Pagina non trovata
      </h1>
      <p className="font-sans text-neutral-400 max-w-md mb-8 text-sm leading-relaxed">
        Il progetto o la pagina che stai cercando non esiste o è stata spostata nell&apos;archivio.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase px-6 py-3 border border-neutral-700 text-neutral-200 hover:text-white hover:border-white transition-colors rounded-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Ritorna alla Home</span>
      </Link>
    </div>
  );
}
