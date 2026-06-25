"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import WordReveal from "./WordReveal";

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="text-green-300 flex-shrink-0 mt-0.5"
    >
      <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.3" />
      <path
        d="M5 8.5L7 10.5L11 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FullSetSection() {
  const t = useTranslations("fullset");

  const features = [
    t("feature0"),
    t("feature1"),
    t("feature2"),
    t("feature3"),
  ];

  return (
    <section className="bg-[#080c09] py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image side — slides in from left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#0d150f]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(134,239,172,0.06)_0%,transparent_70%)]" />
              <Image
                src="/images/fullset.png"
                alt="Veilpeak Summit Shell complete set — jacket and trousers"
                fill
                className="object-contain object-center p-10"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute bottom-6 left-6 px-5 py-3 rounded-2xl bg-[#080c09]/80 backdrop-blur-sm border border-white/10">
              <p className="text-xs text-white/40 tracking-widest uppercase mb-0.5">
                {t("setLabel")}
              </p>
              <p className="text-2xl font-light text-white">€575</p>
              <p className="text-xs text-green-300/80 mt-0.5">{t("feature3")}</p>
            </div>
          </motion.div>

          {/* Text side — slides in from right */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-green-300/70 text-xs tracking-widest uppercase mb-3"
            >
              {t("label")}
            </motion.p>

            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white leading-[1.1] mb-6">
              <WordReveal text={t("headlineStart")} className="block" />
              <WordReveal text={t("headlineEnd")} className="block" />
            </h2>

            <p className="text-white/50 text-base leading-relaxed font-light mb-8 max-w-md">
              {t("desc")}
            </p>

            <ul className="flex flex-col gap-3 mb-10">
              {features.map((feat, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 * i }}
                  className="flex items-start gap-3"
                >
                  <CheckIcon />
                  <span className="text-sm text-white/60 font-light">{feat}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/products/summit-shell-set"
                className="px-8 py-3 rounded-full bg-white text-[#080c09] text-sm font-medium tracking-wide hover:bg-green-100 transition-colors duration-200 text-center cursor-pointer"
              >
                {t("shopCta")}
              </Link>
              <Link
                href="/products/summit-shell-set"
                className="px-8 py-3 rounded-full border border-white/20 text-white/70 text-sm font-light hover:border-white/40 hover:text-white transition-all duration-200 text-center cursor-pointer"
              >
                {t("learnCta")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
