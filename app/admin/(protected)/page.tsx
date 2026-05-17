import Link from "next/link";
import { getCmsDbDomains } from "@/src/lib/cms/dbDomains";
import { getCmsDbProjects } from "@/src/lib/cms/dbProjects";
import {
  getDatabaseSetupErrorMessage,
  isDatabaseConfigured,
} from "@/src/lib/db";
import {
  getCmsDomains,
  getCmsProjects,
  validatePortfolioData,
} from "@/src/lib/portfolio";
import {
  getPublicDomainsCached,
  getPublicProjectsCached,
} from "@/src/lib/portfolio/publicData";

const quickLinks = [
  {
    href: "/admin/domains",
    title: "Domains",
    description: "Review all planets, visibility states, ordering, and labels.",
  },
  {
    href: "/admin/projects",
    title: "Projects",
    description:
      "Edit database-backed project records that now power the public Portfolio.",
  },
  {
    href: "/admin/content",
    title: "Content",
    description: "Placeholder for future project page editing and content sections.",
  },
  {
    href: "/admin/settings",
    title: "Settings",
    description: "Placeholder for future CMS configuration and publishing controls.",
  },
];

export default async function AdminDashboardPage() {
  const validation = validatePortfolioData();
  const cmsDomains = getCmsDomains();
  const cmsProjects = getCmsProjects();
  const [publicDomains, publicProjects] = await Promise.all([
    getPublicDomainsCached(),
    getPublicProjectsCached(),
  ]);
  let dbStatusMessage =
    "DATABASE_URL is not configured yet. Add PostgreSQL before using the editable project CMS.";
  let dbDomainCount: number | null = null;
  let dbProjectCount: number | null = null;

  if (isDatabaseConfigured()) {
    try {
      const [dbDomains, dbProjects] = await Promise.all([
        getCmsDbDomains(),
        getCmsDbProjects(),
      ]);
      dbDomainCount = dbDomains.length;
      dbProjectCount = dbProjects.length;
      dbStatusMessage =
        "Database-backed admin project editing is available, and public Portfolio pages now read from the database with static fallback protection.";
    } catch (error) {
      dbStatusMessage = getDatabaseSetupErrorMessage(error);
    }
  }

  return (
    <>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Public domains
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {publicDomains.length}
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            CMS domains
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {cmsDomains.length}
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Public projects
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {publicProjects.length}
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            CMS projects
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {cmsProjects.length}
          </p>
        </article>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              Validation
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Portfolio data status
            </h2>
          </div>
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] ${
              validation.valid
                ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-200"
                : "border-rose-300/20 bg-rose-400/10 text-rose-200"
            }`}
          >
            {validation.valid
              ? "Valid"
              : `${validation.issues.length} issue${validation.issues.length === 1 ? "" : "s"}`}
          </span>
        </div>

        <div className="mt-5 grid gap-3">
          {validation.issues.length === 0 ? (
            <p className="rounded-2xl border border-emerald-300/18 bg-emerald-400/8 px-4 py-3 text-sm text-emerald-100">
              No validation issues detected in the current static portfolio data.
            </p>
          ) : (
            validation.issues.slice(0, 6).map((issue, index) => (
              <div
                key={`${issue.itemId ?? "issue"}:${index}`}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200"
              >
                <span className="font-medium text-white">{issue.level}:</span>{" "}
                {issue.message}
              </div>
            ))
          )}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            CMS database
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Admin editing status
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            {dbStatusMessage}
          </p>
          <p className="mt-5 rounded-2xl border border-cyan-300/14 bg-cyan-400/8 px-4 py-3 text-sm text-cyan-100">
            Public Portfolio routes now prefer database-backed public content and
            fall back to the static portfolio data layer if the database is
            unavailable.
          </p>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            DB counts
          </p>
          <div className="mt-5 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Domains
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {dbDomainCount ?? "Unavailable"}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Projects
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {dbProjectCount ?? "Unavailable"}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 transition hover:border-white/16 hover:bg-white/7"
          >
            <h2 className="text-lg font-semibold text-white">{link.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {link.description}
            </p>
          </Link>
        ))}
      </section>
    </>
  );
}
