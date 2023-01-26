/* eslint-disable indent */
import { Action, ActionType, State } from '../types'

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.Transition:
            if (state.pageId === action.payload!.pageId) return state

            return {
                ...state,
                pageId: action.payload!.pageId,
                newContent: action.payload!.newContent,
            }
        case ActionType.Save:
            return {
                ...state,
                content: state.newContent,
                newContent: null,
            }
        case ActionType.Reset:
            return {
                pageId: action.payload!.pageId,
                content: action.payload!.newContent,
                newContent: null,
            }
        default:
            return state
    }
}

export default reducer
