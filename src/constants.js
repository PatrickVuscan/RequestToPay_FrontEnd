/**
 * The constant data to be accessed across files.
 */
export default {
    api: {
        URL: 'https://worksish-backend-v1.herokuapp.com/api/v1',
        OrderStatus: {
            Arrived: 'ArrivedStatus',
            Delivered: 'DeliveredStatus',
            Paid: 'PaidStatus'
        }
    },
    PERSONA: {
        customer: {
            name: 'customer',
            string: 'Buying.'
        },
        seller: {
            name: 'seller',
            string: 'Selling.'
        },
        driver: {
            name: 'driver',
            string: 'Delivering.'
        }
    },
    STATUS: {
        customer: {
            unpaid: {
                name: 'Unpaid',
                string: 'Ready to Pay.'
            },
            paid: {
                name: 'Paid',
                string: 'Waiting for Delivery.'
            },
            completed: {
                name: 'Completed',
                string: 'Completed Orders.'
            }
        },
        seller: {
            incomplete: {
                name: 'Incomplete',
                string: 'Incomplete Orders.'
            },
            completed: {
                name: 'Completed',
                string: 'Completed Orders.'
            }
        },
        driver: {
            incomplete: {
                name: 'Incomplete',
                string: 'To Deliver.'
            },
            completed: {
                name: 'Completed',
                string: 'Completed Deliveries.'
            }
        }
    },
    VIEW: {
        login: 'login',
        home: 'home',
        signup: 'signup',
        invoice: 'invoice',
        products: 'products',
        makeorder: 'makeorder',
        setup: 'setup',
        orderList: 'orderList',
        cardList: 'cardList',
        order: 'order',
    }
}
