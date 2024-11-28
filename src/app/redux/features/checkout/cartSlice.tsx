import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
	isOpenCart: boolean;
	isFloatCartOpen: boolean;
}

const initialState: CartState = {
	isOpenCart: false,
	isFloatCartOpen: true,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		toggleCart(state) {
			state.isOpenCart = !state.isOpenCart;
			state.isFloatCartOpen = !state.isFloatCartOpen;
		},

		closeCart(state) {
			state.isOpenCart = false;
			state.isFloatCartOpen = true;
		},
	},
});

export const floatingCartOpen = (state: { cart: CartState }) =>
	state.cart.isFloatCartOpen;

export const cartOpen = (state: { cart: CartState }) => state.cart.isOpenCart;

export const { toggleCart, closeCart } = cartSlice.actions;

export default cartSlice.reducer;
