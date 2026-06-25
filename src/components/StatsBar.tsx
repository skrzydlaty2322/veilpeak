"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function StatsBar() {
  const t = useTranslations("stats");

  const stats = [
    { value: t("summitValue"), label: t("summitLabel") },
    { value: t("tempValue"), label: t("tempLabel") },
    { value: t("warrantyValue"), label: t("warrantyLabel") },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-0 sm:gap-0 rounded-2xl border border-white/10 backdrop-blur-sm bg-white/5 overflow-hidden"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          variants={item}
          className={`flex flex-col items-center px-8 py-4 sm:py-5 flex-1 ${
            i < stats.length - 1 ? "border-b sm:border-b-0 sm:border-r border-white/10" : ""
          }`}
        >
          <span className="text-2xl md:text-3xl font-light text-white tracking-tight">
            {stat.value}
          </span>
          <span className="text-xs text-white/40 mt-1 tracking-widest uppercase">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
