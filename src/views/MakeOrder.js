import React, { Component } from 'react';
import "./MakeOrder.css"
import {performMakeOrder} from "../models/index"
import TextLoading from "../components/TextLoading";
import TextMakeOrder from "../components/TextMakeOrder";
import constants from "../constants";

const customer = constants.PERSONA.customer.name;
const customerString = constants.PERSONA.customer.string;
const unpaid = constants.STATUS.customer.unpaid.string;
const paid = constants.STATUS.customer.paid.string;
const completed = constants.STATUS.customer.completed.string;
const VIEW = constants.VIEW;


/**
 * Creates make order element that allows user <buyer> to make an order.
 */
class MakeOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyerID: '',
            sellerID: '',
            driverID: '',
            orderDate: '',
            deliveryDate: '',
            items: null
        };
        this.handlerMakeOrderClick = this.handlerMakeOrderClick.bind(this);
        this.transitionTo = this.transitionTo.bind(this);
    }

    transitionTo(status) {
        global.presenter.setViewPersona(customer);
        global.presenter.setViewStatus(status);
        global.presenter.transitionTo(VIEW.cardList)
    }

    handlerMakeOrderClick(e){
        e.preventDefault();
        let order_details = {
            'buyerID': this.state.buyerID,
            'sellerID': this.state.sellerID,
            'driverID': this.state.driverID,
            'orderDate': this.state.orderDate,
            'deliveryDate': this.state.deliveryDate,
            'items': this.state.items,
        };
        performMakeOrder(order_details, this.transitionTo, global.presenter.makeorderHandler)
    }

    render(){
        const { loading } = this.state;
        return (
            <div id="makeorder_full">
                <div id="makeorder_block">
                    {loading ? <TextLoading/> : <TextMakeOrder/>}
                    <form onSubmit={this.handlerInvoiceClick}>
                        <input
                            className={"field"}
                            required placeholder="User ID"
                            onChange={(event) => {this.setState({buyeriID: event.target.value})}}/>
                        <input
                            className={"field"}
                            required placeholder="Seller ID"
                            onChange={(event) => {this.setState({sellerID: event.target.value})}}/>
                        <input
                            className={"field"}
                            required placeholder="Deliverer ID"
                            onChange={(event) => {this.setState({driverID: event.target.value})}}/>
                        <input
                            className={"field"}
                            required placeholder="Today's date"
                            onChange={(event) => {this.setState({orderDate: event.target.value})}}/>
                        <input
                            className={"field"}
                            required placeholder="Delivery date"
                            onChange={(event) => {this.setState({deliveryDate: event.target.value})}}/>
                        <input
                            className={"field"}
                            required placeholder="What are you buying"
                            onChange={(event) => {this.setState({nextinID: event.target.value})}}/>
                        <input
                            id="button"
                            type="submit"
                            value="Place order."/>
                    </form>
                </div>
            </div>
        )
    }
}

export default MakeOrder;
