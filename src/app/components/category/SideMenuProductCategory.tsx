"use client";
import React from "react";
import { RxDashboard } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../redux/features/product/categorydataSlice";
import Link from "next/link";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { closeSidebar } from "../../redux/features/util/sidebarSlice";
import { useTranslations } from "next-intl";

const SideMenuProductCategory = () => {
	const dispatch = useDispatch();
	const categoryData = useSelector(selectCategories);
	const selectedLanguage = useSelector(languageSelector);

	// For multi-language
	const t = useTranslations("tabBarMenu");
	return (
		<div>
			<div className="w-full px-4 py-2">
				<h3 className="ct-flex-start items-center gap-x-2 py-2 px-1 rounded bg-gbPrimaryColor text-white">
					<RxDashboard className="text-sm" />
					<span className=" font-medium uppercase text-sm  ">
						{t("category")}
					</span>
				</h3>
				<div className="w-full">
					<ul className="w-full pt-1 flex flex-col gap-y-2 h-52 overflow-auto lg:scrollbar-thin lg:scrollbar-thumb-gbCustomScrollThumbColor lg:scrollbar-track-[#FEF3E9]">
						{categoryData.map((categoryItem) => {
							return (
								<li
									key={categoryItem?.id}
									className="w-full px-2 text-sm rounded py-1 bg-componentBg"
								>
									<Link
										onClick={() => dispatch(closeSidebar())}
										href={`/category/${categoryItem?.slug}`}
										className="ct-flex-between text-sm"
									>
										{selectedLanguage === "bn" ? (
											<span>{categoryItem?.name_bn}</span>
										) : (
											<span>{categoryItem?.name_en}</span>
										)}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SideMenuProductCategory;
