
import constants from '../constants'
import {getOrdersByEntityAndPersona} from "../models";

/**
 * Gets the JSON format of certain high-level order information (for Cards).
 * The orders included must have 'entityId' as the persona 'persona',
 * as well as have the status 'statusName'.
 * Rather than being returned, setOrdersData is provided the list of JSON objects.
 *
 * @param entityId - The id of the entity who must be a part of the orders
 * @param persona - The persona that the entity 'entityId' must have for the orders
 * @param statusString - The string of the status (relative to persona) that the order must be
 * @param setOrdersData - The function that will be passed the list of JSON objects to store
 */
function getOrdersOverview(entityId, persona, statusString, setOrdersData) {
    let formatter;
    if (persona === constants.PERSONA.customer) {
        switch(statusString) {
            case constants.STATUS.customer.unpaid.string:
                formatter = getFormattedCustomerUnpaidOrders;
                break;
            case constants.STATUS.customer.paid.string:
                formatter = getFormattedCustomerPaidOrders;
                break;
            default: // constants.STATUS.customer.completed.string
                formatter = getFormattedCustomerCompletedOrders;
        }
    } else if (persona === constants.PERSONA.seller) {
        switch(statusString) {
            case constants.STATUS.seller.incomplete.string:
                formatter = getFormattedSellerIncompleteOrders;
                break;
            default: // constants.STATUS.seller.completed.string
                formatter = getFormattedCustomerCompletedOrders;
        }
    }
    getOrdersByEntityAndPersona(entityId, persona, formatter, setOrdersData);
}

/* --------------------------------------------- */
/* Formatters for ordersData by Persona & Status */
/* --------------------------------------------- */

// TODO: Get a mapping such as what is commented out to function.
// const customer = constants.PERSONA.customer;
// const customerUnpaidString = constants.STATUS.customer.unpaid.string;
// const customerPaidString = constants.STATUS.customer.paid.string;
// const customerCompletedString = constants.STATUS.customer.completed.string;
//
// // TODO: Also, have mappings for personas: 'seller' and 'driver'
// // Object: formatters[persona][statusString] (mapping persona and statusName to formatter)
// let formatters = {};
// formatters[customer][customerUnpaidString] = getFormattedCustomerUnpaidOrders;
// formatters[customer][customerPaidString] = getFormattedCustomerPaidOrders;
// formatters[customer][customerCompletedString] = getFormattedCustomerCompletedOrders;

/**
 * Returns a version of ordersData that is formatted for a high-level card
 * viewed by a customer, only including the orders that were unpaid.
 *
 * @param ordersData - A list of JSON objects, where each object is an order where the entity was a customer
 * @returns [] - A list of JSON objects, where each JSON object is one order
 */
function getFormattedCustomerUnpaidOrders(ordersData) {
    let statusCondition = isStatusUnpaid;
    let getOrderStatusForPersona = getOrderStatusForCustomer;
    let orderFormatter = getFormattedCustomerOrder;
    return getFormattedOrders(ordersData, statusCondition, getOrderStatusForPersona, orderFormatter);
}

/**
 * Returns a version of ordersData that is formatted for a high-level card
 * viewed by a customer, only including the orders that were paid and not delivered.
 *
 * @param ordersData - A list of JSON objects, where each object is an order where the entity was a customer
 * @returns [] - A list of JSON objects, where each JSON object is one order
 */
function getFormattedCustomerPaidOrders(ordersData) {
    let statusCondition = isStatusPaid;
    let getOrderStatusForPersona = getOrderStatusForCustomer;
    let orderFormatter = getFormattedCustomerOrder;
    return getFormattedOrders(ordersData, statusCondition, getOrderStatusForPersona, orderFormatter);
}

/**
 * Returns a version of ordersData that is formatted for a high-level card
 * viewed by a customer, only including the orders that were paid and delivered.
 *
 * @param ordersData - A list of JSON objects, where each object is an order where the entity was a customer
 * @returns [] - A list of JSON objects, where each JSON object is one order
 */
function getFormattedCustomerCompletedOrders(ordersData) {
    let statusCondition = isStatusCompleted;
    let getOrderStatusForPersona = getOrderStatusForCustomer;
    let orderFormatter = getFormattedCustomerOrder;
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
    let getOrderStatusForPersona = getOrderStatusForCustomer;
    let orderFormatter = getFormattedCustomerOrder;
    return getFormattedOrders(ordersData, statusCondition, getOrderStatusForPersona, orderFormatter);
}

// HELPER FOR ALL FORMATTERS:

/**
 * Returns a version of ordersData that is formatted for a high-level card.
 * It only includes orders that satisfy 'orderCondition'.
 * It formats each order's data according to 'orderFormatter', with the status attribute set to 'statusString'.
 *
 * @param ordersData - A list of JSON objects, where each object is an order
 * @param orderCondition - The condition that an order must satisfy to be included in the returned list
 * @param getOrderStatus - Gets the status string which will be displayed to the user for each order
 * @param orderFormatter - Takes in a single order's data (JSON) and returns a formatted version of the order's data (JSON)
 * @returns {[]}
 */
function getFormattedOrders(ordersData, orderCondition, getOrderStatus, orderFormatter) {
    let formattedOrdersData = [];
    for (let i=0; i < ordersData.length; i++) {
        let orderData = ordersData[i];
        if (orderCondition(orderData)) {
            let formattedOrderData = orderFormatter(orderData, getOrderStatus(orderData));
            formattedOrdersData.push(formattedOrderData);
        }
    }
    return formattedOrdersData;
}

/* ------------------------------------------------------------- */
/* "getOrderStatusForPersona" functions for getFormattedOrders() */
/* ------------------------------------------------------------- */

function getOrderStatusForCustomer(orderData) {
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

/* ---------------------------------------------------- */
/* "statusCondition" functions for getFormattedOrders() */
/* ---------------------------------------------------- */

// OUR STATUSES

function isStatusUnpaid(orderData) {
    return !isPaid(orderData);
}

function isStatusPaid(orderData) {
    return isPaid(orderData) && !isStatusCompleted(orderData);
}

function isStatusIncomplete(orderData) {
    return !isStatusCompleted(orderData);
}

function isStatusCompleted(orderData) {
    return isPaid(orderData) &&
        isArrived(orderData) &&
        isDelivered(orderData);
}

// DIRECT INTERPRETATION OF DATABASE VALUES

function isPaid(orderData) {
    return orderData["PaidStatus"] === true;
}

function isArrived(orderData) {
    return orderData["ArrivedStatus"] === true;
}

function isDelivered(orderData) {
    return orderData["DeliveredStatus"] == true;
}

/* --------------------------------------------------- */
/* "orderFormatter" functions for getFormattedOrders() */
/* --------------------------------------------------- */

/**
 * Gets the JSON format of the high-level card information a customer will see for a given order.
 * The data is a reduced and formatted version of 'orderData', with a viewStatus attribute
 * provided by the input 'viewStatus'.
 *
 * @param orderData - The JSON object for a given order
 * @param status - The english (simplified) viewStatus associated with 'orderData'
 * @returns {{OID: *, OrderDate: *, DeliveryDate: *, Entity: *, Status: *}}
 */
function getFormattedCustomerOrder(orderData, status) {
    let formatted = {
        'OID': orderData['OID'],
        'OrderDate': orderData['OrderDate'].substring(0,10),
        'DeliveryDate': orderData['DeliveryDate'].substring(0,10),
        'Entity': orderData['SellerName'],
        'Status': status
    };
    return formatted;
}

/* ------------------ */
/* Exported Functions */
/* ------------------ */

export {getOrdersOverview}
