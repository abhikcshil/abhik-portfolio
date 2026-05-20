import Link from "next/link";
import { DomainForm } from "@/src/components/admin/DomainForm";
import { createDomainFormValues } from "@/src/lib/cms/domainForm";
import { getCmsDbDomains } from "@/src/lib/cms/dbDomains";
import { getDatabaseSetupErrorMessage } from "@/src/lib/db";

export default async function NewAdminDomainPage() {
  let databaseErrorMessage: string | null = null;

  try {
    await getCmsDbDomains();
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
          Cannot create domains yet
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

  return (
    <>
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
          Database-backed domain editor
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Create domain
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Create a new planet record in PostgreSQL. Public and enabled domains
          can appear on the homepage after save and revalidation.
        </p>
      </section>

      <DomainForm
        mode="create"
        cancelHref="/admin/domains"
        initialValues={createDomainFormValues()}
      />
    </>
  );
}
