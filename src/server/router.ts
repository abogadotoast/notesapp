import * as trpc from "@trpc/server";
import { z } from "zod";

import { Context } from "./context";

export const serverRouter = trpc
  .router<Context>()
  .query("findAllMatching", {
    input: z.object({
      searchStr: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      return await ctx.prisma.noteList.findMany({
        where: {
          note: {
            contains: input.searchStr
          },
        },
      })
    },
  })
  .mutation("insertOne", {
    input: z.object({
      note: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      return await ctx.prisma.noteList.create({
        data: { note: input.note },
      });
    },
  })
  .mutation("updateOne", {
    input: z.object({
      id: z.number(),
      note: z.string(),
      checked: z.boolean(),
    }),
    resolve: async ({ input, ctx }) => {
      const { id, ...rest } = input;

      return await ctx.prisma.noteList.update({
        where: { id },
        data: { ...rest },
      });
    },
  })
  .mutation("deleteAll", {
    input: z.object({
      ids: z.number().array(),
    }),
    resolve: async ({ input, ctx }) => {
      const { ids } = input;

      return await ctx.prisma.noteList.deleteMany({
        where: {
          id: { in: ids },
        },
      });
    },
  });

export type ServerRouter = typeof serverRouter;
