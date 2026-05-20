import type { Metadata } from "next";
import { Exo_2, Space_Grotesk } from "next/font/google";
import { getMetadataBase, SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE } from "@/src/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: SITE_TITLE,
    template: "%s | Abhik C. Shil",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Abhik C. Shil Portfolio",
  authors: [{ name: SITE_AUTHOR }],
  creator: SITE_AUTHOR,
  publisher: SITE_AUTHOR,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: "Abhik C. Shil Portfolio",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${exo2.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
