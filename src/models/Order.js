import config from "../constants";
import request from "request-promise";

/**
 * Get the orders pertaining to the entity with ID 'entityID',
 * where the entity is the 'viewPersona' (customer, seller or driver).
 * Rather than returning a value, 'setOrdersData' is is a callback function provided the data.
 *
 * @param entityId - The ID for the entity that is being searched by
 * @param persona - The viewPersona that is being searched by
 * @param formatter - A function that can format the data provided by the endpoint
 * @param setOrdersData - A callback function, which is used to store the orders
 */
function getOrdersByEntityAndPersona(entityId, persona, formatter, setOrdersData) {
    const options = {
        method: 'GET',
        uri: `${config.api.URL}/ordersByPersona?EID=${entityId}&Persona=${persona}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };

    global.presenter.startLoading();

    setTimeout(function() {
        request(options)
            .then(function (res) {
                setOrdersData(formatter(res));
                global.presenter.stopLoading();
            })
            .catch(function (err) {
                global.presenter.stopLoading();
                alert(`There are no orders where you (Entity: ${entityId}) are a ${persona}.`);
            });
    }, 1000);
}

/**
 * Inserts a new invoice into the database
 *
 * @param details - contains the details of the order being inserted into the backend
 * @param makeOrderHandler - handles the transition from actioning invoice page to the home page
 */
function performMakeOrder(view, details, makeOrderHandler) {
    view.setState({loading: true});
    const options = {
        method: 'PUT',
        uri: `${config.api.URL}/order?SID=${details.sellerID}&CID=${details.buyerID}&DID=5&OrderDate=${details.orderDate}&DeliveryDate=${details.deliveryDate}`,
        body: {
            "invoiceItems": [
                {
                    "IID": details.itemID,
                    "Quantity": details.itemQuantity
                }
            ]
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    setTimeout(function() {
        request(options)
            .then(function (res) {
                makeOrderHandler(details.buyerID); // passing
            })
            .catch(function (err) {
                alert(`The order was unsuccessful: ${err.status} -- ${err.message}`);
            });
        view.setState({loading: false});
    }, 2000); // Set Delay (to test the loading animation)2000);
}

/**
 * Inserts a new item/product into the database
 *
 * view - the page for inserting a new product
 * @param details - contains the details of the order being inserted into the backend
 * @param makeProductHandler - handles the transition from actioning product page to the home page
 */
function performMakeProduct(view, details, makeProductHandler) {
    view.setState({loading: true});
    const options = {
        method: 'PUT',
        uri: `${config.api.URL}/item?Name=${details.itemName}&SID=${details.sellerID}&Price=${details.itemPrice}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    setTimeout(function() {
        request(options)
            .then(function (res) {
                makeProductHandler(); // passing
            })
            .catch(function (err) {
                alert(`Registering the product was unsuccessful: ${err.status} -- ${err.message}`);
            });
        view.setState({loading: false});
    }, 2000); // Set Delay (to test the loading animation)2000);
}

/**
 * Inserts a new invoice into the database
 *
 * @param view - the view of the action invoice page
 * @param details - contains the delivery date and the ID that this new invoice replaces
 * @param invoiceHandler - handles the transition from actioning invoice page to the home page
 *
 */
function performActionInvoice(view, details, invoiceHandler) {
    view.setState({loading: true});
    const options = {
        method: 'PUT',
        uri: `${config.api.URL}/invoice?DeliveryDate=${details.deliveryDate}&NextInID=${details.nextInID}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    setTimeout(function() {
        request(options)
            .then(function (res) {
                invoiceHandler(); // passing
            })
            .catch(function (err) {
                alert(`The action was unsuccessful: ${err.status} -- ${err.message}`);
            });
        view.setState({loading: false});
    }, 2000); // Set Delay (to test the loading animation)2000);
}

/**
 * Get the information (entities, statuses and dates) related to the order with id 'orderId'.
 *
 * @param orderId - The id of the order
 * @param setOrderInfo - A callback function, which is provided the formatted order info
 * @param formatter - A function which is used to format the order info
 */
function getOrderInfo(orderId, setOrderInfo, formatter) {
    const options = {
        method: 'GET',
        uri: `${config.api.URL}/order?OID=${orderId}&FullOrder=true`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };

    global.presenter.startLoading();

    setTimeout(function() {
        request(options)
            .then(function (res) {
                setOrderInfo(formatter(res));
                global.presenter.stopLoading();
            })
            .catch(function (err) {
                global.presenter.stopLoading();
            });
    }, 1000);
}

/**
 * Get the items pertaining to the invoice of id 'invoiceId'.
 *
 * @param invoiceId - The id of the invoice
 * @param setOrderItems - A callback function, which is provided the formatted order items
 * @param formatter - A function which is used to format the order items
 * @param setOrderTotal - An optional function, which is used to set the calculated total invoice cost
 */
function getInvoiceItems(invoiceId, setOrderItems, formatter, setOrderTotal) {
    const options = {
        method: 'GET',
        uri: `${config.api.URL}/invoiceItems?InID=${invoiceId}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };

    global.presenter.startLoading();

    setTimeout(function() {
        request(options)
            .then(function (res) {
                if (setOrderTotal === undefined) {
                    setOrderItems(formatter(res));
                } else {
                    setOrderItems(formatter(res, setOrderTotal));
                }
                global.presenter.stopLoading();
            })
            .catch(function (err) {
                global.presenter.stopLoading();
            });
    }, 1000);
}

/**
 * Set the status of type 'status' for order 'orderId' to the state 'state'.
 *
 * @param orderId - The id of the order who's status is being set
 * @param status - The status type being set ('Paid', 'Arrived', 'Delivered')
 * @param state - The state that 'status' is being set to ('true', 'false')
 * @param actionOnSuccess - An optional callback function, to do upon successful completion of the PUT request.
 */
function setOrderStatus(orderId, status, state, actionOnSuccess) {
    const options = {
        method: 'PUT',
        uri: `${config.api.URL}/orderStatus?OID=${orderId}&status=${status}&state=${state}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };

    global.presenter.startLoading();

    setTimeout(function() {
        request(options)
            .then(function (res) {
                global.presenter.stopLoading();
                if (actionOnSuccess !== undefined) {
                    actionOnSuccess();
                }
            })
            .catch(function (err) {
                global.presenter.stopLoading();
            });
    }, 500);
}

export {getOrdersByEntityAndPersona,
    performMakeProduct,
    performMakeOrder,
    performActionInvoice,
    getOrderInfo,
    getInvoiceItems,
    setOrderStatus};
