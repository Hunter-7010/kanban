import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { api } from "~/utils/api";

import NewBoard from "~/components/dashboard/newBoard";
import DarkMode from "~/components/dashboard/darkMode";
import Boards from "~/components/dashboard/boards";
import BoardsLoading from "~/components/dashboard/boardsLoading";
import NewTask from "~/components/dashboard/newTask";
import LoadingOneBoard from "~/components/dashboard/loadingOneBoard";
import NoBoardSelected from "~/components/dashboard/noBoardSelected";
import NewSubTask from "~/components/dashboard/newSubtask";
import SubTaskView from "~/components/dashboard/subtaskView";
import SideBar from "~/components/dashboard/sidebar";
import BoardOptionsDropdown from "~/components/dashboard/boardOptionsDropdown";

const Home: NextPage = () => {
  const router = useRouter();
  const [boardId, setBoardId] = useState("");
  const { data: sessionData } = useSession();
  useEffect(() => {
    if (!sessionData) {
      void router.push("/");
      toast.warning("Unauthorized!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  });
  // getting boards
  const {
    data: boardData,
    isLoading,
    isError,
    isSuccess,
  } = api.dashboard.getAllBoards.useQuery();
  //getting one board
  const {
    data: oneBoardData,
    isLoading: isLoadingOneBoard,
    isSuccess: isSuccessOneBoard,
    isError: isErrorOneBoard,
  } = api.dashboard.getOneBoard.useQuery({ boardId });

  const handleBoardClick = (boardId: string) => {
    setBoardId(boardId);
    // getOneBoard({ boardId: boardId });
  };
  if (!sessionData) {
    return <div>Unauthorized</div>;
  }
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Kanban dashboard" />
        {/* <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" /> */}
      </Head>
      <main className="flex h-[55rem] min-h-screen w-screen overflow-hidden bg-gray-50 bg-gradient-to-b duration-500 dark:bg-gray-900 dark:text-white">
        <div className="hidden shrink-0 grow-0 flex-col overflow-y-auto border-r dark:border-gray-700 lg:flex">
          <div className="flex h-[86.3px]  items-center justify-center border-b text-4xl font-bold dark:border-gray-700">
            Kanban
          </div>
          <div className="flex h-[41.2rem] w-full flex-col  text-gray-400 antialiased">
            <DarkMode />
      
            <h2 className="p-5 text-sm font-semibold tracking-widest">
              ALL BOARDS ({boardData?.boardsCount})
            </h2>
            <div className="relative space-y-1 overflow-y-auto  pr-6">
              <NewBoard />
              {boardData ? (
                boardData.boards?.map((board) => (
                  <div
                    key={board.id}
                    onClick={() => handleBoardClick(board.id)}
                  >
                    <Boards
                      title={board.title}
                      currentBoardId={boardId}
                      boardId={board.id}
                      key={board.id}
                    />
                  </div>
                ))
              ) : (
                <BoardsLoading />
              )}
            </div>
          </div>
        </div>
        <div className="fixed top-3.5 overflow-y-auto lg:hidden">
          <SideBar boardCount={boardData?.boardsCount}>
            <div className="flex w-full flex-col justify-center">
              <DarkMode />
             
            </div>

            <div className="relative space-y-1 overflow-y-auto  pr-6">
              <NewBoard />
              {boardData ? (
                boardData.boards?.map((board) => (
                  <div
                    key={board.id}
                    onClick={() => handleBoardClick(board.id)}
                  >
                    <Boards
                      title={board.title}
                      currentBoardId={boardId}
                      boardId={board.id}
                      key={board.id}
                    />
                  </div>
                ))
              ) : (
                <BoardsLoading />
              )}
            </div>
          </SideBar>
        </div>

        {oneBoardData ? (
          <div className="flex grow flex-col overflow-y-auto">
            <div className="flex h-[96px] items-center justify-between border-b dark:border-gray-700">
              <h1 className="w-1/2 truncate pl-14 text-2xl font-bold text-gray-900  antialiased dark:text-white md:pl-10">
                {oneBoardData.title}
              </h1>
              <div className="flex space-x-4 pr-10">
                <NewSubTask
                  task={
                    oneBoardData.tasks as {
                      id: string;
                      title: string;
                      boardId: string;
                      color: string;
                      createdAt: Date;
                      updatedAt: Date;
                      subTasks: [];
                    }[]
                  }
                />
                <div className="flex items-center justify-center">
                  <BoardOptionsDropdown boardId={boardId} />
                </div>
              </div>
            </div>
            <div className="flex h-full w-full flex-wrap justify-center overflow-y-auto md:justify-start">
              {oneBoardData.tasks.map((task) => (
                <div
                  key={task.id}
                  className="h-[580px] w-[280px] space-y-6 overflow-y-auto rounded-lg md:my-4 md:ml-16"
                >
                  <div className="flex items-center space-x-2 pt-8">
                    <div
                      className="h-5 w-5 rounded-full"
                      style={{ backgroundColor: "#" + task.color }}
                    ></div>
                    <p className="truncate text-sm font-semibold tracking-widest text-gray-400">
                      {task.title}
                    </p>
                  </div>
                  {task.subTasks.map((subTask) => (
                    <div
                      key={subTask.id}
                      className="relative flex min-h-[121px] items-center justify-center rounded-lg bg-white shadow-lg  duration-300 hover:opacity-90 hover:shadow-sm dark:bg-gray-700"
                    >
                      <SubTaskView subTaskId={subTask.id} subtasks={subTask} />
                      <div className="flex w-full flex-col items-center justify-center px-4">
                        <h4 className="mb-1 w-64 truncate text-center font-semibold">
                          {subTask.title}
                        </h4>
                        <p className="text-sm font-semibold text-gray-400">
                          {`${
                            subTask.subtasks.filter((task) => task.finished)
                              .length
                          } of ${subTask.subtasks.length} subtasks`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              <NewTask boardId={boardId} />
            </div>
          </div>
        ) : isLoadingOneBoard ? (
          <LoadingOneBoard />
        ) : (
          <NoBoardSelected />
        )}
      </main>
    </>
  );
};

export default Home;
