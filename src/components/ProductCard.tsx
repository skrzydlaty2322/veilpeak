"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  image_url: string | null;
  tag?: string | null;
}

export default function ProductCard({
  id,
  slug,
  name,
  price,
  image_url,
  tag,
}: ProductCardProps) {
  const t = useTranslations("product");
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, slug, name, price, image_url });
  };

  const getTagLabel = (raw: string) => {
    const lower = raw.toLowerCase();
    if (lower === "bestseller") return t("tagBestseller");
    if (lower === "new") return t("tagNew");
    return raw;
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.025, boxShadow: "0 0 0 1px rgba(134,239,172,0.12), 0 8px 40px rgba(134,239,172,0.08)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex flex-col bg-[#0d150f] border border-white/5 rounded-2xl overflow-hidden cursor-pointer"
    >
      <Link
        href={`/products/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${name}`}
      />

      <div className="relative aspect-square bg-[#141e16] overflow-hidden">
        {image_url && (
          <Image
            src={image_url}
            alt={name}
            fill
            className="object-contain object-center p-8 transition-transform duration-500 group-hover:scale-[1.08]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
        {tag && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-green-300/10 border border-green-300/20 text-green-300 text-xs tracking-widest uppercase">
            {getTagLabel(tag)}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between p-5 pt-4">
        <div>
          <h3 className="text-white text-sm font-medium leading-snug">{name}</h3>
          <p className="text-green-300 text-sm font-light mt-0.5">
            {formatPrice(price)}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className="relative z-20 px-4 py-2 text-xs text-white/60 rounded-full border border-white/10 hover:border-white/30 hover:text-white transition-all duration-200 cursor-pointer"
          aria-label={`Add ${name} to cart`}
        >
          {t("addToCart")}
        </button>
      </div>
    </motion.div>
  );
}
