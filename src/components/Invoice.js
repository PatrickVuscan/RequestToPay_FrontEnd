import React, { Component } from 'react';
import DataTable from '../components/table/DataTable';
import {getItems, getInfo} from "../data/InvoiceData";

class Invoice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'info': {},
            'items' : [],
            'total' : 0
        };
        this.setInfo = this.setInfo.bind(this);
        this.setItems = this.setItems.bind(this);
        this.setTotal = this.setTotal.bind(this);
    }

    componentDidMount() {
        getInfo(global.viewInvoiceID, this.setInfo);
    }

    setInfo(info) {
        this.setState({'info': info});
        // Now that we have the invoice id of the card, get items:
        getItems(info["InID"], this.setItems, this.setTotal);
        // TODO: Store the InID on the individual card to improve efficiency
    }

    setItems(items) {
        this.setState({'items': items});
    }

    setTotal(total) {
        this.setState({'total': total.toFixed(2)});
    }

    getRows(data) {
        let rows = [];
        for (let i=0; i<data.length; i++) {
            rows.push(Object.values(data[i]));
        }
        return rows;
    }

    getGeneralInfoDiv() {
        const info = this.state.info;
        return(
            <div id={"GeneralInfo"}>
                <div id={"InvoiceId"}> Invoice #{info["InID"]}</div>
                <div id={"OrderDate"}> Ordered: {info["OrderDate"]}</div>
                <div id={"DeliveryDate"}> Expected Delivery: {info["DeliveryDate"]}</div>
                <div id={"Status"}> Status: {info["Status"]}</div>
            </div>
        );
    }

    getEntityTable() {
        const info = this.state.info;
        const headings = ["Supplier", "Customer"];
        const rows = [
            [info["SellerName"], info["CustomerName"]],
            [info["SellerBillingAddress"], info["CustomerBillingAddress"]]
        ];
        return (<DataTable id={"Entities"} headings={headings} rows={rows} title="" />);
    }

    getItemsTable() {
        let firstItem = this.state.items[0];
        const headings = Object.keys(firstItem);
        const rows = this.getRows(this.state.items);
        return (<DataTable id={"Items"} headings={headings} rows={rows} title="Invoice Items" />);
    }

    getTotalDiv() {
        const total = this.state.total;
        return (<div id={"Total"}>Total: ${total}</div>)
    }

    render() {
        if (this.state.items.length !== 0) {
            const infoDiv = this.getGeneralInfoDiv();
            const entityTable = this.getEntityTable();
            const itemsTable = this.getItemsTable();
            const totalDiv = this.getTotalDiv();
            return (
                <div id={"Invoice"}>
                    {infoDiv}
                    <br/>
                    {entityTable}
                    <br/>
                    {itemsTable}
                    <br/>
                    {totalDiv}
                </div>
            );
        } else {
            return ("Retrieving your invoice.");
        }
    }
}

export default Invoice;
