import Board from "~/components/svgs/board";

type Props = {
  title: string;
  boardId: string;
  currentBoardId: string;
};

const Boards = ({ title, boardId, currentBoardId }: Props) => {
  return (
    <h3
      className={`flex cursor-pointer truncate items-center space-x-5 rounded-r-full py-4 pl-8 font-semibold  hover:text-white ${
        currentBoardId == boardId
          ? "bg-indigo-500 text-white"
          : "hover:bg-indigo-300"
      }`}
    >
      <Board />
      <p className="max-w-[190px] overflow-hidden truncate">{title}</p>
    </h3>
  );
};

export default Boards;
