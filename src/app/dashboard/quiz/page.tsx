import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import {
  Brain,
  Trophy,
  TrendingUp,
  BarChart3,
  Clock,
  Mail,
} from "lucide-react";

export const metadata: Metadata = { title: "Log Aktivitas Hasil Quiz" };

export default async function DashboardQuizPage() {
  const supabase = await createClient();

  const { data: results } = await supabase
    .from("quiz_results")
    .select("id, score, total, label, created_at, profiles(full_name, email)")
    .order("created_at", { ascending: false });

  const total = results?.length ?? 0;
  const avgScore =
    total > 0
      ? Math.round(
          results!.reduce((a, r) => a + (r.score / r.total) * 100, 0) / total,
        )
      : 0;
  const highScore =
    total > 0
      ? Math.max(...results!.map((r) => Math.round((r.score / r.total) * 100)))
      : 0;
  const expertCount =
    results?.filter(
      (r) => r.label === "Pakar Siber" || r.score / r.total >= 0.8,
    ).length ?? 0;

  function getScoreStyle(pct: number) {
    if (pct >= 80) return "text-emerald-700 bg-emerald-50 border-emerald-200";
    if (pct >= 60) return "text-blue-700 bg-blue-50 border-blue-200";
    return "text-red-700 bg-red-50 border-red-200";
  }

  return (
    <div className="p-6 lg:p-10 space-y-6 min-h-screen bg-[#F8FAFC]">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Log Evaluasi Quiz
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Audit log capaian pemahaman literasi keamanan siber pengguna.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            label: "Sesi Selesai",
            value: total,
            icon: Brain,
            color: "text-[#f4af1b]",
            bg: "bg-orange-50",
            border: "border-orange-100",
          },
          {
            label: "Rata-Rata Akurasi",
            value: `${avgScore}%`,
            icon: BarChart3,
            color: "text-[#ffd55a]",
            bg: "bg-yellow-50",
            border: "border-yellow-100",
          },
          {
            label: "Akurasi Tertinggi",
            value: `${highScore}%`,
            icon: TrendingUp,
            color: "text-[#66d47e]",
            bg: "bg-green-50",
            border: "border-green-100",
          },
          {
            label: "Klasifikasi Pakar",
            value: expertCount,
            icon: Trophy,
            color: "text-purple-600",
            bg: "bg-purple-50",
            border: "border-purple-100",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`bg-white border ${card.border} shadow-sm rounded-2xl p-6`}
          >
            <div
              className={`w-10 h-10 ${card.bg} border ${card.border} rounded-xl flex items-center justify-center mb-4`}
            >
              <card.icon size={18} className={card.color} />
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tight">
              {card.value}
            </p>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider mt-1">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Pengguna</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Capaian Skor</th>
                <th className="px-6 py-4">Label</th>
                <th className="px-6 py-4">Waktu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {results?.map((res: any, idx: number) => {
                const pct = Math.round((res.score / res.total) * 100);
                return (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-slate-900 font-bold">
                      {res.profiles?.full_name || "Anonim"}
                    </td>
                    <td className="px-6 py-4 text-slate-500 flex items-center gap-2">
                      <Mail size={14} className="text-slate-400" />{" "}
                      {res.profiles?.email || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1.5 rounded-lg font-black text-xs border ${getScoreStyle(pct)}`}
                      >
                        {res.score} / {res.total} ({pct}%)
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                        {res.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 flex items-center gap-1.5 text-xs">
                      <Clock size={14} className="text-slate-400" />{" "}
                      {new Date(res.created_at).toLocaleString("id-ID")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
