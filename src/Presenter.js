import React, { Component } from 'react'
import Home from "./views/Home"
import Login from './views/Login'
import SignUp from "./views/SignUp"
import Products from "./views/Products"
import Invoice from "./views/Invoice"
import MakeOrder from "./views/MakeOrder"
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
    this.toSignUpHandler = this.toSignUpHandler.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
    this.invoiceHandler = this.invoiceHandler.bind(this);
    this.makeProductHandler = this.makeProductHandler.bind(this);
    this.makeorderHandler = this.makeorderHandler.bind(this);
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
      case VIEW.signup:
        this.transitionToSignUp();
        break;
      case VIEW.makeorder:
        this.transitionToMakeOrder();
        break;
      case VIEW.products:
        this.transitionToMakeProduct();
        break;
      case VIEW.invoice:
        this.transitionToInvoice();
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

  transitionToSignUp(){
    this.setState({currentView: VIEW.signup});
  }

  transitionToHome(){
    this.setState({currentView: VIEW.home});
    this.setCurrentView(VIEW.home);
  }

  transitionToMakeOrder(){
    this.setState({currentView: VIEW.makeorder});
  }

  transitionToMakeProduct(){
    this.setState({currentView: VIEW.products});
  }

  transitionToInvoice(){
    this.setState({currentView: VIEW.invoice});
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

  // Sign Up Methods ---------------------------//

  toSignUpHandler(){
    this.transitionTo(VIEW.signup);
  }

  registerHandler(name, username, entityId){
    this.setLoggedIn(true);
    this.setName(name);
    this.setUsername(username);
    this.setEntityId(entityId);
    this.transitionTo(VIEW.home);
  }

  // Order Methods ---------------------------//

  makeorderHandler(entityId){
    this.setEntityId(entityId);
    this.transitionTo(VIEW.home)
  }

  // Product Methods ---------------------------//

  makeProductHandler(){
    this.transitionTo(VIEW.home)
  }

  // Invoice Methods ---------------------------//

  invoiceHandler(){
    this.transitionTo(VIEW.home);
  }

  // Request to Pay

  processPayment(actionOnSuccess){
    setOrderStatus(global.viewOrderID, constants.api.OrderStatus.Paid, true, actionOnSuccess);
    this.setState({currentView: VIEW.order,}); // return to updated view
  }

  statusApproved(actionOnSuccess){
    setOrderStatus(global.viewOrderID, constants.api.OrderStatus.Approved, true, actionOnSuccess);
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
      case VIEW.signup:
        return <SignUp/>;
      case VIEW.products:
        return <Products/>;
      case VIEW.makeorder:
        return <MakeOrder/>;
      case VIEW.invoice:
        return <Invoice/>;
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
