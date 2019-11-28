/* This contains the static data to be accessed and modified across files */

/**
 * global static variables
 *
 * @props entityId - The ID of the entity viewing the orders.
 * @props viewPersona - The viewPersona for which the orders pertain to (ie: entityId is seller or customer or driver).
 * @props viewStatus - The viewStatus of orders.
 */
import constants from './constants'

const VIEW = constants.VIEW;

const global = {

  loggedIn: false,

  /* User Data ---------------------------*/
  username: 'Not Logged In!',
  entityId: '',

  /* View Data ---------------------------*/
  viewPersona: "ORIG",
  viewStatus: "orig",
  currentView: VIEW.login,
  viewOrderID: '',
  viewInvoiceID: '',

  /* Style -------------------------------*/
  // menuColor: 'transparent', // TODO: replace with CSS?
};

export default global
