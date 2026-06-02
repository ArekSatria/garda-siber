import { createClient } from "@/lib/supabase/server";
import { getLatestArticles } from "@/lib/articles";
import { getAllThreats } from "@/data/threats";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  FileText,
  Brain,
  ShieldAlert,
  TrendingUp,
  Activity,
  Clock,
  Star,
  UserCheck,
  UserX,
  BarChart3,
  Globe,
} from "lucide-react";

export const metadata: Metadata = { title: "Overview Command Center" };

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: totalUsers },
    { count: adminCount },
    { data: recentUsers },
    { count: totalQuiz },
    { data: recentQuiz },
    { data: topScorers },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin"),
    supabase
      .from("profiles")
      .select("id, full_name, email, role, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase.from("quiz_results").select("*", { count: "exact", head: true }),
    supabase
      .from("quiz_results")
      .select("score, total, label, created_at, profiles(full_name)")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("quiz_results")
      .select("score, total, profiles(full_name)")
      .order("score", { ascending: false })
      .limit(3),
  ]);

  const articles = getLatestArticles();
  const threats = getAllThreats();
  const memberCount = (totalUsers ?? 0) - (adminCount ?? 0);

  const statsCards = [
    {
      label: "Total Pengguna",
      value: totalUsers ?? 0,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      glow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      sub: `${adminCount ?? 0} admin · ${memberCount} member`,
    },
    {
      label: "Materi Artikel",
      value: articles.length,
      icon: FileText,
      color: "from-emerald-400 to-teal-500",
      glow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      sub: "Konten edukasi siber aktif",
    },
    {
      label: "Evaluasi Quiz",
      value: totalQuiz ?? 0,
      icon: Brain,
      color: "from-violet-500 to-fuchsia-500",
      glow: "shadow-[0_0_30px_rgba(139,92,246,0.15)]",
      sub: "Total percobaan user",
    },
    {
      label: "Katalog Ancaman",
      value: threats.length,
      icon: ShieldAlert,
      color: "from-rose-500 to-orange-500",
      glow: "shadow-[0_0_30px_rgba(244,63,94,0.15)]",
      sub: "Jenis serangan tercatat",
    },
  ];

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function getRoleBadge(role: string) {
    if (role === "admin")
      return (
        <span className="px-2.5 py-1 bg-violet-500/20 border border-violet-500/30 text-violet-300 text-[10px] font-black rounded-lg uppercase tracking-wider">
          Admin
        </span>
      );
    return (
      <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-300 text-[10px] font-black rounded-lg uppercase tracking-wider">
        Member
      </span>
    );
  }

  return (
    <div className="p-8 lg:p-12 space-y-8 min-h-screen bg-[#0A101D] text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            System Overview
          </h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">
            Monitor aktivitas, pengguna, dan konten Garda Siber secara
            real-time.
          </p>
        </div>
        <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-lg">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">
            Live Server
          </span>
        </div>
      </div>

      {/* Stats Cards (Glowing Enterprise Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-fade-in-up delay-100">
        {statsCards.map((card) => (
          <div
            key={card.label}
            className={`bg-[#111827] border border-white/5 rounded-[2rem] p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/10 ${card.glow}`}
          >
            {/* Background Accent */}
            <div
              className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${card.color} opacity-20 blur-2xl rounded-full`}
            />

            <div className="flex items-start justify-between mb-6 relative z-10">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center shadow-lg`}
              >
                <card.icon size={22} className="text-white" />
              </div>
              <TrendingUp size={16} className="text-slate-500" />
            </div>
            <div className="relative z-10">
              <p className="text-4xl font-black text-white tracking-tight">
                {card.value}
              </p>
              <p className="text-slate-300 font-bold text-sm mt-1">
                {card.label}
              </p>
              <p className="text-slate-500 text-xs font-medium mt-2">
                {card.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 animate-fade-in-up delay-200">
        {/* Recent Users */}
        <div className="lg:col-span-2 bg-[#111827] border border-white/5 rounded-[2rem] p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                <Users size={18} className="text-blue-400" />
              </div>
              <h2 className="text-xl text-white font-black">
                Pengguna Terbaru
              </h2>
            </div>
            <Link
              href="/dashboard/users"
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-bold uppercase tracking-wider bg-blue-500/10 px-4 py-2 rounded-xl"
            >
              Lihat Semua
            </Link>
          </div>
          <div className="space-y-4">
            {recentUsers?.map((u: any) => (
              <div
                key={u.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                  <span className="text-white text-sm font-black">
                    {(u.full_name || u.email || "?")[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-bold truncate">
                    {u.full_name || "Pengguna Baru"}
                  </p>
                  <p className="text-slate-400 text-xs truncate mt-0.5">
                    {u.email}
                  </p>
                </div>
                <div className="hidden sm:block">{getRoleBadge(u.role)}</div>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold shrink-0">
                  <Clock size={12} />
                  <span>{formatDate(u.created_at)}</span>
                </div>
              </div>
            ))}
            {!recentUsers?.length && (
              <div className="py-10 text-center border-2 border-dashed border-white/5 rounded-2xl">
                <p className="text-slate-500 text-sm font-semibold">
                  Belum ada pengguna
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Top Scorers & Breakdown */}
        <div className="space-y-8">
          {/* Top Scorers */}
          <div className="bg-[#111827] border border-white/5 rounded-[2rem] p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
                <Star size={18} className="text-amber-400" />
              </div>
              <h2 className="text-white font-black text-lg">
                Papan Peringkat Quiz
              </h2>
            </div>
            <div className="space-y-4">
              {topScorers?.map((r: any, i: number) => {
                const pct = Math.round((r.score / r.total) * 100);
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/5"
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                        i === 0
                          ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                          : i === 1
                            ? "bg-gradient-to-br from-slate-300 to-slate-500 text-slate-900"
                            : "bg-white/10 text-amber-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <p className="text-slate-200 text-sm font-bold flex-1 truncate">
                      {r.profiles?.full_name || "Anonim"}
                    </p>
                    <span className="text-emerald-400 text-sm font-black bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                      {pct}%
                    </span>
                  </div>
                );
              })}
              {!topScorers?.length && (
                <p className="text-slate-500 text-xs text-center py-4 font-semibold">
                  Belum ada data evaluasi.
                </p>
              )}
            </div>
          </div>

          {/* User Breakdown */}
          <div className="bg-[#111827] border border-white/5 rounded-[2rem] p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-violet-500/10 border border-violet-500/20 rounded-xl flex items-center justify-center">
                <BarChart3 size={18} className="text-violet-400" />
              </div>
              <h2 className="text-white font-black text-lg">
                Distribusi Akses
              </h2>
            </div>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck size={16} className="text-violet-400" />
                  <span className="text-slate-300 text-sm font-bold">
                    Admin System
                  </span>
                </div>
                <span className="text-white font-black text-lg">
                  {adminCount ?? 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserX size={16} className="text-blue-400" />
                  <span className="text-slate-300 text-sm font-bold">
                    Member Publik
                  </span>
                </div>
                <span className="text-white font-black text-lg">
                  {memberCount}
                </span>
              </div>
              {(totalUsers ?? 0) > 0 && (
                <div className="pt-2">
                  <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all"
                      style={{
                        width: `${((memberCount / (totalUsers ?? 1)) * 100).toFixed(1)}%`,
                      }}
                    />
                  </div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2 text-right">
                    {((memberCount / (totalUsers ?? 1)) * 100).toFixed(0)}%
                    Pengguna Publik
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
