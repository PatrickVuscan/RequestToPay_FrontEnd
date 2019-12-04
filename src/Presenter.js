import React, { Component } from 'react'
import Home from "./views/Home"
import Login from './views/Login'
import {CardList} from "./views/CardList"
import Order from "./views/Order";
import Menu from "./components/Menu"
import Loading from "./views/Loading";
import constants from "./constants";
import './Presenter.css'
import {getOrdersByEntityAndPersona, setOrderStatus} from "./models";
import {getCardData} from "./data/CardData";

const VIEW = constants.VIEW;

/**
 * Singleton Presenter in MVP Architecture.
 */
class Presenter extends Component {

  // Responsibilities Include:
  // - handle events due to user input, talk to model layer, then get updates in view again
  // - when handling events, it will speak to model layer (models/index.js):
  //     - tell view to show it is waiting for a response (if it chooses to represent this)
  //     - make use of a model layer
  // - when receiving info from model layer, it will:
  //     - update view data (to package up the information for the view)
  //     - then send the view data back to the view

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
  /**
   * A function which calls helper functions to setup data for the next transition
   *
   * @param view - The name of the view being transitioned to
   * @param orderId - An optional parameter. This is necessary for the order view.
   * @param invoiceId - An optional parameter. This is necessary for the order view.
   */
  transitionTo(view, orderId, invoiceId){
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
      case VIEW.order:
        this.transitionToOrder(orderId, invoiceId);
        break;
      default:
        this.transitionToHome();
        break;
    }
    this.setCurrentView(view);
  }

  transitionToLogOut(){
    this.setState({currentView: VIEW.login});
    this.setCurrentView(VIEW.login);
    global.loggedIn = false;
    global.username = 'Not Logged In!';
  }

  transitionToHome(){
    this.setState({currentView: VIEW.home});
    this.setCurrentView(VIEW.home);
  }

  transitionToCardList(){
    this.setState({currentView: VIEW.cardList,});
    this.setCurrentView(VIEW.cardList);
  }

  transitionToOrder(orderId, invoiceId) {
    this.setState({currentView: VIEW.order,});
    this.setCurrentView(VIEW.order);
    this.setOrderID(orderId);
    this.setInvoiceID(invoiceId);
  }

  // Log In Methods ----------------------------//

  loginHandler(username, name, entityId){
    this.setLoggedIn(true);
    this.setUsername(username);
    this.setName(name);
    this.setEntityId(entityId);
    this.transitionTo(VIEW.home);
  }

  // Request to Pay

  processPayment(actionOnSuccess){
    setOrderStatus(global.viewOrderID, constants.api.OrderStatus.Paid, true, actionOnSuccess);
    this.setState({currentView: VIEW.order,}); // return to updated view
  }

  statusArrived(actionOnSuccess){
    setOrderStatus(global.viewOrderID, constants.api.OrderStatus.Arrived, true, actionOnSuccess);
    this.setState({currentView: VIEW.order,}); // return to updated view
  }

  statusDelivered(actionOnSuccess){
    setOrderStatus(global.viewOrderID, constants.api.OrderStatus.Delivered, true, actionOnSuccess);
    this.setState({currentView: VIEW.order,}); // return to updated view
  }

  // Loading transition ------------------------//

  startLoading(){
      this.setState({isLoading: true})
  }

  stopLoading(){
      this.setState({isLoading: false})
  }

  // Populate CardList -------------------------//

  getOrdersOverview(setOrdersData) {
      getCardData(getOrdersByEntityAndPersona, global.entityId, global.viewPersona, global.viewStatus, setOrdersData);
  }

  // Global Setters ----------------------------//

  setLoggedIn(isLoggedIn){
    global.loggedIn = isLoggedIn;
  }

  setUsername(username){
    global.username = username;
  }

  setName(name){
    global.name = name;
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

  setOrderID(ID) {
    global.viewOrderID = ID;
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
      case VIEW.order:
        return <Order/>;
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

// Exporting Presenter as a Singleton
Object.freeze(Presenter);
export default Presenter;
