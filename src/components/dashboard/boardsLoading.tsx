import React from "react";
import Board from "~/components/svgs/board";

const BoardsLoading = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((e: number, i) => (
        <h3
          key={i}
          className={`flex animate-pulse cursor-pointer items-center space-x-5 rounded-r-full py-4 pl-8`}
          style={{ animationDelay: `${150 * i}ms` }}
        >
          <Board />
          <p className="h-3.5 w-[120px] overflow-hidden truncate rounded-xl dark:bg-gray-700 bg-gray-300"></p>
        </h3>
      ))}
    </>
  );
};

export default BoardsLoading;
