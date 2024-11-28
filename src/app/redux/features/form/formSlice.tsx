import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface checkoutFormState {
	billerName: string | null;
	billerPhoneNumber: string | null;
	billerAdditionalPhoneNumber: string | null;
	billerDivision: { id: number; nameBn: string | null; nameEn: string | null };
	billerDistrict: { id: number; nameBn: string | null; nameEn: string | null };
	billerThana: { id: number; nameBn: string | null; nameEn: string | null };
	billerHomeAddress: string | null;
	shippingName: string | null;
	shippingPhoneNumber: string | null;
	shippingAdditionalPhoneNumber: string | null;
	shippingDivision: {
		id: number;
		nameBn: string | null;
		nameEn: string | null;
	};
	shippingDistrict: {
		id: number;
		nameBn: string | null;
		nameEn: string | null;
	};
	shippingThana: { id: number; nameBn: string | null; nameEn: string | null };
	shippingHomeAddress: string | null;

	// nonResidentName: string;
	nonResidentWhatsAppNumber: string | null;
	nonResidentRelationShip: string | null;

	isGift: boolean;
	isSameAsBillingAddressCheck: boolean;
}

const initialState: checkoutFormState = {
	billerName: null,
	billerPhoneNumber: null,
	billerAdditionalPhoneNumber: null,
	billerDivision: { id: 0, nameBn: null, nameEn: null },
	billerDistrict: { id: 0, nameBn: null, nameEn: null },
	billerThana: { id: 0, nameBn: null, nameEn: null },
	billerHomeAddress: null,
	shippingName: null,
	shippingPhoneNumber: null,
	shippingAdditionalPhoneNumber: null,
	shippingDivision: { id: 0, nameBn: null, nameEn: null },
	shippingDistrict: { id: 0, nameBn: null, nameEn: null },
	shippingThana: { id: 0, nameBn: null, nameEn: null },
	shippingHomeAddress: null,

	// nonResidentName: "",
	nonResidentWhatsAppNumber: null,
	nonResidentRelationShip: null,

	isSameAsBillingAddressCheck: false,
	isGift: false,
};

const formSlice = createSlice({
	name: "checkoutForm",
	initialState,
	reducers: {
		setBillerName(state, action: PayloadAction<string | null>) {
			state.billerName = action.payload;
		},
		setBillerPhoneNumber(state, action: PayloadAction<string | null>) {
			state.billerPhoneNumber = action.payload;
		},

		resetBillerPhoneNumber(state) {
			state.billerPhoneNumber = null;
		},
		setBillerAdditionalPhoneNumber(
			state,
			action: PayloadAction<string | null>
		) {
			state.billerAdditionalPhoneNumber = action.payload;
		},
		resetBillerAdditionalPhoneNumber(state) {
			state.billerAdditionalPhoneNumber = null;
		},
		setBillerDivision(
			state,
			action: PayloadAction<{
				id: number;
				nameBn: string | null;
				nameEn: string | null;
			}>
		) {
			state.billerDivision = action.payload;
		},

		clearBillerDivision(
			state,
			action: PayloadAction<{
				id: number;
				nameBn: string | null;
				nameEn: string | null;
			}>
		) {
			state.billerDivision = { id: 0, nameBn: null, nameEn: null };
		},

		setBillerDistrict(
			state,
			action: PayloadAction<{
				id: number;
				nameBn: string | null;
				nameEn: string | null;
			}>
		) {
			state.billerDistrict = action.payload;
		},

		clearBillerDistrict(
			state,
			action: PayloadAction<{
				id: number;
				nameBn: string | null;
				nameEn: string | null;
			}>
		) {
			state.billerDistrict = { id: 0, nameBn: null, nameEn: null };
		},

		setBillerThana(
			state,
			action: PayloadAction<{
				id: number;
				nameBn: string | null;
				nameEn: string | null;
			}>
		) {
			state.billerThana = action.payload;
		},
		clearBillerThana(
			state,
			action: PayloadAction<{
				id: string | null;
				nameBn: string | null;
				nameEn: string | null;
			}>
		) {
			state.billerThana = { id: 0, nameBn: null, nameEn: null };
		},
		setBillerHomeAddress(state, action: PayloadAction<string | null>) {
			state.billerHomeAddress = action.payload;
		},

		resetBillerHomeAddress(state) {
			state.billerHomeAddress = null;
		},

		setShippingName(state, action: PayloadAction<string | null>) {
			state.shippingName = action.payload;
		},
		setShippingPhoneNumber(state, action: PayloadAction<string | null>) {
			state.shippingPhoneNumber = action.payload;
		},

		resetShippingPhoneNumber(state) {
			state.shippingPhoneNumber = null;
		},

		setShippingAdditionalPhoneNumber(
			state,
			action: PayloadAction<string | null>
		) {
			state.shippingAdditionalPhoneNumber = action.payload;
		},
		resetShippingAdditionalPhoneNumber(state) {
			state.shippingAdditionalPhoneNumber = null;
		},
		setShippingDivision(
			state,
			action: PayloadAction<{
				id: number;
				nameBn: string | null;
				nameEn: string | null;
			}>
		) {
			state.shippingDivision = action.payload;
		},

		clearShippingDivision(
			state,
			action: PayloadAction<{
				id: number;
				nameBn: string | null;
				nameEn: string | null;
			}>
		) {
			state.shippingDivision = { id: 0, nameBn: null, nameEn: null };
		},

		setShippingDistrict(
			state,
			action: PayloadAction<{
				id: number;
				nameBn: string | null;
				nameEn: string | null;
			}>
		) {
			state.shippingDistrict = action.payload;
		},
		clearShippingDistrict(
			state,
			action: PayloadAction<{
				id: number;
				nameBn: string | null;
				nameEn: string | null;
			}>
		) {
			state.shippingDistrict = { id: 0, nameBn: null, nameEn: null };
		},

		setShippingThana(
			state,
			action: PayloadAction<{
				id: number;
				nameBn: string | null;
				nameEn: string | null;
			}>
		) {
			state.shippingThana = action.payload;
		},

		clearShippingThana(
			state,
			action: PayloadAction<{
				id: number;
				nameBn: string | null;
				nameEn: string | null;
			}>
		) {
			state.shippingThana = { id: 0, nameBn: null, nameEn: null };
		},

		setShippingHomeAddress(state, action: PayloadAction<string | null>) {
			state.shippingHomeAddress = action.payload;
		},

		toggleGift(state) {
			state.isGift = !state.isGift;
		},

		closeGift(state) {
			state.isGift = false;
		},

		toggleSameAsBillingAddressCheck(state) {
			state.isSameAsBillingAddressCheck = !state.isSameAsBillingAddressCheck;
		},

		setBillingAddressCheck(state, action: PayloadAction<boolean>) {
			state.isSameAsBillingAddressCheck = action.payload;
		},
		setNonResidentWhatsAppNumber(state, action: PayloadAction<string | null>) {
			state.nonResidentWhatsAppNumber = action.payload;
		},

		resetNonResidentWhatsAppNumber(state) {
			state.nonResidentWhatsAppNumber = null;
		},

		setNonResidentRelationShip(state, action: PayloadAction<string | null>) {
			state.nonResidentRelationShip = action.payload;
		},

		setCheckoutForm: (state, action: PayloadAction<checkoutFormState>) => {
			return action.payload;
		},

		resetFormState(state) {
			Object.assign(state, initialState);
		},
	},
});

