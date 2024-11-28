import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDashBoardState {
	activeUserDashboardTab: string | null;
	activeUserDashboardTabMobile: string | null;
}

const initialState: UserDashBoardState = {
	activeUserDashboardTab: "profile",
	activeUserDashboardTabMobile: null,
};

const UserDashboardSlice = createSlice({
	name: "userdashboardtab",
	initialState,
	reducers: {
		setActiveUserTab(state, action: PayloadAction<string | null>) {
			state.activeUserDashboardTab = action.payload;
		},
		setActiveUserTabMobile(state, action: PayloadAction<string | null>) {
			state.activeUserDashboardTabMobile = action.payload;
		},
		resetActiveUserTab(state) {
			Object.assign(state, initialState);
		},
	},
});

export const { setActiveUserTab, setActiveUserTabMobile, resetActiveUserTab } =
	UserDashboardSlice.actions;
export default UserDashboardSlice.reducer;
