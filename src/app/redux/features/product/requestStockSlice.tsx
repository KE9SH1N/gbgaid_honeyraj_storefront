import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequestStockFormState {
	fullName: string;
	phoneNumber: string;
	message: string;
}

const initialState: RequestStockFormState = {
	fullName: "",
	phoneNumber: "",
	message: "",
};

const requestStockSlice = createSlice({
	name: "requeststockform",
	initialState,
	reducers: {
		setReqStockCustomerName(state, action: PayloadAction<string>) {
			state.fullName = action.payload;
		},
		setReqStockCustomerPhoneNumber(state, action: PayloadAction<string>) {
			state.phoneNumber = action.payload;
		},
		setReqStockCustomerMessage(state, action: PayloadAction<string>) {
			state.message = action.payload;
		},
		resetReqStockState(state) {
			Object.assign(state, initialState);
		},
	},
});

export const selectReqStockCustomerName = (state: {
	requeststockform: RequestStockFormState;
}) => state.requeststockform.fullName;

export const selectReqStockNumber = (state: {
	requeststockform: RequestStockFormState;
}) => state.requeststockform.phoneNumber;

export const selectReqStockMessage = (state: {
	requeststockform: RequestStockFormState;
}) => state.requeststockform.message;

export const {
	setReqStockCustomerName,
	setReqStockCustomerPhoneNumber,
	setReqStockCustomerMessage,
	resetReqStockState,
} = requestStockSlice.actions;

export default requestStockSlice.reducer;
