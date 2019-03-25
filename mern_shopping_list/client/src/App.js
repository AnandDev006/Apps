import React, { Component } from "react";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "reactstrap";

import store from "./store";
import AppNavBar from "./components/layout/AppNavBar";
import ShoppingList from "./components/layout/ShoppingList";
import ItemModal from "./components/layout/ItemModal";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <AppNavBar />
                    <Container>
                        <ItemModal />
                        <ShoppingList />
                    </Container>
                </div>
            </Provider>
        );
    }
}

export default App;
