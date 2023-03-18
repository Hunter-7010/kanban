import React from "react";
import Board from "~/components/svgs/board";

type Props = {};

const BoardsLoading = (props: Props) => {
  return (
    <>
      {[...Array(6)].map((e: number, i) => (
        <h3
          key={i}
          className={`animate-pulse flex cursor-pointer items-center space-x-5 rounded-r-full bg-gray-100 py-4 pl-8`}
          style={{ animationDelay: 150 * i + "ms"}}
        >
          <Board />
          <p className="h-3.5 w-[120px] overflow-hidden truncate rounded-xl bg-gray-300"></p>
        </h3>
      ))}
    </>
  );
};

export default BoardsLoading;
