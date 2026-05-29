"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    // Cek role user
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0A1E3F] to-slate-900 flex items-center justify-center px-4">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-[#0F52BA] rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/50">
              <Shield size={32} className="text-white" />
            </div>
            <div>
              <h1 className="font-black text-white text-2xl tracking-tight">
                Garda Siber
              </h1>
              <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mt-0.5">
                Pusat Literasi Keamanan Digital
              </p>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-black/30 overflow-hidden">
          {/* Header card */}
          <div className="bg-gradient-to-r from-[#0F52BA] to-blue-600 px-8 py-6">
            <h2 className="text-xl font-black text-white">Masuk ke Akun</h2>
            <p className="text-blue-200 text-sm font-medium mt-1">
              Selamat datang kembali di Garda Siber
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-8 space-y-5">
            {/* Error */}
            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
                <AlertCircle size={16} className="text-red-500 shrink-0" />
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Email</label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh@email.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-700">
                  Password
                </label>
                <Link
                  href="/lupa-password"
                  className="text-xs font-bold text-[#0F52BA] hover:underline"
                >
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={loading || !email || !password}
              className="w-full bg-[#0F52BA] hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white py-3.5 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Memproses...
                </>
              ) : (
                "Masuk"
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Belum punya akun?
                </span>
              </div>
            </div>

            {/* Register link */}
            <Link
              href="/register"
              className="w-full flex items-center justify-center py-3.5 rounded-xl border-2 border-slate-200 hover:border-[#0F52BA] hover:bg-blue-50 text-slate-700 hover:text-[#0F52BA] font-black uppercase tracking-widest text-sm transition-all"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>

        {/* Back to home */}
        <p className="text-center mt-6 text-slate-400 text-xs font-medium">
          <Link href="/" className="hover:text-white transition-colors">
            ← Kembali ke Beranda
          </Link>
        </p>
      </div>
    </div>
  );
}