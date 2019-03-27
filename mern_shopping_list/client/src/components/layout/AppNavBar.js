import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from "reactstrap";

import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import Login from "./auth/Login";

class AppNavBar extends Component {
    state = {
        isOpen: false,
        showRegister: false
    };

    setShowRegister = (setTo) => {
        this.setState(prevState => {
            return {
                showRegister: setTo
            };
        });
    };

    toggle = () => {
        this.setState(prevState => {
            return {
                isOpen: !prevState.isOpen
            };
        });
    };

    render() {
        const { isAuthenticated, user } = this.props;
        const { showRegister } = this.state;

        const authLinks = (
            <React.Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Welcome ${user.name}` : null}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout setShowRegister={this.setShowRegister} />
                </NavItem>
            </React.Fragment>
        );

        const guestLinks = showRegister ? (
            <NavItem>
                <RegisterModal setShowRegister={this.setShowRegister}/>
            </NavItem>
        ) : (
            <NavItem>
                <Login setShowRegister={this.setShowRegister} />
            </NavItem>
        );

        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Shopping List</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated ? authLinks : guestLinks}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps)(AppNavBar);
