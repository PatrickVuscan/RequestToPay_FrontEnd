/*
* This component will display the contents of the invoice.
* If this is a Buying Order, it will have an option to pay,
* which will reveal a pay menu (transitioning to RTP)
*/

import React, { Component } from 'react';
import constants from "../constants";
import "./Order.css";
import PayMenu from "../components/PayMenu.js";
import Invoice from "../components/Invoice";
import {getInfo, getItems} from "../data/InvoiceData";

const VIEW = constants.VIEW;
const PERSONA = constants.PERSONA;

class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      payMenuOpen: false,
      info: {},
      items : [],
      total : 0
    };
    this.togglePayMenuOpen = this.togglePayMenuOpen.bind(this);
    this.setInfo = this.setInfo.bind(this);
    this.setItems = this.setItems.bind(this);
    this.setTotal = this.setTotal.bind(this);
  }

  componentDidMount() {
    getInfo(global.viewOrderID, this.setInfo);
    getItems(global.viewInvoiceID, this.setItems, this.setTotal);
  }

  setInfo(info) {
    this.setState({'info': info});
    console.log("INFO" + info);
  }

  setItems(items) {
    this.setState({'items': items});
    console.log("ITEMS" + items);
  }

  setTotal(total) {
    this.setState({'total': total.toFixed(2)});
    console.log("TOTAL" + total);
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

  getHeaderInfo() {
    let info = this.state.info;
    return(
        <div id={"GeneralInfo"}>
          <div id={"InvoiceId"}> Invoice #{info["InID"]}</div>
          <div id={"OrderDate"}> Ordered: {info["OrderDate"]}</div>
          <div id={"DeliveryDate"}> Expected Delivery: {info["DeliveryDate"]}</div>
          <div id={"Status"}> Status: {info["Status"]}</div>
        </div>
    );
  }

  getPayButton() {
    return(
        <div className={"order_header_item"} onClick={() => this.togglePayMenuOpen()}>
          [[ Pay Now! ]]
        </div>
    );
  }

  // TODO: Getting Invoice Logic

  render() {
    const { payMenuOpen, info, items, total } = this.state;
    const headerInfo = this.getHeaderInfo();
    const payButton = this.getPayButton();

    return (
      <div id={"order_container"} className={this.viewSwitch()}>
        <div id={'order_header'} className={'customer-accent'}>
          {headerInfo}
          {payButton}
        </div>
        <div className={"order_block"}>
          ORDER #{global.viewOrderID}
        </div>
        <Invoice info={info} items={items} total={total}/>
        {/* PayMenu interaction IF status is UNPAID */}
        {payMenuOpen && <PayMenu payMenuOpen={this.state.payMenuOpen} order={this}/>}
      </div>

    );
  }

}

export default Order;
