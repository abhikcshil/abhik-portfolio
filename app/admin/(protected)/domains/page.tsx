import Link from "next/link";
import { AdminBadge } from "@/src/components/admin/AdminBadge";
import { AdminPreviewTable } from "@/src/components/admin/AdminPreviewTable";
import { getCmsDbDomains } from "@/src/lib/cms/dbDomains";
import { getCmsDbProjects } from "@/src/lib/cms/dbProjects";
import { getDatabaseSetupErrorMessage } from "@/src/lib/db";

type AdminDomainsPageProps = {
  searchParams: Promise<{
    saved?: string;
  }>;
};

function getVisibilityTone(visibility: string) {
  if (visibility === "public") {
    return "emerald" as const;
  }

  if (visibility === "archived") {
    return "rose" as const;
  }

  if (visibility === "draft") {
    return "slate" as const;
  }

  return "amber" as const;
}

export default async function AdminDomainsPage({
  searchParams,
}: AdminDomainsPageProps) {
  const { saved } = await searchParams;
  let domains: Awaited<ReturnType<typeof getCmsDbDomains>> = [];
  let projects: Awaited<ReturnType<typeof getCmsDbProjects>> = [];
  let databaseErrorMessage: string | null = null;

  try {
    [domains, projects] = await Promise.all([
      getCmsDbDomains(),
      getCmsDbProjects(),
    ]);
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
          Domain CMS database unavailable
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
              Domain records
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Create and edit planet records that control the public homepage,
              focused domain views, and domain route visibility.
            </p>
          </div>

          <Link
            href="/admin/domains/new"
            className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-400/10 px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/16"
          >
            New Domain
          </Link>
        </div>

        {saved ? (
          <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
            Domain {saved === "created" ? "created" : "updated"} in the CMS
            database.
          </div>
        ) : null}
      </section>

      {domains.length === 0 ? (
        <section className="rounded-[2rem] border border-amber-300/18 bg-amber-400/10 p-6 text-sm leading-7 text-amber-100">
          No domain records were found in the CMS database yet. Create your
          first domain to add a homepage planet.
        </section>
      ) : (
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
                  <p className="mt-1 text-sm text-slate-300">
                    {domain.description}
                  </p>
                </div>
              ),
            },
            {
              key: "slug",
              header: "Slug",
              render: (domain) => (
                <span className="font-mono text-xs text-slate-300">
                  {domain.slug}
                </span>
              ),
            },
            {
              key: "order",
              header: "Order",
              render: (domain) => domain.order,
            },
            {
              key: "visibility",
              header: "Visibility",
              render: (domain) => (
                <AdminBadge tone={getVisibilityTone(domain.visibility)}>
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
              key: "projects",
              header: "Projects",
              render: (domain) =>
                projects.filter((project) =>
                  project.domains.some((placement) => placement.domainId === domain.id)
                ).length,
            },
            {
              key: "route",
              header: "Public Route",
              render: (domain) =>
                domain.enabled && domain.visibility === "public" ? (
                  <Link
                    href={domain.href}
                    className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-emerald-100 transition hover:border-emerald-300/40 hover:bg-emerald-400/16"
                  >
                    Open Route
                  </Link>
                ) : (
                  <span className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Not public
                  </span>
                ),
            },
            {
              key: "edit",
              header: "Edit",
              render: (domain) => (
                <Link
                  href={`/admin/domains/${domain.id}/edit`}
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
