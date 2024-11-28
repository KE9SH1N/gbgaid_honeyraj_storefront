"use client";
import { fetchThanaData } from "@/app/api/locationApiService";
import UseOutsideClickAndEscape from "@/app/hooks/useDropdown";
import {
	selectUserDistrict,
	selectUserThana,
	setUserThana,
} from "@/app/redux/features/auth/userProfileSlice";
import { languageSelector } from "@/app/redux/features/intl/languageSlice";
import { selectThanaData } from "@/app/redux/features/location/thanaDataSlice";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const ThanaDropDown = () => {
	const dispatch = useDispatch();
	const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [searchQuery, setSearchQuery] = useState("");

	// For Data Fetch
	useEffect(() => {
		dispatch(fetchThanaData() as any);
	}, [dispatch]);

	UseOutsideClickAndEscape(dropdownRef, setDropdownOpen);

	// rtk selectors
	const selectedLanguage = useSelector(languageSelector);
	const selectedDistrict = useSelector(selectUserDistrict);
	const thanaData = useSelector(selectThanaData);
	const selectedThana = useSelector(selectUserThana);

	const filterThanaData = thanaData.filter(
		(item: any) => item?.district?.id === selectedDistrict?.id
	);

	const toggleDropdownAddress = () => {
		if (!selectedDistrict?.nameBn) {
			setDropdownOpen(false);
		} else {
			setDropdownOpen(!isDropdownOpen);
		}
	};

	const handleSearch = (event: any) => {
		setSearchQuery(event.target.value);
	};

	const handleSelectThana = (value: string, nameBn: string, nameEn: string) => {
		dispatch(
			setUserThana({
				id: value,
				nameBn: nameBn,
				nameEn: nameEn,
			})
		);
		setDropdownOpen(false);
	};

	const filteredThanaData = filterThanaData.filter(
		(thana: any) =>
			thana.name_en.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
			thana.name_bn.toLowerCase().startsWith(searchQuery.toLowerCase())
	);

	return (
		<div>
			<div className="w-full flex flex-col gap-y-2" ref={dropdownRef}>
				<label htmlFor="name" className="text-[#3A3A3A] text-xs  capitalize">
					থানা
				</label>
				<div className="w-full ct-flex-between gap-x-4">
					<div
						onClick={toggleDropdownAddress}
						className="w-full ct-flex-between pl-2 font-medium cursor-pointer bg-[#F6F6F6] rounded py-2 border capitalize"
					>
						<div className="text-xs lg:text-sm">
							{selectedLanguage === "bn"
								? selectedThana?.nameBn || "থানা"
								: selectedThana?.nameEn || "thana"}
						</div>
						<div>
							{!isDropdownOpen ? (
								<IoIosArrowDown className=" mx-1 lg:mx-4 font-medium text-md" />
							) : (
								<IoIosArrowUp className="mx-1 lg:mx-4 font-medium text-md" />
							)}
						</div>
					</div>
				</div>
				<div className="w-full relative">
					<div className="w-full">
						<div
							className={`w-full h-[198px] overflow-y-scroll absolute shadow-lg bg-white top-0 left-0 flex flex-col items-start z-40 smooth-animation ${
								isDropdownOpen ? "opacity-100" : "hidden opacity-0"
							}`}
						>
							<div className="w-full">
								<input
									type="text"
									id="defaultSearchMobile"
									placeholder="আপনার থানা সার্চ করুন"
									className={`w-full appearance-none bg-gbBgSecondaryWhite pl-2 pr-4 py-2 border focus:outline-none ${
										isDropdownOpen ? "focus:border-gbPrimaryColor" : ""
									} placeholder:capitalize placeholder:text-sm rounded`}
									value={searchQuery}
									onChange={handleSearch}
								/>
							</div>

							<ul className="w-full">
								{filteredThanaData.map((thana: any) => (
									<li
										key={thana?.id}
										onClick={() =>
											handleSelectThana(
												thana?.id,
												thana?.name_bn,
												thana?.name_en
											)
										}
										className="w-full py-2 px-3 text-xs cursor-pointer bg-brandServiceBg hover:text-[#ffffff] hover:bg-[#F68821] hover:opacity-90 smooth-animation-mid capitalize"
									>
										{selectedLanguage === "bn"
											? thana?.name_bn
											: thana?.name_en}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ThanaDropDown;
