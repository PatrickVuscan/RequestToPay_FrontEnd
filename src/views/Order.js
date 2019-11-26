/*
* This component will display the contents of the invoice.
* If this is a Buying Order, it will have an option to pay,
* which will reveal a pay menu (transitioning to RTP)
*/

import React, { Component } from 'react';
import constants from "../constants";
import "./Order.css"
import PayMenu from "../components/PayMenu.js"
import Invoice from "../components/Invoice";

const VIEW = constants.VIEW;

class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      payMenuOpen: false,
    };
    this.togglePayMenuOpen = this.togglePayMenuOpen.bind(this);
  }

  togglePayMenuOpen(){
    this.setState(prevState => ({payMenuOpen: !prevState.payMenuOpen}));
  }

  // TODO: Getting Order Logic

  render() {
    const { payMenuOpen } = this.state;

    return (
      <div id={"order_container"}>
        <div className={"order_block"}>
          ORDER #{global.viewInvoiceID}
        </div>
        <Invoice />
        <div className={"order_block"}>
          ~~~~~~
        </div>
        {/* Order Contents goes Here */}
        {/* PayMenu interaction IF status is UNPAID */}
        <div className={"order_block"} onClick={() => this.togglePayMenuOpen()}>
          ~ Pay Menu Button ~
        </div>
        {payMenuOpen &&
          <PayMenu
            payMenuOpen={this.state.payMenuOpen}
            order={this}
          />
        }
      </div>

    );
  }

}

export default Order;
