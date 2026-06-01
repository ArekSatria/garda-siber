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
    "Panduan praktis keamanan digital untuk membantu pengguna membangun kebiasaan digital yang lebih aman, konsisten, dan relevan dengan kebutuhan sehari-hari.",
};

const PRIORITY_ACTIONS = [
  {
    title: "Aktifkan verifikasi dua langkah",
    description:
      "Tambahkan lapisan perlindungan ekstra pada akun penting agar tidak mudah diambil alih meskipun password diketahui pihak lain.",
    icon: ShieldCheck,
  },
  {
    title: "Periksa izin akses aplikasi",
    description:
      "Pastikan aplikasi hanya meminta akses yang benar-benar relevan dengan fungsinya, terutama kamera, mikrofon, kontak, dan lokasi.",
    icon: Smartphone,
  },
  {
    title: "Waspadai tautan dan file mencurigakan",
    description:
      "Jangan langsung membuka file, tautan, atau lampiran yang datang dari sumber yang tidak jelas atau terasa mendesak.",
    icon: TriangleAlert,
  },
];

const TIP_SECTIONS = [
  {
    title: "Keamanan Akun",
    description:
      "Kebiasaan dasar yang membantu mencegah pengambilalihan akun dan penyalahgunaan akses.",
    icon: KeyRound,
    items: [
      "Gunakan password yang berbeda untuk setiap akun penting.",
      "Hindari menggunakan data yang mudah ditebak, seperti tanggal lahir atau nama sendiri.",
      "Aktifkan verifikasi dua langkah pada email, media sosial, dan layanan keuangan.",
      "Perbarui password jika merasa akun pernah diakses pihak lain.",
      "Periksa perangkat yang masih login dan keluarkan sesi yang tidak dikenal.",
    ],
  },
  {
    title: "Penipuan Digital",
    description:
      "Langkah sederhana untuk mengurangi risiko tertipu oleh phishing, manipulasi sosial, dan pesan palsu.",
    icon: TriangleAlert,
    items: [
      "Jangan langsung percaya pada pesan yang bernada mendesak atau menakut-nakuti.",
      "Periksa kembali alamat situs sebelum login atau memasukkan data.",
      "Jangan pernah membagikan OTP, PIN, atau password kepada siapa pun.",
      "Konfirmasi informasi penting melalui kanal resmi, bukan lewat kontak dari pesan mencurigakan.",
      "Curigai file APK, undangan digital, atau tautan instalasi dari sumber yang tidak resmi.",
    ],
  },
  {
    title: "Keamanan Perangkat",
    description:
      "Hal-hal dasar yang membantu menjaga perangkat tetap aman saat dipakai sehari-hari.",
    icon: Smartphone,
    items: [
      "Perbarui sistem operasi dan aplikasi secara berkala.",
      "Hapus aplikasi yang sudah tidak digunakan atau tidak jelas asal-usulnya.",
      "Kunci perangkat dengan PIN, password, atau biometrik.",
      "Periksa izin akses aplikasi secara rutin.",
      "Hindari menginstal aplikasi di luar toko resmi jika tidak benar-benar diperlukan.",
    ],
  },
  {
    title: "Jaringan & Koneksi",
    description:
      "Kebiasaan aman saat mengakses internet, terutama melalui jaringan bersama atau WiFi publik.",
    icon: Wifi,
    items: [
      "Hindari login ke akun penting saat memakai WiFi publik.",
      "Matikan fitur auto-connect agar perangkat tidak tersambung otomatis.",
      "Gunakan jaringan yang jelas sumber dan pengelolanya.",
      "Jangan mengirim data sensitif melalui koneksi yang tidak Anda pahami keamanannya.",
      "Keluar dari akun penting setelah selesai digunakan di perangkat bersama.",
    ],
  },
  {
    title: "Data Pribadi",
    description:
      "Langkah preventif agar data pribadi tidak mudah dipakai untuk penipuan atau penyalahgunaan lain.",
    icon: FileWarning,
    items: [
      "Batasi penyebaran foto identitas dan dokumen pribadi di ruang digital.",
      "Jangan membagikan informasi sensitif tanpa alasan yang jelas dan sah.",
      "Periksa kembali tujuan permintaan data sebelum menyetujuinya.",
      "Gunakan email utama secara lebih hati-hati karena sering menjadi pusat pemulihan akun lain.",
      "Pantau notifikasi yang berkaitan dengan registrasi, login, atau perubahan data.",
    ],
  },
];

