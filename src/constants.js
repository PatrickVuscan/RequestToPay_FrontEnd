export default {
    api: {
        URL: 'https://worksish-backend-v1.herokuapp.com/api/v1'
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
        }
    },
    VIEW: {
        login: 'login',
        home: 'home',
        orderList: 'orderList',
        cardList: 'cardList',
        order: 'order',
    }
}
