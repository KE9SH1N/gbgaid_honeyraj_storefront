import { Product } from "@/app/types/productType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
	product: Product | null;
	loading: boolean;
	error: string | null;
}

const initialState: ProductState = {
	product: null,
	loading: true,
	error: null,
};

export const productdetailsSlice = createSlice({
	name: "productdetails",
	initialState,
	reducers: {
		getProductStart(state) {
			state.loading = false;
			state.error = null;
		},
		getProductSuccess(state, action: PayloadAction<Product>) {
			state.loading = false;
			state.product = action.payload;
		},
		getProductFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		setProductData(state, action: PayloadAction<Product>) {
			state.product = action.payload;
		},
	},
});

export const selectProductDetailsData = (state: any) =>
	state.productdetails?.product;

export const selectProductDetailsLoading = (state: {
	productdetails: ProductState;
}) => state.productdetails?.loading;

export const selectHealthBenifits = (state: { productdetails: ProductState }) =>
	state?.productdetails?.product?.health_benefits;

export const {
	getProductStart,
	getProductSuccess,
	getProductFailure,
	setProductData,
} = productdetailsSlice.actions;
export default productdetailsSlice.reducer;
