// THIS IS THE PAGE THAT LOOKS LIKE EITHER:

// (A)

// BUYING
// some statuses....

// SELLING
// some statuses...


// (B)

// DELIVERIES
// some statuses...

// TODO: https://github.com/alvarotrigo/react-fullpage

import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import TextWelcome from "../components/TextWelcome";

/**
 *
 * The default react web page.
 *
 * @returns {*}
 * @constructor
 */

class OrderTypeMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameValue: this.props.username, // retrieve from Control
    };
  }

  render() {
    return (
      <div id="home_container">
        {/* Helmet - load stylesheet based on current page */}
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/css/OrderTypeMenu.css"/>
        </Helmet>

        <div className={"home_block"} style={{backgroundColor: 'var(--MID_RED)'}}>
            <TextWelcome username={this.state.usernameValue}/>
        </div>

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

        <div className={"home_block"} style={{backgroundColor: 'var(--PINK)'}}>
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

export default OrderTypeMenu;
