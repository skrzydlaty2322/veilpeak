"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { formatPrice, type Product } from "@/lib/products";

const SAVINGS: Record<string, string> = {
  "summit-shell-set": "Save €125",
};

const SPECS: Record<string, string[]> = {
  "summit-shell-jacket": ["GORE-TEX Pro", "3-layer", "Fully taped"],
  "alpine-hardshell-trousers": ["2.5-layer", "Side zips", "Crampon-ready"],
  "expedition-pack-45l": ["45L capacity", "Framesheet", "Ice axe loop"],
  "summit-shell-set": ["GORE-TEX Pro", "3-layer", "−40°C rated"],
};

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const t = useTranslations("product");
  const { addToCart } = useCart();
  const saving = SAVINGS[product.slug];
  const specs = SPECS[product.slug] ?? ["Technical fabric", "Alpine rated", "Seam-sealed"];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    });
  };

  const getTagLabel = (raw: string) => {
    const lower = raw.toLowerCase();
    if (lower === "bestseller") return t("tagBestseller");
    if (lower === "new") return t("tagNew");
    return raw;
  };

  return (
    <main className="bg-[#080c09] min-h-screen">
      <Navbar />

      <section className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M9 11L5 7l4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t("allProducts")}
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="relative aspect-square bg-[#141e16] rounded-2xl overflow-hidden"
            >
              {product.image_url && (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain object-center p-12"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
              {product.tag && (
                <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-green-300/10 border border-green-300/20 text-green-300 text-xs tracking-widest uppercase">
                  {getTagLabel(product.tag)}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
              className="flex flex-col justify-center pt-2 lg:pt-10"
            >
              <p className="text-green-300/70 text-xs tracking-widest uppercase mb-3">
                Veilpeak AW25
              </p>

              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4 leading-[1.08]">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-8">
                <p className="text-3xl text-green-300 font-light">
                  {formatPrice(product.price)}
                </p>
                {saving && (
                  <span className="px-2.5 py-1 rounded-full bg-green-300/10 border border-green-300/20 text-green-300 text-xs tracking-widest uppercase">
                    {saving}
                  </span>
                )}
              </div>

              <div className="h-px bg-white/5 mb-8" />

              <p className="text-white/50 text-base font-light leading-relaxed mb-10">
                {product.description ?? t("defaultDesc")}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {specs.map((spec) => (
                  <span
                    key={spec}
                    className="px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs tracking-wide"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto px-10 py-4 bg-white text-[#080c09] text-sm font-medium tracking-wide rounded-full hover:bg-green-100 transition-colors duration-200 cursor-pointer"
                aria-label={`Add ${product.name} to cart`}
              >
                {t("addToCart")}
              </button>

              <p className="mt-4 text-white/25 text-xs">
                {t("freeShipping")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
