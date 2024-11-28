"use client";
import { fetchDivisionData } from "@/app/api/locationApiService";
import UseOutsideClickAndEscape from "@/app/hooks/useDropdown";
import {
	selectUserDivision,
	setUserDivision,
} from "@/app/redux/features/auth/userProfileSlice";
import { languageSelector } from "@/app/redux/features/intl/languageSlice";
import { selectLocationData } from "@/app/redux/features/location/locationDataSlice";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const DivisionDropDown = () => {
	const dispatch = useDispatch();
	const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [searchQuery, setSearchQuery] = useState("");

	// For Data Fetch
	useEffect(() => {
		dispatch(fetchDivisionData() as any);
	}, [dispatch]);

	// rtk selector
	const divisionData = useSelector(selectLocationData);
	const selectedLanguage = useSelector(languageSelector);
	const selectedDivision = useSelector(selectUserDivision);

	UseOutsideClickAndEscape(dropdownRef, setDropdownOpen);

	const toggleDropdownAddress = () => {
		setDropdownOpen(!isDropdownOpen);
	};

	const handleSelectDivision = (id: string, nameBn: string, nameEn: string) => {
		dispatch(
			setUserDivision({
				id: id,
				nameEn: nameEn,
				nameBn: nameBn,
			})
		);
		setDropdownOpen(false);
	};

	const handleSearch = (event: any) => {
		setSearchQuery(event.target.value);
	};

	const filteredDivisionData = divisionData?.filter(
		(division: any) =>
			division?.name_en.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
			division?.name_bn.toLowerCase().startsWith(searchQuery.toLowerCase())
	);

	return (
		<div>
			<div className="w-full flex flex-col gap-y-2" ref={dropdownRef}>
				<label htmlFor="name" className="text-[#3A3A3A] text-xs capitalize">
					বিভাগ
				</label>
				<div className="w-full ct-flex-between gap-x-4">
					<div
						onClick={toggleDropdownAddress}
						className="w-full ct-flex-between pl-2 font-medium cursor-pointer bg-[#F6F6F6] rounded py-2 border capitalize"
					>
						<div className="text-xs lg:text-sm">
							{selectedLanguage === "bn"
								? selectedDivision.nameBn || "বিভাগ"
								: selectedDivision.nameEn || "Division"}
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
									placeholder="আপনার জেলা সার্চ করুন"
									className={`w-full appearance-none bg-gbBgSecondaryWhite pl-2 pr-4 py-2 border focus:outline-none ${
										isDropdownOpen ? "focus:border-gbPrimaryColor" : ""
									} placeholder:capitalize placeholder:text-sm rounded`}
									value={searchQuery}
									onChange={handleSearch}
								/>
							</div>
							<ul className="w-full">
								{filteredDivisionData?.map((division: any) => {
									return (
										<li
											key={division.id}
											onClick={() =>
												handleSelectDivision(
													division?.id,
													division?.name_bn,
													division?.name_en
												)
											}
											className="w-full py-2 px-3 text-xs cursor-pointer bg-brandServiceBg hover:text-[#ffffff] hover:bg-[#F68821] hover:opacity-90 smooth-animation-mid capitalize"
										>
											{selectedLanguage === "bn"
												? division?.name_bn
												: division?.name_en}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DivisionDropDown;
