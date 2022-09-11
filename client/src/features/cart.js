import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        showCartModal: false,
        mostRecentItem: null
    },
    reducers: {
        updateCart: (state, action) => {
            state.cart = action.payload.cart;
        },
        toggleCartModal: (state) => {
            state.showCartModal = !state.showCartModal;
        },
        updateMostRecentItem: (state, action) => {
            state.mostRecentItem = action.payload.mostRecentItem;
        }
    }
})

export const selectCart = state => state.cart.cart;
export const selectShowCartModal = state => state.cart.showCartModal;
export const selectIsCartEmtpy = state => state.cart.cart.length === 0;
export const selectNumCartItems = state => state.cart.cart.length;
export const selectMostRecentItem = state => state.cart.mostRecentItem;
export const selectSetupTotal = state => state.cart.cart.length > 0 ? state.cart.cart.map(item => Number(item.setup_fee)).reduce((prev, current) => prev + current, 0) : 0;
export const { updateCart, toggleCartModal, updateMostRecentItem } = cartSlice.actions;
export default cartSlice.reducer;