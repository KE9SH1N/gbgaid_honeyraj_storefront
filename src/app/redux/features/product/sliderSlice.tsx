import { fetchSliderData } from "@/app/api/productSliderApiService";
import { sliderItem } from "@/app/types/sliderType";
import { createSlice } from "@reduxjs/toolkit";

interface DataState {
	sliders: sliderItem[];
	loading: boolean;
	error: string | null;
}

const initialState: DataState = {
	sliders: [],
	loading: false,
	error: null,
};

const sliderSlice = createSlice({
	name: "sliderdata",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSliderData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchSliderData.fulfilled, (state: any, action) => {
				state.loading = false;
				state.sliders = action.payload;
				state.error = null;
			})
			.addCase(fetchSliderData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "An error occurred.";
			});
	},
});

export const selectAllSliders = (state: { sliderdata: DataState }) =>
	state.sliderdata.sliders;

export default sliderSlice.reducer;
