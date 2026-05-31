import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";
import { getLatestArticles } from "@/lib/articles";
import type { Metadata } from "next";
import ArtikelClient from "./ArtikelClient";

export const metadata: Metadata = {
  title: "Pusat Artikel",
  description:
    "Daftar komprehensif analisis modus operandi kejahatan digital dan regulasi hukum siber nasional.",
};

export default function ArtikelHubPage() {
  const articles = getLatestArticles();

  return (
    <PageLayout>
      <ArtikelClient articles={articles} />
      <Footer />
    </PageLayout>
  );
}
