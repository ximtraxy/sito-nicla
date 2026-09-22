import imageUrlBuilder from '@sanity/image-url';
import { projectId, dataset } from './env';
import { SanityImage } from '@/types';

// Inizializza il builder solo se projectId è valido
const builder = projectId && projectId.trim() !== ''
  ? imageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(source: SanityImage | any): string {
  if (!source) return '';

  // Se l'immagine contiene già un URL diretto (es. da fallback Unsplash o mock locale)
  if (typeof source === 'string') return source;
  if (source.url && typeof source.url === 'string') return source.url;
  if (source.asset?.url && typeof source.asset.url === 'string') return source.asset.url;

  // Se è un'immagine nativa Sanity con asset ref
  if (builder && source.asset?._ref) {
    try {
      return builder.image(source).auto('format').fit('max').url();
    } catch {
      return source.asset?.url || '';
    }
  }

  return '';
}
