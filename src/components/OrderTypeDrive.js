import React, { Component } from 'react';
import constants from "../constants";

const driver = constants.PERSONA.driver.name;
const driverString = constants.PERSONA.driver.string;
const incomplete = constants.STATUS.driver.incomplete.string;
const completed = constants.STATUS.driver.completed.string;
const VIEW = constants.VIEW;

class OrderTypeDrive extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  transitionTo(status) {
    global.presenter.setViewPersona(driver);
    global.presenter.setViewStatus(status);
    global.presenter.transitionTo(VIEW.cardList)
  }

  render() {
    return (
      <div id="driver_wrapper">
        <div className={"home_block"}>
          <div className={"type_block"}>
            <h1>{driverString}</h1>
            <ul>
              <li onClick={() => this.transitionTo(incomplete)}>{incomplete}</li>
              <li onClick={() => this.transitionTo(completed)}>{completed}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderTypeDrive;



