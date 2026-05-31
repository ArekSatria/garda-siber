import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import {
  Brain,
  Trophy,
  TrendingUp,
  Clock,
  Star,
  BarChart3,
} from "lucide-react";

export const metadata: Metadata = { title: "Hasil Quiz" };

export default async function DashboardQuizPage() {
  const supabase = await createClient();

  const { data: results } = await supabase
    .from("quiz_results")
    .select(
      "id, score, total, label, created_at, profiles(full_name, email)"
    )
    .order("created_at", { ascending: false });

  const total = results?.length ?? 0;
  const avgScore =
    total > 0
      ? Math.round(
          results!.reduce((a, r) => a + (r.score / r.total) * 100, 0) / total
        )
      : 0;
  const highScore =
    total > 0
      ? Math.max(...results!.map((r) => Math.round((r.score / r.total) * 100)))
      : 0;
  const expertCount =
    results?.filter((r) => r.label === "Pakar Siber").length ?? 0;

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getScoreStyle(pct: number) {
    if (pct >= 80)
      return "text-emerald-400 bg-emerald-500/15 border-emerald-500/25";
    if (pct >= 60)
      return "text-blue-400 bg-blue-500/15 border-blue-500/25";
    return "text-rose-400 bg-rose-500/15 border-rose-500/25";
  }

  function getLabelStyle(label: string) {
    if (label === "Pakar Siber")
      return "text-amber-400 bg-amber-500/15 border-amber-500/25";
    if (label === "Penjaga Siber")
      return "text-blue-400 bg-blue-500/15 border-blue-500/25";
    return "text-slate-400 bg-slate-700 border-slate-600";
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Hasil Quiz</h1>
        <p className="text-slate-400 text-sm mt-1">
          Monitor semua hasil quiz yang telah dikerjakan pengguna
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="w-9 h-9 bg-violet-500/20 rounded-xl flex items-center justify-center mb-3">
            <Brain size={17} className="text-violet-400" />
          </div>
          <p className="text-2xl font-black text-white">{total}</p>
          <p className="text-slate-400 text-xs font-semibold mt-0.5">
            Total Percobaan
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="w-9 h-9 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3">
            <BarChart3 size={17} className="text-blue-400" />
          </div>
          <p className="text-2xl font-black text-white">{avgScore}%</p>
          <p className="text-slate-400 text-xs font-semibold mt-0.5">
            Rata-rata Skor
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="w-9 h-9 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
            <TrendingUp size={17} className="text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white">{highScore}%</p>
          <p className="text-slate-400 text-xs font-semibold mt-0.5">
            Skor Tertinggi
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="w-9 h-9 bg-amber-500/20 rounded-xl flex items-center justify-center mb-3">
            <Trophy size={17} className="text-amber-400" />
          </div>
          <p className="text-2xl font-black text-white">{expertCount}</p>
          <p className="text-slate-400 text-xs font-semibold mt-0.5">
            Pakar Siber
          </p>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-white font-bold">Riwayat Semua Hasil</h2>
          <span className="text-slate-500 text-sm">{total} percobaan</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr class