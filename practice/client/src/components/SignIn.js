import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

import { signIn, oauthGoogle, oauthFacebook } from "../actions/authActions";
import CustomInput from "./CustomInput";

function SignIn(props) {

    const onSubmit = async formData => {
        try {
            await props.signIn(formData);
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
                        Sign In
                    </button>
                </form>
            </div>
            <div className="col text-center">
                <div className="alert alert-primary">
                    Sign In using 3rd party services
                </div>
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Sign in with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    className="mr-4"
                />
                <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                    textButton="Sign in with Facebook"
                    fields="name, email, picture"
                    callback={responseFacebook}
                    buttonStyle={{
                        padding: "10px",
                        borderTopWidth: "0px",
                        borderBottomWidth: "0px",
                        height: "60px"
                    }}
                />
            </div>
        </div>
    );
}

SignIn.propTypes = {};

const mapStateToProps = state => ({
    errorMessage: state.auth.errorMessage
});

export default reduxForm({ form: "signUpForm" })(
    connect(
        mapStateToProps,
        { signIn, oauthGoogle, oauthFacebook }
    )(SignIn)
);
