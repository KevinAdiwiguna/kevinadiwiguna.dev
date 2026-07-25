import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const getPrisma = () =>
    new PrismaClient({
        adapter,
    });

const globalForCoreDB = global as unknown as {
    coreDB: ReturnType<typeof getPrisma>;
};

export const prisma = globalForCoreDB.coreDB || getPrisma();

if (process.env.NODE_ENV !== "production") {
    globalForCoreDB.coreDB = prisma;
}
