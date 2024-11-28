"use client";
import React, { useEffect, useRef, useState } from "react";
import CustomerInfoHeading from "./CustomerInfoHeading";
import { useDispatch, useSelector } from "react-redux";
import {
	clearBillerDistrict,
	clearBillerThana,
	selectBillerAdditionalPhoneNumber,
	selectBillerDistrict,
	selectBillerDivision,
	selectBillerHomeAddress,
	selectBillerName,
	selectBillerPhoneNumber,
	selectBillerThana,
	selectGift,
	selectNonResidentRelationShip,
	selectNonResidentWhatsAppNumber,
	setBillerAdditionalPhoneNumber,
	setBillerDistrict,
	setBillerDivision,
	setBillerHomeAddress,
	setBillerName,
	setBillerPhoneNumber,
	setBillerThana,
	setBillingAddressCheck,
	setNonResidentRelationShip,
	setNonResidentWhatsAppNumber,
} from "../../redux/features/form/formSlice";
import { selectLocationData } from "../../redux/features/location/locationDataSlice";
import {
	fetchDistrictData,
	fetchDivisionData,
} from "../../api/locationApiService";
import { selectDistrictData } from "../../redux/features/location/districtDataSlice";
import AddressDropdown from "./AddressDropdown";
import CountryDropDown from "../util/CountryDropDown";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
	selectSelectedCountryFlag,
	selectedCountryPhoneCodeEn,
	selectedCountryPhoneCodeBn,
} from "../../redux/features/form/countryCodeSlice";
import { useTranslations } from "next-intl";
import UseOutsideClickAndEscape from "../../hooks/useDropdown";
import AddressSearchDropdown from "./AddressSearchDropdown";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { activeResident } from "../../redux/features/checkout/residentSlice";
import { thanaDataInfo } from "../../types/thanaDataType";
import { districtInfo } from "../../types/districtDataType";
import { Location } from "../../types/locationType";
import { validatePhoneNumber } from "../../lib/validation/numberValidation";
import {
	isDistrictDisabled,
	isThanaDisabled,
	setDistrictDisabled,
	setThanaDisabled,
} from "../../redux/features/location/locationDisableSlice";

