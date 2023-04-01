import BoardOptionsDropdown from "~/components/dashboard/boardOptionsDropdown";

const NoBoardSelected = () => {
  return (
    <div className="flex grow flex-col overflow-y-auto">
      <div className="flex h-[96px] items-center justify-between border-b dark:border-gray-700">
        <h1 className=" w-44 rounded-2xl pl-10 text-2xl font-bold antialiased"></h1>
        <div className="flex space-x-4 pr-10">
          <div className="group flex items-center justify-center rounded-3xl duration-300 dark:hover:bg-gray-800 hover:bg-gray-300">
           <BoardOptionsDropdown boardId=""/>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-center">
       <h3 className="text-2xl font-bold dark:text-white antialiased">Select a board...</h3>
      </div>
    </div>
  );
};

export default NoBoardSelected;
