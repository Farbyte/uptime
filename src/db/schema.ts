/** @format */

import { pgTable, serial, text, doublePrecision, varchar, boolean, time, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Define the monitors table
export const monitors = pgTable('monitors', {
  name: text('name').primaryKey(),
  url: text('url').notNull(),
  method: varchar('method', { length: 10 }),
  requestTime: integer('requestTime').notNull(),
});

// Define the stats table
export const stats = pgTable('stats', {
  id: serial('id').primaryKey(),
  statsUrl: text('stats_url').notNull(),
  latency: doublePrecision('latency').notNull(),
  status: boolean('status'),
  time: time('time'),
});

// Define the relation from monitors to stats
export const monitorsRelations = relations(monitors, ({ many }) => ({
  stats: many(stats),
}));

// Define the relation from stats to monitors
export const statsRelations = relations(stats, ({ one }) => ({
  monitor: one(monitors, {
    fields: [stats.statsUrl],
    references: [monitors.url],
  }),
}));
