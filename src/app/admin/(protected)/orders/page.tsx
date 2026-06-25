"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Customer = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

type Order = {
  id: string;
  created_at: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  status: string;
};

const STATUS_OPTIONS = ["paid", "pending", "processing", "shipped", "delivered", "cancelled"];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  processing: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  shipped: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  delivered: "bg-[#86efac]/15 text-[#86efac] border-[#86efac]/20",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/20",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status } : o))
        );
      }
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-white">Orders</h1>
        <p className="text-sm text-white/40 mt-1">
          {orders.length} order{orders.length !== 1 ? "s" : ""}
        </p>
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
      ) : orders.length === 0 ? (
        <div className="text-center py-20 text-white/30 text-sm">
          No orders yet
        </div>
      ) : (
        <div className="rounded-xl border border-white/[0.06] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="text-left px-5 py-3.5 text-xs text-white/40 font-medium uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs text-white/40 font-medium uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs text-white/40 font-medium uppercase tracking-wider">
                    Items
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs text-white/40 font-medium uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs text-white/40 font-medium uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-150"
                  >
                    <td className="px-5 py-4 text-white/60 whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-white font-medium">
                        {order.customer?.firstName || order.customer?.lastName
                          ? `${order.customer.firstName ?? ""} ${order.customer.lastName ?? ""}`.trim()
                          : "—"}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">
                        {order.customer?.email ?? ""}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-white/60">
                      {Array.isArray(order.items)
                        ? order.items
                            .map((it) => `${it.name} ×${it.quantity}`)
                            .join(", ")
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-white font-medium whitespace-nowrap">
                      {order.total != null
                        ? `$${Number(order.total).toFixed(2)}`
                        : "—"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                            STATUS_COLORS[order.status] ??
                            "bg-white/10 text-white/60 border-white/10"
                          }`}
                        >
                          {order.status}
                        </span>
                        <select
                          disabled={updating === order.id}
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="bg-white/5 border border-white/10 text-white/70 text-xs rounded-md px-2 py-1.5 cursor-pointer hover:bg-white/8 transition-colors duration-150 focus:outline-none focus:border-[#86efac]/40 disabled:opacity-40"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s} className="bg-[#0d150f]">
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
