import { PrismaClient } from '@prisma/client';

declare global {
  var __prisma__: PrismaClient | undefined;
}

const db = globalThis.__prisma__ ?? new PrismaClient();
export default db;

if (process.env.NODE_ENV !== 'production') globalThis.__prisma__ = db;
