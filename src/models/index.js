// Contains all methods to read / write data
// implementation is delegated elsewhere (backend.js & cache.js)

import {performLogin,
    getOrdersByEntityAndPersona,
    getEntityPersona,
    getOrderInfo,
    getInvoiceItems,
    setOrderStatus} from "./backend";

export {performLogin,
    getOrdersByEntityAndPersona,
    getEntityPersona,
    getOrderInfo,
    getInvoiceItems,
    setOrderStatus};
