import React, { Component } from 'react';
import {Button} from "../components/Elements";
import request from "request-promise";
import {Helmet} from "react-helmet";
import config from "../config";
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
    if (credentials.username !== '' && credentials.password !== '') {
        this.sendLoginRequest(credentials);
    }
  }

  sendLoginRequest(credentials) {
    this.setState({loading: true});

	  const options = {
	    method: 'GET',
      uri: `${config.api.URL}/login?u=${credentials.username}&p=${credentials.password}`,
      headers: {
	      'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
      };

	  let self = this;  // Reference "this" is about to change. Necessary to access this.props.

    setTimeout(function() {
      request(options)
        .then(function (res) {
          self.props.loginHandler(credentials.username);
        })
        .catch(function (err) {
          alert(`there was an error: ${err.status} -- ${err.message}`);
        });
      this.setState({loading: false});
    }.bind(this), 2000); // Set Delay (to test the loading animation)
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
            <input required placeholder="Username" onChange={(event) => {this.setState({usernameValue: event.target.value})}}/>
            <input required type="password" placeholder="Password" autoCapitalize="none" onChange={(event) => {this.setState({passwordValue: event.target.value})}}/>
            <Button className="login" type="submit" value="Sign in."/>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;
