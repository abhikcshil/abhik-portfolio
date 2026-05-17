import { cmsConfig } from "@/src/config/cms";

function normalizeGitHubUsername(username: string) {
  return username.trim().toLowerCase();
}

export function getAllowedAdminUsernames(): string[] {
  const rawValue = process.env[cmsConfig.adminGitHubUsernamesEnv] ?? "";

  return rawValue
    .split(",")
    .map((value) => normalizeGitHubUsername(value))
    .filter(Boolean);
}

export function isAllowedGitHubAdmin(username?: string | null): boolean {
  if (!username) {
    return false;
  }

  return getAllowedAdminUsernames().includes(normalizeGitHubUsername(username));
}

export function isGitHubAuthConfigured(): boolean {
  return Boolean(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET);
}
