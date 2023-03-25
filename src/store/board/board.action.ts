import { BOARD_ACTION_TYPES } from "./board.types";
import { createAction } from "~/utils/reducer.utils";
export const setCurrentBoard = (board: {a:string}) =>
  createAction(BOARD_ACTION_TYPES.SET_CURRENT_BOARD, board);
