import { AdminBadge } from "@/src/components/admin/AdminBadge";
import { AdminPreviewTable } from "@/src/components/admin/AdminPreviewTable";
import { getCmsDomains, getCmsProjects } from "@/src/lib/portfolio";

export default function AdminDomainsPage() {
  const domains = getCmsDomains();
  const projects = getCmsProjects();

  return (
    <AdminPreviewTable
      caption="Domains"
      rows={domains}
      columns={[
        {
          key: "label",
          header: "Label",
          render: (domain) => (
            <div>
              <p className="font-medium text-white">{domain.label}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                {domain.shortLabel ?? "No short label"}
              </p>
            </div>
          ),
        },
        {
          key: "slug",
          header: "Slug",
          render: (domain) => (
            <span className="font-mono text-xs text-slate-300">{domain.slug}</span>
          ),
        },
        {
          key: "visibility",
          header: "Visibility",
          render: (domain) => (
            <AdminBadge
              tone={domain.visibility === "public" ? "emerald" : "amber"}
            >
              {domain.visibility}
            </AdminBadge>
          ),
        },
        {
          key: "enabled",
          header: "Enabled",
          render: (domain) => (
            <AdminBadge tone={domain.enabled ? "cyan" : "rose"}>
              {domain.enabled ? "Enabled" : "Disabled"}
            </AdminBadge>
          ),
        },
        {
          key: "order",
          header: "Order",
          render: (domain) => domain.order,
        },
        {
          key: "projects",
          header: "Projects",
          render: (domain) =>
            projects.filter((project) =>
              project.domains.some((placement) => placement.domainId === domain.id)
            ).length,
        },
      ]}
    />
  );
}
