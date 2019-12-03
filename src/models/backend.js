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
                alert(`The login was unsuccessful: ${err.status} -- ${err.message}`);
            });
        view.setState({loading: false});
    }, 2000); // Set Delay (to test the loading animation)
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
        uri: `${config.api.URL}/entityOrdersUInvoiceUEntityByIdAndPersona?EID=${entityId}&Persona=${persona}`,
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
                alert(`There was an error: ${err.status} -- ${err.message}`);
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
        uri: `${config.api.URL}/entityOrdersUInvoiceUEntityByIdAndPersona?EID=${entityId}&Persona=${persona}`,
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
    console.log("ORDERID: " + orderId);
    const options = {
        method: 'GET',
        uri: `${config.api.URL}/orderUInvoiceUEntity?OID=${orderId}`,
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
    console.log(invoiceId);

    global.presenter.startLoading();

    setTimeout(function() {
        request(options)
            .then(function (res) {
                console.log("Success");
                console.log(res);
                if (setOrderTotal === undefined) {
                    console.log("No Set Orders Total");
                    setOrderItems(formatter(res));
                } else {
                    console.log("Set Orders Total");
                    setOrderItems(formatter(res, setOrderTotal));
                }
                global.presenter.stopLoading();
            })
            .catch(function (err) {
                global.presenter.stopLoading();
            });
    }, 1000);
}

export {performLogin,
    getOrdersByEntityAndPersona,
    getEntityPersona,
    getOrderInfo,
    getInvoiceItems};