const MONTHLY_AUDIT = [
  "Periksa aplikasi yang terpasang dan hapus yang sudah tidak diperlukan.",
  "Tinjau ulang izin akses aplikasi, terutama kamera, mikrofon, kontak, dan lokasi.",
  "Ganti password akun penting bila sudah terlalu lama digunakan.",
  "Periksa apakah verifikasi dua langkah masih aktif pada akun utama.",
  "Cek riwayat login atau perangkat yang masih terhubung ke akun penting.",
  "Pastikan sistem operasi dan aplikasi sudah diperbarui ke versi terbaru.",
];

const INCIDENT_RESPONSE = [
  "Jika merasa akun diambil alih, segera ganti password dan keluarkan sesi login lain.",
  "Jika menerima pesan mencurigakan, jangan langsung membuka tautan atau file.",
  "Jika perangkat terasa tidak normal, periksa aplikasi yang baru dipasang dan izin aksesnya.",
  "Jika data sensitif terlanjur dibagikan, segera amankan akun terkait dan lakukan pelaporan ke layanan resmi.",
];

export default function TipsPage() {
  return (
    <PageLayout>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8 lg:py-18">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-emerald-700">
              <BadgeCheck size={14} />
              Tips Praktis
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
              Panduan praktis untuk membangun kebiasaan digital yang lebih aman
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Banyak risiko digital sebenarnya dapat dikurangi melalui kebiasaan
              yang sederhana, konsisten, dan tepat. Halaman ini merangkum
              langkah praktis yang paling relevan untuk penggunaan akun,
              perangkat, jaringan, dan data pribadi.
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

          <div className="mt-10 lg:mt-0">
            <div className="rounded-[34px] border border-slate-200 bg-[linear-gradient(135deg,#F8FBFF_0%,#EEF4FF_55%,#FFFFFF_100%)] p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
                  <ClipboardCheck size={22} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0F52BA]">
                    Prioritas Utama
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                    Langkah pertama yang paling penting
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "Aktifkan verifikasi dua langkah pada akun penting.",
                  "Gunakan password yang kuat dan berbeda untuk setiap akun.",
                  "Jangan bagikan OTP, PIN, atau password kepada siapa pun.",
                  "Periksa izin akses aplikasi dan hapus yang tidak perlu.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0F52BA] text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-7 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0F52BA]">
            <ShieldCheck size={14} />
            Fokus Utama
          </div>
          <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
            Prioritas yang sebaiknya dilakukan lebih dulu
          </h2>
          <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
            Jika Anda ingin mulai dari langkah yang paling berdampak, tiga hal
            berikut adalah fondasi yang paling penting.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PRIORITY_ACTIONS.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm"
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
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-emerald-700">
              <BadgeCheck size={14} />
              Panduan Praktis
            </div>
            <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
              Tips yang disusun berdasarkan area penggunaan
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {TIP_SECTIONS.map((section) => {
              const Icon = section.icon;

              return (
                <div
                  key={section.title}
                  className="rounded-[30px] border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-700">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-xl font-black text-slate-900">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {section.description}
                  </p>

                  <div className="mt-5 space-y-3">
                    {section.items.map((tip) => (
                      <div
                        key={tip}
                        className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
                      >
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-emerald-700"
                        />
                        <p className="text-sm leading-7 text-slate-600">
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

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-700">
              <ClipboardCheck size={14} />
              Audit Bulanan
            </div>
            <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
              Hal yang sebaiknya diperiksa secara berkala
            </h2>
            <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
              Keamanan digital bukan langkah sekali selesai. Pemeriksaan ringan
              secara berkala dapat membantu Anda menjaga akun, perangkat, dan
              data tetap dalam kondisi yang lebih aman.
            </p>
          </div>

          <div className="grid gap-3">
            {MONTHLY_AUDIT.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-amber-700"
                />
                <p className="text-sm leading-7 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-red-700">
                <TriangleAlert size={14} />
                Respons Awal
              </div>
              <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                Jika merasa ada sesuatu yang tidak beres
              </h2>
              <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                Ketika ada tanda yang mencurigakan, respons cepat sering kali
                membantu membatasi dampak yang lebih besar.
              </p>
            </div>

            <div className="grid gap-3">
              {INCIDENT_RESPONSE.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-red-700"
                  />
                  <p className="text-sm leading-7 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-[linear-gradient(135deg,#F8FBFF_0%,#EEF4FF_55%,#FFFFFF_100%)] p-8 shadow-sm sm:p-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0F52BA]">
              <BadgeCheck size={14} />
              Langkah Berikutnya
            </div>

            <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
              Pelajari materi lebih lanjut dan evaluasi pemahaman Anda
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
              Tips akan jauh lebih efektif jika disertai pemahaman yang kuat.
              Lanjutkan ke artikel untuk memperdalam topik, lalu gunakan quiz
              untuk mengecek sejauh mana pemahaman Anda.
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
      </section>

      <Footer />
    </PageLayout>
  );
}
