import { Input } from "postcss";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
  // getAll: publicProcedure.query(({ ctx }) => {
  //   // return ctx.prisma.example.findMany();
  // }),
  getAllBoards: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.board.findMany({});
  }),

  getOneBoard: publicProcedure
    .input(
      z.object({
        boardId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.boardId != "") {
        return await ctx.prisma.board.findUnique({
          where: {
            id: input.boardId,
          },
          include: {
            tasks: {
              include: {
                subTasks: true,
              },
            },
          },
        });
      }
    }),

  newBoard: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.board.create({
        data: {
          title: input.title,
        },
      });
    }),
  newTask: publicProcedure
    .input(
      z.object({
        boardId: z.string().min(24),
        title: z.string().min(1),
        description: z.string(),

        subTasks: z.array(
          z.object({
            title: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      const task = await ctx.prisma.task.create({
        data: {
          title: input.title,
          boardId: input.boardId,
          color: randomColor,
        },
      });
      input.subTasks.map(async (subtask) => {
        await ctx.prisma.subTask.create({
          data: {
            title: subtask.title,
            taskId: task.id,
            description: input.description,
          },
        });
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
