const NoBoardSelected = () => {
  return (
    <div className="flex grow flex-col overflow-y-auto">
      <div className="flex h-[96px] items-center justify-between border-b bg-white">
        <h1 className=" w-44 rounded-2xl  pl-10 text-2xl font-bold antialiased"></h1>
        <div className="flex space-x-4 pr-10">
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
      <div className="flex h-full w-full items-center justify-center bg-gray-100">
       <h3 className="text-2xl font-bold dark:text-white antialiased">Select a board...</h3>
      </div>
    </div>
  );
};

export default NoBoardSelected;
