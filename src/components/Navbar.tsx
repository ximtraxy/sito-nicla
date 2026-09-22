'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  photographerName?: string;
}

export default function Navbar({ photographerName = 'Nicla Cristiano' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Non mostrare la navbar all'interno dello studio Sanity
  if (pathname?.startsWith('/studio')) {
    return null;
  }

  const navLinks = [
    { name: 'Progetti', href: '/#progetti' },
    { name: 'Chi Sono', href: '/chi-sono' },
    { name: 'Contatti', href: '/chi-sono#contatti' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0c0c0e]/85 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Logo / Nome Fotografa */}
        <Link
          href="/"
          className="group flex flex-col items-start focus:outline-none"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-wider text-neutral-100 uppercase group-hover:text-white transition-colors">
            {photographerName}
          </span>
          <span className="font-sans text-[9px] sm:text-[10px] tracking-magazine uppercase text-neutral-400">
            Portfolio Fotografico
          </span>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-sans text-xs tracking-widest uppercase transition-colors duration-200 py-1 relative ${
                  isActive
                    ? 'text-white'
                    : 'text-neutral-400 hover:text-neutral-100'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-white" />
                )}
              </Link>
            );
          })}
          <Link
            href="/studio"
            className="font-sans text-[11px] tracking-wider uppercase px-3.5 py-1.5 rounded-full border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
            title="Accedi al CMS per modificare i contenuti"
          >
            Studio CMS
          </Link>
        </nav>

        {/* Pulsante Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
          aria-label="Menu di navigazione"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Mobile a comparsa */}
      {isOpen && (
        <div className="md:hidden bg-[#0c0c0e] border-b border-white/10 px-6 py-8 space-y-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-serif text-2xl tracking-wide text-neutral-200 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/studio"
              onClick={() => setIsOpen(false)}
              className="inline-block mt-4 text-xs tracking-widest uppercase px-4 py-2 border border-neutral-700 text-neutral-300 rounded text-center"
            >
              Accedi a Sanity Studio
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
