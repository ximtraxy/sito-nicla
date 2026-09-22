import Link from 'next/link';
import { Instagram, Mail, ArrowUpRight } from 'lucide-react';
import { SocialLink } from '@/types';

interface FooterProps {
  photographerName?: string;
  contactEmail?: string;
  socialLinks?: SocialLink[];
}

export default function Footer({
  photographerName = 'Nicla Cristiano',
  contactEmail = 'niclacristiano.foto@gmail.com',
  socialLinks = [
    { platform: 'Instagram', url: 'https://instagram.com/niclacristiano_foto_' },
  ],
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0c] text-neutral-400 py-16 px-6 sm:px-8 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h3 className="font-serif text-2xl text-neutral-100 tracking-wider uppercase">
            {photographerName}
          </h3>
          <p className="font-sans text-xs tracking-widest text-neutral-400 uppercase mt-1">
            Fotografia
          </p>
          <p className="font-sans text-xs text-neutral-400 mt-4">
            © {currentYear} {photographerName}. Tutti i diritti riservati.
          </p>
        </div>

        {/* Social & Contatti */}
        <div className="flex flex-wrap items-center gap-6 text-sm">
          {contactEmail && (
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-2 hover:text-white transition-colors text-xs tracking-wider uppercase"
            >
              <Mail className="w-4 h-4" />
              {contactEmail}
            </a>
          )}

          {socialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors text-xs tracking-wider uppercase"
            >
              {social.platform === 'Instagram' ? (
                <Instagram className="w-4 h-4" />
              ) : (
                <ArrowUpRight className="w-3.5 h-3.5" />
              )}
              {social.platform}
            </a>
          ))}

          <Link
            href="/studio"
            className="text-[11px] text-neutral-400 hover:text-neutral-400 underline underline-offset-4 tracking-wider uppercase ml-2"
          >
            Studio CMS
          </Link>
        </div>
      </div>
    </footer>
  );
}
