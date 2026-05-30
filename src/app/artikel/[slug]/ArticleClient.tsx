"use client";

import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ArticleData, ArticleMeta } from "@/lib/articles";

interface Props {
  artikel: ArticleData | null;
  terkait: ArticleMeta[];
  slug: string;
}

export default function ArticleClient({ artikel, terkait }: Props) {
  if (!artikel) return notFound();

  const art = artikel;
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function checkFavorite() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      const { data } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("article_slug", art.slug)
        .single();

      setIsFavorite(!!data);
    }
    checkFavorite();
  }, [art.slug]);

  async function handleToggleFavorite() {
    if (!userId) {
      window.location.href = "/login";
      return;
    }
    setFavLoading(true);
    const supabase = createClient();

    if (isFavorite) {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("article_slug", art.slug);
      setIsFavorite(false);
    } else {
      await supabase.from("favorites").insert({
        user_id: userId,
        article_slug: art.slug,
        article_title: art.title,
        article_category: art.category,
        article_banner: art.bannerImg,
      });
      setIsFavorite(true);
    }
    setFavLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-w-0">
        {/* TOP BAR */}
        <div className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40">
          <Link
            href="/artikel"
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#0F52BA] transition-colors"
          >
            <ChevronLeft size={16} /> Kembali ke Pusat Artikel
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleFavorite}
              disabled={favLoading}
              className={`p-2 rounded-xl transition-colors ${
                isFavorite
                  ? "text-red-500 bg-red-50 hover:bg-red-100"
                  : "text-slate-400 hover:bg-slate-50"
              }`}
              title={isFavorite ? "Hapus dari favorit" : "Simpan ke favorit"}
            >
              <Bookmark
                size={18}
                className={isFavorite ? "fill-red-500" : ""}
              />
            </button>
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <div className="p-8 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ARTIKEL UTAMA */}
          <main className="lg:col-span-8 space-y-6">
            <div className="h-64 md:h-80 w-full rounded-[2rem] overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
              <img
                src={art.bannerImg}
                alt={art.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
              {/* Metadata */}
              <div className="flex flex-wrap gap-4 items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span className="bg-[#EBF3FF] text-[#0F52BA] px-3 py-1 rounded-md text-[10px] font-black">
                  {art.category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar size={14} /> {art.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} /> {art.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <User size={14} /> {art.author}
                </div>
              </div>

              {/* Judul */}
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight uppercase">
                {art.title}
              </h1>

              {/* Summary */}
              <div className="p-5 bg-slate-50 border-l-4 border-[#0F52BA] rounded-r-2xl">
                <p className="text-slate-700 font-semibold leading-relaxed text-sm">
                  {art.summary}
                </p>
              </div>

              {/* Konten Markdown */}
              <div
                className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-headings:uppercase prose-h2:text-xl prose-h2:mt-8 prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-800 prose-li:text-slate-600 prose-li:font-medium prose-blockquote:border-l-4 prose-blockquote:border-[#0F52BA] prose-blockquote:bg-blue-50/50 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[#0F52BA] prose-code:font-mono prose-ol:space-y-2"
                dangerouslySetInnerHTML={{ __html: art.contentHtml }}
              />

              {/* Tombol Like */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs text-slate-400 font-bold uppercase">
                  Apakah artikel ini membantu Anda?
                </p>
                <button className="flex items-center gap-2 bg-slate-50 hover:bg-[#EBF3FF] hover:text-[#0F52BA] border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 transition-colors">
                  <ThumbsUp size={14} /> Membantu
                </button>
              </div>
            </div>
          </main>

          {/* SIDEBAR KANAN */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                <BookOpen size={16} className="text-slate-400" /> Edukasi
                Terkait
              </h3>
              <div className="space-y-4">
                {terkait.map((item, i) => (
                  <Link
                    key={i}
                    href={`/artikel/${item.slug}`}
                    className="block p-4 bg-slate-50/60 hover:bg-[#EBF3FF] border border-transparent hover:border-blue-100 rounded-2xl group transition-all"
                  >
                    <span className="text-[9px] font-black text-[#0F52BA] bg-white px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm mt-2 group-hover:text-[#0F52BA] transition-colors leading-tight">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-wider">
                      Baca panduan{" "}
                      <ArrowRight
                        size={12}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Banner Tips */}
            <div className="bg-slate-900 p-6 rounded-[2rem] text-white">
              <ShieldAlert className="text-blue-400 mb-4" size={28} />
              <h4 className="font-black text-sm uppercase tracking-wide mb-2">
                Tetap Waspada
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed font-medium mb-4">
                Pelajari lebih banyak cara melindungi diri dari ancaman digital
                terkini.
              </p>
              <Link
                href="/tips"
                className="flex items-center gap-2 text-xs font-black text-blue-400 hover:text-blue-300 uppercase tracking-wider transition-colors"
              >
                Lihat Tips Keamanan <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
        <Footer />
      </div>
    </div>
  );
}
