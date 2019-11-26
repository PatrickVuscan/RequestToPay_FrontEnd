import React, { Component } from 'react';
import "./Loading.css"
import loader from "../assets/loader.gif"
import constants from "../constants";

const VIEW = constants.VIEW;

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
        return " home-menu";
      case VIEW.cardList:
        return " customer-menu"; // TODO: Make conditional based on persona
      default:
        return " home-menu";
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
          <img src={loader} alt={"LOADING..."}/>
        </div>
      </div>
    );
  }

}

export default Loading;
