import 'dotenv/config'
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from 'postgres';

export const queryClient = postgres(process.env.DATABASE_CONNECTION || '', { ssl: true });

export const db = drizzle(queryClient, { logger: true });
