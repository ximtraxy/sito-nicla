export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

export const useCdn = process.env.NODE_ENV === 'production';

// Verifica se Sanity è configurato con un Project ID valido
export const isSanityConfigured = (): boolean => {
  return Boolean(
    projectId &&
    projectId.trim() !== '' &&
    projectId !== 'your_project_id_here' &&
    projectId !== 'placeholder'
  );
};
