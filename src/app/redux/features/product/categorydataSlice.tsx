import { fetchCategoryData } from "@/app/api/productsApiService";
import { category } from "@/app/types/categoryType";
import { createSlice } from "@reduxjs/toolkit";

interface categorydataState {
	categoryData: category[];
	loading: boolean;
	error: string | null;
}

const initialState: categorydataState = {
	categoryData: [],
	loading: false,
	error: null,
};

const categorydataSlice = createSlice({
	name: "categorydata",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategoryData.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCategoryData.fulfilled, (state, action) => {
				state.loading = false;
				state.categoryData = action.payload;
				state.error = null;
			})
			.addCase(fetchCategoryData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "An error occurred.";
			});
	},
});

export const selectCategories = (state: { categorydata: categorydataState }) =>
	state.categorydata.categoryData;

export const selectCategoriesLoader = (state: {
	categorydata: categorydataState;
}) => state.categorydata.loading;

export default categorydataSlice.reducer;
