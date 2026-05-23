"use client";

import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
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
} from "lucide-react";

import { getAllThreats } from "@/data/threats";

export default function Home() {
  // State manajemen fungsionalitas profesional
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);

  // Data tiruan untuk Artikel Terbaru
  const latestArticles = [
    {
      slug: "password-kuat",
      title: "Cara membuat password yang kuat dan aman",
      category: "Password",
      icon: Lock,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      slug: "ciri-phishing",
      title: "Kenali ciri-ciri email phishing sebelum terlambat",
      category: "Phishing",
      icon: Mail,
      iconBg: "bg-red-50 text-red-600",
    },
    {
      slug: "bahaya-wifi",
      title: "Bahaya WiFi publik dan cara melindungi diri",
      category: "Jaringan",
      icon: Wifi,
      iconBg: "bg-green-50 text-green-600",
    },
    {
      slug: "investasi-bodong",
      title: "Modus investasi bodong yang marak di media sosial",
      category: "Penipuan",
      icon: Wallet,
      iconBg: "bg-orange-50 text-orange-600",
    },
    {
      slug: "keamanan-hp",
      title: "Keamanan aplikasi di smartphone: apa yang perlu dicek?",
      category: "Perangkat",
      icon: Smartphone,
      iconBg: "bg-blue-50 text-blue-600",
    },
  ];

  // Data ancaman diambil dari sumber terpusat threats.ts
  const iconMap: Record<string, React.ElementType> = {
    Mail,
    Lock,
    Globe,
    EyeOff,
    Server,
    Smartphone,
  };
  const levelMap: Record<
    string,
    { label: string; levelColor: string; iconBg: string }
  > = {
    Critical: {
      label: "Kritis",
      levelColor: "text-red-600 bg-red-50",
      iconBg: "bg-red-50 text-red-600",
    },
    High: {
      label: "Tinggi",
      levelColor: "text-red-600 bg-red-50",
      iconBg: "bg-orange-50 text-orange-600",
    },
    Medium: {
      label: "Sedang",
      levelColor: "text-orange-600 bg-orange-50",
      iconBg: "bg-blue-50 text-blue-600",
    },
    Low: {
      label: "Rendah",
      levelColor: "text-green-600 bg-green-50",
      iconBg: "bg-green-50 text-green-600",
    },
  };
  const currentThreats = getAllThreats()
    .slice(0, 4)
    .map((t) => ({
      id: t.id,
      title: t.title,
      desc: t.shortDesc.split(" ").slice(0, 4).join(" "),
      level: levelMap[t.level]?.label ?? t.level,
      levelColor: levelMap[t.level]?.levelColor ?? "text-slate-600 bg-slate-50",
      icon: iconMap[t.iconName] ?? ShieldAlert,
      iconBg: levelMap[t.level]?.iconBg ?? "bg-slate-50 text-slate-600",
    }));

  // Data tiruan untuk Kategori Tren
  const popularTopics = [
    {
      title: "Keamanan Akun",
      slug: "password-kuat",
      imageUrl: "/images/password.jpg",
      icon: Lock,
      borderColor: "border-l-blue-600",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50/50",
    },
    {
      title: "Phishing & Spam",
      slug: "ciri-phishing",
      imageUrl: "/images/email.jpg",
      icon: Mail,
      borderColor: "border-l-red-600",
      iconColor: "text-red-600",
      bgColor: "bg-red-50/50",
    },
    {
      title: "Keamanan HP",
      slug: "keamanan-hp",
      imageUrl: "/images/hp.jpg",
      icon: Smartphone,
      borderColor: "border-l-green-600",
      iconColor: "text-green-600",
      bgColor: "bg-green-50/50",
    },
  ];

  // Notifikasi Siber Intelijen terbaru
  const notificationData = [
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

  // Fungsi menyaring data live
  const filteredArticles = latestArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredThreats = currentThreats.filter(
    (threat) =>
      threat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.desc.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col min-w-0">
        {/* HEADER BAR */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Cari artikel, jenis ancaman, atau kategori siber..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#0F52BA] transition-all font-medium text-slate-700"
              />
            </div>
          </div>

          {/* PANEL NOTIFIKASI */}
          <div className="relative ml-4">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-full transition-colors relative ${showNotifications ? "bg-slate-100 text-[#0F52BA]" : "text-slate-500 hover:bg-slate-100"}`}
            >
              <Bell size={22} />
              {hasNewNotifications && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
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
                  {notificationData.map((notif) => (
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

        {/* KONTEN UTAMA */}
        <main className="p-8 flex-1 space-y-8">
          <div className="w-full min-h-[280px] bg-gradient-to-r from-slate-950 via-[#0A1E3F] to-slate-950 rounded-[2rem] shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between px-8 md:px-12 py-6 md:py-0 relative overflow-hidden">
            {/* SISI KIRI: TEKS AJAKAN RESMI DAN CALL TO ACTION */}
            <div className="max-w-xl text-white space-y-4 relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest">
                <Shield size={12} /> Garda Siber Indonesia
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
                  href="/artikel"
                  className="bg-[#0F52BA] hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-black uppercase tracking-wider text-xs transition-all flex items-center gap-2 shadow-lg shadow-blue-900/30 border border-blue-500/30"
                >
                  <BookOpen size={14} /> Mulai belajar
                </Link>
              </div>
            </div>

            {/* SISI KANAN: LOGO */}
            <div className="w-full md:w-[420px] h-48 md:h-64 relative flex items-center justify-center overflow-hidden mt-6 md:mt-0 z-10 [perspective:1000px]">
              <Image
                src="/images/logo-siber.png"
                alt="Logo Resmi Reserse Siber Polri"
                fill
                className="object-contain animate-siber-rotate [transform-style:preserve-3d] will-change-transform select-none"
                priority
              />
            </div>

            {/* Ornamen Latar Belakang Digital Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-15"></div>
          </div>

          {/* GRID LAYOUT UTAMA SEJAJAR RATA AIR */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* ----------------- SEKSI KIRI (2/3 WIDTH) ----------------- */}
            <div className="lg:col-span-2 flex flex-col gap-6 h-full">
              {/* BOX ARTIKEL EDUSI SIBER */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col flex-1">
                <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-4">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
                    <FileText size={20} className="text-[#0F52BA]" />
                    <h3>Artikel edukasi siber</h3>
                  </div>
                  <Link
                    href="/artikel"
                    className="text-xs font-black text-[#0F52BA] hover:underline flex items-center gap-1 cursor-pointer uppercase tracking-wider"
                  >
                    Lihat semua <ChevronRight size={14} />
                  </Link>
                </div>

                <div className="divide-y divide-slate-100 flex-1">
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article, index) => (
                      <Link
                        key={index}
                        href={`/artikel/${article.slug}`}
                        className="flex gap-4 items-center py-4 first:pt-1 last:pb-1 hover:bg-slate-50 px-3 -mx-3 rounded-xl transition-colors cursor-pointer group block"
                      >
                        <div
                          className={`p-3 rounded-xl transition-colors ${article.iconBg} group-hover:bg-[#EBF3FF] group-hover:text-[#0F52BA] shrink-0`}
                        >
                          <article.icon size={22} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-800 mb-1 group-hover:text-[#0F52BA] transition-colors leading-snug truncate">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs font-medium">
                            <span className="bg-[#EBF3FF] text-[#0F52BA] px-2 py-0.5 rounded-md text-[10px] uppercase font-black tracking-wider">
                              {article.category}
                            </span>
                          </div>
                        </div>
                        <ChevronRight
                          size={16}
                          className="text-slate-300 group-hover:text-[#0F52BA] group-hover:translate-x-0.5 transition-all shrink-0"
                        />
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-12 text-slate-400 text-sm font-bold">
                      Artikel tidak ditemukan.
                    </div>
                  )}
                </div>
              </div>

              {/* GRID KATEGORI TREN PEKAN INI */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4 shrink-0">
                <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-4">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
                    <BarChart2 size={18} className="text-[#0F52BA]" />
                    <h3>Kategori tren pekan ini</h3>
                  </div>
                  <Link
                    href="/artikel"
                    className="text-xs font-black text-[#0F52BA] hover:underline flex items-center gap-1 uppercase tracking-wider text-[11px]"
                  >
                    Jelajahi semua <ChevronRight size={12} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {popularTopics.map((topic, index) => (
                    <Link
                      href={`/artikel/${topic.slug}`}
                      key={index}
                      className={`bg-white border border-slate-100 border-l-4 ${topic.borderColor} rounded-xl hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between min-h-[220px] shadow-sm overflow-hidden`}
                    >
                      {/* Sampul Gambar */}
                      <div className="h-28 w-full overflow-hidden relative bg-slate-50">
                        <img
                          src={topic.imageUrl}
                          alt={topic.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-2 left-2">
                          <div
                            className={`w-7 h-7 rounded-lg bg-white/95 backdrop-blur-sm ${topic.iconColor} flex items-center justify-center shadow-sm`}
                          >
                            <topic.icon size={14} />
                          </div>
                        </div>
                      </div>

                      {/* Konten Judul */}
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

            {/* ----------------- SEKSI KANAN (1/3 WIDTH) ----------------- */}
            <div className="flex flex-col gap-6 h-full">
              {/* STATUS ANCAMAN AKTIF */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm shrink-0">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-lg mb-6 border-b border-slate-50 pb-4">
                  <AlertTriangle size={20} className="text-amber-500" />
                  <h3>Status ancaman aktif</h3>
                </div>

                <div className="space-y-4">
                  {filteredThreats.length > 0 ? (
                    filteredThreats.map((threat, index) => (
                      <Link
                        key={index}
                        href={`/ancaman/${threat.id}`}
                        className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0 hover:bg-slate-50 px-2 -mx-2 rounded-xl transition-colors cursor-pointer group"
                      >
                        <div className="flex gap-3 items-center">
                          <div className={`p-2.5 rounded-xl ${threat.iconBg}`}>
                            <threat.icon size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">
                              {threat.title}
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5 font-medium">
                              {threat.desc}
                            </p>
                          </div>
                        </div>
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

              {/* TIPS MITIGASI HARI INI */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col flex-1">
                <div className="flex items-center gap-2 text-slate-800 font-bold mb-4 border-b border-slate-50 pb-2">
                  <BookOpen size={18} className="text-slate-400" />
                  <h4>Tips mitigasi hari ini</h4>
                </div>
                <div className="space-y-5 flex-1 flex flex-col justify-center">
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 bg-[#0F52BA]/10 text-[#0F52BA] rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      1
                    </div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      Aktifkan autentikasi dua faktor (2FA) menggunakan aplikasi
                      authenticator di semua akun penting.
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 bg-[#0F52BA]/10 text-[#0F52BA] rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      2
                    </div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      Jangan pernah mengeklik tautan atau mengunduh dokumen dari
                      pengirim asing yang mencurigakan.
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 bg-[#0F52BA]/10 text-[#0F52BA] rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      3
                    </div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      Perbarui aplikasi Mobile Banking dan sistem operasi
                      smartphone Anda secara rutin untuk menutup celah
                      *exploit*.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
