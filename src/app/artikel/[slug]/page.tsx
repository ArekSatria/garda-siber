import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ArticleClient from "./ArticleClient";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getAllArticlesMeta,
} from "@/lib/articles";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  return {
    title: `${article.title} | Garda Siber`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticlesMeta();
  const currentIndex = allArticles.findIndex((item) => item.slug === slug);

  const previousArticle =
    currentIndex > 0 ? allArticles[currentIndex - 1] : null;

  const nextArticle =
    currentIndex >= 0 && currentIndex < allArticles.length - 1
      ? allArticles[currentIndex + 1]
      : null;

  const sameCategory = allArticles.filter(
    (item) => item.slug !== slug && item.category === article.category,
  );

  const differentCategory = allArticles.filter(
    (item) => item.slug !== slug && item.category !== article.category,
  );

  const relatedArticles = [...sameCategory, ...differentCategory].slice(0, 3);

  return (
    <ArticleClient
      article={article}
      previousArticle={previousArticle}
      nextArticle={nextArticle}
      relatedArticles={relatedArticles}
    />
  );
}
