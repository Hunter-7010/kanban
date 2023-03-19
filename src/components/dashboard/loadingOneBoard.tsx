const LoadingOneBoard = () => {
  return (
    <div className="flex grow flex-col overflow-y-auto">
      <div className="flex h-[96px] items-center justify-between border-b bg-white">
        <h1 className="h-3 animate-pulse w-44 rounded-2xl bg-gray-400 ml-10 text-2xl font-bold antialiased"></h1>
        <div className="flex animate-pulse space-x-4 pr-10">
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
        <div className="my-4 ml-16 h-[580px] w-[280px] space-y-6 overflow-y-auto rounded-lg">
          <div className="flex items-center space-x-2 pt-8">
            <div className="h-5 w-5 rounded-full bg-lime-400"></div>
            <p className="h-3 w-32 animate-pulse rounded-2xl bg-gray-400 text-sm font-semibold tracking-widest text-gray-400"></p>
          </div>
          <div className="flex h-[121px] animate-pulse items-center justify-center rounded-lg bg-white shadow-lg duration-500 hover:opacity-90 hover:shadow-sm"></div>
        </div>
        <div className="group my-12 ml-16 flex h-[550px] w-[280px] animate-pulse items-center justify-center rounded-lg bg-gradient-to-b from-gray-300 to-white">
          <h2 className="text-2xl font-bold text-gray-400 duration-300 group-hover:text-indigo-600"></h2>
        </div>
      </div>
    </div>
  );
};

export default LoadingOneBoard;
