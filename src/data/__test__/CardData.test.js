import {getFormattedCustomerUnpaidOrders, getFormattedCustomerOrder} from "../CardData";

/* TESTS */

// TODO: Fix tests. These functions no longer return values.

describe("getFormattedCustomerUnpaidOrders", () => {

    const input = [
        {
            "OID": 2,
            "SID": 1,
            "CID": 4,
            "DID": 5,
            "OrderDate": "2019-08-05T00:00:00.000Z",
            "PaidStatus": false,
            "ArrivedStatus": false,
            "DeliveredStatus": false,
            "DeliveryDate": "2019-08-05T00:00:00.000Z",
            "SellerName": "Coke",
            "SellerBillingAddress": "20 Everywhere Ave.",
            "CustomerName": "Patrick",
            "CustomerBillingAddress": "66 Broadway Ave."
        },
        {
            "OID": 3,
            "InID": 4,
            "SID": 1,
            "CID": 4,
            "DID": 5,
            "OrderDate": "2019-11-15T00:00:00.000Z",
            "PaidStatus": true,
            "ArrivedStatus": false,
            "DeliveredStatus": false,
            "DeliveryDate": "2019-11-16T00:00:00.000Z",
            "SellerName": "Coke",
            "SellerBillingAddress": "20 Everywhere Ave.",
            "CustomerName": "Patrick",
            "CustomerBillingAddress": "66 Broadway Ave."
        },
        {
            "OID": 4,
            "InID": 5,
            "SID": 1,
            "CID": 4,
            "DID": 5,
            "OrderDate": "2019-11-15T00:00:00.000Z",
            "PaidStatus": false,
            "ArrivedStatus": false,
            "DeliveredStatus": false,
            "DeliveryDate": "2019-11-16T00:00:00.000Z",
            "SellerName": "Coke",
            "SellerBillingAddress": "20 Everywhere Ave.",
            "CustomerName": "Patrick",
            "CustomerBillingAddress": "66 Broadway Ave."
        }
    ];
    const expectedResult = [
        {
            "OID": 2,
            "OrderDate": "2019-08-05",
            "DeliveryDate": "2019-08-05",
            "Entity": "Coke",
            "Status": "Unpaid"
        },
        {
            "OID": 4,
            "OrderDate": "2019-11-15",
            "DeliveryDate": "2019-11-16",
            "Entity": "Coke",
            "Status": "Unpaid"
        }
    ];

    it("Returns the expected json", () => {
        expect(getFormattedCustomerUnpaidOrders(input)).toEqual(expectedResult);
    })

});

describe("getFormattedCustomerOrder", () => {

    const inputData = {
            "OID": 2,
            "SID": 1,
            "CID": 4,
            "DID": 5,
            "OrderDate": "2019-08-05T00:00:00.000Z",
            "PaidStatus": false,
            "ArrivedStatus": false,
            "DeliveredStatus": false,
            "DeliveryDate": "2019-08-05T00:00:00.000Z",
            "SellerName": "Coke",
            "SellerBillingAddress": "20 Everywhere Ave.",
            "CustomerName": "Patrick",
            "CustomerBillingAddress": "66 Broadway Ave."
        };

    const inputStatus = 'Unpaid';

    const expectedResult = {
            "OID": 2,
            "OrderDate": "2019-08-05",
            "DeliveryDate": "2019-08-05",
            "Entity": "Coke",
            "Status": "Unpaid"
        };

    it("Returns the expected json", () => {
        expect(getFormattedCustomerOrder(inputData, inputStatus)).toEqual(expectedResult);
    })

});
