import React, { createContext, useReducer, useContext } from "react";
import { useEffect } from "react";

const CartContext = createContext();

const initialState = {
    cart: [],
};

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            const existing = state.cart.find(item => item.id === action.payload.id);
            if (existing) {
                return {
                    cart: state.cart.map(item =>
                        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
            }
            return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };

        case "UPDATE_QUANTITY":
            return {
                cart: state.cart.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
                ),
            };

        case "REMOVE_FROM_CART":
            return { cart: state.cart.filter(item => item.id !== action.payload) };

        case "CLEAR_CART":
            return { cart: [] };

        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const persistedState = JSON.parse(localStorage.getItem("cartState")) || initialState;
    const [state, dispatch] = useReducer(cartReducer, persistedState);

    useEffect(() => {
        localStorage.setItem("cartState", JSON.stringify(state));
    }, [state]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
