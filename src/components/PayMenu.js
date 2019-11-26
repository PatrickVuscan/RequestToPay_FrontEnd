/* Pay Menu is the payment confirmation menu for the Order View */

import React, {Component} from "react";
import constants from "../constants";
import {Card} from "./Card";

const VIEW = constants.VIEW;

class PayMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.transitionTo = this.transitionTo.bind(this);
    this.togglePayMenuOpen = this.togglePayMenuOpen.bind(this);
  }

  transitionTo(view){
    this.togglePayMenuOpen();
    global.presenter.transitionTo(view);
  }

  togglePayMenuOpen(){
    this.props.order.togglePayMenuOpen()
  }

  render() {
    return (
      <div
        onClick={() => this.togglePayMenuOpen()}
      >
        Pay Menu is Open!!
      </div>
    );
  }
}

export default PayMenu;
