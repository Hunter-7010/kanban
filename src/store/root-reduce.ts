import {combineReducers} from "redux"
import { boardReducer } from "./board/board.reducer"
export const rootReducer= combineReducers({
    board: boardReducer
})
