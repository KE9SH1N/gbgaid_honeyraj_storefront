import React, { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";
import UseOutsideClickAndEscape from "../../hooks/useDropdown";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { selectGift } from "../../redux/features/form/formSlice";
import { activeResident } from "../../redux/features/checkout/residentSlice";

interface Location {
	id: number;
	name_en: string;
	name_bn: string;
}

interface dropdownMenuText {
	dropdownText: string;
	onChange: (value: number, nameBn: string, nameEn: string) => void;
	selectedValue: string | null;
	locationData: Location[];
}

const AddressSearchDropdown: React.FC<
	dropdownMenuText & { disabled?: boolean }
> = ({ dropdownText, selectedValue, onChange, locationData, disabled }) => {
	const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const isGift = useSelector(selectGift);
	const activeTab = useSelector(activeResident);

	// Custom hook for dropdown ref
	UseOutsideClickAndEscape(dropdownRef, setDropdownOpen);

	const toggleDropdownCategory = () => {
		setDropdownOpen(!isDropdownOpen);
	};

	const handleSearch = (event: any) => {
		setSearchQuery(event.target.value);
	};

	const handleSelectLocation = (
		locationId: number,
		locationNameBn: string,
		locationNameEn: string
	) => {
		onChange(locationId, locationNameBn, locationNameEn);
		setDropdownOpen(false);
	};
	const selectedLanguage = useSelector(languageSelector);

	const filteredLocationData = locationData.filter(
		(locationItem: Location) =>
			locationItem.name_en
				.toLowerCase()
				.startsWith(searchQuery.toLowerCase()) ||
			locationItem.name_bn.toLowerCase().startsWith(searchQuery.toLowerCase())
	);

	const closeParentDropdown = () => {
		setDropdownOpen(false);
	};

	return (
		<div>
			<div
				className={`${disabled ? "pointer-events-none opacity-50" : ""} ${
					!isGift && activeTab !== "nonResident"
						? "xl:w-56 lg:w-48 md:w-full sm:w-full gap-4 py-3 relative"
						: "w-full gap-4 py-3 "
				}`}
				ref={dropdownRef}
			>
				<div className="w-full ct-flex-between flex-col gap-x-4">
					<div
						onClick={toggleDropdownCategory}
						className="w-full ct-flex-between shadow-md pl-2 font-medium cursor-pointer rounded py-2 bg-gbBgSecondaryWhite capitalize"
					>
						<div className="text-xs lg:text-sm">
							{selectedValue ? selectedValue : dropdownText}
						</div>
						<div>
							{!isDropdownOpen ? (
								<IoIosArrowDown className=" mx-1 lg:mx-4 font-medium text-lg" />
							) : (
								<IoIosArrowUp className="mx-1 lg:mx-4 font-medium text-lg" />
							)}
						</div>
					</div>
				</div>
				<div
					className={`w-full  ${
						!isGift || activeTab === "nonResident"
							? "absolute z-40"
							: "relative"
					}`}
					ref={dropdownRef}
				>
					<div className="w-full">
						<div
							className={`w-full ${
								isDropdownOpen
									? "opacity-100"
									: "hidden opacity-0 pointer-events-none"
							}`}
						>
							<div className="w-full mt-1">
								<input
									type="text"
									id="defaultSearchMobile"
									placeholder="search your sub-district"
									className={`w-full appearance-none bg-gbBgSecondaryWhite pl-2 pr-4 py-2 border focus:outline-none ${
										isDropdownOpen ? "focus:border-gbPrimaryColor" : ""
									} placeholder:capitalize rounded`}
									value={searchQuery}
									onChange={handleSearch}
								/>
							</div>
							<div
								className={`w-full mt-[2px] overflow-x-auto scrollbar-thin scrollbar-thumb-gbCustomScrollThumbColor scrollbar-track-[#FEF3E9] max-h-[195px] absolute shadow-lg bg-white top-10 left-0 flex flex-col items-start rounded-sm z-40 smooth-animation`}
							>
								<ul className="w-full">
									{filteredLocationData.map((locationItem: Location) => {
										return (
											<li
												key={locationItem.id}
												onClick={() =>
													handleSelectLocation(
														locationItem.id,
														locationItem.name_bn,
														locationItem.name_en
													)
												}
												className="w-full py-2 px-3 border-b text-xs border-borderLine bg-componentBg hover:text-[#ffffff] hover:bg-gbPrimaryColor hover:opacity-90 smooth-animation-mid"
											>
												{selectedLanguage === "bn" ? (
													<span>{locationItem.name_bn}</span>
												) : (
													<span>{locationItem.name_en}</span>
												)}
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddressSearchDropdown;
