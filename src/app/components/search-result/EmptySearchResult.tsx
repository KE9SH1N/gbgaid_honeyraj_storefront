"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../util/CustomButton";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const EmptySearchResult = () => {
	const dispatch = useDispatch();
	const selectedLanguage = useSelector(languageSelector);
	// For multi-language
	const t = useTranslations("searchResult");
	return (
		<div className="ct-container ct-flex-center flex-col lg:min-h-[71.3vh]">
			<div className="w-[50%] lg:w-full">
				<Image
					src="/image/empty-search.png"
					alt="Empty Search Result"
					width={362}
					height={355}
					className="mx-auto"
					onDragStart={(e) => e.preventDefault()}
				/>
			</div>
			<div className="w-full py-10">
				<p className=" lg:text-4xl text-[#cecece] capitalize text-center">
					{t("empty-search-msg")}
				</p>
			</div>
			<Link
				href={`/`}
				className=" capitalize bg-gbPrimaryColor py-4 rounded text-white shadow-md"
			>
				<div className=" w-52 text-center">
					<CustomButton buttonText={t("empty-search-button")} />
				</div>
			</Link>
		</div>
	);
};

export default EmptySearchResult;
