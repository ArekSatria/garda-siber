"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ArrowRight,
  CheckCircle,
  BookOpen,
  FileText,
  Layers,
} from "lucide-react";

const STATS = [
  { icon: FileText, value: "120+", label: "Artikel Edukasi" },
  { icon: BookOpen, value: "50+", label: "Materi Keamanan" },
  { icon: Layers, value: "10+", label: "Kategori Ancaman Siber" },
];

// ─── Form dipisah karena useSearchParams wajib dibungkus Suspense ─────────────
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // Tampilkan error dari URL — dikirim oleh /auth/callback saat Google OAuth gagal
  useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError) setError(decodeURIComponent(urlError));
  }, [searchParams]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email atau password salah. Silakan coba lagi.");
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profile?.role === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
    router.refresh();
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    setError("");
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/`,
        // Paksa dialog pilih akun Google muncul setiap kali
        queryParams: { prompt: "select_account" },
      },
    });

    if (error) {
      setError("Gagal login dengan Google. Silakan coba lagi.");
      setGoogleLoading(false);
    }
    // Jika berhasil, browser redirect ke Google — tidak perlu setGoogleLoading(false)
  }

  return (
    <div className="px-8 pt-8 pb-8">
      {/* Title */}
      <div className="mb-7">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Selamat Datang Kembali
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 font-medium">
          Masuk untuk melanjutkan pembelajaran keamanan digital
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50 rounded-2xl px-4 py-3.5 mb-6">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-600 dark:text-red-400 text-sm font-medium leading-snug">
            {error}
          </p>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
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
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/25 focus:border-[#0F52BA] dark:focus:border-blue-400 transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <Link
              href="/lupa-password"
              className="text-xs font-semibold text-[#0F52BA] dark:text-blue-400 hover:underline"
            >
              Lupa password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password Anda"
              required
              autoComplete="current-password"
              className="w-full pl-11 pr-12 py-3.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/25 focus:border-[#0F52BA] dark:focus:border-blue-400 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label={
                showPassword ? "Sembunyikan password" : "Tampilkan password"
              }
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setRememberMe(!rememberMe)}
            className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0 ${
              rememberMe
                ? "bg-[#0F52BA] border-[#0F52BA]"
                : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
            }`}
            aria-label="Ingat saya"
          >
            {rememberMe && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
          <span
            className="text-sm text-slate-600 dark:text-slate-400 font-medium select-none cursor-pointer"
            onClick={() => setRememberMe(!rememberMe)}
          >
            Ingat saya selama 30 hari
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full mt-2 bg-[#0F52BA] hover:bg-[#0A3E8E] active:bg-[#082F6E] disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 dark:disabled:text-slate-500 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-[0_4px_16px_rgba(15,82,186,0.35)] hover:shadow-[0_6px_20px_rgba(15,82,186,0.45)] disabled:shadow-none flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Memproses...</span>
            </>
          ) : (
            <>
              <span>Masuk</span>
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
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {googleLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        )}
        <span>Masuk dengan Google</span>
      </button>

      {/* Footer */}
      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="font-bold text-[#0F52BA] dark:text-blue-400 hover:underline"
        >
          Daftar Sekarang
        </Link>
      </p>
    </div>
  );
}

// ─── Page utama ───────────────────────────────────────────────────────────────
export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950">
      {/* ── LEFT PANEL ───────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative flex-col overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A3880] via-[#0F52BA] to-[#1565C0]" />

        {/* Subtle geometric texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Shield watermark */}
        <div className="absolute bottom-[-60px] right-[-80px] opacity-[0.06]">
          <Shield
            className="w-[480px] h-[480px] text-white"
            strokeWidth={0.5}
          />
        </div>

        {/* Top diagonal accent */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] opacity-10">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full px-12 xl:px-16 py-12">
          {/* Logo */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-lg tracking-tight leading-none block">
                Garda Siber
              </span>
              <span className="text-blue-200/80 text-[10px] font-semibold uppercase tracking-[0.15em] leading-none">
                Keamanan Digital
              </span>
            </div>
          </div>

          {/* Badge */}
          <div className="mt-10">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-sm">
              <CheckCircle className="w-3.5 h-3.5 text-blue-200" />
              Platform Literasi Keamanan Digital Indonesia
            </span>
          </div>

          {/* Headline */}
          <div className="mt-8 flex-1">
            <h1 className="text-4xl xl:text-[2.75rem] font-extrabold text-white leading-[1.15] tracking-tight">
              Keamanan Digital
              <br />
              <span className="text-blue-200">Dimulai Dari</span>
              <br />
              Kesadaran
            </h1>
            <p className="mt-6 text-blue-100/80 text-base leading-relaxed max-w-[380px]">
              Garda Siber membantu masyarakat Indonesia mengenali, mencegah, dan
              menghadapi ancaman kejahatan siber melalui edukasi yang mudah
              dipahami.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4 hover:bg-white/[0.14] transition-colors"
                >
                  <Icon className="w-5 h-5 text-blue-200 mb-2" />
                  <div className="text-2xl font-extrabold text-white leading-none">
                    {value}
                  </div>
                  <div className="text-blue-200/70 text-xs font-medium mt-1 leading-tight">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="text-blue-200/60 text-xs font-medium">
              © 2025 Garda Siber · Pusat Literasi Keamanan Digital Indonesia
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ──────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-12 bg-[#F7F9FC] dark:bg-slate-900">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#0F52BA] rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-base block">
                Garda Siber
              </span>
              <span className="text-slate-500 text-[10px] uppercase tracking-widest">
                Keamanan Digital
              </span>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-[0_8px_48px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_48px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-700/50 overflow-hidden">
            {/* Card header accent */}
            <div className="h-1 bg-gradient-to-r from-[#0F52BA] via-blue-400 to-[#0F52BA]" />

            {/* Suspense wajib karena LoginForm pakai useSearchParams */}
            <Suspense
              fallback={
                <div className="px-8 py-12 flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
                </div>
              }
            >
              <LoginForm />
            </Suspense>
          </div>

          {/* Back link */}
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
