import constants from "../../constants";
import {getFormattedOrders, isStatusUnapproved, isStatusCompleted, isStatusIncomplete, isStatusPaid} from "./Common";

/* ----------------------------------------------- */
/* Definitions of Persona's OrdersData Formatters  */
/* ----------------------------------------------- */

/**
 * Returns a version of ordersData that is formatted for a high-level card
 * viewed by a seller, only including the orders that are not approved.
 *
 * @param ordersData - A list of JSON objects, where each object is an order where the entity was a seller
 * @returns [] - A list of JSON objects, where each JSON object is one order
 */
function getFormattedSellerUnapprovedOrders(ordersData) {
    let statusCondition = isStatusUnapproved;
    let getOrderStatusForPersona = getOrderStatusForSeller;
    let orderFormatter = getFormattedSellerOrder;
    return getFormattedOrders(ordersData, statusCondition, getOrderStatusForPersona, orderFormatter);
}

/**
 * Returns a version of ordersData that is formatted for a high-level card
 * viewed by a seller, only including the orders that are not both paid and delivered.
 *
 * @param ordersData - A list of JSON objects, where each object is an order where the entity was a seller
 * @returns [] - A list of JSON objects, where each JSON object is one order
 */
function getFormattedSellerIncompleteOrders(ordersData) {
    let statusCondition = isStatusIncomplete;
    let getOrderStatusForPersona = getOrderStatusForSeller;
    let orderFormatter = getFormattedSellerOrder;
    return getFormattedOrders(ordersData, statusCondition, getOrderStatusForPersona, orderFormatter);
}

/**
 * Returns a version of ordersData that is formatted for a high-level card
 * viewed by a seller, only including the orders that are both paid and delivered.
 *
 * @param ordersData - A list of JSON objects, where each object is an order where the entity was a seller
 * @returns [] - A list of JSON objects, where each JSON object is one order
 */
function getFormattedSellerCompletedOrders(ordersData) {
    let statusCondition = isStatusCompleted;
    let getOrderStatusForPersona = getOrderStatusForSeller;
    let orderFormatter = getFormattedSellerOrder;
    return getFormattedOrders(ordersData, statusCondition, getOrderStatusForPersona, orderFormatter);
}

/* -------------------------------------------------------------------------- */
/* "getOrderStatusForPersona" function for getFormattedOrders() in Common.js  */
/* -------------------------------------------------------------------------- */

/**
 * Get the status to be displayed on a Seller's Card for a specific order.
 *
 * @param orderData - The data related to a specific order
 * @returns {string} - The status of the order
 */
function getOrderStatusForSeller(orderData) {
    if (isStatusCompleted(orderData)) {
        return customerCompleted;
    } else if (isStatusPaid(orderData)) {
        return customerPaid;
    } else {
        return customerUnpaid;
    }
}

const customerUnpaid = constants.STATUS.customer.unpaid.name;
const customerPaid = constants.STATUS.customer.paid.name;
const customerCompleted = constants.STATUS.customer.completed.name;

/* To get a more high-level status, implementation could change to:

    function getOrderStatusForSeller(orderData) {
        if (isStatusCompleted(orderData)) {
            return sellerCompleted;
        }
        return sellerIncomplete;
    }

    const sellerIncomplete = constants.STATUS.seller.incomplete.name;
    const sellerCompleted = constants.STATUS.seller.completed.name;

 */


/* --------------------------------------------------------------- */
/* "orderFormatter" function for getFormattedOrders() in Common.js */
/* --------------------------------------------------------------- */

/**
 * Gets the JSON format of the high-level card information a seller will see for a given order.
 * The data is a reduced and formatted version of 'orderData', with a viewStatus attribute
 * provided by the input 'viewStatus'.
 *
 * @param orderData - The JSON object for a given order
 * @param status - The english (simplified) viewStatus associated with 'orderData'
 * @returns {{OID: *, OrderDate: *, DeliveryDate: *, Entity: *, Status: *}}
 */
function getFormattedSellerOrder(orderData, status) {
    let formatted = {
        'OID': orderData['OID'],
        'InID': orderData['InID'],
        'OrderDate': orderData['OrderDate'].substring(0,10),
        'DeliveryDate': orderData['DeliveryDate'].substring(0,10),
        'Entity': orderData['CustomerName'],
        'Status': status
    };
    return formatted;
}

/* ------------------ */
/* Exported Functions */
/* ------------------ */

export {getFormattedSellerUnapprovedOrders, getFormattedSellerIncompleteOrders, getFormattedSellerCompletedOrders}
