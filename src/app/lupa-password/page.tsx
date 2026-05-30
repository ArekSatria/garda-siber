"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Shield,
  Mail,
  AlertCircle,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  ArrowRight,
  KeyRound,
} from "lucide-react";

export default function LupaPasswordPage() {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    });

    if (error) {
      setError("Terjadi kesalahan. Pastikan email yang Anda masukkan sudah benar.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC] dark:bg-slate-900 px-6 py-12">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-blue-50 dark:bg-blue-950/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-indigo-50 dark:bg-indigo-950/20 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative w-full max-w-[420px]">
        {/* Back link */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Login
        </Link>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-[0_8px_48px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_48px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-700/50 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-[#0F52BA] via-blue-400 to-[#0F52BA]" />

          <div className="px-8 pt-8 pb-8">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#0F52BA] rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(15,82,186,0.3)]">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-sm block">Garda Siber</span>
                <span className="text-slate-400 text-[10px] uppercase tracking-widest">Keamanan Digital</span>
              </div>
            </div>

            {/* Success State */}
            {success ? (
              <div className="text-center py-2">
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-950/40 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100 dark:border-blue-900/40">
                  <CheckCircle2 className="w-10 h-10 text-[#0F52BA]" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                  Email Terkirim!
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-2 max-w-[300px] mx-auto">
                  Tautan reset password telah dikirim ke
                </p>
                <p className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-6">
                  {email}
                </p>
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-2xl p-4 mb-7 text-left">
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    Silakan cek inbox Anda. Jika tidak menemukan email, periksa folder{" "}
                    <strong className="text-slate-700 dark:text-slate-200">Spam</strong> atau{" "}
                    <strong className="text-slate-700 dark:text-slate-200">Junk</strong>.
                    Link akan kedaluwarsa dalam <strong className="text-slate-700 dark:text-slate-200">60 menit</strong>.
                  </p>
                </div>
                <button
                  onClick={() => { setSuccess(false); setEmail(""); }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all mb-3"
                >
                  Kirim Ulang Email
                </button>
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 bg-[#0F52BA] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#0A3E8E] transition-all shadow-[0_4px_16px_rgba(15,82,186,0.3)]"
                >
                  Kembali ke Login <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <>
                {/* Icon */}
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/40 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 dark:border-blue-900/40">
                  <KeyRound className="w-7 h-7 text-[#0F52BA]" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                  Lupa Password?
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-7">
                  Masukkan email Anda dan kami akan mengirimkan tautan untuk
                  mengatur ulang password akun Garda Siber Anda.
                </p>

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-3 bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50 rounded-2xl px-4 py-3.5 mb-5">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium leading-snug">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Alamat Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email terdaftar Anda"
                        required
                        autoComplete="email"
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/25 focus:border-[#0F52BA] transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email}
                    className="w-full bg-[#0F52BA] hover:bg-[#0A3E8E] disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 dark:disabled:text-slate-500 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-[0_4px_16px_rgba(15,82,186,0.35)] hover:shadow-[0_6px_20px_rgba(15,82,186,0.45)] disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Mengirim...</span>
                      </>
                    ) : (
                      <>
                        <span>Kirim Link Reset</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                  Ingat password Anda?{" "}
                  <Link href="/login" className="font-bold text-[#0F52BA] dark:text-blue-400 hover:underline">
                    Masuk Sekarang
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
