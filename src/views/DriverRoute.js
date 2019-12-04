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

  getArrivedButton() {
    if (!global.invoiceArrived) {
      return (
        <div className={"route_options"}
             onClick={() => this.statusArrived()}>
          Arrived.
        </div>
      );
    } else {
      return (
        <div className={"route_options"}>
          Already arrived!
        </div>
      );
    }
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
                {this.getArrivedButton()}
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
