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
import { ROUTES } from "@/constants/site";

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

  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [profile, setProfile] = useState<{
    full_name: string | null;
    role: "admin" | "user";
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Sync penutupan sidebar di resolusi mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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

    // 🛡️ Ambil data user secara aman saat inisialisasi awal component
    async function initUser() {
      try {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();
        if (currentUser) {
          setUser(currentUser);
          await fetchProfile(currentUser.id);
        }
      } catch (err) {
        console.error("Auth initialization failed", err);
      } finally {
        setLoading(false);
      }
    }

    initUser();

    // 🛡️ STRICT AUTH LISTENER (Anti-Fake Logout saat Navigasi)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      } else if (event === "SIGNED_OUT") {
        // HANYA hapus state jika user benar-benar menekan tombol Keluar (SIGNED_OUT)
        setUser(null);
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    router.push(ROUTES.home);
    router.refresh();
  }

  const isAdmin = profile?.role === "admin";

  const SidebarContent = () => (
    <>
      {/* Brand Group */}
      <div className="mb-8 flex items-center justify-between">
        <Link href={ROUTES.home} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0F52BA] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
            <ShieldAlert className="text-white" size={22} />
          </div>
          <div>
            <h1 className="font-black text-slate-900 text-lg leading-none">
              GARDA
            </h1>
            <p className="text-[#0F52BA] font-black tracking-widest uppercase text-xs mt-0.5">
              SIBER
            </p>
          </div>
        </Link>
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Group */}
      <nav className="flex-1 space-y-1" aria-label="Menu utama">
        {MENU_ITEMS.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path !== "/" && pathname.startsWith(item.path));
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${
                isActive
                  ? "bg-[#0F52BA] text-white shadow-lg shadow-blue-500/20 scale-[1.01]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-[#0F52BA]"
              }`}
            >
              <item.icon size={19} />
              <span>{item.name}</span>
              {item.name === "Quiz Siber" && !isActive && (
                <span className="ml-auto bg-[#0F52BA] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                  Baru
                </span>
              )}
            </Link>
          );
        })}

        {/* Admin Navigation Block */}
        {!loading && isAdmin && (
          <>
            <div className="pt-3 pb-2 px-4">
              <div className="border-t border-slate-100" />
            </div>
            <Link
              href={ROUTES.dashboard}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${
                pathname.startsWith(ROUTES.dashboard)
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20 scale-[1.01]"
                  : "text-violet-600 hover:bg-violet-50 border border-violet-100"
              }`}
            >
              <LayoutGrid size={19} />
              <span>Dashboard Admin</span>
              <Crown size={13} className="ml-auto opacity-70" />
            </Link>
          </>
        )}
      </nav>

      {/* Footer / Account Space */}
      <div className="border-t border-slate-100 pt-4 mt-4">
        {loading ? (
          <div className="h-12 bg-slate-50 rounded-2xl animate-pulse" />
        ) : user ? (
          <div className="space-y-2">
            <Link
              href={ROUTES.profile}
              className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-slate-50 transition-all group"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isAdmin ? "bg-violet-600" : "bg-[#0F52BA]"}`}
              >
                {isAdmin ? (
                  <Crown size={15} className="text-white" />
                ) : (
                  <User size={16} className="text-white" />
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
              <LogOut size={16} />
              <span>Keluar</span>
            </button>
          </div>
        ) : (
          <Link
            href={ROUTES.login}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0F52BA] text-white font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            <LogIn size={18} />
            <span>Masuk / Daftar</span>
          </Link>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Hamburger Trigger for Mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2.5 bg-white border border-slate-200 rounded-xl shadow-md text-slate-600 hover:bg-slate-50"
      >
        <Menu size={22} />
      </button>

      {/* Backdrop Backdrop Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop Sidebar Frame */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 p-6 z-40 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Frame */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-100 p-6 z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
