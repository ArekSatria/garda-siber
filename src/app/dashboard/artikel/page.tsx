import { getLatestArticles } from "@/lib/articles";
import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  ExternalLink,
  Clock,
  Tag,
  User,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = { title: "Artikel & Konten" };

export default function DashboardArtikelPage() {
  const articles = getLatestArticles();
  const kategoris = Array.from(new Set(articles.map((a) => a.category)));

  const categoryColors: Record<string, string> = {
    Password: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    Phishing: "bg-rose-500/15 text-rose-400 border-rose-500/25",
    Jaringan: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
    Penipuan: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    Perangkat: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    "Hukum Siber": "bg-violet-500/15 text-violet-400 border-violet-500/25",
    Umum: "bg-slate-500/15 text-slate-400 border-slate-500/25",
  };

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Artikel & Konten</h1>
          <p className="text-slate-400 text-sm mt-1">
            Semua konten edukasi yang tersedia di Garda Siber
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl">
          <BookOpen size={15} className="text-violet-400" />
          <span className="text-slate-300 text-sm font-bold">
            {articles.length} artikel
          </span>
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-6 gap-3">
        {kategoris.map((k) => (
          <div
            key={k}
            className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center"
          >
            <p className="text-white font-black text-xl">
              {articles.filter((a) => a.category === k).length}
            </p>
            <p className="text-slate-500 text-[10px] font-semibold mt-0.5 truncate">
              {k}
            </p>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
          <FileText size={15} className="text-amber-400" />
        </div>
        <div>
          <p className="text-amber-300 font-bold text-sm">
            Manajemen Konten Berbasis File
          </p>
          <p className="text-amber-400/70 text-xs mt-1">
            Artikel dikelola melalui file{" "}
            <code className="bg-amber-500/20 px-1 rounded">.md</code> di folder{" "}
            <code className="bg-amber-500/20 px-1 rounded">src/content/</code>.
            Untuk menambah artikel baru, buat file markdown baru di direktori
            tersebut. Perubahan akan otomatis muncul setelah deploy.
          </p>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-white font-bold">Daftar Artikel</h2>
          <span className="text-slate-500 text-sm">
            {articles.length} total
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/30">
                <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-6 py-3">
                  Judul Artikel
                </th>
                <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-6 py-3">
                  Kategori
                </th>
                <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-6 py-3">
                  Penulis
                </th>
                <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-6 py-3">
                  Waktu Baca
                </th>
                <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-6 py-3">
                  Tanggal
                </th>
                <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {articles.map((article) => (
                <tr
                  key={article.slug}
                  className="hover:bg-slate-800/30 transition-all"
                >
                  {/* Judul */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-slate-200 text-sm font-semibold">
                        {article.title}
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5 truncate max-w-xs">
                        {article.summary}
                      </p>
                    </div>
                  </td>

                  {/* Kategori */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full border ${
                        categoryColors[article.category] || categoryColors.Umum
                      }`}
                    >
                      <Tag size={10} />
                      {article.category}
                    </span>
                  </td>

                  {/* Penulis */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <User size={11} />
                      {article.author}
                    </div>
                  </td>

                  {/* Waktu Baca */}
                  <td className="px-6 py-4 text-slate-400 text-xs">
                    {article.readTime}
                  </td>

                  {/* Tanggal */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <Clock size={11} />
                      {formatDate(article.date)}
                    </div>
                  </td>

                  {/* Aksi */}
                  <td className="px-6 py-4">
                    <Link
                      href={`/artikel/${article.slug}`}
                      target="_blank"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-bold rounded-lg transition-all w-fit"
                    >
                      <ExternalLink size={12} />
                      Lihat
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
