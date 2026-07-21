"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Language = "ar" | "en";

type LanguageContextValue = {
  language: Language;
  locale: Language;
  toggleLanguage: () => void;
  toggleLocale: () => void;
  t: <T extends { ar: string; en: string }>(value: T) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "ar";
    const saved = window.localStorage.getItem("abotarek-language");
    return saved === "en" ? "en" : "ar";
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("abotarek-language", language);
  }, [language]);

  const toggleLanguage = useCallback(() => setLanguage((v) => (v === "ar" ? "en" : "ar")), []);
  const t = useCallback(<T extends { ar: string; en: string }>(value: T) => value[language] as string, [language]);

  return (
    <LanguageContext.Provider value={{ language, locale: language, toggleLanguage, toggleLocale: toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
