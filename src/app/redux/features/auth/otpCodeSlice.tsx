import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserRegisterOtpState {
	otpDigit: {
		codeOne: string | null;
		codeTwo: string | null;
		codeThree: string | null;
		codeFour: string | null;
	};
	otpDuration: string | null;
}

const initialState: UserRegisterOtpState = {
	otpDigit: {
		codeOne: null,
		codeTwo: null,
		codeThree: null,
		codeFour: null,
	},
	otpDuration: null,
};

const otpCodeSlice = createSlice({
	name: "userotp",
	initialState,
	reducers: {
		setOtpOne(state, action: PayloadAction<string | null>) {
			state.otpDigit.codeOne = action.payload;
		},
		setOtpTwo(state, action: PayloadAction<string | null>) {
			state.otpDigit.codeTwo = action.payload;
		},
		setOtpThree(state, action: PayloadAction<string | null>) {
			state.otpDigit.codeThree = action.payload;
		},
		setOtpFour(state, action: PayloadAction<string | null>) {
			state.otpDigit.codeFour = action.payload;
		},
		setOtpDuration(state, action: PayloadAction<string | null>) {
			state.otpDuration = action.payload;
		},
	},
});

export const selectOtpOne = (state: { userotp: UserRegisterOtpState }) => {
	return state.userotp.otpDigit.codeOne;
};
export const selectOtpTwo = (state: { userotp: UserRegisterOtpState }) => {
	return state.userotp.otpDigit.codeTwo;
};
export const selectOtpThree = (state: { userotp: UserRegisterOtpState }) => {
	return state.userotp.otpDigit.codeThree;
};
export const selectOtpFour = (state: { userotp: UserRegisterOtpState }) => {
	return state.userotp.otpDigit.codeFour;
};
export const selectOtpDuration = (state: { userotp: UserRegisterOtpState }) => {
	return state.userotp.otpDuration;
};

export const { setOtpOne, setOtpTwo, setOtpThree, setOtpFour, setOtpDuration } =
	otpCodeSlice.actions;

export default otpCodeSlice.reducer;
