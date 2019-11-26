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

    getRows() {
        let rows = [];
        let items = this.state.items;
        for (let i=0; i<items.length; i++) {
            rows.push(Object.values(items[i]));
        }
        return rows;
    }

    render() {
        if (this.state.items.length !== 0) {
            let firstItem = this.state.items[0];
            const headings = Object.keys(firstItem);
            const rows = this.getRows();
            return (<DataTable headings={headings} rows={rows} title="Invoice Information" />);
        } else {
            return ("Retrieving your invoice.");
        }


        // const headings = [
        //     'Product name',
        //     'SKU',
        //     'Stock quantity',
        //     'Wholesale cost',
        //     'Sale price',
        //     'Quantity sold',
        //     'Gross sales',
        //     'Net sales',
        //     'Notes',
        // ];
        //
        // const rows = [
        //     [
        //         'Red and black plaid scarf with thin red stripes and thick black stripes',
        //         124689325,
        //         28,
        //         '$35.00',
        //         '$60.00',
        //         12,
        //         '$720.00',
        //         '$300.00',
        //         '',
        //     ],
        //     [
        //         'Yellow plaid scarf',
        //         124689389,
        //         0,
        //         '$35.00',
        //         '$60.00',
        //         20,
        //         '$1200.00',
        //         '$500.00',
        //         'Currently on back order by the supplier. Do not place another order to restock.',
        //     ],
        //     [
        //         'Blue plaid scarf',
        //         124689332,
        //         30,
        //         '$35.00',
        //         '$60.00',
        //         10,
        //         '$600.00',
        //         '$250.00',
        //         '',
        //     ],
        //     [
        //         'Pink plaid scarf',
        //         124689376,
        //         16,
        //         '$35.00',
        //         '$60.00',
        //         4,
        //         '$240.00',
        //         '$100.00',
        //         '',
        //     ],
        // ];
        //
        // return (<DataTable headings={headings} rows={rows} title="Product sales" />);
    }
}

export default Invoice;
