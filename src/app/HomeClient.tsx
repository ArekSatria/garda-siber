"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileWarning,
  LockKeyhole,
  ShieldAlert,
  Smartphone,
  TriangleAlert,
  Wifi,
} from "lucide-react";

import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";

type ArticlePreview = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  readTime: string;
  bannerImg?: string;
  audience?: string;
  level?: string;
};

type ThreatPreview = {
  id: string;
  title: string;
  shortDesc: string;
  level: string;
  image: string;
};

type Props = {
  latestArticles: ArticlePreview[];
  featuredThreats: ThreatPreview[];
};

const LEARNING_PATHS = [
  {
    title: "Proteksi Akun",
    description:
      "Pelajari password yang kuat, 2FA, dan kebiasaan login yang lebih aman.",
    href: "/artikel",
    icon: LockKeyhole,
  },
  {
    title: "Penipuan Digital",
    description:
      "Kenali phishing, scam APK, penipuan investasi, dan modus manipulasi sosial.",
    href: "/ancaman",
    icon: TriangleAlert,
  },
  {
    title: "Keamanan Perangkat",
    description:
      "Pahami langkah dasar melindungi ponsel, laptop, aplikasi, dan data pribadi.",
    href: "/artikel",
    icon: Smartphone,
  },
  {
    title: "Privasi & Data",
    description:
      "Pelajari cara menjaga data pribadi dan mengurangi risiko penyalahgunaan informasi.",
    href: "/artikel",
    icon: FileWarning,
  },
];

const QUICK_CHECKLIST = [
  "Aktifkan verifikasi dua langkah pada akun penting.",
  "Jangan pernah membagikan kode OTP kepada siapa pun.",
  "Periksa kembali alamat situs dan tautan sebelum login.",
  "Perbarui sistem operasi dan aplikasi secara berkala.",
  "Gunakan password berbeda untuk akun yang berbeda.",
  "Waspadai file, APK, atau undangan digital yang mencurigakan.",
];

const FEATURE_POINTS = [
  "Materi dibuat dengan bahasa yang lebih mudah dipahami.",
  "Fokus pada pencegahan dan kebiasaan digital yang lebih aman.",
  "Cocok untuk masyarakat umum, pelajar, dan pengguna sehari-hari.",
];

function getThreatIcon(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("wifi")) return Wifi;
  if (lower.includes("phishing")) return ShieldAlert;
  if (lower.includes("sim")) return Smartphone;
  return TriangleAlert;
}

