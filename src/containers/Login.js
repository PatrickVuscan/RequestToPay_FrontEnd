import React, { Component } from 'react';
import {EmailInput, PasswordInput} from "../components/FormFields";
import {Button} from "../components/Elements";
import request from "request-promise";
import {Helmet} from "react-helmet";
import config from "../config";
import './Login.css';
import TextLogin from "../components/TextLogin";

/**
 * Creates a Login element, containing an username field, password field and login button.
 */

class Login extends Component {
	constructor(props) {
    super(props);
	this.state = { 
      emailValue: '',
	  passwordValue: ''
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick(){
    let credentials = {
      'username': this.state.emailValue,
      'password': this.state.passwordValue
    };
    if (credentials.username !== '' && credentials.password !== '') {
        this.sendLoginRequest(credentials);
    } else {
        alert('Please enter a username and password');
    }
  }

  sendLoginRequest(credentials) {
      const options = {
          method: 'GET',
          uri: `${config.api.URL}/login?u=${credentials.username}&p=${credentials.password}`,
          headers: {
              'User-Agent': 'Request-Promise'
          },
          json: true // Automatically parses the JSON string in the response
      };
      let self = this;  // Reference "this" is about to change. Necessary to access this.props.
      request(options)
          .then(function (res) {
              self.props.loginHandler();
          })
          .catch(function (err) {
              alert(`there was an error: ${err.status} -- ${err.message}`);
          });
      alert('Display a loading animation');
  }

  render(){
    return (
        <div id="login_full">
            {/* Helmet - modify css based on current page - move off to another component? */}
            <Helmet>
                <style type="text/css">{''+
                '#header_block {background-color: black;}' +
                '#root {background-color: var(--MID_RED);}' +
                '#bg_container {background-image: url(/images/bg/bg_speed_car.jpg); mix-blend-mode: multiply;}'}
                </style>
            </Helmet>

            <div id="login_block" className="centerVH">
                <TextLogin/>
                <input placeholder="Username" required="" onChange={(event) => {this.setState({emailValue: event.target.value})}}/>
                <input type="password" placeholder="Password" onChange={(event) => {this.setState({passwordValue: event.target.value})}}/>
                <Button className="login" onClick={this.handleLoginClick} value="Sign in."/>
            </div>
        </div>
    )
  }
}

export default Login;
