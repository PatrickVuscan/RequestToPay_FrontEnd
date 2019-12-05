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
            <div id={"entity_info"}>
                <div className={"entity_block"}>
                    <div id={"seller_name"}>
                        Sold by {info["SellerName"]}.
                    </div>
                    <div className={"entity_address"}>
                        {info["SellerName"]}<br/>
                        {info["SellerBillingAddress"]}
                    </div>
                </div>
                <div className={"entity_block"}>
                    <div id={"customer_name"}>
                        Purchased by {info["CustomerName"]}.
                    </div>
                    <div className={"entity_address"}>
                        {info["CustomerName"]}<br/>
                        {info["CustomerBillingAddress"]}
                    </div>
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
        return (
          <div id={"order_total"}>
              <div id={"order_total_title"}>Total:</div>
              <div id={"order_total_amount"}>${total}</div>
          </div>
        )
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
                        {title}
                        {itemsTable}
                        {totalDiv}
                    </div>
            );
        } else {
            return ("Retrieving your invoice.");
        }
    }
}

export default Invoice;
