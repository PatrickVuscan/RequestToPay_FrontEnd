import React, { Component } from 'react';
import "./MakeOrder.css"
import {performMakeOrder} from "../models/index"
import TextMakeOrder from "../components/text/TextMakeOrder";
import LoggingInHeader from "../components/text/LoggingInHeader";


/**
 * Creates make order element that allows user <buyer> to make an order.
 */
class MakeOrder extends Component {
    constructor(props) {
        super(props);
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        this.state = {
            buyerID: global.entityId,
            sellerID: '',
            driverID: null,
            orderDate: date,
            deliveryDate: '',
            itemID: null,
            itemQuantity: null
        };
        this.handlerMakeOrderClick = this.handlerMakeOrderClick.bind(this);
    }

    handlerMakeOrderClick(e){
        e.preventDefault();
        let order_details = {
            'buyerID': this.state.buyerID,
            'sellerID': this.state.sellerID,
            'driverID': this.state.driverID,
            'orderDate': this.state.orderDate,
            'deliveryDate': this.state.deliveryDate,
            'itemID': this.state.itemID,
            'itemQuantity': this.state.itemQuantity
        };
        console.log(this.state.orderDate);
        performMakeOrder(order_details, global.presenter.makeorderHandler)
    }

    render(){
        const { loading } = this.state;
        return (
            <div id="makeorder_full">
                <div id="makeorder_block">
                    {loading ? <LoggingInHeader/> : <TextMakeOrder/>}

                    <form onSubmit={this.handlerMakeOrderClick}>
                        <input
                            className={"field"}
                            required placeholder="Seller ID"
                            onChange={(event) => {this.setState({sellerID: event.target.value})}}/>
                        <input
                            className={"field"}
                            required placeholder="Delivery date"
                            onChange={(event) => {this.setState({deliveryDate: event.target.value})}}/>
                        <input
                            className={"field"}
                            required placeholder="Item ID."
                            onChange={(event) => {this.setState({itemID: event.target.value})}}/>
                        <input
                            className={"field"}
                            required placeholder="Item quantity."
                            onChange={(event) => {this.setState({itemQuantity: event.target.value})}}/>
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