export default function HomeClient({ latestArticles, featuredThreats }: Props) {
  return (
    <PageLayout>
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        {/* Dekorasi Latar Belakang (Glow Cyan & Teal) */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-br from-[#00a9d8]/10 to-[#259b9a]/5 rounded-full blur-[100px] opacity-70 pointer-events-none" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00a9d8]/20 bg-[#00a9d8]/10 backdrop-blur-sm px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#00a9d8]">
              <BadgeCheck size={14} />
              Platform Edukasi Siber
            </div>

            <h1 className="mt-6 text-balance text-4xl font-black leading-[1.15] text-slate-900 sm:text-5xl lg:text-6xl tracking-tight">
              Lindungi diri dari ancaman digital dengan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a9d8] to-[#259b9a]">
                cara yang tepat
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 animate-fade-in-up delay-100">
              Garda Siber membantu masyarakat memahami ancaman siber, langkah
              pencegahan dasar, dan kebiasaan digital yang lebih aman melalui
              materi yang ringkas, terstruktur, dan mudah diikuti.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-in-up delay-200">
              <Link
                href="/artikel"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00a9d8] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#00a9d8]/25 transition-all hover:-translate-y-1 hover:bg-[#0d9edf] hover:shadow-[#0d9edf]/40"
              >
                Jelajahi Materi
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/ancaman"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 hover:-translate-y-1 hover:border-[#00a9d8]/30 hover:text-[#00a9d8]"
              >
                Katalog Ancaman
              </Link>
            </div>

            <div className="mt-10 grid gap-3 animate-fade-in-up delay-300">
              {FEATURE_POINTS.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-[#259b9a]"
                  />
                  <p className="text-sm font-medium leading-relaxed text-slate-600">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card Grid */}
          <div className="grid gap-6 animate-fade-in-up delay-300">
            <div className="group rounded-[2rem] border border-slate-200/80 bg-white/60 backdrop-blur-xl p-8 shadow-[0_20px_40px_-15px_rgba(0,169,216,0.05)] transition-all hover:shadow-[0_20px_40px_-15px_rgba(0,169,216,0.15)] hover:-translate-y-1 hover:border-[#00a9d8]/20">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#259b9a]">
                    Mulai dari sini
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-slate-900 tracking-tight">
                    Langkah awal pengamanan
                  </h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00a9d8]/10 text-[#00a9d8]">
                  <BookOpen size={22} />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "Pahami ciri phishing dan tautan palsu.",
                  "Gunakan password yang kuat dan unik.",
                  "Aktifkan verifikasi dua langkah.",
                  "Jangan instal file atau APK sembarangan.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3.5 shadow-sm transition-colors hover:border-[#00a9d8]/20"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#259b9a] text-[10px] font-black text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-slate-600">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/artikel"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#00a9d8] transition-all hover:gap-3 hover:text-[#0d9edf]"
              >
                Buka materi dasar <ChevronRight size={16} />
              </Link>
            </div>

            {/* Gradient Card CTA */}
            <div className="rounded-[2rem] border border-transparent bg-gradient-to-br from-[#00a9d8] to-[#259b9a] p-8 text-white shadow-lg shadow-[#259b9a]/20 relative overflow-hidden transition-all hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-100">
                Cek Pengetahuan
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-tight">
                Uji pemahaman Anda lewat quiz
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cyan-50/90 font-medium">
                Setelah membaca materi, evaluasi sejauh mana Anda memahami
                keamanan digital.
              </p>

              <Link
                href="/quiz"
                className="mt-6 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-[#00a9d8] transition hover:bg-slate-50 hover:scale-105 shadow-md"
              >
                Mulai Evaluasi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── JALUR BELAJAR ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00a9d8]/20 bg-[#00a9d8]/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#00a9d8]">
            Jalur Belajar
          </div>
          <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
            Pilih topik sesuai kebutuhan Anda
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Materi disusun agar lebih mudah dijelajahi. Mulailah dari topik yang
            paling dekat dengan aktivitas digital sehari-hari Anda.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {LEARNING_PATHS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#00a9d8]/5 hover:border-[#00a9d8]/30"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-[1rem] bg-[#00a9d8]/10 text-[#00a9d8] transition-colors group-hover:bg-[#00a9d8] group-hover:text-white">
                  <Icon size={24} strokeWidth={2.5} />
                </div>
                <h3 className="mt-6 text-xl font-black text-slate-900 tracking-tight transition-colors group-hover:text-[#00a9d8]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                  {item.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#259b9a] transition-all group-hover:gap-3 group-hover:text-[#0d9edf]">
                  Pelajari topik <ChevronRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── ANCAMAN UMUM ── */}
      <section className="border-y border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-100/50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-rose-600">
                Ancaman Umum
              </div>
              <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                Kenali ancaman yang paling sering ditemui
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Mempelajari ancaman umum membantu Anda lebih cepat mengenali
                risiko dan mengambil langkah pencegahan yang tepat.
              </p>
            </div>
            <Link
              href="/ancaman"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#00a9d8] hover:text-[#0d9edf] transition-colors"
            >
              Lihat semua ancaman <ChevronRight size={16} />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredThreats.map((threat) => {
              const Icon = getThreatIcon(threat.title);
              return (
                <Link
                  key={threat.id}
                  href={`/ancaman/${threat.id}`}
                  className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#259b9a]/5 hover:border-[#259b9a]/30"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    {threat.image ? (
                      <img
                        src={threat.image}
                        alt={threat.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-300">
                        <ShieldAlert size={32} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#259b9a]/10 text-[#259b9a] group-hover:bg-[#259b9a] group-hover:text-white transition-colors">
                        <Icon size={18} strokeWidth={2.5} />
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-600">
                        Level: {threat.level}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-[#259b9a] transition-colors">
                      {threat.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 flex-1">
                      {threat.shortDesc}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#259b9a] transition-all group-hover:gap-3">
                      Detail ancaman <ChevronRight size={16} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ARTIKEL TERBARU ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00a9d8]/20 bg-[#00a9d8]/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#00a9d8]">
              Artikel Terbaru
            </div>
            <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
              Materi yang bisa langsung Anda pelajari
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Artikel dirancang untuk membantu pembaca memahami topik keamanan
              digital secara bertahap dan lebih mudah dipraktikkan.
            </p>
          </div>
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#00a9d8] hover:text-[#0d9edf] transition-colors"
          >
            Buka semua artikel <ChevronRight size={16} />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {latestArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/artikel/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#00a9d8]/10 hover:border-[#00a9d8]/30"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                {article.bannerImg ? (
                  <img
                    src={article.bannerImg}
                    alt={article.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-300">
                    <BookOpen size={32} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="rounded-full bg-[#00a9d8]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#00a9d8]">
                    {article.category}
                  </span>
                  {article.level && (
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      {article.level}
                    </span>
                  )}
                </div>
                <h3 className="line-clamp-2 text-xl font-black leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-[#00a9d8]">
                  {article.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm font-medium leading-relaxed text-slate-600 flex-1">
                  {article.summary}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                  <div className="text-xs font-semibold text-slate-500">
                    <p className="text-slate-700">{article.author}</p>
                    <p className="mt-0.5">{article.readTime}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00a9d8] transition-transform group-hover:translate-x-1">
                    Baca <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CHECKLIST CEPAT ── */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#259b9a]/20 bg-[#259b9a]/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#259b9a]">
              Checklist Cepat
            </div>
            <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl tracking-tight">
              Langkah sederhana yang sebaiknya dilakukan sekarang
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Tidak semua orang perlu memahami istilah teknis yang rumit. Namun,
              ada beberapa kebiasaan dasar yang sangat membantu menurunkan
              risiko.
            </p>
          </div>

          <div className="grid gap-4">
            {QUICK_CHECKLIST.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 px-5 py-4 transition-colors hover:border-[#259b9a]/30 hover:bg-white"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#259b9a]/10 text-[#259b9a]">
                  <CheckCircle2 size={18} strokeWidth={2.5} />
                </div>
                <p className="text-sm font-semibold leading-relaxed text-slate-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA PENUTUP ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#00a9d8] to-[#259b9a] p-8 shadow-2xl shadow-[#259b9a]/20 sm:p-12 lg:p-16 text-center">
          {/* Accent blurs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#0d9edf]/40 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white">
              Selesaikan Misi Anda
            </div>
            <h2 className="mt-6 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl tracking-tight">
              Mulai dari materi dasar, lalu uji pemahaman Anda
            </h2>
            <p className="mt-6 text-base leading-relaxed text-cyan-50 font-medium">
              Anda tidak perlu memahami semua hal teknis sekaligus. Mulailah
              dari topik yang paling dekat dengan aktivitas digital sehari-hari,
              lalu lanjutkan dengan quiz untuk mengecek pemahaman.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/artikel"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-[#00a9d8] transition-all hover:scale-105 hover:shadow-lg"
              >
                Jelajahi Materi <ArrowRight size={18} />
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-md px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/20 hover:border-white/50"
              >
                Cek Pengetahuan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PageLayout>
  );
}
