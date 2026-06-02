import Link from "next/link";
import type { Metadata } from "next";
import type { ElementType } from "react";
import {
  ChevronRight,
  Globe,
  Lock,
  Mail,
  ShieldAlert,
  Smartphone,
  TriangleAlert,
  Wifi,
} from "lucide-react";
import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";
import { getAllThreats } from "@/data/threats";
import { getThreatColorStyle } from "@/constants/threats";

export const metadata: Metadata = {
  title: "Katalog Ancaman Siber",
  description:
    "Pelajari ancaman digital yang umum ditemui, pahami cara kerjanya, dan kenali langkah pencegahan dasar.",
};

type Threat = ReturnType<typeof getAllThreats>[number];

const ICON_MAP: Record<string, ElementType> = {
  Mail,
  Lock,
  Globe,
  Smartphone,
  Wifi,
};
function getFallbackIcon(title: string): ElementType {
  const value = title.toLowerCase();
  if (value.includes("phishing")) return Mail;
  if (value.includes("wifi")) return Wifi;
  if (value.includes("sim")) return Smartphone;
  if (value.includes("ransom")) return Lock;
  return TriangleAlert;
}

const PRINCIPLES = [
  {
    title: "Kenali ciri ancamannya",
    description:
      "Memahami pola dasar ancaman membantu pengguna lebih cepat mengenali risiko sejak awal.",
  },
  {
    title: "Pahami cara kerjanya",
    description:
      "Ancaman digital biasanya memanfaatkan kelengahan, rasa panik, atau informasi yang tidak diverifikasi.",
  },
  {
    title: "Fokus pada pencegahan",
    description:
      "Langkah pencegahan sederhana sering kali lebih efektif daripada tindakan setelah insiden terjadi.",
  },
];

export default function ThreatListPage() {
  const allThreats = getAllThreats();

  return (
    <PageLayout>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#259b9a]/10 rounded-full blur-[100px] opacity-60 pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#259b9a]/20 bg-[#259b9a]/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#259b9a]">
              <ShieldAlert size={14} />
              Katalog Ancaman Siber
            </div>
            <h1 className="mt-6 text-4xl font-black leading-[1.15] text-slate-900 sm:text-5xl tracking-tight">
              Kenali ancaman digital yang{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#259b9a] to-[#00a9d8]">
                paling sering ditemui
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-600">
              Mempelajari ancaman digital bukan untuk menakut-nakuti, tetapi
              untuk membantu pengguna lebih siap, waspada, dan tepat mengambil
              langkah pencegahan.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 animate-fade-in-up delay-100">
            {PRINCIPLES.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-[#00a9d8]/30 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#00a9d8]/10 text-lg font-black text-[#00a9d8] group-hover:bg-[#00a9d8] group-hover:text-white transition-colors">
                  0{index + 1}
                </div>
                <h2 className="mt-6 text-xl font-black text-slate-900 tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-fade-in-up delay-100">
          <div className="text-sm font-medium text-slate-500">
            Tersedia{" "}
            <span className="font-bold text-slate-700">
              {allThreats.length}
            </span>{" "}
            topik ancaman untuk dipelajari.
          </div>
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#00a9d8] hover:text-[#0d9edf] transition-colors"
          >
            Lanjut ke materi edukasi <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 animate-fade-in-up delay-200">
          {allThreats.map((threat: Threat) => {
            const colorStyle = getThreatColorStyle(threat.color);
            const Icon =
              ICON_MAP[threat.iconName] ?? getFallbackIcon(threat.title);

            return (
              <Link
                key={threat.id}
                href={`/ancaman/${threat.id}`}
                className="group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_4px_20px_-4px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#259b9a]/30"
              >
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  {threat.image ? (
                    <img
                      src={threat.image}
                      alt={threat.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                      <ShieldAlert size={30} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-8">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div
                      className={`inline-flex rounded-[14px] p-3 transition-colors ${colorStyle.cardBg}`}
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm ${colorStyle.badgeClass}`}
                    >
                      {threat.level}
                    </span>
                  </div>
                  <h2 className="text-xl font-black leading-tight text-slate-900 tracking-tight group-hover:text-[#259b9a] transition-colors">
                    {threat.title}
                  </h2>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                    {threat.shortDesc}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#259b9a] transition-transform group-hover:translate-x-1">
                    Pelajari ancaman <ChevronRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <Footer />
    </PageLayout>
  );
}
