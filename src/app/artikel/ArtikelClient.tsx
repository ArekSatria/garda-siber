"use client";

import {
  Search,
  Lock,
  Mail,
  Globe,
  Shield,
  ShieldAlert,
  ChevronRight,
  Smartphone,
  UserX,
  Database,
  Radio,
  Key,
  Fingerprint,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { formatDate, type ArticleMeta } from "@/lib/articles";
import type { ArticleMeta } from "@/lib/articles";

const iconMap: Record<string, React.ElementType> = {
  Lock,
  Mail,
  Globe,
  Shield,
  ShieldAlert,
  Smartphone,
  UserX,
  Database,
  Radio,
  Key,
  Fingerprint,
};

interface Props {
  articles: ArticleMeta[];
}

export default function ArtikelClient({ articles }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("Semua");

  const kategoriTabs = [
    "Semua",
    "Password",
    "Phishing",
    "Jaringan",
    "Penipuan",
    "Perangkat",
    "Hukum Siber",
  ];

  const filtered = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesKategori =
      selectedKategori === "Semua" || art.category === selectedKategori;
    return matchesSearch && matchesKategori;
  });

  return (
    <>
      {/* HEADER SEARCH BAR */}
      <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="relative w-full max-w-xl">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Cari artikel atau modus kejahatan siber..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#0F52BA] font-medium"
          />
        </div>
        <p className="text-xs font-bold text-slate-400 ml-6 shrink-0">
          {filtered.length} dari {articles.length} artikel
        </p>
      </header>

      {/* MAIN CONTENT */}
      <main className="p-12 max-w-5xl mx-auto w-full space-y-10 flex-1">
        <div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight">
            Pusat Literasi Artikel
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Daftar komprehensif analisis modus operandi kejahatan digital dan
            regulasi hukum siber nasional.
          </p>
        </div>

        {/* FILTER TABS */}
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-6">
          {kategoriTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedKategori(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                selectedKategori === tab
                  ? "bg-[#0F52BA] text-white border-[#0F52BA] shadow-lg shadow-blue-700/20"
                  : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ARTIKEL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.length > 0 ? (
            filtered.map((art) => {
              const Icon = iconMap[art.iconName] ?? Shield;
              return (
                <Link
                  href={`/artikel/${art.slug}`}
                  key={art.slug}
                  className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all flex flex-col justify-between group cursor-pointer overflow-hidden"
                >
                  {/* SAMPUL */}
                  <div className="h-52 w-full overflow-hidden relative bg-slate-100">
                    <img
                      src={art.bannerImg}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-black text-[#0F52BA] bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-sm">
                        {art.category}
                      </span>
                    </div>
                  </div>

                  {/* KONTEN */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-[#EBF3FF] group-hover:text-[#0F52BA] transition-colors mb-4">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-black text-slate-800 text-xl group-hover:text-[#0F52BA] transition-colors leading-tight">
                        {art.title}
                      </h3>
                      <p className="text-slate-500 text-sm font-medium mt-3 leading-relaxed line-clamp-2">
                        {art.summary}
                      </p>
                    </div>

                    {/* FOOTER CARD */}
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-50">
                      <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                        <span>{art.date}</span>
                        <span className="text-slate-200">•</span>
                        <span>{art.readTime}</span>
                      </div>
                      <div className="w-9 h-9 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-[#0F52BA] group-hover:text-white transition-all shrink-0">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-2 text-center py-16 text-slate-400 font-bold text-sm">
              Tidak ada artikel yang cocok dengan pencarian Anda.
            </div>
          )}
        </div>
      </main>
    </>
  );
}
