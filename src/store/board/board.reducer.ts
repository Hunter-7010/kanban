import { BOARD_ACTION_TYPES } from "./board.types"

const INITIAL_STATE={
    currentBoard:null,
}
// action is passed to every reducer
export const boardReducer =  (state = INITIAL_STATE,action:{type:string,payload:{a:string}})=>{
    const {type,payload} = action
    switch(type){
        case BOARD_ACTION_TYPES.SET_CURRENT_BOARD:
            return {...state,currentBoard:payload}
            default:
                return state
    }
}