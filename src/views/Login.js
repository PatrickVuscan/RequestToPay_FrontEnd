import React, { Component } from 'react';
import "./Login.css"
import {performLogin, performToSignUp} from "../models/index"
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
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleDemoClick = this.handleDemoClick.bind(this);
    }

  handleLoginClick(e){
    e.preventDefault();
    let credentials = {
      'username': this.state.usernameValue,
      'password': this.state.passwordValue
    };
    performLogin(this, credentials, global.presenter.loginHandler);
  }

    handleSignUpClick(e){
        e.preventDefault();
        performToSignUp(this, global.presenter.toSignUpHandler);
    }

    handleDemoClick(e){
        e.preventDefault();
        performToSignUp(this, global.presenter.toDemoSetupHandler);
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
            <form onSubmit={this.handleSignUpClick}>
                <input
                    id="button"
                    type="submit"
                    value="Sign up."/>
            </form>
            <form onSubmit={this.handleDemoClick}>
                <input
                    id="button"
                    type="submit"
                    value="Demo."/>
            </form>
        </div>
      </div>
    )
  }
}

export default Login;
