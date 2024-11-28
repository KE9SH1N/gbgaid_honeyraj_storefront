import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface productDetailsTabState {
	activeDetailsTab: string;
}

const initialState: productDetailsTabState = {
	activeDetailsTab: "About",
};

const productDetailsTabsSlice = createSlice({
	name: "productdetailstab",
	initialState,
	reducers: {
		setActiveProductDetailsTab(state, action) {
			state.activeDetailsTab = action.payload;
		},
		resetProductDetailsTabState(state) {
			Object.assign(state, initialState);
		},
	},
});

export const selectActiveProductDetailsTab = (state: {
	productdetailstab: productDetailsTabState;
}) => state.productdetailstab.activeDetailsTab;

export const { setActiveProductDetailsTab, resetProductDetailsTabState } =
	productDetailsTabsSlice.actions;
export default productDetailsTabsSlice.reducer;
