import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CountryCodeState {
	selectedCountry: string;
	countryImageUrl: string;
	countryPhoneCodeEn: string;
	countryPhoneCodeBn: string;
}
const initialCountryImageUrl = "https://flagpedia.net/data/flags/normal/sa.png";

const initialState: CountryCodeState = {
	selectedCountry: "Saudi Arabia",
	countryPhoneCodeEn: "+966",
	countryPhoneCodeBn: "+৯৬৬",
	countryImageUrl: initialCountryImageUrl,
};

const countryCodeSlice = createSlice({
	name: "countrycode",
	initialState,
	reducers: {
		setSelectedCountry: (state, action: PayloadAction<string>) => {
			state.selectedCountry = action.payload;
		},
		setCountryImageUrl: (state, action: PayloadAction<string>) => {
			state.countryImageUrl = action.payload;
		},
		setCountryPhoneCodeEn: (state, action: PayloadAction<string>) => {
			state.countryPhoneCodeEn = action.payload;
		},
		setCountryPhoneCodeBn: (state, action: PayloadAction<string>) => {
			state.countryPhoneCodeBn = action.payload;
		},
		resetCountryCodeState(state) {
			Object.assign(state, initialState);
		},
	},
});

export const selectSelectedCountryName = (state: {
	countrycode: CountryCodeState;
}) => state.countrycode.selectedCountry;
export const selectedCountryPhoneCodeEn = (state: {
	countrycode: CountryCodeState;
}) => state.countrycode.countryPhoneCodeEn;
export const selectedCountryPhoneCodeBn = (state: {
	countrycode: CountryCodeState;
}) => state.countrycode.countryPhoneCodeBn;
export const selectSelectedCountryFlag = (state: {
	countrycode: CountryCodeState;
}) => state.countrycode.countryImageUrl;

export const selectCountryCode = (state: { countrycode: CountryCodeState }) =>
	state.countrycode;

export const {
	setSelectedCountry,
	setCountryImageUrl,
	setCountryPhoneCodeEn,
	setCountryPhoneCodeBn,
	resetCountryCodeState,
} = countryCodeSlice.actions;

export default countryCodeSlice.reducer;
