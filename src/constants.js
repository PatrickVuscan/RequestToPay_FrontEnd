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
            unpaid: 'unpaid', // UI: Ready To Pay
            paid: 'paid', // UI: Waiting or Delivery
            completed: 'completed' // UI: Completed Orders
        },
        seller: {
            incomplete: 'incomplete',
            completed: 'completed'
        }
    }
}
