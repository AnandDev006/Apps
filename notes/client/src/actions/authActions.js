import Axios from "axios";
import {
    signUpURL,
    googleOAuthSignUpURL,
    facebookOAuthSignUpURL
} from "../constants/backendURLs";
import { AUTH_SIGN_UP, AUTH_ERROR } from "./types";

export const oauthGoogle = data => async dispatch => {
    try {
        const res = await Axios.post(googleOAuthSignUpURL, {
            access_token: data
        });

        dispatch({
            type: AUTH_SIGN_UP,
            payload: res.data.token
        });

        localStorage.setItem("jwtToken", res.data.token);
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error.response.data.msg
        });
    }
};

export const oauthFacebook = data => async dispatch => {
    try {
        const res = await Axios.post(facebookOAuthSignUpURL, {
            access_token: data
        });

        dispatch({
            type: AUTH_SIGN_UP,
            payload: res.data.token
        });

        localStorage.setItem("jwtToken", res.data.token);
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error.response.data.msg
        });
    }
};

export const signUp = formData => async dispatch => {
    try {
        const res = await Axios.post(signUpURL, formData);

        dispatch({
            type: AUTH_SIGN_UP,
            payload: res.data.token
        });

        localStorage.setItem("jwtToken", res.data.token);
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error.response.data.msg
        });
    }
};
