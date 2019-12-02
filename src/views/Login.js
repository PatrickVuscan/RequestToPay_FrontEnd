import React, { Component } from 'react';
import "./Login.css"
import {performLogin, performToSignUp } from "../models/index"
import TextLogin from "../components/TextLogin";
import TextLoading from "../components/TextLoading";
import cookie from 'react-cookies'


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

  render(){
    const { loading } = this.state;
    return (
      <div id="login_full">
        <div id="login_block">
          {loading ? <TextLoading/> : <TextLogin/>}
          <form onSubmit={this.handleLoginClick}>
            <input
              className={"field"}
              required placeholder="Username"
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
        </div>
      </div>
    )
  }
}

export default Login;
