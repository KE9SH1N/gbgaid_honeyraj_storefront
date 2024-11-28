import { createSlice } from "@reduxjs/toolkit";
import { fetchDivisionData } from "../../../api/locationApiService";
import { Location } from "../../../types/locationType";

interface locationDataState {
	locationData: Location[];
	loading: boolean;
	error: string | null;
}

const initialState: locationDataState = {
	locationData: [],
	loading: false,
	error: null,
};

const locationDataSlice = createSlice({
	name: "location",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDivisionData.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchDivisionData.fulfilled, (state, action) => {
				state.loading = false;
				state.locationData = action.payload;
				state.error = null;
			})
			.addCase(fetchDivisionData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "An error occurred.";
			});
	},
});

export const selectLocationData = (state: { location: locationDataState }) =>
	state.location.locationData;

export default locationDataSlice.reducer;
