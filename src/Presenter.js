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

import Home from "./views/Home"
import React, { Component } from 'react'
import Login from './views/Login'
import SignUp from "./views/SignUp"
import SetUp from "./views/SetUp"
import Products from "./views/Products"
import Invoice from "./views/invoice"
import MakeOrder from "./views/MakeOrder"
import {CardList} from "./views/CardList"
import Order from "./views/Order"
import Menu from "./components/Menu"
import Loading from "./views/Loading"
import constants from "./constants"
import './Presenter.css'
import cookie from 'react-cookies'


const VIEW = constants.VIEW;
const unpaid = constants.STATUS.customer.unpaid.string;


// TODO: Assure that we can open a card list of ANY TYPE. Currently only 'Customer Unpaid' is an option.

class Presenter extends Component {

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
    this.personaSetHandler = this.personaSetHandler.bind(this);
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
      case VIEW.setup:
        this.transitionToSetUp();
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
    cookie.save('currentView', global.currentView, { path: '/' });
    cookie.remove('username', global.username, { path: '/' });
    cookie.remove('currentView', global.currentView, { path: '/' });
    cookie.remove('entityID', global.entityId, { path: '/' });
  }

  transitionToSignUp(){
    this.setState({currentView: VIEW.signup});
  }

  transitionToSetUp(){
    this.setState({currentView: VIEW.setup});
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

  transitionToHome(){
    this.setState({currentView: VIEW.home});
    this.setCurrentView(VIEW.home);
  }

  transitionToCardList(){
    this.setState({currentView: VIEW.cardList,});
    this.setCurrentView(VIEW.cardList);
  }

  // TODO: Remove when Buyer Order page created.
  // This is currently testing that a function would be properly called.
  transitionToOrder(orderId, invoiceId) {
    console.log("TEST: In Transition To Order - " + orderId);
    this.setState({currentView: VIEW.order,});
    this.setCurrentView(VIEW.order);
    this.setOrderID(orderId);
    this.setInvoiceID(invoiceId);
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

  // Sign Up Methords ---------------------------//

  toSignUpHandler(){
    this.transitionTo(VIEW.signup);
  }

  registerHandler(username){
    this.setLoggedIn(true);
    this.setUsername(username);
    this.transitionTo(VIEW.home);
  }

  toSetUpHandler(){
    this.transitionTo(VIEW.setup);
  }

  // Set Up Methods ---------------------------//


  //TODO: this method doesn't work ~consider having backend make changes to persona directly
  personaSetHandler(shifts, personas){
    shifts.setCustomer(personas.customer);
    shifts.setSeller(personas.seller);
    shifts.setDriver(personas.driver);
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
  // TODO: Add payment actions here.
  processPayment(){
    console.log("TEST: Process payment for Order #" + global.viewInvoiceID);
    // TODO: add some function to backend.js to interact with Interac RTP
    // TODO: add some function to backend.js to change status of Invoice to Paid
    this.setState({currentView: VIEW.invoice,}); // return to view
  }

  // Request to Pay
  // TODO: Add payment actions here.
  processPayment(){
    console.log("TEST: Process payment for Order #" + global.viewOrderID);
    // TODO: add some function to backend.js to interact with Interac RTP
    // TODO: add some function to backend.js to change status of Invoice to Paid
    this.setState({currentView: VIEW.order,}); // return to view
  }

  statusArrived(){
    console.log("TEST: Arrived Status for Order #" + global.viewOrderID);
  }

  statusDelivered(){
    console.log("TEST: Delivered Status for Order #" + global.viewOrderID);
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
    cookie.save('loggedin', global.loggedIn, { path: '/' , maxAge: 300});
  }

  setUsername(username){
    global.username = username;
    cookie.save('username', global.username, { path: '/' , maxAge: 300});
  }

  setEntityId(entityId) {
    global.entityId = entityId;
    cookie.save('entityID', global.entityId, { path: '/' , maxAge: 300});
  }

  setCurrentView(view){
    global.currentView = view;
    cookie.save('currentView', global.currentView, { path: '/' , maxAge: 300});
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
      case VIEW.setup:
        return <SetUp/>;
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

export default Presenter;
