import React, { Component } from 'react';
import OrderTypeWelcome from "../components/OrderTypeWelcome";
import OrderTypeBuy from "../components/OrderTypeBuy";
import OrderTypeSell from "../components/OrderTypeSell";
import OrderTypeDrive from "../components/OrderTypeDrive";
import "./Home.css"
import {getEntityPersona} from "../models";
import constants from "../constants";
import Order from "./Order";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
        'customer': false,
        'seller': false,
        'driver': false
    }
    this.setCustomer = this.setCustomer.bind(this);
    this.setSeller = this.setSeller.bind(this);
    this.setDriver = this.setDriver.bind(this);
  }

  // TODO: smooth scrolling transitions
  // https://github.com/alvarotrigo/react-fullpage

    componentDidMount() {
        getEntityPersona(global.entityId, constants.PERSONA.customer.name, this.setCustomer);
        getEntityPersona(global.entityId, constants.PERSONA.seller.name, this.setSeller);
        getEntityPersona(global.entityId, constants.PERSONA.driver.name, this.setDriver);
    }

    setCustomer(boolean) {
        this.setState({'customer': boolean});
    }

    setSeller(boolean) {
        this.setState({'seller': boolean});
    }

    setDriver(boolean) {
        this.setState({'driver': boolean});
    }

  render() {
    return (
      <div id="home_container">
        <OrderTypeWelcome/>
        {this.state.customer && <OrderTypeBuy/>}
        {this.state.seller && <OrderTypeSell/>}
        {this.state.driver && <OrderTypeDrive/>}
      </div>
    );
  }
}

export default Home;
