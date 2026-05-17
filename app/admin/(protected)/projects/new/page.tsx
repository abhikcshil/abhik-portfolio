import Link from "next/link";
import { ProjectForm } from "@/src/components/admin/ProjectForm";
import { getCmsDbDomains } from "@/src/lib/cms/dbDomains";
import { createProjectFormValues } from "@/src/lib/cms/projectForm";
import { getDatabaseSetupErrorMessage } from "@/src/lib/db";

export default async function NewAdminProjectPage() {
  let domains: Awaited<ReturnType<typeof getCmsDbDomains>> = [];
  let databaseErrorMessage: string | null = null;

  try {
    domains = await getCmsDbDomains();
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
          Cannot create projects yet
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-rose-100">
          {databaseErrorMessage}
        </p>
        <Link
          href="/admin/projects"
          className="mt-5 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] text-slate-100 transition hover:border-white/20 hover:bg-white/10"
        >
          Back to Projects
        </Link>
      </section>
    );
  }

  if (domains.length === 0) {
    return (
      <section className="rounded-[2rem] border border-amber-300/18 bg-amber-400/10 p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-amber-200">
          Database-backed project editor
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Seed domains before creating projects
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-amber-100">
          The CMS database does not have any domain records yet. Run
          `npm run db:seed` so project placements have valid domains to target.
        </p>
        <Link
          href="/admin/projects"
          className="mt-5 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] text-slate-100 transition hover:border-white/20 hover:bg-white/10"
        >
          Back to Projects
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
          Database-backed project editor
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Create project
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          This creates a new admin CMS record in PostgreSQL. The public
          Portfolio still renders from static data during this milestone, so new
          records stay admin-only until public DB reads are enabled.
        </p>
      </section>

      <ProjectForm
        mode="create"
        cancelHref="/admin/projects"
        domains={domains}
        initialValues={createProjectFormValues()}
      />
    </>
  );
}
