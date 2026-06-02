import { createClient } from "@/lib/supabase/server";
import { getLatestArticles } from "@/lib/articles";
import { getAllThreats } from "@/data/threats";
import type { Metadata } from "next";
import { BarChart3, PieChart, Activity, Tag, Shield } from "lucide-react";

export const metadata: Metadata = { title: "Analitik Statistik Siber" };

export default async function StatistikPage() {
  const supabase = await createClient();

  const [{ count: totalQuiz }, { data: quizResults }, { data: userGrowth }] =
    await Promise.all([
      supabase.from("quiz_results").select("*", { count: "exact", head: true }),
      supabase.from("quiz_results").select("score, total, label, created_at"),
      supabase
        .from("profiles")
        .select("created_at")
        .order("created_at", { ascending: true }),
    ]);

  const articles = getLatestArticles();
  const threats = getAllThreats();

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

  const now = new Date();
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const next = new Date(now.getFullYear(), now.getMonth() - (5 - i) + 1, 1);
    const count =
      userGrowth?.filter((u) => {
        const created = new Date(u.created_at);
        return created >= d && created < next;
      }).length ?? 0;
    return { label: d.toLocaleDateString("id-ID", { month: "short" }), count };
  });

  const maxMonthly = Math.max(...monthlyData.map((m) => m.count), 1);
  const catStats = Array.from(new Set(articles.map((a) => a.category))).map(
    (cat) => ({
      label: cat,
      count: articles.filter((a) => a.category === cat).length,
    }),
  );

  const threatLevels = [
    {
      label: "Critical",
      count: threats.filter((t) => t.level === "Critical").length,
      color: "bg-rose-500",
    },
    {
      label: "High",
      count: threats.filter((t) => t.level === "High").length,
      color: "bg-[#f4af1b]",
    },
    {
      label: "Medium",
      count: threats.filter((t) => t.level === "Medium").length,
      color: "bg-[#ffd55a]",
    },
    {
      label: "Low",
      count: threats.filter((t) => t.level === "Low").length,
      color: "bg-[#66d47e]",
    },
  ];

  const maxThreat = Math.max(...threatLevels.map((t) => t.count), 1);

  return (
    <div className="p-6 lg:p-10 space-y-6 min-h-screen bg-[#F8FAFC]">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Pusat Analitik
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Metrik performa, sebaran data edukasi, dan penetrasi pemahaman user.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        {/* Chart 1: Registrasi Grafik Batang */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-8 border-b border-slate-100 pb-4">
            <Activity size={18} className="text-[#66d47e]" />
            <h2 className="text-sm font-bold text-slate-800">
              Pertumbuhan Pengguna Baru
            </h2>
          </div>
          <div className="flex items-end gap-4 h-48 pt-4">
            {monthlyData.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-slate-700 text-xs font-black">
                  {m.count}
                </span>
                <div
                  className="w-full bg-[#66d47e] rounded-t-md opacity-90 transition-all hover:opacity-100"
                  style={{
                    height: `${(m.count / maxMonthly) * 120}px`,
                    minHeight: m.count > 0 ? "4px" : "1px",
                  }}
                />
                <span className="text-slate-400 text-[10px] font-bold uppercase">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Distribusi Skor */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-8 border-b border-slate-100 pb-4">
            <PieChart size={18} className="text-[#f4af1b]" />
            <h2 className="text-sm font-bold text-slate-800">
              Sebaran Akurasi Evaluasi
            </h2>
          </div>
          <div className="space-y-6">
            {[
              {
                label: "Sangat Baik (≥80%)",
                count: distribution.excellent,
                color: "bg-[#66d47e]",
                text: "text-[#66d47e]",
              },
              {
                label: "Cukup Baik (60-79%)",
                count: distribution.good,
                color: "bg-[#ffd55a]",
                text: "text-amber-500",
              },
              {
                label: "Perlu Evaluasi (<60%)",
                count: distribution.poor,
                color: "bg-rose-500",
                text: "text-rose-500",
              },
            ].map((d, i) => {
              const totalQ = totalQuiz ?? 1;
              const pct = Math.round(
                (d.count / (totalQ === 0 ? 1 : totalQ)) * 100,
              );
              return (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-2 font-bold">
                    <span className="text-slate-600">{d.label}</span>
                    <span className={`${d.text} font-black`}>
                      {d.count} Sesi ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${d.color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 3: Repositori Artikel */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
            <Tag size={18} className="text-[#ffd55a]" />
            <h2 className="text-sm font-bold text-slate-800">
              Kategori Artikel
            </h2>
          </div>
          <div className="space-y-4">
            {catStats
              .sort((a, b) => b.count - a.count)
              .map((cat, i) => {
                const maxCat = Math.max(...catStats.map((c) => c.count), 1);
                const pct = Math.round((cat.count / maxCat) * 100);
                return (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1.5 font-bold">
                      <span className="text-slate-600">{cat.label}</span>
                      <span className="text-[#ffd55a] font-black">
                        {cat.count} Berkas
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#ffd55a] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Chart 4: Klasifikasi Ancaman */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-8 border-b border-slate-100 pb-4">
            <Shield size={18} className="text-rose-500" />
            <h2 className="text-sm font-bold text-slate-800">
              Matrikulasi Tingkat Ancaman
            </h2>
          </div>
          <div className="flex items-end gap-4 h-36 pt-2">
            {threatLevels.map((t, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-slate-700 text-xs font-black">
                  {t.count}
                </span>
                <div
                  className={`w-full ${t.color} rounded-t-md opacity-90 hover:opacity-100 transition-all`}
                  style={{
                    height: `${(t.count / maxThreat) * 100}px`,
                    minHeight: t.count > 0 ? "4px" : "1px",
                  }}
                />
                <span className="text-slate-500 text-[10px] font-bold uppercase">
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
