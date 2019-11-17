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

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameValue: this.props.username, // retrieve from Control
    };
  }

  render() {
    return (
      <div id="app">
        {/* Helmet - load stylesheet based on current page */}
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/css/App.css"/>
        </Helmet>

        <div id="login_block" className="centerVH">
          <TextWelcome username={this.state.usernameValue}/>
        </div>
      </div>
    );
  }
}

export default App;
