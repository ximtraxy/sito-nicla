export interface SanityImage {
  _type?: string;
  asset?: {
    _ref: string;
    _type: string;
    url?: string;
  };
  caption?: string;
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  // Proprietà opzionale per fallback locale / Unsplash
  url?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  category: string;
  coverImage: SanityImage;
  gallery?: SanityImage[];
  description?: any; // PortableText blocks o string/paragrafi
  excerpt?: string;
  year?: number;
  order?: number;
  featured?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  photographerName: string;
  tagline?: string;
  bio?: any; // PortableText o string
  profileImage?: SanityImage;
  contactEmail?: string;
  socialLinks?: SocialLink[];
  heroImage?: SanityImage;
  heroText?: string;
}
