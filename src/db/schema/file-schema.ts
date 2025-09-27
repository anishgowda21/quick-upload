import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";

export const file = sqliteTable("file", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  hash: text("hash").notNull(),
  lastModified: integer("last_modified", { mode: "timestamp" }),
  size: integer("size").notNull(),
  type: text("type").notNull(),
  url: text("url").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$onUpdate(() => new Date())
    .notNull(),
});
