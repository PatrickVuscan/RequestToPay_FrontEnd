import React, { Component } from 'react';
import constants from "../constants";

const seller = constants.PERSONA.seller;
const incomplete = constants.STATUS.seller.incomplete.string;
const completed = constants.STATUS.seller.completed.string;

class OrderTypeSell extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  /* TODO: Make of transition orderList*/
  /* ex: <li onClick={() => transitionToOrderList(seller, incomplete)}>{incomplete}</li> */

  render() {
    let {transitionToOrderList} = this.props;
    return (
      <div id="sell_wrapper">
        <div className={"home_block"}>
          <div className={"type_block"}>
            <h1>Selling.</h1>
            <ul>
              <li><s>{incomplete}</s></li>
              <li><s>{completed}</s></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderTypeSell;



