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
    const boardsCount = await ctx.prisma.board.count({});
    const boards = await ctx.prisma.board.findMany({});
    return { boards, boardsCount };
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
                subTasks: {
                  orderBy: { createdAt: "asc" },
                  include: {
                    subtasks: {
                      orderBy: { createdAt: "asc" },
                    },
                  },
                },
              },
              orderBy: { createdAt: "asc" },
            },
          },
        });
      }
    }),

  getOneSubTask: publicProcedure
    .input(
      z.object({
        subTaskId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.subTaskId != "") {
        return await ctx.prisma.subTask.findUnique({
          where: {
            id: input.subTaskId,
          },
          include: {
            subtasks: { orderBy: { createdAt: "asc" } },
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
          },
        });
      });
    }),
  newSubTask: publicProcedure
    .input(
      z.object({
        titleId: z.string().min(1),
        description: z.string(),
        title: z.string(),

        subTasks: z.array(
          z.object({
            title: z.string(),
            finished: z.boolean().default(false),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const subTasks = [] as { title: string; finished: boolean }[];
      input.subTasks.map((subtask) => {
        subTasks.push(subtask);
      });
      const task = await ctx.prisma.subTask.create({
        data: {
          taskId: input.titleId,
          title: input.title,
          description: input.description,
        },
      });
      input.subTasks.map(async (subtask) => {
        await ctx.prisma.points.create({
          data: {
            title: subtask.title,
            subTaskId: task.id,
          },
        });
      });
      return task;
    }),

  newPoints: publicProcedure
    .input(
      z.object({
        subTaskId: z.string().min(24),
        subTasks: z.array(
          z.object({
            title: z.string(),
            finished: z.boolean().default(false),
          })
        ),
      })
    )
    .mutation(({ ctx, input }) => {
      input.subTasks.map(async (subtask) => {
        await ctx.prisma.points.create({
          data: {
            title: subtask.title,
            subTaskId: input.subTaskId,
          },
        });
      });
    }),
  checkingCheckbox: publicProcedure
    .input(
      z.object({
        pointId: z.string().min(24),
        checkboxState: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.points.update({
        where: { id: input.pointId },
        data: {
          finished: !input.checkboxState,
        },
      });
    }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
