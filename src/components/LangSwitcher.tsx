"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const LOCALES = ["en", "pl"] as const;

function getStoredLocale(): string {
  const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
  return match ? match[1] : "en";
}

export default function LangSwitcher() {
  const router = useRouter();
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    setLocale(getStoredLocale());
  }, []);

  const switchLocale = (next: string) => {
    if (next === locale) return;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`;
    setLocale(next);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-0.5">
      {LOCALES.map((lang) => {
        const active = locale === lang;
        return (
          <motion.button
            key={lang}
            onClick={() => switchLocale(lang)}
            whileTap={{ scale: 0.92 }}
            className={`relative px-2 py-1 text-[11px] uppercase tracking-widest font-light transition-colors duration-200 cursor-pointer ${
              active ? "text-white" : "text-white/35 hover:text-white/60"
            }`}
          >
            {lang}
            {active && (
              <motion.span
                layoutId="lang-underline"
                className="absolute bottom-0 left-2 right-2 h-px bg-white/50"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
