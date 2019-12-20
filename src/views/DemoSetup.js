import React, { Component } from 'react';
import "./SignUp.css"
import {performDemoRegister} from "../models/index"
import LoggingInHeader from "../components/text/LoggingInHeader";
import TextDemoSetup from "../components/text/TextDemoSetup";

/* Creates a demo setup element, containing a Name field. */
class DemoSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValue: '',
            loading: false
        };
        this.handlerContinueClick = this.handlerContinueClick.bind(this);
    }

    handlerContinueClick(e){
        e.preventDefault();
        let credentials = {
            'name': this.state.nameValue,
            'username': 'demoUserName',
            'password': 'password',
            'address': '21 Appleseed Rd.',
            'phone': '1234567890',
        };
        performDemoRegister(this, credentials, global.presenter.registerHandler)
    }

    render(){
        const { loading } = this.state;
        return (
            <div id="signup_full">
                <div id="signup_block">
                    {loading ? <LoggingInHeader/> : <TextDemoSetup/>}
                    <form onSubmit={this.handlerContinueClick}>
                        <input
                            className={"field"}
                            required placeholder="Name."
                            onChange={(event) => {this.setState({nameValue: event.target.value})}}/>
                        <input
                            id="button"
                            type="submit"
                            value="Continue."/>
                    </form>
                </div>
            </div>
        )
    }
}

export default DemoSetup;
