"use client";
import React, { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import UseOutsideClickAndEscape from "../../hooks/useDropdown";
import { selectCategories } from "../../redux/features/product/categorydataSlice";
import { useTranslations } from "next-intl";
import {
	selectFilter,
	toggleCategory,
} from "../../redux/features/product/filterSlice";
import { TiTick } from "react-icons/ti";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { category } from "../../types/categoryType";

const FilterByCategoryMobile = () => {
	const dispatch = useDispatch();
	const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const selectedLanguage = useSelector(languageSelector);
	const categories = useSelector(selectCategories);
	const filterState = useSelector(selectFilter);
	const selectedCategories = (filterState.selectedCategories || []).map(Number);

	// Custom hook for dropdown ref
	UseOutsideClickAndEscape(dropdownRef, setDropdownOpen);

	// Function to handle checkbox change
	const handleCheckboxChange = (CatId: number) => {
		dispatch(toggleCategory({ CatId }));
	};
	// Dropdown Toggle
	const toggleDropdownCategory = () => {
		setDropdownOpen(!isDropdownOpen);
	};
	// Dropdown close when item selected
	const handleSelectLocation = () => {
		setDropdownOpen(false);
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
					<div className="text-xs">{t("filter-by-category")}</div>
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
						className={`w-full h-[210px] overflow-y-scroll absolute shadow-lg bg-white top-1 left-0 flex flex-col items-start rounded-sm z-40 smooth-animation ${
							isDropdownOpen ? "opacity-100" : "hidden opacity-0"
						}`}
					>
						<ul onClick={() => handleSelectLocation()} className="w-full ">
							{categories.map((categoryItem: category) => {
								return (
									<li
										key={categoryItem.id}
										onClick={() => handleCheckboxChange(categoryItem.id)}
										className="py-2 px-3 border-b text-xs border-borderLine bg-componentBg hover:text-[#ffffff] hover:bg-gbPrimaryColor hover:opacity-90 smooth-animation-mid"
									>
										{selectedLanguage === "bn" ? (
											<div className="ct-flex-between">
												<span>{categoryItem.name_bn}</span>
												{selectedCategories.includes(categoryItem.id) ? (
													<TiTick className="text-lg text-gbActiveColor" />
												) : (
													<TiTick className="text-lg text-[#c9c8c8]" />
												)}
											</div>
										) : (
											<div className="ct-flex-between">
												<span>{categoryItem.name_en}</span>
												{selectedCategories.includes(categoryItem.id) ? (
													<TiTick className="text-lg text-gbActiveColor" />
												) : (
													<TiTick className="text-lg text-[#c9c8c8]" />
												)}
											</div>
										)}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FilterByCategoryMobile;
