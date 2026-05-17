import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminAuthButton } from "@/src/components/admin/AdminAuthButton";

export default async function AdminDeniedPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  if (session.user.isAdmin) {
    redirect("/admin");
  }

  const username =
    session.user.githubUsername ?? session.user.name ?? session.user.email;

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#030407] px-6 py-16 text-slate-100">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.28em] text-rose-300">
          Access Denied
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          This GitHub account is not allowlisted
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
          You successfully authenticated with GitHub, but this account does not
          have permission to access the private admin area.
        </p>

        <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Current account
          </p>
          <p className="mt-2 text-lg font-medium text-slate-100">{username}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <AdminAuthButton action="sign-out" callbackUrl="/admin/login" />
        </div>
      </div>
    </main>
  );
}
