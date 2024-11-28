import { fetchBestSellingProducts } from "@/app/api/bestSellingApiService";
import { Product } from "@/app/types/productType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data } from "react-facebook-pixel";

interface BestSellingProductsState {
	data: Product[];
	loading: boolean;
	error: string | null;
}

const initialState: BestSellingProductsState = {
	data: [],
	loading: false,
	error: null,
};

const allDataSlice = createSlice({
	name: "bestsellingproducts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBestSellingProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})

			.addCase(
				fetchBestSellingProducts.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.loading = false;
					state.data = action.payload.data.data;
					state.error = null;
				}
			)
			.addCase(fetchBestSellingProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "An error occurred.";
			});
	},
});

export const selectBestSellingProducts = (state: {
	bestsellingproducts: BestSellingProductsState;
}) => state.bestsellingproducts.data;

export default allDataSlice.reducer;
