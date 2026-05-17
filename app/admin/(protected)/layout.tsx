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
      description="Read-only CMS previews, validation status, and private portfolio management foundations for the future GitHub-only dashboard."
    >
      {children}
    </AdminShell>
  );
}
