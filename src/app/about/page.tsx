"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { founder } from "@/lib/assets";
import { useLanguage } from "@/components/language-provider";
import { PageIntro, Reveal } from "@/components/motion";

export default function AboutPage() {
  const { locale } = useLanguage();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <main id="main-content" className="inner-page about-page">
      <PageIntro>
        <section className="about-hero" aria-labelledby="about-title">
          <div className="about-title-wrap">
            <p className="eyebrow">{locale === "ar" ? "حكاية من شوارع القاهرة" : "A story from Cairo's streets"}</p>
            <h1 id="about-title">{locale === "ar" ? "الطبق اللي بقى علامة" : "The bowl that became an icon"}</h1>
          </div>
          <div className="about-founder-image">
            <Image src={founder} alt={locale === "ar" ? "صورة أبو طارق" : "Portrait of Abo Tarek"} fill priority sizes="(max-width: 800px) 100vw, 46vw" />
            <span>{locale === "ar" ? "أبو طارق" : "ABO TAREK"}</span>
          </div>
        </section>
      </PageIntro>

      <section className="story-section" aria-labelledby="story-title">
        <Reveal className="story-lead">
          <span>1950</span>
          <h2 id="story-title">{locale === "ar" ? "البداية كانت بسيطة" : "It began simply"}</h2>
        </Reveal>
        <Reveal className="story-body" delay={0.12}>
          <p>
            {locale === "ar"
              ? "كشري أبو طارق مش مجرد مطعم. هو جزء من ذاكرة وسط البلد: صوت الملاعق، بخار الحلل، والبصل المقرمش اللي بيتحط قبل أول لقمة."
              : "Abo Tarek is more than a restaurant. It is part of Downtown Cairo's memory: spoons against bowls, steam from the pots, and crisp onions before the first bite."}
          </p>
          <p>
            {locale === "ar"
              ? "المكونات عمرها ما كانت معقدة. التميز كان في الثبات: نفس الطبقات، نفس السخونة، ونفس الطعم اللي الناس رجعت عشانه جيل بعد جيل."
              : "The ingredients were never complicated. The distinction was consistency: the same layers, the same warmth, and the taste generations returned for."}
          </p>
        </Reveal>
      </section>

      <section className="values-section" aria-labelledby="values-title">
        <Reveal className="section-heading light-heading">
          <p className="eyebrow">{locale === "ar" ? "اللي ما اتغيرش" : "What never changed"}</p>
          <h2 id="values-title">{locale === "ar" ? "أصولنا في كل طبق" : "Our principles in every bowl"}</h2>
        </Reveal>
        <div className="values-grid">
          {[
            ["01", locale === "ar" ? "سريع، مش مستعجل" : "Fast, never rushed", locale === "ar" ? "الخدمة سريعة لكن كل طبقة ليها توقيتها." : "Service moves quickly, but every layer gets its time."],
            ["02", locale === "ar" ? "بسيط، مش عادي" : "Simple, never ordinary", locale === "ar" ? "مكونات يومية، متظبطة بخبرة سنين." : "Everyday ingredients tuned by decades of craft."],
            ["03", locale === "ar" ? "مصري بجد" : "Proudly Egyptian", locale === "ar" ? "طبق شعبي بنقدمه بفخر لكل العالم." : "A people's dish, proudly served to the world."],
          ].map(([number, title, copy], index) => (
            <Reveal className="value-card" delay={index * 0.1} key={number}>
              <span>{number}</span><h3>{title}</h3><p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <Reveal>
          <h2>{locale === "ar" ? "دلوقتي دورك تدوق الحكاية" : "Now taste the story for yourself"}</h2>
          <Link href="/menu" className="button button-primary">{locale === "ar" ? "افتح المنيو" : "Open the menu"} <Arrow aria-hidden="true" /></Link>
        </Reveal>
      </section>
    </main>
  );
}
