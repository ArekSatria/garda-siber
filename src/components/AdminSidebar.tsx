"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Users,
  FileText,
  Brain,
  Shield,
  LogOut,
  ChevronRight,
  Settings,
  BarChart3,
  AlertTriangle,
} from "lucide-react";

interface Props {
  adminName: string;
}

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard", exact: true },
  { label: "Manajemen User", icon: Users, href: "/dashboard/users" },
  { label: "Artikel & Konten", icon: FileText, href: "/dashboard/artikel" },
  { label: "Hasil Quiz", icon: Brain, href: "/dashboard/quiz" },
  { label: "Statistik", icon: BarChart3, href: "/dashboard/statistik" },
];

export default function AdminSidebar({ adminName }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside className="w-72 h-screen bg-[#050A15] border-r border-white/5 flex flex-col shrink-0 relative overflow-hidden">
      {/* Subtle Glow Background */}
      <div className="absolute top-0 left-0 w-full h-64 bg-violet-600/10 blur-[80px] pointer-events-none" />

      {/* Brand */}
      <div className="p-6 lg:p-8 border-b border-white/5 relative z-10">
        <Link href="/dashboard" className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-black text-base tracking-tight leading-none">
              GARDA SIBER
            </p>
            <p className="text-violet-400 text-[10px] font-extrabold uppercase tracking-[0.2em] mt-1">
              Command Center
            </p>
          </div>
        </Link>
      </div>

      {/* Admin badge */}
      <div className="mx-6 mt-6 px-4 py-3 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-3 relative z-10 backdrop-blur-sm">
        <div className="w-8 h-8 bg-violet-500/20 rounded-xl flex items-center justify-center shadow-inner">
          <AlertTriangle size={14} className="text-violet-400" />
        </div>
        <div className="min-w-0">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
            Administrator
          </p>
          <p className="text-slate-200 text-sm font-bold truncate">
            {adminName}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto relative z-10 custom-scrollbar">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.15em] px-4 pb-3">
          Sistem Utama
        </p>
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 group relative overflow-hidden ${
                active
                  ? "text-white bg-violet-500/10 border border-violet-500/20 shadow-[inset_0_0_20px_rgba(139,92,246,0.05)]"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
              }`}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-violet-500 rounded-r-full shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
              )}
              <item.icon
                size={18}
                className={
                  active
                    ? "text-violet-400"
                    : "text-slate-500 group-hover:text-slate-300 transition-colors"
                }
              />
              <span className="relative z-10">{item.label}</span>
              {active && (
                <ChevronRight
                  size={14}
                  className="ml-auto text-violet-400/50"
                />
              )}
            </Link>
          );
        })}

        <div className="border-t border-white/5 my-6 mx-2" />
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.15em] px-4 pb-3">
          Akses Eksternal
        </p>

        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all border border-transparent"
        >
          <Shield size={18} className="text-slate-500" />
          <span>Lihat Website Publik</span>
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-white/5 relative z-10 bg-gradient-to-t from-[#050A15] to-transparent">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl text-sm font-bold text-red-400 bg-red-500/5 border border-red-500/10 hover:bg-red-500/15 hover:text-red-300 transition-all shadow-sm"
        >
          <LogOut size={16} />
          <span>Akhiri Sesi Admin</span>
        </button>
      </div>
    </aside>
  );
}
