import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminAuthButton } from "@/src/components/admin/AdminAuthButton";
import {
  getAllowedAdminUsernames,
  isGitHubAuthConfigured,
  isAllowedGitHubAdmin,
} from "@/src/lib/cms/access";

export default async function AdminLoginPage() {
  const session = await auth();
  const username = session?.user?.githubUsername;

  if (session?.user && session.user.isAdmin) {
    redirect("/admin");
  }

  if (session?.user && isAllowedGitHubAdmin(username)) {
    redirect("/admin");
  }

  if (session?.user && !isAllowedGitHubAdmin(username)) {
    redirect("/admin/denied");
  }

  const isConfigured = isGitHubAuthConfigured();
  const allowlistCount = getAllowedAdminUsernames().length;

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#030407] px-6 py-16 text-slate-100">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
          Private Admin
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          Portfolio Admin Login
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
          Sign in with GitHub to access the protected admin foundation. Only
          GitHub usernames in the server-side allowlist can enter the dashboard.
        </p>

        <div className="mt-8 grid gap-4 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-300">GitHub OAuth status</span>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] ${
                isConfigured
                  ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-200"
                  : "border-amber-300/20 bg-amber-400/10 text-amber-200"
              }`}
            >
              {isConfigured ? "Configured" : "Missing Env"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-300">Allowlisted admins</span>
            <span className="text-sm font-medium text-slate-100">
              {allowlistCount}
            </span>
          </div>
        </div>

        {!isConfigured && (
          <p className="mt-6 rounded-2xl border border-amber-300/18 bg-amber-400/8 px-4 py-3 text-sm leading-6 text-amber-100">
            `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, and `AUTH_SECRET` still need
            to be set before GitHub sign-in will work outside the build step.
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <AdminAuthButton
            action="sign-in"
            callbackUrl="/admin"
            disabled={!isConfigured}
          />
        </div>
      </div>
    </main>
  );
}
