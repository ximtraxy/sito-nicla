import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { sanityFetch } from '@/sanity/client';
import { SITE_SETTINGS_QUERY } from '@/sanity/queries';
import { mockSiteSettings } from '@/sanity/mockData';
import { SiteSettings } from '@/types';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://niclacristiano.com'
  ),
  title: {
    default: 'Nicla Cristiano | Portfolio Fotografico Editoriale',
    template: '%s | Nicla Cristiano',
  },
  description:
    'Portfolio fotografico di Nicla Cristiano.',
  keywords: [
    'Nicla Cristiano',
    'fotografa',
    'portfolio fotografico',
    'fotografia editoriale',
    'ritratti',
    'reportage',
    'moda',
  ],
  authors: [{ name: 'Nicla Cristiano' }],
  creator: 'Nicla Cristiano',
  openGraph: {
    title: 'Nicla Cristiano | Portfolio Fotografico',
    description:
      'Portfolio fotografico di Nicla Cristiano.',
    url: 'https://niclacristiano.com',
    siteName: 'Nicla Cristiano Portfolio',
    images: [
      {
        url: '/001.jpg',
        width: 1200,
        height: 630,
        alt: 'Nicla Cristiano Portfolio',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Recupera le impostazioni da Sanity se configurato, altrimenti usa i dati di fallback
  const settings =
    (await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY })) ||
    mockSiteSettings;

  return (
    <html lang="it" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-[#0c0c0e] text-editorial-text font-sans antialiased min-h-screen flex flex-col justify-between">
        <Navbar photographerName={settings.photographerName} />
        <main className="flex-grow">{children}</main>
        <Footer
          photographerName={settings.photographerName}
          contactEmail={settings.contactEmail}
          socialLinks={settings.socialLinks}
        />
      </body>
    </html>
  );
}
