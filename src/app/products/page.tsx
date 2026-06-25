"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/products";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export default function ProductsPage() {
  const t = useTranslations("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .order("created_at")
      .then(({ data }) => {
        if (data) setProducts(data as Product[]);
        setLoading(false);
      });
  }, []);

  return (
    <main className="bg-[#080c09] min-h-screen">
      <Navbar />

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-14"
          >
            <p className="text-green-300/70 text-xs tracking-widest uppercase mb-3">
              {t("label")}
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
              {t("headline")}
            </h1>
            <p className="text-white/40 text-base font-light max-w-sm">
              {t("desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="origin-left h-px bg-white/5 mb-12"
          />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#0d150f] border border-white/5 rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-square bg-white/5" />
                  <div className="p-5 space-y-2">
                    <div className="h-4 bg-white/5 rounded w-3/4" />
                    <div className="h-4 bg-white/5 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
            >
              {products.map((product) => (
                <motion.div key={product.id} variants={card}>
                  <ProductCard
                    id={product.id}
                    slug={product.slug}
                    name={product.name}
                    price={product.price}
                    image_url={product.image_url}
                    tag={product.tag}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
