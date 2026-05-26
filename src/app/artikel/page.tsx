import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
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
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-w-0">
        <ArtikelClient articles={articles} />
        <Footer />
      </div>
    </div>
  );
}
