import React, { Component } from 'react';
import "./DriverRoute.css";

class DriverRoute extends Component {

  constructor(props) {
    super(props);
    this.toggleDriverMenuOpen = this.toggleDriverMenuOpen.bind(this);
  }

  toggleDriverMenuOpen(){
    this.props.order.toggleDriverMenuOpen();
  }

  render() {
    let {updateOrder} = this.props;

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
                     onClick={() => global.presenter.statusArrived(updateOrder)}>
                  Arrived.
                </div>
                <div className={"route_options"}
                     onClick={() => this.toggleDriverMenuOpen()}>
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
