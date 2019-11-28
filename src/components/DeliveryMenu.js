/* Pay Menu is the payment confirmation menu for the Order View */

import React, {Component} from "react";
import constants from "../constants";
import "./DeliveryMenu.css"

const VIEW = constants.VIEW;

class DeliveryMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.transitionTo = this.transitionTo.bind(this);
    this.toggleDeliveryMenuOpen = this.toggleDeliveryMenuOpen.bind(this);
  }

  transitionTo(view){
    this.toggleDeliveryMenuOpen();
    global.presenter.transitionTo(view);
  }

  statusDelivered(){
    this.toggleDeliveryMenuOpen();
    global.presenter.statusDelivered(); // Payment functions in Presenter.
  }

  toggleDeliveryMenuOpen(){
    this.props.order.toggleDeliveryMenuOpen()
  }

  render() {
    return (
      <div
        id={"payMenu_block"}
        className={"driver-accent"}
      >
        <div id={"payMenu_title"}>
          Order Delivered?
        </div>

        <div id={"payMenu_options_wrapper"}>
          <div id={"payMenu_options"}
               className={"button"}
               onClick={() => this.statusDelivered()}>
            YES
          </div>
          <div id={"payMenu_options"}
               onClick={() => this.toggleDeliveryMenuOpen()}>
            NO
          </div>
        </div>
      </div>
    );
  }
}

export default DeliveryMenu;
