"use client";

import { ArrowUpLeft, MapPin, Navigation, Phone } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { PageIntro, Reveal } from "@/components/motion";
import { siteConfig } from "@/lib/data";

interface Branch {
  id: number;
  number: string;
  nameAr: string;
  nameEn: string;
  addressAr: string;
  addressEn: string;
  phone: string;
  whatsapp: string;
  mapsUrl: string;
}

interface Props {
  branches: Branch[];
}

export function BranchesPageContent({ branches }: Props) {
  const { locale } = useLanguage();

  return (
    <main id="main-content" className="inner-page branches-page">
      <PageIntro>
        <section className="branches-hero" aria-labelledby="branches-title">
          <div>
            <p className="eyebrow">{locale === "ar" ? "الطبق أقرب مما تتخيل" : "The bowl is closer than you think"}</p>
            <h1 id="branches-title">{locale === "ar" ? "تعالى لنا" : "Come find us"}</h1>
            <p>{locale === "ar" ? "ابدأ من فرع وسط البلد الأشهر، أو اختار الأقرب ليك." : "Start at our iconic Downtown home, or choose the location closest to you."}</p>
          </div>
          <MapPin className="branches-pin" aria-hidden="true" />
        </section>
      </PageIntro>

      <section className="branches-list" aria-label="Abo Tarek branches">
        {branches.map((branch, index) => (
          <Reveal className={`branch-row ${index === 0 ? "branch-featured" : ""}`} delay={index * 0.08} key={branch.id}>
            <span className="branch-number">0{index + 1}</span>
            <div className="branch-main">
              {index === 0 ? <span className="original-label">{locale === "ar" ? "الفرع الأصلي" : "THE ORIGINAL"}</span> : null}
              <h2>{locale === "ar" ? branch.nameAr : branch.nameEn}</h2>
              <p>{locale === "ar" ? branch.addressAr : branch.addressEn}</p>
            </div>
            <div className="branch-actions">
              <a href={`tel:${branch.phone}`} aria-label={`Call ${locale === "ar" ? branch.nameAr : branch.nameEn}`}><Phone aria-hidden="true" /> {branch.phone}</a>
              <a href={branch.mapsUrl} target="_blank" rel="noreferrer" aria-label={`Directions to ${locale === "ar" ? branch.nameAr : branch.nameEn}`}><Navigation aria-hidden="true" /> {locale === "ar" ? "الاتجاهات" : "Directions"}</a>
            </div>
            <ArrowUpLeft className="branch-arrow" aria-hidden="true" />
          </Reveal>
        ))}
      </section>

      <section className="delivery-band">
        <Reveal>
          <p>{locale === "ar" ? "مش قادر تيجي؟" : "Can't make it over?"}</p>
          <h2>{locale === "ar" ? "خلي الطبق ييجي لحد عندك" : "Let the bowl come to you"}</h2>
          <a href={`tel:${siteConfig.contact.primaryPhone}`} className="button button-cream"><Phone aria-hidden="true" /> {locale === "ar" ? `اطلب ${siteConfig.contact.primaryPhone}` : `Call ${siteConfig.contact.primaryPhone}`}</a>
        </Reveal>
      </section>
    </main>
  );
}
