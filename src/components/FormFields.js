import React, { Component } from 'react';
import './FormFields.css';

/**
 * An input field for an email.
 */
export class EmailInput extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(event){
        this.props.onChange.bind({
            emailValue: event.target.value,
        });
    }

    render(){
        return (
        <input type="email"
            className="email-input"
            placeholder="Email"
            onChange={this.handleChange.bind(this)} >
        </input>);
    }
}

/**
 * An input field for a password.
 */
export class PasswordInput extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(event){
        this.props.onChange.bind(({
            passwordValue: event.target.value,
        }));
    }

    render(){
        return (
        <input type="password"
            className="password-input"
            placeholder="Password"
            onChange={this.handleChange.bind(this)}>
        </input>);
    }
}

function required() {
    var empty = document.forms["form1"]["text1"].value;
    if (empty == "") {
        alert("Please input a Value");
        return false;
    } else {
        return true;
    }
}