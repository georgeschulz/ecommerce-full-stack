import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, action) => {
            state.cart = action.payload.cart;
        }
    }
})

export const selectCart = state => state.cart.cart;
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;