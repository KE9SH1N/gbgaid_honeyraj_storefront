import { createSlice } from "@reduxjs/toolkit";
import { fetchDeliveryChargeData } from "../../../api/locationApiService";
import { deliverCharge } from "../../../types/deliverChargeType";

interface delivaryChargeState {
	deliveryCharge: deliverCharge[];
	loading: boolean;
	error: string | null;
	prices: number;
}

const initialState: delivaryChargeState = {
	deliveryCharge: [],
	loading: false,
	error: null,
	prices: 0,
};

const delivaryChargeSlice = createSlice({
	name: "deliverycharge",
	initialState,
	reducers: {
		setShippingThanaPrice(state, action) {
			state.prices = action.payload;
		},
		resetDeliveryCharge(state) {
			Object.assign(state, initialState);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDeliveryChargeData.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchDeliveryChargeData.fulfilled, (state, action) => {
				state.loading = false;
				state.deliveryCharge = action.payload;
				state.error = null;
			})
			.addCase(fetchDeliveryChargeData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "An error occurred.";
			});
	},
});

export const selectDeliveryCharge = (state: {
	deliverycharge: delivaryChargeState;
}) => state.deliverycharge.deliveryCharge;

export const deliveryChargePrice = (state: {
	deliverycharge: delivaryChargeState;
}) => state.deliverycharge.prices;

export const { setShippingThanaPrice, resetDeliveryCharge } =
	delivaryChargeSlice.actions;

export default delivaryChargeSlice.reducer;
