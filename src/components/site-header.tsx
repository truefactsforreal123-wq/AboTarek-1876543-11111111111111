"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { navItems, siteConfig } from "@/lib/data";
import { logo } from "@/lib/assets";
import { useLanguage } from "./language-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, toggleLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/admin") || pathname.startsWith("/table")) return null;

  return (
    <header className="site-header">
      <Link href="/" className="brand-lockup" aria-label="Abo Tarek home">
        <span className="brand-logo">
          <Image src={logo} alt="أبو طارق" fill priority sizes="110px" />
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={pathname === item.href ? "active" : ""}
          >
            {t(item.label)}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <button className="language-switch" type="button" onClick={toggleLocale}>
          {locale === "ar" ? "EN" : "عربي"}
        </button>
        <a href={`tel:${siteConfig.contact.primaryPhone}`} className="order-pill">
          <Phone aria-hidden="true" size={18} />
          <span>{locale === "ar" ? `اطلب ${siteConfig.contact.primaryPhone}` : `Call ${siteConfig.contact.primaryPhone}`}</span>
        </a>
        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Mobile navigation"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={item.href} onClick={() => setOpen(false)}>
                  <span>0{index + 1}</span> {t(item.label)}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
