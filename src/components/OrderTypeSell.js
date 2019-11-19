import React, { Component } from 'react';

/**
 *
 * The default react web page.
 *
 * @returns {*}
 * @constructor
 */

class OrderTypeSell extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div id="sell_wrapper">
        <div className={"home_block"}>
          <div className={"type_block"}>
            <h1>Selling.</h1>
            <ul>
              <li><s>Incomplete Orders.</s></li>
              <li><s>Completed Orders.</s></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderTypeSell;



