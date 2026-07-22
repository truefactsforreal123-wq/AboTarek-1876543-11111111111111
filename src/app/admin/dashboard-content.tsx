"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  UtensilsCrossed,
  QrCode,
  Store,
  TrendingUp,
  Clock,
  ArrowUpLeft,
  ClipboardList,
} from "lucide-react";

interface Stats {
  branches: number;
  categories: number;
  items: number;
  reviews: number;
  tables?: number;
}

interface Order {
  id: string;
  status: string;
  createdAt: string;
  table: {
    tableNumber: number;
    branch: { nameAr: string };
  };
  items: { quantity: number; priceAtOrder: number }[];
}

interface Props {
  userEmail: string;
  stats: Stats;
  recentOrders: Order[];
}

const statusMap: Record<string, { label: string; cls: string }> = {
  draft: { label: "مسودة", cls: "bg-gray-100 text-gray-500" },
  submitted: { label: "جديد", cls: "bg-blue-50 text-blue-700" },
  preparing: { label: "تحضير", cls: "bg-amber-50 text-amber-700" },
  ready: { label: "جاهز", cls: "bg-emerald-50 text-emerald-700" },
  served: { label: "اُكل", cls: "bg-emerald-50 text-emerald-600" },
  completed: { label: "مكتمل", cls: "bg-emerald-50 text-emerald-600" },
};

export function DashboardContent({ userEmail, stats, recentOrders }: Props) {
  const statCards = [
    { label: "عناصر المنيو", value: stats.items, icon: UtensilsCrossed, to: "/admin/menu", bg: "bg-red-50", iconColor: "text-red-500" },
    { label: "الطاولات", value: stats.tables ?? stats.branches * 5, icon: QrCode, to: "/admin/tables", bg: "bg-blue-50", iconColor: "text-blue-500" },
    { label: "الفروع", value: stats.branches, icon: Store, to: "/admin/branches", bg: "bg-amber-50", iconColor: "text-amber-600" },
    { label: "التقييمات", value: stats.reviews, icon: TrendingUp, to: "/admin/reviews", bg: "bg-emerald-50", iconColor: "text-emerald-600" },
  ];

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "الآن";
    if (diffMin < 60) return `قبل ${diffMin} دقيقة`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `قبل ${diffHr} ساعة`;
    return d.toLocaleDateString("ar-EG");
  };

  const getTotal = (order: Order) =>
    order.items.reduce((sum, i) => sum + Number(i.priceAtOrder) * i.quantity, 0);

  return (
    <div className="space-y-6" dir="rtl">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-admin-text">مرحباً 👋</h1>
          {userEmail && <p className="mt-1 text-sm text-admin-text-muted" dir="ltr">{userEmail}</p>}
        </div>
        <div className="text-sm text-admin-text-muted">
          {new Date().toLocaleDateString("ar-EG", { weekday: "long", day: "numeric", month: "long" })}
        </div>
      </div>

      {/* stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
          >
            <Link
              href={s.to}
              className="group flex items-center gap-4 rounded-xl border border-admin-border bg-admin-surface p-4 transition-all hover:shadow-md hover:shadow-admin-text/5"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${s.bg}`}>
                <s.icon className={`h-5 w-5 ${s.iconColor}`} />
              </div>
              <div className="min-w-0">
                <div className="text-2xl font-extrabold tabular-nums text-admin-text">
                  {s.value.toLocaleString("ar-EG")}
                </div>
                <div className="text-xs font-semibold text-admin-text-muted">{s.label}</div>
              </div>
              <ArrowUpLeft className="mr-auto h-4 w-4 text-admin-text-muted/40 transition-colors group-hover:text-admin-text" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* recent orders */}
      <div className="rounded-xl border border-admin-border bg-admin-surface">
        <div className="flex items-center justify-between border-b border-admin-border px-5 py-3.5">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-admin-text-muted" />
            <h2 className="text-sm font-extrabold text-admin-text">أحدث الطلبات</h2>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-brand-600 hover:underline"
          >
            عرض الكل
          </Link>
        </div>
        <div className="divide-y divide-admin-border/50">
          {recentOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-admin-surface-hover">
                <ClipboardList className="h-5 w-5 text-admin-text-muted/50" />
              </div>
              <p className="mt-3 text-sm font-semibold text-admin-text-muted">مفيش طلبات لسه</p>
              <p className="mt-1 text-xs text-admin-text-muted/60">الطلبات الجديدة هتظهر هنا</p>
            </div>
          ) : (
            recentOrders.map((o, i) => {
              const st = statusMap[o.status] || statusMap.submitted;
              return (
                <motion.div
                  key={o.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="flex items-center gap-4 px-5 py-3.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-admin-text text-xs font-extrabold text-admin-surface tabular-nums">
                    {o.table.tableNumber}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-admin-text">
                      طاولة {o.table.tableNumber} · {o.items.length} أصناف
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-admin-text-muted">
                      <Clock className="h-3 w-3" />
                      {formatDate(o.createdAt)}
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${st.cls}`}>
                    {st.label}
                  </span>
                  <span className="shrink-0 w-14 text-left text-sm font-extrabold tabular-nums text-brand-600">
                    {getTotal(o).toLocaleString("ar-EG")} ج
                  </span>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
