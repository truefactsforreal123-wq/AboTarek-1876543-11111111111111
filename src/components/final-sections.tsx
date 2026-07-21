"use client";

import { motion } from "framer-motion";
import { Clock3, ExternalLink, MapPin, MessageCircle, Phone, Share2 } from "lucide-react";
import Image from "next/image";
import { useLanguage, type Language } from "@/components/language-provider";
import { Reveal, SectionHeading } from "@/components/site-primitives";
import { copy } from "@/lib/copy";
import { branches as fallbackBranches, gallery, siteConfig, type LocalizedText } from "@/lib/data";

type PrismaBranch = {
  number: string;
  nameAr: string;
  nameEn: string;
  addressAr: string;
  addressEn: string;
  phone: string;
  whatsapp: string;
  mapsUrl: string;
};

const localize = (language: Language, value: LocalizedText) => value[language];

export function FoodShowcase() {
  const { language } = useLanguage();
  const c = copy[language];
  return (
    <section className="overflow-hidden bg-ink-900 py-14 sm:py-20" aria-label={c.galleryTitle}>
      <div className="container-x text-start">
        <p className="text-sm font-extrabold text-gold-300">{c.galleryEyebrow}</p>
        <h2 className="mt-2 text-2xl font-black text-cream sm:text-4xl">{c.galleryTitle}</h2>
      </div>
      <div className="food-showcase mt-7 overflow-hidden sm:mt-10" dir="ltr">
        <div className="food-showcase-track flex w-max">
          {[0, 1].map((group) => (
            <div key={group} className="flex gap-3 px-1.5 sm:gap-5 sm:px-2.5" aria-hidden={group === 1 ? "true" : undefined}>
              {gallery.map((image, index) => (
                <motion.figure
                  key={`${group}-${image.src}`}
                  className={`group relative h-56 shrink-0 overflow-hidden rounded-lg sm:h-72 ${index % 3 === 0 ? "w-[82vw] sm:w-[520px]" : "w-[68vw] sm:w-[390px]"}`}
                  whileHover={{ y: -8, rotate: index % 2 === 0 ? -0.7 : 0.7 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image src={image.src} alt={group === 0 ? localize(language, image.alt) : ""} fill sizes="(max-width: 640px) 82vw, 520px" loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/78 via-transparent to-transparent" aria-hidden="true" />
                  <figcaption className="absolute bottom-4 start-4 border-s-2 border-gold-400 ps-3 text-sm font-black text-cream">{localize(language, image.alt)}</figcaption>
                </motion.figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SocialProof() {
  const { language } = useLanguage();
  const c = copy[language];
  const numbers = [
    [`${siteConfig.stats.recommendPercent}%`, c.reviewsLabels[0]],
    [`${siteConfig.stats.reviewCount}`, c.reviewsLabels[1]],
    [`${siteConfig.stats.followers / 1000}K+`, c.reviewsLabels[2]],
  ];
  return (
    <section id="reviews" className="site-section bg-cream py-16 text-ink-950 sm:py-24 lg:py-32">
      <div className="container-x grid items-end gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="text-start">
          <p className="text-sm font-extrabold text-brand-600">{c.reviewsEyebrow}</p>
          <h2 className="section-title mt-4 text-ink-950">{c.reviewsTitle}</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-ink-700">{c.reviewsText}</p>
          <a href={siteConfig.facebook} target="_blank" rel="noreferrer" className="brand-button mt-7"><Share2 size={17} /> {c.facebookReviews}</a>
        </div>
        <div className="grid gap-px overflow-hidden rounded-lg border border-ink-950/10 bg-ink-950/10 sm:grid-cols-3">
          {numbers.map(([number, label], index) => <Reveal key={label} delay={index * 0.08} className="bg-white p-7 text-start"><strong className="block text-4xl font-black text-brand-600">{number}</strong><span className="mt-3 block text-sm font-bold text-ink-700">{label}</span></Reveal>)}
        </div>
      </div>
    </section>
  );
}

export function Branches({ branchesData }: { branchesData?: PrismaBranch[] | null }) {
  const { language } = useLanguage();
  const c = copy[language];
  const list = branchesData
    ? branchesData.map((b) => ({
        number: b.number,
        name: { ar: b.nameAr, en: b.nameEn } as LocalizedText,
        address: { ar: b.addressAr, en: b.addressEn } as LocalizedText,
        phone: b.phone,
        whatsapp: b.whatsapp,
        maps: b.mapsUrl,
      }))
    : fallbackBranches;
  return (
    <section id="branches" className="site-section relative overflow-hidden bg-ink-950 py-16 sm:py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(193,39,45,0.2),transparent_30%),radial-gradient(circle_at_90%_70%,rgba(232,156,28,0.12),transparent_28%)]" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading eyebrow={c.branchesEyebrow} title={c.branchesTitle} />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {list.map((branch, index) => (
            <Reveal key={branch.phone} delay={index * 0.07} className="flex flex-col rounded-lg border border-white/8 bg-ink-900/82 p-5 text-start transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/35 hover:shadow-red-glow sm:min-h-[330px] sm:p-6">
              <div className="flex items-start justify-between gap-4"><span className="text-4xl font-black text-brand-500/55">{branch.number}</span><span className="grid h-11 w-11 place-items-center rounded-lg border border-gold-400/25 bg-gold-500/8 text-gold-300"><MapPin size={21} /></span></div>
              <h3 className="mt-6 text-xl font-black text-cream">{localize(language, branch.name)}</h3>
              <p className="mt-3 min-h-16 text-sm leading-7 text-cream/62">{localize(language, branch.address)}</p>
              <a href={`tel:${branch.phone}`} className="mt-4 inline-flex min-h-11 items-center gap-2 font-black text-gold-300 hover:text-gold-200"><Phone size={17} /> <span dir="ltr">{branch.phone}</span></a>
              <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                <a href={`https://wa.me/${branch.whatsapp}`} target="_blank" rel="noreferrer" className="outline-button min-h-11 px-3 py-2 text-xs"><MessageCircle size={16} /> {c.whatsapp}</a>
                <a href={branch.maps} target="_blank" rel="noreferrer" className="outline-button min-h-11 px-3 py-2 text-xs"><ExternalLink size={16} /> {c.directions}</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { language } = useLanguage();
  const c = copy[language];
  return (
    <footer className="border-t border-white/8 bg-[#090404] pt-16">
      <div className="container-x grid gap-9 pb-10 sm:gap-12 sm:pb-12 md:grid-cols-[1.2fr_0.8fr_0.9fr]">
        <div className="text-start"><div className="flex items-center gap-4"><Image src="/logo.png" alt={c.loading} width={80} height={80} className="h-20 w-20 rounded-full object-cover" /><strong className="text-xl font-black text-cream">{c.loading}</strong></div><p className="mt-5 max-w-md text-sm leading-7 text-cream/55">{c.footerText}</p><a href={siteConfig.facebook} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-black text-gold-300 hover:text-gold-200"><Share2 size={17} /> {c.follow}</a></div>
        <div className="text-start"><h3 className="text-base font-black text-cream">{c.quickLinks}</h3><div className="mt-5 grid gap-2">{c.nav.slice(1).map(([label, href]) => <a key={href} href={href} className="flex min-h-10 items-center text-sm font-semibold text-cream/55 hover:text-gold-300">{label}</a>)}</div></div>
        <div className="text-start"><h3 className="text-base font-black text-cream">{c.hours}</h3><p className="mt-5 flex items-start gap-3 text-sm leading-7 text-cream/60"><Clock3 size={18} className="mt-1 shrink-0 text-gold-300" /> {c.hoursValue}</p><a href={`tel:${siteConfig.contact.primaryPhone}`} className="brand-button mt-6"><Phone size={17} /> {c.call}</a></div>
      </div>
      <div className="border-t border-white/7 py-5 text-center text-xs text-cream/38">© 2026 {c.rights}</div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  const { language } = useLanguage();
  return <a href={`https://wa.me/${siteConfig.contact.primaryWhatsapp}`} target="_blank" rel="noreferrer" className="fixed bottom-5 end-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_35px_rgba(37,211,102,0.35)] transition-transform hover:scale-105" aria-label={language === "ar" ? "تواصل معنا على واتساب" : "Contact us on WhatsApp"}><span className="whatsapp-ring absolute inset-0 rounded-full border border-[#25D366]" aria-hidden="true" /><MessageCircle size={27} fill="currentColor" /></a>;
}
