import React, { Component } from 'react';
import "./Login.css"
import {Helmet} from "react-helmet";
import {performLogin} from "../models/index"
import TextLogin from "../components/TextLogin";
import TextLoading from "../components/TextLoading";


/**
 * Creates a Login element, containing an username field, password field and login button.
 */
class Login extends Component {
	constructor(props) {
    super(props);
	this.state = {
	    usernameValue: '',
        passwordValue: '',
        loading: false,
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick(e){
    e.preventDefault();
    let credentials = {
      'username': this.state.usernameValue,
      'password': this.state.passwordValue
    };
    performLogin(this, credentials, this.props.loginHandler);
  }

  render(){
    const { loading } = this.state;
    return (
      <div id="login_full">
        {/* Helmet - load stylesheet based on current page */}
        <Helmet>
          <link rel="stylesheet" type="text/css" href="css/Login.css" />
        </Helmet>
        <div id="login_block" className="centerVH">
          {loading ? <TextLoading/> : <TextLogin/>}
          <form onSubmit={this.handleLoginClick}>
            <input className={"field"} required placeholder="Username" onChange={(event) => {this.setState({usernameValue: event.target.value})}}/>
            <input className={"field"} required type="password" placeholder="Password" autoCapitalize="none" onChange={(event) => {this.setState({passwordValue: event.target.value})}}/>
            <input id="button" type="submit" value="Sign in."/>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;
