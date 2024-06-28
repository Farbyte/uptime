ALTER TABLE "authors" RENAME TO "monitors";--> statement-breakpoint
ALTER TABLE "monitors" RENAME COLUMN "bio" TO "url";--> statement-breakpoint
ALTER TABLE "monitors" RENAME COLUMN "created_at" TO "method";--> statement-breakpoint
ALTER TABLE "monitors" ALTER COLUMN "url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "monitors" ALTER COLUMN "method" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "monitors" ALTER COLUMN "method" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "monitors" ALTER COLUMN "method" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "monitors" ADD COLUMN "latency" double precision NOT NULL;