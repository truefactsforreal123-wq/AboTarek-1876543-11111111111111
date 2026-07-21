"use client";

import { Beef, Bike, Check, Flame, MapPin, Sparkles, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { Reveal, SectionHeading } from "@/components/site-primitives";
import { copy } from "@/lib/copy";
import { siteConfig } from "@/lib/data";

const icons: LucideIcon[] = [Beef, Flame, Sparkles, Bike];

export function Features() {
  const { language } = useLanguage();
  const c = copy[language];
  return (
    <section className="site-section bg-cream py-20 text-ink-950 sm:py-24">
      <div className="container-x">
        <SectionHeading eyebrow={c.featureEyebrow} title={c.featureTitle} tone="light" />
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-ink-950/10 bg-ink-950/10 sm:grid-cols-2 lg:grid-cols-4">
          {c.features.map(([title, description], index) => {
            const Icon = icons[index];
            return (
              <Reveal key={title} delay={index * 0.08} className="group bg-cream p-5 text-start transition-colors duration-300 hover:bg-gold-50 sm:min-h-64 sm:p-7">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-brand-500 text-cream shadow-red-glow transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true"><Icon size={24} /></span>
                <h3 className="mt-7 text-xl font-black text-ink-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-700">{description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function About() {
  const { language } = useLanguage();
  const c = copy[language];
  return (
    <section id="about" className="site-section overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal className="relative min-h-[360px] overflow-hidden rounded-lg sm:min-h-[500px]">
          <Image src={siteConfig.images.about} alt={language === "ar" ? "تحضير أسياخ المشويات على الفحم" : "Preparing charcoal grilled skewers"} fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/82 via-transparent to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 start-0 max-w-xs border-s-4 border-gold-400 bg-ink-950/86 p-5 backdrop-blur"><strong className="block text-3xl font-black text-gold-300">{siteConfig.stats.followers / 1000}K+</strong><span className="text-sm font-semibold text-cream/70">{c.stats[1]}</span></div>
        </Reveal>
        <div className="text-start">
          <SectionHeading eyebrow={c.aboutEyebrow} title={c.aboutTitle} align="start" />
          <Reveal delay={0.1}><p className="mt-7 text-base leading-8 text-cream/72">{c.aboutP1}</p></Reveal>
          <Reveal delay={0.16}><p className="mt-4 text-base leading-8 text-cream/72">{c.aboutP2}</p></Reveal>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {c.aboutPoints.map((point, index) => <Reveal key={point} delay={0.2 + index * 0.05} className="flex items-center gap-3 text-sm font-bold text-cream/86"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-olive-400/16 text-olive-400"><Check size={16} strokeWidth={3} /></span>{point}</Reveal>)}
          </div>
          <Reveal delay={0.35} className="mt-8"><a href="/branches" className="brand-button max-sm:w-full"><MapPin size={18} /> {c.visit}</a></Reveal>
        </div>
      </div>
    </section>
  );
}
