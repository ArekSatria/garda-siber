import type { Metadata } from "next";
import ArticleClient from "./ArticleClient";
import { getArticleData, getLatestArticles } from "@/lib/articles";

export async function generateStaticParams() {
  return getLatestArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artikel = getArticleData(slug);
  if (!artikel) return { title: "Artikel Tidak Ditemukan" };
  return {
    title: artikel.title,
    description: artikel.summary,
    openGraph: {
      title: artikel.title,
      description: artikel.summary,
      images: artikel.bannerImg ? [{ url: artikel.bannerImg }] : [],
    },
  };
}

export default async function ArtikelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artikel = getArticleData(slug);
  const terkait = getLatestArticles()
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return <ArticleClient artikel={artikel} terkait={terkait} slug={slug} />;
}
