"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

interface StatProps {
  prefix?: string;
  target: number;
  suffix: string;
  label: string;
  duration?: number;
  decimals?: number;
}

function AnimatedStat({ prefix = "", target, suffix, label, duration = 2, decimals = 0 }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const start = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      setCount(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, target, duration, decimals]);

  const display = decimals > 0 ? count.toFixed(decimals) : count.toLocaleString();

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <span className="text-6xl md:text-7xl font-light text-white tracking-tight tabular-nums">
        {prefix}{display}{suffix}
      </span>
    </div>
  );
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function TrustBar() {
  const t = useTranslations("stats");

  const stats: StatProps[] = [
    { target: 8848, suffix: "m", label: t("summitLabel"), duration: 2.2 },
    { prefix: "−", target: 40, suffix: "°C", label: t("tempLabel"), duration: 1.8 },
    { target: 12, suffix: " yr", label: t("warrantyLabel"), duration: 1.5 },
  ];

  return (
    <section className="bg-[#080c09] py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-green-300/50 text-xs tracking-widest uppercase">
            Built to an absolute standard
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={item} className="flex flex-col items-center gap-4">
              <AnimatedStat {...stat} />
              <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-px bg-green-300/30" />
                <span className="text-xs text-white/35 tracking-widest uppercase font-light mt-1">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
