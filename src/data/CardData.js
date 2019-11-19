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
 * TODO: Make use of endpoints. Currently mocked (hard-coded).
 */
function getBuyerUnpaidOrdersOverview(buyerId) {
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

export {getBuyerUnpaidOrdersOverview}
