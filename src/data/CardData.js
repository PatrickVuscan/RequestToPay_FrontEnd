// This is a utils file to construct data in a format that cards will use

// ---------------------------------------

// HIGH-LEVEL (THIS IS THE ONLY EXPORTED FUNCTION)
// - pass in userid, persona (seller/customer), status
// - get json of data for all relevant cards

// INNER FUNCTIONALITY
// - by userid, get list of invoices
// - on list of invoices, iterate the following on each invoice:
//          - get full invoice data by id
//          - if invoice has userid as persona and status, then add it to following json
//          - construct json in following format (where we only see data for relevant invoices)
//                     {
//                               {
//                                  SEE INFO FOR CARD.JS
//                               },
//                               {
//                                  SEE INFO FOR CARD.JS
//                               },
//                                etc.
//                      }
//     NOTE: The above filtering for persona will be done by back end.
//           We will have to do status filtering in this file.
// - return the json created above


/**
 * Returns the JSON format of all high-level card information where
 * 'buyerId' is the buyer and the order is in the unpaid status.
 *
 * TODO: Make use of endpoints. Then use getFormattedCustomerUnpaidOrders.
 */
function getCustomerUnpaidOrdersOverview(buyerId) {
    let data = {
        222222 : {
            'OrderId' : '222222',
            'Date' : '09/09/2019',
            'Entity' : 'Coca-Cola',
            'Total' : '$2400.00',
            'Status' : 'Paid'
        },
        222233 : {
            'OrderId' : '222233',
            'Date' : '09/09/2019',
            'Entity' : 'Minute Maid',
            'Total' : '$100.00',
            'Status' : 'Paid'
        },
        222244 : {
            'OrderId' : '222244',
            'Date' : '09/09/2019',
            'Entity' : 'Coca-Cola',
            'Total' : '$50.00',
            'Status' : 'Paid'
        }
    };
    return data;
}

/**
 * Returns a version of ordersData that is formatted for a high-level card
 * viewed by a customer, excluding the orders that were paid for.
 *
 * @param ordersData - A list of JSON objects, where each object is an order where the entity was a customer
 * @returns [] - A list of JSON objects, where each JSON object is one order
 */
function getFormattedCustomerUnpaidOrders(ordersData) {
    let formattedOrdersData = [];
    for (let i=0; i < ordersData.length; i++) {
        let orderData = ordersData[i];
        if (orderData["PaidStatus"] == false) {
            let formattedOrderData = getFormattedCustomerOrder(orderData, "Unpaid");
            formattedOrdersData.push(formattedOrderData);
        }
    }
    return formattedOrdersData;
}

/**
 * Gets the JSON format of the high-level card information a customer will see for a given order.
 * The data is a reduced and formatted version of 'orderData', with a status attribute
 * provided by the input 'status'.
 *
 * @param orderData - The JSON object for a given order
 * @param status - The english (simplified) status associated with 'orderData'
 * @returns {{OID: *, OrderDate: *, DeliveryDate: *, Entity: *, Status: *}}
 */
function getFormattedCustomerOrder(orderData, status) {
    let formatted = {
        'OID': orderData['OID'],
        'OrderDate': orderData['OrderDate'].substring(0,10),
        'DeliveryDate': orderData['DeliveryDate'].substring(0,10),
        'Entity': orderData['SellerName'],
        'Status': status
    };
    return formatted;
}

export {getFormattedCustomerUnpaidOrders, getFormattedCustomerOrder}
