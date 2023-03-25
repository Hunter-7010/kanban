import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

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

import { setCurrentBoard } from "~/store/board/board.action";
import { useDispatch } from "react-redux";

const Home: NextPage = () => {
  const [boardId, setBoardId] = useState("");

  // const hello = api.dashboard.hello.useQuery({ text: "from tRPC" });
  // getting boards
  const {
    data: boardData,
    isLoading,
    isError,
    isSuccess,
  } = api.dashboard.getAllBoards.useQuery(undefined, {
    cacheTime: 0,
    staleTime: 0,
  });
  //getting one board
  const {
    data: oneBoardData,
    isLoading: isLoadingOneBoard,
    isSuccess: isSuccessOneBoard,
    isError: isErrorOneBoard,
  } = api.dashboard.getOneBoard.useQuery(
    { boardId },
    { cacheTime: 0, staleTime: 0 }
  );

  //redux
  // const dispatch = useDispatch()
  // if(isSuccessOneBoard && oneBoardData){
  //   dispatch(setCurrentBoard(oneBoardData))
  // }
  ///
  const handleBoardClick = (boardId: string) => {
    setBoardId(boardId);
    // getOneBoard({ boardId: boardId });
  };
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Kanban dashboard" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className="flex h-[55rem] min-h-screen w-screen overflow-hidden bg-gradient-to-b duration-500 dark:bg-gray-900 dark:text-white">
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
            <div className="flex w-full justify-center">
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
              <h1 className="pl-14 text-2xl font-bold text-gray-900  antialiased dark:text-white md:pl-10">
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
                    <p className="text-sm font-semibold tracking-widest text-gray-400">
                      {task.title}
                    </p>
                  </div>
                  {task.subTasks.map((subTask) => (
                    <div
                      key={subTask.id}
                      className="relative flex h-[121px] items-center justify-center rounded-lg shadow-lg  duration-300 hover:opacity-90 hover:shadow-sm dark:bg-gray-700"
                    >
                      <SubTaskView subTaskId={subTask.id} subtasks={subTask} />
                      <div className="px-4">
                        <h4 className="mb-1 font-semibold">{subTask.title}</h4>
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

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <p>Logged in as {sessionData.user?.name}</p>}
//         {secretMessage && <p> - {secretMessage}</p>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
