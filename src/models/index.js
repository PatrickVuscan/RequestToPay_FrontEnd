// Contains all methods to read / write data
// implementation is delegated elsewhere (backend.js & cache.js)

import {performLogin,
    performRegister,
    getEntityInfoByUsername,
    getOrdersByEntityAndPersona,
    getEntityPersona,
    getOrderInfo,
    getInvoiceItems} from "./backend";

import { performToSignUp, performPersonaSet } from "./cache";

export {performLogin,
    performToSignUp,
    performPersonaSet,
    performRegister,
    getEntityInfoByUsername,
    getOrdersByEntityAndPersona,
    getEntityPersona,
    getOrderInfo,
    getInvoiceItems};
