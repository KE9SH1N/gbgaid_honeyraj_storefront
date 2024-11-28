import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface sidebarState {
	isMenuOpen: boolean;
}

const initialState: sidebarState = {
	isMenuOpen: false,
};

const sidebarSlice = createSlice({
	name: "sidebar",
	initialState,
	reducers: {
		toggleSidebar(state) {
			state.isMenuOpen = !state.isMenuOpen;
		},

		closeSidebar(state) {
			state.isMenuOpen = false;
		},
	},
});

export const sidebarOpen = (state: { sidebar: sidebarState }) =>
	state.sidebar.isMenuOpen;

export const { toggleSidebar, closeSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
