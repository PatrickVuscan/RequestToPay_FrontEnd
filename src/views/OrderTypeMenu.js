import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import OrderTypeWelcome from "../components/OrderTypeWelcome";
import OrderTypeBuy from "../components/OrderTypeBuy";
import OrderTypeSell from "../components/OrderTypeSell";
import "./OrderTypeMenu.css"

class OrderTypeMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameValue: this.props.username,
    };
  }

  // TODO: smooth scrolling transitions
  // https://github.com/alvarotrigo/react-fullpage


  render() {
    return (
      <div id="home_container">
        {/* Helmet - load stylesheet based on current page */}
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/css/OrderTypeMenu.css"/>
        </Helmet>

        <OrderTypeWelcome username={this.state.usernameValue}/>
        <OrderTypeBuy transitionToOrderList={this.props.transitionToOrderList}/>
        <OrderTypeSell/>

      </div>
    );
  }
}

export default OrderTypeMenu;
