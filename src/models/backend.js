// This has implementation to read/write data to backend
// Ultimately: we are using the endpoints provided by the backend

// -----------------------------

// CREATE ENTITY? (IF WE DO REGISTRATION)
// GET ENTITY INFO
// GET INVOICE INFO
// etc. (See backend endpoint documentation)

import config from "../config";
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

export {performLogin};
