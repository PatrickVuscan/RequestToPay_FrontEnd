import React, { Component } from 'react';
import DataTable from '../components/table/DataTable';

class Invoice extends Component {

    getTitle() {
        const {info} = this.props;
        return (<div id={"order_invoiceID"}> Invoice #{info["InID"]}</div>);
    }

    getEntityInfo() {
        const {info} = this.props;
        return (
            <div id={"EntityInfo"}>
                <div id={"Supplier"}>
                    {info["SellerName"]}
                    <br/>
                    {info["SellerBillingAddress"]}
                </div>
                <div id={"Customer"}>
                    {info["CustomerName"]}
                    <br/>
                    {info["CustomerBillingAddress"]}
                </div>
            </div>
        );
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
            const entityInfo = this.getEntityInfo();
            const title = this.getTitle();
            const itemsTable = this.getItemsTable();
            const totalDiv = this.getTotalDiv();
            return (<div id={"Invoice"}>
                        {entityInfo}
                        <br/>
                        {title}
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
