import constants from "../constants";
import {getInvoiceItems, getOrderInfo} from "../models";

const status = constants.api.OrderStatus;

/**
 * Get the information (entities, statuses & dates) of the order with id 'orderId'.
 *
 * @param orderId - The id of the order
 * @param setOrderItems - A callback function, which is provided the formatted order information
 */
function getInfo(orderId, setOrderItems) {
    getOrderInfo(orderId, setOrderItems, formatOrderInfo);
}

/**
 * Get the items of the invoice with id 'invoiceId'.
 *
 * @param invoiceId - The id of the invoice
 * @param setOrderItems - A callback function, which is provided the formatted order items
 * @param setOrderTotal - A callback function, which is provided the total cost of the order
 */
function getItems(invoiceId, setOrderItems, setOrderTotal) {
    getInvoiceItems(invoiceId, setOrderItems, formatOrderItems, setOrderTotal);
}

/**
 * Format the order information.
 *
 * @param orderInfo - A JSON object of an order's information
 * @returns {{Status: *, CustomerBillingAddress: *, SellerBillingAddress: *, OID: *, DeliveryDate: *, CustomerName: *, SellerName: *, OrderDate: *}}
 */
function formatOrderInfo(orderInfo) {
    let formatted = {
        'OID': orderInfo['OID'],
        'InID': orderInfo['InID'],
        'OrderDate': orderInfo['OrderDate'].substring(0,10),
        'DeliveryDate': orderInfo['DeliveryDate'].substring(0,10),
        'CustomerName': orderInfo['CustomerName'],
        'CustomerBillingAddress': orderInfo['CustomerBillingAddress'],
        'SellerName': orderInfo['SellerName'],
        'SellerBillingAddress': orderInfo['SellerBillingAddress'],
        'Status': getStatus(orderInfo)
    };
    return formatted;
}

/**
 * Format all 'orderItems' according to 'itemFormatter'. If provided 'setOrderTotal', also calculate the order's total cost.
 *
 * @param orderItems - A JSON list of all items pertaining to an order
 * @param setOrderTotal - An optional callback function, which is provided the calculated order's total cost
 * @returns {[]} - A JSON list of the formatted version of orderItems
 */
function formatOrderItems(orderItems, setOrderTotal) {
    let items = [];
    let cost = 0;
    for (let i=0; i<orderItems.length; i++) {
        items.push(formatItem(orderItems[i]));
        cost += calculateItemCost(items[i]);
    }
    if (setOrderTotal !== undefined) setOrderTotal(cost);
    return items;
}

/**
 * Return a formatted version of 'orderItem'.
 *
 * @param orderItem - A single item pertaining to an order
 * @returns {{Price: *, Quantity: *, Name: *}}
 */
function formatItem(orderItem) {
    let item = {
        'Name': orderItem["Name"],
        'Quantity': orderItem["Quantity"],
        'Price': orderItem["Price"]
    };
    return item;
}

/**
 * Calculate the total cost of 'orderItem'.
 *
 * @param orderItem - A single item type pertaining to an order
 * @returns {number}
 */
function calculateItemCost(orderItem) {
    return orderItem["Quantity"] * orderItem["Price"];
}

/**
 * Returns a string summarizing the order's status.
 *
 * @param order - An order
 * @returns {string} - The status of 'order'
 */
function getStatus(order) {
    global.invoiceApproved = order[status.Approved];
    global.invoicePaid = order[status.Paid];
    global.invoiceArrived = order[status.Arrived];
    global.invoiceDelivered = order[status.Delivered];
    if (order[status.Approved]) {
        if (!order[status.Delivered]) {
            if (!order[status.Arrived]) {
                if (!order[status.Paid]) {
                    return "Unpaid & Not Arrived";
                } else {
                    return "Paid & Not Arrived";
                }
            } else {
                if (!order[status.Paid]) {
                    return "Unpaid & Arrived";
                } else {
                    return "Paid & Arrived";
                }
            }
        } else {
            return "Completed";
        }
    } else {
        return "Pending approval."
    }
}

export {getInfo, getItems};
