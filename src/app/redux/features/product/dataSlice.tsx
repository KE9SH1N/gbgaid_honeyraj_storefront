import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../../api/productsApiService";
import { Product } from "../../../types/productType";

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

const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			// For page wise data
			.addCase(fetchData.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.page === 1) {
					state.data = action.payload.data;
				} else {
					state.data = [...state.data, ...action.payload.data];
				}
				state.page = action.payload.page;
				state.totalPages = action.payload.totalPages;
			})
			// For all data
			// .addCase(fetchData.fulfilled, (state, action) => {
			// 	state.loading = false;
			// 	state.data = action.payload;
			// 	state.error = null;
			// })
			.addCase(fetchData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "An error occurred.";
			});
	},
});

export const selectProducts = (state: { data: DataState }) => state.data.data;
export const selectLoading = (state: { data: DataState }) => state.data.loading;
export const selectError = (state: { data: DataState }) => state.data.error;
export const selectPage = (state: { data: DataState }) => state.data.page;
export const selectTotalPages = (state: { data: DataState }) =>
	state.data.totalPages;

export default dataSlice.reducer;
