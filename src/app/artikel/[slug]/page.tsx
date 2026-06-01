import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/articles";
import ArticleClient from "./ArticleClient";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | Garda Siber",
    };
  }

  return {
    title: `${article.title} | Garda Siber`,
    description: article.summary,
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug, article.category, 3);

  return (
    <PageLayout>
      <ArticleClient article={article} relatedArticles={relatedArticles} />
      <Footer />
    </PageLayout>
  );
}
