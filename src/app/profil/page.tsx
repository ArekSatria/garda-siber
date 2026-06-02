import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProfilClient from "./ProfilClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil Saya",
  description: "Kelola profil, artikel favorit, dan riwayat quiz Anda.",
};

export default async function ProfilPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Ambil profil dari database
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // 🛡️ AUTO-HEALING (ENTERPRISE GRADE)
  // Jika database lambat / profile belum terbuat, gunakan data sesi Auth Google sebagai fallback
  const safeProfile = profile || {
    id: user.id,
    email: user.email || "",
    full_name:
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      "Pengguna Garda Siber",
    role: "user",
    created_at: user.created_at || new Date().toISOString(),
  };

  // Ambil favorit
  const { data: favorites } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Ambil riwayat quiz
  const { data: quizResults } = await supabase
    .from("quiz_results")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <ProfilClient
      profile={safeProfile}
      favorites={favorites ?? []}
      quizResults={quizResults ?? []}
    />
  );
}
