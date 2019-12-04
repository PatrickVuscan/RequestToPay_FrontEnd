/* Using endpoints provided by RequestToPay_BackEnd */

import config from "../constants";
import request from "request-promise";

/**
 * Validate login credentials.
 *
 * @param view - the view that initiated the login.
 * @param credentials - credentials.username and credentials.password contain the respect credentials to validate.
 * @param successfulLoginHandler - A callback function, which is used upon a successful login.
 */
function performLogin(view, credentials, successfulLoginHandler) {
    view.setState({loading: true});
    const options = {
        method: 'GET',
        uri: `${config.api.URL}/login?user=${credentials.username}&pass=${credentials.password}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    setTimeout(function() {
        request(options)
            .then(function (res) {
                successfulLoginHandler(credentials.username, res.EID); // passing
            })
            .catch(function (err) {
                alert(`Unable to find your account.`);
            });
        view.setState({loading: false});
    }, 2000); // Set Delay (to test the loading animation)
}

/**
 * Register a new user.
 *
 * @param view - the view that initiated the register.
 * @param credentials - credentials.username and credentials.password contain the respect credentials to validate.
 * @param successfulRegisterHandler - A callback function, which is used upon a successful register.
 */
function performRegister(view, credentials, successfulRegisterHandler) {
    view.setState({loading: true});
    const options = {
        method: 'PUT',
        uri: `${config.api.URL}/entity?Name=${credentials.name}&Username=${credentials.username}&Password=${credentials.password}&BillingAddress=${credentials.address}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    setTimeout(function() {
        request(options)
            .then(function (res) {
                successfulRegisterHandler(credentials.username, res.EID); // passing
            })
            .catch(function (err) {
                alert(`The register was unsuccessful: ${err.status} -- ${err.message}`);
            });
        view.setState({loading: false});
    }, 2000); // Set Delay (to test the loading animation)
}


/**
 * Get the information related to the entity with username 'username'.
 * Rather than returning a value, 'setEntityInfo' is a callback function provided the data.
 *
 * @param username - The username of the entity
 * @param setEntityInfo - A callback function, which is used to save the entity information
 */
function getEntityInfoByUsername(username, setEntityInfo) {
    const options = {
        method: 'GET',
        uri: `${config.api.URL}/entityByName?user=${username}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    global.presenter.startLoading();

    setTimeout(function() {
        request(options)
            .then(function (res) {
                setEntityInfo(res);
                global.presenter.stopLoading();
            })
            .catch(function (err) {
                global.presenter.stopLoading();
                alert(`There was an error: ${err.status} -- ${err.message}`);
            });
    }, 1000);
}

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
        json: true // Automatically parses the JSON string in the response
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
 * Get whether the 'persona' (customer, seller or driver) is relevant to the entity with id 'entityId'.
 *
 * @param entityId - The ID for the entity that is being searched by
 * @param persona - The persona that is being searched by
 * @param setPersona - A callback function, which is passed true if the persona applies to the entity
 */
function getEntityPersona(entityId, persona, setPersona) {
    const options = {
        method: 'GET',
        uri: `${config.api.URL}/ordersByPersona?EID=${entityId}&Persona=${persona}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    global.presenter.startLoading();

    setTimeout(function() {
        request(options)
            .then(function (res) {
                setPersona(true);
                global.presenter.stopLoading();
            })
            .catch(function (err) {
                global.presenter.stopLoading();
            });
    }, 1000);
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
        json: true // Automatically parses the JSON string in the response
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
 * Inserts a new invoice into the database
 *
 * @param details - contains the details of the order being inserted into the backend
 * @param makeOrderHandler - handles the transition from actioning invoice page to the home page
 */
//TODO need to solve how to load invoice items aka how to set parameter of a query or smth
function performMakeOrder(details, makeOrderHandler) {
    const options = {
        method: 'PUT',
        uri: `${config.api.URL}/order?SID=${details.sellerID}&CID=${details.buyerID}&DID=${details.driverID}&OrderDate=${details.orderDate}&DeliveryDate=${details.deliveryDate}`,
        body: {
            "invoiceItems": [
                {
                    "IID": details.itemID,
                    "Quantity": details.itemquantity
                }
            ]
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    //TODO use res where res is the ID of the new order

    setTimeout(function() {
        request(options)
            .then(function (res) {
                makeOrderHandler(details.buyerID); // passing
            })
            .catch(function (err) {
                alert(`The order was unsuccessful: ${err.status} -- ${err.message}`);
            });
    }, 2000); // Set Delay (to test the loading animation)2000);
}

/**
 * Inserts a new item/product into the database
 *
 * view - the page for inserting a new product
 * @param details - contains the details of the order being inserted into the backend
 * @param makeProductHandler - handles the transition from actioning product page to the home page
 */
//TODO need to solve how to load invoice items aka how to set parameter of a query or smth
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

    //TODO use res where res is the ID of the new order

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
        json: true // Automatically parses the JSON string in the response
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
        json: true // Automatically parses the JSON string in the response
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

export {performLogin,
    performRegister,
    getEntityInfoByUsername,
    getOrdersByEntityAndPersona,
    getEntityPersona,
    getOrderInfo,
    performActionInvoice,
    performMakeOrder,
    performMakeProduct,
    getInvoiceItems,
    setOrderStatus};
