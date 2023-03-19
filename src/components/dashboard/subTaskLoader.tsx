const SubTaskLoader = () => {
  return (
    <div className="min-h-[18rem] w-full max-w-lg transform overflow-hidden rounded-2xl bg-white py-12 px-6 text-left align-middle shadow-xl transition-all">
      <div className="relative mb-4 flex justify-between text-lg font-medium leading-6 text-gray-900 dark:text-white">
        <p className="mb-4">
          <h1 className="mb-3 h-5 w-8 animate-pulse bg-gray-400"></h1>

          <h2 className="block h-5 w-14 animate-pulse bg-gray-400 text-sm font-medium text-gray-500 dark:text-gray-400"></h2>
        </p>

      </div>
      <div className=" w-full space-y-2">
        <h3 className="text-xs font-bold text-gray-400"></h3>
        <div className="space-y-4">
          <div className="mb-4 flex cursor-pointer items-center rounded-lg bg-gray-100 p-3 duration-300 hover:bg-indigo-100 ">
            <p className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-indigo-600  dark:border-gray-600 dark:bg-gray-700 "></p>
            <label className="ml-2 w-16 animate-pulse cursor-pointer bg-gray-400 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
          </div>
          <div className="mb-4 flex cursor-pointer items-center rounded-lg bg-gray-100 p-3 duration-300 hover:bg-indigo-100 ">
            <p className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-indigo-600  dark:border-gray-600 dark:bg-gray-700 "></p>
            <label className="ml-2 w-16 animate-pulse cursor-pointer bg-gray-400 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubTaskLoader;
