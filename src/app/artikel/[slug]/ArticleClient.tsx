"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Copy,
  ListTree,
  Share2,
  Sparkles,
  UserRound,
} from "lucide-react";

import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";
import type { Article, ArticleMeta } from "@/types/article";

type Props = {
  article: Article;
  previousArticle: ArticleMeta | null;
  nextArticle: ArticleMeta | null;
  relatedArticles: ArticleMeta[];
};

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

function stripHtmlTags(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&nbsp;/g, " ")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function buildProcessedHtml(contentHtml: string): {
  html: string;
  headings: TocItem[];
} {
  const usedIds = new Map<string, number>();
  const headings: TocItem[] = [];

  const html = contentHtml.replace(
    /<h([23])>(.*?)<\/h\1>/gis,
    (_, levelRaw: string, innerHtml: string) => {
      const level = Number(levelRaw) as 2 | 3;
      const text = stripHtmlTags(innerHtml);

      if (!text) {
        return `<h${level}>${innerHtml}</h${level}>`;
      }

      const baseId = slugify(text) || `section-${headings.length + 1}`;
      const count = usedIds.get(baseId) ?? 0;
      const finalId = count > 0 ? `${baseId}-${count + 1}` : baseId;

      usedIds.set(baseId, count + 1);
      headings.push({ id: finalId, text, level });

      return `<h${level} id="${finalId}" class="scroll-mt-32">${innerHtml}</h${level}>`;
    },
  );

  return { html, headings };
}

