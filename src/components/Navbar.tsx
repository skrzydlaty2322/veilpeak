"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";
import LangSwitcher from "@/components/LangSwitcher";

const NAV_HREFS = [
  { key: "gear" as const, href: "/products" },
  { key: "expeditions" as const, href: "/expeditions" },
  { key: "stories" as const, href: "/stories" },
  { key: "about" as const, href: "/about" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const CartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2.5 2.5h1.75l2.25 9h7.75l2-6.5H6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="15.5" r="1" fill="currentColor" />
      <circle cx="14" cy="15.5" r="1" fill="currentColor" />
    </svg>
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080c09]/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
          <svg
            width="24"
            height="20"
            viewBox="0 0 24 20"
            fill="none"
            className="text-green-300 group-hover:text-white transition-colors duration-200"
          >
            <path d="M12 2L22 18H2L12 2Z" fill="currentColor" fillOpacity="0.9" />
            <path d="M6 18L12 8L18 18" fill="#080c09" fillOpacity="0.4" />
          </svg>
          <span className="text-white font-light tracking-[0.28em] text-sm uppercase">
            VEILPEAK
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_HREFS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="text-white/60 hover:text-white text-sm tracking-wide transition-colors duration-200 cursor-pointer"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Desktop right: lang + cart + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <LangSwitcher />

          <Link
            href="/cart"
            className="relative p-2 text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label="Cart"
          >
            <CartIcon />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-300 text-[#080c09] text-[10px] font-medium flex items-center justify-center leading-none"
                >
                  {count > 9 ? "9+" : count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <Link
            href="/products"
            className="px-5 py-1.5 text-sm text-white rounded-full border border-white/25 hover:bg-white/10 hover:border-white/40 transition-all duration-200 cursor-pointer"
          >
            {t("shop")}
          </Link>
        </div>

        {/* Mobile right: lang + cart + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <LangSwitcher />

          <Link
            href="/cart"
            className="relative p-1.5 text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label="Cart"
          >
            <CartIcon />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-300 text-[#080c09] text-[10px] font-medium flex items-center justify-center leading-none"
                >
                  {count > 9 ? "9+" : count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white origin-center transition-all"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-white"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white origin-center transition-all"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" as const }}
            className="md:hidden bg-[#080c09]/95 backdrop-blur-lg border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_HREFS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/70 hover:text-white text-base tracking-wide transition-colors duration-200 cursor-pointer"
                >
                  {t(key)}
                </Link>
              ))}
              <Link
                href="/products"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-5 py-2.5 text-sm text-center text-white rounded-full border border-white/25 hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                {t("shop")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
