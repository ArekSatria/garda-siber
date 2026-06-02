"use client";

import PageLayout from "@/components/PageLayout";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  User,
  BookOpen,
  Brain,
  Heart,
  Trophy,
  Calendar,
  Clock,
  ChevronRight,
  Trash2,
  ShieldCheck,
  Star,
  TrendingUp,
  LogOut,
  CheckCircle2,
  XCircle,
  Edit2,
  Save,
  X,
  ShieldAlert,
  LayoutGrid, // <-- Icon tambahan untuk Admin
} from "lucide-react";

interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

interface Favorite {
  id: string;
  article_slug: string;
  article_title: string;
  article_category: string;
  article_banner: string;
  created_at: string;
}

interface QuizResult {
  id: string;
  score: number;
  total: number;
  label: string;
  created_at: string;
}

interface Props {
  profile: Profile;
  favorites: Favorite[];
  quizResults: QuizResult[];
}

export default function ProfilClient({
  profile,
  favorites,
  quizResults,
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "favorit" | "quiz">(
    "overview",
  );
  const [favList, setFavList] = useState<Favorite[]>(favorites);
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(profile?.full_name || "");
  const [savingName, setSavingName] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const avgScore =
    quizResults.length > 0
      ? Math.round(
          quizResults.reduce((a, b) => a + (b.score / b.total) * 100, 0) /
            quizResults.length,
        )
      : 0;

  const bestScore =
    quizResults.length > 0
      ? Math.max(
          ...quizResults.map((r) => Math.round((r.score / r.total) * 100)),
        )
      : 0;

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function getScoreColor(pct: number) {
    if (pct >= 80)
      return "text-emerald-600 bg-emerald-50 ring-1 ring-emerald-200/50";
    if (pct >= 60) return "text-blue-600 bg-blue-50 ring-1 ring-blue-200/50";
    if (pct >= 40) return "text-amber-600 bg-amber-50 ring-1 ring-amber-200/50";
    return "text-red-600 bg-red-50 ring-1 ring-red-200/50";
  }

  async function handleSaveName() {
    if (!newName.trim()) return;
    setSavingName(true);
    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({ full_name: newName.trim() })
      .eq("id", profile.id);
    setSavingName(false);
    setEditName(false);
    router.refresh();
  }

  async function handleRemoveFavorite(favId: string) {
    const supabase = createClient();
    await supabase.from("favorites").delete().eq("id", favId);
    setFavList((prev) => prev.filter((f) => f.id !== favId));
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "favorit", label: `Favorit (${favList.length})`, icon: Heart },
    { id: "quiz", label: `Riwayat Quiz (${quizResults.length})`, icon: Brain },
  ] as const;

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12 min-h-[80vh]">
        {/* HEADER PROFIL PREMIUM */}
        <div className="relative bg-[#0B1121] rounded-[2.5rem] pt-14 pb-24 px-6 lg:px-12 overflow-hidden shadow-2xl animate-fade-in-up">
          {/* Subtle Glow Effects */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0F52BA] rounded-full blur-[120px] opacity-30 pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[100px] opacity-20 pointer-events-none -translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar Clean */}
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/10 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-2xl ring-4 ring-white/5">
                {profile?.role === "admin" ? (
                  <Star size={42} className="text-violet-400 opacity-90" />
                ) : (
                  <User size={42} className="text-white opacity-90" />
                )}
              </div>

              {/* User Info */}
              <div>
                {editName ? (
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white font-bold text-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveName}
                      disabled={savingName}
                      className="w-10 h-10 bg-emerald-500 hover:bg-emerald-400 rounded-xl flex items-center justify-center transition-all shadow-lg"
                    >
                      <Save size={16} className="text-white" />
                    </button>
                    <button
                      onClick={() => {
                        setEditName(false);
                        setNewName(profile?.full_name || "");
                      }}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl flex items-center justify-center transition-all"
                    >
                      <X size={16} className="text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                      {profile?.full_name || "Pengguna Garda Siber"}
                    </h1>
                    <button
                      onClick={() => setEditName(true)}
                      className="w-8 h-8 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg flex items-center justify-center transition-colors"
                      title="Edit Nama"
                    >
                      <Edit2 size={14} className="text-white/80" />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-4 mt-3 flex-wrap">
                  <span className="flex items-center gap-1.5 text-slate-300 text-sm font-medium">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    {profile?.email}
                  </span>
                  <span className="w-1.5 h-1.5 bg-slate-600 rounded-full hidden sm:block" />
                  <span className="text-slate-400 text-sm font-medium">
                    Bergabung{" "}
                    {formatDate(
                      profile?.created_at || new Date().toISOString(),
                    )}
                  </span>
                </div>

                <div className="mt-5">
                  {profile?.role === "admin" ? (
                    <span className="inline-flex items-center gap-1.5 bg-violet-500/20 text-violet-300 border border-violet-500/30 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                      <Star size={12} /> Administrator
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                      <User size={12} /> Member
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* BUTTON ACTION AREA (Admin Shortcut & Logout) */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto mt-6 md:mt-0">
              {profile?.role === "admin" && (
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-violet-500/30 w-full sm:w-auto hover:-translate-y-0.5"
                >
                  <LayoutGrid size={16} /> Dashboard Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-sm w-full sm:w-auto hover:-translate-y-0.5"
              >
                <LogOut size={16} /> Keluar Akun
              </button>
            </div>
          </div>
        </div>

        {/* STATS BAR (Floating Modern Card) */}
        <div className="relative z-20 w-full px-4 lg:px-12 -mt-12">
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-2 animate-fade-in-up delay-100">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="p-6 flex flex-col items-center text-center group">
                <Heart
                  size={20}
                  className="text-rose-500 mb-3 transition-transform group-hover:scale-110 group-hover:-translate-y-1"
                />
                <span className="text-3xl font-black text-slate-900 leading-none">
                  {favList.length}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                  Artikel Favorit
                </span>
              </div>
              <div className="p-6 flex flex-col items-center text-center group">
                <Brain
                  size={20}
                  className="text-purple-500 mb-3 transition-transform group-hover:scale-110 group-hover:-translate-y-1"
                />
                <span className="text-3xl font-black text-slate-900 leading-none">
                  {quizResults.length}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                  Quiz Dimainkan
                </span>
              </div>
              <div className="p-6 flex flex-col items-center text-center group">
                <TrendingUp
                  size={20}
                  className="text-blue-500 mb-3 transition-transform group-hover:scale-110 group-hover:-translate-y-1"
                />
                <span className="text-3xl font-black text-slate-900 leading-none">
                  {avgScore}%
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                  Rata-rata Skor
                </span>
              </div>
              <div className="p-6 flex flex-col items-center text-center group">
                <Trophy
                  size={20}
                  className="text-amber-500 mb-3 transition-transform group-hover:scale-110 group-hover:-translate-y-1"
                />
                <span className="text-3xl font-black text-slate-900 leading-none">
                  {bestScore}%
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                  Skor Terbaik
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TABS (Enterprise Bottom-Border Style) */}
        <div className="w-full px-4 lg:px-12 mt-10">
          <div className="flex gap-8 border-b border-slate-200 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-4 font-bold text-sm transition-colors relative whitespace-nowrap ${
                    isActive
                      ? "text-[#0F52BA]"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F52BA] rounded-t-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <main className="w-full px-4 lg:px-12 py-8 mb-12">
          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up">
              {/* Progress Literasi Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-blue-50 text-[#0F52BA] rounded-2xl flex items-center justify-center">
                    <TrendingUp size={22} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">
                      Progress Literasi
                    </h3>
                    <p className="text-sm text-slate-500">
                      Aktivitas pembelajaran Anda
                    </p>
                  </div>
                </div>

                <div className="space-y-7">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold text-slate-700">
                        Materi Dibaca
                      </span>
                      <span className="text-sm font-black text-[#0F52BA]">
                        {favList.length} / 12
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-[#0F52BA] rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: mounted
                            ? `${Math.min((favList.length / 12) * 100, 100)}%`
                            : "0%",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold text-slate-700">
                        Quiz Selesai
                      </span>
                      <span className="text-sm font-black text-emerald-600">
                        {quizResults.length}x
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out delay-100"
                        style={{
                          width: mounted
                            ? `${Math.min((quizResults.length / 5) * 100, 100)}%`
                            : "0%",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold text-slate-700">
                        Akurasi Keseluruhan
                      </span>
                      <span className="text-sm font-black text-amber-500">
                        {avgScore}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-1000 ease-out delay-200"
                        style={{ width: mounted ? `${avgScore}%` : "0%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pencapaian Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
                    <Star size={22} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">
                      Pencapaian
                    </h3>
                    <p className="text-sm text-slate-500">
                      Tanda kehormatan siber
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      label: "Anggota Garda Siber",
                      desc: "Berhasil mendaftar akun",
                      done: true,
                      icon: ShieldCheck,
                    },
                    {
                      label: "Pembaca Aktif",
                      desc: "Simpan 3+ artikel favorit",
                      done: favList.length >= 3,
                      icon: BookOpen,
                    },
                    {
                      label: "Langkah Awal",
                      desc: "Selesaikan 1 quiz evaluasi",
                      done: quizResults.length >= 1,
                      icon: Brain,
                    },
                    {
                      label: "Pakar Siber",
                      desc: "Raih skor ≥ 80% di quiz",
                      done: bestScore >= 80,
                      icon: Trophy,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                        item.done
                          ? "bg-white border-slate-200 shadow-sm"
                          : "bg-slate-50 border-transparent opacity-60 grayscale"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.done ? "bg-[#0F52BA] text-white" : "bg-slate-200 text-slate-400"}`}
                      >
                        <item.icon size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900 text-sm">
                          {item.label}
                        </p>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                      {item.done ? (
                        <CheckCircle2
                          size={20}
                          className="text-emerald-500 shrink-0"
                        />
                      ) : (
                        <XCircle
                          size={20}
                          className="text-slate-300 shrink-0"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── FAVORIT ── */}
          {activeTab === "favorit" && (
            <div className="animate-fade-in-up">
              {favList.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                  <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Heart size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    Belum Ada Favorit
                  </h3>
                  <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">
                    Simpan artikel yang menarik untuk dibaca kembali nanti
                    sebagai referensi keamanan Anda.
                  </p>
                  <Link
                    href="/artikel"
                    className="inline-flex items-center gap-2 bg-[#0F52BA] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all hover:bg-[#0B3F8C] hover:-translate-y-0.5"
                  >
                    <BookOpen size={16} /> Jelajahi Artikel
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {favList.map((fav) => (
                    <div
                      key={fav.id}
                      className="group bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 flex flex-col"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={fav.article_banner}
                          alt={fav.article_title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 left-4">
                          <span className="text-[10px] font-black text-[#0F52BA] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                            {fav.article_category}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveFavorite(fav.id)}
                          className="absolute top-4 right-4 w-9 h-9 bg-red-500/90 hover:bg-red-600 backdrop-blur-md rounded-xl flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg scale-90 group-hover:scale-100"
                          title="Hapus dari Favorit"
                        >
                          <Trash2 size={16} className="text-white" />
                        </button>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h4 className="font-black text-slate-900 text-lg leading-snug mb-4 line-clamp-2 group-hover:text-[#0F52BA] transition-colors">
                          {fav.article_title}
                        </h4>
                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                            <Calendar size={14} />
                            {formatDate(fav.created_at)}
                          </div>
                          <Link
                            href={`/artikel/${fav.article_slug}`}
                            className="flex items-center gap-1 text-sm font-bold text-[#0F52BA] transition-transform group-hover:translate-x-1"
                          >
                            Baca <ChevronRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── RIWAYAT QUIZ ── */}
          {activeTab === "quiz" && (
            <div className="animate-fade-in-up">
              {quizResults.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm">
                  <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <ShieldAlert size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    Belum Ada Riwayat Evaluasi
                  </h3>
                  <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">
                    Uji pemahaman Anda terkait keamanan digital melalui quiz
                    interaktif kami.
                  </p>
                  <Link
                    href="/quiz"
                    className="inline-flex items-center gap-2 bg-[#0F52BA] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all hover:bg-[#0B3F8C] hover:-translate-y-0.5"
                  >
                    <Brain size={16} /> Mulai Quiz Sekarang
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {quizResults.map((result, i) => {
                    const pct = Math.round((result.score / result.total) * 100);
                    return (
                      <div
                        key={result.id}
                        className="group bg-white rounded-3xl border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6 flex flex-col sm:flex-row sm:items-center gap-6 transition-all hover:shadow-md hover:border-blue-200"
                      >
                        <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center shrink-0 font-black text-slate-400 text-xl group-hover:text-[#0F52BA] group-hover:bg-blue-50 transition-colors">
                          #{quizResults.length - i}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-slate-900 text-lg mb-2">
                            {result.label}
                          </h4>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={14} className="text-slate-400" />
                              {formatDate(result.created_at)}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} className="text-slate-400" />
                              {result.total} Soal
                            </div>
                          </div>

                          <div className="mt-4 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                pct >= 80
                                  ? "bg-emerald-500"
                                  : pct >= 60
                                    ? "bg-blue-500"
                                    : pct >= 40
                                      ? "bg-amber-400"
                                      : "bg-red-500"
                              }`}
                              style={{ width: mounted ? `${pct}%` : "0%" }}
                            />
                          </div>
                        </div>

                        <div
                          className={`text-center px-6 py-4 rounded-2xl shrink-0 ${getScoreColor(pct)}`}
                        >
                          <p className="text-3xl font-black leading-none">
                            {result.score}
                          </p>
                          <p className="text-[10px] font-extrabold uppercase tracking-widest mt-1.5 opacity-80">
                            dari {result.total} Benar
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </PageLayout>
  );
}
