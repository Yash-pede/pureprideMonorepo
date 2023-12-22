import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = "postgresql://postgres:NOfFrCfrZwQ05Ulr@db.krtkfjphiovnpjawcxwo.supabase.co:5432/postgres";
const client = postgres(connectionString);
export const db = drizzle(client);