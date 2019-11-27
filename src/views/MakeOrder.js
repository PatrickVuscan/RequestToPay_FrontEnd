import React, { Component } from 'react';
import "./MakeOrder.css"
import {performMakeOrder} from "../models/index"
import TextLoading from "../components/TextLoading";
import TextMakeOrder from "../components/TextMakeOrder";


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
            itemID: '',
            itemquantity: ''
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
            'items': this.state.items,
        };
        performMakeOrder(order_details, global.presenter.makeorderHandler)
    }

    render(){
        const { loading } = this.state;
        return (
            <div id="makeorder_full">
                <div id="makeorder_block">
                    {loading ? <TextLoading/> : <TextMakeOrder/>}
                    <form onSubmit={this.handlerMakeOrderClick}>
                        <input
                            className={"field"}
                            required placeholder="User ID"
                            onChange={(event) => {this.setState({buyerID: event.target.value})}}/>
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
                            required placeholder="Item ID."
                            onChange={(event) => {this.setState({itemID: event.target.value})}}/>
                        <input
                            className={"field"}
                            required placeholder="Item quantity."
                            onChange={(event) => {this.setState({itemquantity: event.target.value})}}/>
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
