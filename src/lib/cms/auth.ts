import "server-only";

import type { Session } from "next-auth";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAllowedAdminUsernames, isAllowedGitHubAdmin } from "./access";

export async function getAdminSession(): Promise<Session | null> {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return session;
}

export async function requireAdmin(): Promise<Session> {
  const session = await getAdminSession();

  if (!session?.user) {
    redirect("/admin/login");
  }

  if (!session.user.isAdmin) {
    redirect("/admin/denied");
  }

  return session;
}

export { getAllowedAdminUsernames, isAllowedGitHubAdmin };
