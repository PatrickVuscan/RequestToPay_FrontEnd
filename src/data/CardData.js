
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
    let formatter = ordersDataFormatter[persona][statusString];
    getOrdersByEntityAndPersona(entityId, persona, formatter, setOrdersData);
}

/* --------------------------------------------- */
/* Formatters for ordersData by Persona & Status */
/* --------------------------------------------- */

/* --- JSON Object to Map Persona & Status to Formatter --- */

// Get Formatter Using: ordersDataFormatter[persona][status.string]
let ordersDataFormatter = {};

// Contents
const customer = constants.PERSONA.customer.name;
const customerUnpaidString = constants.STATUS.customer.unpaid.string;
const customerPaidString = constants.STATUS.customer.paid.string;
const customerCompletedString = constants.STATUS.customer.completed.string
const seller = constants.PERSONA.seller.name;
const sellerIncompleteString = constants.STATUS.seller.incomplete.string;
const sellerCompletedString = constants.STATUS.seller.completed.string;
const driver = constants.PERSONA.driver.name;
const driverIncompleteString = constants.STATUS.driver.incomplete.string;
const driverCompletedString = constants.STATUS.driver.completed.string;

// Mapping
ordersDataFormatter[customer] = {};
ordersDataFormatter.customer[customerUnpaidString] = getFormattedCustomerUnpaidOrders;
ordersDataFormatter.customer[customerPaidString] = getFormattedCustomerPaidOrders;
ordersDataFormatter.customer[customerCompletedString] = getFormattedCustomerCompletedOrders;
ordersDataFormatter[seller] = {};
ordersDataFormatter.seller[sellerIncompleteString] = getFormattedSellerIncompleteOrders;
ordersDataFormatter.seller[sellerCompletedString] = getFormattedSellerCompletedOrders;
ordersDataFormatter[driver] = {};
ordersDataFormatter.driver[driverIncompleteString] = getFormattedSellerIncompleteOrders;
ordersDataFormatter.driver[driverCompletedString] = getFormattedSellerCompletedOrders;

/* --- Definition of OrdersData Formatters --- */

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
    let getOrderStatusForPersona = getOrderStatusForCustomer; // NOTE: Chose to use customer data for more details
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

/* --- Helper for all formatters --- */

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

/* --- CUSTOMER --- */

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

/* --- SELLER --- */

function getOrderStatusForSeller(orderData) {
    if (isStatusCompleted(orderData)) {
        return sellerCompleted;
    }
    return sellerIncomplete;
}

const sellerIncomplete = constants.STATUS.seller.incomplete.name;
const sellerCompleted = constants.STATUS.seller.completed.name;

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
        'InID': orderData['InID'],
        'OrderDate': orderData['OrderDate'].substring(0,10),
        'DeliveryDate': orderData['DeliveryDate'].substring(0,10),
        'Entity': orderData['SellerName'],
        'Status': status
    };
    return formatted;
}

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

export {getOrdersOverview}
