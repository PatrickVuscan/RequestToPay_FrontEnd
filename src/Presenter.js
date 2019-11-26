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
import Home from "./views/Home"
import Login from './views/Login'
import {CardList} from "./views/CardList"
import Invoice from "./views/Invoice";
import Menu from "./components/Menu"
import Loading from "./views/Loading";
import constants from "./constants";
import './Presenter.css'
import {getEntityIdByUsername} from './models'

const VIEW = constants.VIEW;
const PERSONA = constants.PERSONA;
const STATUS = constants.STATUS;

// TODO: Assure that we can open a card list of ANY TYPE. Currently only 'Customer Unpaid' is an option.

class Presenter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentView: VIEW.login,
      isLoading: false,
    };
    this.loginHandler = this.loginHandler.bind(this);
    global.presenter = this;  // TODO: singleton pattern?
  }

  // Transitions -----------------------------//
  // TODO: replace with hashmap pattern?
  transitionTo(view){
    switch(view){
      case VIEW.login:
        this.transitionToLogOut();
        break;
      case VIEW.home:
        this.transitionToHome();
        break;
      case VIEW.cardList:
         this.transitionToCardList();
         break;
      case VIEW.invoice:
        this.transitionToInvoice();
        break;
      default:
        this.transitionToHome();
        break;
    }
    this.setCurrentView(view);
  }

  transitionToLogOut(){
    this.setState({currentView: VIEW.login});
    global.loggedIn = false;
    global.username = 'Not Logged In!';
  }

  transitionToHome(){
    this.setState({currentView: VIEW.home});
  }

  transitionToCardList(){
    this.setState({currentView: VIEW.cardList,});
  }

  // TODO: Remove when Buyer Invoice page created.
  // This is currently testing that a function would be properly called.
  transitionToInvoice() {
    // console.log("TEST: Would Transition To Invoice - " + ID);
    this.setState({currentView: VIEW.invoice,});
  }

  // transitionToSellerList(){}       // TODO: Later
  // transitionToBuyerInvoice(ID){}   // TODO: Later
  // transitionToSellerInvoice(ID){}  // TODO: Later
  // transitionToPayID(ID){}          // TODO: Later

  // Log In Methods ----------------------------//

  loginHandler(username, entityId){
    this.setLoggedIn(true);
    this.setUsername(username);
    this.setEntityId(entityId);
    this.transitionTo(VIEW.home);
  }

  // Request to Pay
  // TODO: Add payment actions here.
  processPayment(){
    console.log("TEST: Process payment for Order #" + global.viewInvoiceID);
    // TODO: add some function to backend.js to interact with Interac RTP
    // TODO: add some function to backend.js to change status of Invoice to Paid
    this.setState({currentView: VIEW.invoice,}); // return to view
  }

  // Loading transition ------------------------//

  startLoading(){
      this.setState({isLoading: true})
  }

  stopLoading(){
      this.setState({isLoading: false})
  }

  // Global Setters ----------------------------//

  setLoggedIn(isLoggedIn){
    global.loggedIn = isLoggedIn;
  }

  setUsername(username){
    global.username = username;
  }

  setEntityId(entityId) {
    global.entityId = entityId;
  }

  setCurrentView(view){
    global.currentView = view;
  }

  setViewPersona(persona) {
    global.viewPersona = persona;
  }

  setViewStatus(status) {
    global.viewStatus = status;
  }

  setInvoiceID(ID){
    global.viewInvoiceID = ID;
  }

  // Views to pass ----------------------------------//
  viewSwitch(view){
    switch(view){
      case VIEW.login:
        return <Login/>;
      case VIEW.home:
        return <Home/>;
      case VIEW.cardList:
        return <CardList/>;
      case VIEW.invoice:
        return <Invoice/>;
      default:
        return <Home/>;
    }
  }

  // Return appropriate view to Index.js -----------//

  render() {
    return (
      <div id="presenter_block">
        {this.state.isLoading && <Loading currentView={this.state.currentView}/>}
        <Menu
          currentView={this.state.currentView}
        />
        {this.viewSwitch(this.state.currentView)}
      </div>
    )
  }
}

export default Presenter;
