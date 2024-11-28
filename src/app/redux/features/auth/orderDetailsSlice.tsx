import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderDetailsState {
	order: any;
	loading: boolean;
	error: string | null;
}

const initialState: OrderDetailsState = {
	order: [],
	loading: true,
	error: null,
};

export const productdetailsSlice = createSlice({
	name: "orderDetails",
	initialState,
	reducers: {
		getOrderStart(state) {
			state.loading = true;
			state.error = null;
		},
		getOrderSuccess(state, action: PayloadAction<any>) {
			state.loading = false;
			state.order = action.payload;
		},
		getOrderFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		setOrderData(state, action: PayloadAction<any>) {
			state.order = action.payload;
		},
	},
});

export const selectOrderDetailsData = (state: {
	orderDetails: OrderDetailsState;
}) => state.orderDetails?.order;

export const selectOrderDetailsLoading = (state: {
	orderDetails: OrderDetailsState;
}) => state.orderDetails?.loading;

export const { getOrderStart, getOrderSuccess, getOrderFailure, setOrderData } =
	productdetailsSlice.actions;
export default productdetailsSlice.reducer;
