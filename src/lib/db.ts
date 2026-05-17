import "server-only";

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL is not configured for the admin CMS database.");
    this.name = "DatabaseNotConfiguredError";
  }
}

function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function isDatabaseConfigured() {
  return hasDatabaseUrl();
}

export function getDb() {
  if (!hasDatabaseUrl()) {
    return null;
  }

  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }

  return globalThis.prisma;
}

export function getDbOrThrow() {
  const db = getDb();

  if (!db) {
    throw new DatabaseNotConfiguredError();
  }

  return db;
}

export function getDatabaseSetupErrorMessage(error: unknown) {
  if (error instanceof DatabaseNotConfiguredError) {
    return "DATABASE_URL is missing. Add a PostgreSQL connection string before using the admin CMS database.";
  }

  return "The admin CMS database is not ready yet. Run `npm run db:push` and `npm run db:seed` after configuring PostgreSQL.";
}
