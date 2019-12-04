import React, { Component } from 'react';
import "./Login.css"
import {performLogin} from "../models/index"
import LoginHeader from "../components/text/LoginHeader";
import LoggingInHeader from "../components/text/LoggingInHeader";

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
    performLogin(this, credentials, global.presenter.loginHandler);
  }

  render(){
    const { loading } = this.state;
    return (
      <div id="login_full">
        <div id="login_block">
          {loading ? <LoggingInHeader/> : <LoginHeader/>}
          <form onSubmit={this.handleLoginClick}>
            <input
              className={"field"}
              required placeholder="Username"
              autoCapitalize="none"
              onChange={(event) => {this.setState({usernameValue: event.target.value})}}/>
            <input
              className={"field"}
              required type="password"
              placeholder="Password"
              autoCapitalize="none"
              onChange={(event) => {this.setState({passwordValue: event.target.value})}}/>
            <input
              id="button"
              type="submit"
              value="Sign in."/>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;
