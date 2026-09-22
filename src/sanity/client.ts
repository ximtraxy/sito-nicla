import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn, isSanityConfigured } from './env';

export const client = isSanityConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
    })
  : null;

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
}): Promise<T | null> {
  if (!client) {
    return null;
  }

  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: process.env.NODE_ENV === 'development' ? 30 : 60,
        tags,
      },
    });
  } catch (error) {
    console.warn('Errore durante la chiamata a Sanity, uso fallback:', error);
    return null;
  }
}
