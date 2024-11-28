import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface userCreateAccountFormState {
	userCreateAccountName: string | null;
	userCreateAccountPhoneNumber: string | null;
	userCreateAccountPassword: string | null;
	userCreateAccountConfirmPassword: string | null;
}

const initialState: userCreateAccountFormState = {
	userCreateAccountName: null,
	userCreateAccountPhoneNumber: null,
	userCreateAccountPassword: null,
	userCreateAccountConfirmPassword: null,
};

const userCreateAccountSlice = createSlice({
	name: "usercreateaccountform",
	initialState,
	reducers: {
		setUserCreateAccountName(state, action: PayloadAction<string | null>) {
			state.userCreateAccountName = action.payload;
		},
		setUserCreateAccountPhoneNumber(
			state,
			action: PayloadAction<string | null>
		) {
			state.userCreateAccountPhoneNumber = action.payload;
		},
		setUserCreateAccountPassword(state, action: PayloadAction<string | null>) {
			state.userCreateAccountPassword = action.payload;
		},
		setUserCreateAccountConfirmPassword(
			state,
			action: PayloadAction<string | null>
		) {
			state.userCreateAccountConfirmPassword = action.payload;
		},

		resetUserCreateAccountFormState(state) {
			Object.assign(state, initialState);
		},
	},
});

// Selector function to retrieve the checkout form state
export const selectUserCreateAccountForm = (state: {
	usercreateaccountform: userCreateAccountFormState;
}) => state.usercreateaccountform;

export const {
	setUserCreateAccountName,
	setUserCreateAccountPhoneNumber,
	setUserCreateAccountPassword,
	setUserCreateAccountConfirmPassword,
	resetUserCreateAccountFormState,
} = userCreateAccountSlice.actions;
export default userCreateAccountSlice.reducer;
