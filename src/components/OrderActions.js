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

  isCustomerDriver() {
    return (this.isCustomer() || this.isDriver());
  }

  isCustomer() {
    return (global.viewPersona === PERSONA.customer.name);
  }
  isDriver() {
    return (global.viewPersona === PERSONA.driver.name);
  }

  getPayIcon() {
    return (<img src={"images/icons/pay.png"} className="icon" alt={"$"}/>);
  }

  getPayButton() {
    if (!global.invoicePaid) { // is not paid, make actionable
      if (this.isCustomer()){
        return (
            <div className={this.userSwitch()}
                 onClick={() => this.props.order.togglePayMenuOpen()}>
              {this.getPayIcon()}
            </div>
        );
      } else {
        return (
            <div className={"orderActions_options incomplete"}>
              {this.getPayIcon()}
            </div>
        )
      }
    } else {  // is paid
      return (
        <div className={"orderActions_options complete"}>
          {this.getPayIcon()}
        </div>
      )
    }
  }

  getArrivedIcon(){
    return(<img src={"images/icons/arrived.png"} className="icon" alt={"A"}/>);
  }

  getArrivedButton() {
    if (!global.invoiceArrived) {
      if (this.isDriver()){
        return (
            <div className={this.userSwitch()}
                 onClick={() => global.presenter.statusArrived(this.props.order.updateOrder)}>
              {this.getArrivedIcon()}
            </div>
        );
      } else {
        return (
            <div className={"orderActions_options incomplete"}>
              {this.getArrivedIcon()}
            </div>
        )
      }
    } else {
      return (
          <div className={"orderActions_options complete"}>
            {this.getArrivedIcon()}
          </div>
      )
    }
  }

  // getArrivedButton(){
  //   if (global.viewPersona === PERSONA.driver.name && !global.invoiceArrived) {
  //     return (
  //       <div className={this.userSwitch()}
  //            onClick={() => global.presenter.statusArrived(this.props.order.updateOrder)}>
  //         <img src={"images/icons/arrived.png"} className="icon" alt={"A"}/>
  //       </div>
  //     );
  //   }
  // }

  getDeliveredIcon(){
    return(<img src={"images/icons/delivered.png"} className="icon" alt={"D"}/>);
  }

  getDeliveredButton() {
    if (!global.invoiceDelivered) {
      if (this.isDriver()){
        return (
          <div className={this.userSwitch()}
               onClick={() => this.props.order.toggleDeliveryMenuOpen()}>
            {this.getDeliveredIcon()}
          </div>
        );
      } else {
        return (
            <div className={"orderActions_options incomplete"}>
              {this.getDeliveredIcon()}
            </div>
        )
      }
    } else {
      return (
          <div className={"orderActions_options complete"}>
            {this.getDeliveredIcon()}
          </div>
      )
    }
  }


  getRouteButton(){
    if (this.isDriver() && !global.invoiceDelivered) {
      return (
        <div className={this.userSwitch()}
             onClick={() => this.props.order.toggleRouteMenuOpen()}>
          <img src={"images/icons/route.png"} className="icon" alt={"R"}/>
        </div>
      );
    }
  }

  // getDeliveredButton(){
  //   if (global.viewPersona === PERSONA.driver.name && global.invoiceArrived && !global.invoiceDelivered) {
  //     return (
  //       <div className={this.userSwitch()}
  //            onClick={() => this.props.order.toggleDeliveryMenuOpen()}>
  //         <img src={"images/icons/delivered.png"} className="icon" alt={"D"}/>
  //       </div>
  //     );
  //   }
  // }

  render() {
    return (
      <div id={"orderActions_block"}>
        <div id={"orderActions_wrapper"}>
          {this.getPayButton()}
          {this.getArrivedButton()}
          {this.getDeliveredButton()}
          {this.getRouteButton()}
        </div>
      </div>
    );
  }
}

export default OrderActions;
