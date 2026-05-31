"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  ShieldAlert,
  FileText,
  Lightbulb,
  Brain,
  Info,
  LogIn,
  LogOut,
  User,
  LayoutGrid,
  Crown,
  Menu,
  X,
} from "lucide-react";
import type { UserProfile } from "@/types";
import { ROUTES } from "@/constants/site";

// ── Konstanta menu di luar komponen — tidak di-recreate setiap render ──
const MENU_ITEMS = [
  { name: "Beranda", icon: LayoutDashboard, path: ROUTES.home },
  { name: "Jenis Ancaman", icon: ShieldAlert, path: ROUTES.threats },
  { name: "Artikel", icon: FileText, path: ROUTES.articles },
  { name: "Tips Aman", icon: Lightbulb, path: ROUTES.tips },
  { name: "Quiz Siber", icon: Brain, path: ROUTES.quiz },
  { name: "Tentang Kami", icon: Info, path: ROUTES.about },
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Tipe kuat — tidak ada any
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [profile, setProfile] = useState<Pick<
    UserProfile,
    "full_name" | "role"
  > | null>(null);
  const [loading, setLoading] = useState(true);

  // ── State mobile sidebar ──
  const [isOpen, setIsOpen] = useState(false);

  // Tutup sidebar ketika route berubah (navigasi mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Kunci scroll body saat overlay terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Tutup dengan tombol Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // ── Auth ──
  const fetchProfile = useCallback(async (userId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", userId)
      .single();
    if (!error && data) setProfile(data);
  }, []);

  useEffect(() => {
    const supabase = createClient();

    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) await fetchProfile(user.id);
      setLoading(false);
    }

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      setUser(session?.user ?? null);
      if (session?.user) await fetchProfile(session.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(ROUTES.home);
    router.refresh();
  }

  const isAdmin = profile?.role === "admin";

  // ── Konten sidebar (dipakai di desktop & mobile) ──
  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          href={ROUTES.home}
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <div className="w-10 h-10 bg-[#0F52BA] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
            <ShieldAlert className="text-white" size={22} aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-black text-slate-900 text-lg leading-none">
              GARDA
            </h1>
            <p className="text-[#0F52BA] font-black tracking-widest uppercase text-xs">
              SIBER
            </p>
          </div>
        </Link>

        {/* Tombol tutup — hanya di mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          aria-label="Tutup menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Menu utama */}
      <nav className="flex-1 space-y-1" aria-label="Menu utama">
        {MENU_ITEMS.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path !== "/" && pathname.startsWith(item.path));

          return (
            <Link
              key={item.name}
              href={item.path}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${
                isActive
                  ? "bg-[#0F52BA] text-white shadow-lg shadow-blue-500/20 scale-[1.02]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-[#0F52BA]"
              }`}
            >
              <item.icon size={19} aria-hidden="true" />
              <span>{item.name}</span>
              {item.name === "Quiz Siber" && !isActive && (
                <span className="ml-auto bg-[#0F52BA] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Baru
                </span>
              )}
            </Link>
          );
        })}

        {/* Menu Admin */}
        {!loading && isAdmin && (
          <>
            <div className="pt-2 pb-1 px-4">
              <div className="border-t border-slate-100" />
            </div>
            <Link
              href={ROUTES.dashboard}
              aria-current={
                pathname.startsWith(ROUTES.dashboard) ? "page" : undefined
              }
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${
                pathname.startsWith(ROUTES.dashboard)
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20 scale-[1.02]"
                  : "text-violet-600 hover:bg-violet-50 border border-violet-200"
              }`}
            >
              <LayoutGrid size={19} aria-hidden="true" />
              <span>Dashboard Admin</span>
              <Crown
                size={13}
                className="ml-auto opacity-70"
                aria-hidden="true"
              />
            </Link>
          </>
        )}
      </nav>

      {/* User section */}
      <div className="border-t border-slate-100 pt-4 mt-4">
        {loading ? (
          <div
            className="space-y-2"
            aria-busy="true"
            aria-label="Memuat data pengguna"
          >
            <div className="h-12 bg-slate-50 rounded-2xl animate-pulse" />
            <div className="h-10 bg-slate-50 rounded-2xl animate-pulse" />
          </div>
        ) : user ? (
          <div className="space-y-2">
            <Link
              href={ROUTES.profile}
              className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-slate-50 transition-all group"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isAdmin ? "bg-violet-600" : "bg-[#0F52BA]"
                }`}
              >
                {isAdmin ? (
                  <Crown size={15} className="text-white" aria-hidden="true" />
                ) : (
                  <User size={16} className="text-white" aria-hidden="true" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 text-xs truncate">
                  {profile?.full_name ?? "Pengguna"}
                </p>
                <p
                  className={`text-[10px] font-bold truncate ${isAdmin ? "text-violet-500" : "text-slate-400"}`}
                >
                  {isAdmin ? "⚡ Administrator" : "Member"}
                </p>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm"
            >
              <LogOut size={16} aria-hidden="true" />
              <span>Keluar</span>
            </button>
          </div>
        ) : (
          <Link
            href={ROUTES.login}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0F52BA] text-white font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            <LogIn size={18} aria-hidden="true" />
            <span>Masuk / Daftar</span>
          </Link>
        )}
      </div>
    </>
  );

  return (
    <>
      {/*
       * ── HAMBURGER BUTTON (mobile only) ──
       * Posisi fixed, muncul di kiri atas layar mobile.
       * Di desktop (lg:) tersembunyi karena sidebar selalu visible.
       */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white border border-slate-200 rounded-xl shadow-md text-slate-600 hover:bg-slate-50 transition-colors"
        aria-label="Buka menu navigasi"
        aria-expanded={isOpen}
        aria-controls="mobile-sidebar"
      >
        <Menu size={22} />
      </button>

      {/*
       * ── OVERLAY (mobile only) ──
       * Gelap di belakang sidebar saat terbuka.
       * Klik overlay = tutup sidebar.
       */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/*
       * ── SIDEBAR DESKTOP ──
       * Selalu visible di lg ke atas. Tersembunyi di bawah lg.
       */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 p-6 z-50 flex-col"
        aria-label="Navigasi situs"
      >
        <SidebarContent />
      </aside>

      {/*
       * ── SIDEBAR MOBILE ──
       * Drawer dari kiri, animasi slide-in/out.
       * Menggunakan translate-x agar performant (GPU-accelerated).
       */}
      <aside
        id="mobile-sidebar"
        className={`lg:hidden fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-100 p-6 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navigasi situs mobile"
        aria-hidden={!isOpen}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
