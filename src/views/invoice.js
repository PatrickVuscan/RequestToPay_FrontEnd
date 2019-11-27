import React, { Component } from 'react';
import "./SignUp.css"
import {performActionInvoice} from "../models/index"
import TextLoading from "../components/TextLoading";
import TextInvoice from "../components/TextInvoice";

/**
 * Creates an invoice element, containing an username field, password fieldS and persona menu and button.
 */
class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deliverydate: "",
            nextinID: '',
        };
        this.handlerInvoiceClick = this.handlerInvoiceClick.bind(this);
    }

    handlerInvoiceClick(e){
        e.preventDefault();
        let invoice_details = {
            'devliverydate': this.state.deliverydate,
            'nextinID': this.state.nextinID,
        };
        performActionInvoice(invoice_details, global.presenter.invoiceHandler)
    }

    render(){
        const { loading } = this.state;
        return (
            <div id="signup_full">
                <div id="signup_block">
                    {loading ? <TextLoading/> : <TextInvoice/>}
                    <form onSubmit={this.handlerInvoiceClick}>
                        <input
                            className={"field"}
                            required placeholder="Delivery date."
                            onChange={(event) => {this.setState({deliverydate: event.target.value})}}/>
                        <input
                            className={"field"}
                            required placeholder="Previous invoice ID"
                            onChange={(event) => {this.setState({nextinID: event.target.value})}}/>
                        <input
                            id="button"
                            type="submit"
                            value="Submit."/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Invoice;
