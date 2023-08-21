import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { PrismaClient } from "@prisma/client";

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
    let prisma;
    
    if (process.env.NODE_ENV === 'production') {
        prisma = new PrismaClient()
    }
    else {
        //check if there is already a connection to the database
        if (!global.prisma) {
            global.prisma = new PrismaClient()
        }
        prisma = global.prisma
    }

    return { prisma };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;