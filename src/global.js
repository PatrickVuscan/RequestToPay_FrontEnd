/* This contains the static data to be accessed and modified across files */

/**
 * global static variables
 *
 * @props entityId - The ID of the entity viewing the orders.
 * @props viewPersona - The viewPersona for which the orders pertain to (ie: entityId is seller or customer or driver).
 * @props viewStatus - The viewStatus of orders.
 * @props cardClickHandler - The function that is called to change views upon a card click
 */

const global = {

  loggedIn: false,

  /* User Data */
  username: 'Not Logged In!',
  entityId: '',

  /* View Data */
  currentView: '',
  viewPersona: "ORIG",
  viewStatus: "orig",

  /* Style */
  menuColor: 'transparent',

};

export default global
