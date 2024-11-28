import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userData } from "../../../types/userDataType";

interface UserDataState {
	userData: userData[];
	loading: boolean;
	error: string | null;
	statusCode: string | null;
}

const initialState: UserDataState = {
	userData: [],
	loading: true,
	error: null,
	statusCode: null,
};

export const userDetailsSlice = createSlice({
	name: "userdetails",
	initialState,
	reducers: {
		getProductStart(state) {
			state.loading = false;
			state.error = null;
		},
		getProductSuccess(state, action: PayloadAction<any>) {
			state.loading = false;
			state.userData = action.payload;
		},
		getProductFailure(
			state,
			action: PayloadAction<{ error: string; statusCode: string }>
		) {
			state.loading = false;
			state.error = action.payload.error;
			state.statusCode = action.payload.statusCode;
		},
		setUserData(state, action: PayloadAction<any>) {
			state.userData = action.payload;
		},
	},
});

export const selectUserDetailsData = (state: any) => state.userdetails.userData;
export const selectUserDetails = (state: any) => state.userdetails;
export const selectUserDetailsStatusCode = (state: any) =>
	state.userdetails.statusCode;

export const {
	getProductStart,
	getProductSuccess,
	getProductFailure,
	setUserData,
} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
