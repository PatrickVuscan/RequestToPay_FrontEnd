import React, { Component } from 'react';
import "./Products.css"
import {performMakeProduct} from "../models/index"
import TextLoading from "../components/TextLoading";
import TextProducts from "../components/TextProducts";


/**
 * Creates register product element that allows user <buyer> to make an order.
 */
class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            sellerID: '',
            itemPrice: ''
        };
        this.handlerProductsClick = this.handlerProductsClick.bind(this);
    }

    handlerProductsClick(e){
        e.preventDefault();
        let order_details = {
            'itemName': this.state.itemName,
            'sellerID': this.state.sellerID,
            'itemPrice': this.state.itemPrice
        };
        performMakeProduct(order_details, global.presenter.makeProductHandler)
    }

    render(){
        const { loading } = this.state;
        return (
            <div id="products_full">
                <div id="products_block">
                    {loading ? <TextLoading/> : <TextProducts/>}
                    <form onSubmit={this.handlerProductsClick}>
                        <input
                            className={"field"}
                            required placeholder="Product name."
                            onChange={(event) => {this.setState({itemName: event.target.value})}}/>
                        <input
                            className={"field"}
                            required placeholder="Your seller ID."
                            onChange={(event) => {this.setState({sellerID: event.target.value})}}/>
                        <input
                            className={"field"}
                            required placeholder="Product price."
                            onChange={(event) => {this.setState({itemPrice: event.target.value})}}/>
                        <input
                            id="button"
                            type="submit"
                            value="Create product."/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Products;
