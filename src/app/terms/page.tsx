import Link from "next/link";
import { Shield, ArrowLeft, Calendar, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat Penggunaan",
  description: "Syarat dan ketentuan penggunaan platform edukasi Garda Siber.",
};

const sections = [
  {
    title: "1. Penerimaan Syarat",
    content: [
      "Dengan mengakses dan menggunakan platform Garda Siber, Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat oleh syarat dan ketentuan ini.",
      "Jika Anda tidak menyetujui syarat ini, mohon untuk tidak menggunakan platform kami.",
    ],
  },
  {
    title: "2. Deskripsi Layanan",
    content: [
      "Garda Siber adalah platform edukasi dan literasi keamanan siber independen yang menyediakan:",
      "• Artikel dan panduan seputar ancaman siber dan cara pencegahannya.",
      "• Katalog ancaman siber beserta analisis dan rekomendasi mitigasi.",
      "• Quiz interaktif untuk menguji pemahaman keamanan digital pengguna.",
      "• Tips dan praktik terbaik keamanan digital untuk masyarakat umum.",
      "Seluruh konten bersifat edukatif dan tidak dimaksudkan sebagai pengganti konsultasi profesional keamanan siber.",
    ],
  },
  {
    title: "3. Penggunaan yang Diizinkan",
    content: [
      "Anda diizinkan untuk:",
      "• Mengakses dan membaca seluruh konten edukasi untuk keperluan pribadi dan non-komersial.",
      "• Berbagi tautan konten Garda Siber kepada orang lain untuk tujuan edukasi.",
      "• Mengutip konten dengan menyertakan atribusi yang jelas kepada Garda Siber.",
    ],
  },
  {
    title: "4. Penggunaan yang Dilarang",
    content: [
      "Anda dilarang untuk:",
      "• Menyalin, mendistribusikan, atau mereproduksi konten kami secara komersial tanpa izin tertulis.",
      "• Menggunakan platform untuk menyebarkan informasi yang menyesatkan, berbahaya, atau ilegal.",
      "• Melakukan tindakan yang dapat merusak, menonaktifkan, atau mengganggu server dan jaringan kami.",
      "• Menggunakan alat otomatis (bot, scraper) untuk mengumpulkan data dari platform tanpa izin.",
      "• Menyamar sebagai Garda Siber atau afiliasinya dalam komunikasi apapun.",
    ],
  },
  {
    title: "5. Hak Kekayaan Intelektual",
    content: [
      "Seluruh konten yang tersedia di Garda Siber, termasuk namun tidak terbatas pada teks, grafis, logo, ikon, dan kode, adalah milik Garda Siber atau pemberi lisensinya.",
      "Konten dilindungi oleh hukum hak cipta Indonesia dan perjanjian internasional yang berlaku.",
      "Anda tidak diperkenankan menggunakan nama, logo, atau identitas merek Garda Siber tanpa persetujuan tertulis sebelumnya.",
    ],
  },
  {
    title: "6. Penafian Jaminan",
    content: [
      "Platform ini disediakan 'sebagaimana adanya' tanpa jaminan apapun, baik tersurat maupun tersirat.",
      "Kami tidak menjamin bahwa platform akan selalu tersedia, bebas dari gangguan, atau bebas dari kesalahan.",
      "Informasi yang disajikan bersifat edukatif umum dan dapat berubah seiring perkembangan ancaman siber.",
    ],
  },
  {
    title: "7. Batasan Tanggung Jawab",
    content: [
      "Garda Siber tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari:",
      "• Penggunaan atau ketidakmampuan menggunakan platform kami.",
      "• Keputusan yang diambil berdasarkan informasi di platform kami.",
      "• Akses tidak sah ke data atau transmisi Anda.",
    ],
  },
  {
    title: "8. Perubahan Syarat",
    content: [
      "Kami berhak mengubah syarat ini kapan saja. Perubahan akan berlaku segera setelah dipublikasikan di halaman ini.",
      "Penggunaan berkelanjutan atas platform kami setelah perubahan diterbitkan dianggap sebagai penerimaan Anda atas syarat yang diperbarui.",
    ],
  },
  {
    title: "9. Hukum yang Berlaku",
    content: [
      "Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.",
      "Setiap sengketa yang timbul dari atau berkaitan dengan syarat ini akan diselesaikan melalui pengadilan yang berwenang di Indonesia.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-[#0F52BA] transition-colors font-bold text-sm">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#0F52BA] rounded-lg flex items-center justify-center">
              <Shield size={14} className="text-white" />
            </div>
            <span className="font-black text-slate-800 text-sm">Garda Siber</span>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-8 py-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-4">
            <Shield size={12} className="text-[#0F52BA]" />
            <span className="text-[10px] font-black text-[#0F52BA] uppercase tracking-widest">Legal Document</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-3">
            Syarat Penggunaan
          </h1>
          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5"><Calendar size={12} /> Berlaku sejak: 1 Januari 2025</div>
            <div className="flex items-center gap-1.5"><Calendar size={12} /> Terakhir diperbarui: 1 Mei 2026</div>
          </div>
          <p className="mt-4 text-slate-600 text-sm leading-relaxed font-medium max-w-2xl">
            Syarat dan ketentuan ini mengatur penggunaan platform edukasi Garda Siber. Harap baca dengan seksama sebelum menggunakan layanan kami.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
              <h2 className="font-black text-slate-900 text-base mb-4 pb-3 border-b border-slate-50">{section.title}</h2>
              <div className="space-y-2">
                {section.content.map((para, j) => (
                  <p key={j} className="text-slate-600 text-sm leading-relaxed font-medium">{para}</p>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-[#0F52BA] rounded-2xl p-7 text-white">
            <h2 className="font-black text-lg mb-2">Hubungi Kami</h2>
            <p className="text-blue-200 text-sm font-medium mb-4 leading-relaxed">
              Jika Anda memiliki pertanyaan mengenai syarat penggunaan ini, jangan ragu untuk menghubungi kami:
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Mail size={14} className="text-white" />
              </div>
              <span className="font-bold text-sm">sibersumsel@polri.go.id</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <Link href="/" className="text-sm font-bold text-[#0F52BA] hover:underline flex items-center gap-1.5">
            <ArrowLeft size={14} /> Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
            <Link href="/privacy" className="hover:text-[#0F52BA] transition-colors">Kebijakan Privasi</Link>
            <span className="text-slate-200">•</span>
            <Link href="/disclaimer" className="hover:text-[#0F52BA] transition-colors">Disclaimer</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
