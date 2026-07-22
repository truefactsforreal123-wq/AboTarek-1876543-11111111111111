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
    { label: "عناصر المنيو", value: stats.items, icon: UtensilsCrossed, to: "/admin/menu", tint: "tomato" },
    { label: "الطاولات", value: stats.tables ?? stats.branches * 5, icon: QrCode, to: "/admin/tables", tint: "cobalt" },
    { label: "الفروع", value: stats.branches, icon: Store, to: "/admin/branches", tint: "saffron" },
    { label: "التقييمات", value: stats.reviews, icon: TrendingUp, to: "/admin/reviews", tint: "tomato" },
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
    <div className="space-y-8" dir="rtl">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
            لوحة التحكم
          </div>
          <h1 className="mt-2 text-3xl font-extrabold text-admin-text">مرحباً 👋</h1>
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
          >
            <Link
              href={s.to}
              className="group block rounded-lg border border-admin-border bg-admin-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-admin-text/5"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-md ${
                    s.tint === "tomato"
                      ? "bg-red-50 text-red-600"
                      : s.tint === "cobalt"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <ArrowUpLeft className="h-4 w-4 text-admin-text-muted/60 transition-colors group-hover:text-admin-text" />
              </div>
              <div className="mt-4 text-3xl font-extrabold tabular-nums text-admin-text">
                {s.value.toLocaleString("ar-EG")}
              </div>
              <div className="mt-1 text-sm font-semibold text-admin-text-muted">{s.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* recent orders + quick actions */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* recent orders */}
        <div className="lg:col-span-8">
          <div className="rounded-lg border border-admin-border bg-admin-surface">
            <div className="flex items-center justify-between border-b border-admin-border px-6 py-4">
              <h2 className="text-lg font-extrabold text-admin-text">أحدث الطلبات</h2>
              <Link
                href="/admin/orders"
                className="text-xs font-bold text-brand-600 underline underline-offset-4"
              >
                عرض الكل
              </Link>
            </div>
            <div className="divide-y divide-admin-border/60">
              {recentOrders.length === 0 ? (
                <div className="py-16 text-center text-sm text-admin-text-muted/60">
                  لا توجد طلبات بعد.
                </div>
              ) : (
                recentOrders.map((o, i) => {
                  const st = statusMap[o.status] || statusMap.submitted;
                  return (
                    <motion.div
                      key={o.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      className="flex items-center gap-4 px-6 py-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-admin-text text-sm font-extrabold text-admin-surface tabular-nums">
                        {o.table.tableNumber}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-admin-text">
                          طاولة {o.table.tableNumber} · {o.items.length} أصناف
                        </div>
                        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-admin-text-muted/70">
                          <Clock className="h-3 w-3" />
                          {formatDate(o.createdAt)}
                        </div>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold ${st.cls}`}>
                        {st.label}
                      </span>
                      <span className="w-16 text-left text-sm font-extrabold tabular-nums text-brand-600">
                        {getTotal(o).toLocaleString("ar-EG")} ج
                      </span>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* quick actions */}
        <div className="space-y-4 lg:col-span-4">
          <div className="rounded-lg border border-admin-border bg-admin-surface p-6">
            <h2 className="mb-4 text-lg font-extrabold text-admin-text">إجراءات سريعة</h2>
            <div className="space-y-2">
              {[
                { to: "/admin/menu", label: "إضافة عنصر للمنيو", icon: UtensilsCrossed },
                { to: "/admin/tables", label: "إضافة طاولة + QR", icon: QrCode },
                { to: "/admin/settings", label: "تعديل الإعدادات", icon: Store },
              ].map((a) => (
                <Link
                  key={a.to}
                  href={a.to}
                  className="flex items-center gap-3 rounded-md border border-admin-border bg-admin-input-bg px-4 py-3 text-sm font-bold text-admin-text transition-colors hover:border-brand-400 hover:bg-brand-50/30"
                >
                  <a.icon className="h-4 w-4 text-brand-500" />
                  {a.label}
                  <ArrowUpLeft className="mr-auto h-3.5 w-3.5 text-admin-text-muted/50" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
