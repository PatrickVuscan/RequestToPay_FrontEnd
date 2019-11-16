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

