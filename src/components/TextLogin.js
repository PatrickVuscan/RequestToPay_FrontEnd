/* Random money related quote for the login page */

import React, {Component} from "react";
import "./TextLogin.css"

export class TextLogin extends Component {
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
                <p>Your money.</p>
                <p>Instantly.</p>
            </div>
        );
    }
}

export default TextLogin;
