import React, { Component } from 'react';
import constants from "../constants";

const seller = constants.PERSONA.seller.name;
const sellerString = constants.PERSONA.seller.string;
// const action_invoice = constants.PERSONA.seller.action_invoice.string;
const incomplete = constants.STATUS.seller.incomplete.string;
const completed = constants.STATUS.seller.completed.string;
const VIEW = constants.VIEW;

class OrderTypeSell extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  transitionTo(status) {
    global.presenter.setViewPersona(seller);
    global.presenter.setViewStatus(status);
    global.presenter.transitionTo(VIEW.cardList)
  }

  render() {
    return (
      <div id="sell_wrapper">
        <div className={"home_block"}>
          <div className={"type_block"}>
            <h1>{sellerString}</h1>
            <ul>
              {/*<li onClick={() => this.transitionTo(action_invoice)}>{action_invoice}</li>*/}
              <li onClick={() => this.transitionTo(incomplete)}>{incomplete}</li>
              <li onClick={() => this.transitionTo(completed)}>{completed}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderTypeSell;



