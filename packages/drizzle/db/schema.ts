import {
  pgTable,
  unique,
  pgEnum,
  uuid,
  timestamp,
  text,
  foreignKey,
  bigint,
  date,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const keyStatus = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const keyType = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const factorType = pgEnum("factor_type", ["totp", "webauthn"]);
export const factorStatus = pgEnum("factor_status", ["unverified", "verified"]);
export const aalLevel = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);
export const userRoles = pgEnum("user_roles", [
  "SUPERADMIN",
  "ADMIN",
  "DISTRIBUTORS",
  "UNDEFINED",
]);
export const ordersStatus = pgEnum("orders_status", [
  "pending",
  "fulfilled",
  "cancelled",
]);
export const equalityOp = pgEnum("equality_op", [
  "eq",
  "neq",
  "lt",
  "lte",
  "gt",
  "gte",
  "in",
]);
export const action = pgEnum("action", [
  "INSERT",
  "UPDATE",
  "DELETE",
  "TRUNCATE",
  "ERROR",
]);

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
    username: text("username"),
    fullName: text("full_name"),
    email: text("email"),
    role: text("role"),
    userrole: userRoles("userrole").default("UNDEFINED"),
  },
  (table) => {
    return {
      profilesUsernameKey: unique("profiles_username_key").on(table.username),
    };
  }
);

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
    name: text("name").notNull(),
    price: text("price").notNull(),
    description: text("description"),
    imageUrl: text("imageURL"),
  },
  (table) => {
    return {
      productsNameUnique: unique("products_name_unique").on(table.name),
      productsImageUrlKey: unique("products_image URL_key").on(table.imageUrl),
    };
  }
);

export const cart = pgTable("cart", {
  userId: uuid("userId").references(() => profiles.id),
  productId: uuid("productId").references(() => products.id),
  quantity: bigint("quantity", { mode: "number" }).notNull(),
});

export const productBatches = pgTable("product_batches", {
  productId: uuid("product_id").references(() => products.id, {
    onUpdate: "cascade",
  }),
  batchNo: text("batchNo").primaryKey().notNull(),
  expiryDate: date("expiryDate"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  quantity: bigint("quantity", { mode: "number" }),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  userId: uuid("userId").references(() => profiles.id),
  productId: uuid("productId").references(() => products.id),
  quantity: bigint("quantity", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  status: ordersStatus("status").default("pending"),
});
