import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "~/utils/api";

import Board from "../svgs/board";
import ArrowRight from "../svgs/arrowRight";
import X from "../svgs/x";

export default function NewBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const ctx = api.useContext();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  //react hook form

  const boardFormSchema = z.object({
    title: z.string().min(1, { message: "Must be 1 or more characters long" }),
  });
  type boardFormSchemaType = z.infer<typeof boardFormSchema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm<boardFormSchemaType>({
    resolver: zodResolver(boardFormSchema),
  });

  //trpc create board
  const { mutate } = api.dashboard.newBoard.useMutation({
    onSuccess: () => {
      toast.success("Board Created!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      ctx.dashboard.getAllBoards.invalidate();
      setIsOpen(false);
      setValue("title", "");
    },
    onError: () => {
      toast.error(
        "Can not create this Board! \n Board with same name already exists!",
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
  });

  const formSubmitHandler: SubmitHandler<boardFormSchemaType> = (data) => {
    mutate(data);
  };

  return (
    <>
      <h3
        onClick={openModal}
        className="hover:bg- flex cursor-pointer items-center space-x-5 rounded-r-full py-4 pl-8 font-bold text-indigo-600 duration-300 hover:text-indigo-400"
      >
        <Board />
        <p className="overflow-hidden">+ Create New Board</p>
      </h3>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full min-h-[18rem] max-w-lg transform overflow-hidden rounded-2xl bg-white py-12 px-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="relative mb-4 flex justify-between text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    <p className="mb-4">Add New Board</p>
                    <a
                      className=" absolute -right-4 -top-6 cursor-pointer items-start px-4 text-gray-500 duration-300 hover:text-gray-400 md:w-auto"
                      type="button"
                      onClick={closeModal}
                    >
                      <X />
                    </a>
                  </Dialog.Title>
                  <form
                    //   eslint-disable-next-line
                    onSubmit={handleSubmit(formSubmitHandler)}
                    className="pb-8"
                  >
                    <div className="group relative z-0 mb-6 w-full">
                      <input
                        className={`peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-indigo-500 ${
                          errors.title
                            ? "border border-red-500 bg-red-50 text-red-900 placeholder-red-700 duration-300 focus:border-red-500 focus:ring-red-500  dark:border-red-400 dark:bg-red-100"
                            : ""
                        } ${
                          isSubmitSuccessful
                            ? "border border-green-500 bg-green-50 text-green-900 placeholder-green-700 duration-300 focus:border-green-500 focus:ring-green-500  dark:border-green-400 dark:bg-green-100"
                            : ""
                        }`}
                        placeholder=" "
                        id="floating_email"
                        {...register("title")}
                      />
                      <label
                        htmlFor="floating_email"
                        className={`absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-indigo-600 dark:text-gray-400 peer-focus:dark:text-indigo-500 ${
                          errors.title
                            ? "text-red-600 peer-focus:text-red-600 dark:text-red-500"
                            : ""
                        } ${
                          isSubmitSuccessful
                            ? "text-green-600 peer-focus:text-green-600 dark:text-green-500"
                            : ""
                        }`}
                      >
                        Title
                      </label>
                    </div>
                    <div className="flex justify-between mt-12">
                      <div/>
                    <button
                      type="submit"
                      className="group relative inline-flex items-center overflow-hidden rounded-r-full rounded-l-full bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                    >
                      <span className="absolute left-0 -translate-x-full transition-transform group-hover:translate-x-4">
                        <ArrowRight />
                      </span>

                      <span className="text-sm font-medium transition-all group-hover:ml-4">
                        Create New Board
                      </span>
                    </button>
                    </div>
                      
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
