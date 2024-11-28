"use client";
import React from "react";
import { useTranslations } from "next-intl";
import SectionHead from "../util/SectionHead";
import { useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { selectProductDetailsData } from "../../redux/features/product/productdetailsSlice";

const ProductDescription = () => {
	// Product details Selector
	const productDetailsData = useSelector(selectProductDetailsData);

	// Language selector
	const selectedLanguage = useSelector(languageSelector);
	return (
		<div>
			<div>
				<div className="py-2 lg:py-4 text-[#0B0B0BB2] font-medium ct-flex-center text-sm lg:text-base text-justify flex-col gap-y-3 lg:gap-y-6">
					<p>
						{selectedLanguage === "bn" ? (
							<div
								className="ql-editor"
								dangerouslySetInnerHTML={{
									__html: productDetailsData?.product_dec_bn,
								}}
							/>
						) : (
							<div
								className="ql-editor"
								dangerouslySetInnerHTML={{
									__html: productDetailsData?.product_dec_en,
								}}
							/>
						)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProductDescription;
