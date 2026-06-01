"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  LayoutList,
  Sparkles,
  User2,
} from "lucide-react";

import ArticleRichBody from "@/components/artikel/ArticleRichBody";
import type { Article, ArticleMeta } from "@/types/article";

type ArticleClientProps = {
  article: Article;
  relatedArticles: ArticleMeta[];
};

type TocItem = {
  id: string;
  text: string;
  level: "h2" | "h3";
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[^;\s]+;/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, "").trim();
}

function buildProcessedHtml(html: string) {
  const toc: TocItem[] = [];
  const usedIds = new Map<string, number>();

  const processedHtml = html.replace(
    /<(h2|h3)>(.*?)<\/\1>/g,
    (match, tag, innerHtml: string) => {
      const text = stripHtml(innerHtml);
      if (!text) return match;

      const baseId = slugify(text);
      const currentCount = usedIds.get(baseId) ?? 0;
      usedIds.set(baseId, currentCount + 1);

      const id = currentCount === 0 ? baseId : `${baseId}-${currentCount + 1}`;

      toc.push({
        id,
        text,
        level: tag,
      });

      return `<${tag} id="${id}">${innerHtml}</${tag}>`;
    },
  );

  return { processedHtml, toc };
}

function formatDate(value?: string) {
  if (!value) return "-";

  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function getLevelTone(level?: string) {
  const value = (level || "").toLowerCase();

  if (value.includes("dasar")) {
    return "border-emerald-100 bg-emerald-50 text-emerald-700";
  }

  if (value.includes("menengah")) {
    return "border-amber-100 bg-amber-50 text-amber-700";
  }

  if (value.includes("lanjut")) {
    return "border-red-100 bg-red-50 text-red-700";
  }

  return "border-blue-100 bg-blue-50 text-[#0F52BA]";
}

export default function ArticleClient({
  article,
  relatedArticles,
}: ArticleClientProps) {
  const { processedHtml, toc } = useMemo(
    () => buildProcessedHtml(article.contentHtml),
    [article.contentHtml],
  );

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const ids = toc.map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [toc]);

  const articleDate = formatDate(article.date);
  const updatedDate = formatDate(article.updatedAt || article.date);
  const levelTone = getLevelTone(article.level);

  return (
    <article className="min-h-screen bg-[#F8FAFC]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="transition hover:text-[#0F52BA]">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/artikel" className="transition hover:text-[#0F52BA]">
              Artikel
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-700">{article.title}</span>
          </nav>

          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F52BA] transition hover:gap-3"
          >
            <ArrowLeft size={16} />
            Kembali ke pusat artikel
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0F52BA]">
                  {article.category}
                </span>

                {article.level ? (
                  <span
                    className={`rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] ${levelTone}`}
                  >
                    {article.level}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-5 max-w-4xl text-balance text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
                {article.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {article.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                  <User2 size={16} className="text-[#0F52BA]" />
                  {article.author}
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                  <Clock3 size={16} className="text-[#0F52BA]" />
                  {article.readTime}
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                  <CalendarDays size={16} className="text-[#0F52BA]" />
                  Diperbarui {updatedDate}
                </div>
              </div>
            </div>

            <div>
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-sm">
                {article.bannerImg ? (
                  <div className="relative aspect-[16/11] w-full">
                    <Image
                      src={article.bannerImg}
                      alt={article.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/11] items-center justify-center bg-[linear-gradient(135deg,#F8FBFF_0%,#EEF4FF_100%)] px-8 text-center">
                    <div>
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
                        <BookOpenText size={24} />
                      </div>
                      <p className="mt-4 text-lg font-bold text-slate-900">
                        Materi edukasi Garda Siber
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        Tampilan visual artikel untuk membantu pembaca mengenali
                        topik dengan lebih cepat.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 border-t border-slate-200 pt-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck size={16} />
                Materi edukasi terstruktur
              </span>

              <span className="inline-flex items-center gap-2">
                <Sparkles size={16} />
                Ditujukan untuk pembaca umum
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/artikel"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Lihat Artikel Lain
              </Link>

              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#0F52BA] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#0B3F8C]"
              >
                Cek Pengetahuan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-[linear-gradient(135deg,#F8FBFF_0%,#EEF4FF_100%)] p-6 shadow-sm sm:p-8">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0F52BA]">
                Ringkasan Inti
              </p>
              <p className="mt-4 text-base font-medium leading-8 text-slate-700 sm:text-lg">
                {article.summary}
              </p>
            </div>

            {article.keyTakeaways && article.keyTakeaways.length > 0 ? (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
                    <BadgeCheck size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0F52BA]">
                      Poin Penting
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                      Hal utama yang perlu diingat
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  {article.keyTakeaways.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-[1.4rem] border border-slate-200 bg-slate-50 px-5 py-4"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-1 shrink-0 text-[#0F52BA]"
                      />
                      <p className="text-[1rem] leading-8 text-slate-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
              <ArticleRichBody html={processedHtml} />
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#FFF9ED_0%,#FFFFFF_55%,#F8FAFC_100%)] p-8 shadow-sm">
              <div className="max-w-3xl">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-700">
                  Lanjut Belajar
                </p>
                <h2 className="mt-4 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                  Perkuat pemahaman Anda dengan materi lanjutan
                </h2>
                <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                  Setelah membaca artikel ini, lanjutkan ke artikel terkait atau
                  gunakan evaluasi singkat untuk melihat sejauh mana pemahaman
                  Anda terhadap topik keamanan digital dasar.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/artikel"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F52BA] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0B3F8C]"
                  >
                    Jelajahi Materi
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/quiz"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cek Pengetahuan
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-[112px] lg:self-start">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
                  <LayoutList size={20} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0F52BA]">
                    Daftar Isi
                  </p>
                  <h3 className="mt-1 text-xl font-black text-slate-950">
                    Navigasi cepat
                  </h3>
                </div>
              </div>

              <nav className="mt-5 space-y-2">
                {toc.map((item) => {
                  const active = activeSection === item.id;

                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block rounded-2xl px-4 py-3 text-sm transition ${
                        active
                          ? "bg-blue-50 font-bold text-[#0F52BA]"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      } ${item.level === "h3" ? "ml-4" : ""}`}
                    >
                      {item.text}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0F52BA]">
                Metadata Artikel
              </p>
              <h3 className="mt-2 text-xl font-black text-slate-950">
                Informasi ringkas
              </h3>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Penulis
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {article.author}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Kategori
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {article.category}
                  </p>
                </div>

                {article.audience ? (
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Audiens
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {article.audience}
                    </p>
                  </div>
                ) : null}

                {article.level ? (
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Level
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {article.level}
                    </p>
                  </div>
                ) : null}

                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Durasi baca
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {article.readTime}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Dipublikasikan
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {articleDate}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Diperbarui
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {updatedDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#F8FBFF_0%,#EEF4FF_100%)] p-6 shadow-sm">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0F52BA]">
                Langkah Berikutnya
              </p>
              <h3 className="mt-2 text-xl font-black text-slate-950">
                Jadikan pembelajaran lebih menyeluruh
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Lanjutkan ke artikel lain dalam topik serupa atau evaluasi
                pemahaman Anda setelah membaca materi ini.
              </p>

              <div className="mt-5 grid gap-3">
                <Link
                  href="/artikel"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#0F52BA] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0B3F8C]"
                >
                  Lihat Artikel Lain
                </Link>

                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Cek Pengetahuan
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {relatedArticles.length > 0 ? (
        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0F52BA]">
                  <BookOpenText size={14} />
                  Artikel Terkait
                </div>

                <h2 className="mt-4 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                  Materi lain yang relevan untuk Anda baca selanjutnya
                </h2>
                <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
                  Melanjutkan ke materi yang berkaitan akan membantu Anda
                  membangun pemahaman yang lebih utuh, bukan hanya pada satu
                  topik.
                </p>
              </div>

              <Link
                href="/artikel"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA]"
              >
                Lihat semua artikel
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedArticles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/artikel/${item.slug}`}
                  className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
                >
                  {item.bannerImg ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={item.bannerImg}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}

                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#0F52BA]">
                        {item.category}
                      </span>

                      {item.level ? (
                        <span className="rounded-full bg-slate-200 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-700">
                          {item.level}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-4 text-xl font-black leading-tight text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.summary}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                      <span className="text-sm font-semibold text-slate-500">
                        {item.readTime}
                      </span>

                      <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA] transition group-hover:gap-3">
                        Baca artikel
                        <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
