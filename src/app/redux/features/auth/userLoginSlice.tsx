import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface userLoginFormState {
	userLoginPhoneNumber: string | null;
	userLoginPassword: string | null;
}

const initialState: userLoginFormState = {
	userLoginPhoneNumber: null,
	userLoginPassword: null,
};

const userLoginSlice = createSlice({
	name: "userloginform",
	initialState,
	reducers: {
		setUserLoginPhoneNumber(state, action: PayloadAction<string | null>) {
			state.userLoginPhoneNumber = action.payload;
		},
		setUserLoginPassword(state, action: PayloadAction<string | null>) {
			state.userLoginPassword = action.payload;
		},

		resetUserLoginFormState(state) {
			Object.assign(state, initialState);
		},
	},
});

// Selector function to retrieve the checkout form state
export const selectUserLoginForm = (state: any) => state.userloginform;

export const {
	setUserLoginPhoneNumber,
	setUserLoginPassword,
	resetUserLoginFormState,
} = userLoginSlice.actions;
export default userLoginSlice.reducer;
