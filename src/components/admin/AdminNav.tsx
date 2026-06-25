"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#080c09]/90 backdrop-blur-md h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/admin/orders" className="flex items-center gap-2.5 cursor-pointer">
          <span className="text-[#86efac] text-[10px] tracking-[0.3em] uppercase font-medium">
            Veilpeak
          </span>
          <span className="text-white/20 text-xs">/</span>
          <span className="text-white/40 text-xs tracking-wider uppercase">Admin</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          <NavLink href="/admin/orders" active={pathname.startsWith("/admin/orders")}>
            Orders
          </NavLink>
          <NavLink href="/admin/products" active={pathname.startsWith("/admin/products")}>
            Products
          </NavLink>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-xs text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer px-3 py-2 rounded-md hover:bg-white/5"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer ${
        active
          ? "bg-white/8 text-white"
          : "text-white/50 hover:text-white/80 hover:bg-white/5"
      }`}
    >
      {children}
    </Link>
  );
}
