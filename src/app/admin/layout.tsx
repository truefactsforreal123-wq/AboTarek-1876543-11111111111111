import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { UnseenOrdersProvider } from "./UnseenOrdersProvider";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let soundEnabled = false;
  let tables: { id: string; branch: { nameEn: string } }[] = [];

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) redirect("/login");

    const [soundSetting, fetchedTables] = await Promise.all([
      prisma.systemSetting
        .findUnique({ where: { key: "staff_sound_alerts" }, select: { value: true } })
        .catch(() => null),
      prisma.restaurantTable
        .findMany({ select: { id: true, branch: { select: { nameEn: true } } } })
        .catch(() => []),
    ]);
    soundEnabled =
      soundSetting?.value === true || soundSetting?.value === "true";
    tables = fetchedTables;
  } catch {
    redirect("/login");
  }

  return (
    <UnseenOrdersProvider
      initialSoundEnabled={soundEnabled}
      tableBranches={tables.map((table) => ({
        tableId: table.id,
        branchName: table.branch.nameEn,
      }))}
    >
      {children}
    </UnseenOrdersProvider>
  );
}
