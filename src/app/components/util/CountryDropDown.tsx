"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { countryCodeData } from "../../../data/countryCode";
import Image from "next/image";
import {
	setCountryImageUrl,
	setCountryPhoneCodeBn,
	setCountryPhoneCodeEn,
	setSelectedCountry,
} from "../../redux/features/form/countryCodeSlice";
import { useTranslations } from "next-intl";
import UseOutsideClickAndEscape from "../../hooks/useDropdown";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const CountryDropDown = ({ closeParentDropdown, isDropdownOpen }: any) => {
	const dispatch = useDispatch();
	const [isDropdownopen, setDropdownopen] = useState<boolean>(false);
	const [isChildDropdownVisible, setIsChildDropdownVisible] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	// For multi-language
	const t = useTranslations("checkout");

	useEffect(() => {
		setIsChildDropdownVisible(isDropdownOpen); // Sync the state of the child dropdown with the parent dropdown
	}, [isDropdownOpen]);

	// Custom hook for dropdown ref
	UseOutsideClickAndEscape(dropdownRef, setDropdownopen);

	const handleCountrySelect = (country: any) => {
		dispatch(setSelectedCountry(country.country_name_en));
		dispatch(setCountryImageUrl(country.image_url));
		dispatch(setCountryPhoneCodeEn(country.phone_code_en));
		dispatch(setCountryPhoneCodeBn(country.phone_code_bn));
		setDropdownopen(false);
		closeParentDropdown();
	};

	// const toggleDropdownCountry = () => {
	// 	setDropdownopen(!isDropdownopen);
	// };

	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (event: any) => {
		setSearchQuery(event.target.value);
	};

	const filteredCountries = countryCodeData.filter(
		(country) =>
			country.country_name_en
				.toLowerCase()
				.startsWith(searchQuery.toLowerCase()) ||
			country.country_name_bn
				.toLowerCase()
				.startsWith(searchQuery.toLowerCase()) ||
			country.phone_code_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
			country.phone_code_bn.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const selectedLanguage = useSelector(languageSelector);
	return (
		<div>
			<div className="gap-4" ref={dropdownRef}>
				<div
					// onClick={toggleDropdownCountry}
					className="flex items-center font-medium cursor-pointer"
				>
					<div className="w-full relative flex justify-center">
						<input
							type="text"
							id="defaultSearchMobile"
							placeholder={t(
								"nonBangladeshi.billingAddress.whatsAppNumberSearchPlaceholder"
							)}
							className={`w-full appearance-none bg-gbBgSecondaryWhite pl-10 pr-4 py-2 border focus:outline-none ${
								isChildDropdownVisible ? "focus:border-gbPrimaryColor" : ""
							} placeholder:capitalize rounded px-3`}
							onChange={handleSearch}
							value={searchQuery}
						/>

						<button className=" absolute left-2 top-[25%] cursor-pointer">
							<IoSearchOutline className="text-xl" />
						</button>
					</div>
				</div>
				<div className="w-full relative ">
					<ul
						className={`w-full absolute bg-white top-0 left-0 flex flex-col items-start rounded-sm rounded-r-md z-40 smooth-animation overflow-x-auto max-h-[195px] ${
							isChildDropdownVisible ? "  opacity-100" : "hidden opacity-0"
						} `}
					>
						{filteredCountries.map((country: any) => {
							return (
								<div
									key={country.id}
									onClick={() => handleCountrySelect(country)}
									className="w-full py-2 px-2 bg-componentBg hover:text-[#ffffff] hover:bg-gbPrimaryColor hover:opacity-90 border-b border-white smooth-animation-mid"
								>
									<li className="text-xs capitalize space-x-2 flex flex-row">
										<div>
											<Image
												src={country.image_url}
												alt=""
												width={24}
												height={18}
											/>
										</div>
										{selectedLanguage === "bn" ? (
											<span>{country.country_name_bn} </span>
										) : (
											<span>{country.country_name_en} </span>
										)}

										{selectedLanguage === "bn" ? (
											<span>({country.phone_code_bn})</span>
										) : (
											<span>({country.phone_code_en})</span>
										)}
									</li>
								</div>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default CountryDropDown;
