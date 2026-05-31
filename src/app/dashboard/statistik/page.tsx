import { createClient } from "@/lib/supabase/server";
import { getLatestArticles } from "@/lib/articles";
import { getAllThreats } from "@/data/threats";
import type { Metadata } from "next";
import { BarChart3, PieChart, Activity, TrendingUp } from "lucide-react";

export const metadata: Metadata = { title: "Statistik" };

export default async function StatistikPage() {
  const supabase = await createClient();

  const [
    { count: totalUsers },
    { count: adminCount },
    { count: totalQuiz },
    { data: quizResults },
    { data: userGrowth },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin"),
    supabase.from("quiz_results").select("*", { count: "exact", head: true }),
    supabase.from("quiz_results").select("score, total, label, created_at"),
    supabase
      .from("profiles")
      .select("created_at")
      .order("created_at", { ascending: true }),
  ]);

  const articles = getLatestArticles();
  const threats = getAllThreats();

  // Score distribution
  const distribution = {
    excellent:
      quizResults?.filter((r) => (r.score / r.total) * 100 >= 80).length ?? 0,
    good:
      quizResults?.filter((r) => {
        const p = (r.score / r.total) * 100;
        return p >= 60 && p < 80;
      }).length ?? 0,
    poor:
      quizResults?.filter((r) => (r.score / r.total) * 100 < 60).length ?? 0,
  };

  // Monthly user growth (6 bulan terakhir)
  const now = new Date();
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const next = new Date(now.getFullYear(), now.getMonth() - (5 - i) + 1, 1);
    const count =
      userGrowth?.filter((u) => {
        const created = new Date(u.created_at);
        return created >= d && created < next;
      }).length ?? 0;
    return {
      label: d.toLocaleDateString("id-ID", { month: "short" }),
      count,
    };
  });

  const maxMonthly = Math.max(...monthlyData.map((m) => m.count), 1);

  // Article categories
  const catStats = Array.from(new Set(articles.map((a) => a.category))).map(
    (cat) => ({
      label: cat,
      count: articles.filter((a) => a.category === cat).length,
    }),
  );

  // Threat levels
  const threatLevels = ["Critical", "High", "Medium", "Low"].map((lvl) => ({
    label: lvl,
    count: threats.filter((t) => t.level === lvl).length,
    color:
      lvl === "Critical"
        ? "bg-rose-500"
        : lvl === "High"
          ? "bg-orange-500"
          : lvl === "Medium"
            ? "bg-amber-500"
            : "bg-emerald-500",
  }));

  const maxThreat = Math.max(...threatLevels.map((t) => t.count), 1);
  const memberCount = (totalUsers ?? 0) - (adminCount ?? 0);

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Statistik</h1>
        <p className="text-slate-400 text-sm mt-1">
          Analisis data dan performa platform Garda Siber
        </p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Total User",
            value: totalUsers ?? 0,
            color: "text-blue-400",
            bg: "bg-blue-500/20",
          },
          {
            label: "Member Aktif",
            value: memberCount,
            color: "text-emerald-400",
            bg: "bg-emerald-500/20",
          },
          {
            label: "Total Quiz",
            value: totalQuiz ?? 0,
            color: "text-violet-400",
            bg: "bg-violet-500/20",
          },
          {
            label: "Konten Total",
            value: articles.length + threats.length,
            color: "text-amber-400",
            bg: "bg-amber-500/20",
          },
        ].map((k) => (
          <div
            key={k.label}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
          >
            <div
              className={`w-9 h-9 ${k.bg} rounded-xl flex items-center justify-center mb-3`}
            >
              <TrendingUp size={16} className={k.color} />
            </div>
            <p className={`text-3xl font-black ${k.color}`}>{k.value}</p>
            <p className="text-slate-400 text-xs font-semibold mt-1">
              {k.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Activity size={15} className="text-blue-400" />
            </div>
            <h2 className="text-white font-bold">Pertumbuhan Pengguna</h2>
            <span className="text-slate-500 text-xs ml-auto">
              6 bulan terakhir
            </span>
          </div>
          <div className="flex items-end gap-3 h-36">
            {monthlyData.map((m, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-1.5"
              >
                <span className="text-slate-400 text-xs font-bold">
                  {m.count}
                </span>
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all"
                  style={{
                    height: `${Math.max(
                      (m.count / maxMonthly) * 100,
                      m.count > 0 ? 8 : 3,
                    )}%`,
                    minHeight: m.count > 0 ? "8px" : "3px",
                  }}
                />
                <span className="text-slate-500 text-[10px] font-semibold">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Score Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
              <PieChart size={15} className="text-violet-400" />
            </div>
            <h2 className="text-white font-bold">Distribusi Skor Quiz</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                label: "Sangat Baik (≥80%)",
                count: distribution.excellent,
                color: "bg-emerald-500",
                textColor: "text-emerald-400",
              },
              {
                label: "Cukup (60–79%)",
                count: distribution.good,
                color: "bg-blue-500",
                textColor: "text-blue-400",
              },
              {
                label: "Perlu Belajar (<60%)",
                count: distribution.poor,
                color: "bg-rose-500",
                textColor: "text-rose-400",
              },
            ].map((d) => {
              const pct =
                (totalQuiz ?? 0) > 0
                  ? Math.round((d.count / (totalQuiz ?? 1)) * 100)
                  : 0;
              return (
                <div key={d.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-slate-400 text-xs font-semibold">
                      {d.label}
                    </span>
                    <span className={`text-xs font-black ${d.textColor}`}>
                      {d.count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${d.color} rounded-full transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Article Category Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 size={15} className="text-emerald-400" />
            </div>
            <h2 className="text-white font-bold">Artikel per Kategori</h2>
          </div>
          <div className="space-y-3">
            {catStats
              .sort((a, b) => b.count - a.count)
              .map((cat) => {
                const pct = Math.round(
                  (cat.count / Math.max(...catStats.map((c) => c.count), 1)) *
                    100,
                );
                return (
                  <div key={cat.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-400 text-xs font-semibold">
                        {cat.label}
                      </span>
                      <span className="text-emerald-400 text-xs font-black">
                        {cat.count}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Threat Level Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 bg-rose-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 size={15} className="text-rose-400" />
            </div>
            <h2 className="text-white font-bold">Ancaman per Level</h2>
          </div>
          <div className="flex items-end gap-4 h-28">
            {threatLevels.map((t) => (
              <div
                key={t.label}
                className="flex-1 flex flex-col items-center gap-1.5"
              >
                <span className="text-slate-300 text-xs font-bold">
                  {t.count}
                </span>
                <div
                  className={`w-full ${t.color} rounded-t-lg`}
                  style={{
                    height: `${Math.max(
                      (t.count / maxThreat) * 80,
                      t.count > 0 ? 8 : 3,
                    )}px`,
                  }}
                />
                <span className="text-slate-500 text-[9px] font-bold text-center">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
