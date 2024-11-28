import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ForgetPasswordState {
	customerPhoneNumber: string | null;
}

const initialState: ForgetPasswordState = {
	customerPhoneNumber: null,
};

const forgetPassSlice = createSlice({
	name: "forgetpass",
	initialState,
	reducers: {
		setCustomerPhoneNumber(state, action: PayloadAction<string | null>) {
			state.customerPhoneNumber = action.payload;
		},
	},
});

export const selectCustomerPhoneNumber = (state: {
	forgetpass: ForgetPasswordState;
}) => {
	return state.forgetpass.customerPhoneNumber;
};

export const { setCustomerPhoneNumber } = forgetPassSlice.actions;

export default forgetPassSlice.reducer;
