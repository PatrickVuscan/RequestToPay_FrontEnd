// This is a view for invoice items within a list

// A card contains the following info:
//    - invoice id
//    - date
//    - entity (if buyer, show seller. Otherwise, show buyer)
//    - total
//    - status

import React, { Component } from 'react';

/**
 * An element displaying the high-level overview of a single order.
 *
 * @props orderData - All high-level data to be displayed in the element.
 * @constructor
 */
export class Card extends Component {

    constructor(props) {
        super(props);
        this.orderData = this.props.orderData;
        this.orderId = this.orderData.OrderId;
        this.onClick = this.props.onClick;
    }

    createInfoElements() {
        let infoElements = [];
        let keys = Object.keys(this.orderData);
        for (let k=0; k<keys.length; k++) {
            let key = keys[k];
            let value = this.orderData[key];
            infoElements.push(<div
                key={key}
                className={key}
                style={divStyle}>
                {value}
            </div>);
        }
        return infoElements;
    }

    render() {
        let childElements = this.createInfoElements();
        return (
            <div className={'Card'} onClick={this.onClick}>
                {childElements}
            </div>
        );
    }
}

const divStyle = {
    position: 'relative',
    width: '300px',
    height: '50px',
    color: '#FFFFFF'
};
