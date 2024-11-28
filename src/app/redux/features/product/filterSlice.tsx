import { Product } from "@/app/types/productType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FilterState {
	inStockOnly: boolean;
	showAll: boolean;
	// selectedCategory: null | string;
	selectedCategories: number[];
	products: Product[];
	filteredProducts: Product[];
	minPrice: number;
	maxPrice: number;
}

const initialState: FilterState = {
	inStockOnly: false,
	showAll: true,
	// selectedCategory: null,
	selectedCategories: [],
	products: [],
	filteredProducts: [],
	minPrice: 0,
	maxPrice: 10000,
};

export const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		toggleInStockOnly: (state) => {
			state.inStockOnly = !state.inStockOnly;
		},
		toggleShowAll: (state) => {
			state.showAll = !state.showAll;
		},

		// For single category selection
		// toggleCategory: (state, action) => {
		// 	const { category } = action.payload;
		// 	// Toggle the selected category
		// 	if (state.selectedCategory === category) {
		// 		state.selectedCategory = null;
		// 	} else {
		// 		state.selectedCategory = category;
		// 	}
		// },
		toggleCategory: (state, action: PayloadAction<{ CatId: number }>) => {
			const { CatId } = action.payload;
			const index = state.selectedCategories.indexOf(CatId);
			const updatedCategories = [...state.selectedCategories];
			if (index !== -1) {
				updatedCategories.splice(index, 1);
			} else {
				updatedCategories.push(CatId);
			}

			state.selectedCategories = updatedCategories;
		},

		setProducts(state, action: PayloadAction<Product[]>) {
			state.products = action.payload;
			// Also update filteredProducts initially with all products
			state.filteredProducts = action.payload;
		},
		setFilteredProducts(state, action: PayloadAction<Product[]>) {
			state.filteredProducts = action.payload;
		},

		setMinPrice: (state, action: PayloadAction<number>) => {
			state.minPrice = action.payload;
		},
		setMaxPrice: (state, action: PayloadAction<number>) => {
			state.maxPrice = action.payload;
		},
		resetFilterState(state) {
			Object.assign(state, initialState);
		},
	},
});

export const selectFilter = (state: { filter: FilterState }) => state.filter;
export const selectFilteredProducts = (state: { filter: FilterState }) =>
	state.filter.filteredProducts;
export const selectStockOnly = (state: { filter: FilterState }) =>
	state.filter.inStockOnly;

export const selectMinPrice = (state: { filter: FilterState }) =>
	state.filter.minPrice;
export const selectMaxPrice = (state: { filter: FilterState }) =>
	state.filter.maxPrice;

export const selectShowAll = (state: { filter: FilterState }) =>
	state.filter.showAll;

export const {
	toggleInStockOnly,
	toggleShowAll,
	toggleCategory,
	setProducts,
	setFilteredProducts,
	setMinPrice,
	setMaxPrice,
	resetFilterState,
} = filterSlice.actions;

export default filterSlice.reducer;
