/* Using endpoints provided by RequestToPay_BackEnd */

import config from "../constants";
import request from "request-promise";

/**
 * Validate login credentials.
 *
 * @param view - the view that initiated the login.
 * @param credentials - credentials.username and credentials.password contain the respect credentials to validate.
 * @param successfulLoginHandler - a handler for the UI, should the user successfully log in.
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
                successfulLoginHandler(credentials.username);
            })
            .catch(function (err) {
                alert(`The login was unsuccessful: ${err.status} -- ${err.message}`);
            });
        view.setState({loading: false});
    }, 2000); // Set Delay (to test the loading animation)
}

/**
 * Get the information related to the entity with username 'username'.
 * Rather than returning a value, entity information is passed to 'setEntityInfo' to be stored.
 *
 * @param username - The username of the entity
 * @param setEntityInfo - The function used to save the entity information
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
 * Get the entity ID of the entity with username 'username'.
 * Rather than returning a value, entityID is passed to 'setEntityId' to be stored.
 *
 * @param username - The username of the entity
 * @param setEntityId - The function used to save the entityId
 */
function getEntityIdByUsername(username, setEntityId) {
    const options = {
        method: 'GET',
        uri: `${config.api.URL}/entityByName?user=${username}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    setTimeout(function() {
        request(options)
            .then(function (res) {
                setEntityId(res.EID);
            })
            .catch(function (err) {
                alert(`There was an error: ${err.status} -- ${err.message}`);
            });
    }, 1000);
}

/**
 * Get the orders pertaining to the entity with ID 'entityID',
 * where the entity is the 'viewPersona' (customer, seller or driver).
 * Rather than returning a value, the orders data is passed to 'setOrdersData' to be stored.
 *
 * @param entityId - The ID for the entity that is being searched by
 * @param persona - The viewPersona that is being searched by
 * @param formatter - A function that can format the data provided by the endpoint
 * @param setOrdersData - A function used to store the orders
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

export {performLogin,
    getEntityInfoByUsername,
    getEntityIdByUsername,
    getOrdersByEntityAndPersona};
