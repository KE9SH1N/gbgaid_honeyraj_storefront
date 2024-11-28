"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../redux/features/product/categorydataSlice";
import { fetchCategoryData } from "../../api/productsApiService";
import { useTranslations } from "next-intl";
import UseOutsideClickAndEscape from "../../hooks/useDropdown";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const CategoryDropdown = () => {
	const dispatch = useDispatch();
	const categories = useSelector(selectCategories);
	const [isDropdownopen, setDropdownopen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const selectedLanguage = useSelector(languageSelector);

	// For Data Fetch
	useEffect(() => {
		dispatch(fetchCategoryData() as any);
	}, [dispatch]);

	// Custom hook for dropdown ref
	UseOutsideClickAndEscape(dropdownRef, setDropdownopen);

	const toggleDropdownCategory = () => {
		setDropdownopen(!isDropdownopen);
	};

	// For multi-language
	const t = useTranslations("allCategory");
	return (
		<div>
			<div className="gap-4 py-3" ref={dropdownRef}>
				<div
					onClick={toggleDropdownCategory}
					className="flex items-center font-medium cursor-pointer capitalize"
				>
					{t("all-category")}
					<IoIosArrowDown
						className={`mx-4 font-medium smooth-animation-mid ${
							isDropdownopen ? "rotate-180" : ""
						}  text-lg`}
					/>

					{/* {!isDropdownopen ? (
						<IoIosArrowDown className="mx-4 font-medium text-lg" />
					) : (
						<IoIosArrowUp className="mx-4 font-medium text-lg" />
					)} */}
				</div>
				<div className="w-full relative ">
					<ul
						className={`w-64 absolute bg-white top-5 xl:-left-20 lg:left-0 flex flex-col items-start rounded-sm rounded-r-md z-40 smooth-animation-mid ${
							isDropdownopen
								? "  opacity-100"
								: " opacity-0 pointer-events-none"
						} `}
					>
						{categories.map((categoryItem: any) => {
							return (
								<Link
									key={categoryItem.id}
									onClick={() => setDropdownopen(false)}
									href={`/category/${categoryItem?.slug}`}
									className="w-full py-3 px-3 bg-componentBg hover:text-[#ffffff] hover:bg-gbPrimaryColor hover:opacity-90 border-b border-white smooth-animation-mid"
								>
									{selectedLanguage === "bn" ? (
										<li>{categoryItem.name_bn}</li>
									) : (
										<li>{categoryItem.name_en}</li>
									)}
								</Link>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default CategoryDropdown;
