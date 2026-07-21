"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

type Review = {
  id: number;
  name: string;
  rating: number;
  text: string;
  branch?: { nameAr: string; nameEn: string } | null;
  createdAt: Date;
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={16} className={i < rating ? "fill-gold-400 text-gold-400" : "text-cream/20"} />
      ))}
    </div>
  );
}

export function ReviewsList({ reviews }: { reviews: Review[] | null }) {
  const { language } = useLanguage();
  const reducedMotion = useReducedMotion();

  if (!reviews || reviews.length === 0) {
    return (
      <section className="container-x py-20 text-center">
        <p className="text-sm text-cream/45">{language === "ar" ? "لا توجد تقييمات بعد." : "No reviews yet."}</p>
      </section>
    );
  }

  return (
    <section className="container-x py-16 sm:py-20">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.5 }}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-cream">{review.name}</p>
                {review.branch && (
                  <p className="mt-0.5 text-xs text-cream/40">
                    {language === "ar" ? review.branch.nameAr : review.branch.nameEn}
                  </p>
                )}
              </div>
              <Stars rating={review.rating} />
            </div>
            <p className="mt-4 text-sm leading-7 text-cream/65 break-words">{review.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
