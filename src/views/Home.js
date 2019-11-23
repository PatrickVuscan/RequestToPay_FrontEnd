import React, { Component } from 'react';
import OrderTypeWelcome from "../components/OrderTypeWelcome";
import OrderTypeBuy from "../components/OrderTypeBuy";
import OrderTypeSell from "../components/OrderTypeSell";
import "./Home.css"

class Home extends Component {

  constructor(props) {
    super(props);
  }

  // TODO: smooth scrolling transitions
  // https://github.com/alvarotrigo/react-fullpage


  render() {
    return (
      <div id="home_container">
        <OrderTypeWelcome/>
        <OrderTypeBuy/>
        <OrderTypeSell/>
      </div>
    );
  }
}

export default Home;
