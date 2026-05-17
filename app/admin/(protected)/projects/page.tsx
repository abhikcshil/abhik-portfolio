import Link from "next/link";
import { AdminBadge } from "@/src/components/admin/AdminBadge";
import { AdminPreviewTable } from "@/src/components/admin/AdminPreviewTable";
import { getCmsDbDomains } from "@/src/lib/cms/dbDomains";
import { getCmsDbProjects } from "@/src/lib/cms/dbProjects";
import { getDatabaseSetupErrorMessage } from "@/src/lib/db";

type AdminProjectsPageProps = {
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function AdminProjectsPage({
  searchParams,
}: AdminProjectsPageProps) {
  const { saved } = await searchParams;
  let projects: Awaited<ReturnType<typeof getCmsDbProjects>> = [];
  let domainLabels = new Map<string, string>();
  let databaseErrorMessage: string | null = null;

  try {
    const [dbProjects, domains] = await Promise.all([
      getCmsDbProjects(),
      getCmsDbDomains(),
    ]);
    projects = dbProjects;
    domainLabels = new Map(domains.map((domain) => [domain.id, domain.label]));
  } catch (error) {
    databaseErrorMessage = getDatabaseSetupErrorMessage(error);
  }

  if (databaseErrorMessage) {
    return (
      <section className="rounded-[2rem] border border-rose-300/20 bg-rose-400/10 p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-rose-200">
          Admin-only database status
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Project CMS database unavailable
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-rose-100">
          {databaseErrorMessage}
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              Database-backed CMS
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Project records
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Create and edit project records in PostgreSQL that now power the
              public Portfolio, with static fallback protection if the database
              is unavailable.
            </p>
          </div>

          <Link
            href="/admin/projects/new"
            className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-400/10 px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/16"
          >
            New Project
          </Link>
        </div>

        {saved ? (
          <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
            Project {saved === "created" ? "created" : "updated"} in the CMS
            database.
          </div>
        ) : null}
      </section>

      {projects.length === 0 ? (
        <section className="rounded-[2rem] border border-amber-300/18 bg-amber-400/10 p-6 text-sm leading-7 text-amber-100">
          No project records were found in the CMS database yet. Run
          `npm run db:seed` to import the current static project data before
          editing, or start by creating a new project.
        </section>
      ) : (
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
                  <p className="mt-1 text-sm text-slate-300">
                    {project.tagline}
                  </p>
                </div>
              ),
            },
            {
              key: "slug",
              header: "Slug",
              render: (project) => (
                <span className="font-mono text-xs text-slate-300">
                  {project.slug}
                </span>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (project) => (
                <AdminBadge tone="slate">{project.status}</AdminBadge>
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
                      {domainLabels.get(placement.domainId) ?? placement.domainId}{" "}
                      #{placement.order}
                      {placement.featured ? " Featured" : ""}
                      {placement.labelOverride
                        ? ` - ${placement.labelOverride}`
                        : ""}
                    </span>
                  ))}
                </div>
              ),
            },
            {
              key: "edit",
              header: "Edit",
              render: (project) => (
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-100 transition hover:border-white/20 hover:bg-white/10"
                >
                  Edit
                </Link>
              ),
            },
          ]}
        />
      )}
    </>
  );
}
