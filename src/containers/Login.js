import React, { Component } from 'react';
import {EmailInput, PasswordInput} from "../components/FormFields";
import {Button} from "../components/Elements";
import request from "request-promise";
import config from "../config";

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
    let login = {
      'username': this.state.emailValue,
      'password': this.state.passwordValue
    };
    if (login.username !== '' && login.password !== '') {
        const options = {
            method: 'GET',
            uri: `${config.api.URL}/login?u=${login.username}&p=${login.password}`,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };
        let self = this;  // because this about to change. It's a bad work around but it's 2 am
        request(options)
            .then(function (res) {
                alert(`remove the loading animation. Found user with credentials: ${res.username} -- ${res.password}`);
                self.props.loginHandler();
            })
            .catch(function (err) {
                alert(`there was an error: ${err.status} -- ${err.message}`);
            });
        alert('Display a loading animation');
    } else {
        alert('Please enter a username and password');
    }
  }

  render(){
    return (
      <div>
        <input placeholder="Username" onChange={(event) => {this.setState({emailValue: event.target.value})}}/>
        <input placeholder="Password" onChange={(event) => {this.setState({passwordValue: event.target.value})}}/>
        <Button className="login" onClick={this.handleLoginClick} value="Login"/>
        <Button className="back" value="Go Back"/>
      </div>
    )
  }
}

export default Login;
