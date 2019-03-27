import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import PropTypes from "prop-types";

import { addItem } from "../../actions/itemActions";

class ItemModal extends Component {
    state = {
        modal: false,
        name: ""
    };

    toggle = isAuthenticated => {
        if (!isAuthenticated) return;
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
        const newItem = {
            name: this.state.name
        };

        this.props.addItem(newItem);

        this.toggle(true);
    };

    render() {
        const { isAuthenticated } = this.props;
        return (
            <div>
                {isAuthenticated ? (
                    <Button
                        color="dark"
                        style={{ marginBottom: "2rem" }}
                        onClick={this.toggle.bind(null, isAuthenticated)}
                    >
                        Add Item
                    </Button>
                ) : (
                    <h4 className="mb-4 ml-4">Login to edit cart</h4>
                )}

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        "Add To Shopping List
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item" />
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add shopping item"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: "2rem" }}
                                    block
                                >
                                    Add Item
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

ItemModal.propTypes = {
    addItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { addItem }
)(ItemModal);
