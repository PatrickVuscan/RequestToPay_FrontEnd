/*
* This component will display the contents of the invoice.
* If this is a Buying Order, it will have an option to pay,
* which will reveal a pay menu (transitioning to RTP)
*/

import React, { Component } from 'react';
import "./DriverRoute.css";

class DriverRoute extends Component {

  constructor(props) {
    super(props);
    this.toggleRouteMenuOpen = this.toggleRouteMenuOpen.bind(this);
    this.statusArrived = this.statusArrived.bind(this);
  }

  toggleRouteMenuOpen(){
    this.props.order.toggleRouteMenuOpen();
  }

  statusArrived(){
    global.presenter.statusArrived(this.props.updateOrder);
    this.toggleRouteMenuOpen();
  }

  render() {

    return (
      <div id={"route_container"} className={"driver-background"}>
        <div id={"route_wrapper"}>
          <div id={"route_map"}/>

          <div id={"route_block"}>
            <div id={"route_address"}>
              Order #12345678<br/>
              Kwik-E-Mart<br/>
              100 Spadina Avenue<br/>
              Toronto, On <br/>
              987-654-3210<br/>
            </div>
            <div id={"route_options_wrapper"}>
                <div className={"route_options"}
                     onClick={() => this.statusArrived()}>
                  Arrived.
                </div>
                <div className={"route_options"}
                     onClick={() => this.toggleRouteMenuOpen()}>
                  Invoice.
                </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

}

export default DriverRoute;
