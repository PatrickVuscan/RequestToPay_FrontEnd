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
        json: true
    };

    setTimeout(function() {
        request(options)
            .then(function (res) {
                successfulLoginHandler(credentials.username, res.EID);
            })
            .catch(function (err) {
                alert(`Unable to find your account.`);
            });
        view.setState({loading: false});
    }, 2000);
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
        uri: `${config.api.URL}/entity?Name=${credentials.name}&Username=${credentials.username}&Password=${credentials.password}&BillingAddress=${credentials.address}&PhoneNumber=${credentials.phone}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    setTimeout(function() {
        request(options)
            .then(function (res) {
                successfulRegisterHandler(credentials.username, res); // passing
            })
            .catch(function (err) {
                alert(`The register was unsuccessful: ${err.status} -- ${err.message}`);
            });
        view.setState({loading: false});
    }, 2000); // Set Delay (to test the loading animation)
}

/**
 * Transition to sign up page
 */

function performToSignUp(view, go){
    view.setState({loading: true});
    setTimeout(function(res) {
        go();
        view.setState({loading: false});
    }, 2000); // Set Delay (to test the loading animation)
}

/**
 * Log user out
 *
 * @param view - view that contains methods for setting each persona
 */
function performLogout(view, personas, personaHandler) {
    view.setState({loading: true});
    setTimeout(function(res) {
        view.setCustomer(false);
        view.setSeller(false);
        view.setDriver(false);
        personaHandler(view, personas);
        view.setState({loading: false});
    }, 2000); // Set Delay (to test the loading animation)
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
        json: true
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

export {performLogin,
    performRegister,
    performToSignUp,
    performLogout,
    getEntityPersona};
