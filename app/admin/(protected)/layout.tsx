import { AdminShell } from "@/src/components/admin/AdminShell";
import { requireAdmin } from "@/src/lib/cms/auth";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <AdminShell
      session={session}
      title="Portfolio Admin"
      description="Private GitHub-only CMS tools for validation, database-backed project editing, and future portfolio publishing workflows."
    >
      {children}
    </AdminShell>
  );
}
