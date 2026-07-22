"use client";

import { createBranch, updateBranch, deleteBranch } from "@/lib/actions";
import { useAdminT } from "@/lib/use-admin-t";
import { Check, Edit3, ExternalLink, MapPin, Phone, Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Prisma } from "@prisma/client";

type Branch = Prisma.BranchGetPayload<Record<string, never>>;

export function BranchesEditor({ branches: initial }: { branches: Branch[] }) {
  const t = useAdminT();
  const router = useRouter();
  const [editing, setEditing] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCreating(true);
    try {
      const fd = new FormData(e.currentTarget);
      await createBranch({
        number: fd.get("number") as string,
        nameAr: fd.get("nameAr") as string,
        nameEn: fd.get("nameEn") as string,
        addressAr: fd.get("addressAr") as string,
        addressEn: fd.get("addressEn") as string,
        phone: fd.get("phone") as string,
        whatsapp: fd.get("whatsapp") as string,
        mapsUrl: fd.get("mapsUrl") as string,
      });
      setShowCreate(false);
      router.refresh();
    } catch (err) {
      console.error("Failed to create branch:", err);
      alert("Failed. Please try again.");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm(t.deleteBranchConfirm)) return;
    try {
      await deleteBranch(id);
      router.refresh();
    } catch (err) {
      console.error("Failed to delete branch:", err);
      alert("Failed. Please try again.");
    }
  }

  return (
    <>
      <div className="mt-4">
        <button onClick={() => setShowCreate(!showCreate)} className="btn-primary text-sm">
          {showCreate ? <><X size={15} /> {t.cancel}</> : <><Plus size={15} /> {t.createBranch}</>}
        </button>
      </div>

      {showCreate && (
        <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50/50 p-6">
          <h3 className="text-sm font-black text-admin-text">{t.createBranch}</h3>
          <form className="mt-4 grid gap-3" onSubmit={handleCreate}>
            <div className="grid grid-cols-2 gap-2">
              <input name="number" required placeholder={t.branchNumber} className="min-h-9 rounded-lg border border-admin-border bg-admin-input-bg px-3 text-sm font-bold text-admin-text placeholder:text-admin-text-muted/60" />
              <input name="mapsUrl" placeholder="Google Maps URL" className="min-h-9 rounded-lg border border-admin-border bg-admin-input-bg px-3 text-sm text-admin-text placeholder:text-admin-text-muted/60" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input name="nameAr" required placeholder={t.nameAr} className="min-h-9 rounded-lg border border-admin-border bg-admin-input-bg px-3 text-sm text-admin-text placeholder:text-admin-text-muted/60" />
              <input name="nameEn" required placeholder={t.nameEn} className="min-h-9 rounded-lg border border-admin-border bg-admin-input-bg px-3 text-sm text-admin-text placeholder:text-admin-text-muted/60" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input name="addressAr" required placeholder={t.addressAr} className="min-h-9 rounded-lg border border-admin-border bg-admin-input-bg px-3 text-sm text-admin-text placeholder:text-admin-text-muted/60" />
              <input name="addressEn" required placeholder={t.addressEn} className="min-h-9 rounded-lg border border-admin-border bg-admin-input-bg px-3 text-sm text-admin-text placeholder:text-admin-text-muted/60" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input name="phone" required placeholder={t.phone} className="min-h-9 rounded-lg border border-admin-border bg-admin-input-bg px-3 text-sm text-admin-text placeholder:text-admin-text-muted/60" />
              <input name="whatsapp" required placeholder={t.whatsapp} className="min-h-9 rounded-lg border border-admin-border bg-admin-input-bg px-3 text-sm text-admin-text placeholder:text-admin-text-muted/60" />
            </div>
            <button type="submit" disabled={creating} className="btn-primary mt-2 w-fit text-sm disabled:opacity-40">
              <Check size={14} /> {creating ? t.creating : t.createBranch}
            </button>
          </form>
        </div>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {initial.map((b) => (
          <div key={b.id} className="rounded-xl border border-admin-border bg-admin-surface p-6">
            {editing === b.id ? (
              <form className="grid gap-3" onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                try {
                  await updateBranch(b.id, {
                    nameAr: fd.get("nameAr") as string,
                    nameEn: fd.get("nameEn") as string,
                    addressAr: fd.get("addressAr") as string,
                    addressEn: fd.get("addressEn") as string,
                    phone: fd.get("phone") as string,
                    whatsapp: fd.get("whatsapp") as string,
                    mapsUrl: fd.get("mapsUrl") as string,
                  });
                  setEditing(null);
                  router.refresh();
                } catch (err) {
                  console.error("Failed to update branch:", err);
                  alert("Failed. Please try again.");
                }
              }}>
                <input name="nameAr" defaultValue={b.nameAr} className="min-h-9 rounded-lg border border-admin-border bg-admin-input-bg px-3 text-sm font-bold text-admin-text" />
                <input name="nameEn" defaultValue={b.nameEn} className="min-h-9 rounded-lg border border-admin-border bg-admin-input-bg px-3 text-sm text-admin-text" />
                <input name="addressAr" defaultValue={b.addressAr} className="min-h-9 rounded-lg border border-admin-border bg-admin-input-bg px-3 text-sm text-admin-text" />
                <input name="addressEn" defaultValue={b.addressEn} className="min-h-9 rounded-lg border border-admin-border bg-admin-input-bg px-3 text-sm text-admin-text" />
                <div className="grid grid-cols-2 gap-2">
                  <input name="phone" defaultValue={b.phone} className="min-h-9 rounded-lg border border-admin-border bg-admin-input-bg px-3 text-sm text-admin-text" />
                  <input name="whatsapp" defaultValue={b.whatsapp} className="min-h-9 rounded-lg border border-admin-border bg-admin-input-bg px-3 text-sm text-admin-text" />
                </div>
                <input name="mapsUrl" defaultValue={b.mapsUrl} className="min-h-9 rounded-lg border border-admin-border bg-admin-input-bg px-3 text-sm text-admin-text" />
                <div className="flex gap-2">
                  <button type="submit" className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-emerald-50 px-4 text-sm font-bold text-emerald-700 border border-emerald-200"><Check size={14} /> {t.save}</button>
                  <button type="button" onClick={() => setEditing(null)} className="inline-flex min-h-9 items-center gap-2 rounded-lg px-4 text-sm font-bold text-admin-text-muted hover:text-admin-text">{t.cancel}</button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-3xl font-black text-brand-200">{b.number}</span>
                    <h2 className="mt-2 text-lg font-black text-admin-text">{b.nameAr}</h2>
                    <p className="text-xs text-admin-text-muted">{b.nameEn}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setEditing(b.id)} className="grid h-8 w-8 place-items-center rounded-lg text-admin-text-muted hover:text-admin-text"><Edit3 size={16} /></button>
                    <button onClick={() => handleDelete(b.id)} className="grid h-8 w-8 place-items-center rounded-lg text-admin-text-muted hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="flex items-start gap-2 text-sm text-admin-text-muted"><MapPin size={15} className="mt-0.5 shrink-0 text-brand-500" /> {b.addressAr}</p>
                  <p className="flex items-center gap-2 text-sm font-bold text-admin-text-muted"><Phone size={15} className="shrink-0 text-brand-500" /> <span dir="ltr">{b.phone}</span></p>
                  <a href={`https://wa.me/${b.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-admin-text-muted hover:text-brand-600"><ExternalLink size={13} /> WhatsApp</a>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
