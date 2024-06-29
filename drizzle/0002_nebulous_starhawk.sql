ALTER TABLE "stats" RENAME COLUMN "url" TO "stats_url";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'stats'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "stats" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "stats" ALTER COLUMN "stats_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "stats" ADD COLUMN "id" serial NOT NULL;