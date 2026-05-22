import Sidebar from "@/components/Sidebar";
import { getAllThreats, getThreatById } from "@/data/threats";
import Image from "next/image";
import {
  ChevronLeft,
  Info,
  ArrowRight,
  ShieldCheck,
  Target,
  Zap,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllThreats().map((threat) => ({ id: threat.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = getThreatById(id);
  if (!data) return { title: "Ancaman Tidak Ditemukan | Garda Siber" };
  return {
    title: `${data.title} | Katalog Ancaman Garda Siber`,
    description: data.fullDesc,
  };
}

export default async function ThreatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = getThreatById(id);
  if (!data) return notFound();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <div className="relative h-[450px] w-full overflow-hidden">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover scale-105"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-slate-900/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-16 w-full">
            <div className="max-w-6xl mx-auto">
              <Link
                href="/ancaman"
                className="inline-flex items-center gap-3 text-white bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl hover:bg-white/20 transition-all mb-10 font-bold text-sm"
              >
                <ChevronLeft size={20} />
                Kembali ke Katalog
              </Link>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`px-5 py-1.5 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg ${
                    data.color === "danger"
                      ? "bg-red-600 shadow-red-600/30"
                      : data.color === "warning"
                        ? "bg-orange-500 shadow-orange-500/30"
                        : "bg-green-600 shadow-green-600/30"
                  }`}
                >
                  {data.level} Risk
                </div>
                <div className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest">
                  <Activity size={14} className="text-primary" />
                  Garda Siber Verified Analysis
                </div>
              </div>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">
                {data.analysisTitle}
              </h1>
            </div>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-16 py-16 -mt-20 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <section className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-primary/10 rounded-2xl">
                    <Info className="text-primary" size={28} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                    Definisi & Ringkasan
                  </h2>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2rem] border-l-8 border-primary">
                  <p className="text-slate-700 text-xl leading-relaxed font-semibold">
                    {data.fullDesc}
                  </p>
                </div>
                <div className="mt-12">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-red-50 rounded-2xl">
                      <Target className="text-red-500" size={28} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                      Ciri Utama & Metode
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {data.characteristics.map((item, i) => (
                      <div
                        key={i}
                        className="group flex items-center gap-6 p-6 bg-white border border-slate-100 rounded-3xl hover:border-red-200 hover:bg-red-50/30 transition-all shadow-sm"
                      >
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-lg group-hover:bg-red-600 transition-colors shrink-0">
                          0{i + 1}
                        </div>
                        <p className="font-bold text-slate-800 text-lg">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="bg-slate-900 p-12 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/40">
                <div className="absolute top-[-30px] right-[-30px] opacity-10 rotate-12">
                  <ShieldAlert size={250} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-white/10 rounded-2xl">
                      <Zap
                        className="text-yellow-400 fill-yellow-400"
                        size={28}
                      />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">
                      Dampak Keamanan
                    </h2>
                  </div>
                  <p className="text-slate-300 text-xl leading-relaxed font-medium max-w-2xl">
                    {data.impact}
                  </p>
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
                <div className="flex items-center gap-3 mb-10">
                  <ShieldCheck className="text-green-500" size={28} />
                  <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">
                    Protokol Pencegahan
                  </h3>
                </div>
                <div className="space-y-6 mb-12">
                  {data.steps.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="mt-1">
                        <CheckCircle2 className="text-green-500" size={22} />
                      </div>
                      <p className="text-slate-700 font-bold leading-tight">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/tips"
                  className="flex items-center justify-center gap-3 bg-primary text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 hover:-translate-y-1"
                >
                  Lihat Garda Tips <ArrowRight size={20} />
                </Link>
              </div>

              <div className="bg-blue-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-blue-600/30 relative overflow-hidden">
                <div className="absolute bottom-[-20px] left-[-20px] opacity-20">
                  <Lock size={120} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6 opacity-70">
                    <AlertTriangle size={16} />
                    <span className="font-black text-[10px] uppercase tracking-[0.3em]">
                      Global Intelligence
                    </span>
                  </div>
                  <p className="text-2xl font-black leading-tight tracking-tight">
                    {data.stats}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
