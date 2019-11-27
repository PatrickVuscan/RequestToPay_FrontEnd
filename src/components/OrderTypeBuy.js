import constants from "../constants";
import React, { Component } from 'react';

const customer = constants.PERSONA.customer.name;
const customerString = constants.PERSONA.customer.string;
const unpaid = constants.STATUS.customer.unpaid.string;
const paid = constants.STATUS.customer.paid.string;
const completed = constants.STATUS.customer.completed.string;
const VIEW = constants.VIEW;
const PERSONA = constants.PERSONA;

class OrderTypeBuy extends Component {

  constructor(props) {
    super(props);
    this.transitionTo = this.transitionTo.bind(this);
  }

  transitionTo(status) {
    global.presenter.setViewPersona(customer);
    global.presenter.setViewStatus(status);
    global.presenter.transitionTo(VIEW.cardList)
  }

  render() {
    return (
      <div id="buy_wrapper">
        <div className={"home_block"} id={"buy_block"}>
          <div className={"type_block"}>
            <h1>{customerString}</h1>
            <ul>
              <li onClick={() => this.transitionTo(unpaid)}> {unpaid} </li>
              <li onClick={() => this.transitionTo(paid)}> {paid} </li>
              <li onClick={() => this.transitionTo(completed)}> {completed} </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderTypeBuy;



