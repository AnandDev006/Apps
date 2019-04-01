import Axios from "axios";
import {
    signUpURL,
    googleOAuthSignUpURL,
    facebookOAuthSignUpURL,
    signInURL
} from "../constants/backendURLs";
import { AUTH_SIGN_UP, AUTH_ERROR, AUTH_SIGNOUT, AUTH_SIGN_IN } from "./types";

export const oauthGoogle = formData => dispatch => {
    Axios.post(googleOAuthSignUpURL, formData)
        .then(res => {
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            });

            localStorage.setItem("jwtToken", res.data.token);
        })
        .catch(err => {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data.msg
            });
        });
};

export const oauthFacebook = formData => dispatch => {
    Axios.post(facebookOAuthSignUpURL, formData)
        .then(res => {
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            });

            localStorage.setItem("jwtToken", res.data.token);
        })
        .catch(err => {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data.msg
            });
        });
};

export const signIn = formData => dispatch => {
    Axios.post(signInURL, formData)
        .then(res => {
            dispatch({
                type: AUTH_SIGN_IN,
                payload: res.data.token
            });

            localStorage.setItem("jwtToken", res.data.token);
        })
        .catch(err => {
            dispatch({
                type: AUTH_ERROR,
                payload: "Invalid credentials"
            });
        });
};

export const signUp = formData => dispatch => {
    Axios.post(signUpURL, formData)
        .then(res => {
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            });

            localStorage.setItem("jwtToken", res.data.token);
        })
        .catch(err => {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data.msg
            });
        });
};

export const signOut = () => dispatch => {
    localStorage.removeItem("jwtToken");
    dispatch({
        type: AUTH_SIGNOUT,
        payload: null
    });
};
