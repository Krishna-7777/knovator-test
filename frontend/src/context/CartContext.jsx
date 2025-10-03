import { createContext, useReducer, useContext, useEffect } from "react";

const CartContext = createContext();

const initialState = {
    cart: [],
};

// Reducer function to handle cart actions
function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            // If item exists, increase quantity; else add new item with quantity 1
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
            // Update quantity of specific item
            return {
                cart: state.cart.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
                ),
            };

        case "REMOVE_FROM_CART":
            // Remove item from cart
            return { cart: state.cart.filter(item => item.id !== action.payload) };

        case "CLEAR_CART":
            // Empty the cart
            return { cart: [] };

        default:
            return state;
    }
}

// CartProvider to wrap around components needing cart state
export function CartProvider({ children }) {
    // Load persisted cart from localStorage, or use initialState
    const persistedState = JSON.parse(localStorage.getItem("cartState")) || initialState;
    const [state, dispatch] = useReducer(cartReducer, persistedState);

    // Helper function to update item quantity
    const handleQuantityChange = (id, qty) => {
        // Prevent negative or zero quantity
        if (qty < 1) return;
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: qty } });
    };

    // Helper function to delete an item
    const deleteItem = (id) => dispatch({ type: "REMOVE_FROM_CART", payload: id })

    // Persist cart state to localStorage on change
    useEffect(() => {
        localStorage.setItem("cartState", JSON.stringify(state));
    }, [state]);

    return (
        <CartContext.Provider value={{ state, dispatch, handleQuantityChange, deleteItem }}>
            {children}
        </CartContext.Provider>
    );
}

// Custom hook for consuming cart context
export const useCart = () => useContext(CartContext);
