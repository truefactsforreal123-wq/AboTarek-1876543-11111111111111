import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Sidebar } from "../sidebar";
import { MenuContent } from "./menu-content";

export default async function MenuPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) redirect("/login");

  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      items: {
        orderBy: { id: "asc" },
      },
    },
  });

  return (
    <div className="flex min-h-screen bg-ink-950">
      <Sidebar />
      <main className="flex-1 p-4 pt-16 lg:p-10 lg:pt-10">
        <MenuContent categories={JSON.parse(JSON.stringify(categories))} />
      </main>
    </div>
  );
}
