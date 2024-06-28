
import { pgTable, serial, text, doublePrecision, varchar } from "drizzle-orm/pg-core";

export const monitors = pgTable("monitors", {
  id: serial("id").primaryKey(),
  name: text('name').notNull(),
  url : text('url').notNull(),
  method : varchar('method',{length : 10}),
  latency : doublePrecision('latency').notNull()
});

