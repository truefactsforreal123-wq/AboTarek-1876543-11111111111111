"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "./language-provider";
import { type MenuCategory, type LocalizedText } from "@/lib/data";

const localize = (language: string, value: LocalizedText) => value[language as keyof LocalizedText];

export function MenuGrid({ categories }: { categories: MenuCategory[] }) {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const reduceMotion = useReducedMotion();

  const allItems = categories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, categoryId: cat.id }))
  );
  const visibleItems = activeCategory === "all"
    ? allItems
    : allItems.filter((item) => item.categoryId === activeCategory);

  return (
    <>
      <div className="menu-filter" role="group" aria-label="Menu categories">
        <button
          type="button"
          className={activeCategory === "all" ? "active" : ""}
          onClick={() => setActiveCategory("all")}
          aria-pressed={activeCategory === "all"}
        >
          {language === "ar" ? "الكل" : "All"}
        </button>
        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            className={activeCategory === category.id ? "active" : ""}
            onClick={() => setActiveCategory(category.id)}
            aria-pressed={activeCategory === category.id}
          >
            {localize(language, category.label)}
          </button>
        ))}
      </div>

      <motion.div layout={!reduceMotion} className="menu-grid">
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item, index) => (
            <motion.article
              layout={!reduceMotion}
              key={localize(language, item.name)}
              className="menu-card"
              initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -18, scale: 0.96 }}
              transition={{ duration: 0.45, delay: index * 0.035 }}
            >
              <div className="menu-card-image">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={localize(language, item.name)}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                )}
                {item.badge === "popular" ? (
                  <span className="popular-tag">{language === "ar" ? "الأكثر طلبًا" : "Crowd favourite"}</span>
                ) : null}
              </div>
              <div className="menu-card-copy">
                <div>
                  <h2>{localize(language, item.name)}</h2>
                  <p>{localize(language, item.description)}</p>
                </div>
                {item.price && <strong>{item.price} <small>{language === "ar" ? "ج.م" : "EGP"}</small></strong>}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
