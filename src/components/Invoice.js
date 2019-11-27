import React, { Component } from 'react';
import DataTable from '../components/table/DataTable';

class Invoice extends Component {

    getEntityTable() {
        const {info} = this.props;
        const headings = ["Supplier", "Customer"];
        const rows = [
            [info["SellerName"], info["CustomerName"]],
            [info["SellerBillingAddress"], info["CustomerBillingAddress"]]
        ];
        return (<DataTable id={"Entities"} headings={headings} rows={rows} title="" />);
    }

    getItemsTable() {
        let {items} = this.props;
        const firstItem = items[0];
        const headings = Object.keys(firstItem);
        const rows = this.getRows(items);
        return (<DataTable id={"Items"} headings={headings} rows={rows} title="Invoice Items" />);
    }

    getRows(data) {
        let rows = [];
        for (let i=0; i<data.length; i++) {
            rows.push(Object.values(data[i]));
        }
        return rows;
    }

    getTotalDiv() {
        const {total} = this.props;
        return (<div id={"Total"}>Total: ${total}</div>)
    }

    render() {
        const {items} = this.props;
        if (items.length !== 0) {
            const entityTable = this.getEntityTable();
            const itemsTable = this.getItemsTable();
            const totalDiv = this.getTotalDiv();
            return (
                <div id={"Invoice"}>
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
