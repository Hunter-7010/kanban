import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { api } from "~/utils/api";
import { toast } from "react-toastify";

type Props = {
  boardId: string
}

export default function BoardOptionsDropdown({boardId}:Props) {
  const ctx = api.useContext();
  const {mutate:deleteBoard} = api.dashboard.deleteOneBoard.useMutation({
    onSuccess: async () => {
      toast.success("Board Deleted!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      await ctx.dashboard.invalidate();
    },
    onError: () => {
      toast.error(
        "Something went wrong",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    },
  })
  const deleteHandler = ()=>{
    deleteBoard({boardId:boardId})
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex justify-center items-center rounded-xl duration-300 hover:bg-gray-300 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32.055 32.055"
            fill="current"
            className="h-6 w-6 rotate-90 cursor-pointer p-1 duration-300 group-hover:fill-gray-600"
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                  className={`block px-4 py-3 text-sm rounded-b-md 
                   hover:bg-gray-100 hover:opacity-80  text-red-500
                  `}
                  onClick={deleteHandler}
                >
                  delete
                </a>
           
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
