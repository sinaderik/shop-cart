export function reducer(state, action) {
    switch (action.type) {
        case 'CLEAR_CART': {
            return { ...state, amount: 0, cart: [] }
        }
        case 'REMOVE': {
            return {
                ...state,
                amount: state.cart.length - 1,
                cart: state.cart.filter(item => item.id !== action.payload)
            }
        }
        case 'CHANGE_QUANTITY': {
            const tempCart = state.cart.map(item => {
                if (item.id === action.payload.id && action.payload.quantity > 0) {
                    return { ...item, quantity: action.payload.quantity }
                }
                return item
            })
            return { ...state, cart: tempCart }
        }
        case 'GET_TOTALS': {
            let { total, quantity } = state.cart.reduce((item, cartItem) => {
                const { price, quantity } = cartItem;
                const itemTotalPrice = price * quantity;
                item.total += itemTotalPrice;
                item.quantity += quantity;
                return item
            }, {
                total: 0,
                quantity: 0
            });

            return {
                ...state,
                quantity,
                total
            }
        }
    }
}