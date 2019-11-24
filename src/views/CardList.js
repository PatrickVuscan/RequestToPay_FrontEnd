import React, { Component } from 'react';
import {getOrdersOverview} from '../data/CardData'
import {Card} from '../components/Card'
import "./CardList.css"
import constants from "../constants";

/**
 * A component with a high-level view of every order of viewStatus 'viewStatus' where the entity 'entityId'
 * is listed as the viewPersona 'viewPersona'.
 *
 * @props entityId - The ID of the entity viewing the orders.
 * @props persona - The persona for which the orders pertain to (ie: entityId is seller or customer or driver).
 * @props status - The status of orders.
 * @props cardClickHandler - The function that is called to change views upon a card click
 */

const VIEW = constants.VIEW;

export class CardList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'ordersData': []
        };
        this.setOrdersData = this.setOrdersData.bind(this);
        this.transitionToInvoiceID = this.transitionToInvoiceID.bind(this);
    }

    componentDidMount() {
        getOrdersOverview(global.entityId, global.viewPersona, global.viewStatus, this.setOrdersData);
    }

    setOrdersData(ordersData) {
        this.setState({'ordersData': ordersData});
    }

    transitionToInvoiceID(ID){
        global.presenter.setInvoiceID(ID);
        global.presenter.transitionTo(VIEW.invoice);
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
                onClick={() => this.transitionToInvoiceID(id)}/>;
            cards.push(card);
        }
        return cards;
    }

    render() {
        return (
            <div id={'CardList_container'}>
                <div id={'CardList_header'}>
                    {global.viewStatus}
                </div>
                {this.createCards()}
            </div>
        );
    }
}
