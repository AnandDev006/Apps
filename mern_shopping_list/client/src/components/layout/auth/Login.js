import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from "reactstrap";
import PropTypes from "prop-types";

import { login } from "../../../actions/authActions";
import { clearErrors } from "../../../actions/errorActions";

class Login extends Component {
    state = {
        modal: false,
        email: "",
        password: "",
        msg: null
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === "LOGIN_FAIL") {
                this.setState(() => {
                    return {
                        msg: error.msg.msg
                    };
                });
            } else {
                this.setState(() => {
                    return {
                        msg: null
                    };
                });
            }
        }

        // If authenticated, close Modal
        if (this.state.modal) {
            if (isAuthenticated) this.toggle();
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();

        this.setState((prevState, props) => {
            return {
                modal: !prevState.modal
            };
        });
    };

    onChange = e => {
        e.persist();
        this.setState(() => {
            return {
                [e.target.name]: e.target.value
            };
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;

        const user = {
            email,
            password,
        };

        // Attempt to login
        this.props.login(user);

    };

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Login
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color="danger">{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: "2rem" }}
                                    block
                                >
                                    Login
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        Not a registered user?
                        <NavLink style={{ paddingLeft: '2%'}} onClick={this.props.setShowRegister.bind(null,true)} href="#">
                            Register
                        </NavLink>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    setShowRegister: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { login, clearErrors }
)(Login);
