import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cartItems: [],
};

// Reducer Logic
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        // Increase quantity
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      // Add new item
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.id !== id),
        };
      }

      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "CLEAR_CART":
      return { ...state, cartItems: [] };

    default:
      return state;
  }
}

// Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Helper: Total Price
  const getTotal = () =>
    state.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

  return (
    <CartContext.Provider value={{ state, dispatch, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => useContext(CartContext);
