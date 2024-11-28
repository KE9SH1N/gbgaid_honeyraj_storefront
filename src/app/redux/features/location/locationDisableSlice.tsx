import { createSlice } from "@reduxjs/toolkit";

interface LocationDisableState {
	isDistrictDisabled: boolean;
	isThanaDisabled: boolean;
}
const initialState: LocationDisableState = {
	isDistrictDisabled: true,
	isThanaDisabled: true,
};

const locationDisableSlice = createSlice({
	name: "locationdisable",
	initialState,
	reducers: {
		// ... other reducers
		setDistrictDisabled(state, action) {
			state.isDistrictDisabled = action.payload;
		},
		setThanaDisabled(state, action) {
			state.isThanaDisabled = action.payload;
		},
	},
});

export const isDistrictDisabled = (state: {
	locationdisable: LocationDisableState;
}) => state.locationdisable.isDistrictDisabled;

export const isThanaDisabled = (state: {
	locationdisable: LocationDisableState;
}) => state.locationdisable.isThanaDisabled;

export const { setDistrictDisabled, setThanaDisabled } =
	locationDisableSlice.actions;
export default locationDisableSlice.reducer;
