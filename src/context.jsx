import { createContext, useContext } from "react"
import cartItems from './data'
import { useReducer } from "react";
import reducer from './reducer'


const CartContext = createContext();

const initialState = {
    loading: false,
    cart: cartItems,
    total: 0,
    amount: 0
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <CartContext.Provider value={{...state}} >
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext(){
    return useContext(CartContext)
}