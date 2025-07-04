import { PrismaClient } from '../generated/prisma';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


// This file is used to create a Prisma client instance that can be reused across the application.
// It checks if a Prisma client instance already exists in the global scope to avoid creating multiple instances  
// in development mode, which can lead to issues with hot reloading and database connections.