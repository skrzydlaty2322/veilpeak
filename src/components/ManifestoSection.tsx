"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useState, useRef, type ReactElement } from "react";
import { useTranslations } from "next-intl";
import WordReveal from "./WordReveal";

function ShellIcon(): ReactElement {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M11 1.5L2 5.5V11c0 5 3.5 9.7 9 11 5.5-1.3 9-6 9-11V5.5L11 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M7 11l2.8 2.8L15 8.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThermalIcon(): ReactElement {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M11 2v9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="11" cy="16.5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8.5 5.5H7M8.5 8.5H7M8.5 11.5H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function MotionIcon(): ReactElement {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M7 11c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M11 11l2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

const ICONS = [ShellIcon, ThermalIcon, MotionIcon];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function ManifestoSection() {
  const t = useTranslations("manifesto");
  const [activePillar, setActivePillar] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const pillars = [0, 1, 2].map((i) => ({
    number: t(`pillar${i}Number` as `pillar${0 | 1 | 2}Number`),
    category: t(`pillar${i}Category` as `pillar${0 | 1 | 2}Category`),
    headline: t(`pillar${i}Headline` as `pillar${0 | 1 | 2}Headline`),
    body: t(`pillar${i}Body` as `pillar${0 | 1 | 2}Body`),
    stat: t(`pillar${i}Stat` as `pillar${0 | 1 | 2}Stat`),
    statLabel: t(`pillar${i}StatLabel` as `pillar${0 | 1 | 2}StatLabel`),
    Icon: ICONS[i],
  }));

  return (
    <section ref={sectionRef} className="relative bg-[#080c09] py-24 px-6 border-t border-white/5 overflow-hidden">

      {/* Parallax radial gradient background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_40%,rgba(134,239,172,0.045)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-[radial-gradient(ellipse_50%_100%_at_20%_100%,rgba(134,239,172,0.025)_0%,transparent_70%)]" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header — word-by-word reveal */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-green-300/70 text-xs tracking-widest uppercase mb-3"
            >
              {t("label")}
            </motion.p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.06]">
              <WordReveal text={t("headlineStart")} className="block" />
              <WordReveal
                text={t("headlineSub")}
                className="block"
                wordClassName="text-green-300/70"
              />
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-white/35 text-sm leading-relaxed font-light max-w-xs lg:max-w-72 lg:text-right"
          >
            {t("desc")}
          </motion.p>
        </div>

        {/* Editorial asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

          {/* Left: flagship jacket — slides in from left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative min-h-[460px] lg:min-h-[600px] rounded-3xl overflow-hidden bg-[#0d150f] group cursor-pointer"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_80%,rgba(134,239,172,0.07)_0%,transparent_65%)]" />

            <Image
              src="/images/jacket.png"
              alt="Veilpeak Summit Shell Jacket — flagship alpine protection"
              fill
              className="object-contain object-center px-10 pt-10 pb-36 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#0a1410] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-8 py-7">
              <p className="text-[10px] text-green-300/50 tracking-widest uppercase mb-1.5">
                {t("flagshipLabel")}
              </p>
              <h3 className="text-2xl font-light text-white tracking-tight">
                {t("jacketName")}
              </h3>
              <p className="text-sm text-white/35 font-light mt-0.5">
                {t("jacketSub")}
              </p>
            </div>

            <div className="absolute top-6 right-6 px-4 py-2.5 rounded-2xl bg-[#080c09]/75 backdrop-blur-md border border-white/10">
              <p className="text-[10px] text-white/35 tracking-widest uppercase">{t("protectionLabel")}</p>
              <p className="text-base font-light text-white mt-0.5 tracking-tight">
                Gore-Tex Pro
              </p>
            </div>
          </motion.div>

          {/* Right column — slides in from right */}
          <div className="flex flex-col gap-5">

            {/* Thermal card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="flex-1 rounded-3xl bg-[#0d150f] border border-white/5 p-8 flex flex-col justify-between min-h-[270px]"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] text-white/25 tracking-widest uppercase font-light">
                    {t("thermalLabel")}
                  </span>
                  <div className="flex-1 h-px bg-white/8" />
                  <span className="text-[10px] text-green-300/40 tracking-widest uppercase font-light">
                    AlpineFill™
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight leading-tight whitespace-pre-line">
                  {t("thermalHeadline")}
                </h3>
                <p className="text-sm text-white/35 font-light leading-relaxed mt-3 max-w-sm">
                  {t("thermalDesc")}
                </p>
              </div>

              <div className="flex items-end justify-between pt-6 mt-4 border-t border-white/5">
                <div>
                  <p className="text-3xl font-light text-white tracking-tight">−40°C</p>
                  <p className="text-[10px] text-white/25 tracking-widest uppercase mt-1">
                    {t("ratedTemp")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-light text-green-300/65 tracking-tight">95%</p>
                  <p className="text-[10px] text-white/25 tracking-widest uppercase mt-1">
                    {t("loftRetained")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Motion / trousers card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="flex-1 relative rounded-3xl overflow-hidden bg-[#0d150f] border border-white/5 min-h-[270px]"
            >
              <Image
                src="/images/pants.png"
                alt="Alpine Hardshell Trousers"
                fill
                className="object-contain object-right-bottom p-8 opacity-40"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d150f] via-[#0d150f]/85 to-transparent" />

              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-white/25 tracking-widest uppercase font-light">
                    {t("ergonomicLabel")}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight leading-tight mt-3 whitespace-pre-line">
                    {t("articulatedHeadline")}
                  </h3>
                  <p className="text-sm text-white/35 font-light leading-relaxed mt-3 max-w-xs">
                    {t("articulatedDesc")}
                  </p>
                </div>
                <p className="text-[10px] text-green-300/40 tracking-widest uppercase mt-4 font-light">
                  {t("unrestrictedLabel")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Three technology pillars */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {pillars.map((pillar, i) => {
            const Icon = pillar.Icon;
            const isActive = activePillar === i;

            return (
              <motion.div
                key={pillar.number}
                variants={cardVariants}
                onHoverStart={() => setActivePillar(i)}
                onHoverEnd={() => setActivePillar(null)}
                className={`relative rounded-2xl p-8 border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#0a1810] border-green-300/20"
                    : "bg-[#0d150f] border-white/5"
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[10px] text-white/20 tracking-widest font-light">
                    {pillar.number}
                  </span>
                  <span className={`transition-colors duration-300 ${isActive ? "text-green-300" : "text-white/25"}`}>
                    <Icon />
                  </span>
                </div>

                <p className={`text-[10px] tracking-widest uppercase mb-3 font-light transition-colors duration-300 ${isActive ? "text-green-300/70" : "text-white/30"}`}>
                  {pillar.category}
                </p>

                <h3 className="text-xl font-light text-white tracking-tight leading-snug mb-4 whitespace-pre-line">
                  {pillar.headline}
                </h3>

                <p className="text-sm text-white/35 font-light leading-relaxed mb-8">
                  {pillar.body}
                </p>

                <div className={`pt-5 border-t transition-colors duration-300 ${isActive ? "border-green-300/20" : "border-white/5"}`}>
                  <p className={`text-3xl font-light tracking-tight transition-colors duration-300 ${isActive ? "text-green-300" : "text-white"}`}>
                    {pillar.stat}
                  </p>
                  <p className="text-[10px] text-white/25 tracking-widest uppercase mt-1 font-light">
                    {pillar.statLabel}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5"
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-green-300/10 border border-green-300/15 flex items-center justify-center text-green-300/60">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L3 6V12C3 17 6.5 21.7 12 23C17.5 21.7 21 17 21 12V6L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-white/65 text-sm font-light leading-snug">
                {t("warranty")}
              </p>
              <p className="text-white/25 text-xs tracking-widest uppercase mt-0.5 font-light">
                {t("warrantyTag")}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/products"
              className="px-8 py-3 rounded-full bg-green-300 text-[#080c09] text-sm font-medium tracking-wide hover:bg-green-200 transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              {t("exploreGear")}
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 rounded-full border border-white/15 text-white/55 text-sm font-light hover:border-white/35 hover:text-white/85 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              {t("ourStory")}
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
