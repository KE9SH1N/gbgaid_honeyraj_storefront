import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsResidentState {
	activeResident: string;
}

const initialState: IsResidentState = {
	activeResident: "inBangladesh",
};

const ResidentSlice = createSlice({
	name: "checkoutresidenttab",
	initialState,
	reducers: {
		setActiveResident(state, action) {
			state.activeResident = action.payload;
		},
		resetIsResidentState(state) {
			Object.assign(state, initialState);
		},
	},
});

export const activeResident = (state: {
	checkoutresidenttab: IsResidentState;
}) => state.checkoutresidenttab.activeResident;

export const { setActiveResident, resetIsResidentState } =
	ResidentSlice.actions;
export default ResidentSlice.reducer;
