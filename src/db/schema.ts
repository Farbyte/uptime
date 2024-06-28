
import { pgTable, serial, text, doublePrecision, varchar, boolean, time } from "drizzle-orm/pg-core";

export const monitors = pgTable("monitors", {
  id: serial("id").primaryKey(),
  name: text('name').notNull(),
  url : text('url'),
  method : varchar('method',{length : 10}),
});


export const stats = pgTable('stats',{
  url : text('url').primaryKey(),
  latency : doublePrecision('latency').notNull(),
  status : boolean('status'),
  time: time('time1'),
})

