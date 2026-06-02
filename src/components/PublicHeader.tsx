"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  ShieldCheck,
  X,
  ArrowRight,
  User,
  LayoutGrid,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Ancaman", href: "/ancaman" },
  { label: "Artikel", href: "/artikel" },
  { label: "Tips", href: "/tips" },
  { label: "Quiz", href: "/quiz" },
  { label: "Tentang", href: "/tentang" },
];

export default function PublicHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // State untuk data sesi & profil
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Pantau Session & Role secara Realtime
  useEffect(() => {
    const supabase = createClient();

    const fetchUserAndProfile = async (sessionUser: any) => {
      if (sessionUser) {
        setUser(sessionUser);
        // Cek Role di Database Profiles
        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", sessionUser.id)
          .single();
        setProfile(data);
      } else {
        setUser(null);
        setProfile(null);
      }
    };

    // Pengecekan awal saat web dimuat
    supabase.auth.getUser().then(({ data }) => {
      fetchUserAndProfile(data.user);
    });

    // Pengecekan saat terjadi perubahan login/logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      fetchUserAndProfile(session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Smart Header Scroll Logic (Hide on scroll down, show on scroll up)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 100 && !mobileOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
            : "bg-transparent py-2"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#1565C0] to-[#0F52BA] text-white shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-blue-500/25">
              <ShieldCheck size={20} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <span className="truncate text-[1.1rem] font-black tracking-tight text-slate-900 transition-colors group-hover:text-[#0F52BA]">
                Garda Siber
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1.5 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "text-[#0F52BA]"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-[#0F52BA] opacity-80" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Conditional Rendering Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {/* Tombol Pintasan Khusus Admin */}
                {profile?.role === "admin" && (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 rounded-[14px] bg-violet-500/10 border border-violet-500/20 px-4 py-2.5 text-sm font-bold text-violet-600 transition-all hover:-translate-y-0.5 hover:bg-violet-500/20 hover:shadow-sm"
                  >
                    <LayoutGrid size={16} /> Admin Panel
                  </Link>
                )}
                <Link
                  href="/profil"
                  className="inline-flex items-center gap-2 rounded-[14px] bg-blue-50 border border-blue-100/50 px-4 py-2.5 text-sm font-bold text-[#0F52BA] transition-all hover:-translate-y-0.5 hover:bg-blue-100 hover:shadow-sm"
                >
                  <User size={16} /> Profil Saya
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/quiz"
                  className="text-sm font-bold text-slate-600 hover:text-[#0F52BA] transition-colors"
                >
                  Cek Pengetahuan
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-[14px] bg-[#0F52BA] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#0B3F8C] hover:shadow-blue-500/30"
                >
                  Masuk <ArrowRight size={16} />
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-[#0F52BA] transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="bg-white/95 backdrop-blur-xl border-t border-slate-100 px-4 py-6 shadow-xl">
            <div className="grid gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-50 text-[#0F52BA]"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-slate-200 my-3" />

              {/* Conditional Rendering Action Buttons (Mobile) */}
              {user ? (
                <>
                  {profile?.role === "admin" && (
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold text-violet-600 bg-violet-50 transition-colors hover:bg-violet-100 mb-2"
                    >
                      <LayoutGrid size={16} /> Dashboard Admin
                    </Link>
                  )}
                  <Link
                    href="/profil"
                    className="flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold text-[#0F52BA] bg-blue-50 transition-colors hover:bg-blue-100"
                  >
                    <User size={16} /> Profil Saya
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold text-white bg-[#0F52BA] transition-colors hover:bg-[#0B3F8C]"
                >
                  Masuk / Daftar <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
