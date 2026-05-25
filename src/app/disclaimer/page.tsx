import Link from "next/link";
import { Shield, ArrowLeft, Calendar, Mail, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer dan penafian tanggung jawab platform edukasi Garda Siber.",
};

const sections = [
  {
    title: "1. Tujuan Platform",
    content: [
      "Garda Siber adalah platform edukasi dan literasi keamanan siber yang bertujuan untuk meningkatkan kesadaran masyarakat Indonesia tentang ancaman digital.",
      "Seluruh konten yang tersedia di platform ini, termasuk artikel, panduan, quiz, dan tips keamanan, disediakan semata-mata untuk tujuan informasi dan edukasi publik.",
    ],
  },
  {
    title: "2. Bukan Layanan Profesional",
    content: [
      "Informasi yang disajikan di Garda Siber TIDAK dimaksudkan sebagai pengganti saran, konsultasi, atau layanan dari profesional keamanan siber berlisensi.",
      "Untuk penanganan insiden siber yang aktif, respons terhadap ancaman yang sedang berlangsung, atau keputusan keamanan kritis organisasi, kami sangat menyarankan untuk berkonsultasi dengan pakar keamanan siber bersertifikat.",
    ],
  },
  {
    title: "3. Akurasi Informasi",
    content: [
      "Kami berupaya menyajikan informasi yang akurat, terkini, dan relevan. Namun, lanskap ancaman siber berkembang dengan sangat cepat.",
      "Garda Siber tidak menjamin bahwa semua informasi yang tersedia di platform ini:",
      "• Sepenuhnya akurat, lengkap, atau terkini pada saat Anda membacanya.",
      "• Sesuai untuk situasi atau kebutuhan keamanan spesifik Anda.",
      "• Bebas dari kesalahan teknis atau ketidakakuratan.",
      "Pengguna disarankan untuk memverifikasi informasi penting melalui sumber resmi seperti BSSN, Kominfo, atau pakar keamanan siber.",
    ],
  },
  {
    title: "4. Tidak Ada Hubungan Afiliasi",
    content: [
      "Garda Siber adalah platform edukasi independen. Penyebutan nama organisasi, produk, atau layanan tertentu dalam konten kami tidak berarti endorsement, afiliasi, atau kemitraan resmi.",
      "Tautan ke situs web pihak ketiga (BSSN, Kominfo, OJK, Polri) disediakan semata-mata untuk kemudahan referensi. Kami tidak bertanggung jawab atas konten, keakuratan, atau kebijakan situs-situs tersebut.",
    ],
  },
  {
    title: "5. Batasan Tanggung Jawab",
    content: [
      "Garda Siber, pengelola, kontributor, dan afiliasinya tidak bertanggung jawab atas:",
      "• Kerugian finansial, data, atau aset digital yang timbul akibat serangan siber, meskipun informasi pencegahan tersedia di platform kami.",
      "• Keputusan yang diambil berdasarkan konten edukasi kami tanpa verifikasi tambahan.",
      "• Ketidakakuratan atau perubahan informasi yang belum sempat diperbarui di platform.",
      "• Gangguan layanan, downtime, atau masalah teknis yang mempengaruhi aksesibilitas platform.",
    ],
  },
  {
    title: "6. Penggunaan Konten Quiz",
    content: [
      "Quiz literasi siber yang tersedia di platform ini dirancang sebagai alat pembelajaran interaktif, bukan sebagai penilaian sertifikasi profesional.",
      "Hasil quiz tidak dapat digunakan sebagai bukti kompetensi resmi dalam bidang keamanan siber.",
    ],
  },
  {
    title: "7. Pelaporan Insiden Siber",
    content: [
      "Jika Anda atau organisasi Anda mengalami insiden siber aktif, segera hubungi:",
      "• BSSN (Badan Siber dan Sandi Negara): bssn.go.id",
      "• Cybercrime Polri: patrolisiber.id",
      "• Hotline Siber: 110 (Polri)",
      "Platform Garda Siber tidak memiliki kapasitas untuk menangani respons insiden siber secara langsung.",
    ],
  },
  {
    title: "8. Perubahan Konten",
    content: [
      "Kami berhak mengubah, memperbarui, atau menghapus konten kapan saja tanpa pemberitahuan sebelumnya, guna memastikan informasi yang tersedia tetap relevan dan akurat.",
      "Pengguna disarankan untuk selalu memeriksa tanggal pembaruan artikel sebelum mengandalkan informasi untuk keputusan penting.",
    ],
  },
];

export default function DisclaimerPage() {
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
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-3">Disclaimer</h1>
          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5"><Calendar size={12} /> Berlaku sejak: 1 Januari 2025</div>
            <div className="flex items-center gap-1.5"><Calendar size={12} /> Terakhir diperbarui: 1 Mei 2026</div>
          </div>
          <p className="mt-4 text-slate-600 text-sm leading-relaxed font-medium max-w-2xl">
            Harap baca disclaimer ini dengan seksama. Dokumen ini menjelaskan batasan tanggung jawab dan penafian Garda Siber sebagai platform edukasi keamanan siber.
          </p>
        </div>

        {/* Warning banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3 mb-8">
          <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-black text-amber-800 text-sm mb-1">Perhatian Penting</p>
            <p className="text-amber-700 text-sm font-medium leading-relaxed">
              Jika Anda sedang mengalami insiden siber aktif, jangan mengandalkan platform ini. Segera hubungi <strong>Cybercrime Polri di patrolisiber.id</strong> atau <strong>BSSN di bssn.go.id</strong> untuk bantuan profesional.
            </p>
          </div>
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
              Jika ada pertanyaan mengenai disclaimer ini atau konten di platform kami, hubungi tim Garda Siber:
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
            <Link href="/terms" className="hover:text-[#0F52BA] transition-colors">Syarat Penggunaan</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
