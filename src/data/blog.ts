export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  authorAvatar?: string;
  publishedAt?: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  readTime?: number;
}

export const blogCategories = [
  'All',
  'Tech',
  'Community',
  'Events',
  'Tutorials',
  'Announcements',
] as const;

export type BlogCategory = (typeof blogCategories)[number];

// No fake blog posts — managed via admin dashboard
export const blogPosts: BlogPost[] = [];

export const getBlogBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

export const getPublishedPosts = (): BlogPost[] =>
  blogPosts.filter((p) => p.status === 'published');

