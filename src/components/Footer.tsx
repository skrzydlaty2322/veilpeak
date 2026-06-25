"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#080c09] border-t border-white/5 px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <svg width="20" height="16" viewBox="0 0 24 20" fill="none">
            <path d="M12 2L22 18H2L12 2Z" fill="#86efac" fillOpacity="0.8" />
            <path d="M6 18L12 8L18 18" fill="#080c09" fillOpacity="0.4" />
          </svg>
          <span className="text-white/50 font-light tracking-[0.28em] text-xs uppercase">
            VEILPEAK
          </span>
        </div>
        <p className="text-white/25 text-xs font-light">
          {t("rights")}
        </p>
        <div className="flex items-center gap-6 text-white/30 text-xs">
          <Link href="/privacy" className="hover:text-white/60 transition-colors duration-200 cursor-pointer">{t("privacy")}</Link>
          <Link href="/terms" className="hover:text-white/60 transition-colors duration-200 cursor-pointer">{t("terms")}</Link>
          <Link href="/contact" className="hover:text-white/60 transition-colors duration-200 cursor-pointer">{t("contact")}</Link>
        </div>
      </div>
    </footer>
  );
}
