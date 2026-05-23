import "dotenv/config";
import { defineConfig } from "prisma/config";
import fs from "fs";

let databaseUrl = process.env.DATABASE_URL;

if (fs.existsSync("/app/data")) {
  databaseUrl = "file:/app/data/dev.db";
} else if (!databaseUrl) {
  databaseUrl = "file:./dev.db";
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "node ./prisma/seed.js"
  },
  datasource: {
    url: databaseUrl,
  },
});

