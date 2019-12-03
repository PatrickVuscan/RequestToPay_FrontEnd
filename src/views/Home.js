import React, { Component } from 'react';
import Welcome from "../components/text/Welcome";
import PersonaMenu from "../components/PersonaMenu"
import "./Home.css"
import {getEntityPersona} from "../models";
import constants from "../constants";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
        'customer': false,
        'seller': false,
        'driver': false
    };
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
        <Welcome/>
        {this.state.customer && <PersonaMenu persona={constants.PERSONA.customer.name}/>}
        {this.state.seller && <PersonaMenu persona={constants.PERSONA.seller.name}/>}
        {this.state.driver && <PersonaMenu persona={constants.PERSONA.driver.name}/>}
      </div>
    );
  }
}

export default Home;
