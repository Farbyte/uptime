/** @format */

import { type Request, type Response } from "express";
import { db } from "../db/db";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

export const addPingStat = async (req: Request, res: Response) => {
	const { stats_url, latency, status, time } = req.body;

	if (!stats_url || latency == null || status == null || !time) {
		return res.status(400).json({ error: "Invalid body" });
	}

	try {
		await db
			.insert(schema.stats)
			.values({ stats_url, latency, status, time });
		res.json({ message: "Ping stat added" });
	} catch (error: any) {
		res.status(500).json({
			message: "Failed to save ping stat",
			error: error.message,
		});
	}
};

export const listPingStats = async (req: Request, res: Response) => {
	try {
		const result = await db.select().from(schema.stats);
		res.json({ message: "Ping stats list", results: result });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const editPingStat = async (req: Request, res: Response) => {
	const { stats_url } = req.params;
	const { latency, status, time } = req.body;

	try {
		const result = await db
			.update(schema.stats)
			.set({ latency, status, time })
			.where(eq(schema.stats.stats_url, stats_url))
			.returning();

		if (result.length === 0) {
			return res.status(404).json({ error: "Document not found" });
		}

		res.json({ message: "Ping stat changes saved", data: result[0] });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
