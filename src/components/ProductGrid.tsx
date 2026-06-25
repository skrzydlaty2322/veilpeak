"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import ProductCard from "./ProductCard";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/products";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export default function ProductGrid() {
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
    <section id="collection" className="bg-[#080c09] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-green-300/70 text-xs tracking-widest uppercase mb-2">
              {t("label")}
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
              {t("headline")}
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm text-white/40 hover:text-white transition-colors duration-200 cursor-pointer self-start sm:self-auto"
          >
            {t("viewAll")}
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
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
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
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
  );
}
