"use client";
import { useTranslations } from "next-intl";
import {
	clearShippingDistrict,
	clearShippingDivision,
	clearShippingThana,
	selectBillerAdditionalPhoneNumber,
	selectBillerDistrict,
	selectBillerDivision,
	selectBillerHomeAddress,
	selectBillerName,
	selectBillerPhoneNumber,
	selectBillerThana,
	selectBillingAddressCheck,
	setShippingAdditionalPhoneNumber,
	setShippingDistrict,
	setShippingDivision,
	setShippingHomeAddress,
	setShippingName,
	setShippingPhoneNumber,
	setShippingThana,
	toggleSameAsBillingAddressCheck,
} from "../../redux/features/form/formSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeResident } from "../../redux/features/checkout/residentSlice";

const ShippingAdressHeading = () => {
	const dispatch = useDispatch();
	const activeTab = useSelector(activeResident);

	//Checkout Biller info selector from rtk
	const billerName = useSelector(selectBillerName);
	const billerPhoneNumber = useSelector(selectBillerPhoneNumber);
	const billerAdditionalPhoneNumber = useSelector(
		selectBillerAdditionalPhoneNumber
	);
	const billerDivision = useSelector(selectBillerDivision);
	const billerDistrict = useSelector(selectBillerDistrict);
	const billerThana = useSelector(selectBillerThana);
	const billerHomeAddress = useSelector(selectBillerHomeAddress);
	const BillingAddressCheck = useSelector(selectBillingAddressCheck);

	const handleChekmark = () => {
		if (!BillingAddressCheck) {
			dispatch(setShippingName(billerName));
			dispatch(setShippingPhoneNumber(billerPhoneNumber));
			dispatch(setShippingAdditionalPhoneNumber(billerAdditionalPhoneNumber));
			dispatch(setShippingDivision(billerDivision));
			dispatch(setShippingDistrict(billerDistrict));
			dispatch(setShippingThana(billerThana));
			dispatch(setShippingHomeAddress(billerHomeAddress));
		} else {
			dispatch(setShippingName(""));
			dispatch(setShippingPhoneNumber(""));
			dispatch(setShippingAdditionalPhoneNumber(""));
			dispatch(clearShippingDivision({ id: 0, nameBn: "", nameEn: "" }));
			dispatch(clearShippingDistrict({ id: 0, nameBn: "", nameEn: "" }));
			dispatch(clearShippingThana({ id: 0, nameBn: "", nameEn: "" }));
			dispatch(setShippingHomeAddress(""));
		}
		dispatch(toggleSameAsBillingAddressCheck());
	};

	// For multi-language
	const t = useTranslations("checkout");

	return (
		<div>
			<div className=" capitalize ct-flex-between">
				<h3 className="font-semibold text-xl">
					{t("bangladeshi.shippingAddress.title")}
				</h3>
				{activeTab === "inBangladesh" ? (
					<label className="inline-flex items-center cursor-pointer">
						<input
							id="link-checkbox"
							type="checkbox"
							checked={BillingAddressCheck}
							className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
							onChange={handleChekmark}
						/>

						<span className="ml-2 capitalize text-[10px] sm:text-xs lg:text-sm">
							{t("bangladeshi.checkMark.sameAsBilling")}
						</span>
					</label>
				) : null}
			</div>
		</div>
	);
};

export default ShippingAdressHeading;
