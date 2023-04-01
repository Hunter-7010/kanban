import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
  getAllBoards: protectedProcedure.query(async ({ ctx }) => {
    const boardsCount = await ctx.prisma.board.count({
      where: {
        author: ctx.session?.user.id,
      },
    });
    const boards = await ctx.prisma.board.findMany({
      where: {
        author: ctx.session.user.id,
      },
    });
    return { boards, boardsCount };
  }),

  getOneBoard: protectedProcedure
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
  newBoard: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.board.create({
        data: {
          title: input.title,
          author: ctx.session.user.id,
        },
      });
    }),
  newTask: protectedProcedure
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
  newSubTask: protectedProcedure
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

  newPoints: protectedProcedure
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
  checkingCheckbox: protectedProcedure
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
  deleteOneBoard: protectedProcedure
    .input(
      z.object({
        boardId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.board.delete({
        where: {
          id: input.boardId,
        },
      });
    }),
  deleteOnePoint: protectedProcedure
    .input(
      z.object({
        pointId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.points.delete({
        where: {
          id: input.pointId,
        },
      });
    }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
