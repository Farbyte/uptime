
import { pgTable, serial, text, doublePrecision, varchar, boolean, time, integer } from "drizzle-orm/pg-core";

export const monitors = pgTable("monitors", {
  name: text('name').primaryKey(),
  url : text('url'),
  method : varchar('method',{length : 10}),
  requestTime : integer('requestTime').notNull(),
});


export const stats = pgTable('stats',{
  url : text('url').primaryKey(),
  latency : doublePrecision('latency').notNull(),
  status : boolean('status'),
  time: time('time'),
})

