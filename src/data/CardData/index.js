import constants from '../../constants'
import {getFormattedCustomerUnpaidOrders,
    getFormattedCustomerPaidOrders,
    getFormattedCustomerCompletedOrders} from "./Customer";
import {getFormattedSellerIncompleteOrders,
    getFormattedSellerCompletedOrders} from "./Seller";
import {getFormattedDriverIncompleteOrders,
    getFormattedDriverCompletedOrders} from "./Driver";

/**
 * Gets the JSON format of certain high-level order information (for Cards).
 * The orders included must have 'entityId' as the persona 'persona',
 * as well as have the status 'statusName'.
 * Rather than being returned, setOrdersData is provided the list of JSON objects.
 *
 * @param getter - The function used to access order data
 * @param entityId - The id of the entity who must be a part of the orders
 * @param persona - The persona that the entity 'entityId' must have for the orders
 * @param statusString - The string of the status (relative to persona) that the order must be
 * @param setOrdersData - The function that will be passed the list of JSON objects to store
 */
export function getCardData(getter, entityId, persona, statusString, setOrdersData) {
    let formatter = ordersDataFormatter[persona][statusString];
    getter(entityId, persona, formatter, setOrdersData);
}

/* --------------------------------------------- */
/* Formatters for ordersData by Persona & Status */
/* --------------------------------------------- */

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
ordersDataFormatter.driver[driverIncompleteString] = getFormattedDriverIncompleteOrders;
ordersDataFormatter.driver[driverCompletedString] = getFormattedDriverCompletedOrders;
