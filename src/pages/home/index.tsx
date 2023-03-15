import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Kanban dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-[55rem] min-h-screen w-screen overflow-hidden bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="flex shrink-0 grow-0 flex-col overflow-y-auto border-r bg-gray-700">
          <div className="flex h-[86.3px] items-center justify-center border-b bg-white text-4xl font-bold">
            Kanban
          </div>
          <div className="flex h-[41.2rem] w-full flex-col bg-white text-gray-400 antialiased">
            <h2 className="p-5 text-sm font-semibold tracking-widest">
              ALL BOARDS (4)
            </h2>
            <div className="relative space-y-1 pr-6">
              <h3 className="flex cursor-pointer items-center space-x-5 rounded-r-full py-4 pl-8 hover:bg-indigo-300 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 scale-[120%]"
                >
                  <path
                    d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <p className="max-w-[190px] overflow-hidden truncate">
                  Marketing Plan Marketing Plan Marketing Plan Marketing Plan
                </p>
              </h3>

              <h3 className="hover:bg- flex cursor-pointer items-center space-x-5 rounded-r-full py-4 pl-8 font-bold text-indigo-600 duration-300 hover:text-indigo-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 scale-[120%]"
                >
                  <path
                    d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <p className="overflow-hidden">+ Create New Board</p>
              </h3>
            </div>
            <div className="absolute inset-x-5 bottom-24 z-10 flex h-[48px] w-[235px] items-center justify-center space-x-5 rounded-lg bg-gray-100">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z"
                  fill="currentColor"
                ></path>
              </svg>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" value="" className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-indigo-800"></div>
              </label>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="flex grow flex-col overflow-y-auto">
          <div className="flex h-[96px] items-center justify-between border-b bg-white">
            <h1 className="pl-10 text-2xl font-bold antialiased">
              Marketing Plan
            </h1>
            <div className="flex space-x-4 pr-10">
              <button className="flex items-center justify-center rounded-l-full rounded-r-full bg-indigo-500 py-2.5 px-6 text-white">
                + Add New Task
              </button>
              <div className="group flex items-center justify-center rounded-3xl duration-300 hover:bg-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32.055 32.055"
                  fill="current"
                  className="h-6 w-6 rotate-90 cursor-pointer p-1 duration-300 group-hover:fill-gray-600"
                >
                  <path d="M3.968 12.061A3.965 3.965 0 000 16.027a3.965 3.965 0 003.968 3.967 3.966 3.966 0 100-7.933zm12.265 0a3.967 3.967 0 00-3.968 3.965c0 2.192 1.778 3.967 3.968 3.967s3.97-1.772 3.97-3.967a3.97 3.97 0 00-3.97-3.965zm11.857 0a3.967 3.967 0 10-.005 7.933 3.967 3.967 0 00.005-7.933z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex h-full w-full flex-wrap overflow-y-auto bg-gray-100">
            <div className="my-4 ml-16 h-[580px] rounded-lg w-[280px] space-y-6 overflow-y-auto">
              <div className="flex items-center space-x-2 pt-8">
                <div className="h-5 w-5 rounded-full bg-lime-400"></div>
                <p className="text-sm font-semibold tracking-widest text-gray-400">
                  Todo
                </p>
              </div>
              <div className="flex h-[121px] items-center justify-center rounded-lg bg-white shadow-lg duration-500 hover:opacity-90 hover:shadow-sm">
                <div className="px-4">
                  <h4 className="mb-1 font-semibold">
                    Write launch article to publish on multiple channels
                  </h4>
                  <p className="text-sm font-semibold text-gray-400">
                    0 of 4 subtasks
                  </p>
                </div>
              </div>
              <div className="flex h-[121px] items-center justify-center rounded-lg bg-white shadow-lg duration-500 hover:opacity-90 hover:shadow-sm">
                <div className="px-4">
                  <h4 className="mb-1 font-semibold">
                    Write launch article to publish on multiple channels
                  </h4>
                  <p className="text-sm font-semibold text-gray-400">
                    0 of 4 subtasks
                  </p>
                </div>
              </div>
              <div className="flex h-[121px] items-center justify-center rounded-lg bg-white shadow-lg duration-500 hover:opacity-90 hover:shadow-sm">
                <div className="px-4">
                  <h4 className="mb-1 font-semibold">
                    Write launch article to publish on multiple channels
                  </h4>
                  <p className="text-sm font-semibold text-gray-400">
                    0 of 4 subtasks
                  </p>
                </div>
              </div>
              <div className="flex h-[121px] items-center justify-center rounded-lg bg-white shadow-lg duration-500 hover:opacity-90 hover:shadow-sm">
                <div className="px-4">
                  <h4 className="mb-1 font-semibold">
                    Write launch article to publish on multiple channels
                  </h4>
                  <p className="text-sm font-semibold text-gray-400">
                    0 of 4 subtasks
                  </p>
                </div>
              </div>
              <div className="flex h-[121px] items-center justify-center rounded-lg bg-white shadow-lg duration-500 hover:opacity-90 hover:shadow-sm">
                <div className="px-4">
                  <h4 className="mb-1 font-semibold">
                    Write launch article to publish on multiple channels
                  </h4>
                  <p className="text-sm font-semibold text-gray-400">
                    0 of 4 subtasks
                  </p>
                </div>
              </div>
            </div>
            
            <div className="my-12 ml-16 h-[550px] rounded-lg w-[280px] flex justify-center items-center bg-gradient-to-b from-gray-300 group to-white">
              <h2 className="text-2xl font-bold text-gray-400 duration-300 group-hover:text-indigo-600">+ New Column</h2>
            </div>
          </div>
        </div>
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
