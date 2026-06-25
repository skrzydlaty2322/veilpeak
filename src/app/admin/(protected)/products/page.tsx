"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  tag: string;
  image_url: string;
  in_stock: boolean;
  created_at: string;
};

type ProductForm = Omit<Product, "id" | "created_at">;

const EMPTY_FORM: ProductForm = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  tag: "",
  image_url: "",
  in_stock: true,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function openAdd() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setModalOpen(true);
  }

  function openEdit(p: Product) {
    setEditTarget(p);
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      tag: p.tag,
      image_url: p.image_url,
      in_stock: p.in_stock,
    });
    setFormError("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditTarget(null);
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    setSaving(true);

    try {
      const url = editTarget
        ? `/api/admin/products/${editTarget.id}`
        : "/api/admin/products";
      const method = editTarget ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });

      if (!res.ok) {
        const err = await res.json();
        setFormError(err.error ?? "Failed to save");
        return;
      }

      const saved: Product = await res.json();

      if (editTarget) {
        setProducts((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
      } else {
        setProducts((prev) => [saved, ...prev]);
      }

      closeModal();
    } catch {
      setFormError("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Products</h1>
          <p className="text-sm text-white/40 mt-1">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#86efac] text-[#080c09] text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#86efac]/90 transition-colors duration-200 cursor-pointer"
        >
          <PlusIcon />
          Add product
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-xl bg-white/[0.03] animate-pulse border border-white/[0.05]"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-white/30 text-sm">
          No products yet
        </div>
      ) : (
        <div className="rounded-xl border border-white/[0.06] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="text-left px-5 py-3.5 text-xs text-white/40 font-medium uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs text-white/40 font-medium uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs text-white/40 font-medium uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs text-white/40 font-medium uppercase tracking-wider">
                    Tag
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs text-white/40 font-medium uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-150"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {product.image_url && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-9 h-9 rounded-lg object-cover bg-white/5"
                          />
                        )}
                        <span className="text-white font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-white/50 font-mono text-xs">
                      {product.slug}
                    </td>
                    <td className="px-5 py-4 text-white font-medium">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-5 py-4">
                      {product.tag && (
                        <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/8 text-white/60 border border-white/10">
                          {product.tag}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                          product.in_stock ? "text-[#86efac]" : "text-red-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            product.in_stock ? "bg-[#86efac]" : "bg-red-400"
                          }`}
                        />
                        {product.in_stock ? "In stock" : "Out of stock"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => openEdit(product)}
                          className="text-xs text-white/40 hover:text-white/80 px-2.5 py-1.5 rounded-md hover:bg-white/5 transition-colors duration-150 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={deleting === product.id}
                          className="text-xs text-red-400/60 hover:text-red-400 px-2.5 py-1.5 rounded-md hover:bg-red-500/5 transition-colors duration-150 cursor-pointer disabled:opacity-40"
                        >
                          {deleting === product.id ? "…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={closeModal}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" as const }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-lg bg-[#0d150f] border border-white/[0.08] rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-base font-semibold text-white">
                    {editTarget ? "Edit product" : "Add product"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-white/40 hover:text-white/70 transition-colors cursor-pointer p-1"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      label="Name"
                      value={form.name}
                      onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                      required
                    />
                    <Field
                      label="Slug"
                      value={form.slug}
                      onChange={(v) => setForm((f) => ({ ...f, slug: v }))}
                      required
                      mono
                    />
                  </div>

                  <Field
                    label="Description"
                    value={form.description}
                    onChange={(v) => setForm((f) => ({ ...f, description: v }))}
                    textarea
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      label="Price ($)"
                      value={String(form.price)}
                      onChange={(v) => setForm((f) => ({ ...f, price: Number(v) }))}
                      type="number"
                      required
                    />
                    <Field
                      label="Tag"
                      value={form.tag}
                      onChange={(v) => setForm((f) => ({ ...f, tag: v }))}
                    />
                  </div>

                  <Field
                    label="Image URL"
                    value={form.image_url}
                    onChange={(v) => setForm((f) => ({ ...f, image_url: v }))}
                  />

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.in_stock}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, in_stock: e.target.checked }))
                      }
                      className="w-4 h-4 rounded accent-[#86efac] cursor-pointer"
                    />
                    <span className="text-sm text-white/70">In stock</span>
                  </label>

                  {formError && (
                    <p className="text-red-400/90 text-xs">{formError}</p>
                  )}

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-xs text-white/50 hover:text-white/80 hover:bg-white/5 rounded-lg transition-colors duration-150 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-5 py-2 bg-[#86efac] text-[#080c09] text-xs font-semibold rounded-lg hover:bg-[#86efac]/90 transition-colors duration-150 cursor-pointer disabled:opacity-40"
                    >
                      {saving ? "Saving…" : editTarget ? "Save changes" : "Add product"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  mono,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  mono?: boolean;
  type?: string;
  required?: boolean;
}) {
  const base =
    "w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#86efac]/50 focus:ring-1 focus:ring-[#86efac]/20 transition-colors duration-150";

  return (
    <div>
      <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`${base} ${mono ? "font-mono text-xs" : ""}`}
        />
      )}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
