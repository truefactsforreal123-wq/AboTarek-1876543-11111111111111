"use client";

import { useState } from "react";
import { Star, Send, CheckCircle } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { copy } from "@/lib/copy";

type Branch = { id: number; nameAr: string; nameEn: string } | null;

export function ReviewForm({ branches }: { branches: Branch[] | null }) {
  const { language } = useLanguage();
  const c = copy[language];
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [text, setText] = useState("");
  const [branchId, setBranchId] = useState<number | "">("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !rating || !text.trim()) return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), rating, text: text.trim(), branchId: branchId || undefined }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <section className="container-x py-16 text-center sm:py-20">
        <div className="mx-auto max-w-md rounded-2xl border border-white/8 bg-white/[0.03] p-8">
          <CheckCircle size={48} className="mx-auto text-green-400" />
          <h3 className="mt-4 text-lg font-black text-cream">{c.reviewForm.successTitle}</h3>
          <p className="mt-2 text-sm text-cream/55">{c.reviewForm.successText}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-x py-16 sm:py-20">
      <form onSubmit={handleSubmit} className="mx-auto max-w-lg rounded-2xl border border-white/8 bg-white/[0.03] p-6 sm:p-8">
        <h3 className="text-lg font-black text-cream">{c.reviewForm.title}</h3>
        <p className="mt-1 text-sm text-cream/45">{c.reviewForm.subtitle}</p>

        <div className="mt-6 grid gap-4">
          <div>
            <label htmlFor="review-name" className="mb-1 block text-xs font-bold text-cream/55">{c.reviewForm.nameLabel}</label>
            <input id="review-name" type="text" required maxLength={100} value={name} onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:border-gold-400 focus:outline-none" placeholder={c.reviewForm.namePlaceholder} />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-cream/55">{c.reviewForm.ratingLabel}</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHoveredStar(star)} onMouseLeave={() => setHoveredStar(0)}
                  className="p-0.5 transition-transform hover:scale-110" aria-label={`${star} star${star > 1 ? "s" : ""}`}>
                  <Star size={28} className={(hoveredStar || rating) >= star ? "fill-gold-400 text-gold-400" : "text-cream/20"} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="review-branch" className="mb-1 block text-xs font-bold text-cream/55">{c.reviewForm.branchLabel}</label>
            <select id="review-branch" value={branchId} onChange={(e) => setBranchId(e.target.value ? Number(e.target.value) : "")}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-cream focus:border-gold-400 focus:outline-none">
              <option value="">{c.reviewForm.branchPlaceholder}</option>
              {branches?.filter((b): b is NonNullable<typeof b> => b !== null).map((b) => (
                <option key={b.id} value={b.id}>{language === "ar" ? b.nameAr : b.nameEn}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="review-text" className="mb-1 block text-xs font-bold text-cream/55">{c.reviewForm.textLabel}</label>
            <textarea id="review-text" required maxLength={2000} rows={4} value={text} onChange={(e) => setText(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:border-gold-400 focus:outline-none resize-none" placeholder={c.reviewForm.textPlaceholder} />
          </div>
        </div>

        {status === "error" && <p className="mt-3 text-sm text-red-400">{errorMsg}</p>}

        <button type="submit" disabled={status === "submitting" || !name.trim() || !rating || !text.trim()}
          className="brand-button mt-5 w-full disabled:opacity-40 disabled:cursor-not-allowed">
          <Send size={16} /> {status === "submitting" ? c.reviewForm.submitting : c.reviewForm.submit}
        </button>
      </form>
    </section>
  );
}
