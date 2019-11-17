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

import React, { Component } from 'react';
import App from './views/App';
import Login from './views/Login';
import Header from "./components/Header"

// enum of views
const VIEW = {
  login: 'login',
  home: 'home',
  orderTypeMenu: 'orderTypeMenu',
  cardList: 'cardList',
};

class Presenter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentView: VIEW.login,
      username: 'Not Logged In',
      menuColor: 'Red'
    };
    this.loginHandler = this.loginHandler.bind(this);
  }

  // Log In Methods ----------------------------//

  loginHandler(username){
    this.setState({username: username}); // TODO: replace with value from DB
    this.transitionToHome();
  }

  // Menu Methods -----------------------------//

  //// setMenuColor(color)
  //// menuShow(){}
  //// menuHide(){}
  //// payMenuShow(){}
  //// payMenuHide(){}
  //// logOut(){}

  // Transitions -----------------------------//

  transitionToLogin(){
    this.setState({currentView: VIEW.login});
  }

  transitionToHome(){
    this.setState({currentView: VIEW.home});
  }
  // transitionToBuyerList(){}
  //transitionToSellerList(){} // TODO: Later
  // transitionToBuyerInvoice(ID){}
  // transitionToSellerInvoice(ID){}  // TODO: Later
  // transitionToPayID(ID){}  // TODO: Later

  viewSwitch(view){
    switch(view){
      case "login":
        return <Login loginHandler = {this.loginHandler} />;
      case "home":
        return <App username={this.state.username}/>;
    }
  }

  // Rendering the appropriate Views
  render() {
    return (
      <div id="control">
        <Header color={this.menuColor}/>
        <div id="bg_container">
        </div>
        {this.viewSwitch(this.state.currentView)}
      </div>
    )
  }
}

export default Presenter;

