import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await cookies();
  const session = store.get("admin_session");

  if (!session || session.value !== "1") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#080c09] text-white">
      <AdminNav />
      <main className="pt-16 px-4 pb-12 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
