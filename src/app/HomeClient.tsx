"use client";

import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Search,
  Bell,
  FileText,
  ChevronRight,
  AlertTriangle,
  Lock,
  Mail,
  Wifi,
  Wallet,
  Smartphone,
  EyeOff,
  BookOpen,
  BarChart2,
  Check,
  ArrowRight,
  Shield,
  Globe,
  Server,
  ShieldAlert,
  Brain,
} from "lucide-react";

// ✅ Import dari konstanta terpusat (Step 1) — tidak ada lagi duplikasi
import { getCategoryStyle } from "@/constants/categories";
import { getThreatLevelStyle } from "@/constants/threats";
import { ROUTES } from "@/constants/site";
import { getAllThreats } from "@/data/threats";
import type { ArticleMeta } from "@/types";
import type { Notification } from "@/types";

// ✅ iconMap tetap di sini karena ini mapping Lucide component — bukan style
const ICON_MAP: Record<string, React.ElementType> = {
  Lock,
  Mail,
  Wifi,
  Wallet,
  Smartphone,
  EyeOff,
  Globe,
  Server,
  ShieldAlert,
  Shield,
};

// ✅ Notifikasi dipisah sebagai konstanta di luar komponen
// — tidak di-recreate setiap render
const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: "Waspada Ransomware Baru",
    desc: "Varian baru LockBit menyerang sektor finansial.",
    time: "10 menit lalu",
  },
  {
    id: 2,
    title: "Kebocoran Data KTP",
    desc: "Diduga 2 juta data bocor di forum intelijen.",
    time: "2 jam lalu",
  },
];

interface Props {
  latestArticles: ArticleMeta[];
}

