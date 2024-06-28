CREATE TABLE IF NOT EXISTS "stats" (
	"url" text PRIMARY KEY NOT NULL,
	"latency" double precision NOT NULL,
	"status" boolean
);
--> statement-breakpoint
ALTER TABLE "monitors" ALTER COLUMN "url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "monitors" DROP COLUMN IF EXISTS "latency";