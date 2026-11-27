export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category: string;
  eventId?: string;
  uploadedAt?: string;
}

export const galleryCategories = [
  'All',
  'Workshops',
  'Hackathons',
  'Orientation',
  'Community',
  'Team',
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

// No fake gallery images — managed via admin dashboard
export const galleryImages: GalleryImage[] = [];

