/* Order Actions toolbar for the Order View */

import React, {Component} from "react";
import constants from "../constants";
import "./OrderActions.css"

const PERSONA = constants.PERSONA;
const STATUSES = constants.STATUSES;

class OrderActions extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  userSwitch() {
    switch (global.viewPersona) {
      case PERSONA.seller.name:
        return "orderActions_options seller-accent";
      case PERSONA.customer.name:
        return "orderActions_options customer-accent";
      case PERSONA.driver.name:
        return "orderActions_options driver-accent";
      default:
        return "orderActions_options home-accent";
    }
  }

  isSeller() {
    return (global.viewPersona === PERSONA.seller.name);
  }
  isCustomer() {
    return (global.viewPersona === PERSONA.customer.name);
  }
  isDriver() {
    return (global.viewPersona === PERSONA.driver.name);
  }

  conditionalStatusIncomplete(type){
    switch(type) {
      case STATUSES.approved:
        return false;
      case STATUSES.paid:
        return !global.invoiceApproved;
      case STATUSES.arrived:
        return !global.invoiceApproved;
      case STATUSES.delivered:
        return !global.invoiceArrived || !global.invoicePaid;
      default:
        return null;
    }
  }

  getStatusIncomplete(type){
    switch(type) {
      case STATUSES.approved:
        return !global.invoiceApproved;
      case STATUSES.paid:
        return !global.invoicePaid;
      case STATUSES.arrived:
        return !global.invoiceArrived;
      case STATUSES.delivered:
        return !global.invoiceDelivered;
      default:
        return null;
    }
  }

  getEntityType(type){
    switch(type) {
      case STATUSES.approved:
        return this.isSeller();
      case STATUSES.paid:
        return this.isCustomer();
      case STATUSES.arrived:
        return this.isDriver();
      case STATUSES.delivered:
        return this.isDriver();
      default:
        return null;
    }
  }

  getOnClickAction(type) {
    switch(type) {
      case STATUSES.approved:
        this.props.order.toggleInvoiceMenuOpen();
        break;
      case STATUSES.paid:
        this.props.order.togglePayMenuOpen();
        break;
      case STATUSES.arrived:
        global.presenter.statusArrived(this.props.order.updateOrder);
        break;
      case STATUSES.delivered:
        this.props.order.toggleDeliveryMenuOpen();
        break;
      default:
        this.props.order.updateOrder();
    }
  }

  getIcon(status) {
    switch(status) {
      case STATUSES.approved:
        return (<img src={"images/icons/approved.png"} className="icon" alt={"I"}/>);
      case STATUSES.paid:
        return (<img src={"images/icons/pay.png"} className="icon" alt={"$"}/>);
      case STATUSES.arrived:
        return (<img src={"images/icons/arrived.png"} className="icon" alt={"A"}/>);
      case STATUSES.delivered:
        return (<img src={"images/icons/delivered.png"} className="icon" alt={"D"}/>);
      default:
        return null;
    }
  }

  getButton(status) {
    if (this.conditionalStatusIncomplete(status)) {
      return (
        <div className={"orderActions_options inactive"}
             onClick={() => this.props.order.updateOrder()}>
          {this.getIcon(status)}
        </div>
      )
    }
    if (this.getStatusIncomplete(status)) {
      if (this.getEntityType(status)){
        return (
          <div className={this.userSwitch()}
               onClick={() => this.getOnClickAction(status)}>
            {this.getIcon(status)}
          </div>
        );
      } else {
        return (
          <div className={"orderActions_options incomplete"}
               onClick={() => this.props.order.updateOrder()}>
            {this.getIcon(status)}
          </div>
        )
      }
    } else {
      return (
        <div className={"orderActions_options complete"}>
          {this.getIcon(status)}
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

  render() {
    return (
      <div id={"orderActions_block"}>
        <div id={"orderActions_wrapper"}>
          {this.getRouteButton()}
          {this.getButton(STATUSES.approved)}
          {this.getButton(STATUSES.paid)}
          {this.getButton(STATUSES.arrived)}
          {this.getButton(STATUSES.delivered)}
        </div>
      </div>
    );
  }
}

export default OrderActions;
