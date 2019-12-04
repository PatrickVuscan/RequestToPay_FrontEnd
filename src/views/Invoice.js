import React, { Component } from 'react';
import "./Invoice.css"
import {performActionInvoice} from "../models/index"
import InvoiceMenu from "../components/InvoiceMenu";
import MenuTextLoading from "../components/text/MenuTextLoading";
import TextInvoice from "../components/text/TextInvoice";

/**
 * Creates an invoice element, containing an username field, password fieldS and persona menu and button.
 */
class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            driverID: '',
            deliveryDate: '',
            nextInID: '',
            loading: false,
        };
        this.handlerInvoiceClick = this.handlerInvoiceClick.bind(this);
    }

    handlerInvoiceClick(e){
        e.preventDefault();
        let invoice_details = {
            'driverID': this.state.driverID,
            'deliveryDate': this.state.deliveryDate,
            'nextInID': this.state.nextInID,
        };
        performActionInvoice(this, invoice_details, global.presenter.invoiceHandler);

    }

    render(){
        const { loading } = this.state;
        return (
            <div id="invoice_full">
                <div id="invoice_block">
                    {loading ? <MenuTextLoading/> : <TextInvoice/>}
                    <form onSubmit={this.handlerInvoiceClick}>
                        <input
                            className={"field"}
                            required placeholder="Driver ID."
                            onChange={(event) => {this.setState({driverID: event.target.value})}}/>
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
                            value="Send invoice."/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Invoice;
