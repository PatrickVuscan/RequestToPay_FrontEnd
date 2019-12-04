/* Order Actions Action toolbar Order View */

import React, {Component} from "react";
import constants from "../constants";
import "./OrderActions.css"

const PERSONA = constants.PERSONA;

class OrderActions extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  userSwitch() {
    switch (global.viewPersona) {
      case PERSONA.customer.name:
        return "orderActions_options customer-accent";
      case PERSONA.driver.name:
        return "orderActions_options driver-accent";
      default:
        return "orderActions_options home-accent";
    }
  }

  getPayButton() {
    if (global.viewPersona === PERSONA.customer.name && !global.invoicePaid){
      return(
        <div className={this.userSwitch()}
             onClick={() => this.props.order.togglePayMenuOpen()}>
          $
        </div>
      );}
  }

  getArrivedButton(){
    if (global.viewPersona === PERSONA.driver.name && !global.invoiceArrived) {
      return (
        <div className={this.userSwitch()}
             onClick={() => global.presenter.statusArrived(this.props.order.updateOrder)}>
          <img src={"images/icons/arrived.png"} className="icon" alt={"A"}/>
        </div>
      );
    }
  }

  getRouteButton(){
    if (global.viewPersona === PERSONA.driver.name && !global.invoiceDelivered) {
      return (
        <div className={this.userSwitch()}
             onClick={() => this.props.order.toggleRouteMenuOpen()}>
          <img src={"images/icons/route.png"} className="icon" alt={"R"}/>
        </div>
      );
    }
  }

  getDeliveredButton(){
    if (global.viewPersona === PERSONA.driver.name && global.invoiceArrived && !global.invoiceDelivered) {
      return (
        <div className={this.userSwitch()}
             onClick={() => this.props.order.toggleDeliveryMenuOpen()}>
          <img src={"images/icons/delivered.png"} className="icon" alt={"D"}/>
        </div>
      );
    }
  }

  render() {
    return (
      <div id={"orderActions_block"}>
        <div id={"orderActions_wrapper"}>
          {this.getPayButton()}
          {this.getArrivedButton()}
          {this.getRouteButton()}
          {this.getDeliveredButton()}
        </div>
      </div>
    );
  }
}

export default OrderActions;
