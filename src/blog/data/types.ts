export interface ArticleAuthor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface ArticleFAQItem {
  question: string;
  answer: string;
}

export interface BlogArticle {
  title: string;
  seoTitle?: string;
  slug: string;
  description: string; // Used for meta description and list card summaries
  keywords?: string[];
  category: string;
  tags?: string[];
  author: ArticleAuthor;
  publishedDate: string;
  updatedDate: string;
  featuredImage: string;
  content: string; // Main body content (Markdown format with headings for TOC)
  faq?: ArticleFAQItem[];
}
