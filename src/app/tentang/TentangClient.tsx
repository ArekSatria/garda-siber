import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";

const VALUES = [
  {
    title: "Edukasi yang mudah dipahami",
    description:
      "Materi dirancang agar dapat dipahami masyarakat umum tanpa harus bergantung pada istilah teknis yang rumit.",
    icon: BookOpenText,
  },
  {
    title: "Fokus pada pencegahan",
    description:
      "Konten difokuskan pada langkah praktis yang membantu pengguna mengurangi risiko sebelum insiden terjadi.",
    icon: ShieldCheck,
  },
  {
    title: "Relevan untuk kebutuhan sehari-hari",
    description:
      "Topik disusun berdasarkan ancaman dan kebiasaan digital yang paling sering ditemui pengguna dalam aktivitas sehari-hari.",
    icon: Target,
  },
];

const AUDIENCE = [
  "Masyarakat umum yang ingin lebih paham keamanan digital dasar.",
  "Pelajar dan mahasiswa yang aktif menggunakan platform digital.",
  "Pengguna perangkat mobile dan layanan online sehari-hari.",
  "Pembaca yang ingin membangun kebiasaan digital yang lebih aman.",
];

export default function TentangClient() {
  return (
    <PageLayout>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0F52BA]">
              <BadgeCheck size={14} />
              Tentang Garda Siber
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
              Media edukasi keamanan digital yang lebih jelas, ringkas, dan
              relevan
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Garda Siber dikembangkan sebagai media edukasi untuk membantu
              masyarakat memahami ancaman digital, mengenali pola risiko, dan
              menerapkan kebiasaan digital yang lebih aman dalam aktivitas
              sehari-hari.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
              <ShieldCheck size={22} />
            </div>

            <h2 className="mt-5 text-2xl font-black text-slate-900">
              Tujuan utama
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
              Membantu pembaca memahami ancaman digital secara lebih sederhana
              dan terstruktur, sehingga mereka dapat mengambil keputusan yang
              lebih aman saat menggunakan akun, perangkat, jaringan, dan layanan
              online.
            </p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
              <Users size={22} />
            </div>

            <h2 className="mt-5 text-2xl font-black text-slate-900">
              Pendekatan
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
              Garda Siber menempatkan edukasi preventif sebagai fokus utama.
              Artinya, materi dirancang untuk membantu pengguna mengenali risiko
              lebih awal dan memahami langkah pencegahan yang realistis serta
              mudah diterapkan.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-emerald-700">
              <Target size={14} />
              Prinsip
            </div>

            <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
              Prinsip yang digunakan dalam penyusunan materi
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {VALUES.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0F52BA]">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-xl font-black text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0F52BA]">
              <Users size={14} />
              Untuk Siapa
            </div>

            <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
              Siapa yang dapat memanfaatkan platform ini
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
              Materi di Garda Siber disusun untuk pembaca dengan tingkat
              pemahaman yang beragam, terutama yang membutuhkan penjelasan
              praktis dan langsung dapat diterapkan.
            </p>
          </div>

          <div className="grid gap-3">
            {AUDIENCE.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <BadgeCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-[#0F52BA]"
                />
                <p className="text-sm leading-7 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-[linear-gradient(135deg,#F8FBFF_0%,#EEF4FF_55%,#FFFFFF_100%)] p-8 shadow-sm sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0F52BA]">
                <BadgeCheck size={14} />
                Langkah Berikutnya
              </div>

              <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                Mulai dari materi dasar dan bangun pemahaman secara bertahap
              </h2>

              <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                Jika Anda baru mulai, jelajahi artikel dasar terlebih dahulu.
                Setelah itu, gunakan quiz untuk mengecek pemahaman dan lanjutkan
                ke topik yang lebih spesifik sesuai kebutuhan.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/artikel"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F52BA] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0B3F8C]"
                >
                  Jelajahi Materi
                  <ArrowRight size={16} />
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
