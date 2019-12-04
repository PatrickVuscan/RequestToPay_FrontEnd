import constants from "../../constants";

/* Functions common to the implementations contained in CardData's Customer.js, Seller.js, Driver.js */

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

/* ---------------------------------------------------- */
/* "statusCondition" functions for getFormattedOrders() */
/* ---------------------------------------------------- */

// Statuses For Front-End

function isStatusUnapproved(orderData) {
    return !isApproved(orderData);
}

function isStatusApprovedAndUnpaid(orderData) {
    return isApproved(orderData) && !isPaid(orderData);
}

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

// Direct Interpretation of DB Values

const orderStatus = constants.api.OrderStatus;

function isApproved(orderData) {
    return orderData[orderStatus.Approved] === true;
}

function isPaid(orderData) {
    return orderData[orderStatus.Paid] === true;
}

function isArrived(orderData) {
    return orderData[orderStatus.Arrived] === true;
}

function isDelivered(orderData) {
    return orderData[orderStatus.Delivered] == true;
}

/* ------------------ */
/* Exported Functions */
/* ------------------ */

export {getFormattedOrders, isStatusUnapproved, isStatusApprovedAndUnpaid,
    isStatusUnpaid, isStatusPaid, isStatusIncomplete, isStatusCompleted}
