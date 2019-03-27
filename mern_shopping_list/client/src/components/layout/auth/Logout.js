import React, { Component } from "react";
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';

class Logout extends Component {

    logout = () => {
        this.props.setShowRegister(false);
        this.props.logout();
    }

    render() {
        return(
            <React.Fragment>
                <NavLink onClick={ this.logout } href="#">Logout</NavLink>
            </React.Fragment>
        )
    }
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired,
    setShowRegister: PropTypes.func.isRequired,
}

export default connect(null, { logout })(Logout);