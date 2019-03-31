import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

function AppNavbar(props) {
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
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link">
                            Sign Up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signin" className="nav-link">
                            Sign In
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signout" className="nav-link">
                            Sign Out
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

AppNavbar.propTypes = {};

export default AppNavbar;
