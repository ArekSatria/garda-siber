import Link from "next/link";
import { Mail, MapPin, ShieldCheck } from "lucide-react";

const QUICK_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Ancaman", href: "/ancaman" },
  { label: "Artikel", href: "/artikel" },
  { label: "Tips", href: "/tips" },
  { label: "Quiz", href: "/quiz" },
  { label: "Tentang", href: "/tentang" },
];

const TOPICS = [
  { label: "Phishing", href: "/artikel" },
  { label: "Password kuat", href: "/artikel" },
  { label: "Keamanan perangkat", href: "/artikel" },
  { label: "Privasi data", href: "/artikel" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.45fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F52BA] text-white">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Garda Siber
                </h2>
                <p className="text-sm text-slate-500">
                  Media edukasi keamanan digital
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
              Platform edukasi yang membantu masyarakat memahami ancaman
              digital, langkah pencegahan dasar, dan kebiasaan keamanan siber
              yang lebih baik dalam aktivitas sehari-hari.
            </p>

            <div className="mt-5 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0F52BA]">
              Project edukasi
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-900">
              Navigasi
            </h3>
            <div className="mt-4 grid gap-3">
              {QUICK_LINKS.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="text-sm font-medium text-slate-600 transition hover:text-[#0F52BA]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-900">
              Topik belajar
            </h3>
            <div className="mt-4 grid gap-3">
              {TOPICS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-slate-600 transition hover:text-[#0F52BA]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-900">
              Informasi
            </h3>

            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin size={18} className="mt-0.5 text-[#0F52BA]" />
                <p>
                  Dikembangkan dalam konteks project magang untuk mendukung
                  literasi keamanan digital.
                </p>
              </div>

              <div className="flex items-start gap-3 text-sm text-slate-600">
                <Mail size={18} className="mt-0.5 text-[#0F52BA]" />
                <p>
                  Pastikan kontak, afiliasi, dan identitas institusional yang
                  ditampilkan sesuai arahan pihak terkait.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs leading-6 text-slate-500">
                Konten pada website ini bersifat edukatif dan preventif. Gunakan
                bahasa, klaim, dan informasi yang tetap aman secara
                institusional saat dipresentasikan.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Garda Siber. Seluruh hak cipta dilindungi.</p>
          <p>
            Dirancang agar pembelajaran keamanan digital terasa lebih jelas dan
            modern.
          </p>
        </div>
      </div>
    </footer>
  );
}
