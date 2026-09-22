import { groq } from 'next-sanity';

// Tutti i progetti ordinati per campo "order" e poi "year"
export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc, year desc) {
    _id,
    title,
    slug,
    category,
    year,
    featured,
    order,
    coverImage,
    "excerpt": array::join(string::split((pt::text(description)), "")[0..140], "") + "..."
  }
`;

// Progetti ordinati con featured per primi
export const HOME_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(featured desc, order asc, year desc) {
    _id,
    title,
    slug,
    category,
    year,
    featured,
    order,
    coverImage,
    "excerpt": array::join(string::split((pt::text(description)), "")[0..140], "") + "..."
  }
`;

// Singolo progetto con galleria completa e descrizione
export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    year,
    featured,
    coverImage,
    description,
    gallery[] {
      _key,
      asset,
      caption,
      alt,
      hotspot,
      crop
    }
  }
`;

// Tutti gli slug per static generation
export const ALL_PROJECT_SLUGS_QUERY = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

// Impostazioni sito (singleton)
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    photographerName,
    tagline,
    heroText,
    heroImage,
    profileImage,
    bio,
    contactEmail,
    socialLinks[] {
      platform,
      url
    }
  }
`;
