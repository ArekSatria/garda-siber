import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/";

  // Handle error dari Google OAuth
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (error) {
    const message = errorDescription ?? "Login dengan Google gagal.";
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(message)}`,
    );
  }

  if (code) {
    const supabase = await createClient();
    const { data, error: sessionError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (!sessionError && data?.user) {
      const user = data.user;

      // Cek apakah user sudah punya data di tabel 'profiles'
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("id", user.id)
        .single();

      if (!existingProfile) {
        // Pembuatan otomatis untuk pengguna Google baru
        await supabase.from("profiles").insert({
          id: user.id,
          email: user.email,
          full_name:
            user.user_metadata.full_name ||
            user.user_metadata.name ||
            "Pengguna Garda Siber",
          role: "user", // Default selalu user, ubah manual di DB jika butuh admin baru
        });
      } else {
        // SMART ROUTING: Jika dia adalah Admin dan tujuannya adalah beranda,
        // paksa pindah ke Dashboard Admin (Command Center)
        if (existingProfile.role === "admin" && next === "/") {
          next = "/dashboard";
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
