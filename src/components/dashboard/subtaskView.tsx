import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "~/utils/api";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import X from "../svgs/x";
import UpArrow from "../svgs/upArrow";
import DownArrow from "../svgs/downArrow";
import SubTaskLoader from "./subTaskLoader";
type Props = {
  subTaskId: string;
  subtasks: {
    title: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    finished: boolean;
    id: string;
    taskId: string;
    subtasks: {
      id: string;
      title: string;
      finished: boolean;
    }[];
  };
};
export default function SubTaskView({ subTaskId, subtasks }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const ctx = api.useContext();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  //react hook form

  const taskFormSchema = z.object({
    subTaskId: z.string().min(24, { message: "Error" }),
    subTasks: z.array(
      z.object({
        title: z
          .string()
          .min(1, { message: "Must be 1 or more characters long" }),
        finished: z.boolean().default(false),
      })
    ),
  });
  type taskFormSchemaType = z.infer<typeof taskFormSchema>;
  //default data
  const formData = {
    subTaskId: subTaskId,
    subTasks: [{ title: "", finished: false }],
  };
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<taskFormSchemaType>({
    defaultValues: formData,
    resolver: zodResolver(taskFormSchema),
  });
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "subTasks",
  });

  const moveUp = (index: number) => {
    if (index === 0) return;
    swap(index, index - 1);
  };

  const moveDown = (index: number) => {
    if (index === fields.length - 1) return;
    swap(index, index + 1);
  };

  //trpc create task
  const { mutate } = api.dashboard.newPoints.useMutation({
    onSuccess: () => {
      toast.success("SubTasks Created!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
      });
      setIsFormOpen(false);
      // setIsOpen(false);
      reset();

      return ctx.dashboard.invalidate();
    },
    onError: () => {
      toast.error("Error, Something went wrong", {
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
  //trpc create task
  const { mutate: checkingCheckbox } =
    api.dashboard.checkingCheckbox.useMutation({
      onSuccess: () => {
        toast.success("SubTasks Checked!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
        });
        // setIsOpen(false);
        reset();
        return ctx.dashboard.getOneBoard.invalidate();
      },
      onError: () => {
        toast.error("Error, Something went wrong", {
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
  //delete one Point
  const { mutate: deleteOnePoint } = api.dashboard.deleteOnePoint.useMutation({
    onSuccess: () => {
      toast.success("Subtask deleted!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
      });
      // setIsOpen(false);
      reset();
      return ctx.dashboard.invalidate();
    },
    onError: () => {
      toast.error("Error, Something went wrong", {
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
  const checkboxHandler = (pointId: string, checkboxState: boolean) => {
    checkingCheckbox({ pointId, checkboxState });
  };

  const deleteHandler = (pointId: string) => {
    deleteOnePoint({ pointId });
  };
  //eslint-disable-next-line
  const formSubmitHandler: SubmitHandler<taskFormSchemaType> = (data) => {
    mutate(data);
  };
  const [parent] = useAutoAnimate();
  const [idErrorAnimationParent] = useAutoAnimate();
  const [formParent] = useAutoAnimate();

  return (
    <>
      <button
        onClick={openModal}
        className="absolute inset-0 h-full w-full"
      ></button>

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
                {/* {isSuccessOneSubTask ? ( */}
                <Dialog.Panel className="min-h-[18rem] w-full max-w-lg transform overflow-hidden rounded-2xl bg-white py-12 px-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800 dark:text-white">
                  <Dialog.Title
                    as="h3"
                    className="relative mb-4 flex justify-between text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    <p className="mb-4 w-3/4">
                      <h4 className="mb-3 overflow-auto">{subtasks.title}</h4>

                      <h4 className="block overflow-auto text-sm font-medium text-gray-500 dark:text-gray-400">
                        {subtasks.description}
                      </h4>
                    </p>

                    <a
                      className=" absolute -right-4 -top-6 cursor-pointer items-start px-4 text-gray-500 duration-300 hover:text-gray-400 md:w-auto"
                      type="button"
                      onClick={closeModal}
                    >
                      <X />
                    </a>
                  </Dialog.Title>
                  <div className="w-full space-y-2">
                    <h3 className="text-xs font-bold text-gray-400">
                      {`${
                        subtasks.subtasks.filter((task) => task.finished).length
                      } of ${subtasks.subtasks.length} subtasks`}
                    </h3>
                    <div className="space-y-4">
                      {subtasks.subtasks.map((subtask, ind) => (
                        <div
                          key={ind}
                          className="mb-4 flex cursor-pointer items-center justify-between rounded-lg bg-gray-100 p-3 duration-300 hover:bg-indigo-100 dark:bg-gray-700 "
                        >
                          <div
                            className="h-full w-full"
                            onClick={() =>
                              checkboxHandler(subtask.id, subtask.finished)
                            }
                          >
                            <input
                              type="checkbox"
                              checked={subtask.finished}
                              className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-800 dark:focus:ring-indigo-600"
                            />
                            <label
                              className={`ml-2 cursor-pointer text-sm ${
                                subtask.finished ? "line-through" : ""
                              } font-medium text-gray-900 dark:text-gray-100`}
                            >
                              {subtask.title}
                            </label>
                          </div>
                          <div
                            onClick={() => deleteHandler(subtask.id)}
                            className="z-10 scale-75 rounded-xl border border-red-900 text-red-700 duration-500 hover:bg-red-100 dark:border-red-700 dark:text-red-500"
                          >
                            <X />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* <button
                     onClick={() => setIsFormOpen(!isFormOpen)}
                     type="button"
                     className=" mt-6 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                   >
                     Add New SubTasks
                   </button> */}
                  <div ref={formParent}>
                    {isFormOpen ? (
                      <form
                        //   eslint-disable-next-line
                        onSubmit={handleSubmit(formSubmitHandler)}
                        className=" w-full space-y-8"
                      >
                        <div ref={idErrorAnimationParent}>
                          <input
                            type="hidden"
                            readOnly
                            id="title"
                            defaultValue={subTaskId}
                            {...register("subTaskId")}
                          />

                          {errors.subTaskId && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.subTaskId.message}
                            </p>
                          )}
                        </div>

                        <div ref={parent}>
                          {fields.map((subTask, ind) => (
                            <div
                              key={subTask.id}
                              className="flex w-full items-end"
                            >
                              <div className="mr-4 flex flex-col">
                                <a
                                  onClick={() => moveUp(ind)}
                                  className="cursor-pointer"
                                >
                                  {" "}
                                  <UpArrow />{" "}
                                </a>
                                <a
                                  onClick={() => moveDown(ind)}
                                  className="cursor-pointer"
                                >
                                  {" "}
                                  <DownArrow />{" "}
                                </a>
                              </div>
                              <div className="mr-3 w-full">
                                <label
                                  htmlFor={`title${ind}`}
                                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Title
                                </label>
                                <input
                                  type="text"
                                  id={`title${ind}`}
                                  {...register(`subTasks.${ind}.title`)}
                                  className={`block w-full rounded-lg border p-3 text-sm dark:shadow-sm ${
                                    errors.subTasks &&
                                    errors.subTasks[ind] &&
                                    errors.subTasks[ind]?.title
                                      ? "border-red-300 bg-red-50  text-red-900  placeholder:text-red-900 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:bg-red-700 dark:text-white  dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500"
                                      : "border-gray-300 bg-gray-50  text-gray-900  focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400  dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                                  } ${
                                    isSubmitSuccessful
                                      ? "border-green-300 bg-green-50  text-green-900  placeholder:text-green-900 focus:border-green-500 focus:ring-green-500 dark:border-green-600 dark:bg-green-700 dark:text-white  dark:placeholder-green-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                                      : ""
                                  }`}
                                  placeholder={
                                    errors.subTasks && errors.subTasks[ind]
                                      ? errors.subTasks[ind]?.title?.message ??
                                        "SubTask Title"
                                      : "SubTask Title"
                                  }
                                />
                              </div>
                              <div
                                onClick={() => {
                                  remove(ind);
                                }}
                                className="flex h-4 cursor-pointer items-center justify-center rounded-lg bg-red-100 py-6 px-2 text-red-700 duration-200 hover:bg-red-200 hover:text-red-800"
                              >
                                <X />
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* <button
                          type="button"
                          onClick={() =>
                            append({
                              title: "",
                              finished: false,
                            })
                          }
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                        >
                          Add new
                        </button> */}
                        <button
                          type="submit"
                          className="w-full rounded-md bg-indigo-700 py-3 px-5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                        >
                          Add Task
                        </button>
                      </form>
                    ) : (
                      <button
                        onClick={() => setIsFormOpen(!isFormOpen)}
                        type="button"
                        className=" mt-6 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add New SubTasks
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
                {/* ) : (
                  <SubTaskLoader />
                )} */}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
