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
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0F52BA]">
              <BadgeCheck size={14} />
              Media Edukasi Keamanan Digital
            </div>

            <h1 className="mt-5 text-balance text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Belajar keamanan digital dengan cara yang lebih jelas dan praktis
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Garda Siber membantu masyarakat memahami ancaman siber, langkah
              pencegahan dasar, dan kebiasaan digital yang lebih aman melalui
              materi yang ringkas, terstruktur, dan mudah diikuti.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/artikel"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F52BA] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0B3F8C]"
              >
                Jelajahi Materi
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/ancaman"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Lihat Ancaman Umum
              </Link>
            </div>

            <div className="mt-8 grid gap-3">
              {FEATURE_POINTS.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#0F52BA]"
                  />
                  <p className="text-sm leading-6 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0F52BA]">
                    Mulai dari sini
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-slate-900">
                    Langkah awal yang paling penting
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
                  <BookOpen size={22} />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "Pahami ciri phishing dan tautan palsu.",
                  "Gunakan password yang kuat dan unik.",
                  "Aktifkan verifikasi dua langkah.",
                  "Jangan instal file atau APK sembarangan.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0F52BA] text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/artikel"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA] transition hover:gap-3"
              >
                Buka materi dasar
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,#0F52BA_0%,#0B3F8C_100%)] p-6 text-white shadow-[0_12px_30px_rgba(15,82,186,0.22)]">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-100">
                Cek Pengetahuan
              </p>
              <h3 className="mt-2 text-2xl font-black">
                Uji pemahaman Anda lewat quiz singkat
              </h3>
              <p className="mt-3 text-sm leading-7 text-blue-50/90">
                Setelah membaca materi, Anda bisa mencoba quiz untuk melihat
                sejauh mana pemahaman terhadap keamanan digital dasar.
              </p>

              <Link
                href="/quiz"
                className="mt-5 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-[#0F52BA] transition hover:bg-slate-100"
              >
                Cek Pengetahuan Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="section-tag">Jalur Belajar</div>
          <h2 className="section-title">Pilih topik sesuai kebutuhan Anda</h2>
          <p className="section-description">
            Materi disusun agar lebih mudah dijelajahi. Anda bisa mulai dari
            topik yang paling dekat dengan aktivitas digital sehari-hari.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {LEARNING_PATHS.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 text-xl font-black text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA] transition group-hover:gap-3">
                  Pelajari topik
                  <ChevronRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <div className="section-tag">Ancaman Umum</div>
              <h2 className="section-title">
                Kenali ancaman yang paling sering ditemui
              </h2>
              <p className="section-description">
                Mempelajari ancaman umum membantu Anda lebih cepat mengenali
                risiko dan mengambil langkah pencegahan yang tepat.
              </p>
            </div>

            <Link
              href="/ancaman"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA]"
            >
              Lihat semua ancaman
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredThreats.map((threat) => {
              const Icon = getThreatIcon(threat.title);

              return (
                <Link
                  key={threat.id}
                  href={`/ancaman/${threat.id}`}
                  className="group overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="h-40 w-full overflow-hidden bg-slate-100">
                    {threat.image ? (
                      <img
                        src={threat.image}
                        alt={threat.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                        <ShieldAlert size={28} />
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0F52BA]">
                        <Icon size={20} />
                      </div>

                      <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700">
                        {threat.level}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900">
                      {threat.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {threat.shortDesc}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA]">
                      Pelajari ancaman
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <div className="section-tag">Artikel Terbaru</div>
            <h2 className="section-title">
              Materi yang bisa langsung Anda pelajari
            </h2>
            <p className="section-description">
              Artikel dirancang untuk membantu pembaca memahami topik keamanan
              digital secara bertahap dan lebih mudah dipraktikkan.
            </p>
          </div>

          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA]"
          >
            Buka semua artikel
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latestArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/artikel/${article.slug}`}
              className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-52 w-full overflow-hidden bg-slate-100">
                {article.bannerImg ? (
                  <img
                    src={article.bannerImg}
                    alt={article.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                    <BookOpen size={28} />
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#0F52BA]">
                    {article.category}
                  </span>

                  {article.level ? (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                      {article.level}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-4 line-clamp-2 text-xl font-black leading-tight text-slate-900">
                  {article.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                  {article.summary}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="text-xs text-slate-500">
                    <p className="font-semibold text-slate-700">
                      {article.author}
                    </p>
                    <p>{article.readTime}</p>
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA] transition group-hover:gap-3">
                    Baca artikel
                    <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <div className="section-tag">Checklist Cepat</div>
            <h2 className="section-title">
              Langkah sederhana yang sebaiknya dilakukan sekarang
            </h2>
            <p className="section-description">
              Tidak semua orang perlu memahami istilah teknis yang rumit. Namun,
              ada beberapa kebiasaan dasar yang sangat membantu menurunkan
              risiko.
            </p>
          </div>

          <div className="grid gap-3">
            {QUICK_CHECKLIST.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-[#0F52BA]"
                />
                <p className="text-sm leading-7 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-[linear-gradient(135deg,#F8FBFF_0%,#EEF4FF_55%,#FFFFFF_100%)] p-8 shadow-sm sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <div className="section-tag">Penutup</div>
            <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
              Mulai dari materi dasar, lalu uji pemahaman Anda
            </h2>
            <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
              Anda tidak perlu memahami semua hal teknis sekaligus. Mulailah
              dari topik yang paling dekat dengan aktivitas digital sehari-hari,
              lalu lanjutkan dengan quiz untuk mengecek pemahaman.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/artikel"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F52BA] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0B3F8C]"
              >
                Jelajahi Materi
                <ArrowRight size={17} />
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
      </section>

      <Footer />
    </PageLayout>
  );
}
