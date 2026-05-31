"use client";

import Sidebar from "@/components/Sidebar";
import ForbiddenBanner from "@/components/ForbiddenBanner";

interface PageLayoutProps {
  children: React.ReactNode;
  /** Tambah class Tailwind pada wrapper konten jika perlu */
  className?: string;
}

export default function PageLayout({
  children,
  className = "",
}: PageLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <ForbiddenBanner />
      <Sidebar />

      <div
        className={`flex-1 lg:ml-64 ml-0 flex flex-col min-w-0 pt-16 lg:pt-0 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
