/* Random money related quote for the login page */

import React, {Component} from "react";
import "./TextLogin.css"

export class TextWelcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bgColor: [
                'Your Money',
                'blue',
                'yellow',
            ],
            selectedColor: '',
        };
    }

    /* TODO: randomize login welcome text*/
    render(){
        return (
            <div id ="text_login">
                <p>Welcome to</p>
                <p>Your home.</p>
            </div>
        );
    }
}

export default TextWelcome;
