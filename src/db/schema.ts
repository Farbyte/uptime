/** @format */

import { relations } from "drizzle-orm";
import {
	pgTable,
	serial,
	text,
	doublePrecision,
	varchar,
	boolean,
	time,
	integer,
} from "drizzle-orm/pg-core";

export const monitors = pgTable("monitors", {
	name: text("name").primaryKey(),
	url: text("url"),
	method: varchar("method", { length: 10 }),
	requestTime: integer("requestTime").notNull(),
});

export const stats = pgTable("stats", {
	id: serial("id").primaryKey(),
	stats_url: text("stats_url"), 
	latency: doublePrecision("latency").notNull(),
	status: boolean("status"),
	time: time("time"),
});

//----------------------------- Not tested yet --------------------------------//
export const monitorRelations = relations(monitors, ({ one }) => ({
	stats: one(stats, { 
		fields: [monitors.url],
		references: [stats.stats_url],
	}),
}));
