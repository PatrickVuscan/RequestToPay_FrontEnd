/*
* This component will display the contents of the invoice.
* If this is a Buying Order, it will have an option to pay,
* which will reveal a pay menu (transitioning to RTP)
*/

import React, {cloneElement, Component} from 'react';
import constants from "../constants";
import "./Order.css";
import PayMenu from "../components/PayMenu.js";
import DeliveryMenu from "../components/DeliveryMenu"
import Invoice from "../components/Invoice";
import DriverRoute from "./DriverRoute";
import {getInfo, getItems} from "../data/InvoiceData";

const VIEW = constants.VIEW;
const PERSONA = constants.PERSONA;

class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      payMenuOpen: false,
      driverMenuOpen: true,
      deliveryMenuOpen: false,
      info: {},
      items : [],
      total : 0
    };
    this.updateOrder = this.updateOrder.bind(this);

    this.togglePayMenuOpen = this.togglePayMenuOpen.bind(this);
    this.toggleDriverMenuOpen = this.toggleDriverMenuOpen.bind(this);
    this.toggleDeliveryMenuOpen = this.toggleDeliveryMenuOpen.bind(this);

    this.setInfo = this.setInfo.bind(this);
    this.setItems = this.setItems.bind(this);
    this.setTotal = this.setTotal.bind(this);
  }

  componentDidMount() {
    this.updateOrder();
  }

  updateOrder() {
    getInfo(global.viewOrderID, this.setInfo);
    getItems(global.viewInvoiceID, this.setItems, this.setTotal);
  }

  setInfo(info) {
    this.setState({'info': info});
  }

  setItems(items) {
    this.setState({'items': items});
  }

  setTotal(total) {
    this.setState({'total': total.toFixed(2)});
  }

  togglePayMenuOpen(){
    this.setState(prevState => ({payMenuOpen: !prevState.payMenuOpen}));
  }

  toggleDriverMenuOpen(){
    this.setState(prevState => ({driverMenuOpen: !prevState.driverMenuOpen}));
  }

  toggleDeliveryMenuOpen(){
    this.setState(prevState => ({deliveryMenuOpen: !prevState.deliveryMenuOpen}));
  }
  backgroundSwitch(){
    switch(global.viewPersona){
      case PERSONA.seller.name:
        return "seller-background";
      case PERSONA.customer.name:
        return "customer-background";
      case PERSONA.driver.name:
        return "driver-background";
      default:
        return "home-background"
    }
  }

  accentSwitch() {
    switch(global.viewPersona) {
      case PERSONA.seller.name:
        return "seller-accent";
      case PERSONA.customer.name:
        return "customer-accent";
      case PERSONA.driver.name:
        return "driver-accent";
      default:
        return "home-accent";
    }
  }

  getHeaderInfo() {
    let info = this.state.info;
    return(
        <div id={"order_GeneralInfo"}>
          <div id={"order_OrderId"} className={"order_header_item"}> Order #{global.viewOrderID}</div>
          <div id={"order_OrderDate"} className={"order_header_item"}> Ordered: {info["OrderDate"]}</div>
          <div id={"order_DeliveryDate"} className={"order_header_item"}> Expected Delivery: {info["DeliveryDate"]}</div>
          <div id={"order_Status"} className={"order_header_item"}> Status: {info["Status"]}</div>
        </div>
    );
  }

  getPayButton() {
    if (global.viewPersona === PERSONA.customer.name){
    return(
        <div className={"order_header_item"} onClick={() => this.togglePayMenuOpen()}>
          [[ Pay Now! ]]
        </div>
    );}
  }

  getDeliveryButton() {
    if (global.viewPersona === PERSONA.driver.name) {
      return (
        <div className={"order_header_item"} onClick={() => this.toggleDeliveryMenuOpen()}>
          [[ Delivered ]]
        </div>
      );
    }
  }

  getRouteButton() {
    if (global.viewPersona === PERSONA.driver.name) {
      return (
        <div className={"order_header_item"} onClick={() => this.toggleDriverMenuOpen()}>
          [[ Route ]]
        </div>
      );
    }
  }

  getArrivedButton() {
    if (global.viewPersona === PERSONA.driver.name) {
      return (
        <div className={"order_header_item"} onClick={() => global.presenter.statusArrived(this.updateOrder)}>
          [[ Arrived ]]
        </div>
      );
    }
  }

  getPayMenu() {
    if (global.viewPersona === PERSONA.customer.name && this.state.payMenuOpen){
      return(
        <PayMenu payMenuOpen={this.state.payMenuOpen} order={this} updateOrder={this.updateOrder}/>
      );}
    if (global.viewPersona === PERSONA.driver.name && this.state.deliveryMenuOpen){
      return(
        <DeliveryMenu order={this} updateOrder={this.updateOrder}/>
      );}
  }

  getDriverRoute(){
    if (global.viewPersona === PERSONA.driver.name && this.state.driverMenuOpen){
      return <DriverRoute order={this} updateOrder={this.updateOrder}/>
    }
  }

  render() {
    const { payMenuOpen, info, items, total } = this.state;
    const headerInfo = this.getHeaderInfo();
    const payButton = this.getPayButton();
    const payMenu = this.getPayMenu();

    console.log(this.state);

    return (
      <div id={"order_container"} className={this.backgroundSwitch()}>
        {this.getDriverRoute()}
        <div id={'order_header'} className={this.accentSwitch()}>
          {headerInfo}
          <div id={"order_buttons"}>
            {payButton}
            {this.getDeliveryButton()}
            {this.getRouteButton()}
            {this.getArrivedButton()}
          </div>
        </div>
        <div id={"order_wrapper"}>
          <div className={"order_block"}>
            <div className={"order_invoice"} id={"order_block_spacer"}/>
            <div className={"order_invoice"}>
              <div id={"order_invoiceID"}> Invoice #{info["InID"]}</div>
              <Invoice info={info} items={items} total={total}/>
            </div>
          </div>
        </div>
        {payMenu}
      </div>
    );
  }

}

export default Order;
