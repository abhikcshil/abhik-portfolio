import { AdminBadge } from "@/src/components/admin/AdminBadge";
import { AdminPreviewTable } from "@/src/components/admin/AdminPreviewTable";
import { getCmsProjects, getProjectDisplayTitle } from "@/src/lib/portfolio";

export default function AdminProjectsPage() {
  const projects = getCmsProjects();

  return (
    <AdminPreviewTable
      caption="Projects"
      rows={projects}
      columns={[
        {
          key: "title",
          header: "Title",
          render: (project) => (
            <div>
              <p className="font-medium text-white">{project.title}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                {project.shortTitle ?? "No short title"}
              </p>
            </div>
          ),
        },
        {
          key: "slug",
          header: "Slug",
          render: (project) => (
            <span className="font-mono text-xs text-slate-300">{project.slug}</span>
          ),
        },
        {
          key: "visibility",
          header: "Visibility",
          render: (project) => (
            <AdminBadge
              tone={project.visibility === "public" ? "emerald" : "amber"}
            >
              {project.visibility}
            </AdminBadge>
          ),
        },
        {
          key: "status",
          header: "Status",
          render: (project) => <AdminBadge tone="slate">{project.status}</AdminBadge>,
        },
        {
          key: "enabled",
          header: "Enabled",
          render: (project) => (
            <AdminBadge tone={project.enabled ? "cyan" : "rose"}>
              {project.enabled ? "Enabled" : "Disabled"}
            </AdminBadge>
          ),
        },
        {
          key: "placements",
          header: "Placements",
          render: (project) => (
            <div className="flex flex-wrap gap-2">
              {project.domains.map((placement) => (
                <span
                  key={`${project.id}:${placement.domainId}`}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.14em] text-slate-200"
                >
                  {placement.domainId} #{placement.order}
                  {placement.labelOverride
                    ? ` - ${getProjectDisplayTitle(project, placement.domainId)}`
                    : ""}
                </span>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}
