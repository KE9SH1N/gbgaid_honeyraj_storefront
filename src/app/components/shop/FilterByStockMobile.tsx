"use client";
import React, { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import UseOutsideClickAndEscape from "../../hooks/useDropdown";
import { useTranslations } from "next-intl";
import {
	selectShowAll,
	selectStockOnly,
	toggleInStockOnly,
	toggleShowAll,
} from "../../redux/features/product/filterSlice";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const FilterByStockMobile = () => {
	const dispatch = useDispatch();
	const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [selectedFilter, setSelectedFilter] = useState("");
	const inStockOnly = useSelector(selectStockOnly);
	const showAll = useSelector(selectShowAll);
	const selectedLanguage = useSelector(languageSelector);

	// Custom hook for dropdown ref
	UseOutsideClickAndEscape(dropdownRef, setDropdownOpen);

	//Dropdown toggle
	const toggleDropdownCategory = () => {
		setDropdownOpen(!isDropdownOpen);
	};

	//Dropdown close when item selected
	const handleSelectLocation = () => {
		setDropdownOpen(false);
	};

	//Filter in Stock or out of Stock dispatch to rtk
	const handleFilterStock = () => {
		if (!inStockOnly) {
			dispatch(toggleInStockOnly());
			dispatch(toggleShowAll());
			setSelectedFilter(selectedLanguage === "en" ? "in-stock" : "স্টকে আছে");
		}
	};

	//Filter Show all to dispatch to rtk
	const handleFilterShowAll = () => {
		if (!showAll) {
			dispatch(toggleShowAll());
			dispatch(toggleInStockOnly());
			setSelectedFilter(selectedLanguage === "en" ? "show all" : "সব দেখুন");
		}
	};
	// For multi-language
	const t = useTranslations("filter");
	return (
		<div className={`w-[150px] lg:w-40 gap-4 py-3 `} ref={dropdownRef}>
			<div className="w-full ct-flex-between gap-x-4">
				<div
					onClick={toggleDropdownCategory}
					className="w-full ct-flex-between shadow-md pl-2 font-medium cursor-pointer rounded py-2 bg-gbBgSecondaryWhite capitalize"
				>
					<div className="text-xs">
						{selectedFilter || t("filter-by-availability")}
					</div>
					<div>
						{!isDropdownOpen ? (
							<IoIosArrowDown className=" mx-1 font-medium text-md" />
						) : (
							<IoIosArrowUp className="mx-1 font-medium text-md" />
						)}
					</div>
				</div>
			</div>
			<div className="w-full relative">
				<div className="w-full">
					<div
						className={`w-full absolute shadow-lg bg-white top-1 left-0 flex flex-col items-start rounded-sm z-40 smooth-animation ${
							isDropdownOpen ? "opacity-100" : "hidden opacity-0"
						}`}
					>
						<ul
							onClick={() => handleSelectLocation()}
							className="w-full capitalize"
						>
							<li
								className="py-2 px-3 border-b text-xs border-borderLine bg-componentBg hover:text-[#ffffff] hover:bg-gbPrimaryColor hover:opacity-90 cursor-pointer smooth-animation-mid"
								onClick={handleFilterShowAll}
							>
								{t("stock-filter.show-all")}
							</li>
							<li
								className="py-2 px-3 border-b text-xs border-borderLine bg-componentBg hover:text-[#ffffff] hover:bg-gbPrimaryColor hover:opacity-90 cursor-pointer smooth-animation-mid"
								onClick={handleFilterStock}
							>
								{t("stock-filter.in-stock")}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FilterByStockMobile;
