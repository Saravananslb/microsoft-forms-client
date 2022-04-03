import { act } from 'react-dom/test-utils';
import {SIGNIN_UP, ISSEARCH, AUTHENTICATE} from '../actions/ActionType';

export const Reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case SIGNIN_UP:
            return {
                ...state,
                signInUpEnabled: action.payload.signInUpEnabled,
                signInUpAction: action.payload.signInUpAction
            }
        case ISSEARCH:
            return {
                ...state,
                searchEnabled: action.payload.searchEnabled
            }
        case AUTHENTICATE:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated
            }
        default:
            return state;
    }
}