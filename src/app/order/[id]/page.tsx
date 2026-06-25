"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/products";

interface CartItemData {
  id: string;
  slug: string;
  name: string;
  price: number;
  image_url: string | null;
  quantity: number;
}

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

interface Order {
  id: string;
  status: string;
  items: CartItemData[];
  total: number;
  customer: CustomerData;
  created_at: string;
}

export default function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = useTranslations("order");
  const { id } = use(params);
  const { clearCart } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearCart();
    supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) setOrder(data as Order);
        setLoading(false);
      });
  }, [id, clearCart]);

  return (
    <main className="bg-[#080c09] min-h-screen">
      <Navbar />

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center py-24 gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-green-300/30 border-t-green-300 animate-spin" />
              <p className="text-white/30 text-sm">{t("loading")}</p>
            </div>
          ) : !order ? (
            <div className="text-center py-24">
              <p className="text-white/40 mb-6">{t("notFound")}</p>
              <Link href="/products" className="text-green-300 text-sm hover:underline">
                {t("backToShop")}
              </Link>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-8"
            >
              {/* Success header */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  className="w-16 h-16 rounded-full bg-green-300/15 border border-green-300/30 flex items-center justify-center mx-auto mb-6"
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path
                      d="M5 14l7 7L23 8"
                      stroke="#86efac"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <p className="text-green-300/70 text-xs tracking-widest uppercase mb-3">
                    {t("confirmedLabel")}
                  </p>
                  <h1 className="text-4xl font-light tracking-tight text-white mb-3">
                    {t("thankYou")}
                  </h1>
                  <p className="text-white/40 text-sm">
                    Order{" "}
                    <span className="text-white/60 font-mono">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </span>{" "}
                    {t("orderPlaced")}
                  </p>
                </motion.div>
              </div>

              {/* Order details */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="bg-[#0d150f] border border-white/5 rounded-2xl overflow-hidden"
              >
                <div className="p-6 flex flex-col gap-4">
                  <h2 className="text-white/40 text-xs tracking-widest uppercase font-medium">
                    {t("itemsOrdered")}
                  </h2>
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative w-14 h-14 flex-shrink-0 bg-[#141e16] rounded-xl overflow-hidden border border-white/5">
                        {item.image_url && (
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-contain p-2.5"
                            sizes="56px"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{item.name}</p>
                        <p className="text-white/40 text-xs mt-0.5">
                          {formatPrice(item.price)} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-white/60 text-sm flex-shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-white/5" />

                <div className="px-6 py-4 flex justify-between items-center">
                  <span className="text-white/40 text-sm">{t("totalPaid")}</span>
                  <span className="text-green-300 text-lg font-light">
                    {formatPrice(order.total)}
                  </span>
                </div>

                <div className="h-px bg-white/5" />

                <div className="p-6 flex flex-col gap-2">
                  <h2 className="text-white/40 text-xs tracking-widest uppercase font-medium mb-2">
                    {t("deliveryTo")}
                  </h2>
                  <p className="text-white text-sm">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p className="text-white/50 text-sm">{order.customer.address}</p>
                  <p className="text-white/50 text-sm">
                    {order.customer.postalCode} {order.customer.city}
                  </p>
                  <p className="text-white/30 text-sm">{order.customer.email}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex justify-center"
              >
                <Link
                  href="/products"
                  className="px-8 py-3.5 text-sm text-white rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-200 cursor-pointer"
                >
                  {t("backToShop")}
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
