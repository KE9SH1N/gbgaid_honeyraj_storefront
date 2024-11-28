import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MessageType = "success" | "failed" | "warning" | "info" | null;

interface ToasterState {
	isOpen: boolean;
	message: string | null;
	messageType?: MessageType;
}

const initialState: ToasterState = {
	isOpen: false,
	message: null,
	messageType: null,
};

export const toasterSlice = createSlice({
	name: "toaster",
	initialState,
	reducers: {
		setMessage: (
			state,
			action: PayloadAction<{ message: string | null; type?: MessageType }>
		) => {
			state.message = action.payload.message;
			state.messageType = action.payload.type || state.messageType;
		},
		setOpen: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
		closeToaster: (state) => {
			state.isOpen = false;
			state.message = null;
			state.messageType = null;
		},
	},
});

// Selector to access toaster state

export const isToasterOpen = (state: { toaster: ToasterState }) =>
	state.toaster.isOpen;
export const toasterMesg = (state: { toaster: ToasterState }) =>
	state.toaster.message;
export const toasterMesgType = (state: { toaster: ToasterState }) =>
	state.toaster.messageType;

// Export the actions
export const { setOpen, closeToaster, setMessage } = toasterSlice.actions;

// Export the reducer
export default toasterSlice.reducer;
