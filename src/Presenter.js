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
import {getEntityIdByUsername} from './models'
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
    };

    // Pass Methods to Components
    this.loginHandler = this.loginHandler.bind(this);
    // this.setEntityId = this.setEntityId.bind(this);
    // this.transitionToOrderList = this.transitionToOrderList.bind(this);
    // this.TEMPtransitionToInvoice = this.TEMPtransitionToInvoice.bind(this);

    global.presenter = this;

  }

  // Menu Methods -----------------------------//

  setMenuColor(color){
    global.menuColor = color;
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

      case "orderList":
         this.transitionToOrderList();
         break;

      default:
        this.transitionToHome();
        break;

    }
  }

  transitionToLogOut(){
    this.setMenuColor('transparent');
    this.setState({currentView: VIEW.login});
    // global.currentView = VIEW.login;
    global.loggedIn = false;
    global.username = 'Not Logged In!';
    // this.setState({
    //   username: 'Not Logged In!',
    //   loggedIn: false
    // });
  }

  transitionToHome(){
    this.setState({currentView: VIEW.home});
    this.setMenuColor('var(--RED)');
  }

  transitionToOrderList(persona, status){
     this.setState({currentView: VIEW.cardList,});
     // global.currentView = VIEW.cardlist;
     global.viewPersona = persona;
     global.viewStatus = status;
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
        // return <Login
        //           loginHandler = {this.loginHandler}/>;
        return <Login/>;

      case VIEW.home:
        return <OrderTypeMenu
                  // username={this.state.username}
                  // transitionToOrderList={this.transitionToOrderList}
        />;

      case VIEW.cardList: // TODO: Update according to CardList props parameters.
        return <CardList
            entityId={this.state.entityId}
            persona={this.state.persona}
            statusString={this.state.status}
            cardClickHandler={this.TEMPtransitionToInvoice} />;

      default:
        return <OrderTypeMenu
          // transitionToOrderList={this.transitionToOrderList}
        />;
    }
  }

  // Log In Methods ----------------------------//

  loginHandler(username){
    global.loggedIn = true;
    global.username = username;
    this.transitionToHome();
    getEntityIdByUsername(username, this.setEntityId);
  }

  setEntityId(entityId) {
    global.entityId = entityId;
  }

  // Rendering the appropriate Views -----------//
  render() {
    return (
      <div id="presenter_block">
        <Menu
          // menuColor = {this.state.menuColor}
          // transitionTo = {this.transitionTo}
          // showMenu = {this.state.loggedIn ? 'true' : 'false'}
        />
        {this.viewSwitch(this.state.currentView)}
      </div>
    )
  }
}

export default Presenter;
