import { logger } from "../utils/logger";
import { db, queryClient } from "./index";
import { migrate } from 'drizzle-orm/postgres-js/migrator';

async function migrateDB() {
  logger.info('MigrateDB started');

  await migrate(db, {
    migrationsFolder: "./migrations",
  });
  
  logger.info('MigrateDB completed');
  await queryClient.end();
}

migrateDB();
