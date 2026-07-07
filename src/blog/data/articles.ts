import { BlogArticle } from './types';

// Eager load all typescript article files inside the sibling '/src/blog/articles' directory.
// This allows the developer to drop in any new typescript article file matching the BlogArticle 
// interface and have it appear instantly on the blog list with zero configuration or code adjustments.
const articleModules = (import.meta as any).glob('../articles/*.ts', { eager: true }) as Record<string, { article: BlogArticle }>;

export const getArticles = (): BlogArticle[] => {
  const articles: BlogArticle[] = [];
  
  for (const path in articleModules) {
    const mod = articleModules[path];
    if (mod && mod.article) {
      // Ensure each article has a fallback keywords list
      const art = {
        ...mod.article,
        keywords: mod.article.keywords || [],
        tags: mod.article.tags || []
      };
      articles.push(art);
    }
  }
  
  // Sort articles by published date descending (newest articles first)
  return articles.sort((a, b) => {
    const dateA = new Date(a.publishedDate).getTime();
    const dateB = new Date(b.publishedDate).getTime();
    return dateB - dateA; // descending
  });
};

export const getCategories = (articles: BlogArticle[]): string[] => {
  return Array.from(new Set(articles.map(a => a.category)));
};

export const getTags = (articles: BlogArticle[]): string[] => {
  return Array.from(new Set(articles.flatMap(a => a.tags || [])));
};
