import { fetchDistrictData } from "@/app/api/locationApiService";
import { districtInfo } from "@/app/types/districtDataType";
import { createSlice } from "@reduxjs/toolkit";

interface districtDataState {
	districtData: districtInfo[];
	loading: boolean;
	error: string | null;
}

const initialState: districtDataState = {
	districtData: [],
	loading: false,
	error: null,
};

const districtDataSlice = createSlice({
	name: "district",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDistrictData.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchDistrictData.fulfilled, (state, action) => {
				state.loading = false;
				state.districtData = action.payload;
				state.error = null;
			})
			.addCase(fetchDistrictData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "An error occurred.";
			});
	},
});

export const selectDistrictData = (state: { district: districtDataState }) =>
	state.district.districtData;

export default districtDataSlice.reducer;
