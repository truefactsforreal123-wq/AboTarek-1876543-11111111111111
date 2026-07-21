"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Globe, Phone } from "lucide-react";
import { navItems, siteConfig } from "@/lib/data";
import { logo } from "@/lib/assets";
import { useLanguage } from "./language-provider";

export function SiteFooter() {
  const { locale, t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-logo">
        <Image src={logo} alt="Abo Tarek" fill sizes="180px" />
      </div>
      <p className="footer-statement">
        {locale === "ar"
          ? "حكاية مصرية في طبق. من وسط البلد للعالم."
          : "An Egyptian story in a bowl. From Downtown Cairo to the world."}
      </p>
      <div className="footer-links">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            {t(item.label)}
          </Link>
        ))}
      </div>
      <div className="footer-socials">
        <a href={`tel:${siteConfig.contact.primaryPhone}`} aria-label="Call Abo Tarek"><Phone aria-hidden="true" /></a>
        <a href={siteConfig.facebook} target="_blank" rel="noreferrer" aria-label="Abo Tarek on Facebook"><Globe aria-hidden="true" /></a>
        <a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Abo Tarek on Instagram"><ExternalLink aria-hidden="true" /></a>
      </div>
      <small>© {new Date().getFullYear()} Abo Tarek. {locale === "ar" ? "كل الحقوق محفوظة." : "All rights reserved."}</small>
    </footer>
  );
}
