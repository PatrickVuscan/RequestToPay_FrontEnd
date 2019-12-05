import React, { Component } from 'react';
import "./SignUp.css"
import { performRegister} from "../models/index"
import LoggingInHeader from "../components/text/LoggingInHeader";
import TextSignUp from "/Users/windsorhuang/Desktop/RequestToPay_FrontEnd/src/components/text/TextSignUp";



/**
 * Creates a signup element, containing an username field, password fieldS and persona menu and button.
 */
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValue: '',
            usernameValue: '',
            passwordValue: '',
            addressValue: '',
            phoneValue: '',
            loading: false
        };
        this.handlerRegisterClick = this.handlerRegisterClick.bind(this);
    }

    handlerRegisterClick(e){
        e.preventDefault();
        let credentials = {
            'name': this.state.nameValue,
            'username': this.state.usernameValue,
            'password': this.state.passwordValue,
            'address': this.state.addressValue,
            'phone': this.state.phoneValue,
        };
        performRegister(this, credentials, global.presenter.registerHandler)
    }

    render(){
        const { loading } = this.state;
        return (
            <div id="signup_full">
                <div id="signup_block">
                    {loading ? <LoggingInHeader/> : <TextSignUp/>}
                    <form onSubmit={this.handlerRegisterClick}>
                        <input
                            className={"field"}
                            required placeholder="Name."
                            onChange={(event) => {this.setState({nameValue: event.target.value})}}/>
                        <input
                            className={"field"}
                            required placeholder="Username."
                            onChange={(event) => {this.setState({usernameValue: event.target.value})}}/>
                        <input
                            className={"field"}
                            required type="password"
                            placeholder="Password."
                            autoCapitalize="none" onChange={(event) => {this.setState({passwordValue: event.target.value})}}/>
                        <input
                            className={"field"}
                            required type="address"
                            placeholder="Address."
                            onChange={(event) => {this.setState({addressValue: event.target.value})}}/>
                        <input
                            className={"field"}
                            required type="phone number"
                            placeholder="Phone number."
                            onChange={(event) => {this.setState({phoneValue: event.target.value})}}/>
                        <input
                            id="button"
                            type="submit"
                            value="Register."/>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp;
