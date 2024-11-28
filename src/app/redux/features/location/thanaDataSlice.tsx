import { fetchThanaData } from "@/app/api/locationApiService";
import { createSlice } from "@reduxjs/toolkit";

interface thanaDataState {
	thanaData: Location[];
	loading: boolean;
	error: string | null;
}

const initialState: thanaDataState = {
	thanaData: [],
	loading: false,
	error: null,
};

const thanaDataSlice = createSlice({
	name: "thana",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchThanaData.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchThanaData.fulfilled, (state, action) => {
				state.loading = false;
				state.thanaData = action.payload;
				state.error = null;
			})
			.addCase(fetchThanaData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "An error occurred.";
			});
	},
});

export const selectThanaData = (state: { thana: thanaDataState }) =>
	state.thana.thanaData;

export default thanaDataSlice.reducer;
