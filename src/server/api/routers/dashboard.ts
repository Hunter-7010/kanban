import { Input } from "postcss";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    // return ctx.prisma.example.findMany();
  }),

  newBoard: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
      })
    )
    .mutation(async({ ctx, input }) => {
      return await ctx.prisma.board.create({
        data:{
          title: input.title,
        }
      })
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
