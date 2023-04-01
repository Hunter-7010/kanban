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
import SubTasksAutoComplete from "./subtasksAutoComplete";
type Props = {
  task: {
    id: string;
    title: string;
    boardId: string;
    color: string;

    createdAt: Date;
    updatedAt: Date;
    subTasks: [];
  }[];
};
export default function NewSubTask({ task }: Props) {
  const taskTitles = [] as { title: string; id: string }[];
  task.map((task) => taskTitles.push({ id: task.id, title: task.title }));
  const [isOpen, setIsOpen] = useState(false);
  const ctx = api.useContext();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  //react hook form

  const taskFormSchema = z.object({
    titleId: z.string().min(24, { message: "Must be selected from the list" }),
    title: z.string(),
    description: z.string(),
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
    title: "",
    titleId: "",
    description: "",
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
  const { mutate } = api.dashboard.newSubTask.useMutation({
    onSuccess: () => {
      toast.success("task Created!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
      });
      setIsOpen(false);
      reset();
        return ctx.dashboard.invalidate();
     
    },
    onError: () => {
      toast.error(
        "Can not create this task! \n task with same name already exists!",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
        }
      );
    },
  });
  const onOptionClickHandler = (subtask: string, id: string) => {
    setValue("titleId", id);
  };
  //eslint-disable-next-line
  const formSubmitHandler: SubmitHandler<taskFormSchemaType> = (data) => {
    mutate(data);
  };
  const [parent] = useAutoAnimate();
  const [idErrorAnimationParent] = useAutoAnimate();

  return (
    <>
      <button
        onClick={openModal}
        className="hidden items-center justify-center rounded-l-full rounded-r-full bg-indigo-500 py-2.5 px-6 text-white duration-300 hover:opacity-70 md:flex"
      >
        + Add New Task
      </button>
      <button
        onClick={openModal}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-white duration-300 hover:opacity-70 md:hidden"
      >
        +
      </button>

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
                <Dialog.Panel className="min-h-[18rem] w-full max-w-lg transform overflow-hidden rounded-2xl bg-white py-12 px-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                  <Dialog.Title
                    as="h3"
                    className="relative mb-4 flex justify-between text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    <p className="mb-4">Add New task</p>
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
                    className=" w-full space-y-8"
                  >
                    <div ref={idErrorAnimationParent}>
                      <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Task Title
                      </label>
                      <input
                        type="hidden"
                        readOnly
                        id="title"
                        {...register("titleId")}
                      />
                      <SubTasksAutoComplete
                        subTasks={taskTitles}
                        onOptionClick={onOptionClickHandler}
                      />
                      {errors.titleId && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.titleId.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        {...register("title")}
                        className={`block w-full rounded-lg border p-3 text-sm shadow-sm dark:shadow-sm ${
                          errors.title
                            ? "border-red-300 bg-red-50  text-red-900  placeholder:text-red-900 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:bg-red-700 dark:text-white  dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500"
                            : "border-gray-300 bg-gray-50  text-gray-900  focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400  dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                        } ${
                          isSubmitSuccessful
                            ? "border-green-300 bg-green-50  text-green-900  placeholder:text-green-900 focus:border-green-500 focus:ring-green-500 dark:border-green-600 dark:bg-green-700 dark:text-white  dark:placeholder-green-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                            : ""
                        }`}
                        placeholder={errors.title?.message ?? "Title"}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        Description
                      </label>
                      <textarea
                        rows={4}
                        {...register("description")}
                        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 ${
                          isSubmitSuccessful
                            ? "border-green-300 bg-green-50  text-green-900  placeholder:text-green-900 focus:border-green-500 focus:ring-green-500 dark:border-green-600 dark:bg-green-700 dark:text-white  dark:placeholder-green-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                            : ""
                        }`}
                        placeholder="description..."
                        id="description"
                      ></textarea>
                    </div>
                    <div ref={parent}>
                      {fields.map((subTask, ind) => (
                        <div
                          key={subTask.id}
                          className="flex w-full items-end text-white"
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
