import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { orderByUserData } from "@/app/types/orderByUserDataType";

interface OrderByUserDataState {
	orderByUserData: orderByUserData[];
	loading: boolean;
	error: string | null;
	pageNumber: number;
}

const initialState: OrderByUserDataState = {
	orderByUserData: [],
	loading: true,
	error: null,
	pageNumber: 1,
};

export const userDetailsSlice = createSlice({
	name: "orderbyuserdetails",
	initialState,
	reducers: {
		getOrderByUserDataStart(state) {
			state.loading = false;
			state.error = null;
		},
		getOrderByUserDataSuccess(state, action: PayloadAction<any>) {
			state.loading = false;
			state.orderByUserData = action.payload;
		},
		getOrderByUserDataFailure(state, action: PayloadAction<any>) {
			state.loading = false;
			state.error = action.payload;
		},
		setOrderByUserData(state, action: PayloadAction<any>) {
			state.orderByUserData = action.payload;
		},
		setOrderHistoryPageNumber(state, action: PayloadAction<number>) {
			state.pageNumber = action.payload;
		},
	},
});

export const selectOrderByUserDetailsData = (state: any) =>
	state.orderbyuserdetails.orderByUserData;

export const selectOrderByUserPageNumber = (state: any) =>
	state.orderbyuserdetails.pageNumber;

export const selectOrderByUserTotalPage = (state: any) =>
	state.orderbyuserdetails.orderByUserData.totalPages;

export const {
	getOrderByUserDataStart,
	getOrderByUserDataSuccess,
	getOrderByUserDataFailure,
	setOrderHistoryPageNumber,
	setOrderByUserData,
} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
