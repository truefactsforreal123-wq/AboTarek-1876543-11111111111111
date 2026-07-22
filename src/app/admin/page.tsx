import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { Sidebar } from "./sidebar";
import { redirect } from "next/navigation";
import { DashboardContent } from "./dashboard-content";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) redirect("/login");

  const [branchCount, catCount, itemCount, reviewCount, tableCount, orders] =
    await Promise.all([
      prisma.branch.count(),
      prisma.category.count(),
      prisma.menuItem.count(),
      prisma.review.count(),
      prisma.restaurantTable.count(),
      prisma.order.findMany({
        where: { status: { notIn: ["archived", "deleted"] } },
        include: { table: { include: { branch: true } }, items: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

  return (
    <div className="flex min-h-screen bg-admin-bg">
      <Sidebar />
      <main className="flex-1 p-4 pt-16 lg:p-10 lg:pt-10">
        <DashboardContent
          userEmail={user.email ?? ""}
          stats={{ branches: branchCount, categories: catCount, items: itemCount, reviews: reviewCount, tables: tableCount }}
          recentOrders={JSON.parse(JSON.stringify(orders))}
        />
      </main>
    </div>
  );
}
