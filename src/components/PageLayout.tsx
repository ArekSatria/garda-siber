import type { ReactNode } from "react";
import PublicHeader from "@/components/PublicHeader";

type Props = {
  children: ReactNode;
};

export default function PageLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[360px] bg-[radial-gradient(circle_at_top,rgba(15,82,186,0.08),transparent_60%)]" />
      <PublicHeader />
      <main className="relative pt-[86px]">{children}</main>
    </div>
  );
}
