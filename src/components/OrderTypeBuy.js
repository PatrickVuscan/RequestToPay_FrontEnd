import constants from "../constants";
import React, { Component } from 'react';

const customer = constants.PERSONA.customer;
const unpaid = constants.STATUS.customer.unpaid;
const paid = constants.STATUS.customer.paid;
const completed = constants.STATUS.customer.completed;

class OrderTypeBuy extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {transitionToOrderList} = this.props;
    return (
      <div id="buy_wrapper">
        <div className={"home_block"} id={"buy_block"}>
          <div className={"type_block"}>
            <h1>Buying.</h1>
            <ul>
              <li onClick={() => transitionToOrderList(customer, unpaid)}>Ready to Pay.</li>
              <li><s>Waiting for Delivery.</s></li>
              <li><s>Completed Orders.</s></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderTypeBuy;



