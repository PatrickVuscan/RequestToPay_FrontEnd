import {performLogin,
    performRegister,
    performToSignUp,
    performLogout,
    getEntityPersona} from './Entity';


import {getOrdersByEntityAndPersona,
    performActionInvoice,
    performMakeOrder,
    performMakeProduct,
    getOrderInfo,
    getInvoiceItems,
    setOrderStatus} from './Order';

/**
 * Provides all methods to read/write data.
 *
 * Implementations are delegated to other files within ./models.
 */
export {performLogin,
    performRegister,
    performToSignUp,
    performLogout,
    getOrdersByEntityAndPersona,
    performActionInvoice,
    performMakeOrder,
    performMakeProduct,
    getEntityPersona,
    getOrderInfo,
    getInvoiceItems,
    setOrderStatus};
