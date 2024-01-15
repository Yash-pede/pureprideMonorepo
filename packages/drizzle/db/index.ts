import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString =
  "postgres://postgres.krtkfjphiovnpjawcxwo:NOfFrCfrZwQ05Ulr@aws-0-ap-south-1.pooler.supabase.com:6543/postgres";
const client = postgres(connectionString);
export const db = drizzle(client);
