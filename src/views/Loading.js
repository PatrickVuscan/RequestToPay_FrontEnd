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
        return " login-menu";
      case VIEW.home:
        return " home-accent";
      case VIEW.cardList:
        return this.backgroundSwitch();
      case VIEW.order:
        return this.backgroundSwitch();
      default:
        return " home-menu";
    }
  }

  backgroundSwitch() {
    switch(global.viewPersona) {
      case PERSONA.seller.name:
        return "seller-menu";
      case PERSONA.customer.name:
        return "customer-menu";
      case PERSONA.driver.name:
        return "driver-menu";
      default:
        return "home-accent";
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
