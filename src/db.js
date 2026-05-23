import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

let databaseUrl = process.env.DATABASE_URL;

if (fs.existsSync("/app/data")) {
  databaseUrl = "file:/app/data/dev.db";
} else if (!databaseUrl) {
  databaseUrl = "file:./dev.db";
}

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });

export default prisma;

