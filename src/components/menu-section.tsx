"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage, type Language } from "@/components/language-provider";
import { SectionHeading } from "@/components/site-primitives";
import { copy } from "@/lib/copy";
import { type MenuCategory } from "@/lib/data";

const localize = (language: Language, value: { ar: string; en: string }) => value[language];

type MenuSize = {
  label: { ar: string; en: string };
  price: number;
};

function getSizes(value: unknown): MenuSize[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const valid = value.every((size) => {
    if (!size || typeof size !== "object") return false;
    const candidate = size as { label?: unknown; price?: unknown };
    if (!candidate.label || typeof candidate.label !== "object") return false;
    const label = candidate.label as { ar?: unknown; en?: unknown };
    return typeof label.ar === "string" && typeof label.en === "string" && typeof candidate.price === "number";
  });

  return valid ? value as MenuSize[] : undefined;
}

type Category = {
  id: number | string;
  nameAr: string;
  nameEn: string;
  image: string;
  items: Array<{
    id?: number;
    nameAr: string;
    nameEn: string;
    descAr: string;
    descEn: string;
    price: number | null;
    sizes: unknown;
    image: string;
    badge: string | null;
    available?: boolean;
  }>;
};

function toMenuCategory(c: Category): MenuCategory {
  return {
    id: String(c.id),
    label: { ar: c.nameAr, en: c.nameEn },
    image: c.image,
    items: c.items.map((i) => ({
      name: { ar: i.nameAr, en: i.nameEn },
      description: { ar: i.descAr, en: i.descEn },
      price: i.price ?? undefined,
      sizes: getSizes(i.sizes),
      badge: (i.badge as "popular" | "spicy") ?? undefined,
      image: i.image,
    })),
  };
}

export function MenuSection({ categories }: { categories?: Category[] | null }) {
  const { language } = useLanguage();
  const c = copy[language];
  const menu = useMemo(() => categories ? categories.map(toMenuCategory) : [], [categories]);
  const [active, setActive] = useState(menu[0].id);
  const category = menu.find((item) => item.id === active) ?? menu[0];
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const tabsRef = useRef<HTMLDivElement>(null);

  function scrollTabs(dir: number) {
    const container = tabsRef.current;
    if (!container) return;
    container.scrollBy({ left: dir * 200, behavior: "smooth" });
  }

  // Auto-scroll active tab into view
  useEffect(() => {
    const btn = tabRefs.current.get(active);
    if (btn) {
      btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [active]);

  // Keyboard arrow navigation
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const idx = menu.findIndex((m) => m.id === active);
      if (idx === -1) return;
      const next = e.key === "ArrowRight" ? idx + 1 : idx - 1;
      if (next >= 0 && next < menu.length) {
        e.preventDefault();
        setActive(menu[next].id);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, menu]);

  function hasImage(url?: string) {
    return url && url.startsWith("http");
  }
  return (
    <section id="menu" className="site-section bg-[#f5ead8] py-16 text-ink-950 sm:py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={c.menuEyebrow} title={c.menuTitle} tone="light" />
        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-7 text-ink-700">{c.menuNote}</p>
        <div className="relative mt-8 sm:mt-10">
          {/* Scroll arrows - desktop only, subtle inline style */}
          <button
            type="button"
            onClick={() => scrollTabs(-1)}
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center text-ink-700/40 hover:text-brand-600 transition-colors sm:flex"
            aria-label="Previous categories"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => scrollTabs(1)}
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center text-ink-700/40 hover:text-brand-600 transition-colors sm:flex"
            aria-label="More categories"
          >
            <ChevronRight size={20} />
          </button>

          <div ref={tabsRef} className="menu-tabs flex gap-1 overflow-x-auto border-b border-ink-950/15 px-1 sm:mx-8 sm:overflow-x-auto" role="tablist" aria-label={c.menuTitle}>
            {menu.map((item) => (
              <button key={item.id} ref={(el) => { if (el) tabRefs.current.set(item.id, el); }} type="button" role="tab" aria-selected={active === item.id} onClick={() => setActive(item.id)} className={`group relative flex min-h-12 shrink-0 items-center gap-2 border-b-2 border-transparent px-3 text-xs font-black transition-all duration-300 sm:px-5 sm:text-sm ${active === item.id ? "bg-brand-500/7 text-brand-600" : "text-ink-700 hover:border-gold-500 hover:text-ink-950"}`}>
                <span className="relative h-6 w-6 overflow-hidden rounded-full">
                  {hasImage(item.image) ? <Image src={item.image!} alt="" fill sizes="24px" className={`object-cover transition-transform duration-300 ${active === item.id ? "scale-110" : "group-hover:scale-110"}`} /> : <span className="grid h-full w-full place-items-center bg-brand-500 text-[10px] font-black text-cream">{localize(language, item.label).charAt(0)}</span>}
                </span>
                {active === item.id && (
                  <motion.span
                    layoutId="category-underline"
                    className="absolute -bottom-[2px] left-0 right-0 h-[3px] rounded-full bg-brand-500"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {localize(language, item.label)}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} role="tabpanel">
            <div className="relative mt-8 overflow-hidden rounded-xl border border-ink-950/10 shadow-sm sm:mt-10">
              <div className="relative aspect-[21/9] w-full sm:aspect-[3/1]">
                {hasImage(category.image) ? (
                  <Image src={category.image!} alt={localize(language, category.label)} fill sizes="(max-width: 768px) 100vw, 80vw" priority className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,#7a171c_0%,#0e0707_60%,#c97e14_100%)]" aria-hidden="true" />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/20 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 start-0 p-4 sm:p-6">
                <h3 className="text-xl font-black text-cream sm:text-2xl">{localize(language, category.label)}</h3>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {category.items.map((item, index) => (
                <motion.article key={localize(language, item.name)} className="group relative overflow-hidden rounded-lg border border-ink-950/10 bg-cream text-start shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-600/45 hover:shadow-gold-glow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.045 }}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    {hasImage(item.image) ? (
                      <Image src={item.image!} alt={localize(language, item.name)} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,#7a171c_0%,#0e0707_50%,#c97e14_100%)]" aria-hidden="true">
                        <span className="absolute inset-0 flex items-center justify-center text-5xl font-black text-cream/10 select-none">{language === "ar" ? item.name.ar.charAt(0) : item.name.en.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-black text-ink-950">{localize(language, item.name)}</h3>
                          {item.badge && <span className={`rounded-md px-2 py-1 text-[10px] font-black ${item.badge === "popular" ? "bg-gold-200 text-ink-950" : "bg-brand-100 text-brand-700"}`}>{item.badge === "popular" ? c.popular : c.spicy}</span>}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-ink-700">{localize(language, item.description)}</p>
                      </div>
                      {item.price && <strong className="shrink-0 text-lg font-black text-brand-600">{item.price}<small className="ms-1 text-xs">{c.currency}</small></strong>}
                    </div>
                    {item.sizes && <div className="mt-5 flex flex-wrap gap-2 border-t border-ink-950/8 pt-4">{item.sizes.map((size) => <span key={localize(language, size.label)} className="rounded-md bg-ink-950 px-3 py-2 text-xs font-bold text-cream">{localize(language, size.label)} <b className="ms-1 text-gold-300">{size.price} {c.currency}</b></span>)}</div>}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
