import React, { Component } from 'react';
import "./Loading.css"
import loader from "../assets/loader.gif"
import constants from "../constants";

const VIEW = constants.VIEW;
const PERSONA = constants.PERSONA;

class Loading extends Component {

  constructor(props) {
    super(props);
  }

  // Change menu class to change colors.
  viewSwitch(view){
    switch(view){
      case VIEW.login:
        return " login-background";
      case VIEW.home:
        return " home-background";
      case VIEW.cardList:
        return this.backgroundSwitch();
      case VIEW.order:
        return this.backgroundSwitch();
      default:
        return " home-background";
    }
  }

  backgroundSwitch() {
    switch(global.viewPersona) {
      case PERSONA.seller.name:
        return "seller-background";
      case PERSONA.customer.name:
        return "customer-background";
      case PERSONA.driver.name:
        return "driver-background";
      default:
        return "home-background";
    }
  }

  render() {
    return (
      <div id={"loading_container"}
           className={this.viewSwitch(this.props.currentView)}>
        <div id="loading_scotia">
          Scotia
        </div>
        <div id={"loading_block"} onClick={() => global.presenter.stopLoading()}>
          <img src={loader} alt={"LOADING..."} id={"loader"}/>
        </div>
      </div>
    );
  }

}

export default Loading;
