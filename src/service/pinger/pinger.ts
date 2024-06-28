/** @format */

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

const pinger = async (links: string[]) => {
	const stats = await Promise.all(
		links.map(async (link) => {
			const start = performance.now();
			try {
				const res = await fetch(link);
				const end = performance.now();
				return {
					url: link,
					status: res.status,
					latency: end - start,
				};
			} catch (error: any) {
				const end = performance.now();
				return {
					url: link,
					status: "error",
					latency: end - start,
					error: error.message,
				};
			}
		})
	);

	return stats;
};

export const pingingService = async (PORT: number) => {
	try {
		const res = await fetch(`http://localhost:${PORT}/api/monitor`, {
			method: "GET",
		});
		if (!res.ok) {
			throw new Error(`Failed to fetch monitor data: ${res.statusText}`);
		}
		const data = await res.json();
		const links = data.results.map((value: any) => value.url);

		const stats = await pinger(links);
		console.log(stats);
	} catch (error: any) {
		console.error(`Error in pingingService: ${error.message}`);
	}
};
