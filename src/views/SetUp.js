import React, { Component } from 'react';
import "./SignUp.css"
import {performLogout} from "../models/index"
import TextLoading from "../components/TextLoading";
import TextSetUp from "../components/TextSetUp";

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
        this.setCustomer = this.setCustomer.bind(this);
        this.setSeller = this.setSeller.bind(this);
        this.setDriver = this.setDriver.bind(this);
        this.handlerPersonaClick = this.handlerPersonaClick.bind(this);
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

    handlerPersonaClick(e){
        e.preventDefault();
        let credentials = {
            'customer': this.state.customer,
            'seller': this.state.seller,
            'driver': this.state.driver
        };
        // performPersonaSet(this, credentials, global.presenter.personaSetHandler)
    }

    render(){
        const { loading } = this.state;
        return (
            <div id="setup_full">
                <div id="setup_block">
                    {loading ? <TextLoading/> : <TextSetUp/>}
                    <form onSubmit={this.handlerPersonaClick}>
                        <input type="checkbox"
                               className={"field"}
                               name="customer"
                               onChange={() => {this.setState({customer: true})}}
                               value="Are you a customer?"/> Are you a customer?
                            <input
                                className={"field"}
                                type="checkbox"
                                name="seller"
                                onChange={() => {this.setState({seller: true})}}
                                value="Are you a seller?"/> Are you a seller?
                                <input
                                    className={"field"}
                                    type="checkbox"
                                    name="driver"
                                    onChange={() => {this.setState({driver: true})}}
                                    value="Are you a driver?"/> Are you a driver?
                                    <input id="button" type="submit" value="Save."/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Account;
