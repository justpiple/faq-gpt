import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';

// Create the Prisma adapter for better-sqlite3 by passing the config object
// The config object must contain the `url` property as required by Prisma 7.
const adapter = new PrismaBetterSqlite3({ url: databaseUrl });

// Instantiate PrismaClient using the adapter
const prisma = new PrismaClient({ adapter });

export default prisma;
