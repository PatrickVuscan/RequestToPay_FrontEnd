import React, { Component } from 'react';
import OrderTypeWelcome from "../components/OrderTypeWelcome";
import OrderTypeBuy from "../components/OrderTypeBuy";
import OrderTypeSell from "../components/OrderTypeSell";

class Loading extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="loading_container">
        LOADING
      </div>
    );
  }

}

export default Loading;
