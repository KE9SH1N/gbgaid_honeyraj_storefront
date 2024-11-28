import { fetchAllData } from "@/app/api/productsApiService";
import { Product } from "@/app/types/productType";
import { createSlice } from "@reduxjs/toolkit";

interface DataState {
	data: Product[];
	loading: boolean;
	error: string | null;
	page: number;
	totalPages: number;
}

const initialState: DataState = {
	data: [],
	loading: false,
	error: null,
	page: 1,
	totalPages: 0,
};

const allDataSlice = createSlice({
	name: "alldata",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			// For all data
			.addCase(fetchAllData.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
				state.error = null;
			})
			.addCase(fetchAllData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "An error occurred.";
			});
	},
});

export const selectAllProducts = (state: { alldata: DataState }) =>
	state.alldata.data;

export default allDataSlice.reducer;
