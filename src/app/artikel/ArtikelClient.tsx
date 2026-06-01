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
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "Semua" || article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  const featuredArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

  return (
    <PageLayout>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0F52BA]">
              <BookOpen size={14} />
              Artikel Edukasi
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
              Pusat pembelajaran keamanan digital
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Jelajahi materi yang membantu Anda memahami ancaman umum,
              kebiasaan digital yang lebih aman, dan langkah pencegahan yang
              relevan untuk aktivitas sehari-hari.
            </p>
          </div>

          <div className="mt-8 max-w-6xl">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Cari topik, kata kunci, atau artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-[22px] border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0F52BA] focus:bg-white"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => {
              const active = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
                    active
                      ? "bg-[#0F52BA] text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
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
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA]"
          >
            Cek pemahaman lewat quiz
            <ChevronRight size={16} />
          </Link>
        </div>

        {featuredArticle ? (
          <div className="mb-10 overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
              <div className="h-72 bg-slate-100 lg:h-full">
                {featuredArticle.bannerImg ? (
                  <img
                    src={featuredArticle.bannerImg}
                    alt={featuredArticle.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                    <BookOpen size={34} />
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between p-7 sm:p-8">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#0F52BA]">
                      Artikel Pilihan
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                      {featuredArticle.category}
                    </span>
                    {featuredArticle.level ? (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                        {featuredArticle.level}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900">
                    {featuredArticle.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate-500">
                    <p className="font-semibold text-slate-700">
                      {featuredArticle.author}
                    </p>
                    <p>{featuredArticle.readTime}</p>
                  </div>

                  <Link
                    href={`/artikel/${featuredArticle.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F52BA] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0B3F8C]"
                  >
                    Baca Artikel
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <p className="text-base font-semibold text-slate-700">
              Artikel tidak ditemukan
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Coba ubah kata kunci pencarian atau pilih kategori lain.
            </p>
          </div>
        )}

        {remainingArticles.length > 0 ? (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {remainingArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/artikel/${article.slug}`}
                className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-52 w-full overflow-hidden bg-slate-100">
                  {article.bannerImg ? (
                    <img
                      src={article.bannerImg}
                      alt={article.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                      <BookOpen size={28} />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#0F52BA]">
                      {article.category}
                    </span>

                    {article.level ? (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                        {article.level}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-4 line-clamp-2 text-xl font-black leading-tight text-slate-900">
                    {article.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                    {article.summary}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="text-xs text-slate-500">
                      <p className="font-semibold text-slate-700">
                        {article.author}
                      </p>
                      <p>{article.readTime}</p>
                    </div>

                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA] transition group-hover:gap-3">
                      Baca
                      <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
                <Shield size={22} />
              </div>
              <h3 className="mt-5 text-xl font-black text-slate-900">
                Fokus pada pencegahan
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Materi dirancang untuk membantu pengguna mengurangi risiko
                sebelum insiden terjadi.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
                <BookOpen size={22} />
              </div>
              <h3 className="mt-5 text-xl font-black text-slate-900">
                Bahasa lebih mudah dipahami
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Topik disusun agar bisa dipahami masyarakat umum tanpa harus
                menguasai istilah teknis yang rumit.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
                <Sparkles size={22} />
              </div>
              <h3 className="mt-5 text-xl font-black text-slate-900">
                Belajar secara bertahap
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Anda bisa mulai dari artikel dasar, lalu lanjut ke topik yang
                lebih spesifik sesuai kebutuhan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PageLayout>
  );
}
