"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  RefreshCw,
  Printer,
  Trash2,
  QrCode,
  Copy,
  Check,
  X,
  Store,
} from "lucide-react";
import QRCode from "qrcode";
import Image from "next/image";
import { createTable, toggleTableActive, deleteTable, regenerateTableToken } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { DownloadTableQRPDF } from "@/components/download-table-qr-pdf";
import { DownloadAllQRPDF } from "@/components/download-all-qr-pdf";

interface Table {
  id: string;
  branchId: number;
  tableNumber: number;
  qrToken: string;
  isActive: boolean;
  branch: { nameAr: string; nameEn: string };
}

interface Branch {
  id: number;
  nameAr: string;
  nameEn: string;
}

interface Props {
  tables: Table[];
  branches: Branch[];
}

export function TablesContent({ tables: initialTables, branches }: Props) {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [branchFilter, setBranchFilter] = useState<number | "all">("all");
  const [qrModal, setQrModal] = useState<Table | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [actingId, setActingId] = useState<string | null>(null);
  const [qrMap, setQrMap] = useState<Record<string, string>>({});

  const filtered =
    branchFilter === "all" ? tables : tables.filter((t) => t.branchId === branchFilter);

  const branchName = (id: number) =>
    branches.find((b) => b.id === id)?.nameAr ?? "—";

  const regenerate = async (id: string) => {
    if (!confirm("إعادة توليد الرمز ستبطل الرمز القديم. متأكد؟")) return;
    setActingId(id);
    try {
      const updated = await regenerateTableToken(id);
      setTables((prev) => prev.map((t) => (t.id === id ? { ...t, qrToken: updated.qrToken } : t)));
    } catch (err) {
      console.error("Failed to regenerate token:", err);
      alert("فشل في إعادة التوليد. حاول مرة أخرى.");
    } finally {
      setActingId(null);
    }
  };

  const toggleActive = async (id: string) => {
    setActingId(id);
    try {
      await toggleTableActive(id);
      setTables((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t))
      );
    } catch (err) {
      console.error("Failed to toggle table:", err);
      alert("فشل في تغيير الحالة. حاول مرة أخرى.");
    } finally {
      setActingId(null);
    }
  };

  const removeTable = async (id: string) => {
    if (!confirm("حذف الطاولة؟ سيتم إخفاؤها مع الحفاظ على الطلبات السابقة.")) return;
    setActingId(id);
    try {
      await deleteTable(id);
      setTables((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to delete table:", err);
      alert("فشل في الحذف. حاول مرة أخرى.");
    } finally {
      setActingId(null);
    }
  };

  const copyToken = (token: string) => {
    navigator.clipboard?.writeText(token);
    setCopied(token);
    setTimeout(() => setCopied(null), 1500);
  };

  const qrUrl = (t: Table) =>
    `${typeof window !== "undefined" ? window.location.origin : ""}/table/${t.tableNumber}?token=${t.qrToken}`;

  useEffect(() => {
    if (qrModal) {
      QRCode.toDataURL(qrUrl(qrModal), {
        width: 200,
        margin: 2,
        color: { dark: "#0F1B2D", light: "#FBF5EC" },
      }).then(setQrDataUrl);
    }
  }, [qrModal]);

  useEffect(() => {
    const generateQRCodes = async () => {
      const newMap: Record<string, string> = {};
      await Promise.all(
        filtered.map(async (t) => {
          if (!qrMap[t.id]) {
            newMap[t.id] = await QRCode.toDataURL(qrUrl(t), {
              width: 80,
              margin: 1,
              color: { dark: "#0F1B2D", light: "#FBF5EC" },
            });
          }
        })
      );
      if (Object.keys(newMap).length > 0) {
        setQrMap((prev) => ({ ...prev, ...newMap }));
      }
    };
    generateQRCodes();
  }, [filtered, qrMap]);

  return (
    <div className="space-y-6" dir="rtl">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-tomato-600">
            الطاولات
          </div>
          <h1 className="mt-2 text-3xl font-extrabold text-ink-900">الطاولات و QR</h1>
          <p className="mt-1 text-sm text-ink-700/60">
            كل طاولة ليها QR خاص برمز سري. امسح أو طبع QR للطاولات.
          </p>
        </div>
        <div className="flex gap-2">
          <DownloadAllQRPDF
            tables={filtered.map((t) => ({
              tableNumber: t.tableNumber,
              qrToken: t.qrToken,
              branchNameEn: t.branch.nameEn,
            }))}
            branchName={filtered.length > 0 ? filtered[0].branch.nameEn : "all"}
          />
          <button
            onClick={() => window.print()}
            className="btn-ghost text-sm"
          >
            <Printer className="h-4 w-4" />
            طباعة الكل
          </button>
          <button onClick={() => setAddOpen(true)} className="btn-primary text-sm">
            <Plus className="h-4 w-4" />
            طاولة جديدة
          </button>
        </div>
      </div>

      {/* branch filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setBranchFilter("all")}
          className={`rounded-md px-3 py-2 text-xs font-bold transition-colors ${
            branchFilter === "all"
              ? "bg-ink-900 text-paper"
              : "bg-paper text-ink-700/70 hover:bg-ink-900/10"
          }`}
        >
          كل الفروع ({tables.length})
        </button>
        {branches.map((b) => {
          const count = tables.filter((t) => t.branchId === b.id).length;
          return (
            <button
              key={b.id}
              onClick={() => setBranchFilter(b.id)}
              className={`rounded-md px-3 py-2 text-xs font-bold transition-colors ${
                branchFilter === b.id
                  ? "bg-ink-900 text-paper"
                  : "bg-paper text-ink-700/70 hover:bg-ink-900/10"
              }`}
            >
              {b.nameAr} ({count})
            </button>
          );
        })}
      </div>

      {/* tables grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((t, i) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            className={`rounded-lg border bg-paper p-5 transition-all hover:shadow-lg hover:shadow-ink-900/5 ${
              t.isActive ? "border-ink-900/10" : "border-ink-900/5 opacity-60"
            }`}
          >
            {/* head */}
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-ink-700/40">
                  {branchName(t.branchId)}
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold tabular-nums text-ink-900">
                    طاولة {t.tableNumber}
                  </span>
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[0.6rem] font-bold ${
                  t.isActive ? "bg-cobalt-50 text-cobalt-700" : "bg-ink-900/10 text-ink-700/50"
                }`}
              >
                {t.isActive ? "نشطة" : "متوقفة"}
              </span>
            </div>

            {/* mini QR */}
            <div className="mt-4 flex items-center gap-4">
              <div className="rounded-md border border-ink-900/10 bg-paper-warm/40 p-2">
                {qrMap[t.id] ? (
                  <Image src={qrMap[t.id]} alt={`QR - Table ${t.tableNumber}`} width={64} height={64} unoptimized className="h-16 w-16" />
                ) : (
                  <div className="h-16 w-16 animate-pulse bg-paper-warm" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-ink-700/50">رمز QR</div>
                <button
                  onClick={() => copyToken(t.qrToken)}
                  className="mt-1 flex items-center gap-1.5 font-mono text-[0.7rem] text-ink-700/70 transition-colors hover:text-tomato-600"
                  dir="ltr"
                >
                  {t.qrToken.slice(0, 8)}...
                  {copied === t.qrToken ? (
                    <Check className="h-3 w-3 text-cobalt-600" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>

            {/* actions */}
            <div className="mt-4 flex flex-wrap gap-1 border-t border-ink-900/8 pt-3">
              <DownloadTableQRPDF
                tableNumber={t.tableNumber}
                qrToken={t.qrToken}
                branchNameEn={t.branch.nameEn}
                branchNameAr={t.branch.nameAr}
              />
              <button
                onClick={() => setQrModal(t)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-bold text-cobalt-700 transition-colors hover:bg-cobalt-50"
              >
                <QrCode className="h-3.5 w-3.5" />
                QR
              </button>
              <button
                 onClick={() => regenerate(t.id)}
                 disabled={actingId === t.id}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-bold text-saffron-700 transition-colors hover:bg-saffron-50 disabled:opacity-40"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${actingId === t.id ? "animate-spin" : ""}`} />
                رمز جديد
              </button>
              <button
                onClick={() => toggleActive(t.id)}
                disabled={actingId === t.id}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-bold text-ink-700/60 transition-colors hover:bg-ink-900/5 disabled:opacity-40"
              >
                {t.isActive ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                {t.isActive ? "إيقاف" : "تفعيل"}
              </button>
              <button
                onClick={() => removeTable(t.id)}
                disabled={actingId === t.id}
                className="flex items-center justify-center rounded-md px-3 py-2 text-tomato-600 transition-colors hover:bg-tomato-50 disabled:opacity-40"
                aria-label="حذف"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* QR modal */}
      <AnimatePresence>
        {qrModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink-950/60"
              onClick={() => setQrModal(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-1/2 z-50 -translate-y-1/2 rounded-lg bg-paper p-8 text-center shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-sm sm:-translate-x-1/2"
            >
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-tomato-600">
                {branchName(qrModal.branchId)}
              </div>
              <h2 className="mt-2 text-2xl font-extrabold text-ink-900">
                طاولة {qrModal.tableNumber}
              </h2>
              <div className="mt-6 inline-block rounded-lg border-2 border-ink-900 bg-paper p-4">
                {qrDataUrl ? (
                  <Image src={qrDataUrl} alt={`QR Code - Table ${qrModal.tableNumber}`} width={200} height={200} unoptimized />
                ) : (
                  <div className="h-[200px] w-[200px] animate-pulse bg-paper-warm" />
                )}
              </div>
              <p className="mt-5 text-xs text-ink-700/50" dir="ltr">
                {qrUrl(qrModal)}
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="btn-primary flex-1 text-sm"
                >
                  <Printer className="h-4 w-4" />
                  طباعة
                </button>
                <button
                  onClick={() => setQrModal(null)}
                  className="btn-ghost flex-1 text-sm"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* add modal */}
      <AnimatePresence>
        {addOpen && (
          <AddTableModal
            onClose={() => setAddOpen(false)}
            branches={branches}
            existing={tables}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function AddTableModal({
  onClose,
  branches,
  existing,
}: {
  onClose: () => void;
  branches: Branch[];
  existing: Table[];
}) {
  const router = useRouter();
  const [branchId, setBranchId] = useState(branches[0]?.id ?? 1);
  const branchTables = existing.filter((t) => t.branchId === branchId);
  const nextNum = branchTables.length
    ? Math.max(...branchTables.map((t) => t.tableNumber)) + 1
    : 1;
  const [number, setNumber] = useState(nextNum);
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createTable(branchId, number);
      router.refresh();
      onClose();
    } catch (err) {
      console.error("Failed to create table:", err);
      alert("فشل في إضافة الطاولة. حاول مرة أخرى.");
    } finally {
      setSaving(false);
    }
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
        transition={{ duration: 0.25 }}
        className="fixed inset-x-4 top-1/2 z-50 -translate-y-1/2 rounded-lg bg-paper shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2"
        dir="rtl"
      >
        <div className="flex items-center justify-between border-b border-ink-900/10 px-6 py-4">
          <h2 className="text-lg font-extrabold text-ink-900">طاولة جديدة</h2>
          <button onClick={onClose} className="rounded-md p-1.5 text-ink-700/40 hover:bg-ink-900/5">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={submit} className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700/60">
              الفرع
            </label>
            <select
              value={branchId}
              onChange={(e) => {
                const nb = Number(e.target.value);
                setBranchId(nb);
                const bt = existing.filter((t) => t.branchId === nb);
                setNumber(bt.length ? Math.max(...bt.map((t) => t.tableNumber)) + 1 : 1);
              }}
              className="w-full rounded-md border border-ink-900/15 bg-paper py-2.5 px-3 text-sm outline-none focus:border-cobalt-500"
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nameAr}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700/60">
              رقم الطاولة
            </label>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(Number(e.target.value))}
              min={1}
              required
              className="w-full rounded-md border border-ink-900/15 bg-paper py-2.5 px-3 text-sm outline-none focus:border-cobalt-500"
              dir="ltr"
            />
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-700/40">
              <Store className="h-3 w-3" />
              سيُولّد رمز QR تلقائياً عند الحفظ.
            </p>
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={onClose} className="btn-ghost text-sm">
              إلغاء
            </button>
            <button type="submit" disabled={saving} className="btn-primary text-sm">
              {saving ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
              ) : (
                <><Plus className="h-4 w-4" /> إضافة الطاولة</>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </>
  );
}
