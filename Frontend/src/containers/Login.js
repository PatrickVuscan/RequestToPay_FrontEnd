import React, { Component } from 'react';
import {EmailInput, PasswordInput} from "../components/FormFields";
import {Button} from "../components/Elements";

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
  }

  render(){
    return (
      <div>
        <EmailInput onChange={this.setState}/>
        <PasswordInput onChange={this.setState}/>
        <Button className="login" onClick={this.handleLoginClick} value="Login"/>
        <Button className="back" value="Go Back"/>
      </div>
    )
  }
}

export default Login;