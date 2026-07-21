"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Flame } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { pageHeaders, type PageHeaderData } from "@/lib/data";

const pages = pageHeaders;

type PageKey = keyof typeof pages;

export function PageHeader({ page }: { page: PageKey }) {
  const { language } = useLanguage();
  const reducedMotion = useReducedMotion();
  const content = pages[page] as PageHeaderData;
  const text = content[language];

  return (
    <header className="relative flex min-h-[430px] items-end overflow-hidden pt-24 sm:min-h-[520px]">
      <motion.div className="absolute inset-0" initial={reducedMotion ? false : { scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true">
        <Image src={content.image} alt="" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/65 to-ink-950/30" aria-hidden="true" />
      <div className="container-x relative z-10 pb-12 text-start sm:pb-16">
        <motion.p initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 border-s-2 border-gold-400 ps-3 text-sm font-extrabold text-gold-200"><Flame size={17} fill="currentColor" /> {text.eyebrow}</motion.p>
        <motion.h1 initial={reducedMotion ? false : { opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.7 }} className="hero-title mt-4 max-w-4xl text-cream">{text.title}</motion.h1>
        <motion.p initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.7 }} className="mt-5 max-w-2xl text-sm leading-7 text-cream/72 sm:text-lg sm:leading-8">{text.text}</motion.p>
      </div>
    </header>
  );
}
