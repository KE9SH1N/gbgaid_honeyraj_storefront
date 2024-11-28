import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface contactUsFormState {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	message: string;
}

const initialState: contactUsFormState = {
	firstName: "",
	lastName: "",
	email: "",
	phoneNumber: "",
	message: "",
};

const contactUsSlice = createSlice({
	name: "contactusform",
	initialState,
	reducers: {
		setContactUsFirstName(state, action: PayloadAction<string>) {
			state.firstName = action.payload;
		},
		setContactUsLastName(state, action: PayloadAction<string>) {
			state.lastName = action.payload;
		},
		setContactUsEmail(state, action: PayloadAction<string>) {
			state.email = action.payload;
		},
		setContactUsPhoneNumber(state, action: PayloadAction<string>) {
			state.phoneNumber = action.payload;
		},
		setContactUsMessage(state, action: PayloadAction<string>) {
			state.message = action.payload;
		},
		resetContactUsState(state) {
			Object.assign(state, initialState);
		},
	},
});

export const selectContactUsFirstName = (state: {
	contactusform: contactUsFormState;
}) => state.contactusform.firstName;

export const selectContactUsLastName = (state: {
	contactusform: contactUsFormState;
}) => state.contactusform.lastName;

export const selectContactUsEmail = (state: {
	contactusform: contactUsFormState;
}) => state.contactusform.email;

export const selectContactUsPhoneNumber = (state: {
	contactusform: contactUsFormState;
}) => state.contactusform.phoneNumber;

export const selectContactUsMessage = (state: {
	contactusform: contactUsFormState;
}) => state.contactusform.message;

export const {
	setContactUsFirstName,
	setContactUsLastName,
	setContactUsEmail,
	setContactUsPhoneNumber,
	setContactUsMessage,
	resetContactUsState,
} = contactUsSlice.actions;

export default contactUsSlice.reducer;
