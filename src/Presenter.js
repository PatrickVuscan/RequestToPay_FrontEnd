// We only have 1 presenter

// -------------------

// It's responsibilities are:
// - handle events due to user input, talk to model layer, then get updates in view again
// - when handling events, it will speak to model layer (models/index.js):
//     - tell view to show it is waiting for a response (if it chooses to represent this)
//     - make use of a model layer
// - when receiving info from model layer, it will:
//     - update view data (to package up the information for the view)
//     - then send the view data back to the view

import React, { Component } from 'react'
import constants from "./constants";
import Login from './views/Login'
import Menu from "./components/Menu"
import OrderTypeMenu from "./views/OrderTypeMenu"
import {CardList} from "./views/CardList"
import './Presenter.css'

// enum of views
const VIEW = {
  login: 'login',
  home: 'home',
  orderTypeMenu: 'orderTypeMenu',
  cardList: 'cardList',
};

const PERSONA = constants.PERSONA;
const STATUS = constants.STATUS;

// TODO: Assure that we can open a card list of ANY TYPE. Currently only 'Customer Unpaid' is an option.

class Presenter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentView: VIEW.login,     // default: VIEW.login
      username: 'Not Logged In',
      loggedIn: false,
      menuColor: 'transparent',    // default: transparent
      persona: "ORIG",
      status: "orig"
    };

    // Pass Methods to Components
    this.transitionTo = this.transitionTo.bind(this);
    this.setMenuColor = this.setMenuColor.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.transitionToOrderList = this.transitionToOrderList.bind(this);
    this.TEMPtransitionToInvoice = this.TEMPtransitionToInvoice.bind(this);
  }

  // Menu Methods -----------------------------//

  setMenuColor(color){
    this.setState({menuColor: color})
  }
  //// menuToggle(){}
  //// payMenuShow(){}
  //// payMenuHide(){}

  // Transitions -----------------------------//

  transitionTo(view){
    switch(view){
      case "logOut":
        this.transitionToLogOut();
        break;

      case "home":
        this.transitionToHome();
        break;

      case "buyList": // TODO: Update according to CardList props parameters.
         this.transitionToOrderList();
         break;

      default:
        this.transitionToHome();
        break;

    }
  }

  transitionToLogOut(){
    this.setState({currentView: VIEW.login});
    this.setMenuColor('transparent');
    this.setState({
      username: 'Not Logged In!',
      loggedIn: false
    });
  }

  transitionToHome(){
    this.setState({currentView: VIEW.home});
    this.setMenuColor('var(--RED)');
  }

  //transitionToOrderList(persona, status){
  transitionToOrderList() {
     let persona = PERSONA.customer;
     let status = STATUS.customer.unpaid;
     this.setState({
      currentView: VIEW.cardList,
      persona: persona,
      status: status
    });
    console.log("State set to card list" , this);
    this.setMenuColor('var(--ORANGE)');
  }

  // TODO: Remove when Buyer Invoice page created.
  // This is currently testing that a function would be properly called.
  TEMPtransitionToInvoice(ID) {
    console.log("TEST: Would Transition To Invoice - " + ID);
  }
  // transitionToSellerList(){}       // TODO: Later
  // transitionToBuyerInvoice(ID){}   // TODO: Later
  // transitionToSellerInvoice(ID){}  // TODO: Later
  // transitionToPayID(ID){}          // TODO: Later

  // Views and functions passed to views
  viewSwitch(view){
    switch(view){
      case VIEW.login:
        return <Login
                  loginHandler = {this.loginHandler}/>;

      case VIEW.home:
        return <OrderTypeMenu
                  username={this.state.username}
                  transitionToOrderList={this.transitionToOrderList}/>;

      case VIEW.cardList: // TODO: Update according to CardList props parameters.
        return <CardList
            entityId={this.state.username}
            persona={this.state.persona}
            status={this.state.status}
            cardClickHandler={this.TEMPtransitionToInvoice} />;

      default:
        return <OrderTypeMenu
          username={this.state.username}
          transitionToOrderList={this.transitionToOrderList}/>;
    }
  }

  // Log In Methods ----------------------------//

  loginHandler(username){
    this.setState({
      username: username,
      loggedIn: true,
    }); // TODO: replace with value from DB
    this.transitionToHome();
  }

  // Rendering the appropriate Views -----------//
  render() {
    return (
      <div id="presenter_block">
        <Menu menuColor = {this.state.menuColor}
              transitionTo = {this.transitionTo}
              showMenu = 'true'
        />
        {this.viewSwitch(this.state.currentView)}
      </div>
    )
  }
}

export default Presenter;