const CustomerInfoForm = () => {
	const dispatch = useDispatch();
	const activeTab = useSelector(activeResident);
	const locationData = useSelector(selectLocationData);
	const districtData = useSelector(selectDistrictData);
	const isGift = useSelector(selectGift);

	const [phoneNumberInput, setPhoneNumberInput] = useState<string>("");
	const [additionalPhoneNumberInput, setadditionalPhoneNumberInput] =
		useState<string>("");
	const [whatsAppNumberInput, setwhatsAppNumberInput] = useState<string>("");
	const [isDropdownopen, setDropdownopen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const countryFlagImage = useSelector(selectSelectedCountryFlag);
	const countryPhoneCodeEn = useSelector(selectedCountryPhoneCodeEn);
	const countryPhoneCodeBn = useSelector(selectedCountryPhoneCodeBn);

	// Custom hook for dropdown ref
	UseOutsideClickAndEscape(dropdownRef, setDropdownopen);

	// For Data Fetch
	useEffect(() => {
		dispatch(fetchDivisionData() as any);
	}, [dispatch]);

	// For Data Fetch
	useEffect(() => {
		dispatch(fetchDistrictData() as any);
	}, [dispatch]);

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
	// Conditional Css for whats app phone number input field
	const whatsAppPhoneNumberInputBorderColor =
		whatsAppNumberInput.length === 0
			? "border-gray-300"
			: whatsAppNumberInput.length < 5
			? "border-gbInactiveColorLight"
			: "border-gbActiveColor";

	// Customer Info Selector from RTK
	const billerName = useSelector(selectBillerName);
	const billerPhoneNumber = useSelector(selectBillerPhoneNumber);
	const billerAdditionalPhoneNumber = useSelector(
		selectBillerAdditionalPhoneNumber
	);
	const billerDivision = useSelector(selectBillerDivision);
	const billerDistrict = useSelector(selectBillerDistrict);
	const billerThana = useSelector(selectBillerThana);
	const billerHomeAddress = useSelector(selectBillerHomeAddress);
	const nonResidentWhatsAppNumber = useSelector(
		selectNonResidentWhatsAppNumber
	);
	const nonResidentRelationShip = useSelector(selectNonResidentRelationShip);
	const selectedLanguage = useSelector(languageSelector);

	const handleBillerName = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setBillerName(e.target.value));
		dispatch(setBillingAddressCheck(false));
	};

	const handleBillerPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = validatePhoneNumber(e.target.value);
		if (value !== null) {
			setPhoneNumberInput(value);
			dispatch(setBillerPhoneNumber(value));
			dispatch(setBillingAddressCheck(false));
		}
	};
	const handleBillerAdditionalPhoneNumber = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = validatePhoneNumber(e.target.value);
		if (value !== null) {
			setadditionalPhoneNumberInput(value);
			dispatch(setBillerAdditionalPhoneNumber(e.target.value));
			dispatch(setBillingAddressCheck(false));
		}
	};

	const handleBillerHomeAddress = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		dispatch(setBillerHomeAddress(e.target.value));
		dispatch(setBillingAddressCheck(false));
	};

	const handleNonResidentWhatsAppNumber = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;
		if (/^[\d০১২৩৪৫৬৭৮৯]*$/.test(value)) {
			setwhatsAppNumberInput(value);
			dispatch(setNonResidentWhatsAppNumber(e.target.value));
		}
	};

	const handleNonResidentRelationShip = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		dispatch(setNonResidentRelationShip(e.target.value));
	};
	const handleBillerDivision = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setBillerName(e.target.value));
		dispatch(setBillingAddressCheck(false));
	};

	const handleBillerDistrict = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setBillerName(e.target.value));
		dispatch(setBillingAddressCheck(false));
	};

	const handleBillerThana = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setBillerName(e.target.value));
		dispatch(setBillingAddressCheck(false));
	};

	const [district, setDistrict] = useState<districtInfo[]>([]);
	const [thana, setThana] = useState<thanaDataInfo[]>([]);

	const toggleDropdownCountry = () => {
		setDropdownopen(!isDropdownopen);
	};

	const closeParentDropdown = () => {
		setDropdownopen(false);
	};

	const disableDistrict = useSelector(isDistrictDisabled);
	const disableThana = useSelector(isThanaDisabled);

	// For multi-language
	const t = useTranslations("checkout");

	return (
		<div className={`relative w-full py-4 ${isGift ? "lg:w-1/2" : ""}`}>
			<div>
				<CustomerInfoHeading />
			</div>
			<div className="relative w-full py-4">
				<form action="" className="grid grid-cols-1 text-sm gap-y-4">
					<div className=" w-full ct-flex-start flex-col gap-y-2">
						<label htmlFor="cName" className=" capitalize text-xs">
							{t("bangladeshi.billingAddress.name")}
						</label>
						<input
							id="cName"
							type="text"
							value={billerName ?? ""}
							onChange={handleBillerName}
							className="w-full bg-gbBgSecondaryWhite rounded px-3 py-2 border focus:border-black focus:outline-none placeholder: capitalize"
							placeholder={t("bangladeshi.billingAddress.namePlaceholder")}
							title={t("bangladeshi.billingAddress.billingNameTitle")}
						/>
					</div>
					{activeTab === "inBangladesh" ? (
						<div className="flex-col space-y-4">
							<div className="relative w-full ct-flex-start flex-col gap-y-2">
								<label htmlFor="cphoneNumber" className=" capitalize text-xs">
									{t("bangladeshi.billingAddress.phoneNumber")}
									<span className="text-red-500">*</span>
								</label>
								<input
									id="cphoneNumber"
									type="text"
									inputMode="numeric"
									value={billerPhoneNumber ?? ""}
									onChange={handleBillerPhoneNumber}
									className={`w-full bg-gbBgSecondaryWhite pl-12 lg:pl-16 rounded px-3 py-2 border focus:outline-none placeholder: capitalize ${phoneNumberInputBorderColor}`}
									placeholder={t(
										"bangladeshi.billingAddress.phoneNumberPlaceholder"
									)}
									title={t(
										"bangladeshi.billingAddress.billingPhoneNumberTitle"
									)}
								/>
								<span className=" absolute top-[54%] left-[2%]">
									{t("bangladeshi.billingAddress.countryCode")}
								</span>
							</div>
							<div className="relative w-full ct-flex-start flex-col gap-y-2">
								<label
									htmlFor="cadditionalphoneNumber"
									className=" capitalize text-xs"
								>
									{t("bangladeshi.billingAddress.additionalPhoneNumber")}
								</label>
								<input
									id="cadditionalphoneNumber"
									type="text"
									inputMode="numeric"
									value={billerAdditionalPhoneNumber ?? ""}
									onChange={handleBillerAdditionalPhoneNumber}
									className={`w-full bg-gbBgSecondaryWhite pl-12 lg:pl-16 rounded px-3 py-2 border focus:outline-none placeholder: capitalize ${additionalPhoneNumberInputBorderColor}`}
									placeholder={t(
										"bangladeshi.billingAddress.additionaPhoneNumberPlaceholder"
									)}
									title={t(
										"bangladeshi.billingAddress.billingAdditionalaPhoneNumberTitle"
									)}
								/>
								<span className=" absolute top-[54%] left-[2%]">
									{t("bangladeshi.billingAddress.countryCode")}
								</span>
							</div>
							<div>
								<label htmlFor="rName" className=" capitalize text-xs">
									{t("bangladeshi.billingAddress.titleAddressField")}
								</label>

								{isGift ? (
									<div>
										<div className="w-full ct-flex-between">
											<AddressDropdown
												dropdownText={t("bangladeshi.location.division")}
												selectedValue={
													selectedLanguage === "bn"
														? billerDivision.nameBn
														: billerDivision.nameEn
												}
												onChange={(
													value: number,
													nameBn: string,
													nameEn: string
												) => {
													dispatch(
														setBillerDivision({
															id: value,
															nameBn: nameBn,
															nameEn: nameEn,
														})
													);
													dispatch(setBillingAddressCheck(false));
													dispatch(setDistrictDisabled(true));
													dispatch(
														clearBillerDistrict({
															id: 0,
															nameBn: "",
															nameEn: "",
														})
													);
													dispatch(
														clearBillerThana({ id: "", nameBn: "", nameEn: "" })
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
											<div
												className={` ${
													!disableDistrict
														? " text-gray-400 cursor-not-allowed pointer-events-none"
														: ""
												}`}
											>
												<AddressDropdown
													dropdownText={t("bangladeshi.location.district")}
													selectedValue={
														selectedLanguage === "bn"
															? billerDistrict.nameBn
															: billerDistrict.nameEn
													}
													districtData={district}
													dataType="district"
													disabled={
														!billerDivision.nameBn && !billerDivision.nameEn
													}
													onChange={(
														value: number,
														nameBn: string,
														nameEn: string
													) => {
														dispatch(
															setBillerDistrict({
																id: value,
																nameBn: nameBn,
																nameEn: nameEn,
															})
														);
														dispatch(setBillingAddressCheck(false));
														dispatch(setThanaDisabled(true));
														dispatch(
															clearBillerThana({
																id: "",
																nameBn: "",
																nameEn: "",
															})
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
										</div>
										<div
											className={` ${
												!disableThana
													? " text-gray-400 cursor-not-allowed pointer-events-none"
													: ""
											}`}
										>
											<AddressSearchDropdown
												dropdownText={t("bangladeshi.location.thana")}
												selectedValue={
													selectedLanguage === "bn"
														? billerThana.nameBn
														: billerThana.nameEn
												}
												onChange={(
													value: number,
													nameBn: string,
													nameEn: string
												) => {
													dispatch(
														setBillerThana({
															id: value,
															nameBn: nameBn,
															nameEn: nameEn,
														})
													);
													dispatch(setBillingAddressCheck(false));
												}}
												locationData={thana}
												disabled={
													!billerDistrict.nameBn && !billerDistrict.nameEn
												}
											/>
										</div>
									</div>
								) : (
									<div>
										<div className="w-full grid grid-cols-2 gap-x-16 md:gap-x-24 sm:gap-x-8 lg:ct-flex-between">
											<div>
												<AddressDropdown
													dropdownText={t("bangladeshi.location.division")}
													selectedValue={
														selectedLanguage === "bn"
															? billerDivision.nameBn
															: billerDivision.nameEn
													}
													onChange={(
														value: number,
														nameBn: string,
														nameEn: string
													) => {
														dispatch(
															setBillerDivision({
																id: value,
																nameBn: nameBn,
																nameEn: nameEn,
															})
														);
														dispatch(setBillingAddressCheck(false));
														dispatch(setDistrictDisabled(true));
														dispatch(
															clearBillerDistrict({
																id: 0,
																nameBn: "",
																nameEn: "",
															})
														);
														dispatch(
															clearBillerThana({
																id: "",
																nameBn: "",
																nameEn: "",
															})
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
											</div>
											<div
												className={` ${
													!disableDistrict
														? " text-gray-400 cursor-not-allowed pointer-events-none"
														: ""
												}`}
											>
												<AddressDropdown
													dropdownText={t("bangladeshi.location.district")}
													selectedValue={
														selectedLanguage === "bn"
															? billerDistrict.nameBn
															: billerDistrict.nameEn
													}
													districtData={district}
													dataType="district"
													disabled={
														!billerDivision.nameBn && !billerDivision.nameEn
													}
													onChange={(
														value: number,
														nameBn: string,
														nameEn: string
													) => {
														dispatch(
															setBillerDistrict({
																id: value,
																nameBn: nameBn,
																nameEn: nameEn,
															})
														);
														dispatch(setBillingAddressCheck(false));
														dispatch(setThanaDisabled(true));
														dispatch(
															clearBillerThana({
																id: "",
																nameBn: "",
																nameEn: "",
															})
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
											<div
												className={`col-span-2${
													!disableThana
														? " text-gray-400 cursor-not-allowed pointer-events-none"
														: ""
												}`}
											>
												<AddressSearchDropdown
													dropdownText={t("bangladeshi.location.thana")}
													selectedValue={
														selectedLanguage === "bn"
															? billerThana.nameBn
															: billerThana.nameEn
													}
													onChange={(
														value: number,
														nameBn: string,
														nameEn: string
													) => {
														dispatch(
															setBillerThana({
																id: value,
																nameBn: nameBn,
																nameEn: nameEn,
															})
														);
														dispatch(setBillingAddressCheck(false));
													}}
													locationData={thana}
													disabled={
														!billerDistrict.nameBn && !billerDistrict.nameEn
													}
												/>
											</div>
										</div>
									</div>
								)}
							</div>
							<div className="relative w-full ct-flex-start flex-col gap-y-2">
								<textarea
									id="rDeliveryAddress"
									className="resize-none w-full bg-gbBgSecondaryWhite rounded px-4 py-2 border focus:border-black focus:outline-none"
									rows={3}
									cols={1}
									placeholder={t(
										"bangladeshi.billingAddress.textAddressPlaceholder"
									)}
									value={billerHomeAddress ?? ""}
									onChange={handleBillerHomeAddress}
									title={t("bangladeshi.billingAddress.billingAddressTitle")}
								></textarea>
							</div>
						</div>
					) : (
						<div className="flex flex-col space-y-4">
							<div className="relative w-full ct-flex-start flex-col gap-y-2">
								<label htmlFor="sWhatsApp" className=" capitalize text-xs">
									{t("nonBangladeshi.billingAddress.whatsAppNumber")}
									<span className="text-red-500">*</span>
								</label>
								<input
									id="sWhatsApp"
									type="text"
									value={nonResidentWhatsAppNumber ?? ""}
									onChange={handleNonResidentWhatsAppNumber}
									className={`w-full bg-gbBgSecondaryWhite pl-32 rounded px-3 py-2 border focus:outline-none placeholder:capitalize ${whatsAppPhoneNumberInputBorderColor}`}
									placeholder={t(
										"nonBangladeshi.billingAddress.whatsAppNumberPlaceholder"
									)}
									title={t("nonBangladeshi.billingAddress.whatsAppNumberTitle")}
								/>

								<div className="absolute top-[52%] left-[2%] flex">
									<div>
										<Image
											src={countryFlagImage}
											alt="Country Code Image"
											width={32}
											height={28}
										/>
									</div>

									<div
										className="ct-flex-between cursor-pointer pr-2 border-r-2 border-borderLine"
										onClick={toggleDropdownCountry}
									>
										<div>
											{!isDropdownopen ? (
												<IoIosArrowDown className="mx-2 font-medium" />
											) : (
												<IoIosArrowUp className="mx-2 font-medium" />
											)}
										</div>

										<div>
											{selectedLanguage === "bn" ? (
												<span>{countryPhoneCodeBn}</span>
											) : (
												<span>{countryPhoneCodeEn}</span>
											)}
										</div>
									</div>
								</div>
							</div>

							{isDropdownopen ? (
								<div className="w-full" ref={dropdownRef}>
									<CountryDropDown
										closeParentDropdown={closeParentDropdown}
										isDropdownOpen={isDropdownopen}
									/>
								</div>
							) : (
								""
							)}

							<div className="relative w-full ct-flex-start flex-col gap-y-2">
								<label htmlFor="cNote" className=" capitalize text-xs">
									{t("nonBangladeshi.billingAddress.relationshipStatus")}
								</label>
								<textarea
									id="cDeliveryAddress"
									className="resize-none w-full bg-gbBgSecondaryWhite rounded px-4 py-2 border focus:border-black focus:outline-none lg:text-sm text-xs lg:placeholder:text-xs placeholder:capitalize"
									rows={2}
									cols={1}
									placeholder={t(
										"nonBangladeshi.billingAddress.relationshipStatusPlaceholder"
									)}
									value={nonResidentRelationShip ?? ""}
									onChange={handleNonResidentRelationShip}
									title={t(
										"nonBangladeshi.billingAddress.relationshipStatusTitle"
									)}
								></textarea>
							</div>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default CustomerInfoForm;
