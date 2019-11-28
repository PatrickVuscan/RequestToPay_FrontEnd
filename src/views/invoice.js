import React, { Component } from 'react';
import "./SignUp.css"
import {performActionInvoice} from "../models/index"
import MenuTextLoading from "../components/MenuTextLoading";
import TextInvoice from "../components/TextInvoice";

/**
 * Creates an invoice element, containing an username field, password fieldS and persona menu and button.
 */
class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveryDate: '',
            nextInID: '',
            loading: false,
        };
        this.handlerInvoiceClick = this.handlerInvoiceClick.bind(this);
    }

    handlerInvoiceClick(e){
        e.preventDefault();
        let invoice_details = {
            'deliveryDate': this.state.deliveryDate,
            'nextInID': this.state.nextInID,
        };
        performActionInvoice(this, invoice_details, global.presenter.invoiceHandler)
    }

    render(){
        const { loading } = this.state;
        return (
            <div id="signup_full">
                <div id="signup_block">
                    {loading ? <MenuTextLoading/> : <TextInvoice/>}
                    <form onSubmit={this.handlerInvoiceClick}>
                        <input
                            className={"field"}
                            required placeholder="Delivery date."
                            onChange={(event) => {this.setState({deliveryDate: event.target.value})}}/>
                        <input
                            className={"field"}
                            required placeholder="Previous invoice ID."
                            onChange={(event) => {this.setState({nextInID: event.target.value})}}/>
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
