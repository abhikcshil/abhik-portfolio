import Link from "next/link";
import type { Session } from "next-auth";
import { AdminAuthButton } from "./AdminAuthButton";

type AdminShellProps = {
  session: Session;
  title: string;
  description: string;
  children: React.ReactNode;
};

const adminNavLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/domains", label: "Domains" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({
  session,
  title,
  description,
  children,
}: AdminShellProps) {
  const username =
    session.user?.githubUsername ?? session.user?.name ?? session.user?.email;

  return (
    <div className="min-h-dvh bg-[#030407] text-slate-100">
      <div className="mx-auto flex min-h-dvh w-full max-w-7xl gap-6 px-6 py-8 lg:px-8">
        <aside className="hidden w-64 shrink-0 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm lg:block">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
            Portfolio Admin
          </p>
          <nav className="mt-6 flex flex-col gap-2">
            {adminNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-transparent px-4 py-3 text-sm text-slate-200 transition hover:border-white/10 hover:bg-white/6"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  GitHub-only access
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {title}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                  {description}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Signed in
                </p>
                <p className="mt-2 font-medium text-slate-100">{username}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-emerald-300">
                  Allowlisted Admin
                </p>
                <div className="mt-4">
                  <AdminAuthButton action="sign-out" />
                </div>
              </div>
            </div>
          </header>

          <div className="mt-6 grid gap-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
