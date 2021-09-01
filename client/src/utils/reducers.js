import { useReducer } from 'react';
import {
  UPDATE_MESSAGES,
  ADD_MESSAGE,
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_MESSAGES:
            return {
                ...state,
                messages: [...action.messages]
            }
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...action.messages, action.message]
            }
        default:
            return state;
    }
}

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}