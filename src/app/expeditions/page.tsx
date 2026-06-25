"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ExpeditionsPage() {
  const t = useTranslations("expeditions");

  return (
    <main className="bg-[#080c09] min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-24">
        <div className="max-w-2xl w-full">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="text-green-300/70 text-xs tracking-widest uppercase mb-4"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" as const, delay: 0.1 }}
            className="text-5xl md:text-6xl font-light tracking-tight text-white leading-[1.08] mb-8"
          >
            {t("headline")}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-white/50 text-base leading-relaxed font-light">{t("p1")}</p>
            <p className="text-white/35 text-sm leading-relaxed font-light">{t("p2")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.35 }}
            className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-300/60 animate-pulse" />
            <span className="text-xs text-white/40 tracking-widest uppercase font-light">
              {t("badge")}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.45 }}
            className="mt-8 flex items-center gap-4"
          >
            <Link
              href="/products"
              className="px-8 py-3 rounded-full bg-green-300 text-[#080c09] text-sm font-medium tracking-wide hover:bg-green-200 transition-colors duration-200 cursor-pointer"
            >
              {t("cta1")}
            </Link>
            <Link
              href="/"
              className="px-8 py-3 rounded-full border border-white/15 text-white/55 text-sm font-light hover:border-white/35 hover:text-white/85 transition-all duration-200 cursor-pointer"
            >
              {t("cta2")}
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
