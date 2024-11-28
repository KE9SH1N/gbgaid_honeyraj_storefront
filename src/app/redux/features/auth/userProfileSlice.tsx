import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface userProfileState {
	userFullName: string | null;
	userPhoneNumber: string | null;
	userAditionalPhoneNumber: string | null;
	userEmail: string | null;
	userDivision: {
		id: string | null;
		nameEn: string | null;
		nameBn: string | null;
	};
	userDistrict: {
		id: string | null;
		nameEn: string | null;
		nameBn: string | null;
	};
	userThana: {
		id: string | null;
		nameEn: string | null;
		nameBn: string | null;
	};
	userLocalAddress: string | null;
	userDp: File | null;
	userProfilePicUrl: string | null;
}

const initialState: userProfileState = {
	userFullName: null,
	userPhoneNumber: null,
	userAditionalPhoneNumber: null,
	userEmail: null,
	userDivision: { id: null, nameBn: null, nameEn: null },
	userDistrict: { id: null, nameBn: null, nameEn: null },
	userThana: { id: null, nameBn: null, nameEn: null },
	userLocalAddress: null,
	userDp: null,
	userProfilePicUrl: null,
};

const userProfileSlice = createSlice({
	name: "userprofile",
	initialState,
	reducers: {
		setUserFullName(state, action: PayloadAction<string | null>) {
			state.userFullName = action.payload;
		},
		setUserPhoneNumber(state, action: PayloadAction<string | null>) {
			state.userPhoneNumber = action.payload;
		},
		setUserAditionalPhoneNumber(state, action: PayloadAction<string | null>) {
			state.userAditionalPhoneNumber = action.payload;
		},
		setUserEmail(state, action: PayloadAction<string | null>) {
			state.userEmail = action.payload;
		},
		setUserDivision(
			state,
			action: PayloadAction<{
				id: string | null;
				nameBn: string | null;
				nameEn: string | null;
			}>
		) {
			state.userDivision = action.payload;
		},
		setUserDistrict(
			state,
			action: PayloadAction<{
				id: string | null;
				nameBn: string | null;
				nameEn: string | null;
			}>
		) {
			state.userDistrict = action.payload;
		},
		setUserThana(
			state,
			action: PayloadAction<{
				id: string | null;
				nameBn: string | null;
				nameEn: string | null;
			}>
		) {
			state.userThana = action.payload;
		},
		setUserLocalAddress(state, action: PayloadAction<string | null>) {
			state.userLocalAddress = action.payload;
		},

		setUserDp(state, action: PayloadAction<File | null>) {
			state.userDp = action.payload;
		},
		setUserProfileUrl(state, action: PayloadAction<string | null>) {
			state.userProfilePicUrl = action.payload;
		},

		resetUserProfileState(state) {
			Object.assign(state, initialState);
		},
	},
});

// Selector function to retrieve the checkout form state
export const selectUserProfile = (state: any) => state.userprofile;

export const selectUserFullName = (state: { userprofile: userProfileState }) =>
	state.userprofile.userFullName;
export const selectUserPhoneNumber = (state: {
	userprofile: userProfileState;
}) => state.userprofile.userPhoneNumber;
export const selectUserAditionalPhoneNumber = (state: {
	userprofile: userProfileState;
}) => state.userprofile.userAditionalPhoneNumber;
export const selectUserEmail = (state: { userprofile: userProfileState }) =>
	state.userprofile.userEmail;
export const selectUserDivision = (state: { userprofile: userProfileState }) =>
	state.userprofile.userDivision;
export const selectUserDistrict = (state: { userprofile: userProfileState }) =>
	state.userprofile.userDistrict;
export const selectUserThana = (state: { userprofile: userProfileState }) =>
	state.userprofile.userThana;
export const selectUserLocalAddress = (state: {
	userprofile: userProfileState;
}) => state.userprofile.userLocalAddress;

export const selectUserDp = (state: { userprofile: userProfileState }) =>
	state.userprofile.userDp;

export const {
	setUserFullName,
	setUserPhoneNumber,
	setUserAditionalPhoneNumber,
	setUserEmail,
	setUserDivision,
	setUserDistrict,
	setUserThana,
	setUserLocalAddress,
	setUserDp,
	setUserProfileUrl,
	resetUserProfileState,
} = userProfileSlice.actions;
export default userProfileSlice.reducer;
