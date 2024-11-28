import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface userPinResetState {
	userCurrentPin: string | null;
	userNewPin: string | null;
	userConfirmNewPin: string | null;
	userCurrentPinErrorMesg: string | null;
	userCurrentPinSuccessMesg: string | null;
	userNewPinSuccessMesg: string | null;
	userNewPinErrorMesg: string | null;
	confirmPinSuccessMesg: string | null;
	confirmPinErrorMesg: string | null;
}

const initialState: userPinResetState = {
	userCurrentPin: null,
	userNewPin: null,
	userConfirmNewPin: null,
	userCurrentPinErrorMesg: null,
	userCurrentPinSuccessMesg: null,
	userNewPinErrorMesg: null,
	userNewPinSuccessMesg: null,
	confirmPinSuccessMesg: null,
	confirmPinErrorMesg: null,
};

const userProfileSlice = createSlice({
	name: "userpinreset",
	initialState,
	reducers: {
		setCurrentPin(state, action: PayloadAction<string | null>) {
			state.userCurrentPin = action.payload;
		},
		setNewPin(state, action: PayloadAction<string | null>) {
			state.userNewPin = action.payload;
		},
		setConfirmNewPin(state, action: PayloadAction<string | null>) {
			state.userConfirmNewPin = action.payload;
		},

		setCurrentPinSuccessMesg(state, action: PayloadAction<string | null>) {
			state.userCurrentPinSuccessMesg = action.payload;
		},
		setCurrentPinErrorMesg(state, action: PayloadAction<string | null>) {
			state.userCurrentPinErrorMesg = action.payload;
		},

		setNewPinErrorMesg(state, action: PayloadAction<string | null>) {
			state.userNewPinErrorMesg = action.payload;
		},
		setNewPinSuccessMesg(state, action: PayloadAction<string | null>) {
			state.userNewPinSuccessMesg = action.payload;
		},
		setConfirmPinSuccessMesg(state, action: PayloadAction<string | null>) {
			state.confirmPinSuccessMesg = action.payload;
		},
		setConfirmPinErrorMesg(state, action: PayloadAction<string | null>) {
			state.confirmPinErrorMesg = action.payload;
		},

		resetPinResetState(state) {
			Object.assign(state, initialState);
		},
	},
});

// Selector function to retrieve the checkout form state

export const selectCurrentPin = (state: { userpinreset: userPinResetState }) =>
	state.userpinreset.userCurrentPin;
export const selectNewPin = (state: { userpinreset: userPinResetState }) =>
	state.userpinreset.userNewPin;
export const selectConfirmNewPin = (state: {
	userpinreset: userPinResetState;
}) => state.userpinreset.userConfirmNewPin;

export const selectCurrentPinErrorMesg = (state: {
	userpinreset: userPinResetState;
}) => state.userpinreset.userCurrentPinErrorMesg;

export const selectCurrentPinSuccessMesg = (state: {
	userpinreset: userPinResetState;
}) => state.userpinreset.userCurrentPinSuccessMesg;

export const selectNewPinErrorMesg = (state: {
	userpinreset: userPinResetState;
}) => state.userpinreset.userNewPinErrorMesg;
export const selectNewPinSuccessMesg = (state: {
	userpinreset: userPinResetState;
}) => state.userpinreset.userNewPinSuccessMesg;
export const selectConfirmPinErrorMesg = (state: {
	userpinreset: userPinResetState;
}) => state.userpinreset.confirmPinErrorMesg;
export const selectConfirmPinSuccessMesg = (state: {
	userpinreset: userPinResetState;
}) => state.userpinreset.confirmPinSuccessMesg;

export const {
	setCurrentPin,
	setNewPin,
	setConfirmNewPin,
	setCurrentPinSuccessMesg,
	setCurrentPinErrorMesg,
	setNewPinErrorMesg,
	setNewPinSuccessMesg,
	setConfirmPinSuccessMesg,
	setConfirmPinErrorMesg,
	resetPinResetState,
} = userProfileSlice.actions;
export default userProfileSlice.reducer;
