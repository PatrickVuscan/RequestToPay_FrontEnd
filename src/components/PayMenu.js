/* Pay Menu is the payment confirmation menu for the Order View */

import React, {Component} from "react";
import constants from "../constants";
import "./PayMenu.css"

const VIEW = constants.VIEW;

class PayMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.transitionTo = this.transitionTo.bind(this);
    this.togglePayMenuOpen = this.togglePayMenuOpen.bind(this);
    this.processPayment = this.processPayment.bind(this);
  }

  transitionTo(view){
    this.togglePayMenuOpen();
    global.presenter.transitionTo(view);
  }

  processPayment(){
    let {updateOrder} = this.props;
    this.togglePayMenuOpen();
    global.presenter.processPayment(updateOrder); // Payment functions in Presenter.
  }

  togglePayMenuOpen(){
    this.props.order.togglePayMenuOpen()
  }

  render() {
    return (
      <div
        id={"payMenu_block"}
        className={"customer-accent"}
      >
        <div id={"payMenu_title"}>
          Send Payment?
        </div>

        <div id={"payMenu_options_wrapper"}>
          <div id={"payMenu_options"}
               className={"button"}
               onClick={() => this.processPayment()}>
            YES
          </div>
          <div id={"payMenu_options"}
               onClick={() => this.togglePayMenuOpen()}>
            NO
          </div>
        </div>
      </div>
    );
  }
}

export default PayMenu;
