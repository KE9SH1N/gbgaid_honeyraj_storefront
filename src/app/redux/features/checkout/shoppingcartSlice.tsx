import { Product } from "@/app/types/productType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface shoppingCartState {
	items: Product[];
}

const initialState: shoppingCartState = {
	items: [],
};

const shoppingcartSlice = createSlice({
	name: "shoppingcart",

	initialState,

	reducers: {
		addtoCart: (state, action: PayloadAction<Product>) => {
			const { id, quantity } = action.payload;
			const existingItemIndex = state.items.findIndex((item) => item.id === id);

			if (existingItemIndex !== -1) {
				state.items[existingItemIndex].quantity += quantity || 1;
			} else {
				state.items.push({ ...action.payload, quantity: quantity });
			}
		},

		removefromCart: (state, action: PayloadAction<number>) => {
			const productIdToRemove = action.payload;
			state.items = state.items.filter((item) => item.id !== productIdToRemove);
		},

		incrementQuantity: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			const itemIndex = state.items.findIndex(
				(item: Product) => item.id === id
			);
			if (itemIndex !== -1) {
				state.items[itemIndex].quantity += 1;
			}
		},
		decrementQuantity: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			const item = state.items.find((item) => item.id === id);
			if (item && item.quantity > 0) {
				item.quantity -= 1;
				if (item.quantity === 0) {
					state.items = state.items.filter((item) => item.id !== id);
				}
			}
		},
		updateQuantity: (
			state,
			action: PayloadAction<{ id: number; quantity: number }>
		) => {
			const { id, quantity } = action.payload;
			const itemIndex = state.items.findIndex((item) => item.id === id);
			if (itemIndex !== -1) {
				state.items[itemIndex].quantity = quantity;
			}
		},
		resetshoppingCartState: () => initialState,
	},
});

export const selectSubtotal = (state: {
	shoppingcart: shoppingCartState;
}): number => {
	return state.shoppingcart.items.reduce((subtotal: number, item: Product) => {
		let totalPrice = 0;
		if (!item.current_prices) {
			totalPrice = item.regular_prices;
		} else {
			totalPrice = item.current_prices;
		}
		return subtotal + totalPrice * item.quantity;
	}, 0);
};

export const selectTotalQuantity = (state: {
	shoppingcart: shoppingCartState;
}): number => {
	return state.shoppingcart.items.reduce(
		(totalQuantity: number, item: Product) => {
			return totalQuantity + item.quantity;
		},
		0
	);
};

export const cartItemList = (state: { shoppingcart: shoppingCartState }) =>
	state.shoppingcart.items;

export const {
	addtoCart,
	removefromCart,
	incrementQuantity,
	decrementQuantity,
	updateQuantity,
	resetshoppingCartState,
} = shoppingcartSlice.actions;
export default shoppingcartSlice.reducer;
