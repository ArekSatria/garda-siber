"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowRight,
  FileText,
  BookOpen,
  Layers,
  Check,
  X,
} from "lucide-react";

const STATS = [
  { icon: FileText, value: "120+", label: "Artikel Edukasi" },
  { icon: BookOpen, value: "50+", label: "Materi Keamanan" },
  { icon: Layers, value: "10+", label: "Kategori Ancaman Siber" },
];

type PasswordRule = {
  id: string;
  label: string;
  test: (pw: string) => boolean;
};

const PASSWORD_RULES: PasswordRule[] = [
  { id: "length",  label: "Minimal 8 karakter",    test: (pw) => pw.length >= 8 },
  { id: "upper",   label: "Huruf besar (A-Z)",      test: (pw) => /[A-Z]/.test(pw) },
  { id: "number",  label: "Angka (0-9)",            test: (pw) => /[0-9]/.test(pw) },
  { id: "special", label: "Karakter simbol (!@#$)", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

function getStrength(pw: string): { score: number; label: string; color: string; barColor: string } {
  const passed = PASSWORD_RULES.filter((r) => r.test(pw)).length;
  if (pw.length === 0)   return { score: 0, label: "",         color: "text-slate-400", barColor: "bg-slate-200" };
  if (passed <= 1)        return { score: 1, label: "Lemah",   color: "text-red-500",   barColor: "bg-red-400" };
  if (passed === 2)       return { score: 2, label: "Cukup",   color: "text-orange-500",barColor: "bg-orange-400" };
  if (passed === 3)       return { score: 3, label: "Baik",    color: "text-yellow-500",barColor: "bg-yellow-400" };
  return                         { score: 4, label: "Kuat",    color: "text-green-600", barColor: "bg-green-500" };
}

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName]           = useState("");
  const [email, setEmail]                 = useState("");
  const [password, setPassword]           = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword]   = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);
  const [agreeTerms, setAgreeTerms]       = useState(false);
  const [loading, setLoading]             = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError]                 = useState("");
  const [success, setSuccess]             = useState(false);

  const strength = getStrength(password);
  const passedRules = PASSWORD_RULES.filter((r) => r.test(password));
  const passwordMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleRegister = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      if (passedRules.length < 4) {
        setError("Password belum memenuhi semua persyaratan keamanan.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Password dan konfirmasi password tidak cocok.");
        return;
      }
      if (!agreeTerms) {
        setError("Anda harus menyetujui Kebijakan Privasi dan Syarat Layanan.");
        return;
      }

      setLoading(true);
      const supabase = createClient();

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(
          error.message.includes("already registered")
            ? "Email ini sudah terdaftar. Silakan login."
            : error.message
        );
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    },
    [email, password, confirmPassword, fullName, agreeTerms, passedRules]
  );

  async function handleGoogleRegister() {
    setGoogleLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  /* ── SUCCESS STATE ─────────────────────────────────── */
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC] dark:bg-slate-900 px-6">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-[0_8px_48px_rgba(0,0,0,0.08)] border border-slate-100 dark:border-slate-700/50 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400" />
            <div className="px-8 py-12 text-center">
              <div className="w-20 h-20 bg-green-50 dark:bg-green-950/40 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100 dark:border-green-900/50">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
                Pendaftaran Berhasil!
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
                Kami telah mengirimkan tautan verifikasi ke{" "}
                <strong className="text-slate-700 dark:text-slate-200">{email}</strong>.
                Silakan cek inbox atau folder spam Anda.
              </p>
              <Link
                href="/login"
                className="w-full flex items-center justify-center gap-2 bg-[#0F52BA] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#0A3E8E] transition-all shadow-[0_4px_16px_rgba(15,82,186,0.35)]"
              >
                Masuk ke Akun <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── MAIN LAYOUT ───────────────────────────────────── */
  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[48%] relative flex-col overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A3880] via-[#0F52BA] to-[#1565C0]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute bottom-[-60px] right-[-80px] opacity-[0.06]">
          <Shield className="w-[480px] h-[480px] text-white" strokeWidth={0.5} />
        </div>

        <div className="relative z-10 flex flex-col h-full px-10 xl:px-14 py-12">
          {/* Logo */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-lg tracking-tight leading-none block">
                Garda Siber
              </span>
              <span className="text-blue-200/80 text-[10px] font-semibold uppercase tracking-[0.15em]">
                Keamanan Digital
              </span>
            </div>
          </div>

          <div className="mt-10">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-semibold px-4 py-2 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-200" />
              Platform Literasi Keamanan Digital Indonesia
            </span>
          </div>

          <div className="mt-8 flex-1">
            <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-[1.2] tracking-tight">
              Bergabung &amp; Mulai
              <br />
              <span className="text-blue-200">Perjalanan Literasi</span>
              <br />
              Digital Anda
            </h1>
            <p className="mt-6 text-blue-100/80 text-sm leading-relaxed max-w-[340px]">
              Mulai perjalanan Anda menuju literasi keamanan digital yang lebih
              baik. Akses ratusan konten edukasi terpercaya secara gratis.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Akses 120+ artikel edukasi keamanan siber",
                "Materi interaktif dan panduan praktis",
                "Update terbaru ancaman digital Indonesia",
                "Quiz dan uji pengetahuan keamanan",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-400/20 border border-blue-300/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-blue-200" strokeWidth={2.5} />
                  </div>
                  <span className="text-blue-100/80 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3.5"
                >
                  <Icon className="w-4 h-4 text-blue-200 mb-1.5" />
                  <div className="text-xl font-extrabold text-white">{value}</div>
                  <div className="text-blue-200/70 text-[11px] font-medium leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="text-blue-200/60 text-xs font-medium">
              © 2025 Garda Siber · Pusat Literasi Keamanan Digital Indonesia
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-10 bg-[#F7F9FC] dark:bg-slate-900">
        <div className="w-full max-w-[440px]">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#0F52BA] rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-base block">Garda Siber</span>
              <span className="text-slate-500 text-[10px] uppercase tracking-widest">Keamanan Digital</span>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-[0_8px_48px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_48px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-700/50 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[#0F52BA] via-blue-400 to-[#0F52BA]" />

            <div className="px-7 pt-7 pb-7">
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Buat Akun Garda Siber
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 font-medium">
                  Mulai perjalanan literasi keamanan digital Anda
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50 rounded-2xl px-4 py-3.5 mb-5">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium leading-snug">{error}</p>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                {/* Nama Lengkap */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nama lengkap Anda"
                      required
                      autoComplete="name"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/25 focus:border-[#0F52BA] transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
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
                      placeholder="contoh@email.com"
                      required
                      autoComplete="email"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/25 focus:border-[#0F52BA] transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Buat password yang kuat"
                      required
                      autoComplete="new-password"
                      className="w-full pl-11 pr-12 py-3.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/25 focus:border-[#0F52BA] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Strength bar */}
                  {password.length > 0 && (
                    <div className="mt-2.5 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${strength.barColor}`}
                            style={{ width: `${(strength.score / 4) * 100}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold min-w-[40px] text-right ${strength.color}`}>
                          {strength.label}
                        </span>
                      </div>

                      {/* Password rules checklist */}
                      <div className="grid grid-cols-2 gap-1.5">
                        {PASSWORD_RULES.map((rule) => {
                          const passed = rule.test(password);
                          return (
                            <div key={rule.id} className="flex items-center gap-1.5">
                              <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                                passed
                                  ? "bg-green-100 dark:bg-green-900/40"
                                  : "bg-slate-100 dark:bg-slate-700"
                              }`}>
                                {passed
                                  ? <Check className="w-2 h-2 text-green-600 dark:text-green-400" strokeWidth={3} />
                                  : <X className="w-2 h-2 text-slate-300 dark:text-slate-600" strokeWidth={2.5} />
                                }
                              </div>
                              <span className={`text-[11px] font-medium transition-colors ${
                                passed ? "text-green-600 dark:text-green-400" : "text-slate-400 dark:text-slate-500"
                              }`}>
                                {rule.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Konfirmasi Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Ulangi password Anda"
                      required
                      autoComplete="new-password"
                      className={`w-full pl-11 pr-12 py-3.5 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        passwordMismatch
                          ? "border-red-300 dark:border-red-700 focus:ring-red-200/50 focus:border-red-400 bg-red-50 dark:bg-red-950/20"
                          : passwordMatch
                          ? "border-green-300 dark:border-green-700 focus:ring-green-200/50 focus:border-green-400 bg-green-50/50 dark:bg-green-950/20"
                          : "border-slate-200 dark:border-slate-600 focus:ring-[#0F52BA]/25 focus:border-[#0F52BA]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passwordMismatch && (
                    <p className="text-xs font-semibold text-red-500 mt-1.5 flex items-center gap-1">
                      <X className="w-3 h-3" /> Password tidak cocok
                    </p>
                  )}
                  {passwordMatch && (
                    <p className="text-xs font-semibold text-green-600 dark:text-green-400 mt-1.5 flex items-center gap-1">
                      <Check className="w-3 h-3" strokeWidth={3} /> Password cocok
                    </p>
                  )}
                </div>

                {/* Terms checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setAgreeTerms(!agreeTerms)}
                    className={`w-5 h-5 mt-0.5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0 ${
                      agreeTerms
                        ? "bg-[#0F52BA] border-[#0F52BA]"
                        : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                    }`}
                    aria-label="Setuju syarat layanan"
                  >
                    {agreeTerms && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed select-none cursor-pointer" onClick={() => setAgreeTerms(!agreeTerms)}>
                    Saya menyetujui{" "}
                    <Link href="/privacy" className="text-[#0F52BA] dark:text-blue-400 font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>
                      Kebijakan Privasi
                    </Link>{" "}
                    dan{" "}
                    <Link href="/terms" className="text-[#0F52BA] dark:text-blue-400 font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>
                      Syarat Layanan
                    </Link>{" "}
                    Garda Siber
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !fullName || !email || !password || !confirmPassword || !agreeTerms}
                  className="w-full mt-1 bg-[#0F52BA] hover:bg-[#0A3E8E] disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 dark:disabled:text-slate-500 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-[0_4px_16px_rgba(15,82,186,0.35)] hover:shadow-[0_6px_20px_rgba(15,82,186,0.45)] disabled:shadow-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mendaftarkan...</span>
                    </>
                  ) : (
                    <>
                      <span>Daftar Sekarang</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100 dark:border-slate-700" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white dark:bg-slate-800 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    atau
                  </span>
                </div>
              </div>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleRegister}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all"
              >
                {googleLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                )}
                <span>Daftar dengan Google</span>
              </button>

              {/* Footer */}
              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                Sudah punya akun?{" "}
                <Link href="/login" className="font-bold text-[#0F52BA] dark:text-blue-400 hover:underline">
                  Masuk Sekarang
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center mt-6">
            <Link
              href="/"
              className="text-sm text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors font-medium"
            >
              ← Kembali ke Beranda
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
