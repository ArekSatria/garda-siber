"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShieldAlert,
  Lightbulb,
  Info,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Beranda", icon: LayoutDashboard, path: "/" },
    { name: "Jenis ancaman", icon: ShieldAlert, path: "/ancaman" },
    { name: "Tips aman", icon: Lightbulb, path: "/tips" },
    { name: "Tentang kami", icon: Info, path: "/tentang" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 p-8 z-50 flex flex-col">
      <div className="mb-12">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
            <ShieldAlert className="text-white" size={24} />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-lg leading-none">
              GARDA
              <p className="text-primary font-extrabold tracking-widest uppercase">
                SIBER
              </p>
            </h1>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.path || pathname.startsWith(`${item.path}/`);
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-primary"
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
