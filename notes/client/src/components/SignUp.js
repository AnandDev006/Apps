import React from "react";
import { reduxForm, Field } from "redux-form";
import PropTypes from "prop-types";

import CustomInput from "./CustomInput";

const onSubmit = (formData) => {
    console.log('On Submit got called');
    console.log(formData);
    
}

function SignUp(props) {
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
                            id="name"
                            label="Enter password"
                            placeholder=""
                            component={CustomInput}
                        />
                    </fieldset>
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </form>
            </div>
            <div className="col text-center">
                <div className="alert alert-primary">
                    Sign Up using 3rd party services
                </div>
                <button className="btn btn-light">Google</button>
                <button className="btn btn-light">Facebook</button>
            </div>
        </div>
    );
}

SignUp.propTypes = {};

export default reduxForm({ form: "signUpForm" })(SignUp);
