"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useDeferredValue, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { PageIntro } from "@/components/motion";

interface MenuItem {
  id: number;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  price: number | null;
  image: string;
  badge: string | null;
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

export function MenuPageContent({ categories }: Props) {
  const { locale, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const deferredCategory = useDeferredValue(activeCategory);
  const reduceMotion = useReducedMotion();

  const allItems = categories.flatMap((c) =>
    c.items.map((item) => ({ ...item, categoryName: c.nameAr }))
  );

  const visibleItems = allItems.filter(
    (item) => deferredCategory === "all" || item.categoryName === deferredCategory,
  );

  return (
    <main id="main-content" className="inner-page menu-page">
      <PageIntro>
        <section className="page-hero page-hero-menu" aria-labelledby="menu-title">
          <p className="eyebrow">{locale === "ar" ? "على أصوله" : "Made the proper way"}</p>
          <h1 id="menu-title">{locale === "ar" ? "المنيو" : "The menu"}</h1>
          <p>
            {locale === "ar"
              ? "اختار حجمك، زوّد البصل، واضبط الشطة على مزاجك."
              : "Pick your size, add the crunch, and set the heat your way."}
          </p>
          <div className="menu-hero-disc" aria-hidden="true"><span>كشري</span></div>
        </section>
      </PageIntro>

      <section className="menu-content" aria-label="Menu items">
        <div className="menu-filter" role="group" aria-label="Menu categories">
          <button
            type="button"
            className={activeCategory === "all" ? "active" : ""}
            onClick={() => setActiveCategory("all")}
            aria-pressed={activeCategory === "all"}
          >
            {locale === "ar" ? "الكل" : "All"}
          </button>
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              className={activeCategory === cat.nameAr ? "active" : ""}
              onClick={() => setActiveCategory(cat.nameAr)}
              aria-pressed={activeCategory === cat.nameAr}
            >
              {locale === "ar" ? cat.nameAr : cat.nameEn}
            </button>
          ))}
        </div>

        <motion.div layout={!reduceMotion} className="menu-grid">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <motion.article
                layout={!reduceMotion}
                key={item.id}
                className="menu-card"
                initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -18, scale: 0.96 }}
                transition={{ duration: 0.45, delay: index * 0.035 }}
              >
                <div className="menu-card-image">
                  <Image
                    src={item.image}
                    alt={locale === "ar" ? item.nameAr : item.nameEn}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                  {item.badge === "popular" ? (
                    <span className="popular-tag">{locale === "ar" ? "الأكثر طلبًا" : "Crowd favourite"}</span>
                  ) : null}
                </div>
                <div className="menu-card-copy">
                  <div>
                    <h2>{locale === "ar" ? item.nameAr : item.nameEn}</h2>
                    <p>{locale === "ar" ? item.descAr : item.descEn}</p>
                  </div>
                  <strong>{item.price} <small>{locale === "ar" ? "ج.م" : "EGP"}</small></strong>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}
