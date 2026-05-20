import Link from "next/link";
import { DomainForm } from "@/src/components/admin/DomainForm";
import {
  createDomainFormValues,
} from "@/src/lib/cms/domainForm";
import {
  getCmsDbDomainById,
  getCmsDbDomains,
} from "@/src/lib/cms/dbDomains";
import { getDatabaseSetupErrorMessage } from "@/src/lib/db";

type EditAdminDomainPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAdminDomainPage({
  params,
}: EditAdminDomainPageProps) {
  const { id } = await params;
  let domain: Awaited<ReturnType<typeof getCmsDbDomainById>> = null;
  let databaseErrorMessage: string | null = null;

  try {
    await getCmsDbDomains();
    domain = await getCmsDbDomainById(id);
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
          Cannot load the domain editor
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-rose-100">
          {databaseErrorMessage}
        </p>
        <Link
          href="/admin/domains"
          className="mt-5 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] text-slate-100 transition hover:border-white/20 hover:bg-white/10"
        >
          Back to Domains
        </Link>
      </section>
    );
  }

  if (!domain) {
    return (
      <section className="rounded-[2rem] border border-amber-300/18 bg-amber-400/10 p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-amber-200">
          Database-backed domain editor
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Domain not found
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-amber-100">
          No CMS domain record matched the id <span className="font-mono">{id}</span>.
        </p>
        <Link
          href="/admin/domains"
          className="mt-5 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] text-slate-100 transition hover:border-white/20 hover:bg-white/10"
        >
          Back to Domains
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
          Database-backed domain editor
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Edit {domain.label}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Save updates to the PostgreSQL-backed planet record. Public homepage
          planets now reflect domain changes after revalidation.
        </p>
      </section>

      <DomainForm
        mode="edit"
        cancelHref="/admin/domains"
        initialValues={createDomainFormValues(domain)}
      />
    </>
  );
}
