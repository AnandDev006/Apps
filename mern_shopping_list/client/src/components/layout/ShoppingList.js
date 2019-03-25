import React, { Component } from "react";
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Container, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from 'prop-types';

import { getItems, deleteItem } from '../../actions/itemActions';

class ShoppingList extends Component {
    
    componentDidMount(){
        this.props.getItems();
    }

    removeItem = id => {
        this.props.deleteItem(id);
    };

    render() {
        const { items } = this.props.item;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name }) => (
                            <CSSTransition
                                key={_id}
                                timeout={500}
                                classNames="fade"
                            >
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.removeItem.bind(null,_id)}
                                    >
                                        &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

ShoppingList.propTypes = {
    getItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    item: state.item
})

export default connect( mapStateToProps, { getItems, deleteItem } )(ShoppingList);
