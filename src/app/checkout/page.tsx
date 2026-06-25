"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white/50 text-xs tracking-wide uppercase">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className={`w-full bg-[#0d150f] border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none transition-all duration-200 focus:border-green-300/40 ${
          error ? "border-red-400/50" : "border-white/10"
        }`}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

const SpinnerIcon = () => (
  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const { items, total, count } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && count === 0) {
      router.replace("/cart");
    }
  }, [mounted, count, router]);

  const setField = (key: keyof FormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = t("required");
    if (!form.lastName.trim()) newErrors.lastName = t("required");
    if (!form.email.includes("@")) newErrors.email = t("validEmail");
    if (!form.address.trim()) newErrors.address = t("required");
    if (!form.city.trim()) newErrors.city = t("required");
    if (!form.postalCode.trim()) newErrors.postalCode = t("required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customer: form, total }),
      });

      await new Promise<void>((resolve) => setTimeout(resolve, 1500));

      const data: { id: string } = await res.json();
      router.push(`/order/${data.id}`);
    } catch {
      setLoading(false);
    }
  };

  const shipping = total >= 200 ? 0 : 15;
  const orderTotal = total + shipping;

  if (!mounted) return null;

  const SubmitButton = ({ className }: { className: string }) => (
    <button
      type="submit"
      form="checkout-form"
      disabled={loading}
      className={`${className} py-4 bg-white text-[#080c09] text-sm font-medium tracking-wide rounded-full hover:bg-green-100 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer items-center justify-center gap-2`}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <SpinnerIcon />
            {t("processing")}
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {t("placeOrder")}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );

  return (
    <main className="bg-[#080c09] min-h-screen">
      <Navbar />

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link
              href="/cart"
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors duration-200 cursor-pointer mb-6"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t("backToCart")}
            </Link>
            <p className="text-green-300/70 text-xs tracking-widest uppercase mb-3">
              {t("label")}
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white">
              {t("title")}
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-12">
            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              id="checkout-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-8"
            >
              <div className="bg-[#0d150f] border border-white/5 rounded-2xl p-6 flex flex-col gap-5">
                <h2 className="text-white text-sm font-medium tracking-wide uppercase text-white/40">
                  {t("personalDetails")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label={t("firstName")}
                    value={form.firstName}
                    onChange={setField("firstName")}
                    error={errors.firstName}
                    autoComplete="given-name"
                  />
                  <Field
                    label={t("lastName")}
                    value={form.lastName}
                    onChange={setField("lastName")}
                    error={errors.lastName}
                    autoComplete="family-name"
                  />
                </div>
                <Field
                  label={t("email")}
                  value={form.email}
                  onChange={setField("email")}
                  error={errors.email}
                  type="email"
                  autoComplete="email"
                />
              </div>

              <div className="bg-[#0d150f] border border-white/5 rounded-2xl p-6 flex flex-col gap-5">
                <h2 className="text-white text-sm font-medium tracking-wide uppercase text-white/40">
                  {t("deliveryAddress")}
                </h2>
                <Field
                  label={t("streetAddress")}
                  value={form.address}
                  onChange={setField("address")}
                  error={errors.address}
                  autoComplete="street-address"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label={t("city")}
                    value={form.city}
                    onChange={setField("city")}
                    error={errors.city}
                    autoComplete="address-level2"
                  />
                  <Field
                    label={t("postalCode")}
                    value={form.postalCode}
                    onChange={setField("postalCode")}
                    error={errors.postalCode}
                    autoComplete="postal-code"
                  />
                </div>
              </div>

              <SubmitButton className="lg:hidden w-full flex" />
            </motion.form>

            {/* Order summary */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <div className="bg-[#0d150f] border border-white/5 rounded-2xl p-6 flex flex-col gap-4 sticky top-24">
                <h2 className="text-white/40 text-xs font-medium tracking-widest uppercase">
                  {t("orderSummary")}
                </h2>

                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0 bg-[#141e16] rounded-lg overflow-hidden border border-white/5">
                        {item.image_url && (
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                            sizes="48px"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium truncate">{item.name}</p>
                        <p className="text-white/40 text-xs">×{item.quantity}</p>
                      </div>
                      <span className="text-white/60 text-xs flex-shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-white/5" />

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">{t("subtotal")}</span>
                    <span className="text-white">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">{t("shipping")}</span>
                    <span className={shipping === 0 ? "text-green-300" : "text-white"}>
                      {shipping === 0 ? t("shippingFree") : formatPrice(shipping)}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-white/5" />

                <div className="flex justify-between">
                  <span className="text-white font-medium">{t("total")}</span>
                  <span className="text-white text-lg font-light">{formatPrice(orderTotal)}</span>
                </div>

                <SubmitButton className="hidden lg:flex w-full" />

                <p className="text-white/20 text-xs text-center">{t("secure")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
