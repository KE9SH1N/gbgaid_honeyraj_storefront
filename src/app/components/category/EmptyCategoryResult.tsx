"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../util/CustomButton";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const EmptyCategoryResult = () => {
	const dispatch = useDispatch();
	const selectedLanguage = useSelector(languageSelector);
	// For multi-language
	const t = useTranslations("allCategory");
	return (
		<div className="ct-container ct-flex-center flex-col min-h-[70vh] md:min-h-[80vh] lg:min-h-[80vh]">
			<div className="w-[50%] lg:w-full">
				<Image
					src="/image/empty-category.png"
					alt="Empty Search Result"
					width={362}
					height={355}
					className="mx-auto"
					onDragStart={(e) => e.preventDefault()}
				/>
			</div>
			<div className="w-full py-10">
				<p className=" lg:text-2xl text-[#cecece] capitalize text-center">
					{t("emptyCategory.empty-category-mesg")}
				</p>
			</div>
			<Link
				href={`/category`}
				className=" capitalize bg-gbPrimaryColor py-4 rounded text-white shadow-md"
			>
				<div className=" w-52 text-center">
					<CustomButton buttonText={t("emptyCategory.empty-category-button")} />
				</div>
			</Link>
		</div>
	);
};

export default EmptyCategoryResult;
