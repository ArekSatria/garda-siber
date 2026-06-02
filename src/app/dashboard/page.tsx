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
  Clock,
  Star,
  UserCheck,
  UserX,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = { title: "Command Center Overview" };

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: totalUsers },
    { count: adminCount },
    { data: recentUsers },
    { count: totalQuiz },
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
      .select("score, total, profiles(full_name)")
      .order("score", { ascending: false })
      .limit(4),
  ]);

  const articles = getLatestArticles();
  const threats = getAllThreats();
  const memberCount = (totalUsers ?? 0) - (adminCount ?? 0);

  const statsCards = [
    {
      label: "Total Pengguna",
      value: totalUsers ?? 0,
      icon: Users,
      color: "text-[#f4af1b]",
      bg: "bg-orange-50",
      border: "border-orange-100",
      desc: `${adminCount ?? 0} Admin · ${memberCount} Member`,
    },
    {
      label: "Materi Artikel",
      value: articles.length,
      icon: FileText,
      color: "text-[#ffd55a]",
      bg: "bg-yellow-50",
      border: "border-yellow-100",
      desc: "Konten edukasi aktif",
    },
    {
      label: "Evaluasi Quiz",
      value: totalQuiz ?? 0,
      icon: Brain,
      color: "text-[#66d47e]",
      bg: "bg-green-50",
      border: "border-green-100",
      desc: "Sesi ujian pengguna",
    },
    {
      label: "Katalog Ancaman",
      value: threats.length,
      icon: ShieldAlert,
      color: "text-slate-600",
      bg: "bg-slate-100",
      border: "border-slate-200",
      desc: "Jenis serangan siber",
    },
  ];

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="p-6 lg:p-10 space-y-8 min-h-screen bg-[#F8FAFC]">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            System Telemetry
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Pusat pemantauan data real-time platform edukasi Garda Siber.
          </p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#66d47e] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#66d47e]"></span>
          </span>
          <span className="text-[#66d47e] text-xs font-bold uppercase tracking-widest">
            Sistem Operasional
          </span>
        </div>
      </div>

      {/* Tactic Cards (Clean Minimalist) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {statsCards.map((card) => (
          <div
            key={card.label}
            className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-6">
              <div
                className={`w-12 h-12 ${card.bg} ${card.border} border rounded-2xl flex items-center justify-center`}
              >
                <card.icon size={22} className={card.color} />
              </div>
              <TrendingUp size={16} className="text-slate-400" />
            </div>
            <p className="text-4xl font-black text-slate-900 tracking-tight">
              {card.value}
            </p>
            <p className="text-sm font-bold text-slate-500 mt-1">
              {card.label}
            </p>
            <p className="text-[11px] font-semibold text-slate-400 mt-3 pt-3 border-t border-slate-100">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Main Control Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Registered Users */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 lg:p-8 flex flex-col">
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Users className="text-[#f4af1b]" size={18} /> Pengguna Terbaru
            </h2>
            <Link
              href="/dashboard/users"
              className="text-[11px] font-bold uppercase tracking-wider text-[#0F52BA] bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Lihat Semua
            </Link>
          </div>
          <div className="space-y-3 flex-1">
            {recentUsers?.map((u: any) => (
              <div
                key={u.id}
                className="flex items-center gap-4 p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center text-sm font-black text-slate-600">
                  {(u.full_name || u.email || "?")[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-sm font-bold truncate">
                    {u.full_name || "—"}
                  </p>
                  <p className="text-slate-500 text-xs truncate mt-0.5">
                    {u.email}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 border text-[10px] font-black uppercase rounded-lg ${
                    u.role === "admin"
                      ? "bg-orange-50 border-orange-200 text-[#f4af1b]"
                      : "bg-slate-50 border-slate-200 text-slate-500"
                  }`}
                >
                  {u.role}
                </span>
                <span className="text-slate-400 text-xs font-semibold flex items-center gap-1.5 w-24 justify-end">
                  <Clock size={12} />
                  {formatDate(u.created_at)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Intelligence Column */}
        <div className="space-y-6">
          {/* Top Leaderboard */}
          <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
              <Star className="text-[#ffd55a]" size={16} /> Papan Skor Tertinggi
            </h2>
            <div className="space-y-3">
              {topScorers?.map((r: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-3 rounded-xl"
                >
                  <span
                    className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-black ${
                      i === 0
                        ? "bg-[#f4af1b] text-white"
                        : i === 1
                          ? "bg-[#ffd55a] text-amber-900"
                          : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <p className="text-slate-700 text-sm font-bold flex-1 truncate">
                    {r.profiles?.full_name || "Anonim"}
                  </p>
                  <span className="text-[#66d47e] text-xs font-black bg-green-50 border border-green-100 px-2.5 py-1 rounded-md">
                    {Math.round((r.score / r.total) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* User Metrics Breakdown */}
          <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
              <BarChart3 className="text-[#66d47e]" size={16} /> Komposisi Akun
            </h2>
            <div className="space-y-4 text-sm font-bold">
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-2">
                  <UserCheck size={16} className="text-[#f4af1b]" /> Otoritas
                  Admin
                </span>
                <span className="text-slate-900 font-black">
                  {adminCount ?? 0}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-2">
                  <UserX size={16} className="text-[#66d47e]" /> Anggota Member
                </span>
                <span className="text-slate-900 font-black">{memberCount}</span>
              </div>
              <div className="pt-2">
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    className="bg-[#66d47e] h-full"
                    style={{
                      width: `${(memberCount / (totalUsers ?? 1)) * 100}%`,
                    }}
                  />
                  <div
                    className="bg-[#f4af1b] h-full"
                    style={{
                      width: `${((adminCount ?? 0) / (totalUsers ?? 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
