"use client";

import { useLanguage } from "@/components/language-provider";
import { Hero, Marquee } from "@/components/hero";
import { Features } from "@/components/story-sections";
import { FoodShowcase, SocialProof } from "@/components/final-sections";
import { Preloader } from "@/components/site-primitives";
import { copy } from "@/lib/copy";

export default function RestaurantSite({ stats }: { stats?: { branches: number; followers: number; recommendPercent: number; reviewCount: number } | null }) {
  const { language } = useLanguage();
  return (
    <>
      <Preloader label={copy[language].loading} />
      <Hero stats={stats} />
      <FoodShowcase />
      <Marquee />
      <Features />
      <SocialProof />
    </>
  );
}
