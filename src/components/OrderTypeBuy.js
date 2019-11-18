import React, { Component } from 'react';

/**
 *
 * The default react web page.
 *
 * @returns {*}
 * @constructor
 */

class OrderTypeBuy extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div id="buy_wrapper">
        <div className={"home_block"} style={{backgroundColor: 'var(--MID_ORANGE)'}}>
          <div className={"type_block"}>
            <h1>Buying.</h1>
            <ul>
              <li>Ready to Pay.</li>
              <li><s>Waiting for Delivery.</s></li>
              <li><s>Completed Orders.</s></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderTypeBuy;



