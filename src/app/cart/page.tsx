"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.25 } },
};

export default function CartPage() {
  const t = useTranslations("cart");
  const { items, total, removeFromCart, updateQuantity } = useCart();

  return (
    <main className="bg-[#080c09] min-h-screen">
      <Navbar />

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-green-300/70 text-xs tracking-widest uppercase mb-3">
              {t("label")}
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white">
              {t("title")}
            </h1>
          </motion.div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <svg width="28" height="28" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M2.5 2.5h1.75l2.25 9h7.75l2-6.5H6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/30"
                  />
                  <circle cx="8" cy="15.5" r="1" fill="currentColor" className="text-white/30" />
                  <circle cx="14" cy="15.5" r="1" fill="currentColor" className="text-white/30" />
                </svg>
              </div>
              <p className="text-white/40 text-base mb-2">{t("empty")}</p>
              <p className="text-white/20 text-sm mb-8">{t("emptySub")}</p>
              <Link
                href="/products"
                className="px-8 py-3 text-sm text-white rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-200 cursor-pointer"
              >
                {t("browse")}
              </Link>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-8">
              <div className="h-px bg-white/5" />

              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
              >
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      exit="exit"
                      layout
                      className="flex gap-5 py-6 border-b border-white/5 last:border-b-0"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0 bg-[#0d150f] rounded-xl overflow-hidden border border-white/5">
                        {item.image_url && (
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-contain p-3"
                            sizes="80px"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-white text-sm font-medium leading-snug">
                              {item.name}
                            </h3>
                            <p className="text-green-300 text-sm font-light mt-1">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/20 hover:text-white/60 transition-colors duration-200 cursor-pointer flex-shrink-0 mt-0.5"
                            aria-label={`Remove ${item.name}`}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M3 3l10 10M13 3L3 13"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="flex items-center gap-3 mt-4">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-white/30 hover:text-white transition-all duration-200 cursor-pointer text-base leading-none"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="text-white text-sm w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-white/30 hover:text-white transition-all duration-200 cursor-pointer text-base leading-none"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                          <span className="text-white/25 text-xs ml-2">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[#0d150f] border border-white/5 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm">{t("subtotal")}</span>
                  <span className="text-white text-sm">{formatPrice(total)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm">{t("shipping")}</span>
                  <span className="text-green-300 text-sm">
                    {total >= 200 ? t("shippingFree") : formatPrice(15)}
                  </span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{t("total")}</span>
                  <span className="text-white text-lg font-light">
                    {formatPrice(total >= 200 ? total : total + 15)}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="mt-2 w-full py-4 bg-white text-[#080c09] text-sm font-medium tracking-wide rounded-full hover:bg-green-100 transition-colors duration-200 cursor-pointer text-center"
                >
                  {t("checkout")}
                </Link>

                <Link
                  href="/products"
                  className="text-center text-xs text-white/30 hover:text-white/60 transition-colors duration-200 cursor-pointer"
                >
                  {t("continue")}
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
