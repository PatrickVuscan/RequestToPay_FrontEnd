import React, { Component } from 'react';
import "./Products.css"
import {performMakeProduct} from "../models/index"
import MenuTextLoading from "../components/text/MenuTextLoading";
import TextProducts from "../components/text/TextProducts";


/**
 * Creates register product element that allows user <buyer> to make an order.
 */
class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            sellerID: global.entityId,
            itemPrice: '',
            loading: false,
        };
        this.handlerProductsClick = this.handlerProductsClick.bind(this);
    }

    handlerProductsClick(e){
        e.preventDefault();
        let order_details = {
            'itemName': this.state.itemName,
            'sellerID': this.state.sellerID,
            'itemPrice': this.state.itemPrice,
        };
        performMakeProduct(this, order_details, global.presenter.makeProductHandler)
    }

    render(){
        const { loading } = this.state;
        return (
            <div id="products_full">
                <div id="products_block">
                    {loading ? <MenuTextLoading/> : <TextProducts/>}
                    <form onSubmit={this.handlerProductsClick}>
                        <input
                            className={"field"}
                            required placeholder="Product name."
                            onChange={(event) => {this.setState({itemName: event.target.value})}}/>
                        <input
                            className={"field"}
                            required placeholder="Product price."
                            onChange={(event) => {this.setState({itemPrice: event.target.value})}}/>
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

export default Products;
