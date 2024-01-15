import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString:
      "postgres://postgres.krtkfjphiovnpjawcxwo:NOfFrCfrZwQ05Ulr@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
  },
} satisfies Config;
