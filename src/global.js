import constants from './constants'

/**
 * The static data to be accessed and modified across files.
 *
 * @type {{loggedIn: boolean,
 * viewInvoiceID: string,
 * currentView: *,
 * entityId: string,
 * viewPersona: string,
 * viewStatus: string,
 * viewOrderID: string,
 * username: string}}
 */
const global = {

  loggedIn: false,

  /* User Data ---------------------------*/
  username: 'Not Logged In!',
  name: '',
  entityId: '',

  /* View Data ---------------------------*/
  currentView: constants.VIEW.login,
  viewPersona: '',
  viewStatus: '',
  viewOrderID: '',
  viewInvoiceID: '',
  invoiceApproved: false,
  invoicePaid: false,
  invoiceArrived: false,
  invoiceDelivered: false,
};

export default global
