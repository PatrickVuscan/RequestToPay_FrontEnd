/*
* This component will display the contents of the invoice.
* If this is a Buying Invoice, it will have an option to pay,
* which will reveal a pay menu (transitioning to RTP)
*/

import React, { Component } from 'react';
import constants from "../constants";
import "./Invoice.css"
import PayMenu from "../components/PayMenu.js"

const VIEW = constants.VIEW;
const PERSONA = constants.PERSONA;

class Invoice extends Component {

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

  viewSwitch(){
    switch(global.viewPersona){
      case PERSONA.seller:
        return "seller-background";
      case PERSONA.customer:
        return "customer-background";
      default:
        return "home-background"
    }
  }

  // TODO: Getting Invoice Logic

  render() {
    const { payMenuOpen } = this.state;

    return (
      <div
        id={"invoice_container"}
        className={this.viewSwitch()}
      >
        <div
          id={'invoice_header'}
          className={'customer-accent'}
        >
          <div className={"invoice_header_item"}>
            Order #9899
          </div>
          <div className={"invoice_header_item"}>
            From Coca-Cola
          </div>
          <div className={"invoice_header_item"}>
            1999-99-99
          </div>
          <div
            className={"invoice_header_item"}
            onClick={() => this.togglePayMenuOpen()}
          >
            [[ Pay Now! ]]
          </div>

        </div>

        {/* Invoice Contents goes Here */}
        <div
          className={"invoice_block"}
        >
          INVOICE #{global.viewInvoiceID}
        </div>
        <div className={"invoice_block"}>
          SOME INFORMATION
        </div>
        <div className={"invoice_block"}>
          SOME INFORMATION
        </div>
        <div className={"invoice_block"}>
          ~~~~~~
        </div>
        {/* Invoice Contents goes Here */}


        {/* PayMenu interaction IF status is UNPAID */}

        {payMenuOpen &&
          <PayMenu
            payMenuOpen={this.state.payMenuOpen}
            invoice={this}
          />
        }
      </div>

    );
  }

}

export default Invoice;
