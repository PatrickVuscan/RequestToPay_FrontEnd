import React, { Component } from 'react';
import "./SignUp.css"
import {performLogin, performRegister} from "../models/index"
import TextLoading from "../components/TextLoading";
import TextSignUp from "/Users/windsorhuang/Desktop/RequestToPay_FrontEnd/src/components/TextSignUp";



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
            phoneValue: '',
            addressValue: '',
            loading: false,
        };
        this.handlerRegisterClick = this.handlerRegisterClick.bind(this);
    }

    handlerRegisterClick(e){
        e.preventDefault();
        let credentials = {
            'name': this.state.nameValue,
            'username': this.state.usernameValue,
            'password': this.state.passwordValue,
            'phone': this.state.phoneValue,
            'address': this.state.addressValue
        };
        performRegister(this, credentials, global.presenter.registerHandler)
    }

    render(){
        const { loading } = this.state;
        return (
            <div id="signup_full">
                <div id="signup_block">
                    {loading ? <TextLoading/> : <TextSignUp/>}
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
                        {/*<input*/}
                        {/*    className={"field"}*/}
                        {/*    required type="phone"*/}
                        {/*    placeholder="Phone number."*/}
                        {/*    autoCapitalize="none" onChange={(event) => {this.setState({passwordValue: event.target.value})}}/>*/}
                        <input
                            className={"field"}
                            required type="address"
                            placeholder="Address."
                            onChange={(event) => {this.setState({addressValue: event.target.value})}}/>
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
