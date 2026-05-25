import Link from "next/link";
import { Shield, ArrowLeft, Calendar, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi Garda Siber mengenai pengumpulan, penggunaan, dan perlindungan data pengguna.",
};

const sections = [
  {
    title: "1. Informasi yang Kami Kumpulkan",
    content: [
      "Garda Siber tidak memerlukan pendaftaran akun untuk mengakses konten edukasi kami. Namun, kami dapat mengumpulkan informasi berikut secara otomatis:",
      "• Data teknis: alamat IP, jenis browser, sistem operasi, halaman yang dikunjungi, dan durasi kunjungan melalui layanan analitik standar.",
      "• Data komunikasi: jika Anda menghubungi kami melalui email atau formulir kontak, kami menyimpan nama dan alamat email Anda untuk keperluan respons.",
      "Kami tidak mengumpulkan data sensitif seperti nomor KTP, rekening bank, atau informasi keuangan pribadi.",
    ],
  },
  {
    title: "2. Cara Kami Menggunakan Data",
    content: [
      "Data yang dikumpulkan digunakan semata-mata untuk:",
      "• Meningkatkan kualitas dan relevansi konten edukasi keamanan siber.",
      "• Menganalisis tren pengunjung untuk mengoptimalkan pengalaman pengguna.",
      "• Merespons pertanyaan atau laporan yang Anda kirimkan kepada kami.",
      "• Memastikan keamanan dan integritas platform dari ancaman siber.",
      "Kami tidak menjual, menyewakan, atau membagikan data pribadi Anda kepada pihak ketiga untuk tujuan komersial.",
    ],
  },
  {
    title: "3. Cookie dan Teknologi Serupa",
    content: [
      "Platform ini dapat menggunakan cookie teknis yang diperlukan untuk fungsi dasar website. Cookie ini tidak menyimpan informasi pribadi yang dapat mengidentifikasi Anda.",
      "Anda dapat mengatur browser untuk menolak semua cookie, namun hal ini dapat mempengaruhi fungsionalitas tertentu dari website.",
    ],
  },
  {
    title: "4. Keamanan Data",
    content: [
      "Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang sesuai untuk melindungi data dari akses tidak sah, pengungkapan, perubahan, atau penghapusan.",
      "Meskipun demikian, tidak ada sistem transmisi data melalui internet yang sepenuhnya aman. Kami tidak dapat menjamin keamanan absolut dari informasi yang Anda kirimkan.",
    ],
  },
  {
    title: "5. Tautan ke Pihak Ketiga",
    content: [
      "Platform Garda Siber menyertakan tautan ke situs web pihak ketiga seperti BSSN, Kominfo, OJK, dan Polri. Kebijakan privasi ini tidak berlaku untuk situs-situs tersebut.",
      "Kami mendorong Anda untuk membaca kebijakan privasi setiap situs yang Anda kunjungi melalui tautan dari platform kami.",
    ],
  },
  {
    title: "6. Hak Pengguna",
    content: [
      "Sesuai dengan Undang-Undang Perlindungan Data Pribadi (UU PDP) Indonesia, Anda memiliki hak untuk:",
      "• Mengetahui data pribadi apa yang kami simpan tentang Anda.",
      "• Meminta koreksi atas data yang tidak akurat.",
      "• Meminta penghapusan data pribadi Anda dari sistem kami.",
      "• Mengajukan keberatan atas pemrosesan data pribadi Anda.",
      "Untuk menggunakan hak-hak ini, hubungi kami melalui email yang tertera di bawah.",
    ],
  },
  {
    title: "7. Perubahan Kebijakan",
    content: [
      "Kami berhak mengubah kebijakan privasi ini sewaktu-waktu. Perubahan akan diberitahukan melalui pembaruan tanggal revisi di halaman ini.",
      "Penggunaan berkelanjutan atas platform kami setelah perubahan dianggap sebagai persetujuan Anda terhadap kebijakan yang diperbarui.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
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
        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-4">
            <Shield size={12} className="text-[#0F52BA]" />
            <span className="text-[10px] font-black text-[#0F52BA] uppercase tracking-widest">Legal Document</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-3">
            Kebijakan Privasi
          </h1>
          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5"><Calendar size={12} /> Berlaku sejak: 1 Januari 2025</div>
            <div className="flex items-center gap-1.5"><Calendar size={12} /> Terakhir diperbarui: 1 Mei 2026</div>
          </div>
          <p className="mt-4 text-slate-600 text-sm leading-relaxed font-medium max-w-2xl">
            Garda Siber berkomitmen untuk melindungi privasi dan keamanan data pengguna. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan platform edukasi kami.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
              <h2 className="font-black text-slate-900 text-base mb-4 pb-3 border-b border-slate-50">
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.content.map((para, j) => (
                  <p key={j} className="text-slate-600 text-sm leading-relaxed font-medium">{para}</p>
                ))}
              </div>
            </div>
          ))}

          {/* Contact */}
          <div className="bg-[#0F52BA] rounded-2xl p-7 text-white">
            <h2 className="font-black text-lg mb-2">Ada Pertanyaan?</h2>
            <p className="text-blue-200 text-sm font-medium mb-4 leading-relaxed">
              Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini atau ingin menggunakan hak-hak Anda sebagai pengguna, hubungi kami:
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Mail size={14} className="text-white" />
              </div>
              <span className="font-bold text-sm">sibersumsel@polri.go.id</span>
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <Link href="/" className="text-sm font-bold text-[#0F52BA] hover:underline flex items-center gap-1.5">
            <ArrowLeft size={14} /> Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
            <Link href="/terms" className="hover:text-[#0F52BA] transition-colors">Syarat Penggunaan</Link>
            <span className="text-slate-200">•</span>
            <Link href="/disclaimer" className="hover:text-[#0F52BA] transition-colors">Disclaimer</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
