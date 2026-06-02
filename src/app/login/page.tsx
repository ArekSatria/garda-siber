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
      setError("Email atau password salah. Silakan periksa kembali data Anda.");
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();
    if (profile?.role === "admin") router.push("/dashboard");
    else router.push("/");
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
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) {
      setError("Sistem Google OAuth gagal merespons. Silakan coba lagi.");
      setGoogleLoading(false);
    }
  }

  return (
    <div className="px-8 pt-8 pb-8">
      <div className="mb-7">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Selamat Datang Kembali
        </h2>
        <p className="text-slate-500 text-sm mt-1.5 font-medium">
          Masuk untuk melanjutkan pembelajaran keamanan digital
        </p>
      </div>

      {/* Merah Bahaya Tegas */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-3.5 mb-6 animate-fade-in-up">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm font-bold leading-snug">{error}</p>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">
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
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00a9d8] focus:ring-1 focus:ring-[#00a9d8] transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-bold text-slate-700">Password</label>
            <Link
              href="/lupa-password"
              className="text-xs font-bold text-[#00a9d8] hover:text-[#0d9edf] hover:underline"
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
              className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00a9d8] focus:ring-1 focus:ring-[#00a9d8] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full mt-4 bg-[#00a9d8] hover:bg-[#0d9edf] disabled:bg-slate-200 disabled:text-slate-400 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-[0_4px_16px_rgba(0,169,216,0.3)] hover:shadow-lg disabled:shadow-none flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Memproses...</span>
            </>
          ) : (
            <>
              <span className="text-[15px]">Masuk</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
            atau
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm transition-all shadow-sm"
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
        <span>Lanjutkan dengan Google</span>
      </button>

      <p className="text-center text-sm text-slate-500 mt-6 font-medium">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="font-bold text-[#00a9d8] hover:text-[#0d9edf] hover:underline"
        >
          Daftar Sekarang
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className="hidden lg:flex lg:w-[55%] relative flex-col overflow-hidden">
        {/* Latar Belakang Eksklusif Cyan/Teal */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00a9d8] via-[#0d9edf] to-[#259b9a]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute bottom-[-60px] right-[-80px] opacity-[0.1]">
          <Shield
            className="w-[480px] h-[480px] text-white"
            strokeWidth={0.5}
          />
        </div>

        <div className="relative z-10 flex flex-col h-full px-12 xl:px-16 py-12">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-black text-white text-xl tracking-tight leading-none block">
                Garda Siber
              </span>
              <span className="text-cyan-100 text-[10px] font-bold uppercase tracking-[0.2em]">
                Pusat Edukasi
              </span>
            </div>
          </div>

          <div className="mt-10">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-sm">
              <CheckCircle className="w-4 h-4 text-cyan-200" /> Platform
              Literasi Keamanan Digital Indonesia
            </span>
          </div>

          <div className="mt-8 flex-1">
            <h1 className="text-4xl xl:text-5xl font-black text-white leading-[1.15] tracking-tight">
              Keamanan Digital <br />
              <span className="text-cyan-200">Dimulai Dari</span> <br />
              Kesadaran
            </h1>
            <p className="mt-6 text-cyan-50 text-base leading-relaxed max-w-sm font-medium">
              Garda Siber membantu Anda mengenali, mencegah, dan menghadapi
              ancaman siber melalui materi yang praktis.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all"
                >
                  <Icon className="w-6 h-6 text-cyan-200 mb-2" />
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="text-cyan-100 text-[11px] font-bold mt-1 uppercase tracking-wider">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px]">
          <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-200 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-[#00a9d8] to-[#259b9a]" />
            <Suspense
              fallback={
                <div className="px-8 py-12 flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-[#00a9d8]" />
                </div>
              }
            >
              <LoginForm />
            </Suspense>
          </div>
          <p className="text-center mt-8">
            <Link
              href="/"
              className="text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors"
            >
              ← Kembali ke Beranda
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
