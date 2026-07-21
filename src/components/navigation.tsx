"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { copy } from "@/lib/copy";
import { siteConfig } from "@/lib/data";
import { logo } from "@/lib/assets";


export function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const c = copy[language];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled ? "border-white/8 bg-ink-950/90 py-2 shadow-2xl backdrop-blur-xl" : "border-transparent bg-transparent py-4"}`}>
      <nav className="container-x flex items-center justify-between gap-4" aria-label={language === "ar" ? "القائمة الرئيسية" : "Main navigation"}>
        <Link href="/" className="flex min-h-11 items-center gap-3" aria-label={c.loading} onClick={() => setOpen(false)}>
           <Image src={logo} alt="" width={48} height={48} priority className="h-12 w-12 rounded-full object-cover shadow-red-glow" />
          <span className="hidden text-base font-black text-cream sm:block">{c.loading}</span>
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          {c.nav.map(([label, href]) => <Link key={href} href={href} className={`flex min-h-11 items-center border-b-2 text-sm font-bold transition-colors ${pathname === href ? "border-gold-400 text-gold-300" : "border-transparent text-cream/75 hover:text-gold-300"}`}>{label}</Link>)}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleLanguage} className="min-h-11 min-w-11 rounded-lg border border-white/12 bg-black/20 px-3 text-sm font-black text-gold-200 backdrop-blur" aria-label={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}>{language === "ar" ? "EN" : "ع"}</button>
          <a href={`tel:${siteConfig.contact.primaryPhone}`} className="brand-button hidden min-h-11 px-4 py-2 text-sm md:inline-flex"><Phone size={17} /> {c.call}</a>
          <button type="button" className="grid min-h-11 min-w-11 place-items-center rounded-lg border border-white/12 bg-black/20 text-cream lg:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={23} /> : <Menu size={23} />}</button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto border-t border-white/8 bg-ink-950 px-4 py-5 shadow-2xl lg:hidden" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <div className="container-x grid gap-1">
              {c.nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex min-h-14 items-center border-b border-white/6 px-2 py-2 font-bold ${pathname === href ? "text-gold-300" : "text-cream/85"}`}>{label}</Link>)}
              <a href={`tel:${siteConfig.contact.primaryPhone}`} className="brand-button mt-4 w-full"><Phone size={18} /> {c.call}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
