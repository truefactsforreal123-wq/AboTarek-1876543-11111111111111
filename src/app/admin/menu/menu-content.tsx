"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  X,
  Star,
  Flame,
} from "lucide-react";

interface MenuItem {
  id: number;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  price: number | null;
  image: string;
  badge: string | null;
  available: boolean;
  sizes: unknown;
}

interface AdminMenuItem extends MenuItem {
  categoryId: number;
  categoryName: string;
}

interface Category {
  id: number;
  nameAr: string;
  nameEn: string;
  items: MenuItem[];
}

interface Props {
  categories: Category[];
}

export function MenuContent({ categories }: Props) {
  const [items, setItems] = useState<AdminMenuItem[]>(() =>
    categories.flatMap((c) => c.items.map((it) => ({ ...it, categoryId: c.id, categoryName: c.nameAr })))
  );
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<number | "all">("all");
  const [editing, setEditing] = useState<AdminMenuItem | null>(null);
  const [adding, setAdding] = useState(false);

  const cats = categories.map((c) => ({ id: c.id, name: c.nameAr }));

  const filtered = useMemo(() => {
    return items.filter((it) => {
      const matchesCat = cat === "all" || it.categoryId === cat;
      const matchesQuery =
        !query || it.nameAr.includes(query) || it.descAr.includes(query);
      return matchesCat && matchesQuery;
    });
  }, [items, query, cat]);

  const toggleAvail = (id: number) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, available: !it.available } : it
      )
    );
  };

  const removeItem = (id: number) => {
    if (!confirm("متأكد إنك عايز تمسح العنصر ده؟")) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const saveItem = (updated: AdminMenuItem) => {
    setItems((prev) => prev.map((it) => (it.id === updated.id ? updated : it)));
    setEditing(null);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-tomato-600">
            المنيو
          </div>
          <h1 className="mt-2 text-3xl font-extrabold text-ink-900">إدارة المنيو</h1>
        </div>
        <button onClick={() => setAdding(true)} className="btn-primary text-sm">
          <Plus className="h-4 w-4" />
          إضافة عنصر
        </button>
      </div>

      {/* filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-ink-900/10 bg-paper p-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن عنصر..."
            className="w-full rounded-md border border-ink-900/10 bg-paper-warm/30 py-2.5 pr-10 pl-3 text-sm outline-none focus:border-cobalt-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCat("all")}
            className={`rounded-md px-3 py-2 text-xs font-bold transition-colors ${
              cat === "all" ? "bg-ink-900 text-paper" : "bg-paper-warm/50 text-ink-700/70 hover:bg-ink-900/10"
            }`}
          >
            الكل ({items.length})
          </button>
          {cats.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`rounded-md px-3 py-2 text-xs font-bold transition-colors ${
                cat === c.id ? "bg-ink-900 text-paper" : "bg-paper-warm/50 text-ink-700/70 hover:bg-ink-900/10"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* list */}
      <div className="overflow-hidden rounded-lg border border-ink-900/10 bg-paper">
        <div className="hidden grid-cols-12 gap-4 border-b border-ink-900/10 bg-paper-warm/30 px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink-700/50 sm:grid">
          <div className="col-span-5">العنصر</div>
          <div className="col-span-2">التصنيف</div>
          <div className="col-span-2">السعر</div>
          <div className="col-span-1">الحالة</div>
          <div className="col-span-2 text-left">إجراءات</div>
        </div>
        <div className="divide-y divide-ink-900/8">
          {filtered.map((it) => {
            const avail = it.available !== false;
            return (
              <motion.div
                key={it.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 gap-3 px-5 py-4 sm:grid-cols-12 sm:items-center sm:gap-4"
              >
                {/* name + image */}
                <div className="col-span-2 flex items-center gap-3 sm:col-span-5">
                  {it.image ? (
                    <Image
                      src={it.image}
                      alt={it.nameAr}
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0 rounded-md object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-paper-warm text-xs font-bold text-ink-700/30">
                      —
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-extrabold text-ink-900">
                        {it.nameAr}
                      </span>
                      {it.badge === "signature" && (
                        <Star className="h-3.5 w-3.5 shrink-0 text-saffron-500" fill="currentColor" />
                      )}
                      {it.badge === "spicy" && <Flame className="h-3.5 w-3.5 shrink-0 text-tomato-500" />}
                      {it.badge === "popular" && (
                        <span className="rounded bg-tomato-50 px-1.5 py-0.5 text-[0.6rem] font-bold text-tomato-600">
                          طلب كثير
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-ink-700/50">{it.descAr}</p>
                  </div>
                </div>
                {/* category */}
                <div className="col-span-1 text-xs text-ink-700/60 sm:col-span-2">
                  {it.categoryName}
                </div>
                {/* price */}
                <div className="col-span-1 text-sm font-extrabold tabular-nums text-tomato-600 sm:col-span-2">
                  {it.price ? `${it.price} ج` : `${getFirstSizePrice(it.sizes) ?? 0}+`}
                </div>
                {/* status */}
                <div className="col-span-1 sm:col-span-1">
                  <button
                    onClick={() => toggleAvail(it.id)}
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.65rem] font-bold transition-colors ${
                      avail ? "bg-cobalt-50 text-cobalt-700" : "bg-ink-900/10 text-ink-700/50"
                    }`}
                  >
                    {avail ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    {avail ? "متاح" : "مخفي"}
                  </button>
                </div>
                {/* actions */}
                <div className="col-span-2 flex justify-start gap-1 sm:col-span-2 sm:justify-end">
                  <button
                    onClick={() => setEditing(it)}
                    className="rounded-md p-2 text-cobalt-700 transition-colors hover:bg-cobalt-50"
                    aria-label="تعديل"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeItem(it.id)}
                    className="rounded-md p-2 text-tomato-600 transition-colors hover:bg-tomato-50"
                    aria-label="حذف"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-16 text-center text-sm text-ink-700/40">
              لا توجد عناصر مطابقة.
            </div>
          )}
        </div>
      </div>

      {/* edit modal */}
      <AnimatePresence>
        {(editing || adding) && (
          <EditModal
            item={editing}
            categories={cats}
            onClose={() => {
              setEditing(null);
              setAdding(false);
            }}
            onSave={saveItem}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function EditModal({
  item,
  categories,
  onClose,
  onSave,
}: {
  item: AdminMenuItem | null;
  categories: { id: number; name: string }[];
  onClose: () => void;
  onSave: (it: AdminMenuItem) => void;
}) {
  const [nameAr, setNameAr] = useState(item?.nameAr ?? "");
  const [descAr, setDescAr] = useState(item?.descAr ?? "");
  const [price, setPrice] = useState(item?.price?.toString() ?? "");
  const [badge, setBadge] = useState<MenuItem["badge"]>(item?.badge ?? null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: item?.id ?? Date.now(),
      nameAr,
      nameEn: nameAr,
      descAr,
      descEn: descAr,
      price: price ? Number(price) : null,
      badge,
      image: item?.image ?? "",
      available: item?.available ?? true,
      sizes: item?.sizes ?? null,
      categoryId: item?.categoryId ?? categories[0]?.id ?? 0,
      categoryName: item?.categoryName ?? categories[0]?.name ?? "",
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-ink-950/60"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-4 top-1/2 z-50 -translate-y-1/2 rounded-lg bg-paper shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2"
        dir="rtl"
      >
        <div className="flex items-center justify-between border-b border-ink-900/10 px-6 py-4">
          <h2 className="text-lg font-extrabold text-ink-900">
            {item ? "تعديل عنصر" : "إضافة عنصر جديد"}
          </h2>
          <button onClick={onClose} className="rounded-md p-1.5 text-ink-700/40 hover:bg-ink-900/5">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={submit} className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700/60">
              الاسم
            </label>
            <input
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              required
              className="w-full rounded-md border border-ink-900/15 bg-paper py-2.5 px-3 text-sm outline-none focus:border-cobalt-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700/60">
              الوصف
            </label>
            <textarea
              value={descAr}
              onChange={(e) => setDescAr(e.target.value)}
              rows={2}
              className="w-full rounded-md border border-ink-900/15 bg-paper py-2.5 px-3 text-sm outline-none focus:border-cobalt-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700/60">
                السعر (ج)
              </label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                dir="ltr"
                className="w-full rounded-md border border-ink-900/15 bg-paper py-2.5 px-3 text-sm outline-none focus:border-cobalt-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700/60">
                شارة
              </label>
              <select
                value={badge ?? ""}
                onChange={(e) => setBadge((e.target.value || undefined) as MenuItem["badge"])}
                className="w-full rounded-md border border-ink-900/15 bg-paper py-2.5 px-3 text-sm outline-none focus:border-cobalt-500"
              >
                <option value="">بدون</option>
                <option value="popular">الأكثر طلباً</option>
                <option value="signature">مشهور</option>
                <option value="spicy">حار</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={onClose} className="btn-ghost text-sm">
              إلغاء
            </button>
            <button type="submit" className="btn-primary text-sm">
              حفظ
            </button>
          </div>
        </form>
      </motion.div>
    </>
  );
}

function getFirstSizePrice(sizes: unknown): number | null {
  if (!Array.isArray(sizes)) return null;
  const first = sizes[0];
  if (!first || typeof first !== "object" || !("price" in first)) return null;
  return typeof first.price === "number" ? first.price : null;
}
