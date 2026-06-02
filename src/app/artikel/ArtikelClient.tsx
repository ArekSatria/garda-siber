"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Search,
  Shield,
  Sparkles,
  Clock3,
} from "lucide-react";
import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";
import type { ArticleMeta } from "@/types/article";

interface Props {
  articles: ArticleMeta[];
}

export default function ArtikelClient({ articles }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = useMemo(() => {
    const dynamic = Array.from(
      new Set(
        articles
          .map((article) => article.category)
          .filter((value): value is string => Boolean(value)),
      ),
    ).sort();
    return ["Semua", ...dynamic];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Semua" || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  const featuredArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

  return (
    <PageLayout>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00a9d8]/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00a9d8]/20 bg-[#00a9d8]/10 backdrop-blur-sm px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#00a9d8]">
              <BookOpen size={14} />
              Pusat Pengetahuan
            </div>
            <h1 className="mt-6 text-4xl font-black leading-[1.15] text-slate-900 sm:text-5xl lg:text-6xl tracking-tight">
              Edukasi keamanan digital yang{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a9d8] to-[#259b9a]">
                mudah dipahami
              </span>
            </h1>
          </div>

          <div className="mt-10 max-w-3xl animate-fade-in-up delay-100">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00a9d8] to-[#259b9a] rounded-[24px] blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
              <div className="relative flex items-center bg-white rounded-[22px] border border-slate-200 shadow-sm">
                <Search className="absolute left-5 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Cari topik, kata kunci, atau jenis ancaman..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent py-4 pl-14 pr-6 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none rounded-[22px]"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5 animate-fade-in-up delay-200">
            {categories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    active
                      ? "bg-[#00a9d8] text-white shadow-md shadow-[#00a9d8]/30 scale-105"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-[#00a9d8]/30 hover:text-[#00a9d8]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 min-h-[50vh]">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-500">
            Menampilkan{" "}
            <span className="font-bold text-slate-700">
              {filteredArticles.length}
            </span>{" "}
            dari{" "}
            <span className="font-bold text-slate-700">{articles.length}</span>{" "}
            artikel.
          </div>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#00a9d8] hover:text-[#0d9edf] transition-colors"
          >
            Cek pemahaman lewat quiz <ChevronRight size={16} />
          </Link>
        </div>

        {featuredArticle ? (
          <div className="mb-12 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(0,169,216,0.06)] group transition-all hover:border-[#00a9d8]/30">
            <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative h-72 lg:h-full overflow-hidden bg-slate-100">
                {featuredArticle.bannerImg ? (
                  <img
                    src={featuredArticle.bannerImg}
                    alt={featuredArticle.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-300">
                    <BookOpen size={34} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col justify-between p-8 lg:p-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#00a9d8]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#00a9d8]">
                      Artikel Pilihan
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-600">
                      {featuredArticle.category}
                    </span>
                  </div>
                  <h2 className="mt-6 text-3xl font-black leading-tight text-slate-900 group-hover:text-[#00a9d8] transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-600 font-medium">
                    {featuredArticle.summary}
                  </p>
                </div>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-6">
                  <div className="text-sm font-semibold text-slate-500">
                    <p className="text-slate-700">{featuredArticle.author}</p>
                    <p className="mt-0.5">{featuredArticle.readTime}</p>
                  </div>
                  <Link
                    href={`/artikel/${featuredArticle.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00a9d8] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#00a9d8]/20 transition-all hover:-translate-y-0.5 hover:bg-[#0d9edf]"
                  >
                    Baca Artikel <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <p className="text-base font-bold text-slate-700">
              Artikel tidak ditemukan
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Coba ubah kata kunci pencarian atau pilih kategori lain.
            </p>
          </div>
        )}

        {remainingArticles.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 animate-fade-in-up delay-100">
            {remainingArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/artikel/${article.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00a9d8]/30 hover:shadow-[0_20px_40px_-15px_rgba(0,169,216,0.15)]"
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  {article.bannerImg ? (
                    <img
                      src={article.bannerImg}
                      alt={article.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                      <BookOpen size={32} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="rounded-full bg-[#00a9d8]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#00a9d8]">
                      {article.category}
                    </span>
                    {article.level && (
                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {article.level}
                      </span>
                    )}
                  </div>
                  <h3 className="line-clamp-2 text-xl font-black leading-snug text-slate-900 transition-colors group-hover:text-[#00a9d8]">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm font-medium leading-relaxed text-slate-600 flex-1">
                    {article.summary}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <Clock3 size={14} />
                      <span>{article.readTime}</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00a9d8] transition-transform group-hover:translate-x-1 hover:text-[#0d9edf]">
                      Baca <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </PageLayout>
  );
}
