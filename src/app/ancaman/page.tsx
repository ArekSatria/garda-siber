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
  title: "Pusat Edukasi Ancaman Siber",
  description:
    "Pelajari ancaman digital yang umum ditemui, pahami cara kerjanya, dan kenali langkah pencegahan dasar yang relevan.",
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
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-700">
              <ShieldAlert size={14} />
              Ancaman Siber
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
              Kenali ancaman digital yang paling sering ditemui
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Mempelajari ancaman digital bukan untuk menakut-nakuti, tetapi
              untuk membantu pengguna lebih siap, lebih waspada, dan lebih tepat
              mengambil langkah pencegahan.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PRINCIPLES.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-black text-[#0F52BA]">
                  0{index + 1}
                </div>
                <h2 className="mt-5 text-xl font-black text-slate-900">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-500">
            Tersedia{" "}
            <span className="font-bold text-slate-700">
              {allThreats.length}
            </span>{" "}
            topik ancaman untuk dipelajari.
          </div>

          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA]"
          >
            Lanjut ke materi edukasi
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {allThreats.map((threat: Threat) => {
            const colorStyle = getThreatColorStyle(threat.color);
            const Icon =
              ICON_MAP[threat.iconName] ?? getFallbackIcon(threat.title);

            return (
              <Link
                key={threat.id}
                href={`/ancaman/${threat.id}`}
                className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-52 w-full overflow-hidden bg-slate-100">
                  {threat.image ? (
                    <img
                      src={threat.image}
                      alt={threat.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                      <ShieldAlert size={30} />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div
                      className={`inline-flex rounded-2xl p-3 ${colorStyle.cardBg}`}
                    >
                      <Icon size={18} />
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${colorStyle.badgeClass}`}
                    >
                      {threat.level}
                    </span>
                  </div>

                  <h2 className="text-xl font-black leading-tight text-slate-900">
                    {threat.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {threat.shortDesc}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA] transition group-hover:gap-3">
                    Pelajari ancaman
                    <ChevronRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-[linear-gradient(135deg,#FFF9ED_0%,#FFFFFF_55%,#F8FAFC_100%)] p-8 shadow-sm sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-700">
                <TriangleAlert size={14} />
                Ingat
              </div>

              <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                Ancaman digital lebih mudah dicegah jika dikenali lebih awal
              </h2>

              <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                Biasakan memeriksa tautan, file, aplikasi, dan permintaan
                informasi yang tidak biasa. Semakin cepat pola ancaman dikenali,
                semakin kecil risiko kerugian yang bisa terjadi.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/artikel"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F52BA] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0B3F8C]"
                >
                  Jelajahi Materi
                  <ChevronRight size={16} />
                </Link>

                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Cek Pengetahuan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PageLayout>
  );
}
