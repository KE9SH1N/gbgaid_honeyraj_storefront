"use client";
import React, { useState } from "react";
import AddressDropdown from "./AddressDropdown";
import ShippingAdressHeading from "./ShippingAdressHeading";
import { useDispatch, useSelector } from "react-redux";
import {
	clearShippingDistrict,
	clearShippingThana,
	selectGift,
	selectShippingAdditionalPhoneNumber,
	selectShippingDistrict,
	selectShippingDivision,
	selectShippingHomeAddress,
	selectShippingName,
	selectShippingPhoneNumber,
	selectShippingThana,
	setShippingAdditionalPhoneNumber,
	setShippingDistrict,
	setShippingDivision,
	setShippingHomeAddress,
	setShippingName,
	setShippingPhoneNumber,
	setShippingThana,
} from "../../redux/features/form/formSlice";
import { selectLocationData } from "../../redux/features/location/locationDataSlice";
import { selectDistrictData } from "../../redux/features/location/districtDataSlice";
import { useTranslations } from "next-intl";
import AddressSearchDropdown from "./AddressSearchDropdown";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { Location } from "../../types/locationType";
import { thanaDataInfo } from "../../types/thanaDataType";
import { districtInfo } from "../../types/districtDataType";
import { activeResident } from "../../redux/features/checkout/residentSlice";

