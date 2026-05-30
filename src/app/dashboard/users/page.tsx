import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import UserManagementClient from "./UserManagementClient";

export const metadata: Metadata = { title: "Manajemen User" };

export default async function UsersPage() {
  const supabase = await createClient();

  const { data: users } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, created_at")
    .order("created_at", { ascending: false });

  return <UserManagementClient users={users ?? []} />;
}
