import {performLogin,
    getEntityPersona} from './Entity';
import {getOrdersByEntityAndPersona,
    getOrderInfo,
    getInvoiceItems,
    setOrderStatus} from './Order';

/**
 * Provides all methods to read/write data.
 *
 * Implementations are delegated to other files within ./models.
 */
export {performLogin,
    getOrdersByEntityAndPersona,
    getEntityPersona,
    getOrderInfo,
    getInvoiceItems,
    setOrderStatus};
