import type { Metadata } from "next";

export const SITE_TITLE = "Abhik C. Shil | Interactive Portfolio";
export const SITE_DESCRIPTION =
  "Interactive portfolio for Abhik C. Shil, showcasing software, hardware, music, and visual projects through a space-inspired project system.";
export const SITE_AUTHOR = "Abhik C. Shil";

export function getMetadataBase(): Metadata["metadataBase"] {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!rawSiteUrl) {
    return undefined;
  }

  const normalizedSiteUrl = rawSiteUrl.startsWith("http")
    ? rawSiteUrl
    : `https://${rawSiteUrl}`;

  try {
    return new URL(normalizedSiteUrl);
  } catch {
    return undefined;
  }
}

export function buildPageTitle(title: string) {
  return `${title} | Abhik C. Shil`;
}
