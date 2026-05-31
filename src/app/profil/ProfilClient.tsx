"use client";

import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
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
  const [newName, setNewName] = useState(profile.full_name || "");
  const [savingName, setSavingName] = useState(false);

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
    if (pct >= 80) return "text-green-600 bg-green-50";
    if (pct >= 60) return "text-blue-600 bg-blue-50";
    if (pct >= 40) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
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
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-w-0">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#0F52BA] to-blue-700 px-10 py-8">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <User size={32} className="text-white" />
              </div>
              {/* Info */}
              <div>
                {editName ? (
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="bg-white/20 border border-white/30 rounded-lg px-3 py-1.5 text-white font-bold text-lg placeholder-white/60 focus:outline-none focus:bg-white/30 w-48"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveName}
                      disabled={savingName}
                      className="w-8 h-8 bg-green-400 hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Save size={14} className="text-white" />
                    </button>
                    <button
                      onClick={() => {
                        setEditName(false);
                        setNewName(profile.full_name);
                      }}
                      className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <X size={14} className="text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-black text-white">
                      {profile.full_name || "Pengguna Garda Siber"}
                    </h1>
                    <button
                      onClick={() => setEditName(true)}
                      className="w-7 h-7 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Edit2 size={12} className="text-white/70" />
                    </button>
                  </div>
                )}
                <p className="text-blue-200 text-sm font-medium">
                  {profile.email}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {profile.role === "admin" ? (
                    <span className="bg-violet-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest flex items-center gap-1">
                      ⚡ Administrator
                    </span>
                  ) : (
                    <span className="bg-white/20 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                      Member
                    </span>
                  )}
                  <span className="text-blue-200 text-xs font-medium">
                    Bergabung {formatDate(profile.created_at)}
                  </span>
                </div>
                {profile.role === "admin" && (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1.5 mt-2 text-xs text-violet-200 hover:text-white font-semibold underline underline-offset-2"
                  >
                    → Buka Admin Dashboard
                  </Link>
                )}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all"
            >
              <LogOut size={16} /> Keluar
            </button>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="bg-white border-b border-slate-100 shadow-sm">
          <div className="max-w-5xl mx-auto px-10 py-5 grid grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-black text-slate-900">
                {favList.length}
              </p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                Artikel Favorit
              </p>
            </div>
            <div className="text-center border-l border-slate-100">
              <p className="text-2xl font-black text-slate-900">
                {quizResults.length}
              </p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                Quiz Dimainkan
              </p>
            </div>
            <div className="text-center border-l border-slate-100">
              <p className="text-2xl font-black text-slate-900">{avgScore}%</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                Rata-rata Skor
              </p>
            </div>
            <div className="text-center border-l border-slate-100">
              <p className="text-2xl font-black text-slate-900">{bestScore}%</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                Skor Terbaik
              </p>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-10">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 font-bold text-sm border-b-2 transition-all ${
                    activeTab === tab.id
                      ? "border-[#0F52BA] text-[#0F52BA]"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KONTEN TAB */}
        <main className="flex-1 max-w-5xl mx-auto w-full px-10 py-8">
          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Progress literasi */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                    <TrendingUp size={18} className="text-[#0F52BA]" />
                  </div>
                  <h3 className="font-black text-slate-900">
                    Progress Literasi
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-500">
                        Artikel Dibaca
                      </span>
                      <span className="text-xs font-black text-slate-700">
                        {favList.length} / 12
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="h-2 bg-[#0F52BA] rounded-full transition-all"
                        style={{
                          width: `${Math.min((favList.length / 12) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-500">
                        Quiz Selesai
                      </span>
                      <span className="text-xs font-black text-slate-700">
                        {quizResults.length}x
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="h-2 bg-green-500 rounded-full transition-all"
                        style={{
                          width: `${Math.min((quizResults.length / 5) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-500">
                        Rata-rata Skor Quiz
                      </span>
                      <span className="text-xs font-black text-slate-700">
                        {avgScore}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="h-2 bg-amber-400 rounded-full transition-all"
                        style={{ width: `${avgScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pencapaian */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-yellow-50 rounded-xl flex items-center justify-center">
                    <Star size={18} className="text-yellow-500" />
                  </div>
                  <h3 className="font-black text-slate-900">Pencapaian</h3>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      label: "Anggota Garda Siber",
                      desc: "Berhasil mendaftar",
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
                      label: "Quiz Pertama",
                      desc: "Selesaikan 1 quiz",
                      done: quizResults.length >= 1,
                      icon: Brain,
                    },
                    {
                      label: "Juara Siber",
                      desc: "Raih skor 80% di quiz",
                      done: bestScore >= 80,
                      icon: Trophy,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        item.done
                          ? "bg-green-50 border-green-100"
                          : "bg-slate-50 border-slate-100 opacity-60"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          item.done ? "bg-green-500" : "bg-slate-200"
                        }`}
                      >
                        <item.icon size={15} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800 text-xs">
                          {item.label}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium">
                          {item.desc}
                        </p>
                      </div>
                      {item.done ? (
                        <CheckCircle2
                          size={16}
                          className="text-green-500 shrink-0"
                        />
                      ) : (
                        <XCircle
                          size={16}
                          className="text-slate-300 shrink-0"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Favorit terbaru */}
              {favList.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                        <Heart size={18} className="text-red-500" />
                      </div>
                      <h3 className="font-black text-slate-900">
                        Favorit Terbaru
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("favorit")}
                      className="text-xs font-bold text-[#0F52BA] hover:underline"
                    >
                      Lihat semua
                    </button>
                  </div>
                  <div className="space-y-3">
                    {favList.slice(0, 3).map((fav) => (
                      <Link
                        key={fav.id}
                        href={`/artikel/${fav.article_slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                          <img
                            src={fav.article_banner}
                            alt={fav.article_title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 text-xs leading-snug truncate group-hover:text-[#0F52BA] transition-colors">
                            {fav.article_title}
                          </p>
                          <span className="text-[10px] font-black text-[#0F52BA] bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                            {fav.article_category}
                          </span>
                        </div>
                        <ChevronRight
                          size={14}
                          className="text-slate-300 group-hover:text-[#0F52BA] shrink-0"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quiz terbaru */}
              {quizResults.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center">
                        <Brain size={18} className="text-purple-500" />
                      </div>
                      <h3 className="font-black text-slate-900">
                        Quiz Terbaru
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("quiz")}
                      className="text-xs font-bold text-[#0F52BA] hover:underline"
                    >
                      Lihat semua
                    </button>
                  </div>
                  <div className="space-y-3">
                    {quizResults.slice(0, 3).map((result) => {
                      const pct = Math.round(
                        (result.score / result.total) * 100,
                      );
                      return (
                        <div
                          key={result.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                        >
                          <div>
                            <p className="font-bold text-slate-800 text-xs">
                              {result.label}
                            </p>
                            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                              {formatDate(result.created_at)}
                            </p>
                          </div>
                          <span
                            className={`text-sm font-black px-3 py-1 rounded-full ${getScoreColor(pct)}`}
                          >
                            {result.score}/{result.total}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── FAVORIT ── */}
          {activeTab === "favorit" && (
            <div>
              {favList.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart size={28} className="text-slate-300" />
                  </div>
                  <h3 className="font-black text-slate-700 mb-2">
                    Belum Ada Favorit
                  </h3>
                  <p className="text-slate-400 text-sm font-medium mb-6">
                    Simpan artikel yang menarik untuk dibaca kembali nanti.
                  </p>
                  <Link
                    href="/artikel"
                    className="inline-flex items-center gap-2 bg-[#0F52BA] text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider"
                  >
                    <BookOpen size={16} /> Jelajahi Artikel
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {favList.map((fav) => (
                    <div
                      key={fav.id}
                      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group"
                    >
                      <div className="h-36 overflow-hidden bg-slate-100 relative">
                        <img
                          src={fav.article_banner}
                          alt={fav.article_title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-black text-[#0F52BA] bg-white/95 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                            {fav.article_category}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveFavorite(fav.id)}
                          className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={14} className="text-white" />
                        </button>
                      </div>
                      <div className="p-5">
                        <h4 className="font-black text-slate-800 text-sm leading-snug mb-3 line-clamp-2">
                          {fav.article_title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                            <Calendar size={11} />
                            {formatDate(fav.created_at)}
                          </div>
                          <Link
                            href={`/artikel/${fav.article_slug}`}
                            className="flex items-center gap-1.5 text-xs font-black text-[#0F52BA] hover:underline"
                          >
                            Baca <ChevronRight size={12} />
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
            <div>
              {quizResults.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Brain size={28} className="text-slate-300" />
                  </div>
                  <h3 className="font-black text-slate-700 mb-2">
                    Belum Ada Riwayat Quiz
                  </h3>
                  <p className="text-slate-400 text-sm font-medium mb-6">
                    Ikuti quiz untuk menguji kemampuan literasi siber Anda.
                  </p>
                  <Link
                    href="/quiz"
                    className="inline-flex items-center gap-2 bg-[#0F52BA] text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider"
                  >
                    <Brain size={16} /> Mulai Quiz
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {quizResults.map((result, i) => {
                    const pct = Math.round((result.score / result.total) * 100);
                    return (
                      <div
                        key={result.id}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center gap-6"
                      >
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 font-black text-slate-400 text-lg">
                          #{i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-black text-slate-800 text-sm">
                              {result.label}
                            </h4>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                            <div className="flex items-center gap-1">
                              <Calendar size={11} />{" "}
                              {formatDate(result.created_at)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={11} /> 10 Soal
                            </div>
                          </div>
                          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full transition-all ${
                                pct >= 80
                                  ? "bg-green-500"
                                  : pct >= 60
                                    ? "bg-blue-500"
                                    : pct >= 40
                                      ? "bg-orange-400"
                                      : "bg-red-400"
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                        <div
                          className={`text-center px-4 py-2.5 rounded-xl shrink-0 ${getScoreColor(pct)}`}
                        >
                          <p className="text-2xl font-black">{result.score}</p>
                          <p className="text-[10px] font-bold uppercase tracking-wider">
                            dari {result.total}
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
        <Footer />
      </div>
    </div>
  );
}
