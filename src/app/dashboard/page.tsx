import { createClient } from "@/lib/supabase/server";
import { getLatestArticles } from "@/lib/articles";
import { getAllThreats } from "@/data/threats";
import type { Metadata } from "next";
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

export const metadata: Metadata = { title: "Overview" };

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
      color: "from-blue-500 to-blue-600",
      shadow: "shadow-blue-500/30",
      sub: `${adminCount ?? 0} admin · ${memberCount} member`,
    },
    {
      label: "Total Artikel",
      value: articles.length,
      icon: FileText,
      color: "from-emerald-500 to-emerald-600",
      shadow: "shadow-emerald-500/30",
      sub: "Konten edukasi siber",
    },
    {
      label: "Total Quiz Dimainkan",
      value: totalQuiz ?? 0,
      icon: Brain,
      color: "from-violet-500 to-violet-600",
      shadow: "shadow-violet-500/30",
      sub: "Semua percobaan quiz",
    },
    {
      label: "Jenis Ancaman",
      value: threats.length,
      icon: ShieldAlert,
      color: "from-rose-500 to-rose-600",
      shadow: "shadow-rose-500/30",
      sub: "Ancaman siber tercatat",
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
        <span className="px-2 py-0.5 bg-violet-500/20 text-violet-400 text-[10px] font-bold rounded-full uppercase">
          Admin
        </span>
      );
    return (
      <span className="px-2 py-0.5 bg-slate-700 text-slate-400 text-[10px] font-bold rounded-full uppercase">
        Member
      </span>
    );
  }

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Dashboard Overview</h1>
          <p className="text-slate-400 text-sm mt-1">
            Selamat datang di panel administrasi Garda Siber
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl border border-slate-700">
          <Activity size={14} className="text-emerald-400 animate-pulse" />
          <span className="text-slate-300 text-sm font-semibold">Live System</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {statsCards.map((card) => (
          <div
            key={card.label}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-lg ${card.shadow}`}
              >
                <card.icon size={18} className="text-white" />
              </div>
              <TrendingUp size={14} className="text-emerald-400" />
            </div>
            <p className="text-3xl font-black text-white">{card.value}</p>
            <p className="text-slate-300 font-semibold text-sm mt-0.5">{card.label}</p>
            <p className="text-slate-500 text-xs mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users size={15} className="text-blue-400" />
              </div>
              <h2 className="text-white font-bold">Pengguna Terbaru</h2>
            </div>
            
              href="/dashboard/users"
              className="text-xs text-slate-400 hover:text-violet-400 transition-colors font-semibold"
            >
              Lihat semua →
            </a>
          </div>
          <div className="space-y-3">
            {recentUsers?.map((u: any) => (
              <div
                key={u.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 transition-all"
              >
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-slate-300 text-xs font-black">
                    {(u.full_name || u.email || "?")[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm font-semibold truncate">
                    {u.full_name || "—"}
                  </p>
                  <p className="text-slate-500 text-xs truncate">{u.email}</p>
                </div>
                {getRoleBadge(u.role)}
                <div className="flex items-center gap-1 text-slate-500 text-xs shrink-0">
                  <Clock size={11} />
                  <span>{formatDate(u.created_at)}</span>
                </div>
              </div>
            ))}
            {!recentUsers?.length && (
              <p className="text-slate-600 text-sm text-center py-4">
                Belum ada pengguna
              </p>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Top Scorers */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <Star size={15} className="text-amber-400" />
              </div>
              <h2 className="text-white font-bold text-sm">Skor Quiz Tertinggi</h2>
            </div>
            <div className="space-y-2.5">
              {topScorers?.map((r: any, i: number) => {
                const pct = Math.round((r.score / r.total) * 100);
                return (
                  <div key={i} className="flex items-center gap-2.5">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                        i === 0
                          ? "bg-amber-500 text-white"
                          : i === 1
                          ? "bg-slate-400 text-white"
                          : "bg-amber-900/50 text-amber-400"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <p className="text-slate-300 text-xs font-semibold flex-1 truncate">
                      {r.profiles?.full_name || "Anonim"}
                    </p>
                    <span className="text-emerald-400 text-xs font-black">{pct}%</span>
                  </div>
                );
              })}
              {!topScorers?.length && (
                <p className="text-slate-600 text-xs text-center py-2">
                  Belum ada quiz
                </p>
              )}
            </div>
          </div>

          {/* User Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
                <BarChart3 size={15} className="text-violet-400" />
              </div>
              <h2 className="text-white font-bold text-sm">Komposisi Pengguna</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck size={14} className="text-violet-400" />
                  <span className="text-slate-300 text-xs font-semibold">Admin</span>
                </div>
                <span className="text-white font-black text-sm">{adminCount ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserX size={14} className="text-blue-400" />
                  <span className="text-slate-300 text-xs font-semibold">Member</span>
                </div>
                <span className="text-white font-black text-sm">{memberCount}</span>
              </div>
              {(totalUsers ?? 0) > 0 && (
                <div className="mt-2">
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all"
                      style={{
                        width: `${((memberCount / (totalUsers ?? 1)) * 100).toFixed(1)}%`,
                      }}
                    />
                  </div>
                  <p className="text-slate-600 text-[10px] mt-1">
                    {((memberCount / (totalUsers ?? 1)) * 100).toFixed(0)}% member dari total
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Content Stats */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Globe size={15} className="text-emerald-400" />
              </div>
              <h2 className="text-white font-bold text-sm">Konten Website</h2>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">Artikel</span>
                <span className="text-white font-bold text-sm">{articles.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">Jenis Ancaman</span>
                <span className="text-white font-bold text-sm">{threats.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">Kategori Artikel</span>
                <span className="text-white font-bold text-sm">6</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Quiz Activity */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
              <Brain size={15} className="text-violet-400" />
            </div>
            <h2 className="text-white font-bold">Aktivitas Quiz Terbaru</h2>
          </div>
          
            href="/dashboard/quiz"
            className="text-xs text-slate-400 hover:text-violet-400 transition-colors font-semibold"
          >
            Lihat semua →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-slate-500 text-xs font-bold uppercase tracking-wider pb-3">
                  Pengguna
                </th>
                <th className="text-left text-slate-500 text-xs font-bold uppercase tracking-wider pb-3">
                  Skor
                </th>
                <th className="text-left text-slate-500 text-xs font-bold uppercase tracking-wider pb-3">
                  Label
                </th>
                <th className="text-left text-slate-500 text-xs font-bold uppercase tracking-wider pb-3">
                  Waktu
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {recentQuiz?.map((q: any, i: number) => {
                const pct = Math.round((q.score / q.total) * 100);
                return (
                  <tr key={i} className="hover:bg-slate-800/50 transition-all">
                    <td className="py-3 text-slate-300 text-sm font-semibold">
                      {q.profiles?.full_name || "Anonim"}
                    </td>
                    <td className="py-3">
                      <span
                        className={`text-sm font-black ${
                          pct >= 80
                            ? "text-emerald-400"
                            : pct >= 60
                            ? "text-blue-400"
                            : "text-rose-400"
                        }`}
                      >
                        {q.score}/{q.total} ({pct}%)
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg">
                        {q.label}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500 text-xs">
                      {formatDate(q.created_at)}
                    </td>
                  </tr>
                );
              })}
              {!recentQuiz?.length && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-600 text-sm">
                    Belum ada aktivitas quiz
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}