const RecieverInfoForm = () => {
	const dispatch = useDispatch();
	const [phoneNumberInput, setPhoneNumberInput] = useState<string>("");
	const [additionalPhoneNumberInput, setadditionalPhoneNumberInput] =
		useState<string>("");
	const locationData = useSelector(selectLocationData);
	const districtData = useSelector(selectDistrictData);
	const isGift = useSelector(selectGift);
	const activeTab = useSelector(activeResident);

	// Conditional Css for phone number input field
	const phoneNumberInputBorderColor =
		phoneNumberInput.length === 0
			? "border-gray-300"
			: phoneNumberInput.length < 11
			? "border-gbInactiveColorLight"
			: "border-gbActiveColor";

	// Conditional Css for additional phone number input field
	const additionalPhoneNumberInputBorderColor =
		additionalPhoneNumberInput.length === 0
			? "border-gray-300"
			: additionalPhoneNumberInput.length < 11
			? "border-gbInactiveColorLight"
			: "border-gbActiveColor";

	const shippingName = useSelector(selectShippingName);
	const shippingPhoneNumber = useSelector(selectShippingPhoneNumber);
	const shippingAdditionalPhoneNumber = useSelector(
		selectShippingAdditionalPhoneNumber
	);
	const shippingDivision = useSelector(selectShippingDivision);
	const shippingDistrict = useSelector(selectShippingDistrict);
	const shippingThana = useSelector(selectShippingThana);
	const shippingHomeAddress = useSelector(selectShippingHomeAddress);
	const selectedLanguage = useSelector(languageSelector);

	const handleShippingName = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setShippingName(e.target.value));
	};

	const handleShippingPhoneNumber = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;
		if (/^[\d০১২৩৪৫৬৭৮৯]*$/.test(value) && value.length <= 11) {
			setPhoneNumberInput(value);
			dispatch(setShippingPhoneNumber(e.target.value));
		}
	};
	const handleShippingAdditionalPhoneNumber = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;
		if (/^[\d০১২৩৪৫৬৭৮৯]*$/.test(value) && value.length <= 11) {
			setadditionalPhoneNumberInput(value);
			dispatch(setShippingAdditionalPhoneNumber(e.target.value));
		}
	};

	const handleShippingHomeAddress = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		dispatch(setShippingHomeAddress(e.target.value));
	};

	const [district, setDistrict] = useState<districtInfo[]>([]);
	const [thana, setThana] = useState<thanaDataInfo[]>([]);

	// For multi-language
	const t = useTranslations("checkout");

	return (
		<div
			className={` ${
				isGift || activeTab === "nonResident"
					? `w-full ${
							activeTab === "nonResident" ? "" : "w-full lg:w-1/2"
					  } py-4 relative`
					: "hidden"
			}`}
		>
			<div>
				<ShippingAdressHeading />
			</div>
			<div className="relative w-full py-4">
				<form action="" className="grid grid-cols-1 gap-y-4 text-sm">
					<div className=" w-full ct-flex-start flex-col gap-y-2">
						<label htmlFor="rName" className=" capitalize text-xs">
							{t("bangladeshi.shippingAddress.name")}
						</label>
						<input
							name="rName"
							id="rName"
							type="text"
							value={shippingName ?? ""}
							onChange={handleShippingName}
							className="w-full bg-gbBgSecondaryWhite rounded px-3 py-2 border focus:border-black focus:outline-none placeholder: capitalize"
							placeholder={t("bangladeshi.shippingAddress.namePlaceholder")}
							title={t("bangladeshi.shippingAddress.shippingNameTitle")}
						/>
					</div>
					<div className="relative w-full ct-flex-start flex-col gap-y-2">
						<label htmlFor="rPhoneNumber" className=" capitalize text-xs">
							{t("bangladeshi.shippingAddress.phoneNumber")}
							<span className="text-red-500">*</span>
						</label>
						<input
							name="rPhoneNumber"
							id="rPhoneNumber"
							type="text"
							inputMode="numeric"
							value={shippingPhoneNumber ?? ""}
							onChange={handleShippingPhoneNumber}
							className={`w-full bg-gbBgSecondaryWhite pl-12 lg:pl-16 rounded px-3 py-2 border focus:outline-none placeholder: capitalize ${phoneNumberInputBorderColor}`}
							placeholder={t(
								"bangladeshi.shippingAddress.phoneNumberPlaceholder"
							)}
							title={t("bangladeshi.shippingAddress.shippingPhoneNumberTitle")}
						/>
						<span className=" absolute top-[54%] left-[2%]">
							{t("bangladeshi.shippingAddress.countryCode")}
						</span>
					</div>
					<div className="relative w-full ct-flex-start flex-col gap-y-2">
						<label
							htmlFor="cadditionalphoneNumber"
							className=" capitalize text-xs"
						>
							{t("bangladeshi.shippingAddress.additionalPhoneNumber")}
						</label>
						<input
							id="cadditionalphoneNumber"
							type="text"
							inputMode="numeric"
							value={shippingAdditionalPhoneNumber ?? ""}
							onChange={handleShippingAdditionalPhoneNumber}
							className={`w-full bg-gbBgSecondaryWhite pl-12 lg:pl-16 rounded px-3 py-2 border focus:outline-none placeholder: capitalize ${additionalPhoneNumberInputBorderColor}`}
							placeholder={t(
								"bangladeshi.shippingAddress.additionaPhoneNumberPlaceholder"
							)}
							title={t(
								"bangladeshi.shippingAddress.shippingAdditionalaPhoneNumberTitle"
							)}
						/>
						<span className=" absolute top-[54%] left-[2%]">
							{t("bangladeshi.shippingAddress.countryCode")}
						</span>
					</div>
					<div>
						<label htmlFor="rDeliveryAddress" className=" capitalize text-xs">
							{t("bangladeshi.shippingAddress.titleAddressField")}
						</label>
						<div>
							<div className="w-full ct-flex-between">
								<AddressDropdown
									dropdownText={t("bangladeshi.location.division")}
									selectedValue={
										selectedLanguage === "bn"
											? shippingDivision.nameBn
											: shippingDivision.nameEn
									}
									onChange={(value: number, nameBn: string, nameEn: string) => {
										dispatch(
											setShippingDivision({
												id: value,
												nameBn: nameBn,
												nameEn: nameEn,
											})
										);
										dispatch(
											clearShippingDistrict({ id: 0, nameBn: "", nameEn: "" })
										);
										dispatch(
											clearShippingThana({ id: 0, nameBn: "", nameEn: "" })
										);

										const divisionData = locationData.find(
											(item: Location) => item?.id === value
										);
										{
											divisionData?.district_info &&
												setDistrict(divisionData?.district_info);
										}
									}}
									locationData={locationData}
									dataType="location"
								/>

								<AddressDropdown
									dropdownText={t("bangladeshi.location.district")}
									selectedValue={
										selectedLanguage === "bn"
											? shippingDistrict.nameBn
											: shippingDistrict.nameEn
									}
									districtData={district}
									dataType="district"
									disabled={
										!shippingDivision.nameBn && !shippingDivision.nameEn
									}
									onChange={(value: number, nameBn: string, nameEn: string) => {
										dispatch(
											setShippingDistrict({
												id: value,
												nameBn: nameBn,
												nameEn: nameEn,
											})
										);
										dispatch(
											clearShippingThana({ id: 0, nameBn: "", nameEn: "" })
										);
										const districtDataInfo = districtData.find(
											(item: thanaDataInfo) => item?.id === value
										);

										{
											districtDataInfo?.thana_info &&
												setThana(districtDataInfo?.thana_info);
										}
									}}
								/>
							</div>
							<div>
								<AddressSearchDropdown
									dropdownText={t("bangladeshi.location.thana")}
									selectedValue={
										selectedLanguage === "bn"
											? shippingThana.nameBn
											: shippingThana.nameEn
									}
									onChange={(value: number, nameBn: string, nameEn: string) =>
										dispatch(
											setShippingThana({
												id: value,
												nameBn: nameBn,
												nameEn: nameEn,
											})
										)
									}
									locationData={thana}
									disabled={
										!shippingDistrict.nameBn && !shippingDistrict.nameEn
									}
								/>
							</div>
						</div>
					</div>

					<div className="relative w-full ct-flex-start flex-col gap-y-2">
						<textarea
							id="rDeliveryAddress"
							className="resize-none w-full bg-gbBgSecondaryWhite text-sm rounded px-4 py-2 border focus:border-black focus:outline-none"
							rows={3}
							cols={1}
							placeholder={t(
								"bangladeshi.shippingAddress.textAddressPlaceholder"
							)}
							value={shippingHomeAddress ?? ""}
							onChange={handleShippingHomeAddress}
							title={t("bangladeshi.shippingAddress.shippingAddressTitle")}
						></textarea>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RecieverInfoForm;
