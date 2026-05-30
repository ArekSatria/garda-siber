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
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
      {/* Brand */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Shield size={18} className="text-white" />
          </div>
          <div>
            <p className="text-white font-black text-sm leading-none">
              GARDA SIBER
            </p>
            <p className="text-violet-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      {/* Admin badge */}
      <div className="mx-4 mt-4 px-3 py-2.5 bg-violet-500/10 border border-violet-500/20 rounded-xl flex items-center gap-2.5">
        <div className="w-7 h-7 bg-violet-500/20 rounded-lg flex items-center justify-center">
          <AlertTriangle size={13} className="text-violet-400" />
        </div>
        <div className="min-w-0">
          <p className="text-violet-300 text-[10px] font-bold uppercase tracking-wider">
            Administrator
          </p>
          <p className="text-slate-300 text-xs font-semibold truncate">
            {adminName}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest px-3 pb-2">
          Menu Utama
        </p>
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                active
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <item.icon
                size={17}
                className={
                  active
                    ? "text-white"
                    : "text-slate-500 group-hover:text-slate-300"
                }
              />
              <span>{item.label}</span>
              {active && (
                <ChevronRight size={14} className="ml-auto text-violet-300" />
              )}
            </Link>
          );
        })}

        <div className="border-t border-slate-800 my-3" />
        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest px-3 pb-2">
          Lainnya
        </p>

        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all"
        >
          <Shield size={17} className="text-slate-500" />
          <span>Lihat Website</span>
        </Link>

        <Link
          href="/profil"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all"
        >
          <Settings size={17} className="text-slate-500" />
          <span>Pengaturan Profil</span>
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          <LogOut size={17} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}
