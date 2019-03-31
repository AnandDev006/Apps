import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

import { signUp, oauthGoogle } from "../actions/authActions";
import CustomInput from "./CustomInput";

function SignUp(props) {
    const onSubmit = async formData => {
        try {
            await props.signUp(formData);
            if (!props.errorMessage) {
                props.history.push("/dashboard");
            }
        } catch (error) {}
    };

    const responseGoogle = async res => {
        try {
            await props.oauthGoogle(res.accessToken);
            if (!props.errorMessage) {
                props.history.push("/dashboard");
            }
        } catch (error) {}
    };

    const responseFacebook = async res => {
        try {
            await props.oauthFacebook(res.accessToken);
            if (!props.errorMessage) {
                props.history.push("/dashboard");
            }
        } catch (error) {}
    };

    const { handleSubmit } = props;

    return (
        <div className="row">
            <div className="col">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <Field
                            name="name"
                            type="text"
                            id="name"
                            label="Enter your name"
                            placeholder="Name"
                            component={CustomInput}
                        />
                    </fieldset>
                    <fieldset>
                        <Field
                            name="email"
                            type="email"
                            id="email"
                            label="Enter Email ID"
                            placeholder="example@example.com"
                            component={CustomInput}
                        />
                    </fieldset>
                    <fieldset>
                        <Field
                            name="password"
                            type="password"
                            id="password"
                            label="Enter password"
                            placeholder=""
                            component={CustomInput}
                        />
                    </fieldset>

                    {props.errorMessage ? (
                        <div className="alert alert-danger">
                            {props.errorMessage}
                        </div>
                    ) : null}

                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </form>
            </div>
            <div className="col text-center">
                <div className="alert alert-primary">
                    Sign Up using 3rd party services
                </div>
                <GoogleLogin
                    clientId="247200665853-ofdo2sgei0nnbo71o0hud0qhlqj84btj.apps.googleusercontent.com"
                    buttonText="Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />
                <FacebookLogin
                    appId="582136658933552"
                    textButton="Facebook"
                    fields="name, email, picture"
                    callback={responseFacebook}
                    cssClass="btn btn-outline-primary"
                />
            </div>
        </div>
    );
}

SignUp.propTypes = {};

const mapStateToProps = state => ({
    errorMessage: state.auth.errorMessage
});

export default reduxForm({ form: "signUpForm" })(
    connect(
        mapStateToProps,
        { signUp, oauthGoogle }
    )(SignUp)
);
