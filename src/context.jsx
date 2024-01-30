import { createContext, useContext, useEffect } from "react"
import cartItems from './data'
import { useReducer } from "react";
import { reducer } from './reducer'


const CartContext = createContext();

const initialState = {
    loading: false,
    cart: cartItems,
    total: 0,
    amount: cartItems.length
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    function clearCart() {
        dispatch({ type: "CLEAR_CART" })
    }

    function remove(id) {
        dispatch({ type: "REMOVE", payload: id })
    }

    function changeQuantity(changeObj) {
        dispatch({ type: "CHANGE_QUANTITY", payload: changeObj })
    }

    useEffect(() => {
        dispatch({ type: "GET_TOTALS" })
    }, [state.cart])
    
    return (
        <CartContext.Provider value={{ ...state, clearCart, remove, changeQuantity }} >
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext() {
    return useContext(CartContext)
}