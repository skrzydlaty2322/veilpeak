"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import MountainSVG from "./MountainSVG";

const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  },
});

export default function HeroSection() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 130]);

  return (
    <section
      ref={ref}
      className="relative w-full h-screen min-h-[600px] flex flex-col overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-[10%] -bottom-[10%]"
      >
        <Image
          src="/images/hero.jpg"
          alt="Aerial view of misty mountain valley"
          fill
          priority
          className="object-cover object-[center_60%]"
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        style={{ y, maskImage: "radial-gradient(ellipse 55% 50% at 50% 50%, transparent 40%, black 80%)" }}
        className="absolute inset-0 -top-[10%] -bottom-[10%] blur-md scale-[1.02]"
      >
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_60%]"
          sizes="100vw"
          aria-hidden="true"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,12,9,0.6)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-[#080c09]" />

      <MountainSVG />

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center pb-32 pt-16">
        {/* Badge */}
        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-300" />
          <span className="text-xs text-white/70 tracking-widest uppercase font-light">
            {t("badge")}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp(0.4)}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-white max-w-3xl leading-[1.08]"
        >
          {t("headlineStart")}{" "}
          <em className="italic text-green-300/80 not-italic font-light">
            {t("headlineEm")}
          </em>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp(0.6)}
          initial="hidden"
          animate="visible"
          className="mt-6 text-base md:text-lg text-white/50 max-w-md leading-relaxed font-light"
        >
          {t("sub")}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp(0.8)}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/products"
            className="px-8 py-3 rounded-full bg-white text-[#080c09] text-sm font-medium tracking-wide hover:bg-green-100 transition-colors duration-200 cursor-pointer"
          >
            {t("cta1")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
