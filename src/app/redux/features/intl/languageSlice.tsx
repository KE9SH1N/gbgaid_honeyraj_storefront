import { defaultLocale } from "@/i18n/config";
import { createSlice } from "@reduxjs/toolkit";

interface LanguageState {
	selectedLanguage: string;
}
const initialState: LanguageState = {
	selectedLanguage: defaultLocale,
};

const languageSlice = createSlice({
	name: "language",
	initialState,
	reducers: {
		setLanguage: (state, action) => {
			state.selectedLanguage = action.payload;
		},
	},
});

export const languageSelector = (state: { language: LanguageState }) =>
	state.language.selectedLanguage;

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
