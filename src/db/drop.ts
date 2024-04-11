import { sql } from "drizzle-orm";
import { logger } from "../utils/logger";
import { db, queryClient } from "./index";

async function dropDB() {
  logger.info('DropDB started');

  await db.execute(sql`DROP TABLE IF EXISTS drizzle.__drizzle_migrations;`);

  const query = sql<string>`SELECT table_name
                            FROM information_schema.tables
                            WHERE table_schema = 'public'
                            AND table_type = 'BASE TABLE';
                          `;

  const tables = await db.execute(query); // retrieve tables

  for (let table of tables) {
    const query = sql.raw(`DROP TABLE IF EXISTS ${table.table_name} CASCADE;`);
    await db.execute(query);
  }
  
  logger.info('DropDB completed');
  await queryClient.end();
}

dropDB();
