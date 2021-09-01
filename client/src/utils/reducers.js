import { useReducer } from 'react';
import {
    UPDATE_MESSAGES,
    ADD_MESSAGE,
    UPDATE_ACCOUNT_STATUS,
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

        case UPDATE_ACCOUNT_STATUS:
            console.log('UPDATE_ACCOUNT_STATUS dispatched');
            return {
                ...state,
                isLoggedIn: !action.isLoggedIn,
            }

        default:
            return state;
    }
}

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}