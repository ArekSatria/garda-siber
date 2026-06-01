export type ArticleFAQ = {
  question: string;
  answer: string;
};

export type ArticleSource = {
  title: string;
  url?: string;
};

export type ArticleMeta = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  updatedAt?: string;
  author: string;
  reviewedBy?: string;
  category: string;
  readTime: string;
  bannerImg?: string;
  audience?: string;
  level?: string;
  keyTakeaways?: string[];
  faq?: ArticleFAQ[];
  sources?: ArticleSource[];
  tags?: string[];
  published?: boolean;
};

export type Article = ArticleMeta & {
  contentHtml: string;
};
