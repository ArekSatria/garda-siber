import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  KeyRound,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
  Wifi,
  FileWarning,
} from "lucide-react";
import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Tips Praktis | Garda Siber",
  description:
    "Panduan praktis keamanan digital untuk membantu membangun kebiasaan yang lebih aman.",
};

const PRIORITY_ACTIONS = [
  {
    title: "Aktifkan verifikasi dua langkah",
    description:
      "Tambahkan lapisan perlindungan ekstra pada akun penting agar tidak mudah diambil alih.",
    icon: ShieldCheck,
  },
  {
    title: "Periksa izin akses aplikasi",
    description:
      "Pastikan aplikasi hanya meminta akses yang relevan dengan fungsinya (kamera, lokasi, dll).",
    icon: Smartphone,
  },
  {
    title: "Waspada tautan & file mencurigakan",
    description:
      "Jangan langsung membuka file atau tautan yang datang dari sumber yang tidak jelas.",
    icon: TriangleAlert,
  },
];

const TIP_SECTIONS = [
  {
    title: "Keamanan Akun",
    description: "Kebiasaan mencegah pengambilalihan akun.",
    icon: KeyRound,
    items: [
      "Gunakan password berbeda untuk tiap akun.",
      "Aktifkan verifikasi 2 langkah.",
      "Periksa & keluarkan sesi login tak dikenal.",
    ],
  },
  {
    title: "Penipuan Digital",
    description: "Kurangi risiko tertipu oleh phishing & scam.",
    icon: TriangleAlert,
    items: [
      "Cek alamat situs sebelum login.",
      "Jangan pernah berikan OTP/PIN.",
      "Curigai pesan mendesak atau bernada ancaman.",
    ],
  },
  {
    title: "Keamanan Perangkat",
    description: "Hal dasar untuk menjaga perangkat tetap aman.",
    icon: Smartphone,
    items: [
      "Perbarui sistem operasi secara rutin.",
      "Gunakan kunci layar (PIN/Biometrik).",
      "Hindari aplikasi dari luar toko resmi.",
    ],
  },
  {
    title: "Jaringan & Koneksi",
    description: "Akses internet yang aman terutama via WiFi publik.",
    icon: Wifi,
    items: [
      "Hindari login penting di WiFi Publik.",
      "Gunakan jaringan yang jelas pengelolanya.",
      "Matikan fitur auto-connect.",
    ],
  },
];

const MONTHLY_AUDIT = [
  "Hapus aplikasi yang sudah tidak diperlukan.",
  "Tinjau ulang izin akses aplikasi (kamera, mikrofon, lokasi).",
  "Ganti password akun penting jika sudah terlalu lama.",
  "Pastikan sistem operasi perangkat dalam versi terbaru.",
];

export default function TipsPage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-[#259b9a]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-8 lg:py-24">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#259b9a]/20 bg-[#259b9a]/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#259b9a]">
              <BadgeCheck size={14} /> Panduan Keamanan
            </div>
            <h1 className="mt-6 text-4xl font-black leading-[1.15] text-slate-900 sm:text-5xl lg:text-6xl tracking-tight">
              Membangun{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#259b9a] to-[#00a9d8]">
                kebiasaan digital
              </span>{" "}
              yang aman
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-600">
              Banyak risiko digital dapat dikurangi melalui kebiasaan sederhana
              dan konsisten. Terapkan langkah praktis yang paling relevan untuk
              rutinitas Anda.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/artikel"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#259b9a] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#259b9a]/20 transition-all hover:-translate-y-1 hover:bg-[#1d7c7b]"
              >
                Jelajahi Materi Dasar{" "}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 animate-fade-in-up delay-100">
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/60 backdrop-blur-xl p-8 shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00a9d8]/10 text-[#00a9d8]">
                  <ClipboardCheck size={26} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00a9d8]">
                    Prioritas Utama
                  </p>
                  <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
                    Lakukan Sekarang
                  </h2>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                {[
                  "Aktifkan verifikasi dua langkah (2FA).",
                  "Gunakan password berbeda untuk akun utama.",
                  "Jangan berikan kode OTP kepada siapa pun.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-[1.25rem] border border-slate-100 bg-slate-50 px-5 py-4 transition-colors hover:border-[#00a9d8]/30"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00a9d8] text-xs font-black text-white shadow-md">
                      {index + 1}
                    </div>
                    <p className="text-sm font-bold text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl animate-fade-in-up">
          <h2 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl tracking-tight">
            Fokus Pencegahan
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-slate-600">
            Tiga fondasi terpenting untuk mengamankan data dan perangkat Anda.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 animate-fade-in-up delay-100">
          {PRIORITY_ACTIONS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all hover:border-[#259b9a]/30"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#259b9a]/10 text-[#259b9a]">
                  <Icon size={26} strokeWidth={2.5} />
                </div>
                <h3 className="mt-6 text-xl font-black text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl animate-fade-in-up">
            <h2 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl tracking-tight">
              Panduan Praktis
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 animate-fade-in-up delay-100">
            {TIP_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.title}
                  className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-slate-100 text-slate-600">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">
                        {section.title}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {section.items.map((tip) => (
                      <div key={tip} className="flex items-start gap-3">
                        <CheckCircle2
                          size={20}
                          className="mt-0.5 shrink-0 text-[#259b9a]"
                        />
                        <p className="text-sm font-semibold leading-relaxed text-slate-700">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </PageLayout>
  );
}
