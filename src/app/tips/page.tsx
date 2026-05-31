import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";
import {
  Lightbulb,
  CheckCircle2,
  ShieldCheck,
  KeyRound,
  Smartphone,
  Eye,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tips Keamanan Digital",
  description:
    "Panduan praktis keamanan digital: cara aman mengelola akun, privasi media sosial, keamanan perangkat, dan transaksi digital.",
};

const SECURITY_TIPS = [
  {
    category: "Akun & Password",
    icon: KeyRound,
    color: "text-blue-600 bg-blue-50",
    items: [
      "Gunakan kombinasi minimal 12 karakter (huruf, angka, simbol).",
      "Aktifkan Two-Factor Authentication (2FA) di semua akun.",
      "Jangan gunakan satu password untuk banyak akun berbeda.",
    ],
  },
  {
    category: "Privasi Media Sosial",
    icon: Eye,
    color: "text-purple-600 bg-purple-50",
    items: [
      "Atur profil Anda menjadi 'Private' jika tidak diperlukan.",
      "Berhati-hatilah saat membagikan lokasi secara real-time.",
      "Hapus aplikasi pihak ketiga yang tidak lagi digunakan.",
    ],
  },
  {
    category: "Keamanan Perangkat",
    icon: Smartphone,
    color: "text-green-600 bg-green-50",
    items: [
      "Selalu update sistem operasi (iOS/Android) ke versi terbaru.",
      "Jangan melakukan 'Root' atau 'Jailbreak' pada ponsel Anda.",
      "Pasang aplikasi antivirus atau pemindai malware resmi.",
    ],
  },
  {
    category: "Transaksi Digital",
    icon: ShieldCheck,
    color: "text-orange-600 bg-orange-50",
    items: [
      "Pastikan URL toko online menggunakan 'https://'.",
      "Hindari bertransaksi menggunakan WiFi publik gratisan.",
      "Periksa riwayat mutasi rekening secara berkala.",
    ],
  },
];

export default function TipsPage() {
  return (
    <PageLayout>
      <main className="p-6 md:p-10">
        <header className="mb-10">
          <div className="flex items-center gap-3 text-[#0F52BA] font-bold mb-4">
            <Lightbulb
              size={24}
              className="text-yellow-500"
              aria-hidden="true"
            />
            <span className="tracking-widest uppercase text-sm">
              Panduan Praktis
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Tips Keamanan Digital
          </h1>
          <p className="text-slate-500 mt-2">
            Langkah sederhana yang bisa Anda lakukan sekarang untuk melindungi
            data pribadi.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SECURITY_TIPS.map((group) => (
            <div
              key={group.category}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-2xl ${group.color}`}>
                  <group.icon size={24} aria-hidden="true" />
                </div>
                <h2 className="font-bold text-xl text-slate-800">
                  {group.category}
                </h2>
              </div>

              <ul className="space-y-4">
                {group.items.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <div className="mt-1 shrink-0">
                      <CheckCircle2
                        size={18}
                        className="text-[#0F52BA]"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                      {tip}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </PageLayout>
  );
}
