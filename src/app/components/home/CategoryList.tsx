"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
	selectCategories,
	selectCategoriesLoader,
} from "../../redux/features/product/categorydataSlice";
import { useBlockRightClick } from "../../lib/common/BlockRightClick";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { category } from "../../types/categoryType";
import { getBaseUrl } from "../../lib/helper/getBaseUrl";
import CategoryListLoader from "../util/loader/CategoryListLoader";

const CategoryList = () => {
	const categories = useSelector(selectCategories);
	const categoriesLoader = useSelector(selectCategoriesLoader);
	const selectedLanguage = useSelector(languageSelector);
	const imageRef = useRef<HTMLDivElement>(null);

	//In the name of securities blocking user right click
	useBlockRightClick(imageRef);

	//Loader Animation
	if (categoriesLoader) {
		return (
			<div>
				<CategoryListLoader />
			</div>
		);
	}

	return (
		<div className="ct-container my-4 xl:my-12 ">
			<div className="ct-grid-cols-5 xl:ct-grid-cols-10 ">
				{categories.map((categoryItem: category) => {
					return (
						<div
							key={categoryItem.id}
							className="border border-transparent smooth-animation-mid hover:border-b hover:border-b-gbPrimaryColor hover:border-t-gbPrimaryColor rounded"
						>
							<Link href={`/category/${categoryItem?.slug}`}>
								<div>
									<div ref={imageRef} className="my-2 justify-center flex">
										<Image
											src={`${getBaseUrl(true)}//${categoryItem.image}`}
											alt="Honey Category"
											width={40}
											height={40}
											onDragStart={(e) => e.preventDefault()}
										/>
									</div>
									<div className=" overflow-hidden">
										<h3 className=" font-semibold text-sm text-center">
											{selectedLanguage === "bn"
												? categoryItem.name_bn
												: categoryItem.name_en}
										</h3>
									</div>
								</div>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CategoryList;
