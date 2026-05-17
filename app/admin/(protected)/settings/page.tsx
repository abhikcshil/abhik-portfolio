import { cmsConfig } from "@/src/config/cms";
import { getAllowedAdminUsernames, isGitHubAuthConfigured } from "@/src/lib/cms/access";

export default function AdminSettingsPage() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
        Settings
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Auth foundation status
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Auth provider
          </p>
          <p className="mt-2 text-sm font-medium text-slate-100">
            {cmsConfig.authProvider}
          </p>
        </article>
        <article className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            OAuth env
          </p>
          <p className="mt-2 text-sm font-medium text-slate-100">
            {isGitHubAuthConfigured() ? "Configured" : "Missing"}
          </p>
        </article>
        <article className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Allowlisted admins
          </p>
          <p className="mt-2 text-sm font-medium text-slate-100">
            {getAllowedAdminUsernames().length}
          </p>
        </article>
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-300">
        Editing controls, publishing workflows, and database writes will arrive
        in later phases. This stage only establishes protected GitHub-only admin
        access and read-only CMS previews.
      </p>
    </section>
  );
}
