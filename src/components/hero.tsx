"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, Flame, Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useLanguage } from "@/components/language-provider";
import { Counter } from "@/components/site-primitives";
import { copy } from "@/lib/copy";
import { siteConfig } from "@/lib/data";
import { logo } from "@/lib/assets";

const embers = Array.from({ length: 26 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  size: 2 + ((index * 7) % 5),
  delay: `-${((index * 0.73) % 8).toFixed(2)}s`,
  duration: `${7 + (index % 6)}s`,
  sway: `${-42 + ((index * 19) % 84)}px`,
}));

export function Hero({ stats }: { stats?: { branches: number; followers: number; recommendPercent: number; reviewCount: number } | null }) {
  const { language } = useLanguage();
  const c = copy[language];
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const s = stats ?? siteConfig.stats;

  return (
    <section ref={heroRef} id="home" className="relative flex min-h-[760px] items-end overflow-hidden pt-24 sm:min-h-[92svh] sm:pt-28" data-scene="hero">
      <motion.div className="absolute inset-0" style={reducedMotion ? undefined : { y: imageY, scale: imageScale }} data-depth="0" aria-hidden="true">
        <Image src={siteConfig.images.hero} alt="" fill priority sizes="100vw" className="object-cover object-center" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,7,7,0.35)_0%,rgba(14,7,7,0.68)_45%,#0e0707_100%)]" data-depth="1" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_26%,rgba(232,156,28,0.18),transparent_30%),radial-gradient(circle_at_22%_52%,rgba(193,39,45,0.35),transparent_36%)]" data-depth="1" aria-hidden="true" />
      <div className="absolute inset-0" data-depth="5" aria-hidden="true">
        {embers.map((ember, index) => <span key={index} className="ember" style={{ left: ember.left, width: ember.size, height: ember.size, animationDelay: ember.delay, animationDuration: ember.duration, "--sway": ember.sway } as React.CSSProperties} />)}
      </div>

      <div className="container-x relative z-10 grid items-end gap-10 pb-8 sm:pb-14 md:grid-cols-[1fr_330px] md:pb-16 lg:grid-cols-[1fr_410px]" data-depth="4">
        <div className="max-w-3xl text-start">
          <motion.p initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.65 }} className="mb-4 inline-flex items-center gap-2 border-s-2 border-gold-400 ps-3 text-sm font-extrabold text-gold-200"><Flame size={17} fill="currentColor" /> {c.heroEyebrow}</motion.p>
          <motion.h1 className="hero-title text-cream" initial="hidden" animate="shown" variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.14, delayChildren: 0.32 } } }}>
            {[c.heroTitleA, c.heroTitleB].map((word, index) => (
              <motion.span key={word} className={`block ${index === 1 ? "gold-text" : ""}`} variants={{ hidden: { opacity: 0, y: 52 }, shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}>{word}</motion.span>
            ))}
          </motion.h1>
          <motion.p initial={reducedMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.7 }} className="mt-6 max-w-2xl text-base leading-8 text-cream/78 sm:text-lg">{c.heroText}</motion.p>
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.86, duration: 0.65 }} className="mt-7 flex flex-wrap gap-3">
            <a href="/menu" className="brand-button max-sm:w-full">{c.menuCta}{language === "ar" ? <ArrowLeft size={19} /> : <ArrowRight size={19} />}</a>
            <a href="/reviews" className="outline-button max-sm:w-full"><Star size={18} /> {c.callCta}</a>
          </motion.div>
          <motion.div initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: 0.8 }} className="mt-9 grid max-w-3xl grid-cols-2 border-y border-white/12 sm:grid-cols-4">
            {[
              [s.branches, ""],
              [Math.round(s.followers / 1000), "K+"],
              [s.recommendPercent, "%"],
              [s.reviewCount, ""],
            ].map(([value, suffix], index) => (
              <div key={c.stats[index]} className="border-white/10 px-3 py-4 text-start sm:border-s sm:first:border-s-0">
                <strong className="block text-2xl font-black text-gold-300"><Counter value={Number(value)} suffix={String(suffix)} /></strong>
                <span className="mt-1 block text-xs font-semibold text-cream/55">{c.stats[index]}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div className="relative hidden justify-self-end md:block" initial={reducedMotion ? false : { opacity: 0, scale: 0.68, rotate: -16 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.48, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} data-depth="3">
          <div className="spin-slow absolute -inset-7 rounded-full border border-dashed border-gold-300/35" aria-hidden="true" />
          <div className="absolute -inset-10 rounded-full bg-brand-600/24 blur-3xl" aria-hidden="true" />
          <Image src={logo} alt={c.loading} width={390} height={390} priority className="logo-float relative h-[310px] w-[310px] rounded-full object-cover shadow-gold-glow lg:h-[390px] lg:w-[390px]" />
        </motion.div>
      </div>
      <a href="#story" className="absolute bottom-5 start-1/2 z-20 hidden -translate-x-1/2 text-cream/45 md:block" aria-label={language === "ar" ? "انزل للمحتوى" : "Scroll to content"}><ChevronDown className="animate-bounce" size={25} /></a>
    </section>
  );
}

export function Marquee() {
  const { language } = useLanguage();
  const items = language === "ar"
    ? ["كشري كلاسيك", "كشري باللحمة", "كشري بالكفتة", "كشري بالفراخ", "ساندوتش كشري", "أم علي", "حمص", "ليمونادة"]
    : ["Classic Koshari", "Meat Koshari", "Kofta Koshari", "Chicken Koshari", "Koshari Sandwich", "Om Ali", "Hummus", "Lemonade"];
  return (
    <div id="story" className="overflow-hidden border-y border-brand-700/40 bg-brand-950 py-4" dir="ltr" aria-label={language === "ar" ? "أصناف مشهورة" : "Popular dishes"}>
      <div className="marquee-track flex w-max">
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 items-center gap-7 pe-7" aria-hidden={group === 1 ? "true" : undefined}>
            {items.map((item) => (
              <span key={`${group}-${item}`} className="inline-flex items-center gap-3 whitespace-nowrap text-sm font-black text-gold-200">
                <Flame size={16} fill="currentColor" className="text-brand-400" /> {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
