import { getLatestArticles } from "@/lib/articles";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ExternalLink, BookOpen } from "lucide-react";

export const metadata: Metadata = { title: "Daftar Inventaris Konten Siber" };

export default function DashboardArtikelPage() {
  const articles = getLatestArticles();

  const categoryColors: Record<string, string> = {
    Password: "bg-blue-50 text-blue-600 border-blue-200",
    Phishing: "bg-rose-50 text-rose-600 border-rose-200",
    Jaringan: "bg-green-50 text-[#66d47e] border-green-200",
    Penipuan: "bg-orange-50 text-[#f4af1b] border-orange-200",
    Perangkat: "bg-purple-50 text-purple-600 border-purple-200",
    "Hukum Siber": "bg-yellow-50 text-[#ffd55a] border-yellow-200",
  };

  return (
    <div className="p-6 lg:p-10 space-y-6 min-h-screen bg-[#F8FAFC]">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Katalog Konten
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Basis data repositori artikel literasi publik.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm">
          <BookOpen size={16} className="text-[#66d47e]" /> {articles.length}{" "}
          File Aktif
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-3 text-sm leading-relaxed text-blue-800">
        <FileText size={18} className="shrink-0 mt-0.5 text-blue-600" />
        <p>
          <strong>Sistem Manajemen Berbasis Markdown:</strong> Modifikasi teks
          dan penerbitan materi edukasi dilakukan secara statis melalui
          repositori file lokal <code>src/content/</code>. Sistem akan
          meregenerasi katalog secara otomatis.
        </p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Judul Artikel</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Penulis</th>
                <th className="px-6 py-4">Kronologi</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {articles.map((article) => (
                <tr
                  key={article.slug}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-slate-900 font-bold line-clamp-1">
                      {article.title}
                    </p>
                    <p className="text-slate-500 text-xs mt-1 line-clamp-1 font-medium">
                      {article.summary}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 border text-[10px] font-black uppercase rounded-lg ${categoryColors[article.category] || "bg-slate-100 border-slate-200 text-slate-600"}`}
                    >
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{article.author}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {new Date(article.date).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/artikel/${article.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold text-[#0F52BA] hover:bg-blue-50 transition-colors shadow-sm"
                    >
                      <ExternalLink size={14} /> Baca
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
