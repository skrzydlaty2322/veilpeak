"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTION_COUNT = 6;

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  return (
    <main className="bg-[#080c09] min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 px-6 pt-32 pb-24 max-w-2xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-green-300/70 text-xs tracking-widest uppercase mb-4"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
          className="text-5xl md:text-6xl font-light tracking-tight text-white leading-[1.08] mb-12"
        >
          {t("headline")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="space-y-10"
        >
          {Array.from({ length: SECTION_COUNT }, (_, i) => (
            <div key={i} className="border-t border-white/5 pt-8">
              <h2 className="text-sm font-medium text-white/80 tracking-wide mb-3">
                {i + 1}. {t(`section${i}Title` as `section${0}Title`)}
              </h2>
              <p className="text-white/40 text-sm leading-relaxed font-light">
                {t(`section${i}Body` as `section${0}Body`)}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
