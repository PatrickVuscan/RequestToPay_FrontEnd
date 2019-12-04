import React, { Component } from 'react';
import "./SignUp.css"
import {performLogout} from "../models/index"
import AccountHeader from "../components/text/AccountHeader";
import TextAccount from "../components/text/Account";
/**
 * Creates a setup element, containing an username field, password fieldS and persona menu and button.
 */
class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'customer': false,
            'seller': false,
            'driver': false,
            loading: false,
        };
        this.handlerLogOutClick = this.handlerLogOutClick.bind(this);
    }

    setCustomer(boolean) {
        this.setState({'customer': boolean});
    }

    setSeller(boolean) {
        this.setState({'seller': boolean});
    }

    setDriver(boolean) {
        this.setState({'driver': boolean});
    }

    handlerLogOutClick(e){
        e.preventDefault();
        let credentials = {
            'username': this.state.usernameValue,
            'password': this.state.passwordValue
        };
        performLogout(this, credentials, global.presenter.loginHandler);
    }

    render(){
        const { loading } = this.state;
        return (
            <div id="signup_full">
                <div id="signup_block">
                    {loading ? <AccountHeader/> : <TextAccount/>}
                    <form onSubmit={this.handlerLogOutClick}>
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
                            id="button"
                            type="submit"
                            value="Register."/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Account;
