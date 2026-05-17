import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user?: {
      githubUsername?: string;
      isAdmin: boolean;
    } & NonNullable<Session["user"]>;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    githubUsername?: string;
    isAdmin?: boolean;
  }
}
