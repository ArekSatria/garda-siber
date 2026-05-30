"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ShieldX } from "lucide-react";

function ForbiddenContent() {
  const searchParams = useSearchParams();
  const isForbidden = searchParams.get("forbidden") === "true";

  if (!isForbidden) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-slate-900 border border-rose-500/30 rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl">
        <div className="w-16 h-16 bg-rose-500/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <ShieldX size={32} className="text-rose-400" />
        </div>
        <h2 className="text-white font-black text-xl mb-2">Akses Ditolak</h2>
        <p className="text-slate-400 text-sm mb-6">
          Halaman ini hanya dapat diakses oleh Administrator Garda Siber.
        </p>
        <div className="flex gap-3">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold rounded-xl transition-all"
          >
            Beranda
          </Link>
          <Link
            href="/profil"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold rounded-xl transition-all"
          >
            Profil Saya
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ForbiddenBanner() {
  return (
    <Suspense fallback={null}>
      <ForbiddenContent />
    </Suspense>
  );
}
