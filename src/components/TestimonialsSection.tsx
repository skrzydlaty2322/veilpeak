"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import WordReveal from "./WordReveal";

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.1L6 8.02 3.22 9.56l.53-3.1L1.5 4.27l3.11-.45L6 1z" />
  </svg>
);

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");

  const testimonials = [0, 1, 2].map((i) => ({
    quote: t(`quote${i}` as `quote${0 | 1 | 2}`),
    name: t(`name${i}` as `name${0 | 1 | 2}`),
    role: t(`role${i}` as `role${0 | 1 | 2}`),
    location: t(`location${i}` as `location${0 | 1 | 2}`),
  }));

  const trustStats = [0, 1, 2].map((i) => ({
    value: t(`stat${i}Value` as `stat${0 | 1 | 2}Value`),
    label: t(`stat${i}Label` as `stat${0 | 1 | 2}Label`),
  }));

  return (
    <section className="bg-[#080c09] py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        {/* Header — word-by-word reveal */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
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
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
            className="text-white/35 text-sm leading-relaxed font-light max-w-xs lg:max-w-72 lg:text-right"
          >
            {t("desc")}
          </motion.p>
        </div>

        {/* Cards — stagger from left */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="relative rounded-3xl bg-[#0d150f] border border-white/5 p-8 flex flex-col justify-between min-h-[300px] overflow-hidden"
            >
              {i === 0 && (
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_80%,rgba(134,239,172,0.05)_0%,transparent_60%)] pointer-events-none" />
              )}

              <div>
                <div className="flex gap-1 mb-6 text-green-300/60">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} />
                  ))}
                </div>

                <p className="text-[42px] leading-none text-white/8 font-light select-none mb-2 -mt-2">
                  &ldquo;
                </p>

                <p className="text-white/70 text-sm leading-relaxed font-light">
                  {item.quote}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-white text-sm font-light tracking-wide">{item.name}</p>
                <p className="text-white/30 text-xs tracking-widest uppercase mt-0.5 font-light">
                  {item.role} · {item.location}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 pt-10 border-t border-white/5"
        >
          {trustStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-light text-white tracking-tight">{stat.value}</p>
              <p className="text-[10px] text-white/25 tracking-widest uppercase mt-1 font-light">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
