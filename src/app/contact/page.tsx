"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="bg-[#080c09] min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-24">
        <div className="max-w-lg w-full">
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
            className="text-5xl md:text-6xl font-light tracking-tight text-white leading-[1.08] mb-4"
          >
            {t("headline")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
            className="text-white/40 text-sm font-light mb-10"
          >
            {t("emailNote")}{" "}
            <a
              href="mailto:contact@veilpeak.com"
              className="text-green-300/70 hover:text-green-300 transition-colors duration-200"
            >
              contact@veilpeak.com
            </a>{" "}
            {t("emailOr")}
          </motion.p>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
              className="rounded-2xl border border-green-300/20 bg-green-300/5 p-8 text-center"
            >
              <p className="text-green-300 text-sm font-medium mb-1">{t("successTitle")}</p>
              <p className="text-white/40 text-xs font-light">{t("successBody")}</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">
                    {t("labelName")}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("placeholderName")}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-300/50 focus:ring-1 focus:ring-green-300/20 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">
                    {t("labelEmail")}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={t("placeholderEmail")}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-300/50 focus:ring-1 focus:ring-green-300/20 transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">
                  {t("labelMessage")}
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder={t("placeholderMessage")}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-300/50 focus:ring-1 focus:ring-green-300/20 transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-green-300 text-[#080c09] text-sm font-medium tracking-wide hover:bg-green-200 transition-colors duration-200 cursor-pointer"
              >
                {t("submit")}
              </button>
            </motion.form>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
