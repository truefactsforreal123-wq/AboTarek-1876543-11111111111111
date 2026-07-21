import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Sidebar } from "../sidebar";
import { TablesContent } from "./tables-content";

export default async function TablesPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) redirect("/login");

  const [tables, branches] = await Promise.all([
    prisma.restaurantTable.findMany({
      include: { branch: true },
      orderBy: { tableNumber: "asc" },
    }),
    prisma.branch.findMany({
      orderBy: { id: "asc" },
    }),
  ]);

  return (
    <div className="flex min-h-screen bg-ink-950">
      <Sidebar />
      <main className="flex-1 p-4 pt-16 lg:p-10 lg:pt-10">
        <TablesContent
          tables={JSON.parse(JSON.stringify(tables))}
          branches={JSON.parse(JSON.stringify(branches))}
        />
      </main>
    </div>
  );
}
