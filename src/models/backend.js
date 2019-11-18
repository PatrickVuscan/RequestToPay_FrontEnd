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
    }.bind(this), 2000); // Set Delay (to test the loading animation)
}

/**
 * Get the information related to the entity with username 'username'.
 *
 * @param username - The username of the entity
 * @return String - The entity information
 */
function getEntityInfoByUsername(username) {
    const options = {
        method: 'GET',
        uri: `${config.api.URL}/entityByName?user=${username}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    return performRequest(options);
}

/**
 * Get the ID (for future endpoint calls) of the entity with username 'username'.
 *
 * @param username - The username of the entity
 * @return String - The entity's ID
 */
function getEntityIdByUsername(username) {
    let allInfo = this.getEntityInfoByUsername(username);
    return allInfo["EID"];
}

/**
 * Get the orders pertaining to the entity with ID 'entityID',
 * where the entity is the 'persona' (customer, seller or driver).
 *
 * @param entityId -
 * @param persona
 * @return
 */
function getOrdersByEntityAndPersona(entityId, persona) {
    const options = {
        method: 'GET',
        uri: `${config.api.URL}/entityOrdersUInvoiceUEntityByIdAndPersona?eid=${entityId}&pass=${persona}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    return performRequest(options);
}

export {performLogin,
    getEntityInfoByUsername,
    getEntityIdByUsername,
    getOrdersByEntityAndPersona};

/* HELPER METHODS */

/**
 * This performs a request with the provided options,
 * without setting the state of a view to and from loading.
 *
 * @param options - The options of the request to an endpoint
 * @returns {string} - The output of the request
 */
function performRequest(options) {
    let result = "";
    setTimeout(function() {
        request(options)
            .then(function (res) {
                result = res;
            })
            .catch(function (err) {
                result = "";
                alert(`There was an error: ${err.status} -- ${err.message}`);
            });
    }.bind(this), 1000);
    return result;
}
