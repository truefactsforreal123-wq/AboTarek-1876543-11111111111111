"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Award, Clock3, MapPin, Sparkles } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/motion";
import { Preloader } from "@/components/preloader";

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

interface SiteConfig {
  name: { ar: string; en: string };
  contact: { primaryPhone: string; primaryWhatsapp: string };
  stats: {
    branches: number;
    followers: number;
    recommendPercent: number;
    reviewCount: number;
    rating: number;
  };
}

interface Props {
  siteConfig: SiteConfig;
  featuredItems: MenuItem[];
  branchCount: number;
}

export function HomePageContent({ siteConfig, featuredItems, branchCount }: Props) {
  const { locale, t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bowlY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 130]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -55]);
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  const heroImage = featuredItems[0]?.image || "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/koshari/classic.jpg";

  return (
    <>
      <Preloader />
      <main id="main-content">
        <section ref={heroRef} className="home-hero scene" aria-labelledby="hero-title">
          <div className="hero-grid depth-0" data-depth="0" aria-hidden="true" />
          <div className="hero-glow depth-1" data-depth="1" aria-hidden="true" />
          <div className="ingredient ingredient-one depth-2" data-depth="2" aria-hidden="true">عدس</div>
          <div className="ingredient ingredient-two depth-2" data-depth="2" aria-hidden="true">دقة</div>
          <div className="ingredient ingredient-three depth-5" data-depth="5" aria-hidden="true">شطة</div>

          <motion.div className="hero-copy depth-4" data-depth="4" style={{ y: copyY }}>
            <motion.p
              className="eyebrow"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 1.35, duration: 0.6 }}
            >
              {locale === "ar" ? "من قلب القاهرة منذ 1950" : "From the heart of Cairo since 1950"}
            </motion.p>
            <h1 id="hero-title">
              <motion.span
                initial={reduceMotion ? false : { opacity: 0, x: locale === "ar" ? 90 : -90 }}
                animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{ delay: 1.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {locale === "ar" ? "الحكاية" : "The story"}
              </motion.span>
              <motion.span
                className="outline-word"
                initial={reduceMotion ? false : { opacity: 0, x: locale === "ar" ? -90 : 90 }}
                animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{ delay: 1.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {locale === "ar" ? "في طبق" : "in a bowl"}
              </motion.span>
            </h1>
            <motion.p
              className="hero-lede"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 1.72, duration: 0.7 }}
            >
              {locale === "ar"
                ? "أرز، عدس، مكرونة، صلصة ودقة. مكونات بسيطة صنعت أشهر طبق كشري في مصر."
                : "Rice, lentils, pasta, tomato sauce and daqqa. Simple ingredients that made Egypt's most famous koshari."}
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 1.85, duration: 0.7 }}
            >
              <Link href="/menu" className="button button-primary">
                {locale === "ar" ? "شوف المنيو" : "See the menu"} <Arrow aria-hidden="true" />
              </Link>
              <Link href="/branches" className="text-link">
                <MapPin aria-hidden="true" /> {locale === "ar" ? "أقرب فرع" : "Find a branch"}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div className="hero-bowl depth-3 float-loop" data-depth="3" style={{ y: bowlY }}>
            <motion.div
              className="bowl-image-wrap"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.68, rotate: -7 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.25, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={heroImage}
                alt={locale === "ar" ? "طبق كشري أبو طارق" : "A bowl of Abo Tarek koshari"}
                fill
                priority
                sizes="(max-width: 900px) 90vw, 52vw"
              />
            </motion.div>
            <div className="bowl-ring" aria-hidden="true" />
            <span className="bowl-stamp">100%<small>{locale === "ar" ? "مصري" : "EGYPTIAN"}</small></span>
          </motion.div>

          <div className="scroll-cue" aria-hidden="true"><span /> SCROLL</div>
        </section>

        <section className="ticker" aria-label="Abo Tarek highlights">
          <div className="ticker-track">
            {[0, 1].map((group) => (
              <div className="ticker-group" key={group} aria-hidden={group === 1}>
                <span>كشري أصلي</span><i>✦</i><span>CAIRO ICON</span><i>✦</i><span>من 1950</span><i>✦</i><span>ONE BOWL. BIG STORY.</span><i>✦</i>
              </div>
            ))}
          </div>
        </section>

        <section className="recipe-section scene" aria-labelledby="recipe-title">
          <div className="recipe-orbit depth-0" data-depth="0" aria-hidden="true" />
          <Reveal className="section-heading depth-4">
            <p className="eyebrow">{locale === "ar" ? "البساطة هي السر" : "Simplicity is the secret"}</p>
            <h2 id="recipe-title">
              {locale === "ar" ? "كل طبقة لها دور" : "Every layer matters"}
            </h2>
          </Reveal>
          <div className="ingredient-list depth-4" data-depth="4">
            {[
              ["01", { ar: "القاعدة", en: "The base" }, { ar: "أرز وعدس ومكرونة متوزنين في كل معلقة.", en: "Rice, lentils and pasta balanced in every spoonful." }],
              ["02", { ar: "الصلصة", en: "The sauce" }, { ar: "طماطم غنية بطعم البيت المصري.", en: "Rich tomato sauce with a familiar Egyptian warmth." }],
              ["03", { ar: "الدقة", en: "The daqqa" }, { ar: "خل وثوم وكمون يصحوا كل النكهات.", en: "Vinegar, garlic and cumin that wake every flavour." }],
              ["04", { ar: "القرمشة", en: "The crunch" }, { ar: "بصل ذهبي هو آخر لمسة وأهمها.", en: "Golden onions, the final and essential finish." }],
            ].map(([number, title, description], index) => (
              <Reveal className="ingredient-row" delay={index * 0.08} key={number as string}>
                <span>{number as string}</span>
                <h3>{t(title as { ar: string; en: string })}</h3>
                <p>{t(description as { ar: string; en: string })}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="signature-section" aria-labelledby="signature-title">
          <div className="signature-photo depth-3" data-depth="3">
            <Image src="/founder.jpg" alt={locale === "ar" ? "أبو طارق، مؤسس المطعم" : "Abo Tarek, founder of the restaurant"} fill sizes="(max-width: 800px) 100vw, 52vw" />
            <div className="photo-caption">ARCHIVE / CAIRO</div>
          </div>
          <div className="signature-copy depth-4" data-depth="4">
            <Reveal>
              <p className="eyebrow">{locale === "ar" ? "الراجل وراء الطبق" : "The man behind the bowl"}</p>
              <h2 id="signature-title">{locale === "ar" ? "أبو طارق" : "Abo Tarek"}</h2>
              <blockquote>
                {locale === "ar"
                  ? "الاسم بقى علامة، لكن البداية كانت طبق كشري معمول صح."
                  : "The name became an icon, but it started with one bowl made right."}
              </blockquote>
              <p>
                {locale === "ar"
                  ? "من عربة بسيطة لشوارع وسط البلد، صنع أبو طارق مكانًا يقصده أهل القاهرة والزوار من كل مكان."
                  : "From humble beginnings to the streets of Downtown Cairo, Abo Tarek built a place loved by locals and visitors from everywhere."}
              </p>
              <Link href="/about" className="button button-light">
                {locale === "ar" ? "اقرأ الحكاية" : "Read the story"} <Arrow aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </section>

        <section className="proof-section" aria-labelledby="proof-title">
          <Reveal className="section-heading">
            <p className="eyebrow">{locale === "ar" ? "ليه أبو طارق؟" : "Why Abo Tarek?"}</p>
            <h2 id="proof-title">{locale === "ar" ? "طبق يعرفه العالم" : "A bowl the world knows"}</h2>
          </Reveal>
          <div className="proof-grid">
            <Reveal className="proof-card" delay={0.05}><Clock3 aria-hidden="true" /><strong>70+</strong><span>{locale === "ar" ? "سنة من الخبرة" : "years of craft"}</span></Reveal>
            <Reveal className="proof-card proof-card-blue" delay={0.1}><Award aria-hidden="true" /><strong>#1</strong><span>{locale === "ar" ? "أيقونة كشري القاهرة" : "Cairo koshari icon"}</span></Reveal>
            <Reveal className="proof-card" delay={0.15}><Sparkles aria-hidden="true" /><strong>5</strong><span>{locale === "ar" ? "طبقات في كل طبق" : "essential layers"}</span></Reveal>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-cta-title">
          <div className="cta-rays" aria-hidden="true" />
          <Reveal>
            <p>{siteConfig.contact.primaryPhone}</p>
            <h2 id="final-cta-title">{locale === "ar" ? "الجوع مستني إيه؟" : "What is your hunger waiting for?"}</h2>
            <a className="button button-cream" href={`tel:${siteConfig.contact.primaryPhone}`}>
              {locale === "ar" ? "اطلب دلوقتي" : "Order now"} <Arrow aria-hidden="true" />
            </a>
          </Reveal>
        </section>
      </main>
    </>
  );
}
