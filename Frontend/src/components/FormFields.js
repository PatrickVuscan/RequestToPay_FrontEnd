import React, { Component } from 'react';
import './FormFields.css';

class Input extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(event){
        this.props.onChange.bind(({
            passwordValue: event.target.value,
        }));
    }
}

export class EmailInput extends Input {
    render(){
        return (
        <input type="email"
            className="email-input"
            placeholder="Email"
            onChange={this.handleChange.bind(this)}>
        </input>);
    }
}

export class PasswordInput extends Input {
    render(){
        return (
        <input type="password"
            className="password-input"
            placeholder="Password"
            onChange={this.handleChange.bind(this)}>
        </input>);
    }
}