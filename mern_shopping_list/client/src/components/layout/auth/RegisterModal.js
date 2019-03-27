import React, { Component } from "react";
import { connect } from 'react-redux';
import { 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from "reactstrap";
import PropTypes from 'prop-types';

import { register } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';

class RegisterModal extends Component {
    
    state = {
        modal: true,
        name: '',
        email: '',
        password: '',
        msg: null,
    }

    componentDidUpdate( prevProps) {
        const { error, isAuthenticated } = this.props;
        if( error !== prevProps.error) {
            // Check for register error
            if( error.id === 'REGISTER_FAIL') {
                this.setState( () => {
                    return {
                        msg: error.msg.msg,
                    };
                });
            } else {
                this.setState( () => {
                    return {
                        msg: null,
                    };
                });
            }
        }

        // If authenticated, close Modal
        if(this.state.modal) {
            if(isAuthenticated) this.toggle();
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();

        this.setState( (prevState, props) => {
            props.setShowRegister(!prevState.modal);
            return {
                modal: !prevState.modal,
            };
        });
    };

    onChange = e => {
        e.persist();
        this.setState( () => {
            return {
                [e.target.name]: e.target.value,
            };
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const { name, email, password } = this.state;

        // Create user object
        const newUser = {
            name,
            email,
            password,
        };

        // Attempt to register user
        this.props.register( newUser);

    }

    render() {
        return (
            <div>
                <NavLink onClick={ this.toggle } href="#">Register</NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className='mb-3'
                                    onChange={this.onChange}
                                >
                                </Input>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className='mb-3'
                                    onChange={this.onChange}
                                >
                                </Input>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className='mb-3'
                                    onChange={this.onChange}
                                >
                                </Input>
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    setShowRegister: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});

export default connect( mapStateToProps, { register, clearErrors } )(RegisterModal);
