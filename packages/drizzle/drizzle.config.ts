import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString:
      "postgresql://postgres:NOfFrCfrZwQ05Ulr@db.krtkfjphiovnpjawcxwo.supabase.co:5432/postgres",
  },
} satisfies Config;
