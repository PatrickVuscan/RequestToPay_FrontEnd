export default {
    api: {
        URL: 'https://worksish-backend-v1.herokuapp.com/api/v1'
    },
    PERSONA: {
        customer: 'customer', // UI: Buying
        seller: 'seller', // UI: Selling
        driver: 'driver'
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
    }
}
