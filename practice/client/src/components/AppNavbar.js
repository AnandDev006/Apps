import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from '../actions/authActions';
import PropTypes from "prop-types";

function AppNavbar(props) {

    const signOut = () => {
        props.signOut();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <Link to="/" className="navbar-brand">
                Notes APP
            </Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link">
                            Dashboard
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {props.isAuthenticated ? (
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={signOut}>
                                Sign Out
                            </Link>
                        </li>
                    ) : (
                        [
                            <li className="nav-item" key="signup">
                                <Link to="/signup" className="nav-link">
                                    Sign Up
                                </Link>
                            </li>,
                            <li className="nav-item" key="signin">
                                <Link to="/signin" className="nav-link">
                                    Sign In
                                </Link>
                            </li>
                        ]
                    )}
                </ul>
            </div>
        </nav>
    );
}

AppNavbar.propTypes = {};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { signOut }
)(AppNavbar);