// Selector function to retrieve the checkout form state
export const selectCheckoutForm = (state: {
	checkoutForm: checkoutFormState;
}) => state.checkoutForm;

export const selectBillerName = (state: { checkoutForm: checkoutFormState }) =>
	state.checkoutForm.billerName;

export const selectBillerPhoneNumber = (state: {
	checkoutForm: checkoutFormState;
}) => state.checkoutForm.billerPhoneNumber;

export const selectBillerAdditionalPhoneNumber = (state: {
	checkoutForm: checkoutFormState;
}) => state.checkoutForm.billerAdditionalPhoneNumber;

export const selectBillerDivision = (state: {
	checkoutForm: checkoutFormState;
}) => state.checkoutForm.billerDivision;

export const selectBillerDistrict = (state: {
	checkoutForm: checkoutFormState;
}) => state.checkoutForm.billerDistrict;

export const selectBillerThana = (state: { checkoutForm: checkoutFormState }) =>
	state.checkoutForm.billerThana;

export const selectBillerHomeAddress = (state: {
	checkoutForm: checkoutFormState;
}) => state.checkoutForm.billerHomeAddress;

export const selectBillingAddressCheck = (state: {
	checkoutForm: checkoutFormState;
}) => state.checkoutForm.isSameAsBillingAddressCheck;

export const selectShippingName = (state: {
	checkoutForm: checkoutFormState;
}) => state.checkoutForm.shippingName;

export const selectShippingPhoneNumber = (state: {
	checkoutForm: checkoutFormState;
}) => state.checkoutForm.shippingPhoneNumber;

export const selectShippingAdditionalPhoneNumber = (state: {
	checkoutForm: checkoutFormState;
}) => state.checkoutForm.shippingAdditionalPhoneNumber;

export const selectShippingDivision = (state: {
	checkoutForm: checkoutFormState;
}) => state.checkoutForm.shippingDivision;

export const selectShippingDistrict = (state: {
	checkoutForm: checkoutFormState;
}) => state.checkoutForm.shippingDistrict;

export const selectShippingThana = (state: {
	checkoutForm: checkoutFormState;
}) => state.checkoutForm.shippingThana;

export const selectShippingHomeAddress = (state: {
	checkoutForm: checkoutFormState;
}) => state.checkoutForm.shippingHomeAddress;

export const selectNonResidentWhatsAppNumber = (state: {
	checkoutForm: checkoutFormState;
}) => state.checkoutForm.nonResidentWhatsAppNumber;

export const selectNonResidentRelationShip = (state: {
	checkoutForm: checkoutFormState;
}) => state.checkoutForm.nonResidentRelationShip;

export const selectGift = (state: { checkoutForm: checkoutFormState }) =>
	state.checkoutForm.isGift;

export const {
	setBillerName,
	setBillerPhoneNumber,
	setBillerAdditionalPhoneNumber,
	setBillerDivision,
	clearBillerDivision,
	setBillerDistrict,
	clearBillerDistrict,
	setBillerThana,
	clearBillerThana,
	setBillerHomeAddress,
	resetBillerHomeAddress,
	setShippingName,
	setShippingPhoneNumber,
	setShippingAdditionalPhoneNumber,
	setShippingDivision,
	clearShippingDivision,
	setShippingDistrict,
	clearShippingDistrict,
	setShippingThana,
	clearShippingThana,
	setShippingHomeAddress,
	setNonResidentWhatsAppNumber,
	setNonResidentRelationShip,
	toggleGift,
	closeGift,
	toggleSameAsBillingAddressCheck,
	setBillingAddressCheck,
	setCheckoutForm,
	resetFormState,
	resetBillerPhoneNumber,
	resetShippingPhoneNumber,
	resetBillerAdditionalPhoneNumber,
	resetShippingAdditionalPhoneNumber,
	resetNonResidentWhatsAppNumber,
} = formSlice.actions;
export default formSlice.reducer;
