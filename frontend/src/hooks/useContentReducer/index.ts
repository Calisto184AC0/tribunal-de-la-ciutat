import { ReactNode, useReducer } from 'react'
import { ActionType, PageId, State } from './types'
import reducer from './utils/reducer'

const useContentReducer = (initialState: State) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const transition = (pageId: PageId, newContent: ReactNode) => {
        dispatch({
            type: ActionType.Transition,
            payload: {
                pageId,
                newContent,
            },
        })
    }

    const saveState = () => {
        dispatch({
            type: ActionType.Save,
        })
    }

    const reset = (pageId: PageId, newContent: ReactNode) => {
        dispatch({
            type: ActionType.Reset,
            payload: {
                pageId,
                newContent,
            },
        })
    }

    return {
        ...state,
        saveState,
        transition,
        reset,
    }
}

export default useContentReducer
