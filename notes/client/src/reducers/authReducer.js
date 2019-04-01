import {AUTH_SIGN_UP, AUTH_SIGN_IN, AUTH_ERROR, AUTH_SIGNOUT} from '../actions/types';

const DEFAULT_STATE = {
    isAuthenticated: false,
    jwtToken: '',
    errorMessage: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case AUTH_SIGN_UP:
        case AUTH_SIGN_IN:
            return {
                ...state,
                isAuthenticated: true,
                jwtToken: action.payload,
                errorMessage: '',
            };

        case AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                jwtToken: '',
                errorMessage: action.payload,
            }

        case AUTH_SIGNOUT:
            return {
                ...state,
                isAuthenticated: false,
                jwtToken: '',
                errorMessage: '',
            }
        default:
            return state;
    }
}