function estimateWordCount(html: string) {
  const text = stripHtmlTags(html);
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

export default function ArticleClient({
  article,
  previousArticle,
  nextArticle,
  relatedArticles,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState<string>("");

  const processed = useMemo(
    () => buildProcessedHtml(article.contentHtml),
    [article.contentHtml],
  );

  const wordCount = useMemo(
    () => estimateWordCount(article.contentHtml),
    [article.contentHtml],
  );

  const badges = [article.category, article.level, article.audience].filter(
    Boolean,
  ) as string[];

  const takeaways =
    processed.headings.length > 0
      ? processed.headings.slice(0, 3).map((item) => item.text)
      : [
          "Pahami inti topik secara ringkas dan bertahap.",
          "Fokus pada pencegahan dan kebiasaan digital yang lebih aman.",
          "Gunakan materi ini sebagai dasar sebelum melanjutkan ke topik lain.",
        ];

  useEffect(() => {
    const onScroll = () => {
      const articleElement = document.getElementById("article-content");
      if (!articleElement) return;

      const rect = articleElement.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = articleElement.offsetHeight;
      const viewportHeight = window.innerHeight;
      const totalScrollable = Math.max(articleHeight - viewportHeight, 1);

      const progress =
        ((window.scrollY - articleTop + 120) / totalScrollable) * 100;

      setReadingProgress(Math.max(0, Math.min(100, progress)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (processed.headings.length === 0) return;

    const elements = processed.headings
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveHeading(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -65% 0px",
        threshold: [0, 0.2, 0.5, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [processed.headings]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        });
        return;
      }

      await handleCopyLink();
    } catch {
      // ignore
    }
  };

  return (
    <PageLayout>
      <div className="fixed inset-x-0 top-[78px] z-40 h-[3px] bg-slate-200/40">
        <div
          className="h-full bg-[#0F52BA] transition-[width] duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="min-h-screen bg-[#F8FAFC]">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
            <div className="mb-6">
              <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <Link href="/" className="transition hover:text-[#0F52BA]">
                  Beranda
                </Link>
                <span>/</span>
                <Link
                  href="/artikel"
                  className="transition hover:text-[#0F52BA]"
                >
                  Artikel
                </Link>
                <span>/</span>
                <span className="font-medium text-slate-700">
                  {article.category}
                </span>
              </nav>

              <Link
                href="/artikel"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F52BA] transition hover:gap-3"
              >
                <ArrowLeft size={16} />
                Kembali ke daftar artikel
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#0F52BA]"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-5 max-w-5xl">
              <h1 className="text-balance text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-[3.45rem] lg:leading-[1.05]">
                {article.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {article.summary}
              </p>
            </div>

            <div className="mt-8 grid gap-4 border-t border-slate-200 pt-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <UserRound size={16} />
                  {article.author}
                </span>

                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} />
                  {article.updatedAt || article.date || "-"}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Clock3 size={16} />
                  {article.readTime}
                </span>

                <span className="inline-flex items-center gap-2">
                  <BookOpenText size={16} />
                  {wordCount.toLocaleString("id-ID")} kata
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Share2 size={16} />
                  Bagikan
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Copy size={16} />
                  {copied ? "Link disalin" : "Salin link"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {article.bannerImg ? (
          <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-100 shadow-sm">
              <div className="aspect-[16/8] w-full">
                <img
                  src={article.bannerImg}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-8">
              <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
                    <Sparkles size={22} />
                  </div>

                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0F52BA]">
                      Ringkasan cepat
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-900">
                      Poin penting dari artikel ini
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {takeaways.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-[#0F52BA]"
                      />
                      <p className="text-sm leading-7 text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                id="article.contentHtml"
                className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-10"
              >
                <div
                  className="prose prose-slate max-w-none prose-headings:font-black prose-a:text-[#0F52BA]"
                  dangerouslySetInnerHTML={{ __html: processed.html }}
                />
              </div>

              {(previousArticle || nextArticle) && (
                <div className="grid gap-4 md:grid-cols-2">
                  {previousArticle ? (
                    <Link
                      href={`/artikel/${previousArticle.slug}`}
                      className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                        Artikel sebelumnya
                      </p>
                      <h3 className="mt-3 text-lg font-black leading-snug text-slate-900">
                        {previousArticle.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {previousArticle.summary}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA] transition group-hover:gap-3">
                        Buka artikel
                        <ChevronRight size={16} />
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextArticle ? (
                    <Link
                      href={`/artikel/${nextArticle.slug}`}
                      className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                        Artikel berikutnya
                      </p>
                      <h3 className="mt-3 text-lg font-black leading-snug text-slate-900">
                        {nextArticle.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {nextArticle.summary}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA] transition group-hover:gap-3">
                        Buka artikel
                        <ChevronRight size={16} />
                      </span>
                    </Link>
                  ) : null}
                </div>
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-[112px] lg:self-start">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
                    <ListTree size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0F52BA]">
                      Daftar Isi
                    </p>
                    <h3 className="mt-1 text-lg font-black text-slate-900">
                      Navigasi cepat
                    </h3>
                  </div>
                </div>

                {processed.headings.length > 0 ? (
                  <nav className="mt-5 space-y-2">
                    {processed.headings.map((heading) => {
                      const active = activeHeading === heading.id;

                      return (
                        <a
                          key={heading.id}
                          href={`#${heading.id}`}
                          className={`block rounded-2xl px-4 py-3 text-sm transition ${
                            active
                              ? "bg-blue-50 font-bold text-[#0F52BA]"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          } ${heading.level === 3 ? "ml-4" : ""}`}
                        >
                          {heading.text}
                        </a>
                      );
                    })}
                  </nav>
                ) : (
                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    Daftar isi akan muncul otomatis jika artikel memiliki
                    subjudul.
                  </p>
                )}
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
                    <BookOpenText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0F52BA]">
                      Info Artikel
                    </p>
                    <h3 className="mt-1 text-lg font-black text-slate-900">
                      Detail singkat
                    </h3>
                  </div>
                </div>

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
                      Waktu baca
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {article.readTime}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Jumlah kata
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {wordCount.toLocaleString("id-ID")} kata
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Pembaruan
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {article.updatedAt || article.date || "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(135deg,#F8FBFF_0%,#EEF4FF_55%,#FFFFFF_100%)] p-6 shadow-sm">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0F52BA]">
                  Langkah berikutnya
                </p>
                <h3 className="mt-2 text-xl font-black text-slate-900">
                  Lanjutkan pembelajaran Anda
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Setelah membaca artikel ini, lanjutkan ke materi lain atau cek
                  pemahaman Anda melalui quiz singkat.
                </p>

                <div className="mt-5 grid gap-3">
                  <Link
                    href="/artikel"
                    className="inline-flex items-center justify-center rounded-2xl bg-[#0F52BA] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0B3F8C]"
                  >
                    Jelajahi Materi
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
                    <Sparkles size={14} />
                    Rekomendasi
                  </div>

                  <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                    Artikel terkait yang bisa Anda lanjutkan
                  </h2>
                  <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
                    Materi ini dipilih agar alur belajar Anda tetap terhubung
                    dan lebih mudah dipahami secara bertahap.
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
                    className="group rounded-[30px] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
                  >
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#0F52BA]">
                        {item.category}
                      </span>
                      {item.level ? (
                        <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                          {item.level}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-4 text-xl font-black leading-tight text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.summary}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500">
                      <div>
                        <p className="font-semibold text-slate-700">
                          {item.author}
                        </p>
                        <p>{item.readTime}</p>
                      </div>

                      <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA] transition group-hover:gap-3">
                        Baca
                        <ChevronRight size={16} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-[linear-gradient(135deg,#F8FBFF_0%,#EEF4FF_55%,#FFFFFF_100%)] p-8 shadow-sm sm:p-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0F52BA]">
                  <Sparkles size={14} />
                  Lanjut Belajar
                </div>

                <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                  Perluas pemahaman Anda dengan materi berikutnya
                </h2>

                <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                  Gunakan artikel ini sebagai pijakan awal, lalu lanjutkan ke
                  topik lain yang relevan atau uji pemahaman Anda melalui quiz.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/artikel"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F52BA] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0B3F8C]"
                  >
                    Kembali ke Artikel
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
        </section>

        <Footer />
      </article>
    </PageLayout>
  );
}
