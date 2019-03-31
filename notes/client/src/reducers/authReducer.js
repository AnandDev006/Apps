import {AUTH_SIGN_UP, AUTH_ERROR} from '../actions/types';

const DEFAULT_STATE = {
    isAuthenticated: false,
    jwtToken: '',
    errorMessage: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case AUTH_SIGN_UP:
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
                token: '',
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}