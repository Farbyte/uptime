/** @format */

import { type Request, type Response } from "express";
import { db } from "../db/db";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

export const addMonitor = async (req: Request, res: Response) => {
	const { name, url, method, latency } = req.body;

	if (!name || !url || !latency) {
		return res.status(400).json({ error: "Invalid body" });
	}

	try {
		await db
			.insert(schema.monitors)
			.values({ name, url, method, latency });
		res.json({ message: "New monitor added" });
	} catch (error: any) {
		res.status(500).json({
			message: "Failed to save new monitor",
			error: error.message,
		});
	}
};

export const listMonitors = async (req: Request, res: Response) => {
	try {
		const result = await db.select().from(schema.monitors);
		res.json({ message: "Monitor list", results: result });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const editMonitor = async (req: Request, res: Response) => {
	const { name } = req.params;
	const { url, method, latency } = req.body;

	try {
		const result = await db
			.update(schema.monitors)
			.set({ url, method, latency })
			.where(eq(schema.monitors.name, name))
			.returning();

		if (result.length === 0) {
			return res.status(404).json({ error: "Document not found" });
		}

		res.json({ message: "Monitor changes saved", data: result[0] });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
