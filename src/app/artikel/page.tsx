import type { Metadata } from "next";
import { getAllArticlesMeta } from "@/lib/articles";
import ArtikelClient from "./ArtikelClient";

export const metadata: Metadata = {
  title: "Artikel Edukasi",
  description:
    "Kumpulan artikel edukasi keamanan digital yang membahas ancaman umum, pencegahan, dan kebiasaan digital yang lebih aman.",
};

export default function ArtikelHubPage() {
  const articles = getAllArticlesMeta();

  return <ArtikelClient articles={articles} />;
}
