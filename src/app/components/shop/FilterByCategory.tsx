"use client";
import React from "react";
import {
	selectFilter,
	toggleCategory,
} from "../../redux/features/product/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../redux/features/product/categorydataSlice";
import { useTranslations } from "next-intl";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { category } from "../../types/categoryType";

const FilterByCategory = () => {
	const dispatch = useDispatch();
	const categories = useSelector(selectCategories);
	const selectedLanguage = useSelector(languageSelector);
	const filterState = useSelector(selectFilter);
	const selectedCategories = (filterState.selectedCategories || []).map(Number);

	// Function to handle checkbox change
	const handleCheckboxChange = (CatId: number) => {
		dispatch(toggleCategory({ CatId }));
	};
	// For multi-language
	const t = useTranslations("filter");

	return (
		<div className="py-3">
			<h4 className=" capitalize font-semibold mb-4">{t("category-filter")}</h4>
			<ul className="flex flex-col gap-y-2">
				{categories.map((categoryItem: category) => {
					return (
						<li key={categoryItem.id}>
							<label className="custom-checkbox items-center cursor-pointer">
								<input
									name="abc"
									type="checkbox"
									checked={selectedCategories.includes(categoryItem.id)}
									onChange={() => handleCheckboxChange(categoryItem.id)}
								/>
								<span className="checkmark-non-rounded"></span>
								{selectedLanguage === "bn" ? (
									<span className="ml-2 text-sm">{categoryItem.name_bn}</span>
								) : (
									<span className="ml-2 text-sm">{categoryItem.name_en}</span>
								)}
							</label>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default FilterByCategory;
