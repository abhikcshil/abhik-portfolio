import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { isAllowedGitHubAdmin } from "@/src/lib/cms/access";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, profile }) {
      const githubUsername =
        typeof profile?.login === "string"
          ? profile.login
          : typeof token.githubUsername === "string"
            ? token.githubUsername
            : undefined;

      token.githubUsername = githubUsername;
      token.isAdmin = isAllowedGitHubAdmin(githubUsername);

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.githubUsername =
          typeof token.githubUsername === "string"
            ? token.githubUsername
            : undefined;
        session.user.isAdmin = token.isAdmin === true;
      }

      return session;
    },
  },
});
