import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { signOut,useSession } from "next-auth/react";
import { useRouter } from "next/router";
type Props = {
  boardId: string;
};

export default function BoardOptionsDropdown({ boardId }: Props) {
  const ctx = api.useContext();
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { mutate: deleteBoard } = api.dashboard.deleteOneBoard.useMutation({
    onSuccess: () => {
      toast.success("Board Deleted!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
      });
      return ctx.dashboard.invalidate();
    },
    onError: () => {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
      });
    },
  });
  const deleteHandler = () => {
    deleteBoard({ boardId: boardId });
  };
  const signOutHandler = () => {
    void signOut();
    void router.push("/");
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center  justify-center rounded-xl py-2 duration-300 hover:bg-gray-300 dark:hover:bg-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32.055 32.055"
            fill="current"
            className="h-6 w-6 rotate-90 cursor-pointer p-1 duration-300 group-hover:fill-gray-600 dark:fill-white"
          >
            <path d="M3.968 12.061A3.965 3.965 0 000 16.027a3.965 3.965 0 003.968 3.967 3.966 3.966 0 100-7.933zm12.265 0a3.967 3.967 0 00-3.968 3.965c0 2.192 1.778 3.967 3.968 3.967s3.97-1.772 3.97-3.967a3.97 3.97 0 00-3.97-3.965zm11.857 0a3.967 3.967 0 10-.005 7.933 3.967 3.967 0 00.005-7.933z"></path>
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div>
            <Menu.Item>

                <div className="flex items-center rounded-md px-4 py-2 pointer-events-none text-sm 
                text-gray-900  hover:opacity-80">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-8 w-8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    
                  </div>
                  <span className="ml-1 uppercase">{sessionData?.user.name}</span>
                </div>
              
            </Menu.Item>
          </div>
          <div className="">
            <Menu.Item>
              <a
                href="#"
                className={`block rounded-md px-4 py-3 text-sm 
                text-gray-900 hover:bg-gray-100  hover:opacity-80
                  `}
                onClick={signOutHandler}
              >
                Log out
              </a>
            </Menu.Item>
          </div>
          {boardId != "" && (
            <>
              <div className="">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`block px-4 py-3 text-sm ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      Edit
                    </a>
                  )}
                </Menu.Item>
              </div>

              <div className="">
                <Menu.Item>
                  <a
                    href="#"
                    className={`block rounded-b-md px-4 py-3 text-sm 
                   text-red-500 hover:bg-gray-100  hover:opacity-80
                  `}
                    onClick={deleteHandler}
                  >
                    delete
                  </a>
                </Menu.Item>
              </div>
            </>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