export default function HomeClient({ latestArticles }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);

  // ✅ Pakai getThreatLevelStyle dari @/constants/threats — hapus levelMap duplikat
  const currentThreats = getAllThreats()
    .slice(0, 4)
    .map((t) => {
      const levelStyle = getThreatLevelStyle(t.level);
      return {
        id: t.id,
        title: t.title,
        desc: t.shortDesc.split(" ").slice(0, 4).join(" "),
        level: levelStyle.label,
        levelColor: levelStyle.badgeClass,
        icon: ICON_MAP[t.iconName] ?? ShieldAlert,
        iconBg: levelStyle.iconBg,
      };
    });

  // ✅ Pakai getCategoryStyle dari @/constants/categories
  // — hapus rantai ternary panjang borderColor & iconColor
  const popularTopics = latestArticles.slice(0, 3).map((art) => {
    const catStyle = getCategoryStyle(art.category);
    const Icon = ICON_MAP[catStyle.iconName] ?? Shield;
    return {
      title: art.title.split(":")[0].split("dan")[0].trim(),
      slug: art.slug,
      imageUrl: art.bannerImg,
      icon: Icon,
      borderColor: catStyle.borderColor,
      iconColor: catStyle.iconColor,
    };
  });

  const filteredArticles = latestArticles
    .filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice(0, 5);

  const filteredThreats = currentThreats.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.desc.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <PageLayout>
      {/* ── HEADER ── */}
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Cari artikel, jenis ancaman, atau kategori siber..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Cari konten"
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#0F52BA] transition-all font-medium text-slate-700"
            />
          </div>
        </div>

        {/* NOTIFIKASI */}
        <div className="relative ml-4">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifikasi"
            aria-expanded={showNotifications}
            className={`p-2 rounded-full transition-colors relative ${
              showNotifications
                ? "bg-slate-100 text-[#0F52BA]"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            <Bell size={22} />
            {hasNewNotifications && (
              <span
                className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"
                aria-label="Ada notifikasi baru"
              />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden py-2">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-black text-xs text-slate-800 uppercase tracking-wider">
                  Pemberitahuan Siber
                </span>
                {hasNewNotifications && (
                  <button
                    onClick={() => setHasNewNotifications(false)}
                    className="text-[10px] font-bold text-[#0F52BA] flex items-center gap-1 hover:underline"
                  >
                    <Check size={10} /> Tandai dibaca
                  </button>
                )}
              </div>
              <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
                {NOTIFICATIONS.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <h5 className="font-bold text-slate-800 text-xs mb-0.5">
                      {notif.title}
                    </h5>
                    <p className="text-slate-500 text-[11px] leading-relaxed font-medium">
                      {notif.desc}
                    </p>
                    <span className="text-[10px] text-slate-400 font-bold mt-1.5 block">
                      {notif.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── KONTEN UTAMA ── */}
      <main className="p-8 flex-1 space-y-8">
        {/* HERO BANNER */}
        <div className="w-full min-h-[280px] bg-gradient-to-r from-slate-950 via-[#0A1E3F] to-slate-950 rounded-[2rem] shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between px-8 md:px-12 py-6 md:py-0 relative overflow-hidden">
          <div className="max-w-xl text-white space-y-4 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest">
              <Shield size={12} aria-hidden="true" /> Garda Siber Indonesia
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-none text-slate-50">
              Lindungi Diri dari <br className="hidden md:block" /> Ancaman
              Siber
            </h2>
            <p className="text-slate-300 font-medium text-xs md:text-sm leading-relaxed">
              Pelajari cara mengenali, mencegah, dan mengamankan aset digital
              instansi serta privasi personal Anda secara komprehensif melalui
              pusat literasi kami.
            </p>
            <div className="pt-2 flex justify-center md:justify-start">
              <Link
                href={ROUTES.articles}
                className="bg-[#0F52BA] hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-black uppercase tracking-wider text-xs transition-all flex items-center gap-2 shadow-lg shadow-blue-900/30 border border-blue-500/30"
              >
                <BookOpen size={14} aria-hidden="true" /> Mulai belajar
              </Link>
            </div>
          </div>

          <div className="w-full md:w-[420px] h-48 md:h-64 relative flex items-center justify-center overflow-hidden mt-6 md:mt-0 z-10 [perspective:1000px]">
            <Image
              src="/images/logo-siber.png"
              alt="Logo Resmi Reserse Siber Polri"
              fill
              className="object-contain animate-siber-rotate [transform-style:preserve-3d] will-change-transform select-none"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-15" />
        </div>

        {/* GRID UTAMA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* ── KIRI (2/3) ── */}
          <div className="lg:col-span-2 flex flex-col gap-6 h-full">
            {/* ARTIKEL */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col flex-1">
              <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-4">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
                  <FileText
                    size={20}
                    className="text-[#0F52BA]"
                    aria-hidden="true"
                  />
                  <h3>Artikel edukasi siber</h3>
                </div>
                <Link
                  href={ROUTES.articles}
                  className="text-xs font-black text-[#0F52BA] hover:underline flex items-center gap-1 uppercase tracking-wider"
                >
                  Lihat semua <ChevronRight size={14} />
                </Link>
              </div>

              <div className="divide-y divide-slate-100 flex-1">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => {
                    // ✅ Satu baris — pakai getCategoryStyle, hapus iconBgMap inline
                    const catStyle = getCategoryStyle(article.category);
                    const Icon = ICON_MAP[catStyle.iconName] ?? Shield;
                    return (
                      <Link
                        key={article.slug}
                        href={`${ROUTES.articles}/${article.slug}`}
                        className="flex gap-4 items-center py-4 first:pt-1 last:pb-1 hover:bg-slate-50 px-3 -mx-3 rounded-xl transition-colors cursor-pointer group block"
                      >
                        <div
                          className={`p-3 rounded-xl transition-colors ${catStyle.iconBg} group-hover:bg-[#EBF3FF] group-hover:text-[#0F52BA] shrink-0`}
                        >
                          <Icon size={22} aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-800 mb-1 group-hover:text-[#0F52BA] transition-colors leading-snug truncate">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs font-medium">
                            {/* ✅ Pakai catStyle.badgeBg — tidak hardcode #EBF3FF */}
                            <span
                              className={`${catStyle.badgeBg} px-2 py-0.5 rounded-md text-[10px] uppercase font-black tracking-wider`}
                            >
                              {article.category}
                            </span>
                            <span className="text-slate-400">
                              {article.date}
                            </span>
                          </div>
                        </div>
                        <ChevronRight
                          size={16}
                          className="text-slate-300 group-hover:text-[#0F52BA] group-hover:translate-x-0.5 transition-all shrink-0"
                        />
                      </Link>
                    );
                  })
                ) : (
                  <div className="text-center py-12 text-slate-400 text-sm font-bold">
                    Artikel tidak ditemukan.
                  </div>
                )}
              </div>
            </div>

            {/* KATEGORI TREN */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4 shrink-0">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-4">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
                  <BarChart2
                    size={18}
                    className="text-[#0F52BA]"
                    aria-hidden="true"
                  />
                  <h3>Kategori tren pekan ini</h3>
                </div>
                <Link
                  href={ROUTES.articles}
                  className="text-xs font-black text-[#0F52BA] hover:underline flex items-center gap-1 uppercase tracking-wider text-[11px]"
                >
                  Jelajahi semua <ChevronRight size={12} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {popularTopics.map((topic, index) => (
                  <Link
                    href={`${ROUTES.articles}/${topic.slug}`}
                    key={index}
                    className={`bg-white border border-slate-100 border-l-4 ${topic.borderColor} rounded-xl hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between min-h-[220px] shadow-sm overflow-hidden`}
                  >
                    <div className="h-28 w-full overflow-hidden relative bg-slate-50">
                      {/* ✅ Ganti <img> biasa dengan next/image untuk optimasi */}
                      <Image
                        src={topic.imageUrl}
                        alt={topic.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="absolute top-2 left-2 z-10">
                        <div
                          className={`w-7 h-7 rounded-lg bg-white/95 backdrop-blur-sm ${topic.iconColor} flex items-center justify-center shadow-sm`}
                        >
                          <topic.icon size={14} aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                      <h4 className="font-black text-slate-800 text-sm group-hover:text-[#0F52BA] transition-colors tracking-tight leading-tight">
                        {topic.title}
                      </h4>
                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-50 opacity-80 group-hover:opacity-100">
                        <span className="text-[9px] font-black uppercase text-slate-400 group-hover:text-[#0F52BA] tracking-wider">
                          Mulai Tinjau
                        </span>
                        <ArrowRight
                          size={12}
                          className="text-slate-300 group-hover:text-[#0F52BA] group-hover:translate-x-0.5 transition-all shrink-0"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── KANAN (1/3) ── */}
          <div className="flex flex-col gap-6 h-full">
            {/* STATUS ANCAMAN */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm shrink-0">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-lg mb-6 border-b border-slate-50 pb-4">
                <AlertTriangle
                  size={20}
                  className="text-amber-500"
                  aria-hidden="true"
                />
                <h3>Status ancaman aktif</h3>
              </div>
              <div className="space-y-4">
                {filteredThreats.length > 0 ? (
                  filteredThreats.map((threat) => (
                    <Link
                      key={threat.id}
                      href={`${ROUTES.threats}/${threat.id}`}
                      className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0 hover:bg-slate-50 px-2 -mx-2 rounded-xl transition-colors cursor-pointer group"
                    >
                      <div className="flex gap-3 items-center">
                        <div className={`p-2.5 rounded-xl ${threat.iconBg}`}>
                          <threat.icon size={20} aria-hidden="true" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm group-hover:text-[#0F52BA] transition-colors">
                            {threat.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5 font-medium">
                            {threat.desc}
                          </p>
                        </div>
                      </div>
                      {/* ✅ Pakai levelStyle.badgeClass dari konstanta */}
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${threat.levelColor}`}
                      >
                        {threat.level}
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-4 text-slate-400 text-xs font-bold">
                    Ancaman tidak ditemukan.
                  </div>
                )}
              </div>
            </div>

            {/* WIDGET QUIZ */}
            <div className="bg-gradient-to-br from-[#0F52BA] to-blue-700 rounded-2xl p-6 text-white shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <Brain size={18} className="text-blue-200" aria-hidden="true" />
                <h4 className="font-black text-sm uppercase tracking-wider">
                  Quiz Literasi Siber
                </h4>
              </div>
              <p className="text-blue-200 text-xs font-medium leading-relaxed mb-5">
                Seberapa aman digital Anda? Uji kemampuan mengenali ancaman
                siber dalam 10 soal interaktif.
              </p>
              <div className="flex gap-2 mb-5">
                {[
                  { val: "10", label: "Soal" },
                  { val: "~5", label: "Menit" },
                  { val: "3", label: "Format" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/10 rounded-xl px-3 py-2 text-center flex-1"
                  >
                    <p className="font-black text-white text-lg">{stat.val}</p>
                    <p className="text-blue-200 text-[10px] font-bold uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href={ROUTES.quiz}
                className="flex items-center justify-center gap-2 bg-white text-[#0F52BA] py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all w-full"
              >
                Mulai Quiz <ArrowRight size={14} />
              </Link>
            </div>

            {/* TIPS MITIGASI */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col flex-1">
              <div className="flex items-center gap-2 text-slate-800 font-bold mb-4 border-b border-slate-50 pb-2">
                <BookOpen
                  size={18}
                  className="text-slate-400"
                  aria-hidden="true"
                />
                <h4>Tips mitigasi hari ini</h4>
              </div>
              <div className="space-y-5 flex-1 flex flex-col justify-center">
                {[
                  "Aktifkan autentikasi dua faktor (2FA) menggunakan aplikasi authenticator di semua akun penting.",
                  "Jangan pernah mengeklik tautan atau mengunduh dokumen dari pengirim asing yang mencurigakan.",
                  "Perbarui aplikasi Mobile Banking dan sistem operasi smartphone Anda secara rutin untuk menutup celah exploit.",
                ].map((tip, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div
                      className="w-6 h-6 bg-[#0F52BA]/10 text-[#0F52BA] rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PageLayout>
  );
}
