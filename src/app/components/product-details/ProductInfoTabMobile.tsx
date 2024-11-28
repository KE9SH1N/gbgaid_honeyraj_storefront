"use client";
import React, { useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { useTranslations } from "next-intl";
import { selectProductDetailsData } from "../../redux/features/product/productdetailsSlice";
import ProductDescription from "./ProductDescription";
import HealthBenifits from "./HealthBenifits";
import UseAbility from "./UseAbility";
import SideEffect from "./SideEffect";
import ProductCertificates from "./ProductCertificates";
import ProductReivew from "./ProductReivew";

const ProductInfoTabMobile = () => {
	const [openIndex, setOpenIndex] = useState(0);
	// Product details Selector
	const productDetailsData = useSelector(selectProductDetailsData);

	const handleToggle = (index: number) => {
		if (openIndex !== index) {
			setOpenIndex(index);
		}
	};
	// Language selector
	const selectedLanguage = useSelector(languageSelector);

	// For multi-language
	const t = useTranslations("productDetailsTab");

	return (
		<div>
			<div className="w-full flex flex-col lg:hidden px-2 my-5">
				<div className="border-b border-gray-200">
					<button
						onClick={() => handleToggle(0)}
						className="w-full text-left py-3 px-5 bg-gray-100 hover:bg-gray-200 focus:outline-none flex justify-between items-center"
					>
						<span className="font-semibold capitalize text-sm">
							{t("about")}
						</span>
						<IoMdArrowDropup
							className={`text-xl smooth-animation-mid ${
								openIndex === 0 ? "rotate-180" : ""
							}`}
						/>
					</button>
					{openIndex === 0 && (
						<div>
							<ProductDescription />
						</div>
					)}
				</div>

				<div className="border-b border-gray-200">
					<button
						onClick={() => handleToggle(1)}
						className="w-full text-left py-3 px-5 bg-gray-100 hover:bg-gray-200 focus:outline-none flex justify-between items-center"
					>
						<span className="font-semibold capitalize text-sm">
							{t("health-benifits")}
						</span>
						<IoMdArrowDropup
							className={`text-xl smooth-animation-mid ${
								openIndex === 1 ? "rotate-180" : ""
							}`}
						/>
					</button>
					{openIndex === 1 && (
						<div>
							<HealthBenifits />
						</div>
					)}
				</div>

				<div className="border-b border-gray-200">
					<button
						onClick={() => handleToggle(2)}
						className="w-full text-left py-3 px-5 bg-gray-100 hover:bg-gray-200 focus:outline-none flex justify-between items-center"
					>
						<span className="font-semibold capitalize text-sm">
							{t("usability")}
						</span>
						<IoMdArrowDropup
							className={`text-xl smooth-animation-mid ${
								openIndex === 2 ? "rotate-180" : ""
							}`}
						/>
					</button>
					{openIndex === 2 && (
						<div>
							<UseAbility />
						</div>
					)}
				</div>

				<div className="border-b border-gray-200">
					<button
						onClick={() => handleToggle(3)}
						className="w-full text-left py-3 px-5 bg-gray-100 hover:bg-gray-200 focus:outline-none flex justify-between items-center"
					>
						<span className="font-semibold capitalize text-sm">
							{t("side-effect")}
						</span>
						<IoMdArrowDropup
							className={`text-xl smooth-animation-mid ${
								openIndex === 3 ? "rotate-180" : ""
							}`}
						/>
					</button>
					{openIndex === 3 && (
						<div>
							<SideEffect />
						</div>
					)}
				</div>
				{productDetailsData?.certification_en !== null && (
					<div className="border-b border-gray-200">
						<button
							onClick={() => handleToggle(4)}
							className="w-full text-left py-3 px-5 bg-gray-100 hover:bg-gray-200 focus:outline-none flex justify-between items-center"
						>
							<span className="font-semibold capitalize text-sm">
								{t("certificates")}
							</span>
							<IoMdArrowDropup
								className={`text-xl smooth-animation-mid ${
									openIndex === 4 ? "rotate-180" : ""
								}`}
							/>
						</button>
						{openIndex === 4 && (
							<div className="px-5 my-3">
								<ProductCertificates />
							</div>
						)}
					</div>
				)}

				<div className="border-b border-gray-200">
					<button
						onClick={() => handleToggle(5)}
						className="w-full text-left py-3 px-5 bg-gray-100 hover:bg-gray-200 focus:outline-none flex justify-between items-center"
					>
						<span className="font-semibold capitalize text-sm">
							{t("review")}
						</span>
						<IoMdArrowDropup
							className={`text-xl smooth-animation-mid ${
								openIndex === 5 ? "rotate-180" : ""
							}`}
						/>
					</button>
					{openIndex === 5 && (
						<div className="px-5 my-3">
							<ProductReivew />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductInfoTabMobile;
