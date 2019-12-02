// Contains all methods to read / write data
// implementation is delegated elsewhere (backend.js & cache.js)

import {performLogin,
    performRegister,
    getEntityInfoByUsername,
    getOrdersByEntityAndPersona,
    getEntityPersona,
    getOrderInfo,
    performActionInvoice,
    performMakeOrder,
    performMakeProduct,
    getInvoiceItems} from "./backend";

import { performToSignUp, performLogout } from "./cache";

export {performLogin,
    performToSignUp,
    performLogout,
    performRegister,
    getEntityInfoByUsername,
    getOrdersByEntityAndPersona,
    getEntityPersona,
    getOrderInfo,
    performActionInvoice,
    performMakeOrder,
    performMakeProduct,
    getInvoiceItems};
