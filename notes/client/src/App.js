import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";

import store from './store';
import AppNavbar from "./components/AppNavbar";
import Index from "./components/Index";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <AppNavbar />
                    <div className="container">
                        <Route exact path="/" component={Index} />
                        <Route exact path="/home" component={Index} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/signin" component={SignIn} />
                    </div>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
