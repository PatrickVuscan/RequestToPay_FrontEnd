// THIS IS THE PAGE FEATURING HIGH-LEVEL DESCRIPTIONS OF ORDERS USING "CARDS"
// It is basically one div that will contain many cards (from Card.js)

// -----------

// THE PRESENTER WILL GIVE THIS COMPONENT THE FORMATTED "CardData"
// (Remember -> CardData will build the JSON format for information shown on all cards)
// It will then iterate through the data and create a Card per item, adding this onto the main div.

import React, { Component } from 'react';
import {getCustomerUnpaidOrdersOverview} from '../data/CardData'
import {Card} from '../components/Card'

/**
 * A component with a high-level view of every order of status 'status' where the entity 'entityId'
 * is listed as the persona 'persona'.
 *
 * @props entityId - The ID of the entity viewing the orders.
 * @props persona - The persona for which the orders pertain to (ie: entityId is seller or customer or driver).
 * @props status - The status of orders.
 * @props cardClickHandler - The function that is called to change views upon a card click
 */
export class CardList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'ordersData': []
        };
        this.setOrdersData = this.setOrdersData.bind(this);
    }

    componentDidMount() {
        getCustomerUnpaidOrdersOverview(this.setOrdersData, this.props.entityId);
    }

    setOrdersData(ordersData) {
        this.setState({'ordersData': ordersData});
    }

    createCards() {
        const cards = [];
        let keys = Object.keys(this.state.ordersData);
        for (let k = 0; k < keys.length; k++) {
            let key = keys[k];
            let id = this.state.ordersData[key].OID;
            let card = <Card
                id={id}
                key={key}
                orderData={this.state.ordersData[key]}
                onClick={() => this.props.cardClickHandler(id)}/>;
            cards.push(card);
        }
        return cards;
    }

    render() {
        const childElements = this.createCards();
        return (
            <div id={'CardList'}>
                {childElements}
            </div>
        );
    }
